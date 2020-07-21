//深拷贝
let obj1={name:'zf',age:{count:{c:20}}}
obj1.ss=obj1
function deepClone(obj,hash=new WeakMap()){
    //判断是不是undefined或者null 是就返回
    //判断是不是 普通类型或者函数 是就返回
    //判断是不是 正则
    //判断是不是 date
    //判断是不是数组或者对象 
    if(obj==undefined){return obj}
    if(typeof obj !=='object'){
       
        return obj
    }
    if(obj instanceof RegExp){
        return new RegExp(obj)
    }
    if(obj instanceof Date){
        return new Date(obj)
    }
    if(hash.has(obj)){
        return hash.get(obj)
    }
    //对象或者数组
    let newObj=new obj.constructor;
    hash.set(obj,newObj)
    for(const key in obj) {
        if (obj.hasOwnProperty(key)) {
            //  newObj[key] = obj[key]; 
             newObj[key] = deepClone(obj[key],hash); 

        }
    }
    return newObj
}
// let a=[1,2,[2,[3]]]
let o1=deepClone(obj1)
obj1.age.count.c=99
console.log(o1)