// Demon Orbit Landing Page JavaScript
// Enhanced with improved visual appeal and readability

document.addEventListener('DOMContentLoaded', function() {
    loadContent();
    initializeStarryBackground();
    initializeNavigation();
    initializeFormHandling();
    initializeAnimations();
    initializeImageHandling();
    initializeAccessibility();
});

// Load Content from content.js
function loadContent() {
    if (typeof CONTENT === 'undefined') {
        console.warn('content.js not loaded, using fallback content');
        return;
    }
    
    // Update dynamic content elements
    const gameTitle = document.querySelector('.game-title');
    if (gameTitle) gameTitle.textContent = CONTENT.gameTitle;
    
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) subtitle.textContent = CONTENT.subtitle;
    
    const heroPitch = document.querySelector('.hero-pitch');
    if (heroPitch) heroPitch.textContent = CONTENT.heroPitch;
    
    const signupTitle = document.querySelector('.signup-title');
    if (signupTitle) signupTitle.textContent = CONTENT.emailSectionTitle;
    
    const incentiveText = document.querySelector('.incentive-text');
    if (incentiveText) incentiveText.textContent = CONTENT.emailIncentive;
    
    const submitButton = document.querySelector('.hero-cta-button');
    if (submitButton) submitButton.textContent = CONTENT.emailSubmitButton;
    
    // Update placeholders
    const nameInput = document.querySelector('input[name="NAME"]');
    if (nameInput) nameInput.placeholder = CONTENT.nameFieldPlaceholder;
    
    const emailInput = document.querySelector('input[name="EMAIL"]');
    if (emailInput) emailInput.placeholder = CONTENT.emailFieldPlaceholder;
    
    // Update links
    const discordLinks = document.querySelectorAll('a[href*="discord"]');
    discordLinks.forEach(link => link.href = CONTENT.discordInvite);
}

// Generate Random Starry Background
function initializeStarryBackground() {
    const spaceBackground = document.querySelector('.space-background');
    if (!spaceBackground) return;
    
    // Generate 250 random stars
    for (let i = 0; i < 250; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Random size (1-3px)
        const size = Math.random() * 2 + 1;
        
        // Random opacity for subtle cosmic feel
        const opacity = Math.random() * 0.3 + 0.5; // 0.5-0.8
        
        // Random animation delay for twinkling effect
        const delay = Math.random() * 3;
        
        star.style.cssText = `
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            opacity: ${opacity};
            animation-delay: ${delay}s;
        `;
        
        spaceBackground.appendChild(star);
    }
}

// Navigation and Smooth Scrolling
function initializeNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll event for header enhancement
    window.addEventListener('scroll', handleHeaderScroll);
}

function handleHeaderScroll() {
    const header = document.querySelector('.header');
    const scrollTop = window.pageYOffset;
    
    if (scrollTop > 100) {
        header.style.boxShadow = '0 4px 20px rgba(220, 20, 60, 0.4)';
    } else {
        header.style.boxShadow = 'none';
    }
}

// Enhanced Form Handling with Better UX
function initializeFormHandling() {
    const form = document.getElementById('mailchimp-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmission);
        
        // Add real-time validation with better feedback
        const emailInput = form.querySelector('input[name="EMAIL"]');
        const nameInput = form.querySelector('input[name="NAME"]');
        
        if (emailInput) {
            emailInput.addEventListener('blur', validateEmail);
            emailInput.addEventListener('input', clearValidationError);
            emailInput.addEventListener('focus', highlightInput);
        }
        
        if (nameInput) {
            nameInput.addEventListener('focus', highlightInput);
            nameInput.addEventListener('blur', unhighlightInput);
        }
    }
}

function highlightInput(e) {
    e.target.style.borderColor = 'var(--crimson)';
    e.target.style.boxShadow = '0 0 15px rgba(220, 20, 60, 0.3)';
}

function unhighlightInput(e) {
    if (!e.target.classList.contains('error')) {
        e.target.style.borderColor = 'var(--white)';
        e.target.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.2)';
    }
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const email = formData.get('EMAIL');
    const name = formData.get('NAME');
    
    // Validate email
    if (!isValidEmail(email)) {
        showMessage('Please enter a valid email address to join the Warden\'s List!', 'error');
        return;
    }
    
    // Show loading state with better UX
    const submitButton = this.querySelector('.cta-button');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Joining the Fight...';
    submitButton.disabled = true;
    submitButton.style.opacity = '0.7';
    
    // Add loading animation
    submitButton.style.animation = 'pulse 1s infinite';
    
    // Simulate API call (replace with actual Mailchimp integration)
    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
        submitButton.style.animation = '';
        
        // Show success message
        showMessage('Welcome to the Warden\'s List! Your 500 Souls await on launch day. Prepare for battle!', 'success');
        
        // Reset form
        this.reset();
        
        // Track conversion event
        trackSignup(email, name);
        
    }, 2000);
}

function validateEmail(e) {
    const email = e.target.value;
    const isValid = isValidEmail(email);
    
    if (email && !isValid) {
        e.target.style.borderColor = 'var(--crimson)';
        e.target.style.boxShadow = '0 0 15px rgba(220, 20, 60, 0.5)';
        e.target.classList.add('error');
        showFieldError(e.target, 'Please enter a valid email format');
    } else {
        e.target.style.borderColor = 'var(--white)';
        e.target.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.3)';
        e.target.classList.remove('error');
        clearFieldError(e.target);
    }
}

function clearValidationError(e) {
    if (e.target.classList.contains('error')) {
        e.target.style.borderColor = 'var(--white)';
        e.target.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.2)';
        e.target.classList.remove('error');
        clearFieldError(e.target);
    }
}

function showFieldError(field, message) {
    clearFieldError(field);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: var(--crimson);
        font-size: 14px;
        margin-top: 8px;
        font-family: 'VT323', monospace;
        animation: fadeIn 0.3s ease-out;
    `;
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => existingError.remove(), 300);
    }
}


function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.notification-message');
    existingMessages.forEach(msg => {
        msg.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => msg.remove(), 300);
    });
    
    // Create enhanced message element
    const messageDiv = document.createElement('div');
    messageDiv.className = 'notification-message';
    messageDiv.innerHTML = `
        <div class="message-icon">${type === 'success' ? '✓' : '!'}</div>
        <div class="message-text">${message}</div>
    `;
    messageDiv.style.cssText = `
        position: fixed;
        top: 30px;
        right: 30px;
        left: 30px;
        max-width: 500px;
        margin: 0 auto;
        padding: 25px;
        background: ${type === 'success' ? 'var(--deep-navy)' : 'var(--darker-navy)'};
        border: ${type === 'success' ? '2px dotted #00FF88' : '2px dotted var(--crimson)'};
        color: ${type === 'success' ? '#00FF88' : 'var(--crimson)'};
        font-family: 'VT323', monospace;
        font-size: 18px;
        z-index: 1001;
        text-align: center;
        animation: slideInEnhanced 0.5s ease-out;
        box-shadow: ${type === 'success' ? '0 0 20px rgba(0, 255, 136, 0.3)' : '0 0 20px rgba(220, 20, 60, 0.3)'};
        display: flex;
        align-items: center;
        gap: 15px;
    `;
    
    // Add enhanced animations if not exists
    if (!document.getElementById('enhanced-animations')) {
        const style = document.createElement('style');
        style.id = 'enhanced-animations';
        style.textContent = `
            @keyframes slideInEnhanced {
                0% { 
                    transform: translateY(-100px) rotate(-5deg); 
                    opacity: 0; 
                    scale: 0.8;
                }
                50% {
                    transform: translateY(10px) rotate(2deg);
                    scale: 1.05;
                }
                100% { 
                    transform: translateY(0) rotate(0deg); 
                    opacity: 1; 
                    scale: 1;
                }
            }
            @keyframes slideOut {
                0% { 
                    opacity: 1; 
                    transform: translateY(0);
                }
                100% { 
                    opacity: 0; 
                    transform: translateY(-50px);
                }
            }
            @keyframes pulse {
                0%, 100% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.8; transform: scale(0.98); }
            }
            @keyframes celebration {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(-${window.innerHeight + 100}px) rotate(720deg);
                    opacity: 0;
                }
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes fadeOut {
                from { opacity: 1; transform: translateY(0); }
                to { opacity: 0; transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(messageDiv);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.5s ease-out';
        setTimeout(() => messageDiv.remove(), 500);
    }, 5000);
}

// Analytics and Tracking
function trackSignup(email, name) {
    // Enhanced analytics tracking
    const signupData = {
        email,
        name,
        timestamp: new Date().toISOString(),
        source: 'landing_page',
        campaign: 'beta_signup'
    };
    
    console.log('Enhanced signup tracked:', signupData);
    
    // Google Analytics 4 event
    if (typeof gtag !== 'undefined') {
        gtag('event', 'sign_up', {
            method: 'email',
            content_group1: 'beta_signup',
            custom_parameter_1: 'warden_list'
        });
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
            content_name: 'Demon Orbit Beta Signup',
            value: 1,
            currency: 'USD'
        });
    }
    
    // Custom analytics (add your preferred service)
    // analytics.track('Beta Signup', signupData);
}

// Enhanced Animations and Interactions
function initializeAnimations() {
    // Add enhanced hover effects to buttons
    const buttons = document.querySelectorAll('.cta-button, .discord-nav-btn, .social-link');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', addEnhancedHover);
        button.addEventListener('mouseleave', removeEnhancedHover);
        button.addEventListener('click', addEnhancedClick);
    });
    
    // Enhanced video placeholder interaction
    const videoPlaceholder = document.querySelector('.gameplay-video');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', handleVideoClick);
        videoPlaceholder.addEventListener('mouseenter', addVideoHover);
        videoPlaceholder.addEventListener('mouseleave', removeVideoHover);
        videoPlaceholder.style.cursor = 'pointer';
        videoPlaceholder.setAttribute('tabindex', '0');
        videoPlaceholder.setAttribute('aria-label', 'Click to watch gameplay trailer');
    }
    
    // Add parallax effect to planets with better performance
    window.addEventListener('scroll', throttle(handlePlanetParallax, 16));
    
    // Add scroll-triggered animations
    initializeScrollAnimations();
}

function addEnhancedHover(e) {
    e.target.style.animation = 'pulse 0.8s infinite';
    e.target.style.filter = 'brightness(1.1)';
}

function removeEnhancedHover(e) {
    e.target.style.animation = '';
    e.target.style.filter = 'brightness(1)';
}

function addEnhancedClick(e) {
    // Create enhanced click effect
    const rect = e.target.getBoundingClientRect();
    const clickEffect = document.createElement('div');
    clickEffect.style.cssText = `
        position: fixed;
        left: ${rect.left + rect.width / 2}px;
        top: ${rect.top + rect.height / 2}px;
        width: 8px;
        height: 8px;
        background: var(--crimson);
        border: 1px solid var(--white);
        pointer-events: none;
        z-index: 1002;
        animation: enhancedExplode 0.8s ease-out forwards;
        border-radius: 50%;
    `;
    
    // Add enhanced explosion animation
    if (!document.getElementById('enhanced-click-effects')) {
        const style = document.createElement('style');
        style.id = 'enhanced-click-effects';
        style.textContent = `
            @keyframes enhancedExplode {
                0% {
                    transform: scale(1) rotate(0deg);
                    opacity: 1;
                }
                50% {
                    transform: scale(15) rotate(180deg);
                    opacity: 0.8;
                }
                100% {
                    transform: scale(25) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(clickEffect);
    setTimeout(() => clickEffect.remove(), 800);
}

function addVideoHover(e) {
    const playIcon = e.target.querySelector('.play-icon');
    if (playIcon) {
        playIcon.style.transform = 'scale(1.2)';
        playIcon.style.textShadow = '0 0 20px var(--white)';
    }
}

function removeVideoHover(e) {
    const playIcon = e.target.querySelector('.play-icon');
    if (playIcon) {
        playIcon.style.transform = 'scale(1)';
        playIcon.style.textShadow = '0 0 10px var(--white)';
    }
}

function handleVideoClick() {
    // Enhanced video functionality
    showMessage('Gameplay trailer coming soon! Sign up to be notified when it\'s ready. 🎮', 'success');
    
    // Add video click animation
    const video = document.querySelector('.gameplay-video');
    video.style.animation = 'pulse 0.5s ease-out';
    setTimeout(() => {
        video.style.animation = '';
    }, 500);
}

function handlePlanetParallax() {
    const scrolled = window.pageYOffset;
    const planets = document.querySelectorAll('.planet');
    
    planets.forEach((planet, index) => {
        const speed = 0.05 + (index * 0.02);
        const yPos = scrolled * speed;
        planet.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
    });
}

// Scroll-triggered animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    // Observe sections for scroll animations
    document.querySelectorAll('.features, .email-signup, .discord-section, .devlog-entry').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
    
    // Add fadeInUp animation
    if (!document.getElementById('scroll-animations')) {
        const style = document.createElement('style');
        style.id = 'scroll-animations';
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Image Handling
function initializeImageHandling() {
    // Add loading states for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', handleImageLoad);
        img.addEventListener('error', handleImageError);
        
        // Force placeholder display for demo purposes (since images don't exist)
        // In production, remove this setTimeout and let images load normally
        setTimeout(() => {
            if (!img.complete || img.naturalWidth === 0) {
                handleImageError({target: img});
            }
        }, 100);
        
        // Add loading placeholder
        if (!img.complete) {
            img.style.backgroundColor = 'var(--darker-navy)';
            img.style.background = 'var(--darker-navy) url("data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><text x=\'50%\' y=\'50%\' dominant-baseline=\'middle\' text-anchor=\'middle\' fill=\'%23DC143C\' font-family=\'VT323\'>Loading...</text></svg>") center/contain no-repeat';
        }
    });
}

function handleImageLoad(e) {
    e.target.style.background = '';
    e.target.style.animation = 'fadeIn 0.5s ease-out';
}

function handleImageError(e) {
    // Create fallback placeholder with pixel art style
    e.target.style.background = 'var(--darker-navy)';
    e.target.style.border = '2px dotted var(--crimson)';
    e.target.style.display = 'flex';
    e.target.style.alignItems = 'center';
    e.target.style.justifyContent = 'center';
    e.target.style.color = 'var(--crimson)';
    e.target.style.fontFamily = "'VT323', monospace";
    e.target.style.fontSize = '16px';
    e.target.style.textAlign = 'center';
    e.target.style.minHeight = '150px';
    e.target.style.width = '100%';
    
    // Add placeholder text based on image type
    let placeholderText = '📸 Image Preview';
    if (e.target.alt.includes('gameplay')) {
        placeholderText = '🎮 Gameplay Screenshot';
    } else if (e.target.alt.includes('combat')) {
        placeholderText = '⚔️ Combat Demo';
    } else if (e.target.alt.includes('relic')) {
        placeholderText = '✨ Relic System';
    } else if (e.target.alt.includes('surge')) {
        placeholderText = '💥 Demon Surge';
    }
    
    e.target.alt = placeholderText;
    e.target.innerHTML = `<div style="padding: 20px;">${placeholderText}<br><small style="opacity: 0.7;">Coming Soon</small></div>`;
}

// Essential Accessibility
function initializeAccessibility() {
    // Basic keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            const focused = document.activeElement;
            if (focused.classList.contains('gameplay-video')) {
                e.preventDefault();
                handleVideoClick();
            }
        }
    });
    
    // Simple focus styles
    const style = document.createElement('style');
    style.textContent = `
        .hero-cta-button:focus,
        .form-input:focus {
            outline: 3px dotted var(--crimson);
            outline-offset: 3px;
        }
    `;
    document.head.appendChild(style);
}


// Simple utility for throttling scroll events
function throttle(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}