/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#050816", // Deep Navy/Black Background
        secondary: "#aaa6c3", // Text Grey
        tertiary: "#151030", // Darker card background
        "neon-blue": "#00f3ff",
        "neon-purple": "#bc13fe",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
    },
  },
  plugins: [],
}