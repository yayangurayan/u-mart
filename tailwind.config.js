/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Mengaktifkan fitur Dark Mode berbasis Class
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        unimed: {
          green: '#00A651', 
          dark: '#007A3B',
          yellow: '#FDB913',
          blue: '#00539C'
        }
      }
    },
  },
  plugins: [],
}