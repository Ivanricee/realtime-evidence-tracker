/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: true,
  },
  content: [
    './app/**/*.{js,ts,jsx,tsx,css}',
    './components/**/*.{js,ts,jsx,tsx,css}',
  ],

  important: '#__next',
  theme: {
    extend: {
      placeContent: {
        'center-stretch': 'center stretch',
      },
      placeItems: {
        center: 'center',
      },
    },
  },
  plugins: [],
}
