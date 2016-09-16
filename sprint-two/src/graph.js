

// Instantiate a new graph
var Graph = function() {
  this.nodes = [];
  this.edges = [];
};

// Add a node to the graph, passing in the node's value.
Graph.prototype.addNode = function(node) {
  this.nodes.push(node);
};

// Return a boolean value indicating if the value passed to contains is represented in the graph.
Graph.prototype.contains = function(node) {
  return this.nodes.some(function(element) {
    return element === node;
  });
};

// Removes a node from the graph.
Graph.prototype.removeNode = function(node) {
  this.nodes.forEach(function(element, i, collection) {
    if (element === node) {
      collection.splice(i, 1);
    }
  });
  this.edges.forEach(function(edge, i, collection) {
    if (edge[0] === node || edge[1] === node) {
      collection.splice(i, 1);
    }
  });
};

// Returns a boolean indicating whether two specified nodes are connected.  Pass in the values contained in each of the two nodes.
Graph.prototype.hasEdge = function(fromNode, toNode) {
  return this.edges.some(function(edge) {
    return edge.indexOf(fromNode) !== -1 && edge.indexOf(toNode) !== -1;
  });
};

// Connects two nodes in a graph by adding an edge between them.
Graph.prototype.addEdge = function(fromNode, toNode) {
  this.edges.push([fromNode, toNode]);
};

// Remove an edge between any two specified (by value) nodes.
Graph.prototype.removeEdge = function(fromNode, toNode) {
  this.edges.forEach(function(edge, i, collection) {
    if (edge.indexOf(fromNode) !== -1 && edge.indexOf(toNode) !== -1) {
      collection.splice(i, 1);
    }
  });
};

// Pass in a callback which will be executed on each node of the graph.
Graph.prototype.forEachNode = function(cb) {
  this.nodes.forEach(function(node) {
    cb(node);
  });
};

Graph.prototype.connected = function(node1, node2, visited) {
  visited = visited || [];
  visited.push(node1);
  if (visited.indexOf(node2) !== -1) {
    return true;
  }
  var current = this;
  var result = false;
  this.edges.forEach(function(edge) {
    if (edge[0] === node1) {
      if (visited.indexOf(edge[1]) !== -1) {
        return;
      } else {
        result = result || current.connected(edge[1], node2, visited);
      }
    } else if (edge[1] === node1) {
      if (visited.indexOf(edge[0]) !== -1) {
        return;
      } else {
        result = result || current.connected(edge[0], node2, visited);
      }
    }
  });

  return result;

};

/*
 * Complexity: What is the time complexity of the above functions?
 addNode: O(1)
 contains: O(n)
 removeNode: O(n)
 hasEdge: O(n)
 addEdge: O(1)
 removeEdge: O(n)
 forEachNode: O(n)
 connected: O(n)
 */


