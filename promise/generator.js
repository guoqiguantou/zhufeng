//执行 Generator 函数会返回一个遍历器对象

//generator 生成器 生产的是迭代器
//普通函数执行时不可以暂停,generator函数执行时可以暂停
//碰到yield关键字就停止了


// function * g1 (){
//     var y1=yield 3; //{ value: 3, done: false }
//     console.log('y1'+y1)
//     var y2=yield 4;//{ value: 4, done: false }
//     console.log('y2'+y2)
//     return 5    //{ value: 5, done: true }
// }
// let g=g1()
// let done=false
// while(!done){
//     let obj=g.next()
//     done=obj.done;
//     console.log(obj.value)
// }

// let t1=g.next(10)
// console.log(t1)
// let t2=g.next(9)
// console.log(t2)
// let t3=g.next(8)
// console.log(t3)

let util = require('util')
let fs = require('fs')
let read = util.promisify(fs.readFile)

function * readAge(){
    let context=yield read('name.txt','utf8');
    let value=yield read(context,'utf8');
    return value
}


function co(it){
    return new Promise((resolve,reject)=>{
        //异步迭代不能用for循环 需要next函数
        function next(val){
            let {value,done}=it.next(val)
            if(!done){
                Promise.resolve(value).then(res=>{
                    next(res)
                })
            }else{
                resolve(value) 
            }
        }
        next()
    })
}

co(readAge()).then(res=>{
    console.log(12,res)
})
