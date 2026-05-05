import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  // Mock global toast system
  window.showToast = (msg, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  };

  return (
    <div className="fixed top-20 right-6 z-[100] space-y-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            className="pointer-events-auto w-80 p-4 rounded-xl glass-card border border-white/10 flex items-start gap-3 shadow-2xl backdrop-blur-2xl"
          >
            {toast.type === 'success' ? <CheckCircle2 className="text-green-500" /> : 
             toast.type === 'error' ? <AlertCircle className="text-red-500" /> : 
             <Info className="text-neon" />}
            
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{toast.msg}</p>
              <span className="text-[10px] text-text-secondary font-mono uppercase tracking-widest leading-none mt-1">System Message</span>
            </div>

            <button 
              onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
              className="text-text-secondary hover:text-white transition-colors"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
