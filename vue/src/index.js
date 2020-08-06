import Vue from 'Vue';

let vm = new Vue({
    el: '#app',
    render(h) {
        return h('div', { class: 'red' },
            h('p', { key: 'a', style: { backgroundColor: 'green' } }, this.msg),
            h('p', { key: 'b', style: { backgroundColor: 'blue' } }, 'b'),
            h('p', { key: 'c', style: { backgroundColor: 'red' } }, 'c'),
            h('p', { key: 'd', style: { backgroundColor: 'pink' } }, 'd'),
        )
    },
    data() {
        return {
            school: {
                name: 'zf',
                age: 11,
                a1: [1, 2]
            },
            msg: 'msg11111111111111',
            arr: [[[1]], 2, 3, 4],
            firstName: 'Foo',
            lastName: 'Bar'
        }
    },
    computed: {
        fullName: function () {
            return this.firstName + this.lastName
        }
    },
    watch: {
        msg: function (newVal, oldVal) {
            console.log(newVal, oldVal)
        },
    }
})


setTimeout(function () {
    vm.firstName = 'msg1234'
    vm.msg = '1'
    console.log(vm.fullName)
}, 1000)

// console.log(vm.arr.push({name:1}))
// console.log(vm.arr[0].name)
// vm.school.age={
//     count:20
// }
// console.log(vm.school.age.count)

//vue数组劫持的缺点
// 没有办法监控索引
// 没有办法修改长度length

//数组对象可以监控
//数组方法push shift等可以监控