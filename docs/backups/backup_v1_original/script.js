document.addEventListener('DOMContentLoaded', () => {
    // 0. Lenis Smooth Scrolling Engine Initialization
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

    // 1. Dark Mode / Light Mode Theme Toggle
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

    // 2. Interactive Timeline Navigation
    const navButtons = document.querySelectorAll('.nav-btn');
    const contractCards = document.querySelectorAll('.contract-card');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const targetContractId = button.getAttribute('data-contract');
            contractCards.forEach(card => card.classList.remove('active'));

            const targetCard = document.getElementById(targetContractId);
            if (targetCard) targetCard.classList.add('active');
        });
    });

    // 3. Mobile Navigation Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('is-open');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.className = navLinks.classList.contains('is-open') ? 'fas fa-times' : 'fas fa-bars';
            }
        });
    }

    // 4. Project Category Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');
                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'flex';
                        setTimeout(() => { card.style.opacity = '1'; }, 10);
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => { card.style.display = 'none'; }, 300);
                    }
                });
            });
        });
    }

    // =========================================================================
    // REACT BITS INTERACTIVE MODULES & ANIMATIONS
    // =========================================================================

    // 6. Canvas Particle Animations
    initCanvasParticles('hero-canvas', [16, 185, 129], [56, 189, 248]);
    initCanvasParticles('ia-canvas', [2, 132, 199], [14, 165, 233]);
    initCanvasParticles('conservacion-canvas', [22, 163, 74], [34, 197, 94]);
    initCanvasParticles('institucional-canvas', [71, 85, 105], [148, 163, 184]);

    // 7. Decrypted Text Title Animation (React Bits DecryptedText)
    initDecryptedText();

    // 8. Rotating Role Pill (React Bits RotatingText)
    initRotatingText();

    // 9. Spotlight Cursor Tracking (React Bits SpotlightCard)
    initSpotlightCards();

    // 10. 3D Tilt Cards (React Bits TiltedCard)
    init3DTiltCards();

    // 11. CountUp Animated Stats (React Bits CountUp)
    initCountUp();

    // 12. Click Spark Explosion (React Bits ClickSpark)
    initClickSparks();

    // 13. True Focus Title Animations for Panels
    initTrueFocusTitles();

    // 14. Cinematic Video Autoplay on Scroll
    initVideoAutoplay();
});

// --- 14. CINEMATIC VIDEO AUTOPLAY ---
function initVideoAutoplay() {
    const video = document.getElementById('pitch-video');
    if (!video) return;

    // We set it to muted so browsers allow autoplay
    video.muted = true;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.play().catch(e => console.log("Autoplay blocked by browser:", e));
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.5 }); // Plays when 50% of the video is visible

    observer.observe(video);
}

// --- 6. CANVAS PARTICLE ANIMATIONS ---
function initCanvasParticles(canvasId, rgbLight, rgbDark) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };

    function resize() {
        width = canvas.width = canvas.parentElement.offsetWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    canvas.parentElement.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    const particleCount = Math.min(Math.floor((width * height) / 12000), 65);

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = (Math.random() - 0.5) * 0.6;
            this.radius = Math.random() * 2 + 1;
            this.baseAlpha = Math.random() * 0.4 + 0.2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const angle = Math.atan2(dy, dx);
                    const force = (mouse.radius - dist) / mouse.radius;
                    this.x -= Math.cos(angle) * force * 2;
                    this.y -= Math.sin(angle) * force * 2;
                }
            }
        }

        draw() {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = isDark ? `rgba(${rgbDark[0]}, ${rgbDark[1]}, ${rgbDark[2]}, ${this.baseAlpha})` : `rgba(${rgbLight[0]}, ${rgbLight[1]}, ${rgbLight[2]}, ${this.baseAlpha})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Draw connections
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const lineColor = isDark ? `rgba(${rgbDark[0]}, ${rgbDark[1]}, ${rgbDark[2]}, 0.08)` : `rgba(${rgbLight[0]}, ${rgbLight[1]}, ${rgbLight[2]}, 0.08)`;

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 110) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = lineColor;
                    ctx.lineWidth = 1 - dist / 110;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    animate();
}

// --- 7. DECRYPTED TEXT ANIMATION ---
function initDecryptedText() {
    const el = document.getElementById('hero-title');
    if (!el) return;

    const originalText = el.getAttribute('data-text') || el.innerText;
    const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let isAnimating = false;

    function decrypt() {
        if (isAnimating) return;
        isAnimating = true;
        let iteration = 0;
        const maxIterations = originalText.length * 3;

        const interval = setInterval(() => {
            el.innerHTML = originalText.split('').map((char, index) => {
                if (char === ' ') return ' ';
                if (index < iteration / 3) {
                    return `<span class="decrypted-char">${char}</span>`;
                }
                const randomGlyph = glyphs[Math.floor(Math.random() * glyphs.length)];
                return `<span class="encrypted-char">${randomGlyph}</span>`;
            }).join('');

            iteration++;
            if (iteration >= maxIterations) {
                clearInterval(interval);
                el.innerText = originalText;
                isAnimating = false;
            }
        }, 30);
    }

    decrypt();
    el.addEventListener('mouseenter', decrypt);
    el.addEventListener('click', decrypt);
}

// --- 8. ROTATING ROLE PILL ---
function initRotatingText() {
    const roleTextEl = document.getElementById('rotating-role-text');
    if (!roleTextEl) return;

    const roles = [
        "Economista & Gestor de Proyectos",
        "Coordinador Convenios MinAmbiente",
        "Ganador Hackathon IA Mocoa 2026",
        "Auditor Presupuestal SGR ($8.000M+)",
        "Docente Universitario de Economía"
    ];

    let index = 0;

    setInterval(() => {
        roleTextEl.style.opacity = '0';
        roleTextEl.style.transform = 'translateY(-10px)';

        setTimeout(() => {
            index = (index + 1) % roles.length;
            roleTextEl.textContent = roles[index];
            roleTextEl.style.opacity = '1';
            roleTextEl.style.transform = 'translateY(0)';
        }, 300);
    }, 3500);
}

// --- 9. SPOTLIGHT CARDS ---
function initSpotlightCards() {
    const cards = document.querySelectorAll('.card-spotlight');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// --- 10. 3D TILT CARDS ---
function init3DTiltCards() {
    const tiltWrappers = document.querySelectorAll('.tilted-card-wrapper');

    tiltWrappers.forEach(wrapper => {
        wrapper.addEventListener('mousemove', (e) => {
            const rect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const rotateX = (-y / (rect.height / 2)) * 10;
            const rotateY = (x / (rect.width / 2)) * 10;

            wrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        wrapper.addEventListener('mouseleave', () => {
            wrapper.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });
}

// --- 11. COUNT UP STATS ---
function initCountUp() {
    const counters = document.querySelectorAll('.count-up');
    if (counters.length === 0) return;

    const observerOptions = { threshold: 0.5 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'), 10);
                const prefix = el.getAttribute('data-prefix') || '';
                const suffix = el.getAttribute('data-suffix') || '';

                let start = 0;
                const duration = 1800;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsedTime = currentTime - startTime;
                    const progress = Math.min(elapsedTime / duration, 1);
                    const currentValue = Math.floor(progress * target);

                    el.textContent = `${prefix}${currentValue.toLocaleString()}${suffix}`;

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        el.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
                    }
                }

                requestAnimationFrame(updateCounter);
                observer.unobserve(el);
            }
        });
    }, observerOptions);

    counters.forEach(c => observer.observe(c));
}

// --- 12. CLICK SPARKS ---
function initClickSparks() {
    window.addEventListener('click', (e) => {
        const sparkCount = 8;
        for (let i = 0; i < sparkCount; i++) {
            const spark = document.createElement('div');
            spark.className = 'click-spark-dot';
            document.body.appendChild(spark);

            const angle = (i / sparkCount) * Math.PI * 2;
            const distance = Math.random() * 30 + 20;

            const targetX = e.clientX + Math.cos(angle) * distance;
            const targetY = e.clientY + Math.sin(angle) * distance;

            spark.style.left = `${e.clientX}px`;
            spark.style.top = `${e.clientY}px`;
            spark.style.position = 'fixed';
            spark.style.width = '5px';
            spark.style.height = '5px';
            spark.style.borderRadius = '50%';
            spark.style.background = '#10b981';
            spark.style.pointerEvents = 'none';
            spark.style.zIndex = '99999';
            spark.style.transition = 'all 0.4s ease-out';
            spark.style.opacity = '1';

            requestAnimationFrame(() => {
                spark.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`;
                spark.style.opacity = '0';
            });

            setTimeout(() => spark.remove(), 400);
        }
    });
}

// --- 13. TRUE FOCUS TITLE ANIMATIONS ---
function initTrueFocusTitles() {
    const titles = document.querySelectorAll('.theme-panel-content h2');
    titles.forEach(title => {
        const text = title.textContent.trim();
        if (!text) return;

        title.innerHTML = ''; // Clear existing
        title.classList.add('focus-container');

        const words = text.split(' ');
        words.forEach(word => {
            const span = document.createElement('span');
            span.classList.add('focus-word');
            span.innerHTML = word + '&nbsp;'; // Add non-breaking space for gap
            title.appendChild(span);
        });
    });
}
