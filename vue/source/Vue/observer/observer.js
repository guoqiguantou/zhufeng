import { observer } from './index'
import { arrayMethods, observerArray } from './array'
function defineReactive(obj, key, value) {
    observer(value)
    Object.defineProperty(obj, key, {
        set(newValue) {
            if (value === newValue) { return }//判断数据没变不进行修改
            console.log('设置属性' + key)
            observer(newValue)//对新增的属性值进行监控
            value = newValue
        },
        get() {
            console.log('获取属性' + key)
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