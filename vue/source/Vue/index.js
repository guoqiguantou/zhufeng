import {initState} from './observer'
//这里使用es5的构造函数 而没有使用es6的类是因为构造函数比较方便拓展，可以吧方法写进多个文件
function Vue(options){
    this._init(options)
}

//vue初始化
Vue.prototype._init=function(options){
    let vm=this;
    vm.$options=options;
    //MVVM原理 重新初始化数据
    initState(vm)
}


export default Vue