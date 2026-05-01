import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Zap, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Github, 
  Chrome,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import useStore from '../store/useStore';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addToast } = useStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Neural identifier format invalid');
      return;
    }

    if (password.length < 1) {
      setError('Access fragment required');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      addToast('Neural Link established!', 'success');
      navigate('/atelier');
    } catch (err) {
      setError(err.message || 'Verification failed');
      addToast(err.message || 'Verification failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden bg-[#0b1326]">
      {/* Background Neural Grid */}
      <div className="absolute inset-0 neural-grid opacity-10 pointer-events-none" />
      
      {/* Floating Orbs */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-[#c0c1ff]/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-[#c7fff0]/5 blur-[100px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ y: 40, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        className="w-full max-w-[450px] relative z-10"
      >
        <div className="glass-panel bg-[#171f33]/60 border-white/5 p-6 sm:p-10 space-y-6 sm:space-y-8 backdrop-blur-2xl rounded-3xl sm:rounded-[2.5rem] shadow-2xl">
          <div className="flex flex-col items-center text-center space-y-4">
             <motion.div 
               animate={{ 
                 boxShadow: ["0 0 0px rgba(192, 193, 255, 0)", "0 0 20px rgba(192, 193, 255, 0.3)", "0 0 0px rgba(192, 193, 255, 0)"] 
               }}
               transition={{ repeat: Infinity, duration: 3 }}
               className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-[#c0c1ff]/10 border border-[#c0c1ff]/20 flex items-center justify-center text-[#c0c1ff] mb-2"
             >
                <Zap className="w-6 h-6 sm:w-8 sm:h-8" />
             </motion.div>
             <div className="space-y-1">
               <h1 className="text-xl sm:text-2xl font-black uppercase tracking-widest text-white">Establish Neural Link</h1>
               <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-[#dae2fd]/30">Access your neural workspace</p>
             </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-[10px] font-black uppercase tracking-widest"
              >
                <AlertCircle className="w-4 h-4" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] text-[#dae2fd]/40 ml-1">Network Identifier</label>
              <div className="relative group">
                 <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#dae2fd]/20 group-focus-within:text-[#c0c1ff] transition-all" />
                 <input 
                   disabled={isLoading}
                   type="email" 
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder="operator@nexus.core"
                   className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-xs font-bold tracking-widest text-white focus:outline-none focus:border-[#c0c1ff]/30 focus:bg-white/10 transition-all placeholder:text-white/5"
                 />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] text-[#dae2fd]/40 ml-1">Access Fragment</label>
              <div className="relative group">
                 <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#dae2fd]/20 group-focus-within:text-[#c0c1ff] transition-all" />
                 <input 
                   disabled={isLoading}
                   type={showPassword ? 'text' : 'password'}
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   placeholder="••••••••"
                   className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 pl-14 pr-14 text-xs font-bold tracking-widest text-white focus:outline-none focus:border-[#c0c1ff]/30 focus:bg-white/10 transition-all placeholder:text-white/5 font-mono"
                 />
                 <button 
                   type="button"
                   onClick={() => setShowPassword(!showPassword)}
                   className="absolute right-5 top-1/2 -translate-y-1/2 text-[#dae2fd]/20 hover:text-white transition-colors"
                 >
                   {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                 </button>
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${rememberMe ? 'bg-[#c0c1ff] border-[#c0c1ff]' : 'bg-white/5 border-white/10 group-hover:border-white/20'}`}>
                   {rememberMe && <ShieldCheck className="w-3 h-3 text-[#0b1326]" />}
                </div>
                <input 
                  type="checkbox" 
                  className="hidden" 
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <span className="text-[9px] font-black uppercase tracking-widest text-[#dae2fd]/30 group-hover:text-[#dae2fd]/60 transition-colors">Remember Node</span>
              </label>

              <Link to="/reset-password" title="Initialize Recovery" className="text-[9px] font-black uppercase tracking-widest text-[#c0c1ff] hover:opacity-70 transition-opacity">
                Forgot Fragment?
              </Link>
            </div>

            <Button 
               type="submit" 
               className="w-full py-5 text-[10px] font-black uppercase tracking-[0.3em] shadow-[0_0_20px_rgba(192,193,255,0.2)]" 
               icon={ArrowRight}
               loading={isLoading}
            >
              Initialize Neural Link
            </Button>
          </form>

          <div className="space-y-6">
             <div className="relative flex items-center gap-4 py-2">
                <div className="flex-1 h-px bg-white/5" />
                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-[#dae2fd]/20">External Core Sync</span>
                <div className="flex-1 h-px bg-white/5" />
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-widest text-[#dae2fd]/60 hover:bg-white/10 hover:border-white/10 transition-all">
                  <Chrome className="w-4 h-4" /> Google
                </button>
                <button className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-widest text-[#dae2fd]/60 hover:bg-white/10 hover:border-white/10 transition-all">
                  <Github className="w-4 h-4" /> GitHub
                </button>
             </div>
          </div>

          <div className="text-center pt-4 border-t border-white/5">
             <p className="text-[9px] font-black uppercase tracking-widest text-[#dae2fd]/30">
               No architectural link established? <Link to="/signup" className="text-[#c0c1ff] hover:underline ml-1">Request Neural Link</Link>
             </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
