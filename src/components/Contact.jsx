import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section id="contact" className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden max-w-7xl mx-auto p-10">
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        className="flex-[0.75] glass p-8 rounded-2xl"
      >
        <p className="text-[18px] text-secondary">Get in touch</p>
        <h3 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">Contact.</h3>

        {/* GO TO FORMSPREE.IO to get your specific URL and paste it below in 'action' */}
        <form
          action="https://formspree.io/f/YOUR_FORMSPREE_ID" 
          method="POST"
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              placeholder="What's your name?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium focus:ring-2 focus:ring-neon-blue"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
            <input
              type="email"
              name="email"
              placeholder="What's your email?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium focus:ring-2 focus:ring-neon-blue"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows="7"
              name="message"
              placeholder="What do you want to say?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium focus:ring-2 focus:ring-neon-blue"
            />
          </label>

          <button
            type="submit"
            className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl hover:bg-neon-blue hover:text-primary transition-all"
          >
            Send
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;