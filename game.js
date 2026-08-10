const C=document.querySelector("#game"),g=C.getContext("2d");g.imageSmoothingEnabled=false;
const $=s=>document.querySelector(s), keys={}, W=C.width,H=C.height;
const rooms=[
 ["GRAFICA",20,80,245,210],["CENTRALE",275,80,190,210],["SERVER / SOPPALCO",475,80,220,210],
 ["ABA",20,310,195,190],["LOFT",20,515,195,180],["IT",300,310,395,285],
 ["SALA MEET",790,80,175,260],["CONTRATTI",975,80,155,260],["PANTHEON",1140,80,190,260],
 ["SPAZIO A",790,365,285,175],["BAGNO",790,555,85,135],["BAGNO",885,555,85,135],
 ["RIFUGIO DIGITALE",980,555,175,135],["SALA CORTE",1240,420,270,270],
 ["INGRESSO",400,710,300,135],["CUCINA",790,710,270,135],["STAMPANTI",1075,710,255,135]
];
// porte ricavate dai segni rossi dell'annotazione dell'utente.
// Ogni stanza ha almeno un varco. Muri e porte sono entità distinte.
const doors=[
 [215,335,18,44],[215,385,18,44],[215,655,18,40],                 // ABA/LOFT -> corridoio
 [255,285,35,18],[345,285,35,18],                               // Grafica/Centrale
 [695,235,18,42],[695,585,18,42],                               // Server/IT -> dorsale
 [770,285,18,45],[950,185,18,42],[1120,295,18,42],              // sale alte dx
 [1075,520,42,18],[1155,390,18,42],[1155,540,18,42],            // Spazio/Rifugio
 [1230,535,18,42],[1230,680,18,42],                             // Sala Corte
 [780,615,18,42],[865,680,42,18],[1035,680,42,18],[1190,680,42,18], // bagni/cucina/stampanti
 [680,800,18,42],[780,800,18,42]                                // ingresso/cucina verso corridoio
];
const special=[
 {x:160,y:220,room:"GRAFICA"},{x:370,y:240,room:"CENTRALE"},{x:575,y:220,room:"SERVER / SOPPALCO"},
 {x:100,y:455,room:"ABA"},{x:95,y:620,room:"LOFT"},{x:495,y:535,room:"IT"},
 {x:1050,y:260,room:"CONTRATTI"},{x:1210,y:220,room:"PANTHEON"},{x:1020,y:505,room:"SPAZIO A"},
 {x:1050,y:625,room:"RIFUGIO DIGITALE"},{x:1380,y:520,room:"SALA CORTE"},
 {x:960,y:790,room:"CUCINA"},{x:1170,y:790,room:"STAMPANTI"}
];
let state={min:540,stress:0,rep:4,xp:0,incident:0,bossStarted:false,bossResolved:false,finished:false},player={x:465,y:535,r:9,s:185},tickets=[],last=performance.now(),spawn=0;
function insideDoor(x,y){return doors.some(d=>x>d[0]&&x<d[0]+d[2]&&y>d[1]&&y<d[1]+d[3])}
function inRoom(x,y,r){return x>r[1]&&x<r[1]+r[3]&&y>r[2]&&y<r[2]+r[4]}
function legal(x,y){
 // corridoi sono sempre percorribili; se si attraversa il perimetro di una stanza deve esserci una porta.
 const rad=10;
 for(const r of rooms){
   const [n,rx,ry,rw,rh]=r, was=inRoom(player.x,player.y,r), now=inRoom(x,y,r);
   if(was!==now && !insideDoor(x,y) && !insideDoor(player.x,player.y)) return false;
   // bordo solido
   const near=(x>rx-rad&&x<rx+rw+rad&&y>ry-rad&&y<ry+rh+rad);
   if(near&&!now&&!insideDoor(x,y)){
     const onEdge=(Math.abs(x-rx)<rad||Math.abs(x-(rx+rw))<rad||Math.abs(y-ry)<rad||Math.abs(y-(ry+rh))<rad);
     if(onEdge)return false;
   }
 }
 return x>10&&x<W-10&&y>70&&y<H-10;
}
addEventListener("keydown",e=>{keys[e.key.toLowerCase()]=1;if(e.key.toLowerCase()=="e")interact()});addEventListener("keyup",e=>keys[e.key.toLowerCase()]=0);
function fmt(m){return String(Math.floor(m/60)).padStart(2,"0")+":"+String(Math.floor(m%60)).padStart(2,"0")}
const probs=["Revit non apre il modello","Stampante bloccata","Wi-Fi senza accesso ai server","Monitor nero","Licenza Autodesk non disponibile","Sala meeting senza segnale","Desktop Connector offline"];
function newTicket(){
 if(state.bossStarted || state.finished || tickets.length>=3)return;
 const p=special[Math.floor(Math.random()*special.length)];
 tickets.push({p,txt:probs[Math.floor(Math.random()*probs.length)],due:state.min+28+Math.random()*18});
 showTicket();
}
function showTicket(){let t=tickets[0];$("#open").textContent=tickets.length;$("#ticketText").innerHTML=t?`<b>${t.p.room}</b><br><br>${t.txt}<br><br><span class="urgent">Scadenza ${fmt(t.due)}</span>`:"Nessun ticket aperto."}
function interact(){
 if(!tickets.length){toast("Nessuna task attiva.");return}
 let i=tickets.findIndex(t=>Math.hypot(player.x-t.p.x,player.y-t.p.y)<55);if(i<0){toast("Qui non c'è nessuna task.");return}
 let t=tickets[i];$("#modalBody").innerHTML=`<h2>${t.p.room}</h2><p>${t.txt}</p><button class=choice data-ok=1>Diagnostica il problema e applica la soluzione corretta</button><button class=choice data-ok=0>Riavvia tutto senza controllare</button>`;
 $("#modal").classList.remove("hidden");document.querySelectorAll(".choice").forEach(b=>b.onclick=()=>resolve(i,b.dataset.ok=="1"));
}
function resolve(i,ok){$("#modal").classList.add("hidden");tickets.splice(i,1);if(ok){state.xp+=150;state.stress=Math.max(0,state.stress-5);state.incident=Math.max(0,state.incident-5);toast("TASK RISOLTA +150 XP")}else{state.stress+=12;state.incident+=10;state.rep--;toast("INTERVENTO ERRATO")}showTicket()}
$("#x").onclick=()=>{
 if(state.bossStarted && !state.bossResolved && !state.finished){
   toast("Devi gestire l'incidente ARCH-VOID.");
   return;
 }
 $("#modal").classList.add("hidden");
};
function toast(s){let t=$("#toast");t.textContent=s;t.classList.add("on");clearTimeout(t.q);t.q=setTimeout(()=>t.classList.remove("on"),1500)}

const BOSS_TIME=18*60+52; // 18:52, trigger obbligatorio
const END_TIME=19*60;

function startBoss(){
 if(state.bossStarted || state.finished) return;
 state.bossStarted=true;
 state.min=BOSS_TIME;              // il tempo si ferma qui finché il boss non viene gestito
 tickets=[]; showTicket();
 toast("18:52 // CHIAMATA IN ARRIVO");
 $("#modalBody").innerHTML=`
   <h2 class="urgent">18:52 — INCOMING CALL // INTERNO 000</h2>
   <p>«Ciao, scusa l'orario. Hai un secondo?»</p>
   <p>Tutti i monitor dello studio si accendono insieme. Compare una sessione sconosciuta: <b>ARCH-VOID</b>.</p>
   <p>Sul server appare <b>\\\\ARCHEA\\\\Projects\\\\_DO_NOT_OPEN\\\\19_03</b>.</p>
   <button class="choice boss-choice" data-i="0">Apri la cartella per capire cosa contiene</button>
   <button class="choice boss-choice" data-i="1">Isola la sessione, blocca l'account e controlla i log</button>
   <button class="choice boss-choice" data-i="2">Riavvia immediatamente tutti i server</button>`;
 $("#modal").classList.remove("hidden");
 document.querySelectorAll(".boss-choice").forEach(b=>b.onclick=()=>resolveBoss(+b.dataset.i));
}

function resolveBoss(choice){
 if(state.bossResolved) return;
 state.bossResolved=true;
 $("#modal").classList.add("hidden");
 if(choice===1){
   state.xp+=1000;
   state.incident=Math.max(0,state.incident-30);
   state.stress=Math.max(0,state.stress-10);
   toast("ARCH-VOID ISOLATO // +1000 XP");
   finishGame(true);
 } else {
   state.incident=Math.min(100,state.incident+35);
   state.stress=Math.min(100,state.stress+25);
   state.rep=Math.max(0,state.rep-1);
   toast("ARCH-VOID SI È PROPAGATO");
   finishGame(state.incident<100 && state.rep>0);
 }
}

function finishGame(win){
 state.finished=true;
 state.min=END_TIME;
 $("#modalBody").innerHTML=`
   <h2 class="${win?'good':'urgent'}">${win?'SHIFT COMPLETE // 19:00':'BAD ENDING // INCIDENT CRITICO'}</h2>
   <p>${win
     ? 'Hai contenuto l’incidente e lo studio è ancora operativo. La porta d’uscita si sblocca.'
     : 'La rete non risponde più. Il tuo account viene disconnesso dal dominio.'}</p>
   <p>XP: <b>${state.xp}</b><br>Stress: <b>${Math.round(state.stress)}%</b><br>Incident: <b>${Math.round(state.incident)}%</b></p>
   <button class="choice" onclick="location.reload()">NUOVO TURNO</button>`;
 $("#modal").classList.remove("hidden");
}

function update(dt){
 if(state.finished){
   $("#clock").textContent=fmt(state.min);
   return;
 }

 let dx=(keys.d||keys.arrowright?1:0)-(keys.a||keys.arrowleft?1:0),
     dy=(keys.s||keys.arrowdown?1:0)-(keys.w||keys.arrowup?1:0);

 if(dx||dy){
   let l=Math.hypot(dx,dy),
       nx=player.x+dx/l*player.s*dt,
       ny=player.y+dy/l*player.s*dt;
   if(legal(nx,player.y))player.x=nx;
   if(legal(player.x,ny))player.y=ny;
 }

 // Il turno non può più andare oltre il boss.
 if(!state.bossStarted){
   state.min += dt*2.2;
   if(state.min >= BOSS_TIME){
     startBoss();
   } else {
     spawn+=dt;
     if(spawn>10){spawn=0;newTicket()}
     for(let t of tickets){
       if(!t.dead && state.min>t.due){
         t.dead=1;
         state.incident=Math.min(100,state.incident+15);
         state.stress=Math.min(100,state.stress+8);
         state.rep=Math.max(0,state.rep-1);
         toast("TASK SCADUTA: INCIDENT +15");
       }
     }
   }
 } else {
   state.min=BOSS_TIME; // resta 18:52 mentre il popup boss è aperto
 }

 // Clamp globale: mai più 115%, 26:08 ecc.
 state.incident=Math.max(0,Math.min(100,state.incident));
 state.stress=Math.max(0,Math.min(100,state.stress));
 state.rep=Math.max(0,Math.min(5,state.rep));

 if(!state.bossStarted && (state.incident>=100 || state.stress>=100 || state.rep<=0)){
   finishGame(false);
 }

 $("#clock").textContent=fmt(state.min);
 $("#stress").textContent=Math.round(state.stress)+"%";
 $("#rep").textContent="★".repeat(state.rep)+"☆".repeat(5-state.rep);
 $("#xp").textContent=state.xp;
 $("#incident").textContent=Math.round(state.incident)+"%";
}
function draw(){
 g.fillStyle="#080a09";g.fillRect(0,0,W,H);
 // corridoio centrale
 g.fillStyle="#19130e";g.fillRect(700,70,75,780);g.fillRect(215,290,560,28);g.fillRect(215,695,1120,15);g.fillRect(1160,340,55,370);
 rooms.forEach(r=>{let[n,x,y,w,h]=r;g.fillStyle=n=="IT"?"#151917":"#111412";g.fillRect(x,y,w,h);g.strokeStyle="#69716b";g.lineWidth=6;g.strokeRect(x,y,w,h);g.fillStyle="#c7b99d";g.font="bold 14px monospace";g.fillText(n,x+12,y+24);
   // arredi sintetici
   g.fillStyle="#4a3522";g.fillRect(x+w*.2,y+h*.45,w*.6,24);g.fillStyle="#202824";for(let k=0;k<3;k++)g.fillRect(x+w*.25+k*42,y+h*.38,28,18);
 });
 // porte sopra i muri
 doors.forEach(d=>{g.fillStyle="#6b4426";g.fillRect(...d);g.strokeStyle="#a26b36";g.lineWidth=2;g.strokeRect(...d)});
 // task random
 tickets.forEach(t=>{let blink=Math.sin(performance.now()/130)>0;g.fillStyle=blink?"#ffd447":"#b52222";g.beginPath();g.arc(t.p.x,t.p.y,10,0,Math.PI*2);g.fill();g.fillStyle="#111";g.font="bold 14px monospace";g.fillText("!",t.p.x-4,t.p.y+5)});
 // spawn/player
 g.fillStyle="#222";g.fillRect(player.x-9,player.y-12,18,24);g.fillStyle="#b7ff4a";g.beginPath();g.arc(player.x,player.y+14,13,0,Math.PI*2);g.strokeStyle="#63e356";g.lineWidth=3;g.stroke();
}
function loop(n){let dt=Math.min(.05,(n-last)/1000);last=n;update(dt);draw();requestAnimationFrame(loop)}requestAnimationFrame(loop);
// touch
let joy=$("#joy"),stick=joy.querySelector("i"),jid=null,cx=0,cy=0;
joy.addEventListener("touchstart",e=>{let t=e.changedTouches[0],r=joy.getBoundingClientRect();jid=t.identifier;cx=r.left+r.width/2;cy=r.top+r.height/2;moveJoy(e)},{passive:false});
function moveJoy(e){let t=[...e.changedTouches].find(t=>t.identifier==jid);if(!t)return;let x=t.clientX-cx,y=t.clientY-cy,l=Math.hypot(x,y),m=36;if(l>m){x*=m/l;y*=m/l}stick.style.transform=`translate(${x}px,${y}px)`;keys.a=x<-8;keys.d=x>8;keys.w=y<-8;keys.s=y>8;e.preventDefault()}
joy.addEventListener("touchmove",moveJoy,{passive:false});joy.addEventListener("touchend",()=>{jid=null;stick.style.transform="";keys.a=keys.d=keys.w=keys.s=0},{passive:false});$("#act").addEventListener("touchstart",e=>{e.preventDefault();interact()},{passive:false});$("#act").onclick=interact;
newTicket();