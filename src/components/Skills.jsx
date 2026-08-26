import { motion } from "framer-motion";
import { FaBrain, FaRobot, FaCode, FaServer } from "react-icons/fa";

const skillGroups = [
  {
    category: "AI & Computer Vision",
    icon: FaBrain,
    description: "Core deep learning, spatial vision models, and numerical computing pipelines.",
    skills: [
      "PyTorch",
      "YOLO11 / YOLOv8",
      "OpenCV",
      "MediaPipe",
      "Scikit-learn",
      "Torchvision",
      "Grad-CAM (XAI)",
      "NumPy & Pandas",
      "Roboflow",
    ],
  },
  {
    category: "AI Systems & Agents",
    icon: FaRobot,
    description: "Stateful agentic reasoning, vector semantics, and multimodal retrieval systems.",
    skills: [
      "LangGraph",
      "Model Context Protocol (MCP)",
      "pgvector",
      "Qdrant Vector DB",
      "SigLIP 768D",
      "Hybrid RAG",
      "FastReID",
      "Autonomous Agents",
    ],
  },
  {
    category: "Software Engineering",
    icon: FaCode,
    description: "Full-stack application architecture, typed systems, and backend services.",
    skills: [
      "Python",
      "TypeScript",
      "React",
      "Next.js 16 (App Router)",
      "FastAPI",
      "C++",
      "Dart / Flutter",
      "SQL",
      "Three.js / WebGL",
    ],
  },
  {
    category: "MLOps & Infrastructure",
    icon: FaServer,
    description: "Distributed messaging, container orchestration, and model lifecycle observability.",
    skills: [
      "Docker",
      "Kubernetes",
      "Red Hat OpenShift",
      "DVC",
      "MLflow",
      "Evidently AI",
      "Apache Kafka",
      "PostgreSQL",
      "Redis",
      "Git / CI/CD Actions",
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="relative py-28 px-6 max-w-6xl mx-auto z-10">
      {/* Section Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[35vh] bg-neon-purple/5 blur-[140px] rounded-full pointer-events-none z-0"></div>

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
              05. Technical Toolkit
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
              Skills &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">
                Technologies
              </span>
            </h2>
            <p className="text-muted text-base md:text-lg font-light leading-relaxed">
              Validated toolset applied across production deployments, research workbenches, and high-throughput streaming systems.
            </p>
          </motion.div>
        </div>

        {/* 2x2 Grid of Categorized Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillGroups.map((group, idx) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                className="glass p-8 rounded-3xl bg-card/50 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-glass-card group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neon-cyan group-hover:scale-105 group-hover:shadow-neon-cyan transition-all">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-neon-cyan transition-colors">
                      {group.category}
                    </h3>
                    <p className="text-muted text-xs font-light">
                      {group.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5 pt-4 border-t border-white/5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-mono font-medium text-white/80 bg-white/5 hover:bg-white/10 hover:text-white px-3.5 py-1.5 rounded-xl border border-white/10 hover:border-neon-cyan/40 transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
