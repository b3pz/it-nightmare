// IT NIGHTMARE V5.3 STUDIO ROUTINE
const $=s=>document.querySelector(s),C=$("#game"),g=C.getContext("2d");g.imageSmoothingEnabled=false;
const W=C.width,H=C.height,START=540,BOSS=1132,END=1140,TIME_SPEED=5.2;
const difficultyConfig={
 easy:{name:"EASY",maxStrikes:8,timeMult:2.45,stressMult:.42,incidentMult:.42,criticalChance:.018,timeSpeed:.86,maxTickets:2,spawnSeconds:23},
 normal:{name:"NORMAL",maxStrikes:5,timeMult:1.85,stressMult:.70,incidentMult:.70,criticalChance:.055,timeSpeed:1.25,maxTickets:3,spawnSeconds:19},
 hard:{name:"HARD",maxStrikes:3,timeMult:1.28,stressMult:1.00,incidentMult:1.00,criticalChance:.12,timeSpeed:1.75,maxTickets:3,spawnSeconds:15},
 nightmare:{name:"NIGHTMARE",maxStrikes:2,timeMult:.95,stressMult:1.25,incidentMult:1.25,criticalChance:.20,timeSpeed:2.35,maxTickets:4,spawnSeconds:11}
};
let difficulty="normal";

window.addEventListener("error",ev=>{
 const msg=ev?.error?.message||ev?.message||"Errore JavaScript";
 const line=ev?.lineno?` // line ${ev.lineno}`:"";
 const box=document.querySelector("#jsError");
 if(box){box.textContent=`JS ERROR V5.3.8 // ${msg}${line}`;box.classList.remove("hidden")}
});
window.addEventListener("unhandledrejection",ev=>{
 const msg=ev?.reason?.message||String(ev?.reason||"Promise rejection");
 const box=document.querySelector("#jsError");
 if(box){box.textContent=`JS ERROR V5.3.8 // ${msg}`;box.classList.remove("hidden")}
});

const screens={boot:$("#boot"),lore:$("#lore"),game:$("#gameScreen")};function show(k){Object.values(screens).forEach(x=>x.classList.remove("active"));screens[k].classList.add("active")}
const boot=["[BOOT] IT SUPPORT // DAILY SHIFT","[OK] Workstations inventory","[OK] Meeting rooms","[OK] File services","[OK] Ticket queue","[TIME] 08:58","[STATUS] Ready for another day."];
let bl=0;(function b(){if(bl<boot.length){$("#bootlog").innerHTML+=boot[bl++]+"<br>";setTimeout(b,280)}else $("#toLore").classList.remove("hidden")})();$("#toLore").onclick=()=>show("lore");$("#start").onclick=()=>{difficulty=$("#difficulty")?.value||"normal";show("game");reset();requestAnimationFrame(loop)};

const rooms=[
{name:"EDITORIA",x:30,y:55,w:250,h:210,f:"stone"},{name:"HR",x:300,y:55,w:205,h:210,f:"stone"},{name:"SERVER",x:525,y:55,w:230,h:210,f:"server"},
{name:"BIM",x:30,y:310,w:210,h:185,f:"stone"},{name:"IT",x:30,y:535,w:210,h:180,f:"wood"},{name:"CENTRALE",x:315,y:310,w:440,h:355,f:"stone"},
{name:"SALA MEET",x:840,y:55,w:190,h:270,f:"stone"},{name:"THE BUNKER",x:1050,y:55,w:170,h:270,f:"wood"},{name:"RENDERISTI",x:1240,y:55,w:210,h:270,f:"wood"},
{name:"SPAZIO A",x:840,y:365,w:300,h:185,f:"stone"},{name:"BAGNI",x:840,y:585,w:180,h:125,f:"tile"},{name:"RIFUGIO DIGITALE",x:1040,y:585,w:180,h:125,f:"wood"},
{name:"SALA MEET CAPO",x:1290,y:400,w:280,h:290,f:"wood"},{name:"INGRESSO / SEGRETERIA",x:410,y:735,w:345,h:130,f:"stone"},{name:"CUCINA",x:840,y:735,w:285,h:130,f:"tile"},{name:"STAMPANTI",x:1145,y:735,w:285,h:130,f:"stone"}];
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
 {x:1260,y:665,w:205,h:95},      // raccordo sala meet capo
 {x:805,y:540,w:485,h:165},             // V5.2: corridoio continuo Spazio A / Bagni / Rifugio
 {x:1180,y:380,w:125,h:325},            // V5.2: dorsale destra continua
 {x:760,y:520,w:115,h:210}              // V5.2: raccordo centrale senza "vuoto nero"
,
 {x:245,y:265,w:58,h:430},        // V2.6.2 LEFT SPINE: black gap beside BIM / IT
 {x:245,y:675,w:110,h:85}         // raccordo sinistro verso corridoio basso
];
const doors=[
 // EDITORIA -> corridoio
 {x:245,y:235,w:75,h:105},
 // CENTRALE -> corridoio
 {x:455,y:235,w:85,h:105},
 // SERVER -> dorsale centrale
 {x:710,y:180,w:145,h:105},
 // BIM -> corridoio alto e LOFT -> corridoio basso
 {x:205,y:330,w:95,h:120},{x:205,y:595,w:95,h:130},
 // IT -> corridoio alto, dorsale, corridoio basso
 {x:285,y:265,w:105,h:105},{x:700,y:300,w:155,h:130},{x:690,y:610,w:165,h:135},
 // SALA MEET -> dorsale centrale
 {x:800,y:210,w:105,h:135},
 // CONTRATTI -> corridoio alto dx
 {x:1020,y:260,w:100,h:130},
 // RENDERISTI -> corridoio alto dx
 {x:1190,y:255,w:120,h:140},
 // SPAZIO A -> corridoio alto dx + dorsale destra
 {x:805,y:350,w:105,h:125},{x:1095,y:430,w:150,h:130},
 // BAGNI / RIFUGIO -> corridoio basso dx
 {x:805,y:620,w:105,h:135},{x:900,y:665,w:110,h:105},{x:1080,y:660,w:120,h:110},
 // SALA MEET CAPO -> dorsale destra / raccordo basso
 {x:1240,y:500,w:115,h:135},{x:1240,y:640,w:130,h:125},
 // INGRESSO -> corridoio basso sinistra + dorsale
 {x:650,y:675,w:150,h:130},{x:735,y:735,w:120,h:125},
 // CUCINA / STAMPANTI -> corridoio basso dx
 {x:805,y:720,w:120,h:140},{x:1080,y:710,w:120,h:150},{x:1370,y:710,w:100,h:150}
,
 {x:235,y:245,w:80,h:85},          // EDITORIA / upper corridor -> LEFT SPINE
 {x:215,y:345,w:95,h:105},         // BIM -> LEFT SPINE
 {x:215,y:565,w:95,h:135},         // IT -> LEFT SPINE
 {x:235,y:655,w:125,h:125}         // LEFT SPINE -> lower corridor
];
const EXTERIOR_DOOR={x:605,y:845,w:100,h:65};
doors.push(EXTERIOR_DOOR);
const walkZones=[...roomFloors,...corridors,...doors];
const obstacles=[
{x:385,y:420,w:290,h:42},{x:385,y:350,w:245,h:35},{x:75,y:145,w:155,h:45},{x:340,y:145,w:120,h:55},{x:565,y:115,w:150,h:90},
{x:75,y:385,w:125,h:55},{x:75,y:600,w:125,h:23},{x:885,y:160,w:105,h:115},{x:1080,y:155,w:100,h:60},{x:1280,y:155,w:125,h:70},{x:890,y:435,w:190,h:60},{x:1330,y:495,w:185,h:85},{x:885,y:775,w:180,h:55},{x:1190,y:775,w:190,h:60}
];
const points=[
{x:155,y:205,room:"EDITORIA",kind:"PC"},{x:400,y:205,room:"IT",kind:"PC"},{x:640,y:205,room:"SERVER",kind:"SERVER"},{x:140,y:450,room:"BIM",kind:"PC"},{x:140,y:660,room:"IT",kind:"PC"},
{x:535,y:560,room:"CENTRALE",kind:"PC"},{x:940,y:285,room:"SALA MEET",kind:"MEETING"},{x:1135,y:285,room:"THE BUNKER",kind:"PC"},{x:1345,y:285,room:"RENDERISTI",kind:"PC"},{x:1010,y:520,room:"SPAZIO A",kind:"MEETING"},
{x:1120,y:680,room:"RIFUGIO DIGITALE",kind:"PC"},{x:1430,y:650,room:"SALA MEET CAPO",kind:"MEETING"},{x:1020,y:835,room:"CUCINA",kind:"COFFEE"},{x:1290,y:835,room:"STAMPANTI",kind:"PRINTER"}];
const bosses=["DIREZIONE","PRESIDENZA","CAPO ASSOLUTO"];
const questionBanks={"MAC_ADOBE": [["Creative Cloud su macOS mostra l'utente disconnesso. Primo controllo?", ["Verificare sessione Adobe, rete e stato Creative Cloud", "Cancellare la cartella System", "Resettare il domain controller", "Cambiare VLAN"], 0], ["InDesign segnala font mancanti aprendo un progetto. Cosa verifichi?", ["Font richiesti, attivazione Adobe Fonts e Font Book", "DNS del server", "Driver GPU del server", "Spooler Windows"], 0], ["Photoshop non vede più un disco di memoria virtuale disponibile. Primo controllo?", ["Spazio libero e impostazioni Scratch Disks", "GPO Windows", "Porta HDMI", "Licenza Revit"], 0], ["Illustrator apre un file con collegamenti mancanti. Cosa controlli?", ["Percorsi e file collegati nel pannello Links", "DHCP", "Account Autodesk", "Firmware switch"], 0], ["Acrobat non stampa correttamente un PDF complesso. Primo test?", ["Provare stampa come immagine/altro PDF e verificare driver/coda", "Formattare il Mac", "Cambiare DNS aziendale", "Resettare Revit"], 0], ["Creative Cloud resta bloccato su sincronizzazione. Approccio corretto?", ["Controllare rete, account, stato servizi e log prima del reset", "Cancellare tutti i file Adobe", "Spegnere il NAS", "Cambiare monitor"], 0], ["Un Mac non monta una share SMB che gli altri vedono. Primo controllo?", ["Connettività, percorso smb:// e credenziali", "Reinstallare Photoshop", "Cambiare mouse", "Reset Pixera"], 0], ["InDesign esporta un PDF con immagini a bassa qualità. Cosa controlli?", ["Preset di esportazione e risoluzione delle immagini sorgenti", "DNS", "Bluetooth", "GPO"], 0], ["Font Book segnala un font duplicato. Cosa fai?", ["Valuti duplicati e disattivi/rimuovi quello errato", "Riavvii il server", "Resetti Desktop Connector", "Cambi IP"], 0], ["Un Mac ha pochissimo spazio libero e Adobe è lento. Prima azione?", ["Individuare cosa occupa spazio e liberare cache/file sicuri", "Cancellare /System", "Spegnere lo switch", "Cambiare VLAN"], 0], ["Photoshop non usa correttamente l'accelerazione grafica. Cosa verifichi?", ["Impostazioni GPU, compatibilità e aggiornamenti", "Permessi stampante", "DNS reverse", "Pixera"], 0], ["Un PDF esportato da InDesign ha font sostituiti. Causa probabile?", ["Font non disponibili/incorporabili o sostituiti nel documento", "Gateway errato", "Cavo HDMI", "DHCP esaurito"], 0]], "WORKSTATION": [["Una HP Z non naviga ma le altre sì. Primo controllo?", ["IP, gateway, DNS e link della singola workstation", "Riavviare tutti i server", "Formattare", "Cambiare switch core"], 0], ["Revit è molto lento solo su una workstation. Primo approccio?", ["Verificare risorse, modello, add-in e stato locale prima di interventi invasivi", "Reset dominio", "Cambiare stampante", "Spegnere NAS"], 0], ["Desktop Connector non sincronizza su un solo PC. Cosa controlli?", ["Account, stato client, cache e log", "Cancellare il progetto cloud", "Cambiare GPU", "Riavviare DHCP"], 0], ["Windows mostra disco C quasi pieno. Prima azione?", ["Analizzare occupazione e pulire file/cache sicuri", "Cancellare Windows", "Reset DNS", "Disinstallare driver rete"], 0], ["Una HP Z non vede il secondo monitor. Primo controllo?", ["Input, cavo, porta GPU e rilevamento display", "Active Directory", "Licenza Adobe", "Spooler"], 0], ["Office chiede continuamente autenticazione. Cosa controlli?", ["Account, token/credenziali e connettività ai servizi", "HDMI", "Driver plotter", "Pixera"], 0], ["Un'applicazione si chiude solo per un utente Windows. Primo test?", ["Verificare profilo, log evento e riproducibilità", "Riavviare tutti gli switch", "Cambiare VLAN globale", "Formattare server"], 0], ["La workstation non riceve policy aggiornate. Cosa puoi verificare?", ["Connettività dominio e gpupdate /force con eventuali errori", "Photoshop", "HDMI", "Toner"], 0], ["Il PC è acceso da molti giorni e ha comportamenti strani. Informazione utile?", ["Uptime e stato aggiornamenti prima di riavviare", "Numero di PDF", "Luminosità TV", "Pixera"], 0], ["Una periferica USB non viene rilevata. Primo approccio?", ["Provare porta/cavo/periferica e Gestione dispositivi", "Cambiare DNS", "Reset Autodesk", "Spegnere server"], 0], ["Revit non trova una stampante che Windows vede. Cosa controlli?", ["Driver, stampante predefinita e sessione/app", "DHCP server", "Adobe Fonts", "HDMI"], 0], ["Desktop Connector mostra file in conflitto. Cosa fai?", ["Identificare versione/stato sync prima di sovrascrivere", "Cancellare entrambe le copie", "Reset dominio", "Cambiare GPU"], 0]], "NETWORK": [["Ping IP funziona ma il nome server no. Sospetto principale?", ["DNS", "GPU", "HDMI", "Bluetooth"], 0], ["Più utenti perdono una share nello stesso momento. Priorità?", ["Capire ampiezza e verificare rete/server/servizio", "Formattare un client", "Cambiare mouse", "Reinstallare Adobe"], 0], ["Un client ha indirizzo 169.254.x.x. Cosa indica spesso?", ["Mancata assegnazione DHCP", "Errore GPU", "Problema PDF", "Licenza Autodesk"], 0], ["La rete cablata cade solo su una postazione. Primo controllo?", ["Cavo, presa, link e configurazione NIC", "Riavvio domain controller", "Reset Pixera", "Cambiare toner"], 0], ["Gateway risponde ma Internet no su più PC. Cosa verifichi?", ["DNS, routing/firewall e connettività a monte", "Mouse", "InDesign", "Monitor"], 0], ["Una share funziona per tutti tranne un utente. Cosa controlli?", ["Permessi, credenziali, mapping e connettività utente", "Switch core subito", "Formattare server", "HDMI"], 0], ["Una porta di rete non dà link. Primo test?", ["Cavo/patch/porta switch e stato fisico", "Adobe Fonts", "Revit cache", "Spooler"], 0], ["Connessione intermittente verso un server. Dato utile?", ["Ping continuo/log/perdita pacchetti e percorso", "Colore desktop", "Versione Acrobat", "Toner"], 0], ["DNS risolve un IP vecchio. Possibile causa?", ["Record/cache DNS non aggiornati", "GPU", "USB", "HDMI"], 0], ["Un servizio è raggiungibile localmente ma non dai client. Cosa controlli?", ["Firewall, binding, porta e routing", "Font Book", "Stampante USB", "Luminosità"], 0], ["Due dispositivi hanno lo stesso IP. Sintomo possibile?", ["Connettività intermittente/conflitto ARP", "PDF sgranati", "Revit lento", "Audio basso"], 0], ["Wi‑Fi funziona ma Ethernet no su un PC. Primo confronto?", ["Configurazione NIC, link e IP delle due interfacce", "Reset dominio", "Pixera", "Adobe"], 0]], "MEETING": [["TV accesa ma nessuna immagine dal PC. Primo controllo?", ["Input selezionato, sorgente e cavo HDMI", "DNS", "Revit", "Spooler"], 0], ["Zoom vede video ma non sente il microfono. Cosa controlli?", ["Dispositivo input e permessi microfono", "DHCP", "Adobe Fonts", "Plotter"], 0], ["Teams usa l'altoparlante sbagliato. Dove intervieni?", ["Selezione dispositivo audio in Teams/sistema", "DNS server", "Desktop Connector", "Pixera"], 0], ["Il mirroring non trova il display. Primo approccio?", ["Rete, receiver e compatibilità/stato servizio", "Formattare PC", "Reset dominio", "Cambiare toner"], 0], ["La webcam non compare nell'app meeting. Primo test?", ["Permessi, collegamento e altra app che la sta usando", "Revit cache", "DNS reverse", "Adobe"], 0], ["Immagine HDMI presente ma senza audio. Cosa controlli?", ["Output audio selezionato e capacità HDMI/display", "DHCP", "Stampante", "Font"], 0], ["Presentazione tagliata ai bordi sul TV. Cosa verifichi?", ["Risoluzione/scaling/aspect ratio", "Account Autodesk", "Spooler", "Gateway"], 0], ["Il telecomando della sala non risponde. Primo controllo?", ["Batterie e puntamento/stato dispositivo", "DNS", "Revit", "Creative Cloud"], 0], ["Il display cambia input da solo. Cosa indaghi?", ["Auto input/CEC/configurazione professionale", "Font Book", "DHCP", "Toner"], 0], ["Audio in videoconferenza produce eco. Prima correzione?", ["Evitare doppi microfoni/speaker e verificare dispositivi attivi", "Cambiare VLAN", "Reset Adobe", "Reinstallare Revit"], 0], ["PC collegato via USB-C non manda video. Cosa verifichi?", ["Supporto video della porta/adattatore e cavo", "DNS", "Spooler", "Licenza Acrobat"], 0], ["Sala meeting offline ma PC naviga. Cosa controlli?", ["IP/rete del dispositivo AV e servizio receiver", "Formattare PC", "Cambiare mouse", "Reset font"], 0]], "SERVER": [["Un servizio server non risponde. Primo approccio?", ["Verificare host, rete, servizio e log", "Riavviare tutto senza verifiche", "Cancellare DNS", "Cambiare monitor"], 0], ["Spazio disco server quasi esaurito. Prima azione?", ["Identificare volumi/cartelle in crescita e causa", "Cancellare log a caso", "Formattare", "Spegnere switch"], 0], ["Molti utenti non autenticano. Cosa controlli?", ["Servizi dominio, DNS, connettività e log", "HDMI", "Adobe", "Toner"], 0], ["Una share server è improvvisamente read-only. Cosa verifichi?", ["Permessi, filesystem/spazio e stato servizio", "GPU client", "Pixera", "Bluetooth"], 0], ["Backup segnala fallimento. Primo passo?", ["Leggere errore/log e verificare destinazione/spazio/connettività", "Ignorarlo", "Cancellare backup precedenti subito", "Riavviare ogni PC"], 0], ["Server raggiungibile via IP ma non hostname. Cosa controlli?", ["DNS", "GPU", "USB", "Adobe Fonts"], 0], ["CPU server al 100%. Prima di terminare processi?", ["Identificare processo/carico e raccogliere evidenze", "Spegnere server", "Cancellare profili", "Cambiare VLAN"], 0], ["Un volume storage è degradato. Priorità?", ["Verificare stato array/dischi e protezione dati", "Reinstallare Office", "Reset TV", "Cambiare mouse"], 0], ["Un servizio si arresta ripetutamente. Cosa cerchi?", ["Event log/log applicativo, dipendenze e causa", "Toner", "HDMI", "Font"], 0], ["Una porta TCP applicativa non risponde. Cosa verifichi?", ["Servizio in ascolto, firewall e percorso rete", "Photoshop", "Mouse", "Display"], 0], ["Permessi di una cartella sono cambiati. Prima azione?", ["Verificare ACL, audit e modifica prima di sovrascrivere", "Formattare server", "Reset DHCP", "Cambiare monitor"], 0], ["Dopo un riavvio un servizio non parte automaticamente. Cosa controlli?", ["Startup type, dipendenze e log di avvio", "Adobe", "HDMI", "Stampante"], 0]], "PRINT": [["Stampante di rete offline per tutti. Primo controllo?", ["Alimentazione, rete/IP e raggiungibilità", "Formattare client", "Reset dominio", "Revit"], 0], ["Coda di stampa bloccata su un PC. Cosa controlli?", ["Coda/spooler e job problematico", "DNS globale", "Pixera", "Adobe Fonts"], 0], ["Plotter stampa formato errato. Cosa verifichi?", ["Formato carta, driver e impostazioni applicazione", "DHCP", "Account Autodesk", "GPU server"], 0], ["PDF esce con caratteri strani. Primo test?", ["Altro PDF/driver e incorporamento font", "Reset switch", "Cambiare VLAN", "Revit cache"], 0], ["Solo un utente non vede la stampante condivisa. Cosa controlli?", ["Connessione/mapping, driver e permessi utente", "Spegnere server", "HDMI", "Pixera"], 0], ["Stampante ha IP diverso dal configurato sul PC. Soluzione?", ["Correggere porta TCP/IP o indirizzamento", "Formattare PC", "Reset Adobe", "Cambiare mouse"], 0], ["Job enorme blocca la coda. Approccio?", ["Identificare/rimuovere job e verificare spooler", "Riavviare dominio", "Cancellare DNS", "Spegnere NAS"], 0], ["Stampa molto lenta da un solo file. Cosa confronti?", ["Complessità file, driver e stampa come immagine", "DHCP", "Revit licensing", "Bluetooth"], 0], ["Plotter segnala carta ma il rotolo è presente. Primo controllo?", ["Caricamento/sensori/formato selezionato", "DNS", "Adobe", "Windows Update"], 0], ["Colori molto diversi in stampa. Cosa indaghi?", ["Profilo colore, driver e impostazioni applicazione", "Gateway", "Active Directory", "Pixera"], 0], ["Driver vecchio causa crash applicazione. Cosa fai?", ["Verificare/aggiornare driver compatibile", "Reset dominio", "Cancellare share", "Cambiare HDMI"], 0], ["Stampante risponde al ping ma Windows la mostra offline. Cosa controlli?", ["Porta, SNMP/stato, spooler e driver", "DNS soltanto", "GPU", "Font Book"], 0]], "PIXERA": [["Un monitor del Rifugio Digitale è nero. Primo controllo?", ["Alimentazione, input, segnale e player/Pixera", "Domain controller", "Revit", "Spooler"], 0], ["Pixera vede il player ma non manda contenuto. Cosa controlli?", ["Timeline/output/mapping e stato del player", "Adobe Fonts", "DHCP client casuale", "Mouse"], 0], ["Due display non sono sincronizzati. Cosa indaghi?", ["Sync, rete, timing e configurazione output", "Revit cache", "Toner", "Office"], 0], ["Il contenuto ha risoluzione errata. Cosa controlli?", ["Canvas/output resolution e mapping display", "DNS reverse", "Account Windows", "Stampante"], 0], ["Un player Pixera risulta offline. Primo test?", ["Rete/IP, alimentazione e servizio player", "Photoshop", "HDMI del laptop", "GPO"], 0], ["Il monitor mostra desktop invece del contenuto. Cosa verifichi?", ["Output assegnato/fullscreen e configurazione player", "DHCP server", "Revit", "Toner"], 0], ["Contenuto scatta su un display. Cosa controlli?", ["Prestazioni player, codec/media e rete", "Font Book", "Spooler", "Mouse"], 0], ["Pixera perde connessione dopo standby display. Cosa indaghi?", ["Power management, rete e handshake/output", "Adobe", "DNS cache client", "Revit"], 0], ["Un file media non viene riprodotto. Primo controllo?", ["Codec/formato, percorso e accessibilità del file", "Domain controller", "Stampante", "USB mouse"], 0], ["Display wall mostra ordine sbagliato. Cosa correggi?", ["Mapping/assegnazione output", "DNS", "Creative Cloud", "DHCP"], 0], ["Tutti i display diventano neri insieme. Priorità?", ["Verificare player/master, rete e distribuzione segnale", "Cambiare ogni monitor", "Reset font", "Revit"], 0], ["Pixera segnala media missing. Cosa fai?", ["Verificare percorso, storage e relink dei media", "Formattare player", "Reset dominio", "Cambiare toner"], 0]], "IT": [["Devi diagnosticare un PC lento. Quale dato raccogli per primo?", ["CPU/RAM/disco, uptime e processi", "Colore wallpaper", "Numero di monitor", "Versione PDF"], 0], ["Un utente non riesce a fare login. Primo approccio?", ["Verificare errore, rete, account e dominio", "Formattare PC", "Cambiare HDMI", "Reset Pixera"], 0], ["gpupdate /force restituisce errore. Cosa fai?", ["Leggere errore e verificare connettività/DNS/dominio", "Cancellare Windows", "Reset Adobe", "Cambiare stampante"], 0], ["Devi liberare spazio senza rischiare dati utente. Approccio?", ["Analizzare e pulire cache/temp sicure, non dati di lavoro", "Cancellare Desktop", "Formattare", "Eliminare profilo"], 0], ["Un software non parte dopo aggiornamento. Primo controllo?", ["Log/errore, compatibilità e dipendenze", "Riavviare switch", "Cambiare VLAN", "Toner"], 0], ["Devi capire se un servizio remoto risponde su una porta. Cosa verifichi?", ["Connettività host e test della porta specifica", "Photoshop", "HDMI", "Font"], 0], ["Utente ha password scaduta. Intervento corretto?", ["Gestire reset/cambio secondo policy e verificare account", "Creare account condiviso", "Disabilitare dominio", "Formattare"], 0], ["PC non applica una nuova configurazione. Cosa confronti?", ["Policy/config effettiva, log e riavvio se necessario", "Toner", "Pixera", "Illustrator"], 0], ["Un'app richiede admin per funzionare. Prima di concederlo?", ["Capire requisito e trovare soluzione a minimo privilegio", "Dare Domain Admin", "Disabilitare UAC ovunque", "Condividere password IT"], 0], ["Un utente segnala 'Internet rotto'. Prima domanda utile?", ["Capire cosa non funziona e se riguarda altri servizi/utenti", "Formattare", "Reset server", "Cambiare monitor"], 0], ["Devi riavviare un PC remoto dopo intervento. Cosa è importante?", ["Verificare lavoro utente e comunicare prima del riavvio", "Spegnere senza avviso", "Cancellare profilo", "Cambiare IP"], 0], ["Un errore compare dopo login solo per un utente. Cosa sospetti tra le prime cose?", ["Profilo/configurazione utente o startup specifico", "Switch core", "Pixera", "Plotter"], 0]]};
const questionDecks={};
function categoryForStation(s){
 if(!s)return "IT";
 if(!s)return "WORKSTATION";
 if(s.room==="EDITORIA"||s.room==="THE BUNKER")return "MAC_ADOBE";
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
 {id:"pao",name:"PAO",role:"BIMER",x:250,y:620,tone:"mixed",shirt:"#536f8b",hunter:true},
 {id:"zia",name:"ZIA ALE",role:"SEGRETERIA",x:685,y:815,tone:"good",shirt:"#765d78"},
 {id:"don",name:"DON",role:"JOLLY",x:895,y:815,tone:"good",shirt:"#566a51",hunter:true},{id:"hr",name:"HR",role:"PEOPLE",x:405,y:205,homeX:405,homeY:205,tone:"good",shirt:"#6f6258",hunter:false,speed:48,state:"idle"},{id:"manager",name:"IT MANAGER",role:"IT // DISPATCH",x:650,y:800,homeX:190,homeY:640,tone:"neutral",shirt:"#5d6570",hunter:false,speed:58,state:"outside"}];
const ambientNames=["ALE","CRI","RIDER","FABI","GIADA","TOM","LUCA","MARTI","SARA","NICO","VALE","ANNA","MARCO","ELI"];

const npcRelations={};
function ensureRelation(n){if(!n||!n.id)return 0;if(npcRelations[n.id]===undefined)npcRelations[n.id]=0;return npcRelations[n.id]}
function relationTier(n){const v=ensureRelation(n);return v>=45?"friend":v<=-45?"enemy":"neutral"}
function changeRelation(n,d){if(!n||!n.id)return;ensureRelation(n);npcRelations[n.id]=Math.max(-100,Math.min(100,npcRelations[n.id]+d));toast(`${n.name||"NPC"} // RAPPORTO ${d>0?"+":""}${d}`)}
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
function spawnAmbient(){
 const seats=stations.filter(s=>["HP Z","MAC"].includes(s.type));
 ambientNPCs=seats.map((s,i)=>({
   name:ambientNames[i%ambientNames.length],homeX:s.x,homeY:s.y+24,x:s.x,y:s.y+24,
   state:"work",timer:12+Math.random()*32,speed:52,shirt:["#4f6259","#665747","#4d596b","#6b4e57"][i%4],
   route:[],routeIndex:0
 }));
}
const officeWaypoints=[
 {x:330,y:300},{x:330,y:700},{x:700,y:700},{x:900,y:700},{x:1050,y:700},
 {x:900,y:800},{x:1000,y:815}
];
function buildRoute(n,toKitchen){
 const central=n.homeX>=360&&n.homeX<=690&&n.homeY>=380&&n.homeY<=590;
 const left=n.homeX<300;

 if(toKitchen){
   if(central){
     // Dentro CENTRALE: scendi sotto le scrivanie, raggiungi la porta in basso a destra,
     // poi entra nel corridoio inferiore.
     return [
       {x:n.homeX,y:560},{x:670,y:560},{x:700,y:610},
       {x:700,y:675},{x:780,y:705},{x:900,y:705},{x:900,y:805},{x:990,y:815}
     ];
   }
   if(left){
     return [
       {x:250,y:n.homeY},{x:250,y:675},{x:350,y:705},
       {x:700,y:705},{x:900,y:705},{x:900,y:805},{x:990,y:815}
     ];
   }
   return [
     {x:n.homeX,y:675},{x:1100,y:705},{x:900,y:705},{x:900,y:805},{x:990,y:815}
   ];
 }

 if(central){
   return [
     {x:900,y:805},{x:900,y:705},{x:780,y:705},{x:700,y:675},
     {x:700,y:610},{x:670,y:560},{x:n.homeX,y:560},{x:n.homeX,y:n.homeY}
   ];
 }
 if(left){
   return [
     {x:900,y:805},{x:900,y:705},{x:700,y:705},{x:350,y:705},
     {x:250,y:675},{x:250,y:n.homeY},{x:n.homeX,y:n.homeY}
   ];
 }
 return [
   {x:900,y:805},{x:900,y:705},{x:1100,y:705},
   {x:n.homeX,y:675},{x:n.homeX,y:n.homeY}
 ];
}
function moveNpcRoute(n,dt){
 if(!n.route.length||n.routeIndex>=n.route.length)return true;
 const p=n.route[n.routeIndex],dx=p.x-n.x,dy=p.y-n.y,d=Math.hypot(dx,dy);

 if(d<9){
   n.x=p.x;n.y=p.y;n.routeIndex++;n.blockedFor=0;
   return n.routeIndex>=n.route.length;
 }

 const step=n.speed*dt;
 let moved=false;
 const tryX=()=>{
   const sx=Math.sign(dx)*Math.min(Math.abs(dx),step);
   if(playerCanMove(n.x,n.y,n.x+sx,n.y)){n.x+=sx;moved=true}
 };
 const tryY=()=>{
   const sy=Math.sign(dy)*Math.min(Math.abs(dy),step);
   if(playerCanMove(n.x,n.y,n.x,n.y+sy)){n.y+=sy;moved=true}
 };
 if(Math.abs(dx)>Math.abs(dy)){tryX();tryY()}else{tryY();tryX()}

 if(!moved){
   n.blockedFor=(n.blockedFor||0)+dt;
   // non restare eternamente contro una parete
   if(n.blockedFor>1.5){n.routeIndex++;n.blockedFor=0}
 }else n.blockedFor=0;

 return n.routeIndex>=n.route.length;
}
function npcDestinationForActivity(n,activity){
 if(activity==="meeting")return {x:925+Math.random()*55,y:215+Math.random()*55,room:"SALA MEET"};
 if(activity==="printer")return {x:1240+Math.random()*65,y:790+Math.random()*25,room:"STAMPANTI"};
 if(activity==="gallery")return {x:1080+Math.random()*80,y:650+Math.random()*30,room:"RIFUGIO DIGITALE"};
 if(activity==="coffee")return {x:920+Math.random()*110,y:810+Math.random()*25,room:"CUCINA"};
 if(activity==="bathroom")return {x:900+Math.random()*55,y:650+Math.random()*20,room:"BAGNI"};
 return {x:n.homeX,y:n.homeY,room:"HOME"};
}
function routeViaHub(n,target){
 target=safePoint(target,{x:n?.x||820,y:n?.y||705,room:"CORRIDOIO"});
 // Safe hub corridor system. The existing door/collision logic validates each segment.
 const route=[];
 const central=n.x>=350&&n.x<=720&&n.y>=360&&n.y<=650;
 const left=n.x<310;
 if(central)route.push({x:n.x,y:560},{x:690,y:560},{x:710,y:675});
 else if(left)route.push({x:250,y:n.y},{x:250,y:690},{x:350,y:705});
 else route.push({x:n.x,y:700});
 route.push({x:760,y:705},{x:900,y:705});
 if(target.room==="SALA MEET")route.push({x:900,y:300},{x:target.x,y:target.y});
 else if(target.room==="RIFUGIO DIGITALE")route.push({x:1020,y:705},{x:target.x,y:target.y});
 else if(target.room==="STAMPANTI")route.push({x:1100,y:705},{x:1200,y:760},{x:target.x,y:target.y});
 else if(target.room==="BAGNI")route.push({x:850,y:705},{x:850,y:650},{x:target.x,y:target.y});
 else route.push({x:900,y:805},{x:target.x,y:target.y});
 return route;
}
function generateNpcActivityTicket(n){
 if(n.activityTicket||tickets.length>=difficultyConfig[difficulty].maxTickets||isLunch())return;
 let p,type,level="LOW";
 if(n.activity==="meeting"){
   p=stations.find(s=>s.room==="SALA MEET");type=["AV","CABLE"][Math.floor(Math.random()*2)];level=Math.random()<.35?"MEDIUM":"LOW";
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
 if(isLunch())return; // lunch positions are controlled absolutely by updateLunchState()
 for(const n of ambientNPCs){
   if(n.id==="hr"){n.state="work";n.x=n.homeX;n.y=n.homeY;continue}
   n.timer-=dt;
   if(n.state==="work"&&n.timer<=0){
     const r=Math.random();
     n.activity=r<.24?"coffee":r<.44?"meeting":r<.61?"printer":r<.72?"gallery":r<.82?"bathroom":"wander";
     if(n.activity==="wander"){n.timer=8+Math.random()*16;continue}
     n.target=npcDestinationForActivity(n,n.activity);
     n.route=routeViaHub(n,n.target);n.routeIndex=0;n.state="activityTravel";n.activityTicket=false;
   }else if(n.state==="activityTravel"){
     ambientCorridorEncounter(n);
     if(moveNpcRoute(n,dt)){n.state="activity";n.timer=10+Math.random()*14}
   }else if(n.state==="activity"){
     if(n.activity!=="bathroom"&&n.activity!=="coffee"&&n.timer<7&&!n.activityTicket&&Math.random()<.05)generateNpcActivityTicket(n);
     if(n.timer<=0){
       n.state="return";n.route=buildRoute(n,false);n.routeIndex=0;
     }
   }else if(n.state==="return"){
     if(moveNpcRoute(n,dt)){n.x=n.homeX;n.y=n.homeY;n.state="work";n.activity=null;n.timer=20+Math.random()*45}
   }
 }
}
let npcs=[],mokasa=null,npcCooldown={},mokasaTimer=0,lastZiaHour=-1,idleMinutes=0,lastPlayerPos={x:0,y:0};
let phoneQueue=[],visualAnomaly=null,inventory=[],carryMission=null,encounterLock=false;
let pendingOffers={};
let firstCarryTriggered=false;

function pokemonEncounter(n){
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
 const box=$("#phoneNotification"); if(!box)return;
 $("#phoneSender").textContent=sender;$("#phoneText").textContent=text;
 box.classList.add("on");clearTimeout(box._t);
 const important=["ZIA ALE","IT MANAGER","CAPO","DIREZIONE","IT TASK"].includes(sender);
 const duration=important?10000:5200;
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
   m={label:"CONSEGNA",item:"CHIAVETTA USB",pickup:{x:160,y:640,room:"IT"},to:{x:rec.x,y:rec.y,room:"CENTRALE"},recipient:rec,targetType:"npc"};
 }else if(r<.43){
   const rec=availableRecipient();
   m={label:"ASSEGNAZIONE",item:"CUFFIE",pickup:{x:115,y:640,room:"IT"},to:{x:rec.x,y:rec.y,room:"POSTAZIONE"},recipient:rec,targetType:"npc"};
 }else if(r<.58){
   m={label:"CONSEGNA",item:"ADATTATORE USB-C / HDMI",pickup:{x:200,y:640,room:"IT"},to:{x:925,y:205,room:"SALA MEET"},targetType:"meeting"};
 }else if(r<.72){
   const rec=availableRecipient("CENTRALE");
   m={label:"CONSEGNA",item:"MOUSE USB",pickup:{x:185,y:640,room:"IT"},to:{x:rec.homeX,y:rec.homeY,room:"CENTRALE"},recipient:rec,targetType:"npc"};
 }else if(r<.84){
   const rec=availableRecipient();
   m={label:"CONSEGNA",item:"TASTIERA USB",pickup:{x:150,y:640,room:"IT"},to:{x:rec.homeX,y:rec.homeY,room:"POSTAZIONE"},recipient:rec,targetType:"npc"};
 }else if(r<.93){
   m={label:"CONSEGNA",item:"CAVO ETHERNET",pickup:{x:205,y:640,room:"IT"},to:{x:640,y:190,room:"SERVER"},targetType:"server"};
 }else{
   m={label:"CONSEGNA",item:"ALIMENTATORE",pickup:{x:180,y:640,room:"IT"},to:{x:1030,y:480,room:"SPAZIO A"},targetType:"meeting"};
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
   pickup:{x:115,y:640,room:"IT"},
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
function interactCarry(){
 if(!carryMission)return false;
 const target=carryTarget();
 if(!target||Math.hypot(player.x-target.x,player.y-target.y)>72)return false;

 if(carryMission.stage==="pickup"){
   if(inventory.length>=3){toast("INVENTARIO PIENO");return true}
   inventory.push(carryMission.item);
   carryMission.stage="deliver";
   updateInventoryUI();
   const dest=carryMission.recipient?`${carryMission.recipient.name}`:safeRoom(carryMission.to,"POSTAZIONE");
   phoneMessage("IT TASK",`${carryMission.item} raccolto. Consegnalo a ${dest}.`);
   return true;
 }

 const idx=inventory.indexOf(carryMission.item);
 if(idx<0){toast("NON HAI L'OGGETTO RICHIESTO");return true}
 inventory.splice(idx,1);
 state.xp+=180;state.solved++;state.stress=Math.max(0,state.stress-3);
 const recipient=carryMission.recipient?` A ${carryMission.recipient.name}`:"";
 toast(`CONSEGNA COMPLETATA${recipient} // +180 XP`);
 carryMission=null;
 updateInventoryUI();
 return true;
}
function carryPrompt(){
 if(!carryMission)return null;
 const target=carryTarget();
 if(!target||Math.hypot(player.x-target.x,player.y-target.y)>95)return null;
 if(carryMission.stage==="pickup")return `E — RACCOGLI ${carryMission.item}`;
 return carryMission.recipient?`E — CONSEGNA ${carryMission.item} A ${carryMission.recipient.name}`:`E — CONSEGNA ${carryMission.item}`;
}

function spawnNPCs(){
 npcs=npcDefs.map(n=>({...n}));spawnAmbient();mokasa=null;npcCooldown={};mokasaTimer=0;lastZiaHour=-1;
 lastPlayerPos={x:player.x,y:player.y};idleMinutes=0;
}
function nearestNPC(){
 const all=mokasa?[...npcs,mokasa]:npcs;
 return all.map(n=>({n,d:Math.hypot(player.x-n.x,player.y-n.y)})).sort((a,b)=>a.d-b.d)[0];
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
 if(pendingOffers[n.id])return;
 let offer;
 if(n.id==="pao"){
   const opts=[
    {title:"CAFFÈ",stress:-8,xp:4,text:"Ho un caffè e due minuti di tregua."},
    {title:"CALCIO",stress:-6,xp:6,text:"Due chiacchiere sul calcio."},
    {title:"RASSINA",stress:-7,xp:5,text:"Ti devo raccontare una cosa."}
   ];
   offer=opts[Math.floor(Math.random()*opts.length)];
 }else if(n.id==="don"){
   const opts=[
    {title:"SIGARETTA",stress:-11,xp:3,text:"Ti porto fuori due minuti."},
    {title:"CAFFÈ",stress:-8,xp:4,text:"Passa da me quando mi vedi."},
    {title:"CHIACCHIERE",stress:-6,xp:5,text:"Ho una cosa da dirti."}
   ];
   offer=opts[Math.floor(Math.random()*opts.length)];
 }else if(n.id==="zia"){
   const opts=[
    {title:"CAFFÈ",stress:-10,xp:2,text:"Quando puoi passa da me in Segreteria."},
    {title:"PILLOLA DI SAGGEZZA",rep:1,text:"Quando puoi passa da me in Segreteria."},
    {title:"TI COPRO IO",time:12,text:"Quando puoi passa da me in Segreteria."}
   ];
   offer=opts[Math.floor(Math.random()*opts.length)];
 }else return;
 pendingOffers[n.id]=offer;
 phoneMessage(n.name,offer.text);
 if(n.id==="don"){
   n.seeking=true;n.seekFor=16;n.lastHunt=state.min;
 }
}
function consumePendingOffer(n){
 const o=pendingOffers[n.id];if(!o)return false;
 delete pendingOffers[n.id];
 if(o.stress)state.stress=Math.max(0,state.stress+o.stress);
 if(o.xp)state.xp+=o.xp;
 if(o.rep)state.rep=Math.min(5,state.rep+o.rep);
 if(o.time){
   const t=[...tickets].sort((a,b)=>a.due-b.due)[0];
   if(t)t.due+=o.time;
 }
 clamp();hud();renderTickets();
 $("#modalBody").innerHTML=`<h2 class="low">${n.name} // ${o.title}</h2><p>${o.text}</p><p>BONUS RICEVUTO.</p>`;
 $("#modal").classList.remove("hidden");
 autoCloseModal(2100);
 npcCooldown[n.id]=state.min;
 return true;
}
function npcTalk(n){
 const now=state.min;
 if(consumePendingOffer(n))return;
 if((npcCooldown[n.id]??-999)+35>now){toast(`${n.name}: ci siamo già parlati.`);return}
 npcCooldown[n.id]=now;
 let title="",desc="",good=true;

 if(n.id==="pao"){
  if(Math.random()<.70){
   const topics=["FIORENTINA","RASSINA","CALCIO","CAFFÈ"];title=topics[Math.floor(Math.random()*topics.length)];
   state.stress=Math.max(0,state.stress-7);state.xp+=4;desc="STRESS -7 · XP +4";
  }else{
   title=Math.random()<.5?"REVIT":"DESKTOP CONNECTOR";good=false;newTicket(Math.random()<.6?"MEDIUM":"HIGH");
   desc="«Già che sei qui...» Nuova rogna BIM.";
  }
 }else if(n.id==="zia"){
  if(Math.random()<.80){
   const r=Math.random();
   if(r<.4){title="CAFFÈ";state.stress=Math.max(0,state.stress-10);desc="STRESS -10";}
   else if(r<.7){title="PILLOLA DI SAGGEZZA";state.rep=Math.min(5,state.rep+1);desc="REPUTAZIONE +1";}
   else{title="TI COPRO IO";let t=[...tickets].sort((a,b)=>a.due-b.due)[0];if(t)t.due+=12;desc="+12 MINUTI AL TICKET PIÙ URGENTE";}
  }else{title="PROBLEMA DA BOOMER";good=false;newTicket("LOW");desc="Nuova task LOW."}
 }else if(n.id==="don"){
  title=["CAFFÈ","DRITTA","PAUSA TATTICA"][Math.floor(Math.random()*3)];
  state.stress=Math.max(0,state.stress-8);state.xp+=6;desc="STRESS -8 · XP +6";
 }else if(n.id==="hr"){
  title=["CONSIGLIO","DRITTA","RESPIRA UN ATTIMO"][Math.floor(Math.random()*3)];
  const r=Math.random(); if(r<.45){state.stress=Math.max(0,state.stress-6);desc="Un buon consiglio al momento giusto. STRESS -6";} else if(r<.8){state.xp+=12;desc="Ti suggerisce come organizzare le priorità. XP +12";} else {state.rep=Math.min(5,state.rep+1);desc="Una parola buona gira per lo studio. REPUTAZIONE +1";}
 }else if(n.id==="manager"){
  title="DISPATCH";good=false;
  const levels=state.min>990?["HIGH","CRITICAL"]:["LOW","MEDIUM","HIGH"];const lv=levels[Math.floor(Math.random()*levels.length)];newTicket(lv,{source:"IT MANAGER"});desc=`«Mi hanno chiamato. Prendi questo: ${lv}.»`;
   }else if(n.id==="mokasa"&&n.court){
  title="RICHIESTA DIREZIONE // EXTREME";good=false;
  const ok=Math.random()<.38;
  if(ok){state.xp+=900;state.rep=Math.min(5,state.rep+1);desc="Hai gestito una richiesta impossibile. XP +900 · REPUTAZIONE +1";}
  else{state.stress+=18*difficultyConfig[difficulty].stressMult;state.incident+=12*difficultyConfig[difficulty].incidentMult;desc="La richiesta si complica. STRESS +18 · INCIDENT +12%";}
 }else if(n.id==="mokasa"){
  title="TI HA VISTO";good=false;
  if(Math.random()<.90){state.stress+=12*difficultyConfig[difficulty].stressMult;state.rep-=difficulty==='easy'?0:1;if(Math.random()<.4)newTicket("CRITICAL");desc="«Qui bisogna lavorare.» STRESS +12 · REPUTAZIONE -1";}
  else{state.rep=Math.min(5,state.rep+1);desc="Per una volta approva. REPUTAZIONE +1";}
 }
 clamp();hud();renderTickets();
 $("#modalBody").innerHTML=`<h2 class="${good?"low":"critical"}">${n.name} // ${title}</h2><p>${desc}</p>`;
 $("#modal").classList.remove("hidden");
 autoCloseModal(n.id==="mokasa"?2600:2100);
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
 ...[[405,405],[455,405],[505,405],[555,405],[605,405],[655,405],
     [405,480],[455,480],[505,480],[555,480],[605,480],[655,480]].map((p,i)=>({id:"C"+String(i+1).padStart(2,"0"),room:"CENTRALE",type:"HP Z",x:p[0],y:p[1]})),
 ...[[95,155],[145,155],[195,155],[120,205]].map((p,i)=>({id:"G"+String(i+1).padStart(2,"0"),room:"EDITORIA",type:"MAC",x:p[0],y:p[1]})),
 ...[[1080,170],[1130,170],[1170,220]].map((p,i)=>({id:"B"+String(i+1).padStart(2,"0"),room:"THE BUNKER",type:"MAC",x:p[0],y:p[1]})),
 ...[[350,155],[405,155],[455,205]].map((p,i)=>({id:"L"+String(i+1).padStart(2,"0"),room:"HR",type:"HP Z",x:p[0],y:p[1]})),
 ...[[110,385],[165,385],[135,450]].map((p,i)=>({id:"A"+String(i+1).padStart(2,"0"),room:"BIM",type:"HP Z",x:p[0],y:p[1]})),
 ...[[1300,165],[1360,165],[1415,215]].map((p,i)=>({id:"P"+String(i+1).padStart(2,"0"),room:"RENDERISTI",type:"HP Z",x:p[0],y:p[1]})),
 ...[[95,600],[150,600],[195,650]].map((p,i)=>({id:"IT"+String(i+1).padStart(2,"0"),room:"IT",type:"HP Z",x:p[0],y:p[1]})),
 {id:"MEET-TV",room:"SALA MEET",type:"AV",x:925,y:205},
 {id:"SPAZIO-TV",room:"SPAZIO A",type:"AV",x:1030,y:480},
 {id:"CORTE-TV",room:"SALA MEET CAPO",type:"AV",x:1395,y:535},
 {id:"PIX-01",room:"RIFUGIO DIGITALE",type:"PIXERA",x:1080,y:635},
 {id:"PIX-02",room:"RIFUGIO DIGITALE",type:"PIXERA",x:1130,y:635},
 {id:"SRV-01",room:"SERVER",type:"SERVER",x:610,y:145},
 {id:"SRV-02",room:"SERVER",type:"SERVER",x:665,y:145},
 {id:"PRN-01",room:"STAMPANTI",type:"PRINTER",x:1210,y:805},
 {id:"PRN-02",room:"STAMPANTI",type:"PRINTER",x:1260,y:805},
 {id:"PRN-03",room:"STAMPANTI",type:"PRINTER",x:1310,y:805}
];


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
let introStage="outside",shiftStarted=false,managerRaceDone=false,managerPenaltyDone=false;
let storyOpen=false,storyCallback=null;
const IT_PC={x:140,y:660,room:"IT"};
const OUTSIDE_ZONE={x:500,y:850,w:225,h:70};
walkZones.push(OUTSIDE_ZONE,{x:605,y:825,w:100,h:95});
function storyDialog(who,text,cb=null){
 storyOpen=true;storyCallback=cb;keys={};
 const b=$("#storyDialog");if(!b)return;
 $("#storyWho").textContent=who;$("#storyText").textContent=text;b.classList.remove("hidden");
}
function closeStory(){if(!storyOpen)return;storyOpen=false;$("#storyDialog")?.classList.add("hidden");const cb=storyCallback;storyCallback=null;if(cb)cb()}
function startShiftFromEntrance(){
 if(shiftStarted)return;shiftStarted=true;state.min=540;introStage="reachPC";
 storyDialog("ZIA ALE","Buongiorno! Il manager è già in arrivo. Vai ad accendere la tua postazione in IT.");
 phoneMessage("IT TASK","PRIMA MISSIONE // raggiungi IT e avvia la tua workstation prima del manager.");
 const m=npcs.find(n=>n.id==="manager");if(m){m.state="managerTravel";m.route=managerStartRoute();m.routeIndex=0}
}
function bootWorkstation(){
 if(introStage!=="reachPC")return false;
 if(Math.hypot(player.x-IT_PC.x,player.y-IT_PC.y)>78)return false;
 const won=!managerPenaltyDone;
 $("#modal").classList.remove("hidden");
 $("#modalBody").innerHTML=`<div class="pixelTaskHead"><span>09:00 // IT</span><h2>AVVIO POSTAZIONE</h2><p>Accendi il PC e completa il boot della tua postazione.</p></div>
 <div class="miniGame bootGame">
  <button id="powerPC" class="pixelAction">POWER</button>
  <div class="bootScreen" id="bootPC">PC SPENTO<span></span></div>
  <button id="loginPC" class="pixelAction" disabled>LOGIN</button>
 </div><div id="miniError"></div>`;
 let powered=false;
 $("#powerPC").onclick=()=>{
   powered=true;$("#powerPC").disabled=true;$("#bootPC").innerHTML="BIOS...<br>NETWORK...<br>WINDOWS READY";
   setTimeout(()=>{$("#loginPC").disabled=false},650);
 };
 $("#loginPC").onclick=()=>{
   if(!powered)return;
   $("#modal").classList.add("hidden");
   introStage="done";managerRaceDone=true;
   if(won){state.xp+=100;state.rep=Math.min(5,state.rep+1);toast("PC ACCESO PRIMA DEL MANAGER // +100 XP")}
   else toast("POSTAZIONE OPERATIVA // TURNO AVVIATO");
   newTicket("LOW");
 };
 return true;
}

/* V5.3.2 — IT MANAGER DEDICATED PATH */

function managerStartRoute(){
 // SEGRETERIA -> porta -> corridoio basso -> porta IT -> postazione.
 return [
  {x:650,y:800,room:"INGRESSO / SEGRETERIA"},
  {x:650,y:705,room:"CORRIDOIO"},
  {x:500,y:705,room:"CORRIDOIO"},
  {x:350,y:705,room:"CORRIDOIO"},
  {x:250,y:675,room:"PORTA IT"},
  {x:190,y:640,room:"IT"}
 ];
}
function managerITtoServerRoute(){
 return [
  {x:250,y:675,room:"PORTA IT"},
  {x:500,y:705,room:"CORRIDOIO"},
  {x:790,y:705,room:"DORSALE"},
  {x:790,y:420,room:"DORSALE"},
  {x:790,y:250,room:"PORTA SERVER"},
  {x:735,y:235,room:"PORTA SERVER"},
  {x:650,y:190,room:"SERVER"}
 ];
}
function managerServerToITRoute(){
 return [
  {x:735,y:235,room:"PORTA SERVER"},
  {x:790,y:250,room:"DORSALE"},
  {x:790,y:420,room:"DORSALE"},
  {x:790,y:705,room:"CORRIDOIO"},
  {x:500,y:705,room:"CORRIDOIO"},
  {x:250,y:675,room:"PORTA IT"},
  {x:190,y:640,room:"IT"}
 ];
}
function moveManagerRoute(n,dt){
 if(!n.route||!n.route.length||n.routeIndex>=n.route.length)return true;
 const p=n.route[n.routeIndex];
 const dx=p.x-n.x,dy=p.y-n.y,d=Math.hypot(dx,dy);
 if(d<6){
   n.x=p.x;n.y=p.y;n.routeIndex++;
   return n.routeIndex>=n.route.length;
 }
 const step=(n.speed||58)*dt;
 // Percorso manuale già validato: niente collisione generica che lo incastra sui bordi porta.
 if(Math.abs(dx)>0)n.x+=Math.sign(dx)*Math.min(Math.abs(dx),step);
 if(Math.abs(dy)>0)n.y+=Math.sign(dy)*Math.min(Math.abs(dy),step);
 return false;
}

function safeRoom(obj,fallback="CORRIDOIO"){return obj&&typeof obj.room==="string"&&obj.room?obj.room:fallback;}
function safePoint(obj,fallback={x:820,y:705,room:"CORRIDOIO"}){if(!obj||!Number.isFinite(obj.x)||!Number.isFinite(obj.y))return {x:fallback.x,y:fallback.y,room:safeRoom(fallback)};return {x:obj.x,y:obj.y,room:safeRoom(obj,safeRoom(fallback))};}
function managerRouteTo(target){
 target=safePoint(target,{x:190,y:640,room:"IT"});
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
function updateManager(dt){
 const m=npcs.find(n=>n.id==="manager");if(!m)return;

 if(m.state==="managerRace"){
   if(moveManagerRoute(m,dt)){
     m.x=190;m.y=640;
     m.state="desk";
     // Se il player non ha ancora avviato il PC, il Manager ha vinto la corsa.
     if(introStage==="reachPC"&&!managerRaceDone&&!managerPenaltyDone){
       managerPenaltyDone=true;
       state.stress+=4;
       state.rep=Math.max(0,state.rep-1);
       storyDialog("IT MANAGER","Buongiorno... il PC magari lo accendiamo? Ti stanno già cercando.");
     }
   }
 }

 // V5.3.2 FINAL: postazione IT fissa; solo IT <-> SERVER. Ticket globali.
 if(m.state==="managerTravel"){
   if(moveManagerRoute(m,dt)){m.state="desk";m.x=190;m.y=640;
     if(introStage==="reachPC"&&!managerRaceDone&&!managerPenaltyDone){managerPenaltyDone=true;state.stress+=4;state.rep=Math.max(0,state.rep-1);storyDialog("IT MANAGER","Buongiorno... il PC magari lo accendiamo? Ti stanno già cercando.")}
   }
 }
 if(introStage==="done"&&m.state==="desk"){
   m.moveTimer=(m.moveTimer??45)-dt;
   if(m.moveTimer<=0 && Math.random()<.18){
     m.route=managerITtoServerRoute();
     m.routeIndex=0;m.state="managerServer";
     m.moveTimer=55+Math.random()*70;
   }else if(m.moveTimer<=0){
     m.moveTimer=35+Math.random()*55;
   }
 }
 if(m.state==="managerServer"){
   if(moveManagerRoute(m,dt)){m.serverStay=8+Math.random()*10;m.state="managerServerStay"}
 }
 if(m.state==="managerServerStay"){
   m.serverStay-=dt;
   if(m.serverStay<=0){
     m.route=managerServerToITRoute();
     m.routeIndex=0;m.state="managerReturnIT";
   }
 }
 if(m.state==="managerReturnIT"){
   if(moveManagerRoute(m,dt)){m.x=190;m.y=640;m.state="desk";m.moveTimer=40+Math.random()*65}
 }
 if(introStage==="done"&&state.min>560&&Math.random()<.00045&&tickets.length<difficultyConfig[difficulty].maxTickets){
   const levels=state.min>990?["MEDIUM","HIGH","CRITICAL"]:["LOW","MEDIUM","HIGH"];
   const level=levels[Math.floor(Math.random()*levels.length)];newTicket(level,{source:"IT MANAGER"});
   if(level==="HIGH"||level==="CRITICAL")storyDialog("IT MANAGER",`Mi hanno appena chiamato dalla direzione. C'è un ${level==="CRITICAL"?"problema critico":"problema urgente"}. Prendilo tu.`);
 }
}
function lunchRouteFor(n,i){
 const target=KITCHEN_SPOTS[i%KITCHEN_SPOTS.length];
 // Route costruita dalla posizione corrente: uscita stanza -> dorsale larga -> cucina.
 const route=[];
 if(n.y<300){ route.push({x:n.x,y:300}); }
 else if(n.y<690){ route.push({x:n.x,y:690}); }
 if(n.x<760) route.push({x:700,y:705},{x:790,y:705});
 else if(n.x>1180) route.push({x:1200,y:705},{x:1080,y:705});
 route.push({x:900,y:705},{x:900,y:760},target);
 return route;
}

function beginLunchMigration(){
 if(dayFlags.lunchMigration)return;dayFlags.lunchMigration=true;
 ambientNPCs.forEach((n,i)=>{n.state="lunchTravel";n.route=lunchRouteFor(n,i);n.routeIndex=0;n.timer=0});
 npcs.forEach((n,i)=>{if(n.id==="manager"){n.homeX=190;n.homeY=640} n.state="specialLunchTravel";n.route=lunchRouteFor(n,ambientNPCs.length+i);n.routeIndex=0;n.speed=n.speed||55;n.seeking=false});
 phoneMessage("STUDIO","PAUSA PRANZO // lo studio si sta svuotando.");
}
function updateLunchMigration(dt){
 if(state.min>=770&&state.min<840)beginLunchMigration();
 if(state.min>=770&&state.min<840){
   ambientNPCs.forEach(n=>{if(n.state==="lunchTravel"&&moveNpcRoute(n,dt))n.state="lunch"});
   npcs.forEach(n=>{if(n.state==="specialLunchTravel"&&moveNpcRoute(n,dt))n.state="lunch"});
 }
 if(state.min>=840&&!dayFlags.lunchReturn){
   dayFlags.lunchReturn=true;
   ambientNPCs.forEach(n=>{n.state="return";n.route=buildRoute(n,false);n.routeIndex=0});
   npcs.forEach(n=>{const homes={pao:{x:250,y:620},zia:{x:685,y:815},don:{x:895,y:815},manager:{x:190,y:640},hr:{x:405,y:205}};const h=homes[n.id];if(h){n.route=buildRoute({homeX:h.x,homeY:h.y},false);n.route.push(h);n.routeIndex=0;n.state="specialReturn"}});
 }
 npcs.forEach(n=>{if(n.state==="specialReturn"&&moveNpcRoute(n,dt))n.state=n.id==="manager"?"desk":"idle"});
}
function randomizeMiniLayout(){
 const box=document.querySelector('.miniGame');if(!box)return;
 const children=[...box.children].filter(x=>x.tagName==='BUTTON'||x.classList.contains('pixelItem'));
 children.forEach(x=>x.style.order=Math.floor(Math.random()*50));
 const cols=2+Math.floor(Math.random()*3);box.style.gridTemplateColumns=`repeat(${cols},minmax(72px,1fr))`;
 box.classList.add('v5Random');
}

/* =============================================================
   V4 — LIVING STUDIO / CAMERA / LORE
   ============================================================= */
const LUNCH_START=13*60,LUNCH_END=14*60,LATE_START=17*60+30;
const KITCHEN_SPOTS=[
 {x:840,y:790},{x:875,y:790},{x:910,y:790},{x:945,y:790},
 {x:980,y:790},{x:1015,y:790},{x:850,y:825},{x:890,y:825},
 {x:930,y:825},{x:970,y:825},{x:1010,y:825},{x:1045,y:825},
 {x:1080,y:805},{x:820,y:825},{x:1060,y:835},{x:880,y:845}
];
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
function updateNarrative(){
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

function refreshPDA(){
 const p=$("#pdaBody");if(!p||!state)return;
 const active=tickets.map(t=>`<div class="pdaTask"><b>${t.level} // ${safeRoom(t.p,"SEGNALAZIONE")}</b><span>${t.p.id||t.p.type||"POSTAZIONE"}</span><small>${t.taskType?"INTERVENTO // "+t.taskType:"DIAGNOSI"} · ${fmt(t.due)}</small></div>`).join("");
 const carry=carryMission?`<div class="pdaCarry"><b>${carryMission.item}</b><span>${carryMission.stage==="pickup"?"RITIRO: "+safeRoom(carryMission.pickup,"IT"):"CONSEGNA: "+(carryMission.recipient?carryMission.recipient.name:safeRoom(carryMission.to,"POSTAZIONE"))}</span></div>`:"";
 p.innerHTML=(carry||active)||"<div class='pdaEmpty'>NESSUNA ATTIVITÀ APERTA</div>";
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
function updateLunchReturn(dt){
 for(const n of [...ambientNPCs,...npcs].filter(Boolean)){
  if(n.id==="manager"||n.state!=="returnHomeAfterLunch")continue;
  if(!n.route||n.routeIndex>=n.route.length||moveNpcRoute(n,dt)){
    n.x=n.homeX;n.y=n.homeY;n.state="work";n.timer=18+Math.random()*25;
  }
 }
}

function setLunchPositions(){
 ambientNPCs.forEach((n,i)=>{
   const s=KITCHEN_SPOTS[i%KITCHEN_SPOTS.length];
   n.x=s.x;n.y=s.y;n.state="lunch";n.route=[];n.routeIndex=0;n.timer=9999;
 });
 npcs.forEach((n,i)=>{
   const s=KITCHEN_SPOTS[(ambientNPCs.length+i)%KITCHEN_SPOTS.length];
   n.x=s.x;n.y=s.y;n.seeking=false;
 });
 mokasa=null;
}
function leaveLunch(){forceLunchReturn();}
function updateLunchState(){ updateLunchMigration(1/60); }

function beginEntranceWalk(){
 introFreeWalk=true;
 entranceOpened=false;
 const box=$("#storyBox")||$("#gbDialog")||$("#dialogBox")||document.querySelector(".storyBox");
 if(box)box.classList.add("hidden");
 const overlay=$("#storyOverlay")||$("#dialogOverlay");
 if(overlay)overlay.classList.add("hidden");
 toast("RAGGIUNGI L'INGRESSO // E — ENTRA");
}

function reset(){
 Object.keys(npcRelations).forEach(k=>delete npcRelations[k]);

 introFreeWalk=false;entranceOpened=false;enteredStudio=false;window.__entranceDialogReady=false;
const bad=validateMap();if(bad.length)console.warn("Unreachable task points disabled:",bad);state={phase:"shift",min:538,stress:0,rep:5,xp:0,incident:0,strikes:0,maxStrikes:difficultyConfig[difficulty].maxStrikes,solved:0,anomalyPenalty:0,bossPhase:0};player={x:610,y:885,s:205};tickets=[];last=performance.now();spawnTimer=0;anomTimer=0;phoneQueue=[];visualAnomaly=null;inventory=[];carryMission=null;pendingOffers={};firstCarryTriggered=true;encounterLock=false;dayFlags={};lunchMode=false;fullMap=false;introStage="outside";shiftStarted=false;managerRaceDone=false;managerPenaltyDone=false;spawnNPCs();const m=npcs.find(n=>n.id==="manager");if(m){m.x=650;m.y=800;m.state="outside"}updateInventoryUI();updateTaskProgress();setupCompactHUD();setupMiniMapControls();hud();storyDialog("08:58","Ho ancora due minuti. Mi fumo una sigaretta prima di entrare...",()=>setTimeout(()=>storyDialog("TELEFONO","A dopo. Entro in studio."),250));}
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
  "THE BUNKER":["RELINK","PROCESS"],
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
 const pct=state.phase==="ended"?100:Math.max(0,Math.min(99,Math.round(((completed+carryDone)/14)*100)));
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

function miniSuccess(i,label){
 if(i<0||i>=tickets.length)return;
 const t=tickets[i];
 const xp={LOW:120,MEDIUM:290,HIGH:560,CRITICAL:820}[t.level];
 tickets.splice(i,1);
 activeMiniGame=null;
 $("#modal").classList.add("hidden");
 state.xp+=xp;state.solved++;state.stress=Math.max(0,state.stress-4);
 state.incident=Math.max(0,state.incident-({LOW:2,MEDIUM:4,HIGH:7,CRITICAL:8}[t.level]));
 toast(`${label} // TASK COMPLETE +${xp} XP`);const srcNpc=[...ambientNPCs,...npcs].find(n=>n.name===t.source||n.id===t.source);if(srcNpc)changeRelation(srcNpc,6);
 renderTickets();updateTaskProgress();hud();updateTaskProgress();
}

function miniMistake(text="ERRORE"){
 if(!activeMiniGame)return;
 activeMiniGame.errors=(activeMiniGame.errors||0)+1;
 state.stress+=2*difficultyConfig[difficulty].stressMult;
 const e=$("#miniError");if(e){e.textContent=text;e.classList.add("on");setTimeout(()=>e.classList.remove("on"),550)}
 if(activeMiniGame.errors>=3){
   state.incident+=4*difficultyConfig[difficulty].incidentMult;
   activeMiniGame.errors=0;
 }
 clamp();hud();
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
   const bad=Math.floor(Math.random()*3);
   body.innerHTML=miniHeader(t,"PROCESS CHECK","Termina solo il processo bloccato.")+
   `<div class="miniGame processGame">
   ${["DesktopConnector.exe","Revit.exe","SyncAgent.exe","AdobeCC.exe","Teams.exe"].sort(()=>Math.random()-.5).slice(0,3+Math.floor(Math.random()*3)).map((x,n)=>`<button class="processRow" data-ok="${n===bad?1:0}">${x}<i>${n===bad?"NOT RESPONDING":"RUNNING"}</i></button>`).join("")}
   </div><div id="miniError"></div>`;
   document.querySelectorAll(".processRow").forEach(b=>b.onclick=()=>b.dataset.ok==="1"?miniSuccess(i,"PROCESSO RIPRISTINATO"):miniMistake("PROCESSO SANO"));
  }
 }
 setTimeout(randomizeMiniLayout,0);
}
function newTicket(force,opts={}){
 if(state.phase!=="shift"||tickets.length>=difficultyConfig[difficulty].maxTickets)return;if(isLunch()&&!opts.anomaly)return;
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
 renderTickets();
}
function renderTickets(){
 const tc=$("#ticketCount");if(tc)tc.textContent=tickets.length;

 $("#ticketText").innerHTML=tickets.length?tickets.map(t=>`<div class="ticket ${t.level.toLowerCase()}"><b>${t.level}${t.source==="IT MANAGER"?" // MANAGER":t.criticalFrom?" // "+t.criticalFrom:""}</b><br>${safeRoom(t.p,"SEGNALAZIONE")} — ${(t.p&&(t.p.id||t.p.kind||t.p.type))||"POSTAZIONE"}<br>${t.taskType?`<br><span class="taskKind">MINIGAME // ${t.taskType}</span>`:`<br><span class="taskKind">DIAGNOSI</span>`}<br>deadline ${fmt(t.due)}</div>`).join(""):"Nessun ticket aperto.";
}

const STUDIO_ENTRANCE={x:690,y:845,w:110,h:38};

function nearStudioEntrance(){
 return Math.hypot(player.x-(STUDIO_ENTRANCE.x+STUDIO_ENTRANCE.w/2),
                   player.y-(STUDIO_ENTRANCE.y+STUDIO_ENTRANCE.h/2))<82;
}
function tryStudioEntrance(){
 if(!introFreeWalk||enteredStudio||!nearStudioEntrance())return false;
 entranceOpened=true;
 enteredStudio=true;
 introFreeWalk=false;
 // Move just inside the lobby, not deep into the studio.
 player.x=745;player.y=790;
 // Start greeting only after crossing the entrance.
 setTimeout(()=>{
   if(typeof showStoryDialog==="function")showStoryDialog("ZIA ALE","Buongiorno!");
   else if(typeof showDialogue==="function")showDialogue("ZIA ALE","Buongiorno!");
   else phoneMessage("ZIA ALE","Buongiorno!");
 },180);
 if(state&&state.min<9*60)state.min=9*60-1;
 toast("SEI ENTRATO NELLO STUDIO");
 return true;
}


function hrAdvice(){
 const hr=ambientNPCs.find(n=>n.id==="hr");
 if(!hr||Math.hypot(player.x-hr.x,player.y-hr.y)>72)return false;
 const tips=["Se hai tre cose insieme, parti da quella che blocca più persone.","Chiedi sempre quanto è urgente davvero.","Se una richiesta non è chiara, falla spiegare prima di correre.","Controlla il PDA: gli urgenti scadono più in fretta."];
 changeRelation(hr,2);storyDialog("HR",tips[Math.floor(Math.random()*tips.length)]);return true;
}

function interact(){
 if(hrAdvice())return;

 if(tryStudioEntrance())return;

 if(storyOpen){closeStory();return}
 if(state.phase!=="shift")return;
 if(introStage==="outside"&&Math.hypot(player.x-655,player.y-875)<82){
   introStage="entering";
   toast("PORTA APERTA // entra nello Studio");
   return
 }
 if(bootWorkstation())return;
 if(interactCarry())return;
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
function checkEarlyEnd(){clamp();if(state.strikes>=state.maxStrikes)return ending("IMPOSTORE","Troppi interventi errati. Le tue credenziali IT vengono revocate.");if(state.rep<=0)return ending("LICENZIATO","La reputazione è crollata. ACCESS REVOKED.");if(state.incident>=100)return ending("MAJOR INCIDENT","L'infrastruttura dello studio è offline.");if(state.stress>=100)return ending("BURNOUT","Non riesci più a gestire il turno.")}
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
$("#x").onclick=()=>{if(state&&state.phase!=="shift"){toast("Questo evento non può essere ignorato.");return}$("#modal").classList.add("hidden")};
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

function update(dt) {
 updateLunchReturn(dt);

 monitorEntranceIntro();

 if(state.phase==="shift"){
  let dx=(keys.d||keys.arrowright||virtualKeys.right?1:0)-(keys.a||keys.arrowleft||virtualKeys.left?1:0)+(joyActive?joyX:0),
      dy=(keys.s||keys.arrowdown||virtualKeys.down?1:0)-(keys.w||keys.arrowup||virtualKeys.up?1:0)+(joyActive?joyY:0);
  if(Math.abs(dx)>.04||Math.abs(dy)>.04){let l=Math.max(1,Math.hypot(dx,dy)),vx=dx/l*player.s*dt,vy=dy/l*player.s*dt;if(playerCanMove(player.x,player.y,player.x+vx,player.y))player.x+=vx;if(playerCanMove(player.x,player.y,player.x,player.y+vy))player.y+=vy}
  // V5.1.1.1: the shift starts only after the player physically crosses the exterior door.
  if(introStage==="entering" && player.y<855 && player.x>610 && player.x<705){startShiftFromEntrance()}
  if(shiftStarted)state.min=Math.min(BOSS,state.min+dt*difficultyConfig[difficulty].timeSpeed); if(state.min>=BOSS){startBoss();hud();return}
  spawnTimer+=dt;anomTimer+=dt;
 updateLunchMigration(dt);
 updateManager(dt);
 updateNarrative();
 if(!firstCarryTriggered && state.min>=START+3){
   firstCarryTriggered=true;
   startTutorialCarryMission();
 }
   
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
 if(mokasa){mokasa.life-=dt*difficultyConfig[difficulty].timeSpeed;if(mokasa.life<=0)mokasa=null}
 updateAmbient(dt);
 if(!isLunch()) for(const n of npcs.filter(x=>x.hunter)){
   // PAO deve essere un incontro occasionale, DON un po' più mobile.
   const chance=n.id==="pao"?.00055:.0014;
   const gap=n.id==="pao"?105:65;
   if(!n.seeking && state.min-(n.lastHunt??-999)>gap && Math.random()<chance){
     n.seeking=true;
     n.seekFor=n.id==="pao"?9:15;
     n.lastHunt=state.min;
   }

   // V5.2 DON: routine reale su porte/corridoi, non più fermo in cucina.
   if(n.id==="don"&&!n.seeking&&n.state!=="specialLunchTravel"&&n.state!=="lunch"&&n.state!=="specialReturn"){
     n.donTimer=(n.donTimer??0)-dt;
     if((!n.route||n.routeIndex>=n.route.length)&&n.donTimer<=0){
       const stops=[
        {x:900,y:705,room:"CORRIDOIO"},
        {x:925,y:250,room:"SALA MEET"},
        {x:1180,y:705,room:"STAMPANTI"},
        {x:895,y:815,room:"CUCINA"},
        {x:720,y:705,room:"CORRIDOIO"}
       ];
       const target=stops[Math.floor(Math.random()*stops.length)];
       n.route=routeViaHub(n,target);n.routeIndex=0;n.donTimer=12+Math.random()*18;
     }
     if(n.route&&n.routeIndex<n.route.length)moveNpcRoute(n,dt);
   }

   if(n.seeking){
     n.seekFor-=dt;
     // Hunter segue il corridoio: evita di tagliare le pareti.
     const dx=player.x-n.x,dy=player.y-n.y,d=Math.hypot(dx,dy);
     if(d>55){
       const step=48*dt;
       const nx=n.x+Math.sign(dx)*Math.min(Math.abs(dx),step);
       const ny=n.y+Math.sign(dy)*Math.min(Math.abs(dy),step);
       if(playerCanMove(n.x,n.y,nx,n.y))n.x=nx;
       else if(playerCanMove(n.x,n.y,n.x,ny))n.y=ny;
     }
     if(d<72&&!encounterLock){pokemonEncounter(n)}
     if(n.seekFor<=0)n.seeking=false;
   }
 }
 const moved=Math.hypot(player.x-lastPlayerPos.x,player.y-lastPlayerPos.y);
 if(moved<2)idleMinutes+=dt*difficultyConfig[difficulty].timeSpeed;else{idleMinutes=0;lastPlayerPos={x:player.x,y:player.y}}
 if(mokasa&&!mokasa.court&&Math.hypot(player.x-mokasa.x,player.y-mokasa.y)<92){
   const last=npcCooldown.mokasa??-999;
   if(state.min-last>20){
     npcTalk(mokasa);
     // Dopo l'interazione sparisce: non serve premere E e non può colpire due volte nello stesso spawn.
     mokasa=null;
     idleMinutes=0;
   }
 }
if(introStage==="done"&&!isLunch()&&spawnTimer>difficultyConfig[difficulty].spawnSeconds){spawnTimer=0;newTicket();maybeCritical()}
 const phase=dayPhase();
 const anomalyEvery=phase==="MORNING"?26:phase==="LUNCH"?14:phase==="AFTERNOON"?21:10;
 if(anomTimer>anomalyEvery){anomTimer=0 /* V5: no supernatural anomaly system */}
  expireTickets();
 } else if(state.phase==="boss")state.min=BOSS;else state.min=END;
 hud();updateTaskProgress();
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

function furniture(){
 // EDITORIA / BIM / HR / RENDERISTI: postazioni ordinate, non sovrapposte.
 desk(72,185,160); drawHRRoom(); // HR: una sola postazione
 desk(70,405,135); desk(1280,205,135);

 // CENTRALE: due file pulite e distanziate.
 desk(385,385,285); desk(385,485,285);

 // IT: scaffale + due postazioni, inclusa la postazione del player.
 desk(78,650,135); desk(78,585,135);

 // Sale meeting: tavolone unico + display a parete.
 meetingRoomSetup(870,115,135,925,205);
 meetingRoomSetup(875,425,205,1030,480);
 meetingRoomSetup(1330,485,185,1395,535);

 // THE BUNKER / cucina / stampanti.
 desk(1080,205,105);
 desk(890,810,175);
 desk(1190,810,190);

 for(let x=565;x<710;x+=42)serverRack(x,115);
 printer(1210,785);printer(1250,785);printer(1290,785);
 drawBathroomFixtures();

 [[250,220],[470,220],[815,300],[1140,300],[1285,635],[1040,825],[430,825],[75,330],[85,570],[1510,645]].forEach(p=>plant(...p));
 [[70,75],[345,75],[575,75],[870,75],[1080,75],[1275,75],[350,330],[890,385],[1320,420],[870,755],[1180,755]].forEach(p=>lightFixture(...p));
 g.fillStyle="#8d3a32";[[265,255],[735,270],[1185,350],[1230,620]].forEach(([x,y])=>g.fillRect(x,y,8,22));
}
function meetingRoomSetup(x,y,w,screenX,screenY){
 // tavolo grande
 g.fillStyle="#171311";g.fillRect(x+4,y+5,w,34);
 g.fillStyle="#6b4224";g.fillRect(x,y,w,28);
 g.fillStyle="#8a5a31";g.fillRect(x,y,w,4);
 // sedie
 for(let sx=x+18;sx<x+w-10;sx+=42){
   g.fillStyle="#252b28";g.fillRect(sx,y-18,22,14);g.fillRect(sx,y+32,22,14);
 }
 // grande display a parete
 g.fillStyle="#111815";g.fillRect(screenX-32,screenY-75,64,34);
 g.fillStyle="#58a0b8";g.fillRect(screenX-27,screenY-70,54,24);
 // Wacom / controller sul tavolo
 g.fillStyle="#26302d";g.fillRect(x+w/2-18,y+7,36,16);
 g.strokeStyle="#74a6b5";g.strokeRect(x+w/2-18,y+7,36,16);
}
function drawBathroomFixtures(){
 // V5.3.5: BAGNI puliti — soltanto due porte WC.
 const doors=[
   {x:875,y:625,w:48,h:72,label:"WC"},
   {x:945,y:625,w:48,h:72,label:"WC"}
 ];
 doors.forEach(d=>{
   g.fillStyle="#17110d";g.fillRect(d.x,d.y,d.w,d.h);
   g.strokeStyle="#9b6738";g.lineWidth=4;g.strokeRect(d.x,d.y,d.w,d.h);
   g.fillStyle="#d8d0bb";g.font="bold 11px monospace";g.fillText(d.label,d.x+14,d.y+25);
   g.fillStyle="#d6b46e";g.fillRect(d.x+d.w-10,d.y+38,4,4);
 });
}

function label(r){
 const w=Math.min(r.w-22,r.name.length*8+22);
 g.fillStyle="rgba(6,8,7,.92)";g.fillRect(r.x+12,r.y+10,w,24);
 g.strokeStyle="#252c27";g.strokeRect(r.x+12,r.y+10,w,24);
 g.fillStyle="#d5c7ac";g.font="bold 13px monospace";g.fillText(r.name,r.x+19,r.y+27);
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
function draw(){
 g.setTransform(1,0,0,1,0,0);
 g.fillStyle="#020403";g.fillRect(0,0,W,H);
 const cam=computeCamera();
 const useCam=!(debug||fullMap);
 if(useCam){g.save();g.scale(cam.zoom,cam.zoom);g.translate(-cam.x,-cam.y)}
 g.fillStyle="#050706";g.fillRect(0,0,W,H);
 corridors.forEach(visualCorridor);
 // V5.1.1 — ingresso esterno realmente giocabile
 if(introStage==="outside"||introStage==="entering"){
   g.fillStyle="#1a1d1b";g.fillRect(500,850,225,70);
   g.strokeStyle="#49534d";g.lineWidth=3;g.strokeRect(500,850,225,70);
   g.fillStyle="#2b1c11";g.fillRect(615,825,70,35);
   g.fillStyle="#9a6a3c";g.fillRect(620,827,60,8);
   g.fillStyle="#d6e0d8";g.font="bold 10px monospace";g.fillText("INGRESSO STUDIO",598,817);
   if(introStage==="outside"&&Math.hypot(player.x-655,player.y-875)<105){g.fillStyle="#ffd447";g.font="bold 12px monospace";g.fillText("E — APRI",620,905)}
   if(introStage==="entering"){g.fillStyle="#7dff91";g.font="bold 11px monospace";g.fillText("PORTA APERTA",610,905)}
 }
 
 // V5.1.2 real studio entrance
 if(introFreeWalk&&!enteredStudio){
   const d=STUDIO_ENTRANCE;
   g.fillStyle="#4e3524";g.fillRect(d.x,d.y,d.w,d.h);
   g.strokeStyle="#d5a454";g.lineWidth=4;g.strokeRect(d.x,d.y,d.w,d.h);
   g.fillStyle="#f2d37a";g.font="bold 11px monospace";g.fillText("INGRESSO",d.x+24,d.y-8);
   if(nearStudioEntrance()){
     g.fillStyle="rgba(4,8,6,.94)";g.fillRect(d.x-5,d.y-38,d.w+10,28);
     g.strokeStyle="#b7ff4a";g.lineWidth=2;g.strokeRect(d.x-5,d.y-38,d.w+10,28);
     g.fillStyle="#b7ff4a";g.font="bold 10px monospace";g.fillText("E — ENTRA",d.x+26,d.y-20);
   }
 }

rooms.forEach(floor);rooms.forEach(pixelFloorOverlay);
 rooms.forEach(drawRoomWalls);
 doors.forEach(visualDoor);
 furniture();
 drawServerRacks();
 rooms.forEach(label);

 // V5.2: overlay solo per apparati speciali. Le workstation sono già disegnate nei mobili.
 stations.filter(s=>["AV","PIXERA"].includes(s.type)).forEach(s=>{
   g.fillStyle="#151a18";g.fillRect(s.x-18,s.y-13,36,22);
   g.fillStyle=s.type==="PIXERA"?"#725b96":"#3d778e";g.fillRect(s.x-14,s.y-9,28,14);
 });
 [...npcs,...(mokasa?[mokasa]:[])].forEach(n=>{
   drawPixelPerson(n.x,n.y,n.shirt,"#d0a887",n.tone==="bad"?"#3a1717":"#202522");
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
 g.fillStyle="#c5eaff";g.font="bold 8px monospace";g.fillText("REPARTO IT",112,594);

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


 const cp=carryPrompt();
 if(cp){
   const w=Math.min(390,cp.length*7+24),x=player.x-w/2,y=player.y-55;
   g.fillStyle="rgba(5,8,7,.95)";g.fillRect(x,y,w,24);
   g.strokeStyle="#6ee7ff";g.strokeRect(x,y,w,24);
   g.fillStyle="#dff8ff";g.font="bold 10px monospace";g.textAlign="center";g.fillText(cp,player.x,y+16);g.textAlign="left";
 }

 drawPixelPerson(player.x,player.y,"#284f3a","#d0a887","#17231d");


 if(debug){
  if(itManager&&itManager.route&&itManager.route.length){
    g.save();
    g.strokeStyle="#ffd84a";g.lineWidth=3;g.beginPath();
    g.moveTo(itManager.x,itManager.y);
    for(let ri=itManager.routeIndex||0;ri<itManager.route.length;ri++){
      const wp=itManager.route[ri];
      g.lineTo(wp.x,wp.y);
    }
    g.stroke();
    for(let ri=itManager.routeIndex||0;ri<itManager.route.length;ri++){
      const wp=itManager.route[ri];
      g.fillStyle="#ffd84a";g.fillRect(wp.x-4,wp.y-4,8,8);
    }
    g.restore();
  }

  g.globalAlpha=.24;
  g.fillStyle="#37ff82";roomFloors.forEach(z=>g.fillRect(z.x,z.y,z.w,z.h));
  g.fillStyle="#2aa8ff";corridors.forEach(z=>g.fillRect(z.x,z.y,z.w,z.h));
  g.fillStyle="#ffe14a";doors.forEach(z=>g.fillRect(z.x,z.y,z.w,z.h));
  g.fillStyle="#ff3040";obstacles.forEach(o=>g.fillRect(o.x,o.y,o.w,o.h));
  g.globalAlpha=1;
 }

 if(useCam)g.restore();
 drawMiniMap();
 if(useCam){
   const grad=g.createRadialGradient(W/2,H/2,Math.min(W,H)*.28,W/2,H/2,Math.max(W,H)*.60);
   grad.addColorStop(0,"rgba(0,0,0,0)");
   grad.addColorStop(1,"rgba(0,0,0,.48)");
   g.fillStyle=grad;g.fillRect(0,0,W,H);
 }
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
window.addEventListener("error",function(ev){
 let old=document.getElementById("runtimeError");
 if(old)return;
 let d=document.createElement("div");d.id="runtimeError";
 d.textContent="JS ERROR V2.7.2.3 // "+(ev.message||"errore sconosciuto");
 document.body.appendChild(d);
});
