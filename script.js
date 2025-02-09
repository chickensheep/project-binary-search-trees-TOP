class Node {
	constructor(data, left = null, right = null) {
		this.data = data;
		this.left = left;
		this.right = right;
	}
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
	if (node.right !== null) {
		prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
	}
	console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
	if (node.left !== null) {
		prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
	}
};

class tree {
	constructor(array) {
		this.root = this.buildTree(array, 0, array.length - 1);
		prettyPrint(this.root);
	}

	buildTree(array, start, end) {
		if (start > end) {
			return null;
		}

		let mid = parseInt((start + end) / 2);
		let root = new Node(array[mid]);

		root.left = this.buildTree(array, start, mid - 1);
		root.right = this.buildTree(array, mid + 1, end);
		return root;
	}

	insert(value) {
		let counter = this.root;
		while (counter) {
			if (value < counter.data) {
				if (!counter.left) {
					counter.left = new Node(value);
					prettyPrint(this.root);
					return;
				} else {
					counter = counter.left;
				}
			} else {
				if (!counter.right) {
					counter.right = new Node(value);
					prettyPrint(this.root);
					return;
				} else {
					counter = counter.right;
				}
			}
		}
	}

	deleteItem(value, root = this.root) {
		if (root == null) {
			return root;
		}

		if (value < root.data) {
			root.left = this.deleteItem(value, root.left);
		} else if (value > root.data) {
			root.right = this.deleteItem(value, root.right);
		} else {
			if (root.left == null) {
				return root.right;
			} else if (root.right == null) {
				return root.left;
			}
			root.data = minValue(root);
			root.right = this.deleteItem(root.data, root.right);
		}
		prettyPrint(this.root);
		return root;
	}

	find(value, root = this.root) {
		if (root == null) {
			return null;
		}
		if (value < root.data) {
			return this.find(value, root.left);
		} else if (value > root.data) {
			return this.find(value, root.right);
		} else {
			return root;
		}
	}

	levelOrder(queue = [this.root], result = []) {
		if (queue.length == 0) {
			return `Level order is ${result}`;
		}
		result.push(queue[0].data);
		if (queue[0].left) {
			queue.push(queue[0].left);
		}
		if (queue[0].right) {
			queue.push(queue[0].right);
		}
		queue.shift(0);
		return this.levelOrder(queue, result);
	}

	inOrder(root = this.root, result = []) {
		if (root.left) {
			this.inOrder(root.left, result);
		}
		result.push(root.data);
		if (root.right) {
			this.inOrder(root.right, result);
		}
		return result;
	}

	preOrder(root = this.root, result = []) {
		result.push(root.data);
		if (root.left) {
			this.preOrder(root.left, result);
		}
		if (root.right) {
			this.preOrder(root.right, result);
		}
		return result;
	}

	height(node, root = this.root) {
		if (node < root.data) {
			return this.height(node, root.left);
		} else if (node > root.data) {
			return this.height(node, root.right);
		} else {
			return this.getHeight(root);
		}
	}

	getHeight(node) {
		if (node == null) {
			return -1;
		}
		let left = this.getHeight(node.left);
		let right = this.getHeight(node.right);

		return Math.max(left, right) + 1;
	}

	depth(node, root = this.root, counter = 0) {
		if (node < root.data) {
			counter++;
			return this.depth(node, root.left, counter);
		} else if (node > root.data) {
			counter++;
			return this.depth(node, root.right, counter);
		} else {
			return counter;
		}
	}

	isBalanced() {
		if (this.root == null) {
			return false;
		}

		let left = this.root.left;
		let right = this.root.right;

		if (Math.abs(this.height(left.data) - this.height(right.data)) > 1) {
			return false;
		} else {
			return true;
		}
	}
}

function minValue(root) {
	let min = root.right;
	while (min.left) {
		min = min.left;
	}
	return min.data;
}

let treeArray = [1, 3, 5, 7, 9, 11, 13];
let balanceTree = new tree(treeArray);

// balanceTree.insert(2);
console.log(balanceTree);
// balanceTree.deleteItem(13);
console.log(balanceTree.find(1));

console.log(balanceTree.levelOrder());
console.log(balanceTree.inOrder());
console.log(balanceTree.preOrder());
console.log(balanceTree.height(11));
console.log(balanceTree.depth(1));
console.log(balanceTree.isBalanced());
