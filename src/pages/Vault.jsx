import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  Plus, 
  Archive, 
  Clock, 
  Zap, 
  Database, 
  Star,
  Layers,
  Code,
  ArrowRight,
  ChevronDown,
  LayoutGrid
} from 'lucide-react';
import useStore from '../store/useStore';
import BlueprintCard from '../components/atelier/BlueprintCard';
import { useNavigate } from 'react-router-dom';

export default function Vault() {
  const { blueprints } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const navigate = useNavigate();

  const filteredBlueprints = useMemo(() => {
    return blueprints.filter(bp => {
      // Search
      const query = searchQuery.toLowerCase();
      const matchesSearch = bp.title.toLowerCase().includes(query) || 
                          (bp.description || '').toLowerCase().includes(query) ||
                          (bp.tags || []).some(t => t.includes(query));

      if (!matchesSearch) return false;

      // Tabs
      if (activeTab === 'favorites') return bp.favorite;
      if (activeTab === 'recent') {
         const sevenDaysAgo = new Date();
         sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
         return new Date(bp.createdAt) > sevenDaysAgo;
      }
      if (activeTab === 'react') return bp.files.some(f => f.path.startsWith('react-ui'));
      if (activeTab === 'fullstack') {
        const layers = new Set(bp.files.map(f => f.path.split('/')[0]));
        return layers.has('react-ui') && layers.has('node-api');
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'recent') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === 'alphabetical') return a.title.localeCompare(b.title);
      if (sortBy === 'files') return b.stats.fileCount - a.stats.fileCount;
      return 0;
    });
  }, [blueprints, searchQuery, activeTab, sortBy]);

  const stats = {
    total: blueprints.length,
    files: blueprints.reduce((acc, bp) => acc + bp.stats.fileCount, 0),
    loc: blueprints.reduce((acc, bp) => acc + bp.stats.linesOfCode, 0)
  };

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dae2fd] p-8 md:p-12 overflow-x-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center gap-3 text-[#c0c1ff] font-black uppercase tracking-[0.3em] text-[10px]"
            >
              <Archive className="w-4 h-4" />
              Neural Architecture Archive
            </motion.div>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase"
            >
              The <span className="text-white">Vault</span>
            </motion.h1>
          </div>

          <div className="flex flex-wrap gap-4">
            {[
              { label: 'Total Systems', val: stats.total, icon: Layers },
              { label: 'Neural Nodes', val: stats.files, icon: Zap },
              { label: 'Lines of Code', val: stats.loc.toLocaleString(), icon: Database }
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className="px-6 py-4 glass-panel bg-white/5 border-white/5 rounded-2xl flex items-center gap-4 min-w-[180px]"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#c0c1ff]">
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[8px] font-black uppercase tracking-widest text-[#dae2fd]/30 mb-1">{stat.label}</p>
                  <p className="text-xl font-black text-white">{stat.val}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </header>

        {/* Controls Section */}
        <section className="space-y-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 group w-full">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#dae2fd]/30 group-focus-within:text-[#c0c1ff] transition-colors" />
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Query neural sequences or tags..."
                className="w-full bg-white/5 border border-white/5 rounded-[2rem] pl-14 pr-6 py-5 text-sm focus:outline-none focus:border-[#c0c1ff]/30 focus:bg-white/10 transition-all font-medium"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <div className="relative flex-none">
                 <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white/5 border border-white/5 rounded-2xl pl-6 pr-12 py-5 text-[10px] font-black uppercase tracking-widest text-[#dae2fd]/60 focus:outline-none focus:border-[#c0c1ff]/30 cursor-pointer"
                 >
                   <option value="recent">Most Recent</option>
                   <option value="oldest">Oldest Entry</option>
                   <option value="alphabetical">A-Z Name</option>
                   <option value="files">Node Density</option>
                 </select>
                 <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#dae2fd]/30 pointer-events-none" />
              </div>
              <button 
                onClick={() => navigate('/atelier')}
                className="flex-1 lg:flex-none flex items-center justify-center gap-3 px-8 py-5 bg-[#c0c1ff] text-[#0b1326] rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(192,193,255,0.3)] hover:scale-105 active:scale-95 transition-all"
              >
                Assemble New <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-2 border-b border-white/5 pb-2">
            {[
              { id: 'all', label: 'All Archives', icon: LayoutGrid },
              { id: 'recent', label: 'Recent Synthesis', icon: Clock },
              { id: 'favorites', label: 'Top Tier', icon: Star },
              { id: 'fullstack', label: 'Full Systems', icon: Zap },
              { id: 'react', label: 'UI Layers', icon: Code }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${activeTab === tab.id ? 'text-[#c0c1ff]' : 'text-[#dae2fd]/40 hover:text-[#dae2fd]/60'}`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div layoutId="vault-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c0c1ff] shadow-[0_0_10px_#c0c1ff]" />
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Content Section */}
        <section className="pb-24">
          <AnimatePresence mode="popLayout">
            {filteredBlueprints.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {filteredBlueprints.map((bp, i) => (
                  <BlueprintCard key={bp.id} blueprint={bp} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center py-32 text-center"
              >
                <div className="w-24 h-24 rounded-[2rem] bg-white/5 border border-white/5 flex items-center justify-center text-white/10 mb-8">
                  <Archive className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-black text-white mb-2">Archive Cluster Empty</h3>
                <p className="text-[#dae2fd]/30 max-w-sm mb-10 leading-relaxed">No blueprints match your current neural query. Initiate a new synthesis to build your archive.</p>
                <button 
                  onClick={() => navigate('/atelier')}
                  className="flex items-center gap-3 px-8 py-4 glass-panel bg-white/5 border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#c0c1ff] hover:bg-[#c0c1ff]/10 hover:border-[#c0c1ff]/30 transition-all"
                >
                  Initiate New Assembly <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>

      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none -z-10 opacity-30">
        <div className="absolute top-1/4 -left-64 w-[500px] h-[500px] bg-[#c0c1ff]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-64 w-[500px] h-[500px] bg-[#c7fff0]/10 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}
