/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAF7F5',
        blush: '#F5E6E8',
        'blush-pink': '#E8A0AA',
        'muted-rose': '#C77B8A',
        'rose-pink': '#D97792',
        'sage-green': '#9CAF88',
        'olive-green': '#7A8B6F',
        'dark-olive': '#5A6B52',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.06)',
        'soft-lg': '0 8px 30px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}
