-- First, clear existing data if needed (optional)
-- DELETE FROM public.roadmap_nodes;
-- DELETE FROM public.roadmaps;
-- DELETE FROM public.user_problem_attempts;
-- DELETE FROM public.problems;
-- DELETE FROM public.user_progress;
-- DELETE FROM public.lessons;
-- DELETE FROM public.courses;

-- Seed data for courses
INSERT INTO public.courses (id, title, description, image_url, difficulty, is_premium, order_index)
VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'Data Structures', 'Learn the fundamentals of data structures', '/images/courses/data-structures.jpg', 'Beginner', false, 1),
  ('550e8400-e29b-41d4-a716-446655440001', 'Python for Coding Interviews', 'Master Python for coding interviews', '/images/courses/python.jpg', 'Intermediate', false, 2),
  ('550e8400-e29b-41d4-a716-446655440002', 'Big O Notation', 'Understanding time and space complexity', '/images/courses/big-o.jpg', 'Beginner', false, 3)
ON CONFLICT (id) DO NOTHING;

-- Seed data for lessons
INSERT INTO public.lessons (id, course_id, title, description, content, video_url, duration, is_premium, order_index)
VALUES
  ('660e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440000', 'RAM', 'Understanding Random Access Memory', 'Content for RAM lesson', 'https://example.com/ram.mp4', 6, false, 1),
  ('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'Static Arrays', 'Learning about Static Arrays', 'Content for Static Arrays lesson', 'https://example.com/arrays.mp4', 15, false, 2),
  ('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', 'Dynamic Arrays', 'Understanding Dynamic Arrays', 'Content for Dynamic Arrays lesson', 'https://example.com/dynamic.mp4', 20, true, 3),
  ('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440000', 'Linked Lists', 'Introduction to Linked Lists', 'Content for Linked Lists lesson', 'https://example.com/linkedlists.mp4', 18, true, 4),
  
  ('660e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440001', 'Python Basics', 'Python syntax overview', 'Content for Python Basics', 'https://example.com/python-basics.mp4', 10, false, 1),
  ('660e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440001', 'List Comprehensions', 'Master list comprehensions', 'Content for List Comprehensions', 'https://example.com/list-comp.mp4', 12, false, 2),
  ('660e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440001', 'Lambda Functions', 'Working with lambda functions', 'Content for Lambda Functions', 'https://example.com/lambda.mp4', 15, true, 3),
  
  ('660e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440002', 'Introduction to Big-O', 'Understanding algorithmic complexity', 'Content for Intro to Big-O', 'https://example.com/bigo-intro.mp4', 8, false, 1),
  ('660e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440002', 'Time Complexity', 'Analyzing algorithm running time', 'Content for Time Complexity', 'https://example.com/time-complexity.mp4', 12, false, 2),
  ('660e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440002', 'Space Complexity', 'Analyzing algorithm memory usage', 'Content for Space Complexity', 'https://example.com/space-complexity.mp4', 10, true, 3)
ON CONFLICT (id) DO NOTHING;

-- Seed data for roadmaps
INSERT INTO public.roadmaps (id, title, description, difficulty, order_index, is_premium)
VALUES 
  ('770e8400-e29b-41d4-a716-446655440000', 'Data Structures & Algorithms Path', 'Master DSA for coding interviews', 'Intermediate', 1, false),
  ('770e8400-e29b-41d4-a716-446655440001', 'System Design Path', 'Learn system design principles', 'Advanced', 2, true)
ON CONFLICT (id) DO NOTHING;

-- Seed data for roadmap nodes
-- Data Structures & Algorithms Path Nodes
INSERT INTO public.roadmap_nodes (
  id, roadmap_id, title, description, parent_id, order_index, is_premium, color, type, estimated_hours
) VALUES
  -- Level 1 (Fundamentals)
  ('880e8400-e29b-41d4-a716-446655440000', '770e8400-e29b-41d4-a716-446655440000', 'DSA Fundamentals', 'Master these concepts before proceeding', NULL, 1, false, '#3498db', 'section', 20),
  ('880e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440000', 'Big O Notation', 'Understanding time & space complexity', '880e8400-e29b-41d4-a716-446655440000', 1, false, '#3498db', 'topic', 2),
  ('880e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440000', 'Arrays & Strings', 'Fundamental data structures', '880e8400-e29b-41d4-a716-446655440000', 2, false, '#3498db', 'topic', 3),
  ('880e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440000', 'Linked Lists', 'Learn singly & doubly linked lists', '880e8400-e29b-41d4-a716-446655440000', 3, false, '#3498db', 'topic', 3),
  ('880e8400-e29b-41d4-a716-446655440004', '770e8400-e29b-41d4-a716-446655440000', 'Hash Tables', 'Understand hash functions & collision resolution', '880e8400-e29b-41d4-a716-446655440000', 4, false, '#3498db', 'topic', 2),

  -- Level 2 (Intermediate)
  ('880e8400-e29b-41d4-a716-446655440005', '770e8400-e29b-41d4-a716-446655440000', 'Intermediate Algorithms', 'Core algorithmic patterns', NULL, 2, false, '#e74c3c', 'section', 30),
  ('880e8400-e29b-41d4-a716-446655440006', '770e8400-e29b-41d4-a716-446655440000', 'Binary Search', 'Master this essential search algorithm', '880e8400-e29b-41d4-a716-446655440005', 1, false, '#e74c3c', 'topic', 4),
  ('880e8400-e29b-41d4-a716-446655440007', '770e8400-e29b-41d4-a716-446655440000', 'Sorting Algorithms', 'QuickSort, MergeSort & more', '880e8400-e29b-41d4-a716-446655440005', 2, false, '#e74c3c', 'topic', 6),
  ('880e8400-e29b-41d4-a716-446655440008', '770e8400-e29b-41d4-a716-446655440000', 'Recursion', 'Understand recursive algorithms', '880e8400-e29b-41d4-a716-446655440005', 3, false, '#e74c3c', 'topic', 5),
  ('880e8400-e29b-41d4-a716-446655440009', '770e8400-e29b-41d4-a716-446655440000', 'Backtracking', 'Solve constraint satisfaction problems', '880e8400-e29b-41d4-a716-446655440005', 4, false, '#e74c3c', 'topic', 6),

  -- Level 3 (Advanced)
  ('880e8400-e29b-41d4-a716-446655440010', '770e8400-e29b-41d4-a716-446655440000', 'Advanced Data Structures', 'Master these for difficult problems', NULL, 3, true, '#9b59b6', 'section', 40),
  ('880e8400-e29b-41d4-a716-446655440011', '770e8400-e29b-41d4-a716-446655440000', 'Trees & Graphs', 'Advanced tree & graph algorithms', '880e8400-e29b-41d4-a716-446655440010', 1, false, '#9b59b6', 'topic', 8),
  ('880e8400-e29b-41d4-a716-446655440012', '770e8400-e29b-41d4-a716-446655440000', 'Dynamic Programming', 'Learn to recognize & solve DP problems', '880e8400-e29b-41d4-a716-446655440010', 2, true, '#9b59b6', 'topic', 10),
  ('880e8400-e29b-41d4-a716-446655440013', '770e8400-e29b-41d4-a716-446655440000', 'Advanced Graph Algorithms', 'Dijkstra, Bellman-Ford, etc.', '880e8400-e29b-41d4-a716-446655440010', 3, true, '#9b59b6', 'topic', 8),
  ('880e8400-e29b-41d4-a716-446655440014', '770e8400-e29b-41d4-a716-446655440000', 'System Design Basics', 'Introduction to system design', '880e8400-e29b-41d4-a716-446655440010', 4, true, '#9b59b6', 'topic', 6)
ON CONFLICT (id) DO NOTHING; 