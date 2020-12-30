const axios = require('axios')
const ora = require('ora') // 终端样式
const Inquirer = require('inquirer') // 命令行交互
const { promisify } = require('util')
const path = require('path')
const fs = require('fs')
let ncp = require('ncp')
let downloadGitRepo = require('download-git-repo') // 下载git仓库
const MetalSmith = require('metalsmith') // 遍历文件夹
// consolidate 统一了所有的模板引擎
let {render} = require('consolidate').ejs
const { downloadDirectory } = require('./constants')

render = promisify(render)

downloadGitRepo = promisify(downloadGitRepo)
// downloadGitReop('http://git.nas.51easymaster.com/api/v1/repos/zhaojichuang/ranking', path.resolve(__dirname, 'aa'))

ncp = promisify(ncp) // 将模板文件拷贝到指定目录

let templates = {wx: 'pluckychuang/ca-vuex'}

// create 功能是创建项目
// 列出所有项目 让用户选择安装
// 获取仓库代码

// 1）获取项目列表
const fetchRepoList = async () => {
  const { data } = await axios.get('https://api.github.com/orgs/zhu-cli/repos')
  return data
}

// 抓取tag列表
const fetchTagList = async (template) => {
  const { data } = await axios.get(`https://api.github.com/repos/${template}/tags`)
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
const download = async (template, tag) => {
  let api = `zhu-cli/${repo}`
  if(tag) {
    api += `#${tag}`
  }
  const dest = `${downloadDirectory}/${repo}`
  await downloadGitReop(api, dest)
  return dest
}

/**
 * 流程：
 * 1）获取仓库列表
 * 
 */

module.exports = async (projectName) => {
  // 判断项目是否存在
  if(fs.existsSync(projectName)) {
    return console.log('this project is exited')
  }

  // 1) 获取项目列表，让用户选择模板
  // let repos = await waitFnloading(fetchRepoList, 'fetching template......')()
  
  let {template} = await Inquirer.prompt({
    name: 'template',
    type: 'list',
    message: 'please choise a template to create project',
    choices: Object.keys(templates)
  })
  template = templates[template]
  console.log(template)
  // await waitFnloading(async () => {
  //   await downloadGitRepo(templates[template], projectName)
  // }, 'fetching template......')()
  
  let tags = await waitFnloading(fetchTagList, 'fetchng tags...')(template)
  
  // 如果有tag 选择版本
  let tag = ''
  if(tags.length) {
    tags = tags.map((item) => item.name)
    const answer = await Inquirer.prompt({
      name: 'tag',
      type: "list",
      message: 'please choise a version of template',
      choices: tags
    })
    tag = answer.tag
  }
  
  await waitFnloading(async () => {
    let api = template
    if(tag) {
      api += `#${tag}`
    }
    await downloadGitRepo(api, projectName)
  }, 'fetching template......')()

  // return

  // 拿到项目名称
  // repos = repos.map((item) => item.name)

  // 通过Inquirer 提供交互界面，实现让用户选择模板；返回promise
  // const { repo } = await Inquirer.prompt({
  //   name: 'repo',
  //   type: 'list',
  //   message: 'please choise a template to create project',
  //   choices: repos // ['reponame1', "repoName2", ...]
  // })

  // 2) 获取项目下版本号列表，让用户tag版本号
  // 获取版本号
  // let tags = await waitFnloading(fetchTagList, 'fetchng tags...')(repo)
  // tags = tags.map((item) => item.name)

  // // 选择一个版本号
  // const { tag } = await Inquirer.prompt({
  //   name: 'tag',
  //   type: "list",
  //   message: 'please choise a template to create project',
  //   choices: tags
  // })

  // 3）通过download-git-repo拉取对应版本的模板代码，把模板放到一个临时目录里 并返回路径名称
  // const result = await waitFnloading(download, 'download template')(repo, tag)

  // 执行ask.js文件，让用户填写相关信息
  let filePath = `${projectName}/package.json`
  let config = fs.readFileSync(filePath).toString()
  config = JSON.parse(config)
  Object.assign(config, {
    "name": projectName,
    "version": "1.0.0",
    "description": "",
  })
  fs.writeFileSync(filePath, JSON.stringify(config, null, '\t'), 'utf-8')
  console.log('project created finish')

}