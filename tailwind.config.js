/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',  // Custom breakpoint for small phones in landscape / larger phones
      },
      colors: {
        'amante-red': '#B91C1C',
        'amante-red-dark': '#991B1B',
        'amante-red-light': '#DC2626',
        'amante-pink': '#F8BBD9',
        'amante-pink-light': '#FCE7F3',
        'amante-pink-subtle': '#FDF2F8',
        'amante-black': '#1F1F1F',
        'amante-white': '#FFFFFF',
      }
    },
  },
  plugins: [],
}