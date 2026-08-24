import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaGithub, FaTimes } from "react-icons/fa";
import { prefersReducedMotion } from "../hooks/useMotion";

const projects = [
  {
    id: "visiontraceai",
    title: "VisionTraceAI",
    tech: ["React", "FastAPI", "Kafka", "YOLO11", "LangGraph"],
    desc: "Event-driven video analytics platform featuring cross-camera tracking, zero-shot semantic search, and an autonomous agent.",
    challenges: "Architecting a low-latency streaming pipeline that could handle multiple video feeds concurrently without bottlenecking the inference engine. Ensuring the LangGraph autonomous agent could reason accurately over sparse metadata.",
    outcomes: "Achieved sub-100ms latency for real-time tracking across 4+ simulated camera feeds. Deployed a scalable microservices architecture using Kafka for robust message passing.",
    link: "https://github.com/mzayan-bit/VisionTraceAI",
    img: "/images/visiontraceai.png",
  },
  {
    id: "aigymvision",
    title: "AI Gym Vision",
    tech: ["Python", "MediaPipe", "OpenCV"],
    desc: "Computer vision assistant tracking human pose and calculating joint angles for real-time form correction.",
    challenges: "Extracting stable 3D coordinates from a 2D webcam feed and mathematically filtering noisy keypoints during rapid movements like squats and deadlifts.",
    outcomes: "Built a localized, lightweight inference pipeline running entirely on the CPU, achieving 30+ FPS while providing immediate visual feedback on exercise form.",
    link: "https://github.com/mzayan-bit/AI_Gym_Vision",
    img: "/images/ai_gym.png",
  },
  {
    id: "matchmaker",
    title: "Matchmaker & Classification Engine",
    tech: ["Python", "Scikit-Learn", "Pandas", "TF-IDF"],
    desc: "IPO recommendation engine and KNN classification model utilizing TF-IDF vectorization to map user skill profiles.",
    challenges: "Handling highly sparse text data from raw resumes and optimizing the K-Nearest Neighbors search space for real-time matchmaking responses.",
    outcomes: "Developed a robust NLP pipeline that accurately matched candidate profiles to job descriptions, significantly reducing manual screening time for HR teams.",
    link: "https://github.com/mzayan-bit/Decode_Labs_Internship",
    img: "/images/decodelab.png",
  },
  {
    id: "roomify",
    title: "Roomify",
    tech: ["Django", "Scikit-Learn", "PostgreSQL"],
    desc: "Roommate matching platform utilizing a Hybrid AI engine (Heuristic + ML) achieving 85% match quality.",
    challenges: "Designing an algorithm that could balance hard constraints (e.g., budget, location) with soft preferences (e.g., cleanliness, lifestyle) without generating zero matches.",
    outcomes: "Deployed a full-stack Django application with an optimized PostgreSQL schema, delivering highly relevant roommate suggestions verified through user feedback loops.",
    link: "https://github.com/mzayan-bit/Roomify",
    img: "/images/roomify.png",
  },
  {
    id: "habitflow",
    title: "HabitFlow",
    tech: ["Flutter", "Dart", "Local Storage"],
    desc: "Offline-first mobile habit tracker featuring streak mechanics, data viz, and user retention systems.",
    challenges: "Implementing a reliable offline-first architecture that handles local storage persistence securely, while ensuring complex streak logic calculates correctly across different timezones.",
    outcomes: "Launched a highly responsive, cross-platform mobile application with fluid animations, intuitive data visualization, and an engaging gamified user experience.",
    link: "https://github.com/mzayan-bit/habitflow-app",
    img: "/images/habitflow.png",
  },
];

/* ─── Individual Project Card with 3D tilt & Spotlight ─── */
const ProjectCard = ({ project, setActiveProject }) => {
  const cardRef = useRef(null);
  
  // Framer Motion values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Mouse position for spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for tilt
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current || prefersReducedMotion()) return;

    const rect = cardRef.current.getBoundingClientRect();
    
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    // Calculate normalized coordinates (-0.5 to 0.5)
    const normalizedX = (clientX / rect.width) - 0.5;
    const normalizedY = (clientY / rect.height) - 0.5;

    x.set(normalizedX);
    y.set(normalizedY);
    
    // Update spotlight position
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setActiveProject(project)}
      layoutId={`card-${project.id}`}
      className="group relative rounded-3xl overflow-hidden glass cursor-pointer transition-shadow duration-500 bg-card/60 border border-white/5 hover:border-white/10"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 0.98, translateY: -8 }}
    >
      {/* Spotlight effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([mx, my]) => `radial-gradient(600px circle at ${mx}px ${my}px, rgba(255,255,255,0.06), transparent 40%)`
          ),
        }}
      />

      {/* Image Area */}
      <motion.div 
        layoutId={`image-${project.id}`}
        className="h-[240px] w-full overflow-hidden relative z-10"
      >
        <div className="absolute inset-0 bg-card/20 group-hover:bg-transparent transition-all duration-500 z-10" />
        <motion.img
          src={project.img}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          style={{ transform: "translateZ(30px)" }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-card/90 to-transparent z-10"></div>
      </motion.div>

      {/* Content Area */}
      <div 
        className="p-8 relative z-10 -mt-6 transform-gpu"
        style={{ transform: "translateZ(40px)" }}
      >
        <div className="flex justify-between items-start mb-4">
          <motion.h3 
            layoutId={`title-${project.id}`}
            className="text-2xl font-bold text-white transition-colors duration-300 group-hover:translate-x-1 group-hover:text-white"
          >
            {project.title}
          </motion.h3>
        </div>

        <motion.p 
          layoutId={`desc-${project.id}`}
          className="text-muted text-sm mb-8 leading-relaxed font-light line-clamp-2"
        >
          {project.desc}
        </motion.p>

        <motion.div layoutId={`tech-${project.id}`} className="flex flex-wrap gap-2 group-hover:translate-y-[-2px] transition-transform duration-500">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs font-mono font-medium text-white/70 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 group-hover:border-white/20 group-hover:text-white transition-colors"
            >
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ─── Projects Section ─── */
const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);

  // Lock body scroll and handle Escape key when modal is open
  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          setActiveProject(null);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "auto";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "auto";
    }
  }, [activeProject]);

  return (
    <section id="projects" className="relative py-32 px-6 max-w-7xl mx-auto z-10">
      {/* Section Radial Glow */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[60vw] h-[40vh] bg-neon-purple/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="mb-20 relative">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight"
        >
          Selected Works
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "120px" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="h-1 bg-gradient-to-r from-white/20 to-white/5 rounded-full shadow-glass-inset"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} setActiveProject={setActiveProject} />
        ))}
      </div>

      {/* Cinematic Modal */}
      <AnimatePresence>
        {activeProject && (
          <>
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-50 bg-bg/80 backdrop-blur-xl"
              onClick={() => setActiveProject(null)}
            />

            {/* Modal Container */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 pointer-events-none">
              <motion.div
                layoutId={`card-${activeProject.id}`}
                role="dialog"
                aria-modal="true"
                aria-label={activeProject.title}
                className="w-full max-w-5xl max-h-full overflow-y-auto bg-card rounded-3xl border border-white/10 shadow-2xl pointer-events-auto flex flex-col custom-scrollbar"
                style={{ scrollbarWidth: "thin" }}
              >
                {/* Header Image */}
                <div className="relative h-64 md:h-96 w-full flex-shrink-0">
                  <motion.img
                    layoutId={`image-${activeProject.id}`}
                    src={activeProject.img}
                    alt={activeProject.title}
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  
                  {/* Close Button */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setActiveProject(null)}
                    className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-colors border border-white/10"
                  >
                    <FaTimes />
                  </motion.button>
                </div>

                {/* Modal Content */}
                <div className="p-8 md:p-12 -mt-20 relative z-10 flex-grow">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                      <motion.h3 
                        layoutId={`title-${activeProject.id}`}
                        className="text-4xl md:text-5xl font-bold text-white mb-6"
                      >
                        {activeProject.title}
                      </motion.h3>
                      <motion.div layoutId={`tech-${activeProject.id}`} className="flex flex-wrap gap-2">
                        {activeProject.tech.map((t) => (
                          <span
                            key={t}
                            className="text-sm font-mono font-medium text-white/80 bg-white/5 px-4 py-2 rounded-full border border-white/10"
                          >
                            {t}
                          </span>
                        ))}
                      </motion.div>
                    </div>
                    
                    <motion.a
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      href={activeProject.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-white text-bg font-semibold rounded-full hover:bg-white/90 transition-colors shadow-lg"
                    >
                      <FaGithub size={20} />
                      View Repository
                    </motion.a>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="md:col-span-1"
                    >
                      <h4 className="text-lg font-semibold text-white mb-4">Overview</h4>
                      <motion.p 
                        layoutId={`desc-${activeProject.id}`}
                        className="text-muted leading-relaxed font-light"
                      >
                        {activeProject.desc}
                      </motion.p>
                    </motion.div>

                    <div className="md:col-span-2 space-y-12">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h4 className="text-lg font-semibold text-white mb-4">The Challenge</h4>
                        <p className="text-muted leading-relaxed font-light">
                          {activeProject.challenges}
                        </p>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <h4 className="text-lg font-semibold text-white mb-4">Outcomes</h4>
                        <p className="text-muted leading-relaxed font-light">
                          {activeProject.outcomes}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;