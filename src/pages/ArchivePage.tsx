import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockApi } from '@/services/mockData';
import type { Post } from '@/services/mockData';
import { Loader2, Archive, Calendar, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ArchiveData {
  [monthYear: string]: Post[];
}

const ArchivePage: React.FC = () => {
  const [archive, setArchive] = useState<ArchiveData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArchive = async () => {
      try {
        const fetchedArchive = await mockApi.getPostsArchive();
        setArchive(fetchedArchive);
      } catch (error) {
        console.error('Failed to fetch archive:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArchive();
  }, []);

  // Format month-year for display
  const formatMonthYear = (monthKey: string) => {
    const [year, month] = monthKey.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  // Sort archive keys by date (newest first)
  const sortedArchiveKeys = Object.keys(archive).sort((a, b) =>
    b.localeCompare(a)
  );

  return (
    <div className="min-h-screen w-full relative bg-transparent">
      {/* Teal Glow Top - chỉ light mode, luôn phủ toàn bộ viewport */}
      <div
        className="fixed inset-0 z-0 dark:hidden pointer-events-none"
        style={{
          background: "#ffffff",
          backgroundImage: `
            radial-gradient(
              circle at top center,
              rgba(56, 193, 182, 0.5),
              transparent 70%
            )
          `,
          filter: "blur(80px)",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Header with animation */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-6">
              <Archive className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Archive
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse through all articles organized by publication date. Journey
              through time and rediscover past content.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            <span className="ml-2 text-muted-foreground">
              Loading archive...
            </span>
          </div>
        ) : (
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Timeline */}
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-400 via-teal-400 to-cyan-400"></div>

              <div className="space-y-8">
                {sortedArchiveKeys.map((monthKey, index) => {
                  const posts = archive[monthKey];
                  return (
                    <motion.div
                      key={monthKey}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative"
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full border-4 border-background shadow-lg"></div>

                      {/* Content */}
                      <div className="ml-20">
                        <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                          <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20">
                            <CardTitle className="flex items-center gap-3">
                              <Calendar className="h-5 w-5 text-emerald-600" />
                              <span>{formatMonthYear(monthKey)}</span>
                              <Badge variant="secondary" className="ml-auto">
                                {posts.length} article
                                {posts.length !== 1 ? 's' : ''}
                              </Badge>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-0">
                            <div className="divide-y divide-border">
                              {posts.map((post) => (
                                <Link
                                  key={post.id}
                                  to={`/posts/${post.slug}`}
                                  className="block p-6 hover:bg-accent/50 transition-colors group"
                                >
                                  <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                      </h3>
                                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                                        {post.excerpt}
                                      </p>

                                      {/* Date */}
                                      <div className="text-xs text-muted-foreground">
                                        {new Date(
                                          post.publishedAt
                                        ).toLocaleDateString()}
                                      </div>
                                    </div>

                                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ArchivePage;
