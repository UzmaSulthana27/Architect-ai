export const TEMPLATES = [
  // SaaS Dashboards
  {
    id: "saas-1",
    category: "saas",
    title: "Analytics Dashboard",
    desc: "Real-time user engagement metrics with advanced filtering and date range pickers.",
    complexity: "Advanced",
    timeSaved: "12 hours",
    forks: "8.4k",
    stack: ["React", "D3.js", "Tailwind"],
    previewUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
    prompt: "A sophisticated white-on-dark analytics dashboard with real-time user metrics, geographic distribution map, and engagement graphs using Recharts.",
    code: {
      react: `export default function AnalyticsDashboard() {
  return (
    <div className="p-8 bg-slate-950 min-h-screen text-white font-sans">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight uppercase italic">Neural Analytics</h1>
          <p className="text-sm opacity-50 uppercase tracking-widest mt-1">Global Traffic Node Alpha</p>
        </div>
        <div className="flex gap-4">
          <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-neon animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest opacity-60">LIVE</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        {[
          { label: "UNIQUE_VISITORS", val: "1.2M", diff: "+12.4%", icon: <Users /> },
          { label: "CONVERSION_RATE", val: "4.8%", diff: "+2.1%", icon: <Zap /> },
          { label: "BOUNCE_TIME", val: "42s", diff: "-5.2%", icon: <Clock /> },
          { label: "SYSTEM_LOAD", val: "12%", diff: "-0.4%", icon: <Cpu /> }
        ].map((s, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-white/5 border border-white/10 rounded-2xl group hover:border-neon/30 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[8px] font-black tracking-[0.3em] opacity-30 uppercase">{s.label}</span>
              <div className="text-neon opacity-40">{s.icon}</div>
            </div>
            <div className="text-3xl font-black tracking-tighter mb-1">{s.val}</div>
            <div className={\`text-[10px] font-bold \${s.diff.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}\`}>
              {s.diff} <span className="opacity-40 italic">vs last cycle</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 min-h-[300px] flex flex-col">
          <div className="flex items-center justify-between mb-10">
             <h3 className="text-sm font-black tracking-widest uppercase">Traffic Volume Matrix</h3>
             <div className="flex gap-2">
               <button className="px-3 py-1 bg-neon text-midnight text-[8px] font-black rounded-lg">24H</button>
               <button className="px-3 py-1 bg-white/5 text-[8px] font-black rounded-lg opacity-40">7D</button>
             </div>
          </div>
          <div className="flex-1 flex items-end gap-3 mt-4">
             {[30, 45, 20, 60, 40, 70, 85, 40, 50, 45, 90, 60, 40, 30, 55, 78, 65, 45].map((h, i) => (
               <motion.div 
                 key={i}
                 initial={{ height: 0 }}
                 animate={{ height: \`\${h}%\` }}
                 transition={{ delay: i * 0.05, duration: 1 }}
                 className="flex-1 bg-neon/20 rounded-t-sm relative group"
               >
                 <div className="absolute inset-0 bg-neon opacity-0 group-hover:opacity-100 transition-opacity" />
               </motion.div>
             ))}
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
           <h3 className="text-sm font-black tracking-widest uppercase mb-8">Node Distribution</h3>
           <div className="space-y-6">
              {[
                { n: "TOKYO_NODE", v: "42%", c: "bg-neon" },
                { n: "LONDON_GATEWAY", v: "28%", c: "bg-purple-500" },
                { n: "SV_CLUSTER", v: "15%", c: "bg-blue-500" },
                { n: "NY_DORMANT", v: "10%", c: "bg-white/20" }
              ].map((node, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black tracking-widest uppercase opacity-40">
                    <span>{node.n}</span>
                    <span>{node.v}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: node.v }}
                      className={\`h-full \${node.c}\`}
                    />
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}`
    }
  },
  {
    id: "eco-1",
    category: "ecommerce",
    title: "Product Catalog",
    desc: "Dynamic grid with advanced multi-faceted search and smooth skeleton loaders.",
    complexity: "Intermediate",
    timeSaved: "5 hours",
    forks: "2.4k",
    stack: ["React", "Lucide", "Tailwind"],
    previewUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000",
    prompt: "An elegant e-commerce product catalog with high-quality item grids, floating navigation, and interactive product cards with quick-view options.",
    code: {
      react: `export default function ProductCatalog() {
  const products = [
    { name: "NEURAL_LINK_X1", price: "$2,400", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" },
    { name: "VOID_CASE_MINIMA", price: "$450", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800" },
    { name: "QUANTUM_KEY_V2", price: "$890", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" },
    { name: "PHOTON_DRIVE", price: "$1,200", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800" }
  ];

  return (
    <div className="p-10 bg-white dark:bg-slate-950 min-h-screen font-sans">
      <div className="flex items-center justify-between mb-16 px-4">
        <h2 className="text-4xl font-black tracking-tighter uppercase italic text-slate-900 dark:text-white">The Collection</h2>
        <div className="flex items-center gap-6">
          <span className="text-[10px] font-black tracking-widest opacity-40 uppercase">Filtering Enabled</span>
          <div className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center">
            <Menu className="w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((p, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -10 }}
            className="group cursor-pointer"
          >
            <div className="aspect-[3/4] w-full rounded-3xl overflow-hidden bg-slate-100 mb-6 relative">
              <img src={p.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                <button className="bg-white text-black px-6 py-3 rounded-full font-black text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">Quick View</button>
              </div>
            </div>
            <div className="px-2">
              <div className="text-[10px] font-black opacity-30 tracking-[0.2em] mb-1 uppercase">ARCHITECT SERIES // {i + 1}</div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">{p.name}</h3>
              <div className="text-sm font-black text-neon">{p.price}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}`
    }
  },
  {
    id: "landing-1",
    category: "landing",
    title: "Neural Landing Page",
    desc: "A high-conversion landing page with horizontal scroll sections and glassmorphism effects.",
    complexity: "Intermediate",
    timeSaved: "7 hours",
    forks: "1.2k",
    stack: ["React", "Motion", "Tailwind"],
    previewUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000",
    prompt: "A futuristic landing page for a tech startup, featuring deep-space backgrounds, high-contrast neon accents, and smooth entry animations for feature blocks.",
    code: {
      react: `export default function NeuralLanding() {
  return (
    <div className="bg-[#050505] text-white overflow-hidden">
      <nav className="p-6 flex justify-between items-center bg-transparent relative z-10">
        <div className="flex items-center gap-2">
          <Zap className="text-neon" />
          <span className="font-black italic text-xl uppercase italic">Quantum</span>
        </div>
        <div className="flex gap-8 text-[10px] font-black tracking-widest uppercase opacity-40">
          <a href="#">Protocol</a>
          <a href="#">Network</a>
          <a href="#">Foundry</a>
        </div>
      </nav>

      <section className="h-screen flex flex-col items-center justify-center p-6 text-center">
        <motion.h1 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-[12vw] font-black tracking-tighter leading-none italic uppercase mb-8"
        >
          Architect <br /> The <span className="text-neon">Unseen</span>
        </motion.h1>
        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            className="max-w-xl text-lg font-medium mb-12"
        >
          Transcend traditional development layers with neural-linked synthesis of production infrastructure.
        </motion.p>
        <button className="px-12 py-6 bg-neon text-midnight font-black tracking-[0.3em] uppercase rounded-full shadow-[0_0_50px_rgba(192,193,255,0.3)]">Enter The Grid</button>
      </section>
    </div>
  );
}`
    }
  },
  {
    id: "auth-1",
    category: "auth",
    title: "Secure Portal v2",
    desc: "Multi-step authentication flow with biometric visualizers and vault-grade security UI.",
    complexity: "Intermediate",
    timeSaved: "4 hours",
    forks: "3.1k",
    stack: ["React", "Firebase auth", "Framer"],
    previewUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc4b?auto=format&fit=crop&q=80&w=1000",
    prompt: "A high-security login portal inspired by cyberpunk aesthetics, featuring matrix-style background particles and scanning visual effects.",
    code: {
      react: `export default function SecurePortal() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 bg-[radial-gradient(circle_at_center,_var(--neon-dim)_0%,_transparent_70%)]">
      <div className="w-full max-w-md glass-panel p-12 rounded-[2.5rem] border-white/5 relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-neon/10 rounded-full flex items-center justify-center blur-xl" />
        <div className="flex flex-col items-center text-center space-y-6">
          <ShieldCheck className="w-12 h-12 text-neon" />
          <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">Identity Sync</h2>
          <p className="text-[10px] uppercase font-black tracking-[0.3em] text-white/30">Biometric Verification Required</p>
          
          <div className="w-full space-y-4 pt-4">
            <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-neon transition-colors" placeholder="ACCESS_KEY" />
            <button className="w-full py-4 bg-neon text-midnight font-black tracking-widest uppercase rounded-xl">INITIATE_SYNC</button>
          </div>
          
          <div className="pt-6 flex gap-4">
            <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Forgot Logic Path?</span>
            <span className="text-[8px] font-black text-neon uppercase tracking-widest cursor-pointer">Protocol Zero</span>
          </div>
        </div>
      </div>
    </div>
  );
}`
    }
  },
  {
    id: "data-1",
    category: "data",
    title: "Network Pulse Map",
    desc: "Interactive global node visualization with latency heatmaps and traffic flow animations.",
    complexity: "Advanced",
    timeSaved: "15 hours",
    forks: "1.9k",
    stack: ["React", "D3", "Canvas"],
    previewUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000",
    prompt: "An interactive global map showing real-time network traffic between major city nodes, with pulsating glow effects and data sidebars.",
    code: {
      react: `export default function NetworkPulse() {
  return (
    <div className="p-8 bg-[#020202] min-h-screen text-white font-sans flex flex-col">
      <div className="flex justify-between items-end mb-12">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter">Global <span className="text-neon text-glow">Node</span> Map</h1>
        <div className="text-right">
          <p className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase">Active Threads</p>
          <p className="text-2xl font-black text-emerald-400 tracking-tighter">1,242,094</p>
        </div>
      </div>
      
      <div className="flex-1 glass-card border-white/5 rounded-3xl relative overflow-hidden flex items-center justify-center p-20">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
         <div className="w-full h-full border border-neon/10 rounded-full flex items-center justify-center animate-pulse">
            <div className="w-3/4 h-3/4 border border-neon/20 rounded-full flex items-center justify-center">
               <div className="w-1/2 h-1/2 border border-neon/30 rounded-full flex items-center justify-center">
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-12 h-12 bg-neon rounded-full shadow-[0_0_50px_rgba(192,193,255,1)]" 
                  />
               </div>
            </div>
         </div>
         
         <div className="absolute top-10 left-10 space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-3">
                 <div className="w-1 h-8 bg-neon" />
                 <div>
                    <p className="text-[8px] font-black uppercase opacity-30">LATENCY_PULSE_{i}</p>
                    <p className="text-[12px] font-bold">128ms</p>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}`
    }
  }
];
