import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'PoopCode - Prepare for coding interviews',
  description: 'A better way to prepare for coding interviews',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gray-900 text-white`}>
        <AuthProvider>
          <header className="bg-gray-900 border-b border-gray-800">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Link href="/" className="flex items-center">
                    <span className="text-3xl mr-2" role="img" aria-label="PoopCode Logo">💩</span>
                  </Link>
                  <nav className="ml-8">
                    <ul className="flex space-x-8">
                      <li>
                        <Link href="/courses" className="text-gray-300 hover:text-white transition-colors">
                          Courses
                        </Link>
                      </li>
                      <li>
                        <Link href="/practice" className="text-gray-300 hover:text-white transition-colors">
                          Practice
                        </Link>
                      </li>
                      <li>
                        <Link href="/roadmap" className="text-gray-300 hover:text-white transition-colors">
                          Roadmap
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div className="flex items-center space-x-4">
                  <Link href="/pro">
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full transition-colors">
                      Pro
                    </button>
                  </Link>
                  <button className="text-gray-300 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                  <button className="text-gray-300 hover:text-white rounded-full overflow-hidden">
                    <span className="text-2xl" role="img" aria-label="User profile">👤</span>
                  </button>
                </div>
              </div>
            </div>
          </header>
          <main>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
} 