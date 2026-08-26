import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import anime from "animejs";
import { useRipple, prefersReducedMotion, TIMING, EASE } from "../hooks/useMotion";

const Contact = () => {
  const submitRef = useRipple();
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ state: "idle", message: "" }); // 'idle' | 'submitting' | 'success' | 'error'

  // Glow on focus for form fields
  useEffect(() => {
    if (!formRef.current || prefersReducedMotion()) return;

    const inputs = formRef.current.querySelectorAll("input, textarea");

    const handleFocus = (e) => {
      anime({
        targets: e.target,
        boxShadow: ["0 0 0px rgba(0,229,255,0)", "0 0 20px rgba(0,229,255,0.25)"],
        borderColor: ["rgba(255,255,255,0.1)", "rgba(0,229,255,0.6)"],
        duration: TIMING.MEDIUM,
        easing: EASE.out,
      });
    };

    const handleBlur = (e) => {
      anime({
        targets: e.target,
        boxShadow: ["0 0 20px rgba(0,229,255,0.25)", "0 0 0px rgba(0,229,255,0)"],
        borderColor: ["rgba(0,229,255,0.6)", "rgba(255,255,255,0.1)"],
        duration: TIMING.MEDIUM,
        easing: EASE.out,
      });
    };

    inputs.forEach((input) => {
      input.addEventListener("focus", handleFocus);
      input.addEventListener("blur", handleBlur);
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("focus", handleFocus);
        input.removeEventListener("blur", handleBlur);
      });
    };
  }, [status.state]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status.state === "error") {
      setStatus({ state: "idle", message: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent double submission
    if (status.state === "submitting") return;

    // Client-side validation for trimmed content
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setStatus({
        state: "error",
        message: "Please fill out all fields with valid information.",
      });
      return;
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setStatus({
        state: "error",
        message: "Please provide a valid email address.",
      });
      return;
    }

    setStatus({ state: "submitting", message: "" });

    try {
      const response = await fetch("https://formspree.io/f/xbdlvber", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
        }),
      });

      if (response.ok) {
        setStatus({
          state: "success",
          message: "Transmission received. I will get back to you shortly!",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        const data = await response.json();
        setStatus({
          state: "error",
          message:
            data.errors?.map((err) => err.message).join(", ") ||
            "Unable to deliver transmission. Please try again or reach out via LinkedIn.",
        });
      }
    } catch (err) {
      setStatus({
        state: "error",
        message: "Network error occurred. Please check your connection and retry.",
      });
    }
  };

  return (
    <section id="contact" className="relative py-32 px-6 max-w-4xl mx-auto z-10">
      {/* Section Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50vw] h-[30vh] bg-neon-cyan/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="glass p-10 md:p-16 rounded-[2.5rem] text-center relative overflow-hidden bg-card/60 border border-white/10 shadow-glass-card"
      >
        {/* Background Glow */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-96 h-96 bg-neon-purple blur-[150px] opacity-20 pointer-events-none z-0"></div>

        <div className="relative z-10">
          <span className="text-xs font-mono font-semibold tracking-widest text-neon-cyan uppercase block mb-3">
            06. Communication Channel
          </span>
          <h2
            data-mask-reveal
            className="text-3xl md:text-5xl font-extrabold mb-6 text-white"
          >
            Initialize{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">
              Connection
            </span>
          </h2>
          <p className="text-muted text-base md:text-lg mb-12 max-w-xl mx-auto font-light leading-relaxed">
            Open for research collaborations, engineering opportunities, and technical discussions. Drop a message below or connect directly via LinkedIn.
          </p>

          <AnimatePresence mode="wait">
            {status.state === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-md mx-auto p-8 rounded-2xl bg-white/5 border border-neon-cyan/30 text-center space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-neon-cyan/10 border border-neon-cyan text-neon-cyan flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-white">Transmission Received</h3>
                <p className="text-muted text-sm leading-relaxed">
                  {status.message}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus({ state: "idle", message: "" })}
                  className="mt-4 px-6 py-2.5 rounded-xl border border-white/20 text-white hover:bg-white/10 transition-colors text-sm font-medium"
                >
                  Send Another Transmission
                </button>
              </motion.div>
            ) : (
              <form
                key="form"
                ref={formRef}
                onSubmit={handleSubmit}
                className="max-w-md mx-auto space-y-5 text-left"
              >
                <div>
                  <label className="text-xs font-bold text-muted block mb-2 tracking-widest uppercase">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={status.state === "submitting"}
                    className="w-full bg-bg/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none transition-all disabled:opacity-50"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-muted block mb-2 tracking-widest uppercase">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={status.state === "submitting"}
                    className="w-full bg-bg/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none transition-all disabled:opacity-50"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-muted block mb-2 tracking-widest uppercase">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={status.state === "submitting"}
                    className="w-full bg-bg/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none transition-all resize-none disabled:opacity-50"
                    placeholder="Your message here..."
                  />
                </div>

                {status.state === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs"
                  >
                    {status.message}
                  </motion.div>
                )}

                <button
                  ref={submitRef}
                  type="submit"
                  disabled={status.state === "submitting"}
                  className="w-full py-4 mt-4 relative group overflow-hidden rounded-xl font-bold text-bg transition-all hover:scale-[1.02] disabled:opacity-60 disabled:pointer-events-none"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-purple transition-all group-hover:opacity-90"></div>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {status.state === "submitting" ? (
                      <>
                        <span className="w-4 h-4 border-2 border-bg border-t-transparent rounded-full animate-spin"></span>
                        Transmitting...
                      </>
                    ) : (
                      "Transmit Message"
                    )}
                  </span>
                </button>
              </form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="relative mt-32 text-center pb-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] max-w-md bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] max-w-md bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-50"
        />
        <p className="text-muted text-sm pt-8 font-light hover:text-white hover:text-glow-cyan transition-all duration-300 cursor-default">
          © {new Date().getFullYear()} Muhammad Zayan. Engineered with Precision.
        </p>
      </footer>
    </section>
  );
};

export default Contact;