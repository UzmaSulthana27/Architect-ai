import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Rocket, Database, Save, Plus, FileCode, 
  Settings, CreditCard, Github, Terminal, Zap, Clock,
  ChevronRight, Command, X, Layout, Lock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ACTIONS = [
  { id: 'new-gen', label: 'New Generation', icon: Plus, category: 'Quick Actions', shortcut: 'N', path: '/atelier' },
  { id: 'open-vault', label: 'Open Vault', icon: Database, category: 'Quick Actions', shortcut: 'V', path: '/vault' },
  { id: 'deploy', label: 'Deploy to Vercel', icon: Rocket, category: 'Quick Actions', shortcut: 'D', path: '/atelier?activeTab=deploy' },
  { id: 'save', label: 'Save Blueprint', icon: Save, category: 'Quick Actions', shortcut: 'S', path: '#' },
  
  { id: 'recent-1', label: 'E-commerce Dashboard', icon: FileCode, category: 'Recent', path: '/atelier' },
  { id: 'recent-2', label: 'Login System', icon: FileCode, category: 'Recent', path: '/atelier' },
  
  { id: 'tpl-saas', label: 'SaaS Dashboard', icon: Layout, category: 'Templates', path: '/atelier' },
  { id: 'tpl-blog', label: 'Blog with CMS', icon: Layout, category: 'Templates', path: '/atelier' },
  
  { id: 'set-api', label: 'Configure API Keys', icon: Settings, category: 'Settings', path: '/engine-room?activeTab=models' },
  { id: 'set-bill', label: 'Manage Billing', icon: CreditCard, category: 'Settings', path: '/engine-room?activeTab=billing' },
];

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const filteredActions = useMemo(() => {
    if (!query) return ACTIONS;
    return ACTIONS.filter(action => 
      action.label.toLowerCase().includes(query.toLowerCase()) ||
      action.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredActions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredActions.length) % filteredActions.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const action = filteredActions[selectedIndex];
        if (action) handleSelect(action);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredActions, selectedIndex]);

  const handleSelect = (action) => {
    if (action.path !== '#') {
      navigate(action.path);
    }
    onClose();
  };

  const categories = [...new Set(filteredActions.map(a => a.category))];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh] px-4 bg-midnight/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            onClick={e => e.stopPropagation()}
            className="w-full max-w-2xl glass-card border border-white/10 shadow-[0_32px_128px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Search Input */}
            <div className="relative flex items-center p-6 border-b border-white/5">
              <Search className="w-5 h-5 text-neon opacity-50 mr-4" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="What do you want to do?"
                className="flex-1 bg-transparent border-none text-lg font-bold placeholder:text-primary/30 focus:outline-none"
                style={{ color: 'var(--text-primary)' }}
              />
              <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-black tracking-widest text-primary/40 uppercase">
                 <Command className="w-3 h-3" /> K
              </div>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {filteredActions.length === 0 ? (
                <div className="p-12 text-center">
                  <Zap className="w-8 h-8 text-neon/20 mx-auto mb-4" />
                  <p className="text-xs font-black uppercase tracking-widest opacity-30">No protocols found matching "{query}"</p>
                </div>
              ) : (
                categories.map(cat => (
                  <div key={cat} className="mb-4">
                    <h3 className="px-4 py-2 text-[9px] font-black uppercase tracking-[0.2em] opacity-40">{cat}</h3>
                    <div className="space-y-1">
                      {filteredActions.filter(a => a.category === cat).map((action, idx) => {
                        const globalIndex = filteredActions.indexOf(action);
                        const isSelected = globalIndex === selectedIndex;
                        return (
                          <button
                            key={action.id}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                            onClick={() => handleSelect(action)}
                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all text-left group ${
                              isSelected ? 'bg-neon/10 border-neon/30' : 'hover:bg-white/5 border-transparent'
                            } border`}
                          >
                            <div className={`p-2 rounded-lg transition-colors ${
                              isSelected ? 'bg-neon text-midnight' : 'bg-white/5 text-primary opacity-40'
                            }`}>
                              <action.icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                               <p className={`text-sm font-bold ${isSelected ? 'text-primary' : 'text-primary opacity-60'}`}>
                                 {action.label}
                               </p>
                            </div>
                            {action.shortcut && (
                               <div className="px-2 py-1 rounded bg-white/5 border border-white/5 text-[9px] font-black text-primary/30 uppercase">
                                 {action.shortcut}
                               </div>
                            )}
                            <ChevronRight className={`w-4 h-4 transition-all ${
                              isSelected ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                            } text-neon`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/5 bg-black/20 flex items-center justify-between">
               <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest opacity-30">
                  <span className="flex items-center gap-1"><span className="px-1.5 py-0.5 rounded bg-white/10">↑↓</span> to navigate</span>
                  <span className="flex items-center gap-1"><span className="px-1.5 py-0.5 rounded bg-white/10">Enter</span> to select</span>
                  <span className="flex items-center gap-1"><span className="px-1.5 py-0.5 rounded bg-white/10">Esc</span> to close</span>
               </div>
               <div className="flex items-center gap-2 text-[9px] font-black text-neon uppercase tracking-widest italic">
                  Neural Search Active
               </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
