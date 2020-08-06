import { h, render, patch } from '../source/Vue/vdom/index.js'

let app = document.getElementById("app");

let oldNode = h('div', { class: 'red' },
    h('p', { key: 'a', style: { backgroundColor: 'green' } }, 'a'),
    h('p', { key: 'b', style: { backgroundColor: 'blue' } }, 'b'),
    h('p', { key: 'c', style: { backgroundColor: 'red' } }, 'c'),
    h('p', { key: 'd', style: { backgroundColor: 'pink' } }, 'd'),
)
render(oldNode, app)
let newNode = h('div', { class: 'blue' },

    // h('p', { key: 'a', style: { backgroundColor: 'green' } }, 'a'),
    // h('p', { key: 'b', style: { backgroundColor: 'blue' } }, 'b'),
    // h('p', { key: 'c', style: { backgroundColor: 'red' } }, 'c'),
    // h('p', { key: 'd', style: { backgroundColor: 'pink' } }, 'd'),
    h('p', { key: 'e', style: { backgroundColor: 'yellow' } }, 'e'),
    h('p', { key: 'f', style: { color: 'pink' } }, 'f'),
    h('p', { key: 'h', style: { color: 'red' } }, 'h'),
    h('p', { key: 'a', style: { color: 'green' } }, 'a'),
    h('p', { key: 'g', style: { color: 'blue' } }, 'g'),
    
   



)
setTimeout(function () {
    patch(oldNode, newNode)
}, 1000)
