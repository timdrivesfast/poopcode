'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/common/Navbar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { user, isPro } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Use the existing Navbar component */}
      <Navbar user={user} isPro={isPro} />
      
      {/* Main content area with children */}
      <main>{children}</main>
    </div>
  );
} 