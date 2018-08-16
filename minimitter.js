Minimitter = function Minimitter() {
  this.listeners = {};
};

Minimitter.prototype.on = function(name, callback) {
  this.listeners[name] = this.listeners[name] || [];
  this.listeners[name].push(callback);
};

Minimitter.prototype.off = function(name, callback) {
  this.listeners[name] = this.listeners[name] || [];
  var indexOfCallback = this.listeners[name].indexOf(callback);
  if(~indexOfCallback) {
    this.listeners[name].splice(indexOfCallback, 1);
  }
};

Minimitter.prototype.emit = function(name) {
  var args = Array.prototype.slice.call(arguments, 1);

  this.listeners[name].forEach(function(callback) {
    callback.apply(this, args);
  });
};

module.exports = Minimitter;
