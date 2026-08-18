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

## VERSIONE1ITSHIFT 1.0.20 — MISSIONI FISICHE
- Base invariata: 1.0.19 GOLD.
- Marker visivo sul punto di ritiro/consegna.
- F = PRENDI.
- G = CONSEGNA / INSTALLA.
- E vicino al punto ricorda il tasto corretto, senza completare la missione.
- HUD esplicito con materiale, origine e destinazione.
- Nessuna modifica a CAPO, NPC, pranzo, mappa o progressione.

## VERSIONE1ITSHIFT 1.0.21 — NPC SPECIALI
Base: 1.0.20 stabile.

- PAO: alleato, battute Fiorentina, bonus o piccola bega in base al rapporto.
- DON: super alleato, bonus forti e possibilità di rimuovere un errore.
- BETTY: supporto HR, riduzione stress e possibile reputazione.
- ZIA ALE: caffè, reputazione o +10 minuti su una scadenza.
- IT MANAGER: interazioni dedicate dopo la gara.
- Le interazioni speciali hanno priorità sul dialogo generico.
- Cooldown per evitare farming continuo dei bonus.
- Badge discreto sopra gli NPC speciali.
- Nessuna modifica a mappa, fisica, task core, pranzo o CAPO.

## 1.0.22
- Rimossi i tag tecnici permanenti della 1.0.21.
- PAO e DON percorrono più zone dello studio tramite il pathfinding esistente.
- IT Manager preferisce il SERVER nella routine.
- Betty e Zia Ale chiamano quando lo stress sale, offrendo bonus senza creare task.
- Dialoghi stile Game Boy con testo progressivo; E/ENTER completa/passa la frase.

## VERSIONE1ITSHIFT 1.0.23 — PRECISIONE / SERVER WORKSHOP / GUIDA
Base: 1.0.22 stabile.

### Marker fisici
- Corretto il bug strutturale: il marker 1.0.20 veniva disegnato dopo il ripristino della camera.
- Ora il marker è disegnato nello stesso spazio-mondo dell'oggetto e punta al punto interattivo esatto.
- Reticolo preciso + freccia + comando F/G.
- I vecchi punti fissi generici restano visibili solo in DEBUG.

### Server Room
- Aggiunti scaffali MAGAZZINO IT nello spazio libero della Server Room.
- Aggiunto BANCO RIPARAZIONI.
- I pickup SERVER ora puntano agli scaffali.
- Le consegne/deposito SERVER puntano all'area Magazzino.
- E sugli scaffali/banco mostra una descrizione; il sistema riparazioni vero arriverà dopo.
- Nessuna nuova collisione è stata aggiunta: layout visuale senza rischio per il pathfinding.

### Tutorial / accessibilità
- TAB ha una nuova sezione GUIDA.
- Tutorial contestuale leggero: movimento, primo ticket, prima missione fisica.
- Usa il dialogo Game Boy della 1.0.22 e non modifica timer, spawn o loop di gioco.

## 1.0.24
- Ripristinata la priorità dell'intro originale: Zia Ale → ingresso → corsa IT Manager → turno.
- Tutorial 1.0.23 rinviato fino a gara completata + prima missione iniziale risolta.
- Nuovo dialogo pausante stile Game Boy.
- Flag dedicato `dialogPause`: non usa storyOpen/encounterLock.
- Durante il dialogo il mondo non avanza; il testo continua tramite timer DOM.
- E/ENTER completa/passa la frase.
- Conservati marker preciso, Magazzino IT, banco riparazioni e TAB→GUIDA.

## VERSIONE1ITSHIFT 1.0.25 — NPC / MAGAZZINO / MISSION LIFECYCLE

- IT Manager: vera routine Reparto IT → Server Room → sosta → ritorno.
- PAO e DON: roaming più frequente e molto più ampio.
- PAO/DON possono avviare piccole interazioni quando passano vicino al giocatore.
- Magazzino IT: vero punto `G // DEPOSITA`.
- Oggetti delle missioni fisiche vengono rimossi dall'inventario a successo/fallimento.
- Meeting Urgente: tempo esteso e cleanup automatico del materiale se fallisce.
- Fallimento Meeting: dialogo esplicito, niente missione che sparisce in silenzio.
- Core 1.0.24, dialoghi Game Boy, marker preciso e workshop mantenuti.

## VERSIONE1ITSHIFT 1.0.26
- Gara iniziale: l'IT Manager deve partire realmente e completare il percorso.
- La gara non può risultare conclusa prima che giocatore e manager abbiano entrambi finito.
- Risultato finale corsa con tempi TU / IT MANAGER.
- Missioni fisiche: HUD sempre con ORIGINE → DESTINAZIONE.
- Cleanup forte dell'inventario su fallimento: HDMI, alimentatore e altri oggetti task-bound vengono rimossi.
- Meeting urgente: timeout più lungo e materiale restituito automaticamente se fallisce.
- Dialoghi Game Boy della 1.0.25 mantenuti.

## VERSIONE1ITSHIFT 1.0.29 — CLEAN REBUILD

Base: 1.0.26.

### Cosa è stato rifatto
- Eliminato tutto il ramo MAP REMASTER 1.0.28.x: nessuno scaleX/scaleY/offset.
- Intro 08:58 e TELEFONO automatiche.
- Unico input obbligatorio nell'intro: E alla porta.
- Zia Ale apre automaticamente; non serve una seconda E per entrare.
- Attraversata la soglia parte una cinematic automatica.
- Durante la cinematic WASD/E/F/G/TAB/M/numeri sono ignorati e non alterano lo stato.
- Zia Ale avvisa che il Manager è arrivato.
- Countdown 3 → 2 → 1 → VIA automatico.
- Gara del Manager completamente indipendente dal pathfinder: route fissa e movimento dedicato.
- Nessun managerTrigger/proximity trigger per avviare la gara.
- Il giocatore conclude la gara solo al LOGIN, non quando apre il minigioco.
- La gara si risolve quando entrambi hanno terminato.
- F4 = audit live dell'intro/gara.

### Conservato dalla 1.0.26
- Mappa originale e coordinate originali.
- Magazzino IT e banco riparazioni.
- Meeting Urgente.
- Cleanup missioni fisiche.
- Marker missioni.
- Dialoghi Game Boy per il resto del gioco.
- NPC speciali e sistemi del turno.

## VERSIONE1ITSHIFT 1.0.29.1 — RECOVERY

Correzioni di avvio:
- `v119SafeDistanceTo()` non accede più a `player.x/player.y` prima che `reset()` abbia creato il player.
- La cinematic usa il canvas reale `C` invece della variabile inesistente `canvas`.
- Aggiornata la barra degli errori alla versione 1.0.29.1.

Test browser eseguito:
- schermata iniziale caricata senza eccezioni runtime;
- INIZIA LA GIORNATA;
- intro automatica fino a `doorReady`;
- apertura porta;
- attraversamento soglia;
- cinematic automatica;
- countdown;
- `race === true`;
- IT Manager osservato in movimento sulla route;
- IT Manager osservato arrivare alla postazione IT;
- nessuna eccezione runtime durante il flusso testato.

## VERSIONE1ITSHIFT 1.0.29.2 — WALLS / PATHS

Base: 1.0.29.1 RECOVERY, run completa confermata.

### Collisioni
- PLAYER e NPC usano la stessa regola.
- Attraversare il confine di una stanza è possibile solo in corrispondenza di una porta.
- Il controllo viene fatto lungo tutto il segmento di movimento, non soltanto sul punto finale.
- Il pathfinder controlla anche l'arco tra due nodi: un nodo valido dall'altra parte del muro non basta più.
- `moveNpcRoute()` non salta più waypoint bloccati per continuare attraverso il muro.
- Se una route diventa invalida viene ricalcolata fino alla destinazione.

### Gara
- Rimossa la route "fantasma" che ignorava collisioni.
- IT Manager usa lo stesso pathfinder con porte e muri.
- Velocità gara Manager: 80 px/s invece di 122.
- Durante la gara ignora solo gli altri NPC, NON muri/porte.
- F4 segnala anche `RACE CROSSES WALL` se la route gara non è legale.

### Nota
Questa build mantiene la mappa della 1.0.29.1; non introduce ancora il nuovo layout.
Il sistema di collisione è stato unificato proprio per rendere più semplice e sicura la futura nuova mappa.

## VERSIONE1ITSHIFT 1.0.29.3 — LIFECYCLE FIX

Base: 1.0.29.2 WALLS / PATHS.

Correzioni isolate:
- rientro NPC post-pranzo: vecchi stati lunch/return/activity vengono puliti;
- NPC normali ricalcolano una route legale verso la scrivania;
- PAO e DON riprendono il roaming speciale;
- oggetti fisici orfani (ALIMENTATORE / HDMI / EXTENDER HDMI / PC da spostare) vengono rimossi quando non esiste più una missione attiva;
- a fine giornata carryMission/eventi fisici residui vengono azzerati;
- il task "CAMBIO POSTAZIONE" non deve più restare visibile con TASKS=0;
- F4 ora segnala POST LUNCH STUCK, ORPHAN INVENTORY e GHOST CARRY AT END SHIFT.

Nessuna modifica a:
- collisioni 1.0.29.2;
- intro 1.0.29.1;
- gara IT Manager;
- mappa;
- Meeting se non per cleanup finale oggetti.

## VERSIONE1ITSHIFT 1.0.29.4 — LUNCH TRAFFIC + LATE WORK FIX
- rientro pranzo con una sola coda e partenze scaglionate;
- NPC possono sovrapporsi solo durante il rientro, ma muri e porte restano attivi;
- anti-stuck con ricalcolo route dopo 2 secondi;
- niente nuovi eventi fisici negli ultimi 30 minuti prima del fine turno;
- Amazon e cambio postazione rispettano il cutoff;
- fine turno rimuove anche Amazon/Desk Setup residui, HUD e banner.


## 1.0.30A — PIXEL FOUNDATION

Base ufficiale: VERSIONE1ITSHIFT 1.0.29.4 LUNCH TRAFFIC FIX (GOLD).

Scopo di questa build:
- primo vertical slice grafico in stile Pokémon / Game Boy Color;
- nessuna modifica alla geometria della mappa;
- nessuna modifica a collisioni, pathfinding, AI, pranzo, gara, missioni o inventario;
- REPARTO IT ridisegnato sopra le coordinate GOLD;
- piccolo tratto di corridoio convertito a tile;
- nuove workstation pixel-art mantenendo le hitbox GOLD;
- prototipo sprite PLAYER: capelli lunghi, barba, occhiali;
- prototipo sprite IT MANAGER: capelli bianchi, occhiali;
- animazione visiva direzionale 4-way derivata dal movimento, senza influenzare il gameplay;
- F6 confronta PIXEL FOUNDATION ON/OFF durante la stessa run.

Questo non è ancora il restyling completo dello studio. Serve per approvare:
1. scala dei tile;
2. palette;
3. proporzioni dei personaggi;
4. leggibilità di muri, porte e mobili;
5. direzione artistica prima di rifare l'intera mappa.


## 1.0.30A.1 — ROOMS + VISITOR PROOF

Prova concreta del nuovo linguaggio grafico, costruita sopra 1.0.30A:

- REPARTO IT 1.0.30A mantenuto.
- HR ridisegnato come ufficio individuale caldo/privato.
- Betty ha sprite dedicato mora con MAGLIA A RIGHE ORIZZONTALI.
- Ingresso/Segreteria ridisegnato con reception, 2 sedute, porta vetrata e area PACCHI.
- Zia Ale ha sprite dedicato biondo.
- Nomi permanenti rimossi sopra Betty, Zia Ale e IT Manager nel nuovo render.
- Prima prova NPC VISITATORE:
  camion sulla strada -> corriere -> ingresso -> consegna -> ritorno -> camion riparte.
- L'evento Amazon avvia automaticamente la sequenza visiva del corriere.
- F7 avvia manualmente il demo corriere per testarlo subito.
- F6 continua a confrontare vecchio/nuovo render.

IMPORTANTE:
questa è ancora una vertical slice/prova. Non cambia le coordinate della GOLD,
non migra la nuova mappa e non cambia il pathfinding. Le nuove sedute/decori
sono lo standard visivo da tradurre in vere seat/collision node nella mappa 1.0.30D.


## 1.0.30A.2 — SERVER / MAGAZZINO IT RESTYLE

Quarta area convertita al nuovo linguaggio pixel/GBC.

SERVER / MAGAZZINO IT è ora diviso visivamente in:

- ZONA A // RICAMBI
  scaffali tecnici, scatole/componenti, categorie CAVI / ADATT. / ALIM. / PERIF.
  Il pickup GOLD resta alle coordinate originali.

- SERVER RACK
  3 rack A/B/C con LED e pannelli tecnici.
  I rack usano le coordinate già esistenti nella GOLD.

- ZONA B // CARICO-SCARICO
  area pavimento marcata con bordo/hazard pixel,
  simboli pacco + PC e scritta DEPOSITO IT.
  Il drop point GOLD rimane invariato.

- ZONA C // RIPARAZIONI
  banco hardware più leggibile con PC aperto, utensili e display diagnostico.
  Il benchPoint GOLD resta invariato.

La nuova grafica sostituisce soltanto il disegno legacy di rack/scaffali/banco
quando PIXEL FOUNDATION è attivo. Collisioni, interazioni, missioni e coordinate
non sono state modificate.


## 1.0.30A.3 — ENTRANCE + EXTERIOR FIX

Fix mirato prima di proseguire con Centrale.

SEGRETERIA:
- reception riposizionata visivamente per non sovrapporsi ai pacchi;
- area attesa separata dall'asse d'ingresso;
- area PACCHI spostata completamente a destra;
- scatole contenute nella loro zona;
- porta vetrata doppia più leggibile;
- corsia porta -> corridoio lasciata libera.

ESTERNO FISSO:
- facciata continua dello studio;
- portale principale con doppia porta vetrata;
- insegna "INGRESSO STUDIO";
- marciapiede completo;
- soglia / tappeto ingresso;
- cordolo;
- strada completa;
- linea tratteggiata;
- piccoli dissuasori fuori dall'asse della porta.

Il camion/corriere della 1.0.30A.1 continua a usare la strada ed è renderizzato
sopra il nuovo esterno.

Nessuna modifica a collisioni, pathfinding, missioni, pranzo, gara o coordinate GOLD.


## 1.0.30A.4 — FULL STUDIO RESTYLE

Restyling visuale esteso a TUTTE le stanze rimaste:

- EDITORIA
- BIM
- CENTRALE
- SALA MEET
- INTERIOR
- RENDERISTI
- SPAZIO A
- BAGNI
- RIFUGIO DIGITALE
- SALA MEET CAPO
- CUCINA
- STAMPANTI
- STAMPA 3D

Restano inoltre attivi i restyling già approvati di:
- REPARTO IT
- HR
- SEGRETERIA / INGRESSO
- SERVER / MAGAZZINO IT

Dettagli:
- CENTRALE: 12 postazioni visivamente leggibili sui due tavoli già presenti nella geometria GOLD.
- BIM / Editoria / Interior / Renderisti: 4 postazioni visuali per reparto.
- Sala Meet: tavolo da 6 + display/AV.
- Spazio A: tavolo da 8.
- Sala Meet Capo: 6 posti + posto direzione.
- Cucina: 12 posti ai tavoli + 4 sgabelli = 16 sedute visuali.
- Stampanti: 3 macchine distinte con punti attesa.
- Stampa 3D: 2 stampanti + PC di controllo.
- Rifugio Digitale: 2 console tecniche + mini rack AV.
- Bagni: 2 cabine + lavabo/specchio.
- Tutte le insegne usano ora la stessa grammatica pixel/GBC.

ESTERNO:
- facciata, marciapiede e strada sono stati estesi fino ai bordi del mondo visivo.
- la geometria vera dello studio NON è stata allargata: il problema delle stanze
  troppo vicine tra loro verrà risolto nella nuova mappa, senza rompere la GOLD.

IMPORTANTE:
questo è ancora un RESTYLING sopra la geometria 1.0.29.4.
Collisioni, porte, pathfinding, NPC, task e coordinate non sono stati migrati.


## 1.0.30B0 — DEPARTMENT GAMEPLAY PROOF

Questa build non prova a rifare tutto il gioco. Dimostra che i sistemi discussi
possono convivere realmente sopra la base stabile.

F8 apre un vertical slice con 5 casi:

1. BIM / ARCHITETTI
   "Non mi ricordo la password":
   prima fai una domanda all'NPC, poi identifichi Windows/dominio e l'intervento.
   Il problema non parte da un quiz tecnico casuale.

2. EDITORIA / GRAFICI
   Mac che non salva sul server:
   problema coerente con Mac fuori dominio, SMB e credenziali.
   Il secondo step è una sequenza operativa, non una domanda A/B/C.

3. RENDERISTI
   Chaos Vantage:
   pannello 3ds Max / Live Link / GPU.
   Si individua visivamente il nodo disconnesso e si riconnette.

4. RIFUGIO DIGITALE
   PIXERA:
   remap di 4 output verso 4 schermi.

5. SALA MEETING
   video corretto ma audio sul portatile:
   diagnosi AV e test finale.

RAPPORTI:
- viene usato l'NPC reale assegnato al reparto quando disponibile;
- 0 errori = rapporto +1;
- 1-2 errori = nessuna variazione;
- 3+ errori = rapporto -1;
- il valore modifica quindi il sistema rapporti già esistente (-5..+5).

RITMO:
- durante l'intervento il workday è completamente in pausa;
- un errore diagnostico non genera immediatamente strike/stress;
- il risultato esplicita il concetto di "pausa operativa" dopo un intervento.
Il Game Director definitivo verrà implementato separatamente.

F8 / ESC chiude il proof e riprende la partita.

## 1.0.30B1 — HUD + GAMEPLAY FLOW
- HUD laterale: minimappa, 3 attività max, ultimo alert, inventario.
- massimo 2 ticket ordinari contemporanei.
- F9 prova camera vicina a 1.18x senza cambiare collisioni/path.
- F8 Department Gameplay Proof mantenuto.


## 1.0.30B1.1 — HUD + VIEWPORT + CORRIDORS

HUD CLEAN:
- vecchia minimappa eliminata visivamente;
- vecchio Studio Event box eliminato: gli eventi vivono nella sidebar;
- sidebar destra diventa una rail completa, sempre dentro l'altezza disponibile;
- inventario non viene più tagliato;
- task normali mostrano collega + area tecnica coerente col reparto.

VIEWPORT:
- la camera vera ora tiene conto della larghezza della sidebar;
- il giocatore viene centrato nell'area realmente visibile, non sotto la UI;
- zoom standard 1.82x;
- F9 alterna 1.82x / 2.06x usando la camera reale, non CSS scale.

CORRIDOI:
- nuova pavimentazione pixel/GBC;
- nessun inset nero da 11px;
- incroci più continui;
- tile, luci a pavimento e segnaletica direzionale;
- geometria GOLD e walk zone restano IDENTICHE.

SPRITE:
- corretto orientamento laterale di Player / IT Manager / Betty / Zia Ale;
- capelli sul retro della testa e viso nella direzione del movimento;
- fix del comportamento "gamberetto".

Nessuna modifica a collisioni, pathfinding, task logic, pranzo o race.


## 1.0.30B1.2 — CAMERA INPUT FIX
Su macOS i tasti funzione possono essere intercettati dal sistema/browser.
La camera ora può essere cambiata in tre modi:
- C = cambia camera (metodo principale)
- pulsante CAMERA nella sidebar destra
- F9 resta disponibile dove il sistema operativo lo consente

Il tasto C non viene intercettato mentre si sta scrivendo in input/textarea/select.


## 1.0.30B1.3 — ENTRANCE + FLOOR + NPC FIX

INGRESSO:
- porta visiva, trigger, door-zone e walk-zone ora sono allineati;
- corsia destra 635→755 completamente libera;
- reception spostata a sinistra;
- pacchi e sedute spostati fuori dal percorso;
- collisione scrivania Zia Ale allineata alla grafica.

GARA:
- IT Manager non parte più già dentro lo studio;
- parte nella stessa corsia d'ingresso (650,900);
- attende 0.55 s dopo VIA;
- velocità gara 78;
- camera B1.2 invariata.

PAVIMENTO:
- corridoi usano una griglia tile GLOBALE;
- le zone sovrapposte disegnano gli stessi pixel;
- eliminato il vecchio "corridor slice" verde vicino all'IT;
- soglie porte uniformate al pavimento corridoio.

NPC:
- postazioni riallineate ai mobili realmente disegnati;
- Centrale: 12 sedute reali;
- Editoria: 2 Mac reali;
- BIM: 3 NPC + PAO = 4 persone/postazioni;
- Interior: 4 postazioni;
- Renderisti: 4 postazioni;
- Betty, PAO e Zia Ale riposizionati;
- destinazioni caffè/stampante/bagno/meeting spostate su punti sensati.

NON è ancora la nuova AI definitiva: questa build corregge posizionamento e traffico
prima del futuro NPC Life AI / Room Rules.


## 1.0.30B2 — TITLE + CHARACTER SETUP

TITLE SCREEN:
- completamente ridisegnata in HTML/CSS pixel-art;
- protagonista visto da dietro davanti allo studio;
- facciata, porta, marciapiede e strada richiamano direttamente il gioco;
- data reale locale mostrata a 08:58;
- nuova voce NUOVA PARTITA.

CHARACTER SETUP:
- nome personalizzato (2–12 caratteri);
- scelta UOMO / DONNA;
- preview 8-bit live;
- scelta difficoltà/ritmo;
- profilo salvato in localStorage.

IN GAME:
- il nome viene salvato nel player e usato già nell'intro di Zia Ale;
- UOMO mantiene il protagonista con capelli lunghi, barba e occhiali;
- DONNA usa uno sprite differente con capelli lunghi, occhiali, niente barba e palette dedicata;
- la scelta viene applicata allo sprite durante il gameplay;
- nessuna modifica a collisioni, pathfinding, AI, camera, ticket o giornata.


## 1.0.30B3 — TITLE REBUILD

B2 title screen discarded.

B3 title:
- canvas-based scene, not CSS mockup;
- drawn with the same pixel grammar as the actual game;
- real studio facade/road/sidewalk logic;
- protagonist from behind in the foreground;
- animated passerby;
- no giant opaque title panel;
- no external/generated image assets;
- same name/gender setup from B2 retained;
- character setup visually simplified to match the RPG style.


## 1.0.30B3.1 — NAME INPUT FIX
- La cover B3 resta invariata.
- Durante l'inserimento del nome, `E` non viene più interpretata come Interagisci/Conferma.
- Lo stesso vale per gli altri shortcut globali mentre il focus è nel campo testo.
- Il campo nome può quindi ricevere normalmente tutte le lettere.


## 1.0.30B3.2 — DIALOGUE UI UNIFICATION

Da questa build esiste un solo linguaggio grafico per i dialoghi:

- Intro automatica (TELEFONO / ZIA ALE)
- Story Dialog
- Dialoghi NPC v122

Tutti usano:
- box chiaro verde/GBC;
- doppia cornice;
- tab del nome in alto;
- area ritratto 8-bit a sinistra;
- testo nello stesso font/dimensione;
- indicatore in basso a destra.

La cinematica intro mantiene il countdown 3-2-1-VIA a schermo intero,
ma tutti i balloon normali sono ora coerenti.

Nessuna modifica a gameplay, camera, collisioni, pathfinding o character setup.

## 1.0.30B4 — RPG UI SYSTEM
- Sidebar dashboard eliminata.
- HUD minimale: mappa, una task, `+N ATTIVITÀ`, 3 slot.
- Radio IT temporanea + storico Tablet.
- TAB = desktop pixel con TASK / MAPPA / INVENTARIO / PERSONE / LOG / SISTEMA.
- Nessun lavoro casuale prima del login.
- Fix `[object Object]`.
- Balloon normali target 760×164 CSS.


## 1.0.30B4.1 — TABLET TOGGLE FIX
- TAB non è più "hold to open".
- Un colpo su TAB apre il Tablet.
- Un secondo colpo su TAB lo chiude.
- Il keyup di TAB non chiude più il Tablet.
- Tenere premuto TAB non genera toggle ripetuti (`e.repeat` ignorato).
- Con Tablet aperto il mouse può cliccare normalmente TASK / MAPPA / INVENTARIO /
  PERSONE / LOG / SISTEMA.
- I normali comandi di movimento/interazione vengono bloccati mentre il Tablet è aperto.


## 1.0.30B4.2 — UI POLISH PASS

DIALOGHI:
- storyDialog, v122Dialogue e intro automatica usano ora la STESSA shell DOM.
- dimensione desktop target unica: 760 × 168 CSS px.
- stesso tab nome, stesso ritratto, stessa area testo, stesso indicatore.
- RISULTATO CORSA non ha più geometria speciale: usa esattamente la stessa shell.
- eliminato il balloon intro disegnato/scalato sul canvas: era la causa principale
  delle differenze fisiche e del testo spostato/tagliato a sinistra.
- il canvas dell'intro resta solo per 3-2-1-VIA.
- area testo con coordinate esplicite + wrapping; nessun testo può partire sotto
  il ritratto o fuori dal box.
- font ridotto automaticamente solo per testi lunghi.

HUD:
- pannelli più separati tra loro;
- bordi più leggeri;
- più aria tra minimappa, task e inventario.

TABLET:
- frame leggermente più pulito;
- più spazio tra le icone;
- mantiene il toggle TAB della B4.1.

Nessuna modifica a gameplay, mappa, collisioni, pathfinding, AI o task logic.


## 1.0.30B4.3 — DIALOGUE SYSTEM REFACTOR

QUATTRO FAMIGLIE UI:
1. TOAST
   - feedback brevissimo, non blocca il gioco.
2. EVENTO
   - missionBanner unico e sempre centrato.
   - risolve casi come PACCHI IN INGRESSO visualizzati fuori asse/tagliati.
3. DIALOGO
   - box standard B4.2 per NPC/telefono/conversazioni normali.
4. STORIA
   - nuova scena narrativa full-screen con:
     - ritratto grande 8-bit disegnato dal codice;
     - name tab;
     - testo progressivo;
     - E/ENTER per completare/avanzare;
     - pausa reale di timer e gameplay.

STORY MOMENTS già collegati:
- 10:15 ZIA ALE
- 14:15 ZIA ALE
- 16:45 IT MANAGER
- 18:00 CAPO

Messaggi minori come 11:45 Manager e 12:45 DON restano notifiche normali,
così le scene narrative non diventano continue.

Nessuna modifica a ticket, task content, mappa, collisioni, pathfinding o AI.
La prossima fase può quindi tornare al gameplay: nuove task per reparto.


## 1.0.30B5 — BIM + CENTRALE TASK REWORK

Primo pacchetto gameplay nuovo.

BIM:
- PASSWORD DIMENTICATA
- REVIT IN INGLESE
- DESKTOP CONNECTOR FERMO
- REVIT CRASHA ALL'AVVIO / ADD-IN

CENTRALE:
- XREF MANCANTE
- AUTOCAD NON PARTE / AUTH-LICENZA
- PC SENZA SERVER / 169.254
- STAMPA CON SPESSORI SBAGLIATI / CTB

NUOVO LOOP:
1. Il collega descrive il sintomo.
2. Il giocatore legge 3 stati reali della postazione.
3. Identifica quello che spiega davvero il problema.
4. Sceglie un intervento coerente.
5. Verifica e completa.

Le scelte sbagliate di diagnosi NON danno automaticamente uno strike:
il gioco spiega perché quel dato non è rilevante e permette di continuare.
Questo serve a rendere la diagnostica comprensibile senza farla sembrare
un esame scolastico.

I casi BIM/CENTRALE sostituiscono i vecchi minigiochi generici quando un
ticket nasce in quei reparti. Tablet/HUD mostrano titolo e sintomo reali.

Le altre stanze mantengono per ora il gameplay B4.3.


## 1.0.30B5.1 — INTERACTIVE PUZZLE REWORK
Gli 8 casi BIM/Centrale non sono più quiz.

- CTB: drag/selezione CTB + anteprima stampa.
- XREF: ricostruzione percorso + relink.
- 169.254: riparazione link + Renew DHCP.
- Revit lingua: installazione/selezione ITA + avvio.
- Revit add-in: switch plugin + test avvio.
- Desktop Connector: sign-in + sync.
- AutoCAD licensing: token + servizio + avvio.
- Password: pannello admin + reset account bloccato.

Regola: il testo descrive il sintomo; il giocatore risolve agendo.
Errore = feedback + piccolo stress, non quiz "risposta corretta".


## 1.0.30B5.2 — INTRO CINEMATIC + SPECIAL NPCS

INTRO:
1. 08:58 — Story Portrait del protagonista.
   - speaker = nome inserito dall'utente;
   - portrait rispetta UOMO/DONNA;
   - nessun riferimento alla sigaretta/fumo.
2. 09:00 — il giocatore raggiunge la porta e preme E.
3. Entrato in Segreteria — Story Portrait di ZIA ALE:
   - chiama il protagonista col nome scelto;
   - avverte che sta arrivando l'IT Manager;
   - spiega la corsa/login.
4. Cinematica senza balloon:
   - IT Manager compare sul marciapiede;
   - cammina fisicamente verso l'ingresso;
   - attraversa la porta;
   - entra in Segreteria e si ferma sulla linea di partenza.
5. 3-2-1-VIA.
6. La corsa continua dalla posizione reale del Manager verso il Reparto IT.

La partenza del Manager ha 700 ms di ritardo dopo VIA per non dargli
un vantaggio ingiusto.

SPECIAL NPC SPRITES:
- PAO ha ora uno sprite dedicato: più alto e magro, palette propria.
- DON ha ora uno sprite dedicato: pelle più scura, capelli scuri,
  maglia verde a due toni.
- entrambi sono trattati come NPC speciali: niente vecchia targhetta
  permanente sopra la testa.
- i loro portrait Story erano già supportati e restano disponibili.

FUMO:
- rimosso il riferimento alla sigaretta dall'intro;
- rimossa anche la battuta di DON che invitava a fumare.

Gameplay B5.1, puzzle, mappa, collisioni e pathfinding restano invariati.


## 1.0.30B5.3 — INTRO TUTORIAL CINEMATIC

La intro è ora completamente guidata fino al VIA.

FLOW:
1. Story Portrait del protagonista.
2. Il protagonista entra automaticamente dallo studio.
3. Story Portrait Zia Ale.
4. Zia introduce il tutorial dentro la narrazione:
   - nessun comando richiesto fino a quel momento;
   - al VIA: WASD oppure FRECCE;
   - raggiungi REPARTO IT;
   - E sulla workstation;
   - LOGIN.
5. Camera cinematica dedicata sul marciapiede/ingresso.
6. IT Manager parte da x1040 sul marciapiede, entra realmente in Segreteria.
7. Velocità ingresso Manager aumentata da 72 a 145.
8. 3-2-1-VIA.
9. Solo al VIA vengono sbloccati i controlli e parte la corsa.

Il vecchio step "raggiungi la porta e premi E" è stato rimosso dall'intro.
E/ENTER restano utilizzabili mentre è aperto uno Story Portrait esclusivamente
per avanzare il dialogo.

Gameplay, puzzle, NPC speciali e mappa restano invariati.


## 1.0.30B5.4 — VISIBLE MANAGER INTRO + DIALOGUE PASS

ZIA ALE:
- dialogo riscritto in tono più naturale;
- il tutorial resta dentro la narrazione;
- rimossa la frase "fin qui non devi toccare niente";
- istruzioni conservate: WASD/FRECCE, E sulla workstation, LOGIN.

MANAGER ARRIVAL:
- camera NON segue più il Manager;
- inquadratura cinematica fissa;
- zoom dedicato 1.18 per vedere contemporaneamente marciapiede + ingresso;
- Manager nasce già dentro l'inquadratura a x985/y985;
- percorre visibilmente il marciapiede;
- svolta verso la porta;
- entra in Segreteria;
- termina a x705/y895;
- velocità cinematic 132: passo deciso ma leggibile.

CONTROLLI:
- restano bloccati fino al VIA;
- E/ENTER continuano a servire solo per avanzare gli Story Portrait;
- al VIA torna il normale gameplay.

Il portrait del protagonista NON è stato modificato in questa build.
Puzzle e gameplay B5.1 restano invariati.


## 1.0.30B5.4.1 — START KEYS + MANAGER SPRITE FIX

START / MENU:
- schermata titolo: ENTER / E / SPAZIO apre la creazione personaggio;
- creazione personaggio:
  - ENTER avvia la partita anche mentre il cursore è nel campo nome;
  - E / SPAZIO avviano la partita quando il campo nome non è in modifica;
- digitare la lettera E o spazi nel nome NON avvia accidentalmente il gioco.

IT MANAGER:
- corretto il vero bug di rendering della cinematica.
- gli NPC venivano disegnati prima del marciapiede;
- il marciapiede veniva poi disegnato sopra lo sprite del Manager;
- durante `managerArrival` il Manager viene ridisegnato DOPO il layer esterno;
- la sua posizione, percorso, velocità e camera B5.4 restano invariati.

Puzzle, mappa, dialoghi e pathfinding non sono stati modificati.


## 1.0.30B5.4.2 — START INPUT GATE FIX

Corretto il bug:
- premendo E/ENTER/SPACE su "NUOVA PARTITA", la stessa pressione poteva
  essere letta subito anche dalla schermata di creazione personaggio;
- risultato: la scelta del PG veniva saltata.

NUOVO COMPORTAMENTO:
- E / ENTER / SPAZIO su titolo -> apre SOLO creazione personaggio;
- il tasto viene consumato con stopImmediatePropagation;
- un input gate resta attivo fino al KEYUP;
- per iniziare la partita serve una NUOVA pressione;
- il mouse continua a funzionare come prima;
- E e SPAZIO restano digitabili normalmente nel campo nome;
- ENTER nel campo nome può avviare la partita, ma soltanto con una nuova pressione.

Nessuna modifica a intro, Manager, puzzle, mappa o gameplay.


## 1.0.30B5.5 — PUZZLE CLARITY + AUTOSAVE / RESUME

PUZZLE:
- ogni caso BIM/CENTRALE mostra ora un riquadro OBIETTIVO;
- l'obiettivo descrive il GESTO da fare, non la soluzione;
- esempi:
  - trascina/seleziona CTB -> anteprima;
  - seleziona percorso -> ricollega XREF;
  - clicca link guasto -> Renew DHCP;
  - switch add-in -> avvia Revit;
- INDIZIO separato dall'OBIETTIVO;
- elementi interattivi hanno hover più leggibile;
- il cavo guasto pulsa leggermente.

AUTOSAVE:
- si attiva dopo la missione iniziale/login, quando il turno vero è iniziato;
- salva ogni ~5 secondi;
- salva anche quando la scheda va in background e prima di chiudere/ricaricare;
- conserva:
  - ora/stress/reputazione/errori/XP/incident;
  - posizione giocatore;
  - ticket aperti;
  - inventario;
  - missione fisica/evento studio;
  - relazioni;
  - stato base NPC speciali;
  - principali flag del turno.

RESUME:
- al menu appare CONTINUA TURNO quando esiste un autosave;
- C = CONTINUA;
- ENTER/E/SPACE mantengono NUOVA PARTITA;
- il resume riapre il mondo, NON un modal/minigame a metà:
  se il refresh avviene dentro un puzzle, il ticket resta aperto e puoi
  riaprire il puzzle dalla postazione.

REFRESH:
- Cmd/Ctrl+R e F5 vengono intercettati durante il gameplay quando possibile;
- prima viene comunque eseguito un autosave;
- l'autosave resta la protezione principale perché alcune scorciatoie browser
  possono essere riservate dalla piattaforma.

Una NUOVA PARTITA cancella volontariamente il vecchio autosave.


## 1.0.30B5.6 — INPUT + PACKAGE + LEGACY CLEANUP

BUG NUOVA PARTITA:
Trovati più handler storici contemporaneamente:
- vecchio handler V9 E/ENTER per boot+lore;
- secondo handler boot-only;
- handler B5.4.x recente.

Sono stati consolidati.
Ora esiste un solo router canonico per titolo/creazione personaggio:
`v130b541StartKeyboard`.

COMPORTAMENTO:
- E / ENTER / SPAZIO sul titolo -> SOLO schermata creazione PG;
- bisogna rilasciare il tasto;
- serve una nuova pressione per iniziare;
- E/SPACE nel campo nome restano testo;
- ENTER nel campo nome avvia solo con pressione nuova;
- C continua l'autosave.

PACCHI:
La causa era una biforcazione legacy:
un vecchio handler F/G richiedeva `carryMission`, ma i pacchi appartengono a
`studioEvent`. Quindi F non arrivava al pickup dei pacchi.

Ora F/G hanno un unico router canonico:
- F -> `v12c45Pickup()` per carryMission, pacchi ed eventi fisici;
- G -> deposito Magazzino se pertinente, altrimenti `v12c45Deliver()`;
- feedback "PRESO // PACCO...";
- HUD indica F per prendere e G per consegnare.

CLEANUP:
Rimossi handler input duplicati, helper fisici superati, workaround Amazon
legacy e un ramo `if(false)` morto.
Non sono stati eliminati sistemi storici che risultano ancora dipendenze attive.

Branding visibile dei pacchi reso neutro ("CONSEGNA PACCHI", etichetta IT).
La chiave interna `type:"AMAZON"` resta per compatibilità con il gameplay
esistente e non è mostrata al giocatore.


## 1.0.30B5.6.1 — PACING + PUZZLE FEEDBACK FIX

PACING:
- una sola attività importante alla volta;
- durante un puzzle NON partono:
  - nuovi ticket;
  - missioni fisiche;
  - meeting;
  - eventi studio;
  - missioni storia;
- lo stesso vale mentre stai trasportando un oggetto o completando un evento;
- terminata/fallita l'attività, 5 secondi reali di respiro prima del prossimo
  evento importante.

FIX SALA MEET:
La Story Progression mostrava il banner PRIMA di sapere se il meeting poteva
davvero partire. Ora:
1. verifica slot libero;
2. tenta l'avvio;
3. solo se l'avvio riesce mostra banner e avanza la storia.

PUZZLE:
- tentativo di verifica sbagliato = ERRORE reale;
- feedback rosso `ERRORE n/3`;
- incremento del contatore ERRORI come gli altri minigame;
- al terzo errore l'intervento fallisce come da sistema esistente;
- aggiunti indizi direttamente dentro il pannello:
  non serve conoscere a memoria CTB, XREF, add-in ecc.;
- l'obiettivo descrive sempre il gesto e il pannello contiene il dato necessario
  per dedurre la soluzione.

Questa build parte dalla B5.6 che include già:
- cleanup handler titolo/creazione PG;
- fix F/G pacchi;
- branding pacchi neutro;
- autosave/resume.


## 1.0.30B5.6.2 — MANAGER RACE SPEED FIX

La gara iniziale è stata ribilanciata.

PRIMA:
- Player speed ≈ 205
- Manager race speed = 78
- Manager delay = 700 ms

ORA:
- Player speed ≈ 205
- Manager race speed = 168
- Manager delay = 280 ms

Obiettivo:
- il Manager deve sembrare che stia davvero correndo;
- deve essere una gara leggibile e tesa;
- il giocatore conserva comunque un vantaggio di velocità e può vincere
  scegliendo bene il percorso.

La velocità della cinematica d'arrivo sul marciapiede NON è stata modificata.
Pacing, puzzle feedback, pacchi, autosave e cleanup B5.6/B5.6.1 restano invariati.


## 1.0.30B5.6.3 — ESC BACK NAVIGATION

Aggiunto ESC come tasto BACK universale per l'interfaccia.

ESC chiude, in ordine:
- pannello debug/proof se aperto;
- Tablet;
- mappa completa;
- schermata ricompensa;
- puzzle/modal corrente;
- normali pannelli/dialoghi UI non narrativi.

REGOLE:
- ESC dentro un puzzle NON conta come errore;
- il ticket resta aperto e può essere riaperto dalla postazione;
- ESC non chiude Story Portrait importanti;
- ESC non interrompe la cinematica iniziale;
- se il focus è in un input, ESC toglie prima il focus;
- nel mondo normale, senza UI aperta, ESC non fa nulla.

Pacing, Manager race, pacchi, autosave e puzzle feedback restano invariati.


## VERSIONE 30B5.7 — Map Solid + NPC Portrait Pass

- hard perimeter interno dopo l'ingresso: niente ritorno accidentale in strada;
- Betty resta HR; Zia Ale Segreteria; PAO BIM-biased; DON gira davvero nello studio;
- NPC ordinari, Capo, corriere e furgone uniformati al linguaggio Game Boy;
- interazioni attive speciali usano Story Portrait;
- finale skeleton: auto-walk Sala Meet Capo, pubblico in sala, Capo portrait,
  poi boss fight esistente come placeholder.


## 1.0.30B5.7.1 — MEETING EVENT PLAYABLE FIX

Corretto l'evento Sala Meeting che risultava praticamente impossibile/illeggibile.

NUOVO FLOW:
1. Story Portrait IT Manager:
   - Sala Meet senza segnale;
   - recupera EXTENDER HDMI.
2. Pickup in punto sicuro e raggiungibile del SERVER / MAGAZZINO IT:
   x535 / y225.
3. Marker giallo visibile:
   `F // PRENDI EXTENDER`.
4. Dopo il pickup:
   obiettivo cambia automaticamente.
5. Destinazione in punto sicuro della SALA MEET:
   x940 / y285.
6. Marker:
   `G // COLLEGA EXTENDER`.
7. Completamento:
   +220 XP, evento chiuso, Story Portrait Manager di conferma.

RIMOSSI I PROBLEMI:
- nessun marker grafico per MEETING_RUSH;
- pickup poco leggibile;
- banner vago "controlla la sala meeting";
- possibile falso fallimento ereditato dal vecchio watcher carryMission.

L'evento non ha una deadline nascosta: deve poter essere completato sempre,
purché il turno sia ancora attivo.

Tutto B5.7 resta invariato.
