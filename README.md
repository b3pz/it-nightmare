# IT NIGHTMARE V2 — ARCHEA // AFTER HOURS

Baseline: ZIP legacy fornito dall'utente.

## V2
- Boot + pagina Lore ripristinati.
- Turno 09:00 → 18:52 → boss → 19:00.
- Tempo centralizzato: non può superare 19:00.
- Ticket LOW / MEDIUM / HIGH.
- CRITICAL esclusivi dei capi, con deadline breve e spawn nel punto più lontano dal giocatore.
- Vere domande IT a risposta multipla.
- XP: LOW 100, MEDIUM 250, HIGH 500, CRITICAL 750.
- 3 errori/strike = Bad Ending anticipato.
- Bad Ending anche per reputazione 0, Incident 100, Stress 100.
- Anomaly System attivo fin dalla mattina e crescente, invisibile nell'HUD.
- Anomalie atmosferiche casuali.
- Le anomalie possono aumentare la difficoltà del boss.
- Boss ARCH-VOID in 3 fasi.
- Good Ending + teaser 19:03.
- Navigation layer separato dalla grafica.
- Corridoi e porte volutamente molto larghi.
- F2: debug aree percorribili/ostacoli.
- PC + mobile.

## Regola V2
Nessun nuovo sviluppo deve eliminare funzioni approvate in questa build senza decisione esplicita.


## V2.1 HOTFIX
- Desktop: schermate rese mutuamente esclusive; la Lore non può restare sopra il gioco.
- Cache busting CSS/JS per GitHub Pages.
- Navigation layer completamente ridisegnato.
- Corridoi più larghi.
- Porte come ponti reali tra stanza e corridoio.
- Collisione mobili resa meno aggressiva.
- Test automatico di raggiungibilità dei punti task.
- I ticket possono spawnare solo su zone raggiungibili.
- CRITICAL sceglie il punto più lontano solo tra quelli raggiungibili.
- Deadline temporaneamente più generose: LOW 75m, MEDIUM 55m, HIGH 40m, CRITICAL 20m.
- F2: verde=stanze, blu=corridoi, giallo=porte, rosso=ostacoli.

## V2.2 — VISUAL MAP PASS
- F2 e navigation layer mantenuti.
- Corridoi visivi più stretti delle collisioni reali.
- Muri con spessore e ombre.
- Porte grafiche più credibili, collisioni ancora permissive.
- Pavimenti pietra/legno/tile/server.
- Migliorati scrivanie, monitor, rack, stampanti, piante, luci e dettagli.
- Migliorata atmosfera horror progressiva.

## V2.2.1 — MAP RENDER HOTFIX
Corretto un errore nel Visual Map Pass V2.2: il renderer usava `ctx` mentre
il contesto Canvas del gioco è definito come `g`. Questo interrompeva `draw()`
e lasciava visibili HUD e Ticket Queue ma non la mappa.
Nessuna modifica a collisioni, F2, ticket, tempo, anomalie o boss.

## V2.2.2 — DOOR PASS
- F2 e tutte le collisioni V2.2.1 restano inalterate.
- Rimossi i rettangoli marroni che simulavano le porte nel mezzo dei corridoi.
- Le doorZone servono ora solo per individuare il muro reale da interrompere.
- Aperture grafiche ricavate direttamente sui bordi delle stanze.
- Aggiunti stipiti e soglie semplici in pixel-art.
- L'apertura visiva è più stretta dell'area di collisione, quindi il passaggio rimane facile.

## V2.3 — DIFFICULTY & ANOMALY PASS
- Nuova selezione difficoltà prima del turno.
- EASY: 5 errori, più tempo, malus ridotti.
- NORMAL: 3 errori, più tempo rispetto alla V2.2.2.
- HARD: 2 errori, tempi più stretti.
- NIGHTMARE: 1 errore, massima pressione.
- Deadline base aumentate: LOW 95, MEDIUM 75, HIGH 55, CRITICAL 30 minuti di gioco, poi moltiplicate dalla difficoltà.
- Le anomalie non sono più semplici toast: appaiono come eventi grandi quasi full-screen.
- Le anomalie avanzate rimangono più a lungo.
- F2, mappa, porte e collisioni V2.2.2 inalterate.

## V2.6 — OFFICE ALIVE
Base: V2.3 stabile, senza usare la V2.4 NPC difettosa.

### Mappa
- Geometria, porte, F2 e collisioni della base stabile mantenute.
- Aggiunta dorsale/corridoio sinistro per Grafica → ABA → IT.
- Rinominate le stanze:
  - vecchia IT = CENTRALE
  - vecchio Loft = IT
  - vecchia Centrale = LOFT
  - Server/Soppalco = SERVER
  - Contratti = THE BUNKER
  - Sala Meet Laura = SALA MEET
  - Ingresso = INGRESSO / SEGRETERIA

### Postazioni
- CENTRALE: 12 HP Z Workstation e peso di spawn ticket maggiore.
- GRAFICA: Mac/macOS.
- THE BUNKER: Mac/macOS.
- Altri reparti PC: HP Z Workstation.
- Sale meeting: endpoint AV.
- RIFUGIO DIGITALE: monitor/Pixera.
- SERVER: endpoint infrastrutturali.
- STAMPANTI: printer endpoint.

### NPC
- PAO: 70% bonus (Fiorentina/Rassina/calcio/caffè), 30% rogne Revit/Desktop Connector.
- ZIA ALE: fissa in Segreteria; richiamo circa ogni ora; 80% bonus / 20% problema boomer.
- DON: jolly prevalentemente benevolo; caffè/sigaretta/chiacchiere.
- MOKASA: spawn casuale; può punire inattività/cazzeggio, stress/reputazione/CRITICAL.

### Feedback
- Ticket scaduto = overlay rosso quasi fullscreen con STRIKE +1.
- Anomalie contestuali anche in BAGNI e RIFUGIO DIGITALE/Pixera.
- Oggetti/collectible NON ancora implementati: riservati alla V3.


## V2.6.1 TRUE BUILD
Build verificata automaticamente prima della consegna. Include davvero corridoio sinistro, nuovi nomi stanze, postazioni, 4 NPC, risposte randomizzate, strike overlay e anomalie Bagni/Rifugio Digitale.

## V2.6.2 — LEFT CORRIDOR GEOMETRY FIX
- Spostata la dorsale sinistra fuori dalle stanze.
- Ora occupa la fascia nera alla destra di ABA e IT.
- Grafica si collega tramite il corridoio orizzontale superiore.
- ABA e IT hanno bridge dedicati verso la dorsale.
- F2, NPC, postazioni, ticket e gameplay invariati.

## V2.6.3 — BALANCE PASS
Correzione strutturale della difficoltà.

Durata reale indicativa del turno 09:00 → 18:52:
- EASY: circa 7,5 minuti reali
- NORMAL: circa 5,3 minuti
- HARD: circa 3,9 minuti
- NIGHTMARE: circa 3 minuti

EASY:
- 7 strike
- massimo 2 ticket contemporanei
- ticket più distanziati
- LOW scaduto non dà strike
- stress/incident dimezzati
- CRITICAL molto più rari

NORMAL:
- 4 strike
- massimo 3 ticket
- tempi più generosi e pressione ridotta

HARD/NIGHTMARE:
- restano modalità sfida.

Deadline base aumentate:
LOW 110, MEDIUM 90, HIGH 70, CRITICAL 42 minuti di gioco,
moltiplicate poi dalla difficoltà.

Mappa, corridoio sinistro, F2, NPC e Office Alive invariati.

## V2.6.4 — NPC INTERACTION UX
- MOKASA non richiede più E/tap: quando entra nel raggio del giocatore interagisce automaticamente.
- Dopo l'interazione MOKASA sparisce per evitare colpi multipli nello stesso spawn.
- Popup bonus/malus NPC si chiudono automaticamente.
- Popup normali: circa 2,1 secondi.
- Popup MOKASA: circa 2,6 secondi.
- La X resta disponibile, ma non è più necessaria.
- Bilanciamento V2.6.3, mappa, corridoio, F2 e collisioni invariati.

## V2.6.4.1 — STARTUP HOTFIX
Corretto un errore di sintassi nella funzione `expireTickets()` introdotto dal Balance Pass.
L'errore bloccava completamente l'esecuzione di `game.js`, quindi il pulsante INIZIA TURNO non rispondeva.
Nessuna modifica a gameplay, mappa, NPC, bilanciamento, F2 o collisioni.

## V2.7 — QUESTION & LIVING OFFICE
- Fix reale del timer per difficoltà (la 2.6.4.1 usava ancora TIME_SPEED fisso nell'update).
- 96 domande contestuali divise in 8 pool: Mac/Adobe, Workstation, Network, Meeting, Server, Print, Pixera, IT.
- Question deck anti-ripetizione + risposte random.
- Centrale mantiene peso ticket maggiore.
- Dilik aggiunto; Pao e Dilik possono cercare il giocatore.
- Encounter con ! stile Pokémon.
- 14 NPC ambientali occupano postazioni; alcuni fanno routine postazione → cucina → ritorno.
- Notifiche telefono per Zia Ale/Pao/Dilik.
- Inventario 3 slot + prime missioni fisiche di trasporto.
- Anomalie visive sulla mappa: monitor, 19:05, Pixera, luci, blackout, RGB, ombra, bagno.
- MoKasa può comparire in Sala Corte come incontro EXTREME opzionale.
- Finale positivo: HAI VINTO, poi falsa chiusura e CMD ARC_VOID_00 LOGIN 19:05.
- Collisioni, F2 e geometria della V2.6.4.1 mantenute.

## V2.7.1 — LIVING OFFICE / ENCOUNTER FIX
- DILIK rimosso: DON è il nome definitivo del Jolly.
- DON eredita ricerca giocatore e notifiche.
- NPC ambientali ora usano waypoint/corridoi invece di tentare una linea retta attraverso i muri.
- 14 colleghi occupano postazioni; molti si alzano, vanno in cucina, sostano e tornano.
- Encounter stile Pokémon reso esplicito: grande !, blocco movimento, nome NPC, “ORA CHE TI VEDO...”, poi interazione automatica.
- Pao e Don cercano il giocatore con frequenza aumentata.
- Nessuna modifica a mappa, F2, ticket contestuali, inventario, anomalie o finale.

## V2.7.2 — STABILIZATION & INVENTORY

### Collisioni
- Il giocatore ha ora una collisione separata e più rigorosa rispetto agli NPC.
- Attraversare il bordo di una stanza è consentito soltanto dentro una doorZone.
- Gli NPC continuano a usare il loro sistema walkable/waypoint.
- F2 invariato.

### Inventario
- 3 slot reali.
- Oggetti fisici visibili sulla mappa.
- Prompt contestuali: E — RACCOGLI / E — CONSEGNA.
- Mission panel sempre chiaro con oggetto e destinazione.
- Prime missioni:
  - TONER → stampante.
  - CHIAVETTA USB → NPC specifico.
  - CUFFIE → NPC specifico.
  - ADATTATORE USB-C/HDMI → Sala Meet.
  - MOUSE USB → NPC specifico.
- Se il destinatario si sposta, la consegna segue fisicamente l'NPC.

### Pao / Zia Ale / Don
- Le telefonate positive creano ora un bonus PENDENTE reale.
- Il bonus ignora il cooldown quando raggiungi l'NPC.
- Il cooldown parte solo DOPO aver riscosso il bonus.
- Non può più succedere: “ho una cosa per te” → “ci siamo già parlati”.

## V2.7.2.1 — VISIBLE HOTFIX
- Ripristinata funzione Pokémon !.
- NPC ambientali nuovamente renderizzati.
- Anomalie fisiche nuovamente renderizzate.
- Oggetti inventario e marker fisici nuovamente renderizzati.
- Prima missione garantita alle 09:03: CUFFIE da IT a un NPC.
- Spawn giocatore nel vero reparto IT.
- Scaffale IT SUPPLIES sempre visibile.
- Versione V2.7.2.1 visibile nel footer.

## V2.7.2.2 — MOBILE FIX
- Corretto il crash runtime della 2.7.2.1: `stations` veniva inizializzato troppo tardi rispetto a `reset/spawnNPCs`.
- Pulsante DEBUG touch equivalente a F2.
- Badge V2.7.2.2 visibile.
- Diagnostica JS ERROR visibile anche da Safari/iPhone.

## V2.7.2.3 — QUESTION HOTFIX
- Corretto `ReferenceError: shuffledQuestion is not defined`.
- Le risposte vengono realmente mescolate e l'indice della risposta corretta viene ricalcolato.
- Nessuna modifica alle collisioni, mappa, NPC, inventario o difficoltà della 2.7.2.2.
- Versione/cache-busting aggiornati a V2.7.2.3.

## V2.7.2.4 — MOBILE & NPC NAVIGATION
- Joypad mobile riscritto con Pointer Events e movimento analogico.
- Interagisci touch usa pointerdown.
- DON passeggia anche senza encounter e può cercare il giocatore.
- PAO molto meno invasivo: probabilità di ricerca ridotta e oltre 100 minuti-game tra incontri spontanei.
- Un bonus telefonico di PAO non lo forza più a inseguirti.
- NPC ambientali della CENTRALE escono tramite un percorso dedicato verso la porta in basso a destra.
- NPC usano la stessa logica muro/porta del giocatore durante gli spostamenti.
- Recovery automatico se restano bloccati su un waypoint.

## V2.7.2.5 — MOBILE CONTROLS HARD FIX
- Joypad analogico mantiene touch + pointer.
- Aggiunto D-PAD fisico ▲ ▼ ◀ ▶ come fallback affidabile su Safari/iPhone.
- D-PAD controlla direttamente virtual WASD.
- INTERAGISCI usa touchstart/pointerdown/click con anti-doppio tap.
- Nessuna modifica a gameplay, NPC, collisioni, inventario o domande.

# V3.0 — PIXEL OFFICE / IT TASKS

Questa build parte dallo ZIP utente corrente e mantiene la struttura della mappa.

## Nuovo
- Pixel-art pass procedurale per personaggi, scrivanie, pavimenti e UI.
- Task Progress bar.
- I ticket possono essere QUIZ oppure MINIGAME contestuali.
- 6 famiglie di minigiochi:
  - TONER: inserimento cartuccia.
  - CABLE: patch LAN / USB-C / HDMI.
  - SERVICES: recovery DNS → AUTH → FILES.
  - AV: routing USB-C/HDMI verso display.
  - PIXERA: sync display in sequenza.
  - RELINK / PROCESS: media Adobe mancanti e processi bloccati.
- Minigiochi assegnati in base alla stanza/postazione.
- Quiz IT, inventario fisico, NPC, anomalie, difficoltà, boss e finale ARC_VOID restano attivi.
- Safe spawn ripristinato per evitare il blocco dentro le scrivanie.
- F2/DEBUG mantenuto.

## Filosofia V3
Le task non sono più soltanto quiz: una parte richiede un intervento rapido fisico/visivo,
una parte diagnosi, una parte consegna tramite inventario.

## V3.1
- ENTER avvia il gioco dalle schermate iniziali.
- Risposte quiz selezionabili da tastiera con numero dinamico.
- Supporto V/F.
- Etichette numeriche visibili sulle risposte.
- Ticket Queue compatta e richiudibile, per non coprire la mappa.
- Pool domande ampliato con distrattori di lunghezza e plausibilità simili.
- Renderer pixel, minigiochi, NPC, inventario e F2 preservati.


# V4.0 — LIVING STUDIO / ARC_VOID

## Camera / esplorazione
- Camera arcade centrata sul player con zoom pixel.
- Minimappa sempre visibile: planimetria, player e ticket; NPC/anomalie non sono rivelati.
- `M` mostra/nasconde la visione completa per orientarsi.
- `F2` mantiene il debug completo.

## Giornata narrativa
- 09:00–12:59: studio operativo.
- 13:00–14:00: PAUSA PRANZO ASSOLUTA. Tutti gli NPC, inclusi Pao/Don/Zia Ale, sono in Cucina; MoKasa non spawna.
- Durante pranzo nessun ticket USER può essere generato. Restano solo task/anomalie ARC_VOID.
- 14:00–17:30: rientro e sovrapposizione problemi/anomalie.
- 17:30–18:52: escalation e lore più esplicita.
- Dialoghi/telefonate narrative progressive chiariscono ARC_VOID senza popup continui.

## Living Studio
- NPC ambientali hanno routine differenziate: caffè, Sala Meet, Stampanti, Rifugio Digitale.
- Un NPC che usa una zona può generare un ticket coerente con ciò che sta facendo.
- Meeting → AV/CABLE; Stampanti → TONER/PROCESS; Rifugio → PIXERA.
- Gli encounter ! e gli NPC speciali restano separati.

## Server
- Rack pixel interattivi con LED.
- Nuove famiglie task: SWITCH, RAID, PSU oltre a SERVICES/CABLE.
- Anomalie lunch/late possono accendere fault LED e creare ticket ARC_VOID nel Server.

## UI
- Rimossa la missione fisica permanente.
- Inventario compatto.
- `TAB` apre il PDA con ticket e consegne; rilascio TAB lo chiude.
- TASKS apre lo stesso PDA.
- Progress bar = tempo + performance, massimo 94% prima del boss; 100% solo a partita conclusa.

## Quiz
- Nuovo advancedQuestionBanks con distrattori plausibili e lunghezze simili.
- Normal/Hard/Nightmare privilegiano le domande avanzate.
- Vero/Falso incluso.
- Risposte numerate e controllabili da tastiera.
- ENTER funziona su boot/lore per proseguire/iniziare.

## Validazione
- game.js validato con `node --check`.
- Controllata presenza/connessione di camera, minimappa, lunch, routine NPC, PDA,
  Server task, progress, quiz, lore, boss e F2.
- Controllata assenza di ID HTML duplicati.
