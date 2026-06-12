import { useState, useCallback } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import LoadingScreen from "./components/LoadingScreen";
import { useParallax, useMaskReveal } from "./hooks/useMotion";

function App() {
  const [loaded, setLoaded] = useState(false);

  useParallax();
  useMaskReveal();

  const handleLoadFinish = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-bg text-white font-sans selection:bg-neon-cyan/30 selection:text-neon-cyan">
      {/* Loading Screen */}
      <LoadingScreen onFinish={handleLoadFinish} />

      {/* Global Ambient Backgrounds */}
      <div className="bg-noise"></div>
      <div className="bg-ai-grid"></div>
      
      {/* Blurred Orbs for Depth — parallax at different speeds */}
      <div data-parallax="-0.05" className="fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-neon-purple/20 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div data-parallax="-0.08" className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-neon-cyan/10 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div data-parallax="-0.03" className="fixed top-[40%] right-[20%] w-[25vw] h-[25vw] bg-neon-purple/10 blur-[100px] rounded-full pointer-events-none z-0"></div>

      {/* Content */}
      <div className={`relative z-10 transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />
        <main>
          <Hero />
          <Projects />
          <Contact />
        </main>
      </div>
    </div>
  );
}

export default App;