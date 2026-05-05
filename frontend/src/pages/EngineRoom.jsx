import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, Activity, Zap, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '00:00', load: 40 },
  { name: '04:00', load: 30 },
  { name: '08:00', load: 65 },
  { name: '12:00', load: 85 },
  { name: '16:00', load: 70 },
  { name: '20:00', load: 90 },
  { name: '23:59', load: 55 },
];

export default function EngineRoom() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex justify-between items-end">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-neon">
            <Activity size={24} />
            <h1 className="text-3xl font-bold tracking-tight uppercase">Engine Room</h1>
          </div>
          <p className="text-text-secondary">System-wide neural performance telemetry and resource allocation.</p>
        </div>
        <div className="flex gap-2">
           <span className="px-3 py-1 rounded bg-green-500/10 text-green-500 border border-green-500/20 text-xs font-mono">STABLE</span>
           <span className="px-3 py-1 rounded bg-neon/10 text-neon border border-neon/20 text-xs font-mono">98.2% UPTIME</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-6 rounded-2xl glass-card border border-white/5 h-[400px]">
          <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
            <BarChart3 size={18} className="text-neon" />
            Distributed Inference Load
          </h3>
          <div className="w-full h-full pb-8">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0b1326', border: '1px solid #1ee6d220', borderRadius: '8px' }}
                  itemStyle={{ color: '#1ee6d2' }}
                />
                <Line type="monotone" dataKey="load" stroke="#1ee6d2" strokeWidth={3} dot={{ r: 4, fill: '#1ee6d2' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          {[
            { label: 'Neural Core Temp', val: '42°C', icon: Zap },
            { label: 'Latency', val: '14ms', icon: Activity },
            { label: 'Provisioned Ops', val: '2.4M/s', icon: Cpu }
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 5 }}
              className="p-5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-neon/5 text-neon">
                  <stat.icon size={18} />
                </div>
                <span className="text-sm font-medium text-text-secondary">{stat.label}</span>
              </div>
              <span className="text-xl font-bold font-mono text-white">{stat.val}</span>
            </motion.div>
          ))}
          
          <div className="p-5 rounded-xl bg-neon/5 border border-neon/20">
             <h4 className="text-xs font-bold text-neon uppercase tracking-widest mb-3">System Alerts</h4>
             <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-mono text-text-secondary">
                   <div className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
                   <span>[INFO] Automated backup successfully verified.</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-text-secondary">
                   <div className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
                   <span>[INFO] Peak utilization within safety thresholds.</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
