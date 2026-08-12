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
