/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // Brand system: food-brief/Food Design Brief.md
      colors: {
        paper:            '#FBF8F4', // page background
        blush:            '#F2E7E6', // accent surfaces: cards, notes, ingredient panel
        'blush-border':   '#DFC8CB', // hairlines, borders
        aubergine:        '#2B1430', // text, footer, reverse backgrounds
        'aubergine-soft': '#5C4A5F', // secondary text
        fig:              '#8E3A5E', // recipe accent: links, buttons, step numbers
        'fig-deep':       '#6E2747', // fig hover, quantities, tag text
        pistachio:        '#A3B862', // the cookie; vlog accent fills
        'pistachio-edge': '#94A856', // fork edge, pistachio hover
        'pistachio-deep': '#56661F', // pistachio-colored text
      },
      fontFamily: {
        display: ['"Young Serif"', 'Georgia', 'serif'],
        serif:   ['"Newsreader"', 'Georgia', 'serif'],
        sans:    ['"Work Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '24px',
      },
    },
  },
  plugins: [],
}
