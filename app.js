// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen
    initLoadingScreen();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize hero animations
    initHeroAnimations();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize navbar scroll effects
    initNavbarScroll();
    
    // Initialize skill bars
    initSkillBars();
    
    // Initialize counters
    initCounters();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize tilt effects
    initTiltEffects();
    
    // Initialize scroll indicator
    initScrollIndicator();
    
    // Initialize parallax effects
    initParallaxEffects();
    
    // Update active navigation links
    window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
});

// Loading Screen Animation
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Hide loading screen after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
                document.body.style.overflow = 'visible';
                
                // Start hero animations after loading screen disappears
                setTimeout(() => {
                    startHeroAnimations();
                }, 500);
            }
        }, 1000);
    });
    
    // Ensure loading screen is hidden if load event doesn't fire
    setTimeout(() => {
        if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
            loadingScreen.classList.add('hidden');
            document.body.style.overflow = 'visible';
            startHeroAnimations();
        }
    }, 3000);
}

// Hero Animations
function initHeroAnimations() {
    // Prepare elements for animation
    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s ease-out';
    });
}

function startHeroAnimations() {
    console.log('Starting hero animations'); // Debug log
    
    // Start typing animation
    setTimeout(() => {
        startTypingAnimation();
    }, 500);
    
    // Trigger fade-in animations with staggered delays
    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 1000 + (index * 300));
    });
}

// Typing Animation
function startTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) {
        console.log('Typing element not found'); // Debug log
        return;
    }
    
    const text = 'Solutions IT Expertes';
    typingElement.textContent = '';
    typingElement.style.borderRight = '3px solid var(--color-teal-300)';
    typingElement.style.display = 'inline-block';
    typingElement.style.overflow = 'hidden';
    typingElement.style.whiteSpace = 'nowrap';
    
    let i = 0;
    const typeTimer = setInterval(() => {
        if (i < text.length) {
            typingElement.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeTimer);
            // Remove cursor after typing is complete
            setTimeout(() => {
                typingElement.style.borderRight = 'none';
            }, 1000);
        }
    }, 80);
}

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
        });
        
        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                closeMobileMenu();
                
                // Handle navigation
                const href = this.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        const navbarHeight = document.querySelector('.navbar').offsetHeight;
                        const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                closeMobileMenu();
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });
    }
}

function toggleMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'visible';
    }
}

function closeMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'visible';
    }
}

// Navbar Scroll Effects
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                closeMobileMenu();
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .contact-item, .skill-item, .company-vision, .company-values, .company-info, .projection-item, .value-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
                
                // Trigger specific animations based on element type
                if (entry.target.classList.contains('skill-item')) {
                    setTimeout(() => {
                        animateSkillBar(entry.target);
                    }, 200);
                }
                
                // Add staggered delay for grid items
                const gridParent = entry.target.closest('.services-grid, .portfolio-grid, .expertise-grid, .projections-grid, .values-grid');
                if (gridParent) {
                    const siblings = Array.from(gridParent.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
                
                // Add animation class with delay
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Skill Bar Animations
function initSkillBars() {
    // This will be triggered by scroll observer
}

function animateSkillBar(skillItem) {
    const progressBar = skillItem.querySelector('.skill-progress');
    if (!progressBar) return;
    
    const targetWidth = progressBar.getAttribute('data-width');
    
    setTimeout(() => {
        progressBar.style.width = targetWidth + '%';
    }, 300);
}

// Counter Animations
function initCounters() {
    const counters = document.querySelectorAll('.stat');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(stat) {
    const numberElement = stat.querySelector('.stat-number');
    const targetCount = parseInt(stat.getAttribute('data-count'));
    
    if (!numberElement || !targetCount) return;
    
    let currentCount = 0;
    const increment = targetCount / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        currentCount += increment;
        
        if (currentCount >= targetCount) {
            numberElement.textContent = targetCount;
            clearInterval(timer);
        } else {
            numberElement.textContent = Math.floor(currentCount);
        }
    }, stepTime);
}

// Tilt Effects for Service Cards
function initTiltEffects() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', handleTilt);
        element.addEventListener('mouseleave', resetTilt);
    });
}

function handleTilt(e) {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / centerY * -10;
    const rotateY = (x - centerX) / centerX * 10;
    
    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    element.style.transition = 'transform 0.1s ease';
}

function resetTilt(e) {
    const element = e.currentTarget;
    element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    element.style.transition = 'transform 0.3s ease';
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission();
        });
        
        // Real-time validation
        const formInputs = contactForm.querySelectorAll('.form-control');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
        
        // Add focus effects
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentNode.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentNode.classList.remove('focused');
            });
        });
    }
}

function handleFormSubmission() {
    const form = document.getElementById('contact-form');
    const formData = new FormData(form);
    
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        company: formData.get('company'),
        service: formData.get('service'),
        message: formData.get('message')
    };
    
    // Clear previous messages
    clearMessages();
    
    // Validate form
    if (validateForm(data)) {
        submitForm(data);
    } else {
        showErrorMessage('Veuillez corriger les erreurs ci-dessus avant de soumettre le formulaire.');
    }
}

function validateForm(data) {
    let isValid = true;
    
    // Clear previous errors
    const errors = document.querySelectorAll('.field-error');
    errors.forEach(error => error.remove());
    
    // Validate name
    if (!data.name || data.name.trim().length < 2) {
        showFieldError('name', 'Le nom doit contenir au moins 2 caractères');
        isValid = false;
    }
    
    // Validate email
    if (!data.email || !isValidEmail(data.email)) {
        showFieldError('email', 'Veuillez entrer une adresse email valide');
        isValid = false;
    }
    
    // Validate message
    if (!data.message || data.message.trim().length < 10) {
        showFieldError('message', 'Le message doit contenir au moins 10 caractères');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    clearFieldError(field);
    
    let isValid = true;
    
    switch(field.name) {
        case 'name':
            if (value.length > 0 && value.length < 2) {
                showFieldError('name', 'Le nom doit contenir au moins 2 caractères');
                isValid = false;
            }
            break;
        case 'email':
            if (value.length > 0 && !isValidEmail(value)) {
                showFieldError('email', 'Veuillez entrer une adresse email valide');
                isValid = false;
            }
            break;
        case 'message':
            if (value.length > 0 && value.length < 10) {
                showFieldError('message', 'Le message doit contenir au moins 10 caractères');
                isValid = false;
            }
            break;
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    if (field) {
        field.classList.add('invalid');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
    }
}

function clearFieldError(field) {
    field.classList.remove('invalid');
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function clearMessages() {
    const messages = document.querySelectorAll('.success-message, .error-message');
    messages.forEach(msg => msg.remove());
}

function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `<strong>❌ Erreur:</strong><br>${message}`;
    
    const form = document.getElementById('contact-form');
    form.parentNode.insertBefore(errorDiv, form);
    
    // Animate in
    errorDiv.style.opacity = '0';
    errorDiv.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        errorDiv.style.transition = 'all 0.3s ease-out';
        errorDiv.style.opacity = '1';
        errorDiv.style.transform = 'translateY(0)';
    }, 100);
    
    // Scroll to error message
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Remove after 5 seconds
    setTimeout(() => {
        errorDiv.style.opacity = '0';
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 300);
    }, 5000);
}

function submitForm(data) {
    const submitButton = document.querySelector('#contact-form button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Envoi en cours...';
    submitButton.disabled = true;
    submitButton.style.opacity = '0.7';
    
    // Simulate form submission
    setTimeout(() => {
        showSuccessMessage();
        resetForm();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
        
        // Create mailto link
        createMailtoLink(data);
    }, 1500);
}

function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <strong>✅ Message envoyé avec succès!</strong><br>
        Nous vous recontacterons dans les plus brefs délais.<br>
        <small>Un lien mailto va s'ouvrir automatiquement pour confirmer l'envoi.</small>
    `;
    
    const form = document.getElementById('contact-form');
    form.parentNode.insertBefore(successDiv, form);
    
    // Animate in
    successDiv.style.opacity = '0';
    successDiv.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        successDiv.style.transition = 'all 0.3s ease-out';
        successDiv.style.opacity = '1';
        successDiv.style.transform = 'translateY(0)';
    }, 100);
    
    // Scroll to message
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Remove after 8 seconds
    setTimeout(() => {
        successDiv.style.opacity = '0';
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.remove();
            }
        }, 300);
    }, 8000);
}

function resetForm() {
    const form = document.getElementById('contact-form');
    form.reset();
    
    // Clear any remaining errors
    const errors = document.querySelectorAll('.field-error');
    errors.forEach(error => error.remove());
    
    const invalidFields = document.querySelectorAll('.form-control.invalid');
    invalidFields.forEach(field => field.classList.remove('invalid'));
}

function createMailtoLink(data) {
    const serviceNames = {
        'cloud': 'Services Cloud & Migration',
        'cybersecurity': 'Cybersécurité & Infrastructure',
        'consulting': 'Conseil Technique & Formation',
        'other': 'Autre'
    };
    
    const serviceName = serviceNames[data.service] || 'Service général';
    const subject = encodeURIComponent(`Demande de contact - ${serviceName}`);
    const body = encodeURIComponent(`
Bonjour,

Je vous contacte via votre site web CLOUDSECURITY LLC.

Nom: ${data.name}
Email: ${data.email}
Entreprise: ${data.company || 'Non spécifié'}
Service d'intérêt: ${serviceName}

Message:
${data.message}

Cordialement,
${data.name}
    `);
    
    const mailtoLink = `mailto:cloudsecbtob@outlook.com?subject=${subject}&body=${body}`;
    
    setTimeout(() => {
        window.open(mailtoLink, '_blank');
    }, 2000);
}

// Active Navigation Links
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Scroll Indicator
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.visibility = 'hidden';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.visibility = 'visible';
            }
        });
        
        scrollIndicator.addEventListener('click', function() {
            const servicesSection = document.getElementById('services');
            if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
        
        // Make sure it's visible initially
        scrollIndicator.style.cursor = 'pointer';
    }
}

// Parallax Effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-bg-animation');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Utility Functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

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

// Enhanced hover effects for buttons and interactive elements
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    const navLinks = document.querySelectorAll('.nav-link');
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Button hover effects
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Navigation link hover effects
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Service card hover effects
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Initialize everything when DOM is ready
function init() {
    console.log('CLOUDSECURITY LLC website initialized');
    
    // Force start animations if loading screen doesn't exist
    if (!document.getElementById('loading-screen')) {
        setTimeout(() => {
            startHeroAnimations();
        }, 1000);
    }
}

// Call init
init();

// Error handling
window.addEventListener('error', function(e) {
    console.warn('An error occurred:', e.error);
});

// Performance monitoring
function measurePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('Page load time:', loadTime + 'ms');
        });
    }
}

measurePerformance();