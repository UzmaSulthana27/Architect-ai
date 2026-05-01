import { create } from 'zustand';

/**
 * @typedef {Object} File
 * @property {string} path
 * @property {string} content
 * @property {string} language
 */

/**
 * @typedef {Object} Blueprint
 * @property {string} id
 * @property {string} title
 * @property {File[]} files
 * @property {Date} createdAt
 */

const useStore = create((set) => ({
  // Workspace State
  files: [
    { path: 'react-ui/components/Dashboard.jsx', content: `export default function Dashboard() {\n  return (\n    <div className="p-8 bg-white min-h-screen">\n      <h1 className="text-4xl font-black text-slate-900 mb-8">Neural Dashboard</h1>\n      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">\n        <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-sm">\n          <p className="text-xs font-black uppercase text-slate-400 mb-1">Active Users</p>\n          <p className="text-3xl font-black text-slate-900">12.4k</p>\n        </div>\n        <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-sm">\n          <p className="text-xs font-black uppercase text-slate-400 mb-1">Neural Latency</p>\n          <p className="text-3xl font-black text-slate-900">14ms</p>\n        </div>\n        <div className="p-6 bg-[#c0c1ff]/10 rounded-3xl border border-[#c0c1ff]/20 shadow-sm">\n          <p className="text-xs font-black uppercase text-[#c0c1ff] mb-1">System Load</p>\n          <p className="text-3xl font-black text-[#c0c1ff]">4.2%</p>\n        </div>\n      </div>\n    </div>\n  );\n}`, language: 'javascript' },
    { path: 'node-api/routes/users.js', content: `const express = require('express');\nconst router = express.Router();\n\nrouter.get('/', (req, res) => {\n  res.json({ status: 'success', data: [] });\n});\n\nmodule.exports = router;`, language: 'javascript' },
    { path: 'database/schema.sql', content: `CREATE TABLE users (\n  id SERIAL PRIMARY KEY,\n  email VARCHAR(255) UNIQUE NOT NULL,\n  created_at TIMESTAMP DEFAULT NOW()\n);`, language: 'sql' }
  ],
  activeFile: 'react-ui/components/Dashboard.jsx',
  activeTab: 'react', // 'react' | 'node' | 'sql'
  
  // UI Panels
  sidebarOpen: true,
  terminalOpen: false,
  viewMode: 'split', // 'code' | 'split' | 'preview'
  previewSize: 'desktop', // 'mobile' | 'tablet' | 'desktop'
  
  // Generation Process
  isGenerating: false,
  generationProgress: 0,
  
  // System Monitor
  consoleLogs: [
    { type: 'info', message: 'Nexus OS Kernel Initialized', timestamp: new Date().toLocaleTimeString() },
    { type: 'success', message: 'Neural Link Stable', timestamp: new Date().toLocaleTimeString() }
  ],
  
  // Persistent Data
  blueprints: [],
  
  // Engine Room Configuration
  userSettings: {
    name: 'Architect',
    email: 'architect@neural.os',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=architect',
    joinedDate: '2024-12-15T10:00:00Z'
  },
  
  apiConfig: {
    model: 'gemini-3-flash-preview',
    rateLimit: 60,
    status: 'connected'
  },
  
  preferences: {
    framework: 'React',
    backend: 'Node.js',
    database: 'PostgreSQL',
    codeStyle: 'Functional',
    includeComments: true,
    theme: 'dark'
  },

  toasts: [],
  addToast: (message, type = 'info') => {
    const id = crypto.randomUUID();
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }]
    }));
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter(t => t.id !== id)
      }));
    }, 5000);
  },
  removeToast: (id) => set((state) => ({
    toasts: state.toasts.filter(t => t.id !== id)
  })),

  // Actions
  setFiles: (files) => set({ files }),
  addFile: (file) => set((state) => ({ files: [...state.files, file] })),
  setActiveFile: (activeFile) => set({ activeFile }),
  setActiveTab: (activeTab) => set({ activeTab }),
  setViewMode: (viewMode) => set({ viewMode }),
  setPreviewSize: (previewSize) => set({ previewSize }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleTerminal: () => set((state) => ({ terminalOpen: !state.terminalOpen })),
  
  setGenerating: (isGenerating) => set({ isGenerating }),
  setGenerationProgress: (progress) => set({ generationProgress: progress }),
  
  setUserSettings: (settings) => set((state) => ({ userSettings: { ...state.userSettings, ...settings } })),
  setApiConfig: (config) => set((state) => ({ apiConfig: { ...state.apiConfig, ...config } })),
  setPreferences: (prefs) => set((state) => ({ preferences: { ...state.preferences, ...prefs } })),
  
  addLog: (message, type = 'info') => set((state) => ({
    consoleLogs: [
      ...state.consoleLogs,
      { type, message, timestamp: new Date().toLocaleTimeString() }
    ].slice(-50)
  })),
  
  clearLogs: () => set({ consoleLogs: [] }),
  
  addBlueprint: (blueprint) => set((state) => ({
    blueprints: [blueprint, ...state.blueprints]
  })),

  loadBlueprint: (blueprint) => {
    set({
      files: blueprint.files,
      activeFile: blueprint.files[0]?.path || '',
      activeTab: blueprint.files[0]?.path.startsWith('react-ui') ? 'react' : 
                 blueprint.files[0]?.path.startsWith('node-api') ? 'node' : 'sql'
    });
  },
  
  removeBlueprint: (id) => set((state) => ({
    blueprints: state.blueprints.filter(b => b.id !== id)
  })),

  toggleFavorite: (id) => set((state) => ({
    blueprints: state.blueprints.map(b => b.id === id ? { ...b, favorite: !b.favorite } : b)
  }))
}));

export default useStore;
