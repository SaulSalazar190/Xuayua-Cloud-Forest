/* ==========================================================================
   PHOTO GALLERY FILTERS & IMMERSIVE LIGHTBOX - Xuayua Cloud Forest
   ========================================================================== */

function initPhotoGallery() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img-focus');
    const lightboxClose = document.getElementById('lightbox-close-btn');
    const lightboxPrev = document.getElementById('lightbox-prev-btn');
    const lightboxNext = document.getElementById('lightbox-next-btn');

    if (!galleryItems.length || !lightbox) return;

    let currentImages = [];
    let activeImageIndex = 0;

    // Filter Thumbnails
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.classList.remove('hidden');
                    item.style.transform = 'scale(0.8)';
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.transform = 'scale(1)';
                        item.style.opacity = '1';
                    }, 50);
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // Extract current visible image sources
    function updateVisibleImageList() {
        currentImages = Array.from(galleryItems)
            .filter(item => !item.classList.contains('hidden'))
            .map(item => item.querySelector('img').src);
    }

    // Modal click triggers
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            updateVisibleImageList();
            const clickedSrc = item.querySelector('img').src;
            activeImageIndex = currentImages.indexOf(clickedSrc);

            openLightbox(clickedSrc);
        });
    });

    function openLightbox(src) {
        lightboxImg.src = src;
        lightbox.style.display = 'flex';
        setTimeout(() => {
            lightbox.classList.add('active');
        }, 10);
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.style.display = 'none';
        }, 400);
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Browse backward
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => {
            if (currentImages.length <= 1) return;
            activeImageIndex = (activeImageIndex - 1 + currentImages.length) % currentImages.length;
            
            lightboxImg.style.transform = 'scale(0.95)';
            lightboxImg.style.opacity = '0.7';
            setTimeout(() => {
                lightboxImg.src = currentImages[activeImageIndex];
                lightboxImg.style.transform = 'scale(1)';
                lightboxImg.style.opacity = '1';
            }, 150);
        });
    }

    // Browse forward
    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => {
            if (currentImages.length <= 1) return;
            activeImageIndex = (activeImageIndex + 1) % currentImages.length;

            lightboxImg.style.transform = 'scale(0.95)';
            lightboxImg.style.opacity = '0.7';
            setTimeout(() => {
                lightboxImg.src = currentImages[activeImageIndex];
                lightboxImg.style.transform = 'scale(1)';
                lightboxImg.style.opacity = '1';
            }, 150);
        });
    }

    // Keyboards checks
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft' && lightboxPrev) lightboxPrev.click();
        if (e.key === 'ArrowRight' && lightboxNext) lightboxNext.click();
    });
}
