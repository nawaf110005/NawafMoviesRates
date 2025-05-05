// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        // add your custom red-main here
        'red-main': '#ff4b45',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
