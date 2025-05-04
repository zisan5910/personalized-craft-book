
import { motion } from 'framer-motion';
import { Element } from 'react-scroll';
import { GraduationCap, School, ExternalLink, BookOpen } from 'lucide-react';
import { cn } from '../lib/utils';

interface EducationProps {
  language: 'en' | 'bn';
  theme?: 'light' | 'dark';
}

const Education = ({ language, theme = 'light' }: EducationProps) => {
  const isDark = theme === 'dark';
  
  const educationHistory = [
    {
      id: 'hsc',
      title: {
        en: 'Higher Secondary Certificate (HSC)',
        bn: 'উচ্চ মাধ্যমিক সার্টিফিকেট (এইচএসসি)',
      },
      institution: {
        en: 'KARATOA MULTIMEDIA SCHOOL AND COLLEGE',
        bn: 'করতোয়া মাল্টিমিডিয়া স্কুল অ্যান্ড কলেজ',
      },
      duration: {
        en: '2023-2024',
        bn: '২০২৩-২০২৪',
      },
      gpa: {
        en: 'GPA: 5.00/5.00',
        bn: 'জিপিএ: ৫.০০/৫.০০',
      },
      details: {
        en: ['Group: Science', 'Major: Higher Math'],
        bn: ['গ্রুপ: বিজ্ঞান', 'মেজর: উচ্চতর গণিত'],
      },
      link: 'https://g.co/kgs/WZW688y',
      icon: (
        <GraduationCap size={20} className={cn("text-blue-500", isDark && "text-blue-400")} aria-hidden="true" />
      ),
    },
    {
      id: 'ssc',
      title: {
        en: 'Secondary School Certificate (SSC)',
        bn: 'মাধ্যমিক স্কুল সার্টিফিকেট (এসএসসি)',
      },
      institution: {
        en: 'DHUNAT GOVT N.U. PILOT MODEL HIGH SCHOOL',
        bn: 'ধুনট সরকারি এন. ইউ. পাইলট মডেল উচ্চ বিদ্যালয়',
      },
      duration: {
        en: '2021-2022',
        bn: '২০২১-২০২২',
      },
      gpa: {
        en: 'GPA: 5.00/5.00',
        bn: 'জিপিএ: ৫.০০/৫.০০',
      },
      details: {
        en: ['Group: Science', 'Major: Higher Math'],
        bn: ['গ্রুপ: বিজ্ঞান', 'মেজর: উচ্চতর গণিত'],
      },
      link: 'https://g.co/kgs/W57Ts2o',
      icon: <School size={20} className={cn("text-green-500", isDark && "text-green-400")} aria-hidden="true" />,
    },
  ];

  return (
    <Element name="education">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        className={cn(
          "p-6 rounded-lg shadow-md transition-colors", 
          isDark 
            ? "bg-gray-800 text-white" 
            : "bg-white text-gray-900"
        )}
        aria-labelledby="education-heading"
      >
        <h2
          id="education-heading"
          className={cn(
            "text-2xl font-bold mb-8 flex items-center gap-2", 
            isDark ? "text-green-400" : "text-green-700"
          )}
        >
          <BookOpen className={isDark ? "text-emerald-400" : "text-emerald-500"} aria-hidden="true" />
          {language === 'en' ? 'Education' : 'শিক্ষা'}
        </h2>

        <div className="space-y-6">
          {educationHistory.map((education) => (
            <motion.div
              key={education.id}
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100 }}
              className={cn(
                "border-l-4 pl-4 py-4 rounded-r-lg transition-colors duration-200 group",
                isDark 
                  ? "border-green-500 hover:bg-gray-700" 
                  : "border-green-600 hover:bg-green-50"
              )}
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  "p-2 rounded-full flex-shrink-0 transition-colors",
                  isDark 
                    ? "bg-gray-700 group-hover:bg-gray-600" 
                    : "bg-green-100 group-hover:bg-green-200"
                )}>
                  {education.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">
                    {education.title[language]}
                  </h3>
                  <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                    {education.institution[language]}{' '}
                    <a
                      href={education.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "inline-flex items-center gap-1",
                        isDark 
                          ? "text-blue-400 hover:text-blue-300" 
                          : "text-blue-600 hover:text-blue-800"
                      )}
                    >
                      <ExternalLink size={16} />
                    </a>
                  </p>
                  <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                    {education.duration[language]}
                  </p>
                  <p className="font-medium">{education.gpa[language]}</p>
                  <ul className={cn(
                    "mt-2 list-disc list-inside",
                    isDark ? "text-gray-300" : "text-gray-700"
                  )}>
                    {education.details[language].map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </Element>
  );
};

export default Education;
