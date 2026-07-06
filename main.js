const header=document.getElementById('header');
window.addEventListener('scroll',()=>{header.classList.toggle('scrolled',window.scrollY>30)});
function toggleNav(){document.getElementById('navLinks').classList.toggle('open')}
function closeNav(){document.getElementById('navLinks').classList.remove('open')}
const phrases=['Code is Art. 端末も可愛い。','テクノロジー × 二次元','Welcome to my world ⚡','Building the future, one line at a time.','コードで世界を変える 🌸'];
let phraseIdx=0,charIdx=0,isDeleting=false;
const typedEl=document.getElementById('typed');
function typeLoop(){
  const current=phrases[phraseIdx];
  if(!isDeleting){typedEl.textContent=current.slice(0,++charIdx);
    if(charIdx===current.length){isDeleting=true;setTimeout(typeLoop,2000);return}}
  else{typedEl.textContent=current.slice(0,--charIdx);
    if(charIdx===0){isDeleting=false;phraseIdx=(phraseIdx+1)%phrases.length}}
  setTimeout(typeLoop,isDeleting?40:80)}
typeLoop();
const observer=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')})},{threshold:0.15});
document.querySelectorAll('.skill-card,.project-card,.about-card,.fade-in').forEach(el=>observer.observe(el));
const particleContainer=document.getElementById('particles');
const colors=['#00f0ff','#ff00aa','#7c3aed','#39ff14'];
for(let i=0;i<30;i++){
  const p=document.createElement('div');p.className='particle';
  p.style.left=Math.random()*100+'%';
  p.style.background=colors[Math.floor(Math.random()*colors.length)];
  p.style.animationDuration=(Math.random()*10+10)+'s';
  p.style.animationDelay=(Math.random()*10)+'s';
  p.style.width=p.style.height=(Math.random()*3+2)+'px';
  particleContainer.appendChild(p)}
const canvas=document.getElementById('matrix');
const ctx=canvas.getContext('2d');
function resizeCanvas(){canvas.width=window.innerWidth;canvas.height=window.innerHeight}
resizeCanvas();window.addEventListener('resize',resizeCanvas);
const chars='アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF';
const fontSize=14;const columns=Math.floor(canvas.width/fontSize);
const drops=Array(columns).fill(1);
function drawMatrix(){
  ctx.fillStyle='rgba(10,10,26,0.05)';ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle='#00f0ff';ctx.font=fontSize+'px monospace';
  for(let i=0;i<drops.length;i++){
    const text=chars[Math.floor(Math.random()*chars.length)];
    ctx.fillText(text,i*fontSize,drops[i]*fontSize);
    if(drops[i]*fontSize>canvas.height&&Math.random()>0.975)drops[i]=0;
    drops[i]++}}
setInterval(drawMatrix,50);
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
  anchor.addEventListener('click',function(e){
    const target=document.querySelector(this.getAttribute('href'));
    if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'})}})});