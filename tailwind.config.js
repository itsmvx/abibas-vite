/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-mode="dark-mode"]'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('tailwindcss-animated')
  ],
}