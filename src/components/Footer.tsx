
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { cn } from '../lib/utils';

interface FooterProps {
  theme: 'light' | 'dark';
  data: any;
}

const Footer = ({ theme, data }: FooterProps) => {
  const isDark = theme === 'dark';

  return (
    <footer className={cn(
      "py-8 px-4 border-t",
      isDark 
        ? "bg-gray-900/50 border-gray-700" 
        : "bg-white/50 border-gray-200"
    )}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className={cn(
            "flex items-center justify-center gap-2 text-sm",
            isDark ? "text-gray-400" : "text-gray-600"
          )}>
            Made with <Heart className="w-4 h-4 text-red-500" /> by {data.name}
          </p>
          <p className={cn(
            "text-xs mt-2",
            isDark ? "text-gray-500" : "text-gray-500"
          )}>
            © 2023 {data.name}. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
