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

  /* ---- vitrine: cerimônia de entrada + parallax de gravidade (sem tilt) ---- */
  gsap.utils.toArray('.product-card').forEach((card, i) => {
    const fig = card.querySelector('figure');
    const img = card.querySelector('figure img');
    const idx = card.querySelector('.product-index');
    const tags = card.querySelectorAll('.product-stack li');

    const glint = document.createElement('div'); glint.className = 'card-glint';
    card.appendChild(glint);
    let hairline = null;
    if (fig) { hairline = document.createElement('div'); hairline.className = 'card-hairline'; fig.appendChild(hairline); }

    /* entrada: lenta, pesada, cerimonial */
    const tl = gsap.timeline({
      scrollTrigger: { trigger: card, start: 'top 84%', once: true },
      defaults: { ease: 'power3.out' }
    });
    tl.fromTo(card,
        { opacity: 0, y: 40, clipPath: 'inset(0% 0% 18% 0%)' },
        { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, delay: (i % 2) * 0.12 });
    if (img) tl.fromTo(img, { scale: 1.18 }, { scale: 1.04, duration: 2.4, ease: 'power2.out' }, '<');
    if (idx) tl.fromTo(idx, { opacity: 0 }, { opacity: 1, duration: 1.2 }, '-=1.8');
    if (hairline) tl.to(hairline, { scaleX: 1, duration: 1.6, ease: 'power2.inOut' }, '-=1.6');
    if (tags.length) tl.fromTo(tags, { opacity: 0 }, { opacity: 1, duration: 0.9, stagger: 0.08 }, '-=1.2');
    tl.fromTo(glint, { xPercent: -170 }, { xPercent: 170, duration: 1.8, ease: 'sine.inOut' }, '-=1.6');

    /* gravidade: a peça flutua devagar dentro da moldura conforme o scroll */
    if (img) {
      gsap.fromTo(img, { yPercent: -5 }, {
        yPercent: 5, ease: 'none',
        scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1.2 }
      });
    }

    /* hover: quase nada — um zoom lentíssimo, e só */
    card.addEventListener('pointerenter', () => {
      if (img) gsap.to(img, { scale: 1.09, duration: 2.2, ease: 'power2.out' });
    }, { passive: true });
    card.addEventListener('pointerleave', () => {
      if (img) gsap.to(img, { scale: 1.04, duration: 1.6, ease: 'power2.out' });
    }, { passive: true });
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
