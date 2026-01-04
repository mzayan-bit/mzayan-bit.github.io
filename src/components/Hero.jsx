import { motion } from "framer-motion";
import { Typewriter } from 'react-simple-typewriter'

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto flex items-center justify-center">
      <div className="px-6 flex flex-col md:flex-row items-center gap-10 max-w-7xl w-full">
        
        {/* Text Section */}
        <div className="flex-1">
          <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="font-black text-white lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2"
          >
            Hi, I'm <span className="text-neon-blue text-glow">Zayan</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.5 }}
            className="text-[#dfd9ff] font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px] mt-4"
          >
            I develop <span className="text-neon-purple">
              <Typewriter 
                words={['Computer Vision Systems', 'Full Stack Apps', 'AI Models']}
                loop={0}
                cursor
                cursorStyle='_'
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </motion.div>
          <p className="mt-4 text-secondary max-w-lg text-[17px]">
            CS Student at GIKI. Turning data into decisions with Python, Django, and ML.
          </p>
        </div>

        {/* AI Avatar Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex justify-center relative"
        >
            {/* The Glass Circle behind avatar */}
            <div className="w-[300px] h-[300px] rounded-full glass flex items-center justify-center relative z-10">
                {/* Replace 'avatar.png' with your actual image in /public folder */}
                <img src="/avatar.png" alt="AI Avatar" className="w-[280px] h-[280px] rounded-full object-cover border-4 border-neon-blue" />
            </div>
            {/* Decorative Glow */}
            <div className="absolute w-[300px] h-[300px] bg-neon-purple rounded-full blur-[100px] opacity-30 z-0"></div>
        </motion.div>

      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#projects">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;