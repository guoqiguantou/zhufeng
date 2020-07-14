const Promise = require("./promise1")
// const promise = new Promise(function (resolve, reject) {
//    setTimeout(()=>{
//     resolve(new Promise(function (resolve, reject) {
//       resolve(1212)
//     }))
//   },1000)

// })

// promise.then(result => console.log('成功'+result), err => { console.log('失败'+err) })


// .catch(error => console.log(error))


const promise = new Promise(function (resolve, reject) {
  reject(1212)
})
// promise.then((data) => {
//   return new Promise(function (resolve, reject) {
//     resolve(new Promise(function (resolve, reject) {
//       reject(11)
//     }))
//   })
// }).then(data => {
//   console.log(data)
// })
promise.then().then(result => {
  console.log('成功' + result)
}).catch(err=>{
  console.log('catch'+err)
})



