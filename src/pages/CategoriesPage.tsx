import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { mockApi } from '@/services/mockData';
import type { Category, Post } from '@/services/mockData';
import PostCard from '@/components/PostCard';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Grid3X3, FileText, TrendingUp, Folder } from 'lucide-react';
import { motion } from 'framer-motion';

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await mockApi.getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = async (categorySlug: string) => {
    if (selectedCategory === categorySlug) {
      setSelectedCategory(null);
      setPosts([]);
      return;
    }

    setSelectedCategory(categorySlug);
    setPostsLoading(true);

    try {
      const fetchedPosts = await mockApi.getPostsByCategory(categorySlug);
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Failed to fetch posts by category:', error);
    } finally {
      setPostsLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        {/* Light Mode Background */}
        <div className="min-h-screen w-full bg-white relative dark:hidden">
          {/* Magenta Orb Grid Background */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background: 'white',
              backgroundImage: `
                linear-gradient(to right, rgba(71,85,105,0.3) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(71,85,105,0.3) 1px, transparent 1px),
                radial-gradient(circle at 50% 60%, rgba(236,72,153,0.35) 0%, rgba(168,85,247,0.15) 40%, transparent 70%)
              `,
              backgroundSize: '40px 40px, 40px 40px, 100% 100%',
            }}
          />
          <div className="absolute inset-0 bg-white/60 z-[1]" />
          <div className="relative z-[2] min-h-screen pt-24 flex items-center justify-center">
            <div className="flex items-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="text-muted-foreground">
                Loading categories...
              </span>
            </div>
          </div>
        </div>

        {/* Dark Mode Background */}
        <div className="min-h-screen w-full bg-[#020617] relative hidden dark:block">
          {/* Dark Basic Grid Background - Slate 950 */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background: '#020617',
              backgroundImage: `
                linear-gradient(to right, rgba(100,116,139,0.4) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(100,116,139,0.4) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />
          <div className="relative z-[2] min-h-screen pt-24 flex items-center justify-center">
            <div className="flex items-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="text-muted-foreground">
                Loading categories...
              </span>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Light Mode Background */}
      <div className="min-h-screen w-full bg-white relative dark:hidden">
        {/* Magenta Orb Grid Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: 'white',
            backgroundImage: `
            linear-gradient(to right, rgba(71,85,105,0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(71,85,105,0.3) 1px, transparent 1px),
            radial-gradient(circle at 50% 60%, rgba(236,72,153,0.35) 0%, rgba(168,85,247,0.15) 40%, transparent 70%)
          `,
            backgroundSize: '40px 40px, 40px 40px, 100% 100%',
          }}
        />
        <div className="absolute inset-0 bg-white/60 dark:bg-gray-900/60 z-[1]" />
        <div className="relative z-[2] min-h-screen pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-7xl">
            {/* Header */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white">
                  <Folder className="h-8 w-8" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent leading-tight py-2">
                  Categories
                </h1>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore articles organized by topics. Click on any category to
                view related posts.
              </p>
            </motion.div>

            {/* Categories Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    className={`cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group ${
                      selectedCategory === category.slug
                        ? 'ring-2 ring-primary shadow-lg shadow-primary/20'
                        : 'hover:shadow-purple-500/10'
                    }`}
                    onClick={() => handleCategoryClick(category.slug)}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="group-hover:text-primary transition-colors flex items-center gap-2">
                          <Grid3X3 className="h-5 w-5" />
                          {category.name}
                        </CardTitle>
                        <Badge
                          variant="secondary"
                          className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300"
                        >
                          <FileText className="h-3 w-3 mr-1" />
                          {category.postCount}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm leading-relaxed">
                        {category.description ||
                          'Discover amazing content in this category.'}
                      </CardDescription>

                      {selectedCategory === category.slug && (
                        <motion.div
                          className="mt-4 pt-4 border-t border-border/50"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex items-center gap-2 text-xs text-primary font-medium">
                            <TrendingUp className="h-3 w-3" />
                            Selected Category
                          </div>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Posts Section */}
            {selectedCategory && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="border-t border-border/50 pt-12">
                  <div className="flex items-center gap-3 mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold">
                      Posts in "
                      {
                        categories.find((c) => c.slug === selectedCategory)
                          ?.name
                      }
                      "
                    </h2>
                    <Badge variant="outline" className="text-sm">
                      {posts.length} {posts.length === 1 ? 'post' : 'posts'}
                    </Badge>
                  </div>

                  {postsLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                        <span className="text-muted-foreground">
                          Loading posts...
                        </span>
                      </div>
                    </div>
                  ) : posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {posts.map((post, index) => (
                        <motion.div
                          key={post.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <PostCard {...post} />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="flex flex-col items-center gap-4">
                        <div className="p-6 bg-muted/50 rounded-full">
                          <FileText className="h-12 w-12 text-muted-foreground/50" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">
                            No posts found
                          </h3>
                          <p className="text-muted-foreground">
                            There are no posts in this category yet.
                          </p>
                        </div>
                        <Link
                          to="/"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                        >
                          <FileText className="h-4 w-4" />
                          Browse All Posts
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Call to Action */}
            {!selectedCategory && (
              <motion.div
                className="text-center mt-16 p-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-2xl border border-purple-200/20 dark:border-purple-800/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h3 className="text-xl font-semibold mb-4">
                  Ready to explore?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Click on any category above to discover amazing content, or
                  browse all posts on the homepage.
                </p>
                <div className="flex items-center justify-center gap-4">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all duration-300 hover:scale-105"
                  >
                    <FileText className="h-4 w-4" />
                    All Posts
                  </Link>
                  <Link
                    to="/tags"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-primary/20 text-primary rounded-full hover:bg-primary/5 transition-all duration-300 hover:scale-105"
                  >
                    <Grid3X3 className="h-4 w-4" />
                    Browse Tags
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Dark Mode Background */}
      <div className="min-h-screen w-full bg-[#020617] relative hidden dark:block">
        {/* Dark Basic Grid Background - Slate 950 */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: '#020617',
            backgroundImage: `
          linear-gradient(to right, rgba(100,116,139,0.4) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(100,116,139,0.4) 1px, transparent 1px)
        `,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative z-[2] min-h-screen pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-7xl">
            {/* All the same content structure as light mode */}
            {/* Header */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white">
                  <Folder className="h-8 w-8" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent leading-tight py-2">
                  Categories
                </h1>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore articles organized by topics. Click on any category to
                view related posts.
              </p>
            </motion.div>

            {/* Categories Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    className={`cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group ${
                      selectedCategory === category.slug
                        ? 'ring-2 ring-primary shadow-lg shadow-primary/20'
                        : 'hover:shadow-purple-500/10'
                    }`}
                    onClick={() => handleCategoryClick(category.slug)}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="group-hover:text-primary transition-colors flex items-center gap-2">
                          <Grid3X3 className="h-5 w-5" />
                          {category.name}
                        </CardTitle>
                        <Badge
                          variant="secondary"
                          className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300"
                        >
                          <FileText className="h-3 w-3 mr-1" />
                          {category.postCount}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm leading-relaxed">
                        {category.description ||
                          'Discover amazing content in this category.'}
                      </CardDescription>

                      {selectedCategory === category.slug && (
                        <motion.div
                          className="mt-4 pt-4 border-t border-border/50"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex items-center gap-2 text-xs text-primary font-medium">
                            <TrendingUp className="h-3 w-3" />
                            Selected Category
                          </div>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Posts Section */}
            {selectedCategory && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="border-t border-border/50 pt-12">
                  <div className="flex items-center gap-3 mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold">
                      Posts in "
                      {
                        categories.find((c) => c.slug === selectedCategory)
                          ?.name
                      }
                      "
                    </h2>
                    <Badge variant="outline" className="text-sm">
                      {posts.length} {posts.length === 1 ? 'post' : 'posts'}
                    </Badge>
                  </div>

                  {postsLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                        <span className="text-muted-foreground">
                          Loading posts...
                        </span>
                      </div>
                    </div>
                  ) : posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {posts.map((post, index) => (
                        <motion.div
                          key={post.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <PostCard {...post} />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="flex flex-col items-center gap-4">
                        <div className="p-6 bg-muted/50 rounded-full">
                          <FileText className="h-12 w-12 text-muted-foreground/50" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">
                            No posts found
                          </h3>
                          <p className="text-muted-foreground">
                            There are no posts in this category yet.
                          </p>
                        </div>
                        <Link
                          to="/"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                        >
                          <FileText className="h-4 w-4" />
                          Browse All Posts
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Call to Action */}
            {!selectedCategory && (
              <motion.div
                className="text-center mt-16 p-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-2xl border border-purple-200/20 dark:border-purple-800/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h3 className="text-xl font-semibold mb-4">
                  Ready to explore?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Click on any category above to discover amazing content, or
                  browse all posts on the homepage.
                </p>
                <div className="flex items-center justify-center gap-4">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all duration-300 hover:scale-105"
                  >
                    <FileText className="h-4 w-4" />
                    All Posts
                  </Link>
                  <Link
                    to="/tags"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-primary/20 text-primary rounded-full hover:bg-primary/5 transition-all duration-300 hover:scale-105"
                  >
                    <Grid3X3 className="h-4 w-4" />
                    Browse Tags
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
