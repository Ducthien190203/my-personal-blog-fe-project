import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { mockApi } from '@/services/mockData';
import type { Post } from '@/services/mockData';
import PostCard from '@/components/PostCard';
import { Loader2, Search, ArrowLeft, FileText } from 'lucide-react';

const SearchResultPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const searchResults = await mockApi.searchPosts(query);
        setResults(searchResults);
      } catch (error) {
        console.error('Search failed:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [query]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-rose-950/20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6">
                <Search className="h-8 w-8 text-white" />
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Search Results
              </h1>

              {query && (
                <p className="text-lg text-muted-foreground mb-4">
                  Showing results for:{' '}
                  <span className="font-semibold text-purple-600 dark:text-purple-400">
                    "{query}"
                  </span>
                </p>
              )}

              {!loading && (
                <p className="text-sm text-muted-foreground">
                  Found {results.length} result{results.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
              <span className="ml-2 text-muted-foreground">Searching...</span>
            </div>
          ) : !query.trim() ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No search query</h3>
              <p className="text-muted-foreground">
                Please enter a search term to find articles.
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground mb-4">
                We couldn't find any articles matching "
                <span className="font-medium">{query}</span>".
              </p>
              <div className="text-sm text-muted-foreground">
                <p>Try searching for:</p>
                <ul className="mt-2 space-y-1">
                  <li>• Different keywords or phrases</li>
                  <li>• More general terms</li>
                  <li>• Check your spelling</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Search Summary */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg p-6 border">
                <h2 className="text-lg font-semibold mb-2">Search Summary</h2>
                <p className="text-muted-foreground">
                  Found{' '}
                  <span className="font-semibold text-purple-600 dark:text-purple-400">
                    {results.length}
                  </span>{' '}
                  article{results.length !== 1 ? 's' : ''} matching your search
                  for <span className="font-semibold">"{query}"</span>
                </p>
              </div>

              {/* Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {results.map((post) => (
                  <div key={post.id} className="group">
                    <PostCard {...post} />

                    {/* Search Context */}
                    <div className="mt-3 p-3 bg-accent/30 rounded-lg border border-accent/50">
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium">Match found in:</span>{' '}
                        {post.title
                          .toLowerCase()
                          .includes(query.toLowerCase()) && 'Title'}
                        {post.excerpt
                          .toLowerCase()
                          .includes(query.toLowerCase()) &&
                          (post.title
                            .toLowerCase()
                            .includes(query.toLowerCase())
                            ? ', Excerpt'
                            : 'Excerpt')}
                        {post.category.name
                          .toLowerCase()
                          .includes(query.toLowerCase()) && ', Category'}
                        {post.tags.some((tag) =>
                          tag.name.toLowerCase().includes(query.toLowerCase())
                        ) && ', Tags'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More placeholder for future pagination */}
              {results.length >= 6 && (
                <div className="text-center pt-8">
                  <button
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50"
                    disabled
                  >
                    Load More Results
                  </button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Pagination will be implemented with real API
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResultPage;
