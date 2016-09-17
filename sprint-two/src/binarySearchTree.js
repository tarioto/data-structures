var BinarySearchTree = function(value) {
  var tree = Object.create(binaryTreeMethods);
  tree.value = value;
  tree.left = null;
  tree.right = null;
  tree.parent = null;
  tree.weight = 1;
  tree.maxDepth = 1;
  return tree;
};

var binaryTreeMethods = {
  insert: function(value, depth = 1) {
    this.weight++;
    var possibleMaxDepth;
    if (value < this.value) {
      if (this.left) {
        possibleMaxDepth = this.left.insert(value, depth + 1);
        if (this.maxDepth < possibleMaxDepth) {
          this.maxDepth = possibleMaxDepth - (depth - 1);
        }
      } else {
        this.left = BinarySearchTree(value);
        this.left.parent = this;
        if (this.maxDepth < 2) {
          this.maxDepth = 2;
          possibleMaxDepth = depth + 1;
        }
      }
    }

    if (value > this.value) {
      if (this.right) {
        possibleMaxDepth = this.right.insert(value, depth + 1);
        if (this.maxDepth < possibleMaxDepth) {
          this.maxDepth = possibleMaxDepth - (depth - 1);
        }
      } else {
        this.right = BinarySearchTree(value);
        this.right.parent = this;
        if (this.maxDepth < 2) {
          this.maxDepth = 2;
          possibleMaxDepth = depth + 1;
        }
      }
    }
    if (this.maxDepth > this.findMinDepth() * 2) {
      this._rebalance();
    }
    return possibleMaxDepth;
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
    // var l = 0;
    // var r = 0;
    // if (this.left) {
    //   l = this.left.count();
    // }
    // if (this.right) {
    //   r = this.right.count();
    // // }
    // return l + r + 1;
    return this.weight;
  },

  breadthFirstLog: function() {
    var result = [];
    var nodes = [this];
    var counter = 0;
    while (counter < nodes.length) {
      if (nodes[counter].left) {
        nodes.push(nodes[counter].left);
      }
      if (nodes[counter].right) {
        nodes.push(nodes[counter].right);
      }
      result.push(nodes[counter].value);
      counter++;
    }
    return result;
  },

  _rebalance: function() {
    // find which child is heavier
    var heavierChild;
    var removedWeight = 1;
    var heavierChildWasLeft = undefined;

    if (!this.left) {
      heavierChild = this.right;
      heavierChildWasLeft = false;
    }

    if (!this.right) {
      heavierChild = this.left;
      heavierChildWasLeft = true;
    }

    if (this.left && this.right) {
      if (this.left.weight < this.right.weight) {
        heavierChild = this.right;
        heavierChildWasLeft = false;
        removedWeight += this.left.weight;
      } else {
        heavierChild = this.left;
        heavierChildWasLeft = true;
        removedWeight += this.right.weight;
      }
    }

    if (heavierChildWasLeft) {
      this.left = null;
    } else {
      this.right = null;
    }

    if (!heavierChild) {
      return;
    }
    //take heavier child attach to this.parent
    if (this.parent) {
      heavierChild.parent = this.parent;
      //take parent attach to heavier child
      if (this.parent.value < this.value) {
        this.parent.right = heavierChild;
      } else {
        this.parent.left = heavierChild;
      }
      //update weight of parent
      this.parent.weight -= removedWeight;
    }

    //find root of tree
    var top = heavierChild;
    while (top.parent) {
      top = top.parent;
    }
    //insert this and lighter child tree
    this.depthFirstLog(function(value) {
      top.insert(value);
    });

  },

  findMinDepth: function() {
    var nodes = [this];
    var counter = 0;
    while (counter < nodes.length) {
      if (nodes[counter].left) {
        nodes.push(nodes[counter].left);
      } else {
        var result = Math.floor(Math.log(nodes.length + 1) * Math.LOG2E);
        return result;
      }
      if (nodes[counter].right) {
        nodes.push(nodes[counter].right);
      } else {
        return Math.floor(Math.log(nodes.length + 1) * Math.LOG2E);
      }

      counter++;
    }

  }

};




/*
 * Complexity: What is the time complexity of the above functions?
 insert: O(log n)
 contains: O(log n)
 depthFirstLog: O(n)
 count: O(1)
 */
