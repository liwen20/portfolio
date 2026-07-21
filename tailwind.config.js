/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: '#0a0a0f', soft: '#12121a', card: '#1a1a24', hover: '#22222e' },
        // 品牌橙色系（匹配原项目 #ff8c42）
        accent: {
          orange: '#ff8c42',
          'orange-light': '#ffc15c',
          'orange-dim': '#cc6e35',
          cyan: '#00f0ff',
          purple: '#a855f7',
        },
        text: { DEFAULT: '#e4e4e7', soft: '#a1a1aa', dim: '#71717a' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        din: ['DIN-Bold', 'Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'gradient': 'gradient 8s ease infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(30px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-20px)' } },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(255, 140, 66, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(255, 140, 66, 0.6)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
