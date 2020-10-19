//number boolean string
let sname:string='aaaa'
let bol:boolean =false
let age:number=12


//数组Array
//1、Array<number>
//2、string[]
let arr:string[]=['q','b']
let arr2:Array<number>=[1,2,3,4,5]

//元祖 Tuple 
//确定的个数和类型
let x:[string,number]=['aaa',12]


//枚举 enum
enum Color{Red='red',Blue='blue',Green='green'}
let y:Color.Red //red

//void 没有任何类型
//函数没有返回值
function getname(name:string):void{
    console.log(name)
}

//any 任何类型
let any:any=['sss',1212,'sss']

//never 永远不存在的值的类型
//返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}

//undefined null
//默认情况下null和undefined是所有类型的子类型。 就是说你可以把 null和undefined赋值给number类型的变量。
//需要设置     "strictNullChecks": false,              /* Enable strict null checks. */
age=undefined

let un:undefined=null;
let nu:null=null;
nu=undefined;


//断言
// 1、as 
// 2、<>
let str:any='111111'
let strLen:number=(str as string).length;
let strLen2:number=(<string>str).length;


