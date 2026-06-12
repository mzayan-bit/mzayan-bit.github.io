/**
 * Motion Design System — Anime.js based
 * 
 * Consistent timing tokens:
 *   FAST   = 150ms
 *   MEDIUM = 300ms
 *   LARGE  = 600ms
 *
 * All helpers respect prefers-reduced-motion.
 */
import { useEffect, useRef, useCallback } from "react";
import anime from "animejs";

/* ─── Timing Tokens ─── */
export const TIMING = {
  FAST: 150,
  MEDIUM: 300,
  LARGE: 600,
};

/* ─── Easing Presets ─── */
export const EASE = {
  out: "easeOutCubic",
  inOut: "easeInOutCubic",
  spring: "spring(1, 80, 10, 0)",
  expo: "easeOutExpo",
};

/* ─── Reduced Motion Check ─── */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ─── Magnetic Button Hook ─── */
export function useMagnetic(strength = 0.3) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      anime({
        targets: el,
        translateX: dx,
        translateY: dy,
        duration: TIMING.MEDIUM,
        easing: EASE.out,
      });
    };

    const handleLeave = () => {
      anime({
        targets: el,
        translateX: 0,
        translateY: 0,
        duration: TIMING.LARGE,
        easing: EASE.spring,
      });
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [strength]);

  return ref;
}

/* ─── 3D Tilt Card Hook ─── */
export function useTiltCard(maxTilt = 8) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const tiltX = (y - 0.5) * -maxTilt;
      const tiltY = (x - 0.5) * maxTilt;

      anime({
        targets: el,
        rotateX: tiltX,
        rotateY: tiltY,
        translateY: -12,
        duration: TIMING.MEDIUM,
        easing: EASE.out,
      });

      // Move glow
      const glowEl = el.querySelector("[data-glow]");
      if (glowEl) {
        glowEl.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(0,229,255,0.15), transparent 60%)`;
      }
    };

    const handleLeave = () => {
      anime({
        targets: el,
        rotateX: 0,
        rotateY: 0,
        translateY: 0,
        duration: TIMING.LARGE,
        easing: EASE.spring,
      });
      const glowEl = el.querySelector("[data-glow]");
      if (glowEl) glowEl.style.background = "transparent";
    };

    el.style.perspective = "1000px";
    el.style.transformStyle = "preserve-3d";

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [maxTilt]);

  return ref;
}

/* ─── Stagger Reveal on Scroll ─── */
export function useStaggerReveal(selector, { delay = 80, distance = 40 } = {}) {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targets = entry.target.querySelectorAll(selector);
            anime({
              targets,
              opacity: [0, 1],
              translateY: [distance, 0],
              delay: anime.stagger(delay),
              duration: TIMING.LARGE,
              easing: EASE.out,
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    // Defer to next frame so DOM is ready
    requestAnimationFrame(() => {
      const containers = document.querySelectorAll("[data-stagger-container]");
      containers.forEach((el) => observer.observe(el));
    });

    return () => observer.disconnect();
  }, [selector, delay, distance]);
}

/* ─── Mask Reveal for Section Titles ─── */
export function useMaskReveal() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: entry.target,
              clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
              duration: TIMING.LARGE * 1.5,
              easing: EASE.inOut,
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    requestAnimationFrame(() => {
      document.querySelectorAll("[data-mask-reveal]").forEach((el) => {
        el.style.clipPath = "inset(0 100% 0 0)";
        observer.observe(el);
      });
    });

    return () => observer.disconnect();
  }, []);
}

/* ─── Parallax Scroll Hook ─── */
export function useParallax() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    let ticking = false;
    const elements = [];

    const gather = () => {
      document.querySelectorAll("[data-parallax]").forEach((el) => {
        elements.push({
          el,
          speed: parseFloat(el.dataset.parallax) || 0.1,
        });
      });
    };

    const update = () => {
      const scrollY = window.scrollY;
      elements.forEach(({ el, speed }) => {
        const y = scrollY * speed;
        el.style.transform = `translate3d(0, ${y}px, 0)`;
      });
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    requestAnimationFrame(gather);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

/* ─── Ripple Effect ─── */
export function useRipple() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const handleClick = (e) => {
      const rect = el.getBoundingClientRect();
      const ripple = document.createElement("span");
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(0, 229, 255, 0.3);
        width: ${size}px;
        height: ${size}px;
        left: ${e.clientX - rect.left - size / 2}px;
        top: ${e.clientY - rect.top - size / 2}px;
        pointer-events: none;
        transform: scale(0);
        opacity: 1;
      `;
      el.style.position = "relative";
      el.style.overflow = "hidden";
      el.appendChild(ripple);

      anime({
        targets: ripple,
        scale: [0, 2.5],
        opacity: [0.6, 0],
        duration: TIMING.LARGE,
        easing: EASE.out,
        complete: () => ripple.remove(),
      });
    };

    el.addEventListener("click", handleClick);
    return () => el.removeEventListener("click", handleClick);
  }, []);

  return ref;
}

/* ─── Hero Sequence Timeline ─── */
export function runHeroSequence() {
  if (prefersReducedMotion()) {
    // Show everything immediately
    document.querySelectorAll("[data-hero-animate]").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    return;
  }

  const tl = anime.timeline({ easing: EASE.out });

  // 1. Navbar fades down
  tl.add({
    targets: "[data-hero-navbar]",
    opacity: [0, 1],
    translateY: [-30, 0],
    duration: TIMING.LARGE,
  });

  // 2. Profile image scales in
  tl.add({
    targets: "[data-hero-avatar]",
    opacity: [0, 1],
    scale: [0.9, 1],
    duration: TIMING.LARGE * 1.5,
    easing: "easeOutExpo",
  }, `-=${TIMING.MEDIUM}`);

  // 3. Badge
  tl.add({
    targets: "[data-hero-badge]",
    opacity: [0, 1],
    translateY: [20, 0],
    duration: TIMING.LARGE,
  }, `-=${TIMING.LARGE}`);

  // 4. Name reveals character by character
  tl.add({
    targets: "[data-hero-name] .char",
    opacity: [0, 1],
    translateY: [30, 0],
    delay: anime.stagger(35),
    duration: TIMING.LARGE,
  }, `-=${TIMING.MEDIUM}`);

  // 5. Description reveals line by line
  tl.add({
    targets: "[data-hero-desc]",
    opacity: [0, 1],
    translateY: [20, 0],
    delay: anime.stagger(120),
    duration: TIMING.LARGE,
  }, `-=${TIMING.MEDIUM}`);

  // 6. Buttons animate upward
  tl.add({
    targets: "[data-hero-buttons] a",
    opacity: [0, 1],
    translateY: [30, 0],
    delay: anime.stagger(100),
    duration: TIMING.LARGE,
    easing: EASE.expo,
  }, `-=${TIMING.MEDIUM}`);
}

/* ─── Loading Screen Timeline ─── */
export function runLoadingSequence(onComplete) {
  if (prefersReducedMotion()) {
    onComplete?.();
    return;
  }

  const tl = anime.timeline({
    easing: EASE.inOut,
    complete: onComplete,
  });

  // M letter draws
  tl.add({
    targets: "#loader-letter-m path",
    strokeDashoffset: [anime.setDashoffset, 0],
    duration: 800,
    easing: EASE.inOut,
  });

  // Z letter draws
  tl.add({
    targets: "#loader-letter-z path",
    strokeDashoffset: [anime.setDashoffset, 0],
    duration: 800,
    easing: EASE.inOut,
  }, "-=400");

  // Fill in
  tl.add({
    targets: "#loader-letter-m path, #loader-letter-z path",
    fill: ["rgba(0,229,255,0)", "rgba(0,229,255,1)"],
    strokeOpacity: [1, 0],
    duration: TIMING.LARGE,
  });

  // Glow ring
  tl.add({
    targets: "#loader-ring",
    scale: [0.8, 1.2],
    opacity: [0, 0.6, 0],
    duration: TIMING.LARGE,
    easing: EASE.out,
  }, `-=${TIMING.MEDIUM}`);

  // Fade out entire loader
  tl.add({
    targets: "#loading-screen",
    opacity: [1, 0],
    duration: TIMING.LARGE,
    easing: EASE.out,
  }, "+=200");
}
