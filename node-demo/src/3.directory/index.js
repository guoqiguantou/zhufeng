//fs模块包括 文件操作和文件夹的操作
//创建目录是必须要有父级才可以创建子级
const fs = require('fs');
const path = require('path');


//同步创建
function mkdirSync(url) {
  const urlArr = url.split('/');
  urlArr.forEach((value, index, array) => {
    const p = path.resolve(__dirname, array.slice(0, index + 1).join('/'));
    try {
      fs.accessSync(p);//访问目录
    } catch (error) {
      fs.mkdirSync(p)
    }
  })
}
// mkdirSync('a/b/c/d/e/f/g')
// mkdirSync('a/b1/c1/d/e/f/g')

//异步创建
function mkdir(url, callback) {
  const urlArr = url.split('/');
  let index = 0;
  function next() {
    if (index === urlArr.length) { return callback() }
    const p = path.resolve(__dirname, urlArr.slice(0, index + 1).join('/'));
    fs.access(p, (err) => {
      index++;
      if (err) { //如果不存在
        fs.mkdir(p, next)
      } else {
        next()
      }
    })
  }
  next()
}

// mkdir('3/2/3/4/5', () => {
//   console.log('成功')
// })

// 删除目录同步
function rmdirDirSync(url) {
  const p = path.resolve(__dirname, url)
  const statObj = fs.statSync(p);
  if (statObj.isDirectory()) {
    let dirs = fs.readdirSync(p)
    dirs.forEach((value) => {
      rmdirDirSync(path.join(p, value))
    })
    fs.rmdirSync(p)
  } else {
    fs.unlinkSync(p)
  }
}
// rmdirDirSync('a')

// 删除目录异步
function rmdirDir(url,callback) {
  const p = path.resolve(__dirname, url)
  const statObj = fs.statSync(p);
  if (statObj.isDirectory()) {

  }else{

  }
}
rmdirDir('a',()=>{
  '成功'
})
