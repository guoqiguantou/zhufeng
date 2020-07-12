let PENDING = 'PENDING';
let RESOLVE = 'RESOLVE';
let REJECT = 'REJECT';
//处理then promise2 调用then返回的新的Promise实例  x then返回的值
//判断 TypeError: Chaining cycle detected for promise #<Promise>
//判断如果是普通值 返回一个promise成功 
//如果是一个promise 

function resolveFunction(promise2, x, resolve, reject) {
    if (x === promise2) {
        reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    } else if (typeof x == 'object' && x !== null || typeof x == 'function') {
        try {
            let then = x.then;
            if (typeof then == 'function') {   //返回的是一个promise
                then.call(x, (data) => {
                    console.log('resolve')
                    resolve(data)
                }, (r) => {
                    console.log('reject')
                    reject(r)
                })
            }
        } catch (error) {
            reject(error)
        }
    }else{
        resolve(x)
    }
}

class Promise {
    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.error = undefined;
        this.resolveFunc = [];
        this.rejectFunc = [];

        let resolve = (value) => {
            if (this.status == PENDING) {
                this.status = RESOLVE;
                this.value = value;
                this.resolveFunc.forEach(item => {
                    item(this.value)
                })
            }
        }
        let reject = (error) => {
            if (this.status == PENDING) {
                this.status = REJECT;
                this.error = error;
                this.rejectFunc.forEach(item => {
                    item(this.error)
                })
            }
        }
        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }

    then(onfulfilled, onrejected) {
        let promise2 = new Promise((resolve, reject) => {
            if (this.status == RESOLVE) {
                setTimeout(() => {
                    try {
                        let x = onfulfilled(this.value)
                        resolveFunction(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0)
            }
            if (this.status == REJECT) {
                setTimeout(() => {
                    try {
                        let x = onrejected(this.error)
                        resolveFunction(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0)
            }
            //异步情况
            if (this.status == PENDING) {
                this.resolveFunc.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onfulfilled(this.value)
                            resolveFunction(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0)
                })
                this.rejectFunc.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onrejected(this.error)
                            resolveFunction(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0)
                })
            }
        })
        return promise2;
    }
}

module.exports = Promise