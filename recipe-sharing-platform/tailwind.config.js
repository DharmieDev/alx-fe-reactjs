/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        Mozilla: ['"Mozilla Headline"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

