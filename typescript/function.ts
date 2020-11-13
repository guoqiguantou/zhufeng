//箭头函数
const myBooks = ['aa', 'bb']
myBooks.forEach((item:string):void => console.log('reading'));

//函数类型

type func=(name:string,age:number)=>void
let fn:func=function(){

}
//可选参数和默认参数 可选参数必须放在最后
function getInfo(name:string,age:number=18,sex?:string):void{
    console.log(name,age,sex)
}
getInfo('张三')

//剩余参数
function getItem(name:string,...item:number[]){
    console.log(item)
}
getItem('zhang',12,34,12)