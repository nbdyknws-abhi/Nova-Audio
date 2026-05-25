import { motion } from "framer-motion";

export default function Testimonials() {
  const reviews = [
    {
      quote: "The spatial separation on the Aether-X is incredibly accurate. I can pinpoint the exact placement of individual cellos in a dense 110-piece symphonic mix. It recreates the conductor's podium with zero acoustic blur.",
      author: "Marcus Thorne",
      title: "Grammy-winning Film Composer",
      metric: "MIX FIDELITY: 99.8%"
    },
    {
      quote: "The ambient isolation is remarkably flat across the frequency spectrum. Its active cancellation removes low-frequency room drone without introducing the typical high-frequency hiss, allowing micro-details in the mix to stand out clearly.",
      author: "Elena Rostova",
      title: "Acoustic Architect & Sound Designer",
      metric: "ISOLATION: -38DB"
    },
    {
      quote: "An exceptional balance of minimalist design and high-end acoustic resolution. The mechanical build feels substantial, and the driver response is fast and analytical.",
      author: "Silas Vance",
      title: "Editor-in-Chief, LUXE Tech",
      metric: "SCORE: 10/10"
    }
  ];

  return (
    <section 
      id="testimonials"
      className="relative w-full min-h-screen bg-[#030303] py-24 md:py-36 px-6 md:px-12 flex flex-col justify-center items-center overflow-hidden border-t border-white/5"
    >
      {/* Background ambient lighting */}
      <div className="absolute bottom-1/4 right-1/3 w-[50vw] h-[50vw] bg-chartreuse-muted/[0.03] blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto z-10">
        
        {/* Title */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center space-x-2 text-chartreuse-light/60 mb-6">
            <span className="font-mono text-xs tracking-[0.3em] uppercase font-bold">CRITICAL ACCLAIM</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-syne font-bold text-white uppercase tracking-tight">
            Endorsed By <span className="text-chartreuse-accent-gradient">Creators</span>
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="glass-panel p-8 md:p-10 rounded-xl relative overflow-hidden flex flex-col justify-between h-full hover:border-chartreuse-light/20 transition-all duration-500 group"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              
              {/* Giant Quotation Mark */}
              <span className="text-6xl font-cinzel text-chartreuse-light/10 absolute top-4 left-4 select-none pointer-events-none">
                “
              </span>

              {/* Quote text */}
              <p className="text-neutral-300 font-sans text-sm md:text-base leading-relaxed font-light mb-12 relative z-10 text-justify">
                {rev.quote}
              </p>

              {/* Author Footer */}
              <div className="border-t border-white/5 pt-6">
                <span className="font-mono text-[9px] text-chartreuse-light tracking-widest block mb-2 font-bold uppercase">
                  {rev.metric}
                </span>
                <h4 className="font-syne text-sm font-bold text-white uppercase tracking-wider">
                  {rev.author}
                </h4>
                <p className="text-neutral-500 text-[11px] font-sans font-light mt-0.5">
                  {rev.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
