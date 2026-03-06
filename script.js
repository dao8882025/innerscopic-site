/* ============================================
   INNERSCOPIC — Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Header scroll effect ---
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- Hamburger menu ---
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('mobileNavOverlay');
  
  function toggleMenu() {
    const isActive = hamburger.classList.toggle('active');
    if (isActive) {
      overlay.style.display = 'flex';
      requestAnimationFrame(() => overlay.classList.add('active'));
      document.body.style.overflow = 'hidden';
    } else {
      closeMenu();
    }
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (!overlay.classList.contains('active')) {
        overlay.style.display = 'none';
      }
    }, 300);
  }

  hamburger.addEventListener('click', toggleMenu);

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // --- Smooth scroll for all anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // --- FAQ Accordion ---
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      document.querySelectorAll('.faq-question').forEach(otherBtn => {
        if (otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          otherBtn.nextElementSibling.classList.remove('open');
        }
      });

      btn.setAttribute('aria-expanded', !isOpen);
      answer.classList.toggle('open', !isOpen);
    });
  });

  // --- Contact form ---
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'SENT!';
      btn.style.background = '#4caf50';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        form.reset();
      }, 2000);
    });
  }

  // --- Scroll reveal animations ---
  const revealElements = document.querySelectorAll('.feature-section, .step-card, .faq-item, .quote-section, .locations-section, .how-section, .contact-section');
  
  // Check if IntersectionObserver is available
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

    revealElements.forEach(el => {
      el.classList.add('reveal-on-scroll');
      const rect = el.getBoundingClientRect();
      // Immediately reveal elements already in viewport
      if (rect.top < window.innerHeight + 50 && rect.bottom > 0) {
        el.classList.add('revealed');
      } else {
        observer.observe(el);
      }
    });

    // Fallback: after 1.5s, reveal anything still hidden
    setTimeout(() => {
      revealElements.forEach(el => el.classList.add('revealed'));
    }, 1500);
  }
  // If no IntersectionObserver, don't add reveal-on-scroll class at all
});
