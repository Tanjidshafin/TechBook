/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  darkMode: ['class', '[data-theme="dark"]'],
  plugins: [daisyui],
};
