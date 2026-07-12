export const CODE_SNIPPETS = {
  'bubble-sort': {
    javascript: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
    python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,
    java: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,
    cpp: `void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}`,
  },
  'binary-search': {
    javascript: `function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,
    python: `def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
    java: `public static int binarySearch(int[] arr, int target) {
    int low = 0, high = arr.length - 1;
    while (low <= high) {
        int mid = (low + high) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
    cpp: `int binarySearch(vector<int>& arr, int target) {
    int low = 0, high = arr.size() - 1;
    while (low <= high) {
        int mid = (low + high) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
  },
  'linked-list-insert': {
    javascript: `function insertAtHead(head, value) {
  const node = { value, next: head };
  return node;
}`,
    python: `def insert_at_head(head, value):
    node = Node(value)
    node.next = head
    return node`,
    java: `Node insertAtHead(Node head, int value) {
    Node node = new Node(value);
    node.next = head;
    return node;
}`,
    cpp: `Node* insertAtHead(Node* head, int value) {
    Node* node = new Node(value);
    node->next = head;
    return node;
}`,
  },
  'linked-list-delete': {
    javascript: `function deleteValue(head, target) {
  if (!head) return null;
  if (head.value === target) return head.next;
  let prev = head;
  let current = head.next;
  while (current) {
    if (current.value === target) {
      prev.next = current.next;
      break;
    }
    prev = current;
    current = current.next;
  }
  return head;
}`,
    python: `def delete_value(head, target):
    if head is None:
        return None
    if head.value == target:
        return head.next
    prev, current = head, head.next
    while current:
        if current.value == target:
            prev.next = current.next
            break
        prev, current = current, current.next
    return head`,
    java: `Node deleteValue(Node head, int target) {
    if (head == null) return null;
    if (head.value == target) return head.next;
    Node prev = head, current = head.next;
    while (current != null) {
        if (current.value == target) {
            prev.next = current.next;
            break;
        }
        prev = current;
        current = current.next;
    }
    return head;
}`,
    cpp: `Node* deleteValue(Node* head, int target) {
    if (!head) return nullptr;
    if (head->value == target) return head->next;
    Node* prev = head;
    Node* current = head->next;
    while (current) {
        if (current->value == target) {
            prev->next = current->next;
            break;
        }
        prev = current;
        current = current->next;
    }
    return head;
}`,
  },
  'linked-list-search': {
    javascript: `function search(head, target) {
  let current = head;
  while (current) {
    if (current.value === target) return current;
    current = current.next;
  }
  return null;
}`,
    python: `def search(head, target):
    current = head
    while current:
        if current.value == target:
            return current
        current = current.next
    return None`,
    java: `Node search(Node head, int target) {
    Node current = head;
    while (current != null) {
        if (current.value == target) return current;
        current = current.next;
    }
    return null;
}`,
    cpp: `Node* search(Node* head, int target) {
    Node* current = head;
    while (current) {
        if (current->value == target) return current;
        current = current->next;
    }
    return nullptr;
}`,
  },
  'linked-list-reverse': {
    javascript: `function reverse(head) {
  let prev = null;
  let current = head;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}`,
    python: `def reverse(head):
    prev = None
    current = head
    while current:
        nxt = current.next
        current.next = prev
        prev = current
        current = nxt
    return prev`,
    java: `Node reverse(Node head) {
    Node prev = null, current = head;
    while (current != null) {
        Node next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    return prev;
}`,
    cpp: `Node* reverse(Node* head) {
    Node* prev = nullptr;
    Node* current = head;
    while (current) {
        Node* next = current->next;
        current->next = prev;
        prev = current;
        current = next;
    }
    return prev;
}`,
  },
  'linked-list-traverse': {
    javascript: `function traverse(head, visit) {
  let current = head;
  while (current) {
    visit(current.value);
    current = current.next;
  }
}`,
    python: `def traverse(head, visit):
    current = head
    while current:
        visit(current.value)
        current = current.next`,
    java: `void traverse(Node head) {
    Node current = head;
    while (current != null) {
        System.out.println(current.value);
        current = current.next;
    }
}`,
    cpp: `void traverse(Node* head) {
    Node* current = head;
    while (current) {
        cout << current->value << "\\n";
        current = current->next;
    }
}`,
  },
  'stack-push': {
    javascript: `function push(stack, value) {
  stack.push(value);
  return stack;
}`,
    python: `def push(stack, value):
    stack.append(value)
    return stack`,
    java: `void push(Stack<Integer> stack, int value) {
    stack.push(value);
}`,
    cpp: `void push(stack<int>& values, int value) {
    values.push(value);
}`,
  },
  'stack-pop': {
    javascript: `function pop(stack) {
  if (stack.length === 0) return null;
  return stack.pop();
}`,
    python: `def pop(stack):
    if not stack:
        return None
    return stack.pop()`,
    java: `Integer pop(Stack<Integer> stack) {
    if (stack.isEmpty()) return null;
    return stack.pop();
}`,
    cpp: `optional<int> pop(stack<int>& values) {
    if (values.empty()) return nullopt;
    int top = values.top();
    values.pop();
    return top;
}`,
  },
  'stack-peek': {
    javascript: `function peek(stack) {
  if (stack.length === 0) return null;
  return stack[stack.length - 1];
}`,
    python: `def peek(stack):
    if not stack:
        return None
    return stack[-1]`,
    java: `Integer peek(Stack<Integer> stack) {
    if (stack.isEmpty()) return null;
    return stack.peek();
}`,
    cpp: `optional<int> peek(const stack<int>& values) {
    if (values.empty()) return nullopt;
    return values.top();
}`,
  },
  'stack-clear': {
    javascript: `function clear(stack) {
  stack.length = 0;
  return stack;
}`,
    python: `def clear(stack):
    stack.clear()
    return stack`,
    java: `void clear(Stack<Integer> stack) {
    stack.clear();
}`,
    cpp: `void clear(stack<int>& values) {
    while (!values.empty()) {
        values.pop();
    }
}`,
  },
  'queue-enqueue': {
    javascript: `function enqueue(queue, value) {
  queue.push(value);
  return queue;
}`,
    python: `def enqueue(queue, value):
    queue.append(value)
    return queue`,
    java: `void enqueue(Queue<Integer> queue, int value) {
    queue.offer(value);
}`,
    cpp: `void enqueue(queue<int>& values, int value) {
    values.push(value);
}`,
  },
  'queue-dequeue': {
    javascript: `function dequeue(queue) {
  if (queue.length === 0) return null;
  return queue.shift();
}`,
    python: `from collections import deque

def dequeue(queue: deque):
    if not queue:
        return None
    return queue.popleft()`,
    java: `Integer dequeue(Queue<Integer> queue) {
    if (queue.isEmpty()) return null;
    return queue.poll();
}`,
    cpp: `optional<int> dequeue(queue<int>& values) {
    if (values.empty()) return nullopt;
    int front = values.front();
    values.pop();
    return front;
}`,
  },
  'bst-insert': {
    javascript: `function insert(root, value) {
  if (!root) return { value, left: null, right: null };
  if (value < root.value) root.left = insert(root.left, value);
  else if (value > root.value) root.right = insert(root.right, value);
  return root;
}`,
    python: `def insert(root, value):
    if root is None:
        return Node(value)
    if value < root.value:
        root.left = insert(root.left, value)
    elif value > root.value:
        root.right = insert(root.right, value)
    return root`,
    java: `Node insert(Node root, int value) {
    if (root == null) return new Node(value);
    if (value < root.value) root.left = insert(root.left, value);
    else if (value > root.value) root.right = insert(root.right, value);
    return root;
}`,
    cpp: `Node* insert(Node* root, int value) {
    if (!root) return new Node(value);
    if (value < root->value) root->left = insert(root->left, value);
    else if (value > root->value) root->right = insert(root->right, value);
    return root;
}`,
  },
  'bst-search': {
    javascript: `function search(root, target) {
  let current = root;
  while (current) {
    if (current.value === target) return current;
    current = target < current.value ? current.left : current.right;
  }
  return null;
}`,
    python: `def search(root, target):
    current = root
    while current:
        if current.value == target:
            return current
        current = current.left if target < current.value else current.right
    return None`,
    java: `Node search(Node root, int target) {
    Node current = root;
    while (current != null) {
        if (current.value == target) return current;
        current = target < current.value ? current.left : current.right;
    }
    return null;
}`,
    cpp: `Node* search(Node* root, int target) {
    Node* current = root;
    while (current) {
        if (current->value == target) return current;
        current = target < current->value ? current->left : current->right;
    }
    return nullptr;
}`,
  },
  'inorder-traversal': {
    javascript: `function inorder(node, visit) {
  if (!node) return;
  inorder(node.left, visit);
  visit(node.value);
  inorder(node.right, visit);
}`,
    python: `def inorder(node, visit):
    if node is None:
        return
    inorder(node.left, visit)
    visit(node.value)
    inorder(node.right, visit)`,
    java: `void inorder(Node node) {
    if (node == null) return;
    inorder(node.left);
    visit(node.value);
    inorder(node.right);
}`,
    cpp: `void inorder(Node* node) {
    if (!node) return;
    inorder(node->left);
    visit(node->value);
    inorder(node->right);
}`,
  },
  'preorder-traversal': {
    javascript: `function preorder(node, visit) {
  if (!node) return;
  visit(node.value);
  preorder(node.left, visit);
  preorder(node.right, visit);
}`,
    python: `def preorder(node, visit):
    if node is None:
        return
    visit(node.value)
    preorder(node.left, visit)
    preorder(node.right, visit)`,
    java: `void preorder(Node node) {
    if (node == null) return;
    visit(node.value);
    preorder(node.left);
    preorder(node.right);
}`,
    cpp: `void preorder(Node* node) {
    if (!node) return;
    visit(node->value);
    preorder(node->left);
    preorder(node->right);
}`,
  },
  'postorder-traversal': {
    javascript: `function postorder(node, visit) {
  if (!node) return;
  postorder(node.left, visit);
  postorder(node.right, visit);
  visit(node.value);
}`,
    python: `def postorder(node, visit):
    if node is None:
        return
    postorder(node.left, visit)
    postorder(node.right, visit)
    visit(node.value)`,
    java: `void postorder(Node node) {
    if (node == null) return;
    postorder(node.left);
    postorder(node.right);
    visit(node.value);
}`,
    cpp: `void postorder(Node* node) {
    if (!node) return;
    postorder(node->left);
    postorder(node->right);
    visit(node->value);
}`,
  },
  bfs: {
    javascript: `function bfs(graph, start) {
  const queue = [start];
  const visited = new Set([start]);
  const order = [];
  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const next of graph[node]) {
      if (!visited.has(next)) {
        visited.add(next);
        queue.push(next);
      }
    }
  }
  return order;
}`,
    python: `from collections import deque

def bfs(graph, start):
    queue = deque([start])
    visited = {start}
    order = []
    while queue:
        node = queue.popleft()
        order.append(node)
        for nxt in graph[node]:
            if nxt not in visited:
                visited.add(nxt)
                queue.append(nxt)
    return order`,
    java: `List<String> bfs(Map<String, List<String>> graph, String start) {
    Queue<String> queue = new LinkedList<>();
    Set<String> visited = new HashSet<>();
    List<String> order = new ArrayList<>();
    queue.offer(start);
    visited.add(start);
    while (!queue.isEmpty()) {
        String node = queue.poll();
        order.add(node);
        for (String next : graph.get(node)) {
            if (visited.add(next)) queue.offer(next);
        }
    }
    return order;
}`,
    cpp: `vector<string> bfs(map<string, vector<string>>& graph, string start) {
    queue<string> q;
    set<string> visited;
    vector<string> order;
    q.push(start);
    visited.insert(start);
    while (!q.empty()) {
        string node = q.front(); q.pop();
        order.push_back(node);
        for (auto& next : graph[node]) {
            if (!visited.count(next)) {
                visited.insert(next);
                q.push(next);
            }
        }
    }
    return order;
}`,
  },
  dfs: {
    javascript: `function dfs(graph, start) {
  const stack = [start];
  const visited = new Set();
  const order = [];
  while (stack.length) {
    const node = stack.pop();
    if (visited.has(node)) continue;
    visited.add(node);
    order.push(node);
    for (const next of graph[node].slice().reverse()) stack.push(next);
  }
  return order;
}`,
    python: `def dfs(graph, start):
    stack = [start]
    visited = set()
    order = []
    while stack:
        node = stack.pop()
        if node in visited:
            continue
        visited.add(node)
        order.append(node)
        stack.extend(reversed(graph[node]))
    return order`,
    java: `List<String> dfs(Map<String, List<String>> graph, String start) {
    Deque<String> stack = new ArrayDeque<>();
    Set<String> visited = new HashSet<>();
    List<String> order = new ArrayList<>();
    stack.push(start);
    while (!stack.isEmpty()) {
        String node = stack.pop();
        if (!visited.add(node)) continue;
        order.add(node);
        for (String next : graph.get(node)) stack.push(next);
    }
    return order;
}`,
    cpp: `vector<string> dfs(map<string, vector<string>>& graph, string start) {
    stack<string> st;
    set<string> visited;
    vector<string> order;
    st.push(start);
    while (!st.empty()) {
        string node = st.top(); st.pop();
        if (visited.count(node)) continue;
        visited.insert(node);
        order.push_back(node);
        for (auto& next : graph[node]) st.push(next);
    }
    return order;
}`,
  },
  dijkstra: {
    javascript: `function dijkstra(graph, source) {
  const dist = Object.fromEntries(Object.keys(graph).map((v) => [v, Infinity]));
  dist[source] = 0;
  const visited = new Set();
  while (visited.size < Object.keys(graph).length) {
    const node = Object.keys(dist)
      .filter((v) => !visited.has(v))
      .sort((a, b) => dist[a] - dist[b])[0];
    visited.add(node);
    for (const [next, weight] of graph[node]) {
      dist[next] = Math.min(dist[next], dist[node] + weight);
    }
  }
  return dist;
}`,
    python: `import heapq

def dijkstra(graph, source):
    dist = {v: float("inf") for v in graph}
    dist[source] = 0
    heap = [(0, source)]
    while heap:
        d, node = heapq.heappop(heap)
        if d != dist[node]:
            continue
        for nxt, weight in graph[node]:
            if d + weight < dist[nxt]:
                dist[nxt] = d + weight
                heapq.heappush(heap, (dist[nxt], nxt))
    return dist`,
    java: `Map<String, Integer> dijkstra(Map<String, List<Edge>> graph, String source) {
    Map<String, Integer> dist = new HashMap<>();
    for (String v : graph.keySet()) dist.put(v, Integer.MAX_VALUE);
    dist.put(source, 0);
    PriorityQueue<Edge> pq = new PriorityQueue<>(Comparator.comparingInt(e -> e.weight));
    pq.offer(new Edge(source, 0));
    while (!pq.isEmpty()) {
        Edge cur = pq.poll();
        for (Edge edge : graph.get(cur.to)) {
            int next = dist.get(cur.to) + edge.weight;
            if (next < dist.get(edge.to)) {
                dist.put(edge.to, next);
                pq.offer(new Edge(edge.to, next));
            }
        }
    }
    return dist;
}`,
    cpp: `vector<int> dijkstra(vector<vector<pair<int,int>>>& graph, int source) {
    vector<int> dist(graph.size(), INT_MAX);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> pq;
    dist[source] = 0;
    pq.push({0, source});
    while (!pq.empty()) {
        auto [d, node] = pq.top(); pq.pop();
        if (d != dist[node]) continue;
        for (auto [next, weight] : graph[node]) {
            if (d + weight < dist[next]) {
                dist[next] = d + weight;
                pq.push({dist[next], next});
            }
        }
    }
    return dist;
}`,
  },
  'bellman-ford': {
    javascript: `function bellmanFord(vertices, edges, source) {
  const dist = Object.fromEntries(vertices.map((v) => [v, Infinity]));
  dist[source] = 0;
  for (let i = 1; i < vertices.length; i++) {
    for (const [u, v, w] of edges) {
      if (dist[u] + w < dist[v]) dist[v] = dist[u] + w;
    }
  }
  return dist;
}`,
    python: `def bellman_ford(vertices, edges, source):
    dist = {v: float("inf") for v in vertices}
    dist[source] = 0
    for _ in range(len(vertices) - 1):
        for u, v, w in edges:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
    return dist`,
    java: `Map<String, Integer> bellmanFord(List<String> vertices, List<Edge> edges, String source) {
    Map<String, Integer> dist = new HashMap<>();
    for (String v : vertices) dist.put(v, Integer.MAX_VALUE);
    dist.put(source, 0);
    for (int i = 1; i < vertices.size(); i++) {
        for (Edge e : edges) {
            if (dist.get(e.from) + e.weight < dist.get(e.to)) {
                dist.put(e.to, dist.get(e.from) + e.weight);
            }
        }
    }
    return dist;
}`,
    cpp: `vector<int> bellmanFord(int n, vector<Edge>& edges, int source) {
    vector<int> dist(n, INT_MAX);
    dist[source] = 0;
    for (int i = 1; i < n; i++) {
        for (auto& e : edges) {
            if (dist[e.u] != INT_MAX && dist[e.u] + e.w < dist[e.v]) {
                dist[e.v] = dist[e.u] + e.w;
            }
        }
    }
    return dist;
}`,
  },
  prim: {
    javascript: `function prim(graph, start) {
  const visited = new Set([start]);
  const mst = [];
  while (visited.size < Object.keys(graph).length) {
    const edge = [...visited]
      .flatMap((u) => graph[u].map(([v, w]) => [u, v, w]))
      .filter(([, v]) => !visited.has(v))
      .sort((a, b) => a[2] - b[2])[0];
    mst.push(edge);
    visited.add(edge[1]);
  }
  return mst;
}`,
    python: `def prim(graph, start):
    visited = {start}
    mst = []
    while len(visited) < len(graph):
        edge = min(
            (w, u, v) for u in visited for v, w in graph[u] if v not in visited
        )
        w, u, v = edge
        mst.append((u, v, w))
        visited.add(v)
    return mst`,
    java: `List<Edge> prim(Map<String, List<Edge>> graph, String start) {
    Set<String> visited = new HashSet<>();
    List<Edge> mst = new ArrayList<>();
    visited.add(start);
    while (visited.size() < graph.size()) {
        Edge best = null;
        for (String u : visited) {
            for (Edge e : graph.get(u)) {
                if (!visited.contains(e.to) && (best == null || e.weight < best.weight)) best = e;
            }
        }
        mst.add(best);
        visited.add(best.to);
    }
    return mst;
}`,
    cpp: `vector<Edge> prim(vector<vector<pair<int,int>>>& graph, int start) {
    vector<bool> visited(graph.size(), false);
    vector<Edge> mst;
    visited[start] = true;
    while (mst.size() < graph.size() - 1) {
        Edge best{-1, -1, INT_MAX};
        for (int u = 0; u < graph.size(); u++) if (visited[u]) {
            for (auto [v, w] : graph[u]) if (!visited[v] && w < best.w) best = {u, v, w};
        }
        mst.push_back(best);
        visited[best.v] = true;
    }
    return mst;
}`,
  },
  kruskal: {
    javascript: `function kruskal(vertices, edges) {
  const parent = Object.fromEntries(vertices.map((v) => [v, v]));
  const find = (x) => parent[x] === x ? x : (parent[x] = find(parent[x]));
  const union = (a, b) => {
    const ra = find(a), rb = find(b);
    if (ra === rb) return false;
    parent[rb] = ra;
    return true;
  };
  return edges.sort((a, b) => a[2] - b[2]).filter(([u, v]) => union(u, v));
}`,
    python: `def kruskal(vertices, edges):
    parent = {v: v for v in vertices}
    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]
    mst = []
    for u, v, w in sorted(edges, key=lambda e: e[2]):
        if find(u) != find(v):
            parent[find(v)] = find(u)
            mst.append((u, v, w))
    return mst`,
    java: `List<Edge> kruskal(List<String> vertices, List<Edge> edges) {
    UnionFind uf = new UnionFind(vertices);
    edges.sort(Comparator.comparingInt(e -> e.weight));
    List<Edge> mst = new ArrayList<>();
    for (Edge e : edges) {
        if (uf.union(e.from, e.to)) mst.add(e);
    }
    return mst;
}`,
    cpp: `vector<Edge> kruskal(vector<Edge>& edges, UnionFind& uf) {
    sort(edges.begin(), edges.end(), [](auto& a, auto& b) { return a.w < b.w; });
    vector<Edge> mst;
    for (auto& e : edges) {
        if (uf.unite(e.u, e.v)) mst.push_back(e);
    }
    return mst;
}`,
  },
  'topological-sort': {
    javascript: `function topologicalSort(graph) {
  const indegree = Object.fromEntries(Object.keys(graph).map((v) => [v, 0]));
  for (const edges of Object.values(graph)) for (const v of edges) indegree[v]++;
  const queue = Object.keys(indegree).filter((v) => indegree[v] === 0);
  const order = [];
  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const next of graph[node]) {
      indegree[next]--;
      if (indegree[next] === 0) queue.push(next);
    }
  }
  return order;
}`,
    python: `from collections import deque

def topological_sort(graph):
    indegree = {v: 0 for v in graph}
    for edges in graph.values():
        for v in edges:
            indegree[v] += 1
    queue = deque([v for v, d in indegree.items() if d == 0])
    order = []
    while queue:
        node = queue.popleft()
        order.append(node)
        for nxt in graph[node]:
            indegree[nxt] -= 1
            if indegree[nxt] == 0:
                queue.append(nxt)
    return order`,
    java: `List<String> topologicalSort(Map<String, List<String>> graph) {
    Map<String, Integer> indegree = new HashMap<>();
    for (String v : graph.keySet()) indegree.put(v, 0);
    for (List<String> edges : graph.values()) for (String v : edges) indegree.put(v, indegree.get(v) + 1);
    Queue<String> queue = new LinkedList<>();
    for (String v : indegree.keySet()) if (indegree.get(v) == 0) queue.offer(v);
    List<String> order = new ArrayList<>();
    while (!queue.isEmpty()) {
        String node = queue.poll();
        order.add(node);
        for (String next : graph.get(node)) {
            indegree.put(next, indegree.get(next) - 1);
            if (indegree.get(next) == 0) queue.offer(next);
        }
    }
    return order;
}`,
    cpp: `vector<int> topologicalSort(vector<vector<int>>& graph) {
    vector<int> indegree(graph.size()), order;
    for (auto& edges : graph) for (int v : edges) indegree[v]++;
    queue<int> q;
    for (int i = 0; i < indegree.size(); i++) if (indegree[i] == 0) q.push(i);
    while (!q.empty()) {
        int node = q.front(); q.pop();
        order.push_back(node);
        for (int next : graph[node]) if (--indegree[next] == 0) q.push(next);
    }
    return order;
}`,
  },
  'path-bfs': {
    javascript: `function gridBfs(start, goal, neighbors) {
  const queue = [start];
  const visited = new Set([start]);
  const parent = {};
  while (queue.length) {
    const cell = queue.shift();
    if (cell === goal) break;
    for (const next of neighbors(cell)) {
      if (!visited.has(next)) {
        visited.add(next);
        parent[next] = cell;
        queue.push(next);
      }
    }
  }
  return parent;
}`,
    python: `from collections import deque

def grid_bfs(start, goal, neighbors):
    queue = deque([start])
    visited = {start}
    parent = {}
    while queue:
        cell = queue.popleft()
        if cell == goal:
            break
        for nxt in neighbors(cell):
            if nxt not in visited:
                visited.add(nxt)
                parent[nxt] = cell
                queue.append(nxt)
    return parent`,
    java: `Map<Cell, Cell> gridBfs(Cell start, Cell goal) {
    Queue<Cell> queue = new LinkedList<>();
    Set<Cell> visited = new HashSet<>();
    Map<Cell, Cell> parent = new HashMap<>();
    queue.offer(start);
    visited.add(start);
    while (!queue.isEmpty()) {
        Cell cell = queue.poll();
        if (cell.equals(goal)) break;
        for (Cell next : neighbors(cell)) {
            if (visited.add(next)) {
                parent.put(next, cell);
                queue.offer(next);
            }
        }
    }
    return parent;
}`,
    cpp: `map<Cell, Cell> gridBfs(Cell start, Cell goal) {
    queue<Cell> q;
    set<Cell> visited;
    map<Cell, Cell> parent;
    q.push(start);
    visited.insert(start);
    while (!q.empty()) {
        Cell cell = q.front(); q.pop();
        if (cell == goal) break;
        for (Cell next : neighbors(cell)) {
            if (!visited.count(next)) {
                visited.insert(next);
                parent[next] = cell;
                q.push(next);
            }
        }
    }
    return parent;
}`,
  },
  'path-dfs': {
    javascript: `function gridDfs(start, goal, neighbors) {
  const stack = [start];
  const visited = new Set();
  const parent = {};
  while (stack.length) {
    const cell = stack.pop();
    if (visited.has(cell)) continue;
    visited.add(cell);
    if (cell === goal) break;
    for (const next of neighbors(cell)) {
      if (!visited.has(next)) {
        parent[next] = cell;
        stack.push(next);
      }
    }
  }
  return parent;
}`,
    python: `def grid_dfs(start, goal, neighbors):
    stack = [start]
    visited = set()
    parent = {}
    while stack:
        cell = stack.pop()
        if cell in visited:
            continue
        visited.add(cell)
        if cell == goal:
            break
        for nxt in neighbors(cell):
            if nxt not in visited:
                parent[nxt] = cell
                stack.append(nxt)
    return parent`,
    java: `Map<Cell, Cell> gridDfs(Cell start, Cell goal) {
    Deque<Cell> stack = new ArrayDeque<>();
    Set<Cell> visited = new HashSet<>();
    Map<Cell, Cell> parent = new HashMap<>();
    stack.push(start);
    while (!stack.isEmpty()) {
        Cell cell = stack.pop();
        if (!visited.add(cell)) continue;
        if (cell.equals(goal)) break;
        for (Cell next : neighbors(cell)) {
            parent.put(next, cell);
            stack.push(next);
        }
    }
    return parent;
}`,
    cpp: `map<Cell, Cell> gridDfs(Cell start, Cell goal) {
    stack<Cell> st;
    set<Cell> visited;
    map<Cell, Cell> parent;
    st.push(start);
    while (!st.empty()) {
        Cell cell = st.top(); st.pop();
        if (visited.count(cell)) continue;
        visited.insert(cell);
        if (cell == goal) break;
        for (Cell next : neighbors(cell)) {
            parent[next] = cell;
            st.push(next);
        }
    }
    return parent;
}`,
  },
  'path-dijkstra': {
    javascript: `function gridDijkstra(start, goal, neighbors) {
  const dist = { [start]: 0 };
  const parent = {};
  const open = new Set([start]);
  while (open.size) {
    const cell = [...open].sort((a, b) => dist[a] - dist[b])[0];
    open.delete(cell);
    if (cell === goal) break;
    for (const next of neighbors(cell)) {
      const candidate = dist[cell] + 1;
      if (candidate < (dist[next] ?? Infinity)) {
        dist[next] = candidate;
        parent[next] = cell;
        open.add(next);
      }
    }
  }
  return parent;
}`,
    python: `import heapq

def grid_dijkstra(start, goal, neighbors):
    dist = {start: 0}
    parent = {}
    heap = [(0, start)]
    while heap:
        d, cell = heapq.heappop(heap)
        if cell == goal:
            break
        for nxt in neighbors(cell):
            candidate = d + 1
            if candidate < dist.get(nxt, float("inf")):
                dist[nxt] = candidate
                parent[nxt] = cell
                heapq.heappush(heap, (candidate, nxt))
    return parent`,
    java: `Map<Cell, Cell> gridDijkstra(Cell start, Cell goal) {
    Map<Cell, Integer> dist = new HashMap<>();
    Map<Cell, Cell> parent = new HashMap<>();
    PriorityQueue<Cell> pq = new PriorityQueue<>(Comparator.comparingInt(dist::get));
    dist.put(start, 0);
    pq.offer(start);
    while (!pq.isEmpty()) {
        Cell cell = pq.poll();
        if (cell.equals(goal)) break;
        for (Cell next : neighbors(cell)) {
            int candidate = dist.get(cell) + 1;
            if (candidate < dist.getOrDefault(next, Integer.MAX_VALUE)) {
                dist.put(next, candidate);
                parent.put(next, cell);
                pq.offer(next);
            }
        }
    }
    return parent;
}`,
    cpp: `map<Cell, Cell> gridDijkstra(Cell start, Cell goal) {
    map<Cell, int> dist;
    map<Cell, Cell> parent;
    priority_queue<pair<int, Cell>, vector<pair<int, Cell>>, greater<pair<int, Cell>>> pq;
    dist[start] = 0;
    pq.push({0, start});
    while (!pq.empty()) {
        auto [d, cell] = pq.top(); pq.pop();
        if (cell == goal) break;
        for (Cell next : neighbors(cell)) {
            if (!dist.count(next) || d + 1 < dist[next]) {
                dist[next] = d + 1;
                parent[next] = cell;
                pq.push({dist[next], next});
            }
        }
    }
    return parent;
}`,
  },
  'path-a-star': {
    javascript: `function aStar(start, goal, neighbors, heuristic) {
  const g = { [start]: 0 };
  const f = { [start]: heuristic(start, goal) };
  const parent = {};
  const open = new Set([start]);
  while (open.size) {
    const cell = [...open].sort((a, b) => f[a] - f[b])[0];
    open.delete(cell);
    if (cell === goal) break;
    for (const next of neighbors(cell)) {
      const candidate = g[cell] + 1;
      if (candidate < (g[next] ?? Infinity)) {
        parent[next] = cell;
        g[next] = candidate;
        f[next] = candidate + heuristic(next, goal);
        open.add(next);
      }
    }
  }
  return parent;
}`,
    python: `import heapq

def a_star(start, goal, neighbors, heuristic):
    g = {start: 0}
    parent = {}
    heap = [(heuristic(start, goal), start)]
    while heap:
        _, cell = heapq.heappop(heap)
        if cell == goal:
            break
        for nxt in neighbors(cell):
            candidate = g[cell] + 1
            if candidate < g.get(nxt, float("inf")):
                parent[nxt] = cell
                g[nxt] = candidate
                heapq.heappush(heap, (candidate + heuristic(nxt, goal), nxt))
    return parent`,
    java: `Map<Cell, Cell> aStar(Cell start, Cell goal) {
    Map<Cell, Integer> g = new HashMap<>();
    Map<Cell, Cell> parent = new HashMap<>();
    PriorityQueue<Cell> open = new PriorityQueue<>(Comparator.comparingInt(c -> g.get(c) + heuristic(c, goal)));
    g.put(start, 0);
    open.offer(start);
    while (!open.isEmpty()) {
        Cell cell = open.poll();
        if (cell.equals(goal)) break;
        for (Cell next : neighbors(cell)) {
            int candidate = g.get(cell) + 1;
            if (candidate < g.getOrDefault(next, Integer.MAX_VALUE)) {
                parent.put(next, cell);
                g.put(next, candidate);
                open.offer(next);
            }
        }
    }
    return parent;
}`,
    cpp: `map<Cell, Cell> aStar(Cell start, Cell goal) {
    map<Cell, int> g;
    map<Cell, Cell> parent;
    priority_queue<State, vector<State>, greater<State>> open;
    g[start] = 0;
    open.push({heuristic(start, goal), start});
    while (!open.empty()) {
        Cell cell = open.top().cell; open.pop();
        if (cell == goal) break;
        for (Cell next : neighbors(cell)) {
            int candidate = g[cell] + 1;
            if (!g.count(next) || candidate < g[next]) {
                parent[next] = cell;
                g[next] = candidate;
                open.push({candidate + heuristic(next, goal), next});
            }
        }
    }
    return parent;
}`,
  },
  fibonacci: {
    javascript: `function fibonacci(n) {
  const dp = Array(n + 1).fill(0);
  dp[1] = 1;
  for (let i = 2; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];
  return dp[n];
}`,
    python: `def fibonacci(n):
    dp = [0] * (n + 1)
    if n > 0:
        dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]`,
    java: `int fibonacci(int n) {
    int[] dp = new int[n + 1];
    if (n > 0) dp[1] = 1;
    for (int i = 2; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];
    return dp[n];
}`,
    cpp: `int fibonacci(int n) {
    vector<int> dp(n + 1);
    if (n > 0) dp[1] = 1;
    for (int i = 2; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];
    return dp[n];
}`,
  },
  knapsack: {
    javascript: `function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      dp[i][w] = dp[i - 1][w];
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(dp[i][w], values[i - 1] + dp[i - 1][w - weights[i - 1]]);
      }
    }
  }
  return dp[n][capacity];
}`,
    python: `def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            dp[i][w] = dp[i - 1][w]
            if weights[i - 1] <= w:
                dp[i][w] = max(dp[i][w], values[i - 1] + dp[i - 1][w - weights[i - 1]])
    return dp[n][capacity]`,
    java: `int knapsack(int[] weights, int[] values, int capacity) {
    int n = weights.length;
    int[][] dp = new int[n + 1][capacity + 1];
    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= capacity; w++) {
            dp[i][w] = dp[i - 1][w];
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(dp[i][w], values[i - 1] + dp[i - 1][w - weights[i - 1]]);
            }
        }
    }
    return dp[n][capacity];
}`,
    cpp: `int knapsack(vector<int>& weights, vector<int>& values, int capacity) {
    int n = weights.size();
    vector<vector<int>> dp(n + 1, vector<int>(capacity + 1));
    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= capacity; w++) {
            dp[i][w] = dp[i - 1][w];
            if (weights[i - 1] <= w) {
                dp[i][w] = max(dp[i][w], values[i - 1] + dp[i - 1][w - weights[i - 1]]);
            }
        }
    }
    return dp[n][capacity];
}`,
  },
  lcs: {
    javascript: `function lcs(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = a[i - 1] === b[j - 1] ? 1 + dp[i - 1][j - 1] : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[a.length][b.length];
}`,
    python: `def lcs(a, b):
    dp = [[0] * (len(b) + 1) for _ in range(len(a) + 1)]
    for i in range(1, len(a) + 1):
        for j in range(1, len(b) + 1):
            if a[i - 1] == b[j - 1]:
                dp[i][j] = 1 + dp[i - 1][j - 1]
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[len(a)][len(b)]`,
    java: `int lcs(String a, String b) {
    int[][] dp = new int[a.length() + 1][b.length() + 1];
    for (int i = 1; i <= a.length(); i++) {
        for (int j = 1; j <= b.length(); j++) {
            dp[i][j] = a.charAt(i - 1) == b.charAt(j - 1)
                ? 1 + dp[i - 1][j - 1]
                : Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    return dp[a.length()][b.length()];
}`,
    cpp: `int lcs(string a, string b) {
    vector<vector<int>> dp(a.size() + 1, vector<int>(b.size() + 1));
    for (int i = 1; i <= a.size(); i++) {
        for (int j = 1; j <= b.size(); j++) {
            dp[i][j] = a[i - 1] == b[j - 1]
                ? 1 + dp[i - 1][j - 1]
                : max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    return dp[a.size()][b.size()];
}`,
  },
  'activity-selection': {
    javascript: `function activitySelection(activities) {
  activities.sort((a, b) => a.finish - b.finish);
  const selected = [];
  let lastFinish = -Infinity;
  for (const activity of activities) {
    if (activity.start >= lastFinish) {
      selected.push(activity);
      lastFinish = activity.finish;
    }
  }
  return selected;
}`,
    python: `def activity_selection(activities):
    activities.sort(key=lambda a: a.finish)
    selected = []
    last_finish = float("-inf")
    for activity in activities:
        if activity.start >= last_finish:
            selected.append(activity)
            last_finish = activity.finish
    return selected`,
    java: `List<Activity> activitySelection(List<Activity> activities) {
    activities.sort(Comparator.comparingInt(a -> a.finish));
    List<Activity> selected = new ArrayList<>();
    int lastFinish = Integer.MIN_VALUE;
    for (Activity activity : activities) {
        if (activity.start >= lastFinish) {
            selected.add(activity);
            lastFinish = activity.finish;
        }
    }
    return selected;
}`,
    cpp: `vector<Activity> activitySelection(vector<Activity>& activities) {
    sort(activities.begin(), activities.end(), [](auto& a, auto& b) { return a.finish < b.finish; });
    vector<Activity> selected;
    int lastFinish = INT_MIN;
    for (auto& activity : activities) {
        if (activity.start >= lastFinish) {
            selected.push_back(activity);
            lastFinish = activity.finish;
        }
    }
    return selected;
}`,
  },
  'fractional-knapsack': {
    javascript: `function fractionalKnapsack(items, capacity) {
  items.sort((a, b) => b.value / b.weight - a.value / a.weight);
  let total = 0;
  for (const item of items) {
    const take = Math.min(item.weight, capacity);
    total += take * (item.value / item.weight);
    capacity -= take;
    if (capacity === 0) break;
  }
  return total;
}`,
    python: `def fractional_knapsack(items, capacity):
    items.sort(key=lambda item: item.value / item.weight, reverse=True)
    total = 0
    for item in items:
        take = min(item.weight, capacity)
        total += take * (item.value / item.weight)
        capacity -= take
        if capacity == 0:
            break
    return total`,
    java: `double fractionalKnapsack(List<Item> items, int capacity) {
    items.sort((a, b) -> Double.compare((double)b.value / b.weight, (double)a.value / a.weight));
    double total = 0;
    for (Item item : items) {
        int take = Math.min(item.weight, capacity);
        total += take * ((double)item.value / item.weight);
        capacity -= take;
        if (capacity == 0) break;
    }
    return total;
}`,
    cpp: `double fractionalKnapsack(vector<Item>& items, int capacity) {
    sort(items.begin(), items.end(), [](auto& a, auto& b) {
        return (double)a.value / a.weight > (double)b.value / b.weight;
    });
    double total = 0;
    for (auto& item : items) {
        int take = min(item.weight, capacity);
        total += take * ((double)item.value / item.weight);
        capacity -= take;
        if (capacity == 0) break;
    }
    return total;
}`,
  },
  huffman: {
    javascript: `function huffman(frequencies) {
  const heap = frequencies.slice().sort((a, b) => a - b);
  while (heap.length > 1) {
    const first = heap.shift();
    const second = heap.shift();
    heap.push(first + second);
    heap.sort((a, b) => a - b);
  }
  return heap[0];
}`,
    python: `import heapq

def huffman(frequencies):
    heap = frequencies[:]
    heapq.heapify(heap)
    while len(heap) > 1:
        first = heapq.heappop(heap)
        second = heapq.heappop(heap)
        heapq.heappush(heap, first + second)
    return heap[0]`,
    java: `int huffman(List<Integer> frequencies) {
    PriorityQueue<Integer> heap = new PriorityQueue<>(frequencies);
    while (heap.size() > 1) {
        int first = heap.poll();
        int second = heap.poll();
        heap.offer(first + second);
    }
    return heap.poll();
}`,
    cpp: `int huffman(vector<int>& frequencies) {
    priority_queue<int, vector<int>, greater<int>> heap(frequencies.begin(), frequencies.end());
    while (heap.size() > 1) {
        int first = heap.top(); heap.pop();
        int second = heap.top(); heap.pop();
        heap.push(first + second);
    }
    return heap.top();
}`,
  },
  'n-queens': {
    javascript: `function solveNQueens(n) {
  const board = Array.from({ length: n }, () => Array(n).fill('.'));
  const solutions = [];
  const safe = (row, col) => {
    for (let r = 0; r < row; r++) if (board[r][col] === 'Q') return false;
    for (let r = row - 1, c = col - 1; r >= 0 && c >= 0; r--, c--) if (board[r][c] === 'Q') return false;
    for (let r = row - 1, c = col + 1; r >= 0 && c < n; r--, c++) if (board[r][c] === 'Q') return false;
    return true;
  };
  const backtrack = (row) => {
    if (row === n) {
      solutions.push(board.map((line) => line.join('')));
      return;
    }
    for (let col = 0; col < n; col++) {
      if (safe(row, col)) {
        board[row][col] = 'Q';
        backtrack(row + 1);
        board[row][col] = '.';
      }
    }
  };
  backtrack(0);
  return solutions;
}`,
    python: `def solve_n_queens(n):
    board = [["."] * n for _ in range(n)]
    solutions = []
    def safe(row, col):
        for r in range(row):
            if board[r][col] == "Q":
                return False
        for dr, dc in [(-1, -1), (-1, 1)]:
            r, c = row + dr, col + dc
            while 0 <= r < n and 0 <= c < n:
                if board[r][c] == "Q":
                    return False
                r += dr
                c += dc
        return True
    def backtrack(row):
        if row == n:
            solutions.append(["".join(line) for line in board])
            return
        for col in range(n):
            if safe(row, col):
                board[row][col] = "Q"
                backtrack(row + 1)
                board[row][col] = "."
    backtrack(0)
    return solutions`,
    java: `List<List<String>> solveNQueens(int n) {
    char[][] board = new char[n][n];
    for (char[] row : board) Arrays.fill(row, '.');
    List<List<String>> solutions = new ArrayList<>();
    backtrack(0, board, solutions);
    return solutions;
}`,
    cpp: `void solve(int row, vector<string>& board, vector<vector<string>>& out) {
    int n = board.size();
    if (row == n) {
        out.push_back(board);
        return;
    }
    for (int col = 0; col < n; col++) {
        if (safe(board, row, col)) {
            board[row][col] = 'Q';
            solve(row + 1, board, out);
            board[row][col] = '.';
        }
    }
}`,
  },
  sudoku: {
    javascript: `function solveSudoku(board) {
  const valid = (r, c, value) => {
    for (let i = 0; i < 9; i++) {
      if (board[r][i] === value || board[i][c] === value) return false;
    }
    const br = Math.floor(r / 3) * 3, bc = Math.floor(c / 3) * 3;
    for (let i = br; i < br + 3; i++) for (let j = bc; j < bc + 3; j++) {
      if (board[i][j] === value) return false;
    }
    return true;
  };
  const solve = () => {
    for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) {
      if (board[r][c] === '.') {
        for (const value of '123456789') {
          if (valid(r, c, value)) {
            board[r][c] = value;
            if (solve()) return true;
            board[r][c] = '.';
          }
        }
        return false;
      }
    }
    return true;
  };
  solve();
  return board;
}`,
    python: `def solve_sudoku(board):
    def valid(r, c, value):
        if any(board[r][i] == value or board[i][c] == value for i in range(9)):
            return False
        br, bc = (r // 3) * 3, (c // 3) * 3
        return all(board[i][j] != value for i in range(br, br + 3) for j in range(bc, bc + 3))
    def solve():
        for r in range(9):
            for c in range(9):
                if board[r][c] == ".":
                    for value in "123456789":
                        if valid(r, c, value):
                            board[r][c] = value
                            if solve():
                                return True
                            board[r][c] = "."
                    return False
        return True
    solve()
    return board`,
    java: `boolean solveSudoku(char[][] board) {
    for (int r = 0; r < 9; r++) {
        for (int c = 0; c < 9; c++) {
            if (board[r][c] == '.') {
                for (char value = '1'; value <= '9'; value++) {
                    if (valid(board, r, c, value)) {
                        board[r][c] = value;
                        if (solveSudoku(board)) return true;
                        board[r][c] = '.';
                    }
                }
                return false;
            }
        }
    }
    return true;
}`,
    cpp: `bool solveSudoku(vector<vector<char>>& board) {
    for (int r = 0; r < 9; r++) {
        for (int c = 0; c < 9; c++) {
            if (board[r][c] == '.') {
                for (char value = '1'; value <= '9'; value++) {
                    if (valid(board, r, c, value)) {
                        board[r][c] = value;
                        if (solveSudoku(board)) return true;
                        board[r][c] = '.';
                    }
                }
                return false;
            }
        }
    }
    return true;
}`,
  },
  permutations: {
    javascript: `function permutations(values) {
  const result = [];
  const path = [];
  const used = new Set();
  const backtrack = () => {
    if (path.length === values.length) {
      result.push([...path]);
      return;
    }
    for (const value of values) {
      if (used.has(value)) continue;
      used.add(value);
      path.push(value);
      backtrack();
      path.pop();
      used.delete(value);
    }
  };
  backtrack();
  return result;
}`,
    python: `def permutations(values):
    result, path, used = [], [], set()
    def backtrack():
        if len(path) == len(values):
            result.append(path[:])
            return
        for value in values:
            if value in used:
                continue
            used.add(value)
            path.append(value)
            backtrack()
            path.pop()
            used.remove(value)
    backtrack()
    return result`,
    java: `List<List<Integer>> permutations(int[] values) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(values, new boolean[values.length], new ArrayList<>(), result);
    return result;
}`,
    cpp: `void permutations(vector<int>& values, vector<bool>& used, vector<int>& path, vector<vector<int>>& result) {
    if (path.size() == values.size()) {
        result.push_back(path);
        return;
    }
    for (int i = 0; i < values.size(); i++) {
        if (used[i]) continue;
        used[i] = true;
        path.push_back(values[i]);
        permutations(values, used, path, result);
        path.pop_back();
        used[i] = false;
    }
}`,
  },
};

export function getCodeSnippet(algorithmId, language = 'javascript') {
  const queueAlias = algorithmId.startsWith('queue-') && algorithmId.endsWith('-enqueue')
    ? 'queue-enqueue'
    : algorithmId.startsWith('queue-') && algorithmId.endsWith('-dequeue')
      ? 'queue-dequeue'
      : algorithmId;
  const snippets = CODE_SNIPPETS[queueAlias];
  if (!snippets) {
    return `// ${algorithmId}
// This algorithm uses the shared frame-based visualization engine.
// See src/services for the executable implementation used by the visualizer.`;
  }
  return snippets[language] || snippets.javascript;
}
