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

const rooms=[
 {x:20,y:20,w:280,h:150,name:"OPEN SPACE A"},
 {x:330,y:20,w:250,h:150,name:"MEETING"},
 {x:610,y:20,w:330,h:150,name:"OPEN SPACE B"},
 {x:20,y:200,w:220,h:170,name:"RECEPTION"},
 {x:270,y:200,w:310,h:170,name:"CORRIDOR"},
 {x:610,y:200,w:330,h:170,name:"SERVER ROOM"},
 {x:20,y:400,w:300,h:120,name:"PRINT AREA"},
 {x:350,y:400,w:250,h:120,name:"IT DESK"},
 {x:630,y:400,w:310,h:120,name:"EXIT"}
];

const interactables=[
 {id:"pc_a",x:105,y:95,type:"pc",label:"PC — OPEN SPACE A",room:"OPEN SPACE A"},
 {id:"meeting",x:450,y:95,type:"screen",label:"VIDEOCONFERENZA",room:"MEETING"},
 {id:"pc_b",x:760,y:95,type:"pc",label:"PC — OPEN SPACE B",room:"OPEN SPACE B"},
 {id:"reception",x:105,y:290,type:"phone",label:"TELEFONO RECEPTION",room:"RECEPTION"},
 {id:"server",x:790,y:285,type:"server",label:"RACK SERVER",room:"SERVER ROOM"},
 {id:"printer",x:155,y:460,type:"printer",label:"STAMPANTE",room:"PRINT AREA"},
 {id:"it",x:475,y:460,type:"terminal",label:"TERMINALE IT",room:"IT DESK"},
 {id:"exit",x:850,y:460,type:"exit",label:"USCITA",room:"EXIT"}
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
 state={minute:540,stress:0,rep:3,xp:0,solved:0,failed:0};
 player={x:480,y:330,r:10,speed:150};
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
 const t={...base,created:state.minute,urgent:Math.random()<.28};
 if(t.urgent){t.title="URGENTISSIMO // "+t.title;t.stress+=4;t.xp+=40}
 tickets.push(t); addLog("Nuovo ticket: "+t.title,t.urgent?"bad":"");
 renderTickets();
}

function renderTickets(){
 $("#tickets").innerHTML=tickets.length?tickets.map(t=>`<div class="ticket ${t.urgent?"urgent":""}">
 <div class="ticket-title">${t.title}</div><div>${t.desc}</div><div class="ticket-location">→ ${interactables.find(i=>i.id===t.target).room}</div></div>`).join(""):`<div class="muted">Queue vuota. Troppo silenzio.</div>`;
 $("#ticketCount").textContent=tickets.length;
}

function formatTime(m){let h=Math.floor(m/60),mm=Math.floor(m%60);return `${String(h).padStart(2,"0")}:${String(mm).padStart(2,"0")}`}

function updateHUD(){
 $("#clock").textContent=formatTime(state.minute);
 $("#stress").textContent=Math.round(state.stress)+"%";
 $("#rep").textContent=Math.max(0,Math.min(5,state.rep))+"/5";
 $("#xp").textContent=state.xp;
}

function loop(now){
 if(!running)return;
 const dt=Math.min((now-last)/1000,.05);last=now;
 update(dt);draw();
 requestAnimationFrame(loop);
}

function update(dt){
 let dx=0,dy=0;
 if(keys["w"]||keys["arrowup"])dy-=1;if(keys["s"]||keys["arrowdown"])dy+=1;
 if(keys["a"]||keys["arrowleft"])dx-=1;if(keys["d"]||keys["arrowright"])dx+=1;
 if(dx||dy){const l=Math.hypot(dx,dy);player.x+=dx/l*player.speed*dt;player.y+=dy/l*player.speed*dt}
 player.x=Math.max(14,Math.min(W-14,player.x));player.y=Math.max(14,Math.min(H-14,player.y));

 state.minute += dt*3.25; // ~3 minutes per second
 spawnTimer+=dt;
 let spawnEvery=Math.max(5.5,12-(state.minute-540)/90);
 if(spawnTimer>spawnEvery && state.minute<1137){spawnTimer=0;spawnTicket(false)}
 horrorLevel=Math.max(0,(state.minute-1020)/120);

 if(state.minute>=1137&&!bossStarted){startBoss()}
 if(state.minute>=1162 && !bossStarted===false && running && tickets.length===0)endGame(true);
 if(state.stress>=100||state.rep<=0)endGame(false);

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
  state.xp+=t.xp;state.stress=Math.max(0,state.stress-t.stress*.65);state.rep=Math.min(5,state.rep+(Math.random()<.35?1:0));state.solved++;
  addLog("Risolto: "+t.title,"good");flash("TICKET RISOLTO +"+t.xp+" XP");
 }else{
  state.stress=Math.min(100,state.stress+t.stress);state.rep--;state.failed++;
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
   ctx.fillStyle=i===5?"#0c1010":"#0b0e0d";ctx.fillRect(r.x,r.y,r.w,r.h);
   ctx.strokeStyle="#28332d";ctx.strokeRect(r.x+.5,r.y+.5,r.w-1,r.h-1);
   ctx.fillStyle="#435149";ctx.font="11px monospace";ctx.fillText(r.name,r.x+10,r.y+17);
 });
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
 for(let x of [55,170,665,790]){ctx.fillRect(x,55,80,38);ctx.fillRect(x+10,105,55,8)}
 ctx.fillRect(375,65,160,55);
 ctx.fillRect(305,255,235,35);
 ctx.fillRect(665,235,230,90);
 ctx.fillStyle="#1c2420";for(let x=680;x<895;x+=35)ctx.fillRect(x,240,22,75);
 ctx.fillStyle="#161c19";ctx.fillRect(55,430,180,55);ctx.fillRect(395,430,150,55);
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
