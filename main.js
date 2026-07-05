(() => {
  const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const showAll = () => {
    document.querySelectorAll('[data-hero], [data-reveal], [data-manifesto]').forEach((el) => {
      el.style.opacity = 1;
      el.style.transform = 'none';
    });
  };

  if (prefersReduced || typeof gsap === 'undefined') { showAll(); return; }

  gsap.registerPlugin(ScrollTrigger);

  /* ---- entrada da página (hero / page-hero) ---- */
  const heroEls = gsap.utils.toArray('[data-hero]');
  if (heroEls.length) {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    const mark = document.querySelector('[data-hero-mark]');
    const hasCanvas = !!document.querySelector('.hero-canvas');
    if (mark && !hasCanvas) tl.fromTo(mark, { opacity: 0, scale: 0.9 }, { opacity: 0.1, scale: 1, duration: 1.8 });
    if (mark && hasCanvas) mark.style.opacity = '0';
    tl.fromTo(heroEls, { opacity: 0, y: 42 }, { opacity: 1, y: 0, duration: 1.05, stagger: 0.1 }, mark ? '-=1.4' : 0);
  }

  /* parallax do selo no scroll */
  const mark2 = document.querySelector('[data-hero-mark]');
  if (mark2 && !document.querySelector('.hero-canvas')) {
    gsap.to(mark2, {
      yPercent: -16, rotate: 10, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });
  }

  /* ---- reveals ---- */
  gsap.utils.toArray('[data-reveal]').filter((el) => !el.classList.contains('product-card')).forEach((el) => {
    gsap.fromTo(el, { opacity: 0, y: 34 }, {
      opacity: 1, y: 0, duration: 1, ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 86%', once: true }
    });
  });

  /* ---- vitrine: entrada cinematográfica + glint + tilt 3D ---- */
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  gsap.utils.toArray('.product-card').forEach((card, i) => {
    const fig = card.querySelector('figure');
    const img = card.querySelector('figure img');
    const idx = card.querySelector('.product-index');
    const tags = card.querySelectorAll('.product-stack li');

    /* camadas dinâmicas: glint, glare e hairline */
    const glint = document.createElement('div'); glint.className = 'card-glint';
    const glare = document.createElement('div'); glare.className = 'card-glare';
    card.appendChild(glint); card.appendChild(glare);
    let hairline = null;
    if (fig) { hairline = document.createElement('div'); hairline.className = 'card-hairline'; fig.appendChild(hairline); }

    /* entrada: cortina + imagem assentando + índice + hairline + tags */
    const tl = gsap.timeline({
      scrollTrigger: { trigger: card, start: 'top 86%', once: true },
      defaults: { ease: 'expo.out' }
    });
    tl.fromTo(card,
        { opacity: 0, y: 70, clipPath: 'inset(14% 8% 14% 8%)' },
        { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.15, delay: (i % 2) * 0.09 });
    if (img) tl.fromTo(img, { scale: 1.28, yPercent: 6 }, { scale: 1.02, yPercent: 0, duration: 1.6 }, '<');
    if (idx) tl.fromTo(idx, { opacity: 0, x: 26 }, { opacity: 1, x: 0, duration: 0.8 }, '-=1.1');
    if (hairline) tl.to(hairline, { scaleX: 1, duration: 1.1, ease: 'power3.inOut' }, '-=1.0');
    if (tags.length) tl.fromTo(tags, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 }, '-=0.9');
    tl.fromTo(glint, { xPercent: -160 }, { xPercent: 160, duration: 1.2, ease: 'power2.inOut' }, '-=1.2');

    /* tilt 3D + glare seguindo o cursor (só desktop) */
    if (fine) {
      const rx = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power3.out' });
      const ry = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power3.out' });
      const ipx = img ? gsap.quickTo(img, 'xPercent', { duration: 0.8, ease: 'power3.out' }) : null;
      const ipy = img ? gsap.quickTo(img, 'yPercent', { duration: 0.8, ease: 'power3.out' }) : null;
      gsap.set(card, { transformPerspective: 1200 });

      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        rx(-py * 5); ry(px * 6);
        if (ipx) ipx(-px * 2.4);
        if (ipy) ipy(-py * 2.4);
        card.style.setProperty('--gx', ((px + 0.5) * 100) + '%');
        card.style.setProperty('--gy', ((py + 0.5) * 100) + '%');
      }, { passive: true });

      card.addEventListener('pointerleave', () => { rx(0); ry(0); if (ipx) ipx(0); if (ipy) ipy(0); }, { passive: true });

      /* glint extra + zoom da imagem ao passar o mouse */
      card.addEventListener('pointerenter', () => {
        gsap.fromTo(glint, { xPercent: -160 }, { xPercent: 160, duration: 0.9, ease: 'power2.inOut' });
        if (img) gsap.to(img, { scale: 1.08, duration: 1.1, ease: 'expo.out' });
      }, { passive: true });
      card.addEventListener('pointerleave', () => {
        if (img) gsap.to(img, { scale: 1.02, duration: 0.9, ease: 'expo.out' });
      }, { passive: true });
    }
  });

  /* ---- contadores ---- */
  gsap.utils.toArray('.metric-num').forEach((el) => {
    const target = +el.dataset.count;
    ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: () => gsap.fromTo(el, { innerText: 0 }, {
        innerText: target, duration: 1.8, ease: 'power2.out',
        snap: { innerText: 1 },
        onUpdate() { el.textContent = Math.round(gsap.getProperty(el, 'innerText')); }
      })
    });
  });

  /* ---- manifesto ---- */
  gsap.utils.toArray('[data-manifesto]').forEach((el) => {
    gsap.fromTo(el, { opacity: 0, scale: 0.94, y: 26 }, {
      opacity: 1, scale: 1, y: 0, ease: 'expo.out', duration: 1.3,
      scrollTrigger: { trigger: el, start: 'top 78%', once: true }
    });
  });

  /* ---- marquee ---- */
  const track = document.querySelector('.marquee-track');
  if (track) gsap.to(track, { xPercent: -50, ease: 'none', duration: 32, repeat: -1 });

  /* ---- header ao rolar ---- */
  const header = document.querySelector('.site-header');
  if (header) {
    ScrollTrigger.create({
      start: 60,
      onUpdate: (self) => header.classList.toggle('is-scrolled', self.scroll() > 60)
    });
  }
})();
