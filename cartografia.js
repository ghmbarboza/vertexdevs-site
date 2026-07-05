/* Cartografia — submissão do lead para o CRM (vertex-core / site_consultas).
   Mesmo endpoint e payload do consulta.js; pagina_origem = "cartografia"
   para a Sessão B segmentar no Kanban. Nunca perde o lead: fallback WhatsApp. */
(() => {
  const form = document.getElementById('cgForm');
  if (!form) return;

  const SUPABASE_URL = 'https://kmgnjlcmswbbsntwdvef.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_9DJQOz3zsSm4s-WRkv31IA_Gu55pVCQ';
  const WA = 'https://wa.me/554892044331?text=';

  const val = (n) => (form.elements[n]?.value || '').trim();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('cgEnviar');
    const data = {
      nome: val('nome'),
      empresa: val('empresa'),
      whatsapp: val('whatsapp'),
      busca: val('busca'),
      momento: 'Solicitou Cartografia',
      investimento: 'Cartografia — R$ 7.500',
      user_agent: navigator.userAgent.slice(0, 250),
      pagina_origem: 'cartografia'
    };
    if (!data.nome || !data.empresa || !data.whatsapp) {
      form.reportValidity();
      return;
    }
    if (btn) { btn.disabled = true; btn.textContent = 'Registrando…'; }

    const done = () => {
      if (window.fbq) fbq('track', 'Lead', { content_name: 'cartografia' });
      form.style.display = 'none';
      const d = document.getElementById('cgDone');
      if (d) d.style.display = 'block';
    };

    try {
      const res = await fetch(SUPABASE_URL + '/rest/v1/site_consultas', {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': 'Bearer ' + SUPABASE_KEY,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('insert ' + res.status);
      done();
    } catch (err) {
      /* fallback: nunca perder o lead */
      const msg = [
        'Solicitação de Cartografia — vertexdevs.org', '',
        'Nome: ' + (data.nome || '-'),
        'Empresa: ' + (data.empresa || '-'),
        'WhatsApp: ' + (data.whatsapp || '-'),
        'Dor: ' + (data.busca || '-')
      ].join('\n');
      window.open(WA + encodeURIComponent(msg), '_blank', 'noopener');
      done();
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = 'Solicitar Cartografia'; }
    }
  });
})();
