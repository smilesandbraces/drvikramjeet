// ✅ PREMIUM JAVASCRIPT - UNIVERSAL DEVICE COMPATIBILITY

'use strict';

// ===== PERFORMANCE OPTIMIZATION UTILITIES =====
const debounce = (func, wait, immediate) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
};

const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// ===== DEVICE DETECTION =====
const DeviceDetector = {
    isMobile: () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isTablet: () => /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent),
    isDesktop: () => !DeviceDetector.isMobile() && !DeviceDetector.isTablet(),
    isTouchDevice: () => 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    isRetina: () => window.devicePixelRatio > 1,
    getViewportWidth: () => Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
    getViewportHeight: () => Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0),
    isLandscape: () => window.innerWidth > window.innerHeight,
    isPortrait: () => window.innerHeight > window.innerWidth
};

// ===== PREMIUM MOBILE MENU SYSTEM =====
class PremiumMobileMenu {
    constructor() {
        this.toggle = document.getElementById('mobileMenuToggle');
        this.nav = document.getElementById('nav');
        this.isOpen = false;
        this.init();
    }

    init() {
        if (!this.toggle || !this.nav) return;
        
        this.toggle.addEventListener('click', this.handleToggle.bind(this));
        this.nav.addEventListener('click', this.handleNavClick.bind(this));
        document.addEventListener('click', this.handleOutsideClick.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));
        window.addEventListener('orientationchange', this.handleOrientationChange.bind(this));
        
        // Keyboard accessibility
        this.toggle.addEventListener('keydown', this.handleKeydown.bind(this));
        
        // Touch events for better mobile experience
        if (DeviceDetector.isTouchDevice()) {
            this.nav.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
        }
    }

    handleToggle(e) {
        e.preventDefault();
        e.stopPropagation();
        this.isOpen ? this.close() : this.open();
    }

    handleNavClick(e) {
        if (e.target.classList.contains('nav-link')) {
            this.close();
        }
    }

    handleOutsideClick(e) {
        if (this.isOpen && 
            !this.nav.contains(e.target) && 
            !this.toggle.contains(e.target)) {
            this.close();
        }
    }

    handleResize() {
        if (DeviceDetector.getViewportWidth() >= 768 && this.isOpen) {
            this.close();
        }
    }

    handleOrientationChange() {
        setTimeout(() => {
            if (this.isOpen) {
                this.close();
            }
        }, 100);
    }

    handleKeydown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.handleToggle(e);
        }
        if (e.key === 'Escape' && this.isOpen) {
            this.close();
        }
    }

    handleTouchStart(e) {
        // Prevent scrolling when menu is open
        if (this.isOpen) {
            e.preventDefault();
        }
    }

    open() {
        this.isOpen = true;
        this.nav.classList.add('active');
        this.toggle.classList.add('active');
        this.toggle.setAttribute('aria-expanded', 'true');
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        
        // Focus management
        this.nav.setAttribute('tabindex', '-1');
        this.nav.focus();
        
        // Animation
        this.nav.style.animation = 'slideDown 0.3s ease-out';
    }

    close() {
        this.isOpen = false;
        this.nav.classList.remove('active');
        this.toggle.classList.remove('active');
        this.toggle.setAttribute('aria-expanded', 'false');
        
        // Restore body scroll
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        
        // Remove focus
        this.nav.removeAttribute('tabindex');
        
        // Animation
        this.nav.style.animation = 'slideUp 0.3s ease-out';
    }
}

// ===== PREMIUM SMOOTH SCROLLING =====
class PremiumSmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', this.handleClick.bind(this));
        });
    }

    handleClick(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (!target) return;
        
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = target.offsetTop - headerHeight - 20;
        
        // Use native smooth scrolling with fallback
        if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        } else {
            this.smoothScrollTo(targetPosition, 800);
        }
    }

    smoothScrollTo(target, duration) {
        const start = window.pageYOffset;
        const distance = target - start;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = this.easeInOutQuad(timeElapsed, start, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    }

    easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
}

// ===== PREMIUM HEADER EFFECTS =====
class PremiumHeader {
    constructor() {
        this.header = document.querySelector('.header');
        this.lastScrollY = window.pageYOffset;
        this.ticking = false;
        this.init();
    }

    init() {
        if (!this.header) return;
        
        window.addEventListener('scroll', this.handleScroll.bind(this));
        window.addEventListener('resize', debounce(this.handleResize.bind(this), 250));
    }

    handleScroll() {
        if (!this.ticking) {
            requestAnimationFrame(this.updateHeader.bind(this));
            this.ticking = true;
        }
    }

    handleResize() {
        this.updateHeader();
    }

    updateHeader() {
        const currentScrollY = window.pageYOffset;
        const scrollDirection = currentScrollY > this.lastScrollY ? 'down' : 'up';
        
        if (currentScrollY > 100) {
            this.header.classList.add('scrolled');
            this.header.style.background = 'rgba(255, 255, 255, 0.98)';
            this.header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            this.header.style.backdropFilter = 'blur(20px)';
        } else {
            this.header.classList.remove('scrolled');
            this.header.style.background = 'rgba(255, 255, 255, 0.95)';
            this.header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
        }
        
        // Hide header on scroll down, show on scroll up (mobile only)
        if (DeviceDetector.isMobile() && Math.abs(currentScrollY - this.lastScrollY) > 5) {
            if (scrollDirection === 'down' && currentScrollY > 200) {
                this.header.style.transform = 'translateY(-100%)';
            } else if (scrollDirection === 'up') {
                this.header.style.transform = 'translateY(0)';
            }
        }
        
        this.lastScrollY = currentScrollY;
        this.ticking = false;
    }
}

// ===== PREMIUM INTERSECTION OBSERVER =====
class PremiumIntersectionObserver {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        this.createAnimationObserver();
        this.createCounterObserver();
        this.createLazyLoadObserver();
    }

    createAnimationObserver() {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    animationObserver.unobserve(entry.target);
                }
            });
        }, this.observerOptions);

        document.querySelectorAll('.feature-card, .service-card, .testimonial-card, .contact-card').forEach(el => {
            el.classList.add('animate-ready');
            animationObserver.observe(el);
        });
    }

    createCounterObserver() {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounters(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, this.observerOptions);

        const statsSection = document.querySelector('.hero-stats');
        if (statsSection) {
            counterObserver.observe(statsSection);
        }
    }

    createLazyLoadObserver() {
        const lazyLoadObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                        lazyLoadObserver.unobserve(img);
                    }
                }
            });
        }, this.observerOptions);

        document.querySelectorAll('img[data-src]').forEach(img => {
            lazyLoadObserver.observe(img);
        });
    }

    animateCounters(container) {
        const counters = container.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/\D/g, ''));
            if (target > 0) {
                this.animateCounter(counter, target, 2000);
            }
        });
    }

    animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16);
        const suffix = target >= 1000 ? '+' : '';
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + suffix;
            }
        }, 16);
    }
}

// ===== PREMIUM BUTTON EFFECTS =====
class PremiumButtonEffects {
    constructor() {
        this.init();
    }

    init() {
        this.addRippleEffect();
        this.addHoverEffects();
        this.addFocusEffects();
    }

    addRippleEffect() {
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', this.createRipple.bind(this));
        });
    }

    addHoverEffects() {
        if (!DeviceDetector.isTouchDevice()) {
            document.querySelectorAll('.btn').forEach(btn => {
                btn.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
                btn.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
            });
        }
    }

    addFocusEffects() {
        document.querySelectorAll('.btn, .nav-link, .contact-btn').forEach(element => {
            element.addEventListener('focus', this.handleFocus.bind(this));
            element.addEventListener('blur', this.handleBlur.bind(this));
        });
    }

    createRipple(e) {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 1;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    handleMouseEnter(e) {
        e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
    }

    handleMouseLeave(e) {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
    }

    handleFocus(e) {
        e.currentTarget.style.outline = '2px solid #20B2AA';
        e.currentTarget.style.outlineOffset = '2px';
    }

    handleBlur(e) {
        e.currentTarget.style.outline = '';
        e.currentTarget.style.outlineOffset = '';
    }
}

// ===== PREMIUM PARALLAX EFFECTS =====
class PremiumParallax {
    constructor() {
        this.elements = [];
        this.ticking = false;
        this.init();
    }

    init() {
        if (DeviceDetector.isMobile() || window.innerWidth <= 768) return;
        
        this.elements = document.querySelectorAll('.floating-shapes, .hero-background');
        if (this.elements.length > 0) {
            window.addEventListener('scroll', this.handleScroll.bind(this));
        }
    }

    handleScroll() {
        if (!this.ticking) {
            requestAnimationFrame(this.updateParallax.bind(this));
            this.ticking = true;
        }
    }

    updateParallax() {
        const scrolled = window.pageYOffset;
        
        this.elements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        this.ticking = false;
    }
}

// ===== PREMIUM TOUCH GESTURES =====
class PremiumTouchGestures {
    constructor() {
        this.init();
    }

    init() {
        if (!DeviceDetector.isTouchDevice()) return;
        
        this.addTouchEffects();
        this.addSwipeGestures();
    }

    addTouchEffects() {
        document.querySelectorAll('.feature-card, .service-card, .testimonial-card, .contact-card').forEach(card => {
            card.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
            card.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
        });
    }

    addSwipeGestures() {
        let startX = 0;
        let startY = 0;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            if (Math.abs(diffX) > Math.abs(diffY)) {
                if (Math.abs(diffX) > 50) {
                    if (diffX > 0) {
                        // Swipe left
                        this.handleSwipeLeft();
                    } else {
                        // Swipe right
                        this.handleSwipeRight();
                    }
                }
            }
            
            startX = 0;
            startY = 0;
        }, { passive: true });
    }

    handleTouchStart(e) {
        e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
        e.currentTarget.style.transition = 'transform 0.1s ease';
    }

    handleTouchEnd(e) {
        setTimeout(() => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.transition = 'transform 0.3s ease';
        }, 100);
    }

    handleSwipeLeft() {
        // Close mobile menu if open
        const nav = document.getElementById('nav');
        const toggle = document.getElementById('mobileMenuToggle');
        if (nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
            toggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    handleSwipeRight() {
        // Could be used for navigation or other features
    }
}

// ===== PREMIUM PERFORMANCE MONITOR =====
class PremiumPerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        this.monitorPageLoad();
        this.monitorScrollPerformance();
        this.optimizeImages();
    }

    monitorPageLoad() {
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`Page loaded in ${Math.round(loadTime)}ms`);
            
            // Add loaded class for animations
            document.body.classList.add('loaded');
        });
    }

    monitorScrollPerformance() {
        let scrollCount = 0;
        const scrollHandler = throttle(() => {
            scrollCount++;
            if (scrollCount % 100 === 0) {
                console.log(`Scroll events: ${scrollCount}`);
            }
        }, 16);
        
        window.addEventListener('scroll', scrollHandler, { passive: true });
    }

    optimizeImages() {
        // Add loading="lazy" to images
        document.querySelectorAll('img').forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
        
        // Optimize video iframes
        document.querySelectorAll('.video-item iframe').forEach(iframe => {
            iframe.setAttribute('loading', 'lazy');
            
            // Adjust quality based on device
            if (DeviceDetector.isMobile()) {
                const src = iframe.src;
                if (src.includes('youtube.com')) {
                    iframe.src = src.replace('&quality=hd720', '&quality=medium');
                }
            }
        });
    }
}

// ===== PREMIUM ACCESSIBILITY ENHANCEMENTS =====
class PremiumAccessibility {
    constructor() {
        this.init();
    }

    init() {
        this.enhanceKeyboardNavigation();
        this.addAriaLabels();
        this.improveScreenReaderSupport();
        this.addSkipLinks();
    }

    enhanceKeyboardNavigation() {
        // Tab trap for mobile menu
        const nav = document.getElementById('nav');
        if (nav) {
            nav.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    const focusableElements = nav.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
                    const firstElement = focusableElements[0];
                    const lastElement = focusableElements[focusableElements.length - 1];
                    
                    if (e.shiftKey && document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    } else if (!e.shiftKey && document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            });
        }
    }

    addAriaLabels() {
        // Add aria-labels to social links
        const socialLinks = document.querySelectorAll('.social-links a');
        socialLinks.forEach(link => {
            const icon = link.querySelector('i');
            if (icon) {
                const iconClass = icon.className;
                if (iconClass.includes('whatsapp')) {
                    link.setAttribute('aria-label', 'Contact us on WhatsApp');
                } else if (iconClass.includes('phone')) {
                    link.setAttribute('aria-label', 'Call us');
                } else if (iconClass.includes('envelope')) {
                    link.setAttribute('aria-label', 'Send us an email');
                } else if (iconClass.includes('instagram')) {
                    link.setAttribute('aria-label', 'Follow us on Instagram');
                } else if (iconClass.includes('facebook')) {
                    link.setAttribute('aria-label', 'Like our Facebook page');
                }
            }
        });
        
        // Add aria-labels to buttons
        document.querySelectorAll('.btn').forEach(btn => {
            if (!btn.hasAttribute('aria-label') && !btn.textContent.trim()) {
                const icon = btn.querySelector('i');
                if (icon && icon.className.includes('whatsapp')) {
                    btn.setAttribute('aria-label', 'Book appointment via WhatsApp');
                } else if (icon && icon.className.includes('phone')) {
                    btn.setAttribute('aria-label', 'Call now');
                }
            }
        });
    }

    improveScreenReaderSupport() {
        // Add screen reader only text for important elements
        const srOnlyStyle = `
            .sr-only {
                position: absolute;
                width: 1px;
                height: 1px;
                padding: 0;
                margin: -1px;
                overflow: hidden;
                clip: rect(0, 0, 0, 0);
                white-space: nowrap;
                border: 0;
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = srOnlyStyle;
        document.head.appendChild(style);
        
        // Add screen reader text to stats
        document.querySelectorAll('.stat').forEach(stat => {
            const srText = document.createElement('span');
            srText.className = 'sr-only';
            srText.textContent = 'Statistic: ';
            stat.insertBefore(srText, stat.firstChild);
        });
    }

    addSkipLinks() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #20B2AA;
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add main content id
        const mainContent = document.querySelector('main') || document.querySelector('.hero');
        if (mainContent) {
            mainContent.id = 'main-content';
        }
    }
}

// ===== PREMIUM ERROR HANDLING =====
class PremiumErrorHandler {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('error', this.handleError.bind(this));
        window.addEventListener('unhandledrejection', this.handlePromiseRejection.bind(this));
    }

    handleError(e) {
        console.error('JavaScript Error:', {
            message: e.message,
            filename: e.filename,
            lineno: e.lineno,
            colno: e.colno,
            error: e.error
        });
        
        // Graceful degradation
        this.enableFallbacks();
    }

    handlePromiseRejection(e) {
        console.error('Unhandled Promise Rejection:', e.reason);
        e.preventDefault();
    }

    enableFallbacks() {
        // Ensure basic navigation works
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            if (!link.onclick) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const target = document.querySelector(link.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            }
        });
    }
}

// ===== PREMIUM INITIALIZATION =====
class PremiumWebsite {
    constructor() {
        this.components = [];
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', this.initializeComponents.bind(this));
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        try {
            // Initialize all premium components
            this.components.push(new PremiumErrorHandler());
            this.components.push(new PremiumMobileMenu());
            this.components.push(new PremiumSmoothScroll());
            this.components.push(new PremiumHeader());
            this.components.push(new PremiumIntersectionObserver());
            this.components.push(new PremiumButtonEffects());
            this.components.push(new PremiumParallax());
            this.components.push(new PremiumTouchGestures());
            this.components.push(new PremiumPerformanceMonitor());
            this.components.push(new PremiumAccessibility());
            
            // Add CSS animations
            this.addAnimationStyles();
            
            // Initialize orientation change handler
            this.handleOrientationChange();
            
            console.log('✅ Premium website initialized successfully!');
            console.log(`Device: ${DeviceDetector.isMobile() ? 'Mobile' : DeviceDetector.isTablet() ? 'Tablet' : 'Desktop'}`);
            console.log(`Touch: ${DeviceDetector.isTouchDevice() ? 'Yes' : 'No'}`);
            console.log(`Viewport: ${DeviceDetector.getViewportWidth()}x${DeviceDetector.getViewportHeight()}`);
            
        } catch (error) {
            console.error('Error initializing premium website:', error);
        }
    }

    addAnimationStyles() {
        const animationCSS = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes slideUp {
                from {
                    opacity: 1;
                    transform: translateY(0);
                }
                to {
                    opacity: 0;
                    transform: translateY(-20px);
                }
            }
            
            .animate-ready {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            .loaded {
                opacity: 1;
            }
            
            body {
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            body.loaded {
                opacity: 1;
            }
            
            /* Smooth transitions for all interactive elements */
            .btn, .nav-link, .feature-card, .service-card, 
            .testimonial-card, .contact-card {
                transition: all 0.3s ease;
            }
            
            /* Enhanced focus styles */
            .btn:focus-visible, .nav-link:focus-visible {
                outline: 2px solid #20B2AA;
                outline-offset: 2px;
                box-shadow: 0 0 0 4px rgba(32, 178, 170, 0.2);
            }
            
            /* Reduced motion support */
            @media (prefers-reduced-motion: reduce) {
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                    scroll-behavior: auto !important;
                }
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = animationCSS;
        document.head.appendChild(style);
    }

    handleOrientationChange() {
        window.addEventListener('orientationchange', () => {
            // Force layout recalculation after orientation change
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
                
                // Recalculate viewport dimensions
                const newWidth = DeviceDetector.getViewportWidth();
                const newHeight = DeviceDetector.getViewportHeight();
                console.log(`Orientation changed: ${newWidth}x${newHeight}`);
                
                // Close mobile menu if open
                const nav = document.getElementById('nav');
                const toggle = document.getElementById('mobileMenuToggle');
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    toggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }, 100);
        });
    }
}

// ===== INITIALIZE PREMIUM WEBSITE =====
const premiumWebsite = new PremiumWebsite();

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PremiumWebsite,
        DeviceDetector,
        debounce,
        throttle
    };
}

/* ===== CALLBACK MODAL LOGIC ===== */
(function(){
    const overlay   = document.getElementById('callbackOverlay');
    const openBtn   = document.getElementById('openCallback');
    const closeBtn  = overlay.querySelector('.callback-close');
    const captchaEl = document.getElementById('captchaCode');
    const refresh   = document.getElementById('refreshCaptcha');
    const form      = document.getElementById('callbackForm');

    // Generate random 4-digit captcha
    const genCaptcha = () => {
        captchaEl.textContent = Math.floor(1000 + Math.random()*9000);
    };

    // Open / close helpers
    const openModal = () => { overlay.style.display = 'flex'; document.body.style.overflow = 'hidden'; };
    const closeModal= () => { overlay.style.display = 'none';  document.body.style.overflow = ''; };
    
    openBtn.addEventListener('click',   openModal);
    closeBtn.addEventListener('click',  closeModal);
    overlay.addEventListener('click',   e => { if(e.target === overlay) closeModal(); });
    document.addEventListener('keyup',  e => { if(e.key==='Escape') closeModal(); });
    refresh.addEventListener('click',   () => { genCaptcha(); });

    // Basic client-side validation + (dummy) AJAX
    form.addEventListener('submit', e=>{
        e.preventDefault();
        const codeOK = document.getElementById('captchaInput').value === captchaEl.textContent;
        if(!codeOK){ alert('Captcha incorrect'); return; }

        /* ---- your back-end here ----
           fetch('https://example.com/api/callback', {
                method:'POST',
                headers:{ 'Content-Type':'application/json' },
                body: JSON.stringify(Object.fromEntries(new FormData(form)))
           }).then(()=>{ ... });
        */
        alert('Thanks! We will call you shortly.'); 
        form.reset(); genCaptcha(); closeModal();
    });

    // First load
    genCaptcha();
})();


