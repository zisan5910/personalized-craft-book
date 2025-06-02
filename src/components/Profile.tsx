
import { motion } from 'framer-motion';
import { Download, Share2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface ProfileProps {
  theme: 'light' | 'dark';
  language: 'en' | 'bn';
  data: any;
  onDownloadCV: () => void;
  onShare: () => void;
}

const Profile = ({ theme, language, data, onDownloadCV, onShare }: ProfileProps) => {
  const isDark = theme === 'dark';

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="relative">
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              src="/placeholder.svg"
              alt={data.name}
              className="w-48 h-48 rounded-full mx-auto border-4 border-purple-500 shadow-2xl"
            />
          </div>
          
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className={cn(
                "text-5xl md:text-6xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
                isDark 
                  ? "from-purple-400 to-pink-400" 
                  : "from-purple-600 to-pink-600"
              )}
            >
              {data.name}
            </motion.h1>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className={cn(
                "text-2xl md:text-3xl font-semibold",
                isDark ? "text-gray-300" : "text-gray-700"
              )}
            >
              {data.role}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className={cn(
                "text-lg md:text-xl max-w-2xl mx-auto leading-relaxed",
                isDark ? "text-gray-400" : "text-gray-600"
              )}
            >
              {data.statement}
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex gap-4 justify-center"
          >
            <button
              onClick={onDownloadCV}
              className={cn(
                "px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2",
                isDark 
                  ? "bg-purple-600 hover:bg-purple-500 text-white" 
                  : "bg-purple-500 hover:bg-purple-600 text-white"
              )}
            >
              <Download className="w-5 h-5" />
              {data.downloadCV}
            </button>
            
            <button
              onClick={onShare}
              className={cn(
                "px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 border-2",
                isDark 
                  ? "border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-gray-900" 
                  : "border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
              )}
            >
              <Share2 className="w-5 h-5" />
              {data.share}
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Profile;
