import { useState, useEffect } from 'react';

export function useTheme() {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('redpy-theme') || 'dark';
    });

    useEffect(() => {
        const html = document.documentElement;
        if (theme === 'light') {
            html.classList.add('light');
        } else {
            html.classList.remove('light');
        }
        localStorage.setItem('redpy-theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

    return { theme, toggleTheme };
}
