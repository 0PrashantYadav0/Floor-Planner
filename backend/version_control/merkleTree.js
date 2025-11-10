// utils/merkleTree.js
const crypto = require('crypto');

class MerkleTree {
  constructor(leaves) {
    this.leaves = leaves.map(leaf => this.hash(leaf));
    this.tree = this.buildTree(this.leaves);
  }

  hash(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  buildTree(leaves) {
    let tree = [...leaves];
    while (tree.length > 1) {
      const tempTree = [];
      for (let i = 0; i < tree.length; i += 2) {
        if (i + 1 === tree.length) {
          tempTree.push(tree[i]);
        } else {
          tempTree.push(this.hash(tree[i] + tree[i + 1]));
        }
      }
      tree = tempTree;
    }
    return tree[0]; // Root hash
  }

  getRoot() {
    return this.tree;
  }
}

module.exports = MerkleTree;