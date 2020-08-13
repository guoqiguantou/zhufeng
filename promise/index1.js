var Promise = require('./promise3.0');

let p1 = new Promise((resolve, reject) => {
  resolve(33)
})

p1.then(res => {
  console.log(res)
  return new Promise((resolve, reject) => {
    resolve(new Promise((resolve, reject) => {
      resolve('4')
    }))
  })
}).then(res => {
  console.log(res)
})