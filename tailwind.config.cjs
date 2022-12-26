/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'yellow': '#F4E041',
      'blue': '#00BDD3',
      'gray': '#F8F8F8',
      'black': 'rgba(0, 0, 0, 0.87)'
    },
  },
  plugins: [],
}