import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockApi } from '@/services/mockData';
import type { WebInfo } from '@/services/mockData';
import {
  Loader2,
  MapPin,
  Globe,
  Heart,
  Coffee,
  Code,
  Sparkles,
} from 'lucide-react';

const AboutPage: React.FC = () => {
  const [webInfo, setWebInfo] = useState<WebInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWebInfo = async () => {
      try {
        const info = await mockApi.getWebInfo();
        setWebInfo(info);
      } catch (error) {
        console.error('Failed to fetch web info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWebInfo();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
        <span className="ml-2 text-muted-foreground">
          Loading about page...
        </span>
      </div>
    );
  }

  if (!webInfo) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-muted-foreground">
          Unable to load about information.
        </p>
      </div>
    );
  }

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
  {/* Hero Section */}
  <div className="relative z-10">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Avatar */}
            <div className="relative inline-block mb-8">
              <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
                <img
                  src={webInfo.authorAvatar || '/default-avatar.jpg'}
                  alt={webInfo.authorName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-teal-400/20"></div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              About {webInfo.authorName}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              {webInfo.blogDescription}
            </p>

            {/* Quick Info */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 rounded-full backdrop-blur-sm">
                <MapPin className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-medium">Vietnam</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 rounded-full backdrop-blur-sm">
                <Globe className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-medium">Frontend Developer</span>
              </div>
            </div>
          </div>
        </div>
      </div>

  <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Main About Card */}
          <Card className="overflow-hidden">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Bio Section */}
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Heart className="h-6 w-6 text-red-500" />
                    About Me
                  </h2>
                  <div className="prose prose-gray dark:prose-invert max-w-none">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Hello! I'm {webInfo.authorName}, a passionate frontend
                      developer with a love for creating beautiful, functional
                      web experiences. I specialize in React, TypeScript, and
                      modern web technologies.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Welcome to my personal blog where I share insights about
                      technology, programming, and life experiences. I believe
                      in continuous learning and sharing knowledge with the
                      community.
                    </p>
                  </div>
                </div>

                {/* Skills/Interests */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Code className="h-5 w-5 text-emerald-600" />
                    Interests & Skills
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {[
                      'React',
                      'TypeScript',
                      'Node.js',
                      'Python',
                      'UI/UX Design',
                      'Photography',
                      'Travel',
                      'Coffee',
                    ].map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Coffee className="h-5 w-5 text-amber-600" />
                    Fun Facts
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>
                      ☕ Coffee enthusiast - can't start the day without it
                    </li>
                    <li>📚 Always reading at least 3 books simultaneously</li>
                    <li>🌍 Love exploring new cultures and cuisines</li>
                    <li>🎵 Enjoy jazz music while coding</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact & Social Links */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Let's Connect
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(webInfo.socialLinks)
                  .filter(([, url]) => url) // Only show links that have values
                  .map(([platform, url]) => {
                    // Simple icon mapping
                    const getIcon = (platform: string) => {
                      switch (platform.toLowerCase()) {
                        case 'github':
                          return '🐙';
                        case 'twitter':
                          return '🐦';
                        case 'linkedin':
                          return '💼';
                        case 'instagram':
                          return '📸';
                        default:
                          return '🔗';
                      }
                    };

                    return (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-950/20 dark:hover:to-teal-950/20 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-1"
                      >
                        <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                          {getIcon(platform)}
                        </div>
                        <span className="font-medium text-sm group-hover:text-emerald-600 transition-colors capitalize">
                          {platform}
                        </span>
                        <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-300 mt-2"></div>
                      </a>
                    );
                  })}
              </div>

              {/* Contact Email */}
              <div className="text-center mt-8 pt-8 border-t border-border">
                <p className="text-muted-foreground mb-2">
                  Have a question or want to collaborate?
                </p>
                <a
                  href={`mailto:${webInfo.socialLinks.email || 'contact@example.com'}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-0.5"
                >
                  <span>Drop me a line</span>
                  <Heart className="h-4 w-4" />
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Blog Stats */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Blog Statistics
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">
                    50+
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Articles Published
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-600 mb-2">
                    10K+
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Total Views
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-600 mb-2">
                    2+
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Years Blogging
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">
                    100+
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Coffee Cups
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
