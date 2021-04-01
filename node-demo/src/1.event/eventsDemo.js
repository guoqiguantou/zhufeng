const Event = require('./events')
const Util = require('util')
//on off emit once 
const EventEmitter = new Event()
const Girl = function () {
  // Event.call(this);
}

//继承
// Girl.prototype = Object.create(EventEmitter.__proto__)
// Girl.prototype.__proto__ = EventEmitter.__proto__;
Util.inherits(Girl, Event)
const girl = new Girl()
const cry = function () {
  console.log('哭泣')
}
const eat = function () {
  console.log('吃东西')
}

girl.once('女孩失恋', cry)
girl.once('女孩失恋', eat)
girl.off('女孩失恋', cry)
girl.off('女孩失恋', eat)

girl.emit('女孩失恋')

girl.emit('女孩失恋')
girl.emit('女孩失恋22')