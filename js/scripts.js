/*!
* Start Bootstrap - Modern Business v5.0.7 (https://startbootstrap.com/template-overviews/modern-business)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-modern-business/blob/master/LICENSE)
*/

// Like button functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize like buttons
    const likeButtons = document.querySelectorAll('.like-btn');

    likeButtons.forEach(button => {
        const productId = button.getAttribute('data-product');
        const isLiked = localStorage.getItem(`liked_${productId}`) === 'true';

        if (isLiked) {
            button.classList.add('liked');
            button.innerHTML = '<i class="bi bi-heart-fill text-danger"></i>';
        }

        button.addEventListener('click', function(e) {
            e.preventDefault();
            const isCurrentlyLiked = this.classList.contains('liked');

            if (isCurrentlyLiked) {
                // Unlike
                this.classList.remove('liked');
                this.innerHTML = '<i class="bi bi-heart"></i>';
                localStorage.removeItem(`liked_${productId}`);
                showToast('Removed from favorites', 'info');
            } else {
                // Like
                this.classList.add('liked');
                this.innerHTML = '<i class="bi bi-heart-fill text-danger"></i>';
                localStorage.setItem(`liked_${productId}`, 'true');
                showToast('Added to favorites!', 'success');
            }
        });
    });

    // Newsletter subscription
    const newsletterForm = document.querySelector('.input-group button');
    if (newsletterForm) {
        newsletterForm.addEventListener('click', function() {
            const emailInput = document.querySelector('.input-group input[type="email"]');
            if (emailInput && emailInput.value) {
                showToast('Thank you for subscribing! 🎉', 'success');
                emailInput.value = '';
            } else {
                showToast('Please enter a valid email address', 'warning');
            }
        });
    }

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.card-body .btn-primary');
    addToCartButtons.forEach(button => {
        if (button.textContent.includes('Add to Cart')) {
            button.addEventListener('click', function() {
                const productName = this.closest('.card-body').querySelector('.card-title').textContent;
                showToast(`${productName} added to cart! 🛒`, 'success');
            });
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Carousel auto-play enhancement
    const heroCarousel = document.getElementById('heroCarousel');
    if (heroCarousel) {
        // Add pause on hover
        heroCarousel.addEventListener('mouseenter', function() {
            const carousel = new bootstrap.Carousel(this);
            carousel.pause();
        });

        heroCarousel.addEventListener('mouseleave', function() {
            const carousel = new bootstrap.Carousel(this);
            carousel.cycle();
        });
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.card, .testimonial-card, .stat-item').forEach(el => {
        observer.observe(el);
    });
});

// Toast notification function
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast-notification');
    existingToasts.forEach(toast => toast.remove());

    // Create new toast
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="bi ${getToastIcon(type)} me-2"></i>
            ${message}
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="bi bi-x"></i>
        </button>
    `;

    document.body.appendChild(toast);

    // Auto remove after 3 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 3000);
}

function getToastIcon(type) {
    switch(type) {
        case 'success': return 'bi-check-circle-fill text-success';
        case 'warning': return 'bi-exclamation-triangle-fill text-warning';
        case 'error': return 'bi-x-circle-fill text-danger';
        default: return 'bi-info-circle-fill text-info';
    }
}

// Add loading animation for external links
document.addEventListener('click', function(e) {
    if (e.target.closest('.external-links a')) {
        const link = e.target.closest('a');
        link.innerHTML = '<i class="bi bi-arrow-clockwise bi-spin me-1"></i>Loading...';
        link.style.pointerEvents = 'none';

        // Reset after a short delay (in case the link doesn't open)
        setTimeout(() => {
            link.innerHTML = link.innerHTML.replace('Loading...', link.textContent.trim());
            link.style.pointerEvents = 'auto';
        }, 2000);
    }
});