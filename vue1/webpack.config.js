let path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',//入口文件
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  resolve:{
    modules: [path.resolve(__dirname, "source"), "node_modules"]
  },
  plugins: [
    new HtmlWebpackPlugin({ 
      template: path.resolve(__dirname, 'public/index.html') 
    })
  ]
}