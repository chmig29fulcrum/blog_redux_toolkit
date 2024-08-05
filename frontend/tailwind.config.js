/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all your source files
    flowbite.content(),
  ],
  plugins: [
    // ...
    flowbite.plugin(),
  ],

  //content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  //theme: {
  //  extend: {},
  //},
  //plugins: [],
};
