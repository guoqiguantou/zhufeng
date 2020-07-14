
let Promise =require('./promise1.js')
const fs = require('fs')

function read(...args) {
  return new Promise((resolve, reject) => {
    fs.readFile(...args, function (err, data) {
      if (err) {
        reject(err);
      }else{
        resolve(data.toString())
      }
    });
  })
}

// Promise.all([1212,read('name.txt'),34,read('aa.txt')]).then(res=>{
//   console.log('promiseAll'+res)
// },err=>{console.log(err)})

// read('name.txt').then(res=>{
//   return res
// }).then(res=>{
//   return read(res)
// }).then(res=>{
//   console.log(res)
//   throw new Error('aa')
// }).catch(err=>{
//   console.log('11111111111111',err)
// }).then(res=>{
//   console.log(res)
// })

const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})
.then(result => result)
// .catch(e => e);

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
.then(result => result,err=>err)
// .catch(e => e);

Promise.all([p1, p2]).then(result => console.log(12,result)).catch(e => console.log(e));