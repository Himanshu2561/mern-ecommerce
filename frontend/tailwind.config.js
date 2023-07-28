/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "ecom-1": "#C4DFDF",
        "ecom-2": "#D2E9E9",
        "ecom-3": "#E3F4F4",
        "ecom-4": "#F8F6F4",
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
