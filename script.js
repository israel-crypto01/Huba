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

/* ---------- Testimonials ---------- */
const testimonials = [
  { quote: 'Miaka mitatu sasa, meza hii bado ni kitu cha kwanza kila mgeni anachoulizia. Ilifanya sebule yote ya nyumba kueleweka na kupendeza.', name: 'Sophie Laurent', role: 'Makazi binafsi, Antwerp', image: 'https://framerusercontent.com/images/cqpXv4IVq6rbsUrYtdDpiZWynmA.jpg?width=250&height=250' },
  { quote: 'Meza ya chakula ilibadilisha kabisa muonekano wa nafasi yetu. Inavutia daima, ni imara, na imetengenezwa kwa umakini mkubwa. Kila undani uliguswa kwa ustadi.', name: 'Daniel Whitmore', role: 'Mwenye nyumba, London', image: 'https://framerusercontent.com/images/1NWVrOU9Ff0qLUt2PV6fnjRWqI.jpg?width=150&height=150' },
  { quote: 'Kuanzia kuchagua vifaa vinavyofaa hadi uwasilishaji, kila kitu kilienda kwa urahisi sana. Nyumba yetu sasa inahisiwa kuwa yetu haswa.', name: 'Amelia Rossi', role: 'Mbunifu majengo, Milan', image: 'https://framerusercontent.com/images/2IOJM5J2nWYHyJOPsNYksikrxbM.jpg?width=150&height=150' }
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

/* ---------- Category scroll: the next photo is revealed through a growing circle ---------- */
(function () {
  const copies = [...document.querySelectorAll('.room-copy')];
  const layers = [document.querySelector('#room-image'), document.querySelector('#room-image-next')];
  const counter = document.querySelector('#room-count');
  if (!copies.length || !layers[0] || !layers[1] || !counter) return;

  const photos = [
    { src: './assets/sofas.jpg', alt: 'Sofa laini ya rangi ya pembe katika sebule angavu' },
    { src: './assets/bedroom.jpg', alt: 'Chumba cha kulala tulivu chenye mashuka ya asili na mbao za joto' },
    { src: './assets/dining.jpg', alt: 'Chumba cha chakula chenye viti vilivyofunikwa kwa kitambaa' },
    { src: './assets/accent-chair.jpg', alt: 'Kiti cha mapambo chenye umbo la kisanii' },
    { src: './assets/lounge.jpg', alt: 'Kiti cha mapumziko katika chumba cha chakula chenye mwanga hafifu' }
  ];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const DURATION = 650;          // ms, the circle grows from the centre of the photo
  const EASING = 'cubic-bezier(.22, .8, .24, 1)';
  const FULL_RADIUS = 75;        // % of the box diagonal: enough to cover the corners

  let active = 0;                // item the text list currently highlights
  let shown = layers[0];         // layer that is fully visible
  let pending = null;            // reveal in progress: { animation, layer, previous }
  let token = 0;                 // ignores late image loads after a newer selection

  layers[0].style.zIndex = '1';
  layers[1].style.zIndex = '0';
  layers[1].style.visibility = 'hidden';

  function settle() {
    if (!pending) return;
    const { animation, layer, previous } = pending;
    pending = null;
    animation.cancel();
    previous.style.zIndex = '0';
    previous.style.visibility = 'hidden';
    layer.style.zIndex = '1';
    shown = layer;
  }

  function reveal(index) {
    settle();                    // finish any reveal still running, instantly
    const photo = photos[index];
    const incoming = shown === layers[0] ? layers[1] : layers[0];
    const myToken = ++token;
    incoming.src = photo.src;
    incoming.alt = photo.alt;
    const ready = incoming.decode ? incoming.decode().catch(() => {}) : Promise.resolve();
    ready.then(() => {
      if (myToken !== token) return;
      incoming.style.visibility = 'visible';
      if (reduceMotion.matches || !incoming.animate) {
        shown.style.zIndex = '0';
        shown.style.visibility = 'hidden';
        incoming.style.zIndex = '1';
        shown = incoming;
        return;
      }
      incoming.style.zIndex = '2';
      shown.style.zIndex = '1';
      const animation = incoming.animate(
        [{ clipPath: 'circle(0% at 50% 50%)' }, { clipPath: `circle(${FULL_RADIUS}% at 50% 50%)` }],
        { duration: DURATION, easing: EASING }
      );
      pending = { animation, layer: incoming, previous: shown };
      animation.onfinish = () => { if (pending && pending.animation === animation) settle(); };
    });
  }

  function select(index) {
    if (index < 0 || index >= photos.length || index === active) return;
    active = index;
    copies.forEach((copy, i) => copy.classList.toggle('is-active', i === index));
    counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(photos.length).padStart(2, '0')}`;
    reveal(index);
  }

  function syncFromScroll() {
    const focusLine = window.innerHeight * .45;
    let nearest = 0;
    let nearestDistance = Infinity;
    copies.forEach((copy, index) => {
      const rect = copy.getBoundingClientRect();
      const center = rect.top + Math.min(rect.height, window.innerHeight) * .35;
      const distance = Math.abs(center - focusLine);
      if (distance < nearestDistance) { nearestDistance = distance; nearest = index; }
    });
    select(nearest);
  }

  const observer = new IntersectionObserver(entries => {
    const hit = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => Math.abs(a.boundingClientRect.top + a.boundingClientRect.height * .35 - innerHeight * .45)
        - Math.abs(b.boundingClientRect.top + b.boundingClientRect.height * .35 - innerHeight * .45))[0];
    if (hit) select(copies.indexOf(hit.target));
  }, { rootMargin: '-35% 0px -35% 0px', threshold: 0 });
  copies.forEach(copy => observer.observe(copy));

  // Cover initial loads and browser-restored scroll positions.
  window.addEventListener('load', syncFromScroll, { once: true });
  window.addEventListener('pageshow', syncFromScroll);
  window.addEventListener('resize', syncFromScroll, { passive: true });
})();
