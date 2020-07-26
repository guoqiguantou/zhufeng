const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',//入口文件
    output: {
        path: path.resolve(__dirname, 'dist'),//出口文件 dist目录下
        filename: 'bundle.js'
    },
    devtool: 'source-map',//可以生成source-map 源码映射
    resolve:{
        modules: [path.resolve(__dirname, "./source"), "node_modules"]//添加一个目录到模块搜索目录，此目录优先于 node_modules/ 搜索：
    },
    plugins: [
        new HtmlWebpackPlugin({ 
            template: path.resolve(__dirname, 'public/index.html') 
        })
    ]
}