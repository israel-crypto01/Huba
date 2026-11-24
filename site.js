// Shared across every page: mobile menu toggle.
(function () {
  const toggle = document.querySelector('.top-toggle');
  const menu = document.querySelector('#top-menu');
  if (!toggle || !menu) return;

  function setOpen(open) {
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    toggle.textContent = open ? '×' : '☰';
  }

  toggle.addEventListener('click', () => setOpen(!menu.classList.contains('open')));
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') setOpen(false); });
  window.matchMedia('(min-width: 801px)').addEventListener('change', event => { if (event.matches) setOpen(false); });
})();

// Floating "Order on WhatsApp" button on every page.
(function () {
  if (document.querySelector('.wa-float')) return;
  const link = document.createElement('a');
  link.className = 'wa-float';
  link.href = 'https://wa.me/message/7TASPGWT6H77O1';
  link.target = '_blank';
  link.rel = 'noopener';
  link.textContent = 'Order on WhatsApp ↗';
  document.body.append(link);
})();
