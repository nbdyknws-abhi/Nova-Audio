import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { KeyRound, ShieldCheck } from "lucide-react";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    // Simulate premium system allocation lag
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <section 
      id="cta"
      className="relative w-full min-h-screen bg-[#030303] py-24 px-6 md:px-12 flex flex-col justify-center items-center overflow-hidden border-t border-white/5"
    >
      {/* Background massive glowing aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[radial-gradient(circle_at_center,rgba(204,255,0,0.04)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />

      {/* Atmospheric technical grids */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#030303_90%)] z-1" />

      <div className="w-full max-w-4xl mx-auto text-center z-10 flex flex-col items-center">
        
        {/* Tiny tag */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex items-center space-x-2 text-chartreuse-light/60 mb-8"
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase font-bold">LIMITED PRODUCTION</span>
        </motion.div>

        {/* High Impact Ending Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-syne font-extrabold text-white leading-tight uppercase tracking-tighter mb-8"
        >
          Experience Audio <br />
          <span className="text-chartreuse-accent-gradient">Secure Your Allocation.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-neutral-400 font-light text-sm md:text-base max-w-lg mb-12 leading-relaxed"
        >
          Initial production of the Aether-X is limited to 500 hand-calibrated units. Register your interest to secure an allocation key.
        </motion.p>

        {/* Interactive Console Reservation Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-full max-w-md glass-panel p-8 rounded-2xl border-white/5 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-chartreuse-light/20 to-transparent" />

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form 
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col space-y-4 text-left"
              >
                <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-1">
                  <span>WAITING QUEUE PROTOCOL</span>
                  <span>STATUS: WAITING</span>
                </div>

                <div className="relative">
                  <input 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER EMAIL ADDRESS"
                    className="w-full bg-black/60 border border-white/10 focus:border-chartreuse-light/40 text-xs md:text-sm text-white px-5 py-4 rounded font-mono placeholder:text-neutral-600 focus:outline-none tracking-widest text-center uppercase"
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-shine-hover w-full py-4 bg-gradient-to-r from-chartreuse-dark to-chartreuse-muted hover:from-chartreuse-light hover:to-chartreuse-dark text-black font-mono text-xs font-bold tracking-[0.2em] rounded uppercase transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 cursor-pointer shadow-[0_4px_20px_rgba(204,255,0,0.1)]"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <KeyRound className="w-4 h-4" />
                      <span>SUBMIT ALLOCATION REQUEST</span>
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center py-6 text-center"
              >
                <div className="w-12 h-12 bg-chartreuse-light/10 border border-chartreuse-light/30 rounded-full flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6 text-chartreuse-light" />
                </div>
                <h4 className="font-syne font-bold text-white text-lg uppercase tracking-wider mb-2">
                  Request Received
                </h4>
                <p className="text-neutral-400 font-mono text-[10px] tracking-widest uppercase mb-4">
                  KEY #NOVA-{Math.floor(Math.random() * 9000 + 1000)} ISSUED
                </p>
                <p className="text-neutral-400 text-xs font-light max-w-xs leading-relaxed">
                  A confirmation email and allocation schedule have been sent to <span className="text-white font-mono">{email}</span>.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
