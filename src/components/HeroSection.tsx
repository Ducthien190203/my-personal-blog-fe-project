import React from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SplitText from '@/components/SimpleSplitText';
import LightRays from './LightRays';

const HeroSection: React.FC = () => {
  const [raysColor, setRaysColor] = React.useState('#A855F7');

  const handleScrollToArticles = () => {
    const articlesSection = document.getElementById('latest-articles');
    if (articlesSection) {
      articlesSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  React.useEffect(() => {
    const updateRaysColor = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setRaysColor(isDark ? '#60A5FA' : '#A855F7'); // Blue for dark, Purple for light
    };

    updateRaysColor();

    // Watch for theme changes
    const observer = new MutationObserver(updateRaysColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="min-h-[100vh] flex items-center justify-center px-8 pt-24 pb-24 md:px-12 lg:px-16 relative overflow-hidden">
      <div className="absolute inset-0" style={{ zIndex: -1 }}>
        <LightRays
          raysOrigin="top-center"
          raysColor={raysColor}
          raysSpeed={1.2}
          lightSpread={0.8}
          rayLength={1.5}
          followMouse={true}
          mouseInfluence={0.15}
          noiseAmount={0.1}
          distortion={0.05}
          className="opacity-60"
        />
      </div>
      <div className="container mx-auto max-w-6xl px-6 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16 lg:gap-20">
          {/* Left Content */}
          <div className="flex-1 text-center md:text-left space-y-6">
            {/* Subheading */}
            <motion.p
              className="text-sm text-muted-foreground tracking-wider uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Web Developer & Blogger
            </motion.p>

            <div className="text-center md:text-left">
              <SplitText
                text="Welcome to MyBlog"
                className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent"
                delay={100}
                duration={0.6}
                splitType="chars"
                tag="h1"
              />
            </div>

            {/* Description */}
            <motion.p
              className="text-lg text-muted-foreground max-w-2xl mx-auto md:mx-0 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Sharing thoughts, experiences, and stories about technology, life,
              and everything in between.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <Button
                onClick={handleScrollToArticles}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-8 py-3 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Explore Articles
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex justify-center md:justify-start gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              {/* Google */}
              <motion.a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-muted/80 hover:bg-white transition-all duration-500 ease-out shadow-lg shadow-gray-600/40 hover:shadow-xl hover:shadow-gray-800/50 dark:shadow-gray-300/40 dark:hover:shadow-gray-400/50 border border-transparent hover:border-gray-200"
                whileHover={{ scale: 1.1, y: -1 }}
                whileTap={{ scale: 0.95 }}
                title="Google"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </motion.a>

              {/* Facebook */}
              <motion.a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-muted/80 transition-all duration-500 ease-out shadow-lg shadow-blue-500/40 hover:shadow-xl hover:shadow-blue-600/50"
                whileHover={{ scale: 1.1, y: -1 }}
                whileTap={{ scale: 0.95 }}
                title="Facebook"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#1877F2"
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  />
                </svg>
              </motion.a>

              {/* YouTube */}
              <motion.a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-muted/80 transition-all duration-500 ease-out shadow-lg shadow-red-500/40 hover:shadow-xl hover:shadow-red-600/50"
                whileHover={{ scale: 1.1, y: -1 }}
                whileTap={{ scale: 0.95 }}
                title="YouTube"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#FF0000"
                    d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                  />
                </svg>
              </motion.a>

              {/* GitHub */}
              <motion.a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-muted/80 transition-all duration-500 ease-out shadow-lg shadow-gray-600/40 hover:shadow-xl hover:shadow-gray-800/50 dark:shadow-gray-300/40 dark:hover:shadow-gray-400/50"
                whileHover={{ scale: 1.1, y: -1 }}
                whileTap={{ scale: 0.95 }}
                title="GitHub"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#181717"
                    className="dark:fill-white"
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
              </motion.a>
            </motion.div>
          </div>

          {/* Right Avatar */}
          <div className="flex-shrink-0">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-primary shadow-lg relative">
                <img
                  src="https://via.placeholder.com/300/8B5CF6/FFFFFF?text=Avatar"
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />

                {/* Floating animation */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-primary/30"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>

              {/* Decorative elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              <motion.div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                animate={{
                  y: [0, 10, 0],
                  rotate: [360, 180, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
