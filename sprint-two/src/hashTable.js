var HashTable = function() {
  this._limit = 8;
  this._pairs = 0;
  this._storage = LimitedArray(this._limit);
};

HashTable.prototype.insert = function(k, v) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var alreadyThere = this._storage.get(index);
  if (alreadyThere) {
    var updated = false;
    alreadyThere.forEach(function(pair) {
      if (pair[0] === k) {
        pair[1] = v;
        updated = true;
      }
    });
    if (updated) {
      this._storage.set(index, alreadyThere);
    } else {
      alreadyThere.push([k, v]);
      this._pairs++;
      this._storage.set(index, alreadyThere);
    }
  } else {
    this._pairs++;
    this._storage.set(index, [[k, v]]);
  }
  if (this._pairs / this._limit >= .75) {
    this._double();
  }
};

HashTable.prototype.retrieve = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var item = this._storage.get(index);
  if (!item) {
    return undefined;
  }
  var result;
  item.forEach(function(pair) {
    if (pair[0] === k) {
      result = pair[1];
    }
  });
  return result;
};

HashTable.prototype.remove = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  if (this._storage.get(index) !== undefined) {
    this._pairs--;
  }
  this._storage.set(index, undefined);

  if (this._pairs / this._limit < .25) {
    this._half();
  }
};

HashTable.prototype._double = function() {
  var old = this._storage;
  this._limit *= 2;
  this._storage = LimitedArray(this._limit);
  var current = this;
  this._pairs = 0;
  old.each(function(basket) {
    if (basket) {
      basket.forEach(function(pair) {
        current.insert(pair[0], pair[1]);
      });
    }
  });
};

HashTable.prototype._half = function() {
  var old = this._storage;
  this._limit = Math.ceil(this._limit / 2);
  this._storage = LimitedArray(this._limit);
  var current = this;
  this._pairs = 0;
  old.each(function(basket) {
    if (basket) {
      basket.forEach(function(pair) {
        current.insert(pair[0], pair[1]);
      });
    }
  });
};


/*
 * Complexity: What is the time complexity of the above functions?
 insert: O(1) *as long as the hash function is performing correctly / O(n) if they resize
 retrieve: O(1) *as long as the hash function is performing correctly
 remove: O(1) *as long as the hash function is performing correctly / O(n) if they resize
 _double: O(n)
 _half: O(n)
 */


