import { supabase } from '../supabase';
import { PROBLEM_DATA } from '@/lib/data/problemSeed';

const PROBLEM_ID_MAP = {
  'contains-duplicate': '11111111-1111-1111-1111-111111111111', // Replace with actual UUIDs
  'valid-anagram': '22222222-2222-2222-2222-222222222222',
  'two-sum': '33333333-3333-3333-3333-333333333333',
  // Add mappings for all problems
};

export interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  is_premium: boolean;
  solution_url: string | null;
  acceptance_rate: number;
  created_at: string;
  updated_at: string;
}

export interface ProblemWithStatus extends Problem {
  status: 'solved' | 'attempted' | 'todo';
}

export async function getProblems(): Promise<ProblemWithStatus[]> {
  const { data: problems, error } = await supabase
    .from('problems')
    .select('*')
    .order('acceptance_rate', { ascending: true });
    
  if (error) {
    console.error('Error fetching problems:', error);
    // Fall back to hardcoded problems
    const fallbackProblems = Object.values(PROBLEM_DATA);
    return fallbackProblems.map(problem => ({
      ...problem,
      status: 'todo'
    }));
  }
  
  // If no problems in database, use hardcoded ones
  if (!problems || problems.length === 0) {
    const fallbackProblems = Object.values(PROBLEM_DATA);
    return fallbackProblems.map(problem => ({
      ...problem,
      status: 'todo'
    }));
  }
  
  // Get user status for problems if user is logged in
  const user = (await supabase.auth.getUser()).data.user;
  
  if (user) {
    const { data: attempts } = await supabase
      .from('user_problem_attempts')
      .select('problem_id, is_solved')
      .eq('user_id', user.id);
    
    const attemptsMap = new Map();
    attempts?.forEach(attempt => {
      attemptsMap.set(attempt.problem_id, attempt.is_solved ? 'solved' : 'attempted');
    });
    
    return problems.map(problem => ({
      ...problem,
      status: attemptsMap.get(problem.id) || 'todo'
    }));
  }
  
  // If no user, return all problems with default 'todo' status
  return problems.map(problem => ({
    ...problem,
    status: 'todo'
  }));
}

export async function getProblemById(id: string): Promise<Problem | null> {
  try {
    // First check our hardcoded problems
    if (PROBLEM_DATA[id]) {
      return PROBLEM_DATA[id];
    }
    
    // Fallback to database if not in our hardcoded data
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
    
    let data;
    
    if (isUuid) {
      const { data: uuidData, error: uuidError } = await supabase
        .from('problems')
        .select('*')
        .eq('id', id);
        
      if (!uuidError && uuidData?.length > 0) {
        data = uuidData[0];
      }
    }
    
    // If not found by ID, try by slug
    if (!data) {
      const { data: slugData, error: slugError } = await supabase
        .from('problems')
        .select('*')
        .eq('slug', id);
        
      if (!slugError && slugData?.length > 0) {
        data = slugData[0];
      }
    }
    
    // If data found in database, return it
    if (data) {
      return data;
    }
    
    // Last resort: Create a mock problem
    console.log(`Problem not found: ${id}, creating mock problem`);
    return {
      id: "mock-" + id,
      title: id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      description: "This is a mock problem for demonstration purposes.",
      difficulty: "Medium",
      category: "Arrays & Hashing",
      is_premium: false,
      solution_url: null,
      acceptance_rate: 65,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching problem:', error);
    return null;
  }
}

export async function updateProblemStatus(
  userId: string,
  problemId: string,
  isSolved: boolean
): Promise<boolean> {
  // Check if a record already exists
  const { data: existingAttempt } = await supabase
    .from('user_problem_attempts')
    .select('id')
    .eq('user_id', userId)
    .eq('problem_id', problemId)
    .single();
  
  let error;
  
  if (existingAttempt) {
    // Update existing record
    const { error: updateError } = await supabase
      .from('user_problem_attempts')
      .update({ 
        is_solved: isSolved,
        last_attempt_date: new Date().toISOString()
      })
      .eq('id', existingAttempt.id);
    
    error = updateError;
  } else {
    // Insert new record
    const { error: insertError } = await supabase
      .from('user_problem_attempts')
      .insert([{ 
        user_id: userId,
        problem_id: problemId,
        is_solved: isSolved,
        last_attempt_date: new Date().toISOString()
      }]);
    
    error = insertError;
  }
  
  if (error) {
    console.error('Error updating problem status:', error);
    return false;
  }
  
  return true;
} 