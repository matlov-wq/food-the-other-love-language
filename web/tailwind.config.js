/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Palette derived from the burnt butter process
        'burnt-butter':   '#B8793A',
        'toasted-foam':   '#E8C888',
        'hazelnut':       '#8B5A2B',
        'milk-solids':    '#6B4226',
        'deep-char':      '#3D2817',
        'cultured-cream': '#FAF3E7',

        // Keep 'butter' as an alias scale for Tailwind utilities that need shades
        butter: {
          50:  '#FAF3E7',  // cultured cream
          100: '#F3E4C8',
          200: '#E8C888',  // toasted foam
          300: '#D4A96A',
          400: '#C48F4A',
          500: '#B8793A',  // burnt butter
          600: '#9A6530',
          700: '#8B5A2B',  // hazelnut
          800: '#6B4226',  // milk solids
          900: '#4E3020',
          950: '#3D2817',  // deep char
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        serif:   ['"Lora"', 'Georgia', 'serif'],
        sans:    ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
