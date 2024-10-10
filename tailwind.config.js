/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        'srceen--header': 'calc(100vh - 6rem)',
      },
      minHeight: {
        'srceen--header': 'calc(100vh - 6rem)',
      }
    },
  },
  plugins: [],
}

