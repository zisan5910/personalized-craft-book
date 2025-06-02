
import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./components/Auth";
import Navigation from './components/Navigation';
import Profile from './components/Profile';
import Education from './components/Education';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LiveChat from './components/LiveChat';
import ScrollToTop from './components/ScrollToTop';
import { User, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';

const queryClient = new QueryClient();

// Language data with proper type structure
const languageData = {
  en: {
    name: "John Doe",
    role: "Full Stack Developer",
    statement: "Passionate developer with 5+ years of experience creating innovative solutions",
    downloadCV: "Download CV",
    education: "Education",
    experience: "Experience", 
    skills: "Skills",
    certificates: "Certificates",
    contact: "Contact",
    achievements: "Achievements",
    certifications: "Certifications",
    courses: "Courses",
    family: "Family",
    share: "Share",
    portfolio: "Portfolio",
    about: "About",
    sections: {
      profile: "Profile",
      education: "Education", 
      experience: "Experience",
      skills: "Skills",
      certificates: "Certificates",
      contact: "Contact"
    }
  },
  bn: {
    name: "জন ডো",
    role: "ফুল স্ট্যাক ডেভেলপার",
    statement: "৫+ বছরের অভিজ্ঞতা সহ উদ্ভাবনী সমাধান তৈরিতে পারদর্শী ডেভেলপার",
    downloadCV: "সিভি ডাউনলোড",
    education: "শিক্ষা",
    experience: "অভিজ্ঞতা",
    skills: "দক্ষতা", 
    certificates: "সার্টিফিকেট",
    contact: "যোগাযোগ",
    achievements: "অর্জন",
    certifications: "সার্টিফিকেশন",
    courses: "কোর্স",
    family: "পরিবার",
    share: "শেয়ার",
    portfolio: "পোর্টফোলিও",
    about: "সম্পর্কে",
    sections: {
      profile: "প্রোফাইল",
      education: "শিক্ষা",
      experience: "অভিজ্ঞতা", 
      skills: "দক্ষতা",
      certificates: "সার্টিফিকেট",
      contact: "যোগাযোগ"
    }
  }
};

const PortfolioApp = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [language, setLanguage] = useState<'en' | 'bn'>('en');
  const [activeSection, setActiveSection] = useState('profile');
  const [isGhostOpen, setIsGhostOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const isDark = theme === 'dark';
  const data = languageData[language];

  // Handle scroll for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'bn' : 'en');
  };

  const handleDownloadCV = () => {
    // Create a dummy CV download
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,John Doe CV - Full Stack Developer';
    link.download = 'john_doe_cv.txt';
    link.click();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: data.name,
          text: `Check out ${data.name}'s portfolio`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      alert('Portfolio URL copied to clipboard!');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      {/* Auth Icon in top left */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowAuth(true)}
        className={`fixed top-4 left-4 z-50 p-3 rounded-full shadow-lg transition-all duration-300 ${
          isDark 
            ? 'bg-purple-600 hover:bg-purple-500 text-white' 
            : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
        }`}
        title="Authentication"
      >
        <User className="w-5 h-5" />
      </motion.button>

      {/* Auth Modal */}
      {showAuth && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-md w-full">
            <button
              onClick={() => setShowAuth(false)}
              className="absolute -top-2 -right-2 z-10 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg"
            >
              ×
            </button>
            <Auth />
          </div>
        </div>
      )}

      <Navigation 
        theme={theme}
        language={language}
        activeSection={activeSection}
        onToggleTheme={toggleTheme}
        onToggleLanguage={toggleLanguage}
        onScrollToSection={scrollToSection}
        data={data}
      />

      <main className="relative">
        <section id="profile">
          <Profile 
            theme={theme}
            language={language}
            data={data}
            onDownloadCV={handleDownloadCV}
            onShare={handleShare}
          />
        </section>

        <section id="education">
          <Education theme={theme} data={data} />
        </section>

        <section id="experience">
          <Experience theme={theme} data={data} />
        </section>

        <section id="skills">
          <Skills theme={theme} data={data} />
        </section>

        <section id="certificates">
          <Certificates theme={theme} data={data} />
        </section>

        <section id="contact">
          <Contact theme={theme} data={data} />
        </section>
      </main>

      <Footer theme={theme} data={data} />

      {/* Fixed Elements */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-40">
        <LiveChat theme={theme} />
        
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className={`p-3 rounded-full shadow-lg transition-all duration-300 ${
              isDark 
                ? 'bg-purple-600 hover:bg-purple-500 text-white' 
                : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
            }`}
            title="Scroll to top"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </div>

      <ScrollToTop />
    </div>
  );
};

const AppContent = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-yellow-400 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-gray-800">Z</span>
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={currentUser ? <Index /> : <PortfolioApp />} />
        <Route path="/portfolio" element={<PortfolioApp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
