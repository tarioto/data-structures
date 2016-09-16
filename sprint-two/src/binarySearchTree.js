var BinarySearchTree = function(value) {
  var tree = Object.create(binaryTreeMethods);
  tree.value = value;
  tree.left = null;
  tree.right = null;
  return tree;
};

var binaryTreeMethods = {
  insert: function(value) {
    if (value < this.value) {
      if (this.left) {
        this.left.insert(value);
      } else {
        this.left = new BinarySearchTree(value);
      }
    }

    if (value > this.value) {
      if (this.right) {
        this.right.insert(value);
      } else {
        this.right = new BinarySearchTree(value);
      }
    }
  },

  contains: function(target) {
    if (this.value === target) {
      return true;
    }
    if (target > this.value) {
      return !!this.right && this.right.contains(target);
    }
    if (target < this.value) {
      return !!this.left && this.left.contains(target);
    }
  },

  depthFirstLog: function(cb) {
    cb(this.value);
    if (this.left) {
      this.left.depthFirstLog(cb);
    }
    if (this.right) {
      this.right.depthFirstLog(cb);
    }
  },

  count: function() {
    var l = 0;
    var r = 0;
    if (this.left) {
      l = this.left.count();
    }
    if (this.right) {
      r = this.right.count();
    }
    return l + r + 1;
  }

};




/*
 * Complexity: What is the time complexity of the above functions?
 */
