'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

interface UserMenuProps {
  user: any;
}

export default function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { signOut } = useAuth();
  const router = useRouter();

  // Close the menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle logout
  const handleLogout = async () => {
    await signOut();
    setIsOpen(false);
    router.push('/');
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Profile Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center"
      >
        <img
          src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || 'User'}&background=random`}
          alt={user.displayName || 'User'}
          className="h-8 w-8 rounded-full object-cover border-2 border-gray-700"
        />
      </button>
      
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-700">
          <div className="px-4 py-2 border-b border-gray-700">
            <p className="text-sm font-medium text-white truncate">{user.displayName || 'User'}</p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>
          
          <Link 
            href="/profile" 
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </Link>
          
          <Link 
            href="/dashboard" 
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          
          <Link 
            href="/settings" 
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left"
            onClick={() => setIsOpen(false)}
          >
            Settings
          </Link>
          
          <button
            onClick={handleLogout}
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left border-t border-gray-700"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
} 