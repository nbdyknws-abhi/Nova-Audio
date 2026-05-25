import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("CALIBRATING ACOUSTIC CHAMBERS...");

  useEffect(() => {
    const statuses = [
      "ESTABLISHING SECURE PROTOCOLS...",
      "CALIBRATING ACOUSTIC CHAMBERS...",
      "TUNING QUANTUM SPATIAL DSP...",
      "ALIGNING NEURAL BASS FIELD...",
      "SYNCHRONIZING AUDIO PATHWAYS...",
      "SYSTEMS READY."
    ];

    // Smooth loading increment
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 2;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 600);
          return 100;
        }
        
        // Update status text based on progress range
        const statusIdx = Math.floor((next / 100) * statuses.length);
        if (statuses[statusIdx]) {
          setStatusText(statuses[statusIdx]);
        }

        return next;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030303] text-white select-none px-6"
      exit={{ 
        y: "-100%", 
        transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] } 
      }}
    >
      {/* Background radial soft ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,150,199,0.08)_0%,rgba(0,0,0,0)_60%)]" />

      <div className="w-full max-w-lg z-10 flex flex-col items-center">
        {/* Sleek Minimal Logo Text */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-3 mb-16"
        >
          <div className="w-6 h-6 border border-teal-light/40 rounded-full flex items-center justify-center animate-spin [animation-duration:6s]">
            <div className="w-2 h-2 bg-teal-light rounded-full" />
          </div>
          <span className="font-syne font-bold text-xl tracking-[0.4em] text-white">NOVA AUDIO</span>
        </motion.div>

        {/* Big percentage indicator */}
        <div className="overflow-hidden h-24 mb-4 flex items-end">
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-7xl md:text-8xl font-syne font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 select-none tabular-nums"
          >
            {progress}%
          </motion.h1>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-[1px] bg-neutral-900 overflow-hidden mb-6 relative">
          <motion.div
            className="h-full bg-teal-light"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>

        {/* Calibrating Status logs */}
        <div className="h-6 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={statusText}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="text-[10px] uppercase font-mono tracking-[0.25em] text-teal-muted/80 text-center"
            >
              {statusText}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Decorative corners for tech commercial feel */}
      <div className="absolute top-8 left-8 w-8 h-[1px] bg-white/10" />
      <div className="absolute top-8 left-8 w-[1px] h-8 bg-white/10" />
      <div className="absolute top-8 right-8 w-8 h-[1px] bg-white/10" />
      <div className="absolute top-8 right-8 w-[1px] h-8 bg-white/10" />
      <div className="absolute bottom-8 left-8 w-8 h-[1px] bg-white/10" />
      <div className="absolute bottom-8 left-8 w-[1px] h-8 bg-white/10" />
      <div className="absolute bottom-8 right-8 w-8 h-[1px] bg-white/10" />
      <div className="absolute bottom-8 right-8 w-[1px] h-8 bg-white/10" />
    </motion.div>
  );
}
