import React, { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { motion } from 'motion/react';
import useStore from '../../store/useStore';

export default function CodeEditor() {
  const { files, activeFile, setFiles, activeTab, setActiveTab } = useStore();
  const editorRef = useRef(null);
  
  const currentFile = files.find(f => f.path === activeFile) || files[0];

  const handleEditorChange = (value) => {
    const newFiles = files.map(f => 
      f.path === activeFile ? { ...f, content: value } : f
    );
    setFiles(newFiles);
  };

  const tabs = [
    { id: 'react', label: 'React UI', icon: '⚛️' },
    { id: 'node', label: 'Node API', icon: '🟢' },
    { id: 'sql', label: 'SQL Schema', icon: '🗄️' }
  ];

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#0d1117] relative">
      {/* Editor Tab Bar */}
      <div className="h-9 flex items-center justify-between px-2 bg-black/20 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-0.5 h-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative h-full px-4 flex items-center gap-2 transition-all group
                ${activeTab === tab.id ? 'bg-[#0d1117] text-[#c0c1ff]' : 'text-white/20 hover:text-white/40'}
              `}
            >
              <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
              
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="active-tab-glow"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c0c1ff]"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Breadcrumb / File Path */}
      <div className="h-7 flex items-center px-4 bg-white/[0.02] border-b border-white/5">
        <span className="text-[9px] font-medium text-[#dae2fd]/20 uppercase tracking-[0.2em] truncate">
          {currentFile.path}
        </span>
      </div>

      {/* Editor Core */}
      <div className="flex-1 relative">
        <Editor
          height="100%"
          defaultLanguage={currentFile?.language || 'javascript'}
          theme="vs-dark"
          value={currentFile?.content}
          onChange={handleEditorChange}
          onMount={(editor, monaco) => {
            editorRef.current = editor;
            monaco.editor.defineTheme('neural-os', {
              base: 'vs-dark',
              inherit: true,
              rules: [
                { token: 'comment', foreground: '6272a4', fontStyle: 'italic' },
                { token: 'keyword', foreground: 'c0c1ff' },
                { token: 'string', foreground: 'c7fff0' },
                { token: 'function', foreground: 'dae2fd' },
              ],
              colors: {
                'editor.background': '#0d111700',
                'editor.lineHighlightBackground': '#dae2fd05',
                'editor.selectionBackground': '#c0c1ff30',
                'editorLineNumber.foreground': '#dae2fd20',
                'editorLineNumber.activeForeground': '#c0c1ff',
                'editorCursor.foreground': '#c0c1ff',
              }
            });
            monaco.editor.setTheme('neural-os');
          }}
          options={{
            fontSize: 14,
            fontFamily: 'JetBrains Mono',
            minimap: { enabled: true, side: 'right', scale: 0.8 },
            scrollBeyondLastLine: false,
            padding: { top: 24, bottom: 24 },
            lineNumbers: 'on',
            renderLineHighlight: 'all',
            cursorBlinking: 'smooth',
            smoothScrolling: true,
            fontLigatures: true,
            lineHeight: 1.8,
            scrollbar: {
              verticalScrollbarSize: 4,
              horizontalScrollbarSize: 4,
            }
          }}
        />

        {/* Editor Overlay Info */}
        <div className="absolute top-4 right-20 pointer-events-none">
          <div className="glass-panel text-[8px] font-black uppercase tracking-widest px-3 py-1 opacity-20">
            {currentFile.language === 'javascript' ? 'ESM' : 'Standard'}
          </div>
        </div>
      </div>
    </div>
  );
}
