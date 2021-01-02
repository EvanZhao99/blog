const fs = require('fs')
const { rc, templates, defaults } = require('./constants')

const set = async (key, value) => {
    if(defaults[key]) {
        return console.log(`Error: can't edit the default template`)
    }
    templates[key] = value
    fs.writeFileSync(rc, JSON.stringify(templates, null, '\t'), 'utf-8')
    console.log(`the template ${key} is setted`)
}

const get = async (key) => {
    console.log(templates[key])
}

const remove = async (key) => {
    if(defaults[key]) {
        return console.log(`Error: can't remove the default template`)
    }
    if(templates[key]) {
        delete templates[key]
        fs.writeFileSync(rc, JSON.stringify(templates, null, '\t'), 'utf-8')
        console.log(`the template ${key} is deleted`)
    } else {
        console.log(`not found the template ${key}`)
    }
}

module.exports = async (type, ...args) => {
    switch (type) {
        case 'set':
            set(...args)
            break;
        case 'get': 
            get(...args)
            break;
        case 'remove': 
            remove(...args)
            break
        default: 
            // 未匹配 打印配置信息
            console.log('templates: ')
            console.log(JSON.stringify(templates, null, '\t'))
    }
}