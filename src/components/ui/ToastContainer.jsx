import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, AlertCircle, Info, Zap } from 'lucide-react';
import useStore from '../../store/useStore';

export default function ToastContainer() {
  const { toasts, removeToast } = useStore();

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-[#c7fff0]" />,
    error: <AlertCircle className="w-4 h-4 text-red-500" />,
    info: <Info className="w-4 h-4 text-[#c0c1ff]" />,
    warning: <Zap className="w-4 h-4 text-amber-500" />
  };

  const bgColors = {
    success: 'bg-[#c7fff0]/10 border-[#c7fff0]/20',
    error: 'bg-red-500/10 border-red-500/20',
    info: 'bg-[#c0c1ff]/10 border-[#c0c1ff]/20',
    warning: 'bg-amber-500/10 border-amber-500/20'
  };

  return (
    <div className="fixed top-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className={`
              pointer-events-auto flex items-center gap-4 px-6 py-4 glass-panel backdrop-blur-xl border rounded-2xl min-w-[300px] shadow-2xl
              ${bgColors[toast.type] || bgColors.info}
            `}
          >
            <div className="shrink-0">{icons[toast.type] || icons.info}</div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#dae2fd] flex-1">
              {toast.message}
            </p>
            <button 
              onClick={() => removeToast(toast.id)}
              className="p-1 hover:bg-white/5 rounded-lg text-[#dae2fd]/30 hover:text-white transition-all"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
