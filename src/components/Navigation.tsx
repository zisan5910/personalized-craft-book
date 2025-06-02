
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavigationProps {
  theme: 'light' | 'dark';
  language: 'en' | 'bn';
  activeSection: string;
  onToggleTheme: () => void;
  onToggleLanguage: () => void;
  onScrollToSection: (section: string) => void;
  data: any;
}

const Navigation = ({ 
  theme, 
  language, 
  activeSection, 
  onToggleTheme, 
  onToggleLanguage, 
  onScrollToSection,
  data 
}: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isDark = theme === 'dark';

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['profile', 'education', 'experience', 'skills', 'certificates', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) {
        // Section visibility tracking would be handled by parent component
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'profile', label: data.sections.profile },
    { id: 'education', label: data.sections.education },
    { id: 'experience', label: data.sections.experience },
    { id: 'skills', label: data.sections.skills },
    { id: 'certificates', label: data.sections.certificates },
    { id: 'contact', label: data.sections.contact },
  ];

  const handleNavClick = (sectionId: string) => {
    onScrollToSection(sectionId);
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled 
          ? isDark 
            ? "bg-gray-900/95 backdrop-blur-md shadow-xl border-b border-gray-700" 
            : "bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-200"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0"
          >
            <span className={cn(
              "text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
              isDark 
                ? "from-purple-400 to-pink-400" 
                : "from-purple-600 to-pink-600"
            )}>
              {data.name}
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-all duration-300",
                    activeSection === item.id
                      ? isDark
                        ? "bg-purple-600 text-white"
                        : "bg-purple-500 text-white"
                      : isDark
                        ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onToggleTheme}
              className={cn(
                "p-2 rounded-lg transition-all duration-300",
                isDark 
                  ? "bg-gray-700 hover:bg-gray-600 text-yellow-400" 
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              )}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>

            {/* Language Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onToggleLanguage}
              className={cn(
                "p-2 rounded-lg transition-all duration-300",
                isDark 
                  ? "bg-gray-700 hover:bg-gray-600 text-blue-400" 
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              )}
            >
              <Globe className="w-5 h-5" />
            </motion.button>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                  "p-2 rounded-lg transition-all duration-300",
                  isDark 
                    ? "bg-gray-700 hover:bg-gray-600 text-white" 
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                )}
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={cn(
              "md:hidden border-t",
              isDark ? "border-gray-700" : "border-gray-200"
            )}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={cn(
                    "block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300",
                    activeSection === item.id
                      ? isDark
                        ? "bg-purple-600 text-white"
                        : "bg-purple-500 text-white"
                      : isDark
                        ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navigation;
