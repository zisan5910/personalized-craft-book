
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import CertificateSlider from './CertificateSlider';

interface CertificatesProps {
  theme: 'light' | 'dark';
  data: any;
}

const Certificates = ({ theme, data }: CertificatesProps) => {
  const isDark = theme === 'dark';

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
          {data.certificates}
        </motion.h2>
        
        <CertificateSlider theme={theme} />
      </div>
    </section>
  );
};

export default Certificates;
