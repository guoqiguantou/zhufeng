import { vnode } from './createElement'

//生成虚拟dom
function h(tag, props, ...children) {
    let { key } = props;
    delete props.key;
    children = children.map(item => {
        if (typeof item == 'string') {
            return vnode(undefined, undefined, undefined, undefined, item)
        } else {
            return item
        }
    })
    return vnode(tag, props, key, children, undefined)
}



export default h