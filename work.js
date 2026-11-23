const moreButton = document.querySelector('#load-more');
moreButton.addEventListener('click', () => {
  const extraCards = document.querySelectorAll('.extra-work[hidden]');
  extraCards.forEach(card => card.hidden = false);
  moreButton.textContent = extraCards.length ? '( SHOWING ALL WORKS )' : '( ALL WORKS SHOWN )';
  moreButton.disabled = true;
});
