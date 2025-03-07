'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

interface AuthCheckProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function AuthCheck({ children, fallback }: AuthCheckProps) {
  const { user } = useAuth();

  if (!user) {
    return fallback || (
      <div className="rounded-lg bg-gray-800 p-4 shadow-md border border-gray-700">
        <p className="text-center mb-3">
          Please sign in to save your progress
        </p>
        <div className="flex justify-center gap-3">
          <Link 
            href="/auth/signin" 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
          >
            Sign In
          </Link>
          <Link 
            href="/auth/signup" 
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white"
          >
            Sign Up
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 