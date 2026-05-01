import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Menu, 
  User, 
  Bell, 
  Settings, 
  ChevronRight,
  Share2,
  Box,
  Cloud,
  Cpu,
  Save,
  Archive,
  Code,
  Eye
} from 'lucide-react';
import Sidebar from '../components/atelier/Sidebar';
import CodeEditor from '../components/atelier/CodeEditor';
import LivePreview from '../components/atelier/LivePreview';
import Terminal from '../components/atelier/Terminal';
import PromptBar from '../components/atelier/PromptBar';
import SaveBlueprintModal from '../components/atelier/SaveBlueprintModal';
import useStore from '../store/useStore';
import { Link, useLocation } from 'react-router-dom';

const WorkspaceToolbar = ({ onSave, activeView, setActiveView }) => {
  const { files, isGenerating } = useStore();
  
  return (
    <div className="h-10 border-b border-white/5 bg-black/20 flex items-center justify-between px-4 shrink-0 z-40 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2">
           <Box className="w-3.5 h-3.5 text-neon" />
           <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Active Architecture</span>
        </div>
        <div className="hidden sm:block h-3 w-px bg-white/10" />
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest truncate max-w-[120px] sm:max-w-[200px]">Untitled Project</span>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-[8px] font-black uppercase tracking-widest text-neon/60">
             <div className="w-1 h-1 rounded-full bg-neon animate-pulse" />
             <span className="hidden xs:inline">Synced</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* View Toggle for Mobile */}
        <div className="flex sm:hidden items-center bg-white/5 rounded-lg p-0.5 border border-white/5">
          <button 
            onClick={() => setActiveView('code')}
            className={`p-1 rounded-md transition-all ${activeView === 'code' ? 'bg-white/10 text-neon' : 'text-white/20'}`}
          >
            <Code className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => setActiveView('preview')}
            className={`p-1 rounded-md transition-all ${activeView === 'preview' ? 'bg-white/10 text-neon' : 'text-white/20'}`}
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="hidden md:flex items-center gap-4 mr-2">
           <div className="flex flex-col items-end">
              <span className="text-[8px] font-bold uppercase tracking-widest opacity-30 leading-none">Complexity</span>
              <span className="text-[9px] font-black text-white/60">High (12 Nodes)</span>
           </div>
        </div>
        <button 
          onClick={onSave}
          className="flex items-center gap-2 px-2 sm:px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/60 hover:text-white hover:bg-white/10 hover:border-neon/30 transition-all group"
        >
          <Save className="w-3 h-3 group-hover:scale-110 transition-transform" />
          <span className="text-[9px] font-black uppercase tracking-widest hidden xs:inline">Store</span>
        </button>
      </div>
    </div>
  );
};

export default function Atelier() {
  const { sidebarOpen, toggleSidebar, isGenerating, generationProgress } = useStore();
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [activeView, setActiveView] = useState('code'); // 'code' or 'preview' (mobile only)

  return (
    <div className="flex flex-col h-full bg-[#0b1326] text-[#dae2fd] overflow-hidden selection:bg-[#c0c1ff]/30 selection:text-[#c0c1ff] pt-0">
      <SaveBlueprintModal isOpen={isSaveModalOpen} onClose={() => setIsSaveModalOpen(false)} />
      
      {/* Loading Bar for Generation */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: generationProgress / 100 }}
            exit={{ opacity: 0 }}
            className="fixed top-16 left-0 right-0 h-1 bg-gradient-to-r from-neon to-[#c7fff0] z-[60] origin-left shadow-[0_0_15px_#c0c1ff]"
          />
        )}
      </AnimatePresence>

      <WorkspaceToolbar onSave={() => setIsSaveModalOpen(true)} activeView={activeView} setActiveView={setActiveView} />
      
      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile Sidebar Overlay */}
        <div className={`
          fixed inset-0 z-[45] bg-black/60 backdrop-blur-sm transition-opacity md:hidden
          ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `} onClick={toggleSidebar} />
        
        {/* Sidebar Container */}
        <div className={`
          absolute md:relative inset-y-0 left-0 z-[46] md:z-auto transition-transform duration-300 md:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:hidden'}
        `}>
          <Sidebar />
        </div>
        
        <main className="flex-1 flex flex-col min-w-0 relative">
          <div className="flex-1 flex flex-col sm:flex-row overflow-hidden relative">
            <div className={`flex-1 flex flex-col min-w-0 ${activeView === 'code' ? 'flex' : 'hidden sm:flex'}`}>
              <CodeEditor />
            </div>
            <div className={`flex-1 flex flex-col min-w-0 ${activeView === 'preview' ? 'flex' : 'hidden sm:flex'}`}>
              <LivePreview />
            </div>
          </div>
          <Terminal />
          <PromptBar />
        </main>

        {/* Global UI Elements */}
        {/* Toggle Sidebar Button when closed */}
        {!sidebarOpen && (
          <button 
            onClick={toggleSidebar}
            className="absolute top-1/2 -left-px -translate-y-1/2 py-8 px-1.5 glass-panel border-l-0 rounded-r-xl text-neon z-50 hover:bg-white/10 hover:px-2 transition-all group"
          >
            <ChevronRight className="w-3.5 h-3.5 group-hover:scale-125 transition-transform" />
          </button>
        )}
      </div>


      {/* Decorative Grid Lines */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10">
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-neon/20 to-transparent" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon/20 to-transparent" />
      </div>
    </div>
  );
}
