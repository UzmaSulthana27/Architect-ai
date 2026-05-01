import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Zap, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Github, 
  Chrome,
  ShieldCheck,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import useStore from '../store/useStore';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { addToast } = useStore();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const passwordStrength = useMemo(() => {
    const p = formData.password;
    if (!p) return null;
    if (p.length < 8) return { label: 'Weak', score: 1, color: 'bg-red-500' };
    if (p.length < 12) return { label: 'Medium', score: 2, color: 'bg-amber-500' };
    if (/[A-Z]/.test(p) && 
        /[a-z]/.test(p) && 
        /[0-9]/.test(p) && 
        /[^A-Za-z0-9]/.test(p)) {
      return { label: 'Strong', score: 3, color: 'bg-[#c7fff0]' };
    }
    return { label: 'Medium', score: 2, color: 'bg-amber-500' };
  }, [formData.password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Human alias required');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Neural identifier format invalid');
      return;
    }

    if (passwordStrength?.score < 2) {
      setError('Access fragment too volatile (weak)');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Neural fragments do not synchronize');
      return;
    }

    if (!agreeToTerms) {
      setError('Policy alignment required');
      return;
    }

    setIsLoading(true);
    try {
      await signup(formData.email, formData.password, formData.name);
      addToast('Neural Link established!', 'success');
      navigate('/atelier');
    } catch (err) {
      setError(err.message || 'Synthesis failed');
      addToast(err.message || 'Synthesis failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden bg-[#0b1326]">
      {/* Background Neural Grid */}
      <div className="absolute inset-0 neural-grid opacity-10 pointer-events-none" />
      
      {/* Floating Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c0c1ff]/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ y: 40, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        className="w-full max-w-[480px] relative z-10"
      >
        <div className="glass-panel bg-[#171f33]/60 border-white/5 p-6 sm:p-10 space-y-6 sm:space-y-8 backdrop-blur-2xl rounded-3xl sm:rounded-[2.5rem] shadow-2xl">
          <div className="flex flex-col items-center text-center space-y-4">
             <motion.div 
               animate={{ 
                 scale: [1, 1.1, 1],
                 rotate: [0, 90, 0]
               }}
               transition={{ repeat: Infinity, duration: 10 }}
               className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-[#c7fff0]/10 border border-[#c7fff0]/20 flex items-center justify-center text-[#c7fff0] mb-2"
             >
                <Zap className="w-6 h-6 sm:w-8 sm:h-8" />
             </motion.div>
             <div className="space-y-1">
               <h1 className="text-xl sm:text-2xl font-black uppercase tracking-widest text-white">Request Neural Link</h1>
               <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-[#dae2fd]/30">Join the architectural collective</p>
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

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] text-[#dae2fd]/40 ml-1">Human Alias</label>
              <div className="relative group">
                 <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#dae2fd]/20 group-focus-within:text-[#c7fff0] transition-all" />
                 <input 
                   disabled={isLoading}
                   type="text" 
                   value={formData.name}
                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                   placeholder="Architect Name"
                   className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-xs font-bold tracking-widest text-white focus:outline-none focus:border-[#c7fff0]/30 focus:bg-white/10 transition-all placeholder:text-white/5"
                 />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] text-[#dae2fd]/40 ml-1">Network Identifier</label>
              <div className="relative group">
                 <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#dae2fd]/20 group-focus-within:text-[#c7fff0] transition-all" />
                 <input 
                   disabled={isLoading}
                   type="email" 
                   value={formData.email}
                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                   placeholder="operator@nexus.core"
                   className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-xs font-bold tracking-widest text-white focus:outline-none focus:border-[#c7fff0]/30 focus:bg-white/10 transition-all placeholder:text-white/5"
                 />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] text-[#dae2fd]/40 ml-1">New Access Fragment</label>
              <div className="space-y-3">
                <div className="relative group">
                   <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#dae2fd]/20 group-focus-within:text-[#c7fff0] transition-all" />
                   <input 
                     disabled={isLoading}
                     type={showPassword ? 'text' : 'password'}
                     value={formData.password}
                     onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                     placeholder="••••••••"
                     className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 pl-14 pr-14 text-xs font-bold tracking-widest text-white focus:outline-none focus:border-[#c7fff0]/30 focus:bg-white/10 transition-all placeholder:text-white/5 font-mono"
                   />
                   <button 
                     type="button"
                     onClick={() => setShowPassword(!showPassword)}
                     className="absolute right-5 top-1/2 -translate-y-1/2 text-[#dae2fd]/20 hover:text-white transition-colors"
                   >
                     {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                   </button>
                </div>
                
                {passwordStrength && (
                  <div className="space-y-2 px-1">
                    <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest">
                       <span className="text-[#dae2fd]/30">Stability Level</span>
                       <span style={{ color: passwordStrength.color === 'bg-[#c7fff0]' ? '#c7fff0' : '' }} className={passwordStrength.color.replace('bg-', 'text-')}>
                         {passwordStrength.label}
                       </span>
                    </div>
                    <div className="flex gap-1 h-1">
                       {[1, 2, 3].map(i => (
                         <div key={i} className={`flex-1 rounded-full transition-all duration-500 ${i <= passwordStrength.score ? passwordStrength.color : 'bg-white/5'}`} />
                       ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] text-[#dae2fd]/40 ml-1">Synchronize Fragment</label>
              <div className="relative group">
                 <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#dae2fd]/20 group-focus-within:text-[#c7fff0] transition-all" />
                 <input 
                   disabled={isLoading}
                   type="password" 
                   value={formData.confirmPassword}
                   onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                   placeholder="••••••••"
                   className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-xs font-bold tracking-widest text-white focus:outline-none focus:border-[#c7fff0]/30 focus:bg-white/10 transition-all placeholder:text-white/5 font-mono"
                 />
              </div>
            </div>

            <div className="px-1 pt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${agreeToTerms ? 'bg-[#c7fff0] border-[#c7fff0]' : 'bg-white/5 border-white/10 group-hover:border-white/20'}`}>
                   {agreeToTerms && <CheckCircle2 className="w-3 h-3 text-[#0b1326]" />}
                </div>
                <input 
                  type="checkbox" 
                  className="hidden" 
                  checked={agreeToTerms}
                  onChange={() => setAgreeToTerms(!agreeToTerms)}
                />
                <span className="text-[9px] font-black uppercase tracking-widest text-[#dae2fd]/30 group-hover:text-[#dae2fd]/60 transition-colors">Align with Terms & Neural Privacy</span>
              </label>
            </div>

            <Button 
               type="submit" 
               className="w-full py-5 text-[10px] font-black uppercase tracking-[0.3em] bg-[#c7fff0] text-[#0b1326] shadow-[0_0_20px_rgba(199,255,240,0.2)] hover:bg-[#a8efdd]" 
               icon={ArrowRight}
               loading={isLoading}
            >
              Initiate Neural Connection
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
               Already established in registry? <Link to="/login" className="text-[#c7fff0] hover:underline ml-1">Sign In</Link>
             </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
