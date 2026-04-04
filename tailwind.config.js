/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Wajib untuk fitur Dark Mode
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        unimed: {
          green: '#128F9E', // Warna baru khas UNIMED sesuai instruksi
          dark: '#0e6e7a',  // Warna gelap dari hijau UNIMED untuk efek hover
          yellow: '#FDB913',
          blue: '#00539C'
        }
      }
    },
  },
  plugins: [],
}