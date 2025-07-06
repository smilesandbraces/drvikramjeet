// ✅ ENHANCED JAVASCRIPT WITH MOBILE RESPONSIVENESS

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Close mobile menu if open
            const nav = document.getElementById('nav');
            const mobileMenuToggle = document.getElementById('mobileMenuToggle');
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
            
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ✅ ENHANCED MOBILE MENU TOGGLE
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const nav = document.getElementById('nav');

if (mobileMenuToggle && nav) {
    mobileMenuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        nav.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (nav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !mobileMenuToggle.contains(e.target)) {
            nav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu on window resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            nav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ✅ RESPONSIVE HEADER SCROLL EFFECT
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// ✅ RESPONSIVE INTERSECTION OBSERVER
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// ✅ RESPONSIVE ELEMENT ANIMATION
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .service-card, .testimonial-card, .contact-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ✅ RESPONSIVE FLOATING SHAPES ANIMATION
document.addEventListener('DOMContentLoaded', () => {
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        shape.style.animationDelay = `${index * 0.5}s`;
    });
});

// ✅ RESPONSIVE BUTTON HOVER EFFECTS
document.querySelectorAll('.btn').forEach(btn => {
    // Only add hover effects on non-touch devices
    if (!('ontouchstart' in window)) {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }
});

// ✅ RESPONSIVE RIPPLE EFFECT
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
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
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ✅ RESPONSIVE LOADING ANIMATION
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ✅ RESPONSIVE PARALLAX EFFECT (DISABLED ON MOBILE FOR PERFORMANCE)
if (!('ontouchstart' in window) && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-shapes');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ✅ RESPONSIVE COUNTER ANIMATION
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (target >= 1000 ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (target >= 1000 ? '+' : '');
        }
    }, 16);
}

// ✅ RESPONSIVE STATS ANIMATION
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                if (number > 0) {
                    animateCounter(stat, number);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
});

// ✅ RESPONSIVE SECTION REVEAL ANIMATION
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        revealObserver.observe(section);
    });
});

// Add revealed class styles
const revealStyle = document.createElement('style');
revealStyle.textContent = `
    .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(revealStyle);

// ✅ RESPONSIVE TOUCH SUPPORT FOR CARDS
if ('ontouchstart' in window) {
    document.querySelectorAll('.feature-card, .service-card, .testimonial-card, .contact-card').forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = 'translateY(0) scale(1)';
            }, 150);
        });
    });
}

// ✅ RESPONSIVE VIDEO IFRAME OPTIMIZATION
document.addEventListener('DOMContentLoaded', () => {
    const videoIframes = document.querySelectorAll('.video-item iframe');
    
    // Add loading="lazy" for better performance on mobile
    videoIframes.forEach(iframe => {
        iframe.setAttribute('loading', 'lazy');
        
        // Optimize for mobile
        if (window.innerWidth <= 768) {
            iframe.style.height = '200px';
        }
    });
    
    // Adjust video heights on resize
    window.addEventListener('resize', () => {
        videoIframes.forEach(iframe => {
            if (window.innerWidth <= 600) {
                iframe.style.height = '200px';
            } else if (window.innerWidth <= 1024) {
                iframe.style.height = '240px';
            } else {
                iframe.style.height = '250px';
            }
        });
    });
});

// ✅ RESPONSIVE FORM VALIDATION (IF FORMS ARE ADDED LATER)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// ✅ RESPONSIVE ACCESSIBILITY IMPROVEMENTS
document.addEventListener('DOMContentLoaded', () => {
    // Add focus indicators for keyboard navigation
    const focusableElements = document.querySelectorAll('a, button, .btn, input, textarea, select');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #20B2AA';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
    
    // Add aria-labels to social links
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        const icon = link.querySelector('i');
        if (icon) {
            const iconClass = icon.className;
            if (iconClass.includes('whatsapp')) {
                link.setAttribute('aria-label', 'WhatsApp');
            } else if (iconClass.includes('phone')) {
                link.setAttribute('aria-label', 'Phone');
            } else if (iconClass.includes('envelope')) {
                link.setAttribute('aria-label', 'Email');
            } else if (iconClass.includes('instagram')) {
                link.setAttribute('aria-label', 'Instagram');
            } else if (iconClass.includes('facebook')) {
                link.setAttribute('aria-label', 'Facebook');
            }
        }
    });
});

// ✅ RESPONSIVE PERFORMANCE OPTIMIZATION
// Debounce scroll events for better performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// ✅ RESPONSIVE ERROR HANDLING
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Graceful degradation - ensure basic functionality still works
});

// ✅ RESPONSIVE ORIENTATION CHANGE HANDLING
window.addEventListener('orientationchange', () => {
    // Force layout recalculation after orientation change
    setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
    }, 100);
});

console.log('✅ Responsive JavaScript loaded successfully!');

