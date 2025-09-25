tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#fe4e79',
                secondary: '#ffa04f',
                accent: '#ff3366',
                dark: '#0a0b14',
                '[#140c25]': '#111827'
            },
            fontFamily: {
                'sans': ['Inter', 'system-ui', 'sans-serif']
            },
            animation: {
                'fade-in': 'fadeIn 0.8s ease-out',
                'slide-up': 'slideUp 0.6s ease-out',
                'slide-in': 'slideIn 0.5s ease-out',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'float': 'float 3s ease-in-out infinite'
            }
        }
    }
}