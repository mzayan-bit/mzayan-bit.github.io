import { motion } from "framer-motion";
import { FaEye, FaNetworkWired, FaShieldAlt, FaProjectDiagram } from "react-icons/fa";

const interests = [
  {
    icon: FaEye,
    title: "Computer Vision & Visual Intelligence",
    tag: "Visual Understanding",
    desc: "Real-time spatial perception, multi-camera object tracking and identity re-identification (Re-ID), and human pose kinematics for embodied and edge-deployed intelligence.",
    highlights: ["Pose Kinematics", "Cross-Camera Re-ID", "Zero-Shot Multimodal Search"],
  },
  {
    icon: FaProjectDiagram,
    title: "Deep Learning & Model Evaluation",
    tag: "Empirical Methods",
    desc: "Designing resilient neural architectures, investigating behavior under distribution shifts, and formulating strict cross-validation methodologies to eliminate target leakage.",
    highlights: ["Distribution Shift Robustness", "GroupKFold Validation", "Metric-Grounded Baselines"],
  },
  {
    icon: FaShieldAlt,
    title: "Explainable & Trustworthy AI",
    tag: "Attribution & Quality",
    desc: "Developing spatial attribution modules (Grad-CAM), embedding-based dataset hygiene to prevent train-test contamination, and building reproducible cryptographic experiment DAGs.",
    highlights: ["Grad-CAM Heatmaps", "Dataset Leakage Auditing", "Cryptographic Lineage DAGs"],
  },
  {
    icon: FaNetworkWired,
    title: "AI Systems & Autonomous Agents",
    tag: "System Architecture",
    desc: "Engineering high-throughput, low-latency streaming infrastructure with Kafka and WebSockets, alongside stateful supervisor agents using LangGraph and the Model Context Protocol (MCP).",
    highlights: ["Distributed Kafka Queues", "LangGraph Supervisor Loops", "Model Context Protocol (MCP)"],
  },
];

const Interests = () => {
  return (
    <section id="interests" className="relative py-28 px-6 max-w-6xl mx-auto z-10">
      {/* Section Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vh] bg-neon-purple/5 blur-[140px] rounded-full pointer-events-none z-0"></div>

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
              02. Research & Exploration Focus
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
              Areas of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">
                Interest
              </span>
            </h2>
            <p className="text-muted text-base md:text-lg font-light leading-relaxed">
              Key technical domains and research directions I actively explore, grounded in practical system implementations and scalable architecture.
            </p>
          </motion.div>
        </div>

        {/* 2x2 Grid of Focused Interest Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {interests.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                className="glass p-8 rounded-3xl bg-card/50 border border-white/10 hover:border-neon-cyan/40 transition-all duration-500 relative overflow-hidden group shadow-glass-card hover:-translate-y-1.5"
              >
                {/* Background Ambient Spotlight on Hover */}
                <div className="absolute -right-16 -top-16 w-48 h-48 bg-gradient-to-br from-neon-cyan/10 to-neon-purple/10 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-neon-cyan group-hover:scale-110 group-hover:shadow-neon-cyan group-hover:border-neon-cyan/50 transition-all duration-300">
                    <Icon size={24} />
                  </div>
                  <span className="text-xs font-mono font-medium text-neon-cyan/80 bg-neon-cyan/10 border border-neon-cyan/20 px-3 py-1 rounded-full">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-neon-cyan transition-colors">
                  {item.title}
                </h3>

                <p className="text-muted text-sm md:text-base leading-relaxed font-light mb-6">
                  {item.desc}
                </p>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                  {item.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-xs font-mono text-white/70 bg-white/5 px-2.5 py-1 rounded-md border border-white/5"
                    >
                      {h}
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

export default Interests;
