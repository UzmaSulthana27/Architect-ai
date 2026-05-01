import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { 
  Layout, 
  ShoppingCart, 
  Monitor, 
  Lock, 
  BarChart3, 
  Zap, 
  Eye, 
  ExternalLink, 
  Search,
  Clock,
  GitFork,
  CheckCircle2,
  X
} from "lucide-react";

import { TEMPLATES } from "../constants/templates";

const CATEGORIES = [
  { id: "all", label: "All Blueprints", icon: <Zap className="w-4 h-4" /> },
  { id: "saas", label: "SaaS Dashboards", icon: <Layout className="w-4 h-4" /> },
  { id: "ecommerce", label: "E-commerce", icon: <ShoppingCart className="w-4 h-4" /> },
  { id: "landing", label: "Landing Pages", icon: <Monitor className="w-4 h-4" /> },
  { id: "auth", label: "Auth Flows", icon: <Lock className="w-4 h-4" /> },
  { id: "data", label: "Data Visualization", icon: <BarChart3 className="w-4 h-4" /> },
];

export default function Templates() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const navigate = useNavigate();

  const filteredTemplates = TEMPLATES.filter(template => {
    const matchesCategory = activeCategory === "all" || template.category === activeCategory;
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleUseTemplate = (template) => {
    navigate(`/atelier?templateId=${template.id}`);
  };

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide">
      <div className="pt-24 pb-20 px-6 min-h-screen">
        {/* Search & Filter Header */}
      <div className="max-w-7xl mx-auto mb-16 space-y-12">
        <div className="flex flex-col items-center text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-4 py-2 rounded-full border border-neon/30 text-neon text-[10px] font-black tracking-widest uppercase bg-neon/5"
          >
            Blueprints & Archetypes
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter" style={{ color: 'var(--text-primary)' }}>
            CHOOSE YOUR <br />
            <span className="text-neon text-glow">FOUNDATION</span>
          </h1>
          <p className="max-w-2xl text-lg opacity-60 leading-relaxed" style={{ color: 'var(--text-primary)' }}>
            Jumpstart your engineering cycle with production-grade templates. Every blueprint includes pre-configured state models and neural integration.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between glass-card p-4 rounded-[2rem] border-white/5">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeCategory === cat.id 
                    ? "bg-neon text-midnight shadow-lg shadow-neon/20" 
                    : "hover:bg-white/5 opacity-40 hover:opacity-100"
                }`}
                style={{ color: activeCategory === cat.id ? '' : 'var(--text-primary)' }}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neon opacity-40" />
            <input 
              type="text" 
              placeholder="SEARCH BLUEPRINTS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/20 dark:bg-black/40 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-xs font-bold tracking-widest uppercase focus:outline-none focus:border-neon/50 transition-all"
              style={{ color: 'var(--text-primary)' }}
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto">
        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredTemplates.map((template) => (
                <motion.div
                  key={template.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass-card flex flex-col group border-white/5 hover:border-neon/30 transition-all shadow-2xl overflow-hidden"
                >
                  {/* Visual Header */}
                  <div className="h-48 relative overflow-hidden bg-black/40">
                    {template.previewUrl ? (
                      <img 
                        src={template.previewUrl} 
                        alt={template.title}
                        className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Layout className="w-12 h-12 text-neon/20" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className={`px-2.5 py-1 rounded-md text-[8px] font-black uppercase tracking-tighter shadow-xl ${
                        template.complexity === "Advanced" ? "bg-red-500/80" :
                        template.complexity === "Intermediate" ? "bg-neon/80" : "bg-emerald-500/80"
                      } text-white`}>
                        {template.complexity}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex-1 space-y-6 text-left">
                    <div>
                      <h3 className="text-xl font-black tracking-tighter mb-2 group-hover:text-neon transition-colors" style={{ color: 'var(--text-primary)' }}>
                        {template.title}
                      </h3>
                      <p className="text-xs opacity-50 leading-relaxed font-medium" style={{ color: 'var(--text-primary)' }}>
                        {template.desc}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {template.stack?.map(s => (
                        <span key={s} className="px-2 py-0.5 rounded bg-black/20 text-[9px] font-bold tracking-widest border border-white/5" style={{ color: 'var(--text-primary)' }}>
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex flex-col items-start">
                        <span className="text-[8px] opacity-30 font-black tracking-widest uppercase">Efficiency</span>
                        <div className="flex items-center gap-1 text-emerald-400 text-[10px] font-black uppercase italic">
                          <Clock className="w-3 h-3" /> SAVES {template.timeSaved}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[8px] opacity-30 font-black tracking-widest uppercase">Reputation</span>
                        <div className="flex items-center gap-1 text-neon text-[10px] font-black uppercase italic">
                          <GitFork className="w-3 h-3" /> {template.forks} FORKS
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="px-8 py-6 bg-black/20 border-t border-white/5 grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setPreviewTemplate(template)}
                      className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-[10px] font-black tracking-widest uppercase transition-all"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      <Eye className="w-4 h-4" /> Preview
                    </button>
                    <button 
                      onClick={() => handleUseTemplate(template)}
                      className="flex items-center justify-center gap-2 py-3 rounded-xl bg-neon text-midnight text-[10px] font-black tracking-widest uppercase transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-neon/10"
                    >
                      <Zap className="w-4 h-4" /> Use This
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center space-y-6"
          >
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
              <Search className="w-8 h-8 text-white/20" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black uppercase tracking-tighter" style={{ color: 'var(--text-primary)' }}>No Blueprints Found</h3>
              <p className="text-sm opacity-40 max-w-xs mx-auto leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                Your search query or category filter yielded no architectural matches. Try expanding your parameters.
              </p>
            </div>
            <button 
              onClick={() => { setActiveCategory("all"); setSearchQuery(""); }}
              className="text-[10px] font-black uppercase tracking-widest text-neon hover:underline"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewTemplate && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewTemplate(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl h-[85vh] glass-card overflow-hidden border-white/10 shadow-[0_0_100px_rgba(168,85,247,0.3)]"
            >
              <div className="h-full flex flex-col">
                <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/40">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-neon/10 text-neon">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black tracking-tighter uppercase" style={{ color: 'var(--text-primary)' }}>Previewing: {previewTemplate.title}</h2>
                      <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.2em]" style={{ color: 'var(--text-primary)' }}>{previewTemplate.category.toUpperCase()} // SYNTHESIS ACTIVE</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setPreviewTemplate(null)}
                    className="p-3 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex-1 min-h-0 overflow-auto p-12 bg-black/20">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-full">
                    <div className="space-y-8">
                       <div className="aspect-video w-full rounded-3xl bg-black border border-white/5 overflow-hidden shadow-2xl relative">
                          {previewTemplate.previewUrl ? (
                            <img src={previewTemplate.previewUrl} className="w-full h-full object-cover opacity-50" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-neon/20 font-black text-4xl">NO PREVIEW</div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                          <div className="absolute bottom-6 left-6 flex items-center gap-2">
                             <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                             <span className="text-[10px] font-black tracking-widest text-emerald-400">READY FOR SYNTHESIS</span>
                          </div>
                       </div>
                       
                       <div className="grid grid-cols-2 gap-4">
                          <div className="glass-card p-6 border-white/5 bg-white/2">
                             <span className="text-[8px] font-black opacity-30 uppercase tracking-[0.2em]" style={{ color: 'var(--text-primary)' }}>Build Time Saved</span>
                             <p className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>{previewTemplate.timeSaved || "4h"}</p>
                          </div>
                          <div className="glass-card p-6 border-white/5 bg-white/2">
                             <span className="text-[8px] font-black opacity-30 uppercase tracking-[0.2em]" style={{ color: 'var(--text-primary)' }}>Popularity Score</span>
                             <p className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>{(Math.random() * 100).toFixed(1)}%</p>
                          </div>
                       </div>

                       <div className="p-6 rounded-2xl bg-white/2 border border-white/5">
                          <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-4">Neural Architecture Detail</h4>
                          <p className="text-sm opacity-60 leading-relaxed italic" style={{ color: 'var(--text-primary)' }}>
                            This blueprint includes optimized state handling for {previewTemplate.stack?.join(", ")}. 
                            The system will automatically configure all necessary library dependencies upon synthesis.
                          </p>
                       </div>
                    </div>

                     <div className="flex flex-col">
                        <div className="flex-1 glass-card p-8 bg-black/40 border-white/5 font-mono text-[11px] leading-relaxed text-neon overflow-auto scrollbar-hide">
                           <pre>
                             <code>{(previewTemplate.code?.react || previewTemplate.code) || `// Blueprint metadata loaded\n// Finalizing architecture string...\n\nexport default function ${previewTemplate.title.replace(/\s+/g, '')}() {\n  return (\n    <section className="manifested-layer">\n      <h1 className="neural-text">Integrated</h1>\n    </section>\n  );\n}`}</code>
                           </pre>
                        </div>
                       <div className="mt-8">
                          <button 
                            onClick={() => handleUseTemplate(previewTemplate)}
                            className="w-full py-6 rounded-2xl bg-neon text-midnight font-black tracking-[0.3em] uppercase shadow-2xl hover:scale-[1.01] active:scale-95 transition-all text-sm"
                          >
                            SYNTHESIZE TO ATELIER
                          </button>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
    </div>
  );
}
