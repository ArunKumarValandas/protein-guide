export const LINKED_LIST_TYPES = {
  singly: {
    id: 'singly',
    name: 'Singly Linked List',
    category: 'linked-list',
    description: 'Each node contains data and a pointer to the next node. Traversal is unidirectional from head to tail.',
    working: 'Maintain a head pointer. Insert by updating next pointers. Delete by bypassing the target node.',
    dryRun: 'Insert 10 at head: new node → next = head, head = new node. Delete 20: find node before 20, prev.next = node.next.',
    advantages: ['Simple structure', 'Dynamic size', 'Efficient insert/delete at head O(1)'],
    disadvantages: ['No backward traversal', 'Extra memory for pointers', 'No random access'],
    applications: ['Undo functionality', 'Polynomial representation', 'Hash chaining'],
    timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(n)',
    pseudocode: `function insertAtHead(head, value):
  newNode = createNode(value)
  newNode.next = head
  return newNode`,
  },
  doubly: {
    id: 'doubly',
    name: 'Doubly Linked List',
    category: 'linked-list',
    description: 'Each node has data, a next pointer, and a prev pointer enabling bidirectional traversal.',
    working: 'Update both next and prev pointers on insert/delete. Head has prev=null, tail has next=null.',
    dryRun: 'Insert 15 after node X: new.next = X.next, new.prev = X, X.next.prev = new, X.next = new.',
    advantages: ['Bidirectional traversal', 'Easier deletion with node reference', 'Can iterate backward'],
    disadvantages: ['Extra pointer per node', 'More pointer updates on modification'],
    applications: ['Browser history', 'LRU cache', 'Music playlists'],
    timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(n)',
    pseudocode: `function insertAfter(node, value):
  newNode = createNode(value)
  newNode.next = node.next
  newNode.prev = node
  if node.next: node.next.prev = newNode
  node.next = newNode`,
  },
  circular: {
    id: 'circular',
    name: 'Circular Linked List',
    category: 'linked-list',
    description: 'Last node points back to the head, forming a ring. No null terminator at the tail.',
    working: 'Traverse until returning to head. Insert/delete must preserve the circular link from tail to head.',
    dryRun: 'List 1→2→3→1. Insert 4 at tail: 3.next = 4, 4.next = 1. Tail becomes 4.',
    advantages: ['Round-robin scheduling', 'Efficient circular traversal', 'No null tail edge case'],
    disadvantages: ['Risk of infinite loops without careful termination', 'Slightly complex insert/delete'],
    applications: ['Round-robin CPU scheduling', 'Multiplayer game turns', 'Circular buffers'],
    timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(n)',
    pseudocode: `function traverseCircular(head):
  if head == null: return
  current = head
  do:
    visit(current)
    current = current.next
  while current != head`,
  },
};

export const LINKED_LIST_OPERATIONS = {
  insert: {
    id: 'insert',
    name: 'Insert',
    description: 'Insert a new node with the given value at the head of the list.',
    defaultPosition: 'head',
  },
  delete: {
    id: 'delete',
    name: 'Delete',
    description: 'Remove the first node matching the given value.',
  },
  search: {
    id: 'search',
    name: 'Search',
    description: 'Traverse the list to find a node with the given value.',
  },
  reverse: {
    id: 'reverse',
    name: 'Reverse',
    description: 'Reverse the linked list by rewiring pointers in place.',
  },
  traverse: {
    id: 'traverse',
    name: 'Traverse',
    description: 'Visit every node in the list from head to tail (or full circle).',
  },
};

export const STACK_OPERATIONS = {
  push: {
    id: 'push',
    name: 'Push',
    category: 'stack',
    description: 'Add an element to the top of the stack.',
    working: 'Place new element above the current top. Top pointer moves to the new element.',
    dryRun: 'Stack [3, 7]. Push 5 → [3, 7, 5]. Top is now 5.',
    advantages: ['O(1) push and pop', 'Simple LIFO semantics', 'Minimal memory overhead'],
    disadvantages: ['No random access', 'Limited to top operations', 'Stack overflow if bounded'],
    applications: ['Function call stack', 'Undo/redo', 'Expression evaluation', 'DFS traversal'],
    timeComplexity: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    spaceComplexity: 'O(n)',
    pseudocode: `function push(stack, value):
  stack.append(value)
  return stack`,
  },
  pop: {
    id: 'pop',
    name: 'Pop',
    category: 'stack',
    description: 'Remove and return the top element from the stack.',
    working: 'Remove the topmost element and update the top pointer to the next element below.',
    dryRun: 'Stack [3, 7, 5]. Pop → returns 5, stack becomes [3, 7].',
    advantages: ['O(1) removal from top', 'Natural for recursive algorithms'],
    disadvantages: ['Cannot remove arbitrary element efficiently', 'Empty stack must be handled'],
    applications: ['Backtracking', 'Syntax parsing', 'Memory management'],
    timeComplexity: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    spaceComplexity: 'O(1)',
    pseudocode: `function pop(stack):
  if stack.isEmpty(): return null
  return stack.removeTop()`,
  },
  peek: {
    id: 'peek',
    name: 'Peek',
    category: 'stack',
    description: 'View the top element without removing it.',
    working: 'Return the value at the top index without modifying the stack.',
    dryRun: 'Stack [3, 7, 5]. Peek → returns 5, stack unchanged.',
    advantages: ['O(1) access to top', 'Non-destructive inspection'],
    disadvantages: ['Only exposes top element'],
    applications: ['Checking next token', 'Parenthesis matching preview', 'Stack-based calculators'],
    timeComplexity: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    spaceComplexity: 'O(1)',
    pseudocode: `function peek(stack):
  if stack.isEmpty(): return null
  return stack.top()`,
  },
  clear: {
    id: 'clear',
    name: 'Clear',
    category: 'stack',
    description: 'Remove all elements from the stack.',
    working: 'Reset the stack to empty by removing all elements from top to bottom.',
    dryRun: 'Stack [3, 7, 5]. Clear → []. Top is null.',
    advantages: ['Quick reset', 'Frees logical stack state'],
    disadvantages: ['Destructive operation', 'Cannot undo without backup'],
    applications: ['Resetting parser state', 'Clearing undo history', 'Reinitializing game state'],
    timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    pseudocode: `function clear(stack):
  while not stack.isEmpty():
    stack.pop()
  return stack`,
  },
};

export const QUEUE_TYPES = {
  queue: {
    id: 'queue',
    name: 'Queue',
    category: 'queue',
    description: 'FIFO structure where elements are added at the rear and removed from the front.',
    working: 'Enqueue adds to rear, dequeue removes from front. Front and rear pointers track ends.',
    dryRun: 'Enqueue 1,2,3 → [1,2,3]. Dequeue → removes 1, queue [2,3].',
    advantages: ['Fair FIFO ordering', 'O(1) enqueue/dequeue with proper implementation'],
    disadvantages: ['No priority handling', 'Limited access to middle elements'],
    applications: ['Task scheduling', 'BFS traversal', 'Print spooling', 'Message buffers'],
    timeComplexity: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    spaceComplexity: 'O(n)',
    pseudocode: `function enqueue(queue, value):
  queue.rear = (queue.rear + 1) % capacity
  queue.data[queue.rear] = value`,
  },
  'circular-queue': {
    id: 'circular-queue',
    name: 'Circular Queue',
    category: 'queue',
    description: 'Fixed-size queue that wraps around using modulo arithmetic to reuse slots.',
    working: 'Front and rear indices wrap at capacity. Full when (rear+1)%capacity == front.',
    dryRun: 'Capacity 4: enqueue 1,2,3. Dequeue twice. Enqueue 4,5 wraps to reuse freed slots.',
    advantages: ['Efficient memory reuse', 'O(1) operations', 'Predictable fixed size'],
    disadvantages: ['Fixed capacity', 'Complex full/empty detection'],
    applications: ['CPU scheduling', 'Streaming buffers', 'Keyboard input buffers'],
    timeComplexity: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    spaceComplexity: 'O(n)',
    pseudocode: `function enqueueCircular(q, value):
  if isFull(q): return false
  q.rear = (q.rear + 1) % q.capacity
  q.data[q.rear] = value`,
  },
  deque: {
    id: 'deque',
    name: 'Deque',
    category: 'queue',
    description: 'Double-ended queue allowing insertion and removal at both front and rear.',
    working: 'Supports addFront, addRear, removeFront, removeRear operations on both ends.',
    dryRun: 'addRear(1), addFront(0) → [0,1]. removeFront → [1]. removeRear → [].',
    advantages: ['Flexible access at both ends', 'O(1) operations at ends', 'Generalizes queue and stack'],
    disadvantages: ['More complex implementation', 'Not suitable for middle access'],
    applications: ['Sliding window maximum', 'Palindrome checking', 'Work-stealing schedulers'],
    timeComplexity: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    spaceComplexity: 'O(n)',
    pseudocode: `function addFront(deque, value):
  deque.front = (deque.front - 1 + capacity) % capacity
  deque.data[deque.front] = value`,
  },
  'priority-queue': {
    id: 'priority-queue',
    name: 'Priority Queue',
    category: 'queue',
    description: 'Elements are dequeued by priority (lower number = higher priority) rather than insertion order.',
    working: 'On enqueue, insert maintaining priority order. Dequeue always removes highest-priority element.',
    dryRun: 'Enqueue (taskA,2), (taskB,1). Dequeue → taskB first despite arriving second.',
    advantages: ['Handles task prioritization', 'Critical for scheduling algorithms'],
    disadvantages: ['Enqueue O(n) in array implementation', 'More complex than simple queue'],
    applications: ['Dijkstra algorithm', 'Huffman coding', 'OS process scheduling', 'A* search'],
    timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(n)',
    pseudocode: `function enqueuePriority(pq, value, priority):
  insert pq maintaining ascending priority order`,
  },
};

export const QUEUE_OPERATIONS = {
  enqueue: {
    id: 'enqueue',
    name: 'Enqueue',
    description: 'Add an element to the queue (rear for standard, by priority for priority queue).',
  },
  dequeue: {
    id: 'dequeue',
    name: 'Dequeue',
    description: 'Remove the front element (or highest-priority element for priority queue).',
  },
};

export const LINKED_LIST_OPERATION_DETAILS = {
  insert: {
    working:
      'Allocate a new node, point it to the current head, then move the head pointer to the new node. Doubly and circular variants require one or two extra pointer updates.',
    dryRun:
      'List 24 -> 36 -> 48, insert 12: create 12, set 12.next to 24, update head to 12. Result: 12 -> 24 -> 36 -> 48.',
    advantages: ['Head insertion is O(1)', 'No shifting of existing elements', 'Works naturally with dynamic memory'],
    disadvantages: ['Pointer updates must be exact', 'Random-position insertion requires traversal', 'Extra pointer memory per node'],
    applications: ['Stack implementation', 'Adjacency lists', 'Undo history', 'Dynamic collections'],
    pseudocode: `function insertAtHead(head, value):
  node = new Node(value)
  node.next = head
  if head != null: head.prev = node
  head = node
  return head`,
    interviewQuestions: ['Why is insertion at the head O(1)?', 'How does insertion change for a doubly linked list?', 'What pointer must be updated to keep a circular list valid?'],
    commonMistakes: ['Forgetting to update the head pointer', 'Losing the old head before assigning newNode.next', 'Not updating prev or tail links in doubly/circular variants'],
  },
  delete: {
    working:
      'Traverse until the target node is found, keep track of the previous node, then bypass the target by linking previous to target.next.',
    dryRun:
      'List 12 -> 24 -> 36, delete 24: visit 12, visit 24, set 12.next to 36, remove 24.',
    advantages: ['O(1) deletion when node reference and previous pointer are known', 'No array shifting', 'Memory can be reclaimed immediately'],
    disadvantages: ['Search cost is O(n)', 'Head and tail deletion are edge cases', 'Pointer mistakes can orphan nodes'],
    applications: ['Cache eviction', 'Playlist editing', 'Memory allocators', 'Hash table chaining'],
    pseudocode: `function deleteValue(head, target):
  if head.value == target: return head.next
  prev = head
  current = head.next
  while current != null:
    if current.value == target:
      prev.next = current.next
      return head
    prev = current
    current = current.next
  return head`,
    interviewQuestions: ['How do you delete the head node?', 'How do you delete a node when only that node reference is given?', 'What extra updates are needed in a doubly linked list?'],
    commonMistakes: ['Skipping the head deletion case', 'Dereferencing current.next when current is null', 'Not repairing prev links after deletion'],
  },
  search: {
    working:
      'Start at head and compare each node value with the target. Move through next pointers until the target is found or traversal ends.',
    dryRun:
      'Search 36 in 12 -> 24 -> 36 -> 48: compare 12, compare 24, compare 36, found.',
    advantages: ['Simple and works on unsorted lists', 'No extra memory needed', 'Compatible with all linked-list variants'],
    disadvantages: ['O(n) time in the worst case', 'No random access', 'Circular lists need a clear stopping condition'],
    applications: ['Membership checks', 'Finding nodes before update/delete', 'Symbol tables with chaining'],
    pseudocode: `function search(head, target):
  current = head
  while current != null:
    if current.value == target: return current
    current = current.next
  return null`,
    interviewQuestions: ['Why is linked-list search O(n)?', 'How do you avoid infinite loops in a circular list?', 'When is linked-list search preferable to array search?'],
    commonMistakes: ['Forgetting to advance the current pointer', 'Using binary search assumptions on linked lists', 'Not handling an empty list'],
  },
  reverse: {
    working:
      'Walk through the list and reverse each next pointer so every node points to its previous node. The old tail becomes the new head.',
    dryRun:
      'List 12 -> 24 -> 36: set 12.next to null, 24.next to 12, 36.next to 24. New head is 36.',
    advantages: ['In-place O(1) extra space', 'Common interview pattern', 'Useful for palindrome and reorder problems'],
    disadvantages: ['Easy to lose the remaining list without a next pointer', 'Doubly/circular variants need additional pointer handling'],
    applications: ['Undoing traversal order', 'Palindrome checks', 'Reordering lists', 'Functional transformations'],
    pseudocode: `function reverse(head):
  prev = null
  current = head
  while current != null:
    next = current.next
    current.next = prev
    prev = current
    current = next
  return prev`,
    interviewQuestions: ['Why do you need prev, current, and next pointers?', 'How do you reverse a linked list recursively?', 'How does reverse change for a circular list?'],
    commonMistakes: ['Overwriting current.next before saving next', 'Returning the old head instead of the new head', 'Not terminating the old head with null'],
  },
  traverse: {
    working:
      'Visit the head node, process its value, then follow next pointers until the traversal reaches null or returns to head in a circular list.',
    dryRun:
      'Traverse 12 -> 24 -> 36: visit 12, move next; visit 24, move next; visit 36, stop at null.',
    advantages: ['Foundation for most list operations', 'O(n) and simple', 'Works with streaming-style processing'],
    disadvantages: ['Sequential only', 'Circular variants require a stop guard', 'Cannot jump directly to an index'],
    applications: ['Printing lists', 'Counting nodes', 'Aggregation', 'Validation and debugging'],
    pseudocode: `function traverse(head):
  current = head
  while current != null:
    visit(current.value)
    current = current.next`,
    interviewQuestions: ['How do you count nodes during traversal?', 'How do you detect a cycle while traversing?', 'What is the difference between traversal and search?'],
    commonMistakes: ['Missing the empty-list case', 'Infinite loops in circular lists', 'Mutating pointers during a read-only traversal'],
  },
};

export const LINKED_LIST_TYPE_LIST = Object.values(LINKED_LIST_TYPES);
export const LINKED_LIST_OPERATION_LIST = Object.values(LINKED_LIST_OPERATIONS);
export const STACK_OPERATION_LIST = Object.values(STACK_OPERATIONS);
export const QUEUE_TYPE_LIST = Object.values(QUEUE_TYPES);
export const QUEUE_OPERATION_LIST = Object.values(QUEUE_OPERATIONS);

export function getLinkedListMetadata(typeId, operationId) {
  const type = LINKED_LIST_TYPES[typeId] || LINKED_LIST_TYPES.singly;
  const operation = LINKED_LIST_OPERATIONS[operationId] || LINKED_LIST_OPERATIONS.insert;
  const details = LINKED_LIST_OPERATION_DETAILS[operation.id] || {};
  return {
    ...type,
    ...details,
    id: `linked-list-${type.id}-${operation.id}`,
    name: `${type.name} - ${operation.name}`,
    description: operation.description,
  };
}

export function getStackMetadata(operationId) {
  const operation = STACK_OPERATIONS[operationId] || STACK_OPERATIONS.push;
  const details = {
    push: {
      interviewQuestions: ['Why is push O(1)?', 'How would you implement a stack with a linked list?', 'What happens when a bounded stack is full?'],
      commonMistakes: ['Adding to the bottom instead of the top', 'Forgetting to update the top pointer', 'Ignoring overflow in fixed-size stacks'],
    },
    pop: {
      interviewQuestions: ['How do you handle popping from an empty stack?', 'What value should pop return?', 'How is pop used in DFS?'],
      commonMistakes: ['Not checking underflow', 'Returning the wrong element after mutation', 'Leaving stale top references'],
    },
    peek: {
      interviewQuestions: ['How is peek different from pop?', 'Why is peek non-destructive?', 'When is peek useful in parsing?'],
      commonMistakes: ['Removing the item during peek', 'Not handling an empty stack', 'Inspecting the bottom item by mistake'],
    },
    clear: {
      interviewQuestions: ['Can clear be O(1)?', 'What changes for manual memory management?', 'How do you clear a stack implemented with linked nodes?'],
      commonMistakes: ['Clearing only the top value', 'Not releasing node references', 'Assuming cleared data can be recovered'],
    },
  };

  return {
    ...operation,
    id: `stack-${operation.id}`,
    ...(details[operation.id] || {}),
  };
}

export function getQueueMetadata(typeId, operationId) {
  const type = QUEUE_TYPES[typeId] || QUEUE_TYPES.queue;
  const operation = QUEUE_OPERATIONS[operationId] || QUEUE_OPERATIONS.enqueue;
  const details = {
    enqueue: {
      working:
        type.id === 'priority-queue'
          ? 'Insert the new item according to priority so dequeue can remove the highest-priority item first.'
          : 'Add the new item at the rear pointer. For circular queues the rear index wraps with modulo arithmetic.',
      dryRun:
        type.id === 'priority-queue'
          ? 'Queue [20, 40], enqueue 10: insert before 20 because priority 10 is higher. Result [10, 20, 40].'
          : 'Queue [18, 32], enqueue 46: place 46 after rear, then move rear to 46.',
      interviewQuestions: ['Why is enqueue O(1) in a normal queue?', 'How does circular queue enqueue detect full capacity?', 'Why can priority queue enqueue be O(n) in an array implementation?'],
      commonMistakes: ['Adding to the front instead of rear', 'Forgetting modulo wrap in circular queues', 'Breaking priority order during insertion'],
    },
    dequeue: {
      working:
        type.id === 'priority-queue'
          ? 'Remove the item with highest priority, represented here as the lowest numeric priority value.'
          : 'Remove the item at the front pointer, then advance front to the next item.',
      dryRun:
        type.id === 'priority-queue'
          ? 'Priority queue [10, 20, 40], dequeue removes 10 first.'
          : 'Queue [18, 32, 46], dequeue removes 18 and front moves to 32.',
      interviewQuestions: ['How do you handle dequeue on an empty queue?', 'Why does BFS use a queue?', 'How is dequeue different in a priority queue?'],
      commonMistakes: ['Not checking underflow', 'Removing from rear by accident', 'Leaving stale front/rear pointers after the queue becomes empty'],
    },
  };
  return {
    ...type,
    ...(details[operation.id] || {}),
    id: `queue-${type.id}-${operation.id}`,
    name: `${type.name} - ${operation.name}`,
    description: operation.description,
  };
}

export function getCodeId(category, typeOrOp, operation) {
  if (category === 'linked-list') return `linked-list-${operation}`;
  if (category === 'stack') return `stack-${typeOrOp}`;
  if (category === 'queue') return `queue-${typeOrOp}-${operation}`;
  return category;
}
