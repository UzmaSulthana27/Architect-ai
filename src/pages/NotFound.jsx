import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Zap, ArrowLeft, Terminal } from "lucide-react";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass-panel p-12 rounded-[2rem] border-white/5 relative overflow-hidden"
      >
        {/* Glitch Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#c0c1ff]/5 to-transparent pointer-events-none" />
        
        <div className="relative z-10">
          <div className="w-20 h-20 bg-[#c0c1ff]/10 rounded-2xl flex items-center justify-center mx-auto mb-8 animate-pulse">
            <Terminal className="w-10 h-10 text-[#c0c1ff]" />
          </div>
          
          <h1 className="text-6xl font-black italic uppercase tracking-tighter mb-4">404</h1>
          <h2 className="text-xl font-bold uppercase tracking-widest text-[#c0c1ff] mb-6">Protocol Not Found</h2>
          
          <p className="text-gray-500 mb-10 text-sm leading-relaxed">
            The neural link to this architectural node has been severed. You're drifting into the void.
          </p>
          
          <Link to="/">
            <Button icon={ArrowLeft} className="w-full py-6">
              Return to Grid
            </Button>
          </Link>
        </div>
      </motion.div>
      
      {/* Background Decor */}
      <div className="fixed inset-0 grid-bg opacity-10 pointer-events-none" />
    </div>
  );
}
