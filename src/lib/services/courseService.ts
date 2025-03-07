import { supabase } from '../supabase';

export interface Course {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  is_premium: boolean;
  image_url: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface CourseWithProgress extends Course {
  completed_lessons: number;
  total_lessons: number;
}

export async function getCourses(): Promise<CourseWithProgress[]> {
  const { data: courses, error } = await supabase
    .from('courses')
    .select('*')
    .order('order_index');

  if (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }

  // Get lessons count for each course
  const coursesWithLessons: CourseWithProgress[] = await Promise.all(
    courses.map(async (course) => {
      const { count: lessonCount } = await supabase
        .from('lessons')
        .select('*', { count: 'exact', head: true })
        .eq('course_id', course.id);

      // For logged-in users, get their completed lessons count
      let completedLessons = 0;
      const user = (await supabase.auth.getUser()).data.user;
      
      if (user) {
        const { count } = await supabase
          .from('user_progress')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .eq('is_completed', true)
          .in('lesson_id', 
            supabase
              .from('lessons')
              .select('id')
              .eq('course_id', course.id)
          );
        
        completedLessons = count || 0;
      }

      return {
        ...course,
        completed_lessons: completedLessons,
        total_lessons: lessonCount || 0,
      };
    })
  );

  return coursesWithLessons;
}

export async function getCourseById(courseId: string): Promise<Course | null> {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('id', courseId)
    .single();

  if (error) {
    console.error('Error fetching course:', error);
    return null;
  }

  return data;
} 