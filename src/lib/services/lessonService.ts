import { supabase } from '../supabase';

export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  content: string | null;
  video_url: string | null;
  duration: number | null;
  is_premium: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface LessonWithProgress extends Lesson {
  is_completed: boolean;
}

export async function getLessonsByCourseId(courseId: string): Promise<LessonWithProgress[]> {
  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('course_id', courseId)
    .order('order_index');

  if (error) {
    console.error('Error fetching lessons:', error);
    throw error;
  }

  // Get user progress for these lessons if user is logged in
  const user = (await supabase.auth.getUser()).data.user;
  
  if (user) {
    const { data: userProgress } = await supabase
      .from('user_progress')
      .select('lesson_id, is_completed')
      .eq('user_id', user.id)
      .in('lesson_id', lessons.map(lesson => lesson.id));
    
    const progressMap = new Map();
    userProgress?.forEach(progress => {
      progressMap.set(progress.lesson_id, progress.is_completed);
    });
    
    return lessons.map(lesson => ({
      ...lesson,
      is_completed: progressMap.get(lesson.id) || false
    }));
  }
  
  // If no user is logged in, return lessons with is_completed = false
  return lessons.map(lesson => ({ ...lesson, is_completed: false }));
}

export async function getLessonById(lessonId: string): Promise<Lesson | null> {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('id', lessonId)
    .single();

  if (error) {
    console.error('Error fetching lesson:', error);
    return null;
  }

  return data;
}

export async function updateLessonProgress(
  userId: string, 
  lessonId: string, 
  isCompleted: boolean
): Promise<boolean> {
  // Check if a record already exists
  const { data: existingProgress } = await supabase
    .from('user_progress')
    .select('id')
    .eq('user_id', userId)
    .eq('lesson_id', lessonId)
    .single();
  
  let error;
  
  if (existingProgress) {
    // Update existing record
    const { error: updateError } = await supabase
      .from('user_progress')
      .update({ 
        is_completed: isCompleted,
        completion_date: isCompleted ? new Date().toISOString() : null
      })
      .eq('id', existingProgress.id);
    
    error = updateError;
  } else {
    // Insert new record
    const { error: insertError } = await supabase
      .from('user_progress')
      .insert([
        { 
          user_id: userId,
          lesson_id: lessonId,
          is_completed: isCompleted,
          completion_date: isCompleted ? new Date().toISOString() : null
        }
      ]);
    
    error = insertError;
  }
  
  if (error) {
    console.error('Error updating lesson progress:', error);
    return false;
  }
  
  return true;
}

export async function getAllLessons(): Promise<(LessonWithProgress & { course_title: string })[]> {
  const { data: lessons, error } = await supabase
    .from('lessons')
    .select(`
      *,
      courses:course_id (title)
    `)
    .order('course_id')
    .order('order_index');

  if (error) {
    console.error('Error fetching all lessons:', error);
    throw error;
  }

  // Get user progress for these lessons if user is logged in
  const user = (await supabase.auth.getUser()).data.user;
  
  let progressMap = new Map();
  
  if (user) {
    const { data: userProgress } = await supabase
      .from('user_progress')
      .select('lesson_id, is_completed')
      .eq('user_id', user.id)
      .in('lesson_id', lessons.map(lesson => lesson.id));
    
    userProgress?.forEach(progress => {
      progressMap.set(progress.lesson_id, progress.is_completed);
    });
  }
  
  return lessons.map(lesson => ({
    ...lesson,
    course_title: lesson.courses.title,
    is_completed: progressMap.get(lesson.id) || false
  }));
} 