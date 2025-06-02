
import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';
import { cn } from '../lib/utils';

interface EducationProps {
  theme: 'light' | 'dark';
  data: any;
}

const Education = ({ theme, data }: EducationProps) => {
  const isDark = theme === 'dark';

  const educations = [
    {
      degree: "Master of Computer Science",
      institution: "Tech University",
      year: "2020-2022",
      description: "Specialized in Software Engineering and AI"
    },
    {
      degree: "Bachelor of Computer Science",
      institution: "State University",
      year: "2016-2020",
      description: "Computer Science and Programming"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={cn(
            "text-4xl md:text-5xl font-bold text-center mb-16",
            isDark ? "text-white" : "text-gray-800"
          )}
        >
          {data.education}
        </motion.h2>
        
        <div className="space-y-8">
          {educations.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={cn(
                "p-6 rounded-xl shadow-lg",
                isDark 
                  ? "bg-gray-800/50 border border-gray-700" 
                  : "bg-white/80 backdrop-blur-sm border border-gray-200"
              )}
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  "p-3 rounded-lg",
                  isDark ? "bg-purple-600" : "bg-purple-500"
                )}>
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1">
                  <h3 className={cn(
                    "text-xl font-bold mb-2",
                    isDark ? "text-white" : "text-gray-800"
                  )}>
                    {edu.degree}
                  </h3>
                  
                  <p className={cn(
                    "text-lg font-medium mb-2",
                    isDark ? "text-purple-300" : "text-purple-600"
                  )}>
                    {edu.institution}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className={cn(
                      "w-4 h-4",
                      isDark ? "text-gray-400" : "text-gray-500"
                    )} />
                    <span className={cn(
                      "text-sm",
                      isDark ? "text-gray-300" : "text-gray-600"
                    )}>
                      {edu.year}
                    </span>
                  </div>
                  
                  <p className={cn(
                    "text-sm",
                    isDark ? "text-gray-300" : "text-gray-600"
                  )}>
                    {edu.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
