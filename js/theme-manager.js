/**
 * Theme Manager - Dark/Light Mode and Color Schemes
 * Features: Theme Toggle, System Preference Detection, Custom Accents
 */

class ThemeManager {
    constructor() {
        this.currentTheme = this.getSavedTheme() || 'dark';
        this.accentColor = this.getSavedAccent() || 'purple';

        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.applyAccentColor(this.accentColor);
        this.setupUI();
        this.attachEventListeners();
        this.detectSystemPreference();
    }

    setupUI() {
        // Add theme toggle button to header
        const header = document.querySelector('header');
        if (!header || document.querySelector('.theme-toggle')) return;

        const themeToggleHTML = `
            <div class="theme-controls">
                <button class="theme-toggle" title="Toggle Theme">
                    <i class="material-icons">dark_mode</i>
                </button>
            </div>
        `;

        header.insertAdjacentHTML('beforeend', themeToggleHTML);
    }

    attachEventListeners() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    detectSystemPreference() {
        if (window.matchMedia) {
            const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

            // Only apply system preference if user hasn't manually set theme
            if (!localStorage.getItem('theme')) {
                this.applyTheme(darkModeQuery.matches ? 'dark' : 'light');
            }

            // Listen for system theme changes
            darkModeQuery.addEventListener('change', (e) => {
                if (!localStorage.getItem('theme')) {
                    this.applyTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(this.currentTheme);
        this.saveTheme(this.currentTheme);
    }

    applyTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);

        // Update toggle button icon
        const themeToggle = document.querySelector('.theme-toggle i');
        if (themeToggle) {
            themeToggle.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
        }

        // Update theme color meta tag for mobile browsers
        const themeColor = theme === 'dark' ? '#1a1a2e' : '#f8f9fa';
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', themeColor);
        }

        // Add transition class for smooth theme change
        document.body.classList.add('theme-transitioning');
        setTimeout(() => {
            document.body.classList.remove('theme-transitioning');
        }, 300);
    }

    applyAccentColor(color) {
        this.accentColor = color;
        document.documentElement.setAttribute('data-accent', color);
        this.saveAccent(color);
    }

    getSavedTheme() {
        return localStorage.getItem('theme');
    }

    saveTheme(theme) {
        localStorage.setItem('theme', theme);
    }

    getSavedAccent() {
        return localStorage.getItem('accent-color');
    }

    saveAccent(color) {
        localStorage.setItem('accent-color', color);
    }

    getCurrentTheme() {
        return this.currentTheme;
    }

    getCurrentAccent() {
        return this.accentColor;
    }
}

// Initialize theme manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
});
