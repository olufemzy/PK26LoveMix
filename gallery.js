
// ══════════════════════════════════════════════
// PHOTO DATA
// Replace src values with real photo paths/URLs
// e.g. src: './photos/prewedding-01.jpg'
// ══════════════════════════════════════════════
const photos = [
  // Row 1 photos
  { src: 'images/POR 29.jpeg', label: 'Golden Hour', size: 'tall',  row: 1, gradient: 'linear-gradient(135deg,#c9a96e22,#6b1a2b44)', icon: '🌅' },
  { src: 'images/POR 30.jpeg', label: 'Just Us',     size: 'tall',  row: 1, gradient: 'linear-gradient(135deg,#6b1a2b44,#4a0f1c88)', icon: '💑' },
  { src: 'images/POR 31.jpeg', label: 'First Look',  size: 'tall',    row: 1, gradient: 'linear-gradient(135deg,#4a0f1c66,#c9a96e33)', icon: '👀' },
  { src: 'images/POR 32.jpeg', label: 'Laughter',    size: 'tall',  row: 1, gradient: 'linear-gradient(135deg,#8b2a3f44,#2d101866)', icon: '😄' },
  { src: 'images/POR 33.jpeg', label: 'The Ring',    size: 'tall',    row: 1, gradient: 'linear-gradient(135deg,#c9a96e44,#6b1a2b55)', icon: '💍' },
  { src: 'images/POR 34.jpeg', label: 'Together',    size: 'tall',  row: 1, gradient: 'linear-gradient(135deg,#6b1a2b55,#4a0f1c77)', icon: '🤝' },
  { src: 'images/POR 35.jpeg', label: 'In Love',     size: 'tall',  row: 1, gradient: 'linear-gradient(135deg,#2d1018aa,#c9a96e22)', icon: '❤️' },
  { src: 'images/POR 36.jpeg', label: 'Rooftop',     size: 'tall',  row: 1, gradient: 'linear-gradient(135deg,#4a0f1c88,#8b2a3f44)', icon: '🏙️' },
  { src: 'images/POR 37.jpeg', label: 'Candid',   size: 'tall',  row: 1, gradient: 'linear-gradient(135deg,#6b1a2b33,#c9a96e44)', icon: '🚶' },

  // Row 2 photos
//   { src: null, label: 'Candid',   size: 'wide',  row: 2, gradient: 'linear-gradient(135deg,#6b1a2b33,#c9a96e44)', icon: '🚶' },
//   { src: null, label: 'Whispers',    size: 'tall',  row: 2, gradient: 'linear-gradient(135deg,#4a0f1c66,#8b2a3f44)', icon: '🤫' },
//   { src: null, label: 'Sunset',      size: 'sq',    row: 2, gradient: 'linear-gradient(135deg,#c9a96e55,#6b1a2b66)', icon: '🌇' },
//   { src: null, label: 'Forever',     size: 'port',  row: 2, gradient: 'linear-gradient(135deg,#2d101888,#c9a96e33)', icon: '♾️' },
//   { src: null, label: 'Our City',    size: 'tall',  row: 2, gradient: 'linear-gradient(135deg,#8b2a3f55,#4a0f1c77)', icon: '🌆' },
//   { src: null, label: 'Strolling',      size: 'wide',  row: 2, gradient: 'linear-gradient(135deg,#6b1a2b66,#c9a96e22)', icon: '📷' },
//   { src: null, label: 'Promise',     size: 'sq',    row: 2, gradient: 'linear-gradient(135deg,#4a0f1c55,#6b1a2b77)', icon: '🤞' },
//   { src: null, label: 'Bliss',       size: 'port',  row: 2, gradient: 'linear-gradient(135deg,#c9a96e33,#2d101888)', icon: '✨' },
];

// All photos (rows combined) for lightbox navigation
let allSrcs = [];
let currentLbIdx = 0;

function buildCard(photo, idx) {
  const card = document.createElement('div');
  card.className = `photo-card ${photo.size}`;
  card.dataset.idx = idx;

  const inner = document.createElement('div');
  inner.className = 'photo-inner';

  if (photo.src) {
    // Real image
    const img = document.createElement('img');
    img.src = photo.src;
    img.alt = photo.label;
    img.loading = 'lazy';
    inner.appendChild(img);
  } else {
    // Beautiful placeholder
    const ph = document.createElement('div');
    ph.className = 'photo-placeholder';
    ph.style.background = photo.gradient;
    ph.innerHTML = `
      <div style="font-size:42px;opacity:0.6;">${photo.icon}</div>
      <div style="font-family:'Cinzel',serif;font-size:9px;letter-spacing:0.2em;
                  text-transform:uppercase;color:rgba(201,169,110,0.7);">${photo.label}</div>
      <div style="font-family:'Jost',sans-serif;font-size:11px;font-weight:300;
                  color:rgba(248,243,236,0.3);margin-top:4px;">Add your photo here</div>
    `;
    inner.appendChild(ph);
  }

  // Overlay
  const overlay = document.createElement('div');
  overlay.className = 'photo-overlay';
  overlay.innerHTML = `<div class="photo-label">${photo.label}</div>`;
  inner.appendChild(overlay);

  card.appendChild(inner);

  // Click → lightbox
  card.addEventListener('click', () => openLightbox(idx));

  return card;
}

function buildTracks() {
  const track1 = document.getElementById('track-1');
  const track2 = document.getElementById('track-2');

  const row1 = photos.filter(p => p.row === 1);
  const row2 = photos.filter(p => p.row === 2);

  // Build allSrcs for lightbox
  photos.forEach(p => allSrcs.push(p.src || null));

  // Duplicate each row 3× for seamless infinite loop
  [row1, row1, row1].forEach((set, si) => {
    set.forEach((photo, i) => {
      const globalIdx = photos.indexOf(photo);
      track1.appendChild(buildCard(photo, globalIdx));
    });
  });

  [row2, row2, row2].forEach((set) => {
    set.forEach((photo) => {
      const globalIdx = photos.indexOf(photo);
      track2.appendChild(buildCard(photo, globalIdx));
    });
  });
}

// ── LIGHTBOX
function openLightbox(idx) {
  currentLbIdx = idx;
  updateLightbox();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function updateLightbox() {
  const photo = photos[currentLbIdx];
  const lbImg = document.getElementById('lb-img');

  if (photo.src) {
    lbImg.src = photo.src;
    lbImg.alt = photo.label;
    lbImg.style.display = 'block';
  } else {
    // Show placeholder in lightbox too
    lbImg.src = `data:image/svg+xml,${encodeURIComponent(`
      <svg width="600" height="450" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#2d1018"/>
            <stop offset="100%" style="stop-color:#4a0f1c"/>
          </linearGradient>
        </defs>
        <rect width="600" height="450" fill="url(#g)" rx="16"/>
        <text x="300" y="190" font-family="Georgia" font-size="64" fill="rgba(201,169,110,0.5)" text-anchor="middle">${photo.icon}</text>
        <text x="300" y="250" font-family="Georgia" font-style="italic" font-size="28" fill="rgba(248,243,236,0.6)" text-anchor="middle">${photo.label}</text>
        <text x="300" y="290" font-family="Georgia" font-size="16" fill="rgba(248,243,236,0.25)" text-anchor="middle">Replace with your pre-wedding photo</text>
      </svg>
    `)}`;
    lbImg.alt = photo.label;
  }

  document.getElementById('lb-counter').textContent =
    `${currentLbIdx + 1}  /  ${photos.length}`;
}

function lbNav(dir) {
  currentLbIdx = (currentLbIdx + dir + photos.length) % photos.length;
  updateLightbox();
}

// Keyboard nav
document.addEventListener('keydown', (e) => {
  const lb = document.getElementById('lightbox');
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft')  lbNav(-1);
  if (e.key === 'ArrowRight') lbNav(1);
});

// Click backdrop to close
document.getElementById('lightbox').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeLightbox();
});

// ── INIT
buildTracks();
