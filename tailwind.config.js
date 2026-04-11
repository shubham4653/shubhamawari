/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        aura: '#2D5EF1',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        fira: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}