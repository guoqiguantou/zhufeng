import Dep from './dep'
import util from '../util'

/*
watcher一共有三种，渲染watcher、用户定义的watcher、计算属性watcher

*/

let id = 0
class Watcher {
  constructor(vm, expOrFn, cd, options) {
    this.vm = vm;
    this.expOrFn = expOrFn;
    this.cd = cd || function () { };
    this.options = options || {};
    this.id = id++;
    this.deps = []
    this.depsId = new Set;

    this.lazy = this.dirty = this.options.lazy;//表示是计算属性watcher
    this.user = this.options.user;//表示是用户定义的watcher
    //判断是表达式还是函数，表达式就包装成函数
    if (typeof expOrFn == 'function') {
      this.getter = expOrFn;
    } else {
      this.getter = () => util.getValue(vm, expOrFn);
    }
    this.value = this.lazy ? undefined : this.get();//计算属性默认不去求值
  }
  get() {
    let value
    pushTarget(this)
    value = this.getter.call(this.vm, this.vm)
    popTarget(this)
    return value
  }
  update() {
    //向队列中推入这个watcher
    queueWatcher(this)
    //如果是计算属性，更新之后重新求值
    if (this.lazy) {
      this.dirty = true;
    }
  }

  addDep(dep) {
    if (!this.depsId.has(dep.id)) {
      this.deps.push(dep);
      this.depsId.add(dep.id)
      dep.add(this)
    }
  }

  //执行watch
  run() {
    let value = this.get()
    const oldValue = this.value
    this.value = value;
    if (this.user) {
      this.cd.call(this.vm, value, oldValue)
    }
  }

  //计算
  evaluate() {
    this.value = this.get();
    this.dirty = false;

  }

  depend() {
    for (let i = 0; i < this.deps.length; i++) {
      this.deps[i].depend()
    }
  }
}

Dep.target = null
const targetStack = []
function pushTarget(watcher) {
  targetStack.push(watcher)
  Dep.target = watcher
}
function popTarget(watcher) {
  targetStack.pop(watcher);
  Dep.target = targetStack[targetStack.length - 1]
}


let has = {}
let queue = []
function queueWatcher(watcher) {
  let id = watcher.id;
  //如果队列里面没有 就添加watcher
  if (has[id] == null) {
    has[id] = true;
    queue.push(watcher)
    nextTick(flushSchedulerQueue)
  }
}

function flushSchedulerQueue() {
  queue.forEach(watcher => {
    watcher.run()
  });
  //执行完清空队列
  has = {}
  queue = []
}

function nextTick(cb) {
  //微任务优先宏任务
  //首先判断是否支持promise,
  //然后判断 MutationObserver 监听dom变化 Mutation Observer则是异步触发，DOM发生变动以后，并不会马上触发，而是要等到当前所有DOM操作都结束后才触发。
  if (typeof Promise !== 'undefined' && typeof Promise === 'function') {
    Promise.resolve().then(cb)
    return
  }
  if (typeof MutationObserver !== 'undefined' && typeof MutationObserver === 'function') {
    const observer = new MutationObserver(cb)
    const textNode = document.createTextNode('1')
    observer.observe(textNode, {
      characterData: true
    })
    textNode.data = String('2')
    return
  }
  if (typeof setImmediate !== 'undefined' && typeof setImmediate === 'function') {
    setImmediate(cb)
    return
  }
  setTimeout(cb, 0)
}
export default Watcher