//reduce
/*
作业 
1)展平数组  [1,[2,3],[4,[5,6]]]
2)实现reduce

*/

//求和
// function sum(arr){
//  return  arr.reduce((perv,next,index)=>{
//     return perv+next
//   })
// }
// console.log(sum([1,2,3]))

//求和2
function sum2(obj) {
  return obj.reduce((perv, next, index) => {
    return perv + next.num * next.price
  }, 0)
}
// console.log(sum2([{num:2,price:5},{num:4,price:4},{num:1,price:2}]))

//实现 compose 组合函数
function sum(a, b) {
  return a + b
}

function length(str) {
  return str.length
}

function price(num) {
  return '$' + num
}

function com() {
  return price(length(sum('aaaaa', 'bb')))
}

// function compose(fns){
//   return function(...args){
//     let lastFn=fns.pop() //拿出最后一个函数 
//     return fns.reduceRight((prev,next)=>{
//       return next(prev)
//     },lastFn(...args))
//   }
// }

function compose(fns) {
  return fns.reduceRight((prev, next) => {
    return (...args) => {
      return next(prev(...args))
    }
  })
}

// compose([price,length,sum])('aaaaa','bb')
// console.log(compose([price,length,sum])('aaaaa','bb'))


function flat(arr, num) {
  return num > 0 ? arr.reduce((prev, next) => {
    return prev.concat(Array.isArray(next) ? flat(next, num - 1) : next)
  }, []) : arr.slice()
}
let f1 = flat([[1, [2], [3, [4, [5]]]]], 2);//[1,2,3,4,5]

// console.log(f1)

/*


*/
Array.prototype.myReduce=function(callback,init){
  for(let i=0;i<this.length;i++){
    if(init){
      init=callback(init,this[i],i,this)
    }else{
      init=callback(this[i],this[i+1],i,this)
      i++
    }
  }
  return init
}

function sum(arr) {
  return arr.myReduce((perv, next, index) => {
    console.log(perv, next, index)
    return perv + next
  })
}
console.log(sum([1, 5, 3,8,3]))
