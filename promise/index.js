//实现promise
var Promise = require('./promise');

var promise = new Promise((resolve, reject) => {
    reject('111')
})
let p1=promise.then(data=>{
    console.log('第一个then'+data)
    return new Promise((resolve, reject)=>{
        reject('err1')
    }) 
},(err)=>{
    console.log('第一个thenErr'+err)
    return new Promise((resolve, reject)=>{
        reject('122')
    })
})
let p2=p1.then(data=>{
    console.log('第二个then'+data)
    return data
},(err)=>{
    console.log('第二个thenErr'+err)
    return err
})
let p3=p2.then(data=>{
    console.log('第三个then'+data)
    return new Promise((resolve, reject)=>{
        resolve('1221')
    })
},(err)=>{
    console.log('第三个thenErr'+err)
})
let p4=p3.then(data=>{
    console.log(data,'aaa')
})
//调用then 会返回一个新的promise p2  如果then里面返回一个新的promise x
//那么会将这个promise x 的结果 传给下一个promise p2
//走成功 then返回一个普通值 或者返回一个promise成功 
//走失败 then 抛出异常 或者返回一个promise失败
