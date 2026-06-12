import { useState, useEffect, useRef } from "react";
import { runLoadingSequence } from "../hooks/useMotion";

const LoadingScreen = ({ onFinish }) => {
  const [visible, setVisible] = useState(true);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    // Small delay so SVG is in the DOM
    const timer = setTimeout(() => {
      runLoadingSequence(() => {
        setVisible(false);
        onFinish?.();
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!visible) return null;

  return (
    <div
      id="loading-screen"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-bg"
    >
      {/* Glow ring */}
      <div
        id="loader-ring"
        className="absolute w-32 h-32 rounded-full border border-neon-cyan/50 opacity-0"
        style={{ boxShadow: "0 0 40px rgba(0,229,255,0.3)" }}
      />

      {/* MZ Logo SVG */}
      <div className="relative flex items-center gap-1">
        <svg
          id="loader-letter-m"
          width="52"
          height="52"
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 42V10L20 30L32 10V42"
            stroke="#00E5FF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
        <svg
          id="loader-letter-z"
          width="44"
          height="52"
          viewBox="0 0 44 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 14H36L8 42H36"
            stroke="#00E5FF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
};

export default LoadingScreen;
