-- Create the public schema
CREATE SCHEMA IF NOT EXISTS public;

-- Enable Row-Level Security
ALTER TABLE IF EXISTS public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.user_problem_attempts ENABLE ROW LEVEL SECURITY;

-- Create profiles table to store user profile information
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  is_premium BOOLEAN DEFAULT FALSE,
  premium_expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create courses table
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  difficulty TEXT CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  is_premium BOOLEAN DEFAULT FALSE,
  image_url TEXT,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create lessons table
CREATE TABLE IF NOT EXISTS public.lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  video_url TEXT,
  duration INTEGER, -- in minutes
  is_premium BOOLEAN DEFAULT FALSE,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user progress table
CREATE TABLE IF NOT EXISTS public.user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
  is_completed BOOLEAN DEFAULT FALSE,
  completion_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (user_id, lesson_id)
);

-- Create problems table
CREATE TABLE IF NOT EXISTS public.problems (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  category TEXT NOT NULL,
  solution TEXT,
  is_premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user problem attempts table
CREATE TABLE IF NOT EXISTS public.user_problem_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  problem_id UUID REFERENCES public.problems(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  language TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT FALSE,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (user_id, problem_id, submitted_at)
);

-- Create roadmap table
CREATE TABLE IF NOT EXISTS public.roadmaps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  difficulty TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_premium BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create roadmap nodes table (these are the individual skills/topics in the roadmap)
CREATE TABLE IF NOT EXISTS public.roadmap_nodes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  roadmap_id UUID REFERENCES public.roadmaps(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  parent_id UUID REFERENCES public.roadmap_nodes(id) ON DELETE SET NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_premium BOOLEAN NOT NULL DEFAULT false,
  color TEXT, -- For visual customization
  type TEXT NOT NULL DEFAULT 'topic', -- topic, resource, challenge, etc.
  estimated_hours INTEGER,
  related_courses UUID[] DEFAULT array[]::UUID[], -- Array of course IDs
  related_problems UUID[] DEFAULT array[]::UUID[], -- Array of problem IDs
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user roadmap progress table
CREATE TABLE IF NOT EXISTS public.user_roadmap_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  node_id UUID REFERENCES public.roadmap_nodes(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'not_started', -- not_started, in_progress, completed
  notes TEXT,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (user_id, node_id)
);

-- First, drop existing policies that might conflict
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Anyone can view courses" ON public.courses;
DROP POLICY IF EXISTS "Anyone can view non-premium lessons" ON public.lessons;
DROP POLICY IF EXISTS "Users can view their own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can insert their own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can update their own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Anyone can view non-premium problems" ON public.problems;
DROP POLICY IF EXISTS "Users can view their own attempts" ON public.user_problem_attempts;
DROP POLICY IF EXISTS "Users can insert their own attempts" ON public.user_problem_attempts;
DROP POLICY IF EXISTS "Roadmaps are viewable by everyone" ON public.roadmaps;
DROP POLICY IF EXISTS "Regular nodes are viewable by everyone" ON public.roadmap_nodes;
DROP POLICY IF EXISTS "Users can view their own roadmap progress" ON public.user_roadmap_progress;
DROP POLICY IF EXISTS "Users can insert their own roadmap progress" ON public.user_roadmap_progress;
DROP POLICY IF EXISTS "Users can update their own roadmap progress" ON public.user_roadmap_progress;

-- Then create policies (without IF NOT EXISTS)
-- Profiles RLS
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Courses RLS
CREATE POLICY "Anyone can view courses"
  ON public.courses
  FOR SELECT
  USING (true);

-- Lessons RLS
CREATE POLICY "Anyone can view non-premium lessons"
  ON public.lessons
  FOR SELECT
  USING (NOT is_premium OR EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND is_premium = true AND premium_expires_at > NOW()
  ));

-- User Progress RLS
CREATE POLICY "Users can view their own progress"
  ON public.user_progress
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress"
  ON public.user_progress
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
  ON public.user_progress
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Problems RLS
CREATE POLICY "Anyone can view non-premium problems"
  ON public.problems
  FOR SELECT
  USING (NOT is_premium OR EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND is_premium = true AND premium_expires_at > NOW()
  ));

-- User Problem Attempts RLS
CREATE POLICY "Users can view their own attempts"
  ON public.user_problem_attempts
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own attempts"
  ON public.user_problem_attempts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Roadmap RLS
CREATE POLICY "Roadmaps are viewable by everyone"
  ON public.roadmaps
  FOR SELECT
  USING (true);

-- Roadmap Nodes RLS
CREATE POLICY "Regular nodes are viewable by everyone"
  ON public.roadmap_nodes
  FOR SELECT
  USING (NOT is_premium OR EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND is_premium = true AND premium_expires_at > NOW()
  ));

-- User Roadmap Progress RLS
CREATE POLICY "Users can view their own roadmap progress"
  ON public.user_roadmap_progress
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own roadmap progress"
  ON public.user_roadmap_progress
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own roadmap progress"
  ON public.user_roadmap_progress
  FOR UPDATE
  USING (auth.uid() = user_id); 