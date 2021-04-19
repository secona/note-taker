module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    minWidth: {
      60: '15rem',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
