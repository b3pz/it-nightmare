const $ = s => document.querySelector(s);
const screens = {boot:$("#boot"), intro:$("#intro"), game:$("#game"), ending:$("#ending")};
function show(name){Object.values(screens).forEach(s=>s.classList.remove("active"));screens[name].classList.add("active")}

const bootLines = [
"[BOOT] Secure workstation image v4.7",
"[OK] Domain controller reachable",
"[OK] Revit license service reachable",
"[WARN] Unknown device: ARCH-VOID-19",
"[WARN] 13 orphaned sessions found",
"[ERROR] Ticket queue timestamp: 19:03",
"[ERROR] User 'GUEST_000' authenticated from SERVER ROOM",
"[SYSTEM] Shift assignment loaded.",
"[SYSTEM] Technician: YOU."
];
let bi=0;
function bootTick(){
  if(bi<bootLines.length){
    $("#bootLines").innerHTML += bootLines[bi]+"<br>";
    bi++; setTimeout(bootTick, bi<4?250:420);
  }else $("#enterBtn").classList.remove("hidden");
}
bootTick();
$("#enterBtn").onclick=()=>show("intro");
$("#startBtn").onclick=()=>{show("game");startGame()};
$("#restartBtn").onclick=()=>location.reload();

const canvas=$("#gameCanvas"), ctx=canvas.getContext("2d");
ctx.imageSmoothingEnabled=false;

const W=960,H=540,T=48;
const keys={};
addEventListener("keydown",e=>{keys[e.key.toLowerCase()]=true;if(e.key.toLowerCase()==="e") interact();if(e.key==="Escape")closeModal()});
addEventListener("keyup",e=>keys[e.key.toLowerCase()]=false);

// V0.2: mappa astratta dalla planimetria reale.
// I muri sono collisioni vere: non si attraversano.
const rooms=[
 {x:18,y:22,w:190,h:116,name:"LOFT"},
 {x:228,y:22,w:210,h:116,name:"CONTRATTI"},
 {x:458,y:22,w:212,h:116,name:"ABA"},
 {x:690,y:22,w:252,h:116,name:"DIREZIONE"},
 {x:18,y:158,w:252,h:144,name:"SPAZIO A"},
 {x:290,y:158,w:184,h:144,name:"GRAFICA"},
 {x:494,y:158,w:176,h:144,name:"CENTRALE"},
 {x:690,y:158,w:252,h:144,name:"PANTHEON"},
 {x:18,y:322,w:190,h:196,name:"RIFUGIO DIGITALE"},
 {x:228,y:322,w:246,h:196,name:"IT"},
 {x:494,y:322,w:176,h:196,name:"SALA MEET"},
 {x:690,y:322,w:252,h:196,name:"SERVER / SOPPALCO"}
];
// corridoio principale "Via della Fornace": fascia orizzontale tra i blocchi.
const walls=[];
rooms.forEach(r=>{
 const d=7;
 // porte centrali verso il corridoio: spezza il muro inferiore/superiore a seconda della fila
 walls.push({x:r.x,y:r.y,w:r.w,h:d});
 walls.push({x:r.x,y:r.y,w:d,h:r.h});
 walls.push({x:r.x+r.w-d,y:r.y,w:d,h:r.h});
 if(r.y<300){
   const doorX=r.x+r.w/2-18;
   walls.push({x:r.x,y:r.y+r.h-d,w:doorX-r.x,h:d});
   walls.push({x:doorX+36,y:r.y+r.h-d,w:r.x+r.w-(doorX+36),h:d});
 }else{
   const doorX=r.x+r.w/2-18;
   walls.push({x:r.x,y:r.y,w:doorX-r.x,h:d});
   walls.push({x:doorX+36,y:r.y,w:r.x+r.w-(doorX+36),h:d});
   walls.push({x:r.x,y:r.y+r.h-d,w:r.w,h:d});
 }
});

const interactables=[
 {id:"pc_a",x:85,y:220,type:"pc",label:"POSTAZIONE — SPAZIO A",room:"SPAZIO A"},
 {id:"meeting",x:580,y:420,type:"screen",label:"SALA MEET",room:"SALA MEET"},
 {id:"pc_b",x:370,y:220,type:"pc",label:"POSTAZIONE — GRAFICA",room:"GRAFICA"},
 {id:"reception",x:785,y:220,type:"phone",label:"TELEFONO — PANTHEON",room:"PANTHEON"},
 {id:"server",x:815,y:420,type:"server",label:"RACK SERVER",room:"SERVER / SOPPALCO"},
 {id:"printer",x:555,y:220,type:"printer",label:"STAMPANTE — CENTRALE",room:"CENTRALE"},
 {id:"it",x:350,y:420,type:"terminal",label:"TERMINALE IT",room:"IT"},
 {id:"exit",x:125,y:420,type:"exit",label:"USCITA",room:"RIFUGIO DIGITALE"}
];

const ticketTemplates=[
 {id:"monitor",title:"URGENTE: PC MORTO",desc:"L'utente dice che il PC non dà segni di vita.",target:"pc_a",solution:1,choices:["Reinstallare Windows","Accendere il monitor","Cambiare scheda madre"],stress:5,xp:120},
 {id:"revit",title:"REVIT È LENTISSIMO",desc:"Un progetto impiega minuti ad aprirsi.",target:"pc_b",solution:1,choices:["Eliminare il progetto","Pulire cache/temp Revit","Disattivare la rete"],stress:8,xp:160},
 {id:"print",title:"LA STAMPANTE NON STAMPA",desc:"Tutto bloccato. Ovviamente è urgente.",target:"printer",solution:2,choices:["Riavviare il dominio","Installare AutoCAD","Controllare coda e stampante selezionata"],stress:6,xp:130},
 {id:"meeting",title:"CALL TRA 2 MINUTI",desc:"Lo schermo sala riunioni non mostra nulla.",target:"meeting",solution:0,choices:["Controllare sorgente HDMI/input","Formattare il PC","Cambiare password all'utente"],stress:10,xp:180},
 {id:"guest",title:"WI-FI NON VA",desc:"L'utente è online ma non raggiunge i server.",target:"reception",solution:1,choices:["Spegnere gli switch","Verificare se è sulla rete Guest","Cambiare telefono"],stress:7,xp:140},
 {id:"desktop",title:"FILE SCOMPARSO",desc:"Un file importante non si trova più nella VDI.",target:"it",solution:2,choices:["Svuotare il cestino","Riavviare il server","Verificare Desktop e percorsi aziendali"],stress:12,xp:200}
];

let state, player, tickets, last=0, spawnTimer=0, horrorLevel=0, bossStarted=false, running=false;

function startGame(){
 state={minute:540,stress:0,rep:3,xp:0,solved:0,failed:0,incident:0};
 player={x:350,y:455,r:10,speed:150};
 tickets=[];
 running=true; last=performance.now(); spawnTimer=0;
 addLog("Turno iniziato. Nessun ticket aperto.","system");
 requestAnimationFrame(loop);
}

function addLog(text,type=""){
 const e=document.createElement("div");e.className="log-entry "+type;e.textContent="> "+text;
 $("#log").prepend(e);
}

function spawnTicket(force){
 if(tickets.length>=4&&!force)return;
 const pool=ticketTemplates.filter(t=>!tickets.some(x=>x.id===t.id));
 if(!pool.length)return;
 const base=pool[Math.floor(Math.random()*pool.length)];
 const t={...base,created:state.minute,urgent:Math.random()<.28,deadline:state.minute+(Math.random()<.28?24:42),expired:false};
 if(t.urgent){t.title="URGENTISSIMO // "+t.title;t.stress+=4;t.xp+=40}
 tickets.push(t); addLog("Nuovo ticket: "+t.title,t.urgent?"bad":"");
 renderTickets();
}

function renderTickets(){
 $("#tickets").innerHTML=tickets.length?tickets.map(t=>`<div class="ticket ${t.urgent?"urgent":""}">
 <div class="ticket-title">${t.title}</div><div>${t.desc}</div><div class="ticket-location">→ ${interactables.find(i=>i.id===t.target).room}<br>DEADLINE ${formatTime(t.deadline)}</div></div>`).join(""):`<div class="muted">Queue vuota. Troppo silenzio.</div>`;
 $("#ticketCount").textContent=tickets.length;
}

function formatTime(m){let h=Math.floor(m/60),mm=Math.floor(m%60);return `${String(h).padStart(2,"0")}:${String(mm).padStart(2,"0")}`}

function updateHUD(){
 $("#clock").textContent=formatTime(state.minute);
 $("#stress").textContent=Math.round(state.stress)+"%";
 $("#rep").textContent=Math.max(0,Math.min(5,state.rep))+"/5";
 $("#xp").textContent=state.xp; $("#incident").textContent=Math.round(state.incident)+"%"; $("#incidentFill").style.width=Math.round(state.incident)+"%";
}

function loop(now){
 if(!running)return;
 const dt=Math.min((now-last)/1000,.05);last=now;
 update(dt);draw();
 requestAnimationFrame(loop);
}

function update(dt){
 let dx=0,dy=0; const prevX=player.x, prevY=player.y;
 if(keys["w"]||keys["arrowup"])dy-=1;if(keys["s"]||keys["arrowdown"])dy+=1;
 if(keys["a"]||keys["arrowleft"])dx-=1;if(keys["d"]||keys["arrowright"])dx+=1;
 if(dx||dy){const l=Math.hypot(dx,dy);player.x+=dx/l*player.speed*dt;player.y+=dy/l*player.speed*dt}
 player.x=Math.max(14,Math.min(W-14,player.x));player.y=Math.max(14,Math.min(H-14,player.y));
 // collisione muri
 for(const w of walls){
   if(player.x+8>w.x && player.x-8<w.x+w.w && player.y+10>w.y && player.y-10<w.y+w.h){
     player.x=prevX; player.y=prevY; break;
   }
 }

 state.minute += dt*3.25; // ~3 minutes per second
 spawnTimer+=dt;
 let spawnEvery=Math.max(5.5,12-(state.minute-540)/90);
 if(spawnTimer>spawnEvery && state.minute<1137){spawnTimer=0;spawnTicket(false)}
 // ticket scaduti: fanno crescere l'incidente e possono propagare il caos
 tickets.forEach(t=>{
   if(!t.expired && state.minute>=t.deadline){
     t.expired=true; state.incident=Math.min(100,state.incident+(t.urgent?18:12));
     state.stress=Math.min(100,state.stress+8); state.rep=Math.max(0,state.rep-1);
     addLog("TASK SCADUTA: "+t.title+" // incidente propagato","bad");
     flash("TASK FALLITA // INCIDENT LEVEL +");
   }
 });
 horrorLevel=Math.max(state.incident/100,Math.max(0,(state.minute-1020)/120));

 if(state.minute>=1137&&!bossStarted){startBoss()}
 if(state.minute>=1162 && !bossStarted===false && running && tickets.length===0)endGame(true);
 if(state.stress>=100||state.rep<=0||state.incident>=100)endGame(false);

 const near=getNear();
 $("#interactionHint").classList.toggle("hidden",!near);
 updateHUD();
}

function getNear(){return interactables.find(i=>Math.hypot(i.x-player.x,i.y-player.y)<42)}

function interact(){
 const obj=getNear(); if(!obj)return;
 if(obj.id==="exit"){flash("Non puoi uscire. Il turno non è finito.");return}
 const ticket=tickets.find(t=>t.target===obj.id);
 if(ticket)openTicket(ticket,obj);
 else if(obj.id==="server")serverEvent();
 else flash(obj.label+" // nessun intervento richiesto");
}

function openTicket(t,obj){
 $("#modalContent").innerHTML=`<h2>${t.title}</h2><p>${t.desc}</p><p class="muted">${obj.label}</p>
 <p>Scegli l'intervento:</p>${t.choices.map((c,i)=>`<button class="choice" data-i="${i}">${c}</button>`).join("")}`;
 $("#modal").classList.remove("hidden");
 [...document.querySelectorAll(".choice")].forEach(b=>b.onclick=()=>resolveTicket(t,+b.dataset.i));
}
function resolveTicket(t,choice){
 closeModal();
 const idx=tickets.indexOf(t);if(idx<0)return;
 tickets.splice(idx,1);
 if(choice===t.solution){
  state.xp+=t.xp;state.stress=Math.max(0,state.stress-t.stress*.65);state.incident=Math.max(0,state.incident-(t.expired?3:6));state.rep=Math.min(5,state.rep+(Math.random()<.35?1:0));state.solved++;
  addLog("Risolto: "+t.title,"good");flash("TICKET RISOLTO +"+t.xp+" XP");
 }else{
  state.stress=Math.min(100,state.stress+t.stress);state.incident=Math.min(100,state.incident+8);state.rep--;state.failed++;
  addLog("Intervento errato: "+t.title,"bad");flash("ERRORE // stress aumentato");
 }
 renderTickets();
}
function closeModal(){$("#modal").classList.add("hidden")}
$("#closeModal").onclick=closeModal;

function serverEvent(){
 const msg = state.minute>1050 ? "Nel rack lampeggia una porta che non dovrebbe esistere: VLAN 19 / ARCH-VOID." : "I server rispondono. Per ora.";
 flash(msg);
 addLog(msg,state.minute>1050?"bad":"system");
}

function startBoss(){
 bossStarted=true;
 state.minute=1137;
 tickets=[];
 renderTickets();
 addLog("18:57 — chiamata in arrivo da INTERNO 000.","bad");
 $("#modalContent").innerHTML=`<h2 class="danger">INCOMING CALL // 18:57</h2>
 <p>Numero interno: <strong>000</strong></p>
 <p>«Ciao, scusa l'orario. Hai un secondo?»</p>
 <p class="muted">La voce proviene contemporaneamente da tutti i telefoni dello studio.</p>
 <button class="choice" id="answerBoss">RISPONDI</button>`;
 $("#modal").classList.remove("hidden");
 $("#answerBoss").onclick=()=>bossStage2();
}
function bossStage2(){
 $("#modalContent").innerHTML=`<h2 class="danger">FINAL INCIDENT // ARCH-VOID</h2>
 <p>Un account inesistente sta aprendo sessioni su ogni workstation. Sul server compare una cartella:</p>
 <p><strong>\\\\ARCHEA\\Projects\\_DO_NOT_OPEN\\19_03</strong></p>
 <p>Cosa fai?</p>
 <button class="choice bossChoice" data-i="0">Apri la cartella e controlli</button>
 <button class="choice bossChoice" data-i="1">Isoli la macchina, disconnetti la sessione e controlli i log</button>
 <button class="choice bossChoice" data-i="2">Riavvii tutti i server</button>`;
 [...document.querySelectorAll(".bossChoice")].forEach(b=>b.onclick=()=>resolveBoss(+b.dataset.i));
}
function resolveBoss(i){
 closeModal();
 if(i===1){
  state.xp+=1000;state.solved++;state.minute=1160;addLog("ARCH-VOID isolato. Sessione terminata.","good");
  setTimeout(()=>endGame(true),1000);
 }else{
  state.stress=Math.min(100,state.stress+35);state.rep--;state.minute=1160;
  addLog("La sessione si è propagata.","bad");
  setTimeout(()=>endGame(state.stress<100&&state.rep>0),1200);
 }
}
function endGame(win){
 running=false;show("ending");
 let title,text;
 if(win && state.rep>=3 && state.stress<80){title="GOOD ENDING // 19:22";text="Hai chiuso l'incidente. Le luci dello studio si spengono. Riesci a uscire prima che il telefono ricominci a squillare."}
 else if(win){title="ENDING // SHIFT SURVIVED";text="Sei uscito. Ma il giorno dopo, alle 09:00, il ticket ARCH-VOID risulta ancora aperto. Assegnatario: YOU."}
 else {title="BAD ENDING // SESSION LOST";text="Stress critico o reputazione azzerata. Il tuo account viene disconnesso. Quando provi a rientrare, il dominio dice che l'utente non esiste."}
 $("#endingTitle").textContent=title;$("#endingText").textContent=text;
 $("#endingStats").innerHTML=`<div class="statbox">XP<br><strong>${state.xp}</strong></div>
 <div class="statbox">Risolti<br><strong>${state.solved}</strong></div>
 <div class="statbox">Errori<br><strong>${state.failed}</strong></div>
 <div class="statbox">Stress<br><strong>${Math.round(state.stress)}%</strong></div>`;
}
function flash(t){const f=$("#flashMessage");f.textContent=t;f.classList.remove("hidden");clearTimeout(f._t);f._t=setTimeout(()=>f.classList.add("hidden"),1700)}

function draw(){
 ctx.fillStyle="#050707";ctx.fillRect(0,0,W,H);
 rooms.forEach((r,i)=>{
   ctx.fillStyle=r.name==="IT"?"#0d1210":"#0b0e0d";ctx.fillRect(r.x,r.y,r.w,r.h);
   ctx.strokeStyle="#28332d";ctx.strokeRect(r.x+.5,r.y+.5,r.w-1,r.h-1);
   ctx.fillStyle="#435149";ctx.font="11px monospace";ctx.fillText(r.name,r.x+10,r.y+17);
 });
 ctx.fillStyle="#111613";ctx.fillRect(0,140,W,18);ctx.fillRect(0,302,W,20);
 ctx.fillStyle="#4d5b53";ctx.font="10px monospace";ctx.fillText("VIA DELLA FORNACE // CORRIDOIO",355,315);
 walls.forEach(w=>{ctx.fillStyle="#39423e";ctx.fillRect(w.x,w.y,w.w,w.h)});
 drawFurniture();
 interactables.forEach(drawObj);
 // eerie flicker late game
 if(horrorLevel>0 && Math.random()<horrorLevel*.04){ctx.fillStyle="rgba(130,0,0,.08)";ctx.fillRect(0,0,W,H)}
 // player
 ctx.fillStyle="#b7ff4a";ctx.fillRect(player.x-7,player.y-9,14,18);
 ctx.fillStyle="#182018";ctx.fillRect(player.x-4,player.y-5,3,3);ctx.fillRect(player.x+1,player.y-5,3,3);
 ctx.fillStyle="rgba(183,255,74,.05)";ctx.beginPath();ctx.arc(player.x,player.y,55,0,Math.PI*2);ctx.fill();
}
function drawFurniture(){
 ctx.fillStyle="#151b18";
 // file di scrivanie; volutamente astratte ma coerenti con gli ambienti reali
 [[45,190],[135,190],[320,190],[405,190],[520,190],[720,190],[815,190],
  [260,370],[350,370],[520,370],[720,370],[815,370]].forEach(([x,y])=>{
    ctx.fillRect(x,y,62,26);ctx.fillStyle="#202925";ctx.fillRect(x+17,y+5,28,12);ctx.fillStyle="#151b18";
 });
 // parete lunga IT: quattro postazioni, ispirata alla foto fornita
 ctx.fillStyle="#202724";ctx.fillRect(245,475,210,12);
 for(let x=255;x<440;x+=52){ctx.fillStyle="#28332e";ctx.fillRect(x,449,38,22)}
 // rack
 for(let x=730;x<900;x+=36){ctx.fillStyle="#1b2420";ctx.fillRect(x,390,24,76)}
}
function drawObj(o){
 let active=tickets.some(t=>t.target===o.id);
 ctx.fillStyle=active?(Math.sin(performance.now()/180)>0?"#ff3c38":"#63201f"):"#4a5a50";
 if(o.type==="server")ctx.fillRect(o.x-12,o.y-22,24,44);
 else if(o.type==="printer")ctx.fillRect(o.x-16,o.y-12,32,24);
 else if(o.type==="exit"){ctx.strokeStyle="#617068";ctx.strokeRect(o.x-16,o.y-28,32,56);ctx.fillStyle="#617068";ctx.fillRect(o.x+8,o.y,3,3)}
 else ctx.fillRect(o.x-12,o.y-9,24,18);
 if(active){ctx.fillStyle="#ffcf5a";ctx.font="bold 16px monospace";ctx.fillText("!",o.x-4,o.y-20)}
}

// Touch controls: convivono con tastiera e mouse.
const joy=$("#joystick"), stick=$("#stick"), touchInteract=$("#touchInteract");
let joyId=null, joyCenter={x:0,y:0};
function joyStart(e){
 const t=e.changedTouches[0];joyId=t.identifier;
 const r=joy.getBoundingClientRect();joyCenter={x:r.left+r.width/2,y:r.top+r.height/2};joyMove(e);
}
function joyMove(e){
 const t=[...e.changedTouches].find(x=>x.identifier===joyId);if(!t)return;
 let dx=t.clientX-joyCenter.x,dy=t.clientY-joyCenter.y,l=Math.hypot(dx,dy),max=36;
 if(l>max){dx*=max/l;dy*=max/l}
 stick.style.transform=`translate(${dx}px,${dy}px)`;
 keys["a"]=dx<-9;keys["d"]=dx>9;keys["w"]=dy<-9;keys["s"]=dy>9;
 e.preventDefault();
}
function joyEnd(e){
 if([...e.changedTouches].some(x=>x.identifier===joyId)){
   joyId=null;stick.style.transform="translate(0,0)";
   keys["a"]=keys["d"]=keys["w"]=keys["s"]=false;
 }
}
joy.addEventListener("touchstart",joyStart,{passive:false});
joy.addEventListener("touchmove",joyMove,{passive:false});
joy.addEventListener("touchend",joyEnd,{passive:false});
joy.addEventListener("touchcancel",joyEnd,{passive:false});
touchInteract.addEventListener("touchstart",e=>{e.preventDefault();interact()},{passive:false});
touchInteract.addEventListener("click",interact);
