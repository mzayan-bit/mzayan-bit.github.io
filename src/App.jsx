import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="relative min-h-screen bg-bg text-white font-sans selection:bg-neon-cyan/30 selection:text-neon-cyan">
      {/* Global Ambient Backgrounds */}
      <div className="bg-noise"></div>
      <div className="bg-ai-grid"></div>
      
      {/* Blurred Orbs for Depth */}
      <div className="fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-neon-purple/20 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-neon-cyan/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

      {/* Content */}
      <div className="relative z-10">
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