const CATEGORIES = ['lighting', 'beds', 'tables', 'chair', 'sofas', 'storage'];
const moreButton = document.querySelector('#load-more');
const moreWrap = document.querySelector('#load-more-wrap');
const cards = [...document.querySelectorAll('.work-card')];
const chips = [...document.querySelectorAll('.chip')];
const emptyState = document.querySelector('#empty-state');
let loadedAll = false;
let activeFilter = 'all';

function render() {
  const filtering = activeFilter !== 'all';
  let visible = 0;
  cards.forEach(card => {
    const matches = !filtering || card.dataset.category === activeFilter;
    card.classList.toggle('is-filtered-out', !matches);
    // Extra cards stay hidden until "Load more", unless a category filter is on:
    // then every matching piece should be visible.
    if (card.classList.contains('extra-work')) card.hidden = !(loadedAll || filtering);
    if (matches) visible += 1;
  });
  chips.forEach(chip => chip.setAttribute('aria-pressed', String(chip.dataset.filter === activeFilter)));
  emptyState.hidden = visible !== 0;
  moreWrap.hidden = filtering || loadedAll;
}

function setFilter(filter, updateUrl) {
  activeFilter = CATEGORIES.includes(filter) ? filter : 'all';
  render();
  if (updateUrl) {
    const url = new URL(window.location.href);
    if (activeFilter === 'all') url.searchParams.delete('category');
    else url.searchParams.set('category', activeFilter);
    history.replaceState(null, '', url);
  }
}

chips.forEach(chip => chip.addEventListener('click', () => setFilter(chip.dataset.filter, true)));

moreButton.addEventListener('click', () => {
  loadedAll = true;
  render();
});

setFilter(new URLSearchParams(window.location.search).get('category'), false);
