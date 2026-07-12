export const TREE_ALGORITHMS = {
  'bst-insert': {
    id: 'bst-insert',
    name: 'BST Insert',
    category: 'trees',
    timeComplexity: { best: 'O(log n)', average: 'O(log n)', worst: 'O(n)' },
    spaceComplexity: 'O(h)',
    description: 'Insert a value into a Binary Search Tree while preserving left-smaller and right-larger ordering.',
    working: 'Start at the root, compare the value, move left if smaller or right if larger, and attach the new node at the first empty child link.',
    dryRun: 'Insert 25 into BST [40, 20, 60, 10, 30]: compare 25 with 40, go left; compare with 20, go right; compare with 30, go left; insert 25.',
    advantages: ['Efficient average-case insertion', 'Maintains sorted structure', 'Supports ordered traversal'],
    disadvantages: ['Can degrade to O(n) when unbalanced', 'Duplicate handling needs a policy', 'Recursive implementations use call-stack space'],
    applications: ['Ordered sets', 'Symbol tables', 'Range queries', 'Autocomplete indexes'],
    pseudocode: `function insert(root, value):
  if root == null: return Node(value)
  if value < root.value:
    root.left = insert(root.left, value)
  else if value > root.value:
    root.right = insert(root.right, value)
  return root`,
    interviewQuestions: ['Why can BST insert degrade to O(n)?', 'How do you handle duplicates?', 'How does AVL insertion improve worst-case time?'],
    commonMistakes: ['Forgetting to return the root', 'Breaking the BST ordering rule', 'Not handling an empty tree'],
  },
  'bst-search': {
    id: 'bst-search',
    name: 'BST Search',
    category: 'trees',
    timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    description: 'Find a value in a Binary Search Tree by using ordering to discard one subtree at each step.',
    working: 'Compare target with current node. If equal, found. If smaller, move left. If larger, move right.',
    dryRun: 'Search 30 in [40, 20, 60, 10, 30]: compare 40, go left; compare 20, go right; compare 30, found.',
    advantages: ['Avoids scanning every node in balanced trees', 'Simple iterative implementation', 'Naturally supports ordered data'],
    disadvantages: ['Depends on tree balance', 'Does not work for arbitrary binary trees', 'Worst case is linear'],
    applications: ['Lookup tables', 'Ordered dictionaries', 'Membership checks', 'Range-filtered search'],
    pseudocode: `function search(root, target):
  current = root
  while current != null:
    if current.value == target: return current
    if target < current.value: current = current.left
    else: current = current.right
  return null`,
    interviewQuestions: ['Why does BST search skip entire subtrees?', 'When is BST search worse than binary search?', 'How do balanced trees help lookup time?'],
    commonMistakes: ['Searching both children like a normal binary tree', 'Moving right for smaller values', 'Not stopping at null'],
  },
  'inorder-traversal': {
    id: 'inorder-traversal',
    name: 'Inorder Traversal',
    category: 'trees',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(h)',
    description: 'Visit left subtree, then root, then right subtree. In a BST this returns values in sorted order.',
    working: 'Recursively traverse left, process current node, then recursively traverse right.',
    dryRun: 'BST [40, 20, 60, 10, 30] visits 10, 20, 30, 40, 60.',
    advantages: ['Produces sorted order for BSTs', 'Simple recursive pattern', 'Foundation for tree serialization'],
    disadvantages: ['Recursive stack can overflow on deep trees', 'Requires full traversal', 'Not level-order'],
    applications: ['Sorted output from BST', 'Expression tree evaluation', 'Validation of BST order'],
    pseudocode: `function inorder(node):
  if node == null: return
  inorder(node.left)
  visit(node)
  inorder(node.right)`,
    interviewQuestions: ['Why is inorder traversal sorted for BSTs?', 'How do you implement it iteratively?', 'What is its space complexity?'],
    commonMistakes: ['Visiting root before left subtree', 'Forgetting the null base case', 'Confusing traversal order with BFS'],
  },
  'preorder-traversal': {
    id: 'preorder-traversal',
    name: 'Preorder Traversal',
    category: 'trees',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(h)',
    description: 'Visit root first, then left subtree, then right subtree.',
    working: 'Process current node before recursing into its children.',
    dryRun: 'BST [40, 20, 60, 10, 30] visits 40, 20, 10, 30, 60.',
    advantages: ['Useful for copying trees', 'Captures root before descendants', 'Works well for prefix expression trees'],
    disadvantages: ['Does not produce sorted BST order', 'Recursive stack grows with height', 'Requires all nodes for complete traversal'],
    applications: ['Tree cloning', 'Prefix expressions', 'Preorder serialization'],
    pseudocode: `function preorder(node):
  if node == null: return
  visit(node)
  preorder(node.left)
  preorder(node.right)`,
    interviewQuestions: ['When is preorder useful?', 'How do you serialize a tree with preorder?', 'How does preorder differ from DFS?'],
    commonMistakes: ['Visiting left before root', 'Skipping null markers in serialization', 'Assuming preorder is sorted'],
  },
  'postorder-traversal': {
    id: 'postorder-traversal',
    name: 'Postorder Traversal',
    category: 'trees',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(h)',
    description: 'Visit left subtree, then right subtree, then root.',
    working: 'Process children before the current node, which is useful when parent work depends on child results.',
    dryRun: 'BST [40, 20, 60, 10, 30] visits 10, 30, 20, 60, 40.',
    advantages: ['Ideal for deleting/freeing trees', 'Useful for evaluating expression trees', 'Computes child data before parent'],
    disadvantages: ['Less intuitive than preorder/inorder', 'Iterative version is trickier', 'Recursive stack grows with height'],
    applications: ['Tree deletion', 'Directory size calculation', 'Postfix expression generation'],
    pseudocode: `function postorder(node):
  if node == null: return
  postorder(node.left)
  postorder(node.right)
  visit(node)`,
    interviewQuestions: ['Why is postorder useful for deleting a tree?', 'How do you implement postorder iteratively?', 'What order evaluates child results first?'],
    commonMistakes: ['Visiting root too early', 'Forgetting the right subtree', 'Mixing it up with inorder traversal'],
  },
};

export const TREE_ALGO_LIST = Object.values(TREE_ALGORITHMS);
