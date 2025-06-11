
import { useState } from 'react';
import {
  Menu,
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Download,
  ExternalLink,
} from 'lucide-react';

const FloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Menu Button */}
      <button
        onClick={toggleMenu}
        className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-colors duration-200"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Menu Items */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[200px]">
          <a
            href="#profile"
            className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <User size={18} className="text-indigo-600" />
            Profile
          </a>
          
          <a
            href="#contact"
            className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Mail size={18} className="text-cyan-600" />
            Contact
          </a>
          
          <a
            href="tel:+8801758441074"
            className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Phone size={18} className="text-green-600" />
            Call
          </a>
          
          <a
            href="https://maps.google.com/?q=Bogura,Bangladesh"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <MapPin size={18} className="text-red-600" />
            Location
          </a>
          
          <hr className="my-2" />
          
          <a
            href="/Resume.pdf"
            download="Md Ridoan Mahmud Zisan.pdf"
            className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Download size={18} className="text-purple-600" />
            Download CV
          </a>
          
          <a
            href="https://devhub-i.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ExternalLink size={18} className="text-blue-600" />
            Portfolio
          </a>
        </div>
      )}
    </div>
  );
};

export default FloatingMenu;
