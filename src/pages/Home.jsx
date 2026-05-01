import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Zap, 
  Cpu, 
  Shield, 
  Rocket, 
  Github, 
  ArrowRight,
  Database,
  Globe,
  Sparkles,
  Layout,
  Terminal,
  Layers,
  Lock,
  Users,
  History,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import Button from '../components/ui/Button';
import Footer from '../components/layout/Footer';

/**
 * Animated Neural Grid Background
 */
const NeuralGrid = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <svg className="w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.05" className="text-neon" />
        </pattern>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c0c1ff" stopOpacity="0.2" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      
      {/* Animated Neurons */}
      {[...Array(15)].map((_, i) => (
        <motion.circle
          key={i}
          r="0.15"
          fill="#c0c1ff"
          initial={{ 
            cx: Math.random() * 100, 
            cy: Math.random() * 100,
            opacity: 0.1 
          }}
          animate={{ 
            cx: Math.random() * 100, 
            cy: Math.random() * 100,
            opacity: [0.1, 0.4, 0.1]
          }}
          transition={{ 
            duration: 15 + Math.random() * 20, 
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </svg>
    <div className="absolute inset-0 bg-gradient-to-b from-[#0b1326] via-transparent to-[#0b1326]" />
  </div>
);

export default function Home() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [demoStep, setDemoStep] = useState(0);

  // Demo sequence timer
  useEffect(() => {
    const timer = setInterval(() => {
      setDemoStep(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex-1 flex flex-col relative overflow-x-hidden min-h-screen">
      <NeuralGrid />

      {/* HERO SECTION */}
      <section className="relative px-6 pt-24 sm:pt-32 pb-20 sm:pb-40 flex flex-col items-center text-center z-10 min-h-screen justify-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#c0c1ff]/20 bg-[#c0c1ff]/10 backdrop-blur-xl text-[#c0c1ff] text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] mb-8 sm:mb-12"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#c7fff0] animate-pulse" />
          Neural Engine v4.0 Active
        </motion.div>

        <motion.h1
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[12vw] sm:text-[10vw] font-black tracking-tighter leading-[1] sm:leading-[0.8] mb-8 sm:mb-10 italic uppercase flex flex-col items-center"
        >
          <span className="flex flex-col sm:flex-row items-center justify-center gap-x-6">
            Build the <span className="text-[#c0c1ff] bg-clip-text text-transparent bg-gradient-to-r from-[#c0c1ff] to-[#c7fff0] drop-shadow-[0_0_15px_rgba(192,193,255,0.4)]">Void</span>.
          </span>
          <span className="opacity-10 mt-2 sm:-mt-2">Architect the Future.</span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-xl text-base sm:text-xl font-medium text-[#dae2fd]/60 mb-10 sm:mb-16 tracking-tight leading-relaxed px-4 mx-auto"
        >
          The first AI-driven architectural suite for developers.
          Generate blueprints, components, and schemas in seconds.
        </motion.p>

        {/* Neural Prompt Input */}
        <motion.div
           initial={{ y: 30, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.5 }}
           className="w-full max-w-3xl relative px-2"
        >
          <div className="absolute -inset-1 bg-[#c0c1ff]/10 blur-xl rounded-[2.5rem] group-focus-within:opacity-100 transition-opacity pointer-events-none" />
          <div className="relative glass-panel rounded-2xl sm:rounded-[2.5rem] p-1.5 sm:p-2.5 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 bg-[#171f33]/40 border-white/10 group focus-within:border-[#c0c1ff]/50 focus-within:ring-1 focus-within:ring-[#c0c1ff]/20 shadow-2xl transition-all">
            <div className="hidden sm:flex flex-none pl-8 text-[#c0c1ff]">
              <Sparkles className="w-5 h-5" />
            </div>
            <input 
              type="text" 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && navigate(`/atelier?q=${encodeURIComponent(prompt)}`)}
              placeholder="Describe your architectural intent..."
              className="w-full flex-1 bg-transparent py-4 sm:py-6 px-6 sm:px-0 text-sm md:text-lg font-bold tracking-widest uppercase placeholder:opacity-20 focus:outline-none text-[#dae2fd] text-center sm:text-left"
            />
            <Button 
              onClick={() => navigate(`/atelier?q=${encodeURIComponent(prompt)}`)}
              className="w-full sm:w-auto px-12 py-5 sm:py-6 rounded-xl sm:rounded-[2rem] text-sm font-black"
              icon={ArrowRight}
            >
              Synthesize
            </Button>
          </div>

          
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            {[
              { icon: Zap, text: "Instant Prototyping" },
              { icon: Shield, text: "Full-Stack Integrity" },
              { icon: Rocket, text: "Production Ready" }
            ].map((pill, i) => (
              <motion.button
                key={pill.text}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.5, scale: 1 }}
                whileHover={{ 
                  opacity: 1, 
                  scale: 1.05,
                  backgroundColor: "rgba(192, 193, 255, 0.1)",
                  borderColor: "rgba(192, 193, 255, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 glass-panel rounded-full text-[9px] font-black uppercase tracking-widest cursor-pointer border-white/5 transition-colors outline-none focus:ring-1 focus:ring-[#c0c1ff]/30"
              >
                <pill.icon className="w-3 h-3 text-[#c0c1ff]" />
                {pill.text}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CAPABILITIES SECTION */}
      <section className="px-6 py-40 max-w-7xl mx-auto w-full relative z-10 border-t border-white/5">
        <div className="text-center mb-24 space-y-4">
          <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase italic leading-[0.9]">
            Three Layers. <span className="text-[#c0c1ff]">One Neural Synthesis.</span>
          </h2>
          <p className="text-lg text-[#dae2fd]/40 font-medium tracking-tight uppercase tracking-widest">Architect complete systems from a single intent</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Layout,
              title: "Component Intelligence",
              desc: "Generate pixel-perfect React components with Tailwind CSS, responsive design, and accessibility built-in.",
              code: "export default function UserCard() {\n  return <div className=\"glass-panel\">...</div>\n}",
              color: "text-[#c0c1ff]"
            },
            {
              icon: Terminal,
              title: "Backend Logic",
              desc: "Complete Express.js routes, middleware, authentication, and business logic synthesized in seconds.",
              code: "app.get('/api/users', (req, res) => {\n  const users = db.get('users');\n});",
              color: "text-[#c7fff0]"
            },
            {
              icon: Database,
              title: "Schema Architecture",
              desc: "Optimized SQL schemas, migrations, and relational mappings that scale with your intent.",
              code: "CREATE TABLE users (\n  id SERIAL PRIMARY KEY,\n  email VARCHAR(255)\n);",
              color: "text-[#c7c4d7]"
            }
          ].map((layer, i) => (
            <motion.div
              key={layer.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel group overflow-hidden border-white/5 hover:border-[#c0c1ff]/30 transition-all flex flex-col min-h-[400px]"
            >
              <div className="p-10 border-b border-white/5 space-y-6 flex-1">
                <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center ${layer.color} mb-8 border border-white/10 group-hover:scale-110 transition-transform`}>
                  <layer.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter italic text-[#dae2fd]">{layer.title}</h3>
                <p className="text-[#dae2fd]/40 text-sm leading-relaxed">{layer.desc}</p>
              </div>
              <div className="p-6 bg-black/40 font-mono text-[9px] opacity-40 group-hover:opacity-100 transition-opacity overflow-hidden">
                <code className={layer.color}>{layer.code}</code>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS (Demo) */}
      <section className="px-6 py-40 glass-panel border-x-0 bg-white/[0.01] relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <h2 className="text-4xl sm:text-7xl font-black tracking-tighter uppercase italic mb-16 leading-tight text-[#dae2fd]">
            Watch the <span className="text-[#c0c1ff] animate-pulse">Neural Engine</span> at Work
          </h2>
          
          <div className="w-full max-w-5xl aspect-video rounded-[3rem] border border-[#c0c1ff]/20 bg-[#171f33]/40 backdrop-blur-3xl overflow-hidden relative shadow-[0_0_100px_rgba(192,193,255,0.05)]">
            <div className="absolute inset-0 p-8 md:p-12 flex flex-col">
              <div className="flex items-center justify-between mb-12">
                <div className="flex gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#dae2fd]/10 border border-white/10" />
                  <div className="w-3.5 h-3.5 rounded-full bg-[#dae2fd]/10 border border-white/10" />
                  <div className="w-3.5 h-3.5 rounded-full bg-[#dae2fd]/10 border border-white/10" />
                </div>
                <div className="px-5 py-2 rounded-xl bg-[#c0c1ff]/10 border border-[#c0c1ff]/20 text-[10px] font-black uppercase tracking-[0.3em] text-[#c0c1ff]">
                  Synthesis Pulse [Active]
                </div>
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                <div className="space-y-12 text-left">
                  <div className="space-y-4">
                    <span className="text-[12px] font-black uppercase tracking-widest opacity-30 text-[#c0c1ff]">Input Signal</span>
                    <p className="text-3xl md:text-4xl font-black text-[#dae2fd] italic drop-shadow-sm">"Build a task management dashboard with real-time logs."</p>
                  </div>
                  
                  <div className="space-y-6">
                    {[
                      { l: 'Intent Decomposition', s: demoStep >= 1, c: '#c7fff0' },
                      { l: 'Full-Stack Manifest Synthesis', s: demoStep >= 2, c: '#c0c1ff' },
                      { l: 'Relational Integrity Check', s: demoStep >= 3, c: '#c7c4d7' }
                    ].map(step => (
                      <div key={step.l} className={`flex items-center gap-6 transition-all duration-700 ${step.s ? 'opacity-100 translate-x-0' : 'opacity-10 -translate-x-8'}`}>
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors ${step.s ? 'bg-white/10' : 'bg-transparent'}`} style={{ color: step.c, borderColor: step.s ? step.c : 'currentColor' }}>
                          {step.s ? <CheckCircle2 className="w-4 h-4" /> : <RefreshCw className="w-4 h-4 animate-spin" />}
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest" style={{ color: step.s ? '#dae2fd' : '#dae2fd40' }}>{step.l}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative h-full bg-black/30 rounded-[2.5rem] border border-white/5 overflow-hidden font-mono text-[12px] p-10 text-[#dae2fd]/80">
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c0c1ff] to-transparent opacity-50" />
                   <AnimatePresence mode="wait">
                     <motion.pre
                        key={demoStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="whitespace-pre-wrap leading-relaxed"
                     >
                       {demoStep === 1 ? 
                         `/* Analyzing architectural mapping... */\n// Entities detected: tasks, users, logs\n// Relations: 1:N (Users-Tasks)\n// Context: Real-time update enabled` :
                        demoStep === 2 ?
                         `export default function TaskGrid() {\n  const { tasks } = useTasks();\n  return (\n    <div className="grid gap-4">\n      <TaskHeader title="Active Feed" />\n    </div>\n  );\n}` :
                        demoStep === 3 ?
                         `CREATE TABLE logs (\n  id UUID PRIMARY KEY,\n  action_type TEXT,\n  node_ref VARCHAR(255),\n  timestamp TIMESTAMPTZ DEFAULT NOW()\n);` :
                         `Awaiting neural input signal...`
                       }
                     </motion.pre>
                   </AnimatePresence>
                   <div className="absolute bottom-10 right-10">
                     <Cpu className="w-16 h-16 text-[#c0c1ff]/10 animate-pulse" />
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="px-6 py-40 max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { i: Layout, t: "Live Preview Engine", d: "Real-time interactive rendering of your manifest." },
            { i: Layers, t: "Multi-Tab Environment", d: "Seamless context switching between system layers." },
            { i: Sparkles, t: "AI Assistant Chat", d: "Refine your architecture through natural dialogue." },
            { i: History, t: "Blueprint Archival", d: "Store and branch synthesized manifestations." },
            { i: Rocket, t: "One-Click Deploy", d: "Instant transition to production endpoints." },
            { i: Users, t: "Team Collaboration", d: "Multi-user architectural synchronization." },
            { i: Lock, t: "Security Enforced", d: "Encrypted credentials and identity protocols." },
            { i: Globe, t: "Edge Optimized", d: "Assets distributed across global neural nodes." }
          ].map((f, i) => (
            <motion.div
              key={f.t}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="glass-panel p-10 group hover:border-[#c0c1ff]/40 transition-all cursor-default bg-[#171f33]/20"
            >
              <f.i className="w-6 h-6 text-[#c0c1ff] mb-8 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
              <h4 className="text-sm font-black uppercase tracking-widest mb-4 italic text-[#dae2fd]">{f.t}</h4>
              <p className="text-[11px] text-[#dae2fd]/30 font-bold leading-relaxed">{f.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="px-6 py-60 flex flex-col items-center text-center relative z-10 border-t border-white/5">
        <motion.div
          whileInView={{ y: [20, 0], opacity: [0, 1] }}
          transition={{ duration: 1 }}
          className="space-y-16"
        >
          <h2 className="text-[12vw] sm:text-[10vw] font-black tracking-tighter uppercase italic leading-[0.8] text-[#dae2fd]">
            Initialize <br />
            <span className="text-[#c0c1ff] drop-shadow-[0_0_20px_rgba(192,193,255,0.3)]">Your Link</span>
          </h2>
          <p className="text-xl sm:text-3xl font-medium tracking-tight text-[#dae2fd]/30 uppercase tracking-[0.2em]">Join 50,000+ architects across the neural grid.</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-12">
            <Button size="lg" className="w-full sm:w-72 h-20 text-base sm:text-lg" onClick={() => navigate('/signup')}>
              Start Building Free
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-72 h-20 text-base sm:text-lg" onClick={() => navigate('/login')}>
              Watch 2-Min Demo
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

