var Queue = function() {
  var someInstance = {};
  var smallest = 0;
  var largest = 0;

  // Use an object with numeric keys to store values
  var storage = {};

  // Implement the methods below

  someInstance.enqueue = function(value) {
    storage[largest++] = value;
  };

  someInstance.dequeue = function() {
    if (largest - smallest > 0) {
      return storage[smallest++];
    }
  };

  someInstance.size = function() {
    return largest - smallest;
  };

  return someInstance;
};
