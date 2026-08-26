
/** @type {import('tailwindcss').Config} */ 
export default { 
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"], 
  theme: { 
    extend: { 
      colors: { 
        senaPurple: "#7c3aed", 
        senaPurpleDark: "#5b21b6", 
      }, 
    }, 
  }, 
  plugins: [], 
}; 

