import { Quiz } from '@/lib/types/Quiz';

export const SAMPLE_QUIZZES: Quiz[] = [
  {
    id: 'arrays-fundamentals',
    title: 'Arrays Fundamentals',
    description: 'Test your knowledge of array operations and time complexity',
    category: 'Data Structures',
    difficulty: 'Easy',
    questions: [
      {
        id: 'q1',
        text: 'What is the time complexity of accessing an element in an array by index?',
        options: [
          { id: 'a', text: 'O(1)', isCorrect: true },
          { id: 'b', text: 'O(n)', isCorrect: false },
          { id: 'c', text: 'O(log n)', isCorrect: false },
          { id: 'd', text: 'O(n²)', isCorrect: false }
        ],
        explanation: 'Array access by index is constant time O(1) because it involves a simple calculation to find the memory location.'
      },
      {
        id: 'q2',
        text: 'Which operation is not O(1) for JavaScript arrays?',
        options: [
          { id: 'a', text: 'Access by index', isCorrect: false },
          { id: 'b', text: 'Adding to the end with push()', isCorrect: false },
          { id: 'c', text: 'Removing from the beginning with shift()', isCorrect: true },
          { id: 'd', text: 'Checking length property', isCorrect: false }
        ],
        explanation: 'shift() is O(n) because it requires all elements to be shifted one position.'
      },
      {
        id: 'q3',
        text: 'What is the space complexity of creating a copy of an array with n elements?',
        options: [
          { id: 'a', text: 'O(1)', isCorrect: false },
          { id: 'b', text: 'O(n)', isCorrect: true },
          { id: 'c', text: 'O(log n)', isCorrect: false },
          { id: 'd', text: 'O(n²)', isCorrect: false }
        ],
        explanation: 'Creating a copy of an array requires allocating space for each element of the original array, resulting in O(n) space complexity.'
      },
      {
        id: 'q4',
        text: 'Which data structure would be most efficient for implementing a "recent files" list where the most recently accessed files appear first?',
        options: [
          { id: 'a', text: 'Array', isCorrect: false },
          { id: 'b', text: 'Queue', isCorrect: false },
          { id: 'c', text: 'Stack', isCorrect: false },
          { id: 'd', text: 'Linked List', isCorrect: true }
        ],
        explanation: 'A linked list allows for efficient insertion/removal from any position, which is useful for maintaining a list where items frequently change position.'
      },
    ],
    timeLimit: 5
  },
  {
    id: 'big-o-quiz',
    title: 'Big-O Notation Quiz',
    description: 'Test your understanding of algorithm complexity analysis',
    category: 'Big-O Notation',
    difficulty: 'Medium',
    questions: [
      {
        id: 'q1',
        text: 'What is the time complexity of binary search?',
        options: [
          { id: 'a', text: 'O(1)', isCorrect: false },
          { id: 'b', text: 'O(n)', isCorrect: false },
          { id: 'c', text: 'O(log n)', isCorrect: true },
          { id: 'd', text: 'O(n log n)', isCorrect: false }
        ],
        explanation: 'Binary search divides the search space in half with each step, resulting in logarithmic O(log n) time complexity.'
      },
      {
        id: 'q2',
        text: 'What is the time complexity of merging two sorted arrays of sizes m and n?',
        options: [
          { id: 'a', text: 'O(1)', isCorrect: false },
          { id: 'b', text: 'O(log(m+n))', isCorrect: false },
          { id: 'c', text: 'O(m+n)', isCorrect: true },
          { id: 'd', text: 'O(m*n)', isCorrect: false }
        ],
        explanation: 'Merging two sorted arrays requires comparing each element once, resulting in a linear O(m+n) time complexity.'
      },
      {
        id: 'q3',
        text: 'Which sorting algorithm has the best average case performance?',
        options: [
          { id: 'a', text: 'Bubble Sort - O(n²)', isCorrect: false },
          { id: 'b', text: 'Quick Sort - O(n log n)', isCorrect: true },
          { id: 'c', text: 'Insertion Sort - O(n²)', isCorrect: false },
          { id: 'd', text: 'Selection Sort - O(n²)', isCorrect: false }
        ],
        explanation: 'Quick Sort has an average case time complexity of O(n log n), which is better than the O(n²) algorithms listed.'
      },
    ],
    timeLimit: 10
  },
  {
    id: 'system-design-basics',
    title: 'System Design Basics',
    description: 'Fundamentals of system design concepts',
    category: 'System Design',
    difficulty: 'Hard',
    questions: [
      {
        id: 'q1',
        text: 'Which of these is NOT a typical concern when designing for horizontal scaling?',
        options: [
          { id: 'a', text: 'Data partitioning', isCorrect: false },
          { id: 'b', text: 'CPU optimization of a single node', isCorrect: true },
          { id: 'c', text: 'Load balancing', isCorrect: false },
          { id: 'd', text: 'Stateless architecture', isCorrect: false }
        ],
        explanation: 'Horizontal scaling focuses on distributing load across multiple machines rather than optimizing a single machine.'
      },
      {
        id: 'q2',
        text: 'Which database type is most suitable for handling relationships between complex data entities?',
        options: [
          { id: 'a', text: 'NoSQL Document Databases (MongoDB)', isCorrect: false },
          { id: 'b', text: 'Key-Value Stores (Redis)', isCorrect: false },
          { id: 'c', text: 'Relational Databases (MySQL, PostgreSQL)', isCorrect: true },
          { id: 'd', text: 'Graph Databases (Neo4j)', isCorrect: false }
        ],
        explanation: 'Relational databases are designed specifically to handle relationships between data entities using foreign keys, joins, and normalized tables.'
      },
      {
        id: 'q3',
        text: 'What is the primary purpose of a load balancer in a distributed system?',
        options: [
          { id: 'a', text: 'Encrypt data transmission', isCorrect: false },
          { id: 'b', text: 'Distribute incoming traffic across multiple servers', isCorrect: true },
          { id: 'c', text: 'Store user session data', isCorrect: false },
          { id: 'd', text: 'Perform database queries', isCorrect: false }
        ],
        explanation: 'Load balancers distribute incoming network traffic across multiple servers to ensure no single server is overwhelmed, increasing reliability and availability.'
      },
      {
        id: 'q4',
        text: 'Which caching strategy invalidates cache entries after a fixed time period?',
        options: [
          { id: 'a', text: 'Time-based (TTL) caching', isCorrect: true },
          { id: 'b', text: 'Write-through caching', isCorrect: false },
          { id: 'c', text: 'Cache-aside (Lazy Loading)', isCorrect: false },
          { id: 'd', text: 'LRU (Least Recently Used) caching', isCorrect: false }
        ],
        explanation: 'Time-based caching, often implemented using Time-To-Live (TTL), automatically expires cache entries after a predetermined time period.'
      },
    ],
    timeLimit: 15
  }
]; 