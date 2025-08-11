document.addEventListener('DOMContentLoaded', function() {
    // Navigation Elements
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile Navigation Toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Smooth Scrolling for Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar Scroll Effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active navigation link
        updateActiveNavLink();
    });

    // Update Active Navigation Link Based on Scroll Position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100; // Offset for fixed navbar

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (navLink && scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current nav link
                navLink.classList.add('active');
            }
        });
    }

    // Animate Skill Bars on Scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const percentage = skillBar.getAttribute('data-percentage');
                
                // Set CSS custom property for animation
                skillBar.style.setProperty('--skill-width', percentage + '%');
                skillBar.classList.add('animate');
                
                // Stop observing this element
                skillObserver.unobserve(skillBar);
            }
        });
    }, observerOptions);

    // Start observing skill bars
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name') || '';
        const email = formData.get('email') || '';
        const company = formData.get('company') || 'Non spécifiée';
        const service = formData.get('service') || 'Non spécifié';
        const message = formData.get('message') || '';

        // Validate required fields
        if (!name || !email || !message) {
            showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
            return;
        }

        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Envoi en cours...';
        submitButton.disabled = true;

        // Create mailto link with form data
        const subject = encodeURIComponent(`Nouvelle demande de contact - ${service}`);
        const body = encodeURIComponent(
            `Nom: ${name}\n` +
            `Email: ${email}\n` +
            `Entreprise: ${company}\n` +
            `Service d'intérêt: ${service}\n\n` +
            `Message:\n${message}`
        );
        
        const mailtoLink = `mailto:cloudsecbtob@outlook.com?subject=${subject}&body=${body}`;
        
        // Use window.location.href instead of window.open for better compatibility
        try {
            window.location.href = mailtoLink;
            
            // Show success message after a short delay
            setTimeout(() => {
                showNotification('Votre client email a été ouvert avec le message pré-rempli. Veuillez envoyer l\'email depuis votre client.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 500);
            
        } catch (error) {
            // Fallback if mailto doesn't work
            showNotification('Impossible d\'ouvrir le client email. Veuillez envoyer votre message directement à cloudsecbtob@outlook.com', 'error');
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });

    // Notification System
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--color-surface);
            color: var(--color-text);
            padding: var(--space-16) var(--space-20);
            border-radius: var(--radius-base);
            border: 1px solid var(--color-border);
            box-shadow: var(--shadow-lg);
            z-index: 1100;
            max-width: 400px;
            transform: translateX(100%);
            transition: transform var(--duration-normal) var(--ease-standard);
            cursor: pointer;
        `;

        if (type === 'success') {
            notification.style.borderColor = 'var(--color-success)';
            notification.style.backgroundColor = 'rgba(var(--color-success-rgb), 0.1)';
        } else if (type === 'error') {
            notification.style.borderColor = 'var(--color-error)';
            notification.style.backgroundColor = 'rgba(var(--color-error-rgb), 0.1)';
        }

        notification.textContent = message;
        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });

        // Auto remove after 7 seconds for success messages, 5 seconds for others
        const autoCloseDelay = type === 'success' ? 7000 : 5000;
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, autoCloseDelay);

        // Allow manual close on click
        notification.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        });
    }

    // Form Validation Enhancement
    const formInputs = document.querySelectorAll('.form-control');
    
    formInputs.forEach(input => {
        // Add real-time validation
        input.addEventListener('blur', function() {
            validateInput(this);
        });

        input.addEventListener('input', function() {
            // Remove error state on input
            this.classList.remove('error');
            const errorMsg = this.parentNode.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
            }
        });
    });

    function validateInput(input) {
        const value = input.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error message
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Required field validation
        if (input.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Ce champ est requis.';
        }

        // Email validation
        if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Veuillez entrer une adresse email valide.';
            }
        }

        // Show error state
        if (!isValid) {
            input.classList.add('error');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.cssText = `
                color: var(--color-error);
                font-size: var(--font-size-sm);
                margin-top: var(--space-4);
            `;
            errorDiv.textContent = errorMessage;
            input.parentNode.appendChild(errorDiv);
        } else {
            input.classList.remove('error');
        }

        return isValid;
    }

    // Add error styles to CSS
    const errorStyles = document.createElement('style');
    errorStyles.textContent = `
        .form-control.error {
            border-color: var(--color-error);
            box-shadow: 0 0 0 3px rgba(var(--color-error-rgb), 0.1);
        }
    `;
    document.head.appendChild(errorStyles);

    // Enhance Logo Click Functionality
    const logoContainers = document.querySelectorAll('.logo-container');
    logoContainers.forEach(logo => {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // Add Scroll to Top Button
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.innerHTML = '↑';
    scrollToTopButton.className = 'scroll-to-top';
    scrollToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--color-primary);
        color: var(--color-btn-primary-text);
        border: none;
        font-size: var(--font-size-xl);
        font-weight: bold;
        cursor: pointer;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        transition: all var(--duration-normal) var(--ease-standard);
        box-shadow: var(--shadow-lg);
    `;

    document.body.appendChild(scrollToTopButton);

    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopButton.style.opacity = '1';
            scrollToTopButton.style.visibility = 'visible';
            scrollToTopButton.style.transform = 'translateY(0)';
        } else {
            scrollToTopButton.style.opacity = '0';
            scrollToTopButton.style.visibility = 'hidden';
            scrollToTopButton.style.transform = 'translateY(20px)';
        }
    });

    // Scroll to top functionality
    scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add hover effects to scroll to top button
    scrollToTopButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(0) scale(1.1)';
    });

    scrollToTopButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });

    // Initialize active nav link on page load
    updateActiveNavLink();

    // Add animation classes for elements that come into view
    const animateElements = document.querySelectorAll('.service-card, .client-card, .skill-item');
    const animateObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                animateObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Set initial state and observe elements
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        animateObserver.observe(element);
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    console.log('CLOUDSECURITY LLC website loaded successfully!');
});