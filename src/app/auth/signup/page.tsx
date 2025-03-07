'use client';
import SignupForm from '@/components/auth/SignupForm';

export default function SignupPage() {
  console.log('SignupPage rendering');
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>
      <SignupForm />
    </div>
  );
} 