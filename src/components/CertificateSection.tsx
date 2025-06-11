
import { Element } from 'react-scroll';
import { FileText } from './icons';
import CertificateSlider from './CertificateSlider';

interface CertificateSectionProps {
  language: 'en' | 'bn';
  content: any;
  certificates: any[];
}

const CertificateSection = ({ language, content, certificates }: CertificateSectionProps) => {
  return (
    <Element name="certificates">
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-green-700">
          <FileText />
          {content[language].certifications}
        </h2>
        <CertificateSlider
          certificates={certificates}
          language={language}
        />
      </section>
    </Element>
  );
};

export default CertificateSection;
