/** @type {import('tailwindcss').Config} */
export default {
    content: ["./*.{html,js}"],
    theme: {
        extend: {
            fontFamily: {
                mont: ["Montserrat", "sans-serif"],
                inter: ["Inter", "sans-serif"],
            },
        },
    },
    plugins: [],
};