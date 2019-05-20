#! /usr/bin/env node
// 需要生成一个package.json
// 需要配置bin命令
// 在运行的文件中 增加 #！ /usr/bin/env node 表示用node 来执行文件

// commander 专门处理当前命令中执行的命令携带的参数
let version = require('../package.json').version
let program = require('commander')
// 执行某个命令 执行相应操作
program.command('rmdir <dir> [otherDirs...]')
.action(function(cdm, options){
    console.log('git clone')
})
let parser = program
    .option('-p, --port <p>', 'set http-server port')
    .option('-d, --dir <p>', 'set http-server directory')
    .version(version)
    .parse(process.argv)

// 预设参数
let config = {
    port: 8080,
    dir: process.cwd()
}
config = {...config, ...parser}
console.log(config)

// let Server = require('../src/index')
// let server = new Server(config)
// server.start()