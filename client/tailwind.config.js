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
      'pm-message-bg': '#eef1ef',
    },
    backgroundImage: {
      'bg-with-gradient': "linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url('https://cdn.b12.io/client_media/cQFRBNdt/07f1ceb4-c694-11ef-9c5e-0242ac110002-jpg-hero_image.jpeg')",
    },
    screens: {
      xxs: '495px',
      bp900: '900px',
    },
  },
};
export const plugins = [];