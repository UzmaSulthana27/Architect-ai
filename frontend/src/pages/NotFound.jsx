import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-yellow-500"
      >
        <AlertTriangle size={80} />
      </motion.div>
      <h1 className="text-4xl font-bold text-white uppercase tracking-widest">404: Zone of Silence</h1>
      <p className="text-text-secondary max-w-md">
        The coordinates you requested do not exist within our neural grid. 
        Perhaps the synthesis was interrupted.
      </p>
      <Link to="/">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-neon text-bg-dark font-bold rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(30,230,210,0.3)]"
        >
          <Home size={18} />
          Return to Nexus
        </motion.button>
      </Link>
    </div>
  );
}
