let util = require('util')
let fs = require('fs')
// let Promise =require('./promise1')

// let read=util.promisify(fs.readFile)
let read = promisify(fs.readFile)

function promisify(fn) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            fn(...args, function (err, data) {
                if (err) reject(err)
                resolve(data)
            })
        })
    }
}
let p1=new Promise((resolve)=>{
    resolve(22)
})

// Promise.resolve(p1).then(res=>console.log('1111111111'+res))

// Promise.all([read('aa.txt','utf8'),read('name.txt','utf8')]).then(res=>{
//     console.log(res)
// }).catch(err=>{console.log(err)})

// let promise = new Promise((resolve, reject) => {
//     resolve(1212)
// })
// console.log(promise.then(res => { console.log(res) }).finally(() => { console.log('结束了') }))
// console.log(p2)

// console.log(Promise.resolve(2).finally(() => {}))
let p2=new Promise((resolve)=>{
    setTimeout(function(){
        resolve(12)
    },200)
})
let p3=new Promise((resolve,reject)=>{
    setTimeout(function(){
        reject('p1')
    },100)
})
Promise.race([p2,p3]).then(res=>{
  console.log('promiseAll'+res)
},err=>{console.log(123456,err)})

