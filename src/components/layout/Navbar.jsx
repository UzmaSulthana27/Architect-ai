import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  LayoutPanelLeft, 
  Archive, 
  Settings, 
  User,
  ChevronDown,
  LogOut,
  LayoutGrid,
  BookOpen,
  Menu,
  X
} from 'lucide-react';
import useStore from '../../store/useStore';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isGenerating } = useStore();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);

  const navItems = [
    { label: 'Home', path: '/', icon: <Zap className="w-4 h-4" /> },
    { label: 'Atelier', path: '/atelier', icon: <LayoutPanelLeft className="w-4 h-4" /> },
    { label: 'Templates', path: '/templates', icon: <LayoutGrid className="w-4 h-4" /> },
    { label: 'Vault', path: '/vault', icon: <Archive className="w-4 h-4" /> },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] glass-panel border-x-0 border-t-0 border-white/5 transition-all h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        {/* Mobile Nav Toggle */}
        <button 
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="md:hidden p-2 text-text-primary/50 hover:text-white transition-colors"
        >
          {isMobileNavOpen ? <X className="w-5 h-5 text-neon" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-1.5 sm:gap-3 group">
          <div className="relative">
            <Zap className={`w-5 h-5 sm:w-6 sm:h-6 text-neon transition-all ${isGenerating ? 'animate-pulse scale-110' : 'group-hover:scale-110'}`} />
            <div className={`absolute inset-0 bg-neon/30 blur-lg rounded-full animate-neural-pulse ${isGenerating ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
          </div>
          <span className="font-black tracking-tighter text-[15px] sm:text-lg uppercase italic text-glow whitespace-nowrap">
            Architect <span className="text-neon">AI</span>
          </span>
        </NavLink>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.id || item.path}
              to={item.path}
              className={({ isActive }) => `
                relative px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-2
                ${isActive ? 'text-neon' : 'text-text-primary/50 hover:text-text-primary'}
              `}
            >
              {item.icon}
              {item.label}
              {location.pathname === item.path && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-4 right-4 h-0.5 bg-neon shadow-[0_0_8px_#c0c1ff]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </NavLink>
          ))}
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-2 sm:gap-4">
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 sm:gap-3 p-1 sm:p-1.5 sm:pl-3 rounded-full bg-white/5 border border-white/10 hover:border-neon/30 transition-all group"
              >
                <span className="hidden sm:inline text-[10px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                  {user.user_metadata?.full_name || user.email?.split('@')[0] || 'Architect'}
                </span>
                <div className="w-8 h-8 rounded-full bg-neon flex items-center justify-center text-bg-primary overflow-hidden border border-white/20">
                  <User className="w-4 h-4" />
                </div>
                <ChevronDown className={`w-3 h-3 opacity-30 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-[-1]" onClick={() => setIsMenuOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-56 glass-panel border border-white/5 shadow-2xl p-2 rounded-2xl overflow-hidden"
                    >
                      <NavLink 
                        to="/engine-room" 
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-text-primary/60 hover:text-neon hover:bg-white/5 rounded-xl transition-all"
                      >
                        <Settings className="w-4 h-4" />
                        Engine Room
                      </NavLink>
                      <NavLink 
                        to="/learn" 
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-text-primary/60 hover:text-neon hover:bg-white/5 rounded-xl transition-all"
                      >
                        <BookOpen className="w-4 h-4" />
                        Neural Academy
                      </NavLink>
                      <div className="h-px bg-white/5 my-1" />
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-all"
                      >
                        <LogOut className="w-4 h-4" />
                        Disconnect
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <NavLink to="/login" className="px-3 sm:px-6 py-2 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-text-primary/60 hover:text-white transition-colors">
                Sign In
              </NavLink>
              <NavLink to="/signup" className="px-4 sm:px-6 py-2 bg-neon text-midnight text-[9px] sm:text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-neon/10 hover:scale-105 active:scale-95 transition-all">
                Request
              </NavLink>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileNavOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-x-0 border-t border-white/5 bg-[#0b1326] shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileNavOpen(false)}
                  className={({ isActive }) => `
                    flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all
                    ${isActive ? 'bg-neon/10 text-neon border border-neon/20' : 'text-text-primary/40 hover:bg-white/5'}
                  `}
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
