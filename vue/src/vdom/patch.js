export function render(vnode, container) {
    createElement(vnode)
    container.appendChild(vnode.el)
}

//创建节点
function createElement(vnode) {
    if (vnode.tag) {
        vnode.el = document.createElement(vnode.tag)
    } else {
        vnode.el = document.createTextNode(vnode.text)
    }
    vnode.children && vnode.children.forEach(item => {
        render(item, vnode.el)
    })
    createProperties(vnode)
    return vnode.el
}

//创建属性和对比属性
function createProperties(vnode, oldProps={}) {
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
        if (newPropsStyle.hasOwnProperty(key)) {
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
        oldNode.el.parentNode.replaceChild(createElement(newNode),oldNode.el); 
    }
    //2)判断是不是都是文本 文本直接替换文本
    if(!oldNode.tag){
        if(oldNode.text!==newNode.text){
            oldNode.el.textContent=newNode.text;
        }
    }
    //3)判断是不是都是一样的标签 标签一样可复用
    let el=newNode.el=oldNode.el;
    //更新属性
    createProperties(newNode, oldNode.props)
    //比较子节点
    //1)老节点有子节点并且新节点有子节点
    //2)老节点有子节点并且新节点没有子节点
    //3)老节点没有子节点并且新节点有子节点
    let oldChildren=oldNode.children||[];
    let newChildren=newNode.children||[];

    if(newChildren.length>0&&oldChildren.length>0){
        updateChildren(el,oldChildren,newChildren)
    }else if(newChildren.length>0){
        newChildren.forEach(item=>{
            el.appendChild(createElement(item))
        })
    }else if(oldChildren.length>0){
        oldNode.el.innerHTML=''
    }
}

//判断节点相同
function sameVNode(oldVnode,newVnode){
    return oldVnode.tag&&(oldVnode.tag === newVnode.tag)&&(oldVnode.key === newVnode.key)
}

//比较子节点
function updateChildren(el,oldChildren,newChildren){
    let oldStartIndex=0;
    let oldStartVNode=oldChildren[oldStartIndex];
    let oldEndIndex=oldChildren.length-1;
    let oldEndVNode=oldChildren[oldEndIndex];

    let newStartIndex=0;
    let newStartVNode=newChildren[newStartIndex];
    let newEndIndex=newChildren.length-1;
    let newEndVNode=newChildren[newEndIndex];

    while(oldStartIndex<=oldEndIndex&&newStartIndex<=newEndIndex){
        if(sameVNode(oldStartVNode,newStartVNode)){
            patch(oldStartVNode,newStartVNode)
            oldStartVNode=oldChildren[++oldStartIndex];
            newStartVNode=newChildren[++newStartIndex];
        }else if(sameVNode(oldEndVNode,newEndVNode)){
            patch(oldEndVNode,newEndVNode)
            oldEndVNode=oldChildren[--oldEndIndex];
            newEndVNode=newChildren[--newEndIndex];
        }else if(sameVNode(oldStartVNode,newEndVNode)){
            // patch(oldStartVNode,newEndVNode)
            el.insertBefore(oldStartVNode.el,oldEndVNode.el.nextSiblings)
            oldStartVNode=oldChildren[++oldStartIndex];
            newEndVNode=newChildren[--newEndIndex];
            console.log(oldStartIndex)
        }
    }

    if(newStartIndex<=newEndIndex){
        for(let i=newStartIndex;i<=newEndIndex;i++){
            let ele=newChildren[newEndIndex+1]?newChildren[newEndIndex+1].el:null
            el.insertBefore(createElement(newChildren[i]),ele)
        }
    }


}