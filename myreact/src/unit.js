import $ from 'jquery';

class Unit {
  constructor(element) {
    this._element = element;
  }
}
//字符串
class TextUnit extends Unit {
  getHtmlStr(reactId) {
    this._reactId = reactId;
    return `<span data-reactId=${reactId}>${this._element}</span>`
  }
}

//真实dom元素
class DomUnit extends Unit {
  getHtmlStr(reactId) {
    this._reactId = reactId;
    let { type, props } = this._element;
    let domStart = `<${type} `
    let domEnd = `</${type}>`
    let childStr = '';
    for (let key in props) {
      if(props.hasOwnProperty(key)){
        if (/^on[A-Za-z]/.test(key)) {
          var eventType = key.replace("on", "");
          $(document).delegate(`[data-reactId='${reactId}']`,eventType,props[key])
        } else if (key === 'className') {
          domStart += ` class ="${props[key]}"`
        } else if (key === 'style') {
          let styleStr = '';
          for (const item in props[key]) {
            styleStr += `${item}: ${props[key][item]};`
          }
          domStart += ` style ="${styleStr}"`
        } else if (key === 'children') {
          props[key].forEach((child, index) => {
            childStr += createUnit(child).getHtmlStr(`${reactId}.${index}`)
          })
        } else {
          domStart += ` ${key}= ${props[key]}`
        }
      }
     
    }
    return domStart + `data-reactId=${reactId} >` + childStr + domEnd;
  }
}

//自定义组件
class ComponentUnit extends Unit{
  getHtmlStr(reactId){
    this._reactId = reactId;
    let {type:component,props }=this._element;
    let componentInstance=new component(props);//组件实例
    componentInstance.componentWillMount&&componentInstance.componentWillMount()
    let componentRender=componentInstance.render();//组件render 返回值  div
    console.log('===========',componentRender)
    let componentUnit=createUnit(componentRender);
    let componentHtml=componentUnit.getHtmlStr(reactId);
    $(document).on('mount', componentInstance.componentDidMount&&componentInstance.componentDidMount)
    return componentHtml;
  }
}

//工厂模式 根据参数类型返回对应的对象
export function createUnit(element) {
  //传入字符串
  if (typeof element == 'string' || typeof element == 'number') {
    return new TextUnit(element)
  }
  //传入真实dom 通过createElement创建的对象
  if (typeof element == 'object' && typeof element.type == 'string') {
    return new DomUnit(element)
  }
  //传入自定义组件 通过createElement创建的对象
  if (typeof element == 'object' && typeof element.type == 'function') {
    return new ComponentUnit(element)
  }


}
