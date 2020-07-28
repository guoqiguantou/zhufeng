import Vue from 'Vue';

let vm = new Vue({
    el: '#app',
    data() {
        return {
            school: {
                name: 'zf',
                age: 11,
                a1: [1, 2]
            },
            msg: 'msg11111111111111',
            arr: [{ name: 1 }, 2, 3, 4]
        }
    },
    computed: {

    },
    watch: {}
})
setTimeout(function () {
    vm.msg = 'zhu Feng'
    vm.msg = 'zhu2'
    vm.msg = 'zhu3'
    vm.msg = 'zhu4'
    vm.msg = 'zhu999'
    vm.school.name = 'zhu99'
}, 1000)
setTimeout(function () {
    vm.msg = 'zhu Feng'
    vm.msg = 'zhu2'
    vm.msg = 'zhu3'
    vm.msg = 'zhu4'
    vm.msg = '12zuixinde'
    vm.school.name = 'zhu99'
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