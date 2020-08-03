const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const path = require('path');
module.exports = {
    mode: process.env.NODE_ENV = 'production' ? 'production' : 'development', 
    entry: './src/index.tsx',
    output: {
        path: path.join(__dirname, 'dist'), // 输出目录
        filename: 'bundle.js'
    },
    devtool: 'source-map', // 开发工具
    devServer: {
        hot: true,
        contentBase: path.join(__dirname, 'dist'), // 静态文件目录
        historyApiFallback: { // browserHistory的时候 刷新会报404，自动定向到index.html
            index: './index.html'
        }
    },
    resolve: { // 配置如何解析
        alias: {
            "@": path.resolve(__dirname, 'src'),
            "~": path.resolve(__dirname, 'node_modules')
        },
        // 当你加载一个文件的时候，灭用指定扩展名 会自动寻找以下扩展名
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/, // 如果要加载的模块是jsx tsx js ts的话
                loader: 'ts-loader',
                options: {
                    transpileOnly: true, // 是否只转译
                    // 设置自定义转换器， TypeScript 可以将TS源码翻译成 JS 源码，自定义转换器插件则可以让你指定生成的代码。比如删除注释、改变变量名字、将类转换成函数等
                    // TypeScript 将 TS 代码编译到 JS 的功能，其实也是通过内置转换器实现的， 从TS 2.3 开始， TS 将此功能开放，允许开发正编写自定义转换器
                    getCustomTransformers: () => ({
                        before: [tsImportPluginFactory({
                            "libraryName": 'antd',
                            "libranryDirectory": "es",
                            "style": "css"
                        })]
                    }),
                    compilerOptions: {
                        module: 'es2015'
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', {
                    loader: 'css-loader', // 处理css中的import 和 url
                    options: {
                        importLoaders: 0 // todo:如果不配置 都按顺序加载会怎样？？？
                    }
                }, {
                    loader: 'postcss-loader', // 添加兼容前缀
                    options: {
                        plugins: [
                            require('autoprefixer')
                        ]
                    }
                }, {
                    loader: 'px2rem-loader',
                    options: {
                        remUnit: 75, // 一个rem代表75px
                        remPrecesion: 8 // 计算精度保留8位小数
                    }
                }]
            }, {
                test: /\.less$/,
                use: ['style-loader', {
                    loader: 'css-loader', // 处理css中的import 和 url
                    options: {
                        importLoaders: 0 // todo:如果不配置 都按顺序加载会怎样？？？
                    }
                }, {
                    loader: 'postcss-loader', // 添加兼容前缀
                    options: {
                        plugins: [
                            require('autoprefixer')
                        ]
                    }
                }, {
                    loader: 'px2rem-loader',
                    options: {
                        remUnit: 75, // 一个rem代表75px
                        remPrecesion: 8 // 计算精度保留8位小数
                    }
                },
                'less-loader']
            }, {
                test: /\.(jpg|png|gif|svg|jpeg)$/,
                use: ['url-loader']
            }
        ]
    },
    plugins: [
        // html模板
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        // 热更新
        new webpack.HotModuleReplacementPlugin()
    ]
};