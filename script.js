/* ===================================================================
   Wisdom Osawe Albert — Portfolio Script
   1. Floating nav: adds `.is-scrolled` once the page scrolls past
      the hero, which triggers the blur/shadow styles in style.css.
   2. Theme toggle: switches [data-theme] between "dark" and "light"
      on <html>, remembers the choice in localStorage, and falls
      back to the visitor's OS preference on first visit.
   =================================================================== */

(function () {
    const root = document.documentElement;
    const nav = document.querySelector('nav');
    const STORAGE_KEY = 'wa-theme';

    /* ---------- Theme ---------- */
    function getPreferredTheme() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === 'light' || saved === 'dark') return saved;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
        const btn = document.querySelector('.theme-toggle');
        if (btn) {
            btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
            btn.innerHTML = theme === 'dark' ? sunIcon() + 'Light' : moonIcon() + 'Dark';
        }
    }

    function sunIcon() {
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
    }

    function moonIcon() {
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>';
    }

    function buildToggleButton() {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'theme-toggle';
        btn.addEventListener('click', () => {
            const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(next);
        });
        return btn;
    }

    if (nav) {
        const toggle = buildToggleButton();
        nav.appendChild(toggle);
    }

    applyTheme(getPreferredTheme());

    /* ---------- Floating nav on scroll ---------- */
    const SCROLL_THRESHOLD = 40;

    function updateNavState() {
        if (!nav) return;
        if (window.scrollY > SCROLL_THRESHOLD) {
            nav.classList.add('is-scrolled');
        } else {
            nav.classList.remove('is-scrolled');
        }
    }

    updateNavState();
    window.addEventListener('scroll', updateNavState, { passive: true });
})();
