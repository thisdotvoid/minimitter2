var Minimitter = require('../minimitter');

describe('minimitter', function() {
  var emitter;
  this.func = function func() { };
  this.fail = function fail() { throw false; };
  var self = this;

  beforeEach(function() {
    emitter = new Minimitter();
    spyOn(self, 'func');
    spyOn(console, 'error');
  });

  it('should set a listener with .on', function() {
    emitter.on('test', function() { });
    expect(Object.keys(emitter.listeners)).toEqual(['test'])
    expect(typeof emitter.listeners['test'][0]).toBe('function')
  });

  it('should unset a listener with .off', function() {
    emitter.on('test', self.func);
    expect(Object.keys(emitter.listeners)).toEqual(['test'])
    expect(typeof emitter.listeners['test'][0]).toBe('function')
    emitter.off('test', self.func);
    expect(emitter.listeners['test']).toEqual([]);
  });

  it('should remove all listeners with .removeAllListeners', function() {
    emitter.on('test', self.func);
    emitter.removeAllListeners('test');
    expect(emitter.listeners['test']).toBeUndefined();
  });

  it('should trigger a callback after emitting an event with .emit', function() {
    emitter.on('test', self.func);
    emitter.emit('test');
    expect(self.func).toHaveBeenCalled();
  });

  it('should pass all arguments to the callback after emitting an event with .emit', function() {
    emitter.on('test', self.func);
    emitter.emit('test', 'arg1', 'arg2');
    expect(self.func).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('should extend existing object with .extend', function() {
    function Test() {
      Minimitter.extend(this);
    }
    var test = new Test();
    Array([test.emit, test.on, test.once, test.off, test.removeListener, test.removeAllListeners])
      .forEach(function(prop) {
        expect(prop).toBeDefined()
      })
  })
})
