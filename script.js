// ========================================================
// Renata Rizki Andini — Portfolio Script
// ========================================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile menu toggle ---
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      hamburger.querySelector('i').className = isOpen ? 'fas fa-xmark' : 'fas fa-bars';
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.querySelector('i').className = 'fas fa-bars';
      });
    });
  }

  // --- Active nav on scroll ---
  const sections   = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const highlightNav = () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 140) current = s.getAttribute('id');
    });
    navAnchors.forEach(a => {
      a.classList.toggle('is-active', a.getAttribute('href') === `#${current}`);
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();

  // --- Footer year ---
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Download Portfolio ---
  const originalTitle = document.title;
  document.querySelectorAll('.js-download-portfolio').forEach(btn => {
    btn.addEventListener('click', () => {
      document.title = 'Portfolio - Renata Rizki Andini';
      window.print();
    });
  });
  window.addEventListener('afterprint', () => { document.title = originalTitle; });

  // --- Scroll reveal (all classes) ---
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealSelectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger, .divider';
  const revealTargets = document.querySelectorAll(revealSelectors);

  if (!prefersReduced && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    revealTargets.forEach(el => observer.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  // --- Cursor glow effect ---
  if (!prefersReduced && window.innerWidth > 768) {
    const glow = document.createElement('div');
    glow.style.cssText = `
      position:fixed; pointer-events:none; z-index:9999;
      width:300px; height:300px; border-radius:50%;
      background: radial-gradient(circle, rgba(240,217,160,.07) 0%, transparent 70%);
      transform:translate(-50%,-50%);
      transition: left .12s ease, top .12s ease;
      left:-999px; top:-999px;
    `;
    document.body.appendChild(glow);

    document.addEventListener('mousemove', e => {
      glow.style.left = e.clientX + 'px';
      glow.style.top  = e.clientY + 'px';
    });
  }

  // --- Smooth counter for stats ---
  const statNums = document.querySelectorAll('.stat-num');

  const animateCounter = (el) => {
    const target = el.textContent.replace(/\D/g, '');
    const suffix = el.textContent.replace(/[\d]/g, '');
    if (!target) return;

    const duration = 1200;
    const start    = performance.now();
    const from     = 0;
    const to       = parseInt(target);

    const update = (now) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease     = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(from + (to - from) * ease) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  };

  if ('IntersectionObserver' in window && !prefersReduced) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statNums.forEach(el => counterObserver.observe(el));
  }

  // --- Navbar scroll shadow ---
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 20
      ? '0 4px 30px rgba(0,0,0,.4)'
      : 'none';
  }, { passive: true });

  // --- Smooth hover tilt on project cards ---
  if (!prefersReduced && window.innerWidth > 768) {
    document.querySelectorAll('.project-card, .skill-card, .cert-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect   = card.getBoundingClientRect();
        const x      = (e.clientX - rect.left) / rect.width  - 0.5;
        const y      = (e.clientY - rect.top)  / rect.height - 0.5;
        card.style.transform = `translateY(-4px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

});
