var Minimitter = function Minimitter() {
  this.listeners = {};
};

Minimitter.prototype.on = function(name, callback) {
  this.listeners[name] = this.listeners[name] || [];
  this.listeners[name].push(callback);
  return this;
};

Minimitter.prototype.once = function(name, callback) {
  var once = function() {
    this.off(name, once);
    callback.apply(this, arguments);
  }.bind(this);
  return this.on(name, once);
};

Minimitter.prototype.removeListener = function(name, callback) {
  if (!this.listeners[name]) return;
  var indexOfCallback = this.listeners[name].indexOf(callback);
  if (indexOfCallback > -1) {
    this.listeners[name].splice(indexOfCallback, 1);
  }
  return this;
};
Minimitter.prototype.off = Minimitter.prototype.removeListener;

Minimitter.prototype.removeAllListeners = function(name) {
  this.listeners[name] = undefined;
  return this;
};

Minimitter.prototype.emit = function(name) {
  if (!this.listeners[name]) return false;
  var args = Array.prototype.slice.call(arguments, 1);
  this.listeners[name].forEach(function(callback) {
    callback.apply(this, args);
  });
  return true;
};

module.exports = Minimitter;
