import { motion } from "framer-motion";
import { Settings, BarChart2, Cpu, Activity } from "lucide-react";

export default function CaseStudy() {
  const specs = [
    { label: "FRAME RATE", val: "60 FPS", desc: "GPU locked rendering", icon: <Activity className="w-4 h-4 text-chartreuse-light" /> },
    { label: "FRAME TIME", val: "16.6 MS", desc: "Direct hardware compositing", icon: <Cpu className="w-4 h-4 text-chartreuse-light" /> },
    { label: "SCROLL BUFFER", val: "LENIS-V1.3", desc: "Inertial easing multiplier", icon: <Settings className="w-4 h-4 text-chartreuse-light" /> },
    { label: "LCP METRIC", val: "<180 MS", desc: "Procedural assets & caching", icon: <BarChart2 className="w-4 h-4 text-chartreuse-light" /> }
  ];

  return (
    <section 
      id="casestudy"
      className="relative w-full bg-[#060608] py-24 md:py-36 px-6 md:px-12 flex flex-col justify-center items-center overflow-hidden border-t border-white/5"
    >
      {/* Background wireframe grids */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
      
      {/* Soft spotlight overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(130,166,0,0.06)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Large statement and editorial text */}
          <div className="lg:col-span-7 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex items-center space-x-2 text-chartreuse-light/60 mb-6"
            >
              <span className="font-mono text-xs tracking-[0.3em] uppercase font-bold">CASE STUDY INSIGHT</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl md:text-4xl font-syne font-bold text-white uppercase tracking-wider mb-8 leading-tight"
            >
              Peak Motion <br />
              <span className="text-chartreuse-accent-gradient">& Brand Integration</span>
            </motion.h2>

            {/* Crucial Required Text Block */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="text-neutral-300 font-cinzel text-lg md:text-xl italic leading-relaxed border-l-2 border-chartreuse-light/40 pl-6 my-10 text-justify"
            >
              “This fictional client assignment represents a peak integration of motion frameworks and brand storytelling. The experience combines cinematic transitions, immersive product choreography, custom shader-inspired visuals, fluid typography systems, and physics-driven interactions to create a premium digital campaign that feels luxurious, fast, and emotionally engaging.”
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-neutral-400 font-sans text-xs md:text-sm leading-relaxed max-w-xl font-light"
            >
              By combining high-performance frameworks (GSAP ScrollTrigger, Lenis scrolling inertia, and custom WebGL shaders) directly inside a modular React structure, we deliver a narrative that mirrors the high fidelity of premium audio engineering.
            </motion.p>
          </div>

          {/* Right Column: Lab dashboard stats */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-panel p-8 rounded-2xl border-white/5 bg-black/40 relative overflow-hidden"
            >
              {/* Card headers */}
              <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                <span className="font-mono text-[10px] tracking-widest text-neutral-500">SYS_MONITOR: ACTIVE</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-6 text-left">
                {specs.map((spec, i) => (
                  <div key={i} className="flex flex-col space-y-1.5">
                    <div className="flex items-center space-x-2">
                      {spec.icon}
                      <span className="font-mono text-[9px] tracking-wider text-neutral-500 uppercase">{spec.label}</span>
                    </div>
                    <span className="font-syne text-xl font-extrabold text-white tracking-wide">{spec.val}</span>
                    <span className="text-[10px] font-sans text-neutral-500 leading-tight font-light">{spec.desc}</span>
                  </div>
                ))}
              </div>

              {/* Decorative wave graph mock */}
              <div className="mt-8 border-t border-white/5 pt-6 flex items-center justify-between">
                <span className="font-mono text-[9px] text-neutral-500">SHADER_THREAD_LOAD</span>
                <div className="flex space-x-0.5 h-6 items-end">
                  {[4, 10, 15, 6, 8, 20, 16, 24, 12, 18, 10, 4].map((h, index) => (
                    <div 
                      key={index} 
                      className="w-1 bg-chartreuse-light/40 rounded-t-sm" 
                      style={{ height: `${h}px` }} 
                    />
                  ))}
                </div>
              </div>

            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
