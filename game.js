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
const boot=["[BOOT] ARCHEA IT SERVICES","[OK] Domain reachable","[OK] Autodesk licensing","[OK] File servers","[WARN] Orphan session detected","[USER] ARCH-VOID","[LAST LOGIN] 19:03"];
let bl=0;(function b(){if(bl<boot.length){$("#bootlog").innerHTML+=boot[bl++]+"<br>";setTimeout(b,280)}else $("#toLore").classList.remove("hidden")})();$("#toLore").onclick=()=>show("lore");$("#start").onclick=()=>{difficulty=$("#difficulty")?.value||"normal";show("game");reset();requestAnimationFrame(loop)};

const rooms=[
{name:"GRAFICA",x:30,y:55,w:250,h:210,f:"stone"},{name:"LOFT",x:300,y:55,w:205,h:210,f:"stone"},{name:"SERVER",x:525,y:55,w:230,h:210,f:"server"},
{name:"ABA",x:30,y:310,w:210,h:185,f:"stone"},{name:"IT",x:30,y:535,w:210,h:180,f:"wood"},{name:"CENTRALE",x:315,y:310,w:440,h:355,f:"stone"},
{name:"SALA MEET",x:840,y:55,w:190,h:270,f:"stone"},{name:"THE BUNKER",x:1050,y:55,w:170,h:270,f:"wood"},{name:"PANTHEON",x:1240,y:55,w:210,h:270,f:"wood"},
{name:"SPAZIO A",x:840,y:365,w:300,h:185,f:"stone"},{name:"BAGNI",x:840,y:585,w:180,h:125,f:"tile"},{name:"RIFUGIO DIGITALE",x:1040,y:585,w:180,h:125,f:"wood"},
{name:"SALA CORTE",x:1290,y:400,w:280,h:290,f:"wood"},{name:"INGRESSO / SEGRETERIA",x:410,y:735,w:345,h:130,f:"stone"},{name:"CUCINA",x:840,y:735,w:285,h:130,f:"tile"},{name:"STAMPANTI",x:1145,y:735,w:285,h:130,f:"stone"}];
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
,
 {x:245,y:265,w:58,h:430},        // V2.6.2 LEFT SPINE: black gap beside ABA / IT
 {x:245,y:675,w:110,h:85}         // raccordo sinistro verso corridoio basso
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
,
 {x:235,y:245,w:80,h:85},          // GRAFICA / upper corridor -> LEFT SPINE
 {x:215,y:345,w:95,h:105},         // ABA -> LEFT SPINE
 {x:215,y:565,w:95,h:135},         // IT -> LEFT SPINE
 {x:235,y:655,w:125,h:125}         // LEFT SPINE -> lower corridor
];
const walkZones=[...roomFloors,...corridors,...doors];
const obstacles=[
{x:385,y:420,w:290,h:42},{x:385,y:350,w:245,h:35},{x:75,y:145,w:155,h:45},{x:340,y:145,w:120,h:55},{x:565,y:115,w:150,h:90},
{x:75,y:385,w:125,h:55},{x:75,y:600,w:125,h:55},{x:885,y:160,w:105,h:115},{x:1080,y:155,w:100,h:60},{x:1280,y:155,w:125,h:70},{x:890,y:435,w:190,h:60},{x:1330,y:495,w:185,h:85},{x:885,y:775,w:180,h:55},{x:1190,y:775,w:190,h:60}
];
const points=[
{x:155,y:205,room:"GRAFICA",kind:"PC"},{x:400,y:205,room:"IT",kind:"PC"},{x:640,y:205,room:"SERVER",kind:"SERVER"},{x:140,y:450,room:"ABA",kind:"PC"},{x:140,y:660,room:"IT",kind:"PC"},
{x:535,y:560,room:"CENTRALE",kind:"PC"},{x:940,y:285,room:"SALA MEET",kind:"MEETING"},{x:1135,y:285,room:"THE BUNKER",kind:"PC"},{x:1345,y:285,room:"PANTHEON",kind:"PC"},{x:1010,y:520,room:"SPAZIO A",kind:"PC"},
{x:1120,y:680,room:"RIFUGIO DIGITALE",kind:"PC"},{x:1430,y:650,room:"SALA CORTE",kind:"MEETING"},{x:1020,y:835,room:"CUCINA",kind:"COFFEE"},{x:1290,y:835,room:"STAMPANTI",kind:"PRINTER"}];
const bosses=["DIREZIONE","PRESIDENZA","CAPO ASSOLUTO"];
const questionBanks={"MAC_ADOBE": [["Creative Cloud su macOS mostra l'utente disconnesso. Primo controllo?", ["Verificare sessione Adobe, rete e stato Creative Cloud", "Cancellare la cartella System", "Resettare il domain controller", "Cambiare VLAN"], 0], ["InDesign segnala font mancanti aprendo un progetto. Cosa verifichi?", ["Font richiesti, attivazione Adobe Fonts e Font Book", "DNS del server", "Driver GPU del server", "Spooler Windows"], 0], ["Photoshop non vede più un disco di memoria virtuale disponibile. Primo controllo?", ["Spazio libero e impostazioni Scratch Disks", "GPO Windows", "Porta HDMI", "Licenza Revit"], 0], ["Illustrator apre un file con collegamenti mancanti. Cosa controlli?", ["Percorsi e file collegati nel pannello Links", "DHCP", "Account Autodesk", "Firmware switch"], 0], ["Acrobat non stampa correttamente un PDF complesso. Primo test?", ["Provare stampa come immagine/altro PDF e verificare driver/coda", "Formattare il Mac", "Cambiare DNS aziendale", "Resettare Revit"], 0], ["Creative Cloud resta bloccato su sincronizzazione. Approccio corretto?", ["Controllare rete, account, stato servizi e log prima del reset", "Cancellare tutti i file Adobe", "Spegnere il NAS", "Cambiare monitor"], 0], ["Un Mac non monta una share SMB che gli altri vedono. Primo controllo?", ["Connettività, percorso smb:// e credenziali", "Reinstallare Photoshop", "Cambiare mouse", "Reset Pixera"], 0], ["InDesign esporta un PDF con immagini a bassa qualità. Cosa controlli?", ["Preset di esportazione e risoluzione delle immagini sorgenti", "DNS", "Bluetooth", "GPO"], 0], ["Font Book segnala un font duplicato. Cosa fai?", ["Valuti duplicati e disattivi/rimuovi quello errato", "Riavvii il server", "Resetti Desktop Connector", "Cambi IP"], 0], ["Un Mac ha pochissimo spazio libero e Adobe è lento. Prima azione?", ["Individuare cosa occupa spazio e liberare cache/file sicuri", "Cancellare /System", "Spegnere lo switch", "Cambiare VLAN"], 0], ["Photoshop non usa correttamente l'accelerazione grafica. Cosa verifichi?", ["Impostazioni GPU, compatibilità e aggiornamenti", "Permessi stampante", "DNS reverse", "Pixera"], 0], ["Un PDF esportato da InDesign ha font sostituiti. Causa probabile?", ["Font non disponibili/incorporabili o sostituiti nel documento", "Gateway errato", "Cavo HDMI", "DHCP esaurito"], 0]], "WORKSTATION": [["Una HP Z non naviga ma le altre sì. Primo controllo?", ["IP, gateway, DNS e link della singola workstation", "Riavviare tutti i server", "Formattare", "Cambiare switch core"], 0], ["Revit è molto lento solo su una workstation. Primo approccio?", ["Verificare risorse, modello, add-in e stato locale prima di interventi invasivi", "Reset dominio", "Cambiare stampante", "Spegnere NAS"], 0], ["Desktop Connector non sincronizza su un solo PC. Cosa controlli?", ["Account, stato client, cache e log", "Cancellare il progetto cloud", "Cambiare GPU", "Riavviare DHCP"], 0], ["Windows mostra disco C quasi pieno. Prima azione?", ["Analizzare occupazione e pulire file/cache sicuri", "Cancellare Windows", "Reset DNS", "Disinstallare driver rete"], 0], ["Una HP Z non vede il secondo monitor. Primo controllo?", ["Input, cavo, porta GPU e rilevamento display", "Active Directory", "Licenza Adobe", "Spooler"], 0], ["Office chiede continuamente autenticazione. Cosa controlli?", ["Account, token/credenziali e connettività ai servizi", "HDMI", "Driver plotter", "Pixera"], 0], ["Un'applicazione si chiude solo per un utente Windows. Primo test?", ["Verificare profilo, log evento e riproducibilità", "Riavviare tutti gli switch", "Cambiare VLAN globale", "Formattare server"], 0], ["La workstation non riceve policy aggiornate. Cosa puoi verificare?", ["Connettività dominio e gpupdate /force con eventuali errori", "Photoshop", "HDMI", "Toner"], 0], ["Il PC è acceso da molti giorni e ha comportamenti strani. Informazione utile?", ["Uptime e stato aggiornamenti prima di riavviare", "Numero di PDF", "Luminosità TV", "Pixera"], 0], ["Una periferica USB non viene rilevata. Primo approccio?", ["Provare porta/cavo/periferica e Gestione dispositivi", "Cambiare DNS", "Reset Autodesk", "Spegnere server"], 0], ["Revit non trova una stampante che Windows vede. Cosa controlli?", ["Driver, stampante predefinita e sessione/app", "DHCP server", "Adobe Fonts", "HDMI"], 0], ["Desktop Connector mostra file in conflitto. Cosa fai?", ["Identificare versione/stato sync prima di sovrascrivere", "Cancellare entrambe le copie", "Reset dominio", "Cambiare GPU"], 0]], "NETWORK": [["Ping IP funziona ma il nome server no. Sospetto principale?", ["DNS", "GPU", "HDMI", "Bluetooth"], 0], ["Più utenti perdono una share nello stesso momento. Priorità?", ["Capire ampiezza e verificare rete/server/servizio", "Formattare un client", "Cambiare mouse", "Reinstallare Adobe"], 0], ["Un client ha indirizzo 169.254.x.x. Cosa indica spesso?", ["Mancata assegnazione DHCP", "Errore GPU", "Problema PDF", "Licenza Autodesk"], 0], ["La rete cablata cade solo su una postazione. Primo controllo?", ["Cavo, presa, link e configurazione NIC", "Riavvio domain controller", "Reset Pixera", "Cambiare toner"], 0], ["Gateway risponde ma Internet no su più PC. Cosa verifichi?", ["DNS, routing/firewall e connettività a monte", "Mouse", "InDesign", "Monitor"], 0], ["Una share funziona per tutti tranne un utente. Cosa controlli?", ["Permessi, credenziali, mapping e connettività utente", "Switch core subito", "Formattare server", "HDMI"], 0], ["Una porta di rete non dà link. Primo test?", ["Cavo/patch/porta switch e stato fisico", "Adobe Fonts", "Revit cache", "Spooler"], 0], ["Connessione intermittente verso un server. Dato utile?", ["Ping continuo/log/perdita pacchetti e percorso", "Colore desktop", "Versione Acrobat", "Toner"], 0], ["DNS risolve un IP vecchio. Possibile causa?", ["Record/cache DNS non aggiornati", "GPU", "USB", "HDMI"], 0], ["Un servizio è raggiungibile localmente ma non dai client. Cosa controlli?", ["Firewall, binding, porta e routing", "Font Book", "Stampante USB", "Luminosità"], 0], ["Due dispositivi hanno lo stesso IP. Sintomo possibile?", ["Connettività intermittente/conflitto ARP", "PDF sgranati", "Revit lento", "Audio basso"], 0], ["Wi‑Fi funziona ma Ethernet no su un PC. Primo confronto?", ["Configurazione NIC, link e IP delle due interfacce", "Reset dominio", "Pixera", "Adobe"], 0]], "MEETING": [["TV accesa ma nessuna immagine dal PC. Primo controllo?", ["Input selezionato, sorgente e cavo HDMI", "DNS", "Revit", "Spooler"], 0], ["Zoom vede video ma non sente il microfono. Cosa controlli?", ["Dispositivo input e permessi microfono", "DHCP", "Adobe Fonts", "Plotter"], 0], ["Teams usa l'altoparlante sbagliato. Dove intervieni?", ["Selezione dispositivo audio in Teams/sistema", "DNS server", "Desktop Connector", "Pixera"], 0], ["Il mirroring non trova il display. Primo approccio?", ["Rete, receiver e compatibilità/stato servizio", "Formattare PC", "Reset dominio", "Cambiare toner"], 0], ["La webcam non compare nell'app meeting. Primo test?", ["Permessi, collegamento e altra app che la sta usando", "Revit cache", "DNS reverse", "Adobe"], 0], ["Immagine HDMI presente ma senza audio. Cosa controlli?", ["Output audio selezionato e capacità HDMI/display", "DHCP", "Stampante", "Font"], 0], ["Presentazione tagliata ai bordi sul TV. Cosa verifichi?", ["Risoluzione/scaling/aspect ratio", "Account Autodesk", "Spooler", "Gateway"], 0], ["Il telecomando della sala non risponde. Primo controllo?", ["Batterie e puntamento/stato dispositivo", "DNS", "Revit", "Creative Cloud"], 0], ["Il display cambia input da solo. Cosa indaghi?", ["Auto input/CEC/configurazione professionale", "Font Book", "DHCP", "Toner"], 0], ["Audio in videoconferenza produce eco. Prima correzione?", ["Evitare doppi microfoni/speaker e verificare dispositivi attivi", "Cambiare VLAN", "Reset Adobe", "Reinstallare Revit"], 0], ["PC collegato via USB-C non manda video. Cosa verifichi?", ["Supporto video della porta/adattatore e cavo", "DNS", "Spooler", "Licenza Acrobat"], 0], ["Sala meeting offline ma PC naviga. Cosa controlli?", ["IP/rete del dispositivo AV e servizio receiver", "Formattare PC", "Cambiare mouse", "Reset font"], 0]], "SERVER": [["Un servizio server non risponde. Primo approccio?", ["Verificare host, rete, servizio e log", "Riavviare tutto senza verifiche", "Cancellare DNS", "Cambiare monitor"], 0], ["Spazio disco server quasi esaurito. Prima azione?", ["Identificare volumi/cartelle in crescita e causa", "Cancellare log a caso", "Formattare", "Spegnere switch"], 0], ["Molti utenti non autenticano. Cosa controlli?", ["Servizi dominio, DNS, connettività e log", "HDMI", "Adobe", "Toner"], 0], ["Una share server è improvvisamente read-only. Cosa verifichi?", ["Permessi, filesystem/spazio e stato servizio", "GPU client", "Pixera", "Bluetooth"], 0], ["Backup segnala fallimento. Primo passo?", ["Leggere errore/log e verificare destinazione/spazio/connettività", "Ignorarlo", "Cancellare backup precedenti subito", "Riavviare ogni PC"], 0], ["Server raggiungibile via IP ma non hostname. Cosa controlli?", ["DNS", "GPU", "USB", "Adobe Fonts"], 0], ["CPU server al 100%. Prima di terminare processi?", ["Identificare processo/carico e raccogliere evidenze", "Spegnere server", "Cancellare profili", "Cambiare VLAN"], 0], ["Un volume storage è degradato. Priorità?", ["Verificare stato array/dischi e protezione dati", "Reinstallare Office", "Reset TV", "Cambiare mouse"], 0], ["Un servizio si arresta ripetutamente. Cosa cerchi?", ["Event log/log applicativo, dipendenze e causa", "Toner", "HDMI", "Font"], 0], ["Una porta TCP applicativa non risponde. Cosa verifichi?", ["Servizio in ascolto, firewall e percorso rete", "Photoshop", "Mouse", "Display"], 0], ["Permessi di una cartella sono cambiati. Prima azione?", ["Verificare ACL, audit e modifica prima di sovrascrivere", "Formattare server", "Reset DHCP", "Cambiare monitor"], 0], ["Dopo un riavvio un servizio non parte automaticamente. Cosa controlli?", ["Startup type, dipendenze e log di avvio", "Adobe", "HDMI", "Stampante"], 0]], "PRINT": [["Stampante di rete offline per tutti. Primo controllo?", ["Alimentazione, rete/IP e raggiungibilità", "Formattare client", "Reset dominio", "Revit"], 0], ["Coda di stampa bloccata su un PC. Cosa controlli?", ["Coda/spooler e job problematico", "DNS globale", "Pixera", "Adobe Fonts"], 0], ["Plotter stampa formato errato. Cosa verifichi?", ["Formato carta, driver e impostazioni applicazione", "DHCP", "Account Autodesk", "GPU server"], 0], ["PDF esce con caratteri strani. Primo test?", ["Altro PDF/driver e incorporamento font", "Reset switch", "Cambiare VLAN", "Revit cache"], 0], ["Solo un utente non vede la stampante condivisa. Cosa controlli?", ["Connessione/mapping, driver e permessi utente", "Spegnere server", "HDMI", "Pixera"], 0], ["Stampante ha IP diverso dal configurato sul PC. Soluzione?", ["Correggere porta TCP/IP o indirizzamento", "Formattare PC", "Reset Adobe", "Cambiare mouse"], 0], ["Job enorme blocca la coda. Approccio?", ["Identificare/rimuovere job e verificare spooler", "Riavviare dominio", "Cancellare DNS", "Spegnere NAS"], 0], ["Stampa molto lenta da un solo file. Cosa confronti?", ["Complessità file, driver e stampa come immagine", "DHCP", "Revit licensing", "Bluetooth"], 0], ["Plotter segnala carta ma il rotolo è presente. Primo controllo?", ["Caricamento/sensori/formato selezionato", "DNS", "Adobe", "Windows Update"], 0], ["Colori molto diversi in stampa. Cosa indaghi?", ["Profilo colore, driver e impostazioni applicazione", "Gateway", "Active Directory", "Pixera"], 0], ["Driver vecchio causa crash applicazione. Cosa fai?", ["Verificare/aggiornare driver compatibile", "Reset dominio", "Cancellare share", "Cambiare HDMI"], 0], ["Stampante risponde al ping ma Windows la mostra offline. Cosa controlli?", ["Porta, SNMP/stato, spooler e driver", "DNS soltanto", "GPU", "Font Book"], 0]], "PIXERA": [["Un monitor del Rifugio Digitale è nero. Primo controllo?", ["Alimentazione, input, segnale e player/Pixera", "Domain controller", "Revit", "Spooler"], 0], ["Pixera vede il player ma non manda contenuto. Cosa controlli?", ["Timeline/output/mapping e stato del player", "Adobe Fonts", "DHCP client casuale", "Mouse"], 0], ["Due display non sono sincronizzati. Cosa indaghi?", ["Sync, rete, timing e configurazione output", "Revit cache", "Toner", "Office"], 0], ["Il contenuto ha risoluzione errata. Cosa controlli?", ["Canvas/output resolution e mapping display", "DNS reverse", "Account Windows", "Stampante"], 0], ["Un player Pixera risulta offline. Primo test?", ["Rete/IP, alimentazione e servizio player", "Photoshop", "HDMI del laptop", "GPO"], 0], ["Il monitor mostra desktop invece del contenuto. Cosa verifichi?", ["Output assegnato/fullscreen e configurazione player", "DHCP server", "Revit", "Toner"], 0], ["Contenuto scatta su un display. Cosa controlli?", ["Prestazioni player, codec/media e rete", "Font Book", "Spooler", "Mouse"], 0], ["Pixera perde connessione dopo standby display. Cosa indaghi?", ["Power management, rete e handshake/output", "Adobe", "DNS cache client", "Revit"], 0], ["Un file media non viene riprodotto. Primo controllo?", ["Codec/formato, percorso e accessibilità del file", "Domain controller", "Stampante", "USB mouse"], 0], ["Display wall mostra ordine sbagliato. Cosa correggi?", ["Mapping/assegnazione output", "DNS", "Creative Cloud", "DHCP"], 0], ["Tutti i display diventano neri insieme. Priorità?", ["Verificare player/master, rete e distribuzione segnale", "Cambiare ogni monitor", "Reset font", "Revit"], 0], ["Pixera segnala media missing. Cosa fai?", ["Verificare percorso, storage e relink dei media", "Formattare player", "Reset dominio", "Cambiare toner"], 0]], "IT": [["Devi diagnosticare un PC lento. Quale dato raccogli per primo?", ["CPU/RAM/disco, uptime e processi", "Colore wallpaper", "Numero di monitor", "Versione PDF"], 0], ["Un utente non riesce a fare login. Primo approccio?", ["Verificare errore, rete, account e dominio", "Formattare PC", "Cambiare HDMI", "Reset Pixera"], 0], ["gpupdate /force restituisce errore. Cosa fai?", ["Leggere errore e verificare connettività/DNS/dominio", "Cancellare Windows", "Reset Adobe", "Cambiare stampante"], 0], ["Devi liberare spazio senza rischiare dati utente. Approccio?", ["Analizzare e pulire cache/temp sicure, non dati di lavoro", "Cancellare Desktop", "Formattare", "Eliminare profilo"], 0], ["Un software non parte dopo aggiornamento. Primo controllo?", ["Log/errore, compatibilità e dipendenze", "Riavviare switch", "Cambiare VLAN", "Toner"], 0], ["Devi capire se un servizio remoto risponde su una porta. Cosa verifichi?", ["Connettività host e test della porta specifica", "Photoshop", "HDMI", "Font"], 0], ["Utente ha password scaduta. Intervento corretto?", ["Gestire reset/cambio secondo policy e verificare account", "Creare account condiviso", "Disabilitare dominio", "Formattare"], 0], ["PC non applica una nuova configurazione. Cosa confronti?", ["Policy/config effettiva, log e riavvio se necessario", "Toner", "Pixera", "Illustrator"], 0], ["Un'app richiede admin per funzionare. Prima di concederlo?", ["Capire requisito e trovare soluzione a minimo privilegio", "Dare Domain Admin", "Disabilitare UAC ovunque", "Condividere password IT"], 0], ["Un utente segnala 'Internet rotto'. Prima domanda utile?", ["Capire cosa non funziona e se riguarda altri servizi/utenti", "Formattare", "Reset server", "Cambiare monitor"], 0], ["Devi riavviare un PC remoto dopo intervento. Cosa è importante?", ["Verificare lavoro utente e comunicare prima del riavvio", "Spegnere senza avviso", "Cancellare profilo", "Cambiare IP"], 0], ["Un errore compare dopo login solo per un utente. Cosa sospetti tra le prime cose?", ["Profilo/configurazione utente o startup specifico", "Switch core", "Pixera", "Plotter"], 0]]};
const questionDecks={};
function categoryForStation(s){
 if(!s)return "WORKSTATION";
 if(s.room==="GRAFICA"||s.room==="THE BUNKER")return "MAC_ADOBE";
 if(s.room==="SERVER")return "SERVER";
 if(["SALA MEET","SPAZIO A","SALA CORTE"].includes(s.room))return "MEETING";
 if(s.room==="RIFUGIO DIGITALE")return "PIXERA";
 if(s.room==="STAMPANTI")return "PRINT";
 if(s.room==="IT")return "IT";
 if(s.room==="CENTRALE")return Math.random()<.35?"NETWORK":"WORKSTATION";
 return Math.random()<.18?"NETWORK":"WORKSTATION";
}
function drawQuestion(category){
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
const stations=[
 ...[[405,405],[455,405],[505,405],[555,405],[605,405],[655,405],
     [405,480],[455,480],[505,480],[555,480],[605,480],[655,480]].map((p,i)=>({id:"C"+String(i+1).padStart(2,"0"),room:"CENTRALE",type:"HP Z",x:p[0],y:p[1]})),
 ...[[95,155],[145,155],[195,155],[120,205]].map((p,i)=>({id:"G"+String(i+1).padStart(2,"0"),room:"GRAFICA",type:"MAC",x:p[0],y:p[1]})),
 ...[[1080,170],[1130,170],[1170,220]].map((p,i)=>({id:"B"+String(i+1).padStart(2,"0"),room:"THE BUNKER",type:"MAC",x:p[0],y:p[1]})),
 ...[[350,155],[405,155],[455,205]].map((p,i)=>({id:"L"+String(i+1).padStart(2,"0"),room:"LOFT",type:"HP Z",x:p[0],y:p[1]})),
 ...[[110,385],[165,385],[135,450]].map((p,i)=>({id:"A"+String(i+1).padStart(2,"0"),room:"ABA",type:"HP Z",x:p[0],y:p[1]})),
 ...[[1300,165],[1360,165],[1415,215]].map((p,i)=>({id:"P"+String(i+1).padStart(2,"0"),room:"PANTHEON",type:"HP Z",x:p[0],y:p[1]})),
 ...[[95,600],[150,600],[195,650]].map((p,i)=>({id:"IT"+String(i+1).padStart(2,"0"),room:"IT",type:"HP Z",x:p[0],y:p[1]})),
 {id:"MEET-TV",room:"SALA MEET",type:"AV",x:925,y:205},
 {id:"SPAZIO-TV",room:"SPAZIO A",type:"AV",x:1030,y:480},
 {id:"CORTE-TV",room:"SALA CORTE",type:"AV",x:1395,y:535},
 {id:"PIX-01",room:"RIFUGIO DIGITALE",type:"PIXERA",x:1080,y:635},
 {id:"PIX-02",room:"RIFUGIO DIGITALE",type:"PIXERA",x:1130,y:635},
 {id:"SRV-01",room:"SERVER",type:"SERVER",x:610,y:145},
 {id:"SRV-02",room:"SERVER",type:"SERVER",x:665,y:145},
 {id:"PRN-01",room:"STAMPANTI",type:"PRINTER",x:1210,y:805},
 {id:"PRN-02",room:"STAMPANTI",type:"PRINTER",x:1260,y:805},
 {id:"PRN-03",room:"STAMPANTI",type:"PRINTER",x:1310,y:805}
];

const npcDefs=[
 {id:"pao",name:"PAO",role:"BIMER",x:250,y:620,tone:"mixed",shirt:"#536f8b",hunter:true},
 {id:"zia",name:"ZIA ALE",role:"SEGRETERIA",x:685,y:815,tone:"good",shirt:"#765d78"},
 {id:"don",name:"DON",role:"JOLLY",x:895,y:815,tone:"good",shirt:"#566a51"},
 {id:"dilik",name:"DILIK",role:"JOLLY",x:460,y:430,tone:"good",shirt:"#496b75",hunter:true}
];
const ambientNames=["ALE","CRI","RIDER","FABI","GIADA","TOM","LUCA","MARTI","SARA","NICO","VALE","ANNA","MARCO","ELI"];
let ambientNPCs=[];
function spawnAmbient(){
 const seats=stations.filter(s=>["HP Z","MAC"].includes(s.type));
 ambientNPCs=seats.slice(0,14).map((s,i)=>({name:ambientNames[i%ambientNames.length],homeX:s.x,homeY:s.y+24,x:s.x,y:s.y+24,state:"work",timer:35+Math.random()*90,speed:42,shirt:["#4f6259","#665747","#4d596b","#6b4e57"][i%4]}));
}
function updateAmbient(dt){
 for(const n of ambientNPCs){
  n.timer-=dt;
  if(n.state==="work"&&n.timer<=0&&Math.random()<.55){n.state="kitchen";n.tx=900+Math.random()*150;n.ty=800+Math.random()*35;n.timer=18+Math.random()*18}
  if(n.state==="kitchen"){
    let dx=n.tx-n.x,dy=n.ty-n.y,d=Math.hypot(dx,dy);
    if(d>8){let nx=n.x+dx/d*n.speed*dt,ny=n.y+dy/d*n.speed*dt;if(walkable(nx,n.y))n.x=nx;if(walkable(n.x,ny))n.y=ny}
    else if(n.timer<=0){n.state="return";n.tx=n.homeX;n.ty=n.homeY}
  } else if(n.state==="return"){
    let dx=n.tx-n.x,dy=n.ty-n.y,d=Math.hypot(dx,dy);
    if(d>8){let nx=n.x+dx/d*n.speed*dt,ny=n.y+dy/d*n.speed*dt;if(walkable(nx,n.y))n.x=nx;if(walkable(n.x,ny))n.y=ny}
    else {n.x=n.homeX;n.y=n.homeY;n.state="work";n.timer=45+Math.random()*100}
  }
 }
}
let npcs=[],mokasa=null,npcCooldown={},mokasaTimer=0,lastZiaHour=-1,idleMinutes=0,lastPlayerPos={x:0,y:0};
let phoneQueue=[],visualAnomaly=null,inventory=[],carryMission=null,encounterLock=false;
function phoneMessage(sender,text){
 const box=$("#phoneNotification"); if(!box)return;
 $("#phoneSender").textContent=sender;$("#phoneText").textContent=text;
 box.classList.add("on");clearTimeout(box._t);box._t=setTimeout(()=>box.classList.remove("on"),4200);
}
function updateInventoryUI(){
 const el=$("#inventory");if(!el)return;
 el.innerHTML=[0,1,2].map(i=>`<div class="slot">${inventory[i]||"—"}</div>`).join("");
}
function startCarryMission(){
 if(carryMission||Math.random()>.20)return;
 const missions=[
  {item:"ADATTATORE HDMI",from:{x:170,y:640,room:"IT"},to:{x:925,y:205,room:"SALA MEET"}},
  {item:"TONER",from:{x:1210,y:805,room:"STAMPANTI"},to:{x:1310,y:805,room:"STAMPANTI"}},
  {item:"CAVO ETHERNET",from:{x:640,y:190,room:"SERVER"},to:{x:520,y:480,room:"CENTRALE"}},
  {item:"TELECOMANDO",from:{x:170,y:640,room:"IT"},to:{x:1395,y:535,room:"SALA CORTE"}}
 ];
 carryMission=missions[Math.floor(Math.random()*missions.length)];carryMission.stage="pickup";
 phoneMessage("IT TASK",`Recupera ${carryMission.item} in ${carryMission.from.room} e portalo in ${carryMission.to.room}.`);
}
function interactCarry(){
 if(!carryMission)return false;
 const target=carryMission.stage==="pickup"?carryMission.from:carryMission.to;
 if(Math.hypot(player.x-target.x,player.y-target.y)>80)return false;
 if(carryMission.stage==="pickup"){
  if(inventory.length>=3){toast("INVENTARIO PIENO");return true}
  inventory.push(carryMission.item);carryMission.stage="deliver";updateInventoryUI();toast(`${carryMission.item} RACCOLTO`);
 }else{
  inventory=inventory.filter(x=>x!==carryMission.item);state.xp+=180;state.solved++;state.stress=Math.max(0,state.stress-3);
  toast(`CONSEGNA COMPLETATA +180 XP`);carryMission=null;updateInventoryUI();
 }
 return true;
}


function shuffledQuestion(q){
 const arr=q[1].map((text,i)=>({text,correct:i===q[2]}));
 for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]]}
 return [q[0],arr.map(x=>x.text),arr.findIndex(x=>x.correct)];
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
   mokasa={id:"mokasa",name:"MOKASA",role:"SALA CORTE // EXTREME",x:1450,y:570,tone:"bad",shirt:"#75483d",life:95,court:true};
   phoneMessage("DIREZIONE","MoKasa è in Sala Corte. Se entri, preparati.");
 }else{
   const candidates=stations.filter(s=>s.room!=="SERVER");
   const s=candidates[Math.floor(Math.random()*candidates.length)];
   mokasa={id:"mokasa",name:"MOKASA",role:"CAPO",x:s.x+22,y:s.y+26,tone:"bad",shirt:"#75483d",life:45,court:false};
 }
}
function autoCloseModal(ms=2200){
 clearTimeout(window.__npcModalTimer);
 window.__npcModalTimer=setTimeout(()=>{
   const m=$("#modal");
   if(m&&!m.classList.contains("hidden"))m.classList.add("hidden");
 },ms);
}
function npcTalk(n){
 const now=state.min;
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
 }else if(n.id==="dilik"){
  title=["CAFFÈ","DRITTA","PAUSA TATTICA"][Math.floor(Math.random()*3)];
  state.stress=Math.max(0,state.stress-8);state.xp+=6;desc="STRESS -8 · XP +6";
 }else if(n.id==="don"){
  const ev=[["CAFFÈ",-8],["SIGARETTA",-11],["CHIACCHIERE",-6]][Math.floor(Math.random()*3)];
  title=ev[0];state.stress=Math.max(0,state.stress+ev[1]);desc=`STRESS ${ev[1]}`;
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
function reset(){const bad=validateMap();if(bad.length)console.warn("Unreachable task points disabled:",bad);state={phase:"shift",min:START,stress:0,rep:5,xp:0,incident:0,strikes:0,maxStrikes:difficultyConfig[difficulty].maxStrikes,solved:0,anomalyPenalty:0,bossPhase:0};player={x:535,y:610,s:205};tickets=[];last=performance.now();spawnTimer=0;anomTimer=0;phoneQueue=[];visualAnomaly=null;inventory=[];carryMission=null;encounterLock=false;spawnNPCs();updateInventoryUI();newTicket("LOW");hud()}
function inside(r,x,y,p=0){return x>=r.x+p&&x<=r.x+r.w-p&&y>=r.y+p&&y<=r.y+r.h-p}
function walkable(x,y){if(!walkZones.some(z=>inside(z,x,y)))return false;return !obstacles.some(o=>x>o.x+5&&x<o.x+o.w-5&&y>o.y+5&&y<o.y+o.h-5)}
function fmt(m){m=Math.max(START,Math.min(END,m));return String(Math.floor(m/60)).padStart(2,"0")+":"+String(Math.floor(m%60)).padStart(2,"0")}
function anomalyLevel(){return Math.max(0,Math.min(1,(state.min-START)/(BOSS-START)))}
function levelForTime(){let a=Math.random();if(state.min<720)return a<.75?"LOW":"MEDIUM";if(state.min<900)return a<.45?"LOW":a<.88?"MEDIUM":"HIGH";return a<.2?"LOW":a<.65?"MEDIUM":"HIGH"}
function reachablePoints(){const R=reachableSet();return points.filter(p=>pointReachable(p,R))}
function farthestPoint(){let ps=reachablePoints();return [...ps].sort((a,b)=>Math.hypot(player.x-b.x,player.y-b.y)-Math.hypot(player.x-a.x,player.y-a.y))[0]}
function newTicket(force){
 if(state.phase!=="shift"||tickets.length>=difficultyConfig[difficulty].maxTickets)return;
 let level=force||levelForTime(),p;
 let valid=stations.filter(s=>walkable(s.x,s.y)||reachablePoints().some(p=>Math.hypot(p.x-s.x,p.y-s.y)<95));
 if(!valid.length)valid=reachablePoints();
 const weighted=[...valid,...valid.filter(s=>s.room==="CENTRALE"),...valid.filter(s=>s.room==="CENTRALE")];
 if(level==="CRITICAL")p=[...valid].sort((a,b)=>Math.hypot(player.x-b.x,player.y-b.y)-Math.hypot(player.x-a.x,player.y-a.y))[0];
 else p=weighted[Math.floor(Math.random()*weighted.length)];
 let mins={LOW:110,MEDIUM:90,HIGH:70,CRITICAL:42}[level]*difficultyConfig[difficulty].timeMult;
 tickets.push({id:crypto.randomUUID?crypto.randomUUID():Math.random()+"",level,p,due:Math.min(BOSS-.2,state.min+mins),q:drawQuestion(categoryForStation(p)),criticalFrom:level==="CRITICAL"?bosses[Math.floor(Math.random()*bosses.length)]:null,expired:false});
 renderTickets();
}
function renderTickets(){
 $("#ticketText").innerHTML=tickets.length?tickets.map(t=>`<div class="ticket ${t.level.toLowerCase()}"><b>${t.level}${t.criticalFrom?" // "+t.criticalFrom:""}</b><br>${t.p.room} — ${t.p.id||t.p.kind||t.p.type}<br>deadline ${fmt(t.due)}</div>`).join(""):"Nessun ticket aperto.";
}
function interact(){
 if(state.phase!=="shift")return;
 if(interactCarry())return;
 let i=tickets.findIndex(t=>Math.hypot(player.x-t.p.x,player.y-t.p.y)<75);
 if(i<0){
 const near=nearestNPC();
 if(near&&near.d<65){npcTalk(near.n);return}
 toast("Nessuna task o NPC in questo punto.");return
}
 let t=tickets[i],q=t.q;
 $("#modalBody").innerHTML=`<h2 class="${t.level.toLowerCase()}">${t.level}${t.criticalFrom?" // "+t.criticalFrom:""}</h2><p><b>${t.p.room}</b></p><p>${q[0]}</p>${q[1].map((a,n)=>`<button class="choice answer" data-n="${n}">${String.fromCharCode(65+n)}. ${a}</button>`).join("")}`;
 $("#modal").classList.remove("hidden");document.querySelectorAll(".answer").forEach(b=>b.onclick=()=>answer(i,+b.dataset.n));
}
function answer(i,n){
 let t=tickets[i],ok=n===t.q[2],xp={LOW:100,MEDIUM:250,HIGH:500,CRITICAL:750}[t.level];
 tickets.splice(i,1);$("#modal").classList.add("hidden");
 if(ok){state.xp+=xp;state.solved++;state.incident-=({LOW:2,MEDIUM:4,HIGH:7,CRITICAL:8}[t.level]);state.stress-=4;toast(`${t.level} RISOLTO +${xp} XP`)}
 else{state.strikes++;state.stress+=({LOW:7,MEDIUM:12,HIGH:18,CRITICAL:20}[t.level])*difficultyConfig[difficulty].stressMult;state.incident+=({LOW:5,MEDIUM:9,HIGH:15,CRITICAL:18}[t.level])*difficultyConfig[difficulty].incidentMult;state.rep-=t.level==="CRITICAL"?2:1;toast("RISPOSTA ERRATA // STRIKE +1")}
 clamp();renderTickets();checkEarlyEnd();
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
function anomalyEvent(){
 const a=anomalyLevel(),now=performance.now();
 const kinds=a<.35?["MONITOR","LIGHT","PRINTER","BATHROOM"]:a<.7?["PIXERA","MONITOR1905","LIGHT","BATHROOM"]:["PIXERA_ALL","RGB","MONITOR1905","SHADOW","BLACKOUT"];
 const kind=kinds[Math.floor(Math.random()*kinds.length)];
 visualAnomaly={kind,until:now+(kind==="BLACKOUT"?1800:3200),seed:Math.random()};
 if(kind==="PRINTER")toast("STAMPANTE // JOB SCONOSCIUTO");
 if(kind==="BATHROOM"&&a>.45)phoneMessage("NUMERO SCONOSCIUTO","...");
 if(a>.72&&Math.random()<.18){showAnomaly("ANOMALIA CRITICA // "+kind,1700);state.anomalyPenalty++}
 if(a>.55&&Math.random()<.16)state.stress+=2*difficultyConfig[difficulty].stressMult;
}function maybeCritical(){if(state.min>600&&Math.random()<difficultyConfig[difficulty].criticalChance)newTicket("CRITICAL")}
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
function ending(type,text,win=false){
 state.phase="ended";state.min=END;clamp();
 if(win){
  $("#modalBody").innerHTML=`<div id="winPanel"><h2 class="low">HAI VINTO</h2><p>TURNO COMPLETATO // 19:00</p><p>XP <b>${state.xp}</b> · ERRORI <b>${state.strikes}/${state.maxStrikes}</b> · TICKET <b>${state.solved}</b> · INCIDENT <b>${Math.round(state.incident)}%</b></p></div>`;
  $("#modal").classList.remove("hidden");
  setTimeout(()=>{
   $("#modalBody").innerHTML=`<div class="arc-cmd"><pre>C:\\ARCHEA\\SYSTEM&gt; logout

closing session...
saving logs...
disconnecting user...

OK.

19:05:00

incoming connection...

ARC_VOID_00

authentication request...
user: UNKNOWN
password: ********

ACCESS GRANTED

ARC_VOID_00 LOGIN 19:05

&gt; there is still someone in the building.

_</pre><button class="choice" onclick="location.reload()">TORNA AL MENU</button></div>`;
  },4800);
 }else{
  $("#modalBody").innerHTML=`<h2 class="critical">BAD ENDING // ${type}</h2><p>${text}</p><p>XP <b>${state.xp}</b> · ERRORI <b>${state.strikes}/${state.maxStrikes}</b> · INCIDENT <b>${Math.round(state.incident)}%</b></p><button class="choice" onclick="location.reload()">NUOVA PARTITA</button>`;
  $("#modal").classList.remove("hidden");
 }
}
function clamp(){state.incident=Math.max(0,Math.min(100,state.incident));state.stress=Math.max(0,Math.min(100,state.stress));state.rep=Math.max(0,Math.min(5,state.rep))}
$("#x").onclick=()=>{if(state&&state.phase!=="shift"){toast("Questo evento non può essere ignorato.");return}$("#modal").classList.add("hidden")};
function hud(){clamp();$("#clock").textContent=fmt(state.min);$("#stress").textContent=Math.round(state.stress)+"%";$("#rep").textContent="★".repeat(state.rep)+"☆".repeat(5-state.rep);$("#strikes").textContent=state.strikes+"/"+state.maxStrikes;$("#xp").textContent=state.xp;$("#incident").textContent=Math.round(state.incident)+"%"}
function update(dt){
 if(state.phase==="shift"){
  let dx=(keys.d||keys.arrowright?1:0)-(keys.a||keys.arrowleft?1:0),dy=(keys.s||keys.arrowdown?1:0)-(keys.w||keys.arrowup?1:0);
  if(dx||dy){let l=Math.hypot(dx,dy),vx=dx/l*player.s*dt,vy=dy/l*player.s*dt;if(walkable(player.x+vx,player.y))player.x+=vx;if(walkable(player.x,player.y+vy))player.y+=vy}
  state.min=Math.min(BOSS,state.min+dt*difficultyConfig[difficulty].timeSpeed);if(state.min>=BOSS){startBoss();hud();return}
  spawnTimer+=dt;anomTimer+=dt;
 const hr=Math.floor(state.min/60);
 if(hr!==lastZiaHour){
   lastZiaHour=hr;
   if(state.min>START+10&&Math.random()<.78)phoneMessage("ZIA ALE","Quando puoi passa da me in Segreteria.");
   if(Math.random()<.32)phoneMessage(Math.random()<.5?"PAO":"DILIK","Ti sto cercando. Se ci incrociamo ho una cosa per te.");
   startCarryMission();
 }
 mokasaTimer+=dt*difficultyConfig[difficulty].timeSpeed;
 if(!mokasa&&state.min>620&&mokasaTimer>55&&Math.random()<.004){spawnMokasa();mokasaTimer=0}
 if(mokasa){mokasa.life-=dt*difficultyConfig[difficulty].timeSpeed;if(mokasa.life<=0)mokasa=null}
 updateAmbient(dt);
 for(const n of npcs.filter(x=>x.hunter)){
   if(Math.random()<.0025){n.seeking=true;n.seekFor=12}
   if(n.seeking){
     n.seekFor-=dt;let dx=player.x-n.x,dy=player.y-n.y,d=Math.hypot(dx,dy);
     if(d>55){let nx=n.x+dx/d*55*dt,ny=n.y+dy/d*55*dt;if(walkable(nx,n.y))n.x=nx;if(walkable(n.x,ny))n.y=ny}
     if(d<72&&!encounterLock){
       encounterLock=true;n.seeking=false;n.exclaimUntil=performance.now()+650;
       setTimeout(()=>{npcTalk(n);encounterLock=false},650);
     }
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
if(spawnTimer>difficultyConfig[difficulty].spawnSeconds){spawnTimer=0;newTicket();maybeCritical()}if(anomTimer>Math.max(5,14-anomalyLevel()*8)){anomTimer=0;anomalyEvent()}
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

 // V2.6.1 workstation overlay
 stations.forEach(s=>{
   if(s.type==="MAC"){g.fillStyle="#e3e1d9";g.fillRect(s.x-10,s.y-10,20,16);g.fillStyle="#87aeb9";g.fillRect(s.x-7,s.y-7,14,9)}
   else if(s.type==="HP Z"){g.fillStyle="#252c29";g.fillRect(s.x-11,s.y-10,22,16);g.fillStyle="#4d94b3";g.fillRect(s.x-8,s.y-7,16,9);g.fillStyle="#111";g.fillRect(s.x+13,s.y-6,6,14)}
   else if(s.type==="AV"||s.type==="PIXERA"){g.fillStyle="#151a18";g.fillRect(s.x-18,s.y-13,36,22);g.fillStyle=s.type==="PIXERA"?"#725b96":"#3d778e";g.fillRect(s.x-14,s.y-9,28,14)}
 });
 [...npcs,...(mokasa?[mokasa]:[])].forEach(n=>{
   g.fillStyle="rgba(0,0,0,.3)";g.beginPath();g.ellipse(n.x,n.y+14,11,5,0,0,Math.PI*2);g.fill();
   g.fillStyle=n.shirt;g.fillRect(n.x-8,n.y-12,16,22);g.fillStyle="#d0a887";g.fillRect(n.x-6,n.y-19,12,8);
   g.fillStyle="#050706";g.fillRect(n.x-30,n.y-39,60,13);
   g.fillStyle=n.tone==="bad"?"#ff6262":n.tone==="good"?"#62e568":"#ffd447";
   g.font="bold 9px monospace";g.textAlign="center";g.fillText(n.name,n.x,n.y-30);g.textAlign="left";
 });
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
