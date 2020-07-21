let obj = {
  name: '张三',
  age: {
    count: 20
  }
}
function observer(obj) {
  if(typeof obj != 'object')return 
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      defineProperty(obj, key, obj[key])
    }
  }
}
function defineProperty(obj, key, value) {
  Object.defineProperty(obj, key, {
    set(newValue) { 
      update(key)
      value=newValue
      observer(newValue)
    },
    get() {
      return value
    }
  })
  observer(value)
}
function update(key){
  console.log(key+'更新了')
}
observer(obj)
// obj.name='李四'
obj.age.count='11'
obj.age={aa:'a'}
obj.age.aa='11'
console.log(obj)