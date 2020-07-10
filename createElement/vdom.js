let htmlFlagType = {
  TEXT: 'TEXT',
  HTML: 'HTML',
  COMPONENT: 'COMPONENT'
}

let childrenFlagType = {
  TEXT: 'TEXT',
  // SINGLE: 'SINGLE',
  MULTIPLE: 'MULTIPLE',
  EMPTY: 'EMPTY',
}

//创建虚拟dom
function createElement(tag, data, children) {
  let flag, childrenFlag;
  if (typeof tag == 'string') {
    flag = htmlFlagType.HTML
  } else if (typeof tag == 'function') {
    flag = htmlFlagType.COMPONENT
  }
  if (children) {
    if (typeof children == 'string') {
      childrenFlag = childrenFlagType.TEXT
      children = {
        tag: null,
        data: null,
        flag: htmlFlagType.TEXT,
        childrenFlag: childrenFlagType.EMPTY,
        children
      }
    } else if (Array.isArray(children)) {
      if (children.length == 0) {
        childrenFlag = childrenFlagType.EMPTY
      } else {
        childrenFlag = childrenFlagType.MULTIPLE
      }
    }
  } else {
    childrenFlag = childrenFlagType.EMPTY
  }

  return {
    tag,
    data,
    flag,
    childrenFlag,
    children,
    el: null
  }
}


function render(vnode, container) {
  let oldNode = container.vnode;
  // 判断是不是首次挂载
  if (oldNode) {
    console.log('再次渲染')
    patch(oldNode, vnode, container)
  } else {
    console.log('首次渲染')
    mount(vnode, container)
  }
  container.vnode = vnode
}

function mount(vnode, container, refNode) {
  if (vnode.flag == htmlFlagType.HTML) {
    mountElement(vnode, container, refNode)
  } else if (vnode.flag == htmlFlagType.TEXT) {
    mountText(vnode, container)
  }
}

function mountElement(vnode, container, refNode) {
  let dom = document.createElement(vnode.tag)
  vnode.el = dom
  //设置属性
  if (vnode.data && typeof vnode.data == 'object') {
    Object.keys(vnode.data).forEach(key => {
      setAttribute(vnode.el, key, vnode.data[key])
    })
  }
  //设置子元素
  if (vnode.childrenFlag != childrenFlagType.EMPTY) {
    if (vnode.childrenFlag == childrenFlagType.TEXT) {
      vnode.children.el = dom
      mount(vnode.children, dom)
    } else {
      vnode.children.forEach(child => {
        child.el = dom
        mount(child, dom)
      })
    }
  }
  //挂载
  refNode ? container.insertBefore(dom, refNode) : container.appendChild(dom)
}

function mountText(vnode, container) {
  let dom = document.createTextNode(vnode.children)
  vnode.el = dom
  container.appendChild(dom)
}

//设置属性
function setAttribute(el, key, newValue, oldValue) {
  switch (key) {
    case 'style':
      for (let k in newValue) {
        el.style[k] = newValue[k]
      };
      for (let k in oldValue) {
        if (!newValue.hasOwnProperty(k)) {
          el.style[k] = ''
        }
      };
      break;
    case 'class': if (oldValue != newValue) {
      el.className = newValue;
    }
      break;
    default:
      if (key[0] == '@') {
        //删除旧的事件
        if (oldValue) {
          el.removeEventListener(key.slice(1), oldValue)
        }
        //添加新的事件
        if (newValue) {
          el.addEventListener(key.slice(1), newValue)
        }
      } else {
        // 当做 Attr 处理
        el.setAttribute(key, newValue)
      }
  }
}

function patch(oldNode, newNode, container) {
  const nextFlags = newNode.flag
  const prevFlags = oldNode.flag
  if (prevFlags !== nextFlags) {
    // 直接替换 节点类型改变了
    replaceVNode(oldNode, newNode, container)
  } else if (nextFlags == htmlFlagType.HTML) {
    //类型没变 是元素节点
    patchElement(oldNode, newNode, container)
  } else if (nextFlags == htmlFlagType.TEXT) {
    //类型没变 是文本节点
    patchText(oldNode, newNode)
  }
}

function replaceVNode(oldNode, newNode, container) {
  container.removeChild(oldNode.el)
  mount(newNode, container)
}

function patchText(prevVNode, nextVNode) {
  // 拿到文本节点 el，同时让 nextVNode.el 指向该文本节点
  const el = (nextVNode.el = prevVNode.el)
  // 只有当新旧文本内容不一致时才有必要更新
  if (nextVNode.children !== prevVNode.children) {
    el.nodeValue = nextVNode.children
  }
}


function patchElement(oldNode, newNode, container) {
  if (oldNode.tag !== newNode.tag) {
    replaceVNode(oldNode, newNode, container)
    return
  }
  // 拿到 el 元素，注意这时要让 nextVNode.el 也引用该元素
  const el = (newNode.el = oldNode.el)

  //修改属性
  if (newNode.data && typeof newNode.data == 'object') {
    Object.keys(newNode.data).forEach(key => {
      setAttribute(el, key, newNode.data[key], oldNode.data[key])
    })
  }
  console.log(newNode)

  // 调用 patchChildren 函数递归的更新子节点
  patchChildren(
    oldNode.childrenFlag, // 旧的 VNode 子节点的类型
    newNode.childrenFlag, // 新的 VNode 子节点的类型
    oldNode.children, // 旧的 VNode 子节点
    newNode.children, // 新的 VNode 子节点
    el // 当前标签元素，即这些子节点的父节点
  )
}

function patchChildren(prevChildFlags,
  nextChildFlags,
  prevChildren,
  nextChildren,
  container) {
  /*
      1 新dom存在多个子节点 老dom存在多个子节点  最复杂情况****
      2 新dom存在多个子节点 老dom存在一个子节点  清空老dom文本  然后加入dom子节点
      3 新dom存在多个子节点 老dom不存在子节点    清空老dom文本  然后加入dom子节点

      4 新dom存在一个子节点 老dom存在多个子节点  
      5 新dom存在一个子节点 老dom存在一个子节点  
      6 新dom存在一个子节点 老dom不存在子节点    清空老dom节点 然后加入dom子节点

      7 新dom不存在子节点 老dom存在多个子节点    
      8 新dom不存在子节点 老dom存在一个子节点   
      9 新dom不存在子节点 老dom不存在子节点      清空老dom节点
  */

  switch (nextChildFlags) {
    case childrenFlagType.MULTIPLE:
      switch (prevChildFlags) {
        case childrenFlagType.MULTIPLE:
          console.log('复杂情况')
          /*
            首先对新集合的节点进行循环遍历，for (name in nextChildren)，通过唯一 key 可以判断新老集合中是否存在相同的节点，
            if (prevChild === nextChild)，如果存在相同节点，
            但在移动前需要将当前节点在老集合中的位置与 lastIndex 进行比较，
            if (child._mountIndex < lastIndex)，则进行节点移动操作，否则不执行该操作。
            
            这是一种顺序优化手段，lastIndex 一直在更新，表示访问过的节点在老集合中最右的位置（即最大的位置）
            ，如果新集合中当前访问的节点比 lastIndex 大，说明当前访问节点在老集合中就比上一个节点位置靠后，
            则该节点不会影响其他节点的位置，因此不用添加到差异队列中，即不执行移动操作，只有当访问的节点比 lastIndex 小时，才需要进行移动操作。
          */

          let lastIndex = 0;
          for (let i = 0; i < nextChildren.length; i++) {
            let find = false;
            let j = 0;
            for (j; j < prevChildren.length; j++) {
              if (prevChildren[j].data.key == nextChildren[i].data.key) {
                //存在相同的节点
                find = true;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                patch(prevChildren[j], nextChildren[i], container)
                if (lastIndex > j) {
                  // 需要移动
                  const refNode = nextChildren[i - 1].el.nextSibling
                  container.insertBefore(prevChildren[j].el, refNode)
                } else {
                  lastIndex = j;
                }
              }
            }
            if (!find) {
              // 挂载新节点 
              const refNode = i < 1 ? prevChildren[0].el : nextChildren[i - 1].el.nextSibling
              mount(nextChildren[i], container, refNode)
            }
          }

          //删除
          for (let i = 0; i < prevChildren.length; i++) {
            const prevVNode = prevChildren[i]
            const has = nextChildren.find(
              nextVNode => nextVNode.data.key == prevVNode.data.key
            )
            if (!has) {
              container.removeChild(prevVNode.el)
            }
          }
          break;
        case childrenFlagType.TEXT:
          container.removeChild(prevChildren.el)
          for (let i = 0; i < nextChildren.length; i++) {
            mount(nextChildren[i], container)
          }
          break;
        case childrenFlagType.EMPTY:
          for (let i = 0; i < nextChildren.length; i++) {
            mount(nextChildren[i], container)
          }
          break;
      }
      break;
    case childrenFlagType.TEXT:
      switch (prevChildFlags) {
        case childrenFlagType.MULTIPLE:
          for (let i = 0; i < prevChildren.length; i++) {
            container.removeChild(prevChildren[i].el)
          }
          mount(nextChildren, container)
          break;
        case childrenFlagType.TEXT:
          container.removeChild(prevChildren.el)
          mount(nextChildren, container)
          break;
        case childrenFlagType.EMPTY:
          mount(nextChildren, container)
          break;
      }
      break;
    case childrenFlagType.EMPTY:
      switch (prevChildFlags) {
        case childrenFlagType.MULTIPLE:
          for (let i = 0; i < prevChildren.length; i++) {
            container.removeChild(prevChildren[i].el)
          }
          break;
        case childrenFlagType.TEXT:
          container.removeChild(prevChildren.el)
          break;
        case childrenFlagType.EMPTY:
          break;
      }
      break;
  }


}