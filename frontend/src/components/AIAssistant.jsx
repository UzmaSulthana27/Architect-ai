import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Sparkles, X, Minimize2, Maximize2 } from 'lucide-react';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Identity verified. I am your neural architect. How shall we build today?' }
  ]);

  const handleSend = async () => {
    if (!query.trim()) return;
    
    const userMsg = { role: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setQuery('');

    // Call backend API (Gemini via server.js)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', text: data.text || data.response || 'No response.' }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Error: Neural link interrupted.' }]);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-neon text-bg-dark flex items-center justify-center shadow-[0_0_30px_rgba(30,230,210,0.4)] z-50 ${isOpen ? 'hidden' : ''}`}
      >
        <Sparkles size={24} />
      </motion.button>

      {/* Assistant Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed bottom-6 right-6 w-96 h-[500px] bg-bg-primary border border-neon/30 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-neon/10 border-b border-neon/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="text-neon" size={18} />
                <span className="text-sm font-bold text-white tracking-widest uppercase">Assistant</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-text-secondary hover:text-neon transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-xs">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-xl p-3 ${
                    msg.role === 'user' 
                      ? 'bg-neon/10 text-neon border border-neon/30' 
                      : 'bg-white/5 text-text-primary border border-white/10'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/5 bg-bg-dark/50">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Query architect..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-text-secondary focus:outline-none focus:border-neon transition-all"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-neon hover:scale-110 transition-transform"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
