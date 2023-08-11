/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "ecom-1": "#222831",
        "ecom-2": "#393E46",
        "ecom-3": "#6366f1",
        "ecom-4": "#EEEEEE",
      },
      screens: {
        sm: { max: "480px" },
        md: { max: "768px" },
        lg: { max: "1024px" },
        xl: { max: "1440px" },
      },
    },
  },
  plugins: [],
};
