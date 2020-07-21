// let {a,b}={a:1,b:2}

// let [a,b,...arr]=[1,2,3,4]

// console.log(a,b,arr)//1,2,[3,4]

let a1=[1,2,3]
let a2=[3,4,5]

//... 剩余运算符
//...展开运算符


//set
// key和value 是同一个值
// let s1=new Set()
// s1.add(1)
// s1.add(2)
// s1.add(3)
// console.log(s1.entries())

//map 
// key可以是个对象
let m1=new Map()
let obj={name:'张三'}
m1.set(obj,'aaa')
console.log(m1)

//并集 [1,2,3,4,5]
// let arr1=new Set([...a1,...a2]);
// console.log(...arr1)

//交集 [3]
// let arr1=new Set(a1)
// let arr2=new Set(a2)
// let arr=[...arr1].filter(item=>{
//     return arr2.has(item)
// })
// console.log(arr)

//差集 [1,2]
// let arr1=new Set(a1)
// let arr2=new Set(a2)
// let arr=[...arr1].filter(item=>{
//     return !arr2.has(item)
// })
// console.log(arr)