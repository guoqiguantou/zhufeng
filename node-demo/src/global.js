// console.log(Object.keys(global))
/*
'global',
'clearInterval',
'clearTimeout',
'setInterval',
'setTimeout',
'queueMicrotask',
'clearImmediate',
'setImmediate'
*/

//process 进程
// console.log(Object.keys(process))
/*
  'platform',//平台 //darwin win32
  'nextTick',
  'cwd', 根目录地址   //Users/guoqiguantou/Documents/project/zhufeng/node-demo
  'env',环境变量       设置环境变量 mac export name=1212 window set name=1212
  'title',
  'argv',   //前面两个参数是
  [
  '/usr/local/bin/node',
  '/Users/guoqiguantou/Documents/project/zhufeng/node-demo/global.js'
]
  'pid',
  ....
*/

console.log(process.env)

