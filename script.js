const petals = document.getElementById('petals');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function makePetal(){
  if(reduceMotion) return;
  const p=document.createElement('span');
  p.className='petal';
  p.textContent=['✿','♡','❀'][Math.floor(Math.random()*3)];
  p.style.left=Math.random()*100+'%';
  p.style.fontSize=(10+Math.random()*15)+'px';
  p.style.animationDuration=(7+Math.random()*8)+'s';
  petals.appendChild(p);
  setTimeout(()=>p.remove(),16000);
}
if(!reduceMotion) { for(let i=0;i<12;i++) setTimeout(makePetal,i*300); setInterval(makePetal,1100); }

const bloomButton=document.getElementById('bloomButton');
const bouquet=document.querySelector('.bouquet');
const bloomMessage=document.getElementById('bloomMessage');
let bloomed=false;
bloomButton.addEventListener('click',()=>{
  bloomed=!bloomed;
  bouquet.style.transform=bloomed?'scale(1.09) rotate(2deg)':'scale(1) rotate(0)';
  bouquet.querySelectorAll('.peony').forEach((flower,i)=>{flower.style.transform=bloomed?`scale(1.12) rotate(${i%2?8:-8}deg)`:'scale(1) rotate(0)';});
  bloomMessage.textContent=bloomed?'Just like these flowers, my love for you keeps growing. ♡':'A flower for every reason I adore you.';
  bloomButton.innerHTML=bloomed?'A little more love <span>♡</span>':'Make the flowers bloom <span>✿</span>';
});

const song=document.getElementById('ourSong');
const playButton=document.getElementById('playButton');
const record=document.querySelector('.record');
const musicToggle=document.getElementById('musicToggle');
async function toggleMusic(){
  if(song.paused){
    try{await song.play();playButton.textContent='Ⅱ';musicToggle.textContent='♫';record.classList.add('playing');}
    catch(e){alert('Add your song as “our-song.mp3” in the same folder as index.html, then try again.');}
  }else{song.pause();playButton.textContent='▶';record.classList.remove('playing');}
}
playButton.addEventListener('click',toggleMusic);
musicToggle.addEventListener('click',()=>{document.getElementById('music').scrollIntoView({behavior:'smooth'});});
song.addEventListener('ended',()=>{playButton.textContent='▶';record.classList.remove('playing');});

document.getElementById('ponyButton').addEventListener('click',()=>{
  const reveal=document.getElementById('surpriseReveal');
  reveal.hidden=false;
  document.getElementById('ponyButton').style.transform='scale(1.12)';
  reveal.scrollIntoView({behavior:'smooth',block:'nearest'});
  for(let i=0;i<20;i++) setTimeout(makePetal,i*80);
});

const dialog=document.getElementById('letterDialog');
document.getElementById('editLetter').addEventListener('click',()=>dialog.showModal());
document.getElementById('saveLetter').addEventListener('click',(event)=>{
  event.preventDefault();
  const message=document.getElementById('customMessage').value.trim();
  let custom=document.getElementById('customLetterMessage');
  if(message){
    if(!custom){
      custom=document.createElement('p');
      custom.id='customLetterMessage';
      document.querySelector('.letter-card .signoff').before(custom);
    }
    custom.textContent=message;
  } else if(custom) {
    custom.remove();
  }
  dialog.close();
});
