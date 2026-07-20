// ========================================================
// Renata Rizki Andini — Portfolio Script
// ========================================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile menu toggle ---
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      hamburger.querySelector('i').className = isOpen ? 'fas fa-xmark' : 'fas fa-bars';
    });

    // Close menu after clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.querySelector('i').className = 'fas fa-bars';
      });
    });
  }

  // --- Highlight active nav link on scroll ---
  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const highlightNav = () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) current = section.getAttribute('id');
    });
    navAnchors.forEach(a => {
      a.classList.toggle('is-active', a.getAttribute('href') === `#${current}`);
    });
  };
  window.addEventListener('scroll', highlightNav);
  highlightNav();

  // --- Footer year ---
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Download Portfolio: export the site itself as PDF via browser print ---
  const portfolioBtns = document.querySelectorAll('.js-download-portfolio');
  const originalTitle = document.title;

  portfolioBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      document.title = 'Portfolio - Renata Rizki Andini';
      window.print();
    });
  });

  window.addEventListener('afterprint', () => {
    document.title = originalTitle;
  });

  // --- Scroll-reveal animations ---
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealTargets = document.querySelectorAll('.reveal, .reveal-stagger');

  if (revealTargets.length && !prefersReducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealTargets.forEach(el => observer.observe(el));
  } else {
    // No IntersectionObserver support, or user prefers reduced motion: show everything immediately
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

});