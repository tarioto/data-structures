var Set = function() {
  var set = Object.create(setPrototype);
  set._storage = {};
  set._count = 0;
  return set;
};

var setPrototype = {};

setPrototype.add = function(item) {
  if (!this._storage[item]) {
    this._count++;
  }

  this._storage[item] = true;
};

setPrototype.contains = function(item) {
  return !!this._storage[item];
};

setPrototype.remove = function(item) {
  if (this._storage[item]) {
    this._count--;
  }

  delete this._storage[item];
};

setPrototype.count = function() {
  return this._count;
};

/*
 * Complexity: What is the time complexity of the above functions?
 add: O(1)
 contains: O(1)
 remove: O(1)
 count: O(1)
 */
