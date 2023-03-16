/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        darkColor: "hsl(207, 26%, 17%)",
        darkTextColor: "hsl(0, 0%, 100%)",
        lightTextColor: "hsl(200, 15%, 8%)",
      },
    },
    fontFamily: {
      'nunito': ['Nunito Sans', 'sans-serif']
    }
  },
  plugins: [],
};
