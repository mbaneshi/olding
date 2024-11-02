### List of Available Data Structures in Computer Science

Data structures are essential building blocks for organizing and managing data efficiently. Here's a comprehensive list of data structures commonly used in computer science:

#### **1. Linear Data Structures**  
Linear data structures arrange data elements sequentially, where each element is connected to its previous and next element.

- **Array**: A collection of elements identified by index or key, stored in contiguous memory locations.
- **Linked List**: A linear collection of data elements where each element points to the next, forming a sequence.
  - **Singly Linked List**: Each node points to the next node.
  - **Doubly Linked List**: Each node has two links, one to the previous node and one to the next node.
  - **Circular Linked List**: The last node points to the first node, forming a circle.
- **Stack**: A collection of elements with LIFO (Last In, First Out) access. Elements are added and removed from the top.
- **Queue**: A collection of elements with FIFO (First In, First Out) access. Elements are added from the rear and removed from the front.
  - **Priority Queue**: Each element has a priority, and the element with the highest priority is dequeued first.
  - **Dequeue (Double-Ended Queue)**: Allows insertion and deletion from both ends.

#### **2. Hash-Based Data Structures**  
These structures store data in key-value pairs for efficient lookups, inserts, and deletes.

- **Hash Table**: Maps keys to values using a hash function for efficient retrieval. Hash collisions are typically handled with chaining or open addressing.
- **Hash Map**: An implementation of the hash table where elements are stored based on the computed hash code of the key.
- **Hash Set**: A collection that contains no duplicate elements and is backed by a hash table for fast lookups.

#### **3. Tree Data Structures**  
Tree structures are hierarchical, with a root node and sub-nodes forming a tree-like structure.

- **Binary Tree**: Each node has at most two children, called left and right.
  - **Binary Search Tree (BST)**: A binary tree where the left subtree contains nodes with values less than the parent node, and the right subtree contains nodes with values greater than the parent node.
  - **AVL Tree**: A self-balancing binary search tree where the difference in height between the left and right subtrees is at most one.
  - **Red-Black Tree**: A self-balancing binary search tree where nodes have an additional color property to maintain balance.
- **Heap**: A special type of binary tree that satisfies the heap property.
  - **Min-Heap**: The parent node is always smaller than its children.
  - **Max-Heap**: The parent node is always larger than its children.
- **Trie (Prefix Tree)**: A tree used to store strings where each node represents a character, commonly used in word searches and autocomplete systems.
- **B-Tree**: A self-balancing tree that maintains sorted data and allows searches, sequential access, insertions, and deletions in logarithmic time. Often used in databases.
- **B+ Tree**: A variant of the B-tree where all values are stored at the leaf level, with linked leaf nodes to provide efficient range queries.

#### **4. Graph Data Structures**  
Graphs are collections of nodes (vertices) connected by edges. They can be used to model networks.

- **Graph**: A collection of vertices and edges, where edges may represent relationships between the vertices.
  - **Directed Graph (Digraph)**: A graph where edges have a direction, indicating the relationship goes one way (from one vertex to another).
  - **Undirected Graph**: A graph where edges do not have a direction, and relationships are bidirectional.
  - **Weighted Graph**: A graph where edges have weights, often used to represent costs or distances.
  - **Unweighted Graph**: A graph where all edges have equal weight.
  - **Cyclic Graph**: A graph that contains at least one cycle.
  - **Acyclic Graph**: A graph that does not contain any cycles.
  - **DAG (Directed Acyclic Graph)**: A directed graph with no cycles, often used to represent dependencies.
  - **Adjacency Matrix**: A 2D array used to represent a graph where the element at position (i, j) indicates if there is an edge between vertex i and vertex j.
  - **Adjacency List**: A list where each index represents a vertex, and each entry stores the connected vertices.

#### **5. Specialized Data Structures**  
These structures are used in specific applications or provide enhanced capabilities.

- **Segment Tree**: A tree used for storing intervals or segments, allowing efficient range queries and updates.
- **Fenwick Tree (Binary Indexed Tree)**: A tree used to store cumulative frequency tables, allowing efficient updates and prefix sum queries.
- **Suffix Tree**: A compressed trie of all suffixes of a string, used for efficient pattern matching.
- **Disjoint Set (Union-Find)**: A data structure that keeps track of elements partitioned into disjoint (non-overlapping) sets, often used in network connectivity and Kruskal’s algorithm for minimum spanning trees.
- **Bloom Filter**: A probabilistic data structure used to test whether an element is a member of a set. False positives are possible, but false negatives are not.
- **Skip List**: A linked list with multiple layers, allowing fast searches, insertions, and deletions by “skipping” over parts of the list.
- **K-D Tree**: A space-partitioning data structure for organizing points in a k-dimensional space, used in applications like nearest neighbor search.
- **Quad Tree**: A tree used to partition a two-dimensional space by recursively subdividing it into four quadrants or regions.
- **Octree**: Similar to a quad tree but in three-dimensional space, used in 3D computer graphics and spatial indexing.

### Conclusion
Data structures are fundamental for solving computational problems efficiently. By choosing the right data structure based on the nature of the problem, one can achieve better performance and optimized solutions.

---

**Timestamp**: 2024-10-14 10:39:00  
**Description**: Provided a categorized list of data structures in computer science.  
**Length**: 69 lines, 4,842 characters  

```data-structures-list.md```
