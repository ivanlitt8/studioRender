/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1A1A1A',
        secondary: '#2C2C2C',
        accent: '#C6A96D',
        'accent-blue': '#1E3D59'
      },
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
        'inter': ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
};