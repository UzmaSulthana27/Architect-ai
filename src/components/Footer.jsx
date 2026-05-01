import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Globe, Command, ShieldCheck, Cpu } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-black/10 dark:border-white/5 bg-black/5 dark:bg-black/40 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <Link to="/" className="flex items-center gap-3 group">
            <Command className="w-6 h-6 text-neon" />
            <span className="text-lg font-black tracking-tighter uppercase italic" style={{ color: 'var(--text-primary)' }}>
              Architect<span className="text-neon">AI</span>
            </span>
          </Link>
          
          <div className="flex items-center gap-8 text-[10px] font-bold tracking-[0.2em] opacity-60 uppercase" style={{ color: 'var(--text-primary)' }}>
            <Link to="/atelier" className="hover:text-neon transition-colors">Atelier</Link>
            <Link to="/vault" className="hover:text-neon transition-colors">Vault</Link>
            <Link to="/engine-room" className="hover:text-neon transition-colors">Controls</Link>
          </div>

          <div className="flex gap-4">
            <SocialIcon icon={<Twitter className="w-4 h-4" />} href="#" />
            <SocialIcon icon={<Github className="w-4 h-4" />} href="#" />
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-black/10 dark:border-white/5 flex flex-col md:flex-row items-center justify-between text-[10px] font-bold tracking-[0.1em] opacity-60 uppercase" style={{ color: 'var(--text-primary)' }}>
          <span>© {currentYear} ARCHITECT AI SYSTEMS</span>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3 h-3 text-neon" /> SECURITY VERIFIED</span>
            <span className="flex items-center gap-1.5"><Cpu className="w-3 h-3 text-neon" /> NEURAL v4.2</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div className="flex flex-col gap-6">
      <h4 className="text-[10px] font-black tracking-[0.3em] uppercase opacity-20">{title}</h4>
      <div className="flex flex-col gap-4">
        {links.map((link, i) => (
          <Link 
            key={i} 
            to={link.to} 
            className="text-xs font-bold opacity-40 hover:opacity-100 hover:text-neon transition-all w-fit"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function SocialIcon({ icon, href }) {
  return (
    <a 
      href={href} 
      className="w-8 h-8 glass rounded-lg flex items-center justify-center opacity-40 hover:opacity-100 hover:text-neon hover:border-neon/30 transition-all border border-white/5"
    >
      {icon}
    </a>
  );
}
