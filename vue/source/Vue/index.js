import { initState } from './observer'
import Watcher from './observer/watcher'
//这里使用es5的构造函数 而没有使用es6的类是因为构造函数比较方便拓展，可以吧方法写进多个文件
function Vue(options) {
    this._init(options)
}

//vue初始化
Vue.prototype._init = function (options) {
    let vm = this;
    vm.$options = options;
    //MVVM原理 重新初始化数据
    initState(vm)

    //挂载
    if(vm.$options.el){
        this._mount()
    }
}

Vue.prototype._mount = function () {
    let vm = this;
    vm.$el = util.query(vm.$options.el);
    mountComponent(vm, vm.$el)
}
Vue.prototype._update = function (vm, el) {
    console.log('update')
    //创建dom碎片
    let fragment = document.createDocumentFragment();
    let first;
    while (first = el.firstChild) {
        fragment.appendChild(first)
    }
    compile(vm, fragment)
    //插入el
    el.appendChild(fragment)
}
function mountComponent(vm, el) {
    let updateComponent = () => {
        vm._update(vm, el)
    }
    //渲染watcher
    new Watcher(vm, updateComponent)
}
const util = {
    query: function (el) {
        if (typeof el === 'string') {
            return document.querySelector(el)
        } else {
            return el
        }
    },
    getValue(vm, value) {
        let valueArr = value.split('.');
        return valueArr.reduce((prev, next) => {
            return prev[next]
        }, vm)
    }
}

function compile(vm, fragment) {
    if (!fragment.childNodes) return
    fragment.childNodes.forEach(node => {
        if (node.nodeType == 1) {
            compile(vm, node)
        } else if (node.nodeType == 3) {
            compileText(vm, node)
        }
    })
}

function compileText(vm, node) {
    const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g
    node.text = node.text ? node.text : node.textContent
    node.textContent = node.text.replace(defaultTagRE, function () {
        return JSON.stringify(util.getValue(vm, RegExp.$1))
    })
}

export default Vue