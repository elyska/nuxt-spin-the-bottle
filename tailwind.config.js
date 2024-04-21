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
        neon: ["Vibur", "sans-serif"],
      },
      colors: {
        "tres-blue": {
          DEFAULT: "#82DBC5",
          500: "#70c1ad",
        },
        "neon-pink": {
          DEFAULT: "#ff56c2",
          500: "#ff0099",
        },
      },
    },
  },
  plugins: [],
};
