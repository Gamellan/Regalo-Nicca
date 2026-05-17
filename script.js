/* =========================================
   PHOTOS LIST  (alphabetical order)
   ========================================= */
const photos = [
  '0.jpeg', '0-a.jpeg',   '2.jpeg',  '3.jpeg',  '4.jpeg',  '5.jpeg',
  '6.jpeg',  '7.jpeg',  '8.jpeg',   '8-a.jpeg',  '9.jpeg',  '9-b.jpeg',
  '9-a.jpeg',  '16.jpeg',  '10.jpeg',  '15.jpeg',  '14.jpeg',  '18.jpeg',
  '19.jpeg',  '20.jpeg',  '22.jpeg',  '23.jpeg',  '24.jpeg',  '25.jpeg',
  '26.jpeg',  '27.jpeg',  '28.jpeg',  '30.jpeg',   '31.jpeg',
  '32.jpeg',  '33.jpeg',  '34.jpeg',  '35.jpeg',  '36.jpeg',  '37.jpeg',
  '38.jpeg',  '39.jpeg',  '40.jpeg',   '41.jpeg',  '42.jpeg',  '43.jpeg',
  '44.jpeg',  '45.jpeg',  '46.jpeg',   '47.jpeg',  '48.jpeg',
  '51.jpeg',  '52.jpeg',   '53.jpeg',  '54.jpeg'
];

/* =========================================
   PHRASES  — keyed by photo index (0-based)
   Distributed evenly across the 56 photos
   ========================================= */
const phrases = {
  0: "It's already been a year since we first saw each other",
  7: "I fell in love with you because of the way you treat me, with so much love and tenderness",
  12: "I didn't hesitate for a minute to marry you",
  19: "I hit the jackpot when I met you",
  27: "We have shared so many great moments together",
  31: "We have visited so many beautiful places together",
  37: "Every minute with you is worth an eternity without you",
  43: "You are the love of my life",
  49: "Thanks for loving me and making me the happiest man in the world"
};

/* =========================================
   BUILD GALLERY
   ========================================= */
const gallery = document.getElementById('gallery');

photos.forEach((filename, index) => {
  const slide = document.createElement('section');
  slide.className = 'photo-slide';

  // Image
  const img = document.createElement('img');
  img.src     = `Fotos/${filename}`;
  img.alt     = '';
  img.loading = index < 2 ? 'eager' : 'lazy';
  img.decoding = 'async';
  slide.appendChild(img);

  // Counter badge
  const counter = document.createElement('div');
  counter.className   = 'photo-counter';
  counter.textContent = `${index + 1} / ${photos.length}`;
  slide.appendChild(counter);

  // Phrase overlay (only on selected slides)
  if (phrases[index] !== undefined) {
    const overlay = document.createElement('div');
    overlay.className = 'photo-overlay';

    const ornament = document.createElement('div');
    ornament.className   = 'phrase-ornament';
    ornament.textContent = '✦';

    const p = document.createElement('p');
    p.className   = 'photo-phrase';
    p.textContent = phrases[index];

    const heart = document.createElement('span');
    heart.className   = 'phrase-heart';
    heart.textContent = '❤️';

    overlay.appendChild(ornament);
    overlay.appendChild(p);
    overlay.appendChild(heart);
    slide.appendChild(overlay);
  }

  gallery.appendChild(slide);
});

/* =========================================
   INTERSECTION OBSERVER — slide animations
   ========================================= */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) target.classList.add('visible');
    });
  },
  { threshold: 0.35 }
);

document.querySelectorAll('.photo-slide, #outro').forEach(el => observer.observe(el));

/* =========================================
   FLOATING HEARTS  (intro & outro)
   ========================================= */
const HEART_CHARS = ['❤️', '💕', '💖', '💗', '💝'];

function spawnFloatingHearts(containerId, count) {
  const container = document.getElementById(containerId);
  if (!container) return;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className   = 'floating-heart';
    el.textContent = HEART_CHARS[Math.floor(Math.random() * HEART_CHARS.length)];
    el.style.left            = `${Math.random() * 100}%`;
    el.style.fontSize        = `${0.6 + Math.random() * 1.4}rem`;
    el.style.animationDuration = `${5 + Math.random() * 8}s`;
    el.style.animationDelay    = `${Math.random() * 7}s`;
    container.appendChild(el);
  }
}

spawnFloatingHearts('hearts-intro', 20);
spawnFloatingHearts('hearts-outro', 20);

/* =========================================
   TAP / CLICK BURST EFFECT
   ========================================= */
const BURST_CHARS = ['❤️', '💕', '💖', '💗', '🌹', '✨'];

function createBurst(clientX, clientY) {
  const count = 10;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className   = 'burst-heart';
    el.textContent = BURST_CHARS[Math.floor(Math.random() * BURST_CHARS.length)];

    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
    const dist  = 45 + Math.random() * 75;
    const tx    = Math.cos(angle) * dist;
    const ty    = Math.sin(angle) * dist - 20;

    el.style.left     = `${clientX}px`;
    el.style.top      = `${clientY}px`;
    el.style.fontSize = `${0.8 + Math.random() * 0.9}rem`;
    el.style.setProperty('--tx', `${tx}px`);
    el.style.setProperty('--ty', `${ty}px`);

    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove(), { once: true });
  }
}

document.addEventListener('click', (e) => {
  createBurst(e.clientX, e.clientY);
});
