import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, Mail, Lock, LogIn, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate('/atelier');
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-12 h-12 rounded-xl bg-neon/10 border border-neon/30 flex items-center justify-center group-hover:border-neon transition-all">
              <Zap className="text-neon" size={24} />
            </div>
          </Link>
          <h2 className="text-3xl font-bold text-white tracking-tight">INITIALIZE SESSION</h2>
          <p className="text-text-secondary">Enter credentials to establish neural link.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-2xl glass-card border border-white/5 bg-bg-primary/50 relative overflow-hidden"
        >
          {err && (
            <div className="mb-6 p-3 rounded bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-mono">
              SYSTEM ERROR: {err}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-mono text-text-secondary uppercase tracking-widest pl-1">Identifier</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@nexus.com"
                  required
                  className="w-full bg-bg-dark border border-white/10 rounded-xl px-4 py-3 pl-11 text-sm text-white focus:outline-none focus:border-neon transition-all"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-text-secondary uppercase tracking-widest pl-1">Access Key</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-bg-dark border border-white/10 rounded-xl px-4 py-3 pl-11 text-sm text-white focus:outline-none focus:border-neon transition-all"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 bg-neon text-bg-dark font-bold rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(30,230,210,0.2)] hover:shadow-[0_0_30px_rgba(30,230,210,0.3)] transition-all"
            >
              ESTABLISH LINK
              <LogIn size={18} />
            </motion.button>
          </form>

          <p className="mt-8 text-center text-sm text-text-secondary">
            Unidentified? <Link to="/signup" className="text-neon hover:underline">Register entity</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
