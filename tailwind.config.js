/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',  // Enable Just-In-Time mode for faster builds
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx,html}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}
