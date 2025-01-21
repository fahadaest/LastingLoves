/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    },
    fontSize: {
      'logo-size': '294px',
    },
    colors: {
      'header-white': '#fff',
      'bg-green': '#162415',
      'logo-font-color': '#020402',
    },
  },
};
export const plugins = [];