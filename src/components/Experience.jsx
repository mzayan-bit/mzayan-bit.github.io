import { motion } from "framer-motion";
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const experiences = [
  {
    company: "Systems Limited",
    role: "CDIS Intern (Cloud, Digital Infrastructure & Security)",
    period: "June 2026 – August 2026",
    location: "Islamabad, Pakistan",
    summary:
      "Architected an IDE-style RAG platform for IBM CP4I/ACE with hybrid search, HyDE, and pgvector. Built an autonomous Hermes DevOps tool-calling assistant with 9 container and filesystem inspection tools, and deployed multi-service AI pipelines on Red Hat OpenShift.",
    tags: ["FastAPI", "React/TypeScript", "PostgreSQL (pgvector)", "OpenShift", "Docker", "DevOps Agents"],
  },
  {
    company: "FlyRank AI",
    role: "Machine Learning Intern",
    period: "July 2026 – August 2026",
    location: "Remote",
    summary:
      "Engineered an ML content prioritization and decay engine with Random Forest and GroupKFold cross-validation, achieving 0.68 Precision@50. Architected SIRA (Search Intelligence & Research Agent), an autonomous agent running Plan-Act-Observe-Evaluate verification loops.",
    tags: ["Python", "Scikit-Learn", "GroupKFold", "Autonomous Agents", "Ranking Metrics"],
  },
  {
    company: "Integration Xperts",
    role: "AI Intern",
    period: "June 2025 – July 2025",
    location: "Karachi, Pakistan",
    summary:
      "Developed real-time computer vision pipelines using YOLO and MediaPipe for human pose kinematics and object detection. Optimized inference latency for live webcam feeds and built automated dataset curation workflows with Roboflow.",
    tags: ["YOLO", "MediaPipe", "OpenCV", "Roboflow", "Pose Kinematics"],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="relative py-28 px-6 max-w-5xl mx-auto z-10">
      {/* Section Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[50vw] h-[35vh] bg-neon-cyan/5 blur-[130px] rounded-full pointer-events-none z-0"></div>

      <div className="relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="text-xs font-mono font-semibold tracking-widest text-neon-cyan uppercase block mb-3">
              04. Career History
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
              Engineering{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">
                Experience
              </span>
            </h2>
            <p className="text-muted text-base md:text-lg font-light leading-relaxed">
              Hands-on industry engineering experience spanning retrieval systems, automated agents, cloud infrastructure, and computer vision pipelines.
            </p>
          </motion.div>
        </div>

        {/* Timeline List */}
        <div className="space-y-8 relative">
          {/* Vertical Guide Line */}
          <div className="hidden md:block absolute left-8 top-6 bottom-6 w-[1px] bg-gradient-to-b from-neon-cyan/40 via-white/10 to-transparent"></div>

          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.company + exp.role}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12, ease: "easeOut" }}
              className="glass p-8 rounded-3xl bg-card/60 border border-white/10 hover:border-white/20 transition-all duration-300 relative shadow-glass-card md:ml-16 group"
            >
              {/* Timeline Node on Desktop */}
              <div className="hidden md:flex absolute -left-[4.5rem] top-8 w-8 h-8 rounded-full bg-card border border-neon-cyan/50 items-center justify-center text-neon-cyan text-xs group-hover:scale-110 group-hover:shadow-neon-cyan transition-all">
                <FaBriefcase size={12} />
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-neon-cyan transition-colors">
                    {exp.role}
                  </h3>
                  <div className="text-base font-semibold text-white/90 mt-1">
                    {exp.company}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted">
                  <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                    <FaCalendarAlt size={11} className="text-neon-cyan" />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                    <FaMapMarkerAlt size={11} className="text-neon-purple" />
                    {exp.location}
                  </span>
                </div>
              </div>

              <p className="text-muted text-sm md:text-base leading-relaxed font-light mb-6">
                {exp.summary}
              </p>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono text-white/70 bg-white/5 px-3 py-1 rounded-full border border-white/10 group-hover:border-white/20 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
