import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Save, 
  Settings, 
  Share2, 
  Layers, 
  Code, 
  Eye, 
  Terminal as TerminalIcon,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import LivePreview from '../components/atelier/LivePreview';
import CodeEditor from '../components/atelier/CodeEditor';
import AIAssistant from '../components/AIAssistant';

export default function Atelier() {
  const [activeFile, setActiveFile] = useState('Main.jsx');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-full overflow-hidden bg-bg-dark">
      {/* Side Explorer */}
      <motion.aside
        animate={{ width: isSidebarOpen ? 260 : 0, opacity: isSidebarOpen ? 1 : 0 }}
        className="border-r border-white/5 bg-bg-primary overflow-hidden hidden md:block"
      >
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <span className="text-xs font-mono text-text-secondary uppercase tracking-widest">Workspace</span>
          <Layers size={14} className="text-text-secondary" />
        </div>
        <div className="p-2 space-y-1">
          {['Main.jsx', 'styles.css', 'Schema.json'].map(file => (
            <button
              key={file}
              onClick={() => setActiveFile(file)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
                activeFile === file ? 'bg-neon/10 text-neon border border-neon/20' : 'text-text-secondary hover:bg-white/5'
              }`}
            >
              <Code size={14} />
              {file}
            </button>
          ))}
        </div>
      </motion.aside>

      {/* Main workspace */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Toolbar */}
        <div className="h-12 border-b border-white/5 flex items-center justify-between px-4 bg-bg-primary/50">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1 hover:bg-white/5 rounded transition-colors text-text-secondary"
            >
              {isSidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </button>
            <div className="flex items-center gap-2 px-2 py-1 rounded bg-white/5 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-mono text-text-secondary">Neural Link: SYNCED</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neon text-bg-dark text-xs font-bold hover:shadow-[0_0_15px_rgba(30,230,210,0.3)] transition-all">
              <Play size={14} />
              Execute
            </button>
            <button className="p-1.5 text-text-secondary hover:text-white transition-colors">
              <Save size={18} />
            </button>
            <button className="p-1.5 text-text-secondary hover:text-white transition-colors">
              <Share2 size={18} />
            </button>
          </div>
        </div>

        {/* Editor & Preview Split */}
        <div className="flex-1 flex overflow-hidden">
           <div className="flex-1 border-r border-white/5 flex flex-col min-w-0">
             <div className="flex-1 bg-bg-dark">
                <CodeEditor fileName={activeFile} />
             </div>
             <div className="h-32 border-t border-white/5 bg-bg-primary/30 p-4 font-mono text-xs text-text-secondary overflow-y-auto">
                <div className="flex items-center gap-2 mb-2 text-neon/70">
                  <TerminalIcon size={12} />
                  <span>OUTPUT TERMINAL</span>
                </div>
                <p>[SYSTEM] Initializing neural workspace v2.0...</p>
                <p>[READY] Listening for code synthesis triggers.</p>
             </div>
           </div>
           
           <div className="hidden lg:block w-96 xl:w-[500px] flex flex-col bg-bg-primary/20">
              <div className="h-10 border-b border-white/5 flex items-center px-4 gap-2 text-xs font-mono text-text-secondary">
                <Eye size={14} />
                LIVE SYNTHESIS
              </div>
              <div className="flex-1">
                <LivePreview />
              </div>
           </div>
        </div>
      </main>

      {/* Floating AI Assistant Toggle */}
      <AIAssistant />
    </div>
  );
}
