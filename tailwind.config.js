/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        "primary-blue": "#283093",
        "primary-txt": "#757575",
        "primary-border": "#DEDEDE",
        "primary-bg": "#ECEDFE",
      },
    },
  },
  plugins: [],
} 