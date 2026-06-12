import { motion } from "framer-motion";
import { Typewriter } from 'react-simple-typewriter'

const Hero = () => {
  // Staggered sequence variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="about" className="relative min-h-screen flex flex-col md:flex-row items-center justify-center px-6 pt-24 gap-12 max-w-7xl mx-auto overflow-hidden">
      
      {/* Floating Particles in Hero */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-neon-cyan/40 rounded-full shadow-neon-cyan"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Left: Text Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 space-y-6 z-10"
      >
        <motion.div variants={itemVariants} className="inline-block px-4 py-1.5 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan text-xs font-bold tracking-[0.2em] mb-2 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
          <span className="animate-pulse mr-2">●</span> OPEN TO WORK
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold leading-tight">
          Hi, I'm <br className="hidden md:block" />
          <span className="flex space-x-4 mt-2">
            {['Muhammad', 'Zayan'].map((word, i) => (
              <motion.span 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + (i * 0.2), duration: 0.5 }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple drop-shadow-lg"
              >
                {word}
              </motion.span>
            ))}
          </span>
        </motion.h1>
        
        <motion.div variants={itemVariants} className="text-2xl md:text-3xl text-muted font-light h-12 flex items-center">
          <span>I build&nbsp;</span>
          <span className="text-white font-semibold text-glow-cyan">
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
        </motion.div>

        <motion.p variants={itemVariants} className="text-muted text-lg max-w-lg leading-relaxed font-light">
          Turning data into decisions at <b className="text-white">GIKI</b>. I engineer accessible, inclusive products at the intersection of AI and Application Development.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-6">
          <a href="#projects" className="group relative px-8 py-4 bg-white text-bg font-bold rounded-lg overflow-hidden transition-all hover:scale-105 hover:shadow-neon-cyan">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-purple opacity-0 group-hover:opacity-20 transition-opacity"></div>
            <span className="relative">Explore Systems</span>
          </a>
          <a href="#contact" className="px-8 py-4 border border-white/20 rounded-lg hover:bg-white/5 hover:border-white/40 transition-all font-semibold">
            Initialize Contact
          </a>
        </motion.div>
      </motion.div>

      {/* Right: Avatar with Parallax & Cinematic Scale */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 flex justify-center relative z-10"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) / 25;
          const y = (e.clientY - rect.top - rect.height / 2) / 25;
          e.currentTarget.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        }}
        style={{ transition: 'transform 0.1s ease-out' }}
      >
        {/* Animated Glow Rings */}
        <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-purple blur-[80px] opacity-30 rounded-full animate-pulse-glow"></div>
        <div className="absolute inset-[10px] md:inset-[-10px] rounded-full border border-neon-cyan/30 animate-spin-slow"></div>
        <div className="absolute inset-[20px] md:inset-[-20px] rounded-full border border-neon-purple/20 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '20s' }}></div>
        
        <div className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px] rounded-full p-2 border border-white/10 glass shadow-glass-card overflow-hidden group">
          <img 
            src="/me.png" 
            alt="Muhammad Zayan" 
            className="w-full h-full object-cover rounded-full transform group-hover:scale-105 transition-transform duration-700"
            style={{ objectPosition: "50% 30%" }}
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-bg/60 via-transparent to-transparent opacity-60"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;