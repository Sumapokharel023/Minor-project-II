// Blog page JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Category filter functionality
    const categoryButtons = document.querySelectorAll('.grid-cols-2.md\\:grid-cols-4 button');
    const articles = document.querySelectorAll('article');

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.querySelector('h3').textContent.trim();
            
            // Remove active state from all buttons
            categoryButtons.forEach(btn => {
                btn.classList.remove('ring-2', 'ring-cyan-blue');
            });
            
            // Add active state to clicked button
            this.classList.add('ring-2', 'ring-cyan-blue');
            
            // Filter articles
            articles.forEach(article => {
                const articleCategory = article.querySelector('span').textContent.trim();
                
                if (category === 'Career Tips' && articleCategory === 'Career Tips') {
                    article.style.display = 'block';
                } else if (category === 'Market Trends' && articleCategory === 'Market Trends') {
                    article.style.display = 'block';
                } else if (category === 'Skills Development' && articleCategory === 'Skills Development') {
                    article.style.display = 'block';
                } else if (category === 'Company News' && articleCategory === 'Company News') {
                    article.style.display = 'block';
                } else {
                    article.style.display = 'none';
                }
            });
            
            // Show all articles if no specific filter
            if (category === 'All') {
                articles.forEach(article => {
                    article.style.display = 'block';
                });
            }
        });
    });

    // Newsletter subscription
    const newsletterForm = document.querySelector('.max-w-md');
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const subscribeBtn = newsletterForm.querySelector('button');

    subscribeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const email = emailInput.value.trim();
        
        if (!email) {
            alert('Please enter your email address.');
            emailInput.focus();
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            emailInput.focus();
            return;
        }
        
        // Simulate subscription
        const originalText = this.textContent;
        this.textContent = 'Subscribing...';
        this.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
            this.textContent = originalText;
            this.disabled = false;
        }, 1500);
    });

    // Article hover effects
    articles.forEach(article => {
        article.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        article.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Read more functionality
    const readMoreLinks = document.querySelectorAll('article a');
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const articleTitle = this.closest('article').querySelector('h3').textContent;
            alert(`Opening article: "${articleTitle}"`);
            // In a real application, this would navigate to the full article
        });
    });

    // Featured article read more
    const featuredReadMore = document.querySelector('.md\\:w-1\\/2 a');
    if (featuredReadMore) {
        featuredReadMore.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Opening featured article: "The Future of Remote Work in Nepal"');
        });
    }

    // Search functionality (if search bar is added)
    function addSearchFunctionality() {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'mb-8';
        searchContainer.innerHTML = `
            <div class="max-w-md mx-auto">
                <div class="relative">
                    <input
                        type="text"
                        id="blog-search"
                        placeholder="Search articles..."
                        class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-blue"
                    />
                    <svg class="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
            </div>
        `;
        
        // Insert search bar after hero section
        const heroSection = document.querySelector('.text-center.py-12');
        heroSection.parentNode.insertBefore(searchContainer, heroSection.nextSibling);
        
        // Add search functionality
        const searchInput = document.getElementById('blog-search');
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            articles.forEach(article => {
                const title = article.querySelector('h3').textContent.toLowerCase();
                const content = article.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || content.includes(searchTerm)) {
                    article.style.display = 'block';
                } else {
                    article.style.display = 'none';
                }
            });
            
            // Show all articles if search is empty
            if (!searchTerm) {
                articles.forEach(article => {
                    article.style.display = 'block';
                });
            }
        });
    }

    // Add search functionality
    addSearchFunctionality();

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

