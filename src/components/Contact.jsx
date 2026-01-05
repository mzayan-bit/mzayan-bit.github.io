import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="glass p-8 md:p-12 rounded-3xl text-center relative overflow-hidden"
      >
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-neon-blue blur-[120px] opacity-20 -z-10"></div>

        <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Connect</h2>
        <p className="text-muted text-lg mb-10 max-w-xl mx-auto">
          Whether you have a question about my CV models or just want to say hi, my inbox is open!
        </p>

        {/* Replace YOUR_FORMSPREE_ID with your actual ID */}
        <form action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST" className="max-w-md mx-auto space-y-4 text-left">
          <div>
            <label className="text-sm font-medium text-muted block mb-2">Name</label>
            <input type="text" name="name" required className="w-full bg-card border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-neon-blue transition-colors" />
          </div>
          <div>
            <label className="text-sm font-medium text-muted block mb-2">Email</label>
            <input type="email" name="email" required className="w-full bg-card border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-neon-blue transition-colors" />
          </div>
          <div>
            <label className="text-sm font-medium text-muted block mb-2">Message</label>
            <textarea name="message" rows={4} required className="w-full bg-card border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-neon-blue transition-colors" />
          </div>
          
          <button type="submit" className="w-full py-3 bg-gradient-to-r from-neon-purple to-neon-blue rounded-lg font-bold text-bg hover:opacity-90 transition-opacity">
            Send Message
          </button>
        </form>

      </motion.div>
      
      <footer className="text-center mt-20 text-muted text-sm">
        <p>© 2026 Muhammad Zayan. All rights reserved.</p>
      </footer>
    </section>
  );
};

export default Contact;