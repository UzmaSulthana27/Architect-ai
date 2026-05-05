import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Key, Server, Database } from 'lucide-react';

export default function Vault() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <header className="space-y-2">
        <div className="flex items-center gap-3 text-neon">
          <Shield size={24} />
          <h1 className="text-3xl font-bold tracking-tight uppercase">Secure Vault</h1>
        </div>
        <p className="text-text-secondary">Protected storage for encrypted neural weights and secure credentials.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'API Credentials', icon: Key, count: 5 },
          { title: 'Neural Weights', icon: Database, count: 12 },
          { title: 'Infrastructure', icon: Server, count: 3 }
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl glass-card border border-white/5 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Lock size={80} />
            </div>
            <item.icon className="text-neon mb-4" size={24} />
            <h3 className="text-xl font-bold text-white uppercase tracking-wider">{item.title}</h3>
            <p className="text-3xl font-mono text-neon mt-2">{item.count}</p>
            <p className="text-xs text-text-secondary mt-1 uppercase tracking-widest">Active Entities</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
