/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'login-bg': "url('/public/background-login.svg')",
            },
            colors: {
                primary: '#00be00',
                primaryHover: '#049105',
            },
            boxShadow: {
                primary: '0 0, 0 0 10px #64b864',
            },
            screens: {
                mobile: { max: '600px' },
                onlyTablet: { min: '601px', max: '1023px' },
                tablet: { max: '1023px' },
                laptop: {
                    min: '1024px',
                    max: '1200px',
                },
            },
            animation: {
                fadeUp: 'fadeUp 0.3s ease-in-out',
                fadeInLeft:
                    'fadeInLeft 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
                fadeInRight:
                    'fadeInRight 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
                bell: 'bell 1s ease-in-out infinite',
                rotate: 'rotate 1s linear infinite',
                modal: 'modal 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
                fadeInTop:
                    'fadeInTop 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
                skeleton: 'skeleton 1s linear infinite alternate',
            },
            keyframes: {
                fadeUp: {
                    '0%': {
                        opacity: 0,
                        transform: 'translateY(200%)',
                    },
                    '100%': {
                        opacity: 1,
                        transform: 'translateY(0)',
                    },
                },
                fadeInLeft: {
                    '0%': {
                        opacity: 0,
                        transform: 'translateX(-100%)',
                    },
                    '100%': {
                        opacity: 1,
                        transform: 'translateX(0)',
                    },
                },

                fadeInRight: {
                    '0%': { opacity: 0, transform: 'translateX(100%)' },
                    '100%': { opacity: 1, transform: 'translateX(0)' },
                },
                fadeInTop: {
                    '0%': { opacity: 0, transform: 'translateY(-100%)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                },
                bell: {
                    '0%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.2)' },
                    '100%': { transform: 'scale(1)' },
                },

                rotate: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },

                modal: {
                    '0%': { transform: 'scale(1)' },
                    '1%': { transform: 'scale(.5)' },
                    '45%': { transform: 'scale(1.05)' },
                    '80%': { transform: 'scale(.95)' },
                    '100%': { transform: 'scale(1)' },
                },

                skeleton: {
                    '0%': { backgroundColor: 'hls(200, 20%, 80%)' },
                    '100%': { backgroundColor: 'hls(200, 20%, 95%)' },
                },
            },
        },
    },
    plugins: [],
};
