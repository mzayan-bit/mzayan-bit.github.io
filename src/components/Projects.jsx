import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  {
    title: "VisionTraceAI",
    tech: ["React", "FastAPI", "Kafka", "YOLO11", "LangGraph"],
    desc: "Event-driven video analytics platform featuring cross-camera tracking, zero-shot semantic search, and an autonomous agent.",
    link: "https://github.com/mzayan-bit/VisionTraceAI",
    img: "/images/visiontraceai.png"
  },
  {
    title: "AI Gym Vision",
    tech: ["Python", "MediaPipe", "OpenCV"],
    desc: "Computer vision assistant tracking human pose and calculating joint angles for real-time form correction.",
    link: "https://github.com/mzayan-bit/AI_Gym_Vision",
    img: "/images/ai_gym.png" 
  },
  {
    title: "Matchmaker & Classification Engine",
    tech: ["Python", "Scikit-Learn", "Pandas", "TF-IDF"],
    desc: "IPO recommendation engine and KNN classification model utilizing TF-IDF vectorization to map user skill profiles.",
    link: "https://github.com/mzayan-bit/Decode_Labs_Internship",
    img: "/images/decodelab.png"
  },
  {
    title: "Roomify",
    tech: ["Django", "Scikit-Learn", "PostgreSQL"],
    desc: "Roommate matching platform utilizing a Hybrid AI engine (Heuristic + ML) achieving 85% match quality.",
    link: "https://github.com/mzayan-bit/Roomify",
    img: "/images/roomify.png"
  },
  {
    title: "HabitFlow",
    tech: ["Flutter", "Dart", "Local Storage"],
    desc: "Offline-first mobile habit tracker featuring streak mechanics, data viz, and user retention systems.",
    link: "https://github.com/mzayan-bit/habitflow-app",
    img: "/images/habitflow.png"
  }
];

const Projects = () => {
  return (
    <section id="projects" className="relative py-32 px-6 max-w-7xl mx-auto z-10">
      
      <div className="mb-20 relative">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight"
        >
          Selected Works
        </motion.h2>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "120px" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-1 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full shadow-neon-cyan"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="group relative rounded-3xl overflow-hidden glass hover:shadow-neon-cyan transition-all duration-500 bg-card/60 border border-white/5"
          >
            {/* Inner Radial Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"></div>

            {/* Image Area */}
            <div className="h-[240px] w-full overflow-hidden relative z-10">
              <div className="absolute inset-0 bg-card/40 group-hover:bg-transparent transition-all duration-500 z-10"/>
              <img 
                src={project.img} 
                alt={project.title} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out" 
              />
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-card/90 to-transparent z-10"></div>
            </div>

            {/* Content Area */}
            <div className="p-8 relative z-10 -mt-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-white group-hover:text-neon-cyan transition-colors duration-300">
                  {project.title}
                </h3>
                <a href={project.link} target="_blank" rel="noreferrer" className="text-muted hover:text-neon-cyan transition-colors mt-1">
                  <FaGithub size={24} />
                </a>
              </div>
              
              <p className="text-muted text-sm mb-8 leading-relaxed font-light">
                {project.desc}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="text-xs font-mono font-medium text-neon-cyan bg-neon-cyan/5 px-3 py-1.5 rounded-full border border-neon-cyan/20 group-hover:border-neon-cyan/40 transition-colors">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;