// Mock data cho development
export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  slug: string;
  publishedAt: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  tags: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  author: {
    name: string;
    avatar?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  postCount: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  postCount: number;
}

export interface WebInfo {
  blogTitle: string;
  blogDescription: string;
  authorName: string;
  authorAvatar?: string;
  socialLinks: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    email?: string;
  };
}

// Mock Categories
export const mockCategories: Category[] = [
  { id: '1', name: 'Technology', slug: 'technology', description: 'Latest tech trends and tutorials', postCount: 15 },
  { id: '2', name: 'Lifestyle', slug: 'lifestyle', description: 'Personal experiences and thoughts', postCount: 8 },
  { id: '3', name: 'Travel', slug: 'travel', description: 'Adventures around the world', postCount: 12 },
  { id: '4', name: 'Food', slug: 'food', description: 'Culinary discoveries', postCount: 6 },
  { id: '5', name: 'Photography', slug: 'photography', description: 'Capturing beautiful moments', postCount: 9 },
];

// Mock Tags
export const mockTags: Tag[] = [
  { id: '1', name: 'React', slug: 'react', postCount: 8 },
  { id: '2', name: 'TypeScript', slug: 'typescript', postCount: 6 },
  { id: '3', name: 'JavaScript', slug: 'javascript', postCount: 12 },
  { id: '4', name: 'CSS', slug: 'css', postCount: 5 },
  { id: '5', name: 'Node.js', slug: 'nodejs', postCount: 4 },
  { id: '6', name: 'AI', slug: 'ai', postCount: 3 },
  { id: '7', name: 'Machine Learning', slug: 'ml', postCount: 2 },
  { id: '8', name: 'Web Development', slug: 'webdev', postCount: 10 },
];

// Mock Posts
export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Getting Started with React 18 and TypeScript',
    content: `# Getting Started with React 18 and TypeScript

React 18 brings exciting new features that make building user interfaces more efficient and enjoyable. Combined with TypeScript, you get the power of static typing that helps catch errors early in development.

## Key Features of React 18

### Concurrent Features
React 18 introduces concurrent features that allow React to interrupt, pause, resume, or abandon a render. This means your app can stay responsive even during large screen updates.

### Automatic Batching
All updates are now automatically batched, which means fewer re-renders and better performance.

### Suspense Improvements
Enhanced Suspense support for data fetching makes loading states much easier to manage.

## Setting Up TypeScript

\`\`\`bash
npx create-react-app my-app --template typescript
\`\`\`

## Best Practices

1. Use strict mode
2. Define proper interfaces
3. Leverage React hooks with TypeScript
4. Use proper error boundaries

This combination creates a robust development experience that scales well for large applications.`,
    excerpt: 'Learn how to combine React 18 with TypeScript for a powerful development experience. Explore new features like concurrent rendering and automatic batching.',
    slug: 'react-18-typescript-guide',
    publishedAt: '2024-11-20T10:00:00Z',
    category: mockCategories[0],
    tags: [mockTags[0], mockTags[1], mockTags[7]],
    author: { name: 'Admin', avatar: '/avatar.jpg' },
  },
  {
    id: '2',
    title: 'Modern CSS Techniques for Beautiful Animations',
    content: `# Modern CSS Techniques for Beautiful Animations

CSS has evolved tremendously, and modern browsers support amazing animation capabilities that can make your websites come alive.

## CSS Grid and Flexbox
Master these layout systems for responsive designs.

## CSS Custom Properties
Use CSS variables for dynamic theming.

## Animation Performance
Learn about transform and opacity for smooth animations.`,
    excerpt: 'Discover modern CSS techniques including Grid, Flexbox, custom properties, and performance-optimized animations.',
    slug: 'modern-css-animations',
    publishedAt: '2024-11-18T14:30:00Z',
    category: mockCategories[0],
    tags: [mockTags[3], mockTags[7]],
    author: { name: 'Admin' },
  },
  {
    id: '3',
    title: 'My Journey Through Tokyo: A Developer\'s Perspective',
    content: `# My Journey Through Tokyo: A Developer's Perspective

Tokyo is not just a city; it's a living, breathing testament to how technology and tradition can coexist beautifully.

## Tech Districts
Exploring Akihabara and Shibuya from a developer's eye.

## Work Culture
Understanding Japanese work culture in tech companies.

## Innovation Everywhere
From vending machines to train systems, technology is seamlessly integrated.`,
    excerpt: 'Experience Tokyo through the eyes of a developer. From tech districts to innovative solutions, discover how technology shapes daily life.',
    slug: 'tokyo-developer-journey',
    publishedAt: '2024-11-15T09:15:00Z',
    category: mockCategories[2],
    tags: [mockTags[5]],
    author: { name: 'Admin' },
  },
  {
    id: '4',
    title: 'Building AI-Powered Applications with Modern JavaScript',
    content: `# Building AI-Powered Applications with Modern JavaScript

Artificial Intelligence is no longer limited to Python and R. JavaScript ecosystem has evolved to support powerful AI applications.

## TensorFlow.js
Run machine learning models directly in the browser.

## Natural Language Processing
Implement chatbots and text analysis.

## Computer Vision
Process images and videos in real-time.`,
    excerpt: 'Explore how to build AI-powered applications using JavaScript and modern web technologies.',
    slug: 'ai-javascript-applications',
    publishedAt: '2024-11-12T16:45:00Z',
    category: mockCategories[0],
    tags: [mockTags[2], mockTags[5], mockTags[6]],
    author: { name: 'Admin' },
  },
  {
    id: '5',
    title: 'Minimalist Living: Less is More',
    content: `# Minimalist Living: Less is More

In our digital age, minimalism isn't just about physical possessions—it's about digital minimalism too.

## Digital Declutter
Organize your digital life for better productivity.

## Essential Tools Only
Choose quality over quantity in your development tools.

## Mindful Consumption
Be intentional about what you consume, both physically and digitally.`,
    excerpt: 'Discover the principles of minimalist living and how it can improve your life as a developer.',
    slug: 'minimalist-living-developer',
    publishedAt: '2024-11-10T11:20:00Z',
    category: mockCategories[1],
    tags: [],
    author: { name: 'Admin' },
  },
  {
    id: '6',
    title: 'Street Food Adventures in Bangkok',
    content: `# Street Food Adventures in Bangkok

Bangkok's street food scene is legendary, offering an incredible variety of flavors and experiences.

## Must-Try Dishes
From Pad Thai to Mango Sticky Rice.

## Best Locations
Chatuchak Weekend Market and floating markets.

## Food Safety Tips
How to enjoy street food safely.`,
    excerpt: 'Join me on a culinary adventure through Bangkok\'s vibrant street food scene.',
    slug: 'bangkok-street-food',
    publishedAt: '2024-11-08T13:00:00Z',
    category: mockCategories[3],
    tags: [],
    author: { name: 'Admin' },
  },
];

// Mock Web Info
export const mockWebInfo: WebInfo = {
  blogTitle: 'MyBlog',
  blogDescription: 'A modern blog about technology, travel, and life experiences. Sharing knowledge and stories from a developer\'s perspective.',
  authorName: 'John Doe',
  authorAvatar: '/avatar.jpg',
  socialLinks: {
    twitter: 'https://twitter.com/johndoe',
    github: 'https://github.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe',
    email: 'john@myblog.com',
  },
};

// Mock API functions
export const mockApi = {
  // Get all posts
  getPosts: async (): Promise<Post[]> => {
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
    return mockPosts;
  },

  // Get post by slug
  getPost: async (slug: string): Promise<Post | null> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return mockPosts.find(post => post.slug === slug) || null;
  },

  // Get posts by category
  getPostsByCategory: async (categorySlug: string): Promise<Post[]> => {
    await new Promise(resolve => setTimeout(resolve, 700));
    return mockPosts.filter(post => post.category.slug === categorySlug);
  },

  // Get posts by tag
  getPostsByTag: async (tagSlug: string): Promise<Post[]> => {
    await new Promise(resolve => setTimeout(resolve, 700));
    return mockPosts.filter(post => 
      post.tags.some(tag => tag.slug === tagSlug)
    );
  },

  // Get all categories
  getCategories: async (): Promise<Category[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockCategories;
  },

  // Get all tags
  getTags: async (): Promise<Tag[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockTags;
  },

  // Get web info
  getWebInfo: async (): Promise<WebInfo> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockWebInfo;
  },

  // Get posts archive (grouped by month)
  getPostsArchive: async (): Promise<{ [key: string]: Post[] }> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const archive: { [key: string]: Post[] } = {};
    
    mockPosts.forEach(post => {
      const date = new Date(post.publishedAt);
      const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      
      if (!archive[monthKey]) {
        archive[monthKey] = [];
      }
      archive[monthKey].push(post);
    });

    return archive;
  },

  // Search posts
  searchPosts: async (query: string): Promise<Post[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (!query.trim()) {
      return [];
    }

    const searchTerm = query.toLowerCase().trim();
    
    return mockPosts.filter(post => 
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.content.toLowerCase().includes(searchTerm) ||
      post.category.name.toLowerCase().includes(searchTerm) ||
      post.tags.some(tag => tag.name.toLowerCase().includes(searchTerm))
    );
  },
};