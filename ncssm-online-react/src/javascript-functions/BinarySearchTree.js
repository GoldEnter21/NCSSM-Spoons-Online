export default class BinarySearchTree {

  Node = class {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }

  constructor(comparator) {
    // root of a binary search tree
    this.comparator = comparator;
    this.root = null;
  }
  // helper method which creates a new node to
  // be inserted and calls insertNode
  insert(data) {
    // Creating a node and initialising
    // with data

    // var newNode = new BinarySearchTree.Node(data);
    // TODO: Change this
    var newNode = new this.Node(data);

    // root is null then node will
    // be added to the tree and made root.
    if (this.root === null) this.root = newNode;
    // find the correct position in the
    // tree and add the node
    else this.insertNode(this.root, newNode);
  }

  // Method to insert a node in a tree
  // it moves over the tree to find the location
  // to insert a node with a given data
  insertNode(node, newNode) {
    // if the data is less than the node
    // data move left of the tree
    if (this.comparator(node.data, newNode.data)>0) {
      // if left is null insert node here
      if (node.left === null) node.left = newNode;
      // if left is not null recur until
      // null is found
      else this.insertNode(node.left, newNode);
    }

    // if the data is more than the node
    // data move right of the tree
    else {
      // if right is null insert node here
      if (node.right === null) node.right = newNode;
      // if right is not null recur until
      // null is found
      else this.insertNode(node.right, newNode);
    }
  }

  // helper method that calls the
  // removeNode with a given data
  remove(data) {
    // root is re-initialized with
    // root of a modified tree.
    this.root = this.removeNode(this.root, data);
  }

  // Method to remove node with a
  // given data
  // it recur over the tree to find the
  // data and removes it
  removeNode(node, key) {
    // if the root is null then tree is
    // empty
    if (node === null) return null;
    // if data to be delete is less than
    // roots data then move to left subtree
    else if (this.comparator(key, node.data)<0) {
      node.left = this.removeNode(node.left, key);
      return node;
    }

    // if data to be delete is greater than
    // roots data then move to right subtree
    else if (this.comparator(key, node.data)>0) {
      node.right = this.removeNode(node.right, key);
      return node;
    }

    // if data is similar to the root's data
    // then delete this node
    else {
      // deleting node with no children
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }

      // deleting node with one children
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }

      // Deleting node with two children
      // minimum node of the right subtree
      // is stored in aux
      var aux = this.findMinNode(node.right);
      node.data = aux.data;

      node.right = this.removeNode(node.right, aux.data);
      return node;
    }
  }
  // Performs inorder traversal of a tree
  inorder(node) {
    var list = new Array();
    return list;
  }

  inorderHelper(node, list) {
    if (node !== null) {
      this.inorder(node.left, list);
      list.push(node.data);
      this.inorder(node.right, list);
    }
    return list;
  }
  findMaxNode() {
    return this.findMaxNodeHelper(this.root);
  }

  findMaxNodeHelper(node) {
    // if left of a node is null
    // then it must be minimum node
    // console.log(node.left.data.firstName, node.right.data.firstName);
    if (node === null) { console.log("No Node");}
    if (node.right === null) {
      return node.data;
    }
    else return this.findMaxNodeHelper(node.right);
  }

  //  finds the minimum node in tree
// searching starts from given node
  findMinNode(){
    this.findMinNodeHelper(this.root, 0);
  }

  findMinNodeHelper(node, id)
  {
    // if left of a node is null
    // then it must be minimum node
    if (id > 10) {
      return null;
    }
    console.log(node.left);
    // if (node.left.left === null) {
    //   console.log("N: " + node.data.firstName )
    //   console.log("NL: " + node.left.data.firstName);
    //   return node;
    // }
    if (node.data == null) {
      console.log("OUT");
      return node;
    }
    if(node.left.data === null) {
        return node;
    }
    else {
      try {
        console.log("Next: " + node.left.data.firstName + ":" + (node.left.left==null));
      } catch (e) {
        console.log(e.message);
        return null;
      }
      return this.findMinNode(node.left, id+1);
    }
}
}

