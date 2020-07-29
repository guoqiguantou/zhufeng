//重写数组方法 pop shift unshift push splice sort reverse

import { observer } from ".";

let oldProtoMethods = Array.prototype;
export let arrayMethods = Object.create(oldProtoMethods);

let arrMethods = [
    'pop',
    'shift',
    'unshift',
    'push',
    'sort',
    'splice',
    'reverse'
]
//观察数组
export function observerArray(insert) {
    for (let i = 0; i < insert.length; i++) {
        observer(insert[i])
    }
}
//数组通知
export function dependArray(value) {
    for (let i = 0; i < value.length; i++) {
        value[i].__ob__ && value[i].__ob__.dep.depend()
        if (Array.isArray(value[i])) {
            dependArray(value[i])
        }
    }
}
arrMethods.forEach(method => {
    arrayMethods[method] = function (...args) {
        let r = oldProtoMethods[method].apply(this, args)

        let insert;
        //对新增属性再次进行监控
        switch (method) {
            case 'push':
            case 'unshift': insert = args;
                break;
            case 'splice': insert = args[2]
        }
        if (insert) {
            observerArray(insert)
        }
        this.__ob__.dep.notify();//数组监听

        return r;
    }
})