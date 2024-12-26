// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily:{
      Jost:["jost","sans-serif"],
      Lobster:["Lobster", "sans-serif"]
    },
  },
  plugins: [],
}
