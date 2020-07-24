/*
使用es5模拟es6
1、判断是不是用new 调用的
2、通过object.defineProperty 定义原型 设置成不可枚举的
2、通过object.defineProperty 定义静态方法 设置成不可枚举的

*/

// function Animal(){
//   this.name='动物'
// }
// Animal.prototype.say=function(){
//   console.log(this.name)
// }
// Animal.eat=function(){
//   console.log('吃')
// }
function define(target,properties){
  properties.forEach(property=>{
    Object.defineProperty(target,property.key,{
      configurable:true,
      enumerable:false,
      ...property
    })
  })
}
function defineProperty(Constructor,protoProperty,staticProperty){
  if(Array.isArray(protoProperty)){
    define(Constructor.prototype,protoProperty)
  }
  if(Array.isArray(staticProperty)){
    define(Constructor,staticProperty)
  }
}
let Animal=(function(){
  function Animal(){
    if(! this instanceof Animal){
      throw new Error('没有用new调用')
    }
    this.name='动物'

  }
  defineProperty(Animal,[{
    key:'say',
    value:function(){
      console.log('say')
    }
  }],[{
    key:'eat',
    value:function(){
      console.log('eat')
    }
  }])
  return Animal
}())

let animal=new Animal()
animal.say()
Animal.eat()
console.log(animal instanceof Animal)