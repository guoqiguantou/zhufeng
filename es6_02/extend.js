/*
继承
1、继承构造函数属性 只有一种方法 构造函数内调用父类构造函数 并绑定this Animal.call(this)
2、继承原型链属性 （实例方法实例属性）
  1) 子类原型的__proto__指向父类原型
  2) 利用Object.create() 将子类原型指向父类原型对象
3、继承静态属性和方法 子类构造函数__proto__ 指向父类


*/

function Animal() {
  this.name = '动物'
}
Animal.prototype.say = function () {
  console.log('say')
}
Animal.eat = function () {
  console.log('eat')
}
Animal.aa='aa'

function Tiger() {
  Animal.call(this) //继承构造函数

}

// Tiger.prototype=Animal.prototype //这种方式不对 这是混合不是继承 修改子类原型，会影响父类原型
// Tiger.prototype.__proto__=Animal.prototype //方法一
function create(target, property) {
  function Fn() { }
  Fn.prototype = target
  let fn = new Fn()
  Object.defineProperty(fn, 'constructor', { value: Tiger, writable: true, configurable: true })
  return fn
}
Tiger.prototype = create(Animal.prototype, { constructor: { value: Tiger, writable: true, configurable: true } }) //方法二

Tiger.prototype.toString = function () {
  console.log(12)
}

Tiger.__proto__ = Animal //继承静态属性和方法

let tiger = new Tiger;
let animal = new Animal;
console.log(Animal.prototype)
console.log(Animal)
Tiger.eat()


//实例的属性和方法 