import { observer } from './index'
import { arrayMethods, observerArray } from './array'
import Dep from './dep'
function defineReactive(obj, key, value) {
    observer(value)
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
                dep.depend(Dep.target) //将渲染watch 添加到dep的watchers
            }
            return value
        }
    })
}

class Observer {
    constructor(data) {//这里的data指的是vm._data
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