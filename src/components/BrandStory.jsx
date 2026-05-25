import { motion } from "framer-motion";

export default function BrandStory() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <section 
      id="story"
      className="relative w-full min-h-screen bg-[#020204] py-24 md:py-36 px-6 md:px-12 flex flex-col justify-center items-center overflow-hidden border-t border-white/5"
    >
      {/* Background soft lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-chartreuse-muted/3 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Section Heading Tag */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="flex items-center space-x-2 text-chartreuse-light/60 mb-8"
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase">THE PHILOSOPHY</span>
        </motion.div>

        {/* Large Editorial Philosophy Statement */}
        <div className="max-w-4xl text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-150px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-5xl lg:text-6xl font-syne font-medium text-white leading-tight tracking-tight uppercase"
          >
            Acoustics is not just physics. <br />
            It is <span className="text-chartreuse-accent-gradient font-bold italic">emotional transport</span>.
          </motion.h2>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
            className="w-24 h-[1px] bg-chartreuse-muted/40 mx-auto my-10 origin-center"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-neutral-400 text-base md:text-xl font-light leading-relaxed max-w-2xl mx-auto font-sans"
          >
            Nova Audio was founded to bridge the gap between studio master tracks and consumer playback. By modeling acoustic wave propagation and ear canal reflections, we build reference monitors that reproduce the scale and dynamics of the original performance.
          </motion.p>
        </div>

        {/* Brand Pillars Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full text-left"
        >
          {/* Card 1 */}
          <motion.div 
            variants={itemVariants}
            className="glass-panel glass-panel-hover p-8 md:p-10 rounded-xl relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="font-mono text-xs text-chartreuse-light/60 mb-6 tracking-widest">01 / IMMERSION</div>
            <h3 className="font-syne text-xl font-bold text-white mb-4 uppercase tracking-wider">Acoustic Cavity Design</h3>
            <p className="text-neutral-400 text-sm leading-relaxed font-light">
              By pairing custom neodymium transducers with damped composite rear chambers, we control internal air pressure to minimize distortion and widen the soundstage.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            variants={itemVariants}
            className="glass-panel glass-panel-hover p-8 md:p-10 rounded-xl relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="font-mono text-xs text-chartreuse-light/60 mb-6 tracking-widest">02 / PRECISION</div>
            <h3 className="font-syne text-xl font-bold text-white mb-4 uppercase tracking-wider">Precision Calibration</h3>
            <p className="text-neutral-400 text-sm leading-relaxed font-light">
              Every mechanical element, from the CNC-machined aerospace alloy hinges to the suspension gimbals, is calibrated to ensure uniform clamping pressure and long-term durability.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            variants={itemVariants}
            className="glass-panel glass-panel-hover p-8 md:p-10 rounded-xl relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="font-mono text-xs text-chartreuse-light/60 mb-6 tracking-widest">03 / LUXURY</div>
            <h3 className="font-syne text-xl font-bold text-white mb-4 uppercase tracking-wider">Material Integrity</h3>
            <p className="text-neutral-400 text-sm leading-relaxed font-light">
              Selected full-grain leather, high-breathability mesh liners, and anodized aluminum alloys are selected for physical comfort, thermal dissipation, and long-term wear.
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
