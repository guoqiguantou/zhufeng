import { h, render, patch } from './vdom/index.js'

let app = document.getElementById("app");

let oldNode = h('div', { class: 'red' },
    h('p', { key: 'a', style: { color: 'green' } }, 'a'),
    h('p', { key: 'b', style: { color: 'blue' } }, 'b'),
    h('p', { key: 'c', style: { color: 'red' } }, 'c'),
)
render(oldNode, app)
let newNode = h('div', { class: 'blue' },
    // h('p', { key: 'd', style: { color: 'pink' } }, 'd'),
    h('p', { key: 'c', style: { color: 'red' } }, 'c'),
    h('p', { key: 'b', style: { color: 'blue' } }, 'b'),
    h('p', { key: 'a', style: { color: 'red' } }, 'a'),




)
setTimeout(function () {
    patch(oldNode, newNode)
}, 1000)
