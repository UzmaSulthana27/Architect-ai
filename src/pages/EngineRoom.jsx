import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Settings, 
  BarChart3, 
  Activity, 
  Key, 
  Cpu, 
  Zap, 
  Database, 
  ShieldCheck, 
  ChevronRight,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Edit2,
  Globe,
  Monitor,
  Layers,
  Code,
  HardDrive
} from 'lucide-react';
import useStore from '../store/useStore';
import Button from '../components/ui/Button';

export default function EngineRoom() {
  const { 
    userSettings, 
    setUserSettings, 
    apiConfig, 
    setApiConfig, 
    preferences, 
    setPreferences,
    blueprints,
    addLog
  } = useStore();

  const [activeTab, setActiveTab] = useState('neural-id');
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);

  // Derived Stats for UI
  const stats = useMemo(() => {
    return {
      totalBlueprints: blueprints.length,
      totalGenerations: 156, // Simulated for demo
      totalLinesOfCode: blueprints.reduce((acc, bp) => acc + bp.stats.linesOfCode, 45230),
      memberSince: '5 days ago'
    };
  }, [blueprints]);

  const testConnection = async () => {
    setTestingConnection(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (apiConfig.apiKey.length > 10) {
      setApiConfig({ status: 'connected' });
      addLog('Gemini API Connection: Verified. Neural link established.', 'success');
    } else {
      setApiConfig({ status: 'failed' });
      addLog('Gemini API Connection: Denied. Invalid sequence.', 'error');
    }
    setTestingConnection(false);
  };

  const tabs = [
    { id: 'neural-id', label: 'Neural ID', icon: User },
    { id: 'api-config', label: 'API Config', icon: Key },
    { id: 'usage-stats', label: 'Usage Stats', icon: BarChart3 },
    { id: 'system-health', label: 'System Health', icon: Activity },
    { id: 'preferences', label: 'Preferences', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dae2fd] p-8 md:p-12 overflow-x-hidden">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center gap-3 text-[#c0c1ff] font-black uppercase tracking-[0.3em] text-[10px]"
            >
              <Cpu className="w-4 h-4" />
              Central System Diagnostics
            </motion.div>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase"
            >
              Engine <span className="text-white">Room</span>
            </motion.h1>
          </div>

          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5 w-full md:w-auto overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative flex items-center gap-3 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap
                  ${activeTab === tab.id ? 'text-[#0b1326]' : 'text-[#dae2fd]/40 hover:text-[#dae2fd]'}
                `}
              >
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="engine-tab"
                    className="absolute inset-0 bg-[#c0c1ff] rounded-xl shadow-[0_0_20px_rgba(192,193,255,0.3)]" 
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </header>

        {/* Content Section */}
        <main className="relative min-h-[600px]">
          <AnimatePresence mode="wait">
            {activeTab === 'neural-id' && (
              <motion.div
                key="neural-id"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                {/* Profile Card */}
                <div className="glass-panel p-6 sm:p-10 bg-[#171f33]/40 border-white/5 space-y-8 sm:space-y-10">
                   <div className="flex items-center justify-between">
                     <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#dae2fd]/40">Profile Architecture</h3>
                     <ShieldCheck className="w-5 h-5 text-[#c7fff0]" />
                   </div>

                   <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
                     <div className="relative group">
                       <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-white/5 group-hover:border-[#c0c1ff]/30 transition-all duration-500 shadow-2xl">
                         <img src={userSettings.avatar} alt="Neural Avatar" className="w-full h-full object-cover" />
                       </div>
                       <button className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-[#c0c1ff] text-[#0b1326] flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all">
                         <Edit2 className="w-4 h-4" />
                       </button>
                     </div>

                     <div className="space-y-4 text-center sm:text-left flex-1">
                       <div>
                         <label className="text-[9px] font-black uppercase tracking-widest text-[#dae2fd]/20 block mb-1">Human Alias</label>
                         <p className="text-2xl font-black text-white">{userSettings.name}</p>
                       </div>
                       <div>
                         <label className="text-[9px] font-black uppercase tracking-widest text-[#dae2fd]/20 block mb-1">Neural Node</label>
                         <p className="text-sm font-medium text-[#dae2fd]/60">{userSettings.email}</p>
                       </div>
                       <div className="pt-4 flex flex-wrap justify-center sm:justify-start gap-4">
                         <Button size="sm" variant="outline">Change Identity</Button>
                         <Button size="sm" variant="ghost">Reset Credentials</Button>
                       </div>
                     </div>
                   </div>

                   <div className="pt-10 border-t border-white/5">
                     <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-[#dae2fd]/30">
                       <Globe className="w-4 h-4" />
                       Registered: {new Date(userSettings.joinedDate).toLocaleDateString()}
                     </div>
                   </div>
                </div>

                {/* Account Stats */}
                <div className="glass-panel p-10 bg-[#171f33]/40 border-white/5 space-y-10">
                   <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#dae2fd]/40">Accumulated Metrics</h3>
                   
                   <div className="grid grid-cols-2 gap-6">
                     {[
                       { label: 'Total Blueprints', value: stats.totalBlueprints, color: 'text-[#c0c1ff]', icon: Layers },
                       { label: 'Generations', value: stats.totalGenerations, color: 'text-[#c7fff0]', icon: Zap },
                       { label: 'Lines Directed', value: stats.totalLinesOfCode.toLocaleString(), color: 'text-blue-400', icon: Code },
                       { label: 'Neural Age', value: stats.memberSince, color: 'text-amber-400', icon: Activity }
                     ].map((stat, i) => (
                       <div key={stat.label} className="p-6 rounded-2xl bg-white/5 border border-white/5 group hover:border-white/10 transition-all">
                         <stat.icon className={`w-5 h-5 ${stat.color} mb-4 opacity-50`} />
                         <p className="text-[8px] font-black uppercase tracking-widest text-[#dae2fd]/20 mb-1">{stat.label}</p>
                         <p className="text-xl font-black text-white">{stat.value}</p>
                       </div>
                     ))}
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'api-config' && (
              <motion.div
                key="api-config"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="glass-panel p-6 sm:p-12 bg-[#171f33]/40 border-white/5 space-y-8 sm:space-y-10">
                   <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                     <div className="space-y-2">
                       <h3 className="text-2xl font-black text-white">Google Gemini Protocol</h3>
                       <p className="text-sm text-[#dae2fd]/40 font-medium">Configure the core AI engine providing neural synthesis.</p>
                     </div>
                     <div className={`shrink-0 w-fit px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2 ${
                       apiConfig.status === 'connected' ? 'bg-[#c7fff0]/10 text-[#c7fff0] border border-[#c7fff0]/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
                     }`}>
                       <div className={`w-2 h-2 rounded-full ${apiConfig.status === 'connected' ? 'bg-[#c7fff0] animate-pulse' : 'bg-red-500'}`} />
                       {apiConfig.status === 'connected' ? 'Link established' : 'No link detected'}
                     </div>
                   </div>

                   <div className="space-y-4">
                     <label className="text-[10px] font-black uppercase tracking-widest text-[#dae2fd]/40">Coded API Key</label>
                     <div className="relative group">
                       <input 
                         type={apiKeyVisible ? 'text' : 'password'}
                         value={apiConfig.apiKey}
                         onChange={(e) => setApiConfig({ apiKey: e.target.value })}
                         className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder:text-white/10 focus:outline-none focus:border-[#c0c1ff]/50 transition-all font-mono"
                         placeholder="Paste your Gemini API key here..."
                       />
                       <button 
                         onClick={() => setApiKeyVisible(!apiKeyVisible)}
                         className="absolute right-6 top-1/2 -translate-y-1/2 text-[#dae2fd]/20 hover:text-white transition-colors"
                       >
                         {apiKeyVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                       </button>
                     </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-6 rounded-2xl bg-white/3 border border-white/5">
                        <p className="text-[8px] font-black uppercase tracking-widest text-[#dae2fd]/30 mb-2">Neural Model</p>
                        <p className="text-sm font-black text-white">{apiConfig.model}</p>
                      </div>
                      <div className="p-6 rounded-2xl bg-white/3 border border-white/5">
                        <p className="text-[8px] font-black uppercase tracking-widest text-[#dae2fd]/30 mb-2">Rate Limit</p>
                        <p className="text-sm font-black text-white">{apiConfig.rateLimit} req/min</p>
                      </div>
                      <div className="p-6 rounded-2xl bg-white/3 border border-white/5">
                        <p className="text-[8px] font-black uppercase tracking-widest text-[#dae2fd]/30 mb-2">Sync Status</p>
                        <p className="text-sm font-black text-white">{apiConfig.status === 'connected' ? 'Stable' : 'Disconnected'}</p>
                      </div>
                   </div>

                   <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                     <Button 
                       variant="primary" 
                       icon={RefreshCw} 
                       loading={testingConnection}
                       onClick={testConnection}
                       className="w-full sm:w-auto"
                     >
                       Test Protocol
                     </Button>
                     <Button variant="secondary" className="w-full sm:w-auto">Direct Configuration</Button>
                   </div>
                </div>

                {/* Setup Instructions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="glass-panel p-8 border-white/5 space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-widest text-[#c0c1ff]">Neural Usage Monitor</h3>
                    <div className="space-y-6">
                       <div className="space-y-3">
                         <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                           <span className="text-[#dae2fd]/40">Monthly Requests</span>
                           <span>156 / 10,000</span>
                         </div>
                         <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                           <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: '1.56%' }}
                             className="h-full bg-[#c0c1ff]" 
                           />
                         </div>
                       </div>
                       <div className="space-y-3">
                         <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                           <span className="text-[#dae2fd]/40">Token Consumption</span>
                           <span>450K / 1M</span>
                         </div>
                         <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                           <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: '45%' }}
                             className="h-full bg-[#c7fff0]" 
                           />
                         </div>
                       </div>
                       <div className="pt-4 flex items-center justify-between">
                         <span className="text-[10px] font-black uppercase tracking-widest text-[#dae2fd]/30">Estimated Flux Cost</span>
                         <span className="text-lg font-black text-white">$4.50</span>
                       </div>
                    </div>
                  </div>

                  <div className="glass-panel p-8 border-white/5 space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-widest text-amber-400">Setup Protocol</h3>
                    <div className="space-y-4">
                      {[
                        { step: 1, text: 'Visit Google AI Studio (ai.google.dev)' },
                        { step: 2, text: 'Generate new API key in credentials panel' },
                        { step: 3, text: 'Copy to neural input above' },
                        { step: 4, text: 'Confirm with protocol test' }
                      ].map(item => (
                        <div key={item.step} className="flex items-center gap-4 text-xs">
                          <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center text-[10px] font-black border border-white/5">
                            {item.step}
                          </div>
                          <span className="text-[#dae2fd]/60 font-medium">{item.text}</span>
                        </div>
                      ))}
                      <div className="pt-6">
                        <a href="https://ai.google.dev/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#c0c1ff] hover:gap-3 transition-all">
                          Get API Key <ChevronRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'usage-stats' && (
              <motion.div
                key="usage-stats"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                 <div className="glass-panel p-10 bg-[#171f33]/40 border-white/5 space-y-10">
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#dae2fd]/40">Sustained Generation Load</h3>
                    <div className="h-64 flex items-end gap-2 px-2">
                       {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                         const values = [12, 18, 24, 18, 12, 6, 6];
                         const max = 24;
                         return (
                           <div key={day} className="flex-1 flex flex-col items-center gap-4">
                             <div className="w-full relative group">
                               <motion.div 
                                 initial={{ height: 0 }}
                                 animate={{ height: `${(values[i] / max) * 100}%` }}
                                 className="w-full bg-[#c0c1ff]/20 border-t-2 border-[#c0c1ff] rounded-t-xl group-hover:bg-[#c0c1ff]/40 transition-colors"
                               />
                               <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-black text-[#c0c1ff] opacity-0 group-hover:opacity-100 transition-opacity">
                                 {values[i]}
                               </div>
                             </div>
                             <span className="text-[8px] font-black uppercase tracking-widest text-[#dae2fd]/20">{day}</span>
                           </div>
                         );
                       })}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="space-y-1">
                        <p className="text-2xl font-black text-white">96</p>
                        <p className="text-[8px] font-black uppercase tracking-widest text-[#dae2fd]/20">Syntheses this week</p>
                      </div>
                      <div className="space-y-1 text-right">
                        <p className="text-2xl font-black text-[#c7fff0]">13.7</p>
                        <p className="text-[8px] font-black uppercase tracking-widest text-[#dae2fd]/20">Daily Average</p>
                      </div>
                    </div>
                 </div>

                 <div className="space-y-8">
                    <div className="glass-panel p-8 border-white/5 space-y-6">
                      <h3 className="text-xs font-black uppercase tracking-widest text-[#dae2fd]/40">System Architecture Distribution</h3>
                      <div className="space-y-6">
                        {[
                          { label: 'React UI', val: 45, color: '#c0c1ff', icon: Code },
                          { label: 'Node Logic', val: 35, color: '#c7fff0', icon: Zap },
                          { label: 'SQL Schemas', val: 20, color: '#60a5fa', icon: Database }
                        ].map(item => (
                          <div key={item.label} className="space-y-2">
                             <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                               <span className="flex items-center gap-2 text-[#dae2fd]/60"><item.icon className="w-3.5 h-3.5" style={{ color: item.color }} /> {item.label}</span>
                               <span style={{ color: item.color }}>{item.val}%</span>
                             </div>
                             <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                               <motion.div 
                                 initial={{ width: 0 }}
                                 animate={{ width: `${item.val}%` }}
                                 className="h-full"
                                 style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}` }}
                               />
                             </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="glass-panel p-8 border-white/5 space-y-6">
                      <h3 className="text-xs font-black uppercase tracking-widest text-[#dae2fd]/40">Neural Synthesis Cluster</h3>
                      <div className="space-y-4">
                        {[
                          { label: 'Authentication Systems', count: 24 },
                          { label: 'Interactive Dashboards', count: 18 },
                          { label: 'RESTful API Routes', count: 15 },
                          { label: 'Data Management Forms', count: 12 },
                          { label: 'Marketing Landing Pages', count: 8 }
                        ].map((item, i) => (
                          <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-white/3 border border-white/5">
                            <span className="text-[10px] font-bold text-[#dae2fd]/60">{i + 1}. {item.label}</span>
                            <span className="text-[10px] font-black text-[#c0c1ff]">{item.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                 </div>
              </motion.div>
            )}

            {activeTab === 'system-health' && (
              <motion.div
                key="system-health"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                 <div className="lg:col-span-2 space-y-8">
                    <div className="glass-panel p-10 bg-[#171f33]/40 border-white/5 space-y-10">
                       <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#dae2fd]/40">Operational Status</h3>
                       
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-[11px] font-black uppercase tracking-widest">
                          {[
                            { label: 'Neural Engine', status: 'Operational', color: 'text-[#c7fff0]' },
                            { label: 'AI Models', status: 'Active', color: 'text-[#c7fff0]' },
                            { label: 'Preview Engine', status: 'Running', color: 'text-[#c7fff0]' },
                            { label: 'Code Synthesis', status: 'Online', color: 'text-[#c7fff0]' },
                            { label: 'Rate Limit', status: '45% Capacity', color: 'text-amber-400' }
                          ].map(item => (
                            <div key={item.label} className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/5">
                               <span className="text-[#dae2fd]/30">{item.label}</span>
                               <div className="flex items-center gap-3">
                                 <div className={`w-2 h-2 rounded-full bg-current ${item.color} ${item.color === 'text-[#c7fff0]' ? '' : 'animate-pulse'}`} />
                                 <span className={item.color}>{item.status}</span>
                               </div>
                            </div>
                          ))}
                       </div>
                       
                       <div className="flex items-center justify-between pt-10 border-t border-white/5">
                         <p className="text-[10px] font-black uppercase tracking-widest text-[#dae2fd]/20">Last Health Sync: 2 minutes ago</p>
                         <Button size="sm" variant="outline" icon={RefreshCw}>Initiate Health Check</Button>
                       </div>
                    </div>

                    <div className="glass-panel p-10 bg-[#171f33]/40 border-white/5 space-y-10">
                       <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#dae2fd]/40">Temporal Metrics</h3>
                       <div className="flex items-end gap-3 h-40">
                         {[...Array(24)].map((_, i) => (
                           <motion.div 
                             key={i}
                             initial={{ height: '20%' }}
                             animate={{ height: `${Math.random() * 60 + 20}%` }}
                             transition={{ repeat: Infinity, duration: 2, delay: i * 0.1, repeatType: 'reverse' }}
                             className={`flex-1 rounded-full ${i % 3 === 0 ? 'bg-amber-400/20' : 'bg-[#c0c1ff]/20'}`}
                           />
                         ))}
                       </div>
                       <p className="text-[10px] font-black uppercase tracking-widest text-[#dae2fd]/30 text-center italic">Live Latency Waveform (Real-time)</p>
                    </div>
                 </div>

                 <div className="glass-panel p-10 bg-[#171f33]/40 border-white/5 space-y-10">
                   <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#dae2fd]/40">System Efficiency</h3>
                   
                   <div className="space-y-8">
                     {[
                       { label: 'Avg Generation Time', val: '8.3s', sub: 'Calculated over 100 runs' },
                       { label: 'Success Rate', val: '94%', sub: 'Neural validation pass rate' },
                       { label: 'Error Margin', val: '6%', sub: 'Syntactic conflict rate' }
                     ].map(item => (
                       <div key={item.label} className="space-y-2">
                         <span className="text-[10px] font-black uppercase tracking-widest text-[#dae2fd]/30">{item.label}</span>
                         <p className="text-4xl font-black text-white">{item.val}</p>
                         <p className="text-[9px] font-medium text-[#dae2fd]/20 italic">{item.sub}</p>
                       </div>
                     ))}
                   </div>

                   <div className="pt-10 border-t border-white/5 space-y-4">
                      <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                        <span className="text-[#dae2fd]/20">Fastest Synthesis</span>
                        <span className="text-[#c7fff0]">4.2s</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                        <span className="text-[#dae2fd]/20">Peak Consumption</span>
                        <span className="text-red-400">15.7s</span>
                      </div>
                   </div>
                 </div>
              </motion.div>
            )}

            {activeTab === 'preferences' && (
              <motion.div
                key="preferences"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                  <div className="glass-panel p-10 bg-[#171f33]/40 border-white/5 space-y-10">
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#dae2fd]/40">Default Architecture</h3>
                    
                    <div className="space-y-10">
                       <div className="space-y-6">
                         <label className="text-[10px] font-black uppercase tracking-widest text-[#dae2fd]/30 block">UI Framework</label>
                         <div className="grid grid-cols-3 gap-4">
                           {['React', 'Vue', 'Svelte'].map(fw => (
                             <button
                               key={fw}
                               onClick={() => setPreferences({ framework: fw })}
                               className={`px-4 py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${preferences.framework === fw ? 'bg-[#c0c1ff]/10 border-[#c0c1ff]/30 text-[#c0c1ff]' : 'bg-white/3 border-white/5 text-[#dae2fd]/30 hover:bg-white/5'}`}
                             >
                               {fw}
                             </button>
                           ))}
                         </div>
                       </div>

                       <div className="space-y-6">
                         <label className="text-[10px] font-black uppercase tracking-widest text-[#dae2fd]/30 block">Backend Server</label>
                         <div className="grid grid-cols-3 gap-4">
                           {['Node.js', 'Python', 'Go'].map(be => (
                             <button
                               key={be}
                               onClick={() => setPreferences({ backend: be })}
                               className={`px-4 py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${preferences.backend === be ? 'bg-[#c7fff0]/10 border-[#c7fff0]/30 text-[#c7fff0]' : 'bg-white/3 border-white/5 text-[#dae2fd]/30 hover:bg-white/5'}`}
                             >
                               {be}
                             </button>
                           ))}
                         </div>
                       </div>

                       <div className="space-y-6">
                         <label className="text-[10px] font-black uppercase tracking-widest text-[#dae2fd]/30 block">Primary Database</label>
                         <div className="grid grid-cols-3 gap-4">
                           {['PostgreSQL', 'MongoDB', 'MySQL'].map(db => (
                             <button
                               key={db}
                               onClick={() => setPreferences({ database: db })}
                               className={`px-4 py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${preferences.database === db ? 'bg-blue-400/10 border-blue-400/30 text-blue-400' : 'bg-white/3 border-white/5 text-[#dae2fd]/30 hover:bg-white/5'}`}
                             >
                               {db}
                             </button>
                           ))}
                         </div>
                       </div>
                    </div>
                  </div>

                  <div className="glass-panel p-10 bg-[#171f33]/40 border-white/5 space-y-10">
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#dae2fd]/40">Syntactic Styling</h3>
                    
                    <div className="space-y-10">
                       <div className="space-y-6">
                         <label className="text-[10px] font-black uppercase tracking-widest text-[#dae2fd]/30 block">Code Pattern</label>
                         <div className="grid grid-cols-2 gap-4">
                           {['Functional', 'Class-based'].map(style => (
                             <button
                               key={style}
                               onClick={() => setPreferences({ codeStyle: style })}
                               className={`px-6 py-4 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all ${preferences.codeStyle === style ? 'bg-[#c0c1ff]/10 border-[#c0c1ff]/30 text-[#c0c1ff]' : 'bg-white/3 border-white/5 text-[#dae2fd]/30 hover:bg-white/5'}`}
                             >
                               {style}
                             </button>
                           ))}
                         </div>
                       </div>

                       <div className="space-y-6">
                         <label className="text-[10px] font-black uppercase tracking-widest text-[#dae2fd]/30 block">Documentation Density</label>
                         <div className="flex items-center gap-6">
                           <button
                             onClick={() => setPreferences({ includeComments: true })}
                             className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all ${preferences.includeComments ? 'bg-[#c7fff0]/10 border-[#c7fff0]/30 text-[#c7fff0]' : 'bg-white/3 border-white/5 text-[#dae2fd]/30 hover:bg-white/5'}`}
                           >
                             <CheckCircle2 className="w-4 h-4" /> Comprehensive
                           </button>
                           <button
                             onClick={() => setPreferences({ includeComments: false })}
                             className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all ${!preferences.includeComments ? 'bg-amber-400/10 border-amber-400/30 text-amber-400' : 'bg-white/3 border-white/5 text-[#dae2fd]/30 hover:bg-white/5'}`}
                           >
                             <AlertCircle className="w-4 h-4" /> Minimalist
                           </button>
                         </div>
                       </div>

                       <div className="space-y-6">
                         <label className="text-[10px] font-black uppercase tracking-widest text-[#dae2fd]/30 block">Atmosphere</label>
                         <div className="grid grid-cols-3 gap-4">
                           {['dark', 'light', 'auto'].map(theme => (
                             <button
                               key={theme}
                               onClick={() => setPreferences({ theme })}
                               className={`px-4 py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${preferences.theme === theme ? 'bg-white/10 border-white/30 text-white' : 'bg-white/3 border-white/5 text-[#dae2fd]/30 hover:bg-white/5'}`}
                             >
                               {theme}
                             </button>
                           ))}
                         </div>
                       </div>

                       <div className="pt-10 flex justify-end">
                         <Button onClick={() => addLog('Preferences synced to neural core.', 'success')}>Save Configuration</Button>
                       </div>
                    </div>
                  </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[#0b1326]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full neural-grid opacity-20" />
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-[#c0c1ff]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-[#c7fff0]/5 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}
