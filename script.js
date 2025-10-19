document.addEventListener('DOMContentLoaded', function() {
    // Mark document as touch-capable if applicable
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.documentElement.classList.add('is-touch');
    }
    // particles.js configuration
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#ffffff" },
            "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 5 }, "image": { "src": "img/github.svg", "width": 100, "height": 100 } },
            "opacity": { "value": 0.5, "random": false, "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false } },
            "size": { "value": 3, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } },
            "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 },
            "move": { "enable": true, "speed": 6, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
            "modes": { "grab": { "distance": 400, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 }, "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } }
        },
        "retina_detect": true
    });

    // Scroll-triggered animations
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when a link is tapped/clicked (mobile)
    navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Emulate hover on touch devices: no click, just finger movement
    // Use touch events to emulate hover precisely under finger
    const supportsHover = window.matchMedia('(hover: hover)').matches;
    if (!supportsHover) {
        let hoveredCard = null;
        let hoveredBtn = null;

        const clearHoverStates = () => {
            if (hoveredCard) { hoveredCard.classList.remove('is-active'); hoveredCard = null; }
            if (hoveredBtn) { hoveredBtn.classList.remove('is-active'); hoveredBtn = null; }
        };

        const handleTouchMove = (touch) => {
            const el = document.elementFromPoint(touch.clientX, touch.clientY);
            const card = el && el.closest ? el.closest('.project-card') : null;
            if (card !== hoveredCard) {
                if (hoveredCard) hoveredCard.classList.remove('is-active');
                if (card) card.classList.add('is-active');
                hoveredCard = card;
            }
            const btn = el && el.closest ? el.closest('.btn') : null;
            if (btn !== hoveredBtn) {
                if (hoveredBtn) hoveredBtn.classList.remove('is-active');
                if (btn) btn.classList.add('is-active');
                hoveredBtn = btn;
            }
        };

        document.addEventListener('touchstart', (e) => {
            if (e.touches && e.touches[0]) handleTouchMove(e.touches[0]);
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            if (e.touches && e.touches[0]) handleTouchMove(e.touches[0]);
        }, { passive: true });

        document.addEventListener('touchend', clearHoverStates, { passive: true });
        document.addEventListener('touchcancel', clearHoverStates, { passive: true });

        // Pointer events fallback (Android Chrome and newer iOS)
        document.addEventListener('pointermove', (e) => {
            const card = e.target.closest && e.target.closest('.project-card');
            if (card !== hoveredCard) {
                if (hoveredCard) hoveredCard.classList.remove('is-active');
                if (card) card.classList.add('is-active');
                hoveredCard = card;
            }
            const btn = e.target.closest && e.target.closest('.btn');
            if (btn !== hoveredBtn) {
                if (hoveredBtn) hoveredBtn.classList.remove('is-active');
                if (btn) btn.classList.add('is-active');
                hoveredBtn = btn;
            }
        }, { passive: true });
        document.addEventListener('pointerup', clearHoverStates, { passive: true });
        document.addEventListener('pointercancel', clearHoverStates, { passive: true });
        document.addEventListener('scroll', () => {
            // Clear after scroll ends to avoid stuck states
            clearHoverStates();
        }, { passive: true });
    }

    // Keyboard accessibility for buttons (desktop and mobile)
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') btn.classList.add('is-active');
        });
        btn.addEventListener('keyup', () => btn.classList.remove('is-active'));
    });
});