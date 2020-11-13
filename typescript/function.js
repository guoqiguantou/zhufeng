//箭头函数
var myBooks = ['aa', 'bb'];
myBooks.forEach(function (item) { return console.log('reading'); });
var fn = function () {
};
//可选参数和默认参数 可选参数必须放在最后
function getInfo(name, age, sex) {
    if (age === void 0) { age = 18; }
    console.log(name, age, sex);
}
getInfo('张三');
//剩余参数
function getItem(name) {
    var item = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        item[_i - 1] = arguments[_i];
    }
    console.log(item);
}
getItem('zhang', 12, 34, 12);
