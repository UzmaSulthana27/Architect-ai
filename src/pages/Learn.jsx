import { motion } from "motion/react";
import { 
  Play, BookOpen, ScrollText, Users, 
  ChevronRight, Clock, Star, Zap, 
  ExternalLink, ArrowUpRight, GraduationCap, 
  Monitor, FileText, Code2, HelpCircle
} from "lucide-react";

const TUTORIALS = [
  { title: "Getting Started", duration: "5 min", level: "Beginner", icon: Play, category: "Basics" },
  { title: "Advanced Prompting", duration: "8 min", level: "Intermediate", icon: Zap, category: "Engineering" },
  { title: "Deployment Guide", duration: "10 min", level: "Advanced", icon: ExternalLink, category: "Production" },
  { title: "Collaboration", duration: "6 min", level: "Beginner", icon: Users, category: "Teamflow" },
  { title: "State Management", duration: "12 min", level: "Intermediate", icon: Code2, category: "Logic" },
  { title: "Database Architecture", duration: "15 min", level: "Advanced", icon: FileText, category: "Schema" },
];

const ARTICLES = [
  { 
    title: "How we built a SaaS in 2 hours with Architect AI", 
    author: "Elena Vance", 
    date: "Dec 12, 2024",
    excerpt: "A deep dive into rapid prototyping and live-sync deployment cycles."
  },
  { 
    title: "Best practices for AI-generated code", 
    author: "Marcus Thorne", 
    date: "Dec 10, 2024",
    excerpt: "Ensuring clean architectural patterns when working with neural assistants."
  },
  { 
    title: "From prompt to production: A complete guide", 
    author: "Architect HQ", 
    date: "Dec 05, 2024",
    excerpt: "Everything you need to know about the terminal-to-cloud lifecycle."
  }
];

export default function Learn() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-6 py-20 space-y-32"
    >
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon/10 border border-neon/20 text-neon text-[10px] font-black uppercase tracking-widest mb-4"
        >
          <GraduationCap className="w-3.5 h-3.5" />
          Neural Academy
        </motion.div>
        <h1 className="text-6xl font-black tracking-tighter uppercase leading-[0.9]" style={{ color: 'var(--text-primary)' }}>
          Master the <span className="text-neon">Atelier.</span>
        </h1>
        <p className="text-xl opacity-40 max-w-2xl mx-auto font-medium" style={{ color: 'var(--text-primary)' }}>
          Accelerate your architectural intuition with expert-led training and neural documentation.
        </p>
      </div>

      {/* Video Academy */}
      <section className="space-y-12">
        <div className="flex items-end justify-between border-b border-white/5 pb-8">
          <div>
            <h2 className="text-2xl font-black tracking-tighter uppercase" style={{ color: 'var(--text-primary)' }}>Video Academy</h2>
            <p className="text-xs font-black uppercase tracking-widest opacity-30 mt-2">Level 1 - 4 Curriculum</p>
          </div>
          <button className="text-[10px] font-black uppercase tracking-widest text-neon hover:opacity-70 transition-all flex items-center gap-2">
            View All Tutorials <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TUTORIALS.map((video, i) => (
            <motion.div
              key={video.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card group cursor-pointer border-white/5 overflow-hidden"
            >
              <div className="aspect-video relative bg-black/40 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-neon/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <video.icon className="w-12 h-12 text-white/5 group-hover:text-neon group-hover:scale-110 transition-all" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="px-2 py-1 rounded bg-black/60 text-[9px] font-black text-white/60 tracking-widest uppercase backdrop-blur-md border border-white/5">
                    {video.duration}
                  </span>
                  <span className="px-2 py-1 rounded bg-neon/80 text-[9px] font-black text-midnight tracking-widest uppercase">
                    {video.category}
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest opacity-30">
                  <Star className="w-3 h-3 text-neon" /> {video.level} Level
                </div>
                <h3 className="text-lg font-bold group-hover:text-neon transition-colors" style={{ color: 'var(--text-primary)' }}>{video.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Case Studies & Blog */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-12">
          <div className="border-b border-white/5 pb-8">
            <h2 className="text-2xl font-black tracking-tighter uppercase" style={{ color: 'var(--text-primary)' }}>Neural Intel</h2>
            <p className="text-xs font-black uppercase tracking-widest opacity-30 mt-2">Case Studies & Insights</p>
          </div>
          <div className="space-y-6">
            {ARTICLES.map((article, i) => (
              <motion.div
                key={article.title}
                whileHover={{ x: 10 }}
                className="p-8 glass-card border-white/5 group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-30">{article.date}</span>
                  <ArrowUpRight className="w-4 h-4 text-neon opacity-0 group-hover:opacity-100 transition-all" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-neon transition-all" style={{ color: 'var(--text-primary)' }}>{article.title}</h3>
                <p className="text-sm opacity-40 leading-relaxed" style={{ color: 'var(--text-primary)' }}>{article.excerpt}</p>
                <div className="mt-6 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/10" />
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{article.author}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Documentation & Community */}
        <div className="space-y-16">
          {/* Documentation */}
          <div className="space-y-8">
            <div className="border-b border-white/5 pb-8">
              <h2 className="text-2xl font-black tracking-tighter uppercase" style={{ color: 'var(--text-primary)' }}>Documentation</h2>
              <p className="text-xs font-black uppercase tracking-widest opacity-30 mt-2">The Architectural Codex</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Prompt Guide', icon: ScrollText },
                { label: 'API Reference', icon: Code2 },
                { label: 'Troubleshooting', icon: HelpCircle },
                { label: 'Platform FAQ', icon: BookOpen },
              ].map((doc) => (
                <button key={doc.label} className="flex items-center gap-4 p-5 rounded-2xl bg-black/20 border border-white/5 hover:border-neon/30 hover:bg-neon/5 transition-all group text-left">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:text-neon transition-colors">
                    <doc.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest opacity-60 group-hover:opacity-100">{doc.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Showcases */}
          <div className="space-y-8">
            <div className="border-b border-white/5 pb-8">
              <h2 className="text-2xl font-black tracking-tighter uppercase" style={{ color: 'var(--text-primary)' }}>Showcase</h2>
              <p className="text-xs font-black uppercase tracking-widest opacity-30 mt-2">App of the Week: "Vortex CRM"</p>
            </div>
            <div className="relative aspect-[16/10] glass-card border-white/10 bg-black/40 overflow-hidden flex items-center justify-center group">
               <div className="absolute inset-0 bg-neon/5 opacity-0 group-hover:opacity-100 transition-opacity" />
               <Monitor className="w-16 h-16 opacity-10 group-hover:scale-110 transition-all text-neon" />
               <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                  <Rocket className="w-8 h-8 text-neon animate-bounce mb-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary italic">Enter Project Environment</span>
               </div>
               <div className="absolute bottom-6 left-6 flex items-center gap-6">
                  <div className="text-left">
                    <p className="text-xs font-black text-primary uppercase mb-1">Collaborative Canvas</p>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-30">Built by @sarah_dev</p>
                  </div>
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-midnight bg-white/10" />)}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="glass-card p-16 text-center border-neon/20 bg-neon/5 overflow-hidden relative">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-neon/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />
        
        <h2 className="text-4xl font-black tracking-tighter uppercase mb-6" style={{ color: 'var(--text-primary)' }}>Ready to initialize?</h2>
        <p className="text-sm opacity-60 uppercase font-black tracking-[0.2em] mb-10 max-w-lg mx-auto" style={{ color: 'var(--text-primary)' }}>
          The quickest way to learn is to build. Start your next session in the Atelier.
        </p>
        <button className="px-12 py-5 bg-neon text-midnight font-black uppercase tracking-widest rounded-3xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-neon/20">
          Enter Code Environment
        </button>
      </section>
    </motion.div>
  );
}

function Rocket(props) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.71.71-2.5.71-2.5h-2.21l-1.5 1.5Z" />
      <path d="M15 7s-1-2-3-2c-4.82 0-8.86 4.38-9.03 9.14l4.08 4.09C11.83 18.06 16.14 14 16.14 9.16c.01-1.99-1.14-2.16-1.14-2.16Z" />
      <path d="m11 11-.73-.73" />
      <path d="m6 10 4 4" />
      <path d="M9 17l1 1" />
      <path d="m14 8 4 4" />
      <path d="M14 3h7v7" />
      <path d="m17 7 4-4" />
    </svg>
  );
}
