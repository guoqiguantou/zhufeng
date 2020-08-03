import Observer from './observer'
import Watcher from './watcher';
import Dep from './dep';

export function initState(vm) {
    let opts=vm.$options;
    //分别初始化各个类型数据
    if(opts.data){
        initData(vm)
    }
    if(opts.computed){
        initComputed(vm)
    }
    if(opts.watch){
        initWatch(vm)
    }
}
//获取Observer
export function observer(data){
    if(typeof data !== 'object'||data==null){
        return 
    }
    if(data.__ob__){
        return data.__ob__
    }
    return new Observer(data)
}

//代理
function proxy(vm,key){
    Object.defineProperty(vm,key,{
        set(newValue){
            vm._data[key]=newValue
        },
        get(){
            return vm._data[key]
        }
    })
}

//初始化data
function initData(vm){
    //判断用户传入的data是对象还是函数 并给默认值
    let data=vm._data=typeof vm.$options.data =='function'?vm.$options.data.call(this):vm.$options.data||{}
    //添加代理
    for(let key in data){
        proxy(vm,key)
    }
    //给data添加观察
    observer(data)
}


//初始化计算属性
function initComputed(vm){
    let computed=vm._computed=vm.$options.computed;
    for(let key in computed){
        //创建一个watcher啥也不干，只设置了lazy属性
        let watcher=new Watcher(vm,computed[key],()=>{},{lazy:true})//表示是计算属性的watcher
        vm._computed[key]=watcher
        Object.defineProperty(vm,key,{
            get:creatComputedWatch(vm,key,computed[key])
        })
    }
}
/*
计算属性watcher的特点
1) 首次不计算，页面上用到的是时候 才会计算
2) 有懒加载，计算过之后，会直接拿以前旧的值，只有当依赖的值改变的时候，才会去计算新的value
*/

//初始化watch
function initWatch(vm){
    let watch=vm._watch=vm.$options.watch
    for(let key in watch){
        createWatcher(vm, key, watch[key])
    }
}

//创建用户watch
function createWatcher(vm, key, handler){
    return vm.$watch(key, handler)
}

//创建计算属性watch的get
function creatComputedWatch(vm,key,handle){
    //当也去去访问fullName时
    return function(){
        let watcher=vm._computed[key];//获取属性对应的watcher
        if(watcher){
            if(watcher.dirty){//如果watch的dirty是true 就去求值，否则拿上次的值
                console.log('重新求值')
                watcher.evaluate()
            }
            //重新指向渲染watcher
            //这个watcher的deps里面存着firstName和lastName的dep,让这个dep里面存入渲染watcher
            if(Dep.target){
                for(let i=0;i<  watcher.deps.length;i++){
                    watcher.deps[i].depend()
                }
            }
        }
        
        return watcher.value 
    }
}

