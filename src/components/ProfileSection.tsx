import { Element } from 'react-scroll';
import { Download, ScrollText } from './icons';
import { cn } from '../lib/utils';

interface ProfileSectionProps {
  language: 'en' | 'bn';
  content: any;
  scrollToSection: (section: string) => void;
}

const ProfileSection = ({
  language,
  content,
  scrollToSection,
}: ProfileSectionProps) => {
  return (
    <Element name="profile">
      <header
        className={cn(
          'relative pt-24 pb-16 overflow-hidden',
          'bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#0a192f]', // Deep Navy + Teal Tint
          'text-white'
        )}
      >
        {/* Subtle Grainy Texture + Gradient Overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#112240]/30 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Profile Image with Soft Glow */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#64ffda]/30 to-[#64ffda]/10 rounded-full blur-lg opacity-60"></div>
              <div className="absolute inset-0 rounded-full border-2 border-[#64ffda]/20 mix-blend-overlay"></div>
              <img
                src="/profile.jpg"
                alt="Md Ridoan Mahmud Zisan"
                className="w-56 h-56 rounded-full border-2 border-[#64ffda]/30 shadow-xl relative z-10"
              />
            </div>

            {/* Profile Content */}
            <div className="flex-1 text-center lg:text-left">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#ccd6f6]">
                  {content[language].name}
                </h1>
                <p className="text-xl md:text-2xl mb-6 text-[#ccd6f6]">
                  {content[language].role}
                </p>
                <p className="text-lg max-w-2xl mx-auto lg:mx-0 mb-8 text-[#8892b0] leading-relaxed">
                  {content[language].statement}
                </p>
              </div>

              {/* Action Buttons (Elegant Teal Accent) */}
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <a
                  href="/Resume.pdf"
                  download="Md Ridoan Mahmud Zisan.pdf"
                  className={cn(
                    'px-8 py-3 rounded-md font-medium flex items-center justify-center gap-2 transition-all shadow-sm',
                    'bg-[#64ffda] text-[#0a192f] hover:bg-[#52e6c4] hover:shadow-md'
                  )}
                >
                  <Download size={20} />
                  {content[language].downloadCV}
                </a>
                <button
                  onClick={() => scrollToSection('certificates')}
                  className={cn(
                    'px-8 py-3 rounded-md font-medium flex items-center justify-center gap-2 transition-all shadow-sm',
                    'bg-transparent border-2 border-[#64ffda]/40 text-[#64ffda]',
                    'hover:bg-[#64ffda]/10 hover:border-[#64ffda]/60 hover:shadow-md'
                  )}
                >
                  <ScrollText size={20} />
                  {content[language].certifications}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </Element>
  );
};

export default ProfileSection;
