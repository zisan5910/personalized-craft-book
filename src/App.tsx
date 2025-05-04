import {
  Download,
  Phone,
  MapPin,
  Linkedin,
  FileText,
  Award,
  ScrollText,
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
  UserCircle,
  School,
  BookOpen,
  Briefcase,
  FileBadge,
  Code,
  HeartHandshake,
  Mail,
  Share2,
  Sparkle,
} from 'lucide-react';
import { Element, scroller } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { cn } from './lib/utils';

// Import components
import CertificateSlider from './components/CertificateSlider';
import Navigation from './components/Navigation';
import LiveChat from './components/LiveChat';
import Courses from './components/Courses';
import Skill from './components/Skill';
import Contact from './components/Contact';
import Information from './components/Information';
import Education from './components/Education';
import Experience from './components/Experience';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';
import ThemeSwitcher from './components/ThemeSwitcher';
import { useTheme } from './contexts/ThemeContext';

function App() {
  const [language, setLanguage] = useState<'en' | 'bn'>('en');
  const [activeSection, setActiveSection] = useState<string>('profile');
  const [age, setAge] = useState<number>(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGhostOpen, setIsGhostOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const calculateAge = () => {
      const birthDate = new Date('2007-12-31');
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      setAge(age);
    };

    calculateAge();
    const interval = setInterval(calculateAge, 86400000); // Update age daily
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const isScrollingUp = touchY < touchStartY - 10;

      if (isScrollingUp && document.activeElement?.tagName === 'INPUT') {
        return;
      }
      setIsMenuOpen(false);
      setIsGhostOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
        setIsGhostOpen(false);
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scrollToSection = (section: string) => {
    scroller.scrollTo(section, {
      duration: 800,
      smooth: true,
      offset: -64,
    });
    setActiveSection(section);
  };

  const content = {
    en: {
      name: 'Md Ridoan Mahmud Zisan',
      role: 'Student | Volunteer | Web Application Developer',
      statement:
        'As a dedicated student and volunteer, I aim to use my academic knowledge and interpersonal skills to contribute to educational and social initiatives. I seek opportunities for growth, collaboration, and positive impact while upholding integrity, empathy, and excellence.',
      downloadCV: 'Download Resume',
      education: 'Education',
      experience: 'Experience',
      skills: 'Skills',
      certificates: 'Certificates',
      contact: 'Contact',
      achievements: 'Achievements',
      certifications: 'Certifications',
      volunteerWork: 'Volunteer Work',
      languages: 'Language Skills',
      computerSkills: 'Computer Skills',
      adminSkills: 'Administrative Skills',
      family: 'Family & Personal Info',
      age: 'Age',
      years: 'years',
      sections: {
        profile: 'Profile',
        education: 'Education',
        experience: 'Experience',
        skills: 'Skills & Competencies',
        certificates: 'Certificates',
        contact: 'Contact',
        family: 'Family & Personal',
        share: 'Share',
      },
    },
    bn: {
      name: 'মো: রিদওয়ান মাহমুদ জিসান',
      role: 'শিক্ষার্থী | স্বেচ্ছাসেবী | ওয়েব এপ্লিকেশন ডেভলপার',
      statement:
        'একজন নিবেদিতপ্রাণ ছাত্র এবং স্বেচ্ছাসেবক হিসেবে, আমি আমার একাডেমিক জ্ঞান এবং আন্তঃব্যক্তিক দক্ষতা ব্যবহার করে শিক্ষাগত এবং সামাজিক উদ্যোগে অবদান রাখার লক্ষ্য রাখি। আমি সততা, সহানুভূতি এবং শ্রেষ্ঠত্ব বজায় রেখে বৃদ্ধি, সহযোগিতা এবং ইতিবাচক প্রভাবের সুযোগ খুঁজি।',
      downloadCV: 'জীবনবৃত্তান্ত ডাউনলোড করুন',
      education: 'শিক্ষা',
      experience: 'অভিজ্ঞতা',
      skills: 'দক্ষতা',
      certificates: 'সার্টিফিকেট',
      contact: 'যোগাযোগ',
      achievements: 'অর্জন',
      certifications: 'সার্টিফিকেট',
      volunteerWork: 'স্বেচ্ছাসেবী কাজ',
      languages: 'ভাষার দক্ষতা',
      computerSkills: 'কম্পিউটার দক্ষতা',
      adminSkills: 'প্রশাসনিক দক্ষতা',
      family: 'পারিবারিক ও ব্যক্তিগত তথ্য',
      age: 'বয়স',
      years: 'বছর',
      sections: {
        profile: 'প্রোফাইল',
        education: 'শিক্ষা',
        experience: 'অভিজ্ঞতা',
        skills: 'দক্ষতা ও যোগ্যতা',
        certificates: 'সার্টিফিকেট',
        contact: 'যোগাযোগ',
        family: 'পারিবারিক তথ্য',
        share: 'শেয়ার',
      },
    },
  };

  const navigationItems = [
    {
      id: 'profile',
      icon: (
        <UserCircle
          size={22}
          className="text-indigo-500 hover:scale-110 transition-all hover:drop-shadow-lg"
        />
      ),
      title: 'Profile',
    },
    {
      id: 'education',
      icon: (
        <School
          size={22}
          className="text-blue-500 hover:rotate-6 transition-all hover:drop-shadow-lg"
        />
      ),
      title: 'Education',
    },
    {
      id: 'courses',
      icon: (
        <BookOpen
          size={22}
          className="text-emerald-500 hover:scale-110 transition-all hover:drop-shadow-lg"
        />
      ),
      title: 'Courses',
    },
    {
      id: 'experience',
      icon: (
        <Briefcase
          size={22}
          className="text-amber-500 hover:rotate-6 transition-all hover:drop-shadow-lg"
        />
      ),
      title: 'Experience',
    },
    {
      id: 'certificates',
      icon: (
        <FileBadge
          size={22}
          className="text-red-500 hover:scale-110 transition-all hover:drop-shadow-lg"
        />
      ),
      title: 'Certificates',
    },
    {
      id: 'skills',
      icon: (
        <Code
          size={22}
          className="text-purple-500 hover:rotate-6 transition-all hover:drop-shadow-lg"
        />
      ),
      title: 'Skills',
    },
    {
      id: 'family',
      icon: (
        <HeartHandshake
          size={22}
          className="text-pink-500 hover:scale-110 transition-all hover:drop-shadow-lg"
        />
      ),
      title: 'Family',
    },
    {
      id: 'contact',
      icon: (
        <Mail
          size={22}
          className="text-cyan-500 hover:rotate-6 transition-all hover:drop-shadow-lg"
        />
      ),
      title: 'Contact',
    },
    {
      id: 'share',
      icon: (
        <Share2
          size={22}
          className="text-teal-500 hover:scale-110 transition-all hover:drop-shadow-lg"
        />
      ),
      target: 'social-links',
      title: 'Share',
    },
  ];

  const certificates = [
    // High-Demand Tech Skills
    {
      title: {
        en: "Introduction to Artificial Intelligence",
        bn: "কৃত্রিম বুদ্ধিমত্তার ভূমিকা"
      },
      image: "https://i.postimg.cc/VsZdZ25P/introduction-to-artificial-intelligence.png"
    },
    {
      title: {
        en: "Introduction to Cyber Security",
        bn: "সাইবার সিকিউরিটি পরিচিতি"
      },
      image: "https://i.postimg.cc/RZKhFFdv/introduction-to-cyber-security.png"
    },
    {
      title: {
        en: "Introduction to Python",
        bn: "পাইথনের পরিচিতি"
      },
      image: "https://i.postimg.cc/L6qhcvZY/Introduction-to-Python.jpg"
    },
    {
      title: {
        en: "Machine Learning",
        bn: "মেশিন লার্নিং"
      },
      image: "https://i.postimg.cc/mrSrY5Kq/machine-learning.png"
    },
    {
      title: {
        en: "Complete Web Development",
        bn: "সম্পূর্ণ ওয়েব ডেভেলপমেন্ট"
      },
      image: "https://i.postimg.cc/gkr6Ym10/Complete-Web-Development.png"
    },
    {
      title: {
        en: "Digital Marketing",
        bn: "ডিজিটাল মার্কেটিং"
      },
      image: "https://i.postimg.cc/XvKr2JBs/digital-marketing.png"
    },

    // Sustainability & Global Issues
    {
      title: {
        en: "Introduction to Sustainable Development in Practice",
        bn: "অনুশীলনে টেকসই উন্নয়নের ভূমিকা"
      },
      image: "https://i.postimg.cc/tCL7pPhr/Introduction-to-Sustainable-Development-in-Practice.jpg"
    },
    {
      title: {
        en: "Gender equality and human rights in climate action and renewable energy",
        bn: "জলবায়ু কর্ম ও নবায়নযোগ্য শক্তিতে লিঙ্গ সমতা ও মানবাধিকার"
      },
      image: "https://i.postimg.cc/V6Dd8VRM/Gender-equality-and-human-rights-in-climate-action-and-renewable-energy.jpg"
    },
    {
      title: {
        en: "Net Zero 101- What, Why and How",
        bn: "নেট জিরো ১০১: কি, কেন এবং কিভাবে"
      },
      image: "https://i.postimg.cc/ZR7Kgybx/Net-Zero-101-What-Why-and-How.jpg"
    },
    {
      title: {
        en: "The UN Climate Change process",
        bn: "জাতিসংঘের জলবায়ু পরিবর্তন প্রক্রিয়া"
      },
      image: "https://i.postimg.cc/zv4DDZRL/The-UN-Climate-Change-process.jpg"
    },

    // Academic & Professional Development
    {
      title: {
        en: "Bangladesh Mathematical Olympiad",
        bn: "বাংলাদেশ গণিত অলিম্পিয়াড"
      },
      image: "https://i.postimg.cc/pLFhFkWb/Bangladesh-Mathematical-Olympiad.png"
    },
    {
      title: {
        en: "Business Case Solving Certificate",
        bn: "ব্যবসায়িক কেস সমাধান সার্টিফিকেট"
      },
      image: "https://i.postimg.cc/4y27zSHZ/Business-Case-Solving-Certificate.png"
    },

    // Professional Skills
    {
      title: {
        en: "Presentation and Public Speaking",
        bn: "প্রেজেন্টেশন ও পাবলিক স্পিকিং"
      },
      image: "https://i.postimg.cc/VvJLcL5Q/Presentation-and-Public-Speaking.png"
    },
    {
      title: {
        en: "CV writing and interview",
        bn: "সিভি লেখা ও ইন্টারভিউ প্রস্তুতি"
      },
      image: "https://i.postimg.cc/cJGKMYCK/CV-writing-and-interview.jpg"
    },
    {
      title: {
        en: "Basic of management",
        bn: "ম্যানেজমেন্টের মৌলিক বিষয়"
      },
      image: "https://i.postimg.cc/0jyKKsQc/Basic-of-management.jpg"
    },
    {
      title: {
        en: "Money management",
        bn: "টাকা ব্যবস্থাপনা"
      },
      image: "https://i.postimg.cc/fLTRBvNb/Money-management.jpg"
    },
    {
      title: {
        en: "Corporate etiquette",
        bn: "ক cooperate শিষ্টাচার"
      },
      image: "https://i.postimg.cc/vHjxTCdt/Corporate-etiquette.jpg"
    },
    {
      title: {
        en: "Communication hacks",
        bn: "যোগাযোগ কৌশল"
      },
      image: "https://i.postimg.cc/dQ5yPLHX/Communication-hacks.jpg"
    },
    {
      title: {
        en: "Microsoft Office Starter Course Certificate",
        bn: "মাইক্রোসফ্ট অফিস প্রাথমিক কোর্স সার্টিফিকেট"
      },
      image: "https://i.postimg.cc/bvPJ2hVk/Microsoft-Office-Starter-Course-Certificate.png"
    },
    {
      title: {
        en: "Email Writing Certificate",
        bn: "ইমেইল লেখার সার্টিফিকেট"
      },
      image: "https://i.postimg.cc/fLwJ1NxD/Email-Writing-Certificate.png"
    },

    // Language Proficiency
    {
      title: {
        en: "English for Everyday Certificate",
        bn: "দৈনন্দিন ইংরেজি সার্টিফিকেট"
      },
      image: "https://i.postimg.cc/nrrMcGRW/English-for-Everyday-Certificate.png"
    },
    {
      title: {
        en: "Academic English grammar",
        bn: "একাডেমিক ইংরেজি ব্যাকরণ"
      },
      image: "https://i.postimg.cc/qRLC7RkN/Academic-English-grammar.jpg"
    },
    {
      title: {
        en: "IELTS mock test solution",
        bn: "আইইএলটিএস মক টেস্ট সমাধান"
      },
      image: "https://i.postimg.cc/L5W5qgG8/IELTS-mock-test-solution.jpg"
    }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      <AnimatedBackground />
      
      <Navigation
        navigationItems={navigationItems}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        language={language}
        setLanguage={setLanguage}
      />

      <Element name="profile">
        <div className="fixed top-4 right-4 z-50">
          <LiveChat />
        </div>

        <div className="fixed top-4 left-4 z-50">
          <ThemeSwitcher />
        </div>

        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={cn(
            'relative pt-24 pb-16 overflow-hidden',
            isDark 
              ? 'text-white' 
              : 'text-slate-800'
          )}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.2, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className={`absolute -top-1/2 -left-1/2 w-full h-full rounded-full filter blur-3xl ${
                isDark 
                  ? 'bg-gradient-to-br from-purple-500/30 to-transparent' 
                  : 'bg-gradient-to-br from-sky-400/20 to-transparent'
              }`}
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
              className={`absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full filter blur-3xl ${
                isDark 
                  ? 'bg-gradient-to-br from-blue-500/20 to-transparent' 
                  : 'bg-gradient-to-br from-indigo-300/20 to-transparent'
              }`}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Profile Image with animated effect */}
              <motion.div
                initial={{ scale: 0, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2,
                }}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <motion.div 
                  animate={{ 
                    rotate: [0, 360],
                  }}
                  transition={{ 
                    duration: 20, 
                    ease: "linear", 
                    repeat: Infinity 
                  }}
                  className={`absolute -inset-1 rounded-full opacity-70 blur-md ${
                    isDark 
                      ? 'bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600' 
                      : 'bg-gradient-to-r from-sky-400 via-indigo-400 to-sky-400'
                  }`}
                />
                <div className="absolute inset-0 rounded-full border-4 border-white/10 group-hover:border-white/30 transition-all duration-500"></div>
                
                <div className="relative">
                  <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-75 blur-sm animate-pulse-slow"></div>
                  <img
                    src="https://github.com/RidoanDev.png"
                    alt="Md Ridoan Mahmud Zisan"
                    className="w-56 h-56 rounded-full border-4 border-white/20 shadow-2xl relative z-10 transition-all duration-300 group-hover:border-white/40"
                  />
                </div>
                
                {/* Floating sparkles */}
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute -top-2 right-5 text-yellow-300"
                >
                  <Sparkle size={20} />
                </motion.div>
                
                <motion.div
                  animate={{
                    y: [0, -12, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                  className="absolute top-10 -right-2 text-pink-400"
                >
                  <Sparkle size={14} />
                </motion.div>
              </motion.div>

              {/* Profile Content */}
              <div className="flex-1 text-center lg:text-left">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <h1 className={`text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent ${
                    isDark 
                      ? 'bg-gradient-to-r from-white to-slate-300' 
                      : 'bg-gradient-to-r from-slate-800 to-slate-600'
                  }`}>
                    {content[language].name}
                  </h1>
                  <motion.p
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className={`text-xl md:text-2xl mb-6 ${
                      isDark ? 'text-slate-200' : 'text-slate-600'
                    }`}
                  >
                    {content[language].role.split(' | ').map((part, i) => (
                      <motion.span
                        key={i}
                        className="inline-block mr-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + i * 0.1 }}
                      >
                        {part}
                        {i < content[language].role.split(' | ').length - 1 &&
                          ' | '}
                      </motion.span>
                    ))}
                  </motion.p>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="relative max-w-2xl mx-auto lg:mx-0 mb-8"
                  >
                    <div className={`absolute inset-0 rounded-lg ${
                      isDark 
                        ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20' 
                        : 'bg-gradient-to-r from-sky-100 to-indigo-100'
                    } blur-md -z-10`}></div>
                    <p className={`text-lg p-4 rounded-lg leading-relaxed ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    } backdrop-blur-sm ${
                      isDark ? 'bg-slate-900/40' : 'bg-white/40'
                    } shadow-lg`}>
                      {content[language].statement}
                    </p>
                  </motion.div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
                >
                  <motion.a
                    href="/Resume.pdf"
                    download="Md Ridoan Mahmud Zisan.pdf"
                    whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      'px-8 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl',
                      isDark
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500'
                        : 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white hover:from-sky-400 hover:to-indigo-400'
                    )}
                  >
                    <Download size={20} />
                    <span className="relative">
                      {content[language].downloadCV}
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white/40 transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
                    </span>
                  </motion.a>
                  <motion.button
                    whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => scrollToSection('certificates')}
                    className={cn(
                      'px-8 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl',
                      isDark
                        ? 'bg-transparent border-2 border-purple-500/30 text-purple-300 hover:border-purple-500/50 hover:bg-purple-500/10'
                        : 'bg-transparent border-2 border-indigo-500/30 text-indigo-600 hover:border-indigo-500/50 hover:bg-indigo-500/10'
                    )}
                  >
                    <ScrollText size={20} />
                    <span className="relative">
                      {content[language].certifications}
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-current transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
                    </span>
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.header>
      </Element>

      <main className={`container mx-auto px-4 py-12 ${
        isDark ? 'text-slate-100' : 'text-slate-700'
      }`}>
        <div className="grid grid-cols-1 gap-8">
          {/* Education Section with Glass Morphism */}
          <Element name="education">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`p-1 rounded-lg ${
                isDark 
                  ? 'bg-gradient-to-r from-purple-500/30 to-blue-500/30' 
                  : 'bg-gradient-to-r from-sky-200 to-indigo-200'
              }`}
            >
              <div className={`${
                isDark ? 'bg-slate-900/80' : 'bg-white/80'
              } backdrop-blur-xl p-6 rounded-lg`}>
                <Education language={language} />
              </div>
            </motion.div>
          </Element>

          {/* Courses Section */}
          <Element name="courses">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`p-1 rounded-lg ${
                isDark 
                  ? 'bg-gradient-to-r from-blue-500/30 to-emerald-500/30' 
                  : 'bg-gradient-to-r from-indigo-200 to-emerald-200'
              }`}
            >
              <div className={`${
                isDark ? 'bg-slate-900/80' : 'bg-white/80'
              } backdrop-blur-xl p-6 rounded-lg`}>
                <Courses language={language} />
              </div>
            </motion.div>
          </Element>

          {/* Experience Section */}
          <Element name="experience">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`p-1 rounded-lg ${
                isDark 
                  ? 'bg-gradient-to-r from-amber-500/30 to-red-500/30' 
                  : 'bg-gradient-to-r from-amber-200 to-red-200'
              }`}
            >
              <div className={`${
                isDark ? 'bg-slate-900/80' : 'bg-white/80'
              } backdrop-blur-xl p-6 rounded-lg`}>
                <Experience language={language} />
              </div>
            </motion.div>
          </Element>

          {/* Certificates Section */}
          <Element name="certificates">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`p-1 rounded-lg ${
                isDark 
                  ? 'bg-gradient-to-r from-green-500/30 to-teal-500/30' 
                  : 'bg-gradient-to-r from-green-200 to-teal-200'
              }`}
            >
              <div className={`${
                isDark ? 'bg-slate-900/80' : 'bg-white/80'
              } backdrop-blur-xl p-6 rounded-lg`}>
                <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
                  isDark ? 'text-green-400' : 'text-green-700'
                }`}>
                  <FileText />
                  {content[language].certifications}
                </h2>
                <CertificateSlider
                  certificates={certificates}
                  language={language}
                />
              </div>
            </motion.div>
          </Element>

          {/* Skills Section */}
          <Element name="skills">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`p-1 rounded-lg ${
                isDark 
                  ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30' 
                  : 'bg-gradient-to-r from-purple-200 to-pink-200'
              }`}
            >
              <div className={`${
                isDark ? 'bg-slate-900/80' : 'bg-white/80'
              } backdrop-blur-xl p-6 rounded-lg`}>
                <Skill language={language} />
              </div>
            </motion.div>
          </Element>

          {/* Information Section */}
          <Element name="information">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`p-1 rounded-lg ${
                isDark 
                  ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30' 
                  : 'bg-gradient-to-r from-cyan-200 to-blue-200'
              }`}
            >
              <div className={`${
                isDark ? 'bg-slate-900/80' : 'bg-white/80'
              } backdrop-blur-xl p-6 rounded-lg`}>
                <Information language={language} age={age} />
              </div>
            </motion.div>
          </Element>

          {/* Contact Section */}
          <Element name="contact">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`p-1 rounded-lg ${
                isDark 
                  ? 'bg-gradient-to-r from-indigo-500/30 to-purple-500/30' 
                  : 'bg-gradient-to-r from-indigo-200 to-purple-200'
              }`}
            >
              <div className={`${
                isDark ? 'bg-slate-900/80' : 'bg-white/80'
              } backdrop-blur-xl p-6 rounded-lg`}>
                <Contact language={language} />
              </div>
            </motion.div>
          </Element>
        </div>
      </main>

      <Element name="footer">
        <Footer
          language={language}
          scrollToSection={scrollToSection}
          content={content}
        />
      </Element>

      {/* Floating action buttons */}
      <div
        className="fixed bottom-6 right-6 flex flex-col items-end gap-2"
        ref={containerRef}
      >
        {isMenuOpen && (
          <motion.a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              const isMobile =
                /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                  navigator.userAgent
                );
              isMobile
                ? (window.location.href = 'mailto:ridoan.zisan@gmail.com')
                : window.open(
                    'https://mail.google.com/mail/?view=cm&fs=1&to=ridoan.zisan@gmail.com',
                    '_blank'
                  );
              setIsMenuOpen(false);
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.05 }}
            className={`text-white p-4 rounded-full shadow-md transition-colors ${
              isDark 
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500' 
                : 'bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-300 hover:to-emerald-400'
            }`}
            title="Send Email"
          >
            <Mail size={24} />
          </motion.a>
        )}

        <LiveChat />

        <motion.button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            'p-4 rounded-full shadow-md text-white transition-colors',
            isMenuOpen
              ? isDark 
                ? 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500'
                : 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400'
              : isDark
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500'
                : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400'
          )}
          title={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <motion.div
            animate={{ rotate: isMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Mail size={24} />
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
}

export default App;
