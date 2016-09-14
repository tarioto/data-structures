var Queue = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var someInstance = {
    smallest: 0,
    largest: 0,
    storage: {}
  };
  _.extend(someInstance, queueMethods);
  return someInstance;
};

var queueMethods = {
  enqueue: function(value) {
    this.storage[this.largest++] = value;
  },
  dequeue: function() {
    if (this.size() > 0) {
      return this.storage[this.smallest++];
    }
  },
  size: function() {
    return this.largest - this.smallest;
  }
};


