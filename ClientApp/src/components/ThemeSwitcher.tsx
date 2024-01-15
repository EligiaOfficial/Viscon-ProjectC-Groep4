import { useState, useEffect } from 'react';

const ThemeSwitcher = () => {
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('theme') || '');

    const applyTheme = (theme) => {
        if (theme === "") {
            localStorage.removeItem('theme')
        } else {
            localStorage.setItem('theme', theme);
        }
        if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    };

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            applyTheme("dark");
        } else {
            applyTheme("light")
        }
    });


    useEffect(() => {
        applyTheme(currentTheme);
    }, [currentTheme]);

    return (
        <div className="w-full flex rounded-md shadow-sm" role="group">
            <div
                onClick={() => applyTheme('light')}
                className={`cursor-pointer inline-flex w-full items-center justify-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-l dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-stone-900 hover:bg-blue-800 ${
                    currentTheme === 'light' ? 'selected' : ''
                }`}
            >
                Light Theme
            </div>
            <div
                onClick={() => applyTheme('dark')}
                className={`cursor-pointer inline-flex w-full items-center border-x justify-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-stone-900 hover:bg-blue-800 ${
                    currentTheme === 'dark' ? 'selected' : ''
                }`}
            >
                Dark Theme
            </div>
            <div
                onClick={() => applyTheme('')}
                className={`cursor-pointer inline-flex w-full items-center justify-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-r dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-stone-900 hover:bg-blue-800 ${
                    currentTheme === '' ? 'selected' : ''
                }`}
            >
                OS Preference
            </div>
        </div>
    );
};

export default ThemeSwitcher;
