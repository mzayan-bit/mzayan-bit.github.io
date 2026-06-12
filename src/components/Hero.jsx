import { useEffect, useRef, useMemo } from "react";
import { Typewriter } from "react-simple-typewriter";
import { runHeroSequence, useMagnetic, prefersReducedMotion } from "../hooks/useMotion";
import anime from "animejs";

/* Split text into individually animatable characters */
const SplitText = ({ text, className = "" }) => {
  const chars = text.split("");
  return (
    <span className={className}>
      {chars.map((char, i) => (
        <span key={i} className="char inline-block" style={{ opacity: 0 }}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

const Hero = () => {
  const hasAnimated = useRef(false);
  const avatarRef = useRef(null);
  const exploreRef = useMagnetic(0.2);
  const contactRef = useMagnetic(0.2);

  // Particles — memoize random positions
  const particles = useMemo(
    () =>
      Array.from({ length: 12 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 2,
        duration: 12000 + Math.random() * 8000,
      })),
    []
  );

  // Run the hero entrance sequence once
  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    // Give DOM a beat to mount
    const timer = setTimeout(() => {
      runHeroSequence();
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  // Animate particles with anime.js
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const els = document.querySelectorAll(".hero-particle");
    els.forEach((el, i) => {
      anime({
        targets: el,
        translateY: [0, -120 - Math.random() * 60],
        translateX: [0, (Math.random() - 0.5) * 80],
        opacity: [0.15, 0.7, 0.15],
        duration: particles[i]?.duration || 15000,
        loop: true,
        easing: "linear",
      });
    });
  }, [particles]);

  // Avatar parallax
  const handleMouseMove = (e) => {
    if (!avatarRef.current || prefersReducedMotion()) return;
    const rect = avatarRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 25;
    const y = (e.clientY - rect.top - rect.height / 2) / 25;
    anime({
      targets: avatarRef.current,
      rotateX: -y,
      rotateY: x,
      duration: 150,
      easing: "easeOutQuad",
    });
  };

  const handleMouseLeave = () => {
    if (!avatarRef.current) return;
    anime({
      targets: avatarRef.current,
      rotateX: 0,
      rotateY: 0,
      duration: 600,
      easing: "spring(1, 80, 10, 0)",
    });
  };

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col md:flex-row items-center justify-center px-6 pt-24 gap-12 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {particles.map((p, i) => (
          <div
            key={i}
            className="hero-particle absolute rounded-full bg-neon-cyan/30"
            style={{
              top: `${p.y}%`,
              left: `${p.x}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              boxShadow: "0 0 8px rgba(0,229,255,0.4)",
              opacity: 0.15,
            }}
          />
        ))}
      </div>

      {/* Left: Text Content */}
      <div className="flex-1 space-y-6 z-10">
        {/* Badge */}
        <div
          data-hero-badge
          data-hero-animate
          className="inline-block px-4 py-1.5 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan text-xs font-bold tracking-[0.2em] mb-2 shadow-[0_0_15px_rgba(0,229,255,0.2)]"
          style={{ opacity: 0 }}
        >
          <span className="animate-pulse mr-2">●</span> OPEN TO WORK
        </div>

        {/* Name — character-by-character reveal */}
        <h1
          data-hero-name
          data-hero-animate
          className="font-extrabold leading-tight"
        >
          <span className="text-white">
            <SplitText text="Hi, I'm " />
          </span>
          <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">
            <SplitText text="Muhammad Zayan" />
          </span>
        </h1>

        {/* Typewriter */}
        <div
          data-hero-desc
          data-hero-animate
          className="subheadline text-muted font-light h-12 flex items-center"
          style={{ opacity: 0 }}
        >
          <span>I build&nbsp;</span>
          <span className="text-white font-semibold text-glow-cyan">
            <Typewriter
              words={[
                "Computer Vision Systems",
                "Full Stack Apps",
                "AI Models",
              ]}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={80}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </span>
        </div>

        {/* Description */}
        <p
          data-hero-desc
          data-hero-animate
          className="body-text text-muted max-w-lg leading-relaxed font-light"
          style={{ opacity: 0 }}
        >
          Turning data into decisions at{" "}
          <b className="text-white">GIKI</b>. I engineer accessible, inclusive
          products at the intersection of AI and Application Development.
        </p>

        {/* Buttons */}
        <div data-hero-buttons className="flex flex-wrap gap-4 pt-6">
          <a
            ref={exploreRef}
            href="#projects"
            className="magnetic-btn group relative px-8 py-4 bg-white text-bg font-bold rounded-lg overflow-hidden transition-all hover:shadow-neon-cyan"
            style={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-purple opacity-0 group-hover:opacity-20 transition-opacity"></div>
            <span className="relative">Explore Systems</span>
          </a>
          <a
            ref={contactRef}
            href="#contact"
            className="magnetic-btn px-8 py-4 border border-white/20 rounded-lg hover:bg-white/5 hover:border-white/40 transition-all font-semibold"
            style={{ opacity: 0 }}
          >
            Initialize Contact
          </a>
        </div>
      </div>

      {/* Right: Avatar with Parallax + Glow */}
      <div
        data-hero-avatar
        data-hero-animate
        ref={avatarRef}
        className="flex-1 flex justify-center relative z-10"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          opacity: 0,
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Animated Glow Rings */}
        <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-purple blur-[80px] opacity-30 rounded-full animate-pulse-glow"></div>
        <div className="absolute inset-[10px] md:inset-[-10px] rounded-full border border-neon-cyan/30 animate-spin-slow"></div>
        <div
          className="absolute inset-[20px] md:inset-[-20px] rounded-full border border-neon-purple/20 animate-spin-slow"
          style={{
            animationDirection: "reverse",
            animationDuration: "20s",
          }}
        ></div>

        <div className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px] rounded-full p-2 border border-white/10 glass shadow-glass-card overflow-hidden group">
          <img
            src="/me.png"
            alt="Muhammad Zayan"
            className="w-full h-full object-cover rounded-full transform group-hover:scale-105 transition-transform duration-700"
            style={{ objectPosition: "50% 30%" }}
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-bg/60 via-transparent to-transparent opacity-60"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;