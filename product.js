const IMG = id => `https://framerusercontent.com/images/${id}.jpg?width=1000&height=1125`;
const MADE_TO_MEASURE = 'Made to measure — agreed at the drawings stage';

const PRODUCTS = {
  duna: { name: 'Duna', type: 'Lounge Chair', price: '$3,200', category: 'Chair', materials: 'Oak · Natural cord', dims: MADE_TO_MEASURE, img: '7QwiMFP658FPZCBFeHsjvfmUzM', desc: 'A low, generous lounge chair with a corded seat that softens with every year of use.' },
  spiral: { name: 'Spiral', type: 'Side Table', price: '$1,450', category: 'Table', materials: 'Solid walnut · Oil finish', dims: MADE_TO_MEASURE, img: 'GKczgOV1dNvNQbwH0t3fus7kc', desc: 'A small table with a carved, spiralling base, finished in hand-rubbed oil so it can always be touched up with a cloth.' },
  linnea: { name: 'Linnea', type: 'Credenza', price: '$6,800', category: 'Storage', materials: 'Smoked oak · Hand-finished', dims: MADE_TO_MEASURE, img: 'QwzItM1ALLodd2bRaQGUtQg9xI', desc: 'A long, quiet credenza in smoked oak, with joinery you can see and doors that close with a soft click.' },
  'arco-table': { name: 'Arco', type: 'Dining Table', price: '$5,400', category: 'Table', materials: 'European oak · 6–8 seats', dims: MADE_TO_MEASURE, img: 'Xm80uM6ku8EDVsWMJZBI9ddf4kQ', desc: 'A solid oak dining table built around long meals and good company, sized to your room and your guest list.' },
  'arco-cabinet': { name: 'Arco', type: 'Dining Cabinet', price: '$4,900', category: 'Storage', materials: 'European oak · Hand-finished', dims: MADE_TO_MEASURE, img: 'cjjYQtkkHqvfJ5DlC5ECGSIeXOA', desc: 'The companion to the Arco table: a dining cabinet for glass, linen and everything else the table needs close by.' },
  luna: { name: 'Luna', type: 'Lounge Chair', price: '$3,850', category: 'Chair', materials: 'Oak · Natural finish · Woven seat · Hand-finished', dims: 'W 78 × D 82 × H 76 cm', img: 'rQKrEH1iTcY6Afm8nvIijCgsPug', desc: 'A rounded oak frame with a hand-woven seat, made for reading and for doing nothing at all.' },
  cala: { name: 'Cala', type: 'Lounge Chair', price: '$3,600', category: 'Chair', materials: 'Oak · Cream upholstery · Woven frame · Hand-finished', dims: 'W 74 × D 80 × H 72 cm', img: 'IHYZNe4GVSFodEOmwyrd3bcaT4', desc: 'Cream upholstery set into a woven oak frame: light to look at, and deeply comfortable to sit in.' },
  olive: { name: 'Olive', type: 'Lounge Chair', price: '$4,200', category: 'Chair', materials: 'Oak · Olive leather · Woven frame · Hand-finished', dims: 'W 82 × D 86 × H 74 cm', img: 'X9YDXtefW0Rtkgy1gJbhCHN4tP4', desc: 'Olive leather and oak, the largest of our lounge chairs, and the one that ages best.' },
  ribbon: { name: 'Ribbon', type: 'Cabinet', price: '$4,900', category: 'Storage', materials: 'Natural oak · Hand-finished', dims: MADE_TO_MEASURE, img: '3aJY7Li9xFEI1bUKOSfWIPfUQ8', desc: 'A sculptural oak cabinet whose curved lines make it feel more like an object than a piece of storage.' }
};

const slug = new URLSearchParams(window.location.search).get('item');
const product = Object.prototype.hasOwnProperty.call(PRODUCTS, slug) ? PRODUCTS[slug] : null;

if (!product) {
  document.title = 'Piece not found — HUBA FURNITURE DECORATION';
  document.querySelector('#product-missing').hidden = false;
} else {
  const fullName = `“${product.name}” ${product.type}`;
  document.title = `${fullName} — HUBA FURNITURE DECORATION`;
  document.querySelector('meta[name="description"]').setAttribute('content', `${fullName}: ${product.desc}`);
  const img = document.querySelector('#product-img');
  img.src = IMG(product.img);
  img.alt = `${fullName}, ${product.materials}`;
  document.querySelector('#product-title').innerHTML = `“${product.name}”<br><em>${product.type}</em>`;
  document.querySelector('#product-price').textContent = product.price;
  document.querySelector('#product-desc').textContent = product.desc;
  const spec = document.querySelector('#product-spec');
  [['Category', product.category], ['Materials', product.materials], ['Dimensions', product.dims], ['Lead time', '6–10 weeks from approved drawings']].forEach(([label, value]) => {
    const row = document.createElement('div');
    const strong = document.createElement('strong');
    strong.textContent = label;
    const span = document.createElement('span');
    span.textContent = value;
    row.append(strong, span);
    spec.append(row);
  });
  document.querySelector('#product-enquire').href = `./contact.html?piece=${encodeURIComponent(fullName)}`;
  document.querySelector('#product').hidden = false;

  const grid = document.querySelector('#related-grid');
  Object.entries(PRODUCTS).filter(([key]) => key !== slug).slice(0, 3).forEach(([key, item]) => {
    const card = document.createElement('article');
    card.className = 'work-card';
    const link = document.createElement('a');
    link.className = 'work-photo';
    link.href = `./product.html?item=${key}`;
    const thumb = document.createElement('img');
    thumb.src = IMG(item.img);
    thumb.alt = `${item.name} ${item.type}`;
    thumb.loading = 'lazy';
    link.append(thumb);
    const meta = document.createElement('div');
    meta.className = 'work-meta';
    const title = document.createElement('h2');
    title.textContent = `“${item.name}” ${item.type}`;
    const price = document.createElement('span');
    price.textContent = item.price;
    meta.append(title, price);
    card.append(link, meta);
    grid.append(card);
  });
  document.querySelector('#related').hidden = false;
}
