//实现promise
// var Promise = require('./promise1');

// const Promise = require("./promise1")

var promise = new Promise((resolve, reject) => {
    reject('错误的原因')
    // throw new Error('错误')
    


})
let p1 = promise.then(data => {
    console.log('第一个then' + data)
    return new Promise((resolve, reject) => {
        reject('err1')
    })
}, (err) => {
    console.log('第一个thenErr' + err)
    // throw new Error('错误')
    // return 12
    // return p1
    return new Promise((resolve, reject) => {
        reject( new Promise(()=>{
            setTimeout(function(){
                reject('23444')
            },1000)
            
        }))
        // setTimeout(() => { reject('122') }, 3000)
    })

})

let p2 = p1.then(data => {
    console.log('第二个then' + data)
    return data
}, (err) => {
    console.log('第二个thenErr' + err)
    return err
})

let p3 = p2.then(data => {
    console.log('第三个then' + data)
    return new Promise((resolve, reject) => {
        resolve('1221')
    })
}, (err) => {
    console.log('第三个thenErr' + err)
})
let p4 = p3.then(data => {
    console.log('第四个then' + data)
})
//调用then 会返回一个新的promise p2  如果then里面返回一个新的promise x
//那么会将这个promise x 的结果 传给下一个promise p2
//走成功 then返回一个普通值 或者返回一个promise成功 
//走失败 then 抛出异常 或者返回一个 promise失败
//
