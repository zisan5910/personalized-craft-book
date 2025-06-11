import { Element } from 'react-scroll';
import {
  Award,
  Languages,
  Target,
  MessageSquare,
  PlusCircle,
  Star,
} from 'lucide-react';

interface SkillsProps {
  language: 'en' | 'bn';
}

const Skills = ({ language }: SkillsProps) => {
  const skillsData = {
    languages: {
      title: {
        en: 'Languages',
        bn: 'ভাষা',
      },
      skills: [
        {
          name: {
            en: 'Bengali (Fluent)',
            bn: 'বাংলা (সাবলীল)',
          },
          level: 5,
        },
        {
          name: {
            en: 'English (Professional)',
            bn: 'ইংরেজি (পেশাদার)',
          },
          level: 4,
        },
      ],
    },
    professional: {
      title: {
        en: 'Core Professional Skills',
        bn: 'মূল পেশাদার দক্ষতা',
      },
      skills: [
        { en: 'MS Office Suite', bn: 'এমএস অফিস' },
        { en: 'Email Communication', bn: 'ইমেইল যোগাযোগ' },
        { en: 'Team Collaboration', bn: 'দলগত সমন্বয়' },
        { en: 'Time Management', bn: 'সময় ব্যবস্থাপনা' },
        { en: 'Problem Solving', bn: 'সমস্যা সমাধান' },
        { en: 'Professional Ethics', bn: 'পেশাদার নীতি' },
      ],
      color: 'bg-green-50',
    },
    communication: {
      title: {
        en: 'Communication Skills',
        bn: 'যোগাযোগ দক্ষতা',
      },
      skills: [
        { en: 'Report Writing', bn: 'রিপোর্ট লেখা' },
        { en: 'Active Listening', bn: 'সক্রিয় শোনা' },
        { en: 'Presentation', bn: 'প্রেজেন্টেশন' },
        { en: 'Professional Email', bn: 'পেশাদার ইমেইল' },
      ],
      color: 'bg-blue-50',
    },
    additional: {
      title: {
        en: 'Additional Skills',
        bn: 'অতিরিক্ত দক্ষতা',
      },
      skills: [
        { en: 'Canva/Photoshop', bn: 'ক্যানভা/ফটোশপ' },
        { en: 'Social Media', bn: 'সোশ্যাল মিডিয়া' },
        { en: 'Web and App Development', bn: 'ওয়েব এবং এ্যাপ ডেভেলপমেন্ট' },
        { en: ' The concept of AI', bn: 'AI এর ধারণা' },
      ],
      color: 'bg-purple-50',
    },
  };

  return (
    <Element name="skills">
      <section
        className="bg-white p-6 rounded-lg shadow-md"
        aria-labelledby="skills-heading"
      >
        <h2
          id="skills-heading"
          className="text-2xl font-bold mb-8 flex items-center gap-2 text-green-700"
        >
          <Award className="text-emerald-500" aria-hidden="true" />
          {language === 'en' ? 'Skills' : 'দক্ষতা'}
        </h2>

        <div className="space-y-8">
          {/* Language Skills */}
          <div>
            <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
              <Languages
                size={20}
                className="text-blue-500"
                aria-hidden="true"
              />
              {skillsData.languages.title[language]}
            </h3>
            <div className="space-y-4">
              {skillsData.languages.skills.map((skill, index) => (
                <div key={index} className="group">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-700 group-hover:text-gray-900">
                      {skill.name[language]}
                    </span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${
                            i <= skill.level
                              ? 'text-yellow-500 fill-current'
                              : 'text-gray-300'
                          }`}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-yellow-500 h-1.5 rounded-full"
                      style={{ width: `${(skill.level / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Other Skills Sections */}
          {[
            skillsData.professional,
            skillsData.communication,
            skillsData.additional,
          ].map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
                {sectionIndex === 0 ? (
                  <Target
                    size={20}
                    className="text-green-500"
                    aria-hidden="true"
                  />
                ) : sectionIndex === 1 ? (
                  <MessageSquare
                    size={20}
                    className="text-blue-500"
                    aria-hidden="true"
                  />
                ) : (
                  <PlusCircle
                    size={20}
                    className="text-purple-500"
                    aria-hidden="true"
                  />
                )}
                {section.title[language]}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {section.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className={`${section.color} p-3 rounded-lg hover:shadow-sm`}
                  >
                    {skill[language]}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Element>
  );
};

export default Skills;
