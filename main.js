// ===== i18n =====
let currentLang = 'zh';
let typedPhrases = [];
let typeTimer = null;

function detectLang() {
  const saved = localStorage.getItem('lang');
  if (saved && ['zh','en','ja'].includes(saved)) return saved;
  const nav = navigator.language || navigator.userLanguage || 'zh';
  if (nav.startsWith('zh')) return 'zh';
  if (nav.startsWith('ja')) return 'ja';
  return 'en';
}

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang;
  const dict = I18N[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });
  // Update lang label
  const labels = {zh:'中', en:'EN', ja:'日'};
  document.getElementById('langLabel').textContent = labels[lang];
  // Restart typing with new phrases
  typedPhrases = dict['typed'] || [];
  resetTyping();
}

function resetTyping() {
  if (typeTimer) clearTimeout(typeTimer);
  phraseIdx = 0; charIdx = 0; isDeleting = false;
  typeLoop();
}

function toggleLang(e) {
  e.stopPropagation();
  document.getElementById('langDropdown').classList.toggle('open');
}

function setLang(lang) {
  applyLang(lang);
  document.getElementById('langDropdown').classList.remove('open');
  closeNav();
}

document.addEventListener('click', (e) => {
  const sw = document.querySelector('.lang-switch');
  if (sw && !sw.contains(e.target)) {
    document.getElementById('langDropdown').classList.remove('open');
  }
});

// ===== Header =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
});

function toggleNav() { document.getElementById('navLinks').classList.toggle('open'); }
function closeNav() { document.getElementById('navLinks').classList.remove('open'); }

// ===== Typing =====
let phraseIdx = 0, charIdx = 0, isDeleting = false;
const typedEl = document.getElementById('typed');

function typeLoop() {
  if (typedPhrases.length === 0) return;
  const current = typedPhrases[phraseIdx];
  if (!isDeleting) {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      isDeleting = true;
      typeTimer = setTimeout(typeLoop, 2000);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % typedPhrases.length;
    }
  }
  typeTimer = setTimeout(typeLoop, isDeleting ? 40 : 80);
}

// ===== Intersection Observer =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.15 });
document.querySelectorAll('.skill-card,.project-card,.about-card,.fade-in').forEach(el => observer.observe(el));

// ===== Particles =====
const particleContainer = document.getElementById('particles');
const colors = ['#00f0ff','#ff00aa','#7c3aed','#39ff14'];
for (let i = 0; i < 30; i++) {
  const p = document.createElement('div'); p.className = 'particle';
  p.style.left = Math.random()*100+'%';
  p.style.background = colors[Math.floor(Math.random()*colors.length)];
  p.style.animationDuration = (Math.random()*10+10)+'s';
  p.style.animationDelay = (Math.random()*10)+'s';
  p.style.width = p.style.height = (Math.random()*3+2)+'px';
  particleContainer.appendChild(p);
}

// ===== Matrix =====
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resizeCanvas(); window.addEventListener('resize', resizeCanvas);
const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF';
const fontSize = 14, columns = Math.floor(canvas.width/fontSize), drops = Array(columns).fill(1);
function drawMatrix() {
  ctx.fillStyle='rgba(10,10,26,0.05)'; ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle='#00f0ff'; ctx.font=fontSize+'px monospace';
  for (let i=0;i<drops.length;i++) {
    const text=chars[Math.floor(Math.random()*chars.length)];
    ctx.fillText(text,i*fontSize,drops[i]*fontSize);
    if(drops[i]*fontSize>canvas.height&&Math.random()>0.975)drops[i]=0;
    drops[i]++;
  }
}
setInterval(drawMatrix,50);

// ===== Smooth scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({behavior:'smooth',block:'start'}); }
  });
});

// ===== Init =====
applyLang(detectLang());