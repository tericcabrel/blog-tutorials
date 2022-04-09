module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-fast': 'spin .5s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
