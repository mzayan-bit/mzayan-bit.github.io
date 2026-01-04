import React from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full flex justify-between items-center py-5 px-10 z-20 glass top-0 left-0"
    >
      <div className="flex items-center gap-2">
        <span className="text-neon-blue font-bold text-2xl">MZ.</span>
      </div>
      
      <ul className="list-none hidden sm:flex flex-row gap-10">
        {["About", "Projects", "Contact"].map((nav) => (
          <li key={nav} className="text-secondary hover:text-white text-[18px] font-medium cursor-pointer transition-colors duration-300">
            <a href={`#${nav.toLowerCase()}`}>{nav}</a>
          </li>
        ))}
        <li className="text-neon-purple font-bold cursor-pointer">
            <a href="/resume.pdf" target="_blank">Resume</a>
        </li>
      </ul>
    </motion.nav>
  );
};

export default Navbar;