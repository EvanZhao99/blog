const axios = require('axios')
const ora = require('ora') // 终端样式
const Inquirer = require('inquirer') // 命令行交互
const { promisify } = require('util')
const fs = require('path')
let ncp = require('ncp')
let downloadGitReop = require('download-git-repo') // 下载git仓库
const MetalSmith = require('metalsmith') // 遍历文件夹
// consolidate 统一了所有的模板引擎
let {render} = require('consolidate').ejs
const { downloadDirectory } = require('./constants')

render = promisify(render)

downloadGitReop = promisify(downloadGitReop)

ncp = promisify(ncp) // 将模板文件拷贝到指定目录

// create 功能是创建项目
// 列出所有项目 让用户选择安装
// 获取仓库代码

// 1）获取项目列表
const fetchRepoList = async () => {
  const { data } = await axios.get('https://api.github.com/orgs/zhu-cli/repos')
  return data
}

// 抓取tag列表
const fetchTagList = async (repo) => {
  const { data } = await axios.get(`https://api.github.com/repos/zhu-cli/${repo}/tags`)
  return data
}

// 封装loading效果
const waitFnloading = (fn, message) => async (...args) => {
  const spinner = ora(message)
  spinner.start()
  const result = await fn(...args)
  spinner.succeed()
  return result
}

// 拉取用户选择的tag
const download = async (repo, tag) => {
  let api = `zhu-cli/${repo}`
  if(tag) {
    api += `#${tag}`
  }
  const dest = `${downloadDirectory}/${repo}`
  await downloadGitReop(api, dest)
  return dest
}

module.exports = async (projectName) => {
  // 1) 获取项目模板
  let repos = await waitFnloading(fetchRepoList, 'fetching template......')()

  // 拿到项目名称
  repos = repos.map((item) => item.name)

  // 选择模板
  const { repo } = await Inquirer.prompt({
    name: 'repo',
    type: 'list',
    message: 'please choise a template to create project',
    choices: repos
  })

  // 2) 通过选择的项目 拉取对应的仓库
  // 获取版本号
  let tags = await waitFnloading(fetchTagList, 'fetchng tags...')(repo)
  tags = tags.map((item) => item.name)

  const { tag } = await Inquirer.prompt({
    name: 'tag',
    type: "list",
    message: 'please choise tags to create project',
    choices: tags
  })

  // 3）把模板放到一个临时目录里 存好，以备后期使用
  const result = await waitFnloading(download, 'download template')(repo, tag)

  // 4)拷贝模板
  // 拿到下载的目录 直接拷贝到当前的执行目录下即可 使用ncp
  // 如果没有ask.js文件，直接执行拷贝操作，否则执行复制模板逻辑
  if(!fs.existsSync(path.join(result, 'ask.js'))) {
    await ncp(result, path.resolve(projectName))
  } else {
    // 复杂模板
    // 需要用户选择 然后编译模板
    await new Promise((resolve, reject) => {
      MetalSmith(__dirname) // 默认遍历当前路径下的src
        .source(result)
        .destination(path.resolve(projectName))
        .use(async (files, metal, done) => {
          // 命令行交互 获取用户选择参数
          const args = require(path.join(result, 'ask.js'))
          const obj = await Inquirer.prompt(args)
          const meta = metal.metadata()
          Object.assign(meta, obj)
          delete files['ask.js']
          done()

        })
        .use((files, metal, done) => {
          // 根据用户选择 渲染模板
          const obj = metal.metadata()
          Reflect.ownKeys(files).forEach(async file => {
            // 处理ejs <%
            if(file.includes('js') || file.includes('json')) {
              let content = files[file].contents.toString()
              if(content.includes('<%')) {
                content = await render(content, obj)
                files[file].contents = Buffer.from(content) // 渲染
              }
            }
          })
          // 根据用户的输入 下载模板
          done()
        })
        .build((err) => {
          if(err) {
            reject()
          } else {
            resolve()
          }
        })
    })
  }

}