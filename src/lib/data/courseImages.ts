// Map of course topic keywords to relevant image URLs
export const courseImageMap: Record<string, string> = {
  // Algorithms and data structures
  'algorithms': 'https://images.unsplash.com/photo-1580894742597-87bc8789db3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'data structures': 'https://images.unsplash.com/photo-1545987796-200677ee1011?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'big-o': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  
  // Programming languages
  'python': 'https://images.unsplash.com/photo-1649180556628-9ba704115795?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'javascript': 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'java': 'https://images.unsplash.com/photo-1588239034647-25783cbfcfc1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  
  // Interview prep
  'interview': 'https://images.unsplash.com/photo-1559223607-c4d659f0d178?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'coding interview': 'https://images.unsplash.com/photo-1522881451255-f59ad836fdfb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  
  // Default fallback image
  'default': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
};

/**
 * Get a relevant image URL for a course based on its title
 */
export function getCourseImage(title: string): string {
  // Convert title to lowercase for case-insensitive matching
  const lowercaseTitle = title.toLowerCase();
  
  // Try to find a matching image based on keywords in the title
  for (const [keyword, imageUrl] of Object.entries(courseImageMap)) {
    if (lowercaseTitle.includes(keyword.toLowerCase())) {
      return imageUrl;
    }
  }
  
  // Return default image if no match found
  return courseImageMap.default;
} 