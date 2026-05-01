import { motion } from "motion/react";
import { Zap, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-32 border-t border-white/5 bg-[#0a0f1a]/80 backdrop-blur-xl py-16 px-6 overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-px bg-gradient-to-r from-transparent via-[#c0c1ff]/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 sm:gap-8">
        {/* Brand Section */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-3">
            <Zap className="w-6 h-6 text-[#c0c1ff]" />
            <span className="font-black tracking-tighter text-xl uppercase italic">
              Architect <span className="text-[#c0c1ff]">AI</span>
            </span>
          </Link>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
            Designing the next generation of digital infrastructure. Neural-link your ideas to production-grade code in seconds.
          </p>
          <div className="flex gap-4">
            {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ y: -2, color: "#c0c1ff" }}
                className="text-gray-600 transition-colors"
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-black uppercase tracking-widest text-[10px] text-[#c0c1ff] mb-6">Foundry</h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li><Link to="/atelier" className="hover:text-white transition-colors">Neural Atelier</Link></li>
            <li><Link to="/templates" className="hover:text-white transition-colors">Blueprint Vault</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">Components</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">API Docs</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black uppercase tracking-widest text-[10px] text-[#c0c1ff] mb-6">Network</h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li><Link to="#" className="hover:text-white transition-colors">Changelog</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">Stability Grid</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">Global Node Map</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black uppercase tracking-widest text-[10px] text-[#c0c1ff] mb-6">Legal</h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li><Link to="#" className="hover:text-white transition-colors">Terms of Protocol</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">Privacy Neural</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">Security Audit</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-16 mt-16 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">
        <p>© {currentYear} Architect AI. All rights reserved.</p>
        <div className="flex gap-8">
          <span>Status: <span className="text-emerald-500/80">Operational</span></span>
          <span>Latency: 24ms</span>
        </div>
      </div>
    </footer>
  );
}
