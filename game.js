const $=s=>document.querySelector(s),C=$("#game"),g=C.getContext("2d");g.imageSmoothingEnabled=false;
const W=C.width,H=C.height,START=540,BOSS=1132,END=1140,TIME_SPEED=5.2;
const difficultyConfig={
 easy:{name:"EASY",maxStrikes:5,timeMult:1.55,stressMult:.75,incidentMult:.75,criticalChance:.08},
 normal:{name:"NORMAL",maxStrikes:3,timeMult:1.25,stressMult:1,incidentMult:1,criticalChance:.13},
 hard:{name:"HARD",maxStrikes:2,timeMult:1.00,stressMult:1.15,incidentMult:1.15,criticalChance:.17},
 nightmare:{name:"NIGHTMARE",maxStrikes:1,timeMult:.82,stressMult:1.3,incidentMult:1.3,criticalChance:.22}
};
let difficulty="normal";

const screens={boot:$("#boot"),lore:$("#lore"),game:$("#gameScreen")};function show(k){Object.values(screens).forEach(x=>x.classList.remove("active"));screens[k].classList.add("active")}
const boot=["[BOOT] ARCHEA IT SERVICES","[OK] Domain reachable","[OK] Autodesk licensing","[OK] File servers","[WARN] Orphan session detected","[USER] ARCH-VOID","[LAST LOGIN] 19:03"];
let bl=0;(function b(){if(bl<boot.length){$("#bootlog").innerHTML+=boot[bl++]+"<br>";setTimeout(b,280)}else $("#toLore").classList.remove("hidden")})();$("#toLore").onclick=()=>show("lore");$("#start").onclick=()=>{difficulty=$("#difficulty")?.value||"normal";show("game");reset();requestAnimationFrame(loop)};

const rooms=[
{name:"GRAFICA",x:30,y:55,w:250,h:210,f:"stone"},{name:"CENTRALE",x:300,y:55,w:205,h:210,f:"stone"},{name:"SERVER / SOPPALCO",x:525,y:55,w:230,h:210,f:"server"},
{name:"ABA",x:30,y:310,w:210,h:185,f:"stone"},{name:"LOFT",x:30,y:535,w:210,h:180,f:"wood"},{name:"IT",x:315,y:310,w:440,h:355,f:"stone"},
{name:"SALA MEET",x:840,y:55,w:190,h:270,f:"stone"},{name:"CONTRATTI",x:1050,y:55,w:170,h:270,f:"wood"},{name:"PANTHEON",x:1240,y:55,w:210,h:270,f:"wood"},
{name:"SPAZIO A",x:840,y:365,w:300,h:185,f:"stone"},{name:"BAGNI",x:840,y:585,w:180,h:125,f:"tile"},{name:"RIFUGIO DIGITALE",x:1040,y:585,w:180,h:125,f:"wood"},
{name:"SALA CORTE",x:1290,y:400,w:280,h:290,f:"wood"},{name:"INGRESSO",x:410,y:735,w:345,h:130,f:"stone"},{name:"CUCINA",x:840,y:735,w:285,h:130,f:"tile"},{name:"STAMPANTI",x:1145,y:735,w:285,h:130,f:"stone"}];
// NAVIGATION LAYER: corridoi enormi e porte sovradimensionate. Nessun bordo grafico è una collisione.
/*
 V2.1 NAVIGATION
 Ogni stanza ha un'area interna; ogni porta è un vero "ponte" che sovrappone
 stanza + corridoio. I corridoi sono volutamente larghi.
*/
const roomFloors=rooms.map(r=>({x:r.x+8,y:r.y+8,w:r.w-16,h:r.h-16}));
const corridors=[
 {x:235,y:250,w:555,h:78},       // corridoio alto sinistra
 {x:235,y:690,w:560,h:88},       // corridoio basso sinistra
 {x:745,y:35,w:105,h:835},       // dorsale centrale
 {x:805,y:310,w:485,h:88},       // corridoio alto destra
 {x:805,y:690,w:655,h:88},       // corridoio basso destra
 {x:1205,y:300,w:100,h:455},     // dorsale destra
 {x:1260,y:665,w:205,h:95}       // raccordo sala corte
];
const doors=[
 // GRAFICA -> corridoio
 {x:245,y:235,w:75,h:105},
 // CENTRALE -> corridoio
 {x:455,y:235,w:85,h:105},
 // SERVER -> dorsale centrale
 {x:710,y:180,w:145,h:105},
 // ABA -> corridoio alto e LOFT -> corridoio basso
 {x:205,y:330,w:95,h:120},{x:205,y:595,w:95,h:130},
 // IT -> corridoio alto, dorsale, corridoio basso
 {x:285,y:265,w:105,h:105},{x:700,y:300,w:155,h:130},{x:690,y:610,w:165,h:135},
 // SALA MEET -> dorsale centrale
 {x:800,y:210,w:105,h:135},
 // CONTRATTI -> corridoio alto dx
 {x:1020,y:260,w:100,h:130},
 // PANTHEON -> corridoio alto dx
 {x:1190,y:255,w:120,h:140},
 // SPAZIO A -> corridoio alto dx + dorsale destra
 {x:805,y:350,w:105,h:125},{x:1095,y:430,w:150,h:130},
 // BAGNI / RIFUGIO -> corridoio basso dx
 {x:805,y:620,w:105,h:135},{x:900,y:665,w:110,h:105},{x:1080,y:660,w:120,h:110},
 // SALA CORTE -> dorsale destra / raccordo basso
 {x:1240,y:500,w:115,h:135},{x:1240,y:640,w:130,h:125},
 // INGRESSO -> corridoio basso sinistra + dorsale
 {x:650,y:675,w:150,h:130},{x:735,y:735,w:120,h:125},
 // CUCINA / STAMPANTI -> corridoio basso dx
 {x:805,y:720,w:120,h:140},{x:1080,y:710,w:120,h:150},{x:1370,y:710,w:100,h:150}
];
const walkZones=[...roomFloors,...corridors,...doors];
const obstacles=[
{x:385,y:420,w:290,h:42},{x:385,y:350,w:245,h:35},{x:75,y:145,w:155,h:45},{x:340,y:145,w:120,h:55},{x:565,y:115,w:150,h:90},
{x:75,y:385,w:125,h:55},{x:75,y:600,w:125,h:55},{x:885,y:160,w:105,h:115},{x:1080,y:155,w:100,h:60},{x:1280,y:155,w:125,h:70},{x:890,y:435,w:190,h:60},{x:1330,y:495,w:185,h:85},{x:885,y:775,w:180,h:55},{x:1190,y:775,w:190,h:60}
];
const points=[
{x:155,y:205,room:"GRAFICA",kind:"PC"},{x:400,y:205,room:"CENTRALE",kind:"PC"},{x:640,y:205,room:"SERVER / SOPPALCO",kind:"SERVER"},{x:140,y:450,room:"ABA",kind:"PC"},{x:140,y:660,room:"LOFT",kind:"PC"},
{x:535,y:560,room:"IT",kind:"PC"},{x:940,y:285,room:"SALA MEET",kind:"MEETING"},{x:1135,y:285,room:"CONTRATTI",kind:"PC"},{x:1345,y:285,room:"PANTHEON",kind:"PC"},{x:1010,y:520,room:"SPAZIO A",kind:"PC"},
{x:1120,y:680,room:"RIFUGIO DIGITALE",kind:"PC"},{x:1430,y:650,room:"SALA CORTE",kind:"MEETING"},{x:1020,y:835,room:"CUCINA",kind:"COFFEE"},{x:1290,y:835,room:"STAMPANTI",kind:"PRINTER"}];
const bosses=["DIREZIONE","PRESIDENZA","CAPO ASSOLUTO"];
const questions={
LOW:[
["Un solo PC non naviga, mentre gli altri funzionano. Primo controllo sensato?",["Riavviare il domain controller","Verificare IP, gateway e connettività del PC","Formattare il PC","Disinstallare Revit"],1],
["Un monitor è nero ma il PC sembra acceso. Cosa controlli prima?",["DNS","Licenza Autodesk","Alimentazione, input e cavo del monitor","GPO"],2],
["Una stampante locale risulta offline. Primo passo?",["Reinstallare Windows","Spegnere lo switch core","Cambiare dominio","Controllare alimentazione, collegamento e coda"],3],
["Un utente dice che tastiera e mouse non rispondono. Primo controllo?",["Collegamento/ricevitore, batteria e porte USB","Riavvio file server","Reset DNS","Reinstallazione Autodesk"],0],
["Il Wi-Fi non funziona su un solo portatile. Cosa verifichi prima?",["Riavviare tutti gli access point","Scheda Wi-Fi, rete associata e configurazione IP del client","Cambiare password di dominio a tutti","Spegnere il firewall aziendale"],1]
],
MEDIUM:[
["Un nome server non risolve ma il ping all'IP funziona. Quale componente sospetti?",["GPU","HDMI","DNS","Bluetooth"],2],
["Una share di rete non è raggiungibile da un solo utente. Cosa verifichi?",["Formatti il file server","Connettività, mapping e permessi dell'utente","Resetti tutti gli switch","Disinstalli Office"],1],
["Desktop Connector non sincronizza correttamente. Quale approccio è più sensato?",["Cancellare il progetto BIM","Cambiare scheda video","Spegnere il server","Verificare stato client, account, cache e log prima del reset"],3],
["Un utente accede a Internet ma non alle risorse interne. Quale verifica è più utile?",["DNS interno, routing/VPN e autenticazione","Cambiare monitor","Reinstallare stampante","Aggiornare il BIOS senza diagnosi"],0],
["Una stampante di rete risponde al ping ma non stampa. Passo successivo?",["Riavviare il dominio","Controllare coda, spooler, driver e porta configurata","Cambiare VLAN a tutto l'ufficio","Formattare il print server"],1]
],
HIGH:[
["Più utenti perdono contemporaneamente accesso alle risorse di rete. Prima priorità?",["Formattare un client","Cambiare mouse","Determinare ampiezza incidente e verificare rete/servizi centrali","Riavviare ogni PC singolarmente"],2],
["Un servizio critico è irraggiungibile. Qual è la diagnosi più corretta?",["Riavviare tutto senza verifiche","Verificare host, rete, servizio e log prima di intervenire","Eliminare DNS","Disabilitare antivirus ovunque"],1],
["Problemi di autenticazione coinvolgono molti utenti. Cosa controlli?",["Driver stampante","HDMI sala meeting","Luminosità monitor","Servizi di dominio, DNS, connettività e log"],3],
["Dopo una modifica di rete molti client non raggiungono più un server. Cosa fai prima?",["Confronti configurazione precedente, routing/VLAN/firewall e log","Reinstalli Windows sui client","Cancelli i profili utente","Sostituisci tutti i cavi HDMI"],0],
["Un file server mostra latenze improvvise per tutti. Prima diagnosi?",["Cambiare mouse agli utenti","Controllare risorse host, storage, rete e log eventi","Resettare Desktop Connector","Disinstallare Office"],1]
],
CRITICAL:[
["CRITICAL: «Il PDF non si apre». Qual è la prima verifica sensata?",["Riavviare tutti i server","Capire file, applicazione, errore e provare un'apertura controllata","Resettare il dominio","Cambiare VLAN"],1],
["CRITICAL: «Il mouse non va». Cosa fai?",["Riavvio hypervisor","Reset DNS aziendale","Formatto il PC","Controllo collegamento, batteria, porta e prova rapida"],3],
["CRITICAL: «La TV non si vede». Primo controllo?",["Input, sorgente, cavo e stato display","Riavvio domain controller","Reset Autodesk Licensing","Elimino profilo Windows"],0],
["CRITICAL: «Non trovo l'icona sul desktop». Prima risposta tecnica sensata?",["Riavviare lo storage","Verificare cosa cerca l'utente e dove dovrebbe trovarsi","Cambiare VLAN","Reset del dominio"],1]
]};

const npcs=[
 {id:"matteo",name:"MATTEO",x:600,y:525,room:"IT",role:"IT MANAGER",effect:"bonus",line:"Controlla prima i log. Sempre.",bonus:"FOCUS",desc:"Il prossimo errore non aumenta lo stress.",shirt:"#536b76"},
 {id:"cristian",name:"CRISTIAN",x:690,y:570,room:"IT",role:"IT",effect:"bonus",line:"Ho già controllato la postazione, prova adesso.",bonus:"TEMPO",desc:"+12 minuti sulla deadline del ticket più urgente.",shirt:"#465e8a"},
 {id:"razvan",name:"RAZVAN",x:470,y:570,room:"IT",role:"IT",effect:"bonus",line:"Aspetta, questa l'ho già vista.",bonus:"DIAGNOSI",desc:"Rivela una risposta errata nella prossima task.",shirt:"#685b77"},
 {id:"utente_grafica",name:"UTENTE GRAFICA",x:185,y:115,room:"GRAFICA",role:"ARCHITETTO",effect:"malus",line:"Già che sei qui... avrei anche un'altra cosina.",bonus:"INTERRUZIONE",desc:"+6% stress.",shirt:"#745b48"},
 {id:"utente_aba",name:"UTENTE ABA",x:145,y:365,room:"ABA",role:"ARCHITETTO",effect:"malus",line:"È urgentissimo. Cioè, non proprio, però mi serve.",bonus:"URGENZA",desc:"-8 minuti dal ticket più urgente.",shirt:"#6c4d4d"},
 {id:"direzione",name:"DIREZIONE",x:1135,y:120,room:"CONTRATTI",role:"DIREZIONE",effect:"mixed",line:"Ho un problema velocissimo.",bonus:"PRIORITÀ",desc:"Può generare un CRITICAL, ma vale XP extra.",shirt:"#7b6542"},
 {id:"laura",name:"LAURA",x:935,y:120,room:"SALA MEET",role:"MEETING",effect:"bonus",line:"Ti ho lasciato libera la sala. Hai due minuti di pace.",bonus:"CALMA",desc:"-8% stress.",shirt:"#536d5c"},
 {id:"fantasma",name:"???",x:1510,y:590,room:"SALA CORTE",role:"UNKNOWN",effect:"anomaly",line:"19:03",bonus:"ANOMALIA",desc:"Non dovrebbe essere qui.",shirt:"#27242d"}
];
let npcCooldowns={},npcHint=null,npcReveal=false,npcStressShield=false;

function shuffledQuestion(q){
 const pairs=q[1].map((text,i)=>({text,correct:i===q[2]}));
 for(let i=pairs.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pairs[i],pairs[j]]=[pairs[j],pairs[i]]}
 return [q[0],pairs.map(x=>x.text),pairs.findIndex(x=>x.correct)];
}
function nearestNPC(){
 return npcs.map(n=>({n,d:Math.hypot(player.x-n.x,player.y-n.y)})).sort((a,b)=>a.d-b.d)[0];
}
function interactNPC(n){
 const now=state.min,last=npcCooldowns[n.id]??-999;
 if(now-last<45){toast(`${n.name}: ci siamo già parlati.`);return}
 npcCooldowns[n.id]=now;
 let extra="";
 if(n.id==="matteo"){npcStressShield=true;extra="FOCUS ATTIVO";}
 else if(n.id==="cristian"){
   let t=[...tickets].sort((a,b)=>a.due-b.due)[0];if(t)t.due=Math.min(BOSS-.2,t.due+12);extra=t?"+12 MINUTI":"NESSUN TICKET APERTO";
 }
 else if(n.id==="razvan"){npcReveal=true;extra="PROSSIMA TASK: UNA RISPOSTA ERRATA SARÀ SEGNALATA";}
 else if(n.id==="utente_grafica"){state.stress+=6*difficultyConfig[difficulty].stressMult;extra="+STRESS";}
 else if(n.id==="utente_aba"){
   let t=[...tickets].sort((a,b)=>a.due-b.due)[0];if(t)t.due=Math.max(state.min+5,t.due-8);extra=t?"DEADLINE ANTICIPATA":"NESSUN TICKET APERTO";
 }
 else if(n.id==="direzione"){newTicket("CRITICAL");extra="NUOVO CRITICAL";}
 else if(n.id==="laura"){state.stress-=8;extra="-8% STRESS";}
 else if(n.id==="fantasma"){showAnomaly("L'NPC NON COMPARE NELLA LISTA UTENTI.",3200);state.incident+=4;extra="INCIDENT +4%";}
 clamp();renderTickets();hud();
 $("#modalBody").innerHTML=`<h2 class="${n.effect==="malus"?"critical":n.effect==="bonus"?"low":"medium"}">${n.name}</h2><p><b>${n.role}</b></p><p>«${n.line}»</p><p><b>${n.bonus}</b><br>${n.desc}</p><p>${extra}</p>`;
 $("#modal").classList.remove("hidden");
}


let state,player,tickets,last,spawnTimer,anomTimer,debug=false,keys={};

function reachableSet(){
 const step=12,sx=Math.round(535/step),sy=Math.round(610/step),q=[[sx,sy]],seen=new Set([sx+","+sy]);
 const D=[[1,0],[-1,0],[0,1],[0,-1]];
 while(q.length){
  const [gx,gy]=q.shift();
  for(const [dx,dy] of D){
   const nx=gx+dx,ny=gy+dy,k=nx+","+ny,x=nx*step,y=ny*step;
   if(x<0||y<0||x>W||y>H||seen.has(k)||!walkable(x,y))continue;
   seen.add(k);q.push([nx,ny]);
  }
 }
 return {seen,step};
}
function pointReachable(p,R){
 const gx=Math.round(p.x/R.step),gy=Math.round(p.y/R.step);
 // accetta anche celle vicine: il marker può stare sopra un mobile, l'interazione è a distanza
 for(let y=-5;y<=5;y++)for(let x=-5;x<=5;x++)if(R.seen.has((gx+x)+","+(gy+y)))return true;
 return false;
}
function validateMap(){
 const R=reachableSet(),bad=points.filter(p=>!pointReachable(p,R));
 console.log("V2.1 MAP CHECK:",bad.length?"UNREACHABLE":"ALL TASK ZONES REACHABLE",bad);
 return bad;
}
function reset(){const bad=validateMap();if(bad.length)console.warn("Unreachable task points disabled:",bad);state={phase:"shift",min:START,stress:0,rep:5,xp:0,incident:0,strikes:0,maxStrikes:difficultyConfig[difficulty].maxStrikes,solved:0,anomalyPenalty:0,bossPhase:0};player={x:535,y:610,s:205};tickets=[];npcCooldowns={};npcReveal=false;npcStressShield=false;last=performance.now();spawnTimer=0;anomTimer=0;newTicket("LOW");hud()}
function inside(r,x,y,p=0){return x>=r.x+p&&x<=r.x+r.w-p&&y>=r.y+p&&y<=r.y+r.h-p}
function walkable(x,y){if(!walkZones.some(z=>inside(z,x,y)))return false;return !obstacles.some(o=>x>o.x+5&&x<o.x+o.w-5&&y>o.y+5&&y<o.y+o.h-5)}
function fmt(m){m=Math.max(START,Math.min(END,m));return String(Math.floor(m/60)).padStart(2,"0")+":"+String(Math.floor(m%60)).padStart(2,"0")}
function anomalyLevel(){return Math.max(0,Math.min(1,(state.min-START)/(BOSS-START)))}
function levelForTime(){let a=Math.random();if(state.min<720)return a<.75?"LOW":"MEDIUM";if(state.min<900)return a<.45?"LOW":a<.88?"MEDIUM":"HIGH";return a<.2?"LOW":a<.65?"MEDIUM":"HIGH"}
function reachablePoints(){const R=reachableSet();return points.filter(p=>pointReachable(p,R))}
function farthestPoint(){let ps=reachablePoints();return [...ps].sort((a,b)=>Math.hypot(player.x-b.x,player.y-b.y)-Math.hypot(player.x-a.x,player.y-a.y))[0]}
function newTicket(force){
 if(state.phase!=="shift"||tickets.length>=4)return;
 let level=force||levelForTime(),p;
 let valid=reachablePoints();if(!valid.length)return;if(level==="CRITICAL")p=farthestPoint();else p=valid[Math.floor(Math.random()*valid.length)];
 let mins={LOW:95,MEDIUM:75,HIGH:55,CRITICAL:30}[level]*difficultyConfig[difficulty].timeMult;
 tickets.push({id:crypto.randomUUID?crypto.randomUUID():Math.random()+"",level,p,due:Math.min(BOSS-.2,state.min+mins),q:shuffledQuestion(questions[level][Math.floor(Math.random()*questions[level].length)]),criticalFrom:level==="CRITICAL"?bosses[Math.floor(Math.random()*bosses.length)]:null,expired:false});
 renderTickets();
}
function renderTickets(){
 $("#ticketText").innerHTML=tickets.length?tickets.map(t=>`<div class="ticket ${t.level.toLowerCase()}"><b>${t.level}${t.criticalFrom?" // "+t.criticalFrom:""}</b><br>${t.p.room} — ${t.p.kind}<br>deadline ${fmt(t.due)}</div>`).join(""):"Nessun ticket aperto.";
}
function interact(){
 if(state.phase!=="shift")return;
 let i=tickets.findIndex(t=>Math.hypot(player.x-t.p.x,player.y-t.p.y)<75);
 if(i<0){
   let near=nearestNPC();
   if(near&&near.d<58){interactNPC(near.n);return}
   toast("Nessuna task o NPC in questo punto.");return
 }
 let t=tickets[i],q=t.q;
 $("#modalBody").innerHTML=`<h2 class="${t.level.toLowerCase()}">${t.level}${t.criticalFrom?" // "+t.criticalFrom:""}</h2><p><b>${t.p.room}</b></p><p>${q[0]}</p>${q[1].map((a,n)=>`<button class="choice answer${npcReveal&&n!==q[2]?" npc-wrong":""}" data-n="${n}">${String.fromCharCode(65+n)}. ${a}${npcReveal&&n!==q[2]?"  [DIAGNOSI: improbabile]":""}</button>`).join("")}`;
 $("#modal").classList.remove("hidden");if(npcReveal)npcReveal=false;document.querySelectorAll(".answer").forEach(b=>b.onclick=()=>answer(i,+b.dataset.n));
}
function answer(i,n){
 let t=tickets[i],ok=n===t.q[2],xp={LOW:100,MEDIUM:250,HIGH:500,CRITICAL:750}[t.level];
 tickets.splice(i,1);$("#modal").classList.add("hidden");
 if(ok){state.xp+=xp;state.solved++;state.incident-=({LOW:2,MEDIUM:4,HIGH:7,CRITICAL:8}[t.level]);state.stress-=4;toast(`${t.level} RISOLTO +${xp} XP`)}
 else{state.strikes++;if(npcStressShield){npcStressShield=false;toast("FOCUS // STRESS ASSORBITO")}else state.stress+=({LOW:7,MEDIUM:12,HIGH:18,CRITICAL:20}[t.level])*difficultyConfig[difficulty].stressMult;state.incident+=({LOW:5,MEDIUM:9,HIGH:15,CRITICAL:18}[t.level])*difficultyConfig[difficulty].incidentMult;state.rep-=t.level==="CRITICAL"?2:1;toast("RISPOSTA ERRATA // STRIKE +1")}
 clamp();renderTickets();checkEarlyEnd();
}
function expireTickets(){for(const t of tickets)if(!t.expired&&state.min>=t.due){t.expired=true;state.strikes++;state.incident+=(t.level==="CRITICAL"?22:({LOW:7,MEDIUM:12,HIGH:18}[t.level]))*difficultyConfig[difficulty].incidentMult;state.stress+=10*difficultyConfig[difficulty].stressMult;state.rep-=t.level==="CRITICAL"?2:1;toast(`${t.level} SCADUTO // STRIKE +1`) }checkEarlyEnd()}
function checkEarlyEnd(){clamp();if(state.strikes>=state.maxStrikes)return ending("IMPOSTORE","Troppi interventi errati. Le tue credenziali IT vengono revocate.");if(state.rep<=0)return ending("LICENZIATO","La reputazione è crollata. ACCESS REVOKED.");if(state.incident>=100)return ending("MAJOR INCIDENT","L'infrastruttura dello studio è offline.");if(state.stress>=100)return ending("BURNOUT","Non riesci più a gestire il turno.")}
function showAnomaly(text,duration=2600){
 const o=$("#anomalyOverlay"),t=$("#anomalyText");
 t.textContent=text;
 o.classList.remove("hidden");
 clearTimeout(o._timer);
 o._timer=setTimeout(()=>o.classList.add("hidden"),duration);
}
function anomalyEvent(){
 let a=anomalyLevel(),r=Math.random(),msg;
 if(a<.2)msg=["UN MONITOR SI ACCENDE PER UN ISTANTE.","IL TELEFONO SQUILLA. UNA SOLA VOLTA.","UN TICKET DUPLICATO COMPARE E SCOMPARE."][Math.floor(r*3)];
 else if(a<.45)msg=["LA STAMPANTE PRODUCE UNA PAGINA VUOTA.","UN PC SENZA UTENTE SI ACCENDE.","QUALCOSA BATTE DENTRO IL SERVER RACK."][Math.floor(r*3)];
 else if(a<.7)msg=["SESSIONE SENZA PROPRIETARIO RILEVATA.","LE LUCI DEL CORRIDOIO TREMANO.","ARRIVA UN TICKET DA UN UTENTE ASSENTE."][Math.floor(r*3)];
 else msg=["19:03 COMPARE SU TUTTI I MONITOR.","QUALCOSA ATTRAVERSA IL CORRIDOIO.","ARCH-VOID COMPARE NEI LOG.","TUTTI I TELEFONI MOSTRANO INTERNO 000."][Math.floor(r*4)];
 showAnomaly(msg,a>.7?3300:2500);
 if(a>.55&&Math.random()<.25){state.anomalyPenalty++;state.stress+=3*difficultyConfig[difficulty].stressMult}
}
function maybeCritical(){if(state.min>600&&Math.random()<difficultyConfig[difficulty].criticalChance)newTicket("CRITICAL")}
function startBoss(){
 state.phase="boss";state.min=BOSS;tickets=[];renderTickets();state.bossPhase=1;bossModal();
}
const bossQs=[
["FASE 1 // IDENTIFICAZIONE","ARCH-VOID sta aprendo sessioni anomale. Qual è il primo approccio?",["Isolare e raccogliere evidenze/log","Aprire la cartella 19_03","Spegnere tutto"],0],
["FASE 2 // CONTENIMENTO","La sessione si propaga. Cosa fai?",["Bloccare account/sessione e segmentare il problema","Ignorare gli alert","Cancellare i log"],0],
["FASE 3 // ERADICAZIONE","Hai isolato la sorgente. Ultima azione?",["Rimuovere persistenza, verificare sistemi e ripristinare controllato","Riattivare subito tutto senza test","Dare privilegi admin ad ARCH-VOID"],0]
];
function bossModal(){
 let q=bossQs[state.bossPhase-1];
 $("#modalBody").innerHTML=`<h2 class="critical">18:52 // INTERNO 000</h2><p>«Ciao, scusa l'orario. Hai un secondo?»</p><h3>${q[0]}</h3><p>${q[1]}</p>${q[2].map((a,n)=>`<button class="choice bossans" data-n="${n}">${a}</button>`).join("")}`;
 $("#modal").classList.remove("hidden");document.querySelectorAll(".bossans").forEach(b=>b.onclick=()=>bossAnswer(+b.dataset.n));
}
function bossAnswer(n){
 let q=bossQs[state.bossPhase-1];
 if(n!==q[3]){state.incident+=28+state.anomalyPenalty*2;state.stress+=15;clamp();if(state.incident>=100||state.bossPhase===3)return ending("ARCH-VOID","ARCH-VOID ottiene privilegi amministrativi. YOU HAVE BEEN REPLACED.");}
 else state.xp+=500;
 if(state.bossPhase<3){state.bossPhase++;bossModal()}else ending("WIN","ARCH-VOID // SESSION TERMINATED",true);
}
function ending(type,text,win=false){state.phase="ended";state.min=END;clamp();$("#modalBody").innerHTML=`<h2 class="${win?"low":"critical"}">${win?"SHIFT COMPLETE // 19:00":"BAD ENDING // "+type}</h2><p>${text}</p><p>XP <b>${state.xp}</b> · ERRORI <b>${state.strikes}/${state.maxStrikes}</b> · INCIDENT <b>${Math.round(state.incident)}%</b></p>${win?'<p>New login detected... <b>ARCH-VOID // 19:03</b></p>':""}<button class="choice" onclick="location.reload()">NUOVA PARTITA</button>`;$("#modal").classList.remove("hidden")}
function clamp(){state.incident=Math.max(0,Math.min(100,state.incident));state.stress=Math.max(0,Math.min(100,state.stress));state.rep=Math.max(0,Math.min(5,state.rep))}
$("#x").onclick=()=>{if(state&&state.phase!=="shift"){toast("Questo evento non può essere ignorato.");return}$("#modal").classList.add("hidden")};
function hud(){clamp();$("#clock").textContent=fmt(state.min);$("#stress").textContent=Math.round(state.stress)+"%";$("#rep").textContent="★".repeat(state.rep)+"☆".repeat(5-state.rep);$("#strikes").textContent=state.strikes+"/"+state.maxStrikes;$("#xp").textContent=state.xp;$("#incident").textContent=Math.round(state.incident)+"%"}
function update(dt){
 if(state.phase==="shift"){
  let dx=(keys.d||keys.arrowright?1:0)-(keys.a||keys.arrowleft?1:0),dy=(keys.s||keys.arrowdown?1:0)-(keys.w||keys.arrowup?1:0);
  if(dx||dy){let l=Math.hypot(dx,dy),vx=dx/l*player.s*dt,vy=dy/l*player.s*dt;if(walkable(player.x+vx,player.y))player.x+=vx;if(walkable(player.x,player.y+vy))player.y+=vy}
  state.min=Math.min(BOSS,state.min+dt*TIME_SPEED);if(state.min>=BOSS){startBoss();hud();return}
  spawnTimer+=dt;anomTimer+=dt;if(spawnTimer>11){spawnTimer=0;newTicket();maybeCritical()}if(anomTimer>Math.max(5,14-anomalyLevel()*8)){anomTimer=0;anomalyEvent()}
  expireTickets();
 } else if(state.phase==="boss")state.min=BOSS;else state.min=END;
 hud();
}

/* V2.2 VISUAL MAP PASS — navigation/collisioni INALTERATE */
function floor(r){
 const pal={
  stone:["#1b201d","#232a25"],wood:["#2a1b10","#3a2617"],
  tile:["#18211d","#25302a"],server:["#101613","#17221d"]
 }[r.f]||["#1b201d","#232a25"];
 g.fillStyle=pal[0];g.fillRect(r.x,r.y,r.w,r.h);
 g.strokeStyle=pal[1];g.lineWidth=1;
 if(r.f==="wood"){
  for(let x=r.x+10;x<r.x+r.w;x+=25){g.beginPath();g.moveTo(x,r.y);g.lineTo(x,r.y+r.h);g.stroke()}
  for(let y=r.y+18;y<r.y+r.h;y+=34){g.beginPath();g.moveTo(r.x,y);g.lineTo(r.x+r.w,y);g.stroke()}
 }else if(r.f==="tile"){
  for(let x=r.x+15;x<r.x+r.w;x+=28){g.beginPath();g.moveTo(x,r.y);g.lineTo(x,r.y+r.h);g.stroke()}
  for(let y=r.y+15;y<r.y+r.h;y+=28){g.beginPath();g.moveTo(r.x,y);g.lineTo(r.x+r.w,y);g.stroke()}
 }else{
  for(let y=r.y+10;y<r.y+r.h;y+=15){g.beginPath();g.moveTo(r.x,y);g.lineTo(r.x+r.w,y);g.stroke()}
 }
}
function visualCorridor(z){
 const i=11,x=z.x+i,y=z.y+i,w=Math.max(1,z.w-i*2),h=Math.max(1,z.h-i*2);
 g.fillStyle="#2b1c11";g.fillRect(x,y,w,h);
 g.strokeStyle="#3b2718";g.lineWidth=1;
 if(w>h){for(let xx=x+8;xx<x+w;xx+=26){g.beginPath();g.moveTo(xx,y);g.lineTo(xx,y+h);g.stroke()}}
 else{for(let yy=y+8;yy<y+h;yy+=26){g.beginPath();g.moveTo(x,yy);g.lineTo(x+w,yy);g.stroke()}}
 g.fillStyle="rgba(0,0,0,.20)";
 g.fillRect(x,y,w,5);g.fillRect(x,y+h-5,w,5);g.fillRect(x,y,5,h);g.fillRect(x+w-5,y,5,h);
}
function wallRect(x,y,w,h){
 g.fillStyle="#69736b";g.fillRect(x,y,w,h);
 g.fillStyle="#303731";g.fillRect(x+2,y+2,w-4,h-4);
}
function drawRoomWalls(r){
 const t=8;
 wallRect(r.x,r.y,r.w,t);wallRect(r.x,r.y+r.h-t,r.w,t);
 wallRect(r.x,r.y,t,r.h);wallRect(r.x+r.w-t,r.y,t,r.h);
 g.fillStyle="rgba(0,0,0,.22)";g.fillRect(r.x+t,r.y+t,r.w-t*2,5);g.fillRect(r.x+t,r.y+t,5,r.h-t*2);
}

function doorwayFloorColor(r){
 return r.f==="wood" ? "#2a1b10" : r.f==="tile" ? "#18211d" : r.f==="server" ? "#101613" : "#1b201d";
}

/*
 V2.2.2 DOOR PASS
 Non disegna più un rettangolo "porta" nel centro della doorZone.
 Usa invece la doorZone soltanto per trovare il muro reale della stanza
 che deve essere interrotto. La collisione resta identica e permissiva.
*/
function visualDoor(z){
 const wallT=12;
 rooms.forEach(r=>{
   const overlapX=Math.min(z.x+z.w,r.x+r.w)-Math.max(z.x,r.x);
   const overlapY=Math.min(z.y+z.h,r.y+r.h)-Math.max(z.y,r.y);
   const color=doorwayFloorColor(r);

   // Porta su parete superiore
   if(overlapX>12 && z.y <= r.y+wallT && z.y+z.h >= r.y-wallT){
     const center=Math.max(r.x+24,Math.min(r.x+r.w-24,z.x+z.w/2));
     const width=Math.min(48,Math.max(34,overlapX*.72));
     const x=center-width/2;
     g.fillStyle=color;g.fillRect(x,r.y-3,width,18);
     // stipiti
     g.fillStyle="#8b5a31";g.fillRect(x-4,r.y-3,4,18);g.fillRect(x+width,r.y-3,4,18);
     g.fillStyle="#c09155";g.fillRect(x-4,r.y-3,width+8,3);
   }

   // Porta su parete inferiore
   if(overlapX>12 && z.y <= r.y+r.h+wallT && z.y+z.h >= r.y+r.h-wallT){
     const center=Math.max(r.x+24,Math.min(r.x+r.w-24,z.x+z.w/2));
     const width=Math.min(48,Math.max(34,overlapX*.72));
     const x=center-width/2,y=r.y+r.h-14;
     g.fillStyle=color;g.fillRect(x,y,width,18);
     g.fillStyle="#8b5a31";g.fillRect(x-4,y,4,18);g.fillRect(x+width,y,4,18);
     g.fillStyle="#c09155";g.fillRect(x-4,y+15,width+8,3);
   }

   // Porta su parete sinistra
   if(overlapY>12 && z.x <= r.x+wallT && z.x+z.w >= r.x-wallT){
     const center=Math.max(r.y+24,Math.min(r.y+r.h-24,z.y+z.h/2));
     const height=Math.min(52,Math.max(36,overlapY*.72));
     const y=center-height/2;
     g.fillStyle=color;g.fillRect(r.x-3,y,18,height);
     g.fillStyle="#8b5a31";g.fillRect(r.x-3,y-4,18,4);g.fillRect(r.x-3,y+height,18,4);
     g.fillStyle="#c09155";g.fillRect(r.x-3,y-4,3,height+8);
   }

   // Porta su parete destra
   if(overlapY>12 && z.x <= r.x+r.w+wallT && z.x+z.w >= r.x+r.w-wallT){
     const center=Math.max(r.y+24,Math.min(r.y+r.h-24,z.y+z.h/2));
     const height=Math.min(52,Math.max(36,overlapY*.72));
     const y=center-height/2,x=r.x+r.w-14;
     g.fillStyle=color;g.fillRect(x,y,18,height);
     g.fillStyle="#8b5a31";g.fillRect(x,y-4,18,4);g.fillRect(x,y+height,18,4);
     g.fillStyle="#c09155";g.fillRect(x+15,y-4,3,height+8);
   }
 });
}
function desk(x,y,w){
 g.fillStyle="rgba(0,0,0,.25)";g.fillRect(x+4,y+5,w,30);
 g.fillStyle="#5b3a20";g.fillRect(x,y,w,27);
 g.fillStyle="#7b4d27";g.fillRect(x,y,w,4);
 for(let i=8;i<w-28;i+=45){
  g.fillStyle="#26312c";g.fillRect(x+i,y-25,32,21);
  g.fillStyle="#4d94b3";g.fillRect(x+i+4,y-21,24,13);
  g.fillStyle="#111512";g.fillRect(x+i+5,y+32,24,16);
 }
}
function plant(x,y){
 g.fillStyle="#4d321d";g.fillRect(x,y,14,16);
 g.fillStyle="#276c3c";g.beginPath();g.arc(x+7,y-7,12,0,Math.PI*2);g.fill();
 g.fillStyle="#3a8a52";g.beginPath();g.arc(x+1,y-11,6,0,Math.PI*2);g.fill();
}
function lightFixture(x,y,w=44){
 g.fillStyle="#ddd7b9";g.fillRect(x,y,w,4);
 g.fillStyle="rgba(255,240,180,.05)";g.fillRect(x-12,y+4,w+24,24);
}
function serverRack(x,y){
 g.fillStyle="#111916";g.fillRect(x,y,34,92);g.strokeStyle="#3f5148";g.strokeRect(x,y,34,92);
 for(let yy=y+10;yy<y+84;yy+=11){g.fillStyle=(yy%22===0)?"#37c276":"#1c8059";g.fillRect(x+7,yy,3,3);g.fillStyle="#2b3731";g.fillRect(x+13,yy,14,3)}
}
function printer(x,y){
 g.fillStyle="#d0d0c5";g.fillRect(x,y,30,34);g.fillStyle="#8d928d";g.fillRect(x+4,y+5,22,9);
 g.fillStyle="#2c3431";g.fillRect(x+8,y+20,14,7);g.fillStyle="#f2eee0";g.fillRect(x+7,y-5,16,8);
}
function furniture(){
 desk(80,185,150);desk(340,185,120);desk(390,455,280);desk(390,380,240);
 desk(890,470,180);desk(1090,200,100);desk(1280,200,125);desk(1340,540,180);
 desk(890,810,170);desk(1190,810,190);
 for(let x=565;x<710;x+=42)serverRack(x,115);
 printer(1210,785);printer(1250,785);printer(1290,785);
 [[250,220],[470,220],[815,300],[1140,300],[1285,635],[1040,825],[430,825],[75,330],[85,570],[1510,645]].forEach(p=>plant(...p));
 [[70,75],[345,75],[575,75],[870,75],[1080,75],[1275,75],[350,330],[890,385],[1320,420],[870,755],[1180,755]].forEach(p=>lightFixture(...p));
 g.fillStyle="#8d3a32";[[265,255],[735,270],[1185,350],[1230,620]].forEach(([x,y])=>g.fillRect(x,y,8,22));
}
function label(r){
 const w=Math.min(r.w-22,r.name.length*8+22);
 g.fillStyle="rgba(6,8,7,.92)";g.fillRect(r.x+12,r.y+10,w,24);
 g.strokeStyle="#252c27";g.strokeRect(r.x+12,r.y+10,w,24);
 g.fillStyle="#d5c7ac";g.font="bold 13px monospace";g.fillText(r.name,r.x+19,r.y+27);
}
function draw(){
 g.fillStyle="#050706";g.fillRect(0,0,W,H);
 corridors.forEach(visualCorridor);
 rooms.forEach(floor);
 rooms.forEach(drawRoomWalls);
 doors.forEach(visualDoor);
 furniture();
 rooms.forEach(label);

 tickets.forEach(t=>{
  const b=Math.sin(performance.now()/120)>0;
  g.fillStyle=t.level==="CRITICAL"?"#ff3131":b?"#ffd447":"#c43d35";
  g.beginPath();g.arc(t.p.x,t.p.y,11,0,Math.PI*2);g.fill();
  g.fillStyle="#111";g.font="bold 14px monospace";g.fillText("!",t.p.x-4,t.p.y+5);
 });

 const a=anomalyLevel();
 if(a>.12){g.fillStyle=`rgba(16,0,18,${a*.12})`;g.fillRect(0,0,W,H)}
 if(a>.55&&Math.random()<.018){g.fillStyle="#a0002518";g.fillRect(0,Math.random()*H,W,3)}
 if(a>.78&&Math.random()<.008){g.fillStyle="rgba(255,255,255,.035)";g.fillRect(0,0,W,H)}

 g.fillStyle="rgba(0,0,0,.28)";g.beginPath();g.ellipse(player.x,player.y+17,13,6,0,0,Math.PI*2);g.fill();
 g.fillStyle="#1b1e1c";g.fillRect(player.x-9,player.y-14,18,26);
 g.fillStyle="#d0a887";g.fillRect(player.x-6,player.y-19,12,8);
 g.strokeStyle="#62e568";g.lineWidth=3;g.beginPath();g.ellipse(player.x,player.y+15,14,7,0,0,Math.PI*2);g.stroke();

 if(debug){
  g.globalAlpha=.24;
  g.fillStyle="#37ff82";roomFloors.forEach(z=>g.fillRect(z.x,z.y,z.w,z.h));
  g.fillStyle="#2aa8ff";corridors.forEach(z=>g.fillRect(z.x,z.y,z.w,z.h));
  g.fillStyle="#ffe14a";doors.forEach(z=>g.fillRect(z.x,z.y,z.w,z.h));
  g.fillStyle="#ff3040";obstacles.forEach(o=>g.fillRect(o.x,o.y,o.w,o.h));
  g.globalAlpha=1;
 }
}
function loop(n){let dt=Math.min(.05,(n-last)/1000);last=n;update(dt);draw();requestAnimationFrame(loop)}
function toast(s){let t=$("#toast");t.textContent=s;t.classList.add("on");clearTimeout(t.q);t.q=setTimeout(()=>t.classList.remove("on"),1800)}
addEventListener("keydown",e=>{keys[e.key.toLowerCase()]=1;if(e.key.toLowerCase()==="e")interact();if(e.key==="F2"){debug=!debug;toast("DEBUG COLLISIONI "+(debug?"ON":"OFF"))}});addEventListener("keyup",e=>keys[e.key.toLowerCase()]=0);
let joy=$("#joy"),stick=joy.querySelector("i"),jid=null,cx=0,cy=0;joy.addEventListener("touchstart",e=>{let t=e.changedTouches[0],r=joy.getBoundingClientRect();jid=t.identifier;cx=r.left+r.width/2;cy=r.top+r.height/2;mv(e)},{passive:false});function mv(e){let t=[...e.changedTouches].find(x=>x.identifier===jid);if(!t)return;let x=t.clientX-cx,y=t.clientY-cy,l=Math.hypot(x,y),m=36;if(l>m){x*=m/l;y*=m/l}stick.style.transform=`translate(${x}px,${y}px)`;keys.a=x<-8;keys.d=x>8;keys.w=y<-8;keys.s=y>8;e.preventDefault()}joy.addEventListener("touchmove",mv,{passive:false});joy.addEventListener("touchend",()=>{jid=null;stick.style.transform="";keys.a=keys.d=keys.w=keys.s=0},{passive:false});$("#act").addEventListener("touchstart",e=>{e.preventDefault();interact()},{passive:false});$("#act").onclick=interact;
