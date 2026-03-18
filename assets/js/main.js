/* ═══════════════════════════════════════════
   BLADE — main.js
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── CUSTOM CURSOR ── */
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  function animateFollower() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  document.querySelectorAll('a, button, .service-card, .barber-img-wrap').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1.8)';
      follower.style.width = '48px';
      follower.style.height = '48px';
      follower.style.borderColor = 'rgba(200,16,46,0.8)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      follower.style.width = '32px';
      follower.style.height = '32px';
      follower.style.borderColor = 'rgba(200,16,46,0.5)';
    });
  });

  /* ── NAV SCROLL ── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  /* ── MOBILE MENU ── */
  const burger = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('mobileMenu');
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  document.querySelectorAll('.mm-link').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  /* ── COUNTER ANIMATION ── */
  function animateCounter(el, target, duration = 2000) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { el.textContent = target.toLocaleString(); clearInterval(timer); }
      else { el.textContent = Math.floor(start).toLocaleString(); }
    }, 16);
  }

  const statNums = document.querySelectorAll('.stat-num');
  let countersStarted = false;

  const heroObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !countersStarted) {
        countersStarted = true;
        statNums.forEach(el => {
          animateCounter(el, parseInt(el.dataset.target), 2000);
        });
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) heroObserver.observe(heroStats);

  /* ── HORIZONTAL SCROLL DRAG ── */
  const track = document.getElementById('servicesTrack');
  if (track) {
    let isDown = false, startX, scrollLeft;
    track.addEventListener('mousedown', e => {
      isDown = true; track.classList.add('dragging');
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });
    track.addEventListener('mouseleave', () => { isDown = false; track.classList.remove('dragging'); });
    track.addEventListener('mouseup', () => { isDown = false; track.classList.remove('dragging'); });
    track.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5;
      track.scrollLeft = scrollLeft - walk;
    });
  }

  /* ── SCROLL FADE-UP ── */
  const fadeEls = document.querySelectorAll(
    '.service-card, .barber-card, .testi-card, .about-text > *, .cd-item, .footer-col'
  );
  fadeEls.forEach(el => el.classList.add('fade-up'));

  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 60);
        fadeObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(el => fadeObserver.observe(el));

  /* ── BOOKING FORM ── */
  const bookForm = document.getElementById('bookForm');
  if (bookForm) {
    bookForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = bookForm.querySelector('.btn-submit');
      btn.textContent = 'Booking Confirmed ✓';
      btn.style.background = '#1a7a1a';
      setTimeout(() => {
        btn.textContent = 'Confirm Booking';
        btn.style.background = '';
        bookForm.reset();
      }, 3000);
    });
  }

  /* ── SMOOTH ANCHOR SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
