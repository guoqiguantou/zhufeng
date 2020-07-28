import Observer from './observer'

export function initState(vm) {
    let opts=vm.$options;
    //分别初始化各个类型数据
    if(opts.data){
        initData(vm)
    }
    if(opts.computed){
        initComputed()
    }
    if(opts.watch){
        initWatch()
    }
}

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
function initComputed(){

}

//初始化watch
function initWatch(){

}
