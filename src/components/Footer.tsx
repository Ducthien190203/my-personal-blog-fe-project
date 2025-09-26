import React from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border/40 bg-background/50 backdrop-blur">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
          {/* Copyright */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>© 2024 MyBlog. Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current animate-pulse" />
            <span>and React</span>
          </div>

          {/* Social Links - Matching HeroSection style */}
          <div className="flex items-center gap-3">
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
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
