document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li');

    if (burger) {
        burger.addEventListener('click', function() {
            // Toggle navigation
            navLinks.classList.toggle('nav-active');
            
            // Burger animation
            burger.classList.toggle('toggle');
            
            // Animate links
            navLinksItems.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });
    }

    // Verification tab functionality - improved for accessibility and error handling
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Initialize tabs - ensure first tab is active if none are
    const initTabs = () => {
        if (!document.querySelector('.tab-btn.active') && tabBtns.length > 0) {
            tabBtns[0].classList.add('active');
            const firstTabId = tabBtns[0].getAttribute('data-tab');
            const firstTabContent = document.querySelector(`.tab-content[data-tab="${firstTabId}"]`);
            if (firstTabContent) firstTabContent.classList.add('active');
        }
    };
    
    initTabs();
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            try {
                // Remove active class from all buttons
                tabBtns.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                this.setAttribute('aria-selected', 'true');
                
                // Show the corresponding tab content
                tabContents.forEach(content => content.classList.remove('active'));
                
                const tabId = this.getAttribute('data-tab');
                const targetContent = document.querySelector(`.tab-content[data-tab="${tabId}"]`);
                
                if (targetContent) {
                    targetContent.classList.add('active');
                    // Announce tab change for screen readers
                    const tabChangeEvent = new CustomEvent('tabChanged', {
                        detail: { tabId: tabId, tabName: this.textContent.trim() }
                    });
                    document.dispatchEvent(tabChangeEvent);
                } else {
                    console.warn(`Tab content with data-tab="${tabId}" not found`);
                }
            } catch (error) {
                console.error('Error in tab switching:', error);
            }
        });
        
        // Enhance accessibility
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-selected', btn.classList.contains('active') ? 'true' : 'false');
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput.value.trim() === '') {
                alert('Please enter your email address');
                return;
            }
            
            // Here you would normally send the data to your backend
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        });
    }

    // Verification button click
    const verifyBtn = document.querySelector('.verify-btn');
    
    if (verifyBtn) {
        verifyBtn.addEventListener('click', function() {
            const codeInput = document.querySelector('.verification-input');
            
            if (codeInput.value.trim() === '') {
                alert('Please enter a verification code');
                return;
            }
            
            // Here you would verify the code against your database
            alert('Verification in progress...');
            // Simulate verification result
            setTimeout(() => {
                alert('Verification successful! Your product is authentic.');
                codeInput.value = '';
            }, 1500);
        });
    }

    // Sneaker card hover effects (CSS already handles most of this)
    const sneakerCards = document.querySelectorAll('.sneaker-card');
    const quickViewBtns = document.querySelectorAll('.quick-view');
    const moreInfoBtns = document.querySelectorAll('.more-info');
    const authenticateBtns = document.querySelectorAll('.authenticate');
    
    // Add click events to Quick View buttons
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const sneakerModel = this.closest('.sneaker-card').querySelector('.model').textContent;
            alert(`Quick view for ${sneakerModel}`);
        });
    });
    
    // Add click events to More Info buttons
    moreInfoBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const sneakerCard = this.closest('.sneaker-card');
            const brand = sneakerCard.querySelector('.brand').textContent;
            const model = sneakerCard.querySelector('.model').textContent;
            const price = sneakerCard.querySelector('.price').textContent;
            
            alert(`${brand} ${model}\nPrice: ${price}\n\nMore details: This premium sneaker features advanced cushioning, durable materials, and authentic design elements. Perfect for both casual wear and athletic performance.`);
        });
    });
    
    // Add click events to Authenticate buttons
    authenticateBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const sneakerModel = this.closest('.sneaker-card').querySelector('.model').textContent;
            alert(`Starting authentication process for ${sneakerModel}`);
        });
    });

    // Make the entire card clickable for more info
    sneakerCards.forEach(card => {
        card.addEventListener('click', function() {
            const moreInfoBtn = this.querySelector('.more-info');
            if (moreInfoBtn) {
                // Simulate a click on the more info button
                moreInfoBtn.click();
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active state in nav
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        });
    });
});
