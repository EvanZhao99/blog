let fs = require('fs')
let path = require('path')

function rmdir(dirname, callback) {
    fs.stat(dirname, (err, statObj) => { // 获取文件信息
        if(err) {
            throw err
        }
        if(statObj.isDirectory()) {
            // 如果是空文件直接删除 否则删除其下文件后删除自己
            fs.readdir(dirname, (err, dirs) => {// 获取文件夹中子文件名
                if(dirs.length == 0) {
                    return fs.rmdir(dirname, callback)
                }
                dirs = dirs.map(item => {
                    return path.join(dirname, item) //拼接路径
                })
                let index = 0
                let done = () => { // 成功后调用done方法， 子目录都删除成后调用一下删除自己
                    index++
                    if(index == dirs.length) {// 其下文件全部删除
                        fs.rmdir(dirname, callback)
                    }
                }
                dirs.forEach(dir => {
                    rmdir(dir, done)
                })
            })
        }else {
            fs.unlink(dirname, callback)
        }
    })
}
rmdir('a',() => {
    console.log('删除成功')
})