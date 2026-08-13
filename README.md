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

## V12 CLEAN.1 — DON / INTRO HOTFIX
- DON spostato più in profondità nella Cucina, lontano da Zia Ale e IT Manager.
- Durante tutta la sequenza iniziale solo Zia Ale e IT Manager possono reagire al player.
- DON e gli altri NPC non possono aprire banner/dialoghi durante ingresso + briefing + gara iniziale.
- nearestNPC / npcTalk / corridor encounter protetti durante l'intro.
- Nessuna modifica al sistema input E della V12 CLEAN.

## V12 CLEAN.2 — DON HARD LOCK
- DON non è più soltanto filtrato dai dialoghi: durante intro + gara viene disattivato a livello NPC.
- hunter OFF, route OFF, activity OFF, ticket activity OFF, exclamation OFF.
- Nessun popup/interazione/encounter di DON può partire prima della fine della gara Manager.
- DON viene riattivato solo dopo `managerRaceDone=true`.
- Sistema input della V12 CLEAN non modificato.

## V12 CLEAN.3 — MANAGER RACE PATH HOTFIX
- Gara Manager con route dedicata.
- Il Manager non punta più direttamente al muro del Reparto IT.
- Percorso obbligato: Segreteria -> corridoio principale -> corridoio IT -> porta IT -> interno IT -> postazione.
- Ogni segmento viene rifiutato se contiene nodi non walkable.
- Se il Manager resta bloccato durante la gara, ricalcola la stessa route sicura.
- Nessun teleport/snap di coordinate durante la gara.
- F2 mostra i waypoint M0..M5 della corsa Manager.
- Nessuna modifica al sistema E/input.

## V12 CLEAN.4
- Fix startup `.phase`.
- Chatter NPC non-modal.
- Missione 1 come notifica laterale.
- Stress più permissivo.
- Rapporti NPC random -5..+5.
- Zia +2..+5, Manager -2..+1, Betty +1..+5.
- Bonus rari: -1 errore / riduzione stress.

## V12 CLEAN.4.1 — MEETING / BURNOUT HOTFIX
- Il preavviso "meeting tra 2 minuti" non aggiunge stress.
- Il meeting iniziato genera solo pressione lieve.
- Un meeting perso può penalizzare, ma non provoca burnout istantaneo.
- Cap globale agli spike di stress: nessun singolo frame/evento può far esplodere la barra.
- Burnout solo dopo stress >=98 mantenuto per circa 8 secondi.
- Rapporti, bonus, input, path Manager e resto della CLEAN.4 non modificati.

## V12 CLEAN.4.2 — MEETING EVENT FIX

- PRE-SHIFT Diagnostics contenuti nel riquadro.
- Riflessi facciata/vetri resi statici.
- Prima dell'ingresso: niente ticket, eventi o richieste operative.
- Evento meeting riscritto come macchina a stati:
  IDLE -> ANNOUNCED -> PICKUP -> DELIVER -> COMPLETED/FAILED.
- Se parte mentre sei in una task, viene accodato.
- "Sei in ritardo" appare una volta sola e non blocca.
- Timeout meeting reale dopo finestra aggiuntiva.
- Nessun meeting duplicato mentre uno è attivo/chiuso.
- Nessuna sovrapposizione tra modal task e avvio meeting.

## V12 CLEAN.4.3 — WORKDAY AI

- Ogni NPC ha una postazione fissa.
- Circa 72–86% del tempo resta a lavorare alla scrivania.
- Attività individuali asincrone: caffè, stampante, bagno, meeting, wander.
- Dopo ogni attività torna alla propria postazione.
- Ticket personali generati solo se l'utente è realmente alla sua scrivania.
- Pausa pranzo con un posto fisso per ogni NPC (`lunchSeatId`).
- Nessuna sedia condivisa / niente sovrapposizioni in mensa.
- Uscita PAO dal BIM con corridoio riservato e nodi dedicati.

## V12 CLEAN.4.4 — NPC & DEBUG FIX

- PAO: corridoio di uscita BIM realmente riservato.
- Gli altri NPC non possono occupare i nodi di uscita di PAO.
- Workday AI diventa l'unico motore di movimento per i lavoratori.
- Vecchio wandering/ambient movement disattivato per gli NPC gestiti.
- NPC più sedentari: circa 85–92% del tempo alla postazione.
- Attività ancora asincrone, ma molto più rare.
- Dopo ogni attività tornano sempre alla scrivania.
- F2 collision/debug ripristinato:
  - celle non walkable;
  - limiti stanze;
  - route NPC;
  - corridoio PAO P0..P3.

## V12 CLEAN.4.5 — INVENTORY & IT LAB

- E = INTERAGISCI.
- F = PRENDI.
- G = CONSEGNA / POSA.
- Oggetti fisici separati dalle interazioni NPC.
- Nuova stanza MAGAZZINO / LAB IT vicino al Server.
- Pacchi Amazon depositati nel Magazzino IT.
- Scaffali: CAVI, CUFFIE, HDMI, ALIMENTATORI, RICAMBI.
- Banco tecnico per task Ripara PC.
- CAPO parla solo con E e ha cooldown.
- IT Manager limitato a IT / Server / Lab.
- Player anti-stuck con rollback all'ultima posizione walkable.
- Facciata iniziale completamente statica.

## V12 CLEAN.4.5.1 — INPUT / MANAGER HOTFIX
- F/G reinstallati con un solo handler canonico.
- F prende oggetti/event item.
- G deposita/consegna, indipendentemente dagli NPC vicini.
- E non gestisce più oggetti fisici.
- IT Manager non può monopolizzare E durante/dopo la prima missione.
- Dialogo opzionale Manager con cooldown 45s.
- Amazon depositabile nel Lab con G.
- Cuffie/HDMI/Alimentatore/Ricambi prelevabili con F.
- Anti-stuck player eseguito anche dopo il movimento.

## V12 CLEAN.4.5.2 — POST-RACE SOFTLOCK FIX
- Fine corsa Manager centralizzata in `v12c452FinishManagerRace()`.
- A fine corsa vengono ripuliti tutti i lock residui:
  storyOpen, uiMessageBusy, mission briefing, race armed, intro mission.
- IT Manager passa a routine normale e non riapre dialoghi narrativi.
- Watchdog anti-softlock durante lo shift.
- F/G bloccati solo da UI realmente visibili, non da flag stale.
- E ripulisce eventuali story lock fantasma dopo la corsa.


## V12 CLEAN.4.6 — FIRST MISSION REWRITE
- Prima missione separata dal normale turno di lavoro.
- Nuovi stati: raceState, workstationOnline, firstMissionResolved.
- Se il Manager vince la corsa, la gara termina ma il turno continua e i ticket possono comparire.
- Il PC resta avviabile anche dopo la sconfitta.
- L'avvio workstation risolve solo la prima missione e non governa più l'intero gameplay.
- Corretto updateManager: eliminato accesso al Manager prima della sua inizializzazione.
- Ticket generation sbloccata da shiftStarted invece che da introStage=done.

## V12 CLEAN.4.6.2 AUDITED

AUDIT ESEGUITO SULLA 4.6 ALLEGATA.

- Un solo `roomAt()`.
- E non gestisce oggetti.
- F è il solo pickup.
- G è la sola consegna/posa.
- Rimossi `interactCarry()` e `interactStudioEvent()` obsoleti.
- Amazon coerente con MAGAZZINO / LAB IT.
- Workday AI decide le attività; il vecchio ambient engine non genera più spostamenti concorrenti.
- PAO: rimossi due sistemi sovrapposti; percorso corretto sulle coordinate reali del BIM.
- Pranzo: stato automatico 13:00–14:00 con posti assegnati e priorità sugli altri comportamenti.
- Manager sospende la routine durante pranzo.
- Workstation protetta dai pickup fisici vicini.

# VERSIONE1ITSHIFT — GAMEPLAY FREEZE
- BETTY / HR: bonus stress con cooldown; rapporto alto = bonus più forte e rara copertura errore.
- DON: super alleato, rapporto iniziale +3..+5, bonus stress/XP e rara copertura errore.
- PAO: rapporto -5..+5, commenti Fiorentina, bonus se amico / beghe se negativo.
- IT Manager: gara iniziale + routine IT/Server/Lab.
- Zia Ale: ingresso/campanello.
- Capo: richieste ad alto impatto.
- E interagisci / F prendi / G consegna.
- Workday AI unico, pranzo 13–14, ticket coerenti con NPC.
- Lab IT vicino al Server con collegamento esplicito.
- PAO anti-stuck.
- Meeting/amazon/carry mission consolidati.
- F2 collision debug.

## VERSIONE1ITSHIFT 1.0.2 — SURGICAL STABILITY BUILD
- Base: VERSIONE1ITSHIFT originale, mappa originale preservata.
- rooms[] NON modificato.
- Ticket normalizzati a durata minima 28–60 minuti di gioco.
- Soft-lock guard conservativo.
- Lab IT disegnato come estensione autonoma vicino al Server.
- Vecchio Lab sovrapposto disattivato.
- Nessuna riscrittura generale del pathfinding.
- Betty, DON, PAO e sistemi speciali preservati.

## VERSIONE1ITSHIFT 1.0.4 — REAL MAP SHIFT
- Modifica reale del `rooms[]` in game.js.
- HR -> vecchia EDITORIA.
- EDITORIA -> vecchio BIM.
- BIM -> vecchio REPARTO IT.
- REPARTO IT -> quota INGRESSO/SEGRETERIA.
- SERVER ampliato sull'area combinata vecchio HR + SERVER e usato anche come Magazzino/Lab IT.
- Vecchio Lab standalone eliminato/disattivato.
- NPC/postazioni con room/homeRoom traslati insieme alle stanze.
- IT_PC traslato con il nuovo Reparto IT.
- PAO route rigenerata sulla nuova posizione BIM.

## VERSIONE1ITSHIFT 1.0.5
Fix nuovo REPARTO IT:
- porta e corridoio realmente percorribili;
- due postazioni PC visibili;
- collisioni delle scrivanie;
- IT_PC dentro la stanza;
- destinazione/home IT Manager riallineata;
- pickup IT mantenuti in zona raggiungibile.

## VERSIONE1ITSHIFT 1.0.6 — NPC LIFE / FREEZE FIX
- PAO e DON hanno roaming speciale controllato: lavorano, ogni tanto escono e poi tornano alla postazione.
- Workday AI generico non forza più PAO/DON immediatamente alla scrivania.
- Betty riportata fisicamente nella stanza HR.
- Zia Ale ha una scrivania reale in Ingresso/Segreteria.
- PAO anti-stuck riscritto senza teleport ripetuti.
- Safety pass NPC: route limitate e coordinate corrotte recuperate per prevenire freeze.

## VERSIONE1ITSHIFT 1.0.7 — RACE / SPECIAL NPC / PACKAGE / FREEZE
- IT Manager: posizione iniziale separata dalla scrivania di Zia Ale.
- Gara Manager: route fissa Ingresso -> corridoio -> Reparto IT, senza ricalcolo aggressivo.
- PAO e DON esclusi davvero dal Workday AI generale.
- PAO/DON: roaming con route finite e ritorno alla postazione.
- Pacchi Amazon: destinazione persistente e visibile `SERVER / MAGAZZINO IT`.
- Aggiunto marker DEPOSITO IT dentro il Server.
- G consegna al marker del Server.
- Anti-stuck di PAO semplificato.
- Disattivato il rerouting aggressivo per PAO/DON/Manager Race per evitare freeze.

## VERSIONE1ITSHIFT 1.0.8 — SERVER PICKUP ALIGNMENT
- ADATTATORE USB-C / HDMI spostato fisicamente dentro SERVER.
- EXTENDER HDMI del Meeting Rush spostato dentro SERVER.
- Testi Meeting aggiornati: SERVER / MAGAZZINO IT, non più IT.
- Pacchi Amazon depositati nello stesso punto reale del Server.
- Vecchi punti supply fuori stanza rimossi e riportati dentro Server.
- Il marker missione ora coincide con la stanza indicata dal Tablet.


## VERSIONE1ITSHIFT 1.0.9 AUDITED
- Base: VERSIONE1ITSHIFT_1_0_8(1).zip.
- Pending offers unified for Zia Ale, PAO, DON and Betty.
- Pending special interaction is consumed before generic NPC dialogue.
- Betty phone call now creates a real HR offer.
- Removed legacy DON hunter AI; PAO/DON have one movement owner.
- PAO/DON get bounded roaming and clean post-lunch recovery.
- Removed per-frame dynamic path rebuild from NPC movement recovery.
- Workstation clears stale NPC modal timers before opening.
- Only the canonical IT_PC can launch AVVIO POSTAZIONE.
- Story events are no longer marked completed when another event blocks their start.
- End of shift is armed at closing time; finale starts only by physically reaching the Capo and pressing E.
- Frame delta is clamped to reduce simulation stalls after browser hiccups.

## VERSIONE1ITSHIFT 1.0.10
- Prima missione sempre completabile dal solo IT_PC.
- HR riservata a Betty; altri NPC fuori da HR.
- Scrivania grafica dedicata a Betty.
- PAO/DON esclusi dal Workday AI generico.
- PAO/DON con roaming speciale autonomo e reset post-pranzo.
- moveNpcRoute semplificato per ridurre freeze.
- runtime safety su clock, player, NPC e route.

## VERSIONE1ITSHIFT 1.0.11
- Gara iniziale con cronometro reale giocatore vs IT Manager.
- Vittoria solo dopo POWER + LOGIN.
- Risultato missione mostra i due tempi e premio/penalità.
- Missioni fisiche con punti fissi di ritiro e consegna.
- F = prendi, G = consegna, E = interagisci.
- Durante missioni fisiche il movimento NPC viene ridotto per diminuire collisioni/freeze.

## VERSIONE1ITSHIFT 1.0.12 — CAPO STATIC SAFETY
- CAPO reso entità completamente statica nella Sala Meet Capo.
- CAPO escluso dai calcoli di collisione NPC e dal Workday AI.
- CAPO escluso dagli encounter automatici.
- `nearestNPC()` considera il CAPO solo quando il giocatore è realmente vicino.
- Nessun pathfinding, hunter, seeking o route per il CAPO.
- Nessuna modifica alla mappa, agli eventi, a PAO/DON o alla gara.

## VERSIONE1ITSHIFT 1.0.13 — CAPO PROXIMITY FIX
- Fix specifico del range CAPO.
- CAPO nasce court=true e non può attivare il vecchio proximity encounter.
- updateCapoRoutine neutralizzata.
- pokemonEncounter rifiuta il CAPO.
- Avvicinarsi al CAPO non modifica clock/phase/UI.
- E sul CAPO è l'unico trigger; il finale parte solo a fine turno.

## VERSIONE1ITSHIFT 1.0.14 — POST-LUNCH / UI LOCK FIX
- Rientro pranzo canonico per PAO, DON, Betty, Zia Ale e IT Manager.
- Safety dopo 13:20: se gli NPC speciali restano parcheggiati in cucina, vengono ripristinati.
- PAO e DON riattivano il roaming poco dopo pranzo.
- Watchdog UI: se il clock resta fermo oltre 5 secondi senza minigame reale, pulisce i lock stale.
- Popup Amazon di Zia Ale reso one-shot.
- E chiude i popup non-minigame e libera storyOpen/uiMessageBusy.
- Nessuna modifica a CAPO, mappa, gara o task core.

## VERSIONE1ITSHIFT 1.0.16 — AMAZON STORY LOCK FIX
- Amazon/Zia Ale no longer uses blocking storyDialog.
- Amazon message is now phoneMessage only, so clock and movement continue.
- E explicitly closes storyDialog before any other interaction.
- UI watchdog now hides both modal and storyDialog and clears storyOpen/storyCallback.
- Added Amazon-specific safety to kill any legacy queued Amazon dialog.

## VERSIONE1ITSHIFT 1.0.17 DIAG
Questa build non introduce nuovi contenuti.
Obiettivo: isolare e recuperare il freeze generale.

- Watchdog del clock: se il tempo resta fermo >4s senza minigame, pulisce i lock stale.
- Route NPC limitate a 80 waypoint.
- moveNpcRoute non ricalcola mai un percorso: salta un waypoint impossibile.
- Coordinate NaN/route corrotte vengono recuperate.
- Traccia l'ultimo sistema eseguito in localStorage (`itshift_diag`).
- F3 mostra overlay diagnostico con ultimo sistema, stall e recovery.
- Nessuna modifica alla mappa o alla logica del CAPO.

## VERSIONE1ITSHIFT 1.0.18 — CONSOLE FIX
Basata sugli errori reali della Console della 1.0.17.

- FIX: `sideMessage is not defined`.
- FIX: `activityDestination is not defined`.
- FIX: accesso a `IT_PC.x` quando IT_PC non esiste/non è valido.
- Validazione preventiva di destinazioni e waypoint prima di usare `.x/.y`.
- Sottosistemi opzionali del frame protetti: un errore viene loggato ma non interrompe l'intero game loop.
- F3 continua a mostrare diagnostica e ora include il conteggio JS ERR.
- Self-test specifico 1.0.18 all'avvio.

## VERSIONE1ITSHIFT 1.0.19 — GOLD BASE HOTFIX
Base: 1.0.18, mantenuta invariata nel gameplay.

- Fix mirato dell'ultimo `Cannot read properties of undefined (reading 'x')`.
- Aggiunte guardie sui punti/destinazioni prima di leggere `.x/.y`.
- Nessuna modifica a mappa, NPC, eventi, gara, pranzo, CAPO o progressione.
- Mantiene F3 DIAG e i controlli runtime della 1.0.18.
- Aggiunto self-test 1.0.19 per le distanze sicure.
