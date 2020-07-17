//generator

let util=require('util')
let fs=require('fs')
// let readPromise=util.promisify(fs.readFile) //返回一个函数 函数再返回一个promise
let readPromise=promisify(fs.readFile)

//高阶函数
function promisify(fn){
  return function(...args){
    return new Promise((resolve,reject)=>{
      fn(...args,function(err,data){
        if(err)reject(err)
        resolve(data.toString())
      })
    })
  }
}

function * readAge(){
  let a=yield readPromise('name.txt')
  let b=yield readPromise(a)
  return b
}

// it.next().value.then(res=>{
//   console.log(res)
//   it.next(res).value.then(res=>{
//     console.log(res)
//   })
// })

function co(it){
  return new Promise((resolve,reject)=>{
    function next(res){
      let obj=it.next(res)
      if(obj.done){
        resolve(obj.value)
      }else{
        Promise.resolve(obj.value).then(res=>{
          next(res)
        },resolve)
      }
    }
    next()
  })
}

let it=readAge()
co(it).then(res=>{
  console.log(res,'end')
})