const path = require('path')
const webpack =require("webpack")
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
  // mode:'production',
  mode: "development",
  module: {
    rules: [{
      test: /\.js$/,
      use: [
        'babel-loader',
      ],
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: [
        //   {
        //     loader:'style-loader',
        //     // options:{
        //     //   insert:'top'
        //     // }
        //   },//插入style
        MiniCssExtractPlugin.loader, //替换之前的 style-loader
        'css-loader',//处理.css
        'postcss-loader',//浏览器前缀
      ]
    }, {
      test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 10240, //10K
            esModule: false,
            name: '[name]_[hash:6].[ext]',
            outputPath: 'assets'
          }
        },

      ], exclude: /node_modules/
    }, {
      test: /\.html$/,
      use: [
        'html-withimg-loader',//对html中的image进行打包
      ]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),//抽离的css
    new OptimizeCssPlugin(),//对抽离的css打包
    new CleanWebpackPlugin(),//打包前清空dist目录
    new webpack.ProvidePlugin({//ProvidePlugin 的作用就是注入每个文件
      $: 'jquery',
    })
  ]
}