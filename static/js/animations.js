/* ==========================================================================
   SCROLL TRIGGERS & INTERSECTION WATCHERS - Xuayua Cloud Forest
   ========================================================================== */

function initScrollAnimations() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section, header');

    if (!navLinks.length || !sections.length) return;

    // ScrollSpy: Highlight active link based on scroll position
    window.addEventListener('scroll', () => {
        let currentSection = 'hero';

        sections.forEach(sec => {
            const secTop = sec.offsetTop - 120;
            if (window.scrollY >= secTop) {
                currentSection = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // IntersectionObserver: Fade-in components as they slide into viewport
    const fadeOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, fadeOptions);

    // Apply scroll fades to grids and panels
    const animTargets = document.querySelectorAll('.explorer-card, .town-info-card, .map-container, .casa-img-container, .amenity-card, .gallery-item, .accordion-item, .event-card, .contact-form-panel');
    
    animTargets.forEach(target => {
        // Initialize off-screen state
        target.style.opacity = '0';
        target.style.transform = 'translateY(25px)';
        fadeObserver.observe(target);
    });
}
