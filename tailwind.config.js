const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,svelte,ts,md}"],
    theme: {
        extend: {
            fontFamily: {
                // Example: "roboto": "'Roboto', system-ui",
            },

            keyframes: {
                "scrolling-gradient-frames": {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%' : { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                },

                "rotate": {
                    '0%': {transform: 'rotate3d(0 0 0 0deg)'},
                    '100%': {transform: 'rotate3d(0 1 0 360deg)'}
                },

                meteor: {
                    "0%": { transform: "rotate(215deg) translateX(0)", opacity: 1 },
                    "70%": { opacity: 1 },
                    "100%": {
                      transform: "rotate(215deg) translateX(-500px)",
                      opacity: 0,
                    },
                },
                "border-beam": {
                    "100%": {
                        "offset-distance": "100%",
                    },
                },
            },

            animation: {
                "scrolling-gradient": 'scrolling-gradient-frames 15s ease infinite',
                "fast-scrolling-gradient": 'scrolling-gradient-frames 5s ease infinite',
                'rotate': 'rotate 3s linear forwards infinite',
                meteor: "meteor 5s linear infinite",
                "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
            },
        
            width: {
                "1/7": "14.2%",
                "1/8": "12.5%",
            },
        
            height: {
                "1/7": "14.2%",
                "1/8": "12.5%",
            },
        
            backgroundSize: {
                "scrolling-gradient-size": '400% 400%',
            },
        },

        screens: {
            'xs': '475px',
            ...defaultTheme.screens,
            "3xl": '1600px',
            "4xl": '2000px'
        }

    },

    plugins: [
        require('tailwind-scrollbar')({ nocompatible: true }),
    ],
}
