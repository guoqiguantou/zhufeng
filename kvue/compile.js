class Compile {
  constructor(vm, el) {
    this.$vm = vm;
    this.$el = document.querySelector(el);
    this.init()
  }

  init() {
    this.$fragment = this.fragment(this.$el)
    this.compile(this.$fragment)
    this.$el.appendChild(this.$fragment)
  }
  fragment(app) {
    let fragment = document.createDocumentFragment();
    let child;
    while (child = app.firstChild) {
      fragment.appendChild(child)
    }
    return fragment
  }
  compile(fragment) {
    fragment.childNodes.forEach(node => {
      if (node.nodeType == 1) {
        // console.log(node, '元素节点')
        this.compileNode(node)
      } else if (this.interpolation(node)) {
        this.compileText(node)
      }
      node.childNodes && node.childNodes.length > 0 && this.compile(node)
    })
  }

  interpolation(node) {
    return node.nodeType == 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }

  compileText(node) {
    this.updata(node, RegExp.$1, 'text')
  }

  compileNode(node) {
    Array.from(node.attributes).forEach(item => {
      let value = item.nodeValue
      let name = item.nodeName;
      if (name.indexOf('k-') == 0) {
        let lib = name.substring(2);
        this[lib] && this[lib](node, value)
      } else if (name.indexOf('@') == 0) {
        node.addEventListener(name.substring(1), () => {
          this.$vm[value]()
        })
      }
    })
  }

  text(node, value) {
    this.updata(node, value, 'text')
  }

  model(node, value) {
    this.updata(node, value, 'model')
    node.addEventListener('input', (e) => {
      this.$vm[value] = e.target.value
    })
  }

  html(node, value) {
    this.updata(node, value, 'html')
  }

  updata(node, exp, type) {
    let fn = this[type + 'Updata']
    let vm = this.$vm;
    fn && fn(node, vm[exp])
    new Watcher(vm, exp, function (value) {
      fn && fn(node, value)
    })
  }

  textUpdata(node, val) {
    node.textContent = val
  }

  modelUpdata(node, val) {
    node.value = val
  }

  htmlUpdata(node, val) {
    node.innerHTML = val
  }
}