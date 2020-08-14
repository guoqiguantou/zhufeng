import React from './react.js'
function say() {
  console.log('say Hello')
}

{/* <div>
  <span>小王子</span>
  <p>
    <span>未知其实是一种保护</span>
    <span>出去哦</span>
  </p>
</div> */}

// let element = React.createElement(
//   'div',
//   { id: 'app', className: 'cd', style: { background: '#f5f5f5', color: 'blue' } },
//   '小王子',
//   React.createElement(
//     'p',
//     { style: { color: 'pink' }, onclick: say },
//     '未知其实是一种保护',
//     '出去哦'
//   )
// )
class Child extends React.Component{
  componentWillMount(){
    console.log('child渲染前')
  }
  componentDidMount(){
    console.log('child挂载了')
  }
  render() {
    console.log('child-render',this.props.name)
    return <p>{this.props.name}</p>
  }
}
class Count extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 123
    }
  }
  componentWillMount(){
    console.log('父渲染前')
  }
  componentDidMount(){
    console.log('父挂载了')
  }
  render() {
    console.log('父render')
    return React.createElement("div", null, this.state.number);
    // return <p>{this.state.number}</p>
    // return <Child name={this.state.number}/>
  }
}

let element = React.createElement(Count, { name: '计数器' })
React.render(
  element,
  document.getElementById('root')
);

