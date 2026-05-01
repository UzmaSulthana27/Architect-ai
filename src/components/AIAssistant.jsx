import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import ReactMarkdown from 'react-markdown';
import { Send, User, Bot, Sparkles, Loader2, X, MessageSquare, Code, Bug, Zap, RotateCcw, ShieldCheck, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function AIAssistant({ 
  currentCode, 
  allOutputs, 
  onSuggestion, 
  explanationRequest, 
  debugRequest,
  onClose,
  activeTab
}) {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Architecture Assistant online. I have full context of your React UI, Node API, and SQL Schema. How can I facilitate your build today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);
  const chatRef = useRef(null);

  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (explanationRequest) {
      handleSpecialAction('explain', explanationRequest);
    }
  }, [explanationRequest]);

  useEffect(() => {
    if (debugRequest) {
      handleSpecialAction('debug', debugRequest);
    }
  }, [debugRequest]);

  const handleSpecialAction = async (type, payload) => {
    if (isLoading) return;
    
    let userPrompt = "";
    let systemInstruction = "";

    switch(type) {
      case 'explain':
        userPrompt = `Explain this code logic and its architectural role:\n\`\`\`jsx\n${payload}\n\`\`\``;
        systemInstruction = "Provide a deep technical explanation. Focus on performance, patterns used, and potential edge cases.";
        break;
      case 'debug':
        userPrompt = `I encountered an error:\n"${payload.error}"\nIn reference to this code snippet:\n\`\`\`jsx\n${payload.snippet}\n\`\`\``;
        systemInstruction = "Identify the root cause of this error. Provide a precise fix and explain why it happened. If possible, offer a version of the code that prevents this class of error entirely.";
        break;
      case 'optimize':
        userPrompt = `Optimize the current ${activeTab.toUpperCase()} code for maximum performance and readability.`;
        systemInstruction = "Analyze the code for bottlenecks, redundant renders, or inefficient logic. Provide an optimized refactor with comments explaining the improvements.";
        break;
      case 'review':
        userPrompt = `Perform a comprehensive architectural audit and security review of the current codebase.`;
        systemInstruction = "Check for: 1. Security vulnerabilities (exposed keys, XSS, injection). 2. Best practices. 3. Proper error handling. 4. Consistency across tiers. Provide a checklist of findings (✓ Pass, ⚠ Warning, ❌ Issue).";
        break;
      case 'refactor':
        userPrompt = `Refactor the current ${activeTab.toUpperCase()} code to follow cleaner architectural patterns.`;
        systemInstruction = "Decompose large components, extract logic into custom hooks or utility functions, and ensure proper TypeScript-like clarity (even if in JSX).";
        break;
    }

    setMessages(prev => [...prev, { role: "user", content: userPrompt }]);
    setIsLoading(true);

    try {
      const fullContext = `
        --- ARCHITECTURE CONTEXT ---
        REACT UI:
        ${allOutputs?.react}
        
        NODE API:
        ${allOutputs?.node}
        
        SQL SCHEMA:
        ${allOutputs?.sql}
        ---
        
        ACTIVE TAB: ${activeTab.toUpperCase()}
        ${systemInstruction}
      `;

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: fullContext + "\n\nUser Action: " + userPrompt,
          systemInstruction: "You are an expert system architect and senior full-stack developer. You are integrated into 'Architect AI', an advanced IDE. You provide deep technical insights, refactors, and debugging assistance. You are tracking the architectural state and will provide precise, high-performance technical guidance and code modifications.",
          history: history
        })
      });

      if (!response.ok) throw new Error('Neural link failure');
      
      const data = await response.json();
      const text = data.text;
      
      setMessages(prev => [...prev, { role: "assistant", content: text }]);
      setHistory(prev => [
        ...prev,
        { role: "user", parts: [{ text: fullContext + "\n\nUser Action: " + userPrompt }] },
        { role: "model", parts: [{ text }] }
      ]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: "assistant", content: "Neural link interrupted. Error synchronizing with local state." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      const contextUpdate = `[Internal System Context Update: Current active tab is ${activeTab.toUpperCase()}. Use the provided context to answer.]`;
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: contextUpdate + "\n\nUser: " + userMessage,
          systemInstruction: "You are an expert system architect and senior full-stack developer. You are integrated into 'Architect AI', an advanced IDE. You provide deep technical insights, refactors, and debugging assistance. You are tracking the architectural state and will provide precise, high-performance technical guidance and code modifications.",
          history: history
        })
      });

      if (!response.ok) throw new Error('Neural feedback failure');
      
      const data = await response.json();
      const text = data.text;
      
      setMessages(prev => [...prev, { role: "assistant", content: text }]);
      setHistory(prev => [
        ...prev,
        { role: "user", parts: [{ text: contextUpdate + "\n\nUser: " + userMessage }] },
        { role: "model", parts: [{ text }] }
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: "assistant", content: "Neural feedback failure. Please recalibrate (try again)." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full glass border-l border-black/10 dark:border-white/10 overflow-hidden relative">
      {/* Header */}
      <div className="p-4 border-b border-black/10 dark:border-white/10 flex items-center justify-between bg-black/5 dark:bg-white/5 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-neon animate-pulse shadow-[0_0_8px_var(--neon)]" />
          <h3 className="text-xs font-black tracking-widest uppercase opacity-80" style={{ color: 'var(--text-primary)' }}>Convergent Intelligence</h3>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-neon opacity-50" />
          {onClose && (
            <button onClick={onClose} className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg lg:hidden">
              <X className="w-4 h-4 opacity-40 hover:opacity-100" />
            </button>
          )}
        </div>
      </div>

      {/* Modes Toolbar */}
      <div className="px-2 py-2 border-b border-black/10 dark:border-white/10 flex items-center gap-1 overflow-x-auto scrollbar-hide bg-black/10 dark:bg-black/40">
        {[
          { label: 'Review', icon: ShieldCheck, type: 'review' },
          { label: 'Optimize', icon: Zap, type: 'optimize' },
          { label: 'Refactor', icon: RotateCcw, type: 'refactor' },
          { label: 'Expert Explain', icon: MessageSquare, type: 'explain', payload: currentCode },
        ].map((btn) => (
          <button
            key={btn.label}
            onClick={() => handleSpecialAction(btn.type, btn.payload || null)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest bg-white/5 hover:bg-neon/10 border border-white/5 hover:border-neon/30 text-primary hover:text-neon transition-all"
          >
            <btn.icon className="w-3 h-3" />
            <span className="hidden sm:inline">{btn.label}</span>
          </button>
        ))}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${msg.role === "user" ? "flex-reverse" : ""}`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              msg.role === "user" ? "bg-white/10 order-2" : "bg-neon/10 border border-neon/30 text-neon"
            }`}>
              {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            <div className={`flex flex-col gap-1 max-w-[85%] ${msg.role === "user" ? "items-end ml-auto" : ""}`}>
              <div className={`text-[10px] font-black tracking-tighter uppercase opacity-50 ${msg.role === "user" ? "text-right" : ""}`} style={{ color: 'var(--text-primary)' }}>
                {msg.role === "assistant" ? "System Advisor" : user?.email?.split('@')[0] || "User"}
              </div>
              <div className={`px-4 py-3 rounded-2xl text-[13px] leading-relaxed ${
                msg.role === "user" 
                  ? "bg-neon/10 text-white border border-neon/20 rounded-tr-none shadow-lg shadow-neon/10" 
                  : "bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-tl-none"
              }`}>
                <div className={`markdown-body prose ${msg.role === 'user' ? 'prose-invert' : isDark ? 'prose-invert' : ''} prose-xs max-w-none`}>
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
                
                {msg.role === "assistant" && i > 0 && (
                  <div className="mt-3 pt-3 border-t border-white/5 flex justify-end">
                    <button 
                      onClick={() => onSuggestion(msg.content)}
                      className="flex items-center gap-1.5 text-[9px] font-black tracking-widest uppercase text-neon hover:text-white transition-colors"
                    >
                      <Sparkles className="w-3 h-3" />
                      Sync to Blueprint
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-neon/10 border border-neon/30 text-neon flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-1 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl rounded-tl-none">
              <div className="w-1.5 h-1.5 bg-neon rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-1.5 h-1.5 bg-neon rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-1.5 h-1.5 bg-neon rounded-full animate-bounce" />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-black/10 dark:border-white/10 bg-black/5 dark:bg-black/20 shrink-0">
        <div className="relative group/input">
          <div className="absolute -inset-0.5 bg-neon opacity-0 group-focus-within/input:opacity-10 blur transition-all rounded-xl" />
          <input
            type="text"
            placeholder="Conversational intelligence active..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="w-full relative glass border border-black/10 dark:border-white/10 rounded-xl py-4 pl-4 pr-12 text-sm focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all placeholder:text-primary placeholder:opacity-30"
            style={{ color: 'var(--text-primary)' }}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-2 w-10 h-10 rounded-lg flex items-center justify-center bg-neon text-midnight hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:grayscale z-10"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
        <div className="flex items-center justify-between mt-3 px-1">
          <p className="text-[9px] opacity-30 font-black tracking-widest uppercase" style={{ color: 'var(--text-primary)' }}>Neural Link: Established</p>
          <div className="flex gap-2">
             <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
             <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse [animation-delay:0.2s]" />
          </div>
        </div>
      </div>
    </div>
  );
}
