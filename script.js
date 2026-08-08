// EDIT THIS: set the target birthday date/time
const TARGET_DATE = new Date('2026-10-07T00:00:00');

function goTo(id){
  document.querySelectorAll('.scene').forEach(s=>s.classList.remove('active'));
  const el=document.getElementById(id);
  el.classList.add('active');
  el.style.animation='none';
  void el.offsetWidth;
  el.style.animation='';
}

function setPhoto(input){
  const file=input.files[0];
  if(!file) return;
  const reader=new FileReader();
  reader.onload=function(e){
    const slot=input.parentElement;
    slot.innerHTML='';
    const img=document.createElement('img');
    img.src=e.target.result;
    slot.appendChild(img);
  };
  reader.readAsDataURL(file);
}

function updateCountdown(){
  const now=new Date();
  const diff=TARGET_DATE-now;

  const daysEl=document.getElementById('cd-days');
  const hoursEl=document.getElementById('cd-hours');
  const minEl=document.getElementById('cd-min');
  const secEl=document.getElementById('cd-sec');
  const revealBtn=document.getElementById('reveal-btn');

  if(diff<=0){
    daysEl.textContent='00';
    hoursEl.textContent='00';
    minEl.textContent='00';
    secEl.textContent='00';
    revealBtn.classList.add('ready');
    document.getElementById('count-title-text').textContent="it's here!";
    clearInterval(countdownTimer);
    return;
  }

  const days=Math.floor(diff/(1000*60*60*24));
  const hours=Math.floor((diff%(1000*60*60*24))/(1000*60*60));
  const mins=Math.floor((diff%(1000*60*60))/(1000*60));
  const secs=Math.floor((diff%(1000*60))/1000);

  daysEl.textContent=String(days).padStart(2,'0');
  hoursEl.textContent=String(hours).padStart(2,'0');
  minEl.textContent=String(mins).padStart(2,'0');
  secEl.textContent=String(secs).padStart(2,'0');
}

let countdownTimer;
(function(){
  updateCountdown();
  countdownTimer=setInterval(updateCountdown,1000);
})();

(function(){
  const layer=document.getElementById('fireflies');
  const count=40;
  for(let i=0;i<count;i++){
    const f=document.createElement('div');
    f.className='firefly';
    f.style.top=Math.random()*100+'%';
    f.style.left=Math.random()*100+'%';
    f.style.animationDelay=(Math.random()*6)+'s';
    f.style.animationDuration=(4+Math.random()*4)+'s';
    layer.appendChild(f);
  }
})();