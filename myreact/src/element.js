//创建虚拟节点
export function createElement(type,props={},...children){
  props.children=children||[];
  return new Element(type,props)
} 

export class Element{
  constructor(type,props){
    this.type=type;
    this.props=props;
  }
}