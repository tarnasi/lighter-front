/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Safelist all dynamic color classes for gradients and hover effects
    { pattern: /from-.+-.+/ }, // e.g., from-blue-500, from-red-300
    { pattern: /to-.+-.+/ }, // e.g., to-blue-500, to-red-300
    { pattern: /hover:from-.+-.+/ }, // e.g., hover:from-blue-500
    { pattern: /hover:to-.+-.+/ }, // e.g., hover:to-blue-500
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
