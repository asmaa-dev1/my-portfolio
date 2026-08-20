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
        primary: {
          DEFAULT: '#d4547e',
          dark: '#a83d62',
          light: '#e07a9c',
          pastel: '#f5b8cc',
          glow: 'rgba(212, 84, 126, 0.28)',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
        serif: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}
