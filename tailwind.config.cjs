const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#66101F',
                    50: '#F3B5C0',
                    100: '#F1A3B1',
                    200: '#EB8092',
                    300: '#E65C74',
                    400: '#E03956',
                    500: '#D0213F',
                    600: '#AD1B34',
                    700: '#89162A',
                    800: '#66101F',
                    900: '#360810'
                }
            },
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans]
            }
        }
    },
    plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar')({nocompatible: true})]
}
