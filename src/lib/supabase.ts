import { createClient } from '@supabase/supabase-js';

// These would typically be in .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Export both the client instance and the createClient function
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export { createClient }; 