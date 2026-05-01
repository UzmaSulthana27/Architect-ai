import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  X, 
  Zap
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import useStore from '../../store/useStore';
import { synthesizeManifest } from '../../utils/aiService';
import { TEMPLATES } from '../../constants/templates';

export default function PromptBar() {
  const [prompt, setPrompt] = useState('');
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    isGenerating, 
    setGenerating, 
    addLog, 
    setGenerationProgress,
    setFiles,
    setActiveFile,
    setActiveTab
  } = useStore();
  const textareaRef = useRef(null);

  const suggestions = [
    "Build a user authentication system",
    "Create a real-time chat application",
    "Design a product catalog schema",
    "Build a dashboard with charts"
  ];

  // Auto-trigger from URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    const templateId = params.get('templateId');

    if (q) {
      setPrompt(q);
      // We need a small delay to let the state settle before triggering
      const timer = setTimeout(() => handleSynthesize(q), 500);
      // Clear URL params
      navigate('/atelier', { replace: true });
      return () => clearTimeout(timer);
    }

    if (templateId) {
      const template = TEMPLATES.find(t => t.id === templateId);
      if (template) {
        setPrompt(template.prompt);
        const timer = setTimeout(() => handleSynthesize(template.prompt), 500);
        navigate('/atelier', { replace: true });
        return () => clearTimeout(timer);
      }
    }
  }, [location.search]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSuggestionIndex((prev) => (prev + 1) % suggestions.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [prompt]);

  const handleSynthesize = async (overridePrompt) => {
    const activePrompt = overridePrompt || prompt;
    if (!activePrompt.trim() || isGenerating) return;

    setGenerating(true);
    setGenerationProgress(10);
    addLog(`Neural synthesis requested: "${activePrompt}"`, 'info');
    if (!overridePrompt) setPrompt(''); // Clear if manual
    
    try {
      addLog('Connecting to Neural Core...', 'info');
      setGenerationProgress(25);
      
      const result = await synthesizeManifest(activePrompt);
      
      setGenerationProgress(60);
      addLog('Manifest received. Decomposing layers...', 'info');

      const allFiles = [
        ...(result.layers.react || []),
        ...(result.layers.node || []),
        ...(result.layers.sql || [])
      ].map(f => ({ ...f })); // Clone objects

      if (allFiles.length > 0) {
        setFiles(allFiles);
        
        // Auto-select first React component if available
        const firstReact = (result.layers.react || [])[0];
        if (firstReact) {
          setActiveFile(firstReact.path);
          setActiveTab('react');
        } else {
          setActiveFile(allFiles[0].path);
        }

        setGenerationProgress(100);
        addLog(`✓ System synthesis complete! Generated ${allFiles.length} nodes.`, 'success');
        addLog(`Architecture: ${result.architecture?.frontend || 'React UI'}`, 'success');
      } else {
        throw new Error("Neural synthesis returned empty manifest.");
      }

    } catch (error) {
      console.error(error);
      addLog(`✗ Neural synthesis failed: ${error.message}`, 'error');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="w-full shrink-0 z-50 p-3 sm:p-6 bg-black/40 border-t border-white/5">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-4xl mx-auto relative group"
      >
        <div className="relative glass-panel rounded-xl sm:rounded-[1.5rem] p-1 sm:p-1.5 bg-[#171f33]/60 border-white/10 flex flex-col gap-1 overflow-hidden">
          {/* Header/Status when generating */}
          <AnimatePresence>
            {isGenerating && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-4 sm:px-6 py-2 flex items-center justify-between border-b border-white/5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#c0c1ff] animate-ping" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#c0c1ff]/40" />
                  </div>
                  <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-[#c0c1ff]">Neural Engine Synthesis</span>
                </div>
                <span className="text-[8px] sm:text-[10px] font-black tabular-nums text-[#c0c1ff] hidden xs:inline">4.2 TFLOPS</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-end gap-1 sm:gap-3 p-1 sm:p-2">
            <div className={`hidden xs:flex flex-none p-2 sm:p-3 text-[#c0c1ff] ${isGenerating ? 'animate-pulse' : ''}`}>
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>

            <textarea
              ref={textareaRef}
              rows={1}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSynthesize();
                }
              }}
              placeholder={isGenerating ? "Synthesizing..." : "Describe architecture..."}
              disabled={isGenerating}
              className="flex-1 bg-transparent py-2 sm:py-3 px-2 text-sm sm:text-base font-medium placeholder:text-[#dae2fd]/20 focus:outline-none text-[#dae2fd] resize-none max-h-[120px] sm:max-h-[150px] scrollbar-none"
            />

            <div className="flex items-center gap-1 sm:gap-2 pr-1 sm:pr-2 pb-1">
              <AnimatePresence>
                {prompt && !isGenerating && (
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    onClick={() => setPrompt('')}
                    className="p-1.5 sm:p-2 hover:bg-white/5 rounded-full text-[#dae2fd]/30 transition-colors"
                  >
                    <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </motion.button>
                )}
              </AnimatePresence>

              <button
                disabled={!prompt.trim() || isGenerating}
                onClick={handleSynthesize}
                className={`
                  p-3 sm:p-4 rounded-xl sm:rounded-2xl flex items-center gap-3 transition-all
                  ${prompt.trim() && !isGenerating 
                    ? 'bg-[#c0c1ff] text-[#0d1117] shadow-[0_0_20px_rgba(192,193,255,0.4)] hover:scale-105' 
                    : 'bg-white/5 text-[#dae2fd]/20 grayscale cursor-not-allowed'}
                `}
              >
                {isGenerating ? (
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                ) : (
                  <>
                    <span className="text-xs font-black uppercase tracking-widest hidden sm:block">Synthesize</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>


        {/* Prompt Suggestions */}
        <AnimatePresence>
          {!prompt && !isGenerating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-wrap items-center justify-center gap-2 mt-3"
            >
              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/30 mr-2">Suggestions:</span>
              {[
                "Neural Dashboard",
                "Chat Protocol",
                "Data Matrix"
              ].map(suggest => (
                <button
                  key={suggest}
                  onClick={() => setPrompt(suggest)}
                  className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[8px] font-black uppercase tracking-widest text-[#dae2fd]/30 hover:text-neon hover:border-neon/30 transition-all"
                >
                  {suggest}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
