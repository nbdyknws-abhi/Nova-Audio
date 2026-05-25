import { motion } from "framer-motion";
import { useState } from "react";

export default function Technology() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const technologies = [
    {
      id: "spatial",
      title: "Spatial Wavefront Synthesis",
      subtitle: "3D OBJECT TRACKING",
      desc: "Processes up to 128 discrete audio channels simultaneously, positioning them in a spherical acoustic space that adjusts dynamically to head movements.",
      // custom visual outline
      visual: (
        <svg viewBox="0 0 100 100" className="w-24 h-24 stroke-[0.7] text-chartreuse-light fill-none mx-auto opacity-75">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeDasharray="3,3" className="animate-spin [animation-duration:12s]" />
          <circle cx="50" cy="50" r="28" stroke="currentColor" />
          <circle cx="50" cy="50" r="14" stroke="currentColor" strokeDasharray="1,1" />
          {/* Orbital nodes */}
          <circle cx="50" cy="10" r="2" fill="currentColor" />
          <circle cx="22" cy="50" r="2" fill="currentColor" />
          <circle cx="78" cy="50" r="2.5" fill="currentColor" />
          {/* Centroid node */}
          <circle cx="50" cy="50" r="4" fill="currentColor" className="animate-pulse" />
        </svg>
      )
    },
    {
      id: "noise",
      title: "Adaptive Noise Cancellation",
      subtitle: "HYBRID FEEDFORWARD/FEEDBACK ANC",
      desc: "Internal and external microphones sample ambient noise at 64 kHz, generating a precise anti-phase wave that attenuates external noise according to the ear canal seal.",
      visual: (
        <svg viewBox="0 0 100 100" className="w-24 h-24 stroke-[0.7] text-white fill-none mx-auto opacity-75">
          {/* Disruptive outer wave */}
          <path d="M10,35 Q25,10 40,55 T70,25 T90,65" stroke="currentColor" strokeDasharray="1,1" className="opacity-40" />
          {/* Inverted cancel-wave */}
          <path d="M10,65 Q25,90 40,45 T70,75 T90,35" stroke="currentColor" className="opacity-60" />
          {/* Resulting flat wave (representing silence) */}
          <line x1="10" y1="50" x2="90" y2="50" stroke="#ccff00" strokeWidth="1.5" className="animate-pulse" />
        </svg>
      )
    },
    {
      id: "bass",
      title: "Acoustic Sub-Bass Controller",
      subtitle: "SUB-BASS EXTENSION",
      desc: "A low-latency DSP block monitors signal amplitude, optimizing low-frequency output below 30Hz without muddying the lower mid-range.",
      visual: (
        <svg viewBox="0 0 100 100" className="w-24 h-24 stroke-[0.7] text-chartreuse-muted fill-none mx-auto opacity-75">
          {/* Concentric expanding bass waves */}
          <circle cx="50" cy="50" r="10" stroke="currentColor" className="animate-ping [animation-duration:3s]" />
          <circle cx="50" cy="50" r="20" stroke="currentColor" className="animate-ping [animation-duration:4s]" />
          <circle cx="50" cy="50" r="30" stroke="currentColor" />
          {/* Bar lines */}
          <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeDasharray="1,4" />
          <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeDasharray="1,4" />
        </svg>
      )
    },
    {
      id: "mapping",
      title: "Acoustic Calibration Engine",
      subtitle: "ROOM ACOUSTIC COMPENSATION",
      desc: "Measures ear canal volume and transducer coupling upon startup, adjusting the playback EQ curve to match target response curves.",
      visual: (
        <svg viewBox="0 0 100 100" className="w-24 h-24 stroke-[0.7] text-white fill-none mx-auto opacity-75">
          {/* Spatial Grid perspective mesh */}
          <polygon points="20,20 80,20 90,80 10,80" stroke="currentColor" strokeDasharray="2,2" />
          <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" />
          <line x1="20" y1="20" x2="10" y2="80" stroke="currentColor" />
          <line x1="80" y1="20" x2="90" y2="80" stroke="currentColor" />
          {/* Scan line */}
          <line x1="10" y1="40" x2="90" y2="40" stroke="#ccff00" className="animate-bounce [animation-duration:5s]" />
        </svg>
      )
    }
  ];

  return (
    <section 
      id="technology"
      className="relative w-full min-h-screen bg-[#030303] py-24 md:py-36 px-6 md:px-12 flex flex-col justify-center items-center overflow-hidden border-t border-white/5"
    >
      {/* Background soft ambient glowing light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-chartreuse-muted/[0.02] blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto z-10">
        
        {/* Title Heading */}
        <div className="text-left mb-20 max-w-2xl">
          <div className="flex items-center space-x-2 text-chartreuse-light/60 mb-6">
            <span className="font-mono text-xs tracking-[0.3em] uppercase">SYSTEM ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-syne font-bold text-white uppercase tracking-tight">
            Acoustic <br />
            <span className="text-chartreuse-accent-gradient">Super-computing</span>
          </h2>
          <p className="text-neutral-400 font-light text-sm md:text-base leading-relaxed mt-6">
            We don't rely on off-the-shelf microchips. The Aether-X runs on custom silicon neural engines designed solely to process multi-channel acoustics with zero lag.
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {technologies.map((tech) => (
            <div
              key={tech.id}
              className="glass-panel glass-panel-hover p-8 md:p-12 rounded-2xl relative overflow-hidden transition-all duration-500 flex flex-col sm:flex-row gap-8 items-center cursor-default"
              onMouseEnter={() => setHoveredCard(tech.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Responsive glow effect inside card */}
              {hoveredCard === tech.id && (
                <motion.div 
                  layoutId="activeGlow"
                  className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(204,255,0,0.05)_0%,rgba(0,0,0,0)_60%)] pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}

              {/* Left Column: Visual dynamic vector representation */}
              <div className="w-32 h-32 flex-shrink-0 flex items-center justify-center bg-black/40 border border-white/5 rounded-xl">
                {tech.visual}
              </div>

              {/* Right Column: Descriptions */}
              <div className="text-left flex-grow">
                <span className="font-mono text-[9px] tracking-[0.25em] text-chartreuse-light font-bold mb-2 block">
                  {tech.subtitle}
                </span>
                <h3 className="font-syne text-xl font-bold text-white mb-4 uppercase tracking-wider">
                  {tech.title}
                </h3>
                <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light">
                  {tech.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
