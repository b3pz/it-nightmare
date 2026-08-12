# IT NIGHTMARE V5.1 HOTFIX

Hotfix della V5.0: ingresso giocabile con porta/E, dialoghi compatti, nomi stanze aggiornati, minimappa ridimensionabile/spostabile, HDMI extender contestuale per sale meeting, correzioni UI e base NPC/lunch preservata.

## V5.1.2 — ENTRANCE FLOW HOTFIX
- Corretto il blocco logico dell'introduzione: il balloon finale non resta attivo mentre il gioco chiede di camminare.
- E/ENTER sul messaggio TELEFONO chiude il dialogo e restituisce immediatamente WASD al player.
- Porta dello Studio implementata come interazione fisica indipendente: prompt E — ENTRA.
- Il saluto di Zia Ale avviene solo dopo l'ingresso.
- Rimosso il rettangolo verde attorno al player se presente.

## V5.3 — STUDIO ALIVE
- Rimossi i quiz dai ticket normali e dal finale: i ticket aprono minigiochi contestuali.
- Corridoio destro/centrale reso continuo per eliminare i vuoti neri interni.
- Arredi ripuliti e standardizzati; sale meeting ridisegnate con tavolo, sedie, display e Wacom/controller.
- BAGNI arredati come bagni; nessuna richiesta IT viene generata durante lo stato bathroom.
- Consegne inventario sempre alla postazione del collega, mai inseguendo NPC in bagno/cucina.
- Prima missione: vero minigioco POWER -> boot -> LOGIN della postazione IT.
- DON ora usa una routine di movimento su corridoi/sale.
- IT MANAGER può spostarsi tra IT, corridoio, Sala Meet Capo e Stampanti.
- Più oggetti inventario: cuffie, mouse, tastiera, adattatore, Ethernet, alimentatore, toner, USB.
- Sale meeting/Server/Stampanti/Editoria/BIM/Rifugio usano pool di minigiochi coerenti con la stanza.

## V5.3.2 — IT MANAGER PATH FIX
- IT Manager usa una route dedicata.
- Uscita obbligata da Ingresso/Segreteria attraverso la porta e la dorsale principale.
- Percorsi distinti verso IT, Sala Meet Capo, Stampanti e Cucina.

## V5.3.2 FINAL — IT MANAGER
- Corsa iniziale con il PG invariata.
- Durante il turno resta alla postazione nel REPARTO IT.
- Unico percorso lavorativo: REPARTO IT <-> SERVER/CED.
- Dopo una visita al SERVER torna automaticamente alla postazione.
- Continua a ricevere e inoltrare ticket di qualsiasi reparto.

## V5.3.3
- Rientro post-pranzo obbligatorio alle postazioni.
- Sistema relazioni AMICO / NEUTRALE / OSTILE con effetti su deadline e difficoltà.
- Task completate migliorano il rapporto; task scadute lo peggiorano.
- HR: un solo NPC, una sola postazione/PC, fisso nella stanza e con consigli utili.

## V5.3.4 — IT MANAGER ENTRANCE PATH
- Corretta la corsa iniziale del Manager dalla Segreteria al Reparto IT.
- Il Manager si allinea alla porta prima di attraversarla, evitando il muro.
- Aggiunto stato managerRace dedicato.
- F2 mostra la route corrente del Manager in giallo.

## V5.3.5 — HR / BAGNI CLEANUP
- HR: una sola postazione, un solo monitor, un solo NPC fisso.
- Rimossi eventuali NPC HR duplicati.
- BAGNI: soltanto due porte WC scenografiche.
- Rimossi monitor/PC/stazioni IT dalla stanza BAGNI.

## V5.3.6 — CRASH FIX
- Corretto ReferenceError: Cannot access 'm' before initialization.
- La variabile IT Manager viene ora inizializzata all'inizio di updateManager().
- Nessuna modifica al gameplay della V5.3.5.

## V5.3.7
- Fix IT Manager bloccato in Segreteria: route ortogonale porta -> corridoio -> IT.
- Fix crash `.room` su target/station mancanti con safeRoom/safePoint.

## V5.3.8 — MANAGER + SCRIPT ERROR FIX
- Ripristinata destinazione BAGNI per le routine NPC: eliminato crash target.room.
- IT Manager usa un movimento dedicato lungo route manuali validate.
- Route separate: Segreteria -> IT, IT -> SERVER, SERVER -> IT.
- Ticket ignorati in sicurezza se manca una postazione valida.
- Error reporter mobile mostra messaggio/linea reale invece del generico Script error.

## V5.3.9 — NPC ROUTINES & DISPATCH
- IT Manager più rapido solo nella corsa iniziale; velocità normale dopo.
- Dispatch IT Manager crea e verifica realmente il ticket/PDA.
- HR: Betty unica NPC, una sola postazione, esclusa dagli ambient NPC.
- Pranzo distribuito: cucina meno affollata; Betty resta HR e Manager resta IT.
- Meeting NPC in Sala Meet, Spazio A e Sala Meet Capo.
- I meeting possono generare ticket AV/CABLE nella sala reale; Sala Meet Capo più severa.

## V5.4.0 — CONTEXT & BETTY SUPPORT
- Micro-domande tecniche integrate dentro una parte dei minigiochi, mai come quiz separato.
- Le domande sono obbligatoriamente coerenti con la stanza/problema.
- Risposte brevi e selezionabili anche con 1/2/3 da tastiera.
- Betty monitora lo stress con soglie 42/60/80 e può invitarti in HR.
- Interagendo con Betty: consiglio + riduzione stress; ai livelli alti anche XP/reputazione.
- Cooldown anti-abuso per evitare bonus infiniti.


## V6.0.0 — STUDIO OVERHAUL
- Reparti operativi max 4 PC/NPC; Centrale 6 postazioni su due tavoli.
- HR/Betty, Reparto IT/Manager e Segreteria/Zia Ale sono stanze private.
- THE BUNKER rinominato INTERIOR.
- Cucina ridisegnata come cucina/pranzo: tavolo, sedie, nessun PC.
- Navigazione NPC riscritta su porte/corridoi con anti-stuck.
- TABLET IT sostituisce PDA e mostra rapporti AMICO/NEUTRALE/OSTILE.
- Messaggi asincroni accodati durante minigiochi; notifiche separate dal risultato.
- Errori minigiochi contano davvero: ERRORI + stress + incident, massimo 3 errori per intervento.
- Check rapidi con risposte randomizzate.
- Stress ribilanciato in base a coda, urgenze e incident.
- Audit interno V6 su postazioni, stanze private e cucina.

# V7.0 — IT SHIFT
- Rebranding: IT SHIFT — A DAY IN IT SUPPORT; home pixel-art HTML/CSS, niente boot horror.
- Navigation geometry-first con pathfinding su walkZones/doors/corridors e anti-stuck senza teleport.
- NPC non possono usare stanze non pertinenti come scorciatoie.
- CENTRALE confermata: 12 PC / 12 NPC, due tavoli da 6.
- PAO homeRoom BIM; Betty HR; Zia Ale Segreteria; IT Manager IT; CAPO persistente dalla mattina.
- CAPO ha routine Sala Meet Capo / Sala Meet / Spazio A senza despawn.
- Cucina ampliata, due tavoli, 16 sedute, zero PC; overflow pranzo distribuito.
- PROCESS CHECK rifatto: un processo bloccato certo, errore reale a ogni processo sano, 3 errori = fallimento.
- Errori minigiochi: stress/incident/errori globali con feedback visibile.
- Reward overlay chiaro per successo/fallimento.
- Minigiochi con asset/layout coerente e responsive.
- Messaggi accodati durante minigiochi/risultati.
- Tablet IT: rapporti deduplicati, stato Betty/reputazione più leggibile.
- Stress più sensibile a coda, deadline, HIGH/CRITICAL e NPC ostili.
- DEBUG F2 protetto e ampliato con route/stato/homeRoom/STUCK di tutti gli NPC.
- Audit V7 su PC/NPC/stanze private/Cucina/Bagni/homeRoom/path principali.

# V8.0 — EVENTS & OPENING
- Ingresso reso sequenziale: porta -> saluto Zia Ale -> ! IT Manager -> corsa obbligatoria.
- Grande banner centrale della missione iniziale: arrivare in Reparto IT e accendere il PC prima del Manager.
- IT Manager usa lo stato managerRace e la sua velocità dedicata; non è più bypassabile entrando nello studio.
- Nuovo sistema STUDIO EVENTS distinto dai ticket.
- Evento Amazon: pacchi fisici in ingresso; NPC ritirano i propri, il player porta due pacchi IT al Reparto IT.
- Evento Meeting urgente: recupero fisico EXTENDER HDMI da IT e consegna in Sala Meet.
- Evento Cambio postazione: trasporto MONITOR a un NPC.
- NPC helper possono trasportare visivamente pacchi e seguire un percorso verso il proprio reparto.
- DON ha sprite con carnagione più scura e capelli dedicati, coerente con lo stile pixel-art.
- Il vecchio tutorial automatico CUFFIE a +3 minuti è rimosso: gli oggetti entrano in gioco tramite eventi e missioni contestuali.


# V9.0 — STUDIO CONSOLIDATION
- Home esterna completamente ridisegnata e credit “Creato e sviluppato da B3pZ”.
- Ingresso a soglia unica: niente seconda porta/E obbligatoria.
- IT Manager usa pathfinding collision-aware; rimossi snap/teleport durante la corsa iniziale.
- Collisioni riallineate ai soli arredi visibili; F2 mostra le hitbox reali in rosso.
- Sedute workstation corrette per EDITORIA/BIM/INTERIOR/RENDERISTI/CENTRALE.
- Sale meeting ridisegnate con tavolo, display e sedute reali condivise con l'AI.
- Gli NPC in meeting occupano una sedia disponibile.
- Result Popup 2.0: ENTER/E/click/auto-close 5.2s.
- Minigiochi ridimensionati e griglia responsive; resta attiva la regola 3 errori = intervento fallito.
- Pressione/stress più dinamici durante il turno.

## V9.1 — ANIMATED HOME
- Fix dell'overlay generico `Script error.`: gli errori reali restano visibili, quelli generici cross-origin non bloccano il gioco.
- Nuova home animata in HTML/CSS: facciata dello studio, ingresso vetrato, porte scorrevoli, luci interne, NPC, auto, marciapiede e strada.
- Data reale letta dal dispositivo/browser; l'orario narrativo rimane 08:58.
- `ENTER`, `E` o click avviano la giornata.
- Transizione animata home -> setup/gioco.
- Credito visibile: `CREATO E SVILUPPATO DA B3pZ`.

## V9.1.1 — STARTUP HOTFIX
- Corretto il crash totale all'avvio: `V9_MEETINGS` veniva letto durante la creazione di `obstacles` prima della sua inizializzazione.
- `V9_MEETINGS` viene ora dichiarato prima delle collisioni delle sale meeting.
- Rimossi i listener JavaScript di errore duplicati che trasformavano gli errori reali nel generico `Script error.`.
- Aggiunto startup self-test per meeting config, obstacles, draw/update/reset.

## V9.1.2
- Gara IT Manager avviata subito dopo il saluto di Zia Ale.
- Manager su punto valido di corridoio, path verso IT e fallback sicuro.
- Corridoio continuo davanti alla cucina ripristinato.
- Tavoli spostati fuori dalla fascia di transito.
- Uscita cucina riallineata.
- Ritorno NPC post-pranzo via porta cucina + path verso homeRoom.
- Re-route automatico senza teleport per NPC che tardano a rientrare.

## V9.1.3 — INTRO SEQUENCE HOTFIX
- Sequenza corretta: fumetto 08:58 -> TELEFONO -> porta sbloccata -> E sulla porta -> Zia Ale -> ! IT Manager -> gara.
- Durante entrambi i dialoghi iniziali la porta resta bloccata.
- `beginEntranceWalk()` viene eseguito solo alla chiusura del dialogo TELEFONO.
- Rimosso l'ingresso automatico al contatto con la soglia.
- Rimosso il vecchio ramo di apertura porta basato solo sulla prossimità.
- `E` chiude prima i dialoghi; solo a dialoghi chiusi può interagire con la porta.

## V9.1.4 — NPC TRAFFIC HOTFIX
- Gli NPC ora evitano anche gli altri NPC, non solo muri e arredi.
- Corsie di uscita dedicate per Cucina, Stampanti e Segreteria.
- Rientro post-pranzo scaglionato: gli NPC non partono tutti nello stesso frame.
- Recovery anti-incastro a tre livelli: side-step, rebuild route, free-node recovery.
- Nessun teleport diretto alla homeRoom.
- Disattivato il vecchio `updateLunchReturn()` che forzava coordinate e confliggeva con il pathfinding.
- Debug F2 mostra anche lo stato `TRAFFIC` per distinguere blocchi da muri e blocchi da altri NPC.


# IT SHIFT V10.0.0

Build di consolidamento.

## Fix principali
- Intro mattutina riscritta: telefonata -> porta -> ingresso fisico -> Zia Ale -> ! Manager -> gara.
- Nessun teleport del player all'ingresso.
- Nessun teleport dell'IT Manager all'avvio della gara.
- Manager parte dalla propria posizione reale e usa il pathfinding.
- Nuovo corridoio strutturale:
  BAGNI | RIFUGIO DIGITALE
  ========================
            CUCINA
- Cucina spostata più in basso e ingrandita; tavoli/sedute interamente dentro la stanza.
- Bagni e Rifugio Digitale aprono direttamente sul corridoio.
- Cucina e Stampanti aprono dal corridoio senza bloccarlo.
- Corsie NPC riallineate al nuovo layout.
- Betty: messaggi Support Bonus più evidenti.
- Audit V10 per geometria, Centrale 12 PC, cucina senza PC e connettività dei nuovi passaggi.
- Creato e sviluppato da B3pZ.

## V10.1.0
- World map estesa verso il basso: parete inferiore, marciapiede e strada visibili.
- Ingresso esterno spostato sulla vera porta in basso.
- Nuova stanza STAMPA 3D con due stampanti 3D e workstation.
- Pranzo route-only: rimossi i teleport diretti degli NPC in cucina.
- Gara IT Manager su route dedicata validata, senza fallback attraverso i muri.
- Room labels rese più compatte per non coprire NPC e nomi.
- Fine giornata con riepilogo e restart completo: RIPROVA SUBITO / NUOVA GIORNATA.

## V10.2.0 — BALANCE HOTFIX
- Route gara IT Manager semplificata con meno waypoint e meno zig-zag.
- Velocità Manager leggermente ridotta per rendere la corsa più naturale ma ancora competitiva.
- Stress ribilanciato:
  - 0-2 ticket quasi neutri;
  - 3-4 ticket pressione leggera;
  - 5+ ticket, HIGH, CRITICAL e deadline aumentano davvero lo stress;
  - pranzo recupera stress;
  - periodi tranquilli recuperano lentamente;
  - errori minigiochi meno devastanti;
  - completare una task riduce più stress.
- Target di bilanciamento:
  - run normale 30-55%;
  - giornata difficile 60-80%;
  - oltre 90% solo in situazioni realmente critiche.

# V12 CLEAN — GAMEPLAY LOCK

Base ricostruita dalla V10.2 stabile.

PRINCIPIO:
- sistema input/tasto E della V10.2 mantenuto intatto;
- nessun nuovo listener tastiera;
- nessuna duplicazione di interact().

Riportati sopra la base stabile:
- home più ricca e ironica;
- popup missione più compatto;
- marciapiede/strada realmente visibili;
- campanello + apertura Zia Ale usando il normale flusso E della V10.2;
- line-of-sight NPC;
- riduzione dei teleport NPC;
- missioni narrative 2/3/4 distanziate;
- trigger tecnici da tenere fuori dal gameplay normale.

Questa è la build da validare prima di V1 GRAFICA.
