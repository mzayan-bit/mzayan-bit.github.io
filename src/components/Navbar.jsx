import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useMagnetic } from "../hooks/useMotion";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("about");
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const resumeRef = useMagnetic(0.25);

  // Smooth section tracking + hide on scroll down
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

      // Auto-hide on scroll down, show on scroll up
      setHidden(window.scrollY > lastScrollY.current && window.scrollY > 100);
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      data-hero-navbar
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass px-6 py-3 rounded-full flex justify-between items-center gap-8 border border-white/10 shadow-glass-card backdrop-blur-xl bg-bg/50"
      style={{ opacity: 0 }}
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
            className="relative text-sm font-medium transition-colors nav-link-hover"
          >
            <span className={activeSection === item ? "text-neon-cyan" : "text-muted hover:text-white"}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </span>
            <AnimatePresence>
              {activeSection === item && (
                <motion.div 
                  layoutId="nav-indicator"
                  className="absolute -bottom-2 left-0 right-0 h-[2px] bg-neon-cyan shadow-neon-cyan"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </AnimatePresence>
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <a href="https://github.com/mzayan-bit" target="_blank" rel="noreferrer" className="text-muted hover:text-neon-cyan transition-colors icon-hover">
          <FaGithub size={18}/>
        </a>
        <a href="https://www.linkedin.com/in/muhammad-zayan-16622829b/" target="_blank" rel="noreferrer" className="text-muted hover:text-neon-purple transition-colors icon-hover">
          <FaLinkedin size={18}/>
        </a>
        
        <a 
          ref={resumeRef}
          href="/resume.pdf" 
          target="_blank"
          rel="noreferrer"
          className="magnetic-btn bg-gradient-to-r from-neon-cyan to-neon-purple px-5 py-1.5 rounded-full font-bold text-bg text-sm hover:opacity-90 hover:shadow-neon-cyan transition-all"
        >
          Resume
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;