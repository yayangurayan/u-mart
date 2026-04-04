/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        unimed: {
          green: '#128F9E', // Warna khas UNIMED yang baru
          dark: '#0C6B76',  // Warna hover (sedikit lebih gelap dari warna utama)
          yellow: '#FDB913',
          blue: '#00539C'
        }
      }
    },
  },
  plugins: [],
}