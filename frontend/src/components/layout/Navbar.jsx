import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  Layout, 
  Database, 
  Terminal, 
  Layers, 
  Zap, 
  Menu, 
  X,
  ChevronRight,
  User,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NavItem = ({ to, icon: Icon, label, active }) => (
  <Link to={to}>
    <motion.div
      className={`relative px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 group ${
        active 
          ? 'text-neon bg-neon/10 border border-neon/20' 
          : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
      }`}
    >
      <Icon size={18} className={active ? 'text-neon' : 'group-hover:text-neon transition-colors duration-300'} />
      <span className="font-medium text-sm">{label}</span>
      {active && (
        <motion.div
          layoutId="nav-glow"
          className="absolute inset-0 bg-neon/5 blur-md -z-10 rounded-lg"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </motion.div>
  </Link>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const routes = [
    { path: '/', label: 'Home', icon: Layers },
    { path: '/atelier', label: 'Atelier', icon: Cpu },
    { path: '/vault', label: 'Vault', icon: Database },
    { path: '/engine-room', label: 'Engine Room', icon: Terminal },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-bg-dark/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon/20 to-purple-500/20 border border-neon/30 flex items-center justify-center overflow-hidden group-hover:border-neon transition-colors duration-500">
              <Zap className="text-neon group-hover:scale-110 transition-transform duration-500" size={20} />
              <div className="absolute inset-0 bg-neon/10 animate-pulse" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white leading-tight">ARCHITECT<span className="text-neon">AI</span></span>
            <span className="text-[10px] text-text-secondary font-mono tracking-widest uppercase">Neural Workflow</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {routes.map((route) => (
            <NavItem 
              key={route.path}
              to={route.path}
              label={route.label}
              icon={route.icon}
              active={location.pathname === route.path}
            />
          ))}
        </div>

        {/* User Actions / Mobile Menu */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="hidden md:flex items-center gap-3">
               <div className="flex flex-col items-end mr-2">
                <span className="text-xs font-medium text-white">{user.email?.split('@')[0]}</span>
                <span className="text-[10px] text-neon/70 font-mono">AUTHORIZED</span>
              </div>
              <button 
                onClick={signOut}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:border-neon/30 hover:bg-neon/5 transition-all duration-300"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="hidden md:block">
               <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2 bg-neon text-bg-dark font-bold rounded-lg text-sm hover:shadow-[0_0_20px_rgba(30,230,210,0.4)] transition-all duration-300"
              >
                INITIALIZE
              </motion.button>
            </Link>
          )}

          <button 
            className="md:hidden p-2 text-text-secondary hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-white/5 bg-bg-dark overflow-hidden"
          >
            <div className="p-4 space-y-2">
              {routes.map((route) => (
                <Link 
                  key={route.path}
                  to={route.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-xl ${
                    location.pathname === route.path 
                      ? 'bg-neon/10 text-neon' 
                      : 'text-text-secondary hover:bg-white/5'
                  }`}
                >
                  <route.icon size={20} />
                  <span className="font-medium">{route.label}</span>
                </Link>
              ))}
              {!user && (
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <div className="mt-4 p-3 bg-neon text-bg-dark rounded-xl font-bold text-center">
                    INITIALIZE
                  </div>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
