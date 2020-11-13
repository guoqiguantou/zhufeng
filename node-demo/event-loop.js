/*
宏任务（macro task）
i/o操作 回调 定时器 

微任务（micro task）
setImmediate promise的then node的nextTick

*/
//先执行主栈任务，然后执行宏任务，然后执行一批微任务，然后执行宏任务，然后执行一批微任务
//浏览器 1 5 6 2 3 4 789
/*
console.log('1');//
setTimeout(function () {
    console.log('2');//
    new Promise(function (resolve) {
        console.log('3');//
        resolve();
    }).then(function () {
        console.log('4');//
    })
}, 0);
new Promise(function (resolve) {
    console.log('5');//
    resolve();
}).then(function () {
    console.log('6');//
});
setTimeout(function () {
    console.log('7');//
    new Promise(function (resolve) {
        console.log('8');//
        resolve();
    }).then(function () {
        console.log('9');//
    });
})
*/
//受性能影响 时而timeout 时而immediate
// setTimeout(() => {
//     console.log('timeout');
// }, 0);

// setImmediate(() => {
//     console.log('immediate');
// });

let fs=require('fs')


fs.readFile('index.js',(err,value) => {
    console.log('dakai')
    setTimeout(() => {
        console.log('timeout');
    }, 0);
    setImmediate(() => {
        console.log('immediate');
    });
})
