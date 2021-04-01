const fs = require('fs');
const path = require('path')

//同步方法
//readFileSync 读取文件  读取文件默认是返回 buffer
//writeFileSync 写入文件 默认写入utf8字符串
//mkdirSync 创建文件夹
//accessSync 判断目录是否存在
//readdirSync 读取文件子目录
//在代码运行期间最好使用异步 运行期间使用同步代码会造成阻塞问题

//异步方法
// readFile 
// writeFile 


// flag 
// r 读取 
// w 写
// a 追加 
// r+ 可读可写 以读为主
// w+ 可写可读 以写为主 找不到就创建

// 这种拷贝的方式 不适合大文件操作 ，
// 因为需要先将文件读取到内存中，之后将文件写入，可能会浪费大量内存
// 如果文件超过64k就使用流的方式，就被认为是大文件
// //拷贝同步
// const data = fs.readFileSync(path.resolve(__dirname, 'a.txt'), {})
// fs.writeFileSync(path.resolve(__dirname, 'b.txt'), data, { flag: 'a' })

// //拷贝异步
// fs.readFile(path.resolve(__dirname, 'a.txt'), (e, data) => {
//   if (!e) {
//     fs.writeFile(path.resolve(__dirname, 'b.txt'), data, { flag: 'a' }, (e) => {
//       if (!e) {
//         console.log('操作成功')
//       }
//     })
//   }
// })


//创建文件夹同步创建
//必须要先有父级才能创建
// function addDir(p) {
//   let arr = p.split('/')
//   arr.forEach((item, index) => {
//     //判断如果文件目录存在
//     const p = path.resolve(__dirname, arr.slice(0, index + 1).join('/'))
//     try {
//       fs.accessSync(p)
//     } catch (error) {
//       fs.mkdirSync(p)
//     }
//   });
// }
// addDir('a2/b3/c3/d4');

// 创建文件夹异步创建
// 异步循环不能用for 需要next()
// 递归需要考虑的是 什么结束条件
function addDir(p, callback) {
  let arr = p.split('/');
  let index = 0;
  function next() {
    if (index == arr.length) return callback()
    //判断目录是否存在 存在就跳过 不存在就创建
    const p = path.resolve(__dirname, arr.slice(0, index + 1).join('/'));
    fs.access(p, (e) => {
      index++;
      if (e) {
        //不存在创建
        fs.mkdir(p, next)
      } else {
        next()
      }
    })
  }
  next()
}
addDir('a/b2/c2/d2', () => {
  console.log('操作成功')
});


//删除文件夹同步删除  
//必须要从根部删除
//1、深度删除：判断当前目录有没有子目录，如果有子目录就判断当前子目录有没有子目录，没有就删除

// function removeDir(p) {
//   //判断是否是文件 如果是直接删除文件即可
//   //如果是文件夹 读取子文件夹，便利子文件夹，递归调用
//   console.log(p)
//   const p1 = path.resolve(__dirname, p)
//   const stats = fs.statSync(p1);
//   if (stats.isDirectory()) {
//     let dirs = fs.readdirSync(p1)
//     dirs.forEach((value) => {
//       removeDir(path.join(p1, value))
//     })
//     fs.rmdirSync(p1)
//   } else {
//     fs.unlinkSync(p1)
//   }
// }
// removeDir('a')

//异步如何实现？
//1、串行执行
//2、并行执行 多个节点同时执行

//广度便利
function wideSync(q) {
  let arr = [q];//[a,b1,b2,c1,c2,d1,d2]
  let index = 0;
  let curren = q;

  fs.readdirSync(q)//读取文件

}
wideSync('a')