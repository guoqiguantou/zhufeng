import { observer } from './index'
import { arrayMethods, observerArray,dependArray } from './array'
import Dep from './dep'
function defineReactive(obj, key, value) {
    let childOb=observer(value)//引用类型就有返回值 [] {} ,返回值是Observer实例{value:value:dep:Observer}
    let dep=new Dep() //一个属性对应一个dep
    
    Object.defineProperty(obj, key, {
        set(newValue) {
            if (value === newValue) { return }//判断数据没变不进行修改
            observer(newValue)//对新增的属性值进行监控
            value = newValue
            dep.notify()
        },
        get() {
            if(Dep.target){ //这时候是渲染watch
                dep.depend() //将渲染watch 添加到dep的watchers
                if(childOb){    //判断是不是数组 或者对象(对象添加也没事，dep会过滤掉)
                    childOb.dep.depend()    //childOb={value:value:dep:Observer} 
                    if(Array.isArray(value)){
                        dependArray(value)
                    }
                }
            }
            return value
        }
    })
}

class Observer {
    constructor(data) {//这里的data指的是vm._data
        this.dep = new Dep()
        this.value=data
        //给每一个值添加一个__ob__指向Observer对象
        //作用是 数组获取dep

        Object.defineProperty(data, '__ob__', {
            get:()=>this// data.__ob__= {value:data:dep:Observer}//后续数组通知 也是找这个dep
        })
        //判断如果是数组 拦截数组方法
        if (Array.isArray(data)) {
            data.__proto__ = arrayMethods
            observerArray(data)
        } else {
            this.walk(data)
        }
    }

    walk(data) {
        Object.keys(data).forEach(key => {
            defineReactive(data, key, data[key])
        })
    }
}
export default Observer