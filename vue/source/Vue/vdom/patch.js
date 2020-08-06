//渲染挂载
export function render(vnode, container) {
    createElement(vnode)
    container.appendChild(vnode.el)
    return vnode.el
}

//创建真实节点
function createElement(vnode) {
    if (typeof vnode.tag == 'string') {
        vnode.el = document.createElement(vnode.tag)
        vnode.children && vnode.children.forEach(item => {
            render(item, vnode.el)
        })
        createProperties(vnode)
    } else {
        vnode.el = document.createTextNode(vnode.text)
    }
    return vnode.el
}

//创建属性和对比属性
function createProperties(vnode, oldProps = {}) {
    let newProps = vnode.props || {};
    let newPropsStyle = newProps.style || {};
    let oldPropsStyle = oldProps.style || {};
    let el = vnode.el;

    //判断旧的属性在不在新的属性里面，没有就删除
    for (const key in oldProps) {
        if (!newProps.hasOwnProperty(key)) {
            delete el.key
        }
    }
    //判断旧的style属性在不在新的style属性里面，没有就删除
    for (const key in oldPropsStyle) {
        if (!newPropsStyle.hasOwnProperty(key)) {
            el.style[key] = ''
        }
    }

    Object.keys(newProps).forEach(key => {
        switch (key) {
            case 'class': vnode.el.className = newProps.class; break;
            case 'style':
                let style = newProps.style;
                Object.keys(style).forEach(item => {
                    vnode.el.style[item] = style[item]
                })
                break;
            default:
                vnode.el[key] = newProps[key]

        }
    })
}

//比较虚拟节点
export function patch(oldNode, newNode) {
    //1)比较标签是不是一样的 不一样直接替换
    if (oldNode.tag !== newNode.tag) {
        oldNode.el.parentNode.replaceChild(createElement(newNode), oldNode.el);
    }
    //2)判断是不是都是文本 文本直接替换文本
    if (!oldNode.tag) {
        if (oldNode.text !== newNode.text) {
            oldNode.el.textContent = newNode.text;
        }
    }
    //3)判断是不是都是一样的标签 标签一样可复用
    let el = newNode.el = oldNode.el;
    //更新属性
    createProperties(newNode, oldNode.props)
    //比较子节点
    //1)老节点有子节点并且新节点有子节点
    //2)老节点有子节点并且新节点没有子节点
    //3)老节点没有子节点并且新节点有子节点
    let oldChildren = oldNode.children || [];
    let newChildren = newNode.children || [];

    if (newChildren.length > 0 && oldChildren.length > 0) {
        updateChildren(el, oldChildren, newChildren)
    } else if (newChildren.length > 0) {
        newChildren.forEach(item => {
            el.appendChild(createElement(item))
        })
    } else if (oldChildren.length > 0) {
        oldNode.el.innerHTML = ''
    }
    return el
}

//判断节点相同
function sameVNode(oldVnode, newVnode) {
    return (oldVnode.tag === newVnode.tag) && (oldVnode.key === newVnode.key)
}

//比较子节点
function updateChildren(el, oldChildren, newChildren) {
    let oldStartIndex = 0;
    let oldStartVNode = oldChildren[oldStartIndex];
    let oldEndIndex = oldChildren.length - 1;
    let oldEndVNode = oldChildren[oldEndIndex];
    let newStartIndex = 0;
    let newStartVNode = newChildren[newStartIndex];
    let newEndIndex = newChildren.length - 1;
    let newEndVNode = newChildren[newEndIndex];
    
    function makeKeyByIndex(children){
        let map={};
        children.forEach((item,index)=>{
            map[item.key]=index
        })
        return map
    }
    let map=makeKeyByIndex(oldChildren)//key和索引的键值对
    while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
        if(oldStartIndex==undefined){
            oldStartVNode = oldChildren[++oldStartIndex];
        }else if(oldEndIndex==undefined){
            oldEndVNode = oldChildren[--oldEndIndex];
        }else if (sameVNode(oldStartVNode, newStartVNode)) {
            //开头和开头比，一样的话 两个开始指标往后移（后面插入）
            patch(oldStartVNode, newStartVNode)
            oldStartVNode = oldChildren[++oldStartIndex];
            newStartVNode = newChildren[++newStartIndex];
        } else if (sameVNode(oldEndVNode, newEndVNode)) {
            //结束和结束比，一样的话 两个开始指标往前面移（前面插入）
            patch(oldEndVNode, newEndVNode)
            oldEndVNode = oldChildren[--oldEndIndex];
            newEndVNode = newChildren[--newEndIndex];
        } else if (sameVNode(oldStartVNode, newEndVNode)) {
            //旧的开始和新的结束比 一样的话 旧的开始节点移动到旧的结束节点的后面，旧的开始往后移，新的结束往前移 （倒序）
            patch(oldStartVNode, newEndVNode)
            el.insertBefore(oldStartVNode.el, oldEndVNode.el.nextSibling)
            oldStartVNode = oldChildren[++oldStartIndex];
            newEndVNode = newChildren[--newEndIndex];
        } else if (sameVNode(oldEndVNode, newStartVNode)) {
            patch(oldEndVNode, newStartVNode);
            //旧的结束和新的开始比，一样的话 旧的结束节点移动到旧的开始节点的前面，旧的结束往前移，新的开始往后移（倒序）
            el.insertBefore(oldEndVNode.el, oldStartVNode.el);
            oldEndVNode = oldChildren[--oldEndIndex];
            newStartVNode = newChildren[++newStartIndex];
        }else{
            //两个子节点乱序 不符合上门的特别
            //新的开始节点 跟旧的节点比较，如果存在一样的 就把一样的那个节点移动到旧的开始节点的前面，并且把移动节点置为null，
            //否则就把新节点的开始节点移动到旧的开始节点的前面
            //观察旧的节点是否有剩余节点，有的话就依次删除
            let moveIndex=map[newStartVNode.key];
            if(moveIndex==undefined){
                el.insertBefore(createElement(newStartVNode),oldStartVNode.el)
            }else{
                //存在相同节点
                let moveVNode=oldChildren[moveIndex]
                el.insertBefore(moveVNode.el,oldStartVNode.el)
                patch(moveVNode,oldStartVNode)
                oldChildren[moveIndex]=undefined
            }
            newStartVNode=newChildren[++newStartIndex]

        }
    }
    
    //新的节点中间还要剩余节点，依次插入
    if (newStartIndex <= newEndIndex) {
        for (let i = newStartIndex; i <= newEndIndex; i++) {
            let ele = newChildren[newEndIndex + 1] ? newChildren[newEndIndex + 1].el : null
            el.insertBefore(createElement(newChildren[i]), ele)
        }
    }

    //旧的节点中间还有剩余节点，依次删除
    if (oldStartIndex <= oldEndIndex) {
        for (let i = oldStartIndex; i <= oldEndIndex; i++) {
            let child=oldChildren[i]
            if(child!=undefined){
                el.removeChild(child.el)
            }
        }
    }

}