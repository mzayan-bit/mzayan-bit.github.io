import { motion } from "framer-motion";
import { Typewriter } from 'react-simple-typewriter'

const Hero = () => {
  return (
    <section id="about" className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 pt-24 gap-12 max-w-7xl mx-auto">
      
      {/* Left: Text Content */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 space-y-6"
      >
        <div className="inline-block px-4 py-1 rounded-full border border-neon-blue/30 bg-neon-blue/10 text-neon-blue text-xs font-bold tracking-widest mb-2">
          OPEN TO WORK
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
          Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple drop-shadow-lg">Zayan</span>
        </h1>
        
        <div className="text-2xl md:text-3xl text-muted font-light h-12">
          I build <span className="text-white font-semibold">
            <Typewriter 
              words={['Computer Vision Systems', 'Full Stack Apps', 'AI Models']}
              loop={0}
              cursor
              cursorStyle='_'
              typeSpeed={80}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </span>
        </div>

        <p className="text-muted text-lg max-w-lg leading-relaxed">
          Turning data into decisions at <b>GIKI</b>. I engineer accessible, inclusive products at the intersection of AI and Application Development.
        </p>

        <div className="flex gap-4 pt-4">
          <a href="#projects" className="px-8 py-3 bg-white text-bg font-bold rounded-lg hover:bg-neon-blue hover:scale-105 transition-all">
            View Projects
          </a>
          <a href="#contact" className="px-8 py-3 border border-white/20 rounded-lg hover:bg-white/5 transition-all">
            Contact Me
          </a>
        </div>
      </motion.div>

      {/* Right: Avatar with 3D Tilt Effect */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex justify-center relative"
      >
        {/* Glow behind avatar */}
        <div className="absolute inset-0 bg-neon-purple blur-[100px] opacity-20 rounded-full"></div>
        
        <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px] rounded-full p-2 border border-white/10 glass">
          <img 
            src="/me.png" 
            alt="Muhammad Zayan" 
            className="w-full h-full object-cover rounded-full border-4 border-neon-blue/20 hover:border-neon-blue transition-colors duration-500"
            style={{ objectPosition: "50% 30%" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;