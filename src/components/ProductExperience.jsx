import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Compass, Layers, Radio } from "lucide-react";

export default function ProductExperience() {
  const [explosionFactor, setExplosionFactor] = useState(0); // 0 to 100
  const [activeComponent, setActiveComponent] = useState(null);

  const productDetails = {
    headband: {
      title: "Surgical Titanium Arch",
      spec: "Milled under 0.2mm tolerance",
      desc: "Anodized grade-5 titanium wraps a spring-steel core, optimizing clamping force while remaining exceptionally lightweight.",
      icon: <Layers className="w-5 h-5 text-chartreuse-light" />
    },
    cup: {
      title: "Carbon-Fiber Acoustic Chamber",
      spec: "3K Twill Aerospace weave",
      desc: "Suppresses internal acoustic reflections and eliminates cabinet resonance, providing a clean back-wave environment for the transducer.",
      icon: <Cpu className="w-5 h-5 text-chartreuse-light" />
    },
    driver: {
      title: "40mm Bio-Carbon Driver",
      spec: "Neodymium N52 magnetic flux",
      desc: "A high-stiffness, low-mass bio-cellulose diaphragm that tracks fast transient peaks with minimal modal break-up.",
      icon: <Radio className="w-5 h-5 text-chartreuse-light" />
    },
    cushion: {
      title: "Memory-Foam Isolators",
      spec: "High-permeability leather mesh",
      desc: "Slow-rebound memory foam wrapped in premium full-grain leather forms a consistent seal, offering up to 38dB of passive attenuation.",
      icon: <Compass className="w-5 h-5 text-chartreuse-light" />
    }
  };

  // Coordinates mapping for hotspots
  const hotspots = [
    { id: "headband", x: "50%", y: "15%" },
    { id: "cup", x: "28%", y: "55%" },
    { id: "driver", x: "42%", y: "60%" },
    { id: "cushion", x: "68%", y: "62%" }
  ];

  return (
    <section 
      id="experience"
      className="relative w-full min-h-screen bg-[#060608] py-24 md:py-36 px-6 md:px-12 flex flex-col justify-center items-center overflow-hidden border-t border-white/5"
    >
      {/* Background soft ambient glowing light */}
      <div className="absolute top-1/3 right-1/4 w-[50vw] h-[50vw] bg-chartreuse-muted/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Background wireframe lines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(204,255,0,0.03)_0%,rgba(0,0,0,0)_80%)] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: Technical Info Panel */}
        <div className="lg:col-span-5 text-left order-2 lg:order-1 flex flex-col justify-center">
          <div className="flex items-center space-x-2 text-chartreuse-light/60 mb-6">
            <span className="font-mono text-xs tracking-[0.3em] uppercase">NOVA RESEARCH LABS</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-syne font-bold text-white uppercase tracking-tight mb-8">
            EXPLODED <br />
            <span className="text-chartreuse-accent-gradient">MECHANICS</span>
          </h2>

          <p className="text-neutral-400 font-light text-sm md:text-base leading-relaxed mb-10">
            Slide the control below to expand and disassemble the Aether-X. Discover the precision-machined elements that make spatial immersion possible.
          </p>

          {/* Explosion Control Slider */}
          <div className="glass-panel p-6 rounded-xl border-white/5 mb-10 w-full">
            <div className="flex justify-between items-center mb-4">
              <span className="font-mono text-xs tracking-widest text-neutral-400 uppercase">Acoustic Disassembly</span>
              <span className="font-mono text-xs text-chartreuse-light font-bold">{explosionFactor}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={explosionFactor}
              onChange={(e) => setExplosionFactor(parseInt(e.target.value))}
              className="w-full h-[2px] bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-chartreuse-light"
            />
            <div className="flex justify-between text-[9px] font-mono text-neutral-600 mt-2">
              <span>ASSEMBLED</span>
              <span>EXPLODED STAGE</span>
            </div>
          </div>

          {/* Active Detail Display */}
          <div className="min-h-[160px] relative">
            <AnimatePresence mode="wait">
              {activeComponent ? (
                <motion.div
                  key={activeComponent}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="glass-panel p-6 rounded-xl border-chartreuse-light/20 bg-chartreuse-light/[0.02]"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-chartreuse-light/10 rounded-lg border border-chartreuse-light/20">
                      {productDetails[activeComponent].icon}
                    </div>
                    <div>
                      <h4 className="font-syne font-bold text-white text-base uppercase tracking-wider">
                        {productDetails[activeComponent].title}
                      </h4>
                      <span className="font-mono text-[10px] text-chartreuse-light/75 uppercase tracking-widest">
                        {productDetails[activeComponent].spec}
                      </span>
                    </div>
                  </div>
                  <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light">
                    {productDetails[activeComponent].desc}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center p-8 border border-dashed border-white/5 rounded-xl text-center"
                >
                  <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest">
                    Select a hotspot [●] or slide to explore details
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Interactive Product Explosion Canvas */}
        <div className="lg:col-span-7 relative order-1 lg:order-2 flex items-center justify-center h-[50vh] md:h-[60vh] lg:h-[70vh]">
          
          {/* Circular vector grid under headphones */}
          <div className="absolute w-[80%] aspect-square rounded-full border border-dashed border-white/5 pointer-events-none" />

          {/* Disassembled Headphone Layers */}
          <div className="relative w-[280px] min-[375px]:w-[340px] md:w-[400px] h-[280px] min-[375px]:h-[340px] md:h-[400px] flex items-center justify-center">
            
            {/* 1. Main Headset Base Image (fades out as it disassembles) */}
            <motion.div
              style={{
                opacity: Math.max(0.1, 1 - explosionFactor / 80),
                scale: 1 + (explosionFactor / 300),
                filter: `brightness(${1 - explosionFactor / 200})`
              }}
              className="absolute w-full h-full pointer-events-none z-10"
              transition={{ type: "spring", stiffness: 60 }}
            >
              <img 
                src="/flagship_headphones.png" 
                alt="Nova Headphones"
                className="w-full h-full object-contain filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
              />
            </motion.div>

            {/* Exploded Layer A: Headband (Moves up) */}
            <motion.div
              style={{
                y: -explosionFactor * 0.9,
                opacity: explosionFactor > 10 ? explosionFactor / 100 : 0,
                scale: 0.95 + (explosionFactor / 600)
              }}
              className="absolute w-full h-full pointer-events-none z-20 flex items-center justify-center"
            >
              {/* Custom SVG stylized outline representation */}
              <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] text-chartreuse-light stroke-[0.5] fill-none opacity-80">
                <path d="M20,40 Q50,15 80,40" stroke="currentColor" strokeDasharray="2,2" />
                <path d="M25,38 Q50,18 75,38" stroke="currentColor" />
              </svg>
            </motion.div>

            {/* Exploded Layer B: Left Earcup/Chamber (Moves left and back) */}
            <motion.div
              style={{
                x: -explosionFactor * 0.9,
                rotate: -explosionFactor * 0.15,
                opacity: explosionFactor > 10 ? explosionFactor / 100 : 0
              }}
              className="absolute w-full h-full pointer-events-none z-20 flex items-center justify-center"
            >
              <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] text-chartreuse-muted stroke-[0.5] fill-none opacity-60">
                <ellipse cx="28" cy="58" rx="10" ry="16" stroke="currentColor" />
                <line x1="28" y1="42" x2="18" y2="58" stroke="currentColor" strokeDasharray="1,1" />
              </svg>
            </motion.div>

            {/* Exploded Layer C: Left Driver (Moves left, slightly forward) */}
            <motion.div
              style={{
                x: -explosionFactor * 0.6,
                rotate: -explosionFactor * 0.05,
                opacity: explosionFactor > 15 ? explosionFactor / 100 : 0
              }}
              className="absolute w-full h-full pointer-events-none z-20 flex items-center justify-center"
            >
              <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] text-white stroke-[0.7] fill-none opacity-90">
                <circle cx="34" cy="58" r="7" stroke="currentColor" />
                <circle cx="34" cy="58" r="3" stroke="currentColor" />
              </svg>
            </motion.div>

            {/* Exploded Layer D: Right Cushion (Moves right) */}
            <motion.div
              style={{
                x: explosionFactor * 1.1,
                rotate: explosionFactor * 0.1,
                opacity: explosionFactor > 10 ? explosionFactor / 100 : 0
              }}
              className="absolute w-full h-full pointer-events-none z-20 flex items-center justify-center"
            >
              <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] text-chartreuse-light stroke-[0.5] fill-none opacity-70">
                <ellipse cx="72" cy="58" rx="8" ry="15" stroke="currentColor" />
                <path d="M72,43 Q76,58 72,73" stroke="currentColor" strokeDasharray="2,2" />
              </svg>
            </motion.div>

            {/* Interactive Hotspots Overlay */}
            {explosionFactor === 0 && hotspots.map((spot) => (
              <button
                key={spot.id}
                onClick={() => setActiveComponent(spot.id)}
                className="absolute z-30 group cursor-pointer"
                style={{ left: spot.x, top: spot.y }}
              >
                {/* Outer pulsing ring */}
                <span className="absolute -inset-3 flex items-center justify-center">
                  <span className="w-8 h-8 rounded-full bg-chartreuse-light/10 border border-chartreuse-light/30 animate-ping [animation-duration:2.5s]" />
                </span>
                {/* Main dot */}
                <div className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                  activeComponent === spot.id 
                    ? "bg-white border-chartreuse-light scale-125" 
                    : "bg-chartreuse-light border-black group-hover:bg-white group-hover:scale-110"
                }`} />
                
                {/* Floating label */}
                <span className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded text-[9px] font-mono tracking-wider text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none uppercase">
                  {spot.id}
                </span>
              </button>
            ))}

            {/* Helper HUD overlay when exploded */}
            {explosionFactor > 30 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 border border-white/5 pointer-events-none font-mono text-[8px] text-neutral-500 p-4 flex flex-col justify-between"
              >
                <div className="flex justify-between">
                  <span>DISASSEMBLY MODE: ACTIVE</span>
                  <span>LAYERS DETECTED: 04</span>
                </div>
                <div className="flex justify-between">
                  <span>CALIBRATION: STABLE</span>
                  <span>AXIS: X/Y COMPENSATED</span>
                </div>
              </motion.div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
