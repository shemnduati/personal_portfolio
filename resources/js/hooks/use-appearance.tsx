import { useCallback, useEffect, useState } from 'react';

export type Appearance = 'light'; // Remove 'dark' and 'system' options

// Remove prefersDark function since we won't need it
const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === 'undefined') {
        return;
    }

    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const applyTheme = () => {
    // Always force light mode
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    
    // Set meta tag for color scheme
    const meta = document.querySelector('meta[name="color-scheme"]') || document.createElement('meta');
    meta.name = 'color-scheme';
    meta.content = 'only light';
    document.head.appendChild(meta);
};

// Remove mediaQuery and handleSystemThemeChange since we won't handle system changes

export function initializeTheme() {
    // Always set to light mode
    localStorage.setItem('appearance', 'light');
    setCookie('appearance', 'light');
    applyTheme();
}

export function useAppearance() {
    const [appearance] = useState<Appearance>('light'); // Always light

    const updateAppearance = useCallback((mode: Appearance) => {
        // No-op since we only support light mode
        // You might want to show a notification that dark mode is disabled
        console.log('Dark mode is disabled in this application');
    }, []);

    useEffect(() => {
        // Initialize light mode on mount
        initializeTheme();
        
        // Add CSS to prevent dark mode flashes
        const style = document.createElement('style');
        style.textContent = `
            :root {
                color-scheme: only light !important;
            }
            html, body {
                background-color: white !important;
                color: #333 !important;
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return { appearance, updateAppearance } as const;
}