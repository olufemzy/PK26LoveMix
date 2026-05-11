// ── Envelope open
const envelope = document.getElementById('envelope');
const invCard  = document.getElementById('inv-card');
const enterBtn = document.getElementById('inv-enter-btn');
const overlay  = document.getElementById('intro-overlay');
const mainSite = document.getElementById('main-site');

function openEnvelope() {
   envelope.classList.add('opening');
   invCard.classList.add('revealed');
}

function enterSite() {
   overlay.classList.add('hidden');
   mainSite.classList.add('visible');
   setTimeout(() => { overlay.style.display = 'none'; }, 900);
}

envelope.addEventListener('click', openEnvelope);
enterBtn.addEventListener('click', enterSite);

// ── Countdown
function updateCountdown() {
   const target = new Date('2026-08-20T00:00:00');
   const now    = new Date();
   const diff   = target - now;
   if (diff <= 0) return;
   const d = Math.floor(diff / 86400000);
   const h = Math.floor((diff % 86400000) / 3600000);
   const m = Math.floor((diff % 3600000)  / 60000);
   const s = Math.floor((diff % 60000)    / 1000);
   document.getElementById('cd-days').textContent  = String(d).padStart(2,'0');
   document.getElementById('cd-hours').textContent = String(h).padStart(2,'0');
   document.getElementById('cd-mins').textContent  = String(m).padStart(2,'0');
   document.getElementById('cd-secs').textContent  = String(s).padStart(2,'0');
   }
updateCountdown();
setInterval(updateCountdown, 1000);

// ── Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.15 });
revealEls.forEach(el => obs.observe(el));


// ── Open modal
function openVideoModal() {
  const modal  = document.getElementById('video-modal');
  const iframe = document.getElementById('yt-player');
 
  // Load video src only when modal opens (saves bandwidth)
  if (iframe && iframe.dataset.src) {
    iframe.src = iframe.dataset.src;
  }
 
  modal.classList.add('open');
  document.body.style.overflow = 'hidden'; // stop page scroll
}
 
// ── Close modal
function closeVideoModal() {
  const modal  = document.getElementById('video-modal');
  const iframe = document.getElementById('yt-player');
  const video  = document.getElementById('local-video');
 
  modal.classList.remove('open');
  document.body.style.overflow = ''; // restore scroll
 
  // Stop playback when closing
  if (iframe) iframe.src = 'about:blank'; // stops YouTube
  if (video)  { video.pause(); video.currentTime = 0; }
}
 
// ── Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeVideoModal();
});