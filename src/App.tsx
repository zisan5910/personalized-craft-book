import {
  Download,
  FileText,
  ScrollText,
  UserCircle,
  School,
  BookOpen,
  Briefcase,
  FileBadge,
  Code,
  HeartHandshake,
  Mail,
  Share2,
} from 'lucide-react';
import { Element, scroller } from 'react-scroll';
import { motion } from 'framer-motion';
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

function App() {
  const [language, setLanguage] = useState<'en' | 'bn'>('en');
  const [activeSection, setActiveSection] = useState<string>('profile');
  const [age, setAge] = useState<number>(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
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

        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={cn(
            'relative pt-24 pb-16 overflow-hidden',
            'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900',
            'text-white'
          )}
        >
          {/* Enhanced animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.1),rgba(0,0,0,0)_50%)]"></div>
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
              className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-500/30 to-transparent rounded-full filter blur-3xl"
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
              className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-500/20 to-transparent rounded-full filter blur-3xl"
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Enhanced profile image with better glow effect */}
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
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/75 via-purple-500/75 to-blue-500/75 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="absolute inset-0 rounded-full border-4 border-white/10 group-hover:border-white/30 transition-all duration-500"></div>
                <img
                  src="https://github.com/RidoanDev.png"
                  alt="Md Ridoan Mahmud Zisan"
                  className="w-56 h-56 rounded-full border-4 border-white/20 shadow-2xl relative z-10 transition-all duration-300 group-hover:border-white/40 object-cover"
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-white/10"
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{ scale: 1.2, opacity: 0 }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                />
              </motion.div>

              {/* Enhanced profile content with better typography and animations */}
              <div className="flex-1 text-center lg:text-left">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-blue-100">
                    {content[language].name}
                  </h1>
                  <motion.p
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-xl md:text-2xl mb-6 text-blue-100"
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
                  <motion.p
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-lg max-w-2xl mx-auto lg:mx-0 mb-8 text-slate-300 leading-relaxed"
                  >
                    {content[language].statement}
                  </motion.p>
                </motion.div>

                {/* Enhanced action buttons */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
                >
                  <motion.a
                    href="/Resume.pdf"
                    download="Md Ridoan Mahmud Zisan.pdf"
                    whileHover={{ y: -2, scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      'px-8 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl',
                      'bg-gradient-to-br from-white to-blue-50 text-slate-900 hover:from-blue-50 hover:to-white'
                    )}
                  >
                    <Download size={20} />
                    {content[language].downloadCV}
                  </motion.a>
                  <motion.button
                    whileHover={{ y: -2, scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => scrollToSection('certificates')}
                    className={cn(
                      'px-8 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl',
                      'bg-transparent border-2 border-white/30 text-white',
                      'hover:bg-white/10 hover:border-white/50'
                    )}
                  >
                    <ScrollText size={20} />
                    {content[language].certifications}
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.header>
      </Element>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8">
          <Element name="education">
            <Education language={language} />
          </Element>

          <Element name="courses">
            <Courses language={language} />
          </Element>

          <Element name="experience">
            <Experience language={language} />
          </Element>

          <Element name="certificates">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-green-700">
                <FileText />
                {content[language].certifications}
              </h2>
              <CertificateSlider
                certificates={certificates}
                language={language}
              />
            </motion.section>
          </Element>

          <Element name="skills">
            <Skill language={language} />
          </Element>

          <Element name="information">
            <Information language={language} age={age} />
          </Element>

          <Element name="contact">
            <Contact language={language} />
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

      {/* Enhanced floating action buttons */}
      <div
        className="fixed bottom-6 right-6 flex flex-col items-end gap-3"
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
            className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-4 rounded-full shadow-lg hover:shadow-emerald-200/50 transition-all"
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
            'p-4 rounded-full shadow-lg text-white transition-all',
            isMenuOpen
              ? 'bg-gradient-to-br from-red-500 to-pink-600 hover:shadow-red-200/50'
              : 'bg-gradient-to-br from-blue-500 to-indigo-600 hover:shadow-blue-200/50'
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

      {/* Add scroll-to-top button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => scrollToSection('profile')}
        className="fixed bottom-6 left-6 p-3 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 text-white shadow-lg hover:shadow-purple-200/50 transition-all z-50"
        title="Scroll to top"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 10l7-7m0 0l7 7m-7-7v18" 
          />
        </svg>
      </motion.button>
    </div>
  );
}

export default App;
