/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      health: "#fb2c36",
      stamina: "#00c951",
      rage: "#e17100",
      experience: "#2b7fff",
      gold: "#fdc700",
      fight: "#e7000b",
      title: "#f6f3f4",
    },
    extend: {},
  },
  plugins: [],
};
