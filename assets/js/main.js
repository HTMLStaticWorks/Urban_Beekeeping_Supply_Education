document.addEventListener('DOMContentLoaded', () => {
    /* --- Theme Toggle System --- */
    const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
    if (themeToggleBtns.length > 0) {
        const storedTheme = localStorage.getItem('theme');

        // Function to apply theme
        const applyTheme = (theme) => {
            document.documentElement.setAttribute('data-bs-theme', theme);
            localStorage.setItem('theme', theme);
            updateThemeIcons(theme);
        }

        // Function to update icon
        const updateThemeIcons = (theme) => {
            themeToggleBtns.forEach(btn => {
                const icon = btn.querySelector('i');
                if (icon) {
                    if (theme === 'dark') {
                        icon.classList.remove('bi-moon-fill');
                        icon.classList.add('bi-sun-fill');
                    } else {
                        icon.classList.remove('bi-sun-fill');
                        icon.classList.add('bi-moon-fill');
                    }
                }
            });
        }

        // Sync with OS preferences if nothing in localStorage
        if (!storedTheme) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            applyTheme(prefersDark ? 'dark' : 'light');
        } else {
            applyTheme(storedTheme);
        }

        themeToggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-bs-theme');
                const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
                applyTheme(nextTheme);
            });
        });
    }

    /* --- RTL Toggle System --- */
    const rtlToggleBtns = document.querySelectorAll('.rtl-toggle-btn');
    const storedDir = localStorage.getItem('dir') || 'ltr';

    const applyDir = (direction) => {
        document.documentElement.setAttribute('dir', direction);
        localStorage.setItem('dir', direction);
        rtlToggleBtns.forEach(btn => {
            btn.textContent = direction === 'rtl' ? 'LTR' : 'RTL';
        });
    }

    applyDir(storedDir);

    rtlToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentDir = document.documentElement.getAttribute('dir');
            const nextDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
            applyDir(nextDir);
        });
    });

    /* --- Intersection Observer for Animations --- */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.classList.add('animate-up');
        animationObserver.observe(el);
    });

    /* --- Mobile Navbar Logic --- */
    const navLinks = document.querySelectorAll('.nav-link');
    const offcanvasNavbar = document.getElementById('offcanvasNavbar');
    if (offcanvasNavbar) {
        const bsOffcanvas = new bootstrap.Offcanvas(offcanvasNavbar);
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 992) {
                    bsOffcanvas.hide();
                }
            });
        });
    }

    /* --- Back to Top Button --- */
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* --- Global Performance Optimization (Lazy Loading) --- */
    const lazyImages = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const imgObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.onload = () => img.classList.add('loaded');
                    imgObserver.unobserve(img);
                }
            });
        });
        lazyImages.forEach(img => imgObserver.observe(img));
    }
});
