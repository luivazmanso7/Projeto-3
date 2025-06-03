/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#9BB61B',    // Verde institucional
        secondary: '#F6F6DE',  // Amarelo claro
        accent: '#281719',     // Marrom escuro
      },
    },
  },
  plugins: [],
} 