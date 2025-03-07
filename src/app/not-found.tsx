import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="flex items-center mb-8">
        <h1 className="text-6xl font-bold mr-8">404</h1>
        <div className="h-16 w-0.5 bg-gray-700 mr-8"></div>
        <p className="text-xl text-gray-400">This page could not be found.</p>
      </div>
      
      <Link 
        href="/"
        className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md text-white transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
} 