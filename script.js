const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
if (menuToggle && nav) {
menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  menuToggle.textContent = isOpen ? '×' : '☰';
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));
}

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('.filter.active')?.classList.remove('active');
    button.classList.add('active');
    const category = button.dataset.filter;
    document.querySelectorAll('#catalogue-grid .product-card').forEach(card => {
      card.classList.toggle('hidden', category !== 'All' && card.dataset.category !== category);
    });
  });
});

const testimonials = [
  { quote: 'Three years on, the table is still the first thing every guest asks about. It made the whole apartment make sense.', name: 'Sophie Laurent', role: 'Private residence, Antwerp', image: 'https://framerusercontent.com/images/cqpXv4IVq6rbsUrYtdDpiZWynmA.jpg?width=250&height=250' },
  { quote: 'The dining table completely transformed our space. It feels timeless, solid, and beautifully made. You can tell every detail was considered.', name: 'Daniel Whitmore', role: 'Homeowner, London', image: 'https://framerusercontent.com/images/1NWVrOU9Ff0qLUt2PV6fnjRWqI.jpg?width=150&height=150' },
  { quote: 'From choosing the right pieces to delivery, everything felt effortless. Our home feels truly ours.', name: 'Amelia Rossi', role: 'Architect, Milan', image: 'https://framerusercontent.com/images/2IOJM5J2nWYHyJOPsNYksikrxbM.jpg?width=150&height=150' }
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
let roomTransitionTimer;
function selectRoom(index) {
  if (index < 0 || index >= roomPhotos.length || index === activeRoom) return;
  activeRoom = index;
  roomCopies.forEach((copy, i) => copy.classList.toggle('is-active', i === index));
  window.clearTimeout(roomTransitionTimer);
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


