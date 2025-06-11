
import { Element } from 'react-scroll';
import { Mail, Phone, MapPin, Linkedin, ExternalLink, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface ContactProps {
  language: 'en' | 'bn';
}

const Contact = ({ language }: ContactProps) => {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactData = {
    title: {
      en: 'Contact',
      bn: 'যোগাযোগ',
    },
    form: {
      name: {
        en: 'Your Name',
        bn: 'আপনার নাম',
      },
      subject: {
        en: 'Subject',
        bn: 'বিষয়',
      },
      message: {
        en: 'Compose email',
        bn: 'ইমেল লিখুন',
      },
      submit: {
        en: 'Send Message',
        bn: 'বার্তা পাঠান',
      },
      success: {
        en: 'Message sent successfully!',
        bn: 'বার্তা সফলভাবে পাঠানো হয়েছে!',
      },
    },
    items: [
      {
        icon: <Mail size={20} className="text-green-700" />,
        content: {
          en: 'ridoan.zisan@gmail.com',
          bn: 'ridoan.zisan@gmail.com',
        },
        link: 'mailto:ridoan.zisan@gmail.com',
        isExternal: false,
      },
      {
        icon: <Phone size={20} className="text-green-700" />,
        content: {
          en: '+8801712525910',
          bn: '+৮৮০১৭১২৫২৫৯১০',
        },
        link: 'tel:+8801712525910',
        isExternal: false,
      },
      {
        icon: <MapPin size={20} className="text-green-700" />,
        content: {
          en: 'Bogura, Bangladesh',
          bn: 'বগুড়া, বাংলাদেশ',
        },
        link: 'https://maps.app.goo.gl/EV2Yob73hVp2KKpQ8',
        isExternal: true,
      },
      {
        icon: <Linkedin size={20} className="text-green-700" />,
        content: {
          en: 'LinkedIn Profile',
          bn: 'লিঙ্কডইন প্রোফাইল',
        },
        link: 'https://linkedin.com/in/ridoan2007',
        isExternal: true,
      },
    ],
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, subject, message } = formData;
    
    const emailBody = `Dear,\n\n${message}\n\nBest regards,\n${name}\n`;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      const mailtoLink = `mailto:ridoan.zisan@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailtoLink;
    } else {
      const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=ridoan.zisan@gmail.com&su=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(emailBody)}`;
      window.open(gmailLink, '_blank');
    }

    setIsSubmitted(true);
    setFormData({ name: '', subject: '', message: '' });

    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Element name="contact">
      <section
        className="bg-white p-4 sm:p-6 rounded-lg shadow-md mx-2 sm:mx-0"
        aria-labelledby="contact-heading"
      >
        <h2
          id="contact-heading"
          className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 flex items-center gap-2 text-green-700"
        >
          <Mail className="text-emerald-500" />
          {contactData.title[language]}
        </h2>

        {isSubmitted && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg flex items-center gap-2">
            <CheckCircle className="text-green-600" />
            {contactData.form.success[language]}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Contact Information */}
          <div className="space-y-4">
            <div className="p-4 sm:p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              {contactData.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 last:mb-0"
                >
                  <span>{item.icon}</span>
                  {item.isExternal ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-green-700 flex items-center gap-1 text-sm sm:text-base"
                    >
                      {item.content[language]}
                      {item.isExternal && (
                        <ExternalLink size={16} className="text-blue-600" />
                      )}
                    </a>
                  ) : (
                    <a
                      href={item.link}
                      className="hover:text-green-700 text-sm sm:text-base"
                    >
                      {item.content[language]}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                >
                  {contactData.form.name[language]}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                >
                  {contactData.form.subject[language]}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                >
                  {contactData.form.message[language]}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder={language === 'en' ? 'Message...' : 'মেসেজ...'}
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Send size={18} />
                {contactData.form.submit[language]}
              </button>
            </form>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default Contact;
