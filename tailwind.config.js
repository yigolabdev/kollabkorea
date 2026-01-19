/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Ensure brand red utilities are always generated
    'bg-kollab-red',
    'text-kollab-red',
    'border-kollab-red',
    'hover:bg-kollab-red',
    'bg-kollab-silver',
    'bg-kollab-beige',
  ],
  theme: {
    extend: {
      colors: {
        'kollab-red': '#dc0000',
        'kollab-beige': '#e4e0db',
        'kollab-silver': '#c0c0c0',
        'kollab-black': '#000000',
        'kollab-dark': '#111111',
      },
    },
  },
  plugins: [],
}
