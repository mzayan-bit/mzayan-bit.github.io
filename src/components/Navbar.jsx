import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaBars, FaTimes } from "react-icons/fa";
import { useMagnetic } from "../hooks/useMotion";

const navItems = [
  { id: "about", label: "About" },
  { id: "interests", label: "Interests" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("about");
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const resumeRef = useMagnetic(0.25);

  // Smooth section tracking + hide on scroll down
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = navItems.map((item) => item.id);
      let current = "";
      sectionIds.forEach((section) => {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 220) {
          current = section;
        }
      });
      if (current) setActiveSection(current);

      // Auto-hide on scroll down, show on scroll up (unless mobile menu is open)
      if (!mobileMenuOpen) {
        setHidden(window.scrollY > lastScrollY.current && window.scrollY > 120);
      }
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.nav
        data-hero-navbar
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 glass px-5 md:px-7 py-2.5 rounded-full flex justify-between items-center gap-6 md:gap-8 border border-white/10 shadow-glass-card backdrop-blur-xl bg-bg/60 max-w-[95vw] md:max-w-max"
        style={{ opacity: 0 }}
      >
        {/* Brand Monogram */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full border border-neon-cyan flex items-center justify-center text-neon-cyan text-xs font-bold shadow-neon-cyan relative overflow-hidden group-hover:scale-105 transition-transform">
            <div className="absolute inset-0 bg-neon-cyan/20 animate-pulse"></div>
            <span className="relative z-10 font-mono">MZ</span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-6">
          {navItems.map((item) => (
            <a 
              key={item.id} 
              href={`#${item.id}`}
              className="relative text-xs font-medium transition-colors nav-link-hover py-1"
            >
              <span className={activeSection === item.id ? "text-neon-cyan font-semibold" : "text-muted hover:text-white"}>
                {item.label}
              </span>
              <AnimatePresence>
                {activeSection === item.id && (
                  <motion.div 
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-neon-cyan shadow-neon-cyan"
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

        {/* Right CTA & Socials */}
        <div className="flex items-center gap-3 md:gap-4">
          <a 
            href="https://github.com/mzayan-bit" 
            target="_blank" 
            rel="noreferrer" 
            aria-label="GitHub Profile"
            className="text-muted hover:text-neon-cyan transition-colors icon-hover p-1"
          >
            <FaGithub size={17}/>
          </a>
          <a 
            href="https://www.linkedin.com/in/muhammad-zayan-16622829b/" 
            target="_blank" 
            rel="noreferrer" 
            aria-label="LinkedIn Profile"
            className="text-muted hover:text-neon-purple transition-colors icon-hover p-1"
          >
            <FaLinkedin size={17}/>
          </a>
          
          <a 
            ref={resumeRef}
            href="/resume.pdf" 
            target="_blank"
            rel="noreferrer"
            className="magnetic-btn bg-gradient-to-r from-neon-cyan to-neon-purple px-4 md:px-5 py-1.5 rounded-full font-bold text-bg text-xs md:text-sm hover:opacity-90 hover:shadow-neon-cyan transition-all"
          >
            Resume
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden text-white/80 hover:text-neon-cyan p-1.5 focus:outline-none"
          >
            {mobileMenuOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-40 w-[90vw] max-w-sm glass rounded-3xl p-6 bg-card/95 border border-white/10 shadow-2xl backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeSection === item.id
                      ? "bg-neon-cyan/10 text-neon-cyan font-bold border border-neon-cyan/20"
                      : "text-muted hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;