/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        primary: "#1B5789",
        white: "#ffffff",
        purple: "#3f3cbb",
        midnight: "#121063",
        metal: "#565584",
        tahiti: "#3ab7bf",
        silver: "#ecebff",
        "bubble-gum": "#ff77e9",
        bermuda: "#78dcca",
        hovered: "#E4F8F3",
        actif: "#25A5AA",
      },
      fontFamily: {
        pop: ["Poppins"],
        popBold: ["Poppins"],
      },
    },
  },
  plugins: [require("daisyui")],
};
