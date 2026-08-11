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
