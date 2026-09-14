/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        metricool: {
          purple: '#2D1A29',
          yellow: '#E7FF56',
          blue: '#589CBC',
          pink: '#EE5B91',
          amber: '#F5CA32',
          lightBlue: '#D5F0FE',
          lightPink: '#FEF1F6',
          bg: '#F9FAFC',
        },
        linkedin: {
          blue: '#0A66C2',
          hover: '#004182',
          light: '#E8F4F9',
          dark: '#001D3D',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
