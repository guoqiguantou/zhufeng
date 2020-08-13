import $ from 'jquery';
import {createUnit} from './unit'
const React = {
  reactRootId: 0,
  render,
  createElement
}

//渲染节点
function render(element, container) {
  let htmlStr=createUnit(element).getHtmlStr(React.reactRootId);//获取html字符串
  $(container).html(htmlStr);//挂载到节点
}

//创建虚拟节点
function createElement(type,props={},...children){
  props.children=children||[];
  return new Element(type,props)
} 

export class Element{
  constructor(type,props){
    this.type=type;
    this.props=props;
  }
}








export default React