/*
用es5模拟es6类
1、判断调用构造函数只能用new 
2、通过Object.defineProperty 添加原型方法 配置原型方法不可以枚举 
3、通过Object.defineProperty 添加静态方法
*/
function define(target,property){
    property.forEach(item => {
        Object.defineProperty(target,item.key,{
            configurable:true,
            enumerable:false,
            value:item.value
        })
    });
}
function defineProperty(Constructor,protoProperty,staticProperty){
    if(Array.isArray(protoProperty)){
        define(Constructor.prototype,protoProperty)
    }
    if(Array.isArray(staticProperty)){
        define(Constructor,staticProperty)
    }
}
var Animal=(function(){
    function Animal(){
        if(!(this instanceof Animal)){
            throw new Error('需要用new来调用')
        }
        this.name='张三'
        
    }
    defineProperty(Animal,[{
        key:'say',
        value:function(){
            console.log(this.name)
        }
    },{
        key:'eat',
        value:function(){
            console.log('eat')
        }
    }],[{
        key:'say',
        value:function(){
            console.log('今天')
        }
    },{
        key:'a',
        value:'111'
    }])
    
    return Animal
}())

// function Animal(){
//     this.name='张三'
// }
// Animal.prototype.say=function(){
//     console.log(this.name)
// }

//实现es6类
let obj= new Animal()
console.log(Animal.prototype)
obj.say()
console.log(Animal.a)