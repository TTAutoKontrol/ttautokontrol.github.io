/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#E53E3E',
        secondary: '#2D3748',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 