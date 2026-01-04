import Background3D from "./components/Background3D";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

const App = () => {
  return (
    <div className="relative z-0 bg-primary">
      <Background3D />
      <div className="bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero />
      </div>
      <Projects />
      <div className="relative z-0">
        <Contact />
      </div>
    </div>
  );
};

export default App;