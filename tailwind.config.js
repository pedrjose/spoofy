module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                "spoof-blue": "#0F172A",
                "spoof-green": "#4ADE80",
            },
        },
    },
    plugins: [require("tailwind-scrollbar")],
};
