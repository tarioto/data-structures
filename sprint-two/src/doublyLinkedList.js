var DoublyLinkedList = function() {
  this.head = null;
  this.tail = null;
};

DoublyLinkedList.prototype.addToTail = function(value) {
  var node = new DoubleNode(value);
  if (!this.tail) {
    this.tail = node;
    this.head = node;
  } else {
    this.tail.next = node;
    node.previous = this.tail;
    this.tail = node;
  }
};

DoublyLinkedList.prototype.removeHead = function() {
  var result = this.head.value;
  if (!this.head.next) {
    this.head = null;
    this.tail = null;
  } else {
    this.head = this.head.next;
    this.head.previous = null;
  }
  return result;
};

DoublyLinkedList.prototype.contains = function(target) {
  var current = this.head;
  while (current) {
    if (current.value === target) {
      return true;
    }
    current = current.next;
  }
  return false;
};

DoublyLinkedList.prototype.addToHead = function(value) {
  var node = new DoubleNode(value);
  if (!this.head) {
    this.head = node;
    this.tail = node;
  } else {
    this.head.previous = node;
    node.next = this.head;
    this.head = node;
  }
};

DoublyLinkedList.prototype.removeTail = function() {
  var result = this.tail.value;
  if (!this.tail.previous) {
    this.head = null;
    this.tail = null;
  } else {
    this.tail = this.tail.previous;
    this.tail.next = null;
  }
  return result;
};

var DoubleNode = function(value) {
  this.value = value;
  this.next = null;
  this.previous = null;
};