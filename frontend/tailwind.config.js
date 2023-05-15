/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: " #25A5AA",
        secondary: " #B1B1B1",
        offwhite: "#FFFFFFB",
        hovered: "#E4F8F3",
        hoveredLog: "#3A74A4",
        grey: " #B1B1B1",
        greey: "#CFCFCF",
        buttons: "#D1EADE",
      },
    },
    fontFamily: {
      pop: ["Poppins"],
      popBold: ["Poppins"],
    },
  },
  plugins: [require("daisyui"), require("tailwind-scrollbar-hide")],
};
