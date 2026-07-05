/* Consulta privada — gateway de captação (uma pergunta por tela). */
(() => {
  const form = document.getElementById('consulta-form');
  if (!form) return;

  const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const steps = Array.from(form.querySelectorAll('.c-step'));
  const bar = document.getElementById('progress-bar');
  const prevBtn = document.getElementById('prev-btn');
  const TOTAL = 6;
  let current = 0;
  const answers = {};

  const hasGsap = typeof gsap !== 'undefined' && !prefersReduced;

  function setProgress() {
    const q = Math.min(Math.max(current, 0), 7);
    const pct = q <= 0 ? 0 : Math.min((q / (TOTAL + 1)) * 100, 100);
    if (bar) bar.style.width = pct + '%';
    if (prevBtn) prevBtn.hidden = current === 0 || current === 8;
  }

  function show(idx, dir = 1) {
    const from = steps[current];
    const to = steps[idx];
    if (!to || from === to) return;

    if (hasGsap) {
      gsap.to(from, {
        opacity: 0, y: -28 * dir, duration: 0.45, ease: 'power2.in',
        onComplete: () => {
          from.classList.remove('is-active');
          to.classList.add('is-active');
          gsap.fromTo(to, { opacity: 0, y: 42 * dir }, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' });
          focusStep(to);
        }
      });
    } else {
      from.classList.remove('is-active');
      to.classList.add('is-active');
      focusStep(to);
    }
    current = idx;
    setProgress();
  }

  function focusStep(step) {
    const input = step.querySelector('.c-input');
    if (input) setTimeout(() => input.focus(), 120);
  }

  function stepValid(idx) {
    const step = steps[idx];
    const inputs = step.querySelectorAll('.c-input');
    const err = step.querySelector('[data-error]');
    if (inputs.length === 0) {
      const hidden = step.querySelector('input[type="hidden"]');
      if (hidden && !hidden.value) {
        const opts = step.querySelector('.c-options');
        if (opts && hasGsap) gsap.fromTo(opts, { x: -7 }, { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.35)' });
        return false;
      }
      return true;
    }
    let allOk = true;
    inputs.forEach((input) => {
      const v = input.value.trim();
      let ok = v.length >= 2;
      if (input.type === 'tel') {
        const digits = v.replace(/\D/g, '');
        ok = digits.length >= 10 && digits.length <= 13;
      } else if (input.type === 'email') {
        ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      }
      if (!ok) {
        allOk = false;
        if (hasGsap) gsap.fromTo(input, { x: -7 }, { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.35)' });
      } else if (input.name) {
        answers[input.name] = v;
      }
    });
    if (err) err.classList.toggle('is-visible', !allOk);
    return allOk;
  }

  function next() {
    if (current >= 7) return;
    if (!stepValid(current)) return;
    if (current === 6) buildFicha();
    show(current + 1, 1);
  }

  function prev() {
    if (current <= 0) return;
    show(current - 1, -1);
  }

  /* opções (cards) — selecionar avança sozinho */
  form.querySelectorAll('.c-options').forEach((group) => {
    const hidden = group.parentElement.querySelector('input[type="hidden"]');
    group.querySelectorAll('.c-option').forEach((opt) => {
      opt.addEventListener('click', () => {
        group.querySelectorAll('.c-option').forEach((o) => o.classList.remove('is-selected'));
        opt.classList.add('is-selected');
        if (hidden) { hidden.value = opt.dataset.value; answers[hidden.name] = opt.dataset.value; }
        setTimeout(next, 320);
      });
    });
  });

  form.querySelectorAll('[data-next]').forEach((b) => b.addEventListener('click', next));
  form.querySelectorAll('[data-restart]').forEach((b) => b.addEventListener('click', () => show(1, -1)));
  if (prevBtn) prevBtn.addEventListener('click', prev);

  form.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && current < 7) { e.preventDefault(); next(); }
  });

  function buildFicha() {
    const ficha = document.getElementById('ficha');
    if (!ficha) return;
    const rows = [
      ['Nome', answers.nome],
      ['Empresa', answers.empresa],
      ['Procura', answers.busca],
      ['Momento', answers.momento],
      ['Investimento', answers.investimento],
      ['WhatsApp', answers.whatsapp],
      ['E-mail', answers.email]
    ];
    ficha.innerHTML = rows
      .filter(([, v]) => v)
      .map(([k, v]) => `<div class="c-ficha-row"><dt>${k}</dt><dd>${String(v).replace(/[<>]/g, '')}</dd></div>`)
      .join('');
  }

  const SUPABASE_URL = 'https://kmgnjlcmswbbsntwdvef.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_9DJQOz3zsSm4s-WRkv31IA_Gu55pVCQ';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('enviar');
    if (btn) { btn.disabled = true; btn.textContent = 'Registrando…'; }

    try {
      const res = await fetch(SUPABASE_URL + '/rest/v1/site_consultas', {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': 'Bearer ' + SUPABASE_KEY,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          nome: answers.nome,
          empresa: answers.empresa,
          busca: answers.busca,
          momento: answers.momento,
          investimento: answers.investimento,
          whatsapp: answers.whatsapp,
          email: answers.email,
          user_agent: navigator.userAgent.slice(0, 250),
          pagina_origem: document.referrer || location.href
        })
      });
      if (!res.ok) throw new Error('insert failed ' + res.status);
      if (window.fbq) fbq('track', 'Lead');
      show(8, 1);
      if (bar) bar.style.width = '100%';
    } catch (err) {
      /* fallback: nunca perder o lead — segue pelo WhatsApp */
      if (window.fbq) fbq('track', 'Lead');
      const msg = [
        'Solicitação de consulta privada — vertexdevs.org', '',
        `Nome: ${answers.nome || '-'}`, `Empresa: ${answers.empresa || '-'}`,
        `Procura: ${answers.busca || '-'}`, `Momento: ${answers.momento || '-'}`,
        `Investimento: ${answers.investimento || '-'}`, `WhatsApp: ${answers.whatsapp || '-'}`, `E-mail: ${answers.email || '-'}`
      ].join('\n');
      window.open('https://wa.me/554892044331?text=' + encodeURIComponent(msg), '_blank', 'noopener');
      show(8, 1);
      if (bar) bar.style.width = '100%';
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = 'Solicitar consulta privada'; }
    }
  });

  /* entrada da página */
  if (hasGsap) {
    gsap.fromTo(steps[0].children, { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.09, delay: 0.15 });
  }
  setProgress();
})();
