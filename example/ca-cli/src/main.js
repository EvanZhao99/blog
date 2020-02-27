// 要执行的核心文件

// 解析用户参数
const program = require('commander')
const path = require('path')
const { version } = require('./constants')

// 命令集合
const mapActions = {
  create: {
    alias: 'c',
    description: 'create a project',
    examples: [
      'ca-cli create <project-name>'
    ],
  },
  config: { 
    alias: 'conf',
    description: 'config project variable',
    examples: [
      'ca-cli config set <k> <v>',
      'ca-cli config get <k>'
    ]
  },
  '*': {
    alias: '',
    description: 'command not found',
    examples: []
  }
}

// 封装commander的api调用 遍历指令集
Reflect.ownKeys(mapActions).forEach(action => {
  program
    .command(action)
    .alias(mapActions[action].alias)
    .description(mapActions[action].description)
    .action(env => {
      // 执行处理逻辑
      // 访问不到对应的命令
      if(action === '*') {
        console.log(mapActions[action].description)
      } else {
        // 将action拆分到单独的文件中 文件名与actionName对应 实现自动访问
        // process.argv  拿到命令行参数（以空格隔开输入，以数组的形式获取： ['node安装目录', 'cli安装目录', ...输入内容(指令+参数)]）
        require(path.resolve(__dirname, action))(...process.argv.slice(3))
        // console.log(env)
      }
    })
})

// 监听help事件
program.on('--help', () => {
  console.log('\nexample:')
  Reflect.ownKeys(mapActions).forEach(action => {
    mapActions[action].examples.forEach(example => {
      console.log(`  ${example}`)
    })
  })
})

program.version(version).parse(process.argv)

