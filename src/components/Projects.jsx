import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  {
    name: "AI Gym Vision",
    description: "Computer vision fitness assistant using MediaPipe & YOLO to track human pose and calculate joint angles for form correction.",
    tags: [
      { name: "python", color: "text-blue-500" },
      { name: "mediapipe", color: "text-green-500" },
      { name: "opencv", color: "text-pink-500" },
    ],
    image: "mzayan-bit.github.io\portfolio\images\ai_gym.png", // Replace with screenshot
    source_code_link: "https://github.com/mzayan-bit/AI_Gym_Vision",
  },
  {
    name: "Roomify",
    description: "Django-based roommate matching platform utilizing a Hybrid AI engine (Heuristic + Scikit-Learn) for 85% match quality.",
    tags: [
      { name: "django", color: "text-green-500" },
      { name: "scikit-learn", color: "text-orange-500" },
      { name: "sql", color: "text-blue-400" },
    ],
    image: "mzayan-bit.github.io\portfolio\images\roomify.png", // Replace with screenshot
    source_code_link: "https://github.com/mzayan-bit/Roomify",
  },
  {
    name: "HabitFlow",
    description: "Mobile habit-tracking app built with Flutter featuring offline-first local storage, streak mechanics, and data visualization.",
    tags: [
      { name: "flutter", color: "text-blue-400" },
      { name: "dart", color: "text-blue-600" },
      { name: "ui/ux", color: "text-pink-500" },
    ],
    image: "mzayan-bit.github.io\portfolio\images\habitflow.png", // Replace with screenshot
    source_code_link: "https://github.com/mzayan-bit/habitflow-app",
  },
];

const ProjectCard = ({ index, name, description, tags, image, source_code_link }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="glass p-5 rounded-2xl sm:w-[360px] w-full transform hover:scale-105 transition-all duration-300"
    >
      <div className="relative w-full h-[230px]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-2xl"
        />
        <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
          <div
            onClick={() => window.open(source_code_link, "_blank")}
            className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer bg-black/80 hover:bg-neon-blue transition-colors"
          >
            <FaGithub className="w-1/2 h-1/2 text-white" />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-white font-bold text-[24px] text-glow">{name}</h3>
        <p className="mt-2 text-secondary text-[14px]">{description}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <p key={tag.name} className={`text-[14px] ${tag.color}`}>
            #{tag.name}
          </p>
        ))}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-20 px-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
        <p className="text-[18px] text-secondary uppercase tracking-wider">My Work</p>
        <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
          Projects.
        </h2>
      </motion.div>

      <div className="mt-20 flex flex-wrap gap-7 justify-center">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;