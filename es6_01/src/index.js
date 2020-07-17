document.write('nide')
//模块化的好处
/*
1）解决了命名冲突问题
2）提取公共代码模块 
模块化规范
1）commonjs规范 node  想要别人的 require  想给别人 module.exports
2)es6Module es6 想要别人的 import 想给别人 export
3）amd
4)cmd
webpack环境下commonjs和es6module 通用

es6module
1、export 导出的是变量，export default 导出的是值
2、导入变量只能读不能修改
3、导入模块会变量提升
4、导入立即导出 export {y} from './b'
5、动态导入
*/
// console.log(a,obj,n,y)
import obj,{a,n} from './module/a'
import {y} from './module/c'

let btn=document.createElement('button')
btn.innerHTML='点我'
document.body.appendChild(btn);
btn.addEventListener('click',()=>{
  console.log('1')
  import('./module/a.js').then(res=>{
    console.log(res)
  })
})

// setInterval(()=>{
//   console.log(n,obj)
// },1000)






