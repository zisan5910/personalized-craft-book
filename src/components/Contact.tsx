
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState } from 'react';

interface ContactProps {
  theme: 'light' | 'dark';
  data: any;
}

const Contact = ({ theme, data }: ContactProps) => {
  const isDark = theme === 'dark';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
    alert('Message sent! Thank you for reaching out.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

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
          {data.contact}
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "p-3 rounded-lg",
                  isDark ? "bg-purple-600" : "bg-purple-500"
                )}>
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className={cn(
                    "font-semibold",
                    isDark ? "text-white" : "text-gray-800"
                  )}>
                    Email
                  </h3>
                  <p className={cn(
                    "text-sm",
                    isDark ? "text-gray-300" : "text-gray-600"
                  )}>
                    john.doe@example.com
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className={cn(
                  "p-3 rounded-lg",
                  isDark ? "bg-purple-600" : "bg-purple-500"
                )}>
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className={cn(
                    "font-semibold",
                    isDark ? "text-white" : "text-gray-800"
                  )}>
                    Phone
                  </h3>
                  <p className={cn(
                    "text-sm",
                    isDark ? "text-gray-300" : "text-gray-600"
                  )}>
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className={cn(
                  "p-3 rounded-lg",
                  isDark ? "bg-purple-600" : "bg-purple-500"
                )}>
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className={cn(
                    "font-semibold",
                    isDark ? "text-white" : "text-gray-800"
                  )}>
                    Location
                  </h3>
                  <p className={cn(
                    "text-sm",
                    isDark ? "text-gray-300" : "text-gray-600"
                  )}>
                    New York, NY
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={cn(
                    "w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500",
                    isDark 
                      ? "bg-gray-800 border border-gray-700 text-white placeholder-gray-400" 
                      : "bg-white border border-gray-300 text-gray-800"
                  )}
                />
              </div>
              
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={cn(
                    "w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500",
                    isDark 
                      ? "bg-gray-800 border border-gray-700 text-white placeholder-gray-400" 
                      : "bg-white border border-gray-300 text-gray-800"
                  )}
                />
              </div>
              
              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={cn(
                    "w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none",
                    isDark 
                      ? "bg-gray-800 border border-gray-700 text-white placeholder-gray-400" 
                      : "bg-white border border-gray-300 text-gray-800"
                  )}
                />
              </div>
              
              <button
                type="submit"
                className={cn(
                  "w-full px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2",
                  isDark 
                    ? "bg-purple-600 hover:bg-purple-500 text-white" 
                    : "bg-purple-500 hover:bg-purple-600 text-white"
                )}
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
