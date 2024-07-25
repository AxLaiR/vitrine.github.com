document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const header = document.getElementById('main-header');
    const galleryImages = document.querySelectorAll('.gallery-images img');
    const prevButton = document.querySelector('button.prev');
    const nextButton = document.querySelector('button.next');
    const galleryContainer = document.querySelector('.gallery-images');
    let currentImageIndex = 0;
    const totalImages = galleryImages.length;

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 250) {
            header.classList.remove('transparent');
            header.classList.add('solid');
        } else {
            header.classList.remove('solid');
            header.classList.add('transparent');
        }
    });

    const updateGallery = () => {
        galleryImages.forEach((img, index) => {
            img.classList.remove('active');
            img.classList.remove('inactive');
            if (index === currentImageIndex) {
                img.classList.add('active');
            } else {
                img.classList.add('inactive');
            }
        });

        // Réglage du décalage pour centrer l'image active avec une vue partielle des images adjacentes
        const offset = -currentImageIndex * (galleryImages[0].clientWidth + 20) + (galleryContainer.clientWidth - galleryImages[0].clientWidth) / 2;
        galleryContainer.style.transform = `translateX(${offset}px)`;
    };

    const showNextImage = () => {
        currentImageIndex = (currentImageIndex + 1) % totalImages;
        updateGallery();
    };

    const showPrevImage = () => {
        currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
        updateGallery();
    };

    prevButton.addEventListener('click', () => {
        showPrevImage();
    });

    nextButton.addEventListener('click', () => {
        showNextImage();
    });

    // Optional: auto-slide every 5 seconds
    setInterval(showNextImage, 5000);

    updateGallery();
});
