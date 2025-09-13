const config = {
  plugins: {
    '@tailwindcss/postcss': {
      content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
      theme: {
        extend: {},
      },
      plugins: [],
    },
  },
};

export default config;
