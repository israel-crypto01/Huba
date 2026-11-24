const POSTS = {
  'natural-materials-warmth': {
    title: 'How natural materials bring warmth into modern interiors', category: 'Tables', image: './assets/dining-room.jpg',
    paragraphs: [
      'A modern room is often clean, pale and precise. That is a good start, but it can feel cool unless something in it shows the mark of a hand or the grain of a tree.',
      'Solid timber does that quietly. Oak, walnut and ash all carry growth lines, small colour shifts and a surface that changes in the light through the day. An oiled finish keeps that texture visible instead of sealing it under gloss.',
      'You do not need many pieces. One table or one chair in a natural material, set against plain walls, is usually enough to make a whole room feel lived in.'
    ]
  },
  'calm-bedroom': {
    title: 'Creating a calm bedroom with natural materials', category: 'Beds', image: './assets/bedroom.jpg',
    paragraphs: [
      'A bedroom works best when nothing in it asks for your attention. Calm comes from a small palette, soft edges and materials that feel good against the skin.',
      'Start with the bed, because it sets the proportions for everything else. A solid wood frame with simple joinery looks settled, and it ages well. Pair it with linen, wool and cotton in warm neutrals.',
      'Keep surfaces clear, give each piece room to breathe, and let one wooden object, a bedside table or a bench, carry the warmth.'
    ]
  },
  'choosing-a-lounge-chair': {
    title: 'How to choose the right lounge chair for your space', category: 'Chair', image: './assets/accent-chair.jpg',
    paragraphs: [
      'Begin with how you will use it. A chair for an hour of reading wants a supportive back and a slightly upright seat. A chair for stretching out wants depth and a lower angle.',
      'Then look at the room. Measure the corner it will sit in and leave space to walk around it. A chair with open arms or a woven frame looks lighter in a small room than a solid, upholstered block.',
      'Finally, sit in it for longer than a minute. Comfort shows up after ten, and a good maker will happily let you stay.'
    ]
  },
  'choosing-a-dining-table': {
    title: 'The art of choosing a dining table', category: 'Tables', image: './assets/dining.jpg',
    paragraphs: [
      'A dining table is the piece a home gathers around, so it is worth getting the size right. Allow about sixty centimetres of width per person and at least a metre of clear space behind each chair.',
      'Shape matters too. Rectangles seat the most people, rounds make conversation easier, and an oval softens a narrow room.',
      'Choose solid timber if you can. It can be sanded and re-oiled when life leaves its marks, and over the years those marks become part of the table.'
    ]
  },
  'lighting-and-atmosphere': {
    title: 'How lighting changes the atmosphere of a room', category: 'Lighting', image: './assets/lamp.jpg',
    paragraphs: [
      'The same room can feel bright and busy at noon and soft and private at night, and the only difference is the light. Think in layers: ambient light for the whole room, task light where you read or work, and accent light for mood.',
      'Warm bulbs make wood and fabric glow, while cool ones flatten them. Low lamps, at table or shoulder height, create pools of light and make a room feel smaller, in the best way.',
      'Whatever you choose, give each light its own switch or dimmer. Being able to turn the room down is half the atmosphere.'
    ]
  },
  'storage-that-belongs': {
    title: 'Storage that belongs naturally in the interior', category: 'Storage', image: './assets/storage.jpg',
    paragraphs: [
      'The best storage does not look like storage. A credenza or cabinet in good timber reads as furniture first, which means it can sit in a living room, a hallway or a dining room without apology.',
      'Plan what it needs to hold before you plan how it looks: depth for plates, height for glasses, drawers for the small things. Then let the proportions and the wood do the rest.',
      'Leave one surface open for a lamp, a bowl or a book. A piece that is partly storage and partly display is the one that makes a room feel finished.'
    ]
  }
};

const slug = new URLSearchParams(window.location.search).get('slug');
const post = Object.prototype.hasOwnProperty.call(POSTS, slug) ? POSTS[slug] : null;

if (!post) {
  document.title = 'Post not found — HUBA FURNITURE DECORATION';
  document.querySelector('#post-missing').hidden = false;
} else {
  document.title = `${post.title} — HUBA FURNITURE DECORATION`;
  document.querySelector('meta[name="description"]').setAttribute('content', post.paragraphs[0]);
  document.querySelector('#post-category').textContent = `( ${post.category} )`;
  document.querySelector('#post-title').textContent = post.title;
  const image = document.querySelector('#post-image');
  image.src = post.image;
  image.alt = post.title;
  const body = document.querySelector('#post-body');
  post.paragraphs.forEach(text => {
    const p = document.createElement('p');
    p.textContent = text;
    body.append(p);
  });
  document.querySelector('#post').hidden = false;
}
