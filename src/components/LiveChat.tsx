
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface LiveChatProps {
  theme?: 'light' | 'dark';
}

const LiveChat = ({ theme = 'light' }: LiveChatProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<
    { text: string; sender: 'user' | 'bot'; time: string }[]
  >([
    {
      text: 'Hello! How can I help you today?',
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const isDark = theme === 'dark';

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    // Add user message
    setMessages((prev) => [
      ...prev,
      { text: message, sender: 'user', time: currentTime },
    ]);
    setMessage('');

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponses = [
        "Thanks for your message! I'll get back to you soon.",
        "I appreciate your question. Let me find that information for you.",
        "Thanks for reaching out! I'll respond shortly.",
        "Great question! I'll need to check on that.",
        "I'll look into this and get back to you.",
      ];
      const randomResponse =
        botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages((prev) => [
        ...prev,
        {
          text: randomResponse,
          sender: 'bot',
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ]);
    }, 1000);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
        className={cn(
          "p-3 rounded-full shadow-lg text-white flex items-center justify-center",
          isDark 
            ? "bg-gradient-to-r from-purple-800 to-indigo-800 hover:from-purple-700 hover:to-indigo-700" 
            : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500"
        )}
        aria-label="Open live chat"
      >
        {isOpen ? (
          <X className="w-5 h-5" aria-hidden="true" />
        ) : (
          <MessageSquare className="w-5 h-5" aria-hidden="true" />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              transition: { type: 'spring', stiffness: 300, damping: 30 },
            }}
            exit={{ opacity: 0, scale: 0.9, x: 50 }}
            className={cn(
              "absolute right-0 bottom-16 w-80 sm:w-96 rounded-lg overflow-hidden shadow-xl z-50",
              isDark 
                ? "bg-gray-800 border border-gray-700" 
                : "bg-white border border-gray-200"
            )}
          >
            <div className={cn(
              "px-4 py-3 flex justify-between items-center",
              isDark 
                ? "bg-gradient-to-r from-purple-800 to-indigo-800 text-white" 
                : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
            )}>
              <h3 className="font-semibold">Live Chat Support</h3>
              <button
                onClick={toggleChat}
                className={cn(
                  "p-1 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50",
                  isDark ? "hover:bg-purple-700" : "hover:bg-purple-600"
                )}
                aria-label="Close chat"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
            <div className={cn(
              "h-80 overflow-y-auto p-4",
              isDark ? "bg-gray-800" : "bg-gray-50"
            )}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={cn(
                    "mb-3 max-w-[85%] rounded-lg px-4 py-2 animate-fadeIn",
                    msg.sender === 'user'
                      ? "ml-auto bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                      : isDark 
                        ? "bg-gray-700 text-white" 
                        : "bg-white text-gray-800 shadow-sm"
                  )}
                >
                  <p className="text-sm">{msg.text}</p>
                  <span className={cn(
                    "text-[10px] block text-right mt-1",
                    msg.sender === 'user' 
                      ? "text-purple-200" 
                      : isDark ? "text-gray-400" : "text-gray-500"
                  )}>
                    {msg.time}
                  </span>
                </div>
              ))}
            </div>
            <form
              onSubmit={sendMessage}
              className={cn(
                "p-3 flex gap-2",
                isDark ? "bg-gray-900" : "bg-white"
              )}
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className={cn(
                  "flex-1 px-4 py-2 text-sm rounded-full focus:outline-none",
                  isDark 
                    ? "bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 border-gray-600" 
                    : "bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-purple-400"
                )}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!message.trim()}
                className={cn(
                  "p-2 rounded-full text-white flex items-center justify-center",
                  !message.trim() 
                    ? isDark 
                      ? "bg-gray-700 cursor-not-allowed" 
                      : "bg-gray-300 cursor-not-allowed" 
                    : isDark 
                      ? "bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600" 
                      : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500"
                )}
                aria-label="Send message"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiveChat;
