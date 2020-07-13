//手写promise
/*
1、new Promise 需要传递一个executor执行器 立即执行
2、executor接受两个参数resolve, reject
3、函数 resolve, reject 当状态为等待 pending 时改变状态 状态一旦改变 不会再变
4、then 方法是写在 Promise.prototype 上的
5、then接受两个参数 onFulfilled成功时候的回调；onRejected失败时的回调
6、调用then的时候 如果状态是成功，那么会调用onFulfilled成功的回调，并且将promise的值传递进去
如果状态是失败，那么会调用 onRejected失败的回调，并且将promise拒绝的原因 传递进去
如果状态是等待中，那么会将回调函数（onFulfilled，onRejected）存入对应的回调函数的数组中；
当状态改变时resolve/reject 时再依次执行（异步 发布订阅）
7、promise可以then多次，每次then都返回一个新的promise实例
8、如果then返回的是一个普通值，那么会将这个普通值作为参数，传递给下一个then成功时的回调；
如果then抛出了异常，那么会将这个异常作为参数，传递给下一个then失败时的回调
如果then返回 一个promise 需要等这个promise执行完，如果promise成功 那么会将成功的值作为参数 传递给下一个then作为成功时的回调
如果promise失败 会将失败的原因作为参数 传递给下一个then失败时的回调

*/
const PENDING = 'PENDING';
const RESOLVE = 'RESOLVE';
const REJECT = 'REJECT';

class Promise {
  constructor(executor) {
    this.status = PENDING;  //promise状态
    this.value = undefined; //promise值
    this.error = undefined; //promise失败的原因
    this.onFulfilled = [];//成功的回调
    this.onRejected = [];//失败的回调
    let resolve = (data) => {
      if (this.status == PENDING) {
        this.status = RESOLVE;
        this.value = data;
        this.onFulfilled.forEach(item => {
          item()
        })
      }
    }
    let reject = (err) => {
      if (this.status == PENDING) {
        this.status = REJECT;
        this.error = err;
        this.onRejected.forEach(item => {
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
  then(onFulfilled, onRejected) {
    let promise2 = new Promise((resolve, reject) => {
      if (this.status == RESOLVE) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      if (this.status == REJECT) {
        setTimeout(() => {
          try {
            let x = onRejected(this.error)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      //异步
      if (this.status == PENDING) {
        this.onFulfilled.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })
        })
        onRejected && this.onRejected.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.error)
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })
        })
      }
    })

    return promise2
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    reject(new TypeError(' Chaining cycle detected for promise #<Promise>'))
  } else if (typeof x == 'object' && x !== null || typeof x === 'function') {
    let then=x.then;
    if(typeof then =='function'){
      then.call(x,(data)=>{
        resolve(data)
      },(err)=>{
        reject(err)
      })
    }
  }else{
    resolve(x)
  }
}

module.exports = Promise