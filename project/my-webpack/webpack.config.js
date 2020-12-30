let path = require('path')
let A = require('./plugins/a.js')
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new A()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [path.resolve(__dirname, 'loaders', 'a.js')]
            }
        ]
    }
}