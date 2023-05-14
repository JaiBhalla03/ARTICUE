/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontWeight: {
        'light': 100,
      },
      animation: {
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in-out': 'scaleInOut 1s ease-in-out infinite',
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        scaleInOut: {
          '0%': { transform: 'scale(0.9)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(0.9)' },
        },
      },
    }
  },
  plugins: [],
}