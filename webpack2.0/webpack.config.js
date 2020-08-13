const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');//对抽离的css打包
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//抽离css
const { CleanWebpackPlugin } = require('clean-webpack-plugin');//打包前清空dist目录
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash:5].js',
    path: path.resolve(__dirname, 'dist')
  },
  // mode:'development',
  mode: "production",
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        // {
        //   loader:'style-loader',
        //   // options:{
        //   //   insert:'top'
        //   // }
        // },//插入style
        MiniCssExtractPlugin.loader, //替换之前的 style-loader
        'css-loader',//处理.css
        {
          loader: 'postcss-loader',
          options: {
            plugins: function () {
              return [
                require('autoprefixer')({
                  "overrideBrowserslist": [
                    ">0.25%",
                    "not dead"
                  ]
                })
              ]
            }
          }
        },//浏览器前缀
      ]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),//抽离的css
    new OptimizeCssPlugin(),//对抽离的css打包
    new CleanWebpackPlugin(),//打包前清空dist目录
  ]
}