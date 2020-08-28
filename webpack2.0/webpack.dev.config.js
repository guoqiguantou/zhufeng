const { merge } = require('webpack-merge');
const baseConfig=require('./webpack.com.config');
const webpack = require('webpack');
console.log(merge)
module.exports=merge(baseConfig,{
  mode: "development",
  plugins:[
   
  ]
})