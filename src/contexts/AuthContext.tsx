'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import supabaseClient from '@/lib/supabase';
import { User, Session } from '@supabase/auth-helpers-nextjs';

// Define the shape of the auth context
type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{
    data: { user: User | null; session: Session | null } | null;
    error: Error | null;
  }>;
  signIn: (email: string, password: string) => Promise<{
    data: { user: User | null; session: Session | null } | null;
    error: Error | null;
  }>;
  signOut: () => Promise<void>;
  isPro: boolean;
};

// Create the context with a default undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// At the top of the file, add:
console.log('AuthContext module loading');

// Provider component that wraps app and makes auth available
export function AuthProvider({ children }: { children: React.ReactNode }) {
  console.log('AuthProvider rendering');
  
  // State for user and session
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPro, setIsPro] = useState<boolean>(false);

  // Get and set session on mount
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabaseClient.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Cleanup
    return () => subscription.unsubscribe();
  }, []);

  // Check if user has Pro status in localStorage
  useEffect(() => {
    const proStatus = localStorage.getItem('user_is_pro') === 'true';
    setIsPro(proStatus);
  }, [user]);

  // Signup function
  const signUp = async (email: string, password: string) => {
    return supabaseClient.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  // Signin function
  const signIn = async (email: string, password: string) => {
    return supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
  };

  // Signout function
  const signOut = async () => {
    await supabaseClient.auth.signOut();
  };

  // Make auth object available to children
  console.log('AuthProvider returning JSX');
  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut, isPro }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use the auth context
export function useAuth() {
  console.log('useAuth hook called');
  const context = useContext(AuthContext);
  
  console.log('useAuth context value:', context);
  
  if (context === undefined) {
    console.error('useAuth hook used outside of AuthProvider!');
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}

// Add this line after creating the context
export { AuthContext }; 