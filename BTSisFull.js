/**
* Class to represent a Node in a Binary Search Tree (BST).
* The properties in the constructor are how this node is 
* connected to other nodes to form the tree. 
* Similar to .next in a SinglyLinkedList except a BST node can
* be connected to two other nodes. To start, new nodes are not
* connected to any other nodes, these properties will be set 
* after the new node is instantiated.
http://btv.melezinek.cz/binary-search-tree.html
*/
class BSTNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

/**
 * Represents an ordered tree of nodes where
 * the data of left nodes are <= to their parent and
 * the data of nodes to the right are > their parent's data.
 */
class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    /**
     * Determines if this tree is empty.
     * @returns {boolean} Indicates if this tree is empty.
     */
    isEmpty() {
        if (this.root == null) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Retrieves the smallest integer data from this tree.
     * - Time: O(?).
     * - Space: O(?).
     * @param {Node} current is default as root of the tree
     *    the tree is being traversed.
     * @returns {number} The smallest integer from this tree.
     */
    min(current = this.root) {
        if (!current) {
            return null;
        }

        while (current.left) {
            current = current.left;
        }

        return current.data;
    }

    /**
     * Retrieves the smallest integer data from this tree.
     * - Time: O(?).
     * - Space: O(?).
     * @param {Node} current is default as root of the tree
     *    the tree is being traversed.
     * @returns {number} The smallest integer from this tree.
     */
    minRecursive(current = this.root) {
        //base case
        if (!current) {
            return null;
        }
        if (!current.left) {
            return current.data;
        }
        return this.minRecursive(current.left);
    }

    /**
     * Retrieves the largest integer data from this tree.
     * - Time: O(?).
     * - Space: O(?).
     * @param {Node} current is default as root of the tree
     * @returns {number} The largest integer from this tree.
     */
    max(current = this.root) {
        if (!current) {
            return null;
        }

        while (current.right) {
            current = current.right;
        }

        return current.data;
    }

    /**
     * Retrieves the largest integer data from this tree.
     * - Time: O(?).
     * - Space: O(?).
     * @param {Node} current is default as root of the tree
     *    the tree is being traversed.
     * @returns {number} The largest integer from this tree.
     */
    maxRecursive(current = this.root) {
        //base case
        if (!current) {
            return null;
        }
        if (!current.right) {
            return current.data;
        }
        return this.maxRecursive(current.right);
    }

    // -------------- W2D2 ------------------
    contains(searchVal) {
        // catch input into a variable?
        let current = this.root;
        //while loop
        while (current) {
            //if check for value test
            if (searchVal === current.data) {
                return true;
                //if else check to move L/R
            } else if (searchVal < current.data) {
                current = current.left;
                //else check to move the other way
            } else {
                current = current.right;
            }
        }
        // return false if nothing is found (ie. no match)
        return false;
    }

    /**
     * Determines if this tree contains the given searchVal.
     * - Time: O(?).
     * - Space: O(?).
     * @param {number} searchVal: The number to search for in the node's data.
     * @returns {boolean} : Indicates if the searchVal was found.
     */
    containsRecursive(searchVal, current = this.root) {
        // check to see if empty
        if (!current) {
            return false;
        }
        // if check value test to see if it's a match
        if (searchVal === current.data) {
            return true;
            // less than check to see if L/R
        } else if (searchVal < current.data) {
            //return step left and go back to top
            return this.containsRecursive(searchVal, current.left);
            // greater than check
        } else {
            //return step right and go back to top
            return this.containsRecursive(searchVal, current.right);
        }
    }

    /**
     * Calculates the range (max - min) from the given startNode.
     * - Time: O(?).
     * - Space: O(?).
     * @param {Node} startNode : The node to start from
     * @returns {number|null} : The range of this tree or a sub tree
     * depending on if the startNode is the root or not.
     *
     */
    range(startNode = this.root) {
        // check if empty
        if (!startNode) {
            return 0;
        }
        return this.max() - this.min();
    }

    // -------------------W2D3 ------------------
    insert(newVal) {
        // turning the newVal into a node --> newNode
        const newNode = new BSTNode(newVal);
        // start of the arrow is at the root
        let current = this.root;
        // empty tree case
        if (!this.root) {
            this.root = newNode;
            return this;
        }
        while (true) {
            // checking if the newVal is less than the data at the current node
            if (newVal < current.data) {
                // Check to see if there is a node to the left
                if (!current.left) {
                    //assign to the left
                    current.left = newNode;
                    return this;
                }
                // move to the left if it exists
                current = current.left;
            } else {
                if (!current.right) {
                    current.right = newNode;
                    return this;
                }
                current = current.right;
            }
        }
    }

    insertRecursive(newVal, curr = this.root) {
        if (curr === null) {
            this.root = new BSTNode(newVal);
            return this;
        }
        if (newVal < curr.data) {
            if (curr.left === null) {
                curr.left = new BSTNode(newVal);
                return this;
            }
            return this.insertRecursive(newVal, curr.left);
        } else {
            if (curr.right === null) {
                curr.right = new BSTNode(newVal);
                return this;
            }
            return this.insertRecursive(newVal, curr.right);
        }
    }

    // ----------------- W2D4 -----------------
    /**
     * Depth first search
     * DFS Preorder: (CurrNode, Left, Right)
     * Usage: create a copy of the tree,
     * Converts this BST into an array following DFS preorder.
     * Example on the fullTree var:
     * [25, 15, 10, 4, 12, 22, 18, 24, 50, 35, 31, 44, 70, 66, 90]
     * @param {Node} node The current node during the traversal
     * @param {Array<number>} vals The data that has been visited so far.
     * @returns {Array<number>} The vals in DFS Preorder once all nodes visited.
     */
    // root, left, right
    toArrPreorder(curr = this.root, vals = []) {
        if (!curr) {
            return;
        }
        if (curr) {
            vals.push(curr.data);
            // recursive call to the left
            this.toArrPreorder(curr.left, vals);
            this.toArrPreorder(curr.right, vals);
        }
        return vals;
    }

    /**
     * DFS Inorder: (Left, CurrNode, Right)
     * Usage: get the numbers in order
     * Converts this BST into an array following DFS inorder.
     * Example on the fullTree var:
     * [4, 10, 12, 15, 18, 22, 24, 25, 31, 35, 44, 50, 66, 70, 90]
     * @param {Node} node The current node during the traversal
     * @param {Array<number>} vals The data that has been visited so far.
     * @returns {Array<number>} The vals in DFS Preorder once all nodes visited.
     */

    // left, root, right
    toArrInorder(curr = this.root, vals = []) {
        if (!curr) {
            return;
        }
        if (curr) {
            this.toArrInorder(curr.left, vals);
            vals.push(curr.data);
            this.toArrInorder(curr.right, vals);
        }
        return vals;
    }

    /**
     * DFS Postorder (Left, Right, CurrNode)
     * Usage: delete the tree
     * Converts this BST into an array following DFS postorder.
     * Example on the fullTree var:
     * [4, 12, 10, 18, 24, 22, 15, 31, 44, 35, 66, 90, 70, 50, 25]
     * @param {Node} node The current node during the traversal
     * @param {Array<number>} vals The data that has been visited so far.
     * @returns {Array<number>} The vals in DFS Preorder once all nodes visited.
     */
    toArrPostorder(curr = this.root, vals = []) {
        if (!curr) {
            return;
        }
        if (curr) {
            this.toArrPostorder(curr.left, vals);
            this.toArrPostorder(curr.right, vals);
            vals.push(curr.data);
        }
        return vals;
    }

    // ------------ W2D5 --------------

    size2(node = this.root, count = 0) {
        if (!node) {
            return count;
        }
        if (node) {
            count = this.size2(node.left, count);
            count = this.size2(node.right, count);
            count++;
        }
        return count;
    }

    /**
     * Recursively counts the total number of nodes in this tree.
     * - Time: O(?).
     * - Space: O(?).
     * @param {Node} node The current node during the traversal of this tree.
     * @returns {number} The total number of nodes.
     */
    // node is set to root
    size(node = this.root) {
        // Empty Node if check
        if (!node) {
            return 0;
        }
        // 1 represents the current node, calling the method recursively pointing to each node (this.size(node.L/R)) per direction and calculating the number as part of the return
        return 1 + this.size(node.left) + this.size(node.right);
    }

    /**
     * Calculates the height of the tree which is based on how many nodes from
     * top to bottom (whichever side is taller).
     * - Time: O(?).
     * - Space: O(?).
     * @param {Node} node The current node during traversal of this tree.
     * @returns {number} The height of the tree.
     */
    height(node = this.root) {
        if (!node) {
            return 0;
        }
        return Math.max(this.height(node.right), this.height(node.left)) + 1;
    }

    height2(node = this.root) {
        if (!node) {
            return 0;
        } else {
            var leftHeight = this.height(node.left);
            var rightHeight = this.height(node.right);
            var level = Math.max(leftHeight, rightHeight) + 1;
        }
        return level;
    }

    height(node = this.root) {
        // Empty Node if check
        if (!node) {
            return -1; // empty tree has height of -1, one node tree has a height of         //zero
        }
        // collect left count
        const left = this.height(node.left);
        // collect right count
        const right = this.height(node.right);
        // return comparison of L vs. R and add 1 to account for the root node
        return Math.max(left, right) + 1;
    }
    // HELPER METHOD
    // Logs this tree horizontally with the root on the left.
    print(node = this.root, spaceCnt = 0, spaceIncr = 10) {
        if (!node) {
            return;
        }

        spaceCnt += spaceIncr;
        this.print(node.right, spaceCnt);

        console.log(
            " ".repeat(spaceCnt < spaceIncr ? 0 : spaceCnt - spaceIncr) +
                `${node.data}`
        );

        this.print(node.left, spaceCnt);
    }
}

const emptyTree = new BinarySearchTree();
const oneNodeTree = new BinarySearchTree();
oneNodeTree.root = new BSTNode(10);
// oneNodeTree.print()

/* twoLevelTree
        root
        10
      /   \
    5     15
*/
const twoLevelTree = new BinarySearchTree();
twoLevelTree.root = new BSTNode(10);
twoLevelTree.root.left = new BSTNode(5);
twoLevelTree.root.right = new BSTNode(15);
// twoLevelTree.print()

const threeLevelTree = new BinarySearchTree();
threeLevelTree.root = new BSTNode(10);
threeLevelTree.root.left = new BSTNode(5);
threeLevelTree.root.left.left = new BSTNode(2);
threeLevelTree.root.left.right = new BSTNode(4);
threeLevelTree.root.right = new BSTNode(15);
threeLevelTree.root.right.right = new BSTNode(20);
threeLevelTree.root.right.left = new BSTNode(13);
threeLevelTree.print();

/* threeLevelTree 
        root
        10
      /   \
    5     15
  / \    / \
2   4  13  20
*/

console.log(emptyTree.isEmpty());
console.log(emptyTree.min());
console.log(emptyTree.minRecursive());
console.log(emptyTree.max());
console.log(emptyTree.maxRecursive());

console.log(oneNodeTree.min());
console.log(oneNodeTree.minRecursive());
console.log(oneNodeTree.max());
console.log(oneNodeTree.maxRecursive());

console.log(twoLevelTree.min());
console.log(twoLevelTree.minRecursive());
console.log(twoLevelTree.max());
console.log(twoLevelTree.maxRecursive());

console.log(threeLevelTree.min());
console.log(threeLevelTree.minRecursive());
console.log(threeLevelTree.max());
console.log(threeLevelTree.maxRecursive());

/* fullTree
                    root
                <-- 25 -->
              /            \
            15             50
          /    \         /    \
        10     22      35     70
      /   \   /  \    /  \   /  \
    4    12  18  24  31  44 66  90
*/
