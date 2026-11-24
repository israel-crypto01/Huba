const imageUrl = source => source.startsWith('./') ? source : `https://framerusercontent.com/images/${source}.jpg?width=1000&height=1125`;
const madeToMeasure = 'Hutengenezwa kwa vipimo maalum vinavyokubaliwa wakati wa michoro.';

const products = {
  duna: {
    name: 'Duna', type: 'Kiti cha mapumziko', category: 'Kiti',
    materials: 'Mwaloni na kamba asilia', dimensions: madeToMeasure,
    use: 'Kwa kupumzika, kusoma au kukaa sebuleni.',
    care: 'Futa vumbi kwa kitambaa laini na kikavu. Safisha kamba kwa upole.',
    image: '7QwiMFP658FPZCBFeHsjvfmUzM',
    description: 'Kiti kipana cha mapumziko chenye sehemu ya kukalia iliyosukwa kwa kamba. Kamba hulainika na kustarehesha zaidi kadiri kinavyotumika.'
  },
  spiral: {
    name: 'Spiral', type: 'Meza ya pembeni', category: 'Meza',
    materials: 'Mbao imara za walnut, zilizomaliziwa kwa mafuta', dimensions: madeToMeasure,
    use: 'Weka kando ya sofa au kiti kwa ajili ya kikombe, kitabu au mapambo madogo.',
    care: 'Futa kwa kitambaa laini. Mafuta ya kumalizia yanaweza kurejeshwa kwa kitambaa safi.',
    image: 'GKczgOV1dNvNQbwH0t3fus7kc',
    description: 'Meza ndogo yenye mguu uliochongwa kwa umbo la mzunguko. Imewekewa mafuta kwa mkono ili iwe rahisi kuitunza.'
  },
  linnea: {
    name: 'Linnea', type: 'Kabati la chini', category: 'Hifadhi',
    materials: 'Mwaloni uliotiwa moshi na kumaliziwa kwa mkono', dimensions: madeToMeasure,
    use: 'Hifadhi vyombo, vitabu na vitu vya nyumbani sebuleni au kwenye eneo la chakula.',
    care: 'Futa kwa kitambaa laini kisicho na unyevunyevu mwingi. Epuka kemikali kali.',
    image: 'QwzItM1ALLodd2bRaQGUtQg9xI',
    description: 'Kabati refu la mwaloni lenye milango inayofungwa kwa ulaini na viungio vya mbao vinavyoonekana.'
  },
  'arco-table': {
    name: 'Arco', type: 'Meza ya chakula', category: 'Meza',
    materials: 'Mwaloni wa Ulaya', dimensions: madeToMeasure,
    use: 'Kwa milo ya kila siku na kukusanyika na familia au marafiki.',
    care: 'Futa mara moja vinywaji vinavyomwagika. Tumia kitambaa laini na kinga ya meza inapohitajika.',
    image: 'Xm80uM6ku8EDVsWMJZBI9ddf4kQ',
    description: 'Meza imara ya mwaloni iliyoundwa kwa ajili ya milo ya pamoja. Vipimo hupangwa kulingana na nafasi na idadi ya watu.'
  },
  'arco-cabinet': {
    name: 'Arco', type: 'Kabati la chakula', category: 'Hifadhi',
    materials: 'Mwaloni wa Ulaya, uliomaliziwa kwa mkono', dimensions: madeToMeasure,
    use: 'Hifadhi vyombo, vitambaa vya meza na vifaa vingine vya eneo la chakula.',
    care: 'Futa kwa kitambaa laini na kikavu. Epuka kuweka vitu vyenye unyevunyevu juu yake kwa muda mrefu.',
    image: 'cjjYQtkkHqvfJ5DlC5ECGSIeXOA',
    description: 'Kabati linaloendana na meza ya Arco, lenye nafasi ya kuhifadhi vyombo na vifaa vya chakula.'
  },
  luna: {
    name: 'Luna', type: 'Kiti cha mapumziko', category: 'Kiti',
    materials: 'Mwaloni, umaliziaji wa asili na sehemu ya kukalia iliyosukwa', dimensions: 'Upana sentimita 78 x kina sentimita 82 x urefu sentimita 76',
    use: 'Kwa kusoma, kupumzika au kukaa sebuleni.',
    care: 'Futa fremu kwa kitambaa laini. Tunza sehemu iliyosukwa kwa kuondoa vumbi kwa upole.',
    image: 'rQKrEH1iTcY6Afm8nvIijCgsPug',
    description: 'Fremu ya mwaloni yenye umbo la mviringo na sehemu ya kukalia iliyosukwa kwa mkono.'
  },
  cala: {
    name: 'Cala', type: 'Kiti cha mapumziko', category: 'Kiti',
    materials: 'Mwaloni, kitambaa cha rangi ya krimu na fremu iliyosukwa', dimensions: 'Upana sentimita 74 x kina sentimita 80 x urefu sentimita 72',
    use: 'Kwa mapumziko ya muda mrefu sebuleni au kwenye kona ya kusomea.',
    care: 'Futa fremu kwa kitambaa laini. Safisha kitambaa kwa kufuata maelekezo ya aina yake.',
    image: 'IHYZNe4GVSFodEOmwyrd3bcaT4',
    description: 'Kiti chenye kitambaa cha krimu ndani ya fremu ya mwaloni iliyosukwa, chenye mwonekano mwepesi na starehe.'
  },
  olive: {
    name: 'Olive', type: 'Kiti cha mapumziko', category: 'Kiti',
    materials: 'Mwaloni, ngozi ya rangi ya mzeituni na fremu iliyosukwa', dimensions: 'Upana sentimita 82 x kina sentimita 86 x urefu sentimita 74',
    use: 'Kwa kukaa kwa starehe sebuleni au kwenye eneo la mapumziko.',
    care: 'Futa fremu kwa kitambaa laini. Tumia bidhaa maalum za kutunza ngozi kulingana na maelekezo yake.',
    image: 'X9YDXtefW0Rtkgy1gJbhCHN4tP4',
    description: 'Mchanganyiko wa ngozi ya rangi ya mzeituni na mwaloni. Ni kiti kipana kilichoundwa kwa matumizi ya muda mrefu.'
  },
  ribbon: {
    name: 'Ribbon', type: 'Kabati', category: 'Hifadhi',
    materials: 'Mwaloni wa asili, uliomaliziwa kwa mkono', dimensions: madeToMeasure,
    use: 'Kwa kuhifadhi vitu vya nyumbani huku likitumika pia kama samani ya mapambo.',
    care: 'Futa vumbi kwa kitambaa laini na kikavu. Epuka kemikali kali na unyevunyevu mwingi.',
    image: '3aJY7Li9xFEI1bUKOSfWIPfUQ8',
    description: 'Kabati la mwaloni lenye mikunjo ya sanifu inayolifanya lionekane kama kazi ya sanaa na samani ya hifadhi.'
  }
};

const galleryCategories = [
  { slug: 'kitanda', label: 'Kitanda', category: 'Vitanda', from: 3, to: 6, use: 'Kwa kulala na kupumzika chumbani.' },
  { slug: 'sofa', label: 'Sofa', category: 'Sofa', from: 7, to: 15, use: 'Kwa kukaa na kupumzika sebuleni.' },
  { slug: 'kiti', label: 'Kiti', category: 'Viti', from: 16, to: 22, use: 'Kwa kukaa nyumbani au kwenye eneo la mapumziko.' },
  { slug: 'kabati', label: 'Kabati', category: 'Makabati', from: 23, to: 29, use: 'Kwa kupanga na kuhifadhi vitu nyumbani.' },
  { slug: 'meza', label: 'Meza', category: 'Meza', from: 30, to: 37, use: 'Kwa matumizi ya kila siku sebuleni au eneo la chakula.' }
];

galleryCategories.forEach(group => {
  for (let number = group.from; number <= group.to; number++) {
    const id = String(number).padStart(2, '0');
    const key = `${group.slug}-${id}`;
    products[key] = {
      name: `${group.label} ${id}`,
      type: group.label,
      category: group.category,
      materials: 'Vifaa na umaliziaji huthibitishwa pamoja kabla ya utengenezaji.',
      dimensions: madeToMeasure,
      use: group.use,
      care: 'Futa kwa kitambaa laini. Maelekezo ya utunzaji hutegemea aina ya kifaa kitakachochaguliwa.',
      image: `./assets/portfolio/${group.slug}-${id}.webp`,
      description: `Muundo wa ${group.label.toLowerCase()} uliopo kwenye mkusanyiko wetu. Vipimo na vifaa hupangwa kulingana na nafasi na mahitaji yako.`,
      galleryEntry: true
    };
  }
});

const slug = new URLSearchParams(window.location.search).get('item');
const product = Object.prototype.hasOwnProperty.call(products, slug) ? products[slug] : null;

if (!product) {
  document.title = 'Bidhaa haijapatikana - HUBA FURNITURE DECORATION';
  document.querySelector('#product-missing').hidden = false;
} else {
  const fullName = product.galleryEntry ? product.name : `"${product.name}" ${product.type}`;
  document.title = `${fullName} - HUBA FURNITURE DECORATION`;
  document.querySelector('meta[name="description"]').setAttribute('content', `${fullName}: ${product.description}`);
  const image = document.querySelector('#product-img');
  image.src = imageUrl(product.image);
  image.alt = `${fullName}, ${product.materials}`;
  document.querySelector('#product-title').innerHTML = product.galleryEntry ? product.name : `"${product.name}"<br><em>${product.type}</em>`;
  document.querySelector('#product-desc').textContent = product.description;

  const specs = document.querySelector('#product-spec');
  [
    ['Aina', product.category],
    ['Vifaa', product.materials],
    ['Vipimo', product.dimensions],
    ['Matumizi', product.use],
    ['Utunzaji', product.care],
    ['Muda wa kutengeneza', 'Wiki 6-10 baada ya michoro kuidhinishwa']
  ].forEach(([label, value]) => {
    const row = document.createElement('div');
    const heading = document.createElement('strong');
    const detail = document.createElement('span');
    heading.textContent = label;
    detail.textContent = value;
    row.append(heading, detail);
    specs.append(row);
  });

  document.querySelector('#product').hidden = false;

  const relatedGrid = document.querySelector('#related-grid');
  Object.entries(products).filter(([key]) => key !== slug).slice(0, 3).forEach(([key, item]) => {
    const card = document.createElement('article');
    card.className = 'work-card';
    const link = document.createElement('a');
    link.className = 'work-photo';
    link.href = `./product.html?item=${key}`;
    const thumb = document.createElement('img');
    thumb.src = imageUrl(item.image);
    thumb.alt = `"${item.name}" ${item.type}`;
    thumb.loading = 'lazy';
    link.append(thumb);
    const meta = document.createElement('div');
    meta.className = 'work-meta';
    const title = document.createElement('h2');
    title.textContent = item.galleryEntry ? item.name : `"${item.name}" ${item.type}`;
    meta.append(title);
    card.append(link, meta);
    relatedGrid.append(card);
  });
  document.querySelector('#related').hidden = false;
}
