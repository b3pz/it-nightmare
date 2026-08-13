
/* V9.1 — robust runtime error overlay */
function v911ShowError(message,source="",line=0,col=0){
 const txt=String(message||"");
 // Browsers may emit useless cross-origin "Script error."; do not block the game for that.
 if(txt==="Script error."||txt==="Script error"||txt==="Script error. ") {
   console.warn("Ignored generic browser Script error.",source,line,col);
   return;
 }
 const bar=document.getElementById("jsError");
 if(bar){
   bar.textContent=`JS ERROR VERSIONE1ITSHIFT 1.0.18 // ${txt}${line?` @ ${line}:${col}`:""}`;
   bar.classList.remove("hidden");
 }
 console.error("V9.1 runtime error:",message,source,line,col);
}
window.addEventListener("error",e=>{
 if(e?.target && (e.target.tagName==="IMG"||e.target.tagName==="LINK")) return;
 v911ShowError(e?.error?.message||e?.message||"Runtime error",e?.filename||"",e?.lineno||0,e?.colno||0);
});
window.addEventListener("unhandledrejection",e=>{
 const reason=e?.reason;
 v911ShowError(reason?.message||String(reason||"Unhandled promise rejection"));
});

// IT NIGHTMARE V6.5 // STUDIO CONSOLIDATION
const $=s=>document.querySelector(s),C=$("#game"),g=C.getContext("2d");g.imageSmoothingEnabled=false;
const W=C.width,H=C.height,START=540,BOSS=1132,END=1140,TIME_SPEED=5.2;
const difficultyConfig={
 easy:{name:"EASY",maxStrikes:8,timeMult:2.45,stressMult:.42,incidentMult:.42,criticalChance:.018,timeSpeed:.86,maxTickets:2,spawnSeconds:23},
 normal:{name:"NORMAL",maxStrikes:5,timeMult:1.85,stressMult:.70,incidentMult:.70,criticalChance:.055,timeSpeed:1.25,maxTickets:3,spawnSeconds:19},
 hard:{name:"HARD",maxStrikes:3,timeMult:1.28,stressMult:1.00,incidentMult:1.00,criticalChance:.12,timeSpeed:1.75,maxTickets:3,spawnSeconds:15},
 nightmare:{name:"NIGHTMARE",maxStrikes:2,timeMult:.95,stressMult:1.25,incidentMult:1.25,criticalChance:.20,timeSpeed:2.35,maxTickets:4,spawnSeconds:11}
};
let difficulty="normal";




const screens={boot:$("#boot"),lore:$("#lore"),game:$("#gameScreen")};function show(k){Object.values(screens).forEach(x=>x.classList.remove("active"));screens[k].classList.add("active")}
const boot=[];$("#toLore").classList.remove("hidden");$("#toLore").onclick=()=>show("lore");$("#start").onclick=()=>{difficulty=$("#difficulty")?.value||"normal";show("game");reset();requestAnimationFrame(loop)};


/* V12 CLEAN.4.5 — IT LAB / MAGAZZINO */
const V12C45_LAB={
 name:"SERVER",
 x:1110,y:145,w:230,h:220
};
const V12C45_LAB_DROP={x:650,y:220,room:"SERVER"};
const V12C45_LAB_BENCH={x:715,y:220,room:"SERVER"};
const V12C45_LAB_SHELVES=[
 {x:340,y:215,label:"CAVI"},
 {x:395,y:215,label:"CUFFIE"},
 {x:450,y:215,label:"HDMI"},
 {x:505,y:215,label:"ALIMENTATORI"},
 {x:715,y:215,label:"RICAMBI"}
];

const rooms=[
{name:"EDITORIA",x:30,y:310,w:210,h:185,f:"stone"},{name:"HR",x:30,y:55,w:250,h:210,f:"stone"},{name:"SERVER",x:300,y:55,w:455,h:210,f:"server"},
{name:"BIM",x:30,y:535,w:210,h:180,f:"stone"},{name:"IT",x:30,y:735,w:210,h:180,f:"wood"},{name:"CENTRALE",x:315,y:310,w:440,h:355,f:"stone"},
{name:"SALA MEET",x:840,y:55,w:190,h:270,f:"stone"},{name:"INTERIOR",x:1050,y:55,w:170,h:270,f:"wood"},{name:"RENDERISTI",x:1240,y:55,w:210,h:270,f:"wood"},
{name:"SPAZIO A",x:840,y:365,w:300,h:185,f:"stone"},{name:"BAGNI",x:840,y:565,w:180,h:120,f:"tile"},{name:"RIFUGIO DIGITALE",x:1040,y:565,w:180,h:120,f:"wood"},
{name:"SALA MEET CAPO",x:1290,y:400,w:280,h:290,f:"wood"},{name:"INGRESSO / SEGRETERIA",x:410,y:735,w:345,h:130,f:"stone"},{name:"CUCINA",x:805,y:755,w:340,h:180,f:"tile"},{name:"STAMPANTI",x:1145,y:755,w:285,h:180,f:"stone"},{name:"STAMPA 3D",x:1435,y:755,w:155,h:180,f:"stone"}];
// NAVIGATION LAYER: corridoi enormi e porte sovradimensionate. Nessun bordo grafico è una collisione.
/*
 V2.1 NAVIGATION
 Ogni stanza ha un'area interna; ogni porta è un vero "ponte" che sovrappone
 stanza + corridoio. I corridoi sono volutamente larghi.
*/
const roomFloors=rooms.map(r=>({x:r.x+8,y:r.y+8,w:r.w-16,h:r.h-16}));

/* V10.1 — ESTERNO REALE */
const V101_EXTERIOR={WALL_Y:935,SIDEWALK:{x:320,y:945,w:1000,h:55},ROAD:{x:0,y:1000,w:1600,h:40},ENTRANCE:{x:650,y:930,w:110,h:70}};

const V12C_EXTERIOR={
 WALL_Y:935,
 SIDEWALK:{x:320,y:945,w:1000,h:55},
 ROAD:{x:0,y:1000,w:1600,h:40}
};
const corridors=[
 {x:235,y:250,w:555,h:78},{x:235,y:690,w:560,h:88},{x:745,y:35,w:105,h:900},
 {x:805,y:310,w:485,h:88},{x:1205,y:300,w:100,h:635},{x:1260,y:665,w:205,h:110},
 {x:805,y:535,w:485,h:55},
 // V10.1 real corridor between bathrooms/refuge and kitchen
 {x:805,y:685,w:655,h:70},
 {x:1180,y:380,w:125,h:555},{x:760,y:520,w:115,h:255},{x:245,y:265,w:58,h:430},
 {x:245,y:675,w:110,h:85},
 {x:235,y:735,w:180,h:130}, // V1.0.5 accesso nuovo REPARTO IT
 {x:650,y:900,w:110,h:90}
];
const doors=[
 {x:245,y:235,w:75,h:105},{x:455,y:235,w:85,h:105},{x:710,y:180,w:145,h:105},
 {x:205,y:330,w:95,h:120},{x:205,y:595,w:95,h:130},{x:285,y:265,w:105,h:105},
 {x:700,y:300,w:155,h:130},{x:690,y:610,w:165,h:135},{x:800,y:210,w:105,h:135},
 {x:1020,y:260,w:100,h:130},{x:1190,y:255,w:120,h:140},{x:805,y:350,w:105,h:125},
 {x:1095,y:430,w:150,h:130},
 {x:865,y:650,w:85,h:85},{x:1085,y:650,w:85,h:85},
 {x:1240,y:500,w:115,h:135},{x:1240,y:640,w:130,h:125},
 {x:650,y:675,w:150,h:130},{x:735,y:735,w:120,h:125},
 {x:850,y:710,w:95,h:90},{x:1070,y:710,w:95,h:90},{x:1225,y:710,w:100,h:90},
 {x:1450,y:710,w:95,h:90},
 {x:235,y:245,w:80,h:85},{x:215,y:345,w:95,h:105},{x:215,y:565,w:95,h:135},{x:235,y:655,w:125,h:125},
 {x:210,y:770,w:105,h:105}, // V1.0.5 porta nuovo REPARTO IT
 {x:650,y:920,w:110,h:100}
];
const EXTERIOR_DOOR={x:605,y:845,w:100,h:65};
doors.push(EXTERIOR_DOOR);
const walkZones=[...roomFloors,...corridors,...doors];
const V9_MEETINGS={
 "SALA MEET":{table:{x:872,y:155,w:126,h:42},screen:{x:935,y:105},seats:[{x:888,y:218},{x:925,y:218},{x:962,y:218},{x:888,y:135},{x:925,y:135},{x:962,y:135}]},
 "SPAZIO A":{table:{x:875,y:435,w:225,h:44},screen:{x:1030,y:405},seats:[{x:900,y:505},{x:950,y:505},{x:1000,y:505},{x:1050,y:505},{x:900,y:415},{x:950,y:415},{x:1000,y:415},{x:1050,y:415}]},
 "SALA MEET CAPO":{table:{x:1340,y:500,w:180,h:48},screen:{x:1430,y:450},seats:[{x:1370,y:575},{x:1430,y:575},{x:1490,y:575},{x:1370,y:480},{x:1430,y:480},{x:1490,y:480}]}
};
let meetingSeatClaims={};

const obstacles=[
 {x:590,y:800,w:125,h:20}, // V1.0.6 scrivania ZIA ALE
 // V1.0.5 collisioni scrivanie nuovo IT
 {x:84,y:795,w:132,h:20},{x:84,y:865,w:132,h:20},
 // V9: solo ingombri che il giocatore VEDE realmente. Hitbox leggermente più piccole del mobile.
 {x:82,y:188,w:135,h:20},{x:350,y:188,w:108,h:28},{x:80,y:408,w:115,h:28},
 {x:1085,y:208,w:105,h:20},{x:1285,y:208,w:135,h:20},
 {x:365,y:390,w:360,h:20},{x:365,y:510,w:360,h:20},
 {x:88,y:590,w:125,h:18},{x:88,y:655,w:125,h:18},
 {x:V9_MEETINGS["SALA MEET"].table.x+8,y:V9_MEETINGS["SALA MEET"].table.y+5,w:V9_MEETINGS["SALA MEET"].table.w-16,h:20},
 {x:V9_MEETINGS["SPAZIO A"].table.x+8,y:V9_MEETINGS["SPAZIO A"].table.y+5,w:V9_MEETINGS["SPAZIO A"].table.w-16,h:22},
 {x:V9_MEETINGS["SALA MEET CAPO"].table.x+8,y:V9_MEETINGS["SALA MEET CAPO"].table.y+5,w:V9_MEETINGS["SALA MEET CAPO"].table.w-16,h:24},
 {x:843,y:755,w:254,h:16},{x:843,y:820,w:254,h:16},{x:1200,y:815,w:170,h:28},
 {x:570,y:120,w:135,h:72}
];
const points=[
{x:155,y:460,room:"EDITORIA",kind:"PC"},{x:400,y:405,room:"IT",kind:"PC"},{x:640,y:205,room:"SERVER",kind:"SERVER"},{x:140,y:675,room:"BIM",kind:"PC"},{x:140,y:860,room:"IT",kind:"PC"},
{x:535,y:560,room:"CENTRALE",kind:"PC"},{x:940,y:285,room:"SALA MEET",kind:"MEETING"},{x:1135,y:285,room:"INTERIOR",kind:"PC"},{x:1345,y:285,room:"RENDERISTI",kind:"PC"},{x:1010,y:520,room:"SPAZIO A",kind:"MEETING"},
{x:1120,y:680,room:"RIFUGIO DIGITALE",kind:"PC"},{x:1430,y:650,room:"SALA MEET CAPO",kind:"MEETING"},{x:1020,y:875,room:"CUCINA",kind:"COFFEE"},{x:1290,y:835,room:"STAMPANTI",kind:"PRINTER"}];
const bosses=["DIREZIONE","PRESIDENZA","CAPO ASSOLUTO"];
const questionBanks={"MAC_ADOBE": [["Creative Cloud su macOS mostra l'utente disconnesso. Primo controllo?", ["Verificare sessione Adobe, rete e stato Creative Cloud", "Cancellare la cartella System", "Resettare il domain controller", "Cambiare VLAN"], 0], ["InDesign segnala font mancanti aprendo un progetto. Cosa verifichi?", ["Font richiesti, attivazione Adobe Fonts e Font Book", "DNS del server", "Driver GPU del server", "Spooler Windows"], 0], ["Photoshop non vede più un disco di memoria virtuale disponibile. Primo controllo?", ["Spazio libero e impostazioni Scratch Disks", "GPO Windows", "Porta HDMI", "Licenza Revit"], 0], ["Illustrator apre un file con collegamenti mancanti. Cosa controlli?", ["Percorsi e file collegati nel pannello Links", "DHCP", "Account Autodesk", "Firmware switch"], 0], ["Acrobat non stampa correttamente un PDF complesso. Primo test?", ["Provare stampa come immagine/altro PDF e verificare driver/coda", "Formattare il Mac", "Cambiare DNS aziendale", "Resettare Revit"], 0], ["Creative Cloud resta bloccato su sincronizzazione. Approccio corretto?", ["Controllare rete, account, stato servizi e log prima del reset", "Cancellare tutti i file Adobe", "Spegnere il NAS", "Cambiare monitor"], 0], ["Un Mac non monta una share SMB che gli altri vedono. Primo controllo?", ["Connettività, percorso smb:// e credenziali", "Reinstallare Photoshop", "Cambiare mouse", "Reset Pixera"], 0], ["InDesign esporta un PDF con immagini a bassa qualità. Cosa controlli?", ["Preset di esportazione e risoluzione delle immagini sorgenti", "DNS", "Bluetooth", "GPO"], 0], ["Font Book segnala un font duplicato. Cosa fai?", ["Valuti duplicati e disattivi/rimuovi quello errato", "Riavvii il server", "Resetti Desktop Connector", "Cambi IP"], 0], ["Un Mac ha pochissimo spazio libero e Adobe è lento. Prima azione?", ["Individuare cosa occupa spazio e liberare cache/file sicuri", "Cancellare /System", "Spegnere lo switch", "Cambiare VLAN"], 0], ["Photoshop non usa correttamente l'accelerazione grafica. Cosa verifichi?", ["Impostazioni GPU, compatibilità e aggiornamenti", "Permessi stampante", "DNS reverse", "Pixera"], 0], ["Un PDF esportato da InDesign ha font sostituiti. Causa probabile?", ["Font non disponibili/incorporabili o sostituiti nel documento", "Gateway errato", "Cavo HDMI", "DHCP esaurito"], 0]], "WORKSTATION": [["Una HP Z non naviga ma le altre sì. Primo controllo?", ["IP, gateway, DNS e link della singola workstation", "Riavviare tutti i server", "Formattare", "Cambiare switch core"], 0], ["Revit è molto lento solo su una workstation. Primo approccio?", ["Verificare risorse, modello, add-in e stato locale prima di interventi invasivi", "Reset dominio", "Cambiare stampante", "Spegnere NAS"], 0], ["Desktop Connector non sincronizza su un solo PC. Cosa controlli?", ["Account, stato client, cache e log", "Cancellare il progetto cloud", "Cambiare GPU", "Riavviare DHCP"], 0], ["Windows mostra disco C quasi pieno. Prima azione?", ["Analizzare occupazione e pulire file/cache sicuri", "Cancellare Windows", "Reset DNS", "Disinstallare driver rete"], 0], ["Una HP Z non vede il secondo monitor. Primo controllo?", ["Input, cavo, porta GPU e rilevamento display", "Active Directory", "Licenza Adobe", "Spooler"], 0], ["Office chiede continuamente autenticazione. Cosa controlli?", ["Account, token/credenziali e connettività ai servizi", "HDMI", "Driver plotter", "Pixera"], 0], ["Un'applicazione si chiude solo per un utente Windows. Primo test?", ["Verificare profilo, log evento e riproducibilità", "Riavviare tutti gli switch", "Cambiare VLAN globale", "Formattare server"], 0], ["La workstation non riceve policy aggiornate. Cosa puoi verificare?", ["Connettività dominio e gpupdate /force con eventuali errori", "Photoshop", "HDMI", "Toner"], 0], ["Il PC è acceso da molti giorni e ha comportamenti strani. Informazione utile?", ["Uptime e stato aggiornamenti prima di riavviare", "Numero di PDF", "Luminosità TV", "Pixera"], 0], ["Una periferica USB non viene rilevata. Primo approccio?", ["Provare porta/cavo/periferica e Gestione dispositivi", "Cambiare DNS", "Reset Autodesk", "Spegnere server"], 0], ["Revit non trova una stampante che Windows vede. Cosa controlli?", ["Driver, stampante predefinita e sessione/app", "DHCP server", "Adobe Fonts", "HDMI"], 0], ["Desktop Connector mostra file in conflitto. Cosa fai?", ["Identificare versione/stato sync prima di sovrascrivere", "Cancellare entrambe le copie", "Reset dominio", "Cambiare GPU"], 0]], "NETWORK": [["Ping IP funziona ma il nome server no. Sospetto principale?", ["DNS", "GPU", "HDMI", "Bluetooth"], 0], ["Più utenti perdono una share nello stesso momento. Priorità?", ["Capire ampiezza e verificare rete/server/servizio", "Formattare un client", "Cambiare mouse", "Reinstallare Adobe"], 0], ["Un client ha indirizzo 169.254.x.x. Cosa indica spesso?", ["Mancata assegnazione DHCP", "Errore GPU", "Problema PDF", "Licenza Autodesk"], 0], ["La rete cablata cade solo su una postazione. Primo controllo?", ["Cavo, presa, link e configurazione NIC", "Riavvio domain controller", "Reset Pixera", "Cambiare toner"], 0], ["Gateway risponde ma Internet no su più PC. Cosa verifichi?", ["DNS, routing/firewall e connettività a monte", "Mouse", "InDesign", "Monitor"], 0], ["Una share funziona per tutti tranne un utente. Cosa controlli?", ["Permessi, credenziali, mapping e connettività utente", "Switch core subito", "Formattare server", "HDMI"], 0], ["Una porta di rete non dà link. Primo test?", ["Cavo/patch/porta switch e stato fisico", "Adobe Fonts", "Revit cache", "Spooler"], 0], ["Connessione intermittente verso un server. Dato utile?", ["Ping continuo/log/perdita pacchetti e percorso", "Colore desktop", "Versione Acrobat", "Toner"], 0], ["DNS risolve un IP vecchio. Possibile causa?", ["Record/cache DNS non aggiornati", "GPU", "USB", "HDMI"], 0], ["Un servizio è raggiungibile localmente ma non dai client. Cosa controlli?", ["Firewall, binding, porta e routing", "Font Book", "Stampante USB", "Luminosità"], 0], ["Due dispositivi hanno lo stesso IP. Sintomo possibile?", ["Connettività intermittente/conflitto ARP", "PDF sgranati", "Revit lento", "Audio basso"], 0], ["Wi‑Fi funziona ma Ethernet no su un PC. Primo confronto?", ["Configurazione NIC, link e IP delle due interfacce", "Reset dominio", "Pixera", "Adobe"], 0]], "MEETING": [["TV accesa ma nessuna immagine dal PC. Primo controllo?", ["Input selezionato, sorgente e cavo HDMI", "DNS", "Revit", "Spooler"], 0], ["Zoom vede video ma non sente il microfono. Cosa controlli?", ["Dispositivo input e permessi microfono", "DHCP", "Adobe Fonts", "Plotter"], 0], ["Teams usa l'altoparlante sbagliato. Dove intervieni?", ["Selezione dispositivo audio in Teams/sistema", "DNS server", "Desktop Connector", "Pixera"], 0], ["Il mirroring non trova il display. Primo approccio?", ["Rete, receiver e compatibilità/stato servizio", "Formattare PC", "Reset dominio", "Cambiare toner"], 0], ["La webcam non compare nell'app meeting. Primo test?", ["Permessi, collegamento e altra app che la sta usando", "Revit cache", "DNS reverse", "Adobe"], 0], ["Immagine HDMI presente ma senza audio. Cosa controlli?", ["Output audio selezionato e capacità HDMI/display", "DHCP", "Stampante", "Font"], 0], ["Presentazione tagliata ai bordi sul TV. Cosa verifichi?", ["Risoluzione/scaling/aspect ratio", "Account Autodesk", "Spooler", "Gateway"], 0], ["Il telecomando della sala non risponde. Primo controllo?", ["Batterie e puntamento/stato dispositivo", "DNS", "Revit", "Creative Cloud"], 0], ["Il display cambia input da solo. Cosa indaghi?", ["Auto input/CEC/configurazione professionale", "Font Book", "DHCP", "Toner"], 0], ["Audio in videoconferenza produce eco. Prima correzione?", ["Evitare doppi microfoni/speaker e verificare dispositivi attivi", "Cambiare VLAN", "Reset Adobe", "Reinstallare Revit"], 0], ["PC collegato via USB-C non manda video. Cosa verifichi?", ["Supporto video della porta/adattatore e cavo", "DNS", "Spooler", "Licenza Acrobat"], 0], ["Sala meeting offline ma PC naviga. Cosa controlli?", ["IP/rete del dispositivo AV e servizio receiver", "Formattare PC", "Cambiare mouse", "Reset font"], 0]], "SERVER": [["Un servizio server non risponde. Primo approccio?", ["Verificare host, rete, servizio e log", "Riavviare tutto senza verifiche", "Cancellare DNS", "Cambiare monitor"], 0], ["Spazio disco server quasi esaurito. Prima azione?", ["Identificare volumi/cartelle in crescita e causa", "Cancellare log a caso", "Formattare", "Spegnere switch"], 0], ["Molti utenti non autenticano. Cosa controlli?", ["Servizi dominio, DNS, connettività e log", "HDMI", "Adobe", "Toner"], 0], ["Una share server è improvvisamente read-only. Cosa verifichi?", ["Permessi, filesystem/spazio e stato servizio", "GPU client", "Pixera", "Bluetooth"], 0], ["Backup segnala fallimento. Primo passo?", ["Leggere errore/log e verificare destinazione/spazio/connettività", "Ignorarlo", "Cancellare backup precedenti subito", "Riavviare ogni PC"], 0], ["Server raggiungibile via IP ma non hostname. Cosa controlli?", ["DNS", "GPU", "USB", "Adobe Fonts"], 0], ["CPU server al 100%. Prima di terminare processi?", ["Identificare processo/carico e raccogliere evidenze", "Spegnere server", "Cancellare profili", "Cambiare VLAN"], 0], ["Un volume storage è degradato. Priorità?", ["Verificare stato array/dischi e protezione dati", "Reinstallare Office", "Reset TV", "Cambiare mouse"], 0], ["Un servizio si arresta ripetutamente. Cosa cerchi?", ["Event log/log applicativo, dipendenze e causa", "Toner", "HDMI", "Font"], 0], ["Una porta TCP applicativa non risponde. Cosa verifichi?", ["Servizio in ascolto, firewall e percorso rete", "Photoshop", "Mouse", "Display"], 0], ["Permessi di una cartella sono cambiati. Prima azione?", ["Verificare ACL, audit e modifica prima di sovrascrivere", "Formattare server", "Reset DHCP", "Cambiare monitor"], 0], ["Dopo un riavvio un servizio non parte automaticamente. Cosa controlli?", ["Startup type, dipendenze e log di avvio", "Adobe", "HDMI", "Stampante"], 0]], "PRINT": [["Stampante di rete offline per tutti. Primo controllo?", ["Alimentazione, rete/IP e raggiungibilità", "Formattare client", "Reset dominio", "Revit"], 0], ["Coda di stampa bloccata su un PC. Cosa controlli?", ["Coda/spooler e job problematico", "DNS globale", "Pixera", "Adobe Fonts"], 0], ["Plotter stampa formato errato. Cosa verifichi?", ["Formato carta, driver e impostazioni applicazione", "DHCP", "Account Autodesk", "GPU server"], 0], ["PDF esce con caratteri strani. Primo test?", ["Altro PDF/driver e incorporamento font", "Reset switch", "Cambiare VLAN", "Revit cache"], 0], ["Solo un utente non vede la stampante condivisa. Cosa controlli?", ["Connessione/mapping, driver e permessi utente", "Spegnere server", "HDMI", "Pixera"], 0], ["Stampante ha IP diverso dal configurato sul PC. Soluzione?", ["Correggere porta TCP/IP o indirizzamento", "Formattare PC", "Reset Adobe", "Cambiare mouse"], 0], ["Job enorme blocca la coda. Approccio?", ["Identificare/rimuovere job e verificare spooler", "Riavviare dominio", "Cancellare DNS", "Spegnere NAS"], 0], ["Stampa molto lenta da un solo file. Cosa confronti?", ["Complessità file, driver e stampa come immagine", "DHCP", "Revit licensing", "Bluetooth"], 0], ["Plotter segnala carta ma il rotolo è presente. Primo controllo?", ["Caricamento/sensori/formato selezionato", "DNS", "Adobe", "Windows Update"], 0], ["Colori molto diversi in stampa. Cosa indaghi?", ["Profilo colore, driver e impostazioni applicazione", "Gateway", "Active Directory", "Pixera"], 0], ["Driver vecchio causa crash applicazione. Cosa fai?", ["Verificare/aggiornare driver compatibile", "Reset dominio", "Cancellare share", "Cambiare HDMI"], 0], ["Stampante risponde al ping ma Windows la mostra offline. Cosa controlli?", ["Porta, SNMP/stato, spooler e driver", "DNS soltanto", "GPU", "Font Book"], 0]], "PIXERA": [["Un monitor del Rifugio Digitale è nero. Primo controllo?", ["Alimentazione, input, segnale e player/Pixera", "Domain controller", "Revit", "Spooler"], 0], ["Pixera vede il player ma non manda contenuto. Cosa controlli?", ["Timeline/output/mapping e stato del player", "Adobe Fonts", "DHCP client casuale", "Mouse"], 0], ["Due display non sono sincronizzati. Cosa indaghi?", ["Sync, rete, timing e configurazione output", "Revit cache", "Toner", "Office"], 0], ["Il contenuto ha risoluzione errata. Cosa controlli?", ["Canvas/output resolution e mapping display", "DNS reverse", "Account Windows", "Stampante"], 0], ["Un player Pixera risulta offline. Primo test?", ["Rete/IP, alimentazione e servizio player", "Photoshop", "HDMI del laptop", "GPO"], 0], ["Il monitor mostra desktop invece del contenuto. Cosa verifichi?", ["Output assegnato/fullscreen e configurazione player", "DHCP server", "Revit", "Toner"], 0], ["Contenuto scatta su un display. Cosa controlli?", ["Prestazioni player, codec/media e rete", "Font Book", "Spooler", "Mouse"], 0], ["Pixera perde connessione dopo standby display. Cosa indaghi?", ["Power management, rete e handshake/output", "Adobe", "DNS cache client", "Revit"], 0], ["Un file media non viene riprodotto. Primo controllo?", ["Codec/formato, percorso e accessibilità del file", "Domain controller", "Stampante", "USB mouse"], 0], ["Display wall mostra ordine sbagliato. Cosa correggi?", ["Mapping/assegnazione output", "DNS", "Creative Cloud", "DHCP"], 0], ["Tutti i display diventano neri insieme. Priorità?", ["Verificare player/master, rete e distribuzione segnale", "Cambiare ogni monitor", "Reset font", "Revit"], 0], ["Pixera segnala media missing. Cosa fai?", ["Verificare percorso, storage e relink dei media", "Formattare player", "Reset dominio", "Cambiare toner"], 0]], "IT": [["Devi diagnosticare un PC lento. Quale dato raccogli per primo?", ["CPU/RAM/disco, uptime e processi", "Colore wallpaper", "Numero di monitor", "Versione PDF"], 0], ["Un utente non riesce a fare login. Primo approccio?", ["Verificare errore, rete, account e dominio", "Formattare PC", "Cambiare HDMI", "Reset Pixera"], 0], ["gpupdate /force restituisce errore. Cosa fai?", ["Leggere errore e verificare connettività/DNS/dominio", "Cancellare Windows", "Reset Adobe", "Cambiare stampante"], 0], ["Devi liberare spazio senza rischiare dati utente. Approccio?", ["Analizzare e pulire cache/temp sicure, non dati di lavoro", "Cancellare Desktop", "Formattare", "Eliminare profilo"], 0], ["Un software non parte dopo aggiornamento. Primo controllo?", ["Log/errore, compatibilità e dipendenze", "Riavviare switch", "Cambiare VLAN", "Toner"], 0], ["Devi capire se un servizio remoto risponde su una porta. Cosa verifichi?", ["Connettività host e test della porta specifica", "Photoshop", "HDMI", "Font"], 0], ["Utente ha password scaduta. Intervento corretto?", ["Gestire reset/cambio secondo policy e verificare account", "Creare account condiviso", "Disabilitare dominio", "Formattare"], 0], ["PC non applica una nuova configurazione. Cosa confronti?", ["Policy/config effettiva, log e riavvio se necessario", "Toner", "Pixera", "Illustrator"], 0], ["Un'app richiede admin per funzionare. Prima di concederlo?", ["Capire requisito e trovare soluzione a minimo privilegio", "Dare Domain Admin", "Disabilitare UAC ovunque", "Condividere password IT"], 0], ["Un utente segnala 'Internet rotto'. Prima domanda utile?", ["Capire cosa non funziona e se riguarda altri servizi/utenti", "Formattare", "Reset server", "Cambiare monitor"], 0], ["Devi riavviare un PC remoto dopo intervento. Cosa è importante?", ["Verificare lavoro utente e comunicare prima del riavvio", "Spegnere senza avviso", "Cancellare profilo", "Cambiare IP"], 0], ["Un errore compare dopo login solo per un utente. Cosa sospetti tra le prime cose?", ["Profilo/configurazione utente o startup specifico", "Switch core", "Pixera", "Plotter"], 0]]};
const questionDecks={};
function categoryForStation(s){
 if(!s)return "IT";
 if(!s)return "WORKSTATION";
 if(s.room==="EDITORIA"||s.room==="INTERIOR")return "MAC_ADOBE";
 if(s.room==="SERVER")return "SERVER";
 if(["SALA MEET","SPAZIO A","SALA MEET CAPO"].includes(s.room))return "MEETING";
 if(s.room==="RIFUGIO DIGITALE")return "PIXERA";
 if(s.room==="STAMPANTI")return "PRINT";
 if(s.room==="IT")return "IT";
 if(s.room==="CENTRALE")return Math.random()<.35?"NETWORK":"WORKSTATION";
 return Math.random()<.18?"NETWORK":"WORKSTATION";
}
function shuffledQuestion(entry){
 const question=entry[0];
 const answers=entry[1].slice();
 const correctAnswer=answers[entry[2]];
 for(let i=answers.length-1;i>0;i--){
   const j=Math.floor(Math.random()*(i+1));
   [answers[i],answers[j]]=[answers[j],answers[i]];
 }
 return [question,answers,answers.indexOf(correctAnswer)];
}


/* V3.1 — balanced IT question expansion.
   Distractors deliberately have comparable length/detail to reduce answer-length tells. */
(function expandQuestionPool(){
 const extra=[
  {c:"WORKSTATION",q:"Un PC riceve un indirizzo 169.254.x.x. Qual è il primo controllo più utile?",a:["Verificare collegamento di rete e raggiungibilità del servizio DHCP","Forzare subito la reinstallazione completa del driver della scheda","Cambiare manualmente il DNS mantenendo invariato l'indirizzo IP","Eliminare il profilo utente e ricreare la configurazione Windows"],ok:0},
  {c:"NETWORK",q:"Vero o falso: un ping riuscito al gateway dimostra anche che il DNS funziona correttamente.",a:["Vero","Falso"],ok:1},
  {c:"SERVER",q:"Un servizio dipendente non parte dopo un riavvio. Qual è il controllo iniziale più sensato?",a:["Controllare stato, dipendenze e log del servizio prima di modificarne la configurazione","Disabilitare le dipendenze per permettere al servizio di avviarsi autonomamente","Cambiare l'account del servizio senza verificare gli eventi registrati","Riavviare ripetutamente il server finché il servizio torna disponibile"],ok:0},
  {c:"MEETING",q:"Il display della sala è acceso ma mostra NO SIGNAL. Quale verifica viene prima?",a:["Controllare sorgente selezionata, percorso del segnale e collegamento fisico","Aggiornare il firmware del display prima di verificare la sorgente selezionata","Sostituire il monitor con uno funzionante mantenendo lo stesso cablaggio","Ripristinare le impostazioni di fabbrica senza controllare gli ingressi video"],ok:0},
  {c:"PRINT",q:"Vero o falso: una stampante raggiungibile via rete può comunque avere la coda di stampa Windows bloccata.",a:["Vero","Falso"],ok:0},
  {c:"PIXERA",q:"Più display risultano online ma uno mostra contenuto fuori sincronizzazione. Quale controllo è più mirato?",a:["Verificare output, mapping e stato della timeline associati a quel display","Riavviare contemporaneamente tutti i client anche se gli altri output sono corretti","Cambiare l'indirizzo IP del display senza verificare il mapping del progetto","Disattivare la rete dello studio per escludere interferenze con altri dispositivi"],ok:0},
  {c:"MAC_ADOBE",q:"In un progetto Adobe compare un media offline. Qual è l'azione meno distruttiva da tentare per prima?",a:["Verificare il percorso del file e usare il relink verso la risorsa corretta","Eliminare il media offline e ricreare da zero l'intero progetto Adobe","Spostare tutte le risorse in una nuova cartella senza aggiornare i collegamenti","Convertire il progetto in un altro formato prima di cercare il file originale"],ok:0},
  {c:"IT",q:"Un utente segnala 'Internet non funziona'. Quale approccio diagnostico è più corretto?",a:["Definire il sintomo e verificare progressivamente client, rete locale e servizi esterni","Riavviare subito tutti gli apparati di rete per escludere qualsiasi problema temporaneo","Cambiare DNS e indirizzo IP contemporaneamente per ridurre i tempi di diagnosi","Reinstallare il browser perché rappresenta il punto principale di accesso a Internet"],ok:0}
 ];
 if(typeof questions!=="undefined"&&Array.isArray(questions)){
   extra.forEach(x=>questions.push(x));
 } else if(typeof QUESTION_BANK!=="undefined"&&Array.isArray(QUESTION_BANK)){
   extra.forEach(x=>QUESTION_BANK.push(x));
 }
})();
const advancedQuestionBanks={
 WORKSTATION:[
 ["Revit rallenta solo aprendo un modello specifico, mentre altri modelli sulla stessa workstation sono fluidi. Quale verifica viene prima?",["Confrontare dimensione, link, warning e comportamento del modello prima di modificare la workstation","Aggiornare immediatamente il driver video perché il problema compare durante l'uso di Revit","Ricreare il profilo Windows perché una configurazione utente può influire sulle prestazioni","Disabilitare temporaneamente l'antivirus per verificare se la scansione rallenta qualsiasi accesso ai file"],0],
 ["Desktop Connector mostra un file come sincronizzato, ma un collega vede ancora la versione precedente. Qual è il primo controllo più mirato?",["Verificare stato cloud/versione e percorso effettivamente condiviso prima di forzare cache o reset","Eliminare la cache locale di entrambi gli utenti per obbligare la risincronizzazione completa","Reinstallare Desktop Connector sul PC che visualizza la versione precedente","Spostare il file in una nuova cartella ACC per creare una nuova sincronizzazione"],0],
 ["Vero o falso: se una workstation raggiunge correttamente il gateway, è già escluso un problema DNS.",["Vero","Falso"],1]
 ],
 NETWORK:[
 ["Un client raggiunge server interni via IP ma non via hostname; Internet funziona regolarmente. Quale test discrimina meglio il problema?",["Interrogare il DNS configurato per quel nome e confrontare la risposta con un client funzionante","Rinnovare subito l'indirizzo DHCP per ottenere una configurazione di rete completamente nuova","Disabilitare temporaneamente il firewall locale e riprovare l'accesso tramite hostname","Cambiare porta sullo switch per escludere un problema fisico sul collegamento Ethernet"],0],
 ["Dopo una modifica VLAN un gruppo di client perde una sola risorsa, mentre le altre reti sono raggiungibili. Quale verifica è più specifica?",["Controllare routing/ACL tra la VLAN interessata e la subnet della risorsa","Svuotare la cache DNS di tutti i client coinvolti prima di verificare il percorso","Riavviare gli switch di accesso per applicare nuovamente tutte le configurazioni","Cambiare il gateway dei client con quello della subnet in cui si trova la risorsa"],0],
 ["Vero o falso: due host con lo stesso indirizzo IP possono mostrare connettività intermittente anche se entrambi rispondono occasionalmente al ping.",["Vero","Falso"],0]
 ],
 SERVER:[
 ["Un servizio applicativo è fermo, ma il processo dipendente da cui parte risulta anch'esso arrestato. Qual è l'azione più corretta?",["Verificare causa e log della dipendenza, ripristinarla e poi avviare il servizio applicativo","Forzare l'avvio del servizio applicativo ignorando lo stato della dipendenza configurata","Cambiare l'account di esecuzione del servizio applicativo e riprovare immediatamente","Impostare entrambi i servizi su avvio ritardato e riavviare l'intero server"],0],
 ["Un array RAID è degradato ma i dati sono ancora accessibili. Qual è la priorità?",["Identificare il disco guasto, verificare backup/stato array e pianificare la sostituzione senza stressare inutilmente il volume","Lanciare subito un controllo completo del filesystem su tutti i dischi per individuare ulteriori errori","Riavviare il server per verificare se il controller ricostruisce automaticamente il disco degradato","Rimuovere il disco segnalato e reinserirlo immediatamente senza verificare modello e stato del controller"],0],
 ["Una porta TCP non è raggiungibile da remoto ma il servizio risulta RUNNING. Quale insieme di verifiche è più utile?",["Binding/listening locale, firewall e percorso di rete verso la porta specifica","DNS reverse, spazio disco disponibile e versione del sistema operativo server","Stato SMART dei dischi, account del servizio e configurazione del client remoto","Cache ARP del client, profilo utente e aggiornamenti Windows in sospeso"],0]
 ],
 MEETING:[
 ["Un laptop vede il display via HDMI ma Teams continua a usare gli speaker interni. Qual è il controllo più mirato?",["Verificare dispositivo di output selezionato in Teams e nel sistema operativo","Cambiare la sorgente HDMI del display perché l'audio segue sempre l'ingresso video attivo","Reinstallare il driver grafico perché HDMI audio dipende esclusivamente dalla GPU","Disattivare il microfono della sala per evitare che Teams selezioni dispositivi non desiderati"],0],
 ["Il display cambia sorgente da solo quando un secondo dispositivo viene collegato. Quale impostazione è più probabile?",["Auto input switching o controllo CEC/HDMI configurato sul display","Priorità DNS del dispositivo AV rispetto al laptop già collegato","Driver audio USB che forza la selezione di una nuova sorgente video","Timeout della sessione Teams che riporta il display all'ingresso predefinito"],0],
 ["Vero o falso: un adattatore USB-C fisicamente compatibile garantisce sempre l'uscita video dal portatile.",["Vero","Falso"],1]
 ],
 MAC_ADOBE:[
 ["InDesign apre il documento ma segnala sia font mancanti sia collegamenti immagine modificati. Quale ordine riduce il rischio di alterazioni involontarie?",["Verificare disponibilità font e stato dei link prima di sostituire o aggiornare risorse","Aggiornare subito tutti i collegamenti e poi sostituire automaticamente i font mancanti","Esportare immediatamente un PDF per congelare il documento prima di effettuare verifiche","Sincronizzare l'intera cartella Creative Cloud per forzare il recupero automatico delle dipendenze"],0],
 ["Un Mac monta una share SMB con credenziali diverse da quelle attese. Qual è il controllo meno invasivo?",["Verificare sessione SMB e credenziali memorizzate prima di rimuovere configurazioni o profili","Eliminare tutte le password dal Portachiavi e riavviare il Mac prima di riprovare","Cambiare il nome del Mac per creare una nuova identità verso il file server","Rimuovere e reinstallare il client Adobe perché può mantenere token di autenticazione condivisi"],0],
 ["Vero o falso: un font attivo in Adobe Fonts può comunque essere sostituito se il documento richiede una variante/famiglia diversa.",["Vero","Falso"],0]
 ],
 PIXERA:[
 ["Un solo output Pixera è fuori sincronizzazione mentre gli altri sono corretti. Quale intervento restringe meglio la diagnosi?",["Confrontare mapping, output e timing di quel player/display con un output funzionante","Riavviare contemporaneamente tutti i player per riallineare l'intero sistema","Cambiare il contenuto della timeline per verificare se il problema segue il media","Disabilitare temporaneamente la rete degli altri player per lasciare attivo solo quello difettoso"],0],
 ["Il player risulta online ma mostra il desktop invece del contenuto. Quale controllo viene prima?",["Output assegnato, fullscreen e stato della timeline/player","Indirizzo DNS configurato sul display e gateway del controller Pixera","Versione del driver stampante installato sul player multimediale","Permessi del file server anche se i media risultano già caricati localmente"],0],
 ["Vero o falso: un media missing può dipendere da un percorso di storage non più raggiungibile anche se Pixera stesso è online.",["Vero","Falso"],0]
 ],
 PRINT:[
 ["La stampante risponde al ping e la pagina web è raggiungibile, ma i job Windows restano in coda. Quale verifica è più mirata?",["Porta configurata, spooler/queue e stato del job prima di intervenire sulla rete","Cambiare indirizzo IP alla stampante per creare una sessione di comunicazione nuova","Riavviare lo switch perché il ping non verifica il protocollo di stampa utilizzato","Reinstallare Windows sul client perché la coda locale potrebbe essere danneggiata"],0],
 ["Un plotter taglia il disegno pur usando il formato carta corretto. Quale confronto è più utile?",["Formato/orientamento nel driver e nell'applicazione, area stampabile e scaling","Indirizzo IP del plotter e tempo di risposta della rete durante la stampa","Versione del firmware e quantità di memoria RAM disponibile nel plotter","Profilo colore selezionato e risoluzione raster del documento originale"],0],
 ["Vero o falso: eliminare un job bloccato può richiedere il riavvio dello spooler anche se la stampante è perfettamente raggiungibile.",["Vero","Falso"],0]
 ],
 IT:[
 ["Un utente segnala un errore comparso subito dopo il login e solo sul proprio profilo. Quale confronto dà più informazioni?",["Provare stesso PC con altro profilo e stesso profilo su altra postazione, se possibile","Reinstallare l'applicazione indicata nell'errore prima di isolare il profilo utente","Forzare gpupdate e riavviare più volte per riallineare tutte le policy disponibili","Cambiare l'indirizzo IP del PC per escludere una dipendenza dalla rete aziendale"],0],
 ["Devi pulire spazio su una workstation senza perdere dati. Qual è l'approccio più sicuro?",["Misurare l'occupazione e intervenire su cache/temp noti, verificando dove risiedono i dati di lavoro","Eliminare automaticamente le cartelle più grandi sotto il profilo utente dopo aver controllato l'estensione dei file","Svuotare Desktop e Download perché sono le aree che più spesso contengono file temporanei","Disattivare l'ibernazione e cancellare anche i profili non utilizzati nello stesso intervento"],0],
 ["Vero o falso: concedere privilegi amministrativi permanenti è una soluzione appropriata quando un'applicazione li richiede solo per un'operazione specifica.",["Vero","Falso"],1]
 ]
};
function drawQuestion(category){
 const adv=advancedQuestionBanks[category];
 const advChance={easy:.60,normal:.84,hard:.96,nightmare:1}[difficulty]??.84;
 if(adv&&adv.length&&Math.random()<advChance){
   const key="ADV_"+category;
   if(!questionDecks[key]||!questionDecks[key].length){
     questionDecks[key]=adv.map((_,i)=>i);
     for(let i=questionDecks[key].length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[questionDecks[key][i],questionDecks[key][j]]=[questionDecks[key][j],questionDecks[key][i]]}
   }
   return shuffledQuestion(adv[questionDecks[key].pop()]);
 }
 const bank=questionBanks[category]||questionBanks.WORKSTATION;
 if(!questionDecks[category]||!questionDecks[category].length){
   questionDecks[category]=bank.map((_,i)=>i);
   for(let i=questionDecks[category].length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[questionDecks[category][i],questionDecks[category][j]]=[questionDecks[category][j],questionDecks[category][i]]}
 }
 return shuffledQuestion(bank[questionDecks[category].pop()]);
}


/* ================= V2.6.1 OFFICE ALIVE =================
   NPC + physical workstation layer.
   Navigation/F2 base remains unchanged apart from LEFT SPINE above.
*/


const npcDefs=[
 {id:"pao",name:"PAO",role:"BIMER",x:140,y:675,homeRoom:"BIM",homeX:140,homeY:675,tone:"mixed",shirt:"#536f8b",hunter:false,speed:58,state:"work"},
 {id:"zia",name:"ZIA ALE",role:"SEGRETERIA",x:650,y:805,homeRoom:"INGRESSO / SEGRETERIA",homeX:650,homeY:805,tone:"good",shirt:"#765d78",state:"idle"},
 {id:"don",name:"DON",role:"JOLLY",x:1045,y:880,homeRoom:"CUCINA",homeX:1045,homeY:880,tone:"good",shirt:"#566a51",skin:"#6b432f",skin:"#8b5a3c",hair:"#17120f",hunter:false,state:"idle"},{id:"hr",name:"BETTY",role:"HR",x:155,y:205,homeX:155,homeY:205,tone:"good",shirt:"#6f6258",hunter:false,speed:48,state:"idle",homeRoom:"HR"},{id:"manager",name:"IT MANAGER",role:"IT // DISPATCH",x:585,y:760,homeX:185,homeY:842,tone:"neutral",shirt:"#5d6570",hunter:false,speed:58,raceSpeed:118,state:"outside"}];
const ambientNames=["ALE","CRI","RIDER","FABI","GIADA","TOM","LUCA","MARTI","SARA","NICO","VALE","ANNA","MARCO","ELI"];

let bettySupportCooldown=0,bettyPinged=false,bettyLastStressBand=0;
const npcRelations={};
function ensureRelation(n){
 if(!n)return 0;
 if(typeof n.rapporto!=="number")n.rapporto=v12c4InitialRelation(n);
 n.rapporto=v12c4ClampRelation(n.rapporto);n.relation=n.rapporto;return n.rapporto;
}
function relationTier(n){const v=ensureRelation(n);return v>=45?"friend":v<=-45?"enemy":"neutral"}
function changeRelation(n,delta){
 if(!n)return 0;
 n.rapporto=v12c4ClampRelation(ensureRelation(n)+delta);n.relation=n.rapporto;return n.rapporto;
}
function relationTicketAdjust(n,level,mins){
 const tier=relationTier(n);
 if(tier==="friend")return {level,mins:Math.round(mins*1.22),stress:0};
 if(tier==="enemy")return {level:level==="LOW"?"MEDIUM":level==="MEDIUM"?"HIGH":level,mins:Math.round(mins*.82),stress:2};
 return {level,mins,stress:0};
}
function relationOpening(n){
 const tier=relationTier(n);
 const sets={
  friend:["Oh, meno male che sei tu.","Quando puoi mi dai una mano?","Mi fido di te: guardi questa cosa?"],
  neutral:["Hai un secondo?","Ti posso chiedere una cosa?","Quando puoi passa da me."],
  enemy:["È da un po' che aspetto.","Questa cosa mi serve subito.","Puoi occupartene adesso?"]
 };
 const a=sets[tier];return a[Math.floor(Math.random()*a.length)];
}

let ambientNPCs=[];

/* ============================================================
   V12 CLEAN.4.3 — WORKDAY AI
   NPCs mostly work at assigned desks and move asynchronously.
   ============================================================ */
let v12c43LunchSeats=[];

function v12c43AllWorkers(){
 return (([...ambientNPCs,...npcs].filter(n=>n&&n.id!=="manager"&&n.id!=="zia"&&n.id!=="hr")).filter(n=>n&&n.id!=="pao"&&n.id!=="don")).filter(n=>n&&n.id!=="mokasa");
}
function v12c43EnsureDesk(n){
 if(!n)return;
 if(typeof n.deskX!=="number")n.deskX=n.homeX??n.x;
 if(typeof n.deskY!=="number")n.deskY=n.homeY??n.y;
 if(!n.homeRoom)n.homeRoom=roomAt(n.deskX,n.deskY)?.name||roomAt(n.x,n.y)?.name||"CENTRALE";
 if(typeof n.workBias!=="number")n.workBias=0.72+Math.random()*0.14; // 72–86%
 if(typeof n.activityCooldown!=="number")n.activityCooldown=25+Math.random()*65;
 if(typeof n.workTimer!=="number")n.workTimer=35+Math.random()*85;
}
function v12c43AtDesk(n){
 v12c43EnsureDesk(n);
 return Math.hypot(n.x-n.deskX,n.y-n.deskY)<28;
}
function v12c43RouteToDesk(n){
 v12c43EnsureDesk(n);
 const target={x:n.deskX,y:n.deskY,room:n.homeRoom};
 n.routeGoal=target;
 n.route=(v12c44IsPao(n)&&n.homeRoom==="BIM"&&target.room!=="BIM")?v12c44PaoExitRoute(n,target):findNpcPath({x:n.x,y:n.y},target);
 n.routeIndex=0;
 n.state="returnDesk";
}
function v12c43ShouldStayWorking(n){
 v12c43EnsureDesk(n);
 return Math.random()<n.workBias;
}
function v12c43InitWorkday(){
 for(const n of v12c43AllWorkers()){
   v12c43EnsureDesk(n);
   n.state="work";
   n.route=null;
   n.routeIndex=0;
   n.workTimer=30+Math.random()*95;
   n.activityCooldown=30+Math.random()*80;
 }
 v12c43BuildLunchSeats();
}
function v12c43BuildLunchSeats(){
 const workers=v12c43AllWorkers();
 v12c43LunchSeats=[];
 const left=785,right=1095,topY=705,bottomY=875;
 const count=workers.length;
 const perSide=Math.ceil(count/2);
 const spacing=Math.max(28,Math.min(44,(right-left)/Math.max(1,perSide-1)));
 for(let i=0;i<count;i++){
   const side=i<perSide?0:1;
   const idx=side===0?i:i-perSide;
   v12c43LunchSeats.push({
     id:i,
     x:left+idx*spacing,
     y:side===0?topY:bottomY,
     room:"CUCINA"
   });
 }
 workers.forEach((n,i)=>n.lunchSeatId=i);
}
function v12c43LunchSeat(n){
 if(typeof n.lunchSeatId!=="number")return null;
 return v12c43LunchSeats[n.lunchSeatId]||null;
}
function v12c43WorkerCanGenerateTicket(n){
 if(!n)return false;
 if(isLunch())return false;
 if(n.state==="meeting"||n.state==="meetingTravel"||n.state==="bathroom"||n.state==="coffee")return false;
 return v12c43AtDesk(n);
}

function spawnAmbient(){
 const seats=stations.filter(s=>["HP Z","MAC"].includes(s.type)&&!["HR","IT","INGRESSO / SEGRETERIA"].includes(s.room));
 const seatY=s=>{if(s.room==="CENTRALE")return s.y+30;if(s.room==="EDITORIA")return s.y+55;if(s.room==="INTERIOR"||s.room==="RENDERISTI")return s.y+58;if(s.room==="BIM")return s.y+48;return s.y+38};
 ambientNPCs=seats.map((s,i)=>({id:"staff_"+s.id.toLowerCase(),name:ambientNames[i%ambientNames.length],homeRoom:s.room,homeX:s.x,homeY:seatY(s),x:s.x,y:seatY(s),currentRoom:s.room,state:"work",timer:14+Math.random()*28,speed:56,shirt:["#4f6259","#665747","#4d596b","#6b4e57"][i%4],route:[],routeIndex:0,activity:null,activityTicket:false,stuckFor:0}));
}
const officeWaypoints=[
 {x:330,y:300},{x:330,y:700},{x:700,y:700},{x:900,y:700},{x:1050,y:700},
 {x:900,y:800},{x:1000,y:815}
];
function buildRoute(n,toKitchen){
 const target=toKitchen?{x:965,y:845,room:"CUCINA"}:{x:n.homeX,y:n.homeY,room:n.homeRoom||roomAt(n.homeX,n.homeY)?.name||"CORRIDOIO"};
 n.routeGoal={...target};
 if(toKitchen){
   return findNpcPath({x:n.x,y:n.y},target);
 }
 return laneFromArea(n,target);
}



// V9 — sale meeting coerenti: tavolo, schermo e sedute sono dati reali condivisi da grafica e AI.
/* V9.1.1: V9_MEETINGS moved before collision initialization. */

function claimMeetingSeat(n,room){const cfg=V9_MEETINGS[room]||V9_MEETINGS["SALA MEET"];const used=new Set(Object.entries(meetingSeatClaims).filter(([id])=>id!==n.id).map(([,v])=>v.room+":"+v.idx));let idx=cfg.seats.findIndex((_,i)=>!used.has(room+":"+i));if(idx<0)idx=Math.floor(Math.random()*cfg.seats.length);meetingSeatClaims[n.id]={room,idx};return {...cfg.seats[idx],room};}
function releaseMeetingSeat(n){if(n&&n.id)delete meetingSeatClaims[n.id]}
const MEETING_ROOMS=[
 {room:"SALA MEET",x:925,y:215,spreadX:70,spreadY:55,weight:5},
 {room:"SPAZIO A",x:1030,y:480,spreadX:105,spreadY:60,weight:4},
 {room:"SALA MEET CAPO",x:1395,y:535,spreadX:90,spreadY:55,weight:2}
];
function randomMeetingDestination(n){
 const pool=MEETING_ROOMS.flatMap(r=>Array(r.weight).fill(r));
 const r=pool[Math.floor(Math.random()*pool.length)];
 return n?claimMeetingSeat(n,r.room):{...V9_MEETINGS[r.room].seats[0],room:r.room};
}
function meetingStationFor(room){
 let p=stations.find(s=>s.room===room);
 if(p)return p;
 const r=MEETING_ROOMS.find(x=>x.room===room)||MEETING_ROOMS[0];
 return {id:"AV-"+room,room,type:"MEETING AV",x:r.x,y:r.y};
}
function npcDestinationForActivity(n,activity){
 if(activity==="meeting")return randomMeetingDestination(n);
 if(activity==="printer")return {x:1240+Math.random()*65,y:790+Math.random()*25,room:"STAMPANTI"};
 if(activity==="gallery")return {x:1080+Math.random()*80,y:650+Math.random()*30,room:"RIFUGIO DIGITALE"};
 if(activity==="coffee")return {x:900+Math.random()*150,y:850+Math.random()*35,room:"CUCINA"};
 if(activity==="bathroom")return {x:900+Math.random()*55,y:625+Math.random()*18,room:"BAGNI"};
 return {x:n.homeX,y:n.homeY,room:"HOME"};
}

/* =============================================================
   V7 — NAVIGATION: geometry-first pathfinding
   NPC can move only through room floor + real door zones + corridors.
   They cannot use unrelated rooms as shortcuts.
   ============================================================= */

/* V9.1.2 — KITCHEN RETURN CORRIDOR */

/* V9.1.4 — TRAFFIC LANES & NPC SEPARATION */
const V914_LANES={
  KITCHEN_OUT:[
    {x:900,y:735,room:"CORRIDOIO"},{x:970,y:720,room:"CORRIDOIO"},
    {x:1060,y:720,room:"CORRIDOIO"},{x:1140,y:720,room:"CORRIDOIO"}
  ],
  STAMPANTI_OUT:[
    {x:1240,y:735,room:"CORRIDOIO"},{x:1160,y:720,room:"CORRIDOIO"},{x:1080,y:720,room:"CORRIDOIO"}
  ],
  SEGRETERIA_OUT:[
    {x:790,y:718,room:"CORRIDOIO"},{x:760,y:700,room:"CORRIDOIO"}
  ]
};
function npcOthers(n){
 return [...ambientNPCs,...npcs].filter(x=>x&&x!==n&&x.id!=="mokasa"&&x.name!=="CAPO");
}

/* AUDIT removed obsolete v12c43ReservedPaoExit */


function npcCanStand(n,x,y){
 if(n&&n.id!=="hr"&&x>=70&&x<=240&&y>=90&&y<=260)return false;
 if(v12c44PaoExitReserved(x,y,n))return false;
  if(!walkable(x,y))return false;
  // Keep NPCs from occupying the exact same choke point.
  return !npcOthers(n).some(o=>Math.hypot(o.x-x,o.y-y)<18);
}
function nextFreeNearbyPoint(n,p){
  const offsets=[[0,0],[14,0],[-14,0],[0,14],[0,-14],[20,12],[-20,12],[20,-12],[-20,-12]];
  for(const [dx,dy] of offsets){
    const x=p.x+dx,y=p.y+dy;
    if(npcCanStand(n,x,y))return {x,y,room:p.room||navAreaAt(x,y)};
  }
  return null;
}
function laneFromArea(n,target){
  const here=roomAt(n.x,n.y);
  let prefix=[];
  if(here==="CUCINA") prefix=V914_LANES.KITCHEN_OUT;
  else if(here==="STAMPANTI") prefix=V914_LANES.STAMPANTI_OUT;
  else if(here==="INGRESSO / SEGRETERIA") prefix=V914_LANES.SEGRETERIA_OUT;
  const start=prefix.length?prefix[prefix.length-1]:{x:n.x,y:n.y,room:navAreaAt(n.x,n.y)};
  const tail=findNpcPath(start,target);
  return [...prefix,...tail];
}

const V912_KITCHEN_CORRIDOR={x:760,y:690,w:440,h:62};
const V912_KITCHEN_DOOR={x:930,y:704,w:95,h:44};
if(Array.isArray(corridors))corridors.push(V912_KITCHEN_CORRIDOR);
if(Array.isArray(walkZones))walkZones.push(V912_KITCHEN_CORRIDOR,V912_KITCHEN_DOOR);

const V7_NAV_STEP=16;
function navAreaAt(x,y){
 if(corridors.some(z=>inside(z,x,y))||doors.some(z=>inside(z,x,y)))return "CORRIDOIO";
 const r=rooms.find(r=>inside(r,x,y));return r?r.name:"VOID";
}
function navAllowedPoint(x,y,startRoom,destRoom){
 if(!walkable(x,y))return false;
 const a=navAreaAt(x,y);
 return a==="CORRIDOIO"||a===startRoom||a===destRoom;
}
function nearestNavPoint(p,startRoom,destRoom){
 if(navAllowedPoint(p.x,p.y,startRoom,destRoom))return {x:p.x,y:p.y};
 for(let radius=V7_NAV_STEP;radius<=96;radius+=V7_NAV_STEP){
  for(let dx=-radius;dx<=radius;dx+=V7_NAV_STEP){
   for(const dy of [-radius,radius]){
    if(navAllowedPoint(p.x+dx,p.y+dy,startRoom,destRoom))return {x:p.x+dx,y:p.y+dy};
   }
  }
  for(let dy=-radius+V7_NAV_STEP;dy<radius;dy+=V7_NAV_STEP){
   for(const dx of [-radius,radius]){
    if(navAllowedPoint(p.x+dx,p.y+dy,startRoom,destRoom))return {x:p.x+dx,y:p.y+dy};
   }
  }
 }
 return null;
}

function v1ServerLabConnector(from,to){
 const fr=safeRoom(from,""),tr=safeRoom(to,"");
 const ok=(fr==="SERVER"&&tr==="SERVER")||(fr==="SERVER"&&tr==="SERVER");
 if(!ok)return null;
 return fr==="SERVER"
 ?[{x:760,y:125,room:"SERVER"},{x:800,y:125,room:"SERVER"},{x:820,y:125,room:"SERVER"},{x:925,y:115,room:"SERVER"}]
 :[{x:925,y:115,room:"SERVER"},{x:820,y:125,room:"SERVER"},{x:800,y:125,room:"SERVER"},{x:760,y:125,room:"SERVER"}];
}

function findNpcPath(from,to){
 const labRoute=v102LabRoute(from,to);if(labRoute)return labRoute;
 const v1sl=v1ServerLabConnector(from,to);if(v1sl)return v1sl;
 to=safePoint(to,{x:from.x,y:from.y,room:roomAt(from.x,from.y)});
 const startRoom=roomAt(from.x,from.y);
 const declared=safeRoom(to,"");
 const destRoom=rooms.some(r=>r.name===declared)?declared:roomAt(to.x,to.y);
 const s0=nearestNavPoint({x:from.x,y:from.y},startRoom,destRoom);
 const e0=nearestNavPoint({x:to.x,y:to.y},startRoom,destRoom);
 if(!s0||!e0)return [];
 const snap=v=>Math.round(v/V7_NAV_STEP)*V7_NAV_STEP;
 const sx=snap(s0.x),sy=snap(s0.y),ex=snap(e0.x),ey=snap(e0.y);
 const key=(x,y)=>x+","+y, q=[[sx,sy]], seen=new Set([key(sx,sy)]), prev=new Map();
 const dirs=[[V7_NAV_STEP,0],[-V7_NAV_STEP,0],[0,V7_NAV_STEP],[0,-V7_NAV_STEP]];
 let found=null, head=0;
 while(head<q.length&&q.length<7000){
  const [x,y]=q[head++];
  if(Math.abs(x-ex)<=V7_NAV_STEP&&Math.abs(y-ey)<=V7_NAV_STEP){found=[x,y];break}
  for(const [dx,dy] of dirs){
   const nx=x+dx,ny=y+dy,k=key(nx,ny);
   if(nx<8||nx>1592||ny<8||ny>1032||seen.has(k))continue;
   if(!navAllowedPoint(nx,ny,startRoom,destRoom))continue;
   seen.add(k);prev.set(k,[x,y]);q.push([nx,ny]);
  }
 }
 if(!found)return [];
 const raw=[];let cur=found;
 while(cur){raw.push({x:cur[0],y:cur[1],room:navAreaAt(cur[0],cur[1])});cur=prev.get(key(cur[0],cur[1]))}
 raw.reverse();
 // Compress collinear nodes while preserving exact route through doors.
 const out=[];
 for(let i=0;i<raw.length;i++){
  if(i===0||i===raw.length-1){out.push(raw[i]);continue}
  const a=raw[i-1],b=raw[i],c=raw[i+1];
  if((a.x===b.x&&b.x===c.x)||(a.y===b.y&&b.y===c.y))continue;
  out.push(b);
 }
 if(navAllowedPoint(to.x,to.y,startRoom,destRoom))out.push({x:to.x,y:to.y,room:destRoom});
 return out;
}
function routeNpcTo(n,target){
 const dest=safeRoom(target,"CORRIDOIO");
 if(PRIVATE_ROOMS.has(dest)&&!["hr","manager","zia"].includes(n.id)){
   target={x:n.homeX,y:n.homeY,room:n.homeRoom};
 }
 const route=findNpcPath({x:n.x,y:n.y},target);
 n.routeGoal={...target};n.route=route;n.routeIndex=0;n.stuckFor=0;
 return route;
}
const PRIVATE_ROOMS=new Set(["HR","IT","INGRESSO / SEGRETERIA"]);
const ROOM_EXITS={
 "EDITORIA":{x:250,y:265},"HR":{x:455,y:265},"SERVER":{x:755,y:250},"BIM":{x:240,y:430},"IT":{x:250,y:675},
 "CENTRALE":{x:710,y:610},"SALA MEET":{x:840,y:300},"INTERIOR":{x:1050,y:300},"RENDERISTI":{x:1240,y:300},
 "SPAZIO A":{x:840,y:520},"BAGNI":{x:900,y:625},"RIFUGIO DIGITALE":{x:1100,y:625},"SALA MEET CAPO":{x:1290,y:650},
 "INGRESSO / SEGRETERIA":{x:790,y:718},"CUCINA":{x:970,y:790},"STAMPANTI":{x:1210,y:790}
};
/* AUDIT: obsolete roomAt string version removed */
function corridorRoute(from,to){
 const a=safePoint(from),b=safePoint(to);const out=[];
 // backbone: lower corridor y=705, central vertical x=790, upper corridor y=300.
 const aTop=a.y<350,bTop=b.y<350;
 const aRight=a.x>1000,bRight=b.x>1000;
 if(aTop&&bTop){out.push({x:a.x,y:300},{x:b.x,y:300});}
 else if(aRight&&bRight){out.push({x:1225,y:a.y},{x:1225,y:b.y});}
 else{out.push({x:a.x,y:705},{x:790,y:705}); if(b.y<600)out.push({x:790,y:300}); out.push({x:b.x,y:b.y<600?300:705});}
 return out;
}
function routeViaHub(n,target){
 target=safePoint(target,{x:n?.homeX||n?.x||790,y:n?.homeY||n?.y||705,room:n?.homeRoom||"CORRIDOIO"});
 const dest=safeRoom(target,"CORRIDOIO");
 if(PRIVATE_ROOMS.has(dest)&&!["hr","manager","zia"].includes(n.id)){
   target={x:n.homeX,y:n.homeY,room:n.homeRoom};
 }
 return findNpcPath({x:n.x,y:n.y},target);
}
function moveNpcRoute(n,dt){
 if(!n||!Array.isArray(n.route)||!n.route.length)return true;
 if(n.route.length>80)n.route=n.route.slice(0,80);
 if(!Number.isFinite(n.routeIndex))n.routeIndex=0;
 if(n.routeIndex>=n.route.length)return true;

 const p=n.route[n.routeIndex]; if(!v118ValidPoint(p)){n.routeIndex++;return n.routeIndex>=n.route.length;}
 if(!p||!Number.isFinite(p.x)||!Number.isFinite(p.y)){
   n.routeIndex++;
   return n.routeIndex>=n.route.length;
 }

 const dx=p.x-n.x,dy=p.y-n.y;
 const d=Math.hypot(dx,dy);

 if(!Number.isFinite(d)){
   n.routeIndex++;
   return n.routeIndex>=n.route.length;
 }

 if(d<5){
   n.x=p.x;n.y=p.y;n.routeIndex++;
   n.stuckFor=0;n.blockedFor=0;
   return n.routeIndex>=n.route.length;
 }

 const step=(n.speed||56)*Math.min(Math.max(dt||0,0),0.035);
 let nx=n.x,ny=n.y;

 if(Math.abs(dx)>=Math.abs(dy))nx+=Math.sign(dx)*Math.min(Math.abs(dx),step);
 else ny+=Math.sign(dy)*Math.min(Math.abs(dy),step);

 let blocked=false;
 if(!walkable(nx,ny))blocked=true;
 else{
   const others=npcOthers(n);
   for(const o of others){
     if(o&&Math.hypot(o.x-nx,o.y-ny)<14){blocked=true;break}
   }
 }

 if(!blocked){
   n.x=nx;n.y=ny;n.stuckFor=0;n.blockedFor=0;
 }else{
   n.stuckFor=(n.stuckFor||0)+dt;
   if(n.stuckFor>0.9){
     // Skip impossible waypoint instead of recomputing a path.
     n.routeIndex++;
     n.stuckFor=0;n.blockedFor=0;
     if(n.routeIndex>=n.route.length)return true;
   }
 }
 return false;
}
function generateNpcActivityTicket(n){
 if(!v12c43WorkerCanGenerateTicket(n))return false;
 if(n?.id==="don"&&v12cDonLocked())return;
 if(n.activityTicket||tickets.length>=difficultyConfig[difficulty].maxTickets||isLunch())return;
 let p,type,level="LOW";
 if(n.activity==="meeting"){
   p=meetingStationFor(n.target?.room||"SALA MEET");type=["AV","CABLE"][Math.floor(Math.random()*2)];level=n.target?.room==="SALA MEET CAPO"?(Math.random()<.45?"HIGH":"MEDIUM"):(Math.random()<.35?"MEDIUM":"LOW");
 }else if(n.activity==="printer"){
   p=stations.find(s=>s.room==="STAMPANTI");type=Math.random()<.5?"TONER":"PROCESS";
 }else if(n.activity==="gallery"){
   p=stations.find(s=>s.room==="RIFUGIO DIGITALE");type="PIXERA";level="MEDIUM";
 }else return;
 if(!p)return;
 const mins={LOW:115,MEDIUM:95}[level]*difficultyConfig[difficulty].timeMult;
 tickets.push({id:crypto.randomUUID?crypto.randomUUID():Math.random()+"",level,p,due:Math.min(BOSS-.2,state.min+mins),q:null,taskType:type,source:n.name,expired:false});
 n.activityTicket=true;
 n.exclaimUntil=performance.now()+1400;
 renderTickets();refreshPDA();
}
const encounterOpeners={
 LOW:[
  "Oh, hai un secondo? Ho una cosa che non va.",
  "Quando puoi, mi dai un'occhiata alla postazione?",
  "Scusa, problema veloce: qui qualcosa non funziona.",
  "Ti posso disturbare un attimo? Mi serve una mano.",
  "Prima funzionava, giuro. Puoi controllare?",
  "Non è urgentissimo, ma quando passi mi aiuti?"
 ],
 MEDIUM:[
  "Ti stavo cercando. Ho un problema che mi sta bloccando.",
  "Meno male che sei passato: qui non riesco più a lavorare.",
  "Puoi venire un secondo? Questa volta mi serve davvero l'IT.",
  "Non tocco più niente. Dai un'occhiata tu prima che peggiori.",
  "Ho provato due cose ma niente. Riesci a controllare?",
  "Mi sa che questa non la risolvo da solo. Hai un minuto?"
 ]
};
function ambientCorridorEncounter(n){
 if(n?.id==="don"&&v12cDonLocked())return;
 if(v12cIntroProtected()&&!v12cNpcAllowedDuringIntro(n))return;

 if(encounterLock||storyOpen||isLunch()||introStage!=="done"||n.activity==="bathroom"||n.activity==="coffee")return;
 if((n.lastEncounter??-999)+75>state.min)return;
 if(Math.hypot(player.x-n.x,player.y-n.y)>58)return;
 if(Math.random()>.018)return;
 n.lastEncounter=state.min;encounterLock=true;n.exclaimUntil=performance.now()+850;
 const level=Math.random()<.72?"LOW":"MEDIUM";
 const lines=encounterOpeners[level],line=lines[Math.floor(Math.random()*lines.length)];
 const ov=$("#encounterOverlay");if(ov){$("#encounterName").textContent=n.name;ov.classList.add("on")}
 setTimeout(()=>{if(ov)ov.classList.remove("on");storyDialog(n.name,line,()=>{
   newTicket(level,{source:n.name});
   renderTickets();refreshPDA();updateTaskProgress();
   encounterLock=false;
 })},850);
}
function updateAmbient(dt){
 if(isLunch())return;
 for(const n of ambientNPCs){
   if(n.id==="pao"||n.id==="don")continue;
   if(n.id==="pao"||n.id==="don")continue;
   if(n.state==="specialRoam"||n.state==="specialPause")continue;
   if(!v12c44ManagedWorker(n))continue;
   if(n.state==="activityTravel"){
     ambientCorridorEncounter(n);
     if(moveNpcRoute(n,dt)){n.state="activity";n.timer=10+Math.random()*14}
   }else if(n.state==="activity"){
     n.timer=(n.timer??10)-dt;
     if(n.activity==="meeting"&&n.timer<8&&!n.activityTicket&&Math.random()<.08)generateNpcActivityTicket(n);
     if(n.timer<=0){releaseMeetingSeat(n);v12c43RouteToDesk(n)}
   }else if(["return","idle","wander"].includes(n.state)){
     v12c43RouteToDesk(n);
   }
 }
}
let npcs=[],mokasa=null,npcCooldown={},mokasaTimer=0,lastZiaHour=-1,idleMinutes=0,lastPlayerPos={x:0,y:0};
let phoneQueue=[],visualAnomaly=null,inventory=[],carryMission=null,encounterLock=false;
let pendingOffers={};
let firstCarryTriggered=false;

function pokemonEncounter(n){
 if(!n||n.id==="mokasa"||n.name==="CAPO")return;
 if(!n||n.id==="mokasa")return;
 if(encounterLock)return;
 encounterLock=true;
 n.seeking=false;
 n.exclaimUntil=performance.now()+1100;
 const ov=$("#encounterOverlay");
 if(ov){$("#encounterName").textContent=n.name;ov.classList.add("on")}
 setTimeout(()=>{
   if(ov)ov.classList.remove("on");
   npcTalk(n);
   setTimeout(()=>encounterLock=false,350);
 },1100);
}
function phoneMessage(sender,text){
 const box=$("#phoneNotification");if(!box)return;
 // During a minigame/result, queue non-critical messages instead of covering UI.
 if((!$("#modal")?.classList.contains("hidden")||!$("#rewardOverlay")?.classList.contains("hidden"))){
   deferredDialogs.push({who:sender,text,cb:null,phoneOnly:true});
   return;
 }
 $("#phoneSender").textContent=sender;$("#phoneText").textContent=text;
 box.classList.add("on");clearTimeout(box._t);
 const important=["ZIA ALE","IT MANAGER","CAPO","DIREZIONE","IT TASK","BETTY"].includes(sender);
 const duration=important?11000:5600;
 box._t=setTimeout(()=>box.classList.remove("on"),duration);
}
function updateInventoryUI(){
 const el=$("#inventory");if(!el)return;
 el.innerHTML=[0,1,2].map(i=>`<div class="slot ${inventory[i]?"filled":""}">${inventory[i]||"—"}</div>`).join("");
 const mission=$("#missionPanel");if(mission)mission.classList.add("hidden");
 refreshPDA();
}
function availableRecipient(room=null){
 let list=ambientNPCs.filter(n=>n.state==="work");
 if(room){
   const stationIds=stations.filter(s=>s.room===room&&["HP Z","MAC"].includes(s.type));
   if(stationIds.length){
     list=list.filter(n=>stationIds.some(s=>Math.hypot(s.x-n.homeX,s.y+24-n.homeY)<40));
   }
 }
 return list.length?list[Math.floor(Math.random()*list.length)]:ambientNPCs[Math.floor(Math.random()*ambientNPCs.length)];
}
function makeCarryMission(){
 if(carryMission||ambientNPCs.length===0)return false;
 const r=Math.random();
 let m;
 if(r<.14){
   m={label:"CONSEGNA",item:"TONER",pickup:{x:1210,y:805,room:"STAMPANTI"},to:{x:1260,y:805,room:"STAMPANTI"},targetType:"printer"};
 }else if(r<.28){
   const rec=availableRecipient("CENTRALE");
   m={label:"CONSEGNA",item:"CHIAVETTA USB",pickup:{x:160,y:840,room:"IT"},to:{x:rec.x,y:rec.y,room:"CENTRALE"},recipient:rec,targetType:"npc"};
 }else if(r<.43){
   const rec=availableRecipient();
   m={label:"ASSEGNAZIONE",item:"CUFFIE",pickup:{x:115,y:840,room:"IT"},to:{x:rec.x,y:rec.y,room:"POSTAZIONE"},recipient:rec,targetType:"npc"};
 }else if(r<.58){
   m={label:"CONSEGNA",item:"ADATTATORE USB-C / HDMI",pickup:{x:650,y:220,room:"SERVER"},to:{x:925,y:205,room:"SALA MEET"},targetType:"meeting"};
 }else if(r<.72){
   const rec=availableRecipient("CENTRALE");
   m={label:"CONSEGNA",item:"MOUSE USB",pickup:{x:150,y:825,room:"IT"},to:{x:rec.homeX,y:rec.homeY,room:"CENTRALE"},recipient:rec,targetType:"npc"};
 }else if(r<.84){
   const rec=availableRecipient();
   m={label:"CONSEGNA",item:"TASTIERA USB",pickup:{x:150,y:840,room:"IT"},to:{x:rec.homeX,y:rec.homeY,room:"POSTAZIONE"},recipient:rec,targetType:"npc"};
 }else if(r<.93){
   m={label:"CONSEGNA",item:"CAVO ETHERNET",pickup:{x:150,y:825,room:"IT"},to:{x:640,y:190,room:"SERVER"},targetType:"server"};
 }else{
   m={label:"CONSEGNA",item:"ALIMENTATORE",pickup:{x:150,y:825,room:"IT"},to:{x:1030,y:480,room:"SPAZIO A"},targetType:"meeting"};
 }
 m.stage="pickup";
 return m;
}
function startTutorialCarryMission(){
 if(carryMission||ambientNPCs.length===0)return;
 const rec=ambientNPCs[0];
 carryMission={
   label:"ASSEGNAZIONE",
   item:"CUFFIE",
   pickup:{x:115,y:840,room:"IT"},
   to:{x:rec.x,y:rec.y,room:"POSTAZIONE"},
   recipient:rec,
   targetType:"npc",
   stage:"pickup",
   tutorial:true
 };
 phoneMessage("IT TASK",`Prendi le CUFFIE nello scaffale IT e consegnale a ${rec.name}.`);
 updateInventoryUI();
}
function startCarryMission(){
 if(carryMission||Math.random()>.38)return;
 carryMission=makeCarryMission();
 if(!carryMission)return;
 const who=carryMission.recipient?` per ${carryMission.recipient.name}`:"";
 phoneMessage("IT TASK",`${carryMission.item}${who}. Ritirala in ${safeRoom(carryMission.pickup,"IT")}.`);
 updateInventoryUI();
}
function carryTarget(){
 if(!carryMission)return null;
 if(carryMission.stage==="pickup")return carryMission.pickup;
 if(carryMission.recipient){
   // V5.2: consegne IT solo alla postazione. Mai inseguire un collega in bagno/cucina.
   return {x:carryMission.recipient.homeX,y:carryMission.recipient.homeY,room:safeRoom(carryMission.to,"POSTAZIONE")};
 }
 return carryMission.to;
}
/* AUDIT removed obsolete interactCarry */

function carryPrompt(){
 if(!carryMission)return null;
 const target=carryTarget();
 if(!target||Math.hypot(player.x-target.x,player.y-target.y)>95)return null;
 if(carryMission.stage==="pickup")return `F — PRENDI ${carryMission.item}`;
 return carryMission.recipient?`G — CONSEGNA ${carryMission.item} A ${carryMission.recipient.name}`:`G — CONSEGNA ${carryMission.item}`;
}


/* =============================================================
   V8 — STUDIO EVENTS
   Events are physical situations in the office, not ordinary tickets.
   ============================================================= */
let studioEvent=null,studioEventNext=610,eventSerial=0;
function eventNPC(name){return [...npcs,...ambientNPCs].find(n=>n.name===name||n.id===name)}
function eventFreeNPCs(count=2){
 return ambientNPCs.filter(n=>n.state==="work"&&!n.eventCarry).sort(()=>Math.random()-.5).slice(0,count);
}

let v114AmazonIntroShown=false;
function v114AmazonIntroOnce(){
 if(!studioEvent||studioEvent.type!=="AMAZON")return false;
 if(v114AmazonIntroShown)return false;
 v114AmazonIntroShown=true;
 return true;
}
function startAmazonEvent(){
 v114AmazonIntroShown=false;
 if(studioEvent||introStage!=="done"||isLunch())return false;
 const helpers=eventFreeNPCs(3);
 const packages=[
  {id:"AMZ-IT-1",label:"PACCO IT // CAVI",owner:"PLAYER",x:705,y:800,to:{x:700,y:220,room:"SERVER"},taken:false,done:false},
  {id:"AMZ-IT-2",label:"PACCO IT // PERIFERICHE",owner:"PLAYER",x:730,y:800,to:{x:700,y:220,room:"SERVER"},taken:false,done:false},
  ...helpers.map((n,i)=>({id:"AMZ-NPC-"+i,label:"PACCO "+n.name,owner:n.id,x:755+i*22,y:800,to:{x:n.homeX,y:n.homeY,room:n.homeRoom},taken:false,done:false}))
 ];
 studioEvent={id:"amazon-"+(++eventSerial),type:"AMAZON",title:"CONSEGNA AMAZON",stage:"pickup",packages,helpers,started:state.min};
 showMissionBanner("PACCHI IN INGRESSO","Zia Ale ha ricevuto una consegna. Ritira i 2 pacchi IT e depositali nel SERVER / MAGAZZINO IT.","2 PACCHI IT // +240 XP","EVENTO STUDIO");
 const amazonMsg="Sono arrivati i pacchi Amazon. Gli altri prendono i loro: questi due sono per il Magazzino IT.";
 // 1.0.16: Amazon is a non-blocking notification. Never set storyOpen.
 phoneMessage("ZIA ALE",amazonMsg);
 helpers.forEach((n,i)=>{
   const p=packages.find(p=>p.owner===n.id);if(!p)return;
   n.eventCarry=p.id;n.state="eventPickup";n.routeGoal={x:p.x,y:p.y,room:"INGRESSO / SEGRETERIA"};
   n.route=findNpcPath({x:n.x,y:n.y},n.routeGoal);n.routeIndex=0;
 });
 showStudioEventHud("CONSEGNA AMAZON","0/2 pacchi IT consegnati");
 return true;
}

/* ============================================================
   V12 CLEAN.4.2 — MEETING EVENT STATE MACHINE
   IDLE -> ANNOUNCED -> PICKUP -> DELIVER -> COMPLETED/FAILED
   ============================================================ */
let v12c42MeetingState="IDLE";
let v12c42MeetingLateWarned=false;
let v12c42MeetingQueued=false;
let v12c42MeetingDeferredStart=false;

function v12c42MeetingActive(){
  return ["ANNOUNCED","PICKUP","DELIVER"].includes(v12c42MeetingState);
}
function v12c42MeetingClosed(){
  return ["COMPLETED","FAILED"].includes(v12c42MeetingState);
}
function v12c42MeetingBusyUi(){
  return !!(activeMiniGame || !$("#modal")?.classList.contains("hidden"));
}
function v12c42MeetingNotify(title,text){
  if(typeof showStudioEventHud==="function")showStudioEventHud(title,text);
  else if(typeof sideMessage==="function")sideMessage(title,text);
  else toast(`${title} // ${text}`);
}
function v12c42MeetingStart(){
  if(!v12c42CanGenerateWork())return false;
  if(v12c42MeetingActive() || v12c42MeetingClosed())return false;
  if(studioEvent && studioEvent.type==="MEETING_RUSH")return false;

  // If player is inside a task/minigame, defer until it closes.
  if(v12c42MeetingBusyUi()){
    v12c42MeetingQueued=true;
    v12c42MeetingDeferredStart=true;
    v12c42MeetingNotify("MEETING TRA 2 MINUTI","Evento accodato: termina prima l'intervento corrente.");
    return false;
  }

  v12c42MeetingState="ANNOUNCED";
  v12c42MeetingLateWarned=false;
  studioEvent={
    id:"meet-"+(++eventSerial),
    type:"MEETING_RUSH",
    title:"MEETING TRA 2 MINUTI",
    stage:"pickup",
    started:state.min,
    pickup:{x:650,y:220,room:"SERVER"},
    to:{x:925,y:205,room:"SALA MEET"},
    item:"EXTENDER HDMI",
    carried:false,
    completed:false,
    failed:false,
    lateWarned:false
  };
  v12c42MeetingNotify("MEETING TRA 2 MINUTI","Recupera l'EXTENDER HDMI nel SERVER / MAGAZZINO IT e portalo in SALA MEET.");
  v12c42MeetingState="PICKUP";
  return true;
}

function v12c42MeetingUpdate(){
  if(!v12c42CanGenerateWork())return;

  if(v12c42MeetingQueued && !v12c42MeetingBusyUi() && !v12c42MeetingActive()){
    v12c42MeetingQueued=false;
    v12c42MeetingStart();
  }

  const ev=studioEvent;
  if(!ev || ev.type!=="MEETING_RUSH")return;

  if(ev.completed){
    v12c42MeetingState="COMPLETED";
    return;
  }
  if(ev.failed){
    v12c42MeetingState="FAILED";
    return;
  }

  const elapsed=state.min-ev.started;

  // One late warning only; warning never blocks and never changes the state loop.
  if(elapsed>=8 && !ev.carried && !v12c42MeetingLateWarned){
    v12c42MeetingLateWarned=true;
    ev.lateWarned=true;
    v12c42MeetingNotify("MEETING URGENTE","Sei in ritardo: EXTENDER HDMI ancora nel SERVER / MAGAZZINO IT.");
  }

  // Hard fail only after real timeout.
  if(elapsed>=18 && !ev.completed){
    ev.failed=true;
    v12c42MeetingState="FAILED";
    state.stress=Math.min(100,state.stress+6);
    v12c42MeetingNotify("MEETING PERSO","La sala è partita senza l'EXTENDER HDMI.");
    studioEvent=null;
    return;
  }

  v12c42MeetingState=ev.carried?"DELIVER":"PICKUP";
}

function startMeetingRushEvent(){
  return v12c42MeetingStart();
}
function startDeskSetupEvent(){
 if(studioEvent||introStage!=="done"||isLunch())return false;
 const rec=availableRecipient();
 if(!rec)return false;
 const from={x:175,y:810,room:"REPARTO IT",label:"POSTAZIONE IT // PC DA SPOSTARE"};
 const to={x:rec.homeX,y:rec.homeY,room:rec.homeRoom,label:`POSTAZIONE ${rec.name}`};
 studioEvent={id:"desk-"+(++eventSerial),type:"DESK_SETUP",title:"CAMBIO POSTAZIONE",stage:"pickup",
   item:"PC",pickup:from,from,to,recipient:rec,started:state.min,carried:false};
 showMissionBanner("CAMBIO POSTAZIONE",`${rec.name} cambia postazione. Vai al REPARTO IT, prendi il PC dalla postazione indicata con F e portalo alla postazione di ${rec.name} (${rec.homeRoom}); installalo con G.`,"+200 XP · RAPPORTO +5","EVENTO STUDIO");
 phoneMessage(rec.name,`Cambio postazione: prendi il PC in REPARTO IT e portalo da me in ${rec.homeRoom}.`);
 showStudioEventHud("CAMBIO POSTAZIONE",`F: PRENDI PC // REPARTO IT → ${rec.name} // ${rec.homeRoom}`);
 return true;
}
function maybeStartStudioEvent(){
 if(activeMiniGame||!$("#modal")?.classList.contains("hidden"))return;
 if(!v12c42CanGenerateWork())return;
 if(studioEvent||introStage!=="done"||state.min<studioEventNext||isLunch())return;
 const r=Math.random();
 if(state.min<690)startAmazonEvent();
 else if(r<.48&&!v12c42MeetingActive()&&!v12c42MeetingClosed())startMeetingRushEvent();
 else if(r<.82)startDeskSetupEvent();
 else startAmazonEvent();
 studioEventNext=state.min+85+Math.random()*75;
}
function studioEventTarget(){
 if(!studioEvent)return null;
 if(studioEvent.type==="AMAZON"){
   const p=studioEvent.packages.find(p=>p.owner==="PLAYER"&&!p.done&&(p.taken||inventory.length<3));
   if(!p)return null;
   return p.taken?p.to:{x:p.x,y:p.y,room:"INGRESSO / SEGRETERIA"};
 }
 return studioEvent.stage==="pickup"?studioEvent.pickup:studioEvent.to;
}
/* AUDIT removed obsolete interactStudioEvent */

function studioEventPrompt(){
 const t=studioEventTarget();if(!t||Math.hypot(player.x-t.x,player.y-t.y)>92)return null;
 if(studioEvent.type==="AMAZON"){
  const p=studioEvent.packages.find(p=>p.owner==="PLAYER"&&!p.done&&(p.taken||Math.hypot(player.x-p.x,player.y-p.y)<=92));
  return p?(p.taken?`G — CONSEGNA ${p.label}`:`F — PRENDI ${p.label}`):null;
 }
 return studioEvent.stage==="pickup"?`F — PRENDI ${studioEvent.item}`:`G — CONSEGNA ${studioEvent.item}`;
}
function updateStudioEvent(dt){
 v12c42MeetingUpdate();
 if(!studioEvent)return;
 if(studioEvent.type==="AMAZON"){
  for(const n of studioEvent.helpers){
   const p=studioEvent.packages.find(p=>p.owner===n.id);if(!p||p.done)continue;
   if(n.state==="eventPickup"){
    if(moveNpcRoute(n,dt)){p.taken=true;n.state="eventDeliver";n.routeGoal={...p.to};n.route=findNpcPath({x:n.x,y:n.y},p.to);n.routeIndex=0}
   }else if(n.state==="eventDeliver"){
    if(moveNpcRoute(n,dt)){p.done=true;n.eventCarry=null;n.state="work";n.x=n.homeX;n.y=n.homeY}
   }
  }
 }
 if(false){/* V12 CLEAN.4.2 old repeating meeting warning disabled */}
}
function drawStudioEventObjects(){
 if(!studioEvent)return;
 if(studioEvent.type==="AMAZON"){
  for(const p of studioEvent.packages){
   if(p.done||p.taken)continue;
   g.fillStyle=p.owner==="PLAYER"?"#d8a44c":"#a87943";g.fillRect(p.x-10,p.y-8,20,16);
   g.fillStyle="#2a1a0c";g.font="bold 6px monospace";g.fillText("AMZ",p.x-8,p.y+2);
  }
  for(const n of studioEvent.helpers){if(n.eventCarry){g.fillStyle="#b9874d";g.fillRect(n.x-9,n.y-2,18,13)}}
 }
 if(studioEvent.type==="DESK_SETUP"){
   const t=studioEvent.carried?studioEvent.to:studioEvent.pickup;
   if(t){
     const pulse=7+Math.sin(performance.now()/180)*2;
     g.save();g.strokeStyle="#ffd65a";g.lineWidth=3;g.strokeRect(t.x-18-pulse/2,t.y-14-pulse/2,36+pulse,28+pulse);
     g.fillStyle="#ffd65a";g.font="bold 9px monospace";g.textAlign="center";
     g.fillText(studioEvent.carried?`G // INSTALLA PC DA ${studioEvent.recipient?.name||"DESTINAZIONE"}`:"F // PRENDI PC",t.x,t.y-24);
     g.restore();
   }
 }
}

function v12c4ClampRelation(v){return Math.max(-5,Math.min(5,Math.round(v)))}
function v12c4InitialRelation(n){
 if(!n)return 0;
 if(n.id==="zia")return 2+Math.floor(Math.random()*4);
 if(n.id==="manager")return -2+Math.floor(Math.random()*4);
 if(n.id==="hr"||n.name==="BETTY")return 2+Math.floor(Math.random()*4);
 if(n.id==="don"||n.name==="DON")return 3+Math.floor(Math.random()*3);
 if(n.id==="pao"||n.name==="PAO")return -5+Math.floor(Math.random()*11);
 return -5+Math.floor(Math.random()*11);
}
function v12c4InitRelations(){
 for(const n of [...ambientNPCs,...npcs,...(mokasa?[mokasa]:[])]){if(!n)continue;n.rapporto=v12c4InitialRelation(n);n.relation=n.rapporto}
}
function spawnNPCs(){
 npcs=npcDefs.map(n=>({...n}));spawnAmbient();v12c43InitWorkday();mokasa={id:"mokasa",name:"CAPO",role:"DIREZIONE",x:1435,y:555,homeRoom:"SALA MEET CAPO",homeX:1435,homeY:555,tone:"bad",shirt:"#75483d",life:Infinity,court:true,hunter:false,seeking:false,state:"bossIdle",route:null,routeIndex:0,stuckFor:0,blockedFor:0};npcCooldown={};mokasaTimer=0;lastZiaHour=-1;
 lastPlayerPos={x:player.x,y:player.y};idleMinutes=0;
}

/* V12 CLEAN — LOS helper. Does not change keyboard/input. */
function v12cSegmentBlocked(x1,y1,x2,y2){
 const steps=Math.max(4,Math.ceil(Math.hypot(x2-x1,y2-y1)/10));
 for(let i=1;i<steps;i++){
   const t=i/steps,x=x1+(x2-x1)*t,y=y1+(y2-y1)*t;
   if(!walkable(x,y))return true;
 }
 return false;
}
function v12cNpcCanSeePlayer(n,maxDist=100){
 if(!n)return false;
 if(Math.hypot(n.x-player.x,n.y-player.y)>maxDist)return false;
 const nr=roomAt(n.x,n.y)?.name,pr=roomAt(player.x,player.y)?.name;
 if(!enteredStudio && nr)return false;
 if(nr&&pr&&nr!==pr&&v12cSegmentBlocked(n.x,n.y,player.x,player.y))return false;
 return !v12cSegmentBlocked(n.x,n.y,player.x,player.y);
}


/* V12 CLEAN.1 — Intro protection zone
   During entrance/manager intro only Zia Ale and IT Manager may react. */

/* V12 CLEAN.2 — HARD DON INTRO LOCK */
function v12cDonLocked(){
 return introStage!=="done" || !managerRaceDone;
}
function v12cApplyDonLock(){
 const don=npcs.find(n=>n.id==="don");
 if(!don)return;
 if(v12cDonLocked()){
   don.hunter=false;
   don.state="idle";
   don.route=null;
   don.routeIndex=0;
   don.activity=null;
   don.activityTicket=false;
   don.exclaimUntil=0;
 }else{
   don.hunter=true;
 }
}

function v12cIntroProtected(){
 return introStage!=="done" || !enteredStudio;
}
function v12cNpcAllowedDuringIntro(n){
 if(!n)return false;
 if(!v12cIntroProtected())return true;
 return n.id==="zia" || n.id==="manager";
}

function nearestNPC(){
 let best=null,bd=999;
 const pool=[...ambientNPCs,...npcs];
 if(mokasa&&Math.hypot(player.x-mokasa.x,player.y-mokasa.y)<65)pool.push(mokasa);
 for(const n of pool){
   if(!n||!v12cNpcAllowedDuringIntro(n))continue;
   if(typeof v12cNpcCanSeePlayer==="function"&&!v12cNpcCanSeePlayer(n,110))continue;
   const d=Math.hypot(n.x-player.x,n.y-player.y);
   if(d<bd){best=n;bd=d}
 }
 return best?{n:best,d:bd}:null;
}

function updateCapoRoutine(dt){
 if(!mokasa)return;
 mokasa.x=1435;mokasa.y=555;
 mokasa.homeX=1435;mokasa.homeY=555;
 mokasa.route=null;mokasa.routeIndex=0;
 mokasa.state="bossIdle";mokasa.seeking=false;mokasa.court=true;
 return;
}
function spawnMokasa(){
 if(Math.random()<.28){
   mokasa={id:"mokasa",name:"CAPO",role:"SALA MEET CAPO // EXTREME",x:1450,y:570,tone:"bad",shirt:"#75483d",life:95,court:true};
   phoneMessage("DIREZIONE","Il CAPO è in Sala Corte. Ha una richiesta urgente.");
 }else{
   const candidates=stations.filter(s=>s.room!=="SERVER");
   const s=candidates[Math.floor(Math.random()*candidates.length)];
   mokasa={id:"mokasa",name:"CAPO",role:"CAPO",x:s.x+22,y:s.y+26,tone:"bad",shirt:"#75483d",life:45,court:false};
 }
}
function autoCloseModal(ms=2200){
 clearTimeout(window.__npcModalTimer);
 window.__npcModalTimer=setTimeout(()=>{
   const m=$("#modal");
   if(m&&!m.classList.contains("hidden"))m.classList.add("hidden");
 },ms);
}
function createPendingOffer(n){
 if(!n||pendingOffers[n.id])return;
 let offer=null;
 if(n.id==="pao"){
   const opts=[
    {title:"CAFFÈ CON PAO",stress:-8,xp:20,text:"Quando puoi vieni a cercarmi. Ti offro un caffè."},
    {title:"DRITTA DI PAO",stress:-6,xp:35,text:"Quando puoi passa da me. Ho una dritta per te."},
    {title:"FIORENTINA",stress:-7,xp:15,text:"Quando mi trovi facciamo due chiacchiere sulla Fiorentina."}
   ];
   offer=opts[Math.floor(Math.random()*opts.length)];
 }else if(n.id==="don"){
   if(typeof v12cDonLocked==="function"&&v12cDonLocked())return;
   const opts=[
    {title:"DON TI COPRE",stress:-12,xp:30,text:"Quando mi trovi passa da me. Ti copro io un attimo."},
    {title:"PAUSA CON DON",stress:-9,xp:25,text:"Quando puoi vieni a cercarmi."},
    {title:"DRITTA DI DON",stress:-7,xp:40,text:"Ho una cosa utile da dirti. Passa da me."}
   ];
   offer=opts[Math.floor(Math.random()*opts.length)];
 }else if(n.id==="zia"){
   const opts=[
    {title:"CAFFÈ",stress:-10,xp:10,text:"Quando puoi passa da me in Segreteria."},
    {title:"PILLOLA DI SAGGEZZA",rep:1,xp:10,text:"Quando puoi passa da me in Segreteria."},
    {title:"TI COPRO IO",time:12,xp:10,text:"Quando puoi passa da me in Segreteria."}
   ];
   offer=opts[Math.floor(Math.random()*opts.length)];
 }else if(n.id==="hr"){
   const band=typeof bettyStressBand==="function"?bettyStressBand():0;
   offer=band>=3
     ? {title:"SUPPORTO HR",stress:-24,rep:1,xp:80,text:"Passa da me in HR. Ti copro io cinque minuti."}
     : band>=2
     ? {title:"SUPPORTO HR",stress:-16,xp:45,text:"Quando hai un minuto passa in HR."}
     : {title:"CHECK HR",stress:-9,xp:15,text:"Quando puoi passa da me in HR."};
 }else return;

 pendingOffers[n.id]=offer;
 phoneMessage(n.name,offer.text);
}

/* VERSIONE1ITSHIFT 1.0.18 — runtime fixes from console evidence */

function sideMessage(name,text){
 try{
   const box=document.getElementById("phoneNotification");
   const sender=document.getElementById("phoneSender");
   const body=document.getElementById("phoneText");
   if(sender)sender.textContent=String(name||"MESSAGGIO");
   if(body)body.textContent=String(text||"");
   if(box){
     box.classList.remove("hidden");
     clearTimeout(box.__v118Hide);
     box.__v118Hide=setTimeout(()=>box.classList.add("hidden"),5000);
     return true;
   }
   if(typeof toast==="function"){
     toast(`${name||"MESSAGGIO"} // ${text||""}`);
     return true;
   }
 }catch(e){
   console.warn("sideMessage:",e);
 }
 return false;
}

function activityDestination(n,kind){
 if(!n)return null;
 const home={
   x:Number.isFinite(n.homeX)?n.homeX:(Number.isFinite(n.x)?n.x:400),
   y:Number.isFinite(n.homeY)?n.homeY:(Number.isFinite(n.y)?n.y:400),
   room:String(n.homeRoom||"CENTRALE")
 };
 const targets={
   coffee:{x:1015,y:805,room:"CUCINA"},
   printer:{x:1210,y:780,room:"STAMPANTI"},
   bathroom:{x:995,y:575,room:"BAGNI"},
   meeting:{x:900,y:225,room:"SALA MEET"},
   wander:home
 };
 const key=String(kind||"").toLowerCase();
 const t=targets[key]||home;
 return {x:t.x,y:t.y,room:t.room};
}

function v118ValidPoint(p){
 return !!(p&&Number.isFinite(p.x)&&Number.isFinite(p.y));
}

let v118RuntimeErrors=0;
function v118SafeCall(label,fn){
 try{return fn()}
 catch(e){
   v118RuntimeErrors++;
   console.error(`ITSHIFT SAFE FRAME // ${label}`,e);
   if(typeof v117Trace==="function")v117Trace("ERROR",`${label}:${e?.message||e}`);
   return undefined;
 }
}

function consumePendingOffer(n){
 const o=n&&pendingOffers[n.id];if(!o)return false;
 delete pendingOffers[n.id];
 if(o.stress)state.stress=Math.max(0,state.stress+o.stress);
 if(o.xp)state.xp+=o.xp;
 if(o.rep)state.rep=Math.min(5,state.rep+o.rep);
 if(o.time){
   const t=[...tickets].sort((a,b)=>a.due-b.due)[0];
   if(t)t.due+=o.time;
 }
 if(n.id==="hr"){bettySupportCooldown=90;bettyPinged=false}
 npcCooldown[n.id]=state.min;
 clamp();hud();renderTickets();
 sideMessage(n.name,`${o.title} // BONUS RICEVUTO`);
 toast(`${n.name} // ${o.title}`);
 return true;
}

let v12c45CapoTalkAt=0;
function v12c45CapoCanTalk(){
 return performance.now()-v12c45CapoTalkAt>12000;
}


function v12c451ManagerTalkAllowed(n){
 if(!n || n.id!=="manager")return true;
 // Intro/race owns Manager behavior. After it, no random repetitive chatter.
 if(!managerRaceDone)return false;
 // Only allow one optional exchange every 45 sec.
 const now=performance.now();
 if(!n._lastOptionalTalk)n._lastOptionalTalk=0;
 if(now-n._lastOptionalTalk<45000)return false;
 n._lastOptionalTalk=now;
 return true;
}


/* VERSIONE1ITSHIFT — SPECIAL NPCS */
let v1BettyBonusAt=0,v1PaoSpecialAt=0,v1DonSpecialAt=0;

function v1Rel(n){return typeof ensureRelation==="function"?ensureRelation(n):(n?.rapporto??0)}

function v1BettyHRBonus(n){
 if(!n||!(n.id==="hr"||n.name==="BETTY"))return false;
 const now=performance.now();
 if(now-v1BettyBonusAt<70000)return false;
 const r=v1Rel(n);
 if(r<0)return false;
 v1BettyBonusAt=now;
 const relief=r>=4?18:r>=2?13:9;
 state.stress=Math.max(0,state.stress-relief);
 if(r>=4&&state.strikes>0&&Math.random()<.12){
   state.strikes=Math.max(0,state.strikes-1);
   sideMessage("BETTY // HR",`STRESS -${relief} // ERRORE -1`);
 }else sideMessage("BETTY // HR",`Una cosa alla volta. STRESS -${relief}`);
 hud();return true;
}

function v1PaoSpecial(n){
 if(!n||!(n.id==="pao"||n.name==="PAO"))return false;
 const now=performance.now();
 if(now-v1PaoSpecialAt<50000)return false;
 v1PaoSpecialAt=now;
 const r=v1Rel(n);
 const lines=[
  "Quest'anno la Fiorentina ci fa soffrire anche senza aprire un ticket.",
  "Se risolvi questa al primo colpo ti porto allo stadio.",
  "Il viola sul monitor è giusto. Non calibrarlo."
 ];
 sideMessage("PAO",lines[Math.floor(Math.random()*lines.length)]);
 if(r>=2&&Math.random()<.38){state.stress=Math.max(0,state.stress-7);state.xp+=35;toast("PAO // DRITTA BUONA // STRESS -7 // XP +35");hud()}
 if(r<=-2&&Math.random()<.35)newTicket(Math.random()<.3?"HIGH":"MEDIUM");
 return true;
}

function v1DonSpecial(n){
 if(!n||!(n.id==="don"||n.name==="DON"))return false;
 const now=performance.now();
 if(now-v1DonSpecialAt<60000)return false;
 v1DonSpecialAt=now;
 const r=v1Rel(n);
 sideMessage("DON",r>=2?"Tranquillo, se serve ti do una mano.":"Tutto sotto controllo?");
 if(r>=2){
   state.stress=Math.max(0,state.stress-8);
   if(state.strikes>0&&r>=4&&Math.random()<.10)state.strikes=Math.max(0,state.strikes-1);
   state.xp+=25;hud();
 }
 return true;
}

function npcTalk(n){
 if(!n)return false;

 // 1.0.9: a promised special interaction ALWAYS wins over generic chatter.
 if(consumePendingOffer(n))return true;

 if(n?.id==="manager"&&managerRaceDone){
   if(!v12c451ManagerTalkAllowed(n))return false;
   sideMessage("IT MANAGER","Controlla i ticket e tieni d'occhio il server.");
   return true;
 }
 if(!v12c451ManagerTalkAllowed(n))return false;

 if(n.id==="hr"||n.name==="BETTY"){
   if(v1BettyHRBonus(n))return true;
 }
 if(n.id==="pao"||n.name==="PAO"){
   if(v1PaoSpecial(n))return true;
 }
 if(n.id==="don"||n.name==="DON"){
   if(v1DonSpecial(n))return true;
 }

 if((n.id==="mokasa"||n.name==="CAPO")){
   if(!v12c45CapoCanTalk())return false;
   v12c45CapoTalkAt=performance.now();
 }
 if(typeof v12cIntroProtected==="function"&&v12cIntroProtected()&&typeof v12cNpcAllowedDuringIntro==="function"&&!v12cNpcAllowedDuringIntro(n))return false;

 const rel=typeof ensureRelation==="function"?ensureRelation(n):(n.rapporto??0);
 const pos=["Tutto tranquillo, per ora.","Grazie, almeno tu rispondi.","Oggi ti risparmio una richiesta assurda."];
 const neu=["Hai un secondo?","Quando puoi, avrei una cosa da chiederti.","Ti segnalo una cosa, senza panico."];
 const neg=["Finalmente ti trovo.","È da un po' che aspetto.","Non dirmi di riavviare."];
 const pool=rel>=2?pos:rel<=-2?neg:neu;
 sideMessage(n.name||"NPC",pool[Math.floor(Math.random()*pool.length)]);
 return true;
}
function showStrike(level){
 const o=$("#strikeOverlay");
 if(!o)return;
 $("#strikeCount").textContent=`${level} SCADUTO // STRIKE +1 // ERRORI ${state.strikes}/${state.maxStrikes}`;
 o.classList.remove("hidden");clearTimeout(o._t);o._t=setTimeout(()=>o.classList.add("hidden"),1900);
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
const stations=[
 // CENTRALE V6.5: eccezione open-space, 2 tavoli x 6 persone = 12 postazioni.
 ...[[385,405],[445,405],[505,405],[565,405],[625,405],[685,405],[385,525],[445,525],[505,525],[565,525],[625,525],[685,525]].map((p,i)=>({id:"C"+String(i+1).padStart(2,"0"),room:"CENTRALE",type:"HP Z",x:p[0],y:p[1]})),
 // Reparti operativi: massimo 4 postazioni; qui 3 per lasciare spazio agli NPC.
 ...[[95,155],[155,155],[215,155]].map((p,i)=>({id:"E"+String(i+1).padStart(2,"0"),room:"EDITORIA",type:"MAC",x:p[0],y:p[1]})),
 ...[[1090,170],[1140,170],[1190,170]].map((p,i)=>({id:"I"+String(i+1).padStart(2,"0"),room:"INTERIOR",type:"MAC",x:p[0],y:p[1]})),
 ...[[105,385],[165,385],[205,440]].map((p,i)=>({id:"B"+String(i+1).padStart(2,"0"),room:"BIM",type:"HP Z",x:p[0],y:p[1]})),
 ...[[1300,165],[1360,165],[1420,215]].map((p,i)=>({id:"R"+String(i+1).padStart(2,"0"),room:"RENDERISTI",type:"HP Z",x:p[0],y:p[1]})),
 // Stanze private: una sola postazione HR; IT ha solo PG + Manager e non genera ambient NPC.
 {id:"HR01",room:"EDITORIA",type:"PRIVATE",x:135,y:180},
 {id:"IT-PG",room:"IT",type:"PRIVATE",x:125,y:850},
 {id:"IT-MGR",room:"IT",type:"PRIVATE",x:190,y:840},
 // Sale e infrastruttura.
 {id:"MEET-TV",room:"SALA MEET",type:"AV",x:925,y:205},
 {id:"SPAZIO-TV",room:"SPAZIO A",type:"AV",x:1030,y:480},
 {id:"CAPO-TV",room:"SALA MEET CAPO",type:"AV",x:1395,y:535},
 {id:"PIX-01",room:"RIFUGIO DIGITALE",type:"PIXERA",x:1080,y:635},
 {id:"PIX-02",room:"RIFUGIO DIGITALE",type:"PIXERA",x:1130,y:635},
 {id:"SRV-01",room:"SERVER",type:"SERVER",x:610,y:145},
 {id:"SRV-02",room:"SERVER",type:"SERVER",x:665,y:145},
 {id:"PRN-01",room:"STAMPANTI",type:"PRINTER",x:1210,y:800},
 {id:"PRN-02",room:"STAMPANTI",type:"PRINTER",x:1260,y:800},
 {id:"PRN-03",room:"STAMPANTI",type:"PRINTER",x:1310,y:800}
, {id:"3D-01",x:1470,y:825,room:"STAMPA 3D",type:"3D PRINTER"},{id:"3D-02",x:1520,y:825,room:"STAMPA 3D",type:"3D PRINTER"},{id:"3D-CTRL",x:1495,y:875,room:"STAMPA 3D",type:"PC"}];


function safePlayerSpawn(){
 const candidates=[{x:150,y:680},{x:215,y:680},{x:260,y:710},{x:420,y:710}];
 return candidates.find(p=>walkable(p.x,p.y))||{x:420,y:710};
}

function setupCompactHUD(){
 const p=$("#ticketPanel"),btn=$("#ticketToggle");
 if(p)p.classList.add("collapsed");
 if(btn)btn.onclick=()=>togglePDA($("#pda").classList.contains("hidden"));
}


/* =============================================================
   V5 — A DAY IN IT SUPPORT
   ============================================================= */

function showMissionBanner(title,text,reward="",kicker="MISSIONE"){
 const b=$("#missionBanner");if(!b)return;
 $("#missionKicker").textContent=kicker;$("#missionTitle").textContent=title;
 $("#missionText").textContent=text;$("#missionReward").textContent=reward;
 b.classList.remove("hidden","out");clearTimeout(b._t);
 b._t=setTimeout(()=>b.classList.add("out"),4200);
 setTimeout(()=>b.classList.add("hidden"),4800);
}
function showStudioEventHud(title,text){
 const h=$("#studioEventHud");if(!h)return;
 $("#studioEventTitle").textContent=title;$("#studioEventText").textContent=text;h.classList.remove("hidden");
}
function hideStudioEventHud(){ $("#studioEventHud")?.classList.add("hidden"); }
let v12cDoorbellRung=false,v12cDoorOpened=false;
let introStage="outside",shiftStarted=false,managerRaceDone=false,managerPenaltyDone=false; // compatibility
let raceState="idle",workstationOnline=false,firstMissionResolved=false; // V12 CLEAN.4.6
let introMissionArmed=false,introManagerAlerted=false;
let storyOpen=false,storyCallback=null;
const IT_PC={x:150,y:842,room:"IT"};
const OUTSIDE_ZONE={x:500,y:930,w:300,h:90};
walkZones.push(OUTSIDE_ZONE,{x:620,y:900,w:160,h:120},V101_EXTERIOR.SIDEWALK);
let deferredDialogs=[];
function flushDeferredDialog(){
 if(!deferredDialogs.length||!$("#modal")?.classList.contains("hidden")||!$("#rewardOverlay")?.classList.contains("hidden")||storyOpen)return;
 const d=deferredDialogs.shift();
 if(d.phoneOnly)phoneMessage(d.who,d.text);else storyDialog(d.who,d.text,d.cb);
}
function storyDialog(who,text,cb=null){
 if(!$("#modal")?.classList.contains("hidden")){deferredDialogs.push({who,text,cb});phoneMessage(who,text);return}
 storyOpen=true;storyCallback=cb;keys={};
 const b=$("#storyDialog");if(!b)return;
 $("#storyWho").textContent=who;$("#storyText").textContent=text;
 b.classList.toggle("bettySupport",who==="BETTY");
 b.classList.remove("hidden");
}
function closeStory(){if(!storyOpen)return;storyOpen=false;$("#storyDialog")?.classList.add("hidden");const cb=storyCallback;storyCallback=null;if(cb)cb();setTimeout(flushDeferredDialog,80)
 uiMessageBusy=false;
}
function managerRaceRoute(m){
 const goal={x:185,y:842,room:"IT"};
 // V10.2: percorso più naturale, meno zig-zag.
 // I nodi sono solo sui corridoi principali; ogni tratto viene validato dal pathfinder.
 const anchors=[
   {x:m.x,y:m.y,room:navAreaAt(m.x,m.y)},
   {x:650,y:760,room:"CORRIDOIO"},
   {x:420,y:705,room:"CORRIDOIO"},
   {x:250,y:675,room:"CORRIDOIO"},
   goal
 ];
 const out=[];
 for(let i=1;i<anchors.length;i++){
   const start=out.length?out[out.length-1]:anchors[0];
   const seg=findNpcPath(start,anchors[i]);
   if(!seg.length)return [];
   // avoid duplicate first node between segments
   if(out.length&&seg.length&&Math.hypot(out[out.length-1].x-seg[0].x,out[out.length-1].y-seg[0].y)<2)seg.shift();
   out.push(...seg);
 }
 return out;
}


/* V12 CLEAN.3 — MANAGER RACE SAFE ROUTE
   Never targets the IT wall directly.
   Route: Segreteria -> main corridor -> IT corridor -> IT door -> desk.
*/
function v12c3ManagerRaceRoute(m){
 const anchors=[
   {x:m.x,y:m.y,room:navAreaAt(m.x,m.y)},
   {x:650,y:735,room:"CORRIDOIO"},
   {x:520,y:705,room:"CORRIDOIO"},
   {x:365,y:705,room:"CORRIDOIO"},
   {x:300,y:675,room:"CORRIDOIO"}, // IT door / threshold
   {x:225,y:820,room:"IT"},        // soglia interna IT
   {x:185,y:842,room:"IT"}         // workstation
 ];
 const route=[];
 for(let i=1;i<anchors.length;i++){
   const from=route.length?route[route.length-1]:anchors[0];
   const seg=findNpcPath(from,anchors[i]);
   if(!seg||!seg.length)return [];
   // refuse any segment that contains a non-walkable node
   if(seg.some(p=>!walkable(p.x,p.y)))return [];
   if(route.length && seg.length &&
      Math.hypot(route[route.length-1].x-seg[0].x,route[route.length-1].y-seg[0].y)<3){
      seg.shift();
   }
   route.push(...seg);
 }
 return route;
}

function startShiftFromEntrance(){
 v111StartRaceClock();
 const _m=npcs.find(n=>n.id==="manager");
 if(_m){
   _m.x=585;_m.y=760;_m.route=v107ManagerRaceRoute();_m.routeIndex=0;
   _m.routeGoal={x:185,y:842,room:"IT"};_m.state="managerRace";
   _m.stuckFor=0;_m.blockedFor=0;
 }

 if(shiftStarted)return;
 shiftStarted=true;state.min=Math.max(state.min,540);introStage="reachPC";introManagerAlerted=true;raceState="running";workstationOnline=false;firstMissionResolved=false;
 const m=npcs.find(n=>n.id==="manager");
 if(m){
   m.exclaimUntil=performance.now()+1800;m.state="managerRace";
   m.raceSpeed=Math.max(m.raceSpeed||0,122);m.speed=m.raceSpeed;
   m.routeGoal={x:185,y:842,room:"IT"};m.route=v12c3ManagerRaceRoute(m);
   m.routeIndex=0;m.stuckFor=0;m.blockedFor=0;
   if(!m.route.length){
     m.state="managerWatch";
     phoneMessage("IT MANAGER","Percorso verso IT non disponibile. Gara sospesa.");
   }
 }
 if(typeof sideMessage==="function")sideMessage("IT TASK","Raggiungi IT e avvia la tua workstation prima del manager."); else toast("IT TASK // Raggiungi IT prima del Manager");
}

function v12c462PhysicalPickupNearby(){
 const ct=carryMission?.stage==="pickup"?carryTarget():null;
 if(ct&&Math.hypot(player.x-ct.x,player.y-ct.y)<85)return true;
 if(studioEvent?.type==="AMAZON"&&studioEvent.packages.some(p=>p.owner==="PLAYER"&&!p.taken&&!p.done&&Math.hypot(player.x-p.x,player.y-p.y)<85))return true;
 if(studioEvent&&!studioEvent.carried&&studioEvent.pickup&&Math.hypot(player.x-studioEvent.pickup.x,player.y-studioEvent.pickup.y)<85)return true;
 return false;
}


let v110FirstMissionResolved=false;
function v110CompleteFirstMission(){
 if(v110FirstMissionResolved)return false;
 v110FirstMissionResolved=true;workstationOnline=true;firstMissionResolved=true;
 managerRaceDone=true;introStage="done";
 storyOpen=false;uiMessageBusy=false;activeMiniGame=null;
 if(typeof v11MissionBriefOpen!=="undefined")v11MissionBriefOpen=false;
 const modal=document.getElementById("modal");if(modal)modal.classList.add("hidden");
 if(raceState==="running"){raceState="won";state.xp+=100;state.rep=Math.min(5,state.rep+1)}
 else if(raceState!=="lost")raceState="lost";
 const m=npcs.find(n=>n.id==="manager");
 if(m){m.route=null;m.routeIndex=0;m.state="desk";m.x=185;m.y=842}
 if(!tickets.length)newTicket("LOW");
 toast("WORKSTATION ONLINE // PRIMA MISSIONE COMPLETATA");hud();updateTaskProgress();return true;
}


/* VERSIONE1ITSHIFT 1.0.11 — TRUE STARTUP RACE */
let v111RaceStartClock=null;
let v111PlayerFinishClock=null;
let v111ManagerFinishClock=null;
let v111RaceResolved=false;

function v111StartRaceClock(){
 v111RaceStartClock=performance.now();
 v111PlayerFinishClock=null;
 v111ManagerFinishClock=null;
 v111RaceResolved=false;
}

function v111RegisterManagerFinish(){
 if(v111ManagerFinishClock!==null||v111RaceStartClock===null)return;
 v111ManagerFinishClock=performance.now();
 if(raceState==="running")raceState="lost";
}

function v111RegisterPlayerFinish(){
 if(v111PlayerFinishClock!==null||v111RaceStartClock===null)return;
 v111PlayerFinishClock=performance.now();
}

function v111RaceWatch(){
 if(v111RaceStartClock===null||v111ManagerFinishClock!==null||v111RaceResolved)return;
 const m=npcs.find(n=>n.id==="manager");
 if(!m)return;
 if(Math.hypot(m.x-IT_PC.x,m.y-IT_PC.y)<55)v111RegisterManagerFinish();
}

function v111RaceResult(){
 if(v111RaceResolved||v111PlayerFinishClock===null)return;
 v111RaceResolved=true;
 const p=(v111PlayerFinishClock-v111RaceStartClock)/1000;
 const m=v111ManagerFinishClock===null?Infinity:(v111ManagerFinishClock-v111RaceStartClock)/1000;
 const win=p<m;
 const rows=[
   "WORKSTATION ONLINE",
   `TU: ${p.toFixed(1)}s`,
   Number.isFinite(m)?`IT MANAGER: ${m.toFixed(1)}s`:"IT MANAGER: NON ARRIVATO"
 ];
 if(win){
   state.xp+=100;state.rep=Math.min(5,state.rep+1);
   rows.push("VITTORIA // XP +100 // REPUTAZIONE +1");
   raceState="won";
   showRewardResult("MISSIONE COMPLETATA",rows,"success");
 }else{
   state.stress=Math.min(100,state.stress+4);
   rows.push(`SCONFITTA // RITARDO ${(p-m).toFixed(1)}s // STRESS +4`);
   raceState="lost";
   showRewardResult("MISSIONE COMPLETATA",rows,"failure");
 }
 hud();
}

function bootWorkstation(){
 if(state?.phase!=="shift"||!shiftStarted)return false;
 if(v110FirstMissionResolved||firstMissionResolved)return false;
 if(typeof IT_PC==="undefined"||!v118ValidPoint(IT_PC)||Math.hypot(player.x-IT_PC.x,player.y-IT_PC.y)>78)return false;

 clearTimeout(window.__npcModalTimer);window.__npcModalTimer=null;
 const modal=document.getElementById("modal");
 const body=document.getElementById("modalBody");
 if(!modal||!body)return false;
 modal.classList.remove("hidden");

 body.innerHTML=`<div class="pixelTaskHead"><span>09:00 // IT</span><h2>AVVIO POSTAZIONE</h2><p>POWER, attendi il boot, poi LOGIN.</p></div>
 <div class="miniGame bootGame">
  <button id="powerPC" class="pixelAction">POWER</button>
  <div class="bootScreen" id="bootPC">PC SPENTO<span></span></div>
  <button id="loginPC" class="pixelAction" disabled>LOGIN</button>
 </div>`;

 let powered=false;
 const power=document.getElementById("powerPC"), login=document.getElementById("loginPC"), screen=document.getElementById("bootPC");
 power.onclick=()=>{
   if(powered)return;
   powered=true;power.disabled=true;screen.innerHTML="BIOS...<br>NETWORK...<br>WINDOWS READY";
   setTimeout(()=>{if(login)login.disabled=false},550);
 };
 login.onclick=()=>{
   if(!powered)return;
   modal.classList.add("hidden");
   v111RegisterPlayerFinish();
   v110FirstMissionResolved=true;firstMissionResolved=true;workstationOnline=true;managerRaceDone=true;introStage="done";
   storyOpen=false;uiMessageBusy=false;activeMiniGame=null;
   if(!tickets.length)newTicket("LOW");
   v111RaceResult();updateTaskProgress();hud();
 };
 return true;
}

/* V5.3.2 — IT MANAGER DEDICATED PATH */

function managerStartRoute(){const m=npcs.find(n=>n.id==="manager");const from=m?{x:m.x,y:m.y}:{x:650,y:800};return findNpcPath(from,{x:190,y:870,room:"IT"});}
function managerITtoServerRoute(){
 return findNpcPath({x:190,y:640},{x:650,y:190,room:"SERVER"});
}
function managerServerToITRoute(){
 return findNpcPath({x:650,y:190},{x:190,y:840,room:"IT"});
}
function moveManagerRoute(n,dt){if(!n.route||!n.route.length||n.routeIndex>=n.route.length)return true;const old=n.speed;n.speed=n.raceSpeed||96;const done=moveNpcRoute(n,dt);n.speed=old;return done;}

function safeRoom(obj,fallback="CORRIDOIO"){return obj&&typeof obj.room==="string"&&obj.room?obj.room:fallback;}
function safePoint(obj,fallback={x:820,y:705,room:"CORRIDOIO"}){if(!obj||!Number.isFinite(obj.x)||!Number.isFinite(obj.y))return {x:fallback.x,y:fallback.y,room:safeRoom(fallback)};return {x:obj.x,y:obj.y,room:safeRoom(obj,safeRoom(fallback))};}
function managerRouteTo(target){
 target=safePoint(target,{x:190,y:840,room:"IT"});
 const route=[];
 if(safeRoom(target)==="SERVER"){
   route.push(
    {x:260,y:640},{x:360,y:560},{x:420,y:420},
    {x:520,y:320},{x:650,y:320},{x:target.x,y:target.y}
   );
 }else{
   route.push(
    {x:650,y:320},{x:520,y:320},{x:420,y:420},
    {x:360,y:560},{x:260,y:640},{x:190,y:640}
   );
 }
 return route;
}
function managerDispatchTicket(level=null){
 if(tickets.length>=difficultyConfig[difficulty].maxTickets)return false;
 const before=tickets.length;
 const levels=state.min>990?["MEDIUM","HIGH","CRITICAL"]:["LOW","MEDIUM","HIGH"];
 const lv=level||levels[Math.floor(Math.random()*levels.length)];
 newTicket(lv,{source:"IT MANAGER"});
 const created=tickets.length>before;
 if(created){renderTickets();refreshPDA();updateTaskProgress()}
 return created?lv:false;
}

function v12c45ManagerAllowedRoom(room){return ["IT","SERVER","SERVER"].includes(room)}
function v12c45ManagerRoutineTarget(m){
 const goServer=Math.random()<0.5;
 return goServer?{x:755,y:210,room:"SERVER"}:{x:245,y:850,room:"IT"};
}


function v107ManagerRaceRoute(){
 return [
   {x:585,y:760,room:"INGRESSO / SEGRETERIA"},
   {x:500,y:730,room:"CORRIDOIO"},
   {x:395,y:730,room:"CORRIDOIO"},
   {x:300,y:760,room:"CORRIDOIO"},
   {x:255,y:800,room:"CORRIDOIO"},
   {x:225,y:820,room:"IT"},
   {x:185,y:842,room:"IT"}
 ];
}

function updateManager(dt){
 if(isLunch())return;
 const m=npcs.find(n=>n.id==="manager");if(!m)return;
 if(m.state==="managerRace"){
   if(!m.route||!m.route.length){
     m.route=v107ManagerRaceRoute();m.routeIndex=0;m.routeGoal={x:185,y:842,room:"IT"};
   }
   const old=m.speed;m.speed=m.raceSpeed||118;
   const arrived=moveNpcRoute(m,dt);
   m.speed=old;
   if(arrived){
     m.state="desk";m.currentRoom="IT";m.x=185;m.y=842;
     if(raceState==="running"&&!managerPenaltyDone){
       raceState="lost";managerRaceDone=true;managerPenaltyDone=true;
       state.stress=Math.min(100,state.stress+4);
       phoneMessage("IT MANAGER","Io sono già arrivato. Accendi quella workstation.");hud();
     }
   }
   return;
 }
 // The manager's normal routine starts only after the workstation mission is resolved.
 if(!firstMissionResolved)return;
 const room=roomAt(m.x,m.y)?.name;
 if(room && !v12c45ManagerAllowedRoom(room)){
   m.routeGoal=v12c45ManagerRoutineTarget(m);m.route=findNpcPath({x:m.x,y:m.y},m.routeGoal);m.routeIndex=0;m.state="managerRoutine";
 }
 m.managerTimer=(m.managerTimer??80)-dt;
 if((m.state==="desk"||m.state==="idle"||m.state==="managerRoutine")&&m.managerTimer<=0){
   const target=Math.random()<.48?{x:650,y:190,room:"SERVER"}:{x:185,y:842,room:"IT"};
   m.routeGoal={...target};m.route=findNpcPath({x:m.x,y:m.y},target);m.routeIndex=0;m.state="managerTravel";m.managerTimer=65+Math.random()*90;
 }
 if(m.state==="managerTravel"&&moveNpcRoute(m,dt)){
   m.state="desk";
   if(Math.random()<.55){const lv=managerDispatchTicket();if(lv)phoneMessage("IT MANAGER",`Mi hanno chiamato: ti ho girato un ticket ${lv}. Controlla il TABLET IT.`)}
 }
}

/* AUDIT removed obsolete lunchRouteFor */


/* V12 CLEAN.4.6.2 — canonical lunch state */
let v12c462LunchActive=false;
function v12c462LunchParticipants(){return [...ambientNPCs,...npcs].filter(n=>n&&n.id!=="mokasa")}
function v12c462BuildLunchSeats(){
 const people=v12c462LunchParticipants();v12c43LunchSeats=[];
 const xs=[825,860,895,930,965,1000,1035,1070,1105];
 const ys=[790,875];let i=0;
 for(const y of ys)for(const x of xs){if(i<people.length)v12c43LunchSeats.push({id:i++,x,y,room:"CUCINA"})}
 people.forEach((n,j)=>n.lunchSeatId=j%Math.max(1,v12c43LunchSeats.length));
}
function v12c462StartLunch(){
 if(v12c462LunchActive)return;
 v12c462LunchActive=true;lunchMode=true;v12c462BuildLunchSeats();
 v12c462LunchParticipants().forEach((n,i)=>{
   const seat=v12c43LunchSeats[n.lunchSeatId];if(!seat)return;
   n.activity=null;n.activityTicket=false;n.routeGoal={...seat};
   n.route=(v12c44IsPao(n)&&n.homeRoom==="BIM")?v12c44PaoExitRoute(n,seat):findNpcPath({x:n.x,y:n.y},seat);
   n.routeIndex=0;n.state="lunchTravel";n.lunchDelay=(i%5)*.45+Math.random()*.8;
 });
}
function v12c462UpdateLunch(dt){
 if(!isLunch())return;
 if(!v12c462LunchActive)v12c462StartLunch();
 for(const n of v12c462LunchParticipants()){
   const seat=v12c43LunchSeats[n.lunchSeatId];if(!seat)continue;
   if(n.state==="lunchTravel"){
     n.lunchDelay=(n.lunchDelay||0)-dt;if(n.lunchDelay>0)continue;
     if(moveNpcRoute(n,dt)){n.x=seat.x;n.y=seat.y;n.route=null;n.routeIndex=0;n.state="lunchSeated"}
   }else if(n.state==="lunchSeated"){n.x=seat.x;n.y=seat.y}
   else{
     n.routeGoal={...seat};
     n.route=(v12c44IsPao(n)&&n.homeRoom==="BIM")?v12c44PaoExitRoute(n,seat):findNpcPath({x:n.x,y:n.y},seat);
     n.routeIndex=0;n.state="lunchTravel";
   }
 }
}

function v114PostLunchReset(){
 const setHome=(n,x,y,room,stateName)=>{
   if(!n)return;
   n.x=x;n.y=y;n.homeX=x;n.homeY=y;n.homeRoom=room;
   n.route=null;n.routeIndex=0;n.routeGoal=null;
   n.stuckFor=0;n.blockedFor=0;n.seeking=false;
   n.state=stateName||"work";
   n.lunchSeat=null;n.lunchSlot=null;n.inLunch=false;
 };
 const pao=v106SpecialNpcById("pao");
 const don=v106SpecialNpcById("don");
 const betty=npcs.find(n=>n.id==="hr"||n.name==="BETTY");
 const zia=npcs.find(n=>n.id==="zia"||n.name==="ZIA ALE");
 const manager=npcs.find(n=>n.id==="manager");

 setHome(pao,140,675,"BIM","work");
 setHome(don,1045,880,"CUCINA","work");
 setHome(betty,155,205,"HR","idle");
 setHome(zia,650,805,"INGRESSO / SEGRETERIA","idle");
 setHome(manager,185,842,"IT","desk");

 if(pao)pao._spT=3+Math.random()*4;
 if(don)don._spT=4+Math.random()*5;
}
function v12c462EndLunch(){
 if(!v12c462LunchActive)return;
 v12c462LunchActive=false;lunchMode=false;
 v12c462LunchParticipants().forEach(n=>{
   n.route=null;n.routeIndex=0;n.stuckFor=0;n.blockedFor=0;
   if(n.id==="manager"){
     n.routeGoal={x:190,y:840,room:"IT"};
     n.route=findNpcPath({x:n.x,y:n.y},n.routeGoal);
     n.routeIndex=0;n.state="managerTravel";
   }else if(n.id==="pao"||n.id==="don"){
     n.state="work";
     n._specialTimer=4+Math.random()*7;
   }else{
     v12c43RouteToDesk(n);
   }
 });

 for(const id of ["pao","don"]){
   const s=v106SpecialNpcById(id);
   if(s){s.route=null;s.routeIndex=0;s.state="work";s._spT=2+Math.random()*3}
 }

 v114PostLunchReset();}

function beginLunchMigration(){v12c462StartLunch()}

/* AUDIT removed obsolete v12c43StartLunchAssigned */

/* AUDIT removed obsolete v12c43UpdateLunchAssigned */


function updateLunchMigration(dt){
 if(isLunch())v12c462UpdateLunch(dt);
 else if(v12c462LunchActive)v12c462EndLunch();
}
function randomizeMiniLayout(){
 const box=document.querySelector(".miniGame");if(!box)return;
 const children=[...box.children].filter(x=>x.tagName==="BUTTON"||x.classList.contains("pixelItem"));
 children.forEach(x=>x.style.order=Math.floor(Math.random()*100));
 box.classList.add("v7MiniGrid");
}

/* =============================================================
   V4 — LIVING STUDIO / CAMERA / LORE
   ============================================================= */
const LUNCH_START=13*60,LUNCH_END=14*60,LATE_START=17*60+30;
const LUNCH_SPOTS=[
 {x:855,y:768,room:"CUCINA",seat:true},{x:915,y:768,room:"CUCINA",seat:true},{x:975,y:768,room:"CUCINA",seat:true},{x:1035,y:768,room:"CUCINA",seat:true},
 {x:855,y:822,room:"CUCINA",seat:true},{x:915,y:822,room:"CUCINA",seat:true},{x:975,y:822,room:"CUCINA",seat:true},{x:1035,y:822,room:"CUCINA",seat:true},
 {x:855,y:858,room:"CUCINA",seat:true},{x:915,y:858,room:"CUCINA",seat:true},{x:975,y:858,room:"CUCINA",seat:true},{x:1035,y:858,room:"CUCINA",seat:true},
 {x:855,y:888,room:"CUCINA",seat:true},{x:915,y:888,room:"CUCINA",seat:true},{x:975,y:888,room:"CUCINA",seat:true},{x:1035,y:888,room:"CUCINA",seat:true},
 {x:780,y:705,room:"CORRIDOIO",seat:false},{x:1160,y:705,room:"CORRIDOIO",seat:false},
 {x:1090,y:650,room:"RIFUGIO DIGITALE",seat:false},{x:1140,y:650,room:"RIFUGIO DIGITALE",seat:false}
];
function lunchSpotFor(n,i){
 if(n.id==="manager")return {x:190,y:840,room:"IT"};
 if(n.id==="hr")return {x:135,y:205,room:"EDITORIA"};
 if(n.id==="zia")return {x:685,y:815,room:"INGRESSO / SEGRETERIA"};
 return {...LUNCH_SPOTS[i%LUNCH_SPOTS.length]};
}
let dayFlags={},lunchMode=false,fullMap=false;
let introFreeWalk=false,entranceOpened=false,enteredStudio=false;
let camera={x:0,y:0,zoom:1.68};

function isLunch(){return state&&state.min>=LUNCH_START&&state.min<LUNCH_END}
function dayPhase(){
 if(!state)return "MORNING";
 if(state.min<LUNCH_START)return "MORNING";
 if(state.min<LUNCH_END)return "LUNCH";
 if(state.min<LATE_START)return "AFTERNOON";
 if(state.min<BOSS)return "ESCALATION";
 return "AFTER_HOURS";
}
function narrativeOnce(key,sender,text){
 if(dayFlags[key])return;
 dayFlags[key]=true;
 phoneMessage(sender,text);
}

let v12cStoryMission=0;
function v12cStoryProgression(){
 if(!state||introStage!=="done"||storyOpen||isLunch())return;
 if(v12cStoryMission<1&&state.min>=600&&!studioEvent){
   v12cStoryMission=1;
   showMissionBanner("MISSIONE 2 // SALA MEET","Controlla la sala meeting: qualcosa non torna.","EVENTO STORIA","STORIA");
   startMeetingRushEvent();
 }else if(v12cStoryMission<2&&state.min>=690&&!studioEvent){
   v12cStoryMission=2;
   showMissionBanner("MISSIONE 3 // CONSEGNA","Zia Ale ha ricevuto dei pacchi. Quelli IT sono tuoi.","EVENTO STORIA","STORIA");
   startAmazonEvent();
 }else if(v12cStoryMission<3&&state.min>=900&&!studioEvent){
   v12cStoryMission=3;
   showMissionBanner("MISSIONE 4 // POMERIGGIO","Cambio postazione urgente: serve un monitor.","EVENTO STORIA","STORIA");
   startDeskSetupEvent();
 }
}

function updateNarrative(){
 if(!v12c42CanGenerateWork())return;
 if(!state||!shiftStarted)return;
 if(state.min>=615)narrativeOnce("1015","ZIA ALE","La Sala Meet tra poco è occupata. Se passa qualcuno di corsa, sai già perché.");
 if(state.min>=705)narrativeOnce("1145","IT MANAGER","Occhio ai ticket della direzione: se arrivano, hanno priorità.");
 if(state.min>=765)narrativeOnce("1245","DON","Io tra poco vado a pranzo. Se vuoi fumare, questo è il momento.");
 if(state.min>=855)narrativeOnce("1415","ZIA ALE","Bentornato. Il pomeriggio di solito è peggio della mattina.");
 if(state.min>=1005)narrativeOnce("1645","IT MANAGER","Da ora in poi preparati ai classici: prima di andare via avrei una cosina...");
 if(state.min>=1080)narrativeOnce("1800","CAPO","Prima di andare via devo fare una presentazione. Tieniti libero per la Sala Meet.");
}
function computeCamera(){
 if(debug||fullMap)return {x:0,y:0,zoom:1};
 const z=camera.zoom;
 const vw=W/z,vh=H/z;
 const maxX=Math.max(0,W-vw),maxY=Math.max(0,H-vh);
 camera.x=Math.max(0,Math.min(maxX,player.x-vw/2));
 camera.y=Math.max(0,Math.min(maxY,player.y-vh/2));
 return camera;
}
function drawMiniMap(){
 const c=$("#miniMap");if(!c||!state)return;
 const m=c.getContext("2d"),sx=c.width/W,sy=c.height/H;
 m.clearRect(0,0,c.width,c.height);
 m.fillStyle="#050806";m.fillRect(0,0,c.width,c.height);
 m.fillStyle="#172019";
 rooms.forEach(r=>m.fillRect(r.x*sx,r.y*sy,r.w*sx,r.h*sy));
 m.fillStyle="#3a281a";
 corridors.forEach(r=>m.fillRect(r.x*sx,r.y*sy,r.w*sx,r.h*sy));
 m.strokeStyle="#526059";m.lineWidth=1;
 rooms.forEach(r=>m.strokeRect(r.x*sx,r.y*sy,r.w*sx,r.h*sy));
 tickets.forEach(t=>{
   m.fillStyle=t.level==="CRITICAL"?"#ff4141":"#ffd447";
   m.fillRect(t.p.x*sx-2,t.p.y*sy-2,5,5);
 });
 m.fillStyle="#67ff87";m.fillRect(player.x*sx-3,player.y*sy-3,7,7);
 // anomalies intentionally never appear here.
}
function setupMiniMapControls(){
 const w=$("#miniMapWrap");if(!w||w.dataset.ready)return;w.dataset.ready="1";
 let size=1,drag=false,ox=0,oy=0,moved=false;
 const sizes=["mini","medium","large"];
 const apply=()=>{w.classList.remove(...sizes);w.classList.add(sizes[size]);};apply();
 w.addEventListener("click",e=>{if(moved){moved=false;return} if(e.detail===1){size=(size+1)%3;apply()}});
 w.addEventListener("dblclick",e=>{e.preventDefault();w.style.left="";w.style.top="";w.style.right="14px";size=0;apply()});
 const down=e=>{const t=e.touches?e.touches[0]:e;drag=true;moved=false;const r=w.getBoundingClientRect();ox=t.clientX-r.left;oy=t.clientY-r.top;w.style.right="auto"};
 const move=e=>{if(!drag)return;const t=e.touches?e.touches[0]:e;moved=true;w.style.left=Math.max(0,t.clientX-ox)+"px";w.style.top=Math.max(85,t.clientY-oy)+"px";if(e.cancelable)e.preventDefault()};
 const up=()=>drag=false;
 w.addEventListener("mousedown",down);document.addEventListener("mousemove",move);document.addEventListener("mouseup",up);
 w.addEventListener("touchstart",down,{passive:true});document.addEventListener("touchmove",move,{passive:false});document.addEventListener("touchend",up);
}

let pdaTab="TASK";
function refreshPDA(){
 const p=$("#pdaBody");if(!p||!state)return;
 const active=tickets.map((t,i)=>`<button class="pdaTicketRow" data-ticket="${i}"><b class="prio ${t.level.toLowerCase()}">${t.level}</b><span>${t.p?.id||t.p?.type||"POSTAZIONE"}</span><span>${safeRoom(t.p,"SEGNALAZIONE")}</span><span>${t.taskType||"DIAGNOSI"}</span><small>${fmt(t.due)}</small></button>`).join("");
 const carry=carryMission?`<div class="pdaCarry"><b>${carryMission.item}</b><span>${carryMission.stage==="pickup"?"RITIRO: "+safeRoom(carryMission.pickup,"IT"):"CONSEGNA: "+(carryMission.recipient?carryMission.recipient.name:safeRoom(carryMission.to,"POSTAZIONE"))}</span></div>`:"";
 const people=[...new Map([...ambientNPCs,...npcs,mokasa].filter(Boolean).filter(n=>n.id&&n.id!=="manager").map(n=>[n.id,n])).values()];
 const rel=people.map(n=>{const v=ensureRelation(n),tier=v>=45?"AMICO":v>=15?"SIMPATIA":v<=-45?"NEMICO":v<=-15?"ANTIPATIA":"NEUTRALE";const pct=Math.round((v+100)/2);return `<div class="relRow ${v>=45?"friend":v<=-45?"enemy":""}"><b>${n.name}</b><span>${tier}</span><i><em style="width:${pct}%"></em></i><small>${v>0?"+":""}${v}</small></div>`}).join("");
 const tabs=["TASK","INVENTARIO","RAPPORTI","STATO"].map(t=>`<button class="tabletTab ${pdaTab===t?"active":""}" data-tab="${t}">${t}</button>`).join("");
 let body="";
 if(pdaTab==="TASK") body=`<section class="ticketWindow"><div class="windowTitle"><span>Gestione ticket IT</span><small>Windows // Service Desk</small></div><div class="ticketColumns"><b>PRIORITÀ</b><b>ID</b><b>REPARTO</b><b>PROBLEMA</b><b>SCADENZA</b></div>${carry||active||"<div class='pdaEmpty'>NESSUN TICKET APERTO</div>"}</section>`;
 else if(pdaTab==="INVENTARIO") body=`<section><h4>INVENTARIO</h4><div class="inventoryPda">${inventory.length?inventory.map(x=>`<div>${x}</div>`).join(""):"NESSUN OGGETTO"}</div></section>`;
 else if(pdaTab==="RAPPORTI") body=`<section><h4>RAPPORTI // STUDIO</h4><div class="relationshipList">${rel}</div></section>`;
 else body=`<section class="tabletState"><h4>STATO OPERATORE</h4><div class="stateCards"><b>STRESS ${Math.round(state.stress)}%</b><b>ERRORI ${state.strikes}/${state.maxStrikes}</b><b>INCIDENT ${Math.round(state.incident)}%</b><b>XP ${state.xp}</b><b>REPUTAZIONE ${"★".repeat(Math.max(0,Math.round(state.rep)))}</b><b>BETTY ${bettySupportCooldown>0?"COOLDOWN":"DISPONIBILE"}</b></div><p>${state.stress>=50?"BETTY // Passa in HR: può aiutarti a recuperare stress.":"Turno sotto controllo."}</p></section>`;
 p.innerHTML=`<div class="tabletTabs">${tabs}</div>${body}`;
 p.querySelectorAll(".tabletTab").forEach(b=>b.onclick=()=>{pdaTab=b.dataset.tab;refreshPDA()});
 p.querySelectorAll(".pdaTicketRow").forEach(b=>b.onclick=()=>{const t=tickets[+b.dataset.ticket];if(!t)return;const mac=safeRoom(t.p)==="EDITORIA";$("#modalBody").innerHTML=`<div class="ticketDetail ${mac?"macWindow":"winWindow"}"><div class="osTitle">${mac?"● ● ●  Supporto Mac":"▣  Service Desk // Windows"}</div><h2>${t.level} // ${t.p?.id||"TICKET"}</h2><p><b>Reparto:</b> ${safeRoom(t.p,"SEGNALAZIONE")}</p><p><b>Problema:</b> ${t.taskType||"DIAGNOSI"}</p><p><b>Scadenza:</b> ${fmt(t.due)}</p><button class="choice" onclick="document.querySelector('#modal').classList.add('hidden')">PRENDI IN CARICO</button></div>`;$("#modal").classList.remove("hidden")});
}
function togglePDA(force){
 const p=$("#pda");if(!p)return;
 const open=force===undefined?p.classList.contains("hidden"):force;
 refreshPDA();
 p.classList.toggle("hidden",!open);
}

function routeNpcHome(n){
 const home={x:n.homeX,y:n.homeY,room:n.homeRoom||"HOME"};
 return typeof routeViaHub==="function"?routeViaHub(n,home):[{x:home.x,y:home.y}];
}
function forceLunchReturn(){
 [...ambientNPCs,...npcs].filter(Boolean).forEach(n=>{
  if(n.id==="manager")return;
  n.state="returnHomeAfterLunch";
  n.route=routeNpcHome(n);n.routeIndex=0;n.timer=0;n.activity=null;n.activityTicket=false;
 });
}
function updateLunchReturn(dt){return}

/* AUDIT removed obsolete setLunchPositions */

/* AUDIT removed obsolete leaveLunch */

/* AUDIT removed obsolete updateLunchState */


function beginEntranceWalk(){
 introFreeWalk=true;
 entranceOpened=false;
 enteredStudio=false;
 introStage="doorReady";
 if(state)state.min=Math.max(state.min,540);
 toast("09:00 // LO STUDIO È APERTO — raggiungi la porta e premi E");
}



function runV10Audit(){
 const issues=[];
 const r=n=>rooms.find(x=>x.name===n);
 const kitchen=r("CUCINA"),bath=r("BAGNI"),refuge=r("RIFUGIO DIGITALE");
 if(!kitchen||kitchen.y<750)issues.push("CUCINA non separata dal corridoio");
 const corridorOK=corridors.some(c=>c.x<=805&&c.y<=720&&c.x+c.w>=1220&&c.y+c.h>=735);
 if(!corridorOK)issues.push("CORRIDOIO Bagni/Rifugio/Cucina assente");
 const centralPC=stations.filter(s=>s.room==="CENTRALE"&&s.type==="HP Z").length;
 if(centralPC!==12)issues.push(`CENTRALE: ${centralPC} PC, attesi 12`);
 if(stations.some(s=>s.room==="CUCINA"&&["HP Z","MAC"].includes(s.type)))issues.push("PC in CUCINA");
 const pao=npcs.find(n=>n.id==="pao");if(pao&&pao.homeRoom!=="BIM")issues.push("PAO non parte dal BIM");
 const hr=npcs.find(n=>n.id==="hr");if(hr&&hr.homeRoom!=="HR")issues.push("BETTY non parte da HR");
 const tests=[
  [{x:900,y:625},{x:900,y:720}],
  [{x:1100,y:625},{x:1100,y:720}],
  [{x:900,y:720},{x:900,y:830}],
  [{x:1100,y:720},{x:1100,y:830}]
 ];
 tests.forEach((t,i)=>{if(!findNpcPath(t[0],t[1]).length)issues.push("PATH V10 "+i+" non raggiungibile")});
 console.log("V10 AUDIT:",issues.length?issues:"OK");
 return issues;
}

function runV8Audit(){
 const issues=[];
 const workRooms=["EDITORIA","BIM","INTERIOR","RENDERISTI"];
 for(const room of workRooms){
  const pc=stations.filter(s=>s.room===room&&["HP Z","MAC"].includes(s.type)).length;
  const staff=ambientNPCs.filter(n=>n.homeRoom===room).length;
  if(pc>4)issues.push(`${room}: ${pc} PC > 4`);
  if(staff>pc)issues.push(`${room}: ${staff} NPC > ${pc} PC`);
 }
 const centralPC=stations.filter(s=>s.room==="CENTRALE"&&s.type==="HP Z").length;
 const centralStaff=ambientNPCs.filter(n=>n.homeRoom==="CENTRALE").length;
 if(centralPC!==12)issues.push(`CENTRALE: ${centralPC} PC, attesi 12`);
 if(centralStaff!==12)issues.push(`CENTRALE: ${centralStaff} NPC, attesi 12`);
 if(ambientNPCs.some(n=>PRIVATE_ROOMS.has(n.homeRoom)))issues.push("NPC ambient in stanza privata");
 if(stations.some(s=>s.room==="CUCINA"&&["HP Z","MAC"].includes(s.type)))issues.push("PC presenti in CUCINA");
 if(stations.some(s=>s.room==="BAGNI"&&["HP Z","MAC"].includes(s.type)))issues.push("PC presenti in BAGNI");
 const pao=npcs.find(n=>n.id==="pao");if(!pao||pao.homeRoom!=="BIM")issues.push("PAO homeRoom != BIM");
 const hr=npcs.find(n=>n.id==="hr");if(!hr||hr.homeRoom!=="HR")issues.push("BETTY homeRoom != HR");
 const mgr=npcs.find(n=>n.id==="manager");if(!mgr||mgr.homeX!==190)issues.push("IT MANAGER home non valida");
 if(!mokasa||mokasa.homeRoom!=="SALA MEET CAPO")issues.push("CAPO non persistente in SALA MEET CAPO");
 // Connectivity smoke test from each home to corridor/own common destinations.
 for(const n of ambientNPCs.slice(0,40)){
  const p=findNpcPath({x:n.homeX,y:n.homeY},{x:790,y:705,room:"CORRIDOIO"});
  if(!p.length)issues.push(`PATH: ${n.name}/${n.homeRoom} non raggiunge corridoio`);
 }
 console.log("V9 AUDIT:",issues.length?issues:"OK");
 return issues;
}
function runV6Audit(){
 const issues=[];const workRooms=["EDITORIA","BIM","INTERIOR","RENDERISTI"];
 for(const room of workRooms){const count=stations.filter(s=>s.room===room&&["HP Z","MAC"].includes(s.type)).length;if(count>4)issues.push(`${room}: ${count} PC (>4)`)}
 const central=stations.filter(s=>s.room==="CENTRALE"&&s.type==="HP Z").length;if(central!==12)issues.push(`CENTRALE: ${central} PC (attesi 12)`);
 if(stations.filter(s=>s.room==="HR").length!==1)issues.push("HR deve avere una sola postazione");
 const privateAmbient=ambientNPCs.filter(n=>PRIVATE_ROOMS.has(n.homeRoom));if(privateAmbient.length)issues.push("NPC ambient assegnati a stanze private");
 const kitchenPC=stations.filter(s=>s.room==="CUCINA"&&["HP Z","MAC"].includes(s.type));if(kitchenPC.length)issues.push("PC presenti in cucina");
 console.log("V9 AUDIT:",issues.length?issues:"OK");return issues;
}
function v12c4Phase(){return state?.phase||"boot";}

function v1FinalAudit(){
 const problems=[];
 if(typeof v12c45Pickup!=="function")problems.push("F pickup missing");
 if(typeof v12c45Deliver!=="function")problems.push("G deliver missing");
 if(typeof v12c462StartLunch!=="function")problems.push("Lunch missing");
 if(typeof v1BettyHRBonus!=="function")problems.push("Betty HR missing");
 if(typeof v1PaoSpecial!=="function")problems.push("PAO special missing");
 if(typeof v1DonSpecial!=="function")problems.push("DON special missing");
 if(typeof v12c44DrawCollisionDebug!=="function")problems.push("F2 debug missing");
 if(problems.length)console.warn("VERSIONE1ITSHIFT AUDIT",problems);
 return problems;
}


function v102FinalAudit(){
 const issues=[];
 if(typeof v102NormalizeTicketLifetime!=="function")issues.push("ticket lifetime");
 if(typeof v102SoftLockGuard!=="function")issues.push("softlock guard");
 if(typeof v102DrawLab!=="function")issues.push("lab draw");
 if(typeof v1BettyHRBonus!=="function")issues.push("Betty");
 if(typeof v1PaoSpecial!=="function")issues.push("PAO");
 if(typeof v1DonSpecial!=="function")issues.push("DON");
 if(issues.length)console.warn("VERSIONE1ITSHIFT 1.0.2 AUDIT",issues);
 return issues;
}

function reset(){
 v114AmazonIntroShown=false;v114LastUiProgress=performance.now();v114LastStateMin=null;
 v111RaceStartClock=null;v111PlayerFinishClock=null;v111ManagerFinishClock=null;v111RaceResolved=false;
 v110FirstMissionResolved=false;
 v109EndShiftReady=false;
 v12c452SoftLockFor=0;
 setTimeout(()=>v12c45InitPlayerSafe(),0);
 v12c43LunchSeats=[];v12c462LunchActive=false;
 v12c42MeetingState="IDLE";v12c42MeetingLateWarned=false;v12c42MeetingQueued=false;v12c42MeetingDeferredStart=false;
 if(!state)state={phase:"boot",stress:0,strikes:0,maxStrikes:5,xp:0,incident:0,rep:0,solved:0,min:538};
 managerRaceDone=false;
 v12cDoorbellRung=false;v12cDoorOpened=false;v12cStoryMission=0;
 bettySupportCooldown=0;bettyPinged=false;bettyLastStressBand=0;

 Object.keys(npcRelations).forEach(k=>delete npcRelations[k]);

 introFreeWalk=false;entranceOpened=false;enteredStudio=false;window.__entranceDialogReady=false;
const bad=validateMap();if(bad.length)console.warn("Unreachable task points disabled:",bad);state={phase:"shift",min:538,stress:0,rep:5,xp:0,incident:0,strikes:0,maxStrikes:difficultyConfig[difficulty].maxStrikes,solved:0,anomalyPenalty:0,bossPhase:0};player={x:705,y:985,s:205};tickets=[];last=performance.now();spawnTimer=0;anomTimer=0;phoneQueue=[];visualAnomaly=null;inventory=[];carryMission=null;studioEvent=null;studioEventNext=610;eventSerial=0;pendingOffers={};firstCarryTriggered=true;encounterLock=false;dayFlags={};lunchMode=false;fullMap=false;introStage="outside";introFreeWalk=false;entranceOpened=false;enteredStudio=false;shiftStarted=false;managerRaceDone=false;managerPenaltyDone=false;raceState="idle";workstationOnline=false;firstMissionResolved=false;spawnNPCs();v12c4InitRelations();runV10Audit();runV8Audit();const m=npcs.find(n=>n.id==="manager");if(m){m.x=650;m.y=800;m.state="outside";m.route=null;m.routeIndex=0}updateInventoryUI();updateTaskProgress();setupCompactHUD();setupMiniMapControls();hud();storyDialog("08:58","Ho ancora due minuti. Mi fumo una sigaretta prima di entrare...",()=>setTimeout(()=>storyDialog("TELEFONO","A dopo. Entro in studio.",()=>beginEntranceWalk()),250));
 v1FinalAudit();

 v102FinalAudit();
}
function inside(r,x,y,p=0){return x>=r.x+p&&x<=r.x+r.w-p&&y>=r.y+p&&y<=r.y+r.h-p}
function walkable(x, y) {
  if (!walkZones.some(z => inside(z, x, y))) {
    // console.log("return false");
    return false;
  }
  return !obstacles.some(o => x > o.x + 5 && x < o.x + o.w - 5 && y > o.y + 5 && y < o.y + o.h - 5)
}
function roomAt(x,y){
 return rooms.find(r=>inside({x:r.x+8,y:r.y+8,w:r.w-16,h:r.h-16},x,y))||null;
}
function inDoorZone(x,y){
 return doors.some(d=>inside(d,x,y));
}
/*
 Player collision is stricter than NPC navigation:
 - destination must be walkable
 - crossing a room wall is allowed only inside a door zone
 This prevents "walking through the wall" while preserving wide, forgiving doors.
*/
function playerCanMove(ox,oy,nx,ny){
 if(!walkable(nx,ny))return false;
 const a=roomAt(ox,oy),b=roomAt(nx,ny);
 if(a===b)return true;
 if(inDoorZone(ox,oy)||inDoorZone(nx,ny))return true;
 // corridor -> corridor / outside room is fine
 if(!a&&!b)return true;
 return false;
}

function fmt(m){m=Math.max(START,Math.min(END,m));return String(Math.floor(m/60)).padStart(2,"0")+":"+String(Math.floor(m%60)).padStart(2,"0")}
function anomalyLevel(){return Math.max(0,Math.min(1,(state.min-START)/(BOSS-START)))}
function levelForTime(){let a=Math.random();if(state.min<720)return a<.75?"LOW":"MEDIUM";if(state.min<900)return a<.45?"LOW":a<.88?"MEDIUM":"HIGH";return a<.2?"LOW":a<.65?"MEDIUM":"HIGH"}
function reachablePoints(){const R=reachableSet();return points.filter(p=>pointReachable(p,R))}
function farthestPoint(){let ps=reachablePoints();return [...ps].sort((a,b)=>Math.hypot(player.x-b.x,player.y-b.y)-Math.hypot(player.x-a.x,player.y-a.y))[0]}

/* ============================================================
   V3 — IT TASK MINIGAMES
   Original IT-themed task panels inspired by quick maintenance
   interactions, while keeping the existing quiz system.
   ============================================================ */
let activeMiniGame=null;

function taskTypeForStation(s){
 if(!s)return "PROCESS";
 const room=s.room||"";
 const options={
  "EDITORIA":["RELINK","PROCESS"],
  "BIM":["PROCESS","CABLE"],
  "CENTRALE":["PROCESS","CABLE"],
  "LOFT":["PROCESS","CABLE"],
  "RENDERISTI":["PROCESS","CABLE"],
  "INTERIOR":["RELINK","PROCESS"],
  "SALA MEET":["AV","AV","CABLE"],
  "SPAZIO A":["AV","CABLE","AV"],
  "SALA MEET CAPO":["AV","AV","CABLE"],
  "SERVER":["SERVICES","SWITCH","RAID","PSU","CABLE"],
  "STAMPANTI":["TONER","TONER","PROCESS"],
  "RIFUGIO DIGITALE":["PIXERA","AV"],
  "IT":["PROCESS","CABLE","SERVICES"]
 }[room]||["PROCESS"];
 return options[Math.floor(Math.random()*options.length)];
}

function shouldUseMiniGame(level){ return true; }

function updateTaskProgress(){
 if(!state)return;
 // V5.3: il progresso misura SOLO lavoro completato, mai il passare del tempo.
 // Target giornaliero dinamico: 14 interventi equivalgono al 100%.
 const completed=(state.solved||0);
 const carryDone=(dayFlags&&dayFlags.carryCompleted)||0;
 const pct=state?.phase==="ended"?100:Math.max(0,Math.min(99,Math.round(((completed+carryDone)/14)*100)));
 const fill=$("#taskProgressFill"),txt=$("#taskProgressText");
 if(fill)fill.style.width=pct+"%";
 if(txt)txt.textContent=pct+"%";
}

function miniHeader(t,title,subtitle){
 return `<div class="pixelTaskHead">
   <span>${t.level} // ${safeRoom(t.p,"SEGNALAZIONE")}</span>
   <h2>${title}</h2>
   <p>${subtitle}</p>
 </div>`;
}


function showRewardResult(title,rows,kind="success"){
 const ov=$("#rewardOverlay"),box=$("#rewardRows"),ttl=$("#rewardTitle");if(!ov||!box||!ttl){toast(title+" // "+rows.join(" · "));return}
 if(window.__rewardTimer)clearTimeout(window.__rewardTimer);ttl.textContent=title;ttl.className=kind;box.innerHTML=rows.map((x,i)=>`<div><span>${i===0?"✓":"+"}</span><b>${x}</b></div>`).join("");ov.classList.remove("hidden");
 const close=()=>{if(ov.classList.contains("hidden"))return;ov.classList.add("hidden");window.removeEventListener("keydown",key);clearTimeout(window.__rewardTimer);setTimeout(flushDeferredDialog,80)};
 const key=e=>{if(e.key==="Enter"||e.key.toLowerCase()==="e"){e.preventDefault();close()}};window.addEventListener("keydown",key);$("#rewardContinue").onclick=close;window.__rewardTimer=setTimeout(close,5200);
}

function v12c4GrantBonus(){
 if(!state||state.phase!=="shift")return null;
 const roll=Math.random();let bonus=null;
 if(state.strikes>0&&roll<0.055){state.strikes=Math.max(0,state.strikes-1);bonus=["BACKUP SALVAVITA","-1 ERRORE"]}
 else if(state.stress>=35&&roll<0.13){state.stress=Math.max(0,state.stress-12);bonus=["CAFFÈ DOPPIO","STRESS -12"]}
 else if(state.strikes>0&&state.stress<70&&roll<0.17){state.strikes=Math.max(0,state.strikes-1);state.stress=Math.min(100,state.stress+5);bonus=["RIAVVIO MIRACOLOSO","-1 ERRORE // STRESS +5"]}
 else{
   const allies=[...ambientNPCs,...npcs].filter(n=>ensureRelation(n)>=4);
   if(state.strikes>0&&allies.length&&Math.random()<0.06){const a=allies[Math.floor(Math.random()*allies.length)];state.strikes=Math.max(0,state.strikes-1);bonus=[`FAVORE DI ${a.name}`,"-1 ERRORE"]}
 }
 if(bonus){if(typeof sideMessage==="function")sideMessage("BONUS",`${bonus[0]} // ${bonus[1]}`);else toast(`BONUS // ${bonus[0]} // ${bonus[1]}`);hud()}
 return bonus;
}
function miniSuccess(i,label,skipContext=false){
 if(i<0||i>=tickets.length)return;
 if(!skipContext){
   const t=tickets[i];
   if(t&&!t.contextChecked){t.contextChecked=true;maybeContextCheck(i,()=>miniSuccess(i,label,true));return}
 }
 const t=tickets[i],xp={LOW:120,MEDIUM:290,HIGH:560,CRITICAL:820}[t.level];
 tickets.splice(i,1);activeMiniGame=null;$("#modal").classList.add("hidden");
 const stressBefore=state.stress;
 state.xp+=xp;state.solved++;state.stress=Math.max(0,state.stress-6);
 state.incident=Math.max(0,state.incident-({LOW:2,MEDIUM:4,HIGH:7,CRITICAL:8}[t.level]));
 const srcNpc=[...ambientNPCs,...npcs].find(n=>n.name===t.source||n.id===t.source);
 let relRow="";
 if(srcNpc){changeRelation(srcNpc,6);relRow=`${srcNpc.name} RAPPORTO +6`}
 renderTickets();updateTaskProgress();hud();
 showRewardResult("INTERVENTO COMPLETATO",[
   `${label}`,
   `XP +${xp}`,
   `STRESS -${Math.round(stressBefore-state.stress)}`,
   relRow
 ].filter(Boolean),"success");

 v12c4GrantBonus();
}

function failMiniGameCurrent(){
 if(!activeMiniGame)return;
 const i=activeMiniGame.index,t=tickets[i];
 let repLoss=0;
 if(t){
   tickets.splice(i,1);repLoss=t.level==="CRITICAL"?2:1;state.rep-=repLoss;
   state.incident+=({LOW:5,MEDIUM:8,HIGH:12,CRITICAL:16}[t.level]||6)*difficultyConfig[difficulty].incidentMult;
 }
 activeMiniGame=null;$("#modal").classList.add("hidden");renderTickets();hud();checkEarlyEnd();
 showRewardResult("INTERVENTO FALLITO",[
   "3 ERRORI NELLO STESSO INTERVENTO",
   `REPUTAZIONE -${repLoss}`,
   `ERRORI ${state.strikes}/${state.maxStrikes}`,
   `INCIDENT ${Math.round(state.incident)}%`
 ],"failure");
}
function miniMistake(text="ERRORE"){
 if(!activeMiniGame)return;
 activeMiniGame.errors=(activeMiniGame.errors||0)+1;
 state.strikes++;
 const t=tickets[activeMiniGame.index],severity=t?({LOW:3,MEDIUM:5,HIGH:7,CRITICAL:10}[t.level]||4):4;
 state.stress+=severity*difficultyConfig[difficulty].stressMult;
 state.incident+=3*difficultyConfig[difficulty].incidentMult;
 const e=$("#miniError");
 if(e){
   e.textContent=`✕ ${text} // ERRORE ${activeMiniGame.errors}/3`;
   e.classList.add("on","v7Mistake");setTimeout(()=>e.classList.remove("on","v7Mistake"),950);
 }
 const game=document.querySelector(".miniGame");if(game){game.classList.add("mistakeFlash");setTimeout(()=>game.classList.remove("mistakeFlash"),220)}
 clamp();hud();checkEarlyEnd();
 if(activeMiniGame&&activeMiniGame.errors>=3)failMiniGameCurrent();
}


/* ============================================================
   V5.4.0 — CONTEXTUAL MICRO QUESTIONS
   Non sono quiz separati: sono micro-scelte tecniche dentro il
   minigioco e solo quando hanno senso per stanza/problema.
   ============================================================ */
const contextChecks={
 "SERVER":[
  {q:"Prima di intervenire su un servizio fermo, cosa controlli?",a:["Log e dipendenze","Riavvio completo server","Cambio DNS client"],ok:0},
  {q:"Una porta switch è DOWN. Primo controllo?",a:["Link/cavo e porta fisica","Reinstallare Windows","Cambiare VLAN a caso"],ok:0}
 ],
 "SALA MEET":[
  {q:"Monitor acceso ma NO SIGNAL. Primo controllo?",a:["Sorgente e catena HDMI","Riavviare il file server","Cambiare password utente"],ok:0}
 ],
 "SPAZIO A":[
  {q:"USB-C collegata ma niente video. Primo controllo?",a:["Supporto video/adapter/input","Reset stampante","Cambio DNS"],ok:0}
 ],
 "SALA MEET CAPO":[
  {q:"Presentazione urgente, display nero. Prima verifica?",a:["Input e extender TX/RX","Riavvio dominio","Reinstallazione Teams"],ok:0}
 ],
 "STAMPANTI":[
  {q:"Stampante raggiungibile ma job fermo. Primo controllo?",a:["Coda/spooler","Gateway","Driver GPU"],ok:0}
 ],
 "EDITORIA":[
  {q:"Adobe segnala media offline. Primo tentativo?",a:["Relink al file corretto","Reinstallare Adobe","Cambiare utente macOS"],ok:0}
 ],
 "INTERIOR":[
  {q:"File Adobe apre con font mancanti. Prima cosa?",a:["Verificare font/link","Cancellare progetto","Reset rete"],ok:0}
 ],
 "BIM":[
  {q:"Revit lento su un solo modello. Prima verifica?",a:["Modello/link/warning","Cambio monitor","Reset stampante"],ok:0}
 ],
 "RENDERISTI":[
  {q:"Render node non risponde. Primo controllo?",a:["Processo/rete/licenza","Riavvio stampante","Cambio VLAN utente"],ok:0}
 ],
 "CENTRALE":[
  {q:"PC senza rete con 169.254.x.x. Primo controllo?",a:["DHCP/link","DNS pubblico","Driver audio"],ok:0}
 ],
 "RIFUGIO DIGITALE":[
  {q:"Un output Pixera è fuori sync. Primo controllo?",a:["Mapping/output/timing","Cambiare mouse","Reset spooler"],ok:0}
 ],
 "IT":[
  {q:"Un ticket è poco chiaro. Prima mossa?",a:["Definire il sintomo","Reinstallare tutto","Chiudere il ticket"],ok:0}
 ]
};

function maybeContextCheck(i,onDone){
 const t=tickets[i];if(!t){onDone();return}const bank=contextChecks[safeRoom(t.p,"IT")]||[];
 if(!bank.length||Math.random()>.40){onDone();return}
 const original=bank[Math.floor(Math.random()*bank.length)];
 const choices=original.a.map((text,idx)=>({text,correct:idx===original.ok})).sort(()=>Math.random()-.5);
 const body=$("#modalBody"),panel=document.createElement("div");panel.className="contextCheck";
 panel.innerHTML=`<div class="contextCheckTitle">CHECK RAPIDO // ${safeRoom(t.p,"IT")}</div><div class="contextCheckQ">${original.q}</div><div class="contextCheckAnswers">${choices.map((c,n)=>`<button data-n="${n}" data-ok="${c.correct?1:0}">[${n+1}] ${c.text}</button>`).join("")}</div>`;body.appendChild(panel);
 const finish=()=>{panel.remove();onDone()};
 panel.querySelectorAll("button").forEach(btn=>btn.onclick=()=>{if(btn.dataset.ok==="1"){state.xp+=25;toast("CHECK CORRETTO // +25 XP");finish()}else{miniMistake("CHECK ERRATO");if(activeMiniGame)finish()}});
 const handler=e=>{if(!panel.isConnected)return window.removeEventListener("keydown",handler);if(/^[1-9]$/.test(e.key)){const btn=panel.querySelectorAll("button")[+e.key-1];if(btn){e.preventDefault();btn.click()}}};window.addEventListener("keydown",handler);
}

function startMiniGame(i){
 const t=tickets[i];
 if(!t)return;
 const type=t.taskType||taskTypeForStation(t.p);
 activeMiniGame={ticketId:t.id,index:i,type,errors:0,step:0};
 const body=$("#modalBody");
 $("#modal").classList.remove("hidden");

 if(type==="TONER"){
  body.innerHTML=miniHeader(t,"SOSTITUZIONE TONER","Inserisci la cartuccia nel vano corretto.")+
  `<div class="miniGame tonerGame">
    <div id="tonerCart" class="pixelItem toner">TONER</div>
    <div class="arrowPixel">→</div>
    <button id="tonerSlot" class="pixelSlot">VANO<br>STAMPANTE</button>
   </div><div id="miniError"></div>`;
  let picked=false;
  $("#tonerCart").onclick=()=>{picked=true;$("#tonerCart").classList.add("selected")};
  $("#tonerSlot").onclick=()=>picked?miniSuccess(i,"TONER INSTALLATO"):miniMistake("PRENDI PRIMA IL TONER");
 }

 else if(type==="CABLE"){
  const pool=["LAN","USB-C","HDMI","DP","AUDIO","USB-A"];const order=pool.sort(()=>Math.random()-.5).slice(0,3+Math.floor(Math.random()*2));
  body.innerHTML=miniHeader(t,"PATCH PANEL","Collega le linee nell'ordine indicato.")+
  `<div class="miniGame cableGame">
   ${[...order,...pool.filter(x=>!order.includes(x)).slice(0,2)].sort(()=>Math.random()-.5).map(x=>`<button class="cablePlug" data-v="${x}">${x}</button>`).join("")}
   </div><div class="pixelSequence">${order.join(" → ")}</div><div id="miniError"></div>`;
  let step=0;
  document.querySelectorAll(".cablePlug").forEach(b=>b.onclick=()=>{
   if(b.dataset.v===order[step]){b.classList.add("done");b.disabled=true;step++;if(step===order.length)miniSuccess(i,"CABLAGGIO OK")}
   else miniMistake("PORTA SBAGLIATA");
  });
 }

 else if(type==="SERVICES"){
  const seq=["DNS","AUTH","FILES"];
  body.innerHTML=miniHeader(t,"SERVICE RECOVERY","Riavvia i servizi nella sequenza corretta.")+
  `<div class="miniGame serviceGame">
   ${["FILES","AUTH","DNS"].map(x=>`<button class="serviceNode" data-v="${x}"><i></i>${x}</button>`).join("")}
   </div><div class="pixelSequence">01 DNS · 02 AUTH · 03 FILES</div><div id="miniError"></div>`;
  let step=0;
  document.querySelectorAll(".serviceNode").forEach(b=>b.onclick=()=>{
   if(b.dataset.v===seq[step]){b.classList.add("online");b.disabled=true;step++;if(step===3)miniSuccess(i,"SERVIZI ONLINE")}
   else miniMistake("SEQUENZA ERRATA");
  });
 }

 else if(type==="AV"){
  const variants=[
   {fault:"TX/RX",correct:"PC → HDMI → TX → CAT6 → RX → HDMI → DISPLAY",opts:["PC → HDMI → RX → CAT6 → TX → DISPLAY","PC → HDMI → TX → CAT6 → RX → HDMI → DISPLAY","PC → USB → TX → HDMI → RX → DISPLAY"]},
   {fault:"ALIMENTAZIONE RX",correct:"ALIMENTA RX",opts:["CAMBIA DNS","ALIMENTA RX","RESET STAMPANTE","DISABILITA DHCP"]},
   {fault:"INPUT DISPLAY",correct:"HDMI 2",opts:["DP 1","HDMI 2","TV","USB"]}
  ];
  const v=variants[Math.floor(Math.random()*variants.length)],opts=[...v.opts].sort(()=>Math.random()-.5);
  body.innerHTML=miniHeader(t,"HDMI EXTENDER // "+v.fault,"Ripristina la catena video della sala meeting.")+
  `<div class="miniGame avGame">${opts.map(x=>`<button class="avChoice" data-v="${x}">${x}</button>`).join("")}</div><div class="pixelSequence">TX ⇄ CAT6 ⇄ RX</div><div id="miniError"></div>`;
  document.querySelectorAll(".avChoice").forEach(b=>b.onclick=()=>{
   if(b.dataset.v===v.correct){b.classList.add("done");setTimeout(()=>miniSuccess(i,"SALA MEET OPERATIVA"),260)}
   else miniMistake("CATENA / INPUT ERRATO");
  });
 }

 else if(type==="PIXERA"){
  const order=[1,2,3,4];
  const shuffled=[3,1,4,2];
  body.innerHTML=miniHeader(t,"PIXERA SYNC","Sincronizza i display in ordine 1 → 4.")+
  `<div class="miniGame pixeraGame">
   ${shuffled.map(n=>`<button class="pixScreen" data-n="${n}"><span>${n}</span><i>NO SYNC</i></button>`).join("")}
   </div><div id="miniError"></div>`;
  let step=0;
  document.querySelectorAll(".pixScreen").forEach(b=>b.onclick=()=>{
   if(+b.dataset.n===order[step]){b.classList.add("synced");b.querySelector("i").textContent="SYNC";b.disabled=true;step++;if(step===4)miniSuccess(i,"PIXERA SYNC OK")}
   else miniMistake("DISPLAY FUORI SEQUENZA");
  });
 }

 else if(type==="SWITCH"){
  const good=[2,5,7],ports=[1,2,3,4,5,6,7,8];
  body.innerHTML=miniHeader(t,"SWITCH // PORT STATUS","Riattiva esclusivamente le porte indicate come LINK DOWN.")+
  `<div class="miniGame switchGame">${ports.map(n=>`<button class="switchPort ${good.includes(n)?"down":"up"}" data-n="${n}" data-ok="${good.includes(n)?1:0}">P${n}<i>${good.includes(n)?"DOWN":"UP"}</i></button>`).join("")}</div><div id="miniError"></div>`;
  let fixed=0;
  document.querySelectorAll(".switchPort").forEach(b=>b.onclick=()=>{
   if(b.dataset.ok==="1"){b.classList.remove("down");b.classList.add("fixed");b.disabled=true;fixed++;if(fixed===good.length)miniSuccess(i,"SWITCH RESTORED")}
   else miniMistake("PORTA GIÀ ATTIVA");
  });
 }
 else if(type==="RAID"){
  const bad=Math.floor(Math.random()*5);
  body.innerHTML=miniHeader(t,"STORAGE // RAID DEGRADED","Identifica il disco degradato dai LED e avvia la sostituzione logica.")+
  `<div class="miniGame raidGame">${[0,1,2,3,4].map(n=>`<button class="raidDisk" data-ok="${n===bad?1:0}"><i class="${n===bad?"amber":"green"}"></i>DISK ${n+1}<small>${n===bad?"DEGRADED":"ONLINE"}</small></button>`).join("")}</div><div id="miniError"></div>`;
  document.querySelectorAll(".raidDisk").forEach(b=>b.onclick=()=>b.dataset.ok==="1"?miniSuccess(i,"RAID RECOVERY STARTED"):miniMistake("DISCO ONLINE"));
 }
 else if(type==="PSU"){
  body.innerHTML=miniHeader(t,"SERVER // REDUNDANT POWER","Una PSU è in fault. Isola solo l'alimentatore guasto.")+
  `<div class="miniGame psuGame"><button class="psu" data-ok="0">PSU A<i>ONLINE</i></button><button class="psu fault" data-ok="1">PSU B<i>FAULT</i></button></div><div id="miniError"></div>`;
  document.querySelectorAll(".psu").forEach(b=>b.onclick=()=>b.dataset.ok==="1"?miniSuccess(i,"PSU ISOLATED"):miniMistake("HAI ISOLATO LA PSU SANA"));
 }
 else { // RELINK / PROCESS
  if(type==="RELINK"){
   body.innerHTML=miniHeader(t,"MEDIA RELINK","Trova il collegamento mancante e ricollegalo.")+
   `<div class="miniGame relinkGame">
    <button class="fileRow">cover_final.psd <i>OK</i></button>
    <button id="missingFile" class="fileRow missing">render_07.tif <i>MISSING</i></button>
    <button class="fileRow">logo.ai <i>OK</i></button>
    <button id="relinkBtn" class="pixelAction" disabled>RELINK SELECTED</button>
   </div><div id="miniError"></div>`;
   $("#missingFile").onclick=()=>{$("#missingFile").classList.add("selected");$("#relinkBtn").disabled=false};
   $("#relinkBtn").onclick=()=>miniSuccess(i,"MEDIA RELINKED");
  } else {
   const processPool=["DesktopConnector.exe","Revit.exe","SyncAgent.exe","AdobeCC.exe","Teams.exe"];
   const visible=[...processPool].sort(()=>Math.random()-.5).slice(0,4+Math.floor(Math.random()*2));
   const badProcess=visible[Math.floor(Math.random()*visible.length)];
   body.innerHTML=miniHeader(t,"PROCESS CHECK","Termina solo il processo bloccato. Ogni processo sano chiuso conta come errore.")+
   `<div class="miniGame processGame">
    ${visible.map(x=>`<button class="processRow" data-ok="${x===badProcess?1:0}"><span>${x}</span><i>${x===badProcess?"NOT RESPONDING":"RUNNING"}</i></button>`).join("")}
   </div><div id="miniError"></div>`;
   document.querySelectorAll(".processRow").forEach(b=>b.onclick=()=>{
    if(b.dataset.ok==="1"){b.classList.add("fixed");b.disabled=true;miniSuccess(i,"PROCESSO RIPRISTINATO")}
    else{b.classList.add("wrong");miniMistake("PROCESSO SANO");setTimeout(()=>b.classList.remove("wrong"),350)}
   });
  }
 }
 setTimeout(randomizeMiniLayout,0);
}
function newTicket(force,opts={}){
 if(state?.phase!=="shift"||tickets.length>=difficultyConfig[difficulty].maxTickets)return;if(isLunch()&&!opts.anomaly)return;
 let level=force||levelForTime(),p;
 let valid=stations.filter(s=>walkable(s.x,s.y)||reachablePoints().some(p=>Math.hypot(p.x-s.x,p.y-s.y)<95));
 if(!valid.length)valid=reachablePoints();
 const weighted=[...valid,...valid.filter(s=>s.room==="CENTRALE"),...valid.filter(s=>s.room==="CENTRALE")];
 if(level==="CRITICAL")p=[...valid].sort((a,b)=>Math.hypot(player.x-b.x,player.y-b.y)-Math.hypot(player.x-a.x,player.y-a.y))[0];
 else p=weighted[Math.floor(Math.random()*weighted.length)];
 if(!p){console.warn("Ticket ignorato: nessuna postazione valida");return}
 let mins={LOW:110,MEDIUM:90,HIGH:70,CRITICAL:42}[level]*difficultyConfig[difficulty].timeMult;
 const useMini=true;
 tickets.push({id:crypto.randomUUID?crypto.randomUUID():Math.random()+"",level,p,due:Math.min(BOSS-.2,state.min+mins),q:null,taskType:taskTypeForStation(p),criticalFrom:level==="CRITICAL"?bosses[Math.floor(Math.random()*bosses.length)]:null,source:opts.source||"USER",expired:false});
 state.stress+=({LOW:1,MEDIUM:2,HIGH:4,CRITICAL:7}[level]||1)*difficultyConfig[difficulty].stressMult;renderTickets();
}
function renderTickets(){
 const tc=$("#ticketCount");if(tc)tc.textContent=tickets.length;

 $("#ticketText").innerHTML=tickets.length?tickets.map(t=>`<div class="ticket ${t.level.toLowerCase()}"><b>${t.level}${t.source==="IT MANAGER"?" // MANAGER":t.criticalFrom?" // "+t.criticalFrom:""}</b><br>${safeRoom(t.p,"SEGNALAZIONE")} — ${(t.p&&(t.p.id||t.p.kind||t.p.type))||"POSTAZIONE"}<br>${t.taskType?`<br><span class="taskKind">MINIGAME // ${t.taskType}</span>`:`<br><span class="taskKind">DIAGNOSI</span>`}<br>deadline ${fmt(t.due)}</div>`).join(""):"Nessun ticket aperto.";
}

const STUDIO_ENTRANCE={x:650,y:930,w:110,h:70};

function nearStudioEntrance(){
 return Math.hypot(player.x-(STUDIO_ENTRANCE.x+STUDIO_ENTRANCE.w/2),
                   player.y-(STUDIO_ENTRANCE.y+STUDIO_ENTRANCE.h/2))<82;
}

function v12cRingDoorbell(){
 if(v12cDoorbellRung)return true;
 v12cDoorbellRung=true;
 storyDialog("ZIA ALE","Arrivo! Ti apro subito.",()=>{
   v12cDoorOpened=true;
   entranceOpened=true;
   toast("PORTA APERTA");
 });
 return true;
}
function tryStudioEntrance(){
 if(!introFreeWalk||enteredStudio||!nearStudioEntrance())return false;

 // V12 CLEAN: first E rings bell. After Ale opens, second E enters using
 // the ORIGINAL V10.2 interaction pathway (no new keyboard listeners).
 if(!v12cDoorOpened){
   return v12cRingDoorbell();
 }

 entranceOpened=true;
 enteredStudio=true;
 introFreeWalk=false;
 introStage="entranceGreeting";

 const m=npcs.find(n=>n.id==="manager");
 if(m){
   m.state="managerWatch";m.route=null;m.routeIndex=0;m.stuckFor=0;
   m.exclaimUntil=performance.now()+2200;
 }

 storyDialog("ZIA ALE","Buongiorno! Guarda il manager: sta per partire. Devi arrivare in IT e accendere la tua postazione prima di lui.",()=>{
   introStage="managerTrigger";
   introMissionArmed=true;
 });
 return true;
}



function bettyStressBand(){
 if(!state)return 0;
 if(state.stress>=80)return 3;
 if(state.stress>=60)return 2;
 if(state.stress>=42)return 1;
 return 0;
}
function updateBettySupport(dt){
 if(!state||introStage!=="done")return;
 bettySupportCooldown=Math.max(0,bettySupportCooldown-dt);
 const band=bettyStressBand();
 const betty=npcs.find(n=>n.id==="hr");

 if(band>0&&band>bettyLastStressBand&&!bettyPinged&&bettySupportCooldown<=0&&betty){
   bettyPinged=true;bettyLastStressBand=band;
   createPendingOffer(betty);
 }
 if(band===0){bettyLastStressBand=0;bettyPinged=false}
}
function bettySupport(){
 const hr=npcs.find(n=>n.id==="hr");
 if(!hr||Math.hypot(player.x-hr.x,player.y-hr.y)>76)return false;
 const band=bettyStressBand();
 const rel=ensureRelation(hr);

 if(bettySupportCooldown>0){
   storyDialog("BETTY","Respira e vai per priorità. Una cosa alla volta.");
   return true;
 }

 const tips=[
  "Se tutti dicono urgente, chiedi chi è davvero bloccato.",
  "Prima chiudi quello che blocca più persone, poi il resto.",
  "Se una richiesta non è chiara, falla spiegare prima di correre.",
  "Non devi risolvere tre problemi insieme: ordinali."
 ];
 const tip=tips[Math.floor(Math.random()*tips.length)];

 if(band>=3){
   state.stress=Math.max(0,state.stress-24);
   state.rep=Math.min(5,state.rep+1);
   state.xp+=80;
   bettySupportCooldown=120;
   bettyPinged=false;
   changeRelation(hr,4);
   storyDialog("BETTY",`${tip} Ti copro io cinque minuti. // STRESS -24 · +80 XP`);
 }else if(band>=2){
   state.stress=Math.max(0,state.stress-16);
   state.xp+=45;
   bettySupportCooldown=95;
   bettyPinged=false;
   changeRelation(hr,3);
   storyDialog("BETTY",`${tip} // STRESS -16 · +45 XP`);
 }else if(band>=1){
   state.stress=Math.max(0,state.stress-9);
   bettySupportCooldown=75;
   bettyPinged=false;
   changeRelation(hr,2);
   storyDialog("BETTY",`${tip} // STRESS -9`);
 }else{
   changeRelation(hr,1);
   storyDialog("BETTY",tip);
 }
 clamp();hud();
 return true;
}

function hrAdvice(){return bettySupport();}


/* ============================================================
   V12 CLEAN.4.5 — INTERACTION SPLIT
   E = interact
   F = pick up
   G = deliver/place
   ============================================================ */
function v12c45IsBlockingUI(){
 const modal=document.getElementById("modal");
 const end=document.getElementById("endGameOverlay");
 const modalVisible=!!(modal && !modal.classList.contains("hidden") && modal.offsetParent!==null);
 const endVisible=!!(end && !end.classList.contains("hidden") && end.offsetParent!==null);
 return !!(activeMiniGame || modalVisible || endVisible);
}

function v107PackageDestinationText(){
 return "SERVER / MAGAZZINO IT — area deposito vicino ai rack";
}

function v12c45Pickup(){
 if(state?.phase!=="shift"||v12c45IsBlockingUI())return false;

 if(carryMission?.stage==="pickup"){
   const t=carryTarget();
   if(t&&Math.hypot(player.x-t.x,player.y-t.y)<85){
     if(inventory.length>=3){toast("INVENTARIO PIENO");return true}
     inventory.push(carryMission.item);carryMission.stage="deliver";updateInventoryUI();
     const dest=carryMission.recipient?carryMission.recipient.name:safeRoom(carryMission.to,"POSTAZIONE");
     phoneMessage("IT TASK",`${carryMission.item} preso. Consegnalo a ${dest}.`);
     return true;
   }
 }

 if(studioEvent?.type==="AMAZON"){
   const p=studioEvent.packages.find(p=>p.owner==="PLAYER"&&!p.done&&!p.taken&&Math.hypot(player.x-p.x,player.y-p.y)<85);
   if(p){
     if(inventory.length>=3){toast("INVENTARIO PIENO");return true}
     p.taken=true;inventory.push(p.label);updateInventoryUI();
     showStudioEventHud("CONSEGNA AMAZON",`Porta ${p.label} in ${v107PackageDestinationText()}`);
     return true;
   }
 }

 if(studioEvent&&!studioEvent.carried&&!studioEvent.completed&&!studioEvent.failed){
   const p=studioEvent.pickup||studioEvent.from;
   if(p&&Math.hypot(player.x-p.x,player.y-p.y)<85){
     if(inventory.length>=3){toast("INVENTARIO PIENO");return true}
     studioEvent.carried=true;studioEvent.stage="deliver";
     const item=studioEvent.item||"OGGETTO";
     if(!inventory.includes(item))inventory.push(item);
     if(studioEvent.type==="MEETING_RUSH")v12c42MeetingState="DELIVER";
     if(studioEvent.type==="DESK_SETUP")showStudioEventHud("CAMBIO POSTAZIONE",`G: INSTALLA PC → ${studioEvent.recipient?.name||"DESTINAZIONE"} // ${studioEvent.to?.room||"POSTAZIONE"}`);
     updateInventoryUI();toast(`PRESO // ${item}`);return true;
   }
 }

 const supplies=[
   {name:"CUFFIE",x:395,y:215},{name:"HDMI",x:450,y:215},
   {name:"ALIMENTATORE",x:505,y:215},{name:"RICAMBI",x:715,y:215}
 ];
 const s=supplies.find(o=>Math.hypot(player.x-o.x,player.y-o.y)<70);
 if(s){
   if(inventory.length>=3){toast("INVENTARIO PIENO");return true}
   if(!inventory.includes(s.name))inventory.push(s.name);
   updateInventoryUI();toast(`PRESO // ${s.name}`);return true;
 }
 toast("Niente da prendere qui.");return false;
}

function v12c45Deliver(){
 if(state?.phase!=="shift"||v12c45IsBlockingUI())return false;

 if(carryMission?.stage==="deliver"){
   const t=carryTarget();
   if(t&&Math.hypot(player.x-t.x,player.y-t.y)<90){
     const ix=inventory.indexOf(carryMission.item);
     if(ix<0){toast("NON HAI L'OGGETTO RICHIESTO");return true}
     inventory.splice(ix,1);
     const recipient=carryMission.recipient?.name||safeRoom(carryMission.to,"POSTAZIONE");
     state.xp+=180;state.solved++;state.stress=Math.max(0,state.stress-3);
     toast(`CONSEGNATO // ${carryMission.item} → ${recipient} // +180 XP`);
     carryMission=null;updateInventoryUI();updateTaskProgress();return true;
   }
 }

 if(studioEvent?.type==="AMAZON"&&Math.hypot(player.x-650,player.y-210)<105){
   const p=studioEvent.packages.find(p=>p.owner==="PLAYER"&&p.taken&&!p.done&&inventory.includes(p.label));
   if(p){
     inventory.splice(inventory.indexOf(p.label),1);p.done=true;updateInventoryUI();
     const done=studioEvent.packages.filter(x=>x.owner==="PLAYER"&&x.done).length;
     showStudioEventHud("CONSEGNA AMAZON",`${done}/2 pacchi IT depositati`);
     if(done>=2){
       state.xp+=240;state.solved++;
       showRewardResult("EVENTO COMPLETATO",["PACCHI IT DEPOSITATI","XP +240"],"success");
       studioEvent=null;hideStudioEventHud();updateTaskProgress();
     }
     return true;
   }
 }

 if(studioEvent?.carried&&!studioEvent.completed){
   const t=studioEvent.to;
   if(t&&Math.hypot(player.x-t.x,player.y-t.y)<95){
     const item=studioEvent.item||"OGGETTO";
     const ix=inventory.indexOf(item);if(ix>=0)inventory.splice(ix,1);
     const type=studioEvent.type;studioEvent.completed=true;
     if(type==="MEETING_RUSH")v12c42MeetingState="COMPLETED";
     const xp=type==="MEETING_RUSH"?220:200;
     state.xp+=xp;state.solved++;updateInventoryUI();
     toast(`CONSEGNATO // ${item} // XP +${xp}`);
     studioEvent=null;hideStudioEventHud();updateTaskProgress();return true;
   }
 }
 toast("Niente da consegnare qui.");return false;
}


function v12c45RepairPcTask(){
 if(state?.phase!=="shift")return false;
 if(Math.hypot(player.x-V102_LAB_BENCH.x,player.y-V102_LAB_BENCH.y)>70)return false;
 if(!inventory.includes("RICAMBI")){
   toast("SERVONO RICAMBI // PRENDILI DAL MAGAZZINO");
   return true;
 }
 inventory=inventory.filter(x=>x!=="RICAMBI");
 state.xp+=160;state.solved++;
 toast("PC RIPARATO AL BANCO LAB // XP +160");
 hud();updateTaskProgress();
 return true;
}


function v113ManualCapoInteract(){
 if(!mokasa||state?.phase!=="shift")return false;
 if(Math.hypot(player.x-mokasa.x,player.y-mokasa.y)>65)return false;
 if(typeof v109EndShiftReady!=="undefined"&&v109EndShiftReady){
   v109EndShiftReady=false;startBoss();return true;
 }
 sideMessage("CAPO","Ci vediamo a fine turno.");
 return true;
}

function interact(){
 if(storyOpen){closeStory();return true;}

 const _modal114=document.getElementById("modal");
 if(_modal114&&!_modal114.classList.contains("hidden")&&!activeMiniGame){
   _modal114.classList.add("hidden");
   storyOpen=false;uiMessageBusy=false;
   if(typeof v11MissionBriefOpen!=="undefined")v11MissionBriefOpen=false;
   return true;
 }

 if(v113ManualCapoInteract())return true;
 if(!v110FirstMissionResolved&&typeof IT_PC!=="undefined"&&v118ValidPoint(IT_PC)&&Math.hypot(player.x-IT_PC.x,player.y-IT_PC.y)<78){
   if(bootWorkstation())return true;
 }

 if(managerRaceDone&&storyOpen&&!v12c452UiActuallyBlocking())storyOpen=false;

 if(v12c45RepairPcTask())return true;
 if(storyOpen){closeStory();return}
 if(state?.phase!=="shift")return;

 // Porta: disponibile soltanto dopo TELEFONO -> beginEntranceWalk().
 if(tryStudioEntrance())return;

 /* 1.0.9: Betty is handled through npcTalk / pending offer */

 if(bootWorkstation())return;
 let i=tickets.findIndex(t=>Math.hypot(player.x-t.p.x,player.y-t.p.y)<75);
 if(i<0){
 const near=nearestNPC();
 if(near&&near.d<65){npcTalk(near.n);return}
 toast("Nessuna task o NPC in questo punto.");return
}
 let t=tickets[i];
 if(!t.taskType)t.taskType=taskTypeForStation(t.p);
 startMiniGame(i);return;
}
function answer(i,n){
 let t=tickets[i],ok=n===t.q[2],xp={LOW:100,MEDIUM:250,HIGH:500,CRITICAL:750}[t.level];
 tickets.splice(i,1);$("#modal").classList.add("hidden");
 if(ok){state.xp+=xp;state.solved++;state.incident-=({LOW:2,MEDIUM:4,HIGH:7,CRITICAL:8}[t.level]);state.stress-=4;toast(`${t.level} RISOLTO +${xp} XP`)}
 else{state.strikes++;state.stress+=({LOW:7,MEDIUM:12,HIGH:18,CRITICAL:20}[t.level])*difficultyConfig[difficulty].stressMult;state.incident+=({LOW:5,MEDIUM:9,HIGH:15,CRITICAL:18}[t.level])*difficultyConfig[difficulty].incidentMult;state.rep-=t.level==="CRITICAL"?2:1;toast("RISPOSTA ERRATA // STRIKE +1")}
 clamp();renderTickets();updateTaskProgress();checkEarlyEnd();
}
function expireTickets(){
 for(const t of tickets){
   if(!t.expired && state.min>=t.due){
     t.expired=true;
     const easyLow=(difficulty==="easy" && t.level==="LOW");

     if(!easyLow) state.strikes++;

     const incidentBase = t.level==="CRITICAL"
       ? 18
       : ({LOW:4,MEDIUM:9,HIGH:14}[t.level] ?? 6);

     state.incident += incidentBase * difficultyConfig[difficulty].incidentMult;
     state.stress += 6 * difficultyConfig[difficulty].stressMult;

     if(t.level==="CRITICAL") state.rep -= 1;

     showStrike(easyLow ? "LOW SCADUTO — NESSUNO STRIKE" : t.level);
   }
 }
 checkEarlyEnd();
}
function showEndGame(){
 const ov=$("#endGameOverlay");if(!ov)return;
 $("#endGameStats").innerHTML=`<div><b>TICKET RISOLTI</b><span>${state.solved}</span></div><div><b>ERRORI</b><span>${state.strikes}/${state.maxStrikes}</span></div><div><b>XP</b><span>${state.xp}</span></div><div><b>STRESS FINALE</b><span>${Math.round(state.stress)}%</span></div><div><b>REPUTAZIONE</b><span>${state.rep}</span></div><div><b>INCIDENT</b><span>${Math.round(state.incident)}%</span></div>`;
 ov.classList.remove("hidden");state.phase="ended";
}
function restartRun(toHome=false){
 $("#endGameOverlay")?.classList.add("hidden");
 reset();
 if(toHome){document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));$("#boot")?.classList.add("active");}
}
document.addEventListener("click",e=>{if(e.target?.id==="retryRun")restartRun(false);if(e.target?.id==="newDay")restartRun(true);});
window.addEventListener("keydown",e=>{
 if($("#endGameOverlay")?.classList.contains("hidden"))return;
 if(e.key==="Enter"||e.key==="e"||e.key==="E"){e.preventDefault();restartRun(false)}
 if(e.key==="n"||e.key==="N"){e.preventDefault();restartRun(true)}
});

function checkEarlyEnd(){clamp();if(state.strikes>=state.maxStrikes)return ending("IMPOSTORE","Troppi interventi errati. Le tue credenziali IT vengono revocate.");if(state.rep<=0)return ending("LICENZIATO","La reputazione è crollata. ACCESS REVOKED.");if(state.incident>=100)return ending("MAJOR INCIDENT","L'infrastruttura dello studio è offline.");if(state.stress>=98&&v12c41BurnoutReady(dt))return ending("BURNOUT","Non riesci più a gestire il turno.")}
function showAnomaly(text,duration=2600){
 const o=$("#anomalyOverlay"),t=$("#anomalyText");
 t.textContent=text;
 o.classList.remove("hidden");
 clearTimeout(o._timer);
 o._timer=setTimeout(()=>o.classList.add("hidden"),duration);
}

function spawnAnomalyTicket(preferredRoom){
 if(tickets.length>=difficultyConfig[difficulty].maxTickets)return;
 let pool=stations.filter(s=>["SERVER","RIFUGIO DIGITALE","SALA MEET","STAMPANTI"].includes(s.room));
 if(preferredRoom)pool=pool.filter(s=>s.room===preferredRoom);
 if(!pool.length)return;
 const p=pool[Math.floor(Math.random()*pool.length)];
 const level=state.min>=LATE_START?"HIGH":"MEDIUM";
 const type=p.room==="SERVER"?["SWITCH","RAID","PSU","SERVICES"][Math.floor(Math.random()*4)]:
            p.room==="RIFUGIO DIGITALE"?"PIXERA":
            p.room==="SALA MEET"?"AV":"TONER";
 const mins={MEDIUM:100,HIGH:75}[level]*difficultyConfig[difficulty].timeMult;
 tickets.push({id:crypto.randomUUID?crypto.randomUUID():Math.random()+"",level,p,due:Math.min(BOSS-.2,state.min+mins),q:null,taskType:type,source:"IT MANAGER",expired:false});
 renderTickets();refreshPDA();
}
function anomalyEvent(){
 const phase=dayPhase(),a=anomalyLevel(),now=performance.now();
 let kinds;
 if(phase==="MORNING")kinds=["MONITOR","LIGHT","PRINTER"];
 else if(phase==="LUNCH")kinds=["MONITOR1905","PIXERA","SERVER_LED","BATHROOM","SHADOW"];
 else if(phase==="AFTERNOON")kinds=["PIXERA","MONITOR1905","LIGHT","SERVER_LED","BATHROOM"];
 else kinds=["PIXERA_ALL","RGB","MONITOR1905","SHADOW","BLACKOUT","SERVER_LED"];
 const kind=kinds[Math.floor(Math.random()*kinds.length)];
 visualAnomaly={kind,until:now+(kind==="BLACKOUT"?1700:3000),seed:Math.random()};
 if(phase==="LUNCH"&&Math.random()<.48)spawnAnomalyTicket(Math.random()<.55?"SERVER":null);
 else if(phase==="ESCALATION"&&Math.random()<.30)spawnAnomalyTicket();
 if(kind==="PRINTER")toast("STAMPANTE // JOB SENZA UTENTE");
 if(kind==="BATHROOM"&&phase!=="MORNING")phoneMessage("NUMERO SCONOSCIUTO","...");
 if(kind==="SERVER_LED")phoneMessage("SYSTEM","SERVER // attività non richiesta rilevata");
 if(phase==="ESCALATION"&&Math.random()<.12){showAnomaly("UNKNOWN SESSION // USER 00",1500);state.anomalyPenalty++}
 if(a>.55&&Math.random()<.12)state.stress+=2*difficultyConfig[difficulty].stressMult;
}function maybeCritical(){if(state.min>600&&Math.random()<difficultyConfig[difficulty].criticalChance)newTicket("CRITICAL")}

let v109EndShiftReady=false;
const V109_BOSS_DOOR={x:1325,y:545};

function v109ArmEndShift(){
 if(v109EndShiftReady)return;
 v109EndShiftReady=true;
 state.min=BOSS;
 phoneMessage("IT MANAGER","Fine turno. Il Capo ti aspetta in SALA MEET CAPO.");
 showMissionBanner("FINE TURNO","Vai fisicamente in Sala Meet Capo e premi E sul Capo.","18:43 // DIREZIONE","FINALE");
 hud();
}
function v109TryStartFinale(){return false;}

function startBoss(){
 state.phase="boss";state.min=BOSS;tickets=[];renderTickets();state.bossPhase=1;bossModal();
}
function bossModal(){
 const phases=[
  ["18:52 // SALA MEET CAPO","HDMI EXTENDER","Ripristina la catena video prima della presentazione."],
  ["18:55 // SALA MEET CAPO","AUDIO CHECK","Seleziona l'uscita sala corretta."],
  ["18:58 // IT MANAGER","TEST END-TO-END","Conferma video, audio e rete."]
 ];
 const q=phases[state.bossPhase-1];
 $("#modalBody").innerHTML=`<div class="pixelTaskHead"><span>${q[0]}</span><h2>${q[1]}</h2><p>${q[2]}</p></div>
 <div class="miniGame bossGame">
  <button class="pixelAction bossStep" data-ok="0">${state.bossPhase===1?"RX → TX":state.bossPhase===2?"SPEAKER LAPTOP":"MODIFICA CONFIG"}</button>
  <button class="pixelAction bossStep" data-ok="1">${state.bossPhase===1?"TX → CAT6 → RX":state.bossPhase===2?"SPEAKER SALA":"TEST VIDEO + AUDIO + RETE"}</button>
  <button class="pixelAction bossStep" data-ok="0">${state.bossPhase===1?"USB → RX":state.bossPhase===2?"MUTE":"RIAVVIA TUTTO"}</button>
 </div><div id="miniError"></div>`;
 $("#modal").classList.remove("hidden");
 document.querySelectorAll(".bossStep").forEach(b=>b.onclick=()=>bossAnswer(+b.dataset.ok));
}
function bossAnswer(ok){
 if(!ok){state.incident+=8;state.stress+=5;miniMistake("INTERVENTO NON CORRETTO");clamp();hud();return}
 state.xp+=500;
 if(state.bossPhase<3){state.bossPhase++;bossModal()}else ending("WIN","GIORNATA COMPLETATA",true);
}
function ending(type,text,win=false){
 state.phase="ended";state.min=END;clamp();
 if(win){
  $("#modalBody").innerHTML=`<div id="winPanel"><h2 class="low">GIORNATA COMPLETATA</h2><p>19:00 // PUOI ANDARE</p><p>XP <b>${state.xp}</b> · ERRORI <b>${state.strikes}/${state.maxStrikes}</b> · TICKET <b>${state.solved}</b> · INCIDENT <b>${Math.round(state.incident)}%</b></p></div>`;$("#modal").classList.remove("hidden");
  setTimeout(()=>{$("#modalBody").innerHTML=`<div class="arc-cmd"><pre>19:02\n\nMESSAGGIO // CAPO\n\n"Già che ci sei..."\n\n_</pre><button class="choice" onclick="location.reload()">TORNA AL MENU</button></div>`},4300);
 }else{$("#modalBody").innerHTML=`<h2 class="critical">${type}</h2><p>${text}</p><button class="choice" onclick="location.reload()">NUOVA PARTITA</button>`;$("#modal").classList.remove("hidden")}
}
function clamp(){state.incident=Math.max(0,Math.min(100,state.incident));state.stress=Math.max(0,Math.min(100,state.stress));state.rep=Math.max(0,Math.min(5,state.rep))}
$("#x").onclick=()=>{if(state&&state?.phase!=="shift"){toast("Questo evento non può essere ignorato.");return}$("#modal").classList.add("hidden")};
function hud(){clamp();$("#clock").textContent=fmt(state.min);$("#stress").textContent=Math.round(state.stress)+"%";$("#rep").textContent="★".repeat(state.rep)+"☆".repeat(5-state.rep);$("#strikes").textContent=state.strikes+"/"+state.maxStrikes;$("#xp").textContent=state.xp;$("#incident").textContent=Math.round(state.incident)+"%"}


function monitorEntranceIntro(){
 const candidates=["#storyBox","#gbDialog","#dialogBox",".storyBox"];
 let text="";
 for(const sel of candidates){
   const el=document.querySelector(sel);
   if(el&&!el.classList.contains("hidden"))text+=(el.textContent||"");
 }
 if(text.includes("A dopo. Entro in studio") && !introFreeWalk){
   // Do not auto close immediately: wait for the user's next E/ENTER.
   window.__entranceDialogReady=true;
 }
}

function updateWorkloadStress(dt){
 if(!v12c42CanGenerateWork())return;
 if(!state||!shiftStarted||state.phase!=="shift")return;
 const open=tickets.length;
 const critical=tickets.filter(t=>t.level==="CRITICAL").length;
 const high=tickets.filter(t=>t.level==="HIGH").length;
 const deadline=tickets.filter(t=>t.due-state.min<18).length;
 let pressure=0;
 if(open>=4)pressure+=(open-3)*0.10;
 if(open>=6)pressure+=(open-5)*0.08;
 pressure+=high*0.10+critical*0.24+deadline*0.08+(state.incident/100)*0.04;
 const mult={easy:0.42,normal:0.60,hard:0.82,nightmare:1.05}[difficulty]||0.60;
 if(pressure>0)state.stress+=pressure*dt*mult; else state.stress=Math.max(0,state.stress-0.05*dt);
 if(isLunch())state.stress=Math.max(0,state.stress-(open<=3?0.18:0.10)*dt);
 if(state.stress<45&&open<=3)state.stress=Math.max(0,state.stress-0.035*dt);
 clamp();
}

/* V12 CLEAN.4.1 — meeting/burnout balance guard */
let v12c41StressFrameStart=0;
function v12c41BeginStressFrame(){
 if(state)v12c41StressFrameStart=Number(state.stress)||0;
}
function v12c41CapStressSpike(maxGain=1.35){
 if(!state)return;
 const ceiling=v12c41StressFrameStart+maxGain;
 if(state.stress>ceiling)state.stress=ceiling;
 state.stress=Math.max(0,Math.min(100,state.stress));
}
function v12c41MeetingStress(minutesToMeeting,missed=false){
 // Advance warning is information, not punishment.
 if(minutesToMeeting>0)return 0;
 // Once it has started, pressure ramps gently.
 if(!missed)return 0.35;
 // Missing it matters, but never causes instant burnout.
 return 6;
}


let v12c41BurnoutHighFor=0;
function v12c41BurnoutReady(dt){
 if(!state)return false;
 if(state.stress>=98)v12c41BurnoutHighFor+=dt;
 else v12c41BurnoutHighFor=Math.max(0,v12c41BurnoutHighFor-dt*2);
 return v12c41BurnoutHighFor>=8;
}


/* V12 CLEAN.4.2 — shift is dormant until the player is physically inside */
function v12c42OperationalShift(){
  return !!(enteredStudio && shiftStarted && state?.phase==="shift");
}
function v12c42CanGenerateWork(){
  return v12c42OperationalShift() && !storyOpen;
}




/* V12 CLEAN.4.4 — PAO hard exit corridor */
const V12C44_PAO_EXIT=[
 {x:165,y:650,room:"BIM"},
 {x:205,y:650,room:"BIM"},
 {x:245,y:425,room:"CORRIDOIO"},
 {x:285,y:425,room:"CORRIDOIO"}
];
function v12c44IsPao(n){
 return !!n && (n.name==="PAO" || n.id==="pao");
}
function v12c44PaoExitReserved(x,y,n){
 if(v12c44IsPao(n))return false;
 return V12C44_PAO_EXIT.some(p=>Math.hypot(x-p.x,y-p.y)<30);
}
function v12c44PaoExitRoute(n,target){
 const release=[
  {x:195,y:625,room:"BIM"},
  {x:235,y:625,room:"BIM"},
  {x:273,y:625,room:"CORRIDOIO"}
 ];
 const route=[];let from={x:n.x,y:n.y,room:"BIM"};
 for(const p of release){const seg=findNpcPath(from,p);if(seg?.length)route.push(...seg);from=p}
 if(target){const seg=findNpcPath(from,target);if(seg?.length)route.push(...seg)}
 return route;
}

/* AUDIT removed obsolete v12c43PaoExitRoute */



function v12c44ManagedWorker(n){
 return !!n && v12c43AllWorkers().includes(n);
}

function v12c43UpdateWorkers(dt){
 if(v111PhysicalMissionBusy())return;
 if(!v12c42CanGenerateWork()||isLunch())return;

 for(const n of v12c43AllWorkers()){
   if(n.id==="pao"||n.id==="don")continue;
   if(n.id==="pao"||n.id==="don")continue;
   v12c43EnsureDesk(n);
   if(typeof n.workBias!=="number" || n.workBias<0.85)n.workBias=0.78+Math.random()*0.10;

   if(n.state==="returnDesk"){
     if(moveNpcRoute(n,dt)){
       n.state="work";
       n.x=n.deskX;n.y=n.deskY;
       n.workTimer=55+Math.random()*105;
       n.activityCooldown=50+Math.random()*100;
       n.route=null;n.routeIndex=0;
     }
     continue;
   }

   if(n.state==="work"){
     n.workTimer-=dt;
     n.activityCooldown-=dt;

     if(n.workTimer<=0){
       n.workTimer=60+Math.random()*110;

       if(n.activityCooldown<=0 && !n.activityTicket && Math.random()>(n.workBias||0.88)){
         n.activityCooldown=80+Math.random()*160;
         const r=Math.random();
         n.activity=r<.28?"coffee":r<.48?"printer":r<.66?"bathroom":r<.80?"meeting":"wander";
         const target=activityDestination(n,n.activity);

         if(v118ValidPoint(target)){
           n.target=target;
           n.routeGoal=target;
           if(v12c44IsPao(n)&&n.homeRoom==="BIM"&&target.room!=="BIM"){
             n.route=v12c44PaoExitRoute(n,target);
           }else{
             n.route=findNpcPath({x:n.x,y:n.y},target);
           }
           n.routeIndex=0;
           n.state="activityTravel";
         }
       }
     }
     continue;
   }

   // Legacy activity states can run to completion, then always return to desk.
   if(["idle","wander","coffee","printer","bathroom","meeting"].includes(n.state) && !n.activityTicket){
     v12c43RouteToDesk(n);
   }
 }
}


let v12c45LastSafePlayer={x:0,y:0};
function v12c45InitPlayerSafe(){
 v12c45LastSafePlayer={x:player.x,y:player.y};
}
function v12c45PlayerAntiStuck(){
 if(walkable(player.x,player.y)){
   v12c45LastSafePlayer={x:player.x,y:player.y};
   return;
 }
 player.x=v12c45LastSafePlayer.x;
 player.y=v12c45LastSafePlayer.y;
}


/* V12 CLEAN.4.6 — canonical gameplay unlock */
function v12c452UiActuallyBlocking(){
 const modal=document.getElementById("modal");
 const end=document.getElementById("endGameOverlay");
 const mission=document.getElementById("missionBanner");
 const modalVisible=!!(modal && !modal.classList.contains("hidden") && modal.offsetParent!==null);
 const endVisible=!!(end && !end.classList.contains("hidden") && end.offsetParent!==null);
 const missionVisible=!!(mission && !mission.classList.contains("hidden") && mission.offsetParent!==null);
 return modalVisible||endVisible||missionVisible||activeMiniGame||storyOpen;
}
function v12c452ReleaseGameplayLocks(){
 if(!state||state.phase!=="shift")return;
 storyOpen=false;
 uiMessageBusy=false;
 if(typeof v11MissionBriefOpen!=="undefined")v11MissionBriefOpen=false;
 if(typeof v11RaceArmed!=="undefined")v11RaceArmed=false;
 if(typeof introMissionArmed!=="undefined")introMissionArmed=false;

 const modal=document.getElementById("modal");
 if(modal && !activeMiniGame)modal.classList.add("hidden");

 const mission=document.getElementById("missionBanner");
 if(mission)mission.classList.add("hidden");

 document.body?.classList?.remove("modal-open","locked","paused");
}
function v12c452FinishManagerRace(){
 managerRaceDone=true;
 introStage="done";
 v12c452ReleaseGameplayLocks();

 const m=npcs.find(n=>n.id==="manager");
 if(m){
   m.state="managerRoutine";
   m.route=null;
   m.routeIndex=0;
   m.activity=null;
   m.exclaimUntil=0;
   m._lastOptionalTalk=performance.now();
 }
}
let v12c452SoftLockFor=0;
function v12c452GameplayWatchdog(dt){
 if(!state||state.phase!=="shift")return;
 if(!enteredStudio)return;

 const physicallyBlocking=v12c452UiActuallyBlocking();
 const suspicious=(introStage==="done"||managerRaceDone) && !physicallyBlocking;

 if(suspicious){
   v12c452SoftLockFor+=dt;
   if(v12c452SoftLockFor>1.25){
     v12c452ReleaseGameplayLocks();
     v12c452SoftLockFor=0;
   }
 }else{
   v12c452SoftLockFor=0;
 }
}


function v1PaoAntiStuck(dt){
 const p=[...ambientNPCs,...npcs].find(n=>n&&(n.id==="pao"||n.name==="PAO"));
 if(!p||!p.route?.length)return;
 p._v1Watch=(p._v1Watch??0)+dt;
 if(p._v1Watch<1)return;
 p._v1Watch=0;
 if(p.routeIndex>=p.route.length){p.route=null;p.routeIndex=0;if(p.state==="specialReturn")p.state="work"}
}


/* VERSIONE1ITSHIFT 1.0.2 — ticket lifetime normalization */
function v102NormalizeTicketLifetime(){
 if(!Array.isArray(tickets)||!state)return;
 for(const t of tickets){
   if(t._v102LifetimeNormalized)continue;
   const remaining=(typeof t.due==="number")?t.due-state.min:0;
   const minimum=t.level==="CRITICAL"?28:t.level==="HIGH"?35:t.level==="MEDIUM"?45:60;
   if(typeof t.due!=="number"||remaining<minimum)t.due=state.min+minimum;
   t._v102LifetimeNormalized=true;
 }
}


/* VERSIONE1ITSHIFT 1.0.2 — conservative soft-lock guard */
let v102LastSafePlayer=null;

function v102SoftLockGuard(){
 if(!state||state.phase!=="shift"||!player)return;

 if(Number.isFinite(player.x)&&Number.isFinite(player.y)&&walkable(player.x,player.y)){
   v102LastSafePlayer={x:player.x,y:player.y};
 }else if(v102LastSafePlayer){
   player.x=v102LastSafePlayer.x;
   player.y=v102LastSafePlayer.y;
 }

 const modal=document.getElementById("modal");
 const modalVisible=!!(modal&&!modal.classList.contains("hidden")&&modal.offsetParent!==null);

 // Clear stale narrative lock only when no real blocking UI exists.
 if(!modalVisible&&!activeMiniGame&&storyOpen&&managerRaceDone){
   storyOpen=false;
   uiMessageBusy=false;
   if(typeof v11MissionBriefOpen!=="undefined")v11MissionBriefOpen=false;
 }
}


/* VERSIONE1ITSHIFT 1.0.6 — SPECIAL NPC ROAMING */
const V106_SPECIAL_POINTS={
 pao:[
  {x:255,y:615,room:"CORRIDOIO"},
  {x:355,y:585,room:"CORRIDOIO"},
  {x:530,y:695,room:"CORRIDOIO"},
  {x:730,y:700,room:"CORRIDOIO"}
 ],
 don:[
  {x:760,y:700,room:"CORRIDOIO"},
  {x:1040,y:710,room:"CORRIDOIO"},
  {x:1180,y:700,room:"CORRIDOIO"},
  {x:690,y:600,room:"CORRIDOIO"}
 ]
};

function v106SpecialNpcById(id){
 return [...ambientNPCs,...npcs].find(n=>n&&(n.id===id||String(n.name||"").toLowerCase()===id));
}

function v106RouteNpc(n,target,stateName){
 if(!n||!target)return false;
 const r=findNpcPath({x:n.x,y:n.y,room:n.currentRoom||n.homeRoom},target);
 if(!r||!r.length)return false;
 n.route=r.slice(0,140);
 n.routeIndex=0;
 n.routeGoal={...target};
 n.state=stateName||"specialRoam";
 n.stuckFor=0;n.blockedFor=0;
 return true;
}

function v106SpecialRoamUpdate(dt){
 if(v111PhysicalMissionBusy())return;
 if(!state||state.phase!=="shift"||isLunch())return;
 const cfgs={
  pao:{home:{x:140,y:675,room:"BIM"},path:[{x:205,y:675,room:"BIM"},{x:245,y:675,room:"CORRIDOIO"},{x:330,y:680,room:"CORRIDOIO"},{x:450,y:700,room:"CORRIDOIO"},{x:570,y:700,room:"CORRIDOIO"}]},
  don:{home:{x:1045,y:880,room:"CUCINA"},path:[{x:1045,y:805,room:"CUCINA"},{x:1045,y:740,room:"CORRIDOIO"},{x:960,y:705,room:"CORRIDOIO"},{x:850,y:700,room:"CORRIDOIO"},{x:740,y:700,room:"CORRIDOIO"}]}
 };
 for(const id of ["pao","don"]){
   const n=v106SpecialNpcById(id),cfg=cfgs[id];if(!n)continue;
   n._spT=(n._spT??(8+Math.random()*8))-dt;
   if(n.state==="specialRoam"||n.state==="specialReturn"){
     if(moveNpcRoute(n,dt)){
       if(n.state==="specialRoam"){n.state="specialPause";n._spT=5+Math.random()*5}
       else{n.state="work";n.route=null;n.routeIndex=0;n.x=cfg.home.x;n.y=cfg.home.y;n._spT=10+Math.random()*12}
     }continue;
   }
   if(n.state==="specialPause"){
     if(n._spT<=0){
       n.route=[...cfg.path].reverse().map(p=>({...p}));n.route.push({...cfg.home});
       n.routeIndex=0;n.routeGoal={...cfg.home};n.state="specialReturn";
     }continue;
   }
   if(n._spT<=0){
     n.route=cfg.path.map(p=>({...p}));n.routeIndex=0;
     n.routeGoal={...cfg.path[cfg.path.length-1]};n.state="specialRoam";n.stuckFor=0;n.blockedFor=0;
   }
 }
}


function v106NpcSafetyPass(){
 const all=[...ambientNPCs,...npcs];
 for(const n of all){
   if(!n)continue;
   if(!Number.isFinite(n.x)||!Number.isFinite(n.y)){
     n.x=Number.isFinite(n.homeX)?n.homeX:400;
     n.y=Number.isFinite(n.homeY)?n.homeY:400;
     n.route=null;n.routeIndex=0;n.state="work";
   }
   if(Array.isArray(n.route)&&n.route.length>160)n.route=n.route.slice(0,160);
   if((n.routeIndex||0)>200){n.route=null;n.routeIndex=0;n.state="work"}
 }
}


function v107PersistentCarryHud(){
 if(!state||state.phase!=="shift")return;
 if(studioEvent?.type==="AMAZON"){
   const held=studioEvent.packages?.find(p=>p.owner==="PLAYER"&&p.taken&&!p.done&&inventory.includes(p.label));
   if(held){
     showStudioEventHud("CONSEGNA AMAZON",`${held.label} → ${v107PackageDestinationText()} // G = CONSEGNA`);
   }
 }
}


function v110RuntimeSafety(){
 if(!state||state.phase!=="shift")return;
 if(!Number.isFinite(state.min))state.min=540;
 if(!Number.isFinite(player.x)||!Number.isFinite(player.y)){player.x=420;player.y=810}
 for(const n of [...ambientNPCs,...npcs]){
   if(!n)continue;
   if(!Number.isFinite(n.x)||!Number.isFinite(n.y)){
     n.x=Number.isFinite(n.homeX)?n.homeX:400;n.y=Number.isFinite(n.homeY)?n.homeY:400;
     n.route=null;n.routeIndex=0;n.state="work";
   }
   if(Array.isArray(n.route)&&n.route.length>120)n.route=n.route.slice(0,120);
 }
}


function v112BossSafety(){
 if(!mokasa)return;
 mokasa.x=1435; mokasa.y=555;
 mokasa.homeX=1435; mokasa.homeY=555;
 mokasa.state="bossIdle";
 mokasa.hunter=false; mokasa.seeking=false;
 mokasa.route=null; mokasa.routeIndex=0;
 mokasa.stuckFor=0; mokasa.blockedFor=0;
}


function v113CapoProximitySafety(){
 if(!mokasa)return;
 mokasa.court=true;mokasa.seeking=false;
 mokasa.route=null;mokasa.routeIndex=0;
 mokasa.state="bossIdle";
 if(state?.phase==="shift" && !(typeof v109EndShiftReady!=="undefined"&&v109EndShiftReady)){
   if(typeof encounterLock!=="undefined")encounterLock=false;
 }
}


function v114LunchRecoveryWatch(){
 if(!state||state.phase!=="shift"||state.min<800||isLunch())return;
 const specials=[
   v106SpecialNpcById("pao"),
   v106SpecialNpcById("don"),
   npcs.find(n=>n.id==="hr"||n.name==="BETTY"),
   npcs.find(n=>n.id==="zia"||n.name==="ZIA ALE"),
   npcs.find(n=>n.id==="manager")
 ].filter(Boolean);

 let stuck=false;
 for(const n of specials){
   const inKitchen=n.x>=860&&n.x<=1180&&n.y>=700&&n.y<=930;
   if(inKitchen){
     n._v114KitchenStuck=(n._v114KitchenStuck||0)+1;
     if(n._v114KitchenStuck>90)stuck=true;
   }else{
     n._v114KitchenStuck=0;
   }
 }
 if(stuck)v114PostLunchReset();
}

let v114LastUiProgress=performance.now();
let v114LastStateMin=null;

function v114UiLockWatchdog(){
 if(!state||state.phase!=="shift")return;
 const now=performance.now();
 if(v114LastStateMin!==state.min){
   v114LastStateMin=state.min;
   v114LastUiProgress=now;
   return;
 }
 if(now-v114LastUiProgress>5000 && !activeMiniGame && !(typeof v109EndShiftReady!=="undefined"&&v109EndShiftReady)){
   storyOpen=false;
   uiMessageBusy=false;
   if(typeof encounterLock!=="undefined")encounterLock=false;
   if(typeof v11MissionBriefOpen!=="undefined")v11MissionBriefOpen=false;
   const modal=document.getElementById("modal");
   if(modal)modal.classList.add("hidden");
   const story=document.getElementById("storyDialog");
   if(story)story.classList.add("hidden");
   storyOpen=false;storyCallback=null;
   v114LastUiProgress=now;
 }
}

function v116AmazonStorySafety(){
 if(!storyOpen)return;
 const who=document.getElementById("storyWho")?.textContent||"";
 const text=document.getElementById("storyText")?.textContent||"";
 if(who==="ZIA ALE"&&text.includes("pacchi Amazon")){
   closeStory();
 }
}


/* VERSIONE1ITSHIFT 1.0.17 DIAG — runtime trace + recovery */
const V117_DIAG = {
 lastSystem:"boot",
 lastTickAt:performance.now(),
 lastClock:null,
 sameClockFor:0,
 recoveries:0,
 frameCount:0,
 log:[]
};

function v117Trace(system,extra=""){
 V117_DIAG.lastSystem=system;
 V117_DIAG.lastTickAt=performance.now();
 const line=`${state?.min??"?"}|${system}|${extra}`;
 V117_DIAG.log.push(line);
 if(V117_DIAG.log.length>80)V117_DIAG.log.shift();
 try{localStorage.setItem("itshift_diag",JSON.stringify(V117_DIAG.log))}catch(e){}
}

function v117Recover(reason){
 V117_DIAG.recoveries++;
 v117Trace("RECOVER",reason);

 // clear only stale/unsafe runtime locks
 if(typeof encounterLock!=="undefined")encounterLock=false;
 if(typeof uiMessageBusy!=="undefined")uiMessageBusy=false;
 if(typeof storyOpen!=="undefined")storyOpen=false;
 if(typeof v11MissionBriefOpen!=="undefined")v11MissionBriefOpen=false;

 const modal=document.getElementById("modal");
 if(modal && !activeMiniGame)modal.classList.add("hidden");
 const story=document.getElementById("storyDialog");
 if(story && !activeMiniGame)story.classList.add("hidden");

 // sanitize player
 if(!Number.isFinite(player.x)||!Number.isFinite(player.y)){
   player.x=420;player.y=810;
 }

 // sanitize NPCs and kill pathological routes
 const all=[...(ambientNPCs||[]),...(npcs||[])];
 for(const n of all){
   if(!n)continue;
   if(!Number.isFinite(n.x)||!Number.isFinite(n.y)){
     n.x=Number.isFinite(n.homeX)?n.homeX:400;
     n.y=Number.isFinite(n.homeY)?n.homeY:400;
   }
   if(Array.isArray(n.route)&&n.route.length>80)n.route=n.route.slice(0,80);
   if((n.routeIndex||0)>100){
     n.route=null;n.routeIndex=0;
   }
   n.stuckFor=0;n.blockedFor=0;
 }

 // keep special static safety
 if(typeof mokasa!=="undefined"&&mokasa){
   mokasa.route=null;mokasa.routeIndex=0;mokasa.seeking=false;mokasa.court=true;
 }
}

function v117RuntimeWatchdog(dt){
 V117_DIAG.frameCount++;
 const now=performance.now();

 if(!state||state.phase!=="shift")return;

 if(!Number.isFinite(state.min)){
   state.min=540;
   v117Recover("state.min NaN");
 }

 if(V117_DIAG.lastClock===state.min){
   V117_DIAG.sameClockFor+=dt;
 }else{
   V117_DIAG.sameClockFor=0;
   V117_DIAG.lastClock=state.min;
 }

 // If the clock does not move for 4 seconds and no true minigame is active,
 // recover stale state instead of freezing forever.
 if(V117_DIAG.sameClockFor>4 && !activeMiniGame && !(typeof v109EndShiftReady!=="undefined"&&v109EndShiftReady)){
   v117Recover("clock-stalled:"+V117_DIAG.lastSystem);
   V117_DIAG.sameClockFor=0;
 }

 // Hard cap on per-frame route complexity.
 for(const n of [...(ambientNPCs||[]),...(npcs||[])]){
   if(n&&Array.isArray(n.route)&&n.route.length>80)n.route=n.route.slice(0,80);
 }
}

function update(dt) {
 v117Trace('update-start');
 v117RuntimeWatchdog(dt);
 v116AmazonStorySafety();
 v117Trace('v114UiLockWatchdog');v118SafeCall('v114UiLockWatchdog',()=>v114UiLockWatchdog());
 v117Trace('v114LunchRecoveryWatch');v118SafeCall('v114LunchRecoveryWatch',()=>v114LunchRecoveryWatch());
 v113CapoProximitySafety();
 v112BossSafety();
 v111RaceWatch();
 dt=Math.min(Math.max(Number.isFinite(dt)?dt:0,0),0.04);v110RuntimeSafety();
  dt=Math.min(Math.max(Number.isFinite(dt)?dt:0,0),0.05);
 v107PersistentCarryHud();
 v106NpcSafetyPass();
 v117Trace('v106SpecialRoamUpdate');v118SafeCall('v106SpecialRoamUpdate',()=>v106SpecialRoamUpdate(dt));
 v102SoftLockGuard();
 v102NormalizeTicketLifetime();
 v1PaoAntiStuck(dt);
 v12c452GameplayWatchdog(dt);
 v12c45PlayerAntiStuck();
 v117Trace('v12c43UpdateWorkers');v118SafeCall('v12c43UpdateWorkers',()=>v12c43UpdateWorkers(dt));
 v12c41BeginStressFrame();
 v12cApplyDonLock();
 updateBettySupport(dt);
 updateWorkloadStress(dt);

 updateLunchReturn(dt);

 monitorEntranceIntro();
 /* V9.1.3: porta manuale con E; nessun ingresso automatico. */
 if(introStage==="managerTrigger"&&introMissionArmed){
   const m=npcs.find(n=>n.id==="manager");
   if(!m||Math.hypot(player.x-m.x,player.y-m.y)<190){introMissionArmed=false;startShiftFromEntrance()}
 }

 if(state?.phase==="shift"){
  let dx=(keys.d||keys.arrowright||virtualKeys.right?1:0)-(keys.a||keys.arrowleft||virtualKeys.left?1:0)+(joyActive?joyX:0),
      dy=(keys.s||keys.arrowdown||virtualKeys.down?1:0)-(keys.w||keys.arrowup||virtualKeys.up?1:0)+(joyActive?joyY:0);
  if(!storyOpen&&introStage!=="entranceGreeting"&&(Math.abs(dx)>.04||Math.abs(dy)>.04)){let l=Math.max(1,Math.hypot(dx,dy)),vx=dx/l*player.s*dt,vy=dy/l*player.s*dt;if(playerCanMove(player.x,player.y,player.x+vx,player.y))player.x+=vx;if(playerCanMove(player.x,player.y,player.x,player.y+vy))player.y+=vy}
  // V5.1.1.1: the shift starts only after the player physically crosses the exterior door.
  if(introStage==="managerTrigger"&&introMissionArmed){
   const m=npcs.find(n=>n.id==="manager");
   if(m&&Math.hypot(player.x-m.x,player.y-m.y)<190){introMissionArmed=false;startShiftFromEntrance()}
  }
  
  if(shiftStarted&&!v109EndShiftReady)state.min=Math.min(BOSS,state.min+dt*difficultyConfig[difficulty].timeSpeed); if(state.min>=BOSS&&!v109EndShiftReady)v109ArmEndShift();
  spawnTimer+=dt;anomTimer+=dt;
 updateLunchMigration(dt);
 v117Trace('updateManager');v118SafeCall('updateManager',()=>updateManager(dt));
 updateNarrative();
 v117Trace('v12cStoryProgression');v118SafeCall('v12cStoryProgression',()=>v12cStoryProgression());
 maybeStartStudioEvent();
 updateStudioEvent(dt);
 if(!firstCarryTriggered && state.min>=START+3){ firstCarryTriggered=true; }
   
 const hr=Math.floor(state.min/60);
 if(hr!==lastZiaHour&&!isLunch()){
   lastZiaHour=hr;
   const zia=npcs.find(n=>n.id==="zia"),pao=npcs.find(n=>n.id==="pao"),don=npcs.find(n=>n.id==="don");
   if(state.min>START+10&&zia&&Math.random()<.72)createPendingOffer(zia);
   if(Math.random()<.38){
     const n=Math.random()<.5?pao:don;
     if(n)createPendingOffer(n);
   }
   startCarryMission();
 }
 mokasaTimer+=dt*difficultyConfig[difficulty].timeSpeed;
 if(introStage==="done"&&!isLunch()&&!mokasa&&state.min>960&&mokasaTimer>70&&Math.random()<.0022){spawnMokasa();mokasaTimer=0}
 if(mokasa){mokasa.life=Infinity;updateCapoRoutine(dt)}
 v117Trace('updateAmbient');v118SafeCall('updateAmbient',()=>updateAmbient(dt));
 /* 1.0.9 legacy hunter AI removed. */
 const moved=Math.hypot(player.x-lastPlayerPos.x,player.y-lastPlayerPos.y);
 if(moved<2)idleMinutes+=dt*difficultyConfig[difficulty].timeSpeed;else{idleMinutes=0;lastPlayerPos={x:player.x,y:player.y}}
 
  /* 1.0.13 CAPO proximity encounter removed */

if(shiftStarted&&!isLunch()&&spawnTimer>difficultyConfig[difficulty].spawnSeconds){spawnTimer=0;newTicket();maybeCritical()}
 const phase=dayPhase();
 const anomalyEvery=phase==="MORNING"?26:phase==="LUNCH"?14:phase==="AFTERNOON"?21:10;
 if(anomTimer>anomalyEvery){anomTimer=0 /* V5: no supernatural anomaly system */}
  expireTickets();
 } else if(state.phase==="boss")state.min=BOSS;else state.min=END;
 hud();updateTaskProgress();

 v12c41CapStressSpike();

 v12c45PlayerAntiStuck();
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
function desk(x,y,w){pixelDesk(x,y,w)}
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

function drawHRRoom(){
 // V5.3.5: HR minimale — una sola persona, una sola scrivania, un solo monitor.
 const x=360,y=185,w=88;
 g.fillStyle="#171311";g.fillRect(x+4,y+5,w,32);
 g.fillStyle="#6b4224";g.fillRect(x,y,w,27);
 g.fillStyle="#8a5a31";g.fillRect(x,y,w,4);

 // Un solo monitor
 g.fillStyle="#111815";g.fillRect(x+30,y-22,28,20);
 g.fillStyle="#58a0b8";g.fillRect(x+34,y-18,20,12);
 g.fillStyle="#0b0d0c";g.fillRect(x+42,y-2,4,8);

 // Una sola sedia
 g.fillStyle="#252b28";g.fillRect(x+33,y+34,22,16);
}

function drawDiningTable(){
 const tables=[{x:835,y:825,w:270},{x:835,y:885,w:270}];
 // kitchen counter
 g.fillStyle="#39423d";g.fillRect(818,775,310,22);
 g.fillStyle="#76847d";g.fillRect(822,778,52,16);
 g.fillStyle="#202724";g.fillRect(1068,777,54,18);
 tables.forEach(t=>{
  g.fillStyle="#171311";g.fillRect(t.x+4,t.y+5,t.w,30);
  g.fillStyle="#6b4224";g.fillRect(t.x,t.y,t.w,25);
  g.fillStyle="#8a5a31";g.fillRect(t.x,t.y,t.w,4);
  for(const sx of [t.x+20,t.x+82,t.x+144,t.x+206]){
   g.fillStyle="#303631";g.fillRect(sx,t.y-17,25,13);g.fillRect(sx,t.y+31,25,13);
  }
 });
}
function furniture(){
 // Reparti normali compatti; CENTRALE V6.5: due tavoli distinti da 6.
 desk(72,185,145); drawHRRoom(); desk(70,405,135); desk(1080,205,115); desk(1280,205,145);
 centralDesk6(355,385,380); centralDesk6(355,505,380); // CENTRALE 6 + 6, corridoio centrale libero
 // BIM: postazioni migrate.
 desk(78,650,145); desk(78,585,145);
 // V1.0.5 REPARTO IT: due postazioni reali, PG + IT Manager.
 desk(78,795,145); desk(78,865,145);
 desk(585,800,135); // V1.0.6 ZIA ALE // SEGRETERIA
 meetingRoomSetup(872,155,126,935,105);meetingRoomSetup(875,435,225,1030,405);meetingRoomSetup(1340,500,180,1430,450);
 drawDiningTable();
 desk(1190,850,190); // solo banco stampanti
 for(let x=565;x<710;x+=42)serverRack(x,115);
 printer(1210,825);printer(1250,825);printer(1290,825);
 // V10.1 STAMPA 3D
 g.fillStyle="#252d29";g.fillRect(1455,800,120,95);
 g.fillStyle="#5d6a66";g.fillRect(1465,810,42,60);g.fillRect(1520,810,42,60);
 g.strokeStyle="#94a89f";g.strokeRect(1465,810,42,60);g.strokeRect(1520,810,42,60);
 g.fillStyle="#4c89a0";g.fillRect(1472,822,28,22);g.fillRect(1527,822,28,22);
 g.fillStyle="#7b522e";g.fillRect(1460,885,105,14);drawBathroomFixtures();
 [[250,220],[470,220],[815,300],[1140,300],[1285,635],[430,825],[75,330],[85,570],[1510,645]].forEach(p=>plant(...p));
 [[70,75],[345,75],[575,75],[870,75],[1080,75],[1275,75],[350,330],[890,385],[1320,420],[870,755],[1180,755]].forEach(p=>lightFixture(...p));
}
function meetingRoomSetup(x,y,w,screenX,screenY){
 const room=Object.keys(V9_MEETINGS).find(k=>Math.abs(V9_MEETINGS[k].table.x-x)<20)||"SALA MEET";
 const c=V9_MEETINGS[room],t=c.table,s=c.screen;
 g.fillStyle="#171311";g.fillRect(t.x+4,t.y+5,t.w,38);g.fillStyle="#6b4224";g.fillRect(t.x,t.y,t.w,30);g.fillStyle="#8a5a31";g.fillRect(t.x,t.y,t.w,4);
 c.seats.forEach(q=>{g.fillStyle="#303631";g.fillRect(q.x-11,q.y-7,22,14)});
 g.fillStyle="#111815";g.fillRect(s.x-34,s.y-18,68,36);g.fillStyle="#58a0b8";g.fillRect(s.x-29,s.y-13,58,26);
 g.fillStyle="#26302d";g.fillRect(t.x+t.w/2-18,t.y+7,36,16);g.strokeStyle="#74a6b5";g.strokeRect(t.x+t.w/2-18,t.y+7,36,16);
}
function drawBathroomFixtures(){
 const wc=[
   {x:875,y:605,w:48,h:65,label:"WC"},
   {x:945,y:605,w:48,h:65,label:"WC"}
 ];
 wc.forEach(d=>{
   g.fillStyle="#17110d";g.fillRect(d.x,d.y,d.w,d.h);
   g.strokeStyle="#9b6738";g.lineWidth=4;g.strokeRect(d.x,d.y,d.w,d.h);
   g.fillStyle="#d8d0bb";g.font="bold 11px monospace";g.fillText(d.label,d.x+14,d.y+25);
   g.fillStyle="#d6b46e";g.fillRect(d.x+d.w-10,d.y+35,4,4);
 });
}

function label(r){
 const displayName=r.name==="IT"?"REPARTO IT":r.name;
 const w=Math.min(r.w-22,displayName.length*8+22);
 g.fillStyle="rgba(6,8,7,.92)";g.fillRect(r.x+12,r.y+10,w,24);
 g.strokeStyle="#252c27";g.strokeRect(r.x+12,r.y+10,w,24);
 g.fillStyle="#d5c7ac";g.font="bold 13px monospace";g.fillText(displayName,r.x+19,r.y+27);
}

/* ---------------- V3 PIXEL ART RENDER HELPERS ---------------- */
function px(v){return Math.round(v/4)*4}
function drawPixelPerson(x,y,shirt="#536f8b",skin="#c89e7d",accent="#222"){
 x=px(x);y=px(y);
 g.fillStyle="rgba(0,0,0,.35)";g.fillRect(x-8,y+12,16,4);
 g.fillStyle=accent;g.fillRect(x-8,y-5,16,20);
 g.fillStyle=shirt;g.fillRect(x-8,y-8,16,15);
 g.fillStyle=skin;g.fillRect(x-6,y-18,12,10);
 g.fillStyle="#241c18";g.fillRect(x-6,y-18,12,3);
 g.fillStyle="#111";g.fillRect(x-4,y-14,2,2);g.fillRect(x+2,y-14,2,2);
 g.fillStyle="#202522";g.fillRect(x-8,y+12,6,7);g.fillRect(x+2,y+12,6,7);
}

function centralDesk6(x,y,w){
 x=px(x);y=px(y);w=px(w);
 g.fillStyle="#171311";g.fillRect(x+4,y+5,w,28);
 g.fillStyle="#6b4224";g.fillRect(x,y,w,24);g.fillStyle="#8a5a31";g.fillRect(x,y,w,4);
 const gap=(w-44)/5;
 for(let j=0;j<6;j++){const mx=Math.round(x+j*gap);g.fillStyle="#111815";g.fillRect(mx,y-24,32,20);g.fillStyle="#58a0b8";g.fillRect(mx+4,y-20,24,12);g.fillStyle="#0a0d0c";g.fillRect(mx+14,y-4,4,7)}
}
function pixelDesk(x,y,w){
 x=px(x);y=px(y);w=px(w);
 g.fillStyle="#171311";g.fillRect(x+4,y+5,w,28);
 g.fillStyle="#6b4224";g.fillRect(x,y,w,24);
 g.fillStyle="#8a5a31";g.fillRect(x,y,w,4);
 for(let i=8;i<w-25;i+=44){
  g.fillStyle="#111815";g.fillRect(x+i,y-24,32,20);
  g.fillStyle="#58a0b8";g.fillRect(x+i+4,y-20,24,12);
  g.fillStyle="#0a0d0c";g.fillRect(x+i+14,y-4,4,7);
 }
}
function pixelFloorOverlay(r){
 g.globalAlpha=.18;g.fillStyle="#000";
 const step=16;
 for(let yy=r.y+8;yy<r.y+r.h;yy+=step){
  for(let xx=r.x+8;xx<r.x+r.w;xx+=step){
   if(((xx+yy)/step)%2<1)g.fillRect(px(xx),px(yy),4,4);
  }
 }
 g.globalAlpha=1;
}

const serverRacks=[
 {x:590,y:108,w:34,h:72,id:"RACK-A"},{x:630,y:108,w:34,h:72,id:"RACK-B"},
 {x:670,y:108,w:34,h:72,id:"RACK-C"}
];
function drawServerRacks(){
 serverRacks.forEach((r,i)=>{
  g.fillStyle="#070b09";g.fillRect(r.x,r.y,r.w,r.h);
  g.strokeStyle="#66756b";g.lineWidth=3;g.strokeRect(r.x,r.y,r.w,r.h);
  for(let y=r.y+10;y<r.y+r.h-6;y+=10){
   g.fillStyle="#101813";g.fillRect(r.x+5,y,r.w-10,7);
   g.fillStyle=(visualAnomaly&&visualAnomaly.kind==="SERVER_LED"&&i===1)?"#ff4d47":"#59e873";
   g.fillRect(r.x+8,y+2,3,3);
   g.fillStyle="#d4aa45";g.fillRect(r.x+14,y+2,3,3);
  }
  g.fillStyle="#96a59c";g.font="7px monospace";g.fillText(r.id,r.x-1,r.y-4);
 });
}

function v12c45DrawLab(){return}


/* VERSIONE1ITSHIFT 1.0.2 — standalone IT Lab extension, rooms[] untouched */
const V102_LAB={x:770,y:55,w:225,h:150,name:"SERVER"};
const V102_LAB_DROP={x:895,y:175};
const V102_LAB_BENCH={x:945,y:140};

function v102InsideLab(x,y){
 return x>=V102_LAB.x&&x<=V102_LAB.x+V102_LAB.w&&y>=V102_LAB.y&&y<=V102_LAB.y+V102_LAB.h;
}

function v102DrawLab(){return}

function v102LabRoute(from,to){
 const fr=safeRoom(from,""),tr=safeRoom(to,"");
 const wantsLab=(tr==="SERVER");
 const leavesLab=(fr==="SERVER");
 if(!wantsLab&&!leavesLab)return null;

 // Server actual room ends around x755, so connector uses doorway immediately to the right.
 return wantsLab
 ?[{x:725,y:135,room:"SERVER"},{x:755,y:135,room:"SERVER"},{x:780,y:135,room:"SERVER"},{x:895,y:135,room:"SERVER"}]
 :[{x:895,y:135,room:"SERVER"},{x:780,y:135,room:"SERVER"},{x:755,y:135,room:"SERVER"},{x:725,y:135,room:"SERVER"}];
}


function v104DrawTechnicalLabLabel(){
 g.save();
 g.fillStyle="#020706";
 g.fillRect(440,64,270,25);
 g.fillStyle="#55dfff";
 g.font="12px monospace";
 g.fillText("SERVER + SERVER / MAGAZZINO IT",448,81);
 g.restore();
}


function v107DrawServerDeposit(){
 g.save();
 g.strokeStyle="#55dfff";g.lineWidth=3;
 g.strokeRect(620,195,60,42);
 g.fillStyle="#55dfff";g.font="10px monospace";
 g.fillText("DEPOSITO IT",612,188);
 g.restore();
}


function v110DrawBettyDesk(){
 g.save();
 g.fillStyle="#705b45";g.fillRect(92,176,126,22);
 g.fillStyle="#1f2327";g.fillRect(135,155,42,22);
 g.fillStyle="#9ba4a8";g.fillRect(151,177,8,16);
 g.restore();
}


/* VERSIONE1ITSHIFT 1.0.11 — FIXED MATERIAL POINTS */
const V111_PHYSICAL_POINTS={
 SERVER_PICKUP:{x:650,y:220,room:"SERVER",label:"RITIRO IT"},
 SERVER_DROP:{x:700,y:220,room:"SERVER",label:"DEPOSITO IT"},
 MEET_DROP:{x:925,y:205,room:"SALA MEET",label:"CONSEGNA MEETING"},
 IT_DROP:{x:150,y:825,room:"IT",label:"BANCO IT"}
};

function v111PhysicalMissionBusy(){
 return !!((studioEvent&&["AMAZON","MEETING_RUSH"].includes(studioEvent.type))||(carryMission&&!carryMission.done));
}

function v111DrawPhysicalPoints(){
 if(!v111PhysicalMissionBusy())return;
 g.save();
 for(const p of Object.values(V111_PHYSICAL_POINTS)){
   g.strokeStyle="#55dfff";g.lineWidth=2;g.strokeRect(p.x-18,p.y-14,36,28);
   g.fillStyle="#55dfff";g.font="8px monospace";g.fillText(p.label,p.x-28,p.y-20);
 }
 g.restore();
}


let v117DiagVisible=false;
document.addEventListener("keydown",e=>{
 if(e.code==="F3"){
   e.preventDefault();
   v117DiagVisible=!v117DiagVisible;
 }
});

function v117DrawDiag(){
 if(!v117DiagVisible)return;
 g.save();
 g.fillStyle="rgba(0,0,0,.88)";
 g.fillRect(20,110,520,170);
 g.fillStyle="#8dff47";
 g.font="12px monospace";
 g.fillText("DIAG 1.0.17",35,135);
 g.fillStyle="#fff";
 g.fillText(`LAST: ${V117_DIAG.lastSystem}`,35,158);
 g.fillText(`CLOCK: ${state?.min} | STALL: ${V117_DIAG.sameClockFor.toFixed(2)}s`,35,180);
 g.fillText(`RECOVERIES: ${V117_DIAG.recoveries} | JS ERR: ${v118RuntimeErrors}`,35,202);
 const tail=V117_DIAG.log.slice(-3);
 tail.forEach((x,i)=>g.fillText(x,35,226+i*18));
 g.restore();
}

function draw(){
 v117DrawDiag();
 v111DrawPhysicalPoints();
 v110DrawBettyDesk();
 v107DrawServerDeposit();
 v104DrawTechnicalLabLabel();
 v102DrawLab();
 v12c45DrawLab();
 g.setTransform(1,0,0,1,0,0);
 g.fillStyle="#020403";g.fillRect(0,0,W,H);
 const cam=computeCamera();
 const useCam=!(debug||fullMap);
 if(useCam){g.save();g.scale(cam.zoom,cam.zoom);g.translate(-cam.x,-cam.y)}
 g.fillStyle="#050706";g.fillRect(0,0,W,H);
 corridors.forEach(visualCorridor);
 // V9: esterno unico; nessuna seconda porta grafica o interazione duplicata.
 
 // V5.1.2 real studio entrance
 if(introFreeWalk&&!enteredStudio){
   const d=STUDIO_ENTRANCE;
   g.fillStyle="#4e3524";g.fillRect(d.x,d.y,d.w,d.h);
   g.strokeStyle="#d5a454";g.lineWidth=4;g.strokeRect(d.x,d.y,d.w,d.h);
   g.fillStyle="#f2d37a";g.font="bold 11px monospace";g.fillText("INGRESSO",d.x+24,d.y-8);
   if(nearStudioEntrance()){
     g.fillStyle="rgba(4,8,6,.94)";g.fillRect(d.x-5,d.y-38,d.w+10,28);
     g.strokeStyle="#b7ff4a";g.lineWidth=2;g.strokeRect(d.x-5,d.y-38,d.w+10,28);
     g.fillStyle="#b7ff4a";g.font="bold 10px monospace";g.fillText("ENTRA",d.x+34,d.y-20);
   }
 }

rooms.forEach(floor);rooms.forEach(pixelFloorOverlay);
 rooms.forEach(drawRoomWalls);
 doors.forEach(visualDoor);
 furniture();
 if(debug){g.save();g.fillStyle="rgba(255,65,65,.20)";g.strokeStyle="#ff4141";g.lineWidth=2;obstacles.forEach(o=>{g.fillRect(o.x,o.y,o.w,o.h);g.strokeRect(o.x,o.y,o.w,o.h)});g.restore()}
 drawServerRacks();
 rooms.forEach(label);

 // V5.2: overlay solo per apparati speciali. Le workstation sono già disegnate nei mobili.
 stations.filter(s=>["AV","PIXERA"].includes(s.type)).forEach(s=>{
   g.fillStyle="#151a18";g.fillRect(s.x-18,s.y-13,36,22);
   g.fillStyle=s.type==="PIXERA"?"#725b96":"#3d778e";g.fillRect(s.x-14,s.y-9,28,14);
 });
 [...npcs,...(mokasa?[mokasa]:[])].forEach(n=>{
   drawPixelPerson(n.x,n.y,n.shirt,n.skin||"#d0a887",n.hair||(n.tone==="bad"?"#3a1717":"#202522"));
   g.fillStyle="#050706";g.fillRect(px(n.x)-30,px(n.y)-39,60,13);
   g.fillStyle=n.tone==="bad"?"#ff6262":n.tone==="good"?"#62e568":"#ffd447";
   g.font="bold 9px monospace";g.textAlign="center";g.fillText(n.name,px(n.x),px(n.y)-30);g.textAlign="left";
 });
 // V2.7.2.1 — Living Office visible layer
 // NPC ambientali
 ambientNPCs.forEach(n=>{
   drawPixelPerson(n.x,n.y,n.shirt,"#c89e7d","#202522");
   if(n.state!=="work"){g.fillStyle="#d8e1dc";g.font="bold 7px monospace";g.fillText(n.name,px(n.x)-9,px(n.y)-26)}
 });

 // Scaffale fisico IT SUPPLIES
 g.fillStyle="#4b3423";g.fillRect(78,605,145,18);
 g.fillStyle="#222a26";g.fillRect(82,578,137,27);
 // V6.5: nessuna etichetta sopra le postazioni; il nome è nella targa stanza.

 drawStudioEventObjects();

 // V10.1 exterior wall / sidewalk / road
 g.fillStyle="#1b1612";g.fillRect(320,V101_EXTERIOR.WALL_Y,1000,10);
 g.fillStyle="#b9b49d";g.fillRect(V101_EXTERIOR.SIDEWALK.x,V101_EXTERIOR.SIDEWALK.y,V101_EXTERIOR.SIDEWALK.w,V101_EXTERIOR.SIDEWALK.h);
 g.fillStyle="#343a36";g.fillRect(V101_EXTERIOR.ROAD.x,V101_EXTERIOR.ROAD.y,V101_EXTERIOR.ROAD.w,V101_EXTERIOR.ROAD.h);
 g.fillStyle="#e1d8a5";for(let x=80;x<1560;x+=180)g.fillRect(x,1018,90,4);
 g.fillStyle=entranceOpened?"#5a7a72":"#3c3328";g.fillRect(STUDIO_ENTRANCE.x,STUDIO_ENTRANCE.y,STUDIO_ENTRANCE.w,15);

 // V12C_SIDEWALK_DRAW
 g.fillStyle="#17130f";g.fillRect(320,V12C_EXTERIOR.WALL_Y,1000,10);
 g.fillStyle="#c5c0aa";g.fillRect(V12C_EXTERIOR.SIDEWALK.x,V12C_EXTERIOR.SIDEWALK.y,V12C_EXTERIOR.SIDEWALK.w,V12C_EXTERIOR.SIDEWALK.h);
 g.fillStyle="#373d38";g.fillRect(V12C_EXTERIOR.ROAD.x,V12C_EXTERIOR.ROAD.y,V12C_EXTERIOR.ROAD.w,V12C_EXTERIOR.ROAD.h);
 g.fillStyle="#e4dba6";for(let x=70;x<1540;x+=190)g.fillRect(x,1018,95,4);

 // Marker missione inventario
 if(carryMission){
   const q=carryTarget();
   if(q){
     const pulse=4+Math.sin(performance.now()/130)*2;
     g.strokeStyle="#6ee7ff";g.lineWidth=3;
     g.strokeRect(q.x-12-pulse/2,q.y-12-pulse/2,24+pulse,24+pulse);
     if(carryMission.stage==="pickup"){
       g.fillStyle="#c5eaff";
       if(carryMission.item.includes("CUFFIE")){
         g.strokeStyle="#c5eaff";g.lineWidth=4;g.beginPath();g.arc(q.x,q.y,9,Math.PI,0);g.stroke();
         g.fillRect(q.x-11,q.y,5,9);g.fillRect(q.x+6,q.y,5,9);
       }else if(carryMission.item.includes("TONER")){
         g.fillRect(q.x-9,q.y-6,18,12);g.fillStyle="#222";g.fillRect(q.x-5,q.y-3,10,6);
       }else if(carryMission.item.includes("USB")){
         g.fillRect(q.x-10,q.y-4,17,8);g.fillStyle="#777";g.fillRect(q.x+7,q.y-3,5,6);
       }else g.fillRect(q.x-10,q.y-5,20,10);
       g.fillStyle="#6ee7ff";g.font="bold 9px monospace";g.fillText(carryMission.item,q.x-28,q.y-20);
     }else{
       g.fillStyle="#6ee7ff";g.font="bold 9px monospace";
       g.fillText(carryMission.recipient?carryMission.recipient.name:"CONSEGNA",q.x-20,q.y-20);
     }
   }
 }

 // ! stile Pokémon sopra Pao/Don
 npcs.forEach(n=>{
   if(n.exclaimUntil&&performance.now()<n.exclaimUntil){
     g.fillStyle="#ffd447";g.font="bold 28px monospace";g.fillText("!",n.x-7,n.y-48);
   }
 });

 // Anomalie fisiche
 if(visualAnomaly&&performance.now()<visualAnomaly.until){
   const k=visualAnomaly.kind,t=performance.now();
   const desktops=stations.filter(x=>["HP Z","MAC"].includes(x.type));
   if(k==="MONITOR"||k==="MONITOR1905"){
     const s=desktops[Math.floor(visualAnomaly.seed*desktops.length)];
     if(s){
       g.fillStyle=k==="MONITOR1905"?"#8b001c":"#edf4f4";g.fillRect(s.x-9,s.y-9,18,12);
       if(k==="MONITOR1905"){g.fillStyle="#fff";g.font="7px monospace";g.fillText("19:05",s.x-9,s.y)}
     }
   }
   if(k==="PIXERA"||k==="PIXERA_ALL"){
     stations.filter(x=>x.type==="PIXERA").forEach((s,i)=>{
       g.fillStyle=(Math.floor(t/120)+i)%2?"#7d145c":"#13a5a5";g.fillRect(s.x-17,s.y-12,34,20);
     });
   }
   if(k==="LIGHT"){g.fillStyle=`rgba(255,255,220,${Math.sin(t/55)>0?.15:.01})`;g.fillRect(0,0,W,H)}
   if(k==="BLACKOUT"){g.fillStyle="rgba(0,0,0,.82)";g.fillRect(0,0,W,H)}
   if(k==="RGB"){g.fillStyle="rgba(180,0,50,.08)";g.fillRect(8,0,W,H);g.fillStyle="rgba(0,160,180,.06)";g.fillRect(-8,0,W,H)}
   if(k==="SHADOW"){g.fillStyle="#030303";g.fillRect(790,430,15,35)}
   if(k==="BATHROOM"){g.fillStyle="#6b0f1e";g.fillRect(900,620,8,24)}
 }
 if(visualAnomaly&&performance.now()>=visualAnomaly.until)visualAnomaly=null;

 tickets.forEach(t=>{
  const b=Math.sin(performance.now()/120)>0;
  g.fillStyle=t.level==="CRITICAL"?"#ff3131":b?"#ffd447":"#c43d35";
  g.beginPath();g.arc(t.p.x,t.p.y,11,0,Math.PI*2);g.fill();
  g.fillStyle="#111";g.font="bold 14px monospace";g.fillText("!",t.p.x-4,t.p.y+5);
 });


 const ep=studioEventPrompt();if(ep){g.fillStyle="#ffd65a";g.font="bold 10px monospace";g.fillText(ep,px(player.x)-80,px(player.y)-48)}
 const cp=carryPrompt();
 if(cp){
   const w=Math.min(390,cp.length*7+24),x=player.x-w/2,y=player.y-55;
   g.fillStyle="rgba(5,8,7,.95)";g.fillRect(x,y,w,24);
   g.strokeStyle="#6ee7ff";g.strokeRect(x,y,w,24);
   g.fillStyle="#dff8ff";g.font="bold 10px monospace";g.textAlign="center";g.fillText(cp,player.x,y+16);g.textAlign="left";
 }

 drawPixelPerson(player.x,player.y,"#284f3a","#d0a887","#17231d");


 if(debug){drawV7Debug();v12c44DrawCollisionDebug();}v12c3DrawManagerRouteDebug();

 if(useCam)g.restore();
 drawMiniMap();
 if(useCam){
   const grad=g.createRadialGradient(W/2,H/2,Math.min(W,H)*.28,W/2,H/2,Math.max(W,H)*.60);
   grad.addColorStop(0,"rgba(0,0,0,0)");
   grad.addColorStop(1,"rgba(0,0,0,.48)");
   g.fillStyle=grad;g.fillRect(0,0,W,H);
 }
}


function v12c3DrawManagerRouteDebug(){
 if(!debug)return;
 const pts=[
  {x:650,y:735},{x:520,y:705},{x:365,y:705},
  {x:300,y:675},{x:255,y:650},{x:190,y:640}
 ];
 g.save();
 g.strokeStyle="#ffcc33";g.lineWidth=3;g.beginPath();
 pts.forEach((p,i)=>i?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y));
 g.stroke();
 g.fillStyle="#ffcc33";
 pts.forEach((p,i)=>{g.fillRect(p.x-4,p.y-4,8,8);g.fillText("M"+i,p.x+6,p.y-6)});
 g.restore();
}


/* V12 CLEAN.4.4 — restore collision/debug rendering */
function v12c44DrawCollisionDebug(){
 if(!debug)return;
 g.save();

 // Walkable grid
 const step=24;
 for(let y=0;y<H;y+=step){
   for(let x=0;x<W;x+=step){
     if(!walkable(x,y)){
       g.fillStyle="rgba(255,70,70,.14)";
       g.fillRect(x,y,step,step);
     }else{
       g.fillStyle="rgba(60,180,255,.035)";
       g.fillRect(x,y,step,step);
     }
   }
 }

 // Room bounds
 g.strokeStyle="rgba(255,220,80,.65)";
 g.lineWidth=2;
 for(const r of rooms){
   g.strokeRect(r.x,r.y,r.w,r.h);
 }

 // NPC routes
 for(const n of [...ambientNPCs,...npcs]){
   if(!n?.route?.length)continue;
   g.strokeStyle=v12c44IsPao(n)?"#ffd400":"#4de1ff";
   g.lineWidth=2;
   g.beginPath();
   g.moveTo(n.x,n.y);
   for(let i=n.routeIndex||0;i<n.route.length;i++){
     const p=n.route[i];g.lineTo(p.x,p.y);
   }
   g.stroke();
 }

 // PAO reserved exit
 g.strokeStyle="#ffcc33";
 g.lineWidth=3;
 g.beginPath();
 V12C44_PAO_EXIT.forEach((p,i)=>i?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y));
 g.stroke();
 g.fillStyle="#ffcc33";
 V12C44_PAO_EXIT.forEach((p,i)=>{
   g.fillRect(p.x-4,p.y-4,8,8);
   g.fillText("P"+i,p.x+6,p.y-6);
 });

 g.restore();
}

function drawV7Debug(){
 try{
  g.save();g.globalAlpha=.24;
  g.fillStyle="#37ff82";roomFloors.forEach(z=>g.fillRect(z.x,z.y,z.w,z.h));
  g.fillStyle="#2aa8ff";corridors.forEach(z=>g.fillRect(z.x,z.y,z.w,z.h));g.fillStyle="#00ffd055";g.fillRect(V912_KITCHEN_CORRIDOR.x,V912_KITCHEN_CORRIDOR.y,V912_KITCHEN_CORRIDOR.w,V912_KITCHEN_CORRIDOR.h);
  g.fillStyle="#ffe14a";doors.forEach(z=>g.fillRect(z.x,z.y,z.w,z.h));
  g.fillStyle="#ff3040";obstacles.forEach(o=>g.fillRect(o.x,o.y,o.w,o.h));
  g.globalAlpha=1;
  const all=[...ambientNPCs,...npcs,...(mokasa?[mokasa]:[])].filter(Boolean);
  for(const n of all){
   if(Array.isArray(n.route)&&n.route.length){
    g.strokeStyle=n.stuckFor>.3?"#ff4545":"#64e9ff";g.lineWidth=2;g.beginPath();g.moveTo(n.x,n.y);
    for(let ri=n.routeIndex||0;ri<n.route.length;ri++){const p=n.route[ri];if(p&&Number.isFinite(p.x)&&Number.isFinite(p.y))g.lineTo(p.x,p.y)}
    g.stroke();
   }
   g.fillStyle="#050706";g.fillRect(n.x-45,n.y+20,90,25);
   g.fillStyle=n.stuckFor>.3?"#ff5a55":"#d6f7df";g.font="7px monospace";
   g.fillText(`${n.name} // ${n.state||"-"} // ${n.homeRoom||"-"}`,n.x-42,n.y+31);
   if(n.stuckFor>.3)g.fillText("STUCK",n.x-42,n.y+41);
   if(n.blockedFor>.2)g.fillText("TRAFFIC",n.x+8,n.y+41);
  }
  g.restore();
 }catch(err){console.warn("DEBUG DRAW SKIPPED",err)}
}
function loop(n){let dt=Math.min(.05,(n-last)/1000);last=n;update(dt);draw();requestAnimationFrame(loop)}
function toast(s){let t=$("#toast");t.textContent=s;t.classList.add("on");clearTimeout(t.q);t.q=setTimeout(()=>t.classList.remove("on"),1800)}

function visibleAnswerButtons(){
 return [...document.querySelectorAll("#answers button")].filter(b=>b.offsetParent!==null&&!b.disabled);
}
function handleQuizShortcut(e){
 const modal=$("#modal");
 if(!modal||modal.classList.contains("hidden"))return false;
 const buttons=visibleAnswerButtons();
 if(!buttons.length)return false;
 const k=e.key.toLowerCase();
 if(k==="v"||k==="f"){
   const wanted=k==="v"?"vero":"falso";
   const idx=buttons.findIndex(b=>b.textContent.toLowerCase().includes(wanted));
   if(idx>=0){buttons[idx].click();return true}
 }
 if(/^[0-9]$/.test(k)){
   const n=+k;
   if(n>=1&&n<=buttons.length){buttons[n-1].click();return true}
 }
 // For 10+ answers: type multi-digit index quickly, e.g. 1 then 2 => answer 12.
 if(/^[0-9]$/.test(k)){
   return true;
 }
 return false;
}
let answerDigits="",answerDigitTimer=null;
function handleDynamicNumberAnswer(e){
 const modal=$("#modal");
 if(!modal||modal.classList.contains("hidden"))return false;
 const buttons=visibleAnswerButtons();
 if(!buttons.length||!/^[0-9]$/.test(e.key))return false;
 answerDigits+=e.key;
 clearTimeout(answerDigitTimer);
 answerDigitTimer=setTimeout(()=>{
   const n=parseInt(answerDigits,10);answerDigits="";
   if(n>=1&&n<=buttons.length)buttons[n-1].click();
 },260);
 // Immediate for a digit that cannot be a prefix of another valid answer.
 const n=parseInt(answerDigits,10);
 const couldExtend=(n*10)<=buttons.length;
 if(n>=1&&n<=buttons.length&&!couldExtend){
   clearTimeout(answerDigitTimer);answerDigits="";buttons[n-1].click();
 }
 return true;
}
addEventListener("keydown",e=>{
 if(window.__entranceDialogReady && (e.key==="Enter"||e.key.toLowerCase()==="e")){
   e.preventDefault();
   window.__entranceDialogReady=false;
   beginEntranceWalk();
   return;
 }
 const key=e.key.toLowerCase();
 if(e.key==="Tab"){e.preventDefault();togglePDA(true);return}
 if(key==="m"){e.preventDefault();fullMap=!fullMap;toast(fullMap?"MAPPA COMPLETA":"CAMERA PLAYER");return}
 if((e.key==="Enter"||key==="e")&&storyOpen){e.preventDefault();closeStory();return}
 if(e.key==="Enter"){
   const btn=!$("#toLore").classList.contains("hidden")&&$("#boot").classList.contains("active")?$("#toLore"):
             $("#lore").classList.contains("active")?$("#start"):null;
   if(btn){e.preventDefault();btn.click();return}
 }
 if(handleDynamicNumberAnswer(e)){e.preventDefault();return}
 if(handleQuizShortcut(e)){e.preventDefault();return}
 keys[key]=1;
 if(key==="e")interact();
 if(e.key==="F2"){debug=!debug;toast("DEBUG COLLISIONI "+(debug?"ON":"OFF"))}
});
addEventListener("keyup",e=>{keys[e.key.toLowerCase()]=0;if(e.key==="Tab")togglePDA(false)});
const debugTouch=$("#debugTouch");
if(debugTouch)debugTouch.addEventListener("click",()=>{debug=!debug;debugTouch.classList.toggle("on",debug);toast("DEBUG COLLISIONI "+(debug?"ON":"OFF"))});

let joy=$("#joy"),stick=joy?joy.querySelector("i"):null;
let joyX=0,joyY=0,joyActive=false;

function joySet(x,y){
 joyX=Math.max(-1,Math.min(1,x));
 joyY=Math.max(-1,Math.min(1,y));
 joyActive=Math.abs(joyX)>.03||Math.abs(joyY)>.03;
 if(stick){
   const px=joyX*34,py=joyY*34;
   stick.style.transform=`translate3d(${px}px,${py}px,0)`;
 }
}
function joyStop(){joySet(0,0)}

if(joy){
 joy.style.touchAction="none";

 const moveFromTouch=e=>{
   const t=(e.touches&&e.touches[0])||(e.changedTouches&&e.changedTouches[0]);
   if(!t)return;
   const r=joy.getBoundingClientRect();
   let x=(t.clientX-(r.left+r.width/2))/(r.width*.32);
   let y=(t.clientY-(r.top+r.height/2))/(r.height*.32);
   const l=Math.hypot(x,y);
   if(l>1){x/=l;y/=l}
   joySet(x,y);
   e.preventDefault();
 };

 joy.addEventListener("touchstart",moveFromTouch,{passive:false});
 joy.addEventListener("touchmove",moveFromTouch,{passive:false});
 joy.addEventListener("touchend",e=>{joyStop();e.preventDefault()},{passive:false});
 joy.addEventListener("touchcancel",e=>{joyStop();e.preventDefault()},{passive:false});

 joy.addEventListener("pointerdown",e=>{
   const r=joy.getBoundingClientRect();
   let x=(e.clientX-(r.left+r.width/2))/(r.width*.32);
   let y=(e.clientY-(r.top+r.height/2))/(r.height*.32);
   const l=Math.hypot(x,y);if(l>1){x/=l;y/=l}
   joySet(x,y);e.preventDefault();
 },{passive:false});
 joy.addEventListener("pointermove",e=>{
   if(!(e.buttons||e.pointerType==="touch"))return;
   const r=joy.getBoundingClientRect();
   let x=(e.clientX-(r.left+r.width/2))/(r.width*.32);
   let y=(e.clientY-(r.top+r.height/2))/(r.height*.32);
   const l=Math.hypot(x,y);if(l>1){x/=l;y/=l}
   joySet(x,y);e.preventDefault();
 },{passive:false});
 joy.addEventListener("pointerup",e=>{joyStop();e.preventDefault()},{passive:false});
 joy.addEventListener("pointercancel",e=>{joyStop();e.preventDefault()},{passive:false});
}

// Fallback D-PAD: direct virtual WASD, deliberately simple for iOS Safari.
const virtualKeys={up:false,down:false,left:false,right:false};
function bindDir(id,key){
 const el=$(id);if(!el)return;
 const on=e=>{virtualKeys[key]=true;if(e)e.preventDefault()};
 const off=e=>{virtualKeys[key]=false;if(e)e.preventDefault()};
 el.addEventListener("touchstart",on,{passive:false});
 el.addEventListener("touchend",off,{passive:false});
 el.addEventListener("touchcancel",off,{passive:false});
 el.addEventListener("pointerdown",on,{passive:false});
 el.addEventListener("pointerup",off,{passive:false});
 el.addEventListener("pointercancel",off,{passive:false});
}
bindDir("#mUp","up");bindDir("#mDown","down");bindDir("#mLeft","left");bindDir("#mRight","right");

const actBtn=$("#act");
if(actBtn){
 let lastAct=0;
 const fire=e=>{
   const now=performance.now();
   if(now-lastAct<250)return;
   lastAct=now;
   if(e)e.preventDefault();
   interact();
 };
 actBtn.addEventListener("touchstart",fire,{passive:false});
 actBtn.addEventListener("pointerdown",fire,{passive:false});
 actBtn.addEventListener("click",fire);
}


// V9 accessibility: home e setup utilizzabili anche senza mouse.
window.addEventListener("keydown",e=>{if(e.key!=="Enter"&&e.key.toLowerCase()!=="e")return;const boot=document.querySelector("#boot.active"),lore=document.querySelector("#lore.active");if(boot){e.preventDefault();document.querySelector("#toLore")?.click()}else if(lore){e.preventDefault();document.querySelector("#start")?.click()}});



function v911StartupSelfTest(){
 const problems=[];
 try{
   if(typeof V9_MEETINGS!=="object")problems.push("V9_MEETINGS missing");
   if(!Array.isArray(obstacles)||!obstacles.length)problems.push("obstacles missing");
   if(typeof draw!=="function")problems.push("draw missing");
   if(typeof update!=="function")problems.push("update missing");
   if(typeof reset!=="function")problems.push("reset missing");
   for(const [name,cfg] of Object.entries(V9_MEETINGS)){
     if(!cfg.table||!cfg.screen||!Array.isArray(cfg.seats))problems.push("meeting config "+name);
   }
 }catch(e){problems.push(e.message)}
 if(problems.length)console.error("VERSIONE1ITSHIFT 1.0.18 SELF TEST",problems);
 else console.log("VERSIONE1ITSHIFT 1.0.18 SELF TEST // OK");
 return problems;
}

function updateRealDateLine(){
 const el=document.getElementById("realDateLine");if(!el)return;
 const now=new Date();
 const weekdays=["DOMENICA","LUNEDÌ","MARTEDÌ","MERCOLEDÌ","GIOVEDÌ","VENERDÌ","SABATO"];
 const months=["GENNAIO","FEBBRAIO","MARZO","APRILE","MAGGIO","GIUGNO","LUGLIO","AGOSTO","SETTEMBRE","OTTOBRE","NOVEMBRE","DICEMBRE"];
 el.textContent=`08:58 // ${weekdays[now.getDay()]} ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
}
updateRealDateLine();
v911StartupSelfTest();


window.addEventListener("keydown",e=>{
 const boot=document.getElementById("boot");
 if(!boot||!boot.classList.contains("active"))return;
 if(e.key==="Enter"||e.key==="e"||e.key==="E"){
   e.preventDefault();
   document.getElementById("toLore")?.click();
 }
});

document.getElementById("toLore")?.addEventListener("click",()=>{
 document.querySelector(".v91Home")?.classList.add("leaving");
},{capture:true});






/* V1.0.15 — browser focus recovery: changing tab must never leave movement/time locks behind. */
document.addEventListener("visibilitychange",()=>{
  keys={};
  if(!document.hidden){last=performance.now();v114LastUiProgress=performance.now();}
});
window.addEventListener("blur",()=>{keys={};});
window.addEventListener("focus",()=>{keys={};last=performance.now();v114LastUiProgress=performance.now();});

/* V12 CLEAN.4.5.1 — canonical physical-action keys */
document.addEventListener("keydown",function v12c451PhysicalKeys(e){
 if(e.repeat)return;
 const k=(e.key||"").toLowerCase();
 if(k!=="f"&&k!=="g")return;

 const ae=document.activeElement;
 if(ae && ["INPUT","TEXTAREA","SELECT"].includes(ae.tagName))return;

 // Do not steal F/G on boot/lore screens.
 const boot=document.getElementById("boot");
 const lore=document.getElementById("lore");
 if((boot&&boot.classList.contains("active"))||(lore&&lore.classList.contains("active")))return;

 e.preventDefault();
 e.stopImmediatePropagation();

 if(k==="f")v12c45Pickup();
 else v12c45Deliver();
},true);


(function v118SelfTest(){
 const failures=[];
 if(typeof sideMessage!=="function")failures.push("sideMessage");
 if(typeof activityDestination!=="function")failures.push("activityDestination");
 if(typeof v118ValidPoint!=="function")failures.push("v118ValidPoint");
 const d=activityDestination({x:1,y:2,homeX:3,homeY:4,homeRoom:"TEST"},"wander");
 if(!v118ValidPoint(d))failures.push("activityDestination-result");
 if(failures.length)console.error("VERSIONE1ITSHIFT 1.0.18 SELF TEST // FAIL",failures);
 else console.log("VERSIONE1ITSHIFT 1.0.18 SELF TEST // OK");
})();

