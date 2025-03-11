import { Background } from '@xyflow/react'
import type { Config } from 'tailwindcss'

export default {
    darkMode: ['class'],
    content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            keyframes: {
                next: {
                    '0%': { transform: 'scale(1)' },
                    '100%': { transform: 'scale(1.2)', opacity: '0' }
                },
                back: {
                    '0%': { transform: 'scale(1)' },
                    '100%': { transform: 'scale(0.2)', opacity: '0' }
                }
            },
            filter: {
                'custom-drop-shadow': 'drop-shadow(0 11px 6px rgba(172, 184, 204, .45))'
            },
            boxShadow: {
                light: '0 0 15px #c7c7c7 inset,0 2px 13px #c7c7c7'
            },
            fontFamily: {
                fangyuan: ['fangyuan'],
                sans: ['fangyuan', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji']
            },
            colors: {
                white: '#ffffff',
                black: '#000000',
                theme: '#30A5FF',
                warning: '#eeaf3a',
                green: '#529b2e',
                red: '#ea580c',
                blue: '#4683ED',
                background: 'var(--background)',

                music: {
                    background: 'var(--music-background)'
                },
                audio: {
                    background: '#d8dde6'
                },
                foreground: 'hsl(var(--foreground))',

                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                    second: 'var(--primary-second)',
                    hover: '#7db1f8'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                active: '#364bd4',
                activeBg: '#f6f7fb',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                border: 'var(--border)',
                input: 'var(--input)',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))'
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            }
        },
        theme: {
            screens: {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1536px'
            }
        }
    },
    plugins: [require('tailwindcss-animate')]
} satisfies Config
