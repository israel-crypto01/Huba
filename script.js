// Home page behaviour. (Menu toggle lives in site.js; the old catalogue filter
// code was removed because neither page has .filter buttons any more.)

/* ---------- Hero: scroll-driven chair ---------- */
(function () {
  const track = document.querySelector('.hero-object-track');
  const stage = document.querySelector('.hero-object-stage');
  if (!track || !stage) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let ticking = false;

  function update() {
    ticking = false;
    if (reduceMotion.matches) return;
    const rect = track.getBoundingClientRect();
    const distance = track.offsetHeight - stage.offsetHeight;
    const progress = distance > 0 ? Math.min(1, Math.max(0, -rect.top / distance)) : 0;
    stage.style.setProperty('--chair-y', `${(progress * -6).toFixed(2)}vh`);
    stage.style.setProperty('--chair-rot', `${(-14 + progress * 28).toFixed(2)}deg`);
    stage.style.setProperty('--chair-scale', (1 + progress * 0.1).toFixed(3));
    stage.style.setProperty('--page-depth', `${(progress * -70).toFixed(1)}px`);
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
})();

/* ---------- Studio strip: endless category marquee ---------- */
(function () {
  const track = document.querySelector('.cat-track');
  const group = track && track.querySelector('.cat-group');
  if (!track || !group) return;
  const SPEED = 55; // pixels per second

  function build() {
    // Reset to a single group, then clone until two identical halves each cover the viewport.
    track.querySelectorAll('.cat-group[data-clone]').forEach(node => node.remove());
    const width = group.getBoundingClientRect().width;
    if (!width) return;
    let copies = 2;
    while (width * (copies / 2) < window.innerWidth * 1.2) copies += 2;
    for (let i = 1; i < copies; i += 1) {
      const clone = group.cloneNode(true);
      clone.dataset.clone = 'true';
      clone.setAttribute('aria-hidden', 'true');
      clone.querySelectorAll('a').forEach(link => link.setAttribute('tabindex', '-1'));
      track.append(clone);
    }
    track.style.setProperty('--cat-duration', `${((width * copies) / 2 / SPEED).toFixed(1)}s`);
  }

  let resizeTimer;
  window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(build, 200); });
  window.addEventListener('load', build, { once: true });
  build();
})();

/* ---------- Lounge chair showcase carousel ---------- */
(function () {
  const track = document.querySelector('#showcase-track');
  const prev = document.querySelector('#showcase-prev');
  const next = document.querySelector('#showcase-next');
  if (!track || !prev || !next) return;
  const step = () => {
    const card = track.querySelector('.showcase-card');
    return card ? card.getBoundingClientRect().width + 20 : track.clientWidth * 0.8;
  };
  const behavior = () => (window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth');
  prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: behavior() }));
  next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: behavior() }));
  track.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') { event.preventDefault(); next.click(); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); prev.click(); }
  });
})();

/* ---------- Follow-along slider ---------- */
const testimonials = [
  { quote: '1,856 posts of furniture, interior design and decoration. See what we have been up to.', name: '@huba_furniture_decoration', role: 'Instagram · 72.6K followers', image: './assets/logo.png' },
  { quote: 'Send us a message, a photo or a size, and we will reply with options and prices.', name: 'Order on WhatsApp', role: 'Fast replies, easy ordering', image: './assets/logo.png' },
  { quote: 'Furniture of all kinds. High quality, affordable prices, and offices in Keko.', name: 'Huba Furniture Decoration', role: 'Keko, Dar es Salaam', image: './assets/logo.png' }
];
let activeTestimonial = 0;
function showTestimonial(index) {
  activeTestimonial = (index + testimonials.length) % testimonials.length;
  const item = testimonials[activeTestimonial];
  document.querySelector('#testimonial-quote').textContent = item.quote;
  document.querySelector('#testimonial-name').textContent = item.name;
  document.querySelector('#testimonial-role').textContent = item.role;
  document.querySelector('.testimonial-person img').src = item.image;
  document.querySelector('.testimonial-person img').alt = item.name;
  document.querySelector('.testimonial-count').textContent = `0${activeTestimonial + 1} / 0${testimonials.length}`;
}
document.querySelector('#testimonial-prev').addEventListener('click', () => showTestimonial(activeTestimonial - 1));
document.querySelector('#testimonial-next').addEventListener('click', () => showTestimonial(activeTestimonial + 1));

/* ---------- Catalogue: photo follows the scroll ---------- */
const roomPhotos = [
  { src: './assets/sofas.jpg', alt: 'Soft ivory sofa in a bright living room' },
  { src: './assets/bedroom.jpg', alt: 'Calm bedroom with natural linens and warm wood' },
  { src: './assets/dining.jpg', alt: 'Sculptural dining room with upholstered chairs' },
  { src: './assets/accent-chair.jpg', alt: 'Sculptural upholstered accent chair' },
  { src: './assets/lounge.jpg', alt: 'Lounge chair in a softly lit dining room' }
];
const roomCopies = [...document.querySelectorAll('.room-copy')];
const roomImage = document.querySelector('#room-image');
const roomImageNext = document.querySelector('#room-image-next');
const roomCounter = document.querySelector('#room-count');
let activeRoom = 0;
let visibleRoomImage = roomImage;
function selectRoom(index) {
  if (index < 0 || index >= roomPhotos.length || index === activeRoom) return;
  activeRoom = index;
  roomCopies.forEach((copy, i) => copy.classList.toggle('is-active', i === index));
  const incomingImage = visibleRoomImage === roomImage ? roomImageNext : roomImage;
  incomingImage.classList.remove('is-visible');
  incomingImage.onload = () => {
    incomingImage.classList.add('is-visible');
    visibleRoomImage.classList.remove('is-visible');
    visibleRoomImage = incomingImage;
  };
  incomingImage.onerror = () => incomingImage.classList.add('is-visible');
  incomingImage.src = roomPhotos[index].src;
  incomingImage.alt = roomPhotos[index].alt;
  if (incomingImage.complete && incomingImage.naturalWidth) incomingImage.onload();
  roomCounter.textContent = `${String(index + 1).padStart(2, '0')} / 05`;
}
function syncRoomFromScroll() {
  const focusLine = window.innerHeight * .45;
  let nearest = 0;
  let nearestDistance = Infinity;
  roomCopies.forEach((copy, index) => {
    const rect = copy.getBoundingClientRect();
    const center = rect.top + Math.min(rect.height, window.innerHeight) * .35;
    const distance = Math.abs(center - focusLine);
    if (distance < nearestDistance) { nearestDistance = distance; nearest = index; }
  });
  selectRoom(nearest);
}
const roomObserver = new IntersectionObserver(entries => {
  const activeEntry = entries
    .filter(entry => entry.isIntersecting)
    .sort((a, b) => Math.abs(a.boundingClientRect.top + a.boundingClientRect.height * .35 - innerHeight * .45)
      - Math.abs(b.boundingClientRect.top + b.boundingClientRect.height * .35 - innerHeight * .45))[0];
  if (activeEntry) selectRoom(roomCopies.indexOf(activeEntry.target));
}, { rootMargin: '-35% 0px -35% 0px', threshold: 0 });
roomCopies.forEach(copy => roomObserver.observe(copy));
// Cover initial loads and browser-restored scroll positions, where the observer
// may not report the currently visible section immediately.
window.addEventListener('load', syncRoomFromScroll, { once: true });
window.addEventListener('pageshow', syncRoomFromScroll);
window.addEventListener('resize', syncRoomFromScroll, { passive: true });
