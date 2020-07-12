//发布订阅模式

var e = {
    callBack: [],
    emit: function (name, data) {
        if (this.callBack[name] && this.callBack[name].length > 0) {
            this.callBack[name].forEach(e => {
                e(data)
            })
        }

    },
    on: function (name, callBack) {
        if (this.callBack[name]) {
            this.callBack[name].push(callBack)
        } else {
            this.callBack[name] = [callBack]
        }

    }
}


//发布 
e.on('name', function (data) {
    console.log('namegengxonlkdksl' + data)
})
e.on('age', function () {
    console.log('age')
})

//订阅

var fs = require("fs");

fs.readFile('aaa.txt', function(){
    e.emit('name', '张三')
});
fs.readFile('bbb.txt', function(){
    e.emit('age')
});

