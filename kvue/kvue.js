class KVue {
  constructor(options) {
    this.$options = options
    this.$data = options.data
    this.$el = options.el
    this.$methods = options.methods
    this.initData(options.data)
    this.initMethods(options.methods)
    new Compile(this, options.el)

    options.created && options.created.call(this)
  }

  initData(data) {
    if (typeof data != 'object' || !data) return
    Object.keys(data).forEach(key => {
      this.observer(data, key, data[key])
      this.proxyData(key)
    })
  }
  initMethods(methods) {
    Object.keys(methods).forEach(key => {
      this.proxyMethod(key)
    })
  }
  observer(obj, key, value) {
    let dep = new Dep()
    Object.defineProperty(obj, key, {
      get: function () {
        Dep.target && dep.addWatch(Dep.target)
        console.log(Dep.target,dep.watchers,key)
        return value
      },
      set: function (newVal) {
        value = newVal
        dep.notify()
      }
    })
    this.initData(value)

  }
  proxyData(key) {
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key];
      },
      set(newVal) {
        this.$data[key] = newVal;
      }
    })
  }
  proxyMethod(key) {
    Object.defineProperty(this, key, {
      get() {
        return this.$methods[key];
      },
      set(newVal) {
        this.$methods[key] = newVal;
      }
    })
  }

}

class Dep {
  constructor() {
    this.watchers = []
  }
  addWatch(watcher) {
    this.watchers.push(watcher)
  }
  notify() {
    this.watchers.forEach(watcher => {
      watcher.updata()
    })
  }
}

class Watcher {
  constructor(vm, key, cb) {
    this.$vm = vm
    this.$key = key
    this.$cb = cb
    Dep.target = this
    vm[key]
    Dep.target = null
  }
  updata() {
    this.$cb.call(this, this.$vm[this.$key])
  }
}
