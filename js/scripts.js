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

// Dark Mode Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle btn';
    themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon"></i>';
    themeToggle.title = 'Toggle Dark Mode';

    // Add to navbar
    const navbarNav = document.querySelector('.navbar-nav');
    if (navbarNav) {
        const li = document.createElement('li');
        li.className = 'nav-item';
        li.appendChild(themeToggle);
        navbarNav.appendChild(li);
    }

    // Theme toggle event
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        this.innerHTML = newTheme === 'dark' ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon"></i>';
        showToast(`Switched to ${newTheme} mode`, 'info');
    });
});

// Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create search container
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container d-flex align-items-center';
    searchContainer.innerHTML = `
        <input type="text" class="search-input form-control" placeholder="Search products..." id="productSearch">
        <button class="search-btn" id="searchBtn">
            <i class="bi bi-search"></i>
        </button>
    `;

    // Add to navbar
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse) {
        const searchLi = document.createElement('li');
        searchLi.className = 'nav-item flex-fill mx-3';
        searchLi.appendChild(searchContainer);
        navbarCollapse.querySelector('.navbar-nav').appendChild(searchLi);
    }

    // Search functionality
    const searchInput = document.getElementById('productSearch');
    const searchBtn = document.getElementById('searchBtn');

    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        if (!query) {
            showToast('Please enter a search term', 'warning');
            return;
        }

        // Product data for search
        const products = [
            { name: 'Khichdi Mix', page: 'products-snacks.html', id: 'khichdi-mix' },
            { name: 'Poha Mix', page: 'products-snacks.html', id: 'poha-mix' },
            { name: 'Upma Mix', page: 'products-snacks.html', id: 'upma-mix' },
            { name: 'Murukku', page: 'products-snacks.html', id: 'murukku' },
            { name: 'Banana Chips', page: 'products-snacks.html', id: 'banana-chips' },
            { name: 'Khakra', page: 'products-snacks.html', id: 'khakra' },
            { name: 'Mathri', page: 'products-snacks.html', id: 'mathri' },
            { name: 'Sev', page: 'products-snacks.html', id: 'sev' },
            { name: 'Cherry Cookie', page: 'products-others.html', id: 'cherry-cookie' },
            { name: 'Plain Cookie', page: 'products-others.html', id: 'plain-cookie' },
            { name: 'Special Cookie Box', page: 'products-others.html', id: 'special-cookie-box' },
            { name: 'Chocolate Chip Cookie', page: 'products-others.html', id: 'chocolate-chip-cookie' },
            { name: 'Oatmeal Raisin Cookie', page: 'products-others.html', id: 'oatmeal-raisin-cookie' },
            { name: 'Macadamia Nut Cookie', page: 'products-others.html', id: 'macadamia-nut-cookie' },
            { name: 'Ras Malai', page: 'products-others.html', id: 'ras-malai' },
            { name: 'Sandesh', page: 'products-others.html', id: 'sandesh' },
            { name: 'Cham Cham', page: 'products-others.html', id: 'cham-cham' },
            { name: 'Jalebi', page: 'products-others.html', id: 'jalebi' },
            { name: 'Gulab Jamun', page: 'products-others.html', id: 'gulab-jamun' },
            { name: 'Ladoo', page: 'products-others.html', id: 'ladoo' },
            { name: 'Brownie Cake', page: 'products-cake.html', id: 'brownie-cake' },
            { name: 'Delight Cake', page: 'products-cake.html', id: 'delight-cake' },
            { name: 'Twist Mini Cake', page: 'products-cake.html', id: 'twist-mini-cake' },
            { name: 'Vanilla Cake', page: 'products-cake.html', id: 'vanilla-cake' },
            { name: 'Strawberry Cake', page: 'products-cake.html', id: 'strawberry-cake' },
            { name: 'Red Velvet Cake', page: 'products-cake.html', id: 'red-velvet-cake' },
            { name: 'Black Forest Cake', page: 'products-cake.html', id: 'black-forest-cake' },
            { name: 'Pineapple Cake', page: 'products-cake.html', id: 'pineapple-cake' },
            { name: 'Lemon Cake', page: 'products-cake.html', id: 'lemon-cake' },
            { name: 'Cream Biscuit', page: 'products-biscuits.html', id: 'cream-biscuit' },
            { name: 'Marie Biscuit', page: 'products-biscuits.html', id: 'marie-biscuit' },
            { name: 'Digestive Biscuit', page: 'products-biscuits.html', id: 'digestive-biscuit' },
            { name: 'Butter Biscuit', page: 'products-biscuits.html', id: 'butter-biscuit' },
            { name: 'Coconut Biscuit', page: 'products-biscuits.html', id: 'coconut-biscuit' },
            { name: 'Chocolate Biscuit', page: 'products-biscuits.html', id: 'chocolate-biscuit' },
            { name: 'Almond Biscuit', page: 'products-biscuits.html', id: 'almond-biscuit' },
            { name: 'Cashew Biscuit', page: 'products-biscuits.html', id: 'cashew-biscuit' }
        ];

        const foundProduct = products.find(product =>
            product.name.toLowerCase().includes(query)
        );

        if (foundProduct) {
            window.location.href = `${foundProduct.page}#${foundProduct.id}`;
        } else {
            showToast('Product not found. Try a different search term.', 'warning');
        }
    }

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
});

// Product Detail Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Product data with detailed information
    const productDetails = {
        'khichdi-mix': {
            title: 'Khichdi Mix',
            image: 'assets/img/khichdi-mix.jpg',
            description: 'Our authentic Khichdi Mix brings the comforting flavors of traditional Bengali khichdi to your kitchen. Made with premium quality rice, lentils, and aromatic spices, this mix creates a wholesome, nutritious meal in just 20 minutes. Perfect for busy weeknights or when you crave homemade comfort food.',
            rating: 4.8,
            ingredients: ['Premium Basmati Rice', 'Moong Dal', 'Cumin Seeds', 'Turmeric', 'Ginger', 'Bay Leaves', 'Cinnamon', 'Cardamom', 'Cloves'],
            nutritionalInfo: 'Rich in protein and fiber, low in fat, naturally gluten-free.'
        },
        'poha-mix': {
            title: 'Poha Mix',
            image: 'assets/img/poha-mix.jpg',
            description: 'Experience the light and fluffy goodness of authentic Bengali Poha with our specially crafted mix. Made from flattened rice and traditional spices, this breakfast staple is ready in minutes. Add your favorite vegetables and nuts for a complete, nutritious meal that transports you to the heart of Bengal.',
            rating: 4.7,
            ingredients: ['Flattened Rice', 'Mustard Seeds', 'Curry Leaves', 'Turmeric', 'Green Chilies', 'Peanuts', 'Coconut', 'Lemon'],
            nutritionalInfo: 'High in iron and B vitamins, low calorie, naturally vegan.'
        },
        'upma-mix': {
            title: 'Upma Mix',
            image: 'assets/img/upma-mix.jpg',
            description: 'Our Upma Mix captures the essence of South Indian cuisine with a Bengali twist. Made with semolina and authentic spices, this versatile mix can be prepared sweet or savory. A perfect breakfast option that\'s both nutritious and delicious, bringing the flavors of traditional Indian cooking to your table.',
            rating: 4.6,
            ingredients: ['Semolina', 'Mustard Seeds', 'Urad Dal', 'Chana Dal', 'Curry Leaves', 'Green Chilies', 'Ginger', 'Coconut'],
            nutritionalInfo: 'Good source of complex carbohydrates, contains healthy fats from coconut.'
        },
        'murukku': {
            title: 'Murukku',
            image: 'assets/img/murukku.jpg',
            description: 'Crispy and crunchy Murukku, a beloved South Indian snack with Bengali flavors. Made from rice flour and urad dal, seasoned with sesame seeds and spices. Each piece offers the perfect balance of crispiness and traditional taste. Ideal for festivals, gatherings, or as an anytime snack.',
            rating: 4.9,
            ingredients: ['Rice Flour', 'Urad Dal Flour', 'Sesame Seeds', 'Cumin Seeds', 'Butter', 'Salt', 'Oil for frying'],
            nutritionalInfo: 'High in protein from urad dal, provides sustained energy.'
        },
        'banana-chips': {
            title: 'Banana Chips',
            image: 'assets/img/banana-chips.jpg',
            description: 'Premium quality banana chips made from fresh, ripe bananas sourced from Kerala. Thinly sliced and perfectly fried to golden perfection, these chips offer the authentic taste of traditional Kerala banana chips with a Bengali touch. Naturally sweet and crunchy, they make for an irresistible snack.',
            rating: 4.8,
            ingredients: ['Fresh Kerala Bananas', 'Coconut Oil', 'Salt', 'Turmeric (optional)'],
            nutritionalInfo: 'Rich in potassium and natural sugars, good source of resistant starch.'
        },
        'khakra': {
            title: 'Khakra',
            image: 'assets/img/khakra.jpg',
            description: 'Thin, crispy Gujarati Khakra with Bengali spices. Made from whole wheat flour and flavored with traditional Bengali seasonings. Perfect for breakfast, snacks, or travel food. Each piece is hand-rolled and baked to perfection, offering a healthy, crunchy alternative to regular snacks.',
            rating: 4.5,
            ingredients: ['Whole Wheat Flour', 'Oil', 'Ajwain', 'Salt', 'Turmeric', 'Red Chili Powder', 'Sesame Seeds'],
            nutritionalInfo: 'High in fiber, low in calories, good for digestion.'
        },
        'mathri': {
            title: 'Mathri',
            image: 'assets/img/mathri.jpg',
            description: 'Flaky, crispy Mathri, a traditional North Indian snack with Bengali flavors. Made with refined flour, semolina, and spices, these savory crackers are perfect for tea-time or as appetizers. The perfect balance of spices and the satisfying crunch make them irresistible.',
            rating: 4.7,
            ingredients: ['Refined Flour', 'Semolina', 'Ajwain', 'Salt', 'Black Pepper', 'Oil', 'Water'],
            nutritionalInfo: 'Provides complex carbohydrates, contains healthy spices.'
        },
        'sev': {
            title: 'Sev',
            image: 'assets/img/sev.jpg',
            description: 'Crispy, spicy Sev made from chickpea flour and traditional Bengali spices. This popular snack is perfect for adding crunch to your meals or enjoying on its own. The perfect blend of spices creates an explosion of flavors in every bite.',
            rating: 4.6,
            ingredients: ['Chickpea Flour', 'Turmeric', 'Red Chili Powder', 'Salt', 'Oil', 'Water', 'Baking Soda'],
            nutritionalInfo: 'High in protein from chickpea flour, contains iron and fiber.'
        },
        'brownie-cake': {
            title: 'Brownie Cake',
            image: 'assets/img/brownie-cake.jpg',
            description: 'Rich and fudgy brownie cake, a chocolate lover\'s dream. Made with premium cocoa and dark chocolate, this decadent cake offers the perfect balance of moist texture and intense chocolate flavor. Each slice is a journey into chocolate paradise.',
            rating: 5.0,
            ingredients: ['Dark Chocolate', 'Butter', 'Sugar', 'Eggs', 'Flour', 'Cocoa Powder', 'Vanilla Extract', 'Salt'],
            nutritionalInfo: 'Rich in antioxidants from cocoa, provides energy from natural sugars.'
        },
        'delight-cake': {
            title: 'Delight Cake',
            image: 'assets/img/delight-cake.jpg',
            description: 'Light and delightful cake with fresh flavors. This airy cake combines the lightness of angel food cake with subtle fruit flavors. Perfect for those who prefer lighter desserts without compromising on taste.',
            rating: 4.5,
            ingredients: ['Cake Flour', 'Sugar', 'Egg Whites', 'Vanilla Extract', 'Cream of Tartar', 'Fresh Fruits', 'Whipped Cream'],
            nutritionalInfo: 'Lower in fat than traditional cakes, high in protein from egg whites.'
        },
        'twist-mini-cake': {
            title: 'Twist Mini Cake',
            image: 'assets/img/twist-mini-cake.jpg',
            description: 'Mini twist cakes, fun and flavorful for small celebrations. These bite-sized delights come in various flavors and are perfect for parties, gifts, or personal indulgence. Each mini cake is a work of art with unique flavor combinations.',
            rating: 4.0,
            ingredients: ['Flour', 'Sugar', 'Butter', 'Eggs', 'Baking Powder', 'Milk', 'Various Flavorings', 'Frosting'],
            nutritionalInfo: 'Portion-controlled servings, customizable nutrition based on flavors.'
        },
        'vanilla-cake': {
            title: 'Vanilla Cake',
            image: 'assets/img/vanilla-cake.jpg',
            description: 'Classic vanilla cake with smooth buttercream frosting. This timeless favorite features moist vanilla sponge cake topped with creamy buttercream. The perfect canvas for any celebration or simply enjoying the classic flavors.',
            rating: 4.5,
            ingredients: ['Flour', 'Sugar', 'Butter', 'Eggs', 'Vanilla Extract', 'Baking Powder', 'Milk', 'Buttercream Frosting'],
            nutritionalInfo: 'Classic cake nutrition with carbohydrates for energy and fats for richness.'
        },
        'strawberry-cake': {
            title: 'Strawberry Cake',
            image: 'assets/img/strawberry-cake.jpg',
            description: 'Fresh strawberry cake with real fruit pieces. Made with fresh strawberries folded into the batter and topped with strawberry frosting. The natural sweetness and tanginess of real strawberries make this cake exceptionally delicious.',
            rating: 5.0,
            ingredients: ['Flour', 'Sugar', 'Butter', 'Eggs', 'Fresh Strawberries', 'Strawberry Puree', 'Baking Powder', 'Cream Cheese Frosting'],
            nutritionalInfo: 'Contains vitamin C from strawberries, natural fruit sugars.'
        },
        'red-velvet-cake': {
            title: 'Red Velvet Cake',
            image: 'assets/img/red-velvet-cake.jpg',
            description: 'Moist red velvet cake with cream cheese frosting. The signature red color comes from natural cocoa and a hint of acidity. Paired with tangy cream cheese frosting, this cake offers a perfect balance of flavors.',
            rating: 4.5,
            ingredients: ['Flour', 'Sugar', 'Butter', 'Eggs', 'Cocoa Powder', 'Red Food Coloring', 'Vinegar', 'Cream Cheese', 'Powdered Sugar'],
            nutritionalInfo: 'Contains cocoa antioxidants, calcium from cream cheese.'
        },
        'black-forest-cake': {
            title: 'Black Forest Cake',
            image: 'assets/img/black-forest-cake.jpg',
            description: 'Traditional black forest cake with cherries and chocolate. Layers of chocolate cake, whipped cream, and cherries create this German classic with a Bengali twist. A decadent dessert perfect for special occasions.',
            rating: 5.0,
            ingredients: ['Chocolate Cake Layers', 'Whipped Cream', 'Cherries', 'Dark Chocolate', 'Kirsch (optional)', 'Sugar', 'Butter'],
            nutritionalInfo: 'Rich in antioxidants from chocolate and cherries, provides sustained energy.'
        },
        'pineapple-cake': {
            title: 'Pineapple Cake',
            image: 'assets/img/pineapple-cake.jpg',
            description: 'Tropical pineapple cake with fresh fruit topping. Moist cake infused with pineapple flavor and topped with caramelized pineapple pieces. Brings the taste of tropical paradise to your dessert table.',
            rating: 4.0,
            ingredients: ['Flour', 'Sugar', 'Butter', 'Eggs', 'Crushed Pineapple', 'Baking Powder', 'Pineapple Juice', 'Coconut'],
            nutritionalInfo: 'Contains vitamin C from pineapple, natural tropical sweetness.'
        },
        'lemon-cake': {
            title: 'Lemon Cake',
            image: 'assets/img/lemon-cake.jpg',
            description: 'Zesty lemon cake with tangy lemon glaze. Bright and refreshing, this cake combines the tartness of fresh lemons with sweet cake. Perfect for spring and summer celebrations.',
            rating: 4.5,
            ingredients: ['Flour', 'Sugar', 'Butter', 'Eggs', 'Lemon Zest', 'Lemon Juice', 'Baking Powder', 'Lemon Glaze'],
            nutritionalInfo: 'High in vitamin C from lemons, refreshing and light.'
        },
        'cherry-cookie': {
            title: 'Cherry Cookie',
            image: 'assets/img/cherry-cookie.jpg',
            description: 'Sweet cherry cookies with juicy bits in every bite. Made with real cherry pieces and premium ingredients, these cookies offer a burst of fruity flavor in every crunchy bite.',
            rating: 5.0,
            ingredients: ['Flour', 'Butter', 'Sugar', 'Eggs', 'Dried Cherries', 'Vanilla Extract', 'Baking Powder', 'Salt'],
            nutritionalInfo: 'Contains antioxidants from cherries, provides quick energy.'
        },
        'plain-cookie': {
            title: 'Plain Cookie',
            image: 'assets/img/plain-cookie.jpg',
            description: 'Classic plain cookies, simple yet delicious. The perfect base for any cookie lover, these buttery cookies have just the right amount of sweetness and crunch.',
            rating: 4.5,
            ingredients: ['Flour', 'Butter', 'Sugar', 'Eggs', 'Vanilla Extract', 'Baking Powder', 'Salt'],
            nutritionalInfo: 'Classic cookie nutrition with carbohydrates and healthy fats.'
        },
        'special-cookie-box': {
            title: 'Special Cookie Box',
            image: 'assets/img/special-cookie-box.jpg',
            description: 'Assorted special cookies in a beautiful box, perfect for gifting. A curated selection of our finest cookies, beautifully packaged for special occasions and gifts.',
            rating: 5.0,
            ingredients: ['Various Cookie Types', 'Premium Packaging', 'Ribbon', 'Gift Card'],
            nutritionalInfo: 'Varied nutrition based on cookie selection, perfect for sharing.'
        },
        'chocolate-chip-cookie': {
            title: 'Chocolate Chip Cookie',
            image: 'assets/img/chocolate-chip-cookie.jpg',
            description: 'Classic chocolate chip cookies with melty chocolate chunks. The timeless favorite, featuring generous amounts of premium chocolate chips in a chewy cookie base.',
            rating: 4.5,
            ingredients: ['Flour', 'Butter', 'Brown Sugar', 'White Sugar', 'Eggs', 'Vanilla Extract', 'Chocolate Chips', 'Baking Soda'],
            nutritionalInfo: 'Contains antioxidants from chocolate, provides sustained energy.'
        },
        'oatmeal-raisin-cookie': {
            title: 'Oatmeal Raisin Cookie',
            image: 'assets/img/oatmeal-raisin-cookie.jpg',
            description: 'Chewy oatmeal cookies studded with juicy raisins. A healthier cookie option with the goodness of oats and natural sweetness from raisins.',
            rating: 4.0,
            ingredients: ['Oats', 'Flour', 'Butter', 'Brown Sugar', 'Eggs', 'Raisins', 'Cinnamon', 'Vanilla Extract'],
            nutritionalInfo: 'High in fiber from oats, contains natural sugars from raisins.'
        },
        'macadamia-nut-cookie': {
            title: 'Macadamia Nut Cookie',
            image: 'assets/img/macadamia-nut-cookie.jpg',
            description: 'Buttery cookies with crunchy macadamia nuts. Premium macadamia nuts add a luxurious crunch to these buttery, melt-in-your-mouth cookies.',
            rating: 5.0,
            ingredients: ['Flour', 'Butter', 'Sugar', 'Macadamia Nuts', 'Vanilla Extract', 'Eggs', 'Baking Powder'],
            nutritionalInfo: 'Contains healthy fats from macadamia nuts, rich in minerals.'
        },
        'ras-malai': {
            title: 'Ras Malai',
            image: 'assets/img/ras-malai.jpg',
            description: 'Traditional Bengali sweet, soft cheese dumplings in sweetened milk. Delicate cheese dumplings soaked in cardamom-flavored sweetened milk, a quintessential Bengali dessert.',
            rating: 5.0,
            ingredients: ['Milk', 'Lemon Juice', 'Sugar', 'Cardamom', 'Rose Water', 'Pistachios'],
            nutritionalInfo: 'High in calcium and protein from milk and cheese, naturally sweet.'
        },
        'sandesh': {
            title: 'Sandesh',
            image: 'assets/img/sandesh.jpg',
            description: 'Bengali cottage cheese sweet, delicately flavored and shaped. Fresh cottage cheese sweetened and flavored with cardamom, shaped into beautiful forms.',
            rating: 4.5,
            ingredients: ['Fresh Cottage Cheese', 'Sugar', 'Cardamom', 'Ghee', 'Pistachios'],
            nutritionalInfo: 'High in protein from cottage cheese, calcium-rich.'
        },
        'cham-cham': {
            title: 'Cham Cham',
            image: 'assets/img/cham-cham.jpg',
            description: 'Soft and spongy Bengali sweet, flavored with cardamom. A melt-in-your-mouth sweet made from fresh cheese and flavored with aromatic cardamom.',
            rating: 4.0,
            ingredients: ['Fresh Cheese', 'Sugar', 'Cardamom', 'Milk', 'Semolina'],
            nutritionalInfo: 'Rich in protein and calcium, traditional Bengali nutrition.'
        },
        'jalebi': {
            title: 'Jalebi',
            image: 'assets/img/jalebi.jpg',
            description: 'Crispy, deep-fried spirals soaked in saffron syrup. Golden, crispy spirals of fermented batter soaked in saffron-infused sugar syrup.',
            rating: 5.0,
            ingredients: ['Flour', 'Yogurt', 'Sugar', 'Saffron', 'Rose Water', 'Oil for frying'],
            nutritionalInfo: 'Provides quick energy from sugars, contains probiotics from fermentation.'
        },
        'gulab-jamun': {
            title: 'Gulab Jamun',
            image: 'assets/img/gulab-jamun.jpg',
            description: 'Soft milk dumplings soaked in rose-flavored syrup. Warm, soft dumplings made from milk solids, soaked in cardamom and rose-flavored syrup.',
            rating: 4.5,
            ingredients: ['Milk Solids', 'Flour', 'Sugar', 'Rose Water', 'Cardamom', 'Oil for frying'],
            nutritionalInfo: 'High in calcium from milk solids, provides comfort and energy.'
        },
        'ladoo': {
            title: 'Ladoo',
            image: 'assets/img/ladoo.jpg',
            description: 'Traditional Indian sweet balls made with flour and sugar. Classic besan ladoo with ghee, nuts, and aromatic spices, perfect for festivals and celebrations.',
            rating: 4.0,
            ingredients: ['Besan Flour', 'Ghee', 'Sugar', 'Cardamom', 'Cashews', 'Raisins'],
            nutritionalInfo: 'High in protein from besan, contains healthy fats from ghee.'
        },
        'cream-biscuit': {
            title: 'Cream Biscuit',
            image: 'assets/img/cream-biscuit.jpg',
            description: 'Cream-filled biscuits with smooth, creamy centers. Buttery biscuits with rich cream filling, perfect for tea-time indulgence.',
            rating: 4.2,
            ingredients: ['Flour', 'Butter', 'Sugar', 'Cream Filling', 'Vanilla Extract', 'Baking Powder'],
            nutritionalInfo: 'Contains dairy fats, provides quick energy from sugars.'
        },
        'marie-biscuit': {
            title: 'Marie Biscuit',
            image: 'assets/img/marie-biscuit.jpg',
            description: 'Light and crispy Marie biscuits, perfect with tea. Classic light biscuits that pair perfectly with tea, coffee, or any beverage.',
            rating: 4.0,
            ingredients: ['Flour', 'Sugar', 'Butter', 'Milk', 'Baking Powder', 'Salt'],
            nutritionalInfo: 'Light and crispy, lower in fat than other biscuits.'
        },
        'digestive-biscuit': {
            title: 'Digestive Biscuit',
            image: 'assets/img/digestive-biscuit.jpg',
            description: 'Whole grain digestive biscuits for healthy snacking. Made with whole wheat flour and bran for better digestion and nutrition.',
            rating: 4.3,
            ingredients: ['Whole Wheat Flour', 'Bran', 'Butter', 'Sugar', 'Baking Powder', 'Salt'],
            nutritionalInfo: 'High in fiber for digestion, contains whole grain benefits.'
        },
        'butter-biscuit': {
            title: 'Butter Biscuit',
            image: 'assets/img/butter-biscuit.jpg',
            description: 'Rich butter biscuits with authentic butter flavor. Premium biscuits made with real butter for that authentic, rich taste.',
            rating: 4.5,
            ingredients: ['Flour', 'Butter', 'Sugar', 'Eggs', 'Vanilla Extract', 'Baking Powder'],
            nutritionalInfo: 'Contains healthy fats from butter, provides sustained energy.'
        },
        'coconut-biscuit': {
            title: 'Coconut Biscuit',
            image: 'assets/img/coconut-biscuit.jpg',
            description: 'Coconut-flavored biscuits with real coconut pieces. Tropical biscuits with the natural sweetness and texture of fresh coconut.',
            rating: 4.4,
            ingredients: ['Flour', 'Butter', 'Sugar', 'Desiccated Coconut', 'Eggs', 'Vanilla Extract'],
            nutritionalInfo: 'Contains healthy fats from coconut, natural tropical sweetness.'
        },
        'chocolate-biscuit': {
            title: 'Chocolate Biscuit',
            image: 'assets/img/chocolate-biscuit.jpg',
            description: 'Chocolate-coated biscuits with rich cocoa flavor. Crispy biscuits coated in premium chocolate for double the chocolate experience.',
            rating: 4.6,
            ingredients: ['Flour', 'Butter', 'Sugar', 'Cocoa Powder', 'Chocolate Coating', 'Vanilla Extract'],
            nutritionalInfo: 'Contains antioxidants from cocoa, provides chocolate benefits.'
        },
        'almond-biscuit': {
            title: 'Almond Biscuit',
            image: 'assets/img/almond-biscuit.jpg',
            description: 'Crunchy almond biscuits with whole almond pieces. Premium biscuits studded with crunchy almonds for texture and nutrition.',
            rating: 4.7,
            ingredients: ['Flour', 'Butter', 'Sugar', 'Whole Almonds', 'Vanilla Extract', 'Baking Powder'],
            nutritionalInfo: 'High in healthy fats and vitamin E from almonds.'
        },
        'cashew-biscuit': {
            title: 'Cashew Biscuit',
            image: 'assets/img/cashew-biscuit.jpg',
            description: 'Cashew-studded biscuits with premium nuts. Rich biscuits featuring generous amounts of premium cashews for a luxurious snacking experience.',
            rating: 4.8,
            ingredients: ['Flour', 'Butter', 'Sugar', 'Premium Cashews', 'Vanilla Extract', 'Baking Powder'],
            nutritionalInfo: 'Contains healthy fats and copper from cashews.'
        }
    };

    // Add click handlers to product cards
    document.addEventListener('click', function(e) {
        const card = e.target.closest('.product-card');
        if (card && !e.target.closest('.like-btn') && !e.target.closest('.external-link-btn') && !e.target.closest('.btn-primary')) {
            const productId = card.querySelector('.like-btn').getAttribute('data-product');
            const product = productDetails[productId];

            if (product) {
                showProductModal(product);
            }
        }
    });

    function showProductModal(product) {
        const modalHtml = `
            <div class="modal fade product-modal" id="productModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${product.title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <img src="${product.image}" alt="${product.title}" class="product-image">
                                </div>
                                <div class="col-md-6">
                                    <div class="star-rating mb-3">
                                        ${generateStars(product.rating)}
                                        <span class="ms-2">${product.rating}/5.0</span>
                                    </div>
                                    <p class="description mb-4">${product.description}</p>
                                    <div class="ingredients mb-4">
                                        <h6><i class="bi bi-list-check me-2"></i>Key Ingredients:</h6>
                                        <ul>
                                            ${product.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                                        </ul>
                                    </div>
                                    <div class="nutritional-info">
                                        <h6><i class="bi bi-info-circle me-2"></i>Nutritional Info:</h6>
                                        <p class="text-muted">${product.nutritionalInfo}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Remove existing modal
        const existingModal = document.getElementById('productModal');
        if (existingModal) {
            existingModal.remove();
        }

        // Add new modal
        document.body.insertAdjacentHTML('beforeend', modalHtml);

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('productModal'));
        modal.show();

        // Add to cart functionality in modal
        document.querySelector('#productModal .btn-primary').addEventListener('click', function() {
            showToast(`${product.title} added to cart! 🛒`, 'success');
            modal.hide();
        });
    }

    function generateStars(rating) {
        let stars = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="bi bi-star-fill star filled"></i>';
        }

        if (hasHalfStar) {
            stars += '<i class="bi bi-star-half star filled"></i>';
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="bi bi-star star"></i>';
        }

        return stars;
    }
});