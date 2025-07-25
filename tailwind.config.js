/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}",],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: "#ffffff",
                secondary: "#000000",
            }
        },
    },
    plugins: [],
}