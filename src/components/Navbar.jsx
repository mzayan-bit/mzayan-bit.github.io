import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("about");

  // Smooth section tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "projects", "contact"];
      let current = "";
      sections.forEach((section) => {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 200) {
          current = section;
        }
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass px-6 py-3 rounded-full flex justify-between items-center gap-8 border border-white/10 shadow-glass-card backdrop-blur-xl bg-bg/50"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full border border-neon-cyan flex items-center justify-center text-neon-cyan text-xs font-bold shadow-neon-cyan relative overflow-hidden">
          <div className="absolute inset-0 bg-neon-cyan/20 animate-pulse"></div>
          <span className="relative z-10">MZ</span>
        </div>
      </div>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-6">
        {["about", "projects", "contact"].map((item) => (
          <a 
            key={item} 
            href={`#${item}`}
            className="relative text-sm font-medium transition-colors"
          >
            <span className={activeSection === item ? "text-neon-cyan" : "text-muted hover:text-white"}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </span>
            {activeSection === item && (
              <motion.div 
                layoutId="nav-indicator"
                className="absolute -bottom-2 left-0 right-0 h-[2px] bg-neon-cyan shadow-neon-cyan"
              />
            )}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <a href="https://github.com/mzayan-bit" target="_blank" rel="noreferrer" className="text-muted hover:text-neon-cyan transition-colors">
          <FaGithub size={18}/>
        </a>
        <a href="https://www.linkedin.com/in/muhammad-zayan-16622829b/" target="_blank" rel="noreferrer" className="text-muted hover:text-neon-purple transition-colors">
          <FaLinkedin size={18}/>
        </a>
        
        <a 
          href="/resume.pdf" 
          target="_blank"
          rel="noreferrer"
          className="bg-gradient-to-r from-neon-cyan to-neon-purple px-5 py-1.5 rounded-full font-bold text-bg text-sm hover:opacity-90 hover:shadow-neon-cyan transition-all transform hover:scale-105"
        >
          Resume
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;