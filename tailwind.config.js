/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins",
        clash: "CLASH",
        space: "Space Grotesk",
        hanson: "Hanson",
        satoshi: "Satoshi",
      },
    },
  },
  plugins: [],
  darkMode: "class",
}