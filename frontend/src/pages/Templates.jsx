import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Grid, Box, Layers, Globe, Smartphone, Monitor } from 'lucide-react';

export default function Templates() {
  const templates = [
    { title: 'Neural SaaS', category: 'Platform', icon: Layout },
    { title: 'Cyber Analytics', category: 'Dashboard', icon: Grid },
    { title: 'Infra Manager', category: 'Enterprise', icon: Box },
    { title: 'Bento Portfolio', category: 'Creative', icon: Layers },
    { title: 'Global Edge', category: 'Network', icon: Globe },
    { title: 'Mobile Nexus', category: 'Mobile', icon: Smartphone }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-white tracking-tight uppercase">Base Blueprints</h1>
        <p className="text-text-secondary">Highly-optimized starting points for neural manifestations.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((tpl, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-2xl glass-card border border-white/5 bg-bg-primary group hover:border-neon/30 transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-neon/10 flex items-center justify-center text-neon mb-4 group-hover:bg-neon group-hover:text-bg-dark transition-colors">
              <tpl.icon size={24} />
            </div>
            <span className="text-[10px] font-mono text-neon/70 uppercase tracking-widest">{tpl.category}</span>
            <h3 className="text-xl font-bold text-white mt-1 uppercase leading-tight">{tpl.title}</h3>
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
               <span className="text-xs text-text-secondary">v1.2.0</span>
               <button className="text-xs font-bold text-neon hover:underline">CLONE BINARY</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
