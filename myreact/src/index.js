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

let element = React.createElement(
  'div',
  { id: 'app', className: 'cd', style: { background: '#f5f5f5', color: 'blue' } },
  '小王子',
  React.createElement(
    'p',
    { style: { color: 'pink' }, onclick: say },
    '未知其实是一种保护',
    '出去哦'
  )
)

React.render(
  element,
  document.getElementById('root')
);

