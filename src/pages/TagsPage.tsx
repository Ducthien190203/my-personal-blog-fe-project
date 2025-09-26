import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { mockApi } from '@/services/mockData';
import type { Tag, Post } from '@/services/mockData';
import PostCard from '@/components/PostCard';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Loader2,
  Hash,
  Search,
  FileText,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TagsPage: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [filteredTags, setFilteredTags] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const fetchedTags = await mockApi.getTags();
        setTags(fetchedTags);
        setFilteredTags(fetchedTags);
      } catch (error) {
        console.error('Failed to fetch tags:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  useEffect(() => {
    const filtered = tags.filter((tag) =>
      tag.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTags(filtered);
  }, [searchTerm, tags]);

  const handleTagClick = async (tagSlug: string) => {
    if (selectedTag === tagSlug) {
      setSelectedTag(null);
      setPosts([]);
      return;
    }

    setSelectedTag(tagSlug);
    setPostsLoading(true);

    try {
      const fetchedPosts = await mockApi.getPostsByTag(tagSlug);
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Failed to fetch posts by tag:', error);
    } finally {
      setPostsLoading(false);
    }
  };

  const getTagVariant = (index: number) => {
    const variants = ['default', 'secondary', 'outline'];
    return variants[index % variants.length] as
      | 'default'
      | 'secondary'
      | 'outline';
  };

  const getTagSize = (postCount: number) => {
    if (postCount >= 10) return 'text-lg px-4 py-2';
    if (postCount >= 5) return 'text-base px-3 py-2';
    return 'text-sm px-3 py-1.5';
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="text-muted-foreground">Loading tags...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-white">
              <Hash className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent leading-tight py-2">
              Tags
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover content through tags. Use the search bar to find specific
            topics, or browse the tag cloud below.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="max-w-md mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 text-base rounded-full border-2 border-border/50 focus:border-primary/50 transition-colors"
            />
          </div>
          {searchTerm && (
            <motion.p
              className="text-sm text-muted-foreground mt-2 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Found {filteredTags.length} tag
              {filteredTags.length !== 1 ? 's' : ''} matching "{searchTerm}"
            </motion.p>
          )}
        </motion.div>

        {/* Tags Cloud */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">
              Tag Cloud ({filteredTags.length} tags)
            </h2>
          </div>

          <AnimatePresence mode="wait">
            {filteredTags.length > 0 ? (
              <motion.div
                key="tags-grid"
                className="flex flex-wrap gap-3 justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {filteredTags.map((tag, index) => (
                  <motion.div
                    key={tag.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge
                      variant={
                        selectedTag === tag.slug
                          ? 'default'
                          : getTagVariant(index)
                      }
                      className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${getTagSize(tag.postCount)} ${
                        selectedTag === tag.slug
                          ? 'ring-2 ring-primary/50 shadow-lg shadow-primary/20 bg-primary text-primary-foreground'
                          : 'hover:shadow-blue-500/20'
                      }`}
                      onClick={() => handleTagClick(tag.slug)}
                    >
                      <Hash className="h-3 w-3 mr-1" />
                      {tag.name}
                      <span className="ml-2 text-xs opacity-75">
                        {tag.postCount}
                      </span>
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="no-tags"
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="p-6 bg-muted/50 rounded-full">
                    <Search className="h-12 w-12 text-muted-foreground/50" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      No tags found
                    </h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search terms or browse all available
                      tags.
                    </p>
                  </div>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <Hash className="h-4 w-4" />
                    Show All Tags
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Posts Section */}
        {selectedTag && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="border-t border-border/50 pt-12">
              <div className="flex items-center gap-3 mb-8">
                <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                  <Hash className="h-8 w-8 text-primary" />
                  Posts tagged with "
                  {tags.find((t) => t.slug === selectedTag)?.name}"
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
                        There are no posts with this tag yet.
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

        {/* Statistics */}
        {!selectedTag && filteredTags.length > 0 && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-xl border border-blue-200/20 dark:border-blue-800/20">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {filteredTags.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Tags</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl border border-purple-200/20 dark:border-purple-800/20">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {Math.max(...filteredTags.map((t) => t.postCount))}
              </div>
              <div className="text-sm text-muted-foreground">Most Popular</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl border border-green-200/20 dark:border-green-800/20">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {filteredTags.reduce((sum, tag) => sum + tag.postCount, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Posts</div>
            </div>
          </motion.div>
        )}

        {/* Call to Action */}
        {!selectedTag && (
          <motion.div
            className="text-center mt-16 p-8 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-2xl border border-blue-200/20 dark:border-blue-800/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-xl font-semibold mb-4">Explore by topic</h3>
            <p className="text-muted-foreground mb-6">
              Click on any tag above to discover related content, or explore
              posts by categories.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                to="/categories"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all duration-300 hover:scale-105"
              >
                <TrendingUp className="h-4 w-4" />
                Browse Categories
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 border border-primary/20 text-primary rounded-full hover:bg-primary/5 transition-all duration-300 hover:scale-105"
              >
                <FileText className="h-4 w-4" />
                All Posts
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TagsPage;
