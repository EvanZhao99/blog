let fs=  require('fs');
let fsPromise = fs.promises;
let path = require('path');
let mime = require('mime');

function static(pathname) {
    return async(ctx, next) => {
        console.log(pathname, ctx.path)
        let requestPath = path.join(pathname, ctx.path)
        console.log(requestPath, pathname, ctx.path)
        try{
            let statObj = await fsPromise.stat(requestPath)
            if(!statObj.isFile()) {
                requestPath = path.join(requestPath, 'index.html')
            }
            ctx.set('Content-Type',mime.getType(requestPath)+';charset=utf8')
            ctx.body = fs.createReadStream(requestPath)
        }
        catch(e) {
            return next()
        }
    }
}

module.exports = static