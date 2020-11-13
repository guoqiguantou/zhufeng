// console.log(process)

/*
process 进程
platform 平台 
nextTick
env //环境变量  mac:export dev="dev"  win:set prod="prod"
argv //获取命令行参数 node index.js --dd ss
[
  '/usr/local/bin/node',
  '/Users/guoqiguantou/Documents/project/node-demo/index.js',
  '--dd',
  'ss'
]
第一个：node的目录
第二个：运行文件的目录
.... 参数

*/

// console.log(process.argv)//获取环境变量
// function getParams(argv){
//     argv=argv.slice(2)
//     return argv.reduce((previousValue, currentValue, currentIndex, array) => {
//         if(currentValue.startsWith('--')){
//             previousValue[currentValue.slice(2)]=array[currentIndex+1]
//         }
//         return previousValue
//     }, {})
// }
// console.log(getParams(process.argv))

