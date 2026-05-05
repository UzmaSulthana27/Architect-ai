import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, FileText, Code, GitMerge, Terminal, Cpu } from 'lucide-react';

export default function Learn() {
  const sections = [
    { title: 'Neural Core Concepts', icon: Cpu, content: 'Understand the fundamental architecture of the Architect AI inference engine.' },
    { title: 'Workspace Orchestration', icon: GitMerge, content: 'Master the art of managing distributed files and real-time synthesis.' },
    { title: 'Synthesis Language', icon: Code, content: 'A deep dive into our custom JSX extensions for neural responsiveness.' }
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-12">
      <header className="space-y-4 text-center">
        <h1 className="text-4xl font-bold text-white tracking-widest uppercase">The Neural Dossier</h1>
        <p className="text-text-secondary text-lg">Master the architecture. Shape the future.</p>
      </header>

      <div className="space-y-6">
        {sections.map((section, i) => (
          <motion.div
            key={i}
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-2xl glass-card border border-white/5 flex gap-6 items-start"
          >
            <div className="p-3 rounded-xl bg-neon/10 text-neon flex-shrink-0">
              <section.icon size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">{section.title}</h3>
              <p className="text-text-secondary leading-relaxed">{section.content}</p>
              <button className="mt-4 text-sm font-bold text-neon hover:underline flex items-center gap-1">
                Read Chapter <BookOpen size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
