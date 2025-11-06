/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'autumn-orange': '#d35400',
        'warm-amber': '#f39c12',
        'deep-rust': '#a84300',
        'cozy-cream': '#fef5e7',
        'chocolate': '#5d4037',
        'burgundy': '#8b4513',
        'olive-green': '#556b2f',
        'mustard': '#daa520',
        'parchment': '#fdf6e3',
        'soft-taupe': '#d7ccc8',
        'charcoal': '#374151',
        'vanilla': '#fff8e1',
      },
      backgroundImage: {
        'gradient-autumn': 'linear-gradient(135deg, #d35400 0%, #f39c12 100%)',
        'gradient-warm': 'linear-gradient(45deg, #fef5e7 0%, #fff8e1 100%)',
        'gradient-card': 'linear-gradient(145deg, #ffffff 0%, #fef5e7 100%)',
        'gradient-hero': 'linear-gradient(rgba(211, 84, 0, 0.8), rgba(243, 156, 18, 0.8))',
      },
      fontFamily: {
        'serif': ['Cormorant Garamond', 'serif'],
        'sans': ['Inter', 'sans-serif'],
        'accent': ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}

