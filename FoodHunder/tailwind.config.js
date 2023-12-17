/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    './public/**/*.html',
    "./src/**/*.{js,ts,jsx,ts,tsx,vue}",
  ],
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

