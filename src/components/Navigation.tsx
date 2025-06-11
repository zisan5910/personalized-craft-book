
import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Menu, X, Globe } from 'lucide-react';

interface NavigationProps {
  navigationItems: Array<{
    id: string;
    icon: React.ReactNode;
    target?: string;
  }>;
  activeSection: string;
  scrollToSection: (section: string) => void;
  language: 'en' | 'bn';
  setLanguage: (lang: 'en' | 'bn') => void;
}

const Navigation: React.FC<NavigationProps> = ({
  navigationItems,
  activeSection,
  scrollToSection,
  language,
  setLanguage,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sectionLabels = {
    en: {
      profile: 'Profile',
      education: 'Education',
      courses: 'Courses',
      experience: 'Experience',
      certificates: 'Certificates',
      skills: 'Skills',
      family: 'Family',
      contact: 'Contact',
      'social-links': 'Social'
    },
    bn: {
      profile: 'প্রোফাইল',
      education: 'শিক্ষা',
      courses: 'কোর্স',
      experience: 'অভিজ্ঞতা',
      certificates: 'সার্টিফিকেট',
      skills: 'দক্ষতা',
      family: 'পরিবার',
      contact: 'যোগাযোগ',
      'social-links': 'সামাজিক'
    }
  };

  const handleNavClick = (item: any) => {
    const targetSection = item.target || item.id;
    scrollToSection(targetSection);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('profile')}
              className="text-xl font-bold text-slate-800"
            >
              Ridoan
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  activeSection === (item.target || item.id)
                    ? 'bg-finance-purple text-white'
                    : 'text-slate-600 hover:text-finance-purple hover:bg-slate-100'
                }`}
              >
                {item.icon}
                <span>{sectionLabels[language][item.id as keyof typeof sectionLabels['en']]}</span>
              </button>
            ))}
          </div>

          {/* Language Toggle & Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
              className="p-2 rounded-lg text-slate-600 hover:text-finance-purple hover:bg-slate-100 transition-colors"
              title={language === 'en' ? 'Switch to Bangla' : 'Switch to English'}
            >
              <Globe size={20} />
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-finance-purple hover:bg-slate-100 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white rounded-lg shadow-lg mt-2 py-2 border border-slate-200">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`w-full px-4 py-3 text-left transition-colors flex items-center gap-3 ${
                  activeSection === (item.target || item.id)
                    ? 'bg-finance-purple text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {item.icon}
                <span>{sectionLabels[language][item.id as keyof typeof sectionLabels['en']]}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
