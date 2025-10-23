const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        g: {
          primary: '#009639',
          blue: '#1D5FA7',
          brick: '#9A4B2E',
          terracotta: '#D96D3A',
          ink: '#2A2A2A',
          bg: '#FFFFFF',
          'bg-alt': '#F5F7F8',
          border: 'rgba(42,42,42,0.12)',
          muted: '#88939A',
          success: '#1F8A4C',
          warning: '#E6A700',
          error: '#C7362F',
        },
      },
      fontFamily: {
        heading: ['Gronika', 'serif'],
      },
    },
  },
  plugins: [],
}
