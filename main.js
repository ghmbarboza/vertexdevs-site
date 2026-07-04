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

  /* ---- hero timeline ---- */
  const heroTl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  heroTl
    .fromTo('[data-hero-mark]', { opacity: 0, scale: 0.85, rotate: -6 }, { opacity: 0.5, scale: 1, rotate: 0, duration: 1.6 })
    .fromTo('[data-hero]', { opacity: 0, y: 44 }, { opacity: 1, y: 0, duration: 1, stagger: 0.09 }, '-=1.2');

  /* logo parallax sutil no scroll (transform-only) */
  gsap.to('[data-hero-mark]', {
    yPercent: -18, rotate: 8, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });

  /* ---- reveals genéricos ---- */
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.fromTo(el, { opacity: 0, y: 36 }, {
      opacity: 1, y: 0, duration: 0.9, ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true }
    });
  });

  /* ---- cases: entrada alternada + tilt de profundidade ---- */
  gsap.utils.toArray('.case-card').forEach((card, i) => {
    gsap.fromTo(card, { opacity: 0, y: 60, scale: 0.97 }, {
      opacity: 1, y: 0, scale: 1, duration: 1, ease: 'expo.out', delay: (i % 2) * 0.08,
      scrollTrigger: { trigger: card, start: 'top 88%', once: true }
    });
  });

  /* ---- contadores ---- */
  gsap.utils.toArray('.metric-num').forEach((el) => {
    const target = +el.dataset.count;
    ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: () => gsap.fromTo(el, { innerText: 0 }, {
        innerText: target, duration: 1.6, ease: 'power2.out',
        snap: { innerText: 1 },
        onUpdate() { el.textContent = Math.round(gsap.getProperty(el, 'innerText')); }
      })
    });
  });

  /* ---- manifesto: zoom cinemático ---- */
  gsap.fromTo('[data-manifesto]', { opacity: 0, scale: 0.92, y: 30 }, {
    opacity: 1, scale: 1, y: 0, ease: 'expo.out', duration: 1.2,
    scrollTrigger: { trigger: '.manifesto', start: 'top 75%', once: true }
  });

  /* ---- marquee ---- */
  gsap.to('.marquee-track', { xPercent: -50, ease: 'none', duration: 28, repeat: -1 });

  /* ---- header: fundo ao rolar ---- */
  ScrollTrigger.create({
    start: 80,
    onUpdate: (self) => document.querySelector('.site-header').classList.toggle('is-scrolled', self.scroll() > 80)
  });
})();
