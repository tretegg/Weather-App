import scrollbar from "tailwind-scrollbar"

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,svelte,ts,md}"],
    theme: {
        extend: {
            fontFamily: {
                "prestige-elite": "'Prestige Elite', system-ui",
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
                }
            },

            animation: {
                "scrolling-gradient": 'scrolling-gradient-frames 15s ease infinite',
                "fast-scrolling-gradient": 'scrolling-gradient-frames 5s ease infinite',
                'rotate': 'rotate 3s linear forwards infinite'
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

            colors: {
                "main": "#ceff0a",  
                "light": "#e8eddf",
                "light-2": "#cfdbd5",
                "light-3": "#6d7471",
                "dark": "#242423",
                "dark-2": "#333533",
                "dark-3": "#010201"
            },

            screens: {
                'xs': '475px',
                "3xl": '1600px',
                "4xl": '2000px'
            }
        },

    },

    plugins: [
        scrollbar({ nocompatible: true }),
    ],
    // darkMode: "selector"
}