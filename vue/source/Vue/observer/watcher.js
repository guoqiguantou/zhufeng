import Dep from './dep'
let id = 0
class Watcher {
  constructor(vm, expOrFn, cd, options) {
    this.vm = vm;
    this.expOrFn = expOrFn;
    this.cd = cd || function () { };
    this.options = options || {};
    this.id = id++;
    if (typeof expOrFn == 'function') {
      this.getter = expOrFn;
    }
    this.deps = []
    this.depsId = new Set;
    this.get()

  }
  get() {
    pushTarget(this)
    this.getter()
    popTarget(this)
  }
  update() {
    console.log('queueWatcher')
    //向队列中推入这个watcher
    queueWatcher(this)
  }

  addDep(dep) {
    if (!this.depsId.has(dep.id)) {
      this.deps.push(dep);
      this.depsId.add(dep.id)
      dep.add(this)
    }
  }

  run() {
    this.get()
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