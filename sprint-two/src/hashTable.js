

var HashTable = function() {
  this._limit = 8;
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
      this._storage.set(index, alreadyThere);
    }
  } else {
    this._storage.set(index, [[k, v]]);
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
  this._storage.set(index, undefined);
};



/*
 * Complexity: What is the time complexity of the above functions?
 */


