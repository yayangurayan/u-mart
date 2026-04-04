/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Kalibrasi Warna Khas UNIMED
        unimed: {
          green: '#00A651', // Hijau terang UNIMED
          dark: '#007A3B',
          yellow: '#FDB913',
          blue: '#00539C'
        }
      }
    },
  },
  plugins: [],
}