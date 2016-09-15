var LinkedList = function() {
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value) {
    if (!list.tail) {
      list.tail = Node(value);
      list.head = list.tail;
    } else {
      list.tail.next = Node(value);
      list.tail = list.tail.next;
    }
  };

  list.removeHead = function() {
    if (list.head) {
      var result = list.head.value;
      list.head = list.head.next;
      return result;
    }
    
  };

  list.contains = function(target) {
    var current = list.head;
    while (current) {
      if (current.value === target) {
        return true;
      }
      current = current.next;
    }
    return false;
  };

  list.removeAt = function(index) {
    var counter = 0;
    var current = list.head;
    var prev = null;
    while (counter < index) {
      if (!current) {
        return;
      }
      prev = current;
      current = current.next;
      counter++;
    }
    prev.next = current.next;
  };

  return list;
};

var Node = function(value) {
  var node = {};

  node.value = value;
  node.next = null;

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
