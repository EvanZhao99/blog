let ejs = require('ejs')
let fs = require('fs')
let path = require('path')
let templateStr = fs.readFileSync(path.resolve(__dirname, 'template.html')).toString()

// let r = ejs.render(templateStr, [{name: 'a'},{name: 'b'}])
// console.log(r)
let render = (templateStr, options) => {
    // 需要在内部拼接一个字符串，这个字符串是一个可执行程序代码；通过new Function执行该字符串代码，得到的结果是拼接好的HTML文档
    let str = `let str = ''; \r\n`
    str += `with(obj){\r\n` // 通过with取到参数的属性值，dirs = obj.dirs
    str += 'str+=\r\n`'
    templateStr = templateStr.replace(/<%=([\s\S]+?)%>/g, function(){
        // console.log(arguments)
        return '${'+ arguments[1]+'}' //取到模板中的值 arguments[1]为第一个()中匹配到的值
    })
    let content = templateStr.replace(/<%([\s\S]+?)%>/g, function() {
        // console.log(arguments)
        return '`\r\n' + arguments[1] + '\r\nstr+=`\r\n'
    })
    let strTemplate = str + content + '`\r\n} \r\nreturn str'
    let fn = new Function('obj', strTemplate)
    return fn(options)


}
let r = render(templateStr, {dirs:[{name: 'a'},{name: 'b'}]})
fs.writeFileSync('renderResult.html', r)