//节点类型
let htmlFlagType = {
  TEXT: 'TEXT',
  HTML: 'HTML',
  COMPONENT: 'COMPONENT'
}
//子节点类型
let childrenFlagType = {
  TEXT: 'TEXT',
  MULTIPLE: 'MULTIPLE',
  EMPTY: 'EMPTY',
}
/*
createElement('div', {class:'app1'},[
      createElement('p', { key: 'a'}, 'A'),
])
{
  tag:'div',
  data: {class:'app1'},
  flag:htmlFlagType.HTML,
  childrenFlag:childrenFlagType.MULTIPLE,
  children:[
    {
      tag:'p',
      data: {key:'a'},
      flag:htmlFlagType.HTML,
      childrenFlag:childrenFlagType.TEXT,
      children:[
        {
          tag:null,
          data: null,
          flag:htmlFlagType.TEXT,
          childrenFlag:childrenFlagType.EMPTY,
          children:'A'
        }
      ]
    }
  ]
}
*/
//创建虚拟dom
function createElement(tag,data,children){
  let flag,childrenFlag;
  if(typeof tag =='string'){
    flag=htmlFlagType.HTML
  }else{
    flag=htmlFlagType.TEXT
  }
  if(children){
    if(typeof children =='string'){
      childrenFlag=childrenFlagType.TEXT
      children={
        tag:null,
        data:null,
        flag:htmlFlagType.TEXT,
        childrenFlag:childrenFlagType.EMPTY,
        children:children
      }
    }else if(Array.isArray(children)){
      childrenFlag=childrenFlagType.MULTIPLE
    }
  }else{
    childrenFlag=childrenFlagType.EMPTY
  }
  
  return{
    tag,
    data,
    flag,
    childrenFlag,
    children
  }
}

//渲染
function render(vnode, container){
  let oldNode=container.vnode
  if(oldNode){
    patch(oldNode, vnode, container)
  }else{
    mount(vnode,container)
  }
  
  container.vnode=vnode;
}

//根据虚拟dom挂载到真实dom
function mount(vnode,container){
  if(vnode.flag==htmlFlagType.HTML){
    mountElement(vnode,container)
  }else{
    mountText(vnode,container)
  }
}

//创建节点
function mountElement(vnode,container){
  let dom=document.createElement(vnode.tag);//创建div dom节点
  vnode.el=dom;//将真实节点添加到虚拟dom

  //设置属性
  if(vnode.data&&typeof vnode.data == 'object'){
    Object.keys(vnode.data).forEach(key=>{
      setAttribute(dom,key,vnode.data[key])
    })
  }
  

  if(vnode.childrenFlag==childrenFlagType.TEXT){
    mountText(vnode.children,dom)
  }else if(vnode.childrenFlag==childrenFlagType.MULTIPLE){
    vnode.children.forEach(item=>{
      mount(item,dom)
    })
  }
  container.appendChild(dom)
}

//创建文本
function mountText(vnode,container){
  let textDom=document.createTextNode(vnode.children);
  vnode.el=textDom;//将真实节点添加到虚拟dom
  container.appendChild(textDom)
}

//设置属性
function setAttribute(el,key,value){
  switch (key){
    case 'class':el.className = value;break;
    case 'style':
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        el.style[key]=value[key]
      }
    }
    break;
    default:
      //如果是绑定事件
      if (key[0] == '@') {
        el.addEventListener(key.split('@')[1],value)
      }else{
        el.setAttribute(key,value)
      }
  }
}

//新旧节点比较
/*
比较节点类型
1、节点类型不同 直接替换
2、节点相同 是文本节点 直接替换文本
3、节点相同 不是文本
====
比较节点的标签
1、标签不同 div换成span 直接替换
2、标签相同 更换属性 比较子节点
====
比较子节点，更新子节点
1、新的dom没有子节点     老的dom没有子节点 
2、新的dom没有子节点     老的dom存在一个子节点
3、新的dom没有子节点     老的dom存在多个子节点   //清空老dom

4、新的dom存在一个子节点 老的dom没有子节点
5、新的dom存在一个子节点 老的dom存在一个子节点
6、新的dom存在一个子节点 老的dom存在多个子节点  //清空老dom子节点,添加新的dom子节点

7、新的dom存在多个子节点 老的dom没有子节点      //添加新的子节点
8、新的dom存在多个子节点 老的dom存在一个子节点  //清空老dom子节点，添加新的子节点
9、新的dom存在多个子节点 老的dom存在多个子节点  //最复杂

*/
function patch(oldNode,newNode,container){
  console.log(oldNode,newNode,container)
  //
}
