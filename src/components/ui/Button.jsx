import React from 'react';
import { motion } from 'motion/react';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  icon: Icon,
  loading = false,
  ...props 
}) {
  const variants = {
    primary: 'bg-neon text-bg-primary hover:shadow-[0_0_20px_rgba(192,193,255,0.3)]',
    secondary: 'bg-white/5 border border-white/10 text-text-primary hover:border-neon/30 hover:bg-neon/5',
    outline: 'border border-neon text-neon bg-transparent hover:bg-neon/10',
    ghost: 'text-text-primary/60 hover:text-text-primary hover:bg-white/5',
    accent: 'bg-accent text-bg-primary hover:shadow-[0_0_20px_rgba(199,255,240,0.3)]'
  };

  const sizes = {
    sm: 'px-4 py-2 text-[8px]',
    md: 'px-6 py-3 text-[10px]',
    lg: 'px-8 py-4 text-xs',
    icon: 'p-3'
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ y: -2 }}
      className={`
        inline-flex items-center justify-center gap-3 rounded-xl font-black uppercase tracking-widest transition-all
        ${variants[variant]}
        ${sizes[size]}
        ${loading ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : Icon ? (
        <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
      ) : null}
      {children}
    </motion.button>
  );
}
