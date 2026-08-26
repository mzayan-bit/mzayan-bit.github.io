import { motion } from "framer-motion";
import { FaGraduationCap, FaBrain, FaCogs } from "react-icons/fa";

const pillars = [
  {
    icon: FaBrain,
    title: "Visual Intelligence",
    desc: "Designing low-latency deep learning pipelines for real-time tracking, pose estimation, and zero-shot multi-modal visual search.",
  },
  {
    icon: FaCogs,
    title: "Empirical Rigor",
    desc: "Building reproducible evaluation workflows, explainability heatmaps (Grad-CAM), and data-quality pipelines with zero train-test leakage.",
  },
  {
    icon: FaGraduationCap,
    title: "Systems Architecture",
    desc: "Deploying production-grade MLOps pipelines, distributed message streaming, and stateful agentic supervisor systems.",
  },
];

const About = () => {
  return (
    <section id="about" className="relative py-28 px-6 max-w-6xl mx-auto z-10">
      {/* Section Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[55vw] h-[35vh] bg-neon-cyan/5 blur-[130px] rounded-full pointer-events-none z-0"></div>

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
              01. Background & Philosophy
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
              Engineering AI as a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">
                Rigorous System
              </span>
            </h2>
          </motion.div>
        </div>

        {/* Main Narrative Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="glass p-8 md:p-12 rounded-3xl bg-card/60 border border-white/10 shadow-glass-card relative overflow-hidden mb-12"
        >
          {/* Subtle Corner Accent Glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-neon-purple/10 blur-[90px] rounded-full pointer-events-none"></div>

          <div className="space-y-6 text-muted text-base md:text-lg leading-relaxed font-light">
            <p>
              I am a Computer Science undergraduate at the{" "}
              <b className="text-white font-semibold">
                Ghulam Ishaq Khan Institute (GIKI)
              </b>
              , focusing on the intersection of Computer Vision, Deep Learning, and AI Systems Architecture.
            </p>
            <p>
              My work centers on transforming deep neural networks from isolated research prototypes into reliable, production-grade applications. Whether architecting cross-camera video tracking pipelines, validating model attribution via explainable AI (XAI), or building MLOps monitoring with automated drift detection, I emphasize{" "}
              <span className="text-white font-medium">reproducibility</span>,{" "}
              <span className="text-white font-medium">deterministic evaluation</span>, and{" "}
              <span className="text-white font-medium">low-latency execution</span>.
            </p>
            <p>
              I enjoy tackling complex systems challenges: streaming multimodal telemetry with Kafka and WebSockets, enforcing strict cryptographic data lineage DAGs, and building agentic loops with LangGraph and the Model Context Protocol (MCP).
            </p>
          </div>
        </motion.div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
                className="glass p-6 md:p-8 rounded-2xl bg-card/40 border border-white/5 hover:border-neon-cyan/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neon-cyan mb-5 group-hover:shadow-neon-cyan group-hover:scale-105 transition-all">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed font-light">
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
