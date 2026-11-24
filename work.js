// work.js — Filter chips for Kazi Zetu catalogue page

(function () {
  const chips = document.querySelectorAll('.filter-bar .chip');
  const cards = document.querySelectorAll('.cat-card');
  const emptyState = document.getElementById('empty-state');
  const resetLink = document.getElementById('reset-filter');

  function applyFilter(filter) {
    let visible = 0;
    cards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-filtered-out', !match);
      if (match) visible++;
    });
    if (emptyState) emptyState.hidden = visible > 0;
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.setAttribute('aria-pressed', 'false'));
      chip.setAttribute('aria-pressed', 'true');
      applyFilter(chip.dataset.filter);
    });
  });

  if (resetLink) {
    resetLink.addEventListener('click', (e) => {
      e.preventDefault();
      chips.forEach(c => c.setAttribute('aria-pressed', c.dataset.filter === 'all' ? 'true' : 'false'));
      applyFilter('all');
    });
  }
})();
