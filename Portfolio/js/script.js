/* =========================================================
   Portfolio - Main Script
   Shared across every page. All blocks are guarded so a
   missing element on a given page never throws an error.
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Preloader ---------- */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', function () {
      preloader.classList.add('loaded');
    });
  }

  /* ---------- AOS (scroll animations) ---------- */
  if (window.AOS) {
    AOS.init({
      duration: 900,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60
    });
  }

  /* ---------- Custom Cursor ---------- */
  const cursor = document.querySelector('.cursor');
  if (cursor && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', function (e) {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, .magnetic').forEach(function (el) {
      el.addEventListener('mouseenter', function () { cursor.classList.add('cursor-active'); });
      el.addEventListener('mouseleave', function () { cursor.classList.remove('cursor-active'); });
    });
  }

  /* ---------- Magnetic Buttons ---------- */
  document.querySelectorAll('.magnetic').forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = 'translate(' + x * 0.25 + 'px,' + y * 0.25 + 'px)';
    });
    btn.addEventListener('mouseleave', function () {
      btn.style.transform = 'translate(0, 0)';
    });
  });

  /* ---------- Header Scroll Background ---------- */
  const header = document.getElementById('header');
  if (header) {
    const toggleHeader = function () {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    toggleHeader();
    window.addEventListener('scroll', toggleHeader);
  }

  /* ---------- Mobile Menu ---------- */
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.contains('flex');
      mobileMenu.classList.toggle('hidden', isOpen);
      mobileMenu.classList.toggle('flex', !isOpen);
      menuBtn.innerHTML = isOpen ? '<i class="fas fa-bars"></i>' : '<i class="fas fa-times"></i>';
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }

  /* ---------- Active Nav Link (based on current page) ---------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, #mobile-menu a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPage = href.split('#')[0] || 'index.html';
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---------- Typed.js (Home page only) ---------- */
  const typedEl = document.querySelector('.typed-text');
  if (typedEl && window.Typed) {
    new Typed('.typed-text', {
      strings:[
  'Full Stack Developer',
  'Founder of RSAGENCY',
  'Influencer Marketing Expert',
  'Brand Collaboration Specialist'
],
      typeSpeed: 60,
      backSpeed: 35,
      backDelay: 1800,
      loop: true
    });
  }

  /* ---------- Particles.js (Home page only) ---------- */
  const particlesEl = document.getElementById('particles-js');
  if (particlesEl && window.particlesJS) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 60, density: { enable: true, value_area: 900 } },
        color: { value: '#F7B500' },
        shape: { type: 'circle' },
        opacity: { value: 0.35, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: '#F7B500', opacity: 0.15, width: 1 },
        move: { enable: true, speed: 1.2, out_mode: 'out' }
      },
      interactivity: {
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: true, mode: 'push' }
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 0.4 } },
          push: { particles_nb: 3 }
        }
      },
      retina_detect: true
    });
  }

  /* ---------- GSAP ScrollTrigger fade-ups (progressive enhancement) ---------- */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.gold-band').forEach(function (band) {
      gsap.fromTo(band, { scaleX: 0 }, {
        scaleX: 1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: band, start: 'top 90%' }
      });
    });
  }

  /* ---------- Animated Counters (About page) ---------- */
  const counters = document.querySelectorAll('.counter');
  if (counters.length) {
    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10) || 0;
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 60));
        const tick = function () {
          current += step;
          if (current >= target) {
            el.textContent = target;
          } else {
            el.textContent = current;
            requestAnimationFrame(tick);
          }
        };
        tick();
        counterObserver.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(function (c) { counterObserver.observe(c); });
  }

  /* ---------- Skill Bars (Resume page) ---------- */
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  if (skillBars.length) {
    const barObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.style.width = el.getAttribute('data-level') + '%';
        barObserver.unobserve(el);
      });
    }, { threshold: 0.4 });

    skillBars.forEach(function (b) { barObserver.observe(b); });
  }

  /* ---------- Back to Top ---------- */
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('show', window.scrollY > 500);
    });
    backToTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Contact Form ---------- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const status = document.getElementById('form-status');
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      // Simulated submission - replace with a real endpoint/API call.
      setTimeout(function () {
        if (status) {
          status.textContent = 'Thank you! Your inquiry has been sent.';
          status.classList.remove('error');
          status.classList.add('success');
        }
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 900);
    });
  }

});
