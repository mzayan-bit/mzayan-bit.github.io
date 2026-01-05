import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  {
    title: "AI Gym Vision",
    tech: ["Python", "MediaPipe", "YOLO"],
    desc: "Computer vision assistant tracking human pose and calculating joint angles for real-time form correction.",
    link: "https://github.com/mzayan-bit/AI_Gym_Vision",
    img: "/images/ai_gym.png" 
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
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-4xl font-bold mb-4">Selected Works</h2>
        <div className="h-1 w-24 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="glass group relative rounded-2xl overflow-hidden hover:shadow-neon-soft transition-all duration-300"
          >
            {/* Image Area */}
            <div className="h-[220px] w-full overflow-hidden relative">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all z-10"/>
              <img 
                src={project.img} 
                alt={project.title} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
              />
            </div>

            {/* Content Area */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white group-hover:text-neon-blue transition-colors">
                  {project.title}
                </h3>
                <a href={project.link} target="_blank" className="text-muted hover:text-white">
                  <FaGithub size={22} />
                </a>
              </div>
              
              <p className="text-muted text-sm mb-6 leading-relaxed">
                {project.desc}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="text-xs font-mono text-neon-purple bg-neon-purple/10 px-2 py-1 rounded border border-neon-purple/20">
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