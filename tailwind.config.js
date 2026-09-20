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
        brand: {
          indigo: '#1E1B4B',
          violet: '#6366F1',
          cyan: '#06B6D4',
          emerald: '#10B981',
          dark: '#0F172A',
          slate: '#F8FAFC',
        },
        metricool: {
          pink: '#6366F1',
          rose: '#6366F1',
          yellow: '#06B6D4',
          brightYellow: '#06B6D4',
          purple: '#1E1B4B',
          blue: '#6366F1',
          amber: '#F59E0B',
          lightPink: '#EEF2FF',
          lightYellow: '#ECFEFF',
          lightBlue: '#E0F2FE',
          bg: '#F8FAFC',
        },
        linkedin: {
          blue: '#0A66C2',
          hover: '#004182',
          light: '#E8F4F9',
          dark: '#001D3D',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
