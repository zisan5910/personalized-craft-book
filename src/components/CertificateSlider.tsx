
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Award, Calendar, ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
  description: string;
  credentialUrl?: string;
}

interface CertificateSliderProps {
  theme?: 'light' | 'dark';
}

const CertificateSlider = ({ theme = 'light' }: CertificateSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isDark = theme === 'dark';

  const certificates: Certificate[] = [
    {
      id: 1,
      title: "AWS Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
      image: "/placeholder.svg",
      description: "Certified in designing distributed systems on AWS",
      credentialUrl: "https://aws.amazon.com"
    },
    {
      id: 2,
      title: "React Developer Certification",
      issuer: "Meta",
      date: "2023",
      image: "/placeholder.svg",
      description: "Advanced React development and best practices",
      credentialUrl: "https://developers.facebook.com"
    },
    {
      id: 3,
      title: "Full Stack Web Development",
      issuer: "FreeCodeCamp",
      date: "2022",
      image: "/placeholder.svg",
      description: "Complete full-stack development curriculum",
      credentialUrl: "https://freecodecamp.org"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % certificates.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  const handleViewCredential = (url?: string) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "rounded-xl p-6 shadow-lg",
            isDark 
              ? "bg-gray-800/50 border border-gray-700" 
              : "bg-white/80 backdrop-blur-sm border border-gray-200"
          )}
        >
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Award className={cn(
                  "w-8 h-8",
                  isDark ? "text-yellow-400" : "text-yellow-500"
                )} />
                <h3 className={cn(
                  "text-xl font-bold",
                  isDark ? "text-white" : "text-gray-800"
                )}>
                  {certificates[currentIndex].title}
                </h3>
              </div>
              
              <p className={cn(
                "text-lg font-medium",
                isDark ? "text-purple-300" : "text-purple-600"
              )}>
                {certificates[currentIndex].issuer}
              </p>
              
              <div className="flex items-center gap-2">
                <Calendar className={cn(
                  "w-4 h-4",
                  isDark ? "text-gray-400" : "text-gray-500"
                )} />
                <span className={cn(
                  "text-sm",
                  isDark ? "text-gray-300" : "text-gray-600"
                )}>
                  {certificates[currentIndex].date}
                </span>
              </div>
              
              <p className={cn(
                "text-sm leading-relaxed",
                isDark ? "text-gray-300" : "text-gray-600"
              )}>
                {certificates[currentIndex].description}
              </p>
              
              {certificates[currentIndex].credentialUrl && (
                <button
                  onClick={() => handleViewCredential(certificates[currentIndex].credentialUrl)}
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300",
                    isDark 
                      ? "bg-purple-600 hover:bg-purple-500 text-white" 
                      : "bg-purple-500 hover:bg-purple-600 text-white"
                  )}
                >
                  <ExternalLink className="w-4 h-4" />
                  View Credential
                </button>
              )}
            </div>
            
            <div className="flex justify-center">
              <img
                src={certificates[currentIndex].image}
                alt={certificates[currentIndex].title}
                className="w-48 h-48 object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={prevSlide}
          className={cn(
            "p-2 rounded-full transition-all duration-300",
            isDark 
              ? "bg-gray-700 hover:bg-gray-600 text-white" 
              : "bg-white hover:bg-gray-50 text-gray-700 shadow-md"
          )}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Dots Indicator */}
        <div className="flex gap-2">
          {certificates.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                index === currentIndex
                  ? isDark ? "bg-purple-400" : "bg-purple-500"
                  : isDark ? "bg-gray-600" : "bg-gray-300"
              )}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className={cn(
            "p-2 rounded-full transition-all duration-300",
            isDark 
              ? "bg-gray-700 hover:bg-gray-600 text-white" 
              : "bg-white hover:bg-gray-50 text-gray-700 shadow-md"
          )}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CertificateSlider;
