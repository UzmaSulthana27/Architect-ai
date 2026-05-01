import React, { useState, useEffect, useRef } from 'react';
import { 
  Smartphone, 
  Tablet, 
  Monitor, 
  RefreshCw, 
  ExternalLink, 
  Camera, 
  Bug,
  Layout,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import useStore from '../../store/useStore';
import { buildPreviewHTML } from '../../utils/codeBuilder';

export default function LivePreview() {
  const { files, viewMode, previewSize, setPreviewSize, addLog } = useStore();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [previewContent, setPreviewContent] = useState('');
  const [renderError, setRenderError] = useState(null);
  const iframeRef = useRef(null);

  useEffect(() => {
    try {
      setRenderError(null);
      const html = buildPreviewHTML(files);
      setPreviewContent(html);
    } catch (err) {
      setRenderError(err.message);
    }
  }, [files]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === 'console') {
        addLog(event.data.message, event.data.level);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [addLog]);

  const refreshPreview = () => {
    setIsRefreshing(true);
    const html = buildPreviewHTML(files);
    setPreviewContent('');
    setTimeout(() => {
      setPreviewContent(html);
      setIsRefreshing(false);
    }, 100);
  };

  const openInNewTab = () => {
    const html = buildPreviewHTML(files);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    // We don't revoke immediately to allow the page to load
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  };

  const getFrameStyles = () => {
    switch (previewSize) {
      case 'mobile': return { width: '375px', height: '667px', borderRadius: '3rem', border: '12px solid #1a1a1a' };
      case 'tablet': return { width: '768px', height: '1024px', borderRadius: '2rem', border: '16px solid #1a1a1a' };
      default: return { width: '100%', height: '100%', borderRadius: '0', border: 'none' };
    }
  };

  if (viewMode === 'code') return null;

  return (
    <div className={`flex flex-col bg-[#0b1326] min-w-0 transition-all duration-500 overflow-hidden ${viewMode === 'preview' ? 'flex-1' : 'w-1/2 border-l border-white/5 shadow-2xl z-10'}`}>
      {/* Preview Toolbar */}
      <div className="h-9 bg-black/40 border-b border-white/5 flex items-center justify-between px-3 shrink-0 relative z-20">
        <div className="flex items-center gap-3">
          <div className="flex bg-white/5 p-0.5 rounded-lg">
            {[
              { id: 'mobile', icon: Smartphone, label: '375x667' },
              { id: 'tablet', icon: Tablet, label: '768x1024' },
              { id: 'desktop', icon: Monitor, label: '100%' }
            ].map(size => (
              <button
                key={size.id}
                title={size.label}
                onClick={() => setPreviewSize(size.id)}
                className={`p-1.5 rounded-md transition-all ${previewSize === size.id ? 'bg-white/10 text-neon shadow-sm' : 'text-white/20 hover:text-white/40'}`}
              >
                <size.icon className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>
          <div className="h-3 w-px bg-white/10 mx-1" />
          <button 
            onClick={refreshPreview} 
            title="Hot Reload"
            className={`p-1.5 hover:bg-white/5 rounded-md text-white/20 transition-all ${isRefreshing ? 'animate-spin text-neon' : ''}`}
          >
             <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={openInNewTab}
            className="flex items-center gap-2 px-2.5 py-1 hover:bg-white/5 rounded-md text-white/30 transition-all group"
          >
            <ExternalLink className="w-3 h-3 group-hover:text-neon" />
            <span className="text-[9px] font-black uppercase tracking-widest">Popout</span>
          </button>
        </div>
      </div>

      {/* Preview Stage */}
      <div className="flex-1 flex items-center justify-center p-6 bg-black/40 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 0)', backgroundSize: '16px 16px' }} />
        
        {renderError ? (
          <div className="glass-panel p-8 max-w-lg bg-[#171f33]/90 border-red-500/20 flex flex-col items-center text-center">
            <AlertTriangle className="w-10 h-10 text-red-500 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Synthesis Breakdown</h3>
            <p className="text-xs text-red-400/70 mb-6 font-mono bg-red-500/5 p-4 rounded-xl border border-red-500/10">{renderError}</p>
            <button onClick={refreshPreview} className="px-6 py-2 bg-red-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Retry Render</button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={previewSize}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              style={getFrameStyles()}
              className="bg-white shadow-2xl relative overflow-hidden group"
            >
              {previewSize !== 'desktop' && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#1a1a1a] rounded-b-2xl z-20 flex items-center justify-center">
                   <div className="w-8 h-1 bg-white/20 rounded-full" />
                </div>
              )}
              
              <iframe 
                ref={iframeRef}
                srcDoc={previewContent}
                title="Neural Preview"
                className="w-full h-full border-none"
                sandbox="allow-scripts allow-same-origin allow-modals allow-forms"
              />

              {!previewContent && (
                <div className="absolute inset-0 bg-white flex flex-col items-center justify-center p-12 text-center pointer-events-none transition-opacity">
                   <div className="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center text-[#c0c1ff] mb-6 animate-pulse">
                     <Layout className="w-8 h-8" />
                   </div>
                   <h3 className="text-xl font-bold text-slate-900 mb-2">Neural Workspace Initialized</h3>
                   <p className="text-sm text-slate-400 leading-relaxed max-w-[240px]">Edit components to see live architectural changes.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
