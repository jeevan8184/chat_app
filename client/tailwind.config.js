/** @type {import('tailwindcss').Config} */
module.exports = {
  devServer: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'unsafe-none'
    }
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

