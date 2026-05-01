import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MoreVertical, 
  ExternalLink, 
  Copy, 
  Trash2, 
  Star, 
  Code,
  Layers,
  Database,
  Calendar,
  ChevronRight,
  Share2,
  FileDown
} from 'lucide-react';
import useStore from '../../store/useStore';
import { useNavigate } from 'react-router-dom';

export default function BlueprintCard({ blueprint, index }) {
  const { loadBlueprint, removeBlueprint, addBlueprint, toggleFavorite, addLog } = useStore();
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    loadBlueprint(blueprint);
    addLog(`Neural sync established: "${blueprint.title}"`, 'info');
    navigate('/atelier');
  };

  const handleClone = () => {
    const clone = {
      ...blueprint,
      id: crypto.randomUUID(),
      title: `${blueprint.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    addBlueprint(clone);
    addLog(`Blueprint "${blueprint.title}" successfully cloned.`, 'success');
  };

  const handleDelete = () => {
    if (confirm(`Deprovision "${blueprint.title}" from the Vault? This cannot be undone.`)) {
      removeBlueprint(blueprint.id);
      addLog(`Blueprint "${blueprint.title}" purged.`, 'warning');
    }
  };

  const layers = {
    react: blueprint.files.some(f => f.path.startsWith('react-ui')),
    node: blueprint.files.some(f => f.path.startsWith('node-api')),
    sql: blueprint.files.some(f => f.path.startsWith('database'))
  };

  const relativeTime = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    return `${diff} days ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group relative glass-panel bg-[#171f33]/40 border-white/5 rounded-3xl overflow-hidden hover:bg-[#171f33]/60 hover:border-[#c0c1ff]/20 transition-all duration-500"
    >
      {/* Visual Header / Thumbnail */}
      <div className="relative h-44 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br transition-transform duration-1000 group-hover:scale-110 ${
          layers.react && layers.node && layers.sql 
            ? 'from-[#c0c1ff]/40 via-[#c7fff0]/20 to-[#c0c1ff]/40' 
            : layers.react ? 'from-[#c0c1ff]/20 to-[#c0c1ff]/5' : 'from-slate-800 to-slate-900'
        }`} />
        
        {/* Holographic lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-px h-full bg-white" />
          <div className="absolute top-1/2 left-0 w-full h-px bg-white" />
          <div className="absolute top-0 right-1/4 w-px h-full bg-white" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex gap-4">
            {layers.react && <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#c0c1ff]"><Code className="w-5 h-5" /></motion.div>}
            {layers.node && <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 3, delay: 0.5 }} className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#c7fff0]"><Layers className="w-5 h-5" /></motion.div>}
            {layers.sql && <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 3, delay: 1 }} className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-blue-400"><Database className="w-5 h-5" /></motion.div>}
          </div>
        </div>

        <div className="absolute top-4 right-4 flex gap-2">
          <button 
            onClick={() => toggleFavorite(blueprint.id)}
            className={`p-2 rounded-xl backdrop-blur-md border transition-all ${blueprint.favorite ? 'bg-yellow-400/20 border-yellow-400/30 text-yellow-400' : 'bg-white/5 border-white/10 text-white/20 hover:text-white'}`}
          >
            <Star className={`w-3.5 h-3.5 ${blueprint.favorite ? 'fill-yellow-400' : ''}`} />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-sm font-black text-white hover:text-[#c0c1ff] transition-colors cursor-pointer" onClick={handleOpen}>
            {blueprint.title}
          </h3>
          <div className="relative">
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 hover:bg-white/5 rounded-lg text-white/20 hover:text-white transition-all"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            
            <AnimatePresence>
              {showMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute right-0 top-full mt-2 w-48 glass-panel bg-[#171f33] border-white/10 rounded-2xl p-2 z-20 shadow-2xl"
                  >
                    <button onClick={handleClone} className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#dae2fd]/60 hover:text-white transition-all">
                      <Copy className="w-3.5 h-3.5" /> Clone Component
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#dae2fd]/60 hover:text-white transition-all">
                      <Share2 className="w-3.5 h-3.5" /> Share Access
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#dae2fd]/60 hover:text-white transition-all">
                      <FileDown className="w-3.5 h-3.5" /> Export Zip
                    </button>
                    <div className="h-px bg-white/5 my-2" />
                    <button onClick={handleDelete} className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-red-500/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-red-400 transition-all">
                      <Trash2 className="w-3.5 h-3.5" /> Purge Archive
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        <p className="text-[11px] text-[#dae2fd]/40 line-clamp-2 mb-6 leading-relaxed">
          {blueprint.description || 'No neural description provided for this architecture.'}
        </p>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/5">
            <div className={`w-1.5 h-1.5 rounded-full ${layers.react ? 'bg-[#c0c1ff]' : 'bg-slate-700'}`} />
            <span className="text-[8px] font-black uppercase tracking-widest text-[#dae2fd]/30">UI</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/5">
            <div className={`w-1.5 h-1.5 rounded-full ${layers.node ? 'bg-[#c7fff0]' : 'bg-slate-700'}`} />
            <span className="text-[8px] font-black uppercase tracking-widest text-[#dae2fd]/30">API</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/5">
            <div className={`w-1.5 h-1.5 rounded-full ${layers.sql ? 'bg-blue-400' : 'bg-slate-700'}`} />
            <span className="text-[8px] font-black uppercase tracking-widest text-[#dae2fd]/30">SQL</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-white/5">
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-[#dae2fd]/20">
               <Calendar className="w-3 h-3" />
               {relativeTime(blueprint.createdAt)}
             </div>
             <div className="w-1 h-1 rounded-full bg-white/5" />
             <div className="text-[9px] font-black uppercase tracking-widest text-[#dae2fd]/20">
               {blueprint.stats.fileCount} Nodes
             </div>
          </div>
          
          <button 
            onClick={handleOpen}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#c0c1ff] hover:gap-3 transition-all"
          >
            Deploy <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
