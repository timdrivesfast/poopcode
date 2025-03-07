import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  return {
    title: `Problem: ${params.slug.split('-').map((word: string) => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')}`,
  };
}

export default function ProblemRedirect({ 
  params 
}: { 
  params: { slug: string } 
}) {
  redirect(`/practice/problems/${params.slug}`);
} 