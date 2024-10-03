/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './app/index.{js,jsx,ts,tsx}',
    './app/tabs/*.{js,jsx,ts,tsx}',
    './app/create-trip/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './app/*.{js,jsx,ts,tsx}',
    './components/*.{js,jsx,ts,tsx}',
    './components/my-trip/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    fontFamily: {
      display: ['dortage'],
      regular: ['fira-r'],
      med: ['fira-m'],
      b: ['fira-b'],
      thin: ['fira-th'],
      italic: ['fira-i'],
      'semi-bold': ['fira-sb'],
      'light-l': ['fira-l'],
      'extra-light': ['fira-extra-l'],
    },
    extend: {
      colors: {
        primary: {100: '#EEB9AA', 400: '#DE8C81', 600: '#F06039', 800: '#E93119'},
        secondary: {100: '#ECF5F5', 200: '#D3E8E9', 400: '#5AA4A3', 600: '#044C71'},
        // zin: '#a1a1aa',
        // 'dark-grey': '#363636',
        // 'primary-teal': '#577371',
        // 'secondary-teal': '#bed2d5',
        // 'secondary-pink': '#efd6d5',
        // grey: '#fefefe',
        // 'gray-dark': '#273444',
        // 'gray-light': '#d3dce6',
        // 'primary-dark': '#3E3F57',
        // 'primary-light': '#EEEDFF',
      },
    },
  },
  plugins: [],
};
