/*
var特点
1、var 会变量提升
2、污染全局变量 挂载到window上
3、不能定义常量

let 
1、块级作用域
2、不存在变量提升，存在暂时性死区
3、不允许重复声明

const
1、定义常量

*/

var a='a'
var a='b'
let aa='88'
// let aa='88'
{
    // console.log(aa) 报错
    // let aa=23
    console.log(aa)
}