/*

实例方法就是只有实例可以调用 实例
静态方法只有构造函数可以调用 构造函数
原型方法是实例和构造函数都可以调用，是共享的方法 原型

*/

// function Animal(){
//   this.name='实例属性'
//   this.eat=function(){
//     console.log('实例方法')
//   }
// }
// Animal.aa=function(){
//   console.log('静态方法')
// }
// Animal.bb='静态属性'

// Animal.prototype.say=function(){
//   console.log(this.name)
// }
// Animal.prototype.name='原型属性'




class Animal{
  constructor(){
    this.name='实例属性'
    this.say=function(){
      console.log('实例方法')
    }
  }
  say2(){
    console.log('原型方法')
  }
  static static2(){
    console.log('静态方法2')
  }
  
}
Animal.prototype.say3=function(){
  console.log('原型方法3')
}
// Animal.static=function(){
//   console.log('静态方法')
// }
let animal=new Animal();
console.log(Animal,Animal.prototype,animal.name)
animal.say3()
Animal.static2()
// Animal.prototype.say()