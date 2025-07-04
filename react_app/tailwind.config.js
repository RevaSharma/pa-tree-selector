/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class', // Enable dark mode using class
  theme: {
    extend: {
      colors: {
        primary: "#f08c00", // Button background color
        background: "#c7def7", // Body background
        sectionBg: "#edf4f2", // Section background
        crumbBg: "#cad8e6", // Breadcrumb background
        crumbHover: "#90b9e7",
        headerBg: "#146d8b", // Header text color
        headerBgDark: "#0d4f6d", // Header background color dark mode
      },
    },
  },
  plugins: [],
};
