// =============================================
// BSM Advogados — Script
// Este arquivo contém:
// - Setup do ano no rodapé
// - Revelação de elementos na rolagem (IntersectionObserver)
// - Contadores animados na seção de premiações
// - Rolagem suave para links de âncora do navbar
// =============================================

// 1) Ano dinâmico no rodapé
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// 2) IntersectionObserver para revelar elementos (.reveal)
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      revealObserver.unobserve(entry.target); // evita reprocessar
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// 3) Contadores animados (elementos com .counter e data-target="N")
const counters = document.querySelectorAll('.counter');

function runCounter(el) {
  const target = +el.getAttribute('data-target');
  let value = 0;
  // passo proporcional para suavidade
  const step = Math.max(1, Math.floor(target / 80));

  function tick() {
    value += step;
    if (value >= target) { value = target; }
    el.textContent = value;
    if (value < target) requestAnimationFrame(tick);
  }
  tick();
}

// Observa os contadores quando entram na tela
const countersObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      runCounter(entry.target);
      countersObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

counters.forEach(c => countersObserver.observe(c));

// 4) Rolagem suave ao clicar no navbar (SPA-like)
document.querySelectorAll('a.nav-link').forEach(a => {
  a.addEventListener('click', (ev) => {
    const href = a.getAttribute('href');
    if (href && href.startsWith('#')) {
      ev.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Fecha o menu no mobile após clicar
      const opened = document.querySelector('.navbar-collapse.show');
      if (opened && typeof bootstrap !== 'undefined') {
        new bootstrap.Collapse(opened).hide();
      }
    }
  });
});
