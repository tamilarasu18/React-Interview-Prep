import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // React brand cyan/teal — matches the react.dev link colour family
        primary: {
          50: '#eff9fd',
          100: '#d6f0fa',
          200: '#aee1f5',
          300: '#7dcdec',
          400: '#45b3dd',
          500: '#149eca',
          600: '#087ea4',
          700: '#0b6688',
          800: '#10526d',
          900: '#0f4459',
        },
      },
      keyframes: {
        'flip-in': {
          '0%': { opacity: '0', transform: 'rotateX(-12deg)' },
          '100%': { opacity: '1', transform: 'rotateX(0deg)' },
        },
      },
      animation: {
        'flip-in': 'flip-in 220ms ease-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
