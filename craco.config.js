const { resolve } = require('path');

module.exports = {
  webpack: {
    alias: {
      '@components': resolve(__dirname, 'src/components'),
      '@lib': resolve(__dirname, 'src/lib'),
      '@pages': resolve(__dirname, 'src/pages'),
    },
  },
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
};
