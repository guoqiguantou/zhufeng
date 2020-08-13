const path=require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');//对抽离的css打包
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//抽离css
module.exports = {
  entry:'./src/index.js',
  output:{
    filename:'bundle.js',
    path:path.resolve(__dirname,'dist')
  },
  // mode:'development',
  mode:"production",
  module:{
    rules:[{
      test:/\.css$/,
      use:[
        // {
        //   loader:'style-loader',
        //   // options:{
        //   //   insert:'top'
        //   // }
        // },
        MiniCssExtractPlugin.loader, //替换之前的 style-loader
        'css-loader'
      ]
    }]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname,'src/index.html')
    }),
    new MiniCssExtractPlugin({
      filename:'css/[name].css'
    }),
     new OptimizeCssPlugin(),
  ]
}