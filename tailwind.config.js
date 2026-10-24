/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B2D68',
          950: '#071D42',
          900: '#0B2D68',
          800: '#103A82',
          700: '#174A96',
          600: '#1D5BB8',
          100: '#E8EFFB',
          50: '#F2F6FD',
        },
        royal: {
          DEFAULT: '#174A96',
          dark: '#0B2D68',
          light: '#235EC2',
        },
        gold: {
          DEFAULT: '#C9A044',
          light: '#DFC16E',
          dark: '#A6822E',
          muted: 'rgba(201, 160, 68, 0.15)',
          border: 'rgba(201, 160, 68, 0.35)',
        },
        brand: {
          navy: '#0B2D68',
          royal: '#174A96',
          gold: '#C9A044',
          darkText: '#172033',
          gray: '#6B7280',
          border: '#E5E7EB',
          bgLight: '#F5F6F8',
          white: '#FFFFFF',
          50: '#F5F6F8',
          100: '#E8EFFB',
          500: '#174A96',
          600: '#103A82',
          700: '#0B2D68',
          800: '#071D42',
          900: '#051633',
        }
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif']
      }
    },
  },
  plugins: [],
}
