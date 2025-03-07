/**
 * Check if a user has Pro status
 */
export function checkUserIsPro(): boolean {
  // In a real app, this would check a database or auth claims
  // For the demo, we'll just check localStorage
  if (typeof window === 'undefined') return false;
  
  return localStorage.getItem('user_is_pro') === 'true';
} 