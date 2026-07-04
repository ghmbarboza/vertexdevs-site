/* Emblema Vertex em partículas — hero da home.
   Pontos de platina/safira/ouro se reúnem formando o logo, respiram,
   sofrem parallax do mouse e recebem uma varredura de luz periódica. */
(() => {
  const canvas = document.querySelector('.hero-canvas');
  if (!canvas) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { canvas.remove(); return; }

  const staticMark = document.querySelector('[data-hero-mark]');
  const ctx = canvas.getContext('2d', { alpha: true });
  const DPR = Math.min(devicePixelRatio || 1, 2);

  const PLATINUM = [214, 219, 231];
  const SAPPHIRE = [92, 140, 255];
  const GOLD = [217, 190, 140];

  let particles = [];
  let W = 0, H = 0, scale = 1, cx = 0, cy = 0;
  let mouseX = 0, mouseY = 0, px = 0, py = 0;
  let t0 = performance.now();
  let running = true;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    W = rect.width; H = rect.height;
    canvas.width = W * DPR; canvas.height = H * DPR;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    scale = Math.min(W, H) * 0.78;
    cx = W / 2; cy = H * 0.46;
  }

  function buildParticles(img) {
    const S = 320;
    const off = document.createElement('canvas');
    off.width = S; off.height = S;
    const octx = off.getContext('2d');
    octx.drawImage(img, 0, 0, S, S);
    const data = octx.getImageData(0, 0, S, S).data;

    const candidates = [];
    for (let y = 0; y < S; y += 2) {
      for (let x = 0; x < S; x += 2) {
        const i = (y * S + x) * 4;
        const a = data[i + 3];
        if (a < 120) continue;
        const r = data[i], g = data[i + 1], b = data[i + 2];
        const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        const blue = b - (r + g) / 2;
        if (lum > 110 || blue > 46) {
          candidates.push({ nx: x / S - 0.5, ny: y / S - 0.5, lum: Math.min(1, lum / 235), blue: blue > 46 });
        }
      }
    }

    const MAX = Math.min(2400, Math.floor((W * H) / 640));
    particles = [];
    for (let k = 0; k < MAX && candidates.length; k++) {
      const c = candidates.splice((Math.random() * candidates.length) | 0, 1)[0];
      const roll = Math.random();
      const color = c.blue ? SAPPHIRE : (roll < 0.025 ? GOLD : (roll < 0.28 ? SAPPHIRE : PLATINUM));
      const ang = Math.random() * Math.PI * 2;
      const dist = Math.max(W, H) * (0.55 + Math.random() * 0.6);
      particles.push({
        nx: c.nx, ny: c.ny,
        x: cx + Math.cos(ang) * dist,
        y: cy + Math.sin(ang) * dist,
        r: 0.5 + Math.random() * 1.1 + c.lum * 0.5,
        baseA: 0.16 + c.lum * 0.5,
        color,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.9,
        amp: 0.8 + Math.random() * 2.4,
        ease: 0.028 + Math.random() * 0.05
      });
    }
  }

  function frame(now) {
    if (!running) return;
    const t = (now - t0) / 1000;
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';

    px += (mouseX - px) * 0.045;
    py += (mouseY - py) * 0.045;

    /* varredura de luz diagonal a cada ~8s */
    const sweepT = (t % 8) / 8;
    const sweepPos = -0.9 + sweepT * 1.8;
    const cos30 = 0.866, sin30 = 0.5;

    for (const p of particles) {
      const tx = cx + p.nx * scale + px * 16;
      const ty = cy + p.ny * scale + py * 16;
      p.x += (tx - p.x) * p.ease;
      p.y += (ty - p.y) * p.ease;

      const ox = Math.sin(t * p.speed + p.phase) * p.amp;
      const oy = Math.cos(t * p.speed * 0.8 + p.phase) * p.amp;

      const dxn = p.nx * cos30 + p.ny * sin30;
      const sweep = Math.max(0, 1 - Math.abs(dxn - sweepPos) * 9);
      const a = Math.min(1, p.baseA + sweep * 0.55);
      const r = p.r + sweep * 0.7;

      ctx.beginPath();
      ctx.fillStyle = `rgba(${p.color[0]},${p.color[1]},${p.color[2]},${a})`;
      ctx.arc(p.x + ox, p.y + oy, r, 0, 6.2832);
      ctx.fill();
    }
    requestAnimationFrame(frame);
  }

  const img = new Image();
  img.src = 'assets/vertex-logo.png';
  img.onload = () => {
    resize();
    buildParticles(img);
    if (staticMark) staticMark.style.opacity = '0';
    requestAnimationFrame(frame);
  };

  addEventListener('resize', () => { resize(); }, { passive: true });
  addEventListener('pointermove', (e) => {
    mouseX = (e.clientX / innerWidth - 0.5);
    mouseY = (e.clientY / innerHeight - 0.5);
  }, { passive: true });
  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    if (running) { t0 = performance.now() - 1; requestAnimationFrame(frame); }
  });
})();
