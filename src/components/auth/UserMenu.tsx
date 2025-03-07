'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function UserMenu() {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle sign out
  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
    router.push('/');
  };

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full bg-gray-700 p-1 flex items-center justify-center h-8 w-8 focus:outline-none"
      >
        <span className="text-sm font-medium">
          {user.email?.charAt(0).toUpperCase() || '?'}
        </span>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg z-10">
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-center mb-2">
              <span className="text-yellow-400 mr-2">👋</span>
              <span className="text-gray-300 text-sm break-all">{user.email}</span>
            </div>
          </div>
          
          <div className="p-2">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-2 p-2 rounded hover:bg-gray-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V9.5a1 1 0 10-2 0V15H4V5h9.5a1 1 0 100-2H3z" clipRule="evenodd" />
                <path d="M16 8a1 1 0 00-1-1h-4a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 10.414V13a1 1 0 102 0V8z" />
              </svg>
              Sign out
            </button>
          </div>
          
          <div className="p-2 border-t border-gray-700">
            <button 
              onClick={() => setIsOpen(false)}
              className="w-full p-2 text-sm text-red-400 hover:bg-gray-700 rounded transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 