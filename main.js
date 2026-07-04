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
    if (mark) tl.fromTo(mark, { opacity: 0, scale: 0.9 }, { opacity: 0.1, scale: 1, duration: 1.8 });
    tl.fromTo(heroEls, { opacity: 0, y: 42 }, { opacity: 1, y: 0, duration: 1.05, stagger: 0.1 }, mark ? '-=1.4' : 0);
  }

  /* parallax do selo no scroll */
  const mark = document.querySelector('[data-hero-mark]');
  if (mark) {
    gsap.to(mark, {
      yPercent: -16, rotate: 10, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });
  }

  /* ---- reveals ---- */
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.fromTo(el, { opacity: 0, y: 34 }, {
      opacity: 1, y: 0, duration: 1, ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 86%', once: true }
    });
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
