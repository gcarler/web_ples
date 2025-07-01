
import type { Config } from "tailwindcss";
const defaultTheme = require('tailwindcss/defaultTheme'); // Required for default font stack

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
      fontFamily: {
        sans: ['Comfortaa', ...defaultTheme.fontFamily.sans], // Add Comfortaa to the beginning of the sans-serif stack
      },
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
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
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '20%': { backgroundPosition: '80% 0%' },
          '40%': { backgroundPosition: '20% 100%' },
          '60%': { backgroundPosition: '100% 80%' },
          '80%': { backgroundPosition: '10% 20%' },
        },
        'expand-in': {
          'from': { transform: 'scale(0)', opacity: '0' },
          'to': { transform: 'scale(1)', opacity: '1' },
        },
        'fade-in-up': {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'move-and-scale': {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: 0.5 },
          '25%': { transform: 'translate(15%, -20%) scale(1.2)', opacity: 1 },
          '50%': { transform: 'translate(-10%, 15%) scale(0.9)', opacity: 0.7 },
          '75%': { transform: 'translate(5%, 25%) scale(1.1)', opacity: 1 },
          '100%': { transform: 'translate(0, 0) scale(1)', opacity: 0.5 },
        },
        'bubble-rise': {
          '0%': {
            transform: 'translateY(0) scale(0.5)',
            opacity: '0',
          },
          '50%': {
            opacity: '0.7',
          },
          '100%': {
            transform: 'translateY(-500px) scale(1.2)',
            opacity: '0',
          },
        },
        'slide-across-anim': {
          '0%': { left: '0%', transform: 'translateY(-50%)' },
          '100%': { left: '100%', transform: 'translate(-100%, -50%)' },
        },
        'drone-path': {
          '0%': { transform: 'translate(-120%, 0px) rotate(-5deg)' },
          '50%': { transform: 'translate(120%, -20px) rotate(5deg)' },
          '100%': { transform: 'translate(-120%, 0px) rotate(-5deg)' },
        },
        'scan-beam': {
          '0%, 100%': { transform: 'translateY(-20%)', opacity: '0' },
          '10%, 90%': { opacity: '1' },
          '50%': { transform: 'translateY(100%)' },
        },
        'tree-sway': {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
        'pulse-fade-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
          '100%': { opacity: '0', transform: 'scale(0.95)' },
        },
        'fly-in-word': {
          '0%': { opacity: '0', transform: 'translateY(1em) scale(1.5)' },
          '60%': { opacity: '1', transform: 'translateY(0) scale(0.9)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'zoom-in-rotate': {
          'from': { opacity: '0', transform: 'scale(0.5) rotate(-30deg)' },
          'to': { opacity: '1', transform: 'scale(1) rotate(0deg)' },
        },
        'drop-in': {
          'from': { opacity: '0', transform: 'translateY(-50px) scale(0.8)' },
          'to': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
        'gradient': 'gradient-shift 15s ease infinite',
        'button-gradient': 'gradient-shift 45s ease infinite',
        'expand-in': 'expand-in 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'move-and-scale': 'move-and-scale 25s ease-in-out infinite',
        'bubble-rise': 'bubble-rise linear infinite',
        'slide-across': 'slide-across-anim 25s ease-in-out infinite alternate',
        'slide-across-text': 'slide-across-anim 35s ease-in-out infinite alternate-reverse',
        'drone-path': 'drone-path 20s ease-in-out infinite',
        'scan-beam': 'scan-beam 4s ease-in-out infinite',
        'tree-sway': 'tree-sway 5s ease-in-out infinite',
        'pulse-fade-in': 'pulse-fade-in 4s ease-in-out infinite',
        'fly-in-word': 'fly-in-word 1.2s ease-out',
        'zoom-in-rotate': 'zoom-in-rotate 1.2s ease-out',
        'drop-in': 'drop-in 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
