//number boolean string
var sname = 'aaaa';
var bol = false;
var age = 12;
//数组Array
//1、Array<number>
//2、string[]
var arr = ['q', 'b'];
var arr2 = [1, 2, 3, 4, 5];
//元祖 Tuple 
//确定的个数和类型
var x = ['aaa', 12];
//枚举 enum
//1、数字枚举
var Direction;
(function (Direction) {
    Direction[Direction["NORTH"] = 0] = "NORTH";
    Direction[Direction["SOUTH"] = 1] = "SOUTH";
    Direction[Direction["EAST"] = 2] = "EAST";
    Direction[Direction["WEST"] = 3] = "WEST";
})(Direction || (Direction = {}));
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
var Color;
(function (Color) {
    Color["Red"] = "red";
    Color["Blue"] = "blue";
    Color["Green"] = "green";
})(Color || (Color = {}));
// console.log(Enum.A)
//0
//4、异构枚举
var Enum2;
(function (Enum2) {
    Enum2[Enum2["A"] = 0] = "A";
    Enum2[Enum2["B"] = 1] = "B";
    Enum2["C"] = "C";
    Enum2["D"] = "D";
    Enum2[Enum2["E"] = 8] = "E";
    Enum2[Enum2["F"] = 9] = "F";
})(Enum2 || (Enum2 = {}));
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
function getname(name) {
    console.log(name);
}
//any 任何类型
var any = ['sss', 1212, 'sss'];
//never 永远不存在的值的类型
//返回never的函数必须存在无法达到的终点
function error(message) {
    throw new Error(message);
}
// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}
// 返回never的函数必须存在无法达到的终点
function infiniteLoop() {
    while (true) {
    }
}
//undefined null
//默认情况下null和undefined是所有类型的子类型。 就是说你可以把 null和undefined赋值给number类型的变量。
//需要设置     "strictNullChecks": false,              /* Enable strict null checks. */
age = undefined;
var un = null;
var nu = null;
nu = undefined;
//断言
// 1、as 
// 2、<>
// 3、！ 非空断言
var str = '111111';
var strLen = str.length;
var strLen2 = str.length;
var str11 = 'aaaa';
var b = str11.length;
// let dom: HTMLElement | null = document.getElementById('root');
// console.log(dom.id)
function getStr(str) {
    console.log(str.length);
}
getStr('aa');
var p;
var q;
var abc = {
    x: {
        d: true,
        e: 'semlinker',
        f: 666
    }
};
console.log('abc:', abc);
//在混入多个类型时，若存在相同的成员，且成员类型为非基本数据类型，那么是可以成功合并。
