
// 1、高阶函数 
// 1）函数返回一个函数  闭包
// 2）函数的参数是一个函数  回调函数


// function isType(content, type) {
//   return Object.prototype.toString.call(content) == `[object ${type}]`
// }

// function isType(type) {
//   return function (content) {
//     return Object.prototype.toString.call(content) == `[object ${type}]`
//   }
// }

// let isString = isType('String')
// let isNumber = isType('Number')

// console.log(isString('zhangan'))
// console.log(isNumber(123))

//柯里化类型检测

// function isType(type, content) {
//   return Object.prototype.toString.call(content) == `[object ${type}]`
// }

// //function.length 属性指明函数的形参个数。
// function currying(fn, args = []) {
//   console.log(fn.length)
//   let len = fn.length;
//   return function (...newArg) {
//     args = args.concat(newArg)
//     if (len > args.length) {
//       return currying(fn, args)
//     } else {
//       return fn(...args)
//     }
//   }
// }

// let curryingString = currying(isType)('String')
// console.log(curryingString('aaa'))

// utils[`is${type}`] = currying(isType);

//addCurry(1)(2)(3)(4)=10; 实现addCurry

// function add(args) {
//   return args.reduce(function (a, b) {
//     return a + b
//   })
// }

// function curryingFn(fn) {
//   let res = []
//   return function _c(...a) {
//     if (a.length>0) {
//       res = res.concat(a)
//       return _c
//     } else {
//       console.log(res)
//       return fn(res)
//     }
//   }
// }
// var addCurry = curryingFn(add)
// console.log(addCurry(1)(2)(3,5)())

// function curryingFn() {
//   let args = [...arguments]//[1]
//   let add = function () {
//     args = args.concat(...arguments) //[1,2]
//     return add
//   }
//   add.toString = function () {
//     return args.reduce(function (a, b) {
//       return a + b;
//     });
//   }
//   return add
// }

// console.log(curryingFn(1)(2)(2))

//before
// Function.prototype.before = function (before) {
//   return () => {
//     before();
//     this()
//   }
// }
// let fn = function () {
//   console.log('我是fn')
// }
// let newFn = fn.before(() => {
//   console.log('先来执行fn')
// })
// newFn()
// Function.prototype.after = function (after) {
//   return () => {
//     this();
//     after();
//   }
// }

// var fs = require("fs");
// let after = (timer, callback) => () => {
//   console.log(timer)
//   timer--;
//   if (timer == 0) {
//     callback()
//   }
// }
// const newFn = after(2, () => {
//   console.log("完成了");
// });

var fs = require("fs");
let after = function (callback) {
  let timer=0;// 局部变量会常驻在内存中；
  return function () {
    timer++;
    if (timer == 2) {
      callback()
    }
  }
}
const newFn = after(() => {
  console.log("完成了");
});


let readFunc = function (err, data) {
  if (err) {
    return console.error(err);
  }
  console.log(data.toString())
  newFn()
}

fs.readFile('aaa.txt', readFunc);
fs.readFile('bbb.txt', readFunc);








