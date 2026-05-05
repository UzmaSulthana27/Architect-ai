import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, Cpu, Shield, Globe, Terminal, Code } from 'lucide-react';

const Hero = () => (
  <section className="relative pt-20 pb-32 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon/10 border border-neon/20 text-neon text-xs font-mono mb-4">
          <Zap size={14} />
          <span>v2.0 NEURAL CORE DEPLOYED</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
          Architecting the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neon to-purple-500">
            Next Intelligence
          </span>
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          The ultimate workspace for AI engineers. Real-time neural visualization, 
          automated code synthesis, and the power of distributed inference.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
          <Link to="/atelier">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-neon text-bg-dark font-bold rounded-xl shadow-[0_0_30px_rgba(30,230,210,0.3)]"
            >
              Enter Atelier
            </motion.button>
          </Link>
          <Link to="/learn">
            <button className="px-8 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">
              Read Dossier
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
    
    {/* Abstract Background Elements */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-neon/5 blur-[120px] rounded-full -z-10" />
  </section>
);

const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay }}
    className="p-6 rounded-2xl glass-card border border-white/5 group hover:border-neon/30 transition-all duration-500"
  >
    <div className="w-12 h-12 rounded-xl bg-neon/10 flex items-center justify-center text-neon mb-6 group-hover:scale-110 transition-transform">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-text-secondary text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <div className="max-w-7xl mx-auto px-4 py-20 bg-grid">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            icon={Cpu} 
            title="Sovereign Inference" 
            desc="Run local models with direct hardware access or scale to cloud clusters seamlessly."
            delay={0.1}
          />
           <FeatureCard 
            icon={Terminal} 
            title="Neural Shell" 
            desc="Control your entire AI pipeline through our advanced command-line terminal."
            delay={0.2}
          />
           <FeatureCard 
            icon={Shield} 
            title="Hardened Security" 
            desc="Encrypted vault storage for your most sensitive neural weights and datasets."
            delay={0.3}
          />
        </div>
      </div>
    </div>
  );
}
