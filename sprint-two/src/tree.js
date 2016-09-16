var Tree = function(value) {
  var newTree = {};
  newTree.value = value;
  _.extend(newTree, treeMethods);

  // your code here
  newTree.children = [];  // fix me

  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value) {
  var child = Tree(value);
  this.children.push(child);
};

treeMethods.contains = function(target) {
  return this.value === target || this.children.some(function(child) {
    return child.contains(target);
  });
};

treeMethods.deleteChild = function(target, parent, childIndex) {
  if (this.value === target) {
    parent.children.splice.apply(
      parent.children, [childIndex, 1].concat(this.children)
    );
  } else {
    var curr = this;
    this.children.forEach(function(child, index) {
      child.deleteChild(target, curr, index);
    });
  }

};



/*
 * Complexity: What is the time complexity of the above functions?
 addChild: O(1)
 contains: O(n)
 deleteChild: O(n)
 */
