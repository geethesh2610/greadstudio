/** @type {import('tailwindcss').Config} */
export default {
    content: ["./*.{html,js}", "./**/*.{html,js}"],
    theme: {
        extend: {
            fontFamily: {
                onest: ["Onest", "sans-serif"],
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
