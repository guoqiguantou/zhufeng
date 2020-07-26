let obj1 = { name: 'zf', age: { count: { c: 20 } } }

function deepClone(obj,hash=new WeakMap()) {
  //1、排除 undefined 和 null
  if (obj == undefined) { return obj }

  //2、排除基本类型和函数
  if (typeof obj !== 'object') {
    return obj
  }

  //3、排除时间
  if (obj instanceof Date) {
    return new Date(obj)
  }

  //4、排除正则
  if (obj instanceof RegExp) {
    return new RegExp(obj)
  }
  if(hash.has(obj)){
    return hash.get(obj)
  }
  //对象或数组
  let newObj = new obj.constructor();//[] {}
  hash.set(obj,newObj)
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = deepClone(obj[key])
    }
  }
  return newObj

}

let o1 = deepClone(obj1)
obj1.age.count.c = 99
o1.c=o1
console.log(o1)