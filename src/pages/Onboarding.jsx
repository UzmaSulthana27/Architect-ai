import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { 
  Sparkles, 
  Play, 
  ArrowRight, 
  X, 
  Eye, 
  Code, 
  Layout, 
  Rocket, 
  Library,
  Video
} from "lucide-react";

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [mockPrompt, setMockPrompt] = useState("");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("onboarding_complete") === "true") {
      navigate("/atelier");
    }
  }, [navigate]);

  const skipTutorial = () => {
    localStorage.setItem("onboarding_complete", "true");
    navigate("/atelier");
  };

  const nextStep = () => setStep(prev => prev + 1);

  // Mock code for the tutorial
  const mockCode = `export default function LoginPage() {
  return (
    <div className="p-8 flex items-center justify-center">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl w-64">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input className="w-full mb-4 p-2 border rounded" placeholder="Email" />
        <input className="w-full mb-6 p-2 border rounded" placeholder="Password" />
        <button className="w-full bg-blue-600 text-white p-2 rounded">Sign In</button>
      </div>
    </div>
  );
}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10 backdrop-blur-3xl bg-black/40">
      {/* Background Decorative Blur */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-neon/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{ backgroundImage: 'linear-gradient(0deg, transparent 0%, var(--neon) 50%, transparent 100%)', backgroundSize: '100% 4px', animation: 'scan 4s linear infinite' }} 
        />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          from { background-position: 0 -100vh; }
          to { background-position: 0 100vh; }
        }
        .animate-pulse-slow {
          animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}} />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-5xl h-[80vh] min-h-[600px] glass-card overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border-white/10 flex flex-col relative z-10"
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-black/10 dark:border-white/5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neon flex items-center justify-center text-midnight">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black tracking-[0.3em] uppercase opacity-40">System Initialization</span>
          </div>
          <button 
            onClick={skipTutorial}
            className="text-[10px] font-black tracking-widest uppercase opacity-40 hover:opacity-100 transition-all flex items-center gap-2"
          >
            Skip Tutorial <X className="w-3 h-3" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-h-0 relative">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div 
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full flex flex-col p-8 sm:p-16 items-center text-center justify-center overflow-auto"
              >
                <div className="max-w-2xl space-y-8">
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="p-3 inline-flex rounded-full bg-neon/10 border border-neon/30 text-neon mb-4"
                  >
                    <Play className="w-8 h-8" />
                  </motion.div>
                  <h1 className="text-5xl sm:text-6xl font-black tracking-tighter leading-none" style={{ color: 'var(--text-primary)' }}>
                    WELCOME TO <br />
                    <span className="text-neon">ARCHITECT AI</span>
                  </h1>
                  <p className="text-lg opacity-60 max-w-lg mx-auto" style={{ color: 'var(--text-primary)' }}>
                    Experience the future of rapid application development. Watch our brief introduction to see how it works.
                  </p>
                  
                  {/* Mock Video Placeholder */}
                  <div className="aspect-video w-full rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center relative overflow-hidden group shadow-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070" 
                      className="absolute inset-0 w-full h-full object-cover opacity-30 transition-transform duration-700 group-hover:scale-110"
                      alt="Tutorial background"
                    />
                    <div className="relative z-10 flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl scale-90 transition-transform group-hover:scale-100 cursor-pointer">
                        <Play className="w-6 h-6 ml-1" />
                      </div>
                      <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white">30s Intro - Auto Playing</span>
                    </div>
                  </div>

                  <button 
                    onClick={nextStep}
                    className="group bg-neon text-white dark:text-midnight px-10 py-5 rounded-full font-black tracking-[0.2em] flex items-center gap-4 mx-auto shadow-xl hover:scale-105 active:scale-95 transition-all text-xs"
                  >
                    LET'S BUILD YOUR FIRST APP
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full flex flex-col p-8 sm:p-12 items-center justify-center text-center space-y-12"
              >
                <div className="space-y-4">
                  <div className="px-4 py-2 rounded-full border border-neon/30 text-neon text-[10px] font-black tracking-widest uppercase inline-block mb-4">
                    Step 1 / 3: Neural Prompting
                  </div>
                  <h2 className="text-4xl font-black tracking-tighter" style={{ color: 'var(--text-primary)' }}>
                    TELL THE SYSTEM <span className="text-neon">WHAT TO BUILD</span>
                  </h2>
                  <p className="opacity-60 max-w-xl mx-auto" style={{ color: 'var(--text-primary)' }}>
                    Just use natural language. No specific keywords required.
                  </p>
                </div>

                <div className="w-full max-w-2xl relative">
                  <div className="absolute -inset-4 bg-neon/10 blur-2xl rounded-full animate-pulse opacity-50" />
                  <div className="relative glass-card p-4 pl-8 pr-4 flex items-center gap-4 border-neon/40 shadow-2xl rounded-2xl">
                    <Sparkles className="w-5 h-5 text-neon" />
                    <input 
                      type="text" 
                      placeholder="Try this prompt: 'Build a login page...'" 
                      readOnly
                      className="flex-1 bg-transparent border-none outline-none text-sm font-bold tracking-widest uppercase"
                      style={{ color: 'var(--text-primary)' }}
                      value={mockPrompt}
                    />
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setMockPrompt("Build a login page with email and password");
                        setTimeout(() => nextStep(), 1500);
                      }}
                      className="bg-neon text-midnight px-6 py-3 rounded-xl font-black text-[10px] tracking-widest uppercase"
                    >
                      TRY IT NOW
                    </motion.button>
                  </div>
                </div>

                {mockPrompt && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-neon animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-neon animate-bounce delay-75" />
                      <div className="w-2 h-2 rounded-full bg-neon animate-bounce delay-150" />
                    </div>
                    <p className="text-[10px] font-black tracking-widest opacity-40">SYSTEM SYNTHESIZING ARCHITECTURE...</p>
                  </motion.div>
                )}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full flex flex-col p-8 sm:p-12 items-center justify-center text-center space-y-8"
              >
                <div className="space-y-4">
                  <div className="px-4 py-2 rounded-full border border-neon/30 text-neon text-[10px] font-black tracking-widest uppercase inline-block mb-4">
                    Step 2 / 3: Instant Manifestation
                  </div>
                  <h2 className="text-4xl font-black tracking-tighter" style={{ color: 'var(--text-primary)' }}>
                    SEE IT <span className="text-neon">LIVE</span>
                  </h2>
                  <p className="opacity-60 max-w-xl mx-auto" style={{ color: 'var(--text-primary)' }}>
                    The neural engine has generated your UI. Now, manifesting the preview.
                  </p>
                </div>

                <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="glass-card overflow-hidden h-96 border-white/5 flex flex-col">
                    <div className="bg-black/20 p-4 flex items-center justify-between border-b border-white/5">
                      <span className="text-[10px] font-black tracking-widest opacity-40 uppercase">Atelier Editor</span>
                      <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500/30" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/30" />
                        <div className="w-2 h-2 rounded-full bg-green-500/30" />
                      </div>
                    </div>
                    <pre className="flex-1 p-6 font-mono text-[10px] text-left overflow-hidden bg-black/40 text-blue-300">
                      <code>{mockCode}</code>
                    </pre>
                  </div>

                  <div className={`glass-card overflow-hidden h-96 transition-all duration-700 relative flex flex-col ${isPreviewMode ? 'border-neon ring-1 ring-neon/20' : 'opacity-40 grayscale'}`}>
                    <div className="bg-black/20 p-4 flex items-center justify-between border-b border-white/10 shrink-0">
                      <span className="text-[10px] font-black tracking-widest opacity-40 uppercase flex items-center gap-2">
                        <Eye className="w-3 h-3" /> Live Preview
                      </span>
                      {isPreviewMode && (
                        <div className="w-2 h-2 rounded-full bg-neon animate-pulse shadow-[0_0_10px_#a855f7]" />
                      )}
                    </div>
                    {isPreviewMode ? (
                      <div className="flex-1 bg-slate-50 flex items-center justify-center p-8">
                        <div className="bg-white p-6 rounded-2xl shadow-xl w-48 scale-75 border border-black/5">
                          <div className="w-8 h-8 rounded-full bg-blue-100 mb-4" />
                          <div className="h-4 w-full bg-slate-100 rounded mb-2" />
                          <div className="h-2 w-3/4 bg-slate-100 rounded mb-4" />
                          <div className="h-8 w-full bg-blue-600 rounded" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center p-8">
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setIsPreviewMode(true)}
                          className="bg-neon text-midnight px-8 py-4 rounded-2xl font-black text-xs tracking-widest uppercase shadow-2xl"
                        >
                          TOGGLE PREVIEW
                        </motion.button>
                        <p className="mt-6 text-[10px] font-black uppercase opacity-40">Click to manifest UI</p>
                      </div>
                    )}
                  </div>
                </div>

                {isPreviewMode && (
                  <motion.button 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={nextStep}
                    className="bg-white/10 border border-white/10 px-8 py-4 rounded-full font-black text-[10px] tracking-widest flex items-center gap-3 mx-auto mt-4"
                  >
                    CONTINUE INITIALIZATION <ArrowRight className="w-3 h-3 text-neon" />
                  </motion.button>
                )}
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full flex flex-col p-8 sm:p-12 items-center justify-center text-center space-y-12"
              >
                <div className="space-y-4">
                  <div className="px-4 py-2 rounded-full border border-neon/30 text-neon text-[10px] font-black tracking-widest uppercase inline-block mb-4">
                    Step 3 / 3: Deep Refinement
                  </div>
                  <h2 className="text-4xl font-black tracking-tighter" style={{ color: 'var(--text-primary)' }}>
                    EDIT & <span className="text-neon">SYNCHRONIZE</span>
                  </h2>
                  <p className="opacity-60 max-w-xl mx-auto" style={{ color: 'var(--text-primary)' }}>
                    Change the code directly, and the preview updates instantly. High-precision engineering.
                  </p>
                </div>

                <div className="relative group max-w-3xl w-full">
                   <div className="absolute -inset-1 bg-neon/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                   <div className="relative glass-card bg-midnight/40 p-10 border-white/5 space-y-6">
                      <div className="flex items-center gap-2 mb-6">
                        <Code className="w-5 h-5 text-neon" />
                        <span className="text-[10px] font-black tracking-widest opacity-40 uppercase">Interactive Lab</span>
                      </div>
                      <div className="p-6 bg-black/40 rounded-2xl border border-white/10 font-mono text-sm text-left relative overflow-hidden group/editor">
                        <div className="absolute top-0 right-0 p-3 opacity-0 group-hover/editor:opacity-100 transition-opacity">
                          <span className="text-[8px] bg-neon text-midnight px-2 py-0.5 rounded font-black">EDITING ACTIVE</span>
                        </div>
                        <span className="text-purple-400">bg-</span>
                        <span className="text-neon ring-1 ring-neon/40 px-1 rounded animate-pulse">blue-600</span>
                        <span className="opacity-50"> → </span>
                        <span className="text-emerald-400">emerald-500</span>
                      </div>
                      <p className="text-sm opacity-60 leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                        Notice how small changes propagate immediately through the neural net.
                      </p>
                      
                      <button 
                        onClick={nextStep}
                        className="bg-neon text-midnight px-10 py-5 rounded-full font-black tracking-[0.2em] shadow-xl hover:scale-105 active:scale-95 transition-all text-xs"
                      >
                        COMPLETE ARCHITECTURE SETUP
                      </button>
                   </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full flex flex-col p-8 sm:p-12 items-center justify-center text-center space-y-12"
              >
                <div className="space-y-4">
                  <div className="px-4 py-2 rounded-full border border-emerald-500/30 text-emerald-400 text-[10px] font-black tracking-widest uppercase inline-block mb-4">
                    Initialization Complete
                  </div>
                  <h2 className="text-4xl font-black tracking-tighter" style={{ color: 'var(--text-primary)' }}>
                    CHOOSE YOUR <span className="text-neon">ENTRY POINT</span>
                  </h2>
                  <p className="opacity-60 max-w-xl mx-auto" style={{ color: 'var(--text-primary)' }}>
                    Your environment is stabilized. How would you like to proceed?
                  </p>
                </div>

                <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { title: "Start from Scratch", desc: "Open an empty workspace and build from a blank slate.", icon: <Rocket className="w-8 h-8" />, color: "neon", path: "/atelier" },
                    { title: "Use a Template", desc: "Choose from our preset architectural blueprints.", icon: <Library className="w-8 h-8" />, color: "blue-500", path: "/templates" },
                    { title: "Watch More Tutorials", desc: "Deep dive into advanced system features.", icon: <Video className="w-8 h-8" />, color: "purple-500", path: "/atelier" }
                  ].map((path, i) => (
                    <motion.button 
                      key={i}
                      whileHover={{ y: -8, border: `1px solid rgba(168, 85, 247, 0.4)` }}
                      onClick={() => {
                        localStorage.setItem("onboarding_complete", "true");
                        navigate(path.path);
                      }}
                      className="glass-card p-10 flex flex-col items-center text-center space-y-6 transition-all group border-white/5"
                    >
                      <div className={`p-4 rounded-2xl bg-${path.color}/10 text-${path.color} border border-${path.color}/20 group-hover:scale-110 transition-transform`}>
                        {path.icon}
                      </div>
                      <h3 className="text-lg font-black tracking-tighter" style={{ color: 'var(--text-primary)' }}>{path.title}</h3>
                      <p className="text-[10px] opacity-40 uppercase tracking-widest font-bold leading-relaxed" style={{ color: 'var(--text-primary)' }}>{path.desc}</p>
                    </motion.button>
                  ))}
                </div>

                <div className="flex items-center gap-2 opacity-30 text-[10px] font-black tracking-widest uppercase">
                  <Layout className="w-3 h-3" /> Neural Workspace Stable
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Progress */}
        <div className="px-8 py-4 border-t border-black/10 dark:border-white/5 flex items-center justify-between shrink-0 bg-black/5 dark:bg-white/2">
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div 
                key={i}
                className={`h-1 rounded-full transition-all duration-500 ${i === step ? "w-8 bg-neon" : "w-2 bg-white/10"}`}
              />
            ))}
          </div>
          <span className="text-[10px] font-black tracking-widest opacity-40 uppercase">Phase {step + 1} / 5</span>
        </div>
      </motion.div>
    </div>
  );
}
