/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#050816",
        card: "#0A1022",
        muted: "#8A92B2", // slightly adjusted muted for better contrast
        "neon-cyan": "#00E5FF",
        "neon-purple": "#7C3AED",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0, 229, 255, 0.4)',
        'neon-cyan-strong': '0 0 30px rgba(0, 229, 255, 0.8)',
        'neon-purple': '0 0 20px rgba(124, 58, 237, 0.4)',
        'glass-inset': 'inset 0 0 20px rgba(255, 255, 255, 0.05)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'spin-slow': 'spin 15s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: 0.8, filter: 'brightness(1.2)' },
          '50%': { opacity: 0.4, filter: 'brightness(1)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        }
      }
    },
  },
  plugins: [],
}