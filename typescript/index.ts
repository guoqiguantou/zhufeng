//number boolean string
let sname: string = 'aaaa'
let bol: boolean = false
let age: number = 12


//数组Array
//1、Array<number>
//2、string[]
let arr: string[] = ['q', 'b']
let arr2: Array<number> = [1, 2, 3, 4, 5]

//元祖 Tuple 
//确定的个数和类型
let x: [string, number] = ['aaa', 12]


//枚举 enum
//1、数字枚举
enum Direction {
    NORTH,
    SOUTH,
    EAST,
    WEST,
}
// console.log(Direction)
/*
{
  '0': 'NORTH',
  '1': 'SOUTH',
  '2': 'EAST',
  '3': 'WEST',
  NORTH: 0,
  SOUTH: 1,
  EAST: 2,
  WEST: 3
}
*/

//2、字符串枚举
enum Color { Red = 'red', Blue = 'blue', Green = 'green' }
// console.log(Color)
/*
{ Red: 'red', Blue: 'blue', Green: 'green' }
*/

//3、常量枚举
const enum Enum {
    A,
    B,
    C,
}
// console.log(Enum.A)
//0

//4、异构枚举
enum Enum2 {
    A,
    B,
    C = "C",
    D = "D",
    E = 8,
    F,
}
// console.log(Enum2)
/*
{
  '0': 'A',
  '1': 'B',
  '8': 'E',
  '9': 'F',
  A: 0,
  B: 1,
  C: 'C',
  D: 'D',
  E: 8,
  F: 9
}
*/

//void 没有任何类型
//函数没有返回值
function getname(name: string): void {
    console.log(name)
}

//any 任何类型
let any: any = ['sss', 1212, 'sss']

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
age = undefined

let un: undefined = null;
let nu: null = null;
nu = undefined;


//断言
// 1、as 
// 2、<>
// 3、！ 非空断言
let str: any = '111111'
let strLen: number = (str as string).length;
let strLen2: number = (<string>str).length;
let str11: string | undefined = 'aaaa'
let b: number = str11!.length

// let dom: HTMLElement | null = document.getElementById('root');
// console.log(dom.id)

function getStr(str?:any){
    console.log(str!.length)
}
getStr('aa')

//联合类型和类型别名
//联合类型 |
function getaa(str:String|undefined):void{
  console.log(str)
}
//类型别名 type
type SS=string|undefined|null;
type SSS='red'|'blue'|'green'

//交叉类型 &

//1、同名基础类型属性的合并
interface X {
    c: string;
    d: string;
  }
  
  interface Y {
    c: number;
    e: string
  }
  
  type XY = X & Y;
  type YX = Y & X;
  
  let p: XY;
  let q: YX;
//   p.c='111' //string & number=>即成员 c 的类型既可以是 string 类型又可以是 number 类型。很明显这种类型是不存在的，所以混入后成员 c 的类型为 never。


//2、同名非基础类型属性的合并
interface D { d: boolean; }
interface E { e: string; }
interface F { f: number; }

interface A { x: D; }
interface B { x: E; }
interface C { x: F; }

type ABC = A & B & C;

let abc: ABC = {
  x: {
    d: true,
    e: 'semlinker',
    f: 666
  }
};

console.log('abc:', abc);
//在混入多个类型时，若存在相同的成员，且成员类型为非基本数据类型，那么是可以成功合并。
