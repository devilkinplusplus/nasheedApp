/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        squada:['Squada One', 'sans-serif'],
      },
      colors:{
        "green-poison":"#1C6758",
        "black-light":"#2C2A38",
        "black-bg":"#151515",
        "white-pre":"#FFFBFB",
        "brown-oak":"#7E5555",
        "bg-outlet":"#101010",
        "green-smooth":"#1DB954"
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

