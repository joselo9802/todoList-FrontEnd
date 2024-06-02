/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'xs': '590px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    },
    extend: {
      fontFamily: {
        "Poppins": ['Poppins', 'sans-serif'],
        "Kanit" : ['Kanit', 'sans-serif'],
        'Lora': ['Lora', 'serif'],
        "Nunito": ['Nunito', 'sans-serif']
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
