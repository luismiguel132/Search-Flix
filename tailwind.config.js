/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./movie-details.html",
    "./filmesFavoritos.html",
    "./login.html",
    "./register.html",
    "./app.js",
    "./details.js",
    "./FilmesFavoritos.js",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3490dc',
        secondary: '#ffed4a',
        danger: '#e3342f',
      },
    },
  },
  plugins: [],
} 