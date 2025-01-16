/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
	require('daisyui'),
  ],
  daisyui: {
	themes: false,
	darkTheme: "dark",
	base: true,
	styled: true,
	utils: true,
	prefix: "",
	logs: true,
	themeRoot: ":root",
  },
};
