import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Save, 
  Tag, 
  Lock, 
  Globe,
  Plus
} from 'lucide-react';
import useStore from '../../store/useStore';

export default function SaveBlueprintModal({ isOpen, onClose }) {
  const { files, addBlueprint, addLog } = useStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [visibility, setVisibility] = useState('private');

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && newTag.trim()) {
      if (!tags.includes(newTag.trim().toLowerCase())) {
        setTags([...tags, newTag.trim().toLowerCase()]);
      }
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleSave = () => {
    if (!title.trim()) return;

    const blueprint = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      tags,
      files: [...files],
      visibility,
      favorite: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      stats: {
        fileCount: files.length,
        linesOfCode: files.reduce((acc, f) => acc + f.content.split('\n').length, 0)
      }
    };

    addBlueprint(blueprint);
    addLog(`Blueprint "${title}" archived in the Vault.`, 'success');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#0b1326]/80 backdrop-blur-sm"
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-xl glass-panel bg-[#171f33] border-white/10 rounded-[2.5rem] overflow-hidden"
      >
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-[#c0c1ff]/10 flex items-center justify-center border border-[#c0c1ff]/20">
               <Save className="w-6 h-6 text-[#c0c1ff]" />
             </div>
             <div>
               <h3 className="text-xl font-bold text-white">Save to Vault</h3>
               <p className="text-xs text-[#dae2fd]/40 uppercase tracking-widest font-black">Archive your architecture</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl text-[#dae2fd]/30 transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-10 space-y-8">
          {/* Title */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#dae2fd]/60 block ml-1">Blueprint Title</label>
            <input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. E-commerce Micro-system"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-[#c0c1ff]/50 transition-all"
            />
          </div>

          {/* Description */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#dae2fd]/60 block ml-1">Description</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the neural logic of this system..."
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-[#c0c1ff]/50 resize-none transition-all"
            />
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#dae2fd]/60 block ml-1">Neural Tags</label>
            <div className="flex flex-wrap gap-2 p-1.5 bg-white/5 rounded-2xl border border-white/10">
              {tags.map(tag => (
                <span key={tag} className="flex items-center gap-2 pl-3 pr-2 py-1.5 bg-[#c0c1ff]/10 border border-[#c0c1ff]/20 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#c0c1ff]">
                  {tag}
                  <button onClick={() => removeTag(tag)} className="p-0.5 hover:bg-white/10 rounded-md transition-all">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <input 
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder={tags.length === 0 ? "Add tags (Enter)..." : "+"}
                className="flex-1 min-w-[120px] bg-transparent border-none focus:outline-none text-white text-xs px-3 py-1.5"
              />
            </div>
          </div>

          {/* Visibility */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setVisibility('private')}
              className={`flex items-center justify-center gap-3 p-4 rounded-2xl border transition-all ${visibility === 'private' ? 'bg-[#c0c1ff]/10 border-[#c0c1ff]/30 text-[#c0c1ff]' : 'bg-white/5 border-white/10 text-[#dae2fd]/40 hover:bg-white/10'}`}
            >
              <Lock className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Private Archive</span>
            </button>
            <button 
              onClick={() => setVisibility('public')}
              className={`flex items-center justify-center gap-3 p-4 rounded-2xl border transition-all ${visibility === 'public' ? 'bg-[#c7fff0]/10 border-[#c7fff0]/30 text-[#c7fff0]' : 'bg-white/5 border-white/10 text-[#dae2fd]/40 hover:bg-white/10'}`}
            >
              <Globe className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Global Link</span>
            </button>
          </div>
        </div>

        <div className="p-8 bg-black/20 border-t border-white/5 flex items-center justify-end gap-4">
          <button 
            onClick={onClose}
            className="px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#dae2fd]/40 hover:text-white transition-all"
          >
            Cancel
          </button>
          <button 
            disabled={!title.trim()}
            onClick={handleSave}
            className={`px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${title.trim() ? 'bg-[#c0c1ff] text-[#0b1326] shadow-[0_0_20px_rgba(192,193,255,0.3)] hover:scale-105 active:scale-95' : 'bg-white/10 text-white/10 cursor-not-allowed'}`}
          >
            Save Blueprint
          </button>
        </div>
      </motion.div>
    </div>
  );
}
