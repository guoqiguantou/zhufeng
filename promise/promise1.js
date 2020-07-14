//手写promise

const { resolve } = require("path");

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
如果then返回 一个promise 需要等这个promise执行完，如果promise成功 那么会将成功的值(可能还是一个promise 需要递归调用)作为参数 传递给下一个then作为成功时的回调
如果promise失败 会将失败的原因作为参数 传递给下一个then失败时的回调
9、resolve函数的参数除了正常的值以外，还可能是另一个 Promise 实例，这时外层promise状态由传入的resolve promise状态决定

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
    onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : data => data
    onRejected = typeof onRejected == 'function' ? onRejected : err => { throw err }
    let promise2 = new Promise((resolve, reject) => {
      if (this.status == RESOLVE) {
        setTimeout(() => {
          try {
            if (isPromise(this.value)) {
              this.value.then((data) => {
                let x = onFulfilled(data);
                resolvePromise(promise2, x, resolve, reject)
              }, onRejected)
            } else {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject)
            }
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
              if (isPromise(this.value)) {
                this.value.then((data) => {
                  let x = onFulfilled(data);
                  resolvePromise(promise2, x, resolve, reject)
                }, onRejected)
              } else {
                let x = onFulfilled(this.value);
                resolvePromise(promise2, x, resolve, reject)
              }
            } catch (error) {
              reject(error)
            }
          })
        })
        this.onRejected.push(() => {
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
  catch(onReject) {
    return this.then(undefined, onReject)
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    reject(new TypeError(' Chaining cycle detected for promise #<Promise>'))
  } else if (typeof x == 'object' && (x !== null) || typeof x === 'function') {
    let then = x.then;
    if (typeof then == 'function') {
      then.call(x, y => {
        resolvePromise(promise2, y, resolve, reject)
      }, (err) => {
        reject(err)
      })
    }
  } else {
    resolve(x)
  }
}

function isPromise(x) {
  if (typeof x == 'object' && (x != null) || typeof x === 'function') {
    if (typeof x.then == 'function') {
      return true
    }
  } else {
    return false
  }
}

//当所有的promise状态都成功，promise状态才变成成功
//其中一个promise状态变成失败，promise状态就失败了
Promise.all = function (promises) {
  let promise = new Promise((resolve, reject) => {
    let arr = []
    let i = 0;
    let rejectFunc = () => {
      if (i++ == promises.length - 1) {
        resolve(arr)
      }
    }
    for (let i = 0; i < promises.length; i++) {
      if (isPromise(promises[i])) {
        promises[i].then(res => {
          arr[i] = res;
          rejectFunc()
        }, reject)
      } else {
        arr[i] = promises[i];
        rejectFunc()
      }
    }
  })
  return promise
}

Promise.defer = Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
}
module.exports = Promise