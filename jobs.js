(function(){
  const form = document.getElementById('jobs-form');
  const emailBtn = document.getElementById('send-email');
  const waBtn = document.getElementById('send-wa');

  function buildMessage(){
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const tel = document.getElementById('telefone').value.trim();
    const linkedin = document.getElementById('linkedin').value.trim();
    const cv = document.getElementById('curriculo_link').value.trim();

    let msg = `Nova candidatura (Trabalhe Conosco)%0A%0A` +
              `Nome: ${nome}%0A` +
              `E-mail: ${email}%0A` +
              `Telefone: ${tel}%0A` +
              `LinkedIn: ${linkedin || '—'}%0A` +
              `Currículo (link): ${cv || '—'}`;
    return msg;
  }

  emailBtn?.addEventListener('click', (e)=>{
    e.preventDefault();
    if(!form.reportValidity()) return;
    const msg = buildMessage();
    const subject = encodeURIComponent('Candidatura — Trabalhe Conosco (BSM)');
    const mail = `mailto:contato@bsm.adv?subject=${subject}&body=${msg}`;
    window.location.href = mail;
  });

  waBtn?.addEventListener('click', (e)=>{
    e.preventDefault();
    if(!form.reportValidity()) return;
    const msg = buildMessage();
    const wa = `https://wa.me/5500000000000?text=${msg}`; // troque pelo número oficial
    window.open(wa, '_blank');
  });
})();