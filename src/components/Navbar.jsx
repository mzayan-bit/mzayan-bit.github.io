import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full z-50 glass px-6 py-4 flex justify-between items-center border-b border-white/5"
    >
      <div className="flex items-center gap-4">
        {/* Neon Logo */}
        <div className="w-10 h-10 rounded-full border-2 border-neon-blue flex items-center justify-center text-neon-blue font-bold shadow-neon-strong">
          MZ
        </div>
        <span className="font-bold tracking-wider hidden sm:block">MUHAMMAD ZAYAN</span>
      </div>

      <div className="flex items-center gap-6">
        <a href="https://github.com/mzayan-bit" target="_blank" className="text-muted hover:text-white transition-colors"><FaGithub size={20}/></a>
        <a href="https://www.linkedin.com/in/muhammad-zayan-16622829b/" target="_blank" className="text-muted hover:text-white transition-colors"><FaLinkedin size={20}/></a>
        
        {/* Neon CTA Button */}
        <a 
          href="/resume.pdf" 
          target="_blank"
          className="bg-gradient-to-r from-neon-purple to-neon-blue px-6 py-2 rounded-full font-bold text-bg hover:shadow-neon-strong transition-all transform hover:-translate-y-1"
        >
          Resume
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;