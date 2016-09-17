describe('binarySearchTree', function() {
  var binarySearchTree;

  beforeEach(function() {
    binarySearchTree = BinarySearchTree(5);
  });

  it('should have methods named "insert", "contains", "depthFirstLog" and "count"', function() {
    expect(binarySearchTree.insert).to.be.a('function');
    expect(binarySearchTree.contains).to.be.a('function');
    expect(binarySearchTree.depthFirstLog).to.be.a('function');
    expect(binarySearchTree.count).to.be.a('function');
  });

  it('should insert values at the correct location in the tree', function() {
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    // debugger;
    expect(binarySearchTree.value).to.equal(3);
    binarySearchTree.insert(7);
    binarySearchTree.insert(6);
    expect(binarySearchTree.left.right.value).to.equal(3);
    expect(binarySearchTree.right.left.value).to.equal(6);
  });

  it('should have a working "contains" method', function() {
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    expect(binarySearchTree.contains(7)).to.equal(true);
    expect(binarySearchTree.contains(8)).to.equal(false);
  });

  it('should execute a callback on every value in a tree using "depthFirstLog"', function() {
    var array = [];
    var func = function(value) { array.push(value); };
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.depthFirstLog(func);
    expect(array).to.eql([5, 2, 3]);
  });

  it('should return count of all nodes in tree', function() {
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    binarySearchTree.insert(6);
    expect(binarySearchTree.count()).to.equal(5);
  });

  it('should log the nodes in a breadth first manner', function() {
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    binarySearchTree.insert(6);
    var result = binarySearchTree.breadthFirstLog();
    expect(result).to.eql([5, 2, 7, 3, 6]);
  });

  it('should know the max depth', function() {
    binarySearchTree.insert(4);
    binarySearchTree.insert(3);
    expect(binarySearchTree.maxDepth).to.equal(3);
    binarySearchTree.insert(6);
    expect(binarySearchTree.maxDepth).to.equal(3);
    binarySearchTree.insert(7);
    expect(binarySearchTree.maxDepth).to.equal(3);
    binarySearchTree.insert(8);
    expect(binarySearchTree.maxDepth).to.equal(4);
  });

  it('should know the min depth', function() {
    binarySearchTree.insert(3);
    binarySearchTree.insert(6);
    binarySearchTree.insert(8);
    expect(binarySearchTree.findMinDepth()).to.equal(2);
  });

  it('should know its parent', function() {
    binarySearchTree.insert(3);
    binarySearchTree.insert(6);
    binarySearchTree.insert(8);
    expect(binarySearchTree.parent).to.equal(null);
    expect(binarySearchTree.left.parent).to.equal(binarySearchTree);
    expect(binarySearchTree.right.parent).to.equal(binarySearchTree);
    expect(binarySearchTree.right.right.parent).to.equal(binarySearchTree.right);
  });

  it('should rebalance the tree if the max depth is more than twice the minimum depth', function() {
    binarySearchTree.insert(6);
    binarySearchTree.insert(7);
    expect(binarySearchTree.breadthFirstLog()).to.eql([6, 5, 7]);
  });
});
