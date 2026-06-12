import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section id="contact" className="relative py-32 px-6 max-w-4xl mx-auto z-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="glass p-10 md:p-16 rounded-[2.5rem] text-center relative overflow-hidden bg-card/60 border border-white/10 shadow-glass-card"
      >
        {/* Background Glow */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-96 h-96 bg-neon-purple blur-[150px] opacity-20 pointer-events-none z-0"></div>

        <div className="relative z-10">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold mb-6"
          >
            Initialize <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">Connection</span>
          </motion.h2>
          <p className="text-muted text-lg mb-12 max-w-xl mx-auto font-light">
            Whether you're interested in my computer vision models or full stack architecture, my inbox is open for collaborations.
          </p>

          <form action="https://formspree.io/f/xbdlvber" method="POST" className="max-w-md mx-auto space-y-5 text-left">
            <div className="group">
              <label className="text-xs font-bold text-muted block mb-2 tracking-widest uppercase">Name</label>
              <input type="text" name="name" required className="w-full bg-bg/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_15px_rgba(0,229,255,0.2)] transition-all" placeholder="John Doe" />
            </div>
            <div className="group">
              <label className="text-xs font-bold text-muted block mb-2 tracking-widest uppercase">Email</label>
              <input type="email" name="email" required className="w-full bg-bg/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_15px_rgba(0,229,255,0.2)] transition-all" placeholder="john@example.com" />
            </div>
            <div className="group">
              <label className="text-xs font-bold text-muted block mb-2 tracking-widest uppercase">Message</label>
              <textarea name="message" rows={4} required className="w-full bg-bg/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_15px_rgba(0,229,255,0.2)] transition-all resize-none" placeholder="Your message here..." />
            </div>
            
            <button type="submit" className="w-full py-4 mt-4 relative group overflow-hidden rounded-xl font-bold text-bg transition-all hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-purple transition-all group-hover:opacity-90"></div>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10">Transmit Message</span>
            </button>
          </form>
        </div>
      </motion.div>
      
      {/* Footer */}
      <footer className="relative mt-32 text-center pb-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] max-w-md bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] max-w-md bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-50"
        />
        <p className="text-muted text-sm pt-8 font-light hover:text-white hover:text-glow-cyan transition-all duration-300 cursor-default">
          © {new Date().getFullYear()} Muhammad Zayan. Engineered with Precision.
        </p>
      </footer>
    </section>
  );
};

export default Contact;