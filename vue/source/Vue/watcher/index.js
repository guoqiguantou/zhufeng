import Dep from '../dep'
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
    this.get()
  }

  addDep(dep) {
    if (!this.depsId.has(dep.id)) {
      this.deps.push(dep);
      this.depsId.add(dep.id)
      dep.add(this)
    }
  }
}

Dep.target = null
const targetStack = []
function pushTarget(watcher) {
  targetStack.push(watcher)
  Dep.target=watcher
}
function popTarget(watcher){
  targetStack.pop(watcher);
  Dep.target=targetStack[targetStack.length-1]
}

export default Watcher