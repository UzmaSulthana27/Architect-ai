import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Search, 
  Folder, 
  FileCode, 
  History, 
  ChevronDown, 
  ChevronRight,
  Zap,
  MoreVertical,
  Database,
  Server,
  Atom,
  Clock,
  MoreHorizontal,
  X
} from 'lucide-react';
import useStore from '../../store/useStore';

const FolderItem = ({ name, icon: Icon, children, isOpen, onToggle }) => {
  return (
    <div className="space-y-1">
      <button 
        onClick={onToggle}
        className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-white/5 rounded-md transition-all group opacity-60 hover:opacity-100"
      >
        <div className="flex items-center gap-2 flex-1">
          {isOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          <Icon className="w-4 h-4 text-[#c0c1ff]" />
          <span className="text-[11px] font-bold uppercase tracking-widest">{name}</span>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden pl-4 space-y-1"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Sidebar() {
  const { files, activeFile, setActiveFile, sidebarOpen, toggleSidebar } = useStore();
  const [openFolders, setOpenFolders] = useState(['react-ui', 'node-api', 'database']);

  const toggleFolder = (folder) => {
    setOpenFolders(prev => 
      prev.includes(folder) ? prev.filter(f => f !== folder) : [...prev, folder]
    );
  };

  const getFilesByPath = (prefix) => files.filter(f => f.path.startsWith(prefix));

  if (!sidebarOpen) return null;

  return (
    <motion.aside
      initial={{ x: -288, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-[280px] bg-[#0d1117] border-r border-white/5 flex flex-col shrink-0 z-[46] h-full shadow-2xl md:shadow-none"
    >
      {/* Sidebar Header */}
      <div className="p-5 space-y-5 border-b border-white/5 bg-black/20">
        <div className="flex items-center justify-between md:block">
          <div className="space-y-1 flex-1">
            <input 
              type="text" 
              defaultValue="Untitled Project"
              className="w-full bg-transparent border-none outline-none text-base font-black uppercase tracking-tighter italic text-[#dae2fd] focus:text-neon transition-colors"
            />
            <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.2em] opacity-30">
              <span className="flex items-center gap-1"><div className="w-1 h-1 rounded-full bg-neon animate-pulse" /> Neural Sync Active</span>
            </div>
          </div>
          <button onClick={toggleSidebar} className="md:hidden p-2 text-white/20 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin">
        {/* Explorer */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2 mb-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30">Neural Structure</span>
            <button className="p-1 hover:bg-white/10 rounded-md transition-colors text-[#c0c1ff]">
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2">
            <FolderItem 
              name="react-ui" 
              icon={Atom} 
              isOpen={openFolders.includes('react-ui')}
              onToggle={() => toggleFolder('react-ui')}
            >
              {getFilesByPath('react-ui').map(file => (
                <button
                  key={file.path}
                  onClick={() => setActiveFile(file.path)}
                  className={`
                    w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all text-left
                    ${activeFile === file.path ? 'bg-[#c0c1ff]/10 text-[#c0c1ff] border border-[#c0c1ff]/20' : 'text-[#dae2fd]/50 hover:text-[#dae2fd] hover:bg-white/5'}
                  `}
                >
                  <FileCode className="w-3.5 h-3.5 opacity-60" />
                  <span className="truncate">{file.path.split('/').pop()}</span>
                </button>
              ))}
            </FolderItem>

            <FolderItem 
              name="node-api" 
              icon={Server} 
              isOpen={openFolders.includes('node-api')}
              onToggle={() => toggleFolder('node-api')}
            >
              {getFilesByPath('node-api').map(file => (
                <button
                  key={file.path}
                  onClick={() => setActiveFile(file.path)}
                  className={`
                    w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all text-left
                    ${activeFile === file.path ? 'bg-[#c0c1ff]/10 text-[#c0c1ff] border border-[#c0c1ff]/20' : 'text-[#dae2fd]/50 hover:text-[#dae2fd] hover:bg-white/5'}
                  `}
                >
                  <FileCode className="w-3.5 h-3.5 opacity-60" />
                  <span className="truncate">{file.path.split('/').pop()}</span>
                </button>
              ))}
            </FolderItem>

            <FolderItem 
              name="database" 
              icon={Database} 
              isOpen={openFolders.includes('database')}
              onToggle={() => toggleFolder('database')}
            >
              {getFilesByPath('database').map(file => (
                <button
                  key={file.path}
                  onClick={() => setActiveFile(file.path)}
                  className={`
                    w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all text-left
                    ${activeFile === file.path ? 'bg-[#c0c1ff]/10 text-[#c0c1ff] border border-[#c0c1ff]/20' : 'text-[#dae2fd]/50 hover:text-[#dae2fd] hover:bg-white/5'}
                  `}
                >
                  <FileCode className="w-3.5 h-3.5 opacity-60" />
                  <span className="truncate">{file.path.split('/').pop()}</span>
                </button>
              ))}
            </FolderItem>
          </div>
        </div>

        {/* Recent Synthesis */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <Clock className="w-3 h-3 text-[#dae2fd]/20" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30">Recent Synthesis</span>
          </div>
          <div className="space-y-3">
             {[
               { label: 'Auth System', time: '5m ago', status: 'success' },
               { label: 'Dashboard UI', time: '15m ago', status: 'success' },
               { label: 'API Routes', time: '1h ago', status: 'loading' }
             ].map((item, i) => (
               <div key={i} className="flex items-center gap-3 px-2 group cursor-pointer">
                 <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'success' ? 'bg-[#c7fff0]' : 'bg-[#c0c1ff] animate-pulse'}`} />
                 <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold text-[#dae2fd]/60 group-hover:text-[#dae2fd] transition-colors truncate">{item.label}</p>
                    <p className="text-[8px] font-black uppercase tracking-tighter opacity-20">{item.time}</p>
                 </div>
                 <MoreHorizontal className="w-3 h-3 text-[#dae2fd]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-white/5">
        <button className="w-full py-4 bg-[#c0c1ff]/5 hover:bg-[#c0c1ff]/10 border border-[#c0c1ff]/20 rounded-2xl flex items-center justify-center gap-3 text-[#c0c1ff] transition-all group">
          <Zap className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">New Neural Thread</span>
        </button>
      </div>
    </motion.aside>
  );
}
