import $ from 'jquery';
import {createUnit} from './unit'
import {createElement} from './element'
import Component from './component'
const React = {
  reactRootId: 0,
  render,
  createElement,
  Component
}

//渲染节点
function render(element, container) {
  let htmlStr=createUnit(element).getHtmlStr(React.reactRootId);//获取html字符串
  $(document).trigger('mount')
  $(container).html(htmlStr);//挂载到节点
}


export default React

//父组件 componentWillMount 父组件render 子组件 componentWillMount 子组件render 子组件componentDidMount 父组件componentDidMount
//不管父组件有没有把数据传递给子组件，只要父组件setState，都会走一遍子组件的更新周期。而且子组件被动更新会比主动更新所执行的流程多出来一个componentWillReceiveProps 方法。
//如果 使 shouldComponentUpdate返回false则子组件不会进行更新re-render，所有更新流程都不执行了。