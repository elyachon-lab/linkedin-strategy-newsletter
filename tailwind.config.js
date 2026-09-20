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
          pink: '#EE5B91',
          rose: '#F43F5E',
          yellow: '#E7FF56',
          brightYellow: '#FACC15',
          purple: '#2D1A29',
          blue: '#589CBC',
          amber: '#F5CA32',
          lightPink: '#FFF0F5',
          lightYellow: '#FEFCE8',
          lightBlue: '#D5F0FE',
          bg: '#FAF9FB',
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
