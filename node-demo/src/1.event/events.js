
//发布订阅模式
const EventEmitter = function () {
  this.name = '1'
  // this._events = {}
}
// {
//   'eventName':[fn1,fn2]
// }
EventEmitter.prototype._events = {}

//发布事件
EventEmitter.prototype.on = function (eventName, callBack) {
  if (this._events[eventName]) {
    this._events[eventName].push(callBack)
  } else {
    this._events[eventName] = [callBack]
  }
}

//订阅事件
EventEmitter.prototype.emit = function (eventName, ...argument) {
  if (this._events[eventName]) {
    this._events[eventName].forEach((fn) => {
      fn(...argument)
    })
  }
}

//解绑订阅事件
EventEmitter.prototype.off = function (eventName, callback) {
  if (this._events[eventName]) {
    this._events[eventName] = this._events[eventName].filter((value) => {
      return value !== callback && value.l !== callback
    })
  }
}

//绑定一次
EventEmitter.prototype.once = function (eventName, callBack) {
  //切片编程
  const one = (...argument) => {
    callBack(...argument)
    this.off(eventName, one)
  }
  one.l = callBack
  this.on(eventName, one)

}

module.exports = EventEmitter