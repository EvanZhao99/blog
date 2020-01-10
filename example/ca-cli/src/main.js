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
    ]
  },
  '*': {
    alias: '',
    description: 'command not found',
    examples: []
  }
}

// 遍历指令集
Reflect.ownKeys(mapActions).forEach(action => {
  program
    .command(action)
    .alias(mapActions[action].alias)
    .description(mapActions[action].description)
    .action(env => {
      // 访问不到对应的命令
      if(action === '*') {
        console.log(mapActions[action].description)
      } else {
        // 拿到命令行参数（以空格隔开输入，以数组的形式获取： ['node目录', '执行文件目录', ...输入内容(指令+参数)]）
        require(path.resolve(__dirname, action))(...process.argv.slice(3))
      }
    })
})

program.on('--help', () => {
  console.log('\nexample:')
  Reflect.ownKeys(mapActions).forEach(action => {
    mapActions[action].examples.forEach(example => {
      console.log(example)
    })
  })
})

program.version(version).parse(process.argv)
console.log(process.argv)