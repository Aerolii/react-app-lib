export const postcssConfig = {
  plugins: [require('tailwindcss'), require('autoprefixer')],
};

export const tailwindConfig = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
