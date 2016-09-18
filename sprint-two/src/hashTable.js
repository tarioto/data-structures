var HashTable = function() {
  this._limit = 8;
  this._pairs = 0;
  this._storage = LimitedArray(this._limit);
};

HashTable.prototype.insert = function(k, v) {
  // var index = getIndexBelowMaxForKey(k, this._limit);
  // var alreadyThere = this._storage.get(index);
  // if (alreadyThere) {
  //   var updated = false;
  //   alreadyThere.forEach(function(pair) {
  //     if (pair[0] === k) {
  //       pair[1] = v;
  //       updated = true;
  //     }
  //   });
  //   if (updated) {
  //     this._storage.set(index, alreadyThere);
  //   } else {
  //     alreadyThere.push([k, v]);
  //     this._pairs++;
  //     this._storage.set(index, alreadyThere);
  //   }
  // } else {
  //   this._pairs++;
  //   this._storage.set(index, [[k, v]]);
  // }
  // if (this._pairs / this._limit >= .75) {
  //   this._resize(this._limit * 2);
  // }
  return this._tupleSearch(k, function(bucket, tuple, index) {

    var result = tuple[1];
    tuple[1] = v;
    return result;
  }, function(bucket) {
    bucket.push([k, v]);
    this._storage.set(getIndexBelowMaxForKey(k, this._limit), bucket);
    this._pairs++;

    if (this._pairs / this._limit >= .75) {
      this._resize(this._limit * 2);
    }
  });

};

HashTable.prototype.retrieve = function(k) {
  return this._tupleSearch(k, function(bucket, tuple, index) {
    return tuple[1];
  });
};

HashTable.prototype.remove = function(k) {
  return this._tupleSearch(k, function(bucket, tuple, index) {
    this._pairs--;
    
    bucket.splice(index, 1);

    if (this._pairs / this._limit < .25) {
      this._resize(Math.ceil(this._limit / 2));
    }
  });
  
};

HashTable.prototype._resize = function(newLimit) {
  var old = this._storage;
  this._limit = newLimit;
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

HashTable.prototype._tupleSearch = function(key, foundCb, notfoundCb) {
  //get index
  var index = getIndexBelowMaxForKey(key, this._limit);
  //check if key is currently in hash table
  var bucket = this._storage.get(index) || [];

  for (var i = 0; i < bucket.length; i++) {
    //exicute foundCb on key and value
    if (bucket[i][0] === key) {
      return foundCb.call(this, bucket, bucket[i], i);
    }
  }

  return notfoundCb ? notfoundCb.call(this, bucket) : undefined;
  //if not found
    //exicute notfoundCb
};

/*
 * Complexity: What is the time complexity of the above functions?
 insert: O(1) *as long as the hash function is performing correctly / O(n) if they resize
 retrieve: O(1) *as long as the hash function is performing correctly
 remove: O(1) *as long as the hash function is performing correctly / O(n) if they resize
 _double: O(n)
 _half: O(n)
 */


