
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { cn } from '../lib/utils';

interface ExperienceProps {
  theme: 'light' | 'dark';
  data: any;
}

const Experience = ({ theme, data }: ExperienceProps) => {
  const isDark = theme === 'dark';

  const experiences = [
    {
      title: "Senior Full Stack Developer",
      company: "Tech Solutions Inc.",
      location: "New York, NY",
      period: "2022 - Present",
      description: "Leading development of web applications using React, Node.js, and cloud technologies."
    },
    {
      title: "Full Stack Developer",
      company: "Digital Agency",
      location: "San Francisco, CA",
      period: "2020 - 2022",
      description: "Developed and maintained multiple client projects using modern web technologies."
    },
    {
      title: "Frontend Developer",
      company: "Startup Hub",
      location: "Austin, TX",
      period: "2018 - 2020",
      description: "Created responsive user interfaces and improved user experience for web applications."
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
          {data.experience}
        </motion.h2>
        
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
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
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1">
                  <h3 className={cn(
                    "text-xl font-bold mb-2",
                    isDark ? "text-white" : "text-gray-800"
                  )}>
                    {exp.title}
                  </h3>
                  
                  <p className={cn(
                    "text-lg font-medium mb-2",
                    isDark ? "text-purple-300" : "text-purple-600"
                  )}>
                    {exp.company}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className={cn(
                        "w-4 h-4",
                        isDark ? "text-gray-400" : "text-gray-500"
                      )} />
                      <span className={cn(
                        "text-sm",
                        isDark ? "text-gray-300" : "text-gray-600"
                      )}>
                        {exp.period}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <MapPin className={cn(
                        "w-4 h-4",
                        isDark ? "text-gray-400" : "text-gray-500"
                      )} />
                      <span className={cn(
                        "text-sm",
                        isDark ? "text-gray-300" : "text-gray-600"
                      )}>
                        {exp.location}
                      </span>
                    </div>
                  </div>
                  
                  <p className={cn(
                    "text-sm",
                    isDark ? "text-gray-300" : "text-gray-600"
                  )}>
                    {exp.description}
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

export default Experience;
