let obj={
    name:{
        school:'zf',
        age:23,
        arr:{
            name:'aa'
        }
    },
    arr:[1,2,3,4]
}

let handel={
    set(target,key,value){
       console.log('设置',key)
        //  target[key]=value
    Reflect.set(target,key,value)
    
    },
    get(target,key){
        console.log('获取',key)
        if(typeof target[key]=='object'&&target[key]!=undefined){
            return new Proxy(target[key],handel)
        }
        return Reflect.get(target,key)
        // return target[key]
    }
}

let proxy=new Proxy(obj,handel)
// proxy.name.school=12
// console.log('==========')
// console.log(proxy.name.school)
proxy.arr.push(111)