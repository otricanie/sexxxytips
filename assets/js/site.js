/* =====================================================================
   SEXY TIPS — shared site behaviour
   ===================================================================== */
(() => {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine   = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- INTRO GATE ---------- */
  const gate = $('.gate');
  if (gate) {
    const skip = /[?&]nogate/.test(location.search) || sessionStorage.getItem('st_entered');
    const open = () => {
      gate.classList.add('is-open');
      document.body.style.overflow = '';
      try { sessionStorage.setItem('st_entered', '1'); } catch {}
      window.dispatchEvent(new Event('gate:open'));
      setTimeout(() => gate.remove(), 800);
    };
    if (skip) {
      // returning visitor (this session) or test mode — straight in
      gate.remove();
    } else {
      const bar = $('.gate__bar i');
      let p = 0;
      const tick = setInterval(() => {
        p = Math.min(100, p + Math.random() * 16 + 4);
        if (bar) bar.style.width = p + '%';
        if (p >= 100) clearInterval(tick);
      }, 130);
      document.body.style.overflow = 'hidden';       // lock scroll until entered
      $('.gate__enter')?.addEventListener('click', open);
      window.addEventListener('keydown', e => {        // Enter / Space to proceed
        if (gate.isConnected && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); open(); }
      });
    }
  }

  /* ---------- CUSTOM CURSOR (instant dot + trailing ring, native hidden) ---------- */
  if (fine) {
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    dot.innerHTML = '<svg viewBox="0 0 100 90" aria-hidden="true"><path d="M50 84C50 84 6 56 6 28 6 12 18 4 30 8 40 11 47 20 50 28 53 20 60 11 70 8 82 4 94 12 94 28 94 56 50 84 50 84Z"/></svg>';
    document.body.append(ring, dot);
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, seen = false;
    window.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      if (!seen) { seen = true; rx = mx; ry = my; ring.classList.add('on'); dot.classList.add('on'); }
      dot.style.transform = `translate(${mx}px,${my}px)`;
    }, { passive: true });
    const loop = () => {
      rx += (mx - rx) * 0.2; ry += (my - ry) * 0.2;
      ring.style.transform = `translate(${rx}px,${ry}px)`;
      requestAnimationFrame(loop);
    };
    loop();
    const hot = 'a,button,.btn,.chip,.card__quick,.swatch,.look__cell,.drop__visual,.nav a,.modal__close,.gate__enter,[data-cursor]';
    document.addEventListener('mouseover', e => {
      if (e.target.closest(hot)) {
        document.body.classList.add('cur-hot');
        const lab = e.target.closest('[data-cursor]')?.dataset.cursor;
        if (lab) ring.setAttribute('data-label', lab); else ring.removeAttribute('data-label');
      }
    });
    document.addEventListener('mouseout', e => {
      if (e.target.closest(hot)) { document.body.classList.remove('cur-hot'); ring.removeAttribute('data-label'); }
    });
  }

  /* ---------- SCROLL PROGRESS ---------- */
  const prog = $('.progress i');
  if (prog) {
    const upd = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      prog.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + '%';
    };
    addEventListener('scroll', upd, { passive: true });
    addEventListener('resize', upd, { passive: true });
    upd();
  }

  /* ---------- HEADER scroll state + hide on scroll-down ---------- */
  const hdr = $('.hdr');
  if (hdr) {
    let last = 0;
    const onScroll = () => {
      const y = scrollY;
      hdr.classList.toggle('scrolled', y > 40);
      if (y > 560 && y > last + 4) hdr.classList.add('hide');
      else if (y < last - 4 || y < 200) hdr.classList.remove('hide');
      last = y;
    };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- MOBILE MENU ---------- */
  const burger = $('.burger'), mnav = $('.mnav');
  if (burger && mnav) {
    const toggle = (force) => {
      const open = force ?? !mnav.classList.contains('open');
      mnav.classList.toggle('open', open);
      document.body.classList.toggle('menu-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    };
    burger.addEventListener('click', () => toggle());
    $$('.mnav a').forEach(a => a.addEventListener('click', () => toggle(false)));
  }

  /* ---------- MARQUEE: repeat the set to cover the viewport, then mirror it
     (animation shifts -50%, so the track must be two identical halves) ---------- */
  $$('.marquee').forEach(m => {
    const track = $('.marquee__track', m);
    if (!track) return;
    const base = [...track.children];
    const setW = base.reduce((s, n) => s + n.offsetWidth, 0);
    const need = setW > 0 ? Math.ceil((innerWidth * 1.2) / setW) : 1;
    for (let i = 1; i < need; i++) track.append(...base.map(n => n.cloneNode(true)));
    track.append(...[...track.children].map(n => n.cloneNode(true)));
  });

  /* ---------- REVEAL on scroll (robust: IO + scroll-position fallback) ---------- */
  {
    const revealEls = $$('[data-reveal],[data-stagger]');
    const reveal = el => {
      if (el.classList.contains('in')) return;
      el.classList.add('in');
      if (el.hasAttribute('data-stagger')) {
        [...el.children].forEach((c, i) => { c.style.transitionDelay = (i * 0.06) + 's'; });
      }
    };
    if (reduce) {
      revealEls.forEach(reveal);
    } else {
      const checkAll = () => {
        const vh = innerHeight || document.documentElement.clientHeight;
        for (const el of revealEls) {
          if (el.classList.contains('in')) continue;
          const r = el.getBoundingClientRect();
          if (r.top < vh * 0.9 && r.bottom > 0) reveal(el);
        }
      };
      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach(en => { if (en.isIntersecting) { reveal(en.target); io.unobserve(en.target); } });
        }, { threshold: 0.04, rootMargin: '0px 0px -6% 0px' });
        revealEls.forEach(el => io.observe(el));
      }
      addEventListener('scroll', checkAll, { passive: true });
      addEventListener('resize', checkAll, { passive: true });
      addEventListener('load', checkAll);
      checkAll();
      setTimeout(checkAll, 1600); // ultimate safety — nothing stays hidden
    }
  }

  /* ---------- MAGNETIC elements ---------- */
  if (fine && !reduce) {
    $$('[data-magnet]').forEach(el => {
      const str = parseFloat(el.dataset.magnet) || 0.3;
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * str;
        const y = (e.clientY - r.top - r.height / 2) * str;
        el.style.transform = `translate(${x}px,${y}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------- HERO parallax (subtle) ---------- */
  const heroImg = $('.hero__bg img');
  if (heroImg && !reduce && fine) {
    addEventListener('scroll', () => {
      const y = Math.min(scrollY, innerHeight);
      heroImg.style.transform = `scale(1.06) translateY(${y * 0.12}px)`;
    }, { passive: true });
  }

  /* ---------- active nav by section (index) ---------- */
  const navLinks = $$('.nav a[href^="#"]');
  if (navLinks.length && 'IntersectionObserver' in window) {
    const map = new Map();
    navLinks.forEach(a => { const t = $(a.getAttribute('href')); if (t) map.set(t, a); });
    const so = new IntersectionObserver(es => {
      es.forEach(en => {
        if (en.isIntersecting) {
          navLinks.forEach(a => a.classList.remove('active'));
          map.get(en.target)?.classList.add('active');
        }
      });
    }, { threshold: 0.4 });
    map.forEach((_, sec) => so.observe(sec));
  }

  /* ---------- DROP colour swatches control the featured image (click, not hover) ---------- */
  const dropVisual = $('.drop__visual');
  const dropSwatches = $$('.drop__buy .swatch');
  if (dropVisual && dropSwatches.length) {
    const setColor = (c) => {
      dropVisual.classList.toggle('is-pink', c === 'pink');
      dropSwatches.forEach(s => s.classList.toggle('is-on', s.dataset.c === c));
    };
    dropSwatches.forEach(s => {
      s.setAttribute('role', 'button');
      s.setAttribute('aria-label', s.title || s.dataset.c);
      s.tabIndex = 0;
      s.addEventListener('click', () => setColor(s.dataset.c));
      s.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setColor(s.dataset.c); }
      });
    });
    setColor('black'); // default selection
  }

  /* ---------- footer year ---------- */
  $$('[data-year]').forEach(el => el.textContent = '2026');

  /* ---------- live clock (Moscow) ---------- */
  const clock = $('[data-clock]');
  if (clock) {
    const upd = () => {
      try {
        const t = new Intl.DateTimeFormat('ru-RU', {
          hour: '2-digit', minute: '2-digit', second: '2-digit',
          timeZone: 'Europe/Moscow', hour12: false
        }).format(new Date());
        clock.textContent = t + ' MSK';
      } catch { clock.textContent = '— MSK'; }
    };
    upd(); setInterval(upd, 1000);
  }
})();
