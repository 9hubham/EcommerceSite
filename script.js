// Header Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    // Image slider
    const imgs = document.querySelectorAll('.header-slider ul img');
    const prev_btn = document.querySelector('.control-prev');
    const next_btn = document.querySelector('.control-next');
    
    let n = 0;
    let intervalId = null;
    
    function changeSlide() {
        for (let i = 0; i < imgs.length; i++) {
            imgs[i].style.display = 'none';
        }
        imgs[n].style.display = 'block';
    }
    
    function autoSlide() {
        if (n < imgs.length - 1) {
            n++;
        } else {
            n = 0;
        }
        changeSlide();
    }
    
    // Initialize slider
    changeSlide();
    
    // Auto slide every 5 seconds
    intervalId = setInterval(autoSlide, 5000);
    
    // Event listeners for manual control
    prev_btn.addEventListener('click', (e) => {
        e.preventDefault();
        clearInterval(intervalId);
        
        if (n > 0) {
            n--;
        } else {
            n = imgs.length - 1;
        }
        changeSlide();
        
        // Restart auto slide after manual control
        intervalId = setInterval(autoSlide, 5000);
    });
    
    next_btn.addEventListener('click', (e) => {
        e.preventDefault();
        clearInterval(intervalId);
        
        if (n < imgs.length - 1) {
            n++;
        } else {
            n = 0;
        }
        changeSlide();
        
        // Restart auto slide after manual control
        intervalId = setInterval(autoSlide, 5000);
    });
    
    // Add keyboard navigation for accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prev_btn.click();
        } else if (e.key === 'ArrowRight') {
            next_btn.click();
        }
    });
    
    // Product sliders horizontal scroll on wheel
    const scrollContainers = document.querySelectorAll(".products");
    
    for (const container of scrollContainers) {
        container.addEventListener("wheel", (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                container.scrollLeft += e.deltaY;
            }
        });
        
        // Add left/right button navigation for product sliders
        const sliderSection = container.closest('.products-slider, .products-slider-with-price');
        
        if (sliderSection) {
            const prevButton = document.createElement('button');
            prevButton.className = 'product-slider-prev';
            prevButton.innerHTML = '&#129144;';
            prevButton.setAttribute('aria-label', 'Previous products');
            
            const nextButton = document.createElement('button');
            nextButton.className = 'product-slider-next';
            nextButton.innerHTML = '&#129146;';
            nextButton.setAttribute('aria-label', 'Next products');
            
            const controlsContainer = document.createElement('div');
            controlsContainer.className = 'product-slider-controls';
            controlsContainer.appendChild(prevButton);
            controlsContainer.appendChild(nextButton);
            
            sliderSection.querySelector('h2').after(controlsContainer);
            
            prevButton.addEventListener('click', () => {
                container.scrollBy({ left: -300, behavior: 'smooth' });
            });
            
            nextButton.addEventListener('click', () => {
                container.scrollBy({ left: 300, behavior: 'smooth' });
            });
        }
    }
    
    // Back to top functionality
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    let cartCount = 0;
    const cartCountElement = document.querySelector('.cart-count');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            cartCount++;
            if (cartCountElement) {
                cartCountElement.textContent = cartCount;
                cartCountElement.style.display = 'flex';
            }
            
            // Add animation effect
            button.textContent = 'Added!';
            button.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                button.textContent = 'Add to Cart';
                button.style.backgroundColor = '';
            }, 1000);
        });
    });
    
    // Category dropdown functionality
    const categoryDropdown = document.querySelector('.nav-search-gategory');
    if (categoryDropdown) {
        categoryDropdown.addEventListener('click', () => {
            // This would normally show a dropdown menu
            alert('Categories dropdown clicked! This would show available categories.');
        });
    }
    
    // Improve image loading with lazy loading
    const images = document.querySelectorAll('img');
    if ('loading' in HTMLImageElement.prototype) {
        images.forEach(img => {
            if (!img.hasAttribute('loading') && !img.classList.contains('header-img')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    }
    
    // Add responsive menu toggle for mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navBottom = document.querySelector('.nav-bottom');
    
    if (menuToggle && navBottom) {
        menuToggle.addEventListener('click', () => {
            navBottom.classList.toggle('active');
        });
    }
});

// Add product rating functionality
function createStarRating(container, rating) {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'product-rating';
    
    const starsElement = document.createElement('span');
    starsElement.className = 'stars';
    
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starsHTML += '★'; // Full star
        } else if (i - 0.5 <= rating) {
            starsHTML += '⯨'; // Half star
        } else {
            starsHTML += '☆'; // Empty star
        }
    }
    
    starsElement.innerHTML = starsHTML;
    
    const countElement = document.createElement('span');
    countElement.className = 'count';
    countElement.textContent = `(${Math.floor(Math.random() * 1000) + 50})`;
    
    starsContainer.appendChild(starsElement);
    starsContainer.appendChild(countElement);
    
    container.appendChild(starsContainer);
}

// Apply ratings to products
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const randomRating = (Math.random() * 2 + 3).toFixed(1); // Random rating between 3.0 and 5.0
        createStarRating(card, randomRating);
    });
});

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.nav-search-input');
    const searchButton = document.querySelector('.nav-search-icon');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    function performSearch() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            alert(`You searched for: "${searchTerm}"\nIn a real Amazon clone, this would redirect to search results.`);
        }
    }
});