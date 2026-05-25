import { ArrowUp } from "lucide-react";
import Logo3D from "./Logo3D";

export default function Footer() {
  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative w-full bg-[#030303] pt-16 pb-8 px-6 md:px-12 border-t border-white/5 overflow-hidden">
      
      {/* Soft footer glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[100px] bg-chartreuse-muted/5 blur-[50px] rounded-full pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto flex flex-col space-y-12">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <Logo3D className="w-8 h-8" />
              <span className="font-syne font-bold tracking-[0.25em] text-white">NOVA AUDIO</span>
            </div>
            <p className="text-neutral-500 font-sans text-xs max-w-sm font-light leading-relaxed">
              Developing reference-grade playback systems through advanced acoustic research and precision manufacturing.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h5 className="font-mono text-[10px] tracking-widest text-neutral-400 font-bold uppercase">COLLECTION</h5>
            <div className="flex flex-col space-y-2 text-xs font-light text-neutral-500">
              <a href="#experience" className="hover:text-chartreuse-light hover-underline-reveal w-fit transition-colors">Aether-X</a>
              <a href="#technology" className="hover:text-chartreuse-light hover-underline-reveal w-fit transition-colors">Quantum DSP</a>
              <a href="#story" className="hover:text-chartreuse-light hover-underline-reveal w-fit transition-colors">Engineering Philosophy</a>
            </div>
          </div>

          {/* Socials */}
          <div className="space-y-3">
            <h5 className="font-mono text-[10px] tracking-widest text-neutral-400 font-bold uppercase">CONNECT</h5>
            <div className="flex flex-col space-y-2 text-xs font-light text-neutral-500 font-mono">
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-chartreuse-light hover-underline-reveal w-fit transition-colors">X.COM / @NOVA</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-chartreuse-light hover-underline-reveal w-fit transition-colors">INSTAGRAM / @NOVA</a>
              <a href="https://spotify.com" target="_blank" rel="noopener noreferrer" className="hover:text-chartreuse-light hover-underline-reveal w-fit transition-colors">SPOTIFY / NOVA_LABS</a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center md:text-left">
          
          {/* Copyrights */}
          <div className="text-[10px] font-mono text-neutral-600 tracking-wider">
            © {new Date().getFullYear()} NOVA AUDIO LABS INC. ALL RESERVED IN PERPETUITY.
          </div>

          {/* Return to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 border border-white/5 hover:border-chartreuse-light/20 px-4 py-2 rounded-full bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 text-[10px] font-mono tracking-widest text-neutral-400 hover:text-white cursor-pointer group"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>

      {/* Dynamic Glowing Accent Light Bar at bottom of screen */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-chartreuse-muted/60 to-transparent" />
    </footer>
  );
}
