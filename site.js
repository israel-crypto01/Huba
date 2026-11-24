// Shared across every page: mobile menu toggle.
(function () {
  const toggle = document.querySelector('.top-toggle');
  const menu = document.querySelector('#top-menu');
  if (!toggle || !menu) return;

  function setOpen(open) {
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Funga menyu' : 'Fungua menyu');
    toggle.textContent = open ? '×' : '☰';
  }

  toggle.addEventListener('click', () => setOpen(!menu.classList.contains('open')));
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') setOpen(false); });
  window.matchMedia('(min-width: 801px)').addEventListener('change', event => { if (event.matches) setOpen(false); });
})();
