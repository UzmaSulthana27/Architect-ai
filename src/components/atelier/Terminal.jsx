import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Terminal as TerminalIcon, 
  Bug, 
  AlertCircle, 
  ChevronUp, 
  Trash2,
  Minimize2,
  Maximize2
} from 'lucide-react';
import useStore from '../../store/useStore';

export default function Terminal() {
  const { terminalOpen, toggleTerminal, consoleLogs, clearLogs } = useStore();
  const [activeTab, setActiveTab] = useState('output');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [consoleLogs, activeTab]);

  if (!terminalOpen) return (
    <button 
      onClick={toggleTerminal}
      className="fixed bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 glass-panel rounded-full sm:rounded-2xl border-white/10 hover:border-neon/30 transition-all z-40 bg-black/80 group active:scale-95 shadow-2xl"
    >
      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-neon animate-pulse shadow-[0_0_8px_#c0c1ff]" />
      <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#dae2fd]/80">Terminal</span>
      <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neon group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );

  return (
    <motion.div
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 300, opacity: 0 }}
      className="h-[250px] sm:h-[300px] bg-[#0d1117] border-t border-white/10 flex flex-col z-40 relative shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
    >
      {/* Terminal Header */}
      <div className="h-9 sm:h-10 bg-black/40 border-b border-white/5 flex items-center justify-between px-2 sm:px-4 shrink-0">
        <div className="flex items-center gap-0.5 sm:gap-1 h-full">
          {[
            { id: 'output', label: 'Output', icon: TerminalIcon },
            { id: 'console', label: 'Console', icon: Bug },
            { id: 'problems', label: 'Problems', icon: AlertCircle }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-3 sm:px-6 h-full flex items-center gap-1.5 sm:gap-2 transition-all relative
                ${activeTab === tab.id ? 'text-[#c0c1ff]' : 'text-[#dae2fd]/30 hover:text-[#dae2fd]/60'}
              `}
            >
              <tab.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div layoutId="terminal-tab" className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#c0c1ff]" />
              )}
            </button>
          ))}
        </div>


        <div className="flex items-center gap-2">
          <button 
            onClick={clearLogs}
            className="p-1.5 hover:bg-white/5 rounded-md text-[#dae2fd]/20 hover:text-[#dae2fd]"
            title="Clear Terminal"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button onClick={toggleTerminal} className="p-1.5 hover:bg-white/5 rounded-md text-[#dae2fd]/20 hover:text-[#dae2fd]">
            <Minimize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 font-mono text-[11px] leading-relaxed scrollbar-thin overflow-x-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="space-y-1"
          >
            {activeTab === 'output' && (
              <>
                {consoleLogs.map((log, i) => (
                  <div key={i} className="flex gap-4 group">
                    <span className="text-[#dae2fd]/20 select-none shrink-0">{log.timestamp}</span>
                    <span className={`
                      flex-1 
                      ${log.type === 'success' ? 'text-[#c7fff0]' : 
                        log.type === 'error' ? 'text-red-400' : 
                        log.type === 'warning' ? 'text-yellow-400' : 
                        'text-[#dae2fd]/60'}
                    `}>
                      {log.type === 'success' && '✓ '}
                      {log.type === 'error' && '✖ '}
                      {log.message}
                    </span>
                  </div>
                ))}
              </>
            )}
            {activeTab === 'console' && (
              <div className="text-[#dae2fd]/30 italic uppercase tracking-widest text-[9px] text-center pt-12">
                Listening for neural interface logs...
              </div>
            )}
            {activeTab === 'problems' && (
              <div className="flex flex-col items-center justify-center pt-12 text-[#c7fff0]/40">
                 <Trash2 className="w-12 h-12 mb-4 opacity-10" />
                 <span className="text-[10px] font-black uppercase tracking-widest">No issues detected in synthesis</span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
