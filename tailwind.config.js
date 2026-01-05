/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#050816",
        card: "#151030",
        muted: "#aaa6c3",
        "neon-blue": "#00f3ff",
        "neon-purple": "#bc13fe",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'neon-strong': '0 0 18px rgba(0, 243, 255, 0.65)',
        'neon-soft': '0 0 10px rgba(188, 19, 254, 0.3)',
        'glass-inset': 'inset 0 0 20px rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'spin-slow': 'spin 10s linear infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: 1, filter: 'brightness(1.2)' },
          '50%': { opacity: .8, filter: 'brightness(1)' },
        }
      }
    },
  },
  plugins: [],
}