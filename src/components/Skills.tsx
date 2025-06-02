
import { motion } from 'framer-motion';
import { Code, Database, Globe, Smartphone } from 'lucide-react';
import { cn } from '../lib/utils';

interface SkillsProps {
  theme: 'light' | 'dark';
  data: any;
}

const Skills = ({ theme, data }: SkillsProps) => {
  const isDark = theme === 'dark';

  const skillCategories = [
    {
      title: "Frontend",
      icon: Globe,
      skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"]
    },
    {
      title: "Backend",
      icon: Database,
      skills: ["Node.js", "Python", "PostgreSQL", "MongoDB"]
    },
    {
      title: "Mobile",
      icon: Smartphone,
      skills: ["React Native", "Flutter", "iOS", "Android"]
    },
    {
      title: "Tools",
      icon: Code,
      skills: ["Git", "Docker", "AWS", "Firebase"]
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
          {data.skills}
        </motion.h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={cn(
                "p-6 rounded-xl shadow-lg text-center",
                isDark 
                  ? "bg-gray-800/50 border border-gray-700" 
                  : "bg-white/80 backdrop-blur-sm border border-gray-200"
              )}
            >
              <div className={cn(
                "w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4",
                isDark ? "bg-purple-600" : "bg-purple-500"
              )}>
                <category.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className={cn(
                "text-xl font-bold mb-4",
                isDark ? "text-white" : "text-gray-800"
              )}>
                {category.title}
              </h3>
              
              <div className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className={cn(
                      "inline-block px-3 py-1 rounded-full text-sm mr-2 mb-2",
                      isDark 
                        ? "bg-gray-700 text-gray-300" 
                        : "bg-gray-100 text-gray-700"
                    )}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
