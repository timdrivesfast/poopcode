'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// Mock data for lessons
const LESSONS_DATA = {
  'python-for-coding-interviews': {
    title: 'Python Cheat Sheet',
    videoId: 'dQw4w9WgXcQ', // Replace with actual YouTube ID
    updated: 'Jan 22, 2025',
    author: 'Navdeep Singh',
    content: `
      <div class="prose prose-invert max-w-none">
        <p>This guide is a collection of Python code snippets that cover the basics of the language. It is intended to be a quick reference for anyone who is new to Python or needs a refresher.</p>
        
        <p>You may also find the following courses helpful:</p>
        
        <ul>
          <li><a href="/courses/python-for-beginners" class="text-blue-400 hover:underline">Python for Beginners</a> - Learn the basics of Python with 80 interactive coding exercises.</li>
          <li><a href="/courses/python-data-structures" class="text-blue-400 hover:underline">Python Data Structures</a> - Master lists, tuples, dictionaries, sets and more.</li>
          <li><a href="/courses/algorithms-in-python" class="text-blue-400 hover:underline">Algorithms in Python</a> - Implement classic algorithms using pythonic code.</li>
        </ul>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Basic Syntax</h2>
        
        <pre class="bg-gray-800 p-4 rounded-lg overflow-x-auto"><code class="language-python"># This is a comment
print("Hello, World!")  # Print statement

# Variables
x = 5
y = "Hello"

# Multiple assignment
a, b, c = 1, 2, 3

# Basic data types
my_int = 5           # integer
my_float = 5.0       # float
my_string = "Hello"  # string
my_bool = True       # boolean
my_none = None       # NoneType</code></pre>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Data Structures</h2>
        
        <h3 class="text-xl font-bold mt-6 mb-3">Lists</h3>
        
        <pre class="bg-gray-800 p-4 rounded-lg overflow-x-auto"><code class="language-python"># Creating lists
my_list = [1, 2, 3, 4, 5]
mixed_list = [1, "Hello", 3.14, True]

# Accessing elements
first_item = my_list[0]      # 1 (first item)
last_item = my_list[-1]      # 5 (last item)

# Slicing
subset = my_list[1:3]        # [2, 3] (from index 1 to 2)
start_to_index = my_list[:3] # [1, 2, 3] (from start to index 2)
index_to_end = my_list[2:]   # [3, 4, 5] (from index 2 to end)

# List methods
my_list.append(6)            # Add to end: [1, 2, 3, 4, 5, 6]
my_list.insert(0, 0)         # Insert at index: [0, 1, 2, 3, 4, 5, 6]
my_list.remove(3)            # Remove value: [0, 1, 2, 4, 5, 6]
popped = my_list.pop()       # Remove & return last item: 6
length = len(my_list)        # Get length: 5</code></pre>
      </div>
    `
  },
  // Add more lessons here
};

export default function LessonPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [lesson, setLesson] = useState<any>(null);
  
  useEffect(() => {
    // In a real app, you would fetch the lesson data from an API
    setLesson(LESSONS_DATA[slug]);
  }, [slug]);
  
  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-400">Loading lesson...</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Video Embed */}
      <div className="w-full aspect-video bg-black mb-12">
        <iframe 
          src={`https://www.youtube.com/embed/${lesson.videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
      
      {/* Lesson Title */}
      <h1 className="text-4xl font-bold mb-6">{lesson.title}</h1>
      
      {/* Lesson Metadata */}
      <div className="bg-gray-800 p-6 rounded mb-8 border-l-4 border-gray-600">
        <div className="mb-1">
          <span className="text-gray-400">Updated: </span>
          <span>{lesson.updated}</span>
        </div>
        <div>
          <span className="text-gray-400">Author: </span>
          <span>{lesson.author}</span>
        </div>
      </div>
      
      {/* Lesson Content */}
      <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
    </div>
  );
} 