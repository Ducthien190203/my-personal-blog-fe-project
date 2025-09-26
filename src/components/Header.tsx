import React, { useState, useRef, useEffect, useId } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Moon, Sun, X, Menu, Globe } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

// Import custom SVG icons from assets
import HomeIcon from '../assets/home.svg';
import CategoriesIcon from '../assets/categories.svg';
import TagIcon from '../assets/tag1.svg';
import ArchiveIcon from '../assets/achive.svg';
import AboutIcon from '../assets/about.svg';
import SearchIcon from '../assets/search1.svg';

const Header: React.FC = () => {
  const id = useId();
  const [isDark, setIsDark] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSplashEnabled, setIsSplashEnabled] = useState(true);
  const [language, setLanguage] = useState<'en' | 'vi'>('en');
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Handle navigation click - scroll to top if already on the page
  const handleNavClick = (path: string, event: React.MouseEvent) => {
    if (location.pathname === path) {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Open search with "/" key
      if (event.key === '/' && !isSearchOpen) {
        event.preventDefault();
        setIsSearchOpen(true);
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 100);
      }

      // Close search with "Escape" key
      if (event.key === 'Escape' && isSearchOpen) {
        event.preventDefault();
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSearchOpen]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when search is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isSearchOpen]);

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0); // Trigger immediately when scrolling starts
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSplash = () => {
    setIsSplashEnabled(!isSplashEnabled);
    // Dispatch custom event to toggle splash cursor
    window.dispatchEvent(
      new CustomEvent('toggleSplash', { detail: { enabled: !isSplashEnabled } })
    );
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'vi' : 'en'));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      // Focus on input when opening
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      setSearchQuery('');
    }
  };

  return (
    <header
      className={`
        fixed top-0 w-full z-[60] transition-all duration-300 ease-in-out
        ${
          isScrolled
            ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm animate-in slide-in-from-top-1'
            : 'bg-transparent'
        }
      `}
      style={{
        borderBottom: isScrolled
          ? '1px solid hsl(var(--border) / 0.2)'
          : '1px solid transparent',
      }}
    >
      <div className="container mx-auto px-8 lg:px-16">
        <div
          className={`
          flex h-16 items-center justify-between transition-all duration-300
          ${isScrolled ? 'opacity-100' : 'opacity-90'}
        `}
        >
          {/* Logo */}
          <Link
            to="/"
            onClick={(e) => handleNavClick('/', e)}
            className="flex items-center space-x-2 group -ml-2"
          >
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300" />
            <span
              className={`
              text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent
              ${!isScrolled ? 'drop-shadow-sm' : ''}
            `}
            >
              MyBlog
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6 flex-1 justify-center ml-8">
            <Link
              to="/"
              onClick={(e) => handleNavClick('/', e)}
              className={`
                flex items-center gap-2 text-base font-medium transition-all duration-300 relative group
                ${
                  isScrolled
                    ? 'text-foreground/70 hover:text-cyan-700 dark:hover:text-cyan-400'
                    : 'text-foreground/80 hover:text-cyan-700 dark:hover:text-cyan-400 drop-shadow-sm'
                }
                hover:scale-125
              `}
            >
              <img src={HomeIcon} alt="Home" className="w-6 h-6" />
              Home
            </Link>
            <Link
              to="/categories"
              onClick={(e) => handleNavClick('/categories', e)}
              className={`
                flex items-center gap-2 text-base font-medium transition-all duration-300 relative group
                ${
                  isScrolled
                    ? 'text-foreground/70 hover:text-cyan-700 dark:hover:text-cyan-400'
                    : 'text-foreground/80 hover:text-cyan-700 dark:hover:text-cyan-400 drop-shadow-sm'
                }
                hover:scale-125
              `}
            >
              <img src={CategoriesIcon} alt="Categories" className="w-6 h-6" />
              Categories
            </Link>
            <Link
              to="/tags"
              onClick={(e) => handleNavClick('/tags', e)}
              className={`
                flex items-center gap-2 text-base font-medium transition-all duration-300 relative group
                ${
                  isScrolled
                    ? 'text-foreground/70 hover:text-cyan-700 dark:hover:text-cyan-400'
                    : 'text-foreground/80 hover:text-cyan-700 dark:hover:text-cyan-400 drop-shadow-sm'
                }
                hover:scale-125
              `}
            >
              <img src={TagIcon} alt="Tags" className="w-6 h-6" />
              Tags
            </Link>
            <Link
              to="/archive"
              onClick={(e) => handleNavClick('/archive', e)}
              className={`
                flex items-center gap-2 text-base font-medium transition-all duration-300 relative group
                ${
                  isScrolled
                    ? 'text-foreground/70 hover:text-cyan-700 dark:hover:text-cyan-400'
                    : 'text-foreground/80 hover:text-cyan-700 dark:hover:text-cyan-400 drop-shadow-sm'
                }
                hover:scale-125
              `}
            >
              <img src={ArchiveIcon} alt="Archive" className="w-6 h-6" />
              Archive
            </Link>
            <Link
              to="/about"
              onClick={(e) => handleNavClick('/about', e)}
              className={`
                flex items-center gap-2 text-base font-medium transition-all duration-300 relative group
                ${
                  isScrolled
                    ? 'text-foreground/70 hover:text-cyan-700 dark:hover:text-cyan-400'
                    : 'text-foreground/80 hover:text-cyan-700 dark:hover:text-cyan-400 drop-shadow-sm'
                }
                hover:scale-125
              `}
            >
              <img src={AboutIcon} alt="About" className="w-6 h-6" />
              About
            </Link>
          </nav>

          {/* Right side: Mobile Menu + Search + Theme toggle + Splash Toggle + Language */}
          <div className="flex items-center space-x-3 flex-shrink-0 ml-auto -mr-2">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground hover:scale-110 transition-all duration-300 rounded-lg hover:bg-accent/50"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>

            {/* Search */}
            <div className="relative">
              {/* Search Button with Keyboard Hint */}
              <button
                onClick={toggleSearch}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/40 rounded-full border-2 border-gray-300 hover:border-cyan-700 dark:border-border dark:hover:border-cyan-400 transition-all duration-200 group min-w-[100px] shadow-sm dark:shadow-none"
                aria-label="Search"
              >
                <img
                  src={SearchIcon}
                  alt="Search"
                  className="w-4 h-4 opacity-70"
                />
                <span className="hidden sm:block text-xs">Search...</span>
                <kbd className="hidden sm:inline-flex items-center justify-center w-5 h-5 border border-gray-300/75 rounded text-xs font-medium text-muted-foreground/70 group-hover:border-cyan-700/75 transition-colors ml-auto dark:border-border/75 dark:group-hover:border-cyan-400/75">
                  /
                </kbd>
              </button>

              {/* Full Screen Search Modal */}
              {isSearchOpen && (
                <>
                  {/* Backdrop */}
                  <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] animate-in fade-in duration-200" />

                  {/* Search Modal */}
                  <div className="fixed inset-0 z-[110] flex items-start justify-center pt-20 px-4">
                    <div
                      ref={searchRef}
                      className="w-full max-w-2xl bg-background/95 backdrop-blur-xl border-2 border-border rounded-xl shadow-2xl animate-in slide-in-from-top-4 duration-300 ring-1 ring-cyan-500/20"
                    >
                      {/* Search Header */}
                      <div className="flex items-center gap-4 p-4 border-b-2 border-border/80">
                        <img
                          src={SearchIcon}
                          alt="Search"
                          className="w-6 h-6 text-purple-500"
                        />
                        <form onSubmit={handleSearch} className="flex-1">
                          <input
                            ref={searchInputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search articles, tags, categories..."
                            className="w-full bg-transparent border-none outline-none text-lg placeholder:text-muted-foreground font-medium"
                            autoComplete="off"
                          />
                        </form>
                        <button
                          onClick={() => {
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="p-2 text-muted-foreground hover:text-foreground hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-500 rounded-lg transition-all duration-200 border-2 border-transparent hover:border-red-200 dark:hover:border-red-800"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Search Content */}
                      <div className="p-4">
                        {searchQuery.trim() ? (
                          <div className="space-y-3">
                            <div className="text-sm text-muted-foreground">
                              Searching for "{searchQuery}"...
                            </div>
                            {/* TODO: Add search results here */}
                            <div className="py-8 text-center text-muted-foreground">
                              <div className="text-4xl mb-4">🔍</div>
                              <p>Search functionality coming soon!</p>
                              <p className="text-sm mt-2">
                                Press Enter to continue to search page
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="text-sm font-semibold text-foreground/90 flex items-center gap-2">
                              <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
                              Quick Actions
                            </div>
                            <div className="grid gap-2">
                              <Link
                                to="/categories"
                                onClick={() => {
                                  setIsSearchOpen(false);
                                  setSearchQuery('');
                                }}
                                className="flex items-center gap-3 p-3 rounded-lg border-2 border-border/60 hover:border-cyan-500/50 hover:bg-cyan-50 dark:hover:bg-cyan-950/20 cursor-pointer transition-all duration-200 group"
                              >
                                <img
                                  src={CategoriesIcon}
                                  alt="Categories"
                                  className="w-5 h-5 group-hover:scale-110 transition-transform"
                                />
                                <div className="flex-1">
                                  <div className="text-sm font-medium">
                                    Browse Categories
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    Explore articles by topic
                                  </div>
                                </div>
                                <div className="text-muted-foreground group-hover:text-cyan-500 transition-colors">
                                  →
                                </div>
                              </Link>
                              <Link
                                to="/tags"
                                onClick={() => {
                                  setIsSearchOpen(false);
                                  setSearchQuery('');
                                }}
                                className="flex items-center gap-3 p-3 rounded-lg border-2 border-border/60 hover:border-blue-500/50 hover:bg-blue-50 dark:hover:bg-blue-950/20 cursor-pointer transition-all duration-200 group"
                              >
                                <img
                                  src={TagIcon}
                                  alt="Tags"
                                  className="w-5 h-5 group-hover:scale-110 transition-transform"
                                />
                                <div className="flex-1">
                                  <div className="text-sm font-medium">
                                    Explore Tags
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    Find content by keywords
                                  </div>
                                </div>
                                <div className="text-muted-foreground group-hover:text-blue-500 transition-colors">
                                  →
                                </div>
                              </Link>
                              <Link
                                to="/archive"
                                onClick={() => {
                                  setIsSearchOpen(false);
                                  setSearchQuery('');
                                }}
                                className="flex items-center gap-3 p-3 rounded-lg border-2 border-border/60 hover:border-green-500/50 hover:bg-green-50 dark:hover:bg-green-950/20 cursor-pointer transition-all duration-200 group"
                              >
                                <img
                                  src={ArchiveIcon}
                                  alt="Archive"
                                  className="w-5 h-5 group-hover:scale-110 transition-transform"
                                />
                                <div className="flex-1">
                                  <div className="text-sm font-medium">
                                    View Archive
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    Browse all posts chronologically
                                  </div>
                                </div>
                                <div className="text-muted-foreground group-hover:text-green-500 transition-colors">
                                  →
                                </div>
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Search Footer */}
                      <div className="flex items-center justify-between px-4 py-3 bg-accent/30 border-t-2 border-border/80 rounded-b-xl">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <kbd className="px-2 py-1 border-2 border-border/60 rounded text-xs font-mono bg-background shadow-sm">
                              ↵
                            </kbd>
                            <span className="font-medium">to select</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <kbd className="px-2 py-1 border-2 border-border/60 rounded text-xs font-mono bg-background shadow-sm">
                              ESC
                            </kbd>
                            <span className="font-medium">to close</span>
                          </div>
                        </div>
                        <div className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                          Powered by MyBlog Search
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Theme Toggle with OriginUI Switch */}
            <div className="relative inline-grid h-8 grid-cols-[1fr_1fr] items-center text-sm font-medium shadow-lg shadow-gray-400/20 dark:shadow-gray-800/30 rounded-full">
              <Switch
                id={`theme-switch-${id}`}
                checked={isDark}
                onCheckedChange={(checked) => {
                  setIsDark(checked);
                  document.documentElement.classList.toggle('dark', checked);
                }}
                className="peer data-[state=checked]:bg-input/50 data-[state=unchecked]:bg-input/50 absolute inset-0 h-[inherit] w-auto [&_span]:h-full [&_span]:w-1/2 [&_span]:transition-all [&_span]:duration-500 [&_span]:ease-[cubic-bezier(0.4,0,0.2,1)] [&_span]:data-[state=checked]:translate-x-full [&_span]:data-[state=checked]:rtl:-translate-x-full [&_span]:data-[state=checked]:bg-purple-500 [&_span]:data-[state=unchecked]:bg-yellow-400 [&_span]:shadow-xl [&_span]:data-[state=checked]:shadow-purple-500/40 [&_span]:data-[state=unchecked]:shadow-yellow-400/40"
              />
              <span className="peer-data-[state=unchecked]:text-yellow-600 peer-data-[state=checked]:text-muted-foreground/50 pointer-events-none relative ms-0.5 flex min-w-7 items-center justify-center text-center transition-all duration-500 ease-out peer-data-[state=unchecked]:scale-110 peer-data-[state=checked]:scale-90">
                <Sun className="h-4 w-4" fill="currentColor" />
              </span>
              <span className="peer-data-[state=checked]:text-purple-600 peer-data-[state=unchecked]:text-muted-foreground/50 pointer-events-none relative me-0.5 flex min-w-7 items-center justify-center text-center transition-all duration-500 ease-out peer-data-[state=checked]:scale-110 peer-data-[state=unchecked]:scale-90">
                <Moon className="h-4 w-4" fill="currentColor" />
              </span>
            </div>

            {/* Splash Toggle - Icon only with subtle border */}
            <button
              onClick={toggleSplash}
              className={`p-2 rounded-lg border-2 border-gray-300/60 hover:border-cyan-700 dark:border-border/60 dark:hover:border-cyan-400 transition-all duration-300 hover:scale-110 bg-transparent w-8 h-8 flex items-center justify-center`}
              aria-label="Toggle splash cursor effect"
              title={
                isSplashEnabled
                  ? 'Disable splash cursor'
                  : 'Enable splash cursor'
              }
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill={isSplashEnabled ? 'url(#paint-gradient)' : 'none'}
                stroke={isSplashEnabled ? 'none' : 'currentColor'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-all duration-300 ${
                  isSplashEnabled
                    ? 'drop-shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <defs>
                  <linearGradient
                    id="paint-gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="25%" stopColor="#ec4899" />
                    <stop offset="50%" stopColor="#a855f7" />
                    <stop offset="75%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
                <path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03L12.8 16.25" />
                <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z" />
              </svg>
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center p-2 rounded-lg border-2 border-gray-300/60 hover:border-cyan-700 dark:border-border/60 dark:hover:border-cyan-400 transition-all duration-300 hover:scale-110 bg-transparent w-8 h-8"
              aria-label="Toggle language"
              title={`Switch to ${language === 'en' ? 'Tiếng Việt' : 'English'}`}
            >
              <Globe className="h-4 w-4 text-blue-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div
          className={`
            md:hidden transition-all duration-300 ease-in-out
            ${
              isScrolled
                ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg border-t border-border/20'
                : 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-t border-border/30'
            }
          `}
        >
          <nav className="container mx-auto px-4 py-6">
            <div className="space-y-6">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-4 py-3 px-2 text-base font-medium text-foreground/70 hover:text-foreground hover:text-cyan-600 dark:hover:text-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-950/20 rounded-lg transition-all duration-300"
              >
                <img src={HomeIcon} alt="Home" className="w-6 h-6" />
                Home
              </Link>
              <Link
                to="/categories"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-4 py-3 px-2 text-base font-medium text-foreground/70 hover:text-foreground hover:text-cyan-600 dark:hover:text-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-950/20 rounded-lg transition-all duration-300"
              >
                <img
                  src={CategoriesIcon}
                  alt="Categories"
                  className="w-6 h-6"
                />
                Categories
              </Link>
              <Link
                to="/tags"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-4 py-3 px-2 text-base font-medium text-foreground/70 hover:text-foreground hover:text-cyan-600 dark:hover:text-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-950/20 rounded-lg transition-all duration-300"
              >
                <img src={TagIcon} alt="Tags" className="w-6 h-6" />
                Tags
              </Link>
              <Link
                to="/archive"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-4 py-3 px-2 text-base font-medium text-foreground/70 hover:text-foreground hover:text-cyan-600 dark:hover:text-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-950/20 rounded-lg transition-all duration-300"
              >
                <img src={ArchiveIcon} alt="Archive" className="w-6 h-6" />
                Archive
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-4 py-3 px-2 text-base font-medium text-foreground/70 hover:text-foreground hover:text-cyan-600 dark:hover:text-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-950/20 rounded-lg transition-all duration-300"
              >
                <img src={AboutIcon} alt="About" className="w-6 h-6" />
                About
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
