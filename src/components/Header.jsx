import React from 'react';
import { useCart } from '../context/CartContext';

export default function Header() {
    const cart = useCart();
    const count = cart.items.reduce((s, i) => s + i.qty, 0);

    const toggleTheme = () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    return (
        <header className="bg-white dark:bg-gray-800 shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <a href="/" className="text-xl font-semibold">DevStore</a>
                    <span className="text-sm text-gray-500 dark:text-gray-300">Products catalog</span>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle dark mode"
                        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        🌓
                    </button>
                    <div className="relative">
                        <button aria-label="Open cart" className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                            🛒
                        </button>
                        {count > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-2">
                                {count}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
