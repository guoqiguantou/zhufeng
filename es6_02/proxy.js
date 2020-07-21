let obj = {
  name: '张三',
  age: {
    count: 20
  }
}
let handle={
  set(target,key,value,receiver){
    console.log('set',key)
    return Reflect.set(target, key, value,receiver)
  },
  get(target,key,receiver){
    console.log('get',key)
    if(typeof target[key] =='object'){
      return new Proxy(target[key],handle)
    }
    return Reflect.get(target, key, receiver)
  }
}

// let newObj=new Proxy(obj,handle)
// newObj.name='李四'
// newObj.age.count=18
// console.log(newObj.name)

let arr=[1,2,3,4]
let newArr=new Proxy(arr,handle)
newArr.push(676)
console.log(arr)




















// var obj1 = new Proxy({}, {
//   get: function (target, propKey, receiver) {
//     console.log(`getting ${propKey}!`);
//     return Reflect.get(target, propKey, receiver);
//   },
//   set: function (target, propKey, value, receiver) {
//     console.log(`setting ${propKey}!`);
//     return Reflect.set(target, propKey, value, receiver);
//   }
// });