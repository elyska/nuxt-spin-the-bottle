/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        onest: ["Onest", "sans-serif"],
        bangers: ["Bangers", "sans-serif"],
      },
      colors: {
        "tres-blue": {
          DEFAULT: "#82DBC5",
        },
      },
    },
  },
  plugins: [],
};
