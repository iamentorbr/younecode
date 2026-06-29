// YOUNE CODE — interações base
document.addEventListener('DOMContentLoaded', () => {

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .15 });
  revealEls.forEach(el => io.observe(el));

  // YC Score bars (passport page)
  const bars = document.querySelectorAll('.score-row .bar span');
  const ioBars = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        const val = e.target.getAttribute('data-value');
        e.target.style.width = val + '%';
        ioBars.unobserve(e.target);
      }
    });
  }, { threshold: .4 });
  bars.forEach(b => ioBars.observe(b));

  // Tabs (passport page)
  const tabBtns = document.querySelectorAll('.passport-tabs button');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');
      document.querySelectorAll('.passport-tabs button').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(target).classList.add('active');
    });
  });

  // active nav link
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav.main-nav a').forEach(a => {
    if(a.getAttribute('href') === path) a.classList.add('active');
  });
});
