// Fichier JavaScript mis à jour - app.js

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
  initLoadingScreen();
  initNavigation();
  initHeroAnimations();
  initScrollAnimations();
  initContactForm();
  initNavbarScroll();
  initSkillBars();
  initCounters();
  initSmoothScrolling();
  initTiltEffects();
  initScrollIndicator();
  initParallaxEffects();
  window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
});

// Navigation Toggle
function initNavigation() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleMobileMenu();
    });
    document.addEventListener('click', function(event) {
      if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
        closeMobileMenu();
      }
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeMobileMenu();
    });
  }
}
function toggleMobileMenu() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'visible';
}
function closeMobileMenu() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  navToggle.classList.remove('active');
  navMenu.classList.remove('active');
  document.body.style.overflow = 'visible';
}

// Navbar Scroll Effect
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  });
}

// Smooth Scrolling
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      e.preventDefault();
      const target = document.getElementById(href.substring(1));
      if (target) {
        const offset = document.querySelector('.navbar').offsetHeight + 20;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
        closeMobileMenu();
      }
    });
  });
}

// Update Active Nav Link
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;
  let current = '';
  sections.forEach(sec => {
    if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
      current = sec.id;
    }
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
}

// Loading Screen
function initLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen?.classList.add('hidden');
      document.body.style.overflow = 'visible';
      setTimeout(startHeroAnimations, 500);
    }, 1000);
  });
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
  const fadeElements = document.querySelectorAll('.fade-in-up');
  fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease-out';
  });
  setTimeout(startHeroAnimations, 500);
}
function startHeroAnimations() {
  document.querySelectorAll('.fade-in-up').forEach((el, i) => {
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 1000 + i * 300);
  });
}

// Placeholder for other init functions
function initScrollAnimations() {}
function initContactForm() {}
function initSkillBars() {}
function initCounters() {}
function initTiltEffects() {}
function initScrollIndicator() {}
function initParallaxEffects() {}

// Utility
function throttle(fn, limit) {
  let inThrottle;
  return function() {
    if (!inThrottle) {
      fn.apply(this, arguments);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}