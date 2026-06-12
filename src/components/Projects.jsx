import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import anime from "animejs";
import { useTiltCard, prefersReducedMotion, TIMING, EASE } from "../hooks/useMotion";

const projects = [
  {
    title: "VisionTraceAI",
    tech: ["React", "FastAPI", "Kafka", "YOLO11", "LangGraph"],
    desc: "Event-driven video analytics platform featuring cross-camera tracking, zero-shot semantic search, and an autonomous agent.",
    link: "https://github.com/mzayan-bit/VisionTraceAI",
    img: "/images/visiontraceai.png",
  },
  {
    title: "AI Gym Vision",
    tech: ["Python", "MediaPipe", "OpenCV"],
    desc: "Computer vision assistant tracking human pose and calculating joint angles for real-time form correction.",
    link: "https://github.com/mzayan-bit/AI_Gym_Vision",
    img: "/images/ai_gym.png",
  },
  {
    title: "Matchmaker & Classification Engine",
    tech: ["Python", "Scikit-Learn", "Pandas", "TF-IDF"],
    desc: "IPO recommendation engine and KNN classification model utilizing TF-IDF vectorization to map user skill profiles.",
    link: "https://github.com/mzayan-bit/Decode_Labs_Internship",
    img: "/images/decodelab.png",
  },
  {
    title: "Roomify",
    tech: ["Django", "Scikit-Learn", "PostgreSQL"],
    desc: "Roommate matching platform utilizing a Hybrid AI engine (Heuristic + ML) achieving 85% match quality.",
    link: "https://github.com/mzayan-bit/Roomify",
    img: "/images/roomify.png",
  },
  {
    title: "HabitFlow",
    tech: ["Flutter", "Dart", "Local Storage"],
    desc: "Offline-first mobile habit tracker featuring streak mechanics, data viz, and user retention systems.",
    link: "https://github.com/mzayan-bit/habitflow-app",
    img: "/images/habitflow.png",
  },
];

/* ─── Individual Project Card with 3D tilt ─── */
const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el || prefersReducedMotion()) return;

    const maxTilt = 6;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const tiltX = (y - 0.5) * -maxTilt;
      const tiltY = (x - 0.5) * maxTilt;

      anime({
        targets: el,
        rotateX: tiltX,
        rotateY: tiltY,
        translateY: -12,
        duration: TIMING.MEDIUM,
        easing: EASE.out,
      });

      // Move glow direction
      const glowEl = el.querySelector("[data-glow]");
      if (glowEl) {
        glowEl.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(0,229,255,0.12), transparent 60%)`;
      }

      // Zoom image
      const img = el.querySelector("[data-card-img]");
      if (img) {
        anime({
          targets: img,
          scale: 1.05,
          duration: TIMING.MEDIUM,
          easing: EASE.out,
        });
      }
    };

    const handleLeave = () => {
      anime({
        targets: el,
        rotateX: 0,
        rotateY: 0,
        translateY: 0,
        duration: TIMING.LARGE,
        easing: EASE.spring,
      });

      const glowEl = el.querySelector("[data-glow]");
      if (glowEl) glowEl.style.background = "transparent";

      const img = el.querySelector("[data-card-img]");
      if (img) {
        anime({
          targets: img,
          scale: 1,
          duration: TIMING.LARGE,
          easing: EASE.out,
        });
      }
    };

    // Stagger tags on hover
    const handleEnter = () => {
      const tags = el.querySelectorAll("[data-tag]");
      anime({
        targets: tags,
        scale: [0.9, 1],
        opacity: [0.5, 1],
        delay: anime.stagger(40),
        duration: TIMING.MEDIUM,
        easing: EASE.out,
      });
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    el.addEventListener("mouseenter", handleEnter);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
      el.removeEventListener("mouseenter", handleEnter);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      data-project-card
      className="group relative rounded-3xl overflow-hidden glass hover:shadow-neon-cyan transition-shadow duration-500 bg-card/60 border border-white/5"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        opacity: 0,
        transform: "translateY(40px)",
      }}
    >
      {/* Dynamic glow overlay */}
      <div
        data-glow
        className="absolute inset-0 z-20 pointer-events-none transition-all duration-300 rounded-3xl"
      />

      {/* Image Area */}
      <div className="h-[240px] w-full overflow-hidden relative z-10">
        <div className="absolute inset-0 bg-card/40 group-hover:bg-transparent transition-all duration-500 z-10" />
        <img
          data-card-img
          data-parallax="0.03"
          src={project.img}
          alt={project.title}
          className="w-full h-full object-cover will-change-transform"
        />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-card/90 to-transparent z-10"></div>
      </div>

      {/* Content Area */}
      <div className="p-8 relative z-10 -mt-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-white group-hover:text-neon-cyan transition-colors duration-300">
            {project.title}
          </h3>
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-neon-cyan transition-colors mt-1 icon-hover"
          >
            <FaGithub size={24} />
          </a>
        </div>

        <p className="text-muted text-sm mb-8 leading-relaxed font-light">
          {project.desc}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              data-tag
              className="text-xs font-mono font-medium text-neon-cyan bg-neon-cyan/5 px-3 py-1.5 rounded-full border border-neon-cyan/20 group-hover:border-neon-cyan/40 transition-colors"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── Projects Section ─── */
const Projects = () => {
  const gridRef = useRef(null);
  const hasRevealed = useRef(false);

  // Stagger reveal with anime.js
  useEffect(() => {
    if (prefersReducedMotion() || hasRevealed.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRevealed.current) {
            hasRevealed.current = true;
            const cards = entry.target.querySelectorAll("[data-project-card]");
            anime({
              targets: cards,
              opacity: [0, 1],
              translateY: [40, 0],
              delay: anime.stagger(80),
              duration: TIMING.LARGE,
              easing: EASE.out,
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="relative py-32 px-6 max-w-7xl mx-auto z-10">
      {/* Section Radial Glow */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[60vw] h-[40vh] bg-neon-purple/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="mb-20 relative">
        <h2
          data-mask-reveal
          className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight"
        >
          Selected Works
        </h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "120px" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-1 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full shadow-neon-cyan"
        />
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
      >
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Projects;