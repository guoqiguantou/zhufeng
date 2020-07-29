const util = {
    query: function (el) {
        if (typeof el === 'string') {
            return document.querySelector(el)
        } else {
            return el
        }
    },
    getValue(vm, value) {
        let valueArr = value.split('.');
        return valueArr.reduce((prev, next) => {
            return prev[next]
        }, vm)
    }
}
//编译dom
export function compile(vm, fragment) {
    if (!fragment.childNodes) return //判断有没有子节点，递归循环的条件
    fragment.childNodes.forEach(node => {
        if (node.nodeType == 1) {//dom节点
            compile(vm, node)
        } else if (node.nodeType == 3) {//文本节点
            compileText(vm, node)
        }
    })
}
//编译文本提取{{}}模板里面的表达式，用变量填充
export function compileText(vm, node) {
    const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g
    node.text = node.text ? node.text : node.textContent;//dom上保存表达式
    node.textContent = node.text.replace(defaultTagRE, function () {
        return JSON.stringify(util.getValue(vm, RegExp.$1))
    })
}

export default util