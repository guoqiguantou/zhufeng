let obj = {
  name: '张三',
  age: {
    count: 20
  }
}

let newObj=new Proxy(obj,{
  set(target,key,value,receiver){
    console.log('set',key)
    return Reflect.set(target, key, value,receiver)
  },
  get(target,key,receiver){
    console.log('get',key)
    return Reflect.get(target, key, receiver)
  }
})
newObj.name='李四'
newObj.age.count=18
console.log(newObj.name)




















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