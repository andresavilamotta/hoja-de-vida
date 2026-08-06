document.addEventListener('DOMContentLoaded', () => {
    // 0. LENIS SMOOTH SCROLLING ENGINE
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 2,
            smoothWheel: true
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }

    // 1. DARK / LIGHT MODE THEME TOGGLE
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

    if (themeToggle) {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }

    // 2. MOBILE NAVIGATION MENU TOGGLE
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            const isVisible = navLinks.style.display === 'flex';
            navLinks.style.display = isVisible ? 'none' : 'flex';
            if (!isVisible) {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '80px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = 'var(--color-surface)';
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = '0 10px 20px var(--color-card-shadow)';
            }
        });
    }

    // 3. BENTO BOX CATEGORY FILTERS
    const filterBtns = document.querySelectorAll('.filter-btn');
    const bentoItems = document.querySelectorAll('.bento-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            bentoItems.forEach(item => {
                const categories = item.getAttribute('data-category') || '';
                if (filter === 'all' || categories.includes(filter)) {
                    item.style.display = 'flex';
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        if (!btn.classList.contains('active')) return;
                        item.style.display = 'none';
                    }, 200);
                }
            });
        });
    });

    // 4. INTERACTIVE PDF DOCUMENT MODAL VISOR
    const pdfModal = document.getElementById('pdf-modal');
    const pdfIframe = document.getElementById('pdf-iframe');
    const pdfCloseBtn = document.getElementById('pdf-modal-close');
    const openPdfBtns = document.querySelectorAll('.open-pdf-btn');

    openPdfBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const pdfUrl = btn.getAttribute('data-pdf');
            if (pdfUrl && pdfModal && pdfIframe) {
                pdfIframe.src = pdfUrl;
                pdfModal.classList.add('active');
                pdfModal.setAttribute('aria-hidden', 'false');
            }
        });
    });

    if (pdfCloseBtn && pdfModal) {
        pdfCloseBtn.addEventListener('click', closePdfModal);
        pdfModal.addEventListener('click', (e) => {
            if (e.target === pdfModal) closePdfModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && pdfModal.classList.contains('active')) {
                closePdfModal();
            }
        });
    }

    function closePdfModal() {
        if (!pdfModal || !pdfIframe) return;
        pdfModal.classList.remove('active');
        pdfModal.setAttribute('aria-hidden', 'true');
        setTimeout(() => {
            pdfIframe.src = '';
        }, 300);
    }
});
