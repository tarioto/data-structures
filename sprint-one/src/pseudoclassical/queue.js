var Queue = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  this.storage = [];
  this.smallest = 0;
  this.largest = 0;
};

Queue.prototype.enqueue = function(value) {
  this.storage[this.largest++] = value;
};

Queue.prototype.dequeue = function() {
  if (this.size() > 0) {
    return this.storage[this.smallest++];
  }
};

Queue.prototype.size = function() {
  return this.largest - this.smallest;
};