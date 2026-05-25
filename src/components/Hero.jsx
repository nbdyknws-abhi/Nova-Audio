import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import SoundwaveCanvas from "./SoundwaveCanvas";
import Logo3D from "./Logo3D";

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleMouseMove = (e) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      hero.style.setProperty("--mouse-x", `${x}%`);
      hero.style.setProperty("--mouse-y", `${y}%`);
    };

    hero.addEventListener("mousemove", handleMouseMove);
    return () => {
      hero.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="glow-ambient relative w-full min-h-screen flex flex-col justify-between items-center bg-[#020204] overflow-hidden pt-28 pb-16 px-6 md:px-12 select-none"
    >
      {/* Soundwave background layer */}
      <SoundwaveCanvas 
        color="rgba(204, 255, 0, 0.12)"
        accentColor="rgba(255, 255, 255, 0.08)"
        waveCount={3}
        className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
      />

      {/* Grid overlay for technical precision vibe */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />

      {/* Floating ambient accent glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-chartreuse-muted/5 blur-[120px] rounded-full pointer-events-none" />

      {/* 
        GIANT "NOVA" TYPOGRAPHY INTRO
        Acts as the initial cinematic screen, then fades and scales into a background watermark
      */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: [0, 1, 1, 0.03], 
          scale: [0.92, 1, 1, 1.1],
        }}
        transition={{ 
          duration: 3.5, 
          times: [0, 0.2, 0.45, 1],
          ease: [0.16, 1, 0.3, 1] 
        }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden px-6"
      >
        <svg viewBox="0 0 1000 350" className="w-full max-w-[1000px] h-auto">
          <defs>
            {/* Technical Carbon-Fiber Diagonal Texture Pattern */}
            <pattern id="carbon-texture" width="6" height="6" patternUnits="userSpaceOnUse">
              <path d="M0 6 L6 0 M-1 1 L1 -1 M5 7 L7 5" stroke="rgba(204, 255, 0, 0.2)" strokeWidth="1.2" />
            </pattern>
            
            {/* Metallic Chrome Gradient */}
            <linearGradient id="metallic-chrome" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="30%" stopColor="#cbd5e1" />
              <stop offset="50%" stopColor="#475569" />
              <stop offset="70%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#ccff00" />
            </linearGradient>

            {/* Glowing Laser Filter */}
            <filter id="laser-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background glow layers */}
          <text x="50%" y="58%" textAnchor="middle" dominantBaseline="middle" 
                className="font-syne font-extrabold fill-[#ccff00] opacity-25 filter blur-[24px]" 
                style={{ fontSize: "160px", letterSpacing: "25px" }}>
            NOVA
          </text>
          <text x="50%" y="58%" textAnchor="middle" dominantBaseline="middle" 
                className="font-syne font-extrabold fill-[#ccff00] opacity-45 filter blur-[8px]" 
                style={{ fontSize: "160px", letterSpacing: "25px" }}>
            NOVA
          </text>

          {/* 3D Extrusion Shadows */}
          <text x="50.4%" y="58.8%" textAnchor="middle" dominantBaseline="middle" 
                className="font-syne font-extrabold fill-black opacity-95" 
                style={{ fontSize: "160px", letterSpacing: "25px" }}>
            NOVA
          </text>
          <text x="50.2%" y="58.4%" textAnchor="middle" dominantBaseline="middle" 
                className="font-syne font-extrabold fill-[#82a600]" 
                style={{ fontSize: "160px", letterSpacing: "25px" }}>
            NOVA
          </text>

          {/* Foreground Metallic Textured Text */}
          <text x="50%" y="58%" textAnchor="middle" dominantBaseline="middle" 
                className="font-syne font-extrabold" 
                fill="url(#metallic-chrome)"
                style={{ fontSize: "160px", letterSpacing: "25px" }}>
            NOVA
          </text>
          
          {/* Carbon Fiber Overlay */}
          <text x="50%" y="58%" textAnchor="middle" dominantBaseline="middle" 
                className="font-syne font-extrabold" 
                fill="url(#carbon-texture)"
                style={{ fontSize: "160px", letterSpacing: "25px" }}>
            NOVA
          </text>
          
          {/* Glowing stroke outline */}
          <text x="50%" y="58%" textAnchor="middle" dominantBaseline="middle" 
                className="font-syne font-extrabold stroke-[#ccff00] stroke-[1.5] fill-none opacity-80" 
                filter="url(#laser-glow)"
                style={{ fontSize: "160px", letterSpacing: "25px" }}>
            NOVA
          </text>
        </svg>
      </motion.div>

      {/* Top Header/Brand Bar (Reveals with delay) */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 2.2 }}
        className="absolute top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-30"
      >
        <div className="flex items-center space-x-3">
          <Logo3D className="w-10 h-10" />
          <span className="font-syne font-bold tracking-[0.3em] text-white text-sm md:text-base">
            NOVA
          </span>
        </div>
        <div className="hidden md:flex space-x-8 text-xs font-mono tracking-widest text-neutral-400">
          <a href="#story" className="hover:text-chartreuse-light hover-underline-reveal pb-1 transition-colors duration-300">CRAFT</a>
          <a href="#experience" className="hover:text-chartreuse-light hover-underline-reveal pb-1 transition-colors duration-300">EXPERIENCE</a>
          <a href="#technology" className="hover:text-chartreuse-light hover-underline-reveal pb-1 transition-colors duration-300">TECHNOLOGY</a>
          <a href="#casestudy" className="hover:text-chartreuse-light hover-underline-reveal pb-1 transition-colors duration-300">SHOWCASE</a>
        </div>
        <a 
          href="#cta"
          className="border border-white/10 px-5 py-2 text-[10px] tracking-[0.2em] font-mono bg-white/5 hover:bg-white hover:text-black transition-all duration-500 rounded-full"
        >
          ACQUIRE
        </a>
      </motion.div>

      {/* Hero Content Grid */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12 z-10 flex-grow pt-10">
        {/* Editorial Text Column */}
        <div className="text-left flex flex-col justify-center order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.8 }}
            className="flex items-center space-x-2 text-chartreuse-light mb-4"
          >
            <span className="h-[1px] w-8 bg-chartreuse-light/60"></span>
            <span className="font-mono text-xs tracking-[0.3em] uppercase">
              Now Introducing the AETHER-X
            </span>
          </motion.div>

          <div className="text-mask mb-6">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 2.0 }}
              className="text-5xl md:text-7xl font-syne font-extrabold leading-tight text-white uppercase tracking-tight"
            >
              Sound <br />
              <span className="text-chartreuse-accent-gradient">Should Be</span> <br />
              Felt.
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 2.2 }}
            className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-lg mb-10 font-light"
          >
            Aether-X integrates custom bio-cellulose transducers with milled acoustic chambers, delivering a spatial soundstage that replicates the characteristics of a live concert hall.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 2.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#experience"
              className="btn-shine-hover px-8 py-4 bg-gradient-to-r from-chartreuse-dark to-chartreuse-muted hover:from-chartreuse-light hover:to-chartreuse-dark text-black font-mono text-xs tracking-widest text-center uppercase font-bold transition-all duration-300 rounded shadow-[0_4px_20px_rgba(204,255,0,0.12)] hover:shadow-[0_4px_30px_rgba(204,255,0,0.25)] transform hover:-translate-y-[2px]"
            >
              EXPERIENCE SCENE
            </a>
            <a
              href="#technology"
              className="btn-shine-hover px-8 py-4 bg-[#0a0a0c] border border-white/10 hover:border-chartreuse-light/40 text-white font-mono text-xs tracking-widest text-center uppercase transition-all duration-300 rounded hover:bg-[#121215]"
            >
              EXPLORE TECH
            </a>
          </motion.div>
        </div>

        {/* Floating Flagship Headphones Column */}
        <div className="relative w-full h-[50vh] lg:h-[70vh] flex items-center justify-center order-1 lg:order-2">
          {/* Outer glowing acoustic rings */}
          <div className="absolute w-[80%] h-[80%] rounded-full border border-white/5 animate-pulse [animation-duration:8s]" />
          <div className="absolute w-[60%] h-[60%] rounded-full border border-chartreuse-light/5 animate-pulse [animation-duration:5s]" />

          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 2.1 }}
            className="w-full max-w-[420px] aspect-square relative z-10 select-none pointer-events-none filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            animate={{
              y: [-12, 12, -12],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img
              src="/flagship_headphones.png"
              alt="Nova Audio Aether-X Flagship Headphones"
              className="w-full h-full object-contain"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator (Reveals with delay) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 z-10 pointer-events-none"
      >
        <span className="font-mono text-[9px] tracking-[0.35em] text-neutral-500 uppercase">
          SCROLL TO TRANSCEND
        </span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-chartreuse-muted to-transparent relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-white"
            animate={{
              y: ["-100%", "200%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>

      {/* Decorative Technical Specs */}
      <div className="hidden xl:block absolute bottom-8 left-8 text-left text-[9px] font-mono text-neutral-500 tracking-[0.2em] space-y-1">
        <div>MODEL: AETHER-X</div>
        <div>SYS_RESONANCE: 104.2 DB</div>
        <div>DSP_ENGINE: QUANTUM_V2</div>
      </div>
      <div className="hidden xl:block absolute bottom-8 right-8 text-right text-[9px] font-mono text-neutral-500 tracking-[0.2em] space-y-1">
        <div>COORDINATES: 45°N / 12.8°W</div>
        <div>FREQUENCY: 4HZ - 48KHZ</div>
        <div>ENGINEERED BY NOVA</div>
      </div>
    </section>
  );
}
