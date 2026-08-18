
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
   bar.textContent=`JS ERROR VERSIONE1ITSHIFT 1.0.29.4 // ${txt}${line?` @ ${line}:${col}`:""}`;
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


/* ============================================================
   1.0.30B3 — TITLE CANVAS
   Same visual grammar as the actual game: pixel grid, rooms, road,
   facade and sprites. No generated image assets.
   ============================================================ */
const V130B3_TITLE={raf:0,t0:performance.now()};

function v130b3Pixel(ctx,x,y,w,h,c){
 ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h));
}
function v130b3Outline(ctx,x,y,w,h,c="#172019",t=4){
 v130b3Pixel(ctx,x,y,w,t,c);v130b3Pixel(ctx,x,y+h-t,w,t,c);
 v130b3Pixel(ctx,x,y,t,h,c);v130b3Pixel(ctx,x+w-t,y,t,h,c);
}
function v130b3TileFloor(ctx,x,y,w,h,a,b,size=24){
 const sx=Math.floor(x/size)*size,sy=Math.floor(y/size)*size;
 for(let yy=sy;yy<y+h;yy+=size){
   for(let xx=sx;xx<x+w;xx+=size){
     const odd=((Math.floor(xx/size)+Math.floor(yy/size))&1)!==0;
     v130b3Pixel(ctx,xx,yy,size,size,odd?b:a);
     v130b3Pixel(ctx,xx+4,yy+4,3,3,odd?"rgba(0,0,0,.06)":"rgba(255,255,255,.035)");
   }
 }
}
function v130b3SpriteBack(ctx,x,y,scale=4,female=false,step=0){
 const S=scale;
 const p=(ix,iy,iw,ih,c)=>v130b3Pixel(ctx,x+ix*S,y+iy*S,iw*S,ih*S,c);
 const ink="#172019",skin="#c89e79",hair=female?"#33221f":"#2b211c";
 const shirt=female?"#69526b":"#355544",pants="#2b3730";
 // shadow
 v130b3Pixel(ctx,x-2*S,y+16*S,14*S,3*S,"rgba(0,0,0,.30)");
 // hair/head
 p(2,0,8,3,hair);p(1,2,10,7,skin);
 p(1,2,2,female?11:9,hair);p(9,2,2,female?11:9,hair);
 // back of head/hair
 p(3,2,6,4,hair);
 // body
 p(2,9,8,5,shirt);p(1,10,2,3,skin);p(9,10,2,3,skin);
 // glasses side hints
 p(1,5,2,1,ink);p(9,5,2,1,ink);
 // legs
 const off=step?1:0;
 p(3,14,2,3+off,pants);p(7,14+off,2,3-off,pants);
 p(3,17+off,2,1,ink);p(7,17,2,1,ink);
}
function v130b3Npc(ctx,x,y,shirt="#5e6470",hair="#48372c"){
 const S=3;
 const p=(ix,iy,iw,ih,c)=>v130b3Pixel(ctx,x+ix*S,y+iy*S,iw*S,ih*S,c);
 p(2,0,6,3,hair);p(1,2,8,6,"#c89e79");p(2,8,6,5,shirt);p(2,13,2,3,"#313b36");p(6,13,2,3,"#313b36");
}
function v130b3DrawTitle(){
 const c=document.getElementById("v130b3TitleCanvas");if(!c)return;
 const ctx=c.getContext("2d");ctx.imageSmoothingEnabled=false;
 const W=c.width,H=c.height;
 const t=(performance.now()-V130B3_TITLE.t0)/1000;

 // whole scene
 ctx.fillStyle="#0a100c";ctx.fillRect(0,0,W,H);

 // morning sky
 v130b3Pixel(ctx,0,0,W,150,"#91a79d");
 v130b3Pixel(ctx,0,116,W,34,"#c8b48d");

 // building wall
 v130b3Pixel(ctx,100,112,1080,345,"#35463c");
 v130b3Outline(ctx,100,112,1080,345,"#172019",7);

 // studio sign
 v130b3Pixel(ctx,505,135,270,40,"#26372d");
 v130b3Outline(ctx,505,135,270,40,"#172019",5);
 ctx.fillStyle="#8fa28d";ctx.font="900 18px monospace";ctx.textAlign="center";
 ctx.fillText("STUDIO",640,162);

 // windows
 const wins=[[170,195,245,115],[865,195,245,115]];
 for(const [x,y,w,h] of wins){
   v130b3Pixel(ctx,x,y,w,h,"#172019");
   v130b3Pixel(ctx,x+7,y+7,w-14,h-14,"#73949a");
   v130b3Pixel(ctx,x+w-60,y+7,25,h-14,"rgba(205,225,218,.18)");
 }

 // door
 v130b3Pixel(ctx,535,220,210,237,"#172019");
 v130b3Pixel(ctx,544,229,94,219,"#85928b");
 v130b3Pixel(ctx,642,229,94,219,"#85928b");
 v130b3Pixel(ctx,637,229,6,219,"#172019");
 v130b3Pixel(ctx,592,336,8,5,"#d8d39e");v130b3Pixel(ctx,680,336,8,5,"#d8d39e");

 // desks visible through windows
 for(const x of [205,910]){
   v130b3Pixel(ctx,x,285,165,22,"#8b5e3c");
   v130b3Pixel(ctx,x+25,255,35,28,"#172019");
   v130b3Pixel(ctx,x+30,260,25,17,"#658b91");
   v130b3Pixel(ctx,x+100,255,35,28,"#172019");
   v130b3Pixel(ctx,x+105,260,25,17,"#658b91");
 }

 // sidewalk - global tiles
 v130b3TileFloor(ctx,0,457,W,145,"#bbb8a5","#aaa793",32);
 v130b3Pixel(ctx,0,596,W,9,"#ded8bb");

 // road
 v130b3Pixel(ctx,0,605,W,115,"#26302d");
 for(let x=80;x<W;x+=280)v130b3Pixel(ctx,x,657,120,6,"#d7cd92");

 // entrance mat
 v130b3Pixel(ctx,545,475,190,44,"#172019");
 v130b3Pixel(ctx,552,482,176,30,"#59675d");
 for(let x=560;x<720;x+=18)v130b3Pixel(ctx,x,488,6,18,"#768176");

 // little outside props
 v130b3Pixel(ctx,1020,535,90,16,"#79533a");
 v130b3Pixel(ctx,1028,551,10,24,"#172019");v130b3Pixel(ctx,1092,551,10,24,"#172019");

 // NPC near entrance and passerby
 v130b3Npc(ctx,760,445,"#765d78","#d6c79c");
 const px=930+Math.sin(t*.7)*18;
 v130b3Npc(ctx,px,535,"#52685a","#3b2d25");

 // protagonist, centered and closer, back view
 const female=(typeof V130B2_PROFILE!=="undefined"&&V130B2_PROFILE.gender==="female");
 v130b3SpriteBack(ctx,600,505,5,female,Math.floor(t*3)%2);

 // subtle light pool toward entrance
 const grad=ctx.createRadialGradient(640,420,10,640,420,240);
 grad.addColorStop(0,"rgba(207,219,170,.12)");
 grad.addColorStop(1,"rgba(207,219,170,0)");
 ctx.fillStyle=grad;ctx.fillRect(400,220,480,420);

 // dark framing under title text to keep it readable without a huge panel
 const g=ctx.createLinearGradient(0,0,610,0);
 g.addColorStop(0,"rgba(5,10,7,.78)");
 g.addColorStop(.72,"rgba(5,10,7,.32)");
 g.addColorStop(1,"rgba(5,10,7,0)");
 ctx.fillStyle=g;ctx.fillRect(0,0,650,H);

 ctx.textAlign="left";
 V130B3_TITLE.raf=requestAnimationFrame(v130b3DrawTitle);
}
document.addEventListener("DOMContentLoaded",()=>{
 requestAnimationFrame(v130b3DrawTitle);
});

const V130B2_PROFILE={
 name:"",
 gender:"male"
};

function v130b2LoadProfile(){
 try{
   const saved=JSON.parse(localStorage.getItem("itshift_profile")||"null");
   if(saved&&typeof saved==="object"){
     V130B2_PROFILE.name=String(saved.name||"").slice(0,12);
     V130B2_PROFILE.gender=saved.gender==="female"?"female":"male";
   }
 }catch(e){}
}

function v130b2SaveProfile(){
 try{localStorage.setItem("itshift_profile",JSON.stringify(V130B2_PROFILE))}catch(e){}
}

function v130b2PlayerName(){
 return (String(V130B2_PROFILE.name||"").trim()||"IT").toUpperCase();
}

function v130b2FormatRealDate(){
 const d=new Date();
 const days=["DOMENICA","LUNEDÌ","MARTEDÌ","MERCOLEDÌ","GIOVEDÌ","VENERDÌ","SABATO"];
 const months=["GENNAIO","FEBBRAIO","MARZO","APRILE","MAGGIO","GIUGNO","LUGLIO","AGOSTO","SETTEMBRE","OTTOBRE","NOVEMBRE","DICEMBRE"];
 return `08:58 // ${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function v130b2DrawSetupPreview(){
 const c=document.getElementById("v130b2CharacterPreview");if(!c)return;
 const x=c.getContext("2d");x.imageSmoothingEnabled=false;
 const female=V130B2_PROFILE.gender==="female";
 const bg1="#65755f",bg2="#6e8066";
 x.fillStyle=bg1;x.fillRect(0,0,c.width,c.height);
 for(let yy=0;yy<c.height;yy+=16)for(let xx=0;xx<c.width;xx+=16){
   if(((xx/16+yy/16)&1)===0){x.fillStyle=bg2;x.fillRect(xx,yy,16,16)}
 }
 const S=6,ox=64,oy=118;
 const p=(ix,iy,iw,ih,col)=>{x.fillStyle=col;x.fillRect(ox+(ix-6)*S,oy+(iy-15)*S,iw*S,ih*S)};
 const hair=female?"#33221f":"#2b211c";
 const skin="#c89e79";
 const shirt=female?"#69526b":"#355544";
 const pants="#2b3730",ink="#172019",glass="#172019",beard="#3b2921";

 x.fillStyle="rgba(0,0,0,.28)";x.fillRect(ox-32,oy+34,64,12);
 p(2,0,8,3,hair);p(1,2,10,7,skin);
 p(1,2,2,female?10:9,hair);p(9,2,2,female?10:9,hair);
 if(female){p(1,9,2,5,hair);p(9,9,2,5,hair)}
 else {p(1,7,2,4,hair);p(9,7,2,4,hair)}
 p(2,4,3,1,glass);p(7,4,3,1,glass);p(5,4,2,1,glass);
 if(!female){p(3,7,6,2,beard);p(5,9,2,1,beard)}
 p(2,9,8,5,shirt);
 p(1,10,2,3,skin);p(9,10,2,3,skin);
 p(3,14,2,3,pants);p(7,14,2,3,pants);
 p(3,17,2,1,ink);p(7,17,2,1,ink);

 // tiny shirt identity detail
 if(female){
   p(3,11,6,1,"#d2c58b");
 }else{
   p(5,10,2,3,"#476b58");
 }
}

function v130b2SyncSetup(){
 const input=document.getElementById("v130b2PlayerName");
 const previewName=document.getElementById("v130b2PreviewName");
 const previewGender=document.getElementById("v130b2PreviewGender");
 if(input&&document.activeElement!==input)input.value=V130B2_PROFILE.name;
 if(previewName)previewName.textContent=v130b2PlayerName();
 if(previewGender)previewGender.textContent=V130B2_PROFILE.gender==="female"?"DONNA":"UOMO";
 document.querySelectorAll(".v130b2-gender").forEach(b=>b.classList.toggle("selected",b.dataset.gender===V130B2_PROFILE.gender));
 v130b2DrawSetupPreview();
}

function v130b2OpenSetup(){
 show("lore");
 v130b2SyncSetup();
 setTimeout(()=>document.getElementById("v130b2PlayerName")?.focus(),50);
}

v130b2LoadProfile();
const dateEl=document.getElementById("realDateLine");if(dateEl)dateEl.textContent=v130b2FormatRealDate();

$("#toLore").classList.remove("hidden");
$("#toLore").onclick=v130b2OpenSetup;
$("#v130b2Back").onclick=()=>show("boot");

document.querySelectorAll(".v130b2-gender").forEach(btn=>{
 btn.onclick=()=>{
   V130B2_PROFILE.gender=btn.dataset.gender==="female"?"female":"male";
   v130b2SyncSetup();
 };
});

$("#v130b2PlayerName").addEventListener("input",e=>{
 V130B2_PROFILE.name=String(e.target.value||"").replace(/[^A-Za-zÀ-ÿ0-9 _-]/g,"").slice(0,12);
 e.target.value=V130B2_PROFILE.name;
 const n=document.getElementById("v130b2PreviewName");if(n)n.textContent=v130b2PlayerName();
});

$("#start").onclick=()=>{
 const err=$("#v130b2SetupError");
 const name=String($("#v130b2PlayerName")?.value||"").trim();
 if(name.length<2){
   if(err)err.textContent="INSERISCI UN NOME DI ALMENO 2 CARATTERI.";
   $("#v130b2PlayerName")?.focus();
   return;
 }
 V130B2_PROFILE.name=name.slice(0,12);
 difficulty=$("#difficulty")?.value||"normal";
 v130b2SaveProfile();
 if(typeof v130b55ClearSave==="function")v130b55ClearSave();
 if(err)err.textContent="";
 show("game");
 reset();
 requestAnimationFrame(loop);
};



/* ============================================================
   1.0.30B5.5 — AUTOSAVE / RESUME
   ============================================================ */
const V130B55_SAVE_KEY="itshift_shift_autosave_v130b55";
let V130B55_LAST_SAVE_AT=0;

function v130b55SaveEligible(){
 return !!(
   state&&player&&
   state.phase==="shift"&&
   state.min>=540&&state.min<END&&
   introStage==="done"&&
   workstationOnline&&firstMissionResolved
 );
}

function v130b55Snapshot(){
 if(!v130b55SaveEligible())return null;
 return {
   version:"1.0.30B5.5",
   savedAt:Date.now(),
   difficulty,
   profile:{
     name:String(V130B2_PROFILE.name||"").slice(0,12),
     gender:V130B2_PROFILE.gender==="female"?"female":"male"
   },
   state:{...state},
   player:{...player},
   tickets:JSON.parse(JSON.stringify(tickets||[])),
   inventory:JSON.parse(JSON.stringify(inventory||[])),
   carryMission:carryMission?JSON.parse(JSON.stringify(carryMission)):null,
   studioEvent:studioEvent?JSON.parse(JSON.stringify(studioEvent)):null,
   studioEventNext,
   eventSerial,
   pendingOffers:JSON.parse(JSON.stringify(pendingOffers||{})),
   dayFlags:JSON.parse(JSON.stringify(dayFlags||{})),
   npcRelations:JSON.parse(JSON.stringify(npcRelations||{})),
   npcState:(npcs||[]).filter(Boolean).map(n=>({
     id:n.id,name:n.name,x:n.x,y:n.y,state:n.state,
     homeRoom:n.homeRoom,activity:n.activity||null
   })),
   flags:{
     enteredStudio:true,
     shiftStarted:true,
     managerRaceDone:true,
     managerPenaltyDone:!!managerPenaltyDone,
     raceState,
     workstationOnline:true,
     firstMissionResolved:true,
     firstCarryTriggered:!!firstCarryTriggered,
     lunchMode:!!lunchMode
   }
 };
}

function v130b55SaveNow(force=false){
 try{
   if(!v130b55SaveEligible()){
     if(state&&state.min>=END)v130b55ClearSave();
     return false;
   }
   const now=Date.now();
   if(!force&&now-V130B55_LAST_SAVE_AT<4500)return false;
   const snap=v130b55Snapshot();if(!snap)return false;
   localStorage.setItem(V130B55_SAVE_KEY,JSON.stringify(snap));
   V130B55_LAST_SAVE_AT=now;
   v130b55RefreshContinueButton();
   return true;
 }catch(err){
   console.warn("AUTOSAVE SKIPPED",err);
   return false;
 }
}

function v130b55LoadSave(){
 try{
   const s=JSON.parse(localStorage.getItem(V130B55_SAVE_KEY)||"null");
   if(!s||!s.state||!s.player||s.version!=="1.0.30B5.5")return null;
   if(!Number.isFinite(s.state.min)||s.state.min<540||s.state.min>=END)return null;
   return s;
 }catch(err){return null}
}

function v130b55ClearSave(){
 try{localStorage.removeItem(V130B55_SAVE_KEY)}catch(err){}
 v130b55RefreshContinueButton();
}

function v130b55RefreshContinueButton(){
 const btn=document.getElementById("v130b55Continue");
 const meta=document.getElementById("v130b55ContinueMeta");
 if(!btn)return;
 const s=v130b55LoadSave();
 btn.classList.toggle("hidden",!s);
 if(s&&meta){
   const when=new Date(s.savedAt||Date.now());
   meta.textContent=`${fmt(s.state.min)} // ${String(s.profile?.name||"IT").toUpperCase()} // SALVATO ${String(when.getHours()).padStart(2,"0")}:${String(when.getMinutes()).padStart(2,"0")}`;
 }
}

function v130b55RestoreNpcState(saved){
 if(!Array.isArray(saved))return;
 saved.forEach(src=>{
   const n=(npcs||[]).find(x=>x&&(src.id?x.id===src.id:x.name===src.name));
   if(!n)return;
   if(Number.isFinite(src.x))n.x=src.x;
   if(Number.isFinite(src.y))n.y=src.y;
   if(src.state)n.state=src.state;
   if(src.homeRoom)n.homeRoom=src.homeRoom;
   n.activity=src.activity||null;
   n.route=null;n.routeIndex=0;n.routeGoal=null;
   n.stuckFor=0;n.blockedFor=0;n.ignoreNpcCollision=false;
 });
}

function v130b55ApplySave(s){
 if(!s)return false;

 difficulty=s.difficulty&&difficultyConfig[s.difficulty]?s.difficulty:"normal";
 V130B2_PROFILE.name=String(s.profile?.name||V130B2_PROFILE.name||"IT").slice(0,12);
 V130B2_PROFILE.gender=s.profile?.gender==="female"?"female":"male";
 v130b2SaveProfile();

 state={...state,...s.state,phase:"shift"};
 player={...player,...s.player,name:v130b2PlayerName(),gender:V130B2_PROFILE.gender};
 tickets=Array.isArray(s.tickets)?s.tickets:[];
 inventory=Array.isArray(s.inventory)?s.inventory:[];
 carryMission=s.carryMission||null;
 studioEvent=s.studioEvent||null;
 studioEventNext=Number.isFinite(s.studioEventNext)?s.studioEventNext:Math.max(610,state.min+20);
 eventSerial=Number.isFinite(s.eventSerial)?s.eventSerial:0;
 pendingOffers=s.pendingOffers&&typeof s.pendingOffers==="object"?s.pendingOffers:{};
 dayFlags=s.dayFlags&&typeof s.dayFlags==="object"?s.dayFlags:{};

 Object.keys(npcRelations).forEach(k=>delete npcRelations[k]);
 if(s.npcRelations&&typeof s.npcRelations==="object"){
   Object.assign(npcRelations,s.npcRelations);
 }

 enteredStudio=true;
 entranceOpened=true;
 introFreeWalk=false;
 shiftStarted=true;
 managerRaceDone=true;
 managerPenaltyDone=!!s.flags?.managerPenaltyDone;
 raceState=s.flags?.raceState||"done";
 workstationOnline=true;
 firstMissionResolved=true;
 v110FirstMissionResolved=true;
 firstCarryTriggered=s.flags?.firstCarryTriggered!==false;
 lunchMode=!!s.flags?.lunchMode;
 introStage="done";

 V129_INTRO.phase="resume";
 V129_INTRO.timer=0;
 V129_INTRO.locked=false;
 V129_INTRO.doorOpen=true;
 V129_INTRO.crossed=true;
 V129_RACE.active=false;
 V129_RACE.managerFinished=true;
 V129_RACE.playerFinished=true;

 if(typeof V130B43_STORY!=="undefined"){
   clearInterval(V130B43_STORY.timer);
   V130B43_STORY.active=false;
   document.getElementById("v130b43StoryScene")?.classList.add("hidden");
 }
 storyOpen=false;dialogPause=false;uiMessageBusy=false;activeMiniGame=null;
 document.getElementById("modal")?.classList.add("hidden");
 document.getElementById("missionBanner")?.classList.add("hidden");
 v130b42HideAutoDialogue();

 v130b55RestoreNpcState(s.npcState);

 last=performance.now();
 spawnTimer=0;
 anomTimer=0;
 updateInventoryUI();
 renderTickets();
 updateTaskProgress();
 setupCompactHUD();
 setupMiniMapControls();
 hud();
 if(typeof toast==="function")toast(`TURNO RIPRISTINATO // ${fmt(state.min)}`);
 return true;
}

function v130b55ContinueGame(){
 const s=v130b55LoadSave();
 if(!s){v130b55RefreshContinueButton();return false}
 difficulty=s.difficulty&&difficultyConfig[s.difficulty]?s.difficulty:"normal";
 show("game");
 reset();
 if(!v130b55ApplySave(s)){
   show("boot");
   return false;
 }
 requestAnimationFrame(loop);
 return true;
}

document.getElementById("v130b55Continue")?.addEventListener("click",()=>{
 v130b55ContinueGame();
});

document.addEventListener("DOMContentLoaded",v130b55RefreshContinueButton);
setTimeout(v130b55RefreshContinueButton,0);

setInterval(()=>v130b55SaveNow(false),5000);
document.addEventListener("visibilitychange",()=>{
 if(document.visibilityState==="hidden")v130b55SaveNow(true);
});
window.addEventListener("beforeunload",()=>v130b55SaveNow(true));

// Optional extra protection. Chrome may reserve some browser shortcuts,
// so autosave remains the actual safety net.
window.addEventListener("keydown",e=>{
 if(!document.getElementById("gameScreen")?.classList.contains("active"))return;
 if((e.metaKey||e.ctrlKey)&&String(e.key||"").toLowerCase()==="r"){
   v130b55SaveNow(true);
   e.preventDefault();
   if(typeof toast==="function")toast("REFRESH BLOCCATO // TURNO SALVATO");
 }
 if(e.key==="F5"){
   v130b55SaveNow(true);
   e.preventDefault();
   if(typeof toast==="function")toast("REFRESH BLOCCATO // TURNO SALVATO");
 }
},true);


/* ============================================================
   1.0.30B5.4.1 — START KEYBOARD SUPPORT
   ============================================================ */
function v130b541ScreenActive(id){
 const el=document.getElementById(id);
 return !!(el&&el.classList.contains("active"));
}

function v130b541StartKeyboard(e){
 if(e.repeat)return;

 const boot=v130b541ScreenActive("boot");
 const lore=v130b541ScreenActive("lore");
 if(!boot&&!lore)return;

 const code=e.code;
 const isEnter=code==="Enter";
 const isE=code==="KeyE";
 const isSpace=code==="Space";
 const isContinue=code==="KeyC";
 if(!(isEnter||isE||isSpace||isContinue))return;

 // If this physical key opened the current screen, ignore it until KEYUP.
 if(window.__v130b56MenuGate){
   e.preventDefault();
   e.stopImmediatePropagation();
   return;
 }

 if(boot){
   e.preventDefault();
   e.stopImmediatePropagation();

   if(isContinue&&!document.getElementById("v130b55Continue")?.classList.contains("hidden")){
     window.__v130b56MenuGate=true;
     window.__v130b56MenuGateCode=code;
     document.getElementById("v130b55Continue")?.click();
     return;
   }

   if(isContinue)return;

   window.__v130b56MenuGate=true;
   window.__v130b56MenuGateCode=code;
   document.getElementById("toLore")?.click();
   return;
 }

 // Character creation: never let E or SPACE act as shortcuts while typing.
 if(lore){
   if(isContinue)return;

   const input=document.getElementById("v130b2PlayerName");
   const typing=document.activeElement===input ||
     ["INPUT","TEXTAREA","SELECT"].includes(String(document.activeElement?.tagName||"").toUpperCase()) ||
     document.activeElement?.isContentEditable;

   if(typing){
     // ENTER may submit on a NEW key press; E/SPACE remain normal text.
     if(isEnter){
       e.preventDefault();
       e.stopImmediatePropagation();
       document.getElementById("start")?.click();
     }
     return;
   }

   e.preventDefault();
   e.stopImmediatePropagation();
   document.getElementById("start")?.click();
 }
}
document.addEventListener("keydown",v130b541StartKeyboard,true);

document.addEventListener("keyup",function v130b56ReleaseMenuGate(e){
 if(!window.__v130b56MenuGate)return;
 if(!window.__v130b56MenuGateCode||e.code===window.__v130b56MenuGateCode){
   window.__v130b56MenuGate=false;
   window.__v130b56MenuGateCode=null;
 }
},true);

window.addEventListener("blur",()=>{
 window.__v130b56MenuGate=false;
 window.__v130b56MenuGateCode=null;
});




/* V12 CLEAN.4.5 — IT LAB / MAGAZZINO */
const V12C45_LAB={
 name:"SERVER",
 x:1110,y:145,w:230,h:220
};
const V12C45_LAB_DROP={x:440,y:188,room:"SERVER",label:"SCAFFALI MAGAZZINO IT"};
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
const V101_EXTERIOR={WALL_Y:935,SIDEWALK:{x:320,y:945,w:1000,h:55},ROAD:{x:0,y:1000,w:1600,h:40},ENTRANCE:{x:635,y:930,w:120,h:70}};

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
 {x:635,y:910,w:120,h:100}
];
const EXTERIOR_DOOR={x:635,y:835,w:120,h:105};
doors.push(EXTERIOR_DOOR);
const walkZones=[...roomFloors,...corridors,...doors];
const V9_MEETINGS={
 "SALA MEET":{table:{x:872,y:155,w:126,h:42},screen:{x:935,y:105},seats:[{x:888,y:218},{x:925,y:218},{x:962,y:218},{x:888,y:135},{x:925,y:135},{x:962,y:135}]},
 "SPAZIO A":{table:{x:875,y:435,w:225,h:44},screen:{x:1030,y:405},seats:[{x:900,y:505},{x:950,y:505},{x:1000,y:505},{x:1050,y:505},{x:900,y:415},{x:950,y:415},{x:1000,y:415},{x:1050,y:415}]},
 "SALA MEET CAPO":{table:{x:1340,y:500,w:180,h:48},screen:{x:1430,y:450},seats:[{x:1370,y:575},{x:1430,y:575},{x:1490,y:575},{x:1370,y:480},{x:1430,y:480},{x:1490,y:480}]}
};
let meetingSeatClaims={};

const obstacles=[
 {x:515,y:770,w:110,h:24}, // B1.3 reception spostata: corsia ingresso libera
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
 {id:"pao",name:"PAO",role:"BIMER",x:176,y:696,homeRoom:"BIM",homeX:176,homeY:696,tone:"mixed",shirt:"#536f8b",hunter:false,speed:58,state:"work"},
 {id:"zia",name:"ZIA ALE",role:"SEGRETERIA",x:565,y:825,homeRoom:"INGRESSO / SEGRETERIA",homeX:565,homeY:825,tone:"good",shirt:"#765d78",state:"idle"},
 {id:"don",name:"DON",role:"JOLLY",x:700,y:700,homeRoom:"CUCINA",homeX:1045,homeY:880,tone:"good",shirt:"#566a51",skin:"#8b5a3c",hair:"#17120f",hunter:false,speed:66,state:"specialPause"},{id:"hr",name:"BETTY",role:"HR",x:150,y:165,homeX:150,homeY:165,tone:"good",shirt:"#6f6258",hunter:false,speed:48,state:"idle",homeRoom:"HR"},{id:"manager",name:"IT MANAGER",role:"IT // DISPATCH",x:650,y:900,homeX:185,homeY:842,tone:"neutral",shirt:"#5d6570",hunter:false,speed:58,raceSpeed:118,state:"outside"}];
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
 const seatY=s=>{
   if(s.room==="CENTRALE")return s.y+43;
   if(s.room==="EDITORIA")return s.y+49;
   if(s.room==="INTERIOR"||s.room==="RENDERISTI")return s.y+47;
   if(s.room==="BIM")return s.y+46;
   return s.y+38;
 };
 ambientNPCs=seats.map((s,i)=>({
   id:"staff_"+s.id.toLowerCase(),
   name:ambientNames[i%ambientNames.length],
   stationId:s.id,
   homeRoom:s.room,
   homeX:s.x,homeY:seatY(s),
   deskX:s.x,deskY:seatY(s),
   x:s.x,y:seatY(s),
   currentRoom:s.room,
   state:"work",
   timer:14+Math.random()*28,
   speed:56,
   shirt:["#4f6259","#665747","#4d596b","#6b4e57"][i%4],
   route:[],routeIndex:0,activity:null,activityTicket:false,stuckFor:0
 }));
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


/* ============================================================
   VERSIONE1ITSHIFT 1.0.29.2 — UNIFIED WALL / DOOR COLLISION
   One rule for PLAYER + NPC + PATHFINDER:
   a room boundary may be crossed only through a declared door.
   ============================================================ */
function v1292SolidRoomAt(x,y){
 return rooms.find(r=>x>=r.x&&x<=r.x+r.w&&y>=r.y&&y<=r.y+r.h)||null;
}
function v1292DoorAt(x,y){
 return doors.some(d=>{
   const pad=3;
   return x>=d.x+pad&&x<=d.x+d.w-pad&&y>=d.y+pad&&y<=d.y+d.h-pad;
 });
}
function v1292SegmentAllowed(ax,ay,bx,by){
 if(!Number.isFinite(ax)||!Number.isFinite(ay)||!Number.isFinite(bx)||!Number.isFinite(by))return false;
 if(!walkable(bx,by))return false;

 const dist=Math.hypot(bx-ax,by-ay);
 const steps=Math.max(1,Math.ceil(dist/2));
 let px=ax,py=ay;
 let prev=v1292SolidRoomAt(ax,ay);

 for(let i=1;i<=steps;i++){
   const t=i/steps;
   const x=ax+(bx-ax)*t,y=ay+(by-ay)*t;
   if(!walkable(x,y))return false;
   const cur=v1292SolidRoomAt(x,y);

   if(cur!==prev){
     const mx=(px+x)/2,my=(py+y)/2;
     if(!v1292DoorAt(mx,my)&&!v1292DoorAt(px,py)&&!v1292DoorAt(x,y))return false;
   }

   prev=cur;px=x;py=y;
 }
 return true;
}
function v1292RouteSafe(from,route){
 if(!from||!Array.isArray(route)||!route.length)return false;
 let a={x:from.x,y:from.y};
 for(const p of route){
   if(!p||!Number.isFinite(p.x)||!Number.isFinite(p.y))return false;
   if(!v1292SegmentAllowed(a.x,a.y,p.x,p.y))return false;
   a=p;
 }
 return true;
}

function findNpcPath(from,to){
 const labRoute=v102LabRoute(from,to);
 if(labRoute&&v1292RouteSafe(from,labRoute))return labRoute;
 const v1sl=v1ServerLabConnector(from,to);
 if(v1sl&&v1292RouteSafe(from,v1sl))return v1sl;
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
   if(!v1292SegmentAllowed(x,y,nx,ny))continue;
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
 if(navAllowedPoint(to.x,to.y,startRoom,destRoom)&&
    v1292SegmentAllowed(out.length?out[out.length-1].x:s0.x,out.length?out[out.length-1].y:s0.y,to.x,to.y)){
   out.push({x:to.x,y:to.y,room:destRoom});
 }
 return v1292RouteSafe({x:from.x,y:from.y},out)?out:[];
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
 if(n.route.length>500)n.route=n.route.slice(0,500);
 if(!Number.isFinite(n.routeIndex))n.routeIndex=0;
 if(n.routeIndex>=n.route.length)return true;

 const p=n.route[n.routeIndex];
 if(!v118ValidPoint(p)){n.route=null;n.routeIndex=0;return true}

 const dx=p.x-n.x,dy=p.y-n.y,d=Math.hypot(dx,dy);
 if(!Number.isFinite(d)){n.route=null;n.routeIndex=0;return true}

 if(d<4){
   if(v1292SegmentAllowed(n.x,n.y,p.x,p.y)){
     n.x=p.x;n.y=p.y;n.routeIndex++;n.stuckFor=0;n.blockedFor=0;
     return n.routeIndex>=n.route.length;
   }
 }

 const step=(n.speed||56)*Math.min(Math.max(Number.isFinite(dt)?dt:0,0),0.035);
 let nx=n.x,ny=n.y;

 if(Math.abs(dx)>=Math.abs(dy))nx+=Math.sign(dx)*Math.min(Math.abs(dx),step);
 else ny+=Math.sign(dy)*Math.min(Math.abs(dy),step);

 let blocked=!v1292SegmentAllowed(n.x,n.y,nx,ny);

 if(!blocked&&!n.ignoreNpcCollision){
   for(const o of npcOthers(n)){
     if(o&&Math.hypot(o.x-nx,o.y-ny)<14){blocked=true;break}
   }
 }

 if(!blocked){
   n.x=nx;n.y=ny;n.stuckFor=0;n.blockedFor=0;
   return false;
 }

 n.stuckFor=(n.stuckFor||0)+dt;
 n.blockedFor=(n.blockedFor||0)+dt;

 if(n.stuckFor>0.75){
   const goal=(n.routeGoal&&v118ValidPoint(n.routeGoal))?n.routeGoal:n.route[n.route.length-1];
   const rr=goal?findNpcPath({x:n.x,y:n.y,room:navAreaAt(n.x,n.y)},goal):[];
   if(rr&&rr.length&&v1292RouteSafe({x:n.x,y:n.y},rr)){
     n.route=rr;n.routeIndex=0;n.stuckFor=0;n.blockedFor=0;
     return false;
   }

   n.route=null;n.routeIndex=0;n.stuckFor=0;n.blockedFor=0;
   return true;
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
   if(["postLunchWait","lunchReturnDesk","lunchReturnSpecial"].includes(n.state))continue;
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
 if(typeof v130b1SetAlert==="function")v130b1SetAlert(sender,text);
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

 if(typeof v130b1RenderInventory==="function")v130b1RenderInventory();
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
   m={label:"CONSEGNA",item:"ADATTATORE USB-C / HDMI",pickup:{x:440,y:188,room:"SERVER",label:"SCAFFALI MAGAZZINO IT"},to:{x:925,y:205,room:"SALA MEET"},targetType:"meeting"};
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
 if(!workstationOnline||!managerRaceDone||introStage!=="done")return;
 if(v130b561MainActivityBusy())return;
 if(state&&state.min>=BOSS-30)return;
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

/* VERSIONE1ITSHIFT 1.0.25 — physical mission lifecycle */

const V126_TASK_ITEMS=["HDMI","EXTENDER HDMI","ALIMENTATORE","PACCO IT // CAVI","PACCO IT // PERIFERICHE","RICAMBI","CUFFIE","MONITOR","PC","ADATTATORE USB-C / HDMI","MOUSE USB","CHIAVETTA USB"];

function v126NormalizeItemName(v){
 return String(v?.label||v?.name||v||"").trim().toUpperCase();
}
function v126RemoveOwnedTaskItems(extra=[]){
 const wanted=[...V126_TASK_ITEMS,...extra].map(v=>String(v).toUpperCase());
 const matches=(v)=>{
   const name=v126NormalizeItemName(v);
   return wanted.some(w=>name===w||name.includes(w)||w.includes(name));
 };
 if(Array.isArray(inventory)){
   for(let i=inventory.length-1;i>=0;i--)if(matches(inventory[i]))inventory.splice(i,1);
 }
 if(typeof invSlots!=="undefined"&&Array.isArray(invSlots)){
   for(let i=0;i<invSlots.length;i++)if(invSlots[i]&&matches(invSlots[i]))invSlots[i]=null;
 }
 if(typeof refreshInventory==="function")refreshInventory();
 if(typeof renderInventory==="function")renderInventory();
}

function v126MissionFailed(title="MISSIONE FALLITA",reason="Tempo scaduto."){
 const c=typeof carryMission!=="undefined"?carryMission:null;
 const extra=c?[c.item,c.object,c.label].filter(Boolean):[];
 v126RemoveOwnedTaskItems(extra);
 if(typeof carryMission!=="undefined")carryMission=null;
 if(typeof studioEvent!=="undefined"&&studioEvent)studioEvent.active=false;
 if(typeof v122Say==="function")v122Say(title,reason,"Il materiale della missione è stato restituito automaticamente.");
}

function v125RemoveInventoryItem(label){
 if(!label)return;
 const name=String(label).toUpperCase();
 if(Array.isArray(inventory)){
   for(let i=inventory.length-1;i>=0;i--){
     const v=String(inventory[i]?.label||inventory[i]?.name||inventory[i]||"").toUpperCase();
     if(v.includes(name)||name.includes(v)){inventory.splice(i,1);break}
   }
 }
 if(typeof invSlots!=="undefined"&&Array.isArray(invSlots)){
   for(let i=0;i<invSlots.length;i++){
     const v=String(invSlots[i]?.label||invSlots[i]?.name||invSlots[i]||"").toUpperCase();
     if(v.includes(name)||name.includes(v)){invSlots[i]=null;break}
   }
 }
}
function v125ClearMissionItem(reason=""){
 const c=typeof carryMission!=="undefined"?carryMission:null;
 if(c){
   const item=c.item||c.object||c.label;
   if(item)v125RemoveInventoryItem(item);
 }
 if(typeof refreshInventory==="function")refreshInventory();
 if(typeof renderInventory==="function")renderInventory();
 if(reason&&typeof toast==="function")toast(reason);
}
function v125FailPhysicalMission(title="MISSIONE FALLITA"){
 v126MissionFailed(title,"Tempo scaduto.");
}

function startAmazonEvent(){
 if(state&&state.min>=BOSS-30)return false;
 v114AmazonIntroShown=false;
 if(studioEvent||introStage!=="done"||isLunch())return false;
 const helpers=eventFreeNPCs(3);
 const packages=[
  {id:"AMZ-IT-1",label:"PACCO IT // CAVI",owner:"PLAYER",x:705,y:800,to:{x:535,y:225,room:"SERVER",label:"DEPOSITO MAGAZZINO IT"},taken:false,done:false},
  {id:"AMZ-IT-2",label:"PACCO IT // PERIFERICHE",owner:"PLAYER",x:730,y:800,to:{x:535,y:225,room:"SERVER",label:"DEPOSITO MAGAZZINO IT"},taken:false,done:false},
  ...helpers.map((n,i)=>({id:"AMZ-NPC-"+i,label:"PACCO "+n.name,owner:n.id,x:755+i*22,y:800,to:{x:n.homeX,y:n.homeY,room:n.homeRoom},taken:false,done:false}))
 ];
 studioEvent={id:"amazon-"+(++eventSerial),type:"AMAZON",title:"CONSEGNA PACCHI",stage:"pickup",packages,helpers,started:state.min};
 v130a1StartDelivery(false);
 showMissionBanner("PACCHI IN INGRESSO","Zia Ale ha ricevuto una consegna. Ritira i 2 pacchi IT e depositali nel SERVER / MAGAZZINO IT.","2 PACCHI IT // +240 XP","EVENTO STUDIO");
 const amazonMsg="Sono arrivati dei pacchi. Gli altri prendono i loro: questi due sono per il Magazzino IT.";
 // 1.0.16: Amazon is a non-blocking notification. Never set storyOpen.
 phoneMessage("ZIA ALE",amazonMsg);
 helpers.forEach((n,i)=>{
   const p=packages.find(p=>p.owner===n.id);if(!p)return;
   n.eventCarry=p.id;n.state="eventPickup";n.routeGoal={x:p.x,y:p.y,room:"INGRESSO / SEGRETERIA"};
   n.route=findNpcPath({x:n.x,y:n.y},n.routeGoal);n.routeIndex=0;
 });
 showStudioEventHud("CONSEGNA PACCHI","F // PRENDI I 2 PACCHI IT IN SEGRETERIA");
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
  if(typeof v130b561MainActivityBusy==="function"&&v130b561MainActivityBusy())return false;
  if(v12c42MeetingActive() || v12c42MeetingClosed())return false;
  if(studioEvent && studioEvent.type==="MEETING_RUSH")return false;

  if(v12c42MeetingBusyUi()){
    v12c42MeetingQueued=true;
    v12c42MeetingDeferredStart=true;
    return false;
  }

  v12c42MeetingState="PICKUP";
  v12c42MeetingLateWarned=false;

  studioEvent={
    id:"meet-"+(++eventSerial),
    type:"MEETING_RUSH",
    title:"SALA MEET // EXTENDER HDMI",
    stage:"pickup",
    started:state.min,

    // B5.7.1 safe walkable points, away from furniture hitboxes.
    pickup:{x:535,y:225,room:"SERVER",label:"MAGAZZINO IT // BANCO USCITA"},
    to:{x:940,y:285,room:"SALA MEET",label:"POSTAZIONE AV SALA MEET"},

    item:"EXTENDER HDMI",
    carried:false,
    completed:false,
    failed:false,
    lateWarned:false
  };

  const startObjective=()=>{
    showMissionBanner(
      "SALA MEET // EXTENDER HDMI",
      "Vai nel SERVER / MAGAZZINO IT. Sul marker premi F per prendere l'EXTENDER HDMI.",
      "EVENTO STORIA",
      "F = PRENDI"
    );
    v12c42MeetingNotify(
      "SALA MEET",
      "SERVER / MAGAZZINO IT → marker giallo → F // PRENDI EXTENDER HDMI"
    );
  };

  if(typeof v130b43StorySay==="function"){
    v130b43StorySay("IT MANAGER",[
      "La Sala Meet non aggancia più il segnale video.",
      "Nel Magazzino IT c'è un extender HDMI pronto.",
      "Prendilo e collegalo alla postazione AV della Sala Meet."
    ],startObjective);
  }else{
    startObjective();
  }

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
 if(state&&state.min>=BOSS-30)return false;
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
 if(!workstationOnline||!managerRaceDone||introStage!=="done")return;
 if(v130b561MainActivityBusy())return;
 if(!v12c42CanGenerateWork())return;
 if(state.min>=BOSS-30)return;
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

}
function drawStudioEventObjects(){
 if(!studioEvent)return;
 if(studioEvent.type==="AMAZON"){
  for(const p of studioEvent.packages){
   if(p.done||p.taken)continue;
   g.fillStyle=p.owner==="PLAYER"?"#d8a44c":"#a87943";g.fillRect(p.x-10,p.y-8,20,16);
   g.fillStyle="#2a1a0c";g.font="bold 6px monospace";g.fillText("IT",p.x-5,p.y+2);
  }
  for(const n of studioEvent.helpers){if(n.eventCarry){g.fillStyle="#b9874d";g.fillRect(n.x-9,n.y-2,18,13)}}
 }
 if(studioEvent.type==="MEETING_RUSH"){
   const t=studioEvent.carried?studioEvent.to:studioEvent.pickup;
   if(t){
     const pulse=5+Math.sin(performance.now()/150)*2;
     g.save();
     g.strokeStyle="#f2d85c";g.lineWidth=3;
     g.strokeRect(t.x-18-pulse/2,t.y-14-pulse/2,36+pulse,28+pulse);
     g.fillStyle="#f2d85c";
     g.font="bold 9px monospace";g.textAlign="center";
     g.fillText(
       studioEvent.carried?"G // COLLEGA EXTENDER":"F // PRENDI EXTENDER",
       t.x,t.y-24
     );
     g.fillStyle="#1c2a24";
     g.fillRect(t.x-8,t.y-5,16,10);
     g.fillStyle="#d9e7cb";
     g.fillRect(t.x-5,t.y-2,10,4);
     g.restore();
   }
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
 if(n&&n.id==="manager"&&["introWait","managerArrivalWait","managerArrivalCinematic","managerArrivalReady","managerRace129"].includes(n.state))return true;

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
   coffee:{x:1110,y:830,room:"CUCINA"},
   printer:{x:1215,y:865,room:"STAMPANTI"},
   bathroom:{x:925,y:675,room:"BAGNI"},
   meeting:{x:936,y:255,room:"SALA MEET"},
   wander:home
 };
 const key=String(kind||"").toLowerCase();
 if(key==="meeting"&&typeof claimMeetingSeat==="function")return claimMeetingSeat(n,"SALA MEET");
 const t=targets[key]||home;
 return {x:t.x,y:t.y,room:t.room};
}

function v118ValidPoint(p){
 return !!(p&&Number.isFinite(p.x)&&Number.isFinite(p.y));
}

function v119SafeDistanceTo(p){
 if(!v118ValidPoint(p))return 9999;
 if(typeof player==="undefined"||!player||!Number.isFinite(player.x)||!Number.isFinite(player.y))return 9999;
 return Math.hypot(player.x-p.x,player.y-p.y);
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


/* VERSIONE1ITSHIFT 1.0.21 — SPECIAL NPC PASS */
const V121_SPECIAL_COOLDOWN=70;
const V121_SPECIAL_LAST={};

function v121CanSpecial(n){
 if(!n)return false;
 const k=n.id||n.name;
 const now=state?.min??0;
 if(V121_SPECIAL_LAST[k]!=null && now-V121_SPECIAL_LAST[k]<V121_SPECIAL_COOLDOWN)return false;
 V121_SPECIAL_LAST[k]=now;
 return true;
}

function v121SpecialCard(name,title,body,effect){
 const who=String(name||"NPC"),parts=[String(title||""),String(body||"")].filter(Boolean);
 if(effect)parts.push(String(effect));
 if(typeof v130b43StorySay==="function")v130b43StorySay(who,parts);
 else sideMessage(who,parts.join(" // "));
 return true;
}

function v121SpecialNpcInteract(n){
 if(!n)return false;
 const id=String(n.id||"").toLowerCase();
 const name=String(n.name||"").toUpperCase();

 // Pending offer always has priority and remains the cleanest interaction path.
 if(typeof consumePendingOffer==="function" && consumePendingOffer(n))return true;

 if(id==="pao"||name==="PAO"){
   if(!v121CanSpecial(n)){
     return v121SpecialCard("PAO","PAUSA TECNICA","Oh, una cosa alla volta.","");
   }
   const rel=typeof v1Rel==="function"?v1Rel(n):(n.rapporto??0);
   if(rel>=2){
     state.stress=Math.max(0,state.stress-7);
     state.xp+=35;
     const lines=[
       "Te la copro io. Però se perde la Fiorentina non rispondo di me.",
       "Vai tranquillo, questa non è una tragedia. A differenza della domenica.",
       "Respira. Il server regge più della difesa viola."
     ];
     v121SpecialCard("PAO","ALLEATO",lines[Math.floor(Math.random()*lines.length)],"STRESS -7 // XP +35");
   }else if(rel<=-2){
     state.stress=Math.min(100,state.stress+3);
     if(typeof newTicket==="function"&&Math.random()<.45)newTicket("MEDIUM");
     v121SpecialCard("PAO","BEGA","Già che sei qui, ho anche questa rogna.","STRESS +3");
   }else{
     state.stress=Math.max(0,state.stress-2);
     v121SpecialCard("PAO","DUE PAROLE","Oggi niente drammi. Per ora.","STRESS -2");
   }
   hud();return true;
 }

 if(id==="don"||name==="DON"){
   if(!v121CanSpecial(n)){
     return v121SpecialCard("DON","TRANQUILLO","Ci penso io, ma non abusarne.","");
   }
   const rel=typeof v1Rel==="function"?v1Rel(n):(n.rapporto??0);
   if(rel>=2 && state.strikes>0 && Math.random()<.28){
     state.strikes=Math.max(0,state.strikes-1);
     state.stress=Math.max(0,state.stress-8);
     state.xp+=45;
     v121SpecialCard("DON","SUPER ALLEATO","Questa te la sistemo io.","ERRORE -1 // STRESS -8 // XP +45");
   }else{
     state.stress=Math.max(0,state.stress-(rel>=2?11:6));
     state.xp+=rel>=2?40:20;
     v121SpecialCard("DON","COPERTURA","Vai, io ti copro un attimo.",rel>=2?"STRESS -11 // XP +40":"STRESS -6 // XP +20");
   }
   hud();return true;
 }

 if(id==="hr"||name==="BETTY"){
   if(!v121CanSpecial(n)){
     return v121SpecialCard("BETTY","HR","Passa più tardi, adesso sei già seguito.","");
   }
   const stress=state.stress||0;
   const cut=stress>=70?18:stress>=45?12:7;
   state.stress=Math.max(0,stress-cut);
   if(stress>=70)state.rep=Math.min(5,state.rep+1);
   state.xp+=20;
   v121SpecialCard("BETTY","SUPPORTO HR",
     stress>=70?"Ti prendi cinque minuti. Non è una richiesta, è HR.":"Vediamo di abbassare un po' la pressione.",
     `STRESS -${cut}${stress>=70?" // REPUTAZIONE +1":""} // XP +20`);
   hud();return true;
 }

 if(id==="zia"||name==="ZIA ALE"){
   if(!v121CanSpecial(n)){
     return v121SpecialCard("ZIA ALE","SEGRETERIA","Se succede qualcosa ti chiamo io.","");
   }
   const r=Math.random();
   if(r<.45){
     state.stress=Math.max(0,state.stress-6);
     state.xp+=15;
     v121SpecialCard("ZIA ALE","CAFFÈ TATTICO","Te l'ho tenuto da parte.","STRESS -6 // XP +15");
   }else if(r<.75){
     state.rep=Math.min(5,state.rep+1);
     v121SpecialCard("ZIA ALE","DRITTA","Il Capo oggi è già nervoso. Regolati.","REPUTAZIONE +1");
   }else{
     const t=[...tickets].sort((a,b)=>a.due-b.due)[0];
     if(t)t.due+=10;
     v121SpecialCard("ZIA ALE","TI COPRO IO","Dieci minuti te li faccio sparire io.","SCADENZA +10 MIN");
   }
   hud();renderTickets();return true;
 }

 if(id==="manager"||name==="IT MANAGER"){
   if(!managerRaceDone)return false;
   if(!v121CanSpecial(n)){
     sideMessage("IT MANAGER","Concentrati sui ticket.");
     return true;
   }
   const r=Math.random();
   if(r<.55){
     sideMessage("IT MANAGER","Controlla i ticket e non farmi inseguire.");
   }else{
     state.stress=Math.min(100,state.stress+2);
     if(typeof newTicket==="function"&&tickets.length<difficultyConfig[difficulty].maxTickets)newTicket("MEDIUM");
     sideMessage("IT MANAGER","Visto che sei libero, c'è anche questa.");
     hud();
   }
   return true;
 }

 return false;
}


const V122_DIALOG={queue:[],active:null,timer:null};





let dialogPause=false;
function v124PortraitCode(name){
 const n=String(name||"NPC").toUpperCase();
 if(n.includes("ZIA"))return"ZA";
 if(n.includes("BETTY"))return"HR";
 if(n==="PAO")return"PA";
 if(n==="DON")return"DO";
 if(n.includes("MANAGER"))return"IT";
 if(n.includes("CAPO"))return"CP";
 if(n.includes("TELEFONO"))return"☎";
 if(n.includes("SYSTEM"))return"SYS";
 if(n.includes("IT TASK"))return"IT";
 if(/^\d\d:\d\d$/.test(n))return"IT";
 return n.slice(0,2);
}
function v122Say(name,text,effect=""){V122_DIALOG.queue.push({name:String(name||"NPC"),parts:[String(text||""),...(effect?[String(effect)]:[])]});if(!V122_DIALOG.active)v122DialogNext()}
function v122DialogNext(){if(!V122_DIALOG.queue.length){V122_DIALOG.active=null;dialogPause=false;document.getElementById("v122Dialogue")?.classList.add("hidden");return}const d=V122_DIALOG.queue.shift();V122_DIALOG.active={...d,index:0,shown:0};dialogPause=true;document.getElementById("v122Dialogue")?.classList.remove("hidden");v130b42SetSpeakerMeta(document.getElementById("v122Dialogue"),d.name);document.getElementById("v122Speaker").textContent=d.name.toUpperCase();const p=document.getElementById("v122Portrait");if(p)p.textContent=v124PortraitCode(d.name);v122TypeCurrent()}
function v122TypeCurrent(){const d=V122_DIALOG.active;if(!d)return;clearInterval(V122_DIALOG.timer);const el=document.getElementById("v122Text"),c=document.getElementById("v122Continue"),text=d.parts[d.index]||"";d.shown=0;el.textContent="";v130b42FitDialogText(el,text);c.textContent="● ● ●";V122_DIALOG.timer=setInterval(()=>{if(!V122_DIALOG.active)return clearInterval(V122_DIALOG.timer);d.shown=Math.min(text.length,d.shown+1);el.textContent=text.slice(0,d.shown);if(d.shown>=text.length){clearInterval(V122_DIALOG.timer);c.textContent="E / ENTER  ▶"}},26)}
function v122Advance(){const d=V122_DIALOG.active;if(!d)return false;const text=d.parts[d.index]||"";if(d.shown<text.length){clearInterval(V122_DIALOG.timer);d.shown=text.length;document.getElementById("v122Text").textContent=text;document.getElementById("v122Continue").textContent="E / ENTER  ▶";return true}if(d.index<d.parts.length-1){d.index++;v122TypeCurrent();return true}clearInterval(V122_DIALOG.timer);V122_DIALOG.active=null;v122DialogNext();return true}

let V122_CALLS={hr:-999,zia:-999};
function v122SpecialCalls(){if(!state||state.phase!=="shift"||storyOpen||activeMiniGame||isLunch())return;const m=state.min||0,s=state.stress||0;if(s>=45&&m-V122_CALLS.hr>=100&&!pendingOffers.hr){V122_CALLS.hr=m;pendingOffers.hr={title:"SUPPORTO HR",stress:s>=70?-22:-14,xp:35,text:"Passa da me in HR."};v122Say("BETTY","Quando puoi passa da me in HR. Ti vedo un po' sotto pressione.","BONUS HR DISPONIBILE — nessuna nuova task.")}if(s>=30&&m-V122_CALLS.zia>=120&&!pendingOffers.zia){V122_CALLS.zia=m;pendingOffers.zia={title:"CAFFÈ TATTICO",stress:-9,xp:20,text:"Passa da me in Segreteria."};v122Say("ZIA ALE","Quando hai un attimo passa in Segreteria. Ti tengo da parte un caffè.","BONUS SEGRETERIA DISPONIBILE — nessuna nuova task.")}}

function npcTalk(n){
 if(["pao","don","hr","zia","manager"].includes(String(n?.id||"").toLowerCase())){
   if(v121SpecialNpcInteract(n))return true;
 }
 if(!n)return false;

 // 1.0.9: a promised special interaction ALWAYS wins over generic chatter.

 if(n?.id==="manager"&&managerRaceDone){
   if(!v12c451ManagerTalkAllowed(n))return false;
   v130b43StorySay("IT MANAGER","Controlla i ticket e tieni d'occhio il server.");
   return true;
 }
 if(!v12c451ManagerTalkAllowed(n))return false;





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
 ...[[378,385],[443,385],[508,385],[573,385],[638,385],[703,385],[378,505],[443,505],[508,505],[573,505],[638,505],[703,505]].map((p,i)=>({id:"C"+String(i+1).padStart(2,"0"),room:"CENTRALE",type:"HP Z",x:p[0],y:p[1]})),
 // Reparti operativi: massimo 4 postazioni; qui 3 per lasciare spazio agli NPC.
 ...[[95,365],[174,365]].map((p,i)=>({id:"E"+String(i+1).padStart(2,"0"),room:"EDITORIA",type:"MAC",x:p[0],y:p[1]})),
 ...[[1100,150],[1170,150],[1100,235],[1170,235]].map((p,i)=>({id:"I"+String(i+1).padStart(2,"0"),room:"INTERIOR",type:"MAC",x:p[0],y:p[1]})),
 ...[[96,585],[176,585],[96,650]].map((p,i)=>({id:"B"+String(i+1).padStart(2,"0"),room:"BIM",type:"HP Z",x:p[0],y:p[1]})),
 ...[[1303,150],[1387,150],[1303,235],[1387,235]].map((p,i)=>({id:"R"+String(i+1).padStart(2,"0"),room:"RENDERISTI",type:"HP Z",x:p[0],y:p[1]})),
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
 if(typeof v130b1SetAlert==="function")v130b1SetAlert(kicker||"MISSIONE",`${title} // ${text}`);
 const b=$("#missionBanner");if(!b)return;
 b.dataset.kind=String(kicker||"MISSIONE").toUpperCase();

 $("#missionKicker").textContent=kicker||"MISSIONE";
 $("#missionTitle").textContent=String(title||"EVENTO");
 $("#missionText").textContent=String(text||"");
 $("#missionReward").textContent=String(reward||"");

 b.classList.remove("hidden","out");
 clearTimeout(b._t);clearTimeout(b._hideT);
 b._t=setTimeout(()=>b.classList.add("out"),4400);
 b._hideT=setTimeout(()=>{
   b.classList.add("hidden");
   b.classList.remove("out");
 },5000);
}
function showStudioEventHud(title,text){
 if(typeof v130b1SetAlert==="function")v130b1SetAlert(title,text);
 const h=$("#studioEventHud");
 if(h)h.classList.add("hidden");
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
 v130b42SetSpeakerMeta(b,who);
 v130b42FitDialogText($("#storyText"),text);
 const portrait=$("#storyPortrait");
 if(portrait)portrait.textContent=v124PortraitCode(who);
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
 const power=document.getElementById("powerPC"),login=document.getElementById("loginPC"),screen=document.getElementById("bootPC");
 power.onclick=()=>{
   if(powered)return;
   powered=true;power.disabled=true;
   screen.innerHTML="BIOS...<br>NETWORK...<br>WINDOWS READY";
   setTimeout(()=>{if(login)login.disabled=false},650);
 };
 login.onclick=()=>{
   if(!powered)return;
   modal.classList.add("hidden");
   v110FirstMissionResolved=true;
   firstMissionResolved=true;
   workstationOnline=true;
   introStage="raceWaiting";
   storyOpen=false;uiMessageBusy=false;activeMiniGame=null;
   v129MarkPlayerFinish();
   if(V129_RACE.active&& !V129_RACE.managerFinished && typeof toast==="function"){
     toast("LOGIN COMPLETATO // ATTENDO ARRIVO MANAGER");
   }
   updateTaskProgress();hud();
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
   {x:650,y:900,room:"CORRIDOIO"},
   {x:690,y:840,room:"INGRESSO / SEGRETERIA"},
   {x:690,y:760,room:"CORRIDOIO"},
   {x:520,y:730,room:"CORRIDOIO"},
   {x:365,y:730,room:"CORRIDOIO"},
   {x:285,y:790,room:"CORRIDOIO"},
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
   const target=Math.random()<.62?{x:755,y:210,room:"SERVER"}:{x:185,y:842,room:"IT"};
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

 setHome(pao,176,696,"BIM","work");
 setHome(don,1045,880,"CUCINA","work");
 setHome(betty,150,165,"HR","idle");
 setHome(zia,565,825,"INGRESSO / SEGRETERIA","idle");
 setHome(manager,185,842,"IT","desk");

 if(pao)pao._spT=3+Math.random()*4;
 if(don)don._spT=4+Math.random()*5;
}
function v12c462EndLunch(){
 if(!v12c462LunchActive)return;
 v12c462LunchActive=false;
 lunchMode=false;

 for(const n of v12c462LunchParticipants()){
   if(!n)continue;
   n.route=null;n.routeIndex=0;n.stuckFor=0;n.blockedFor=0;
   n.ignoreNpcCollision=false;
   if(!["lunchReturnDesk","lunchReturnSpecial"].includes(n.state))n.state="postLunchWait";
 }

 for(const id of ["pao","don"]){
   const s=v106SpecialNpcById(id);
   if(s){
     s.route=null;s.routeIndex=0;s.stuckFor=0;s.blockedFor=0;
     s.ignoreNpcCollision=false;
     if(!["lunchReturnDesk","lunchReturnSpecial"].includes(s.state))s.state="postLunchWait";
   }
 }
 v114PostLunchReset();
}

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

 // Deliberate narrative pauses: not every radio message becomes a cutscene.
 const storyKeys=new Set(["1015","1415","1645","1800"]);
 if(storyKeys.has(String(key))&&typeof v130b43StorySay==="function"){
   v130b43StorySay(sender,text);
 }else{
   phoneMessage(sender,text);
 }
}

let v12cStoryMission=0;

/* ============================================================
   1.0.30B5.6.1 — MAIN ACTIVITY PACING
   One important activity at a time.
   ============================================================ */
const V130B561_PACING={
 blockUntil:0,
 graceMs:5000
};

function v130b561ModalBusy(){
 const modal=document.getElementById("modal");
 return !!(modal&&!modal.classList.contains("hidden"));
}

function v130b561MainActivityBusy(){
 if(!state||state.phase!=="shift")return true;
 if(activeMiniGame)return true;
 if(carryMission)return true;
 if(studioEvent)return true;
 if(storyOpen||dialogPause)return true;
 if(v130b561ModalBusy())return true;
 if(performance.now()<V130B561_PACING.blockUntil)return true;
 return false;
}

function v130b561GiveBreath(ms=V130B561_PACING.graceMs){
 V130B561_PACING.blockUntil=Math.max(
   V130B561_PACING.blockUntil,
   performance.now()+Math.max(0,ms||0)
 );
}

function v130b561CanStartMainActivity(){
 return !v130b561MainActivityBusy() &&
   workstationOnline &&
   managerRaceDone &&
   introStage==="done" &&
   !isLunch() &&
   state.min<BOSS-30;
}

function v12cStoryProgression(){
 if(!state||introStage!=="done"||storyOpen||isLunch())return;
 if(v130b561MainActivityBusy())return;

 if(v12cStoryMission<1&&state.min>=600&&!studioEvent){
   if(startMeetingRushEvent())v12cStoryMission=1;
   return;
 }

 if(v12cStoryMission<2&&state.min>=690&&!studioEvent){
   if(startAmazonEvent()){
     v12cStoryMission=2;
     showMissionBanner(
       "MISSIONE 3 // CONSEGNA",
       "Zia Ale ha ricevuto dei pacchi. Quelli IT sono tuoi.",
       "EVENTO STORIA",
       "STORIA"
     );
   }
   return;
 }

 if(v12cStoryMission<3&&state.min>=900&&!studioEvent){
   if(startDeskSetupEvent()){
     v12cStoryMission=3;
     showMissionBanner(
       "MISSIONE 4 // POMERIGGIO",
       "Cambio postazione urgente: serve un monitor.",
       "EVENTO STORIA",
       "STORIA"
     );
   }
 }
}

function updateNarrative(){
 if(!v12c42CanGenerateWork())return;
 if(!state||!shiftStarted)return;
 if(state.min>=615)narrativeOnce("1015","ZIA ALE","La Sala Meet tra poco è occupata. Se passa qualcuno di corsa, sai già perché.");
 if(state.min>=705)narrativeOnce("1145","IT MANAGER","Occhio ai ticket della direzione: se arrivano, hanno priorità.");
 if(state.min>=765)narrativeOnce("1245","DON","Io tra poco vado a pranzo. Se vuoi staccare cinque minuti, questo è il momento.");
 if(state.min>=855)narrativeOnce("1415","ZIA ALE","Bentornato. Il pomeriggio di solito è peggio della mattina.");
 if(state.min>=1005)narrativeOnce("1645","IT MANAGER","Da ora in poi preparati ai classici: prima di andare via avrei una cosina...");
 if(state.min>=1080)narrativeOnce("1800","CAPO","Prima di andare via devo fare una presentazione. Tieniti libero per la Sala Meet.");
}
function computeCamera(){
 if(debug||fullMap)return {x:0,y:0,zoom:1};

 const z=camera.zoom;
 let logicalSidebar=0;

 // Reserve the real right UI rail when centering the player.
 const side=document.getElementById("v130b1SideHud");
 if(side&&C){
   const cr=C.getBoundingClientRect(),sr=side.getBoundingClientRect();
   if(cr.width>0){
     const logicalPerCss=W/cr.width;
     logicalSidebar=Math.max(0,(sr.width+8)*logicalPerCss);
   }
 }

 const playableScreenW=Math.max(520,W-logicalSidebar);
 const vw=playableScreenW/z;
 const vh=H/z;
 const maxX=Math.max(0,W-vw),maxY=Math.max(0,H-vh);

 // B5.4: fixed cinematic shot. The camera no longer follows the Manager.
 // A wider zoom keeps both the sidewalk and studio entrance visible at once.
 if(typeof V129_INTRO!=="undefined"&&V129_INTRO.phase==="managerArrival"){
   const cinematicZoom=1.18;
   const cineVw=playableScreenW/cinematicZoom;
   const cineVh=H/cinematicZoom;
   const cineMaxX=Math.max(0,W-cineVw);
   const cineMaxY=Math.max(0,H-cineVh);

   // Fixed composition: Manager appears on the right sidewalk and walks
   // left toward the central entrance, then upward into reception.
   const focusX=820;
   const focusY=900;
   camera.x=Math.max(0,Math.min(cineMaxX,focusX-cineVw/2));
   camera.y=Math.max(0,Math.min(cineMaxY,focusY-cineVh/2));
   return {x:camera.x,y:camera.y,zoom:cinematicZoom};
 }

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

let pdaTab="HOME";
function refreshPDA(){
 const p=document.getElementById("pdaBody");if(!p||!state)return;const clock=document.getElementById("v130b4TabletClock");if(clock)clock.textContent=`${fmt(state.min)} // ONLINE`;
 const app=(tab,label,code)=>`<button class="v130b4-app" data-tab="${tab}"><span class="v130b4-folder"><i>${code}</i></span><span>${label}</span></button>`;
 if(pdaTab==="HOME")p.innerHTML=`<div class="v130b4-desktop">${app("TASK","TASK","!")}${app("MAPPA","MAPPA","M")}${app("INVENTARIO","INVENTARIO","□")}${app("PERSONE","PERSONE","☺")}${app("LOG","LOG","≡")}${app("SISTEMA","SISTEMA","⚙")}</div>`;
 else{
  let content="";
  if(pdaTab==="TASK"){const rows=v130b4TaskRows();content=`<div class="v130b4-list">${rows.length?rows.map(r=>`<div class="v130b4-row"><div class="ico">${r.kind==="PHYSICAL"?"F":r.critical?"!":"?"}</div><div><b>${v130b4Esc(r.title)}</b><span>${v130b4Esc(r.text)}</span></div><em>${v130b4Esc(r.meta)}</em></div>`).join(""):`<div class="v130b4-row"><div class="ico">✓</div><div><b>NESSUNA ATTIVITÀ</b><span>Turno sotto controllo.</span></div><em>OK</em></div>`}</div>`}
  else if(pdaTab==="MAPPA")content=`<canvas id="v130b4TabletMap" class="v130b4-mapcanvas" width="720" height="430"></canvas><div class="v130b4-row" style="margin-top:10px"><div class="ico">●</div><div><b>LEGENDA</b><span>Verde = tu · Giallo = task · Rosso = urgente</span></div><em>M</em></div>`;
  else if(pdaTab==="INVENTARIO"){const inv=Array.isArray(inventory)?inventory:[];content=`<div class="v130b4-invgrid">${[0,1,2,3,4,5,6,7].map(i=>{const it=inv[i]||"";return `<div class="v130b4-invitem"><div class="pix">${it?v130b4ItemIcon(it):"—"}</div>${it?v130b4Esc(it):"VUOTO"}</div>`}).join("")}</div>`}
  else if(pdaTab==="PERSONE"){const people=[...new Map([...(ambientNPCs||[]),...(npcs||[]),mokasa].filter(Boolean).filter(n=>n.id).map(n=>[n.id,n])).values()];content=`<div class="v130b4-list">${people.slice(0,18).map(n=>{const v=ensureRelation(n),tier=v>=4?"FIDUCIA":v>=2?"SIMPATIA":v<=-4?"OSTILE":v<=-2?"FREDDO":"NEUTRALE";return `<div class="v130b4-row"><div class="ico">${v124PortraitCode(n.name)}</div><div><b>${v130b4Esc(n.name)}</b><span>${v130b4Esc(n.role||n.homeRoom||"STUDIO")}</span></div><em>${tier}</em></div>`}).join("")}</div>`}
  else if(pdaTab==="LOG")content=`<div class="v130b4-log">${V130B4_LOG.length?V130B4_LOG.map(l=>`<div><b>${v130b4Esc(l.time)} // ${v130b4Esc(l.sender)}</b><br>${v130b4Esc(l.text)}</div>`).join(""):"<div><b>LOG</b><br>Nessun messaggio registrato.</div>"}</div>`;
  else content=`<div class="v130b4-systemgrid"><div class="v130b4-sys">STRESS<b>${Math.round(state.stress)}%</b></div><div class="v130b4-sys">ERRORI<b>${state.strikes}/${state.maxStrikes}</b></div><div class="v130b4-sys">INCIDENT<b>${Math.round(state.incident)}%</b></div><div class="v130b4-sys">XP<b>${state.xp}</b></div><div class="v130b4-sys">REPUTAZIONE<b>${"★".repeat(Math.max(0,Math.round(state.rep)))}</b></div><div class="v130b4-sys">CAMERA<b>${camera?.zoom?.toFixed?.(2)||"1.82"}x</b></div></div>`;
  p.innerHTML=`<section class="v130b4-window"><div class="v130b4-winhead"><span>${pdaTab}</span><button class="v130b4-back" data-tab="HOME">◀ DESKTOP</button></div><div class="v130b4-content">${content}</div></section>`;
 }
 p.querySelectorAll("[data-tab]").forEach(b=>b.onclick=()=>{pdaTab=b.dataset.tab;refreshPDA()});if(pdaTab==="MAPPA")requestAnimationFrame(v130b4DrawTabletMap);
}
function togglePDA(force){const p=document.getElementById("pda");if(!p)return;const open=force===undefined?p.classList.contains("hidden"):force;if(open)pdaTab="HOME";refreshPDA();p.classList.toggle("hidden",!open)}

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


/* ============================================================
   VERSIONE1ITSHIFT 1.0.29 — CLEAN INTRO + DETERMINISTIC RACE
   One coordinate system. No visual map stretching.
   Intro does not depend on E/ENTER except the doorbell itself.
   ============================================================ */
const V129_INTRO={
 phase:"idle",
 timer:0,
 locked:false,
 doorOpen:false,
 crossed:false,
 storyLaunched:false,
 managerArrivalDone:false,
 autoEntryDone:false
};

const V129_RACE={
 active:false,
 managerFinished:false,
 playerFinished:false,
 startAt:0,
 managerFinishAt:0,
 playerFinishAt:0,
 routeIndex:0,
 route:[
   {x:585,y:760},
   {x:500,y:730},
   {x:395,y:730},
   {x:300,y:760},
   {x:255,y:800},
   {x:225,y:820},
   {x:185,y:842}
 ]
};

function v129ClearMovement(){
 keys={};
 if(typeof virtualKeys!=="undefined"){
   virtualKeys.up=false;virtualKeys.down=false;virtualKeys.left=false;virtualKeys.right=false;
 }
}

function v129Lock(v){
 V129_INTRO.locked=!!v;
 if(v)v129ClearMovement();
}

function v129IntroSet(phase,duration=0,locked=true){
 V129_INTRO.phase=phase;
 V129_INTRO.timer=Math.max(0,duration||0);
 V129_INTRO.storyLaunched=false;
 v129Lock(locked);
}

function v129ResetIntro(){
 V129_INTRO.phase="heroStory";
 V129_INTRO.timer=0;
 V129_INTRO.storyLaunched=false;
 V129_INTRO.managerArrivalDone=false;
 V129_INTRO.autoEntryDone=false;
 V129_INTRO.locked=true;
 V129_INTRO.doorOpen=false;
 V129_INTRO.crossed=false;

 V129_RACE.active=false;
 V129_RACE.managerFinished=false;
 V129_RACE.playerFinished=false;
 V129_RACE.startAt=0;
 V129_RACE.managerDelayUntil=0;
 V129_RACE.managerFinishAt=0;
 V129_RACE.playerFinishAt=0;
 V129_RACE.routeIndex=0;

 introStage="outside";
 introFreeWalk=false;
 entranceOpened=false;
 enteredStudio=false;
 shiftStarted=false;
 managerRaceDone=false;
 raceState="idle";
 workstationOnline=false;
 firstMissionResolved=false;
 if(typeof v110FirstMissionResolved!=="undefined")v110FirstMissionResolved=false;
 v12cDoorbellRung=false;
 v12cDoorOpened=false;

 const m=npcs.find(n=>n&&n.id==="manager");
 if(m){
   m.x=985;m.y=985;
   m.route=null;m.routeIndex=0;m.state="introWait";
   m.stuckFor=0;m.blockedFor=0;
 }

 v129ClearMovement();
}

function v129OpenDoor(){
 if(V129_INTRO.phase!=="doorReady"||V129_INTRO.doorOpen)return false;
 V129_INTRO.doorOpen=true;
 v12cDoorbellRung=true;
 v12cDoorOpened=true;
 entranceOpened=true;
 v129IntroSet("opening",1.25,true);
 return true;
}

function v129PastThreshold(){
 if(!V129_INTRO.doorOpen||!player)return false;
 const d=STUDIO_ENTRANCE;
 return player.x>d.x-50 && player.x<d.x+d.w+50 && player.y<925;
}

function v129BeginInsideCinematic(){
 if(V129_INTRO.crossed)return;
 V129_INTRO.crossed=true;
 enteredStudio=true;
 introFreeWalk=false;
 introStage="cinematic";

 const m=npcs.find(n=>n&&n.id==="manager");
 if(m){
   // He is still outside, to the right of the player's camera.
   m.x=1080;m.y=985;
   m.route=null;m.routeIndex=0;
   m.routeGoal=null;
   m.state="managerArrivalWait";
   m.speed=70;
   m.ignoreNpcCollision=true;
 }

 v129IntroSet("ziaStory",0,true);
}



function v130b53StartAutoEntry(){
 V129_INTRO.doorOpen=true;
 v12cDoorbellRung=true;
 v12cDoorOpened=true;
 entranceOpened=true;
 introFreeWalk=true;
 introStage="autoEntry";
 V129_INTRO.autoEntryDone=false;
 if(player){player.x=705;player.y=985}
}

function v130b53UpdateAutoEntry(dt){
 if(!player)return true;
 const targets=[
   {x:705,y:955},
   {x:705,y:920},
   {x:705,y:895}
 ];
 const idx=Number.isFinite(V129_INTRO.autoEntryIndex)?V129_INTRO.autoEntryIndex:0;
 const target=targets[Math.min(idx,targets.length-1)];
 const dx=target.x-player.x,dy=target.y-player.y;
 const dist=Math.hypot(dx,dy);
 const step=128*Math.min(.05,Math.max(0,dt||0));

 if(dist<=Math.max(3,step)){
   player.x=target.x;player.y=target.y;
   V129_INTRO.autoEntryIndex=idx+1;
   if(V129_INTRO.autoEntryIndex>=targets.length){
     enteredStudio=true;
     introFreeWalk=false;
     introStage="cinematic";
     V129_INTRO.autoEntryDone=true;
     return true;
   }
   return false;
 }

 const nx=player.x+(dx/dist)*step,ny=player.y+(dy/dist)*step;
 // Door is already open; use the normal collision rules for the cinematic walk.
 if(playerCanMove(player.x,player.y,nx,ny)){
   player.x=nx;player.y=ny;
 }else{
   // deterministic fallback avoids an intro softlock if map geometry changes.
   player.x=target.x;player.y=target.y;
 }
 return false;
}

function v130b52StartManagerArrival(){
 const m=npcs.find(n=>n&&n.id==="manager");if(!m)return false;

 // B5.4: he starts INSIDE the dedicated cinematic frame.
 // This route gives the player a readable sidewalk -> door -> reception movement.
 const route=[
   {x:930,y:985},
   {x:865,y:985},
   {x:800,y:985},
   {x:750,y:985},
   {x:720,y:972},
   {x:705,y:948},
   {x:705,y:922},
   {x:705,y:895}
 ];

 m.x=985;m.y=985;
 m.route=route;
 m.routeIndex=0;
 m.routeGoal={x:705,y:895,room:navAreaAt(705,895)};
 m.state="managerArrivalCinematic";
 m.speed=132;
 m.raceSpeed=132;
 m.ignoreNpcCollision=true;
 m.stuckFor=0;m.blockedFor=0;
 V129_INTRO.managerArrivalDone=false;
 return true;
}

function v130b52UpdateManagerArrival(dt){
 const m=npcs.find(n=>n&&n.id==="manager");
 if(!m)return true;
 if(V129_INTRO.managerArrivalDone)return true;

 const done=moveNpcRoute(m,Math.min(.05,Math.max(0,dt||0)));
 if(done){
   m.x=705;m.y=895;
   m.route=null;m.routeIndex=0;
   m.routeGoal=null;
   m.state="managerArrivalReady";
   m.ignoreNpcCollision=false;
   V129_INTRO.managerArrivalDone=true;
   return true;
 }
 return false;
}

/* 1.0.30B5.6.2 RACE TUNING
   Player speed: ~205
   Manager race speed: 168
   Manager start reaction delay: 280 ms
   Target: visibly competitive but still beatable with a clean route.
*/
function v129StartRace(){
 v130b42HideAutoDialogue();
 if(V129_RACE.active)return;

 const m=npcs.find(n=>n&&n.id==="manager");
 // B5.2: the race continues from the position reached in the visible entrance cinematic.
 const start={
   x:Number.isFinite(m?.x)?m.x:705,
   y:Number.isFinite(m?.y)?m.y:895,
   room:navAreaAt(Number.isFinite(m?.x)?m.x:705,Number.isFinite(m?.y)?m.y:895)
 };
 const finish={x:185,y:842,room:"IT"};
 let route=findNpcPath(start,finish);

 if(!route||!route.length||!v1292RouteSafe(start,route)){
   console.error("1.0.30B1.3 // RACE ROUTE ERROR",route);
   if(typeof toast==="function")toast("RACE ROUTE ERROR // F4 PER AUDIT");
   v129Lock(false);
   return;
 }

 V129_RACE.route=[start,...route];
 V129_RACE.active=true;
 V129_RACE.managerFinished=false;
 V129_RACE.playerFinished=false;
 V129_RACE.startAt=performance.now();
 V129_RACE.managerDelayUntil=performance.now()+280;
 V129_RACE.managerFinishAt=0;
 V129_RACE.playerFinishAt=0;
 V129_RACE.routeIndex=0;

 shiftStarted=true;
 state.min=Math.max(state.min,540);
 introStage="reachPC";raceState="running";managerRaceDone=false;
 workstationOnline=false;firstMissionResolved=false;
 if(typeof v110FirstMissionResolved!=="undefined")v110FirstMissionResolved=false;

 if(m){
   m.x=start.x;m.y=start.y;
   m.route=route;
   m.routeIndex=0;
   m.routeGoal={...finish};
   m.state="managerRace129";
   m.speed=168;
   m.raceSpeed=168;
   m.ignoreNpcCollision=true;
   m.stuckFor=0;m.blockedFor=0;
 }

 v129IntroSet("race",0,false);
 if(typeof sideMessage==="function")sideMessage("IT TASK","VIA! Raggiungi REPARTO IT, accendi la workstation e completa il LOGIN.");
 else if(typeof toast==="function")toast("VIA! // RAGGIUNGI REPARTO IT");
}

function v129MoveManager(dt){
 const m=npcs.find(n=>n&&n.id==="manager");
 if(!m||V129_RACE.managerFinished)return;
 if(Number.isFinite(V129_RACE.managerDelayUntil)&&performance.now()<V129_RACE.managerDelayUntil)return;

 if(!Array.isArray(m.route)||!m.route.length){
   V129_RACE.managerFinished=true;
   V129_RACE.managerFinishAt=performance.now();
   m.x=185;m.y=842;m.state="raceDesk";m.ignoreNpcCollision=false;
   v129TryResolveRace();
   return;
 }

 const done=moveNpcRoute(m,dt);
 if(done){
   V129_RACE.managerFinished=true;
   V129_RACE.managerFinishAt=performance.now();
   m.x=185;m.y=842;m.route=null;m.routeIndex=0;
   m.state="raceDesk";m.ignoreNpcCollision=false;
   v129TryResolveRace();
 }
}

function v129RaceUpdate(dt){
 if(!V129_RACE.active||managerRaceDone)return;
 v129MoveManager(dt);
}

function v129MarkPlayerFinish(){
 if(!V129_RACE.active||V129_RACE.playerFinished)return;
 V129_RACE.playerFinished=true;
 V129_RACE.playerFinishAt=performance.now();
 v129TryResolveRace();
}

function v129TryResolveRace(){
 if(!V129_RACE.active)return;
 if(!(V129_RACE.playerFinished&&V129_RACE.managerFinished))return;

 V129_RACE.active=false;
 managerRaceDone=true;
 introStage="done";

 const pt=(V129_RACE.playerFinishAt-V129_RACE.startAt)/1000;
 const mt=(V129_RACE.managerFinishAt-V129_RACE.startAt)/1000;
 const win=pt<mt;

 if(win){
   raceState="won";
   state.xp+=100;
   state.rep=Math.min(5,state.rep+1);
 }else{
   raceState="lost";
   state.stress=Math.min(100,state.stress+4);
 }

 const m=npcs.find(n=>n&&n.id==="manager");
 if(m){m.x=185;m.y=842;m.state="desk";m.route=null;m.routeIndex=0;m.ignoreNpcCollision=false}

 if(typeof v122Say==="function"){
   v122Say("RISULTATO CORSA",
     `TU ${pt.toFixed(1)}s // IT MANAGER ${mt.toFixed(1)}s`,
     win?"HAI VINTO // XP +100 // REPUTAZIONE +1":"IL MANAGER È ARRIVATO PRIMA // STRESS +4");
 }
 if(!tickets.length)newTicket("LOW");
 hud();updateTaskProgress();
}

function v129IntroUpdate(dt){
 if(!state||state.phase!=="shift")return;
 const t=Math.min(Math.max(Number.isFinite(dt)?dt:0,0),0.1);

 if(V129_INTRO.phase==="heroStory"){
   if(!V129_INTRO.storyLaunched){
     V129_INTRO.storyLaunched=true;
     const who=typeof v130b2PlayerName==="function"?v130b2PlayerName():"IT";
     v130b43StorySay(who,[
       "Ho ancora due minuti prima di entrare.",
       "Entro, faccio login, prendo un caffè. In quest'ordine. Se nessuno rompe niente."
     ],()=>{
       V129_INTRO.autoEntryIndex=0;
       v130b53StartAutoEntry();
       v129IntroSet("autoEntry",0,true);
     });
   }
   return;
 }

 // The protagonist enters automatically: no movement keys required yet.
 if(V129_INTRO.phase==="autoEntry"){
   if(v130b53UpdateAutoEntry(t)){
     v129IntroSet("ziaStory",0,true);
   }
   return;
 }

 if(V129_INTRO.phase==="ziaStory"){
   if(!V129_INTRO.storyLaunched){
     V129_INTRO.storyLaunched=true;
     const name=typeof v130b2PlayerName==="function"?v130b2PlayerName():"IT";
     v130b43StorySay("ZIA ALE",[
       `${name}! Guarda chi sta arrivando...`,
       "L'IT Manager. E stamattina mi sembra pure di fretta.",
       "Appena entra, prova ad arrivare nel Reparto IT prima di lui.",
       "Al VIA muoviti con W A S D oppure con le FRECCE.",
       "Alla tua postazione premi E, accendila e fai il LOGIN.",
       "Preparati... eccolo."
     ],()=>{
       v130b52StartManagerArrival();
       v129IntroSet("managerArrival",0,true);
     });
   }
   return;
 }

 // Camera follows this beat separately; controls stay locked.
 if(V129_INTRO.phase==="managerArrival"){
   v130b42HideAutoDialogue();
   if(v130b52UpdateManagerArrival(t)){
     v129IntroSet("count3",1.0,true);
   }
   return;
 }

 if(V129_INTRO.phase==="race")return;

 if(V129_INTRO.timer>0){
   V129_INTRO.timer=Math.max(0,V129_INTRO.timer-t);
   if(V129_INTRO.timer>0)return;
 }

 switch(V129_INTRO.phase){
   case "count3":v129IntroSet("count2",1.0,true);break;
   case "count2":v129IntroSet("count1",1.0,true);break;
   case "count1":v129IntroSet("via",0.65,true);break;
   case "via":v129StartRace();break;
 }
}

function v129IntroTitleText(){
 switch(V129_INTRO.phase){
   case "count3":return ["","3"];
   case "count2":return ["","2"];
   case "count1":return ["","1"];
   case "via":return ["","VIA!"];
   default:return null;
 }
}

function v129DrawIntroOverlay(){
 const tx=v129IntroTitleText();

 if(!tx){
   v130b42HideAutoDialogue();
   return;
 }

 // Countdown is the only intro element intentionally full-screen.
 if(["count3","count2","count1","via"].includes(V129_INTRO.phase)){
   v130b42HideAutoDialogue();

   g.save();
   g.setTransform(1,0,0,1,0,0);
   const cw=C.width,ch=C.height;

   g.fillStyle="rgba(0,0,0,.58)";
   g.fillRect(0,0,cw,ch);

   g.textAlign="center";
   g.textBaseline="middle";
   g.font="bold 104px monospace";
   g.fillStyle=V129_INTRO.phase==="via"?"#9cff57":"#edf4df";
   g.fillText(tx[1],cw/2,ch/2);

   g.font="bold 17px monospace";
   g.fillStyle="#edf4df";
   g.fillText("ZIA ALE // PREPARATI",cw/2,ch/2+85);

   g.restore();
   return;
 }

 // Every normal intro balloon now uses the exact same DOM shell
 // as storyDialog and v122Dialogue. No canvas scaling, no left clipping.
 v130b42ShowAutoDialogue(tx);
}

function reset(){
 if(typeof V130B43_STORY!=="undefined"){
   clearInterval(V130B43_STORY.timer);
   V130B43_STORY.active=false;
   document.getElementById("v130b43StoryScene")?.classList.add("hidden");
 }

 v130b42HideAutoDialogue();
 V1294_LUNCH_QUEUE.length=0;V1294_LUNCH_CLOCK=0;
 V1293_LUNCH_WAS_ACTIVE=false;V1293_LUNCH_RECOVERY_DONE=false;
 V123_TUTORIAL.movement=false;V123_TUTORIAL.tasks=false;V123_TUTORIAL.physical=false;
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
const bad=validateMap();if(bad.length)console.warn("Unreachable task points disabled:",bad);state={phase:"shift",min:538,stress:0,rep:5,xp:0,incident:0,strikes:0,maxStrikes:difficultyConfig[difficulty].maxStrikes,solved:0,anomalyPenalty:0,bossPhase:0};player={x:705,y:985,s:205,name:(typeof v130b2PlayerName==="function"?v130b2PlayerName():"IT"),gender:(typeof V130B2_PROFILE!=="undefined"?V130B2_PROFILE.gender:"male")};tickets=[];last=performance.now();spawnTimer=0;anomTimer=0;phoneQueue=[];visualAnomaly=null;inventory=[];carryMission=null;studioEvent=null;studioEventNext=610;eventSerial=0;pendingOffers={};firstCarryTriggered=true;encounterLock=false;dayFlags={};V130B5_DECK.BIM=[];V130B5_DECK.CENTRALE=[];lunchMode=false;fullMap=false;introStage="outside";introFreeWalk=false;entranceOpened=false;enteredStudio=false;shiftStarted=false;managerRaceDone=false;managerPenaltyDone=false;raceState="idle";workstationOnline=false;firstMissionResolved=false;spawnNPCs();v12c4InitRelations();runV10Audit();runV8Audit();const m=npcs.find(n=>n.id==="manager");if(m){m.x=650;m.y=900;m.state="outside";m.route=null;m.routeIndex=0}updateInventoryUI();updateTaskProgress();setupCompactHUD();setupMiniMapControls();hud();v129ResetIntro();
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

/* 1.0.30B5.7 — MAP SOLID */
const V130B57_STUDIO_PERIMETER={left:22,right:1592,top:28,bottom:927};
function v130b57PlayerInsideStudioBounds(x,y){
 return Number.isFinite(x)&&Number.isFinite(y) &&
   x>=V130B57_STUDIO_PERIMETER.left && x<=V130B57_STUDIO_PERIMETER.right &&
   y>=V130B57_STUDIO_PERIMETER.top && y<=V130B57_STUDIO_PERIMETER.bottom;
}

function playerCanMove(ox,oy,nx,ny){
 // Once inside, facade/sidewalk/road are no longer player walk-space.
 if(enteredStudio && !v130b57PlayerInsideStudioBounds(nx,ny))return false;
 if(typeof V129_INTRO!=="undefined"&&!V129_INTRO.doorOpen&&typeof STUDIO_ENTRANCE!=="undefined"){
   const d=STUDIO_ENTRANCE;
   if(nx>d.x+4&&nx<d.x+d.w-4&&ny>918&&ny<952)return false;
 }
 return v1292SegmentAllowed(ox,oy,nx,ny);
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
 v130b561GiveBreath();
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
 activeMiniGame=null;$("#modal").classList.add("hidden");v130b561GiveBreath();renderTickets();hud();checkEarlyEnd();
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

 if(type==="DEPT_CASE"){
  v130b5RenderDeptCase(i);
 }

 else if(type==="TONER"){
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
 if(!workstationOnline||!managerRaceDone||introStage!=="done")return;
 if(state?.phase!=="shift"||tickets.length>=Math.min(2,difficultyConfig[difficulty].maxTickets))return;if(isLunch()&&!opts.anomaly)return;
 let level=force||levelForTime(),p;
 let valid=stations.filter(s=>walkable(s.x,s.y)||reachablePoints().some(p=>Math.hypot(p.x-s.x,p.y-s.y)<95));
 if(!valid.length)valid=reachablePoints();
 const weighted=[...valid,...valid.filter(s=>s.room==="CENTRALE"),...valid.filter(s=>s.room==="CENTRALE")];
 if(level==="CRITICAL")p=[...valid].sort((a,b)=>Math.hypot(player.x-b.x,player.y-b.y)-Math.hypot(player.x-a.x,player.y-a.y))[0];
 else p=weighted[Math.floor(Math.random()*weighted.length)];
 if(!p){console.warn("Ticket ignorato: nessuna postazione valida");return}
 let mins={LOW:110,MEDIUM:90,HIGH:70,CRITICAL:42}[level]*difficultyConfig[difficulty].timeMult;
 const useMini=true;
 const ticket={id:crypto.randomUUID?crypto.randomUUID():Math.random()+"",level,p,due:Math.min(BOSS-.2,state.min+mins),q:null,taskType:taskTypeForStation(p),criticalFrom:level==="CRITICAL"?bosses[Math.floor(Math.random()*bosses.length)]:null,source:opts.source||"USER",expired:false};
 v130b5AssignCase(ticket);
 tickets.push(ticket);
 state.stress+=({LOW:1,MEDIUM:2,HIGH:4,CRITICAL:7}[level]||1)*difficultyConfig[difficulty].stressMult;renderTickets();
}
function renderTickets(){
 const tc=$("#ticketCount");if(tc)tc.textContent=tickets.length;

 $("#ticketText").innerHTML=tickets.length?tickets.map(t=>`<div class="ticket ${t.level.toLowerCase()}"><b>${t.level}${t.source==="IT MANAGER"?" // MANAGER":t.criticalFrom?" // "+t.criticalFrom:""}</b><br>${safeRoom(t.p,"SEGNALAZIONE")} — ${t.caseTitle||((t.p&&(t.p.id||t.p.kind||t.p.type))||"POSTAZIONE")}${t.symptom?`<br>${t.symptom}`:""}<br><span class="taskKind">${t.caseTag?`CASO // ${t.caseTag}`:t.taskType?`MINIGAME // ${t.taskType}`:"DIAGNOSI"}</span><br>deadline ${fmt(t.due)}</div>`).join(""):"Nessun ticket aperto.";
}

const STUDIO_ENTRANCE={x:635,y:930,w:120,h:70};

function nearStudioEntrance(){
 return Math.hypot(player.x-(STUDIO_ENTRANCE.x+STUDIO_ENTRANCE.w/2),
                   player.y-(STUDIO_ENTRANCE.y+STUDIO_ENTRANCE.h/2))<82;
}

function v12cRingDoorbell(){
 return v129OpenDoor();
}
function tryStudioEntrance(){
 if(state?.phase!=="shift"||!introFreeWalk||enteredStudio||!nearStudioEntrance())return false;
 if(V129_INTRO.phase==="doorReady"&&!V129_INTRO.doorOpen)return v129OpenDoor();
 return false;
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
   v130b43StorySay("BETTY","Respira e vai per priorità. Una cosa alla volta.");
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
   v130b43StorySay("BETTY",`${tip} Ti copro io cinque minuti. // STRESS -24 · +80 XP`);
 }else if(band>=2){
   state.stress=Math.max(0,state.stress-16);
   state.xp+=45;
   bettySupportCooldown=95;
   bettyPinged=false;
   changeRelation(hr,3);
   v130b43StorySay("BETTY",`${tip} // STRESS -16 · +45 XP`);
 }else if(band>=1){
   state.stress=Math.max(0,state.stress-9);
   bettySupportCooldown=75;
   bettyPinged=false;
   changeRelation(hr,2);
   v130b43StorySay("BETTY",`${tip} // STRESS -9`);
 }else{
   changeRelation(hr,1);
   v130b43StorySay("BETTY",tip);
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
     p.taken=true;inventory.push(p.label);updateInventoryUI();toast(`PRESO // ${p.label}`);
     showStudioEventHud("CONSEGNA PACCHI",`${p.label} PRESO // ${v107PackageDestinationText()} // G = CONSEGNA`);
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
     if(studioEvent.type==="MEETING_RUSH"){
       v12c42MeetingState="DELIVER";
       showMissionBanner(
         "EXTENDER PRESO",
         "Vai in SALA MEET. Sul marker della postazione AV premi G per collegarlo.",
         "SALA MEET",
         "G = COLLEGA"
       );
       v12c42MeetingNotify("SALA MEET","EXTENDER HDMI PRESO → SALA MEET → marker giallo → G // COLLEGA");
     }
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
     carryMission=null;v130b561GiveBreath();updateInventoryUI();updateTaskProgress();return true;
   }
 }

 if(studioEvent?.type==="AMAZON"&&Math.hypot(player.x-650,player.y-210)<105){
   const p=studioEvent.packages.find(p=>p.owner==="PLAYER"&&p.taken&&!p.done&&inventory.includes(p.label));
   if(p){
     inventory.splice(inventory.indexOf(p.label),1);p.done=true;updateInventoryUI();
     const done=studioEvent.packages.filter(x=>x.owner==="PLAYER"&&x.done).length;
     showStudioEventHud("CONSEGNA PACCHI",`${done}/2 PACCHI IT DEPOSITATI`);
     if(done>=2){
       state.xp+=240;state.solved++;
       showRewardResult("EVENTO COMPLETATO",["PACCHI IT DEPOSITATI","XP +240"],"success");
       studioEvent=null;v130b561GiveBreath();hideStudioEventHud();updateTaskProgress();
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
     studioEvent=null;v130b561GiveBreath();hideStudioEventHud();updateTaskProgress();

     if(type==="MEETING_RUSH"&&typeof v130b43StorySay==="function"){
       v130b43StorySay("IT MANAGER",[
         "Perfetto. Segnale tornato.",
         "La Sala Meet è pronta."
       ]);
     }
     return true;
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
 if((v118ValidPoint(mokasa)?Math.hypot(player.x-mokasa.x,player.y-mokasa.y):9999)>65)return false;
 if(typeof V130B57_ENDING!=="undefined"&&V130B57_ENDING.active)return true;
 if(typeof v109EndShiftReady!=="undefined"&&v109EndShiftReady){v109EndShiftReady=false;v130b57StartEndingCinematic();return true}
 v130b43StorySay("CAPO","Ci vediamo a fine turno.");return true;
}


function v125TryMagazzinoDeposit(){
 const c=v120CarryState();if(!c||!c.carrying||!v118ValidPoint(c.dest))return false;
 const isStore=String(c.dest.room||"").toUpperCase()==="SERVER" &&
   String(c.dest.label||"").toUpperCase().includes("MAGAZZINO");
 if(!isStore)return false;
 if(v119SafeDistanceTo(c.dest)>72)return false;

 v125RemoveInventoryItem(c.item);
 if(typeof carryMission!=="undefined")carryMission=null;
 state.xp+=35;
 if(typeof hud==="function")hud();
 if(typeof refreshInventory==="function")refreshInventory();
 if(typeof renderInventory==="function")renderInventory();
 if(typeof v122Say==="function")v122Say("MAGAZZINO IT",`${c.item} depositato correttamente.`,"MISSIONE COMPLETATA // XP +35");
 return true;
}

function interact(){
 if(v123ServerWorkshopInteract())return true;
 const _c120=v120CarryState();
 if(_c120){
   const _p120=_c120.carrying?_c120.dest:_c120.pickup;
   if(v118ValidPoint(_p120)&&v119SafeDistanceTo(_p120)<80){
     toast(_c120.carrying?"USA G PER CONSEGNARE / INSTALLARE":"USA F PER PRENDERE");return true;
   }
 }

 if(storyOpen){closeStory();return true;}

 const _modal114=document.getElementById("modal");
 if(_modal114&&!_modal114.classList.contains("hidden")&&!activeMiniGame){
   _modal114.classList.add("hidden");
   storyOpen=false;uiMessageBusy=false;
   if(typeof v11MissionBriefOpen!=="undefined")v11MissionBriefOpen=false;
   return true;
 }

 if(v113ManualCapoInteract())return true;
 if(!v110FirstMissionResolved&&typeof IT_PC!=="undefined"&&v118ValidPoint(IT_PC)&&(v118ValidPoint(IT_PC)?Math.hypot(player.x-IT_PC.x,player.y-IT_PC.y):9999)<78){
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
 let i=tickets.findIndex(t=>(v118ValidPoint(t.p)?Math.hypot(player.x-t.p.x,player.y-t.p.y):9999)<75);
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


/* 1.0.30B5.7 — ENDING CINEMATIC SKELETON */
const V130B57_ENDING={active:false,phase:"idle",route:[],routeIndex:0,assembled:false,storyStarted:false};

function v130b57EndingPlayerTarget(){return {x:1430,y:640,room:"SALA MEET CAPO"}}

function v130b57PrepareFinaleCrowd(){
 if(V130B57_ENDING.assembled)return;V130B57_ENDING.assembled=true;
 const slots={manager:{x:1368,y:575},zia:{x:1408,y:575},hr:{x:1488,y:575},pao:{x:1368,y:480},don:{x:1490,y:480}};
 for(const n of npcs){
   const s=slots[n.id];if(!s)continue;
   n.x=s.x;n.y=s.y;n.route=null;n.routeIndex=0;n.routeGoal=null;n.state="finaleAudience";n.activity=null;
 }
 const crowd=[{x:1325,y:610},{x:1535,y:610},{x:1325,y:455},{x:1535,y:455},{x:1335,y:650},{x:1525,y:650}];
 ambientNPCs.slice(0,crowd.length).forEach((n,i)=>{
   n.x=crowd[i].x;n.y=crowd[i].y;n.route=null;n.routeIndex=0;n.routeGoal=null;n.state="finaleAudience";n.activity=null;
 });
 if(mokasa){mokasa.x=1430;mokasa.y=445;mokasa.route=null;mokasa.routeIndex=0;mokasa.state="finaleCapo"}
}

function v130b57StartEndingCinematic(){
 if(V130B57_ENDING.active)return true;
 tickets=[];renderTickets();if(typeof v1293ClearGhostPhysicalMission==="function")v1293ClearGhostPhysicalMission();
 carryMission=null;studioEvent=null;activeMiniGame=null;
 document.getElementById("modal")?.classList.add("hidden");if(typeof hideStudioEventHud==="function")hideStudioEventHud();
 const target=v130b57EndingPlayerTarget();
 let route=findNpcPath({x:player.x,y:player.y,room:navAreaAt(player.x,player.y)},target);
 if(!route||!route.length)route=[target];
 Object.assign(V130B57_ENDING,{active:true,phase:"walk",route,routeIndex:0,assembled:false,storyStarted:false});
 keys={};if(typeof v129ClearMovement==="function")v129ClearMovement();
 sideMessage("FINE TURNO","Il Capo ha chiamato tutti in Sala Meet Capo.");
 return true;
}

function v130b57EndingWalk(dt){
 const e=V130B57_ENDING,p=e.route[Math.min(e.routeIndex,e.route.length-1)];if(!p)return true;
 const dx=p.x-player.x,dy=p.y-player.y,dist=Math.hypot(dx,dy),step=180*Math.min(.05,Math.max(0,dt||0));
 if(dist<=Math.max(4,step)){player.x=p.x;player.y=p.y;e.routeIndex++;return e.routeIndex>=e.route.length}
 const nx=player.x+(dx/dist)*step,ny=player.y+(dy/dist)*step;
 if(playerCanMove(player.x,player.y,nx,ny)){player.x=nx;player.y=ny}
 else{
   const reroute=findNpcPath({x:player.x,y:player.y,room:navAreaAt(player.x,player.y)},v130b57EndingPlayerTarget());
   if(reroute&&reroute.length){e.route=reroute;e.routeIndex=0}
 }
 return false;
}

function v130b57EndingUpdate(dt){
 const e=V130B57_ENDING;if(!e.active)return false;
 if(e.phase==="walk"){
   if(v130b57EndingWalk(dt)){v130b57PrepareFinaleCrowd();e.phase="story"}
   return true;
 }
 if(e.phase==="story"&&!e.storyStarted){
   e.storyStarted=true;const name=typeof v130b2PlayerName==="function"?v130b2PlayerName():"IT";
   v130b43StorySay("CAPO",[
     "Bene. Adesso che ci siamo tutti...",
     `${name}, giornata interessante.`,
     "Prima di andare via avrei ancora una cosina.",
     "Facciamo l'ultimo controllo insieme. Poi vediamo com'è andata davvero."
   ],()=>{e.active=false;e.phase="done";startBoss()});
   return true;
 }
 return true;
}

document.addEventListener("keydown",function v130b57EndingInputGuard(e){
 if(!V130B57_ENDING.active)return;
 if(typeof V130B43_STORY!=="undefined"&&V130B43_STORY.active&&["KeyE","Enter","Space"].includes(e.code))return;
 if(["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","KeyE","Enter","Space","KeyF","KeyG","Tab","KeyM","Escape"].includes(e.code)){
   e.preventDefault();e.stopImmediatePropagation();if(typeof v129ClearMovement==="function")v129ClearMovement();
 }
},true);

function v109ArmEndShift(){
 v1293ClearGhostPhysicalMission();if(v109EndShiftReady)return;
 v109EndShiftReady=true;state.min=BOSS;v130b57StartEndingCinematic();hud();
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
   if(["postLunchWait","lunchReturnDesk","lunchReturnSpecial"].includes(n.state))continue;
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
 const r=findNpcPath({x:n.x,y:n.y,room:navAreaAt(n.x,n.y)},target);
 if(!r||!r.length)return false;
 n.route=r.slice(0,140);
 n.routeIndex=0;
 n.routeGoal={...target};
 n.state=stateName||"specialRoam";
 n.stuckFor=0;n.blockedFor=0;
 return true;
}

function v106SpecialRoamUpdate(dt){
 if(!state||state.phase!=="shift"||isLunch()||dialogPause)return;
 if(typeof V130B57_ENDING!=="undefined"&&V130B57_ENDING.active)return;
 const T={
  pao:[
   {x:176,y:696,room:"BIM"},{x:120,y:625,room:"BIM"},{x:185,y:670,room:"BIM"},
   {x:280,y:700,room:"CORRIDOIO"},{x:520,y:700,room:"CORRIDOIO"},
   {x:1215,y:865,room:"STAMPANTI"}
  ],
  don:[
   {x:700,y:700,room:"CORRIDOIO"},{x:760,y:540,room:"CORRIDOIO"},
   {x:900,y:350,room:"CORRIDOIO"},{x:1215,y:865,room:"STAMPANTI"},
   {x:680,y:220,room:"SERVER"},{x:1000,y:835,room:"CUCINA"},
   {x:820,y:700,room:"CORRIDOIO"}
  ]
 };
 for(const id of ["pao","don"]){
   const n=v106SpecialNpcById(id);if(!n)continue;
   if(["postLunchWait","lunchReturnDesk","lunchReturnSpecial"].includes(n.state))continue;
   n._spT=(n._spT??(id==="don"?1.5:3.5))-dt;
   if(n.state==="specialRoam"||n.state==="specialReturn"){
     if(moveNpcRoute(n,dt)){
       n.route=null;n.routeIndex=0;n.routeGoal=null;n.state="specialPause";
       n._spT=id==="don"?1.5+Math.random()*3:2.5+Math.random()*4;
     }
     continue;
   }
   if(n.state==="specialPause"&&n._spT>0)continue;
   if(n._spT<=0){
     const target=(id==="pao"&&Math.random()<.48)
       ?{x:176,y:696,room:"BIM"}
       :T[id][Math.floor(Math.random()*T[id].length)];
     if(v106RouteNpc(n,target,target.room==="BIM"?"specialReturn":"specialRoam"))
       n._spT=id==="don"?4+Math.random()*6:6+Math.random()*8;
     else n._spT=1.5;
   }
   if(Math.hypot(player.x-n.x,player.y-n.y)<52){
     n._nearT=(n._nearT||0)+dt;
     if(n._nearT>4.2&&!V122_DIALOG.active&&!storyOpen){
       n._nearT=0;
       if(id==="pao"&&Math.random()<.12)v122Say("PAO","Tutto sotto controllo?");
       if(id==="don"&&Math.random()<.12)v122Say("DON","Se serve, sono in giro.");
     }
   }else n._nearT=0;
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
 if(studioEvent?.type==="MEETING_RUSH"){
   if(studioEvent.carried){
     showStudioEventHud("SALA MEET","EXTENDER HDMI → SALA MEET // G = COLLEGA");
   }else{
     showStudioEventHud("SALA MEET","MAGAZZINO IT // F = PRENDI EXTENDER HDMI");
   }
 }
 if(studioEvent?.type==="AMAZON"){
   const held=studioEvent.packages?.find(p=>p.owner==="PLAYER"&&p.taken&&!p.done&&inventory.includes(p.label));
   if(held){
     showStudioEventHud("CONSEGNA PACCHI",`${held.label} → ${v107PackageDestinationText()} // G = CONSEGNA`);
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


const V123_TUTORIAL={movement:false,tasks:false,physical:false};
function v123TutorialTick(){
 if(!state||state.phase!=="shift"||typeof v122Say!=="function")return;
 if(!managerRaceDone||!v110FirstMissionResolved)return;
 if(!V123_TUTORIAL.movement){V123_TUTORIAL.movement=true;v122Say("GUIDA RAPIDA","Da qui inizia il turno vero.","TAB → GUIDA contiene sempre tutti i comandi.");return}
 if(!V123_TUTORIAL.tasks&&tickets.length>0){V123_TUTORIAL.tasks=true;v122Say("TABLET IT","È arrivata una richiesta.","TAB → TASK mostra reparto, problema e scadenza.");return}
 if(!V123_TUTORIAL.physical&&carryMission){V123_TUTORIAL.physical=true;v122Say("MISSIONE FISICA","Il marker indica il punto esatto.","F = PRENDI // G = CONSEGNA o INSTALLA.")}
}


/* VERSIONE1ITSHIFT 1.0.25 — IT MANAGER SERVER ROUTINE */
const V125_MANAGER_SERVER={x:685,y:195,room:"SERVER"};
const V125_MANAGER_IT={x:185,y:842,room:"IT"};
let V125_MANAGER_STATE={phase:"idle",wait:0,lastTrip:-999};

function v125ManagerServerRoutine(dt){
 if(!state||state.phase!=="shift"||!managerRaceDone||isLunch()||dialogPause)return;
 const n=npcs.find(q=>q&&q.id==="manager");
 if(!n)return;
 if(["postLunchWait","lunchReturnDesk","lunchReturnSpecial"].includes(n.state))return;
 const now=state.min||0;

 if(V125_MANAGER_STATE.phase==="idle"){
   if(now-V125_MANAGER_STATE.lastTrip<95)return;
   const route=typeof findPath==="function"?findPath({x:n.x,y:n.y},V125_MANAGER_SERVER):null;
   if(route&&route.length){
     n.route=route;n.routeIndex=0;n.state="managerServer";
     V125_MANAGER_STATE.phase="toServer";
   }
   return;
 }
 if(V125_MANAGER_STATE.phase==="toServer"){
   if(moveNpcRoute(n,dt)){
     n.route=null;n.routeIndex=0;V125_MANAGER_STATE.phase="serverWait";V125_MANAGER_STATE.wait=20;
   }
   return;
 }
 if(V125_MANAGER_STATE.phase==="serverWait"){
   V125_MANAGER_STATE.wait-=dt;
   if(V125_MANAGER_STATE.wait<=0){
     const route=typeof findPath==="function"?findPath({x:n.x,y:n.y},V125_MANAGER_IT):null;
     if(route&&route.length){n.route=route;n.routeIndex=0;n.state="managerReturn";V125_MANAGER_STATE.phase="return"}
     else {V125_MANAGER_STATE.phase="idle";V125_MANAGER_STATE.lastTrip=now}
   }
   return;
 }
 if(V125_MANAGER_STATE.phase==="return"){
   if(moveNpcRoute(n,dt)){
     n.route=null;n.routeIndex=0;n.state="desk";
     V125_MANAGER_STATE.phase="idle";V125_MANAGER_STATE.lastTrip=now;
   }
 }
}


let V125_MEETING={tracked:false,startedAt:0,lastMin:-1};
function v125MeetingUrgentWatch(){
 if(!state||state.phase!=="shift")return;
 const ev=(typeof studioEvent!=="undefined")?studioEvent:null;
 const active=ev&&ev.active!==false&&String(ev.type||ev.name||ev.title||"").toUpperCase().includes("MEET");

 if(active&&!V125_MEETING.tracked){
   V125_MEETING.tracked=true;V125_MEETING.startedAt=state.min;V125_MEETING.lastMin=state.min;
   if(Number.isFinite(ev.deadline))ev.deadline=Math.max(ev.deadline,state.min+45);
   if(Number.isFinite(ev.due))ev.due=Math.max(ev.due,state.min+45);
 }
 if(active){
   V125_MEETING.lastMin=state.min;
   return;
 }
 if(V125_MEETING.tracked){
   // B5.7.1: MEETING_RUSH is a self-contained studioEvent.
   // Its disappearance after completion must never trigger a legacy carryMission failure.
   V125_MEETING.tracked=false;
 }

 if(!studioEvent&&!carryMission)v1293PurgePhysicalOrphans(false);}


/* VERSIONE1ITSHIFT 1.0.26 — MANAGER RACE AUTHORITY */
const V126_RACE={
 active:false, managerStarted:false, managerFinished:false,
 playerFinished:false, managerStartAt:0, managerFinishAt:0, playerFinishAt:0
};

function v126RaceBegin(){
 if(V126_RACE.active||managerRaceDone)return;
 const m=npcs.find(n=>n&&n.id==="manager");
 if(!m)return;
 V126_RACE.active=true;
 V126_RACE.managerStarted=true;
 V126_RACE.managerFinished=false;
 V126_RACE.playerFinished=false;
 V126_RACE.managerStartAt=performance.now();

 // Build a physical route from current manager position to IT room.
 const target={x:205,y:835,room:"IT"};
 const route=typeof findPath==="function"?findPath({x:m.x,y:m.y},target):null;
 if(route&&route.length){
   m.route=route;m.routeIndex=0;m.state="managerRace";
 }else{
   // deterministic fallback path through corridor, still requires movement.
   m.route=[
     {x:m.x,y:m.y},{x:520,y:710},{x:420,y:710},{x:330,y:710},
     {x:260,y:760},{x:220,y:810},{x:205,y:835}
   ];
   m.routeIndex=0;m.state="managerRace";
 }
}

function v126RaceUpdate(dt){
 if(!V126_RACE.active||managerRaceDone)return;
 const m=npcs.find(n=>n&&n.id==="manager");
 if(!m)return;

 if(!V126_RACE.managerStarted)v126RaceBegin();

 if(!V126_RACE.managerFinished){
   const done=moveNpcRoute(m,dt);
   if(done){
     V126_RACE.managerFinished=true;
     V126_RACE.managerFinishAt=performance.now();
     m.route=null;m.routeIndex=0;m.state="raceDesk";
   }
 }

 // Legacy game may mark race done too early: revoke until both sides finished.
 if(managerRaceDone && !(V126_RACE.managerFinished&&V126_RACE.playerFinished)){
   managerRaceDone=false;
 }
 if(V126_RACE.managerFinished&&V126_RACE.playerFinished){
   managerRaceDone=true;
   V126_RACE.active=false;
   const pt=(V126_RACE.playerFinishAt-V126_RACE.managerStartAt)/1000;
   const mt=(V126_RACE.managerFinishAt-V126_RACE.managerStartAt)/1000;
   if(typeof v122Say==="function"){
     v122Say("RISULTATO CORSA",
       `TU ${pt.toFixed(1)}s // IT MANAGER ${mt.toFixed(1)}s`,
       pt<mt?"HAI VINTO LA CORSA.":"L'IT MANAGER È ARRIVATO PRIMA.");
   }
 }
}

function v126MarkPlayerRaceFinish(){
 if(!V126_RACE.active||V126_RACE.playerFinished)return;
 V126_RACE.playerFinished=true;
 V126_RACE.playerFinishAt=performance.now();
}


/* 1.0.29.3 — POST LUNCH RECOVERY */
let V1293_LUNCH_WAS_ACTIVE=false;
let V1293_LUNCH_RECOVERY_DONE=false;

function v1293RecoverNpcAfterLunch(){
 const raw=[...(Array.isArray(npcs)?npcs:[]),...(Array.isArray(ambientNPCs)?ambientNPCs:[])];
 const seen=new Set();
 const all=raw.filter(n=>{
   if(!n||n.id==="capo")return false;
   if(seen.has(n))return false;
   seen.add(n);return true;
 });

 V1294_LUNCH_QUEUE.length=0;
 V1294_LUNCH_CLOCK=0;

 let slot=0;
 for(const n of all){
   n.route=null;n.routeIndex=0;n.stuckFor=0;n.blockedFor=0;
   n.ignoreNpcCollision=false;
   n.state="postLunchWait";
   const special=n.id==="pao"||n.id==="don";
   V1294_LUNCH_QUEUE.push({n,delay:special?slot*0.45:slot*0.36,special});
   slot++;
 }
}

function v1293LunchLifecycleWatch(){
 const nowLunch=!!isLunch();
 if(nowLunch){
   V1293_LUNCH_WAS_ACTIVE=true;
   V1293_LUNCH_RECOVERY_DONE=false;
   return;
 }
 if(V1293_LUNCH_WAS_ACTIVE&&!V1293_LUNCH_RECOVERY_DONE){
   V1293_LUNCH_RECOVERY_DONE=true;
   V1293_LUNCH_WAS_ACTIVE=false;
   v1293RecoverNpcAfterLunch();
 }
}


/* 1.0.29.3 — PHYSICAL MISSION CLEANUP */
function v1293InventoryName(v){
 return String(v?.label||v?.name||v||"").trim().toUpperCase();
}
function v1293PurgePhysicalOrphans(force=false){
 if(!Array.isArray(inventory))return 0;

 // If an active carry mission exists, keep its current item.
 const activeName=carryMission ? String(carryMission.item||carryMission.label||"").toUpperCase() : "";

 const orphanTokens=[
   "ALIMENTATORE",
   "EXTENDER HDMI",
   "HDMI",
   "PC DA SPOSTARE",
   "WORKSTATION DA SPOSTARE"
 ];

 const before=inventory.length;
 inventory=inventory.filter(v=>{
   const name=v1293InventoryName(v);
   const isMissionBound=orphanTokens.some(t=>name.includes(t));
   if(!isMissionBound)return true;
   if(!force && carryMission && activeName && name.includes(activeName))return true;
   return false;
 });

 if(inventory.length!==before){
   updateInventoryUI();
 }
 return before-inventory.length;
}

function v1293PhysicalLifecycleWatch(){
 // Any mission-bound object with no live carry/studio event is orphaned.
 if(!carryMission && !studioEvent){
   v1293PurgePhysicalOrphans(false);
 }
}


/* 1.0.29.3 — END OF DAY HARD CLEAN */
function v1293ClearGhostPhysicalMission(){
 carryMission=null;

 if(typeof studioEvent!=="undefined"&&studioEvent){
   const type=String(studioEvent.kind||studioEvent.type||studioEvent.name||studioEvent.title||"").toUpperCase();
   if(["WORKSTATION","MEETING","MEETING_URGENTE","CAMBIO_POSTAZIONE","DESK_SETUP","AMAZON"].some(t=>type.includes(t))){
     studioEvent=null;
   }
 }

 v1293PurgePhysicalOrphans(true);
 if(typeof hideStudioEventHud==="function")hideStudioEventHud();

 const b=$("#missionBanner");
 if(b){
   clearTimeout(b._t);
   b.classList.add("hidden");
   b.classList.remove("out");
 }

 if(typeof updateInventoryUI==="function")updateInventoryUI();
 if(typeof updateTaskProgress==="function")updateTaskProgress();
}

function v1293EndShiftCleanupWatch(){
 if(!state)return;
 if(state.min>=BOSS || state.phase==="boss" || state.phase==="end"){
   v1293ClearGhostPhysicalMission();
 }
}


/* VERSIONE1ITSHIFT 1.0.29.4 — POST-LUNCH TRAFFIC */
const V1294_LUNCH_QUEUE=[];
let V1294_LUNCH_CLOCK=0;

function v1294TargetFor(n){
 if(!n)return null;
 if(n.id==="pao")return {x:760,y:690,room:"CORRIDOIO"};
 if(n.id==="don")return {x:1030,y:710,room:"CORRIDOIO"};
 if(Number.isFinite(n.deskX)&&Number.isFinite(n.deskY))
   return {x:n.deskX,y:n.deskY,room:n.homeRoom||navAreaAt(n.deskX,n.deskY)};
 if(Number.isFinite(n.homeX)&&Number.isFinite(n.homeY))
   return {x:n.homeX,y:n.homeY,room:n.homeRoom||navAreaAt(n.homeX,n.homeY)};
 return null;
}

function v1294StartReturn(item){
 const n=item?.n;if(!n)return;
 const target=v1294TargetFor(n);
 if(!target){
   n.state=item.special?"specialPause":"work";
   n.ignoreNpcCollision=false;
   return;
 }

 const route=findNpcPath({x:n.x,y:n.y,room:navAreaAt(n.x,n.y)},target);
 n.routeGoal={...target};
 n.ignoreNpcCollision=true; // only NPC-NPC overlap; walls/doors remain enforced
 n.stuckFor=0;n.blockedFor=0;
 n._lunchStuck=0;n._lunchLastX=n.x;n._lunchLastY=n.y;

 if(route&&route.length){
   n.route=route;n.routeIndex=0;
   n.state=item.special?"lunchReturnSpecial":"lunchReturnDesk";
 }else{
   n.route=null;n.routeIndex=0;
   n.ignoreNpcCollision=false;
   n.state=item.special?"specialPause":"work";
 }
}

function v1294FinishReturn(n){
 if(!n)return;
 n.route=null;n.routeIndex=0;n.stuckFor=0;n.blockedFor=0;
 n.ignoreNpcCollision=false;n._lunchStuck=0;

 if(n.id==="pao"||n.id==="don"){
   n.state="specialPause";n._spT=1.2;
 }else{
   n.state="work";
   if(Number.isFinite(n.deskX)&&Number.isFinite(n.deskY)){n.x=n.deskX;n.y=n.deskY}
   n.workTimer=45+Math.random()*75;
   n.activityCooldown=45+Math.random()*90;
 }
}

function v1294TrafficUpdate(dt){
 const t=Math.min(Math.max(Number.isFinite(dt)?dt:0,0),0.05);
 V1294_LUNCH_CLOCK+=t;

 for(let i=V1294_LUNCH_QUEUE.length-1;i>=0;i--){
   const item=V1294_LUNCH_QUEUE[i];
   if(V1294_LUNCH_CLOCK>=item.delay){
     v1294StartReturn(item);
     V1294_LUNCH_QUEUE.splice(i,1);
   }
 }

 const raw=[...(Array.isArray(npcs)?npcs:[]),...(Array.isArray(ambientNPCs)?ambientNPCs:[])];
 const seen=new Set();
 for(const n of raw){
   if(!n||seen.has(n))continue;seen.add(n);
   if(n.state==="lunchReturnDesk"||n.state==="lunchReturnSpecial"){
     if(!n.route||moveNpcRoute(n,t))v1294FinishReturn(n);
   }
 }
}

function v1294AntiStuck(dt){
 const t=Math.min(Math.max(Number.isFinite(dt)?dt:0,0),0.05);
 const raw=[...(Array.isArray(npcs)?npcs:[]),...(Array.isArray(ambientNPCs)?ambientNPCs:[])];
 const seen=new Set();

 for(const n of raw){
   if(!n||seen.has(n))continue;seen.add(n);
   if(!["lunchReturnDesk","lunchReturnSpecial"].includes(n.state))continue;

   const lx=Number.isFinite(n._lunchLastX)?n._lunchLastX:n.x;
   const ly=Number.isFinite(n._lunchLastY)?n._lunchLastY:n.y;
   if(Math.hypot(n.x-lx,n.y-ly)<0.75)n._lunchStuck=(n._lunchStuck||0)+t;
   else{n._lunchStuck=0;n._lunchLastX=n.x;n._lunchLastY=n.y}

   if(n._lunchStuck>2){
     n._lunchStuck=0;
     const target=n.routeGoal;
     const route=target?findNpcPath({x:n.x,y:n.y,room:navAreaAt(n.x,n.y)},target):[];
     if(route&&route.length){
       n.route=route;n.routeIndex=0;n.stuckFor=0;n.blockedFor=0;n.ignoreNpcCollision=true;
     }else v1294FinishReturn(n);
   }
 }
}

function update(dt) {
 if(typeof V130B0_PROOF!=="undefined"&&V130B0_PROOF.open){hud();updateTaskProgress();return;}
 v129IntroUpdate(dt);
 if(V129_INTRO.locked){
   hud();updateTaskProgress();return;
 }
 v129RaceUpdate(dt);

 if(typeof V130B57_ENDING!=="undefined"&&V130B57_ENDING.active){
   v130b57EndingUpdate(dt);hud();updateTaskProgress();return;
 }

v125MeetingUrgentWatch();
 v125ManagerServerRoutine(dt);
 v122SpecialCalls();
 v117Trace('update-start');
 v117RuntimeWatchdog(dt);

 v117Trace('v114UiLockWatchdog');v118SafeCall('v114UiLockWatchdog',()=>v114UiLockWatchdog());
 v117Trace('v114LunchRecoveryWatch');v118SafeCall('v114LunchRecoveryWatch',()=>v114LunchRecoveryWatch());
 v113CapoProximitySafety();
 if(dialogPause)return;
 v1293LunchLifecycleWatch();
 v1293PhysicalLifecycleWatch();
 v1293EndShiftCleanupWatch();
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

 /* 1.0.29 old intro monitor removed */
 /* V9.1.3: porta manuale con E; nessun ingresso automatico. */
 /* 1.0.29 old managerTrigger removed */

 if(state?.phase==="shift"){
  let dx=(keys.d||keys.arrowright||virtualKeys.right?1:0)-(keys.a||keys.arrowleft||virtualKeys.left?1:0)+(joyActive?joyX:0),
      dy=(keys.s||keys.arrowdown||virtualKeys.down?1:0)-(keys.w||keys.arrowup||virtualKeys.up?1:0)+(joyActive?joyY:0);
  if(!storyOpen&&introStage!=="entranceGreeting"&&(Math.abs(dx)>.04||Math.abs(dy)>.04)){let l=Math.max(1,Math.hypot(dx,dy)),vx=dx/l*player.s*dt,vy=dy/l*player.s*dt;if(playerCanMove(player.x,player.y,player.x+vx,player.y))player.x+=vx;if(playerCanMove(player.x,player.y,player.x,player.y+vy))player.y+=vy}
  // V5.1.1.1: the shift starts only after the player physically crosses the exterior door.
 /* 1.0.29 old managerTrigger removed */
  
  if(shiftStarted&&!v109EndShiftReady)state.min=Math.min(BOSS,state.min+dt*difficultyConfig[difficulty].timeSpeed); if(state.min>=BOSS&&!v109EndShiftReady)v109ArmEndShift();
  spawnTimer+=dt;anomTimer+=dt;
 updateLunchMigration(dt);
 v1294TrafficUpdate(dt);
 v1294AntiStuck(dt);
 v117Trace('updateManager');/* 1.0.25 manager handled by v125ManagerServerRoutine */;
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

if(
 shiftStarted&&!isLunch() &&
 !v130b561MainActivityBusy() &&
 spawnTimer>difficultyConfig[difficulty].spawnSeconds
){
 spawnTimer=0;newTicket();maybeCritical();
}
 const phase=dayPhase();
 const anomalyEvery=phase==="MORNING"?26:phase==="LUNCH"?14:phase==="AFTERNOON"?21:10;
 if(anomTimer>anomalyEvery){anomTimer=0 /* V5: no supernatural anomaly system */}
  expireTickets();
 } else if(state.phase==="boss")state.min=BOSS;else state.min=END;
 hud();updateTaskProgress();

 v12c41CapStressSpike();

 v12c45PlayerAntiStuck();

 if(managerRaceDone&&v110FirstMissionResolved)v123TutorialTick();}

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
 // B1.3: all corridor rectangles share ONE global tile grid.
 // Overlapping corridor zones therefore draw the exact same pixels.
 const x=z.x,y=z.y,w=z.w,h=z.h;
 const a="#56645d",b="#5b6961";
 const tile=16;

 g.save();
 g.beginPath();g.rect(x,y,w,h);g.clip();

 const sx=Math.floor(x/tile)*tile;
 const sy=Math.floor(y/tile)*tile;
 for(let yy=sy;yy<y+h+tile;yy+=tile){
   for(let xx=sx;xx<x+w+tile;xx+=tile){
     const odd=((Math.floor(xx/tile)+Math.floor(yy/tile))&1)!==0;
     g.fillStyle=odd?b:a;
     g.fillRect(xx,yy,tile,tile);

     // Tiny shared texture, also global: no rectangle seams.
     g.fillStyle=odd?"rgba(24,33,28,.08)":"rgba(225,229,190,.045)";
     g.fillRect(xx+3,yy+3,2,2);
   }
 }

 // One subtle global orientation mark, never an edge around each corridor zone.
 g.fillStyle="rgba(218,222,177,.10)";
 if(w>=h){
   const gy=Math.floor((y+h/2)/32)*32;
   g.fillRect(x,gy, w,2);
 }else{
   const gx=Math.floor((x+w/2)/32)*32;
   g.fillRect(gx,y,2,h);
 }
 g.restore();
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
 if(typeof V130A_PIXEL_FOUNDATION!=="undefined"&&V130A_PIXEL_FOUNDATION)return "#58665f";
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
 desk(515,775,110); // B1.3 ZIA ALE // SEGRETERIA — fuori dalla corsia ingresso
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
 if(V130A_PIXEL_FOUNDATION){
   if(r.name==="IT"){v130aDrawITLabel(r);return}
   if(r.name==="HR"){v130a1DrawRoomLabel(r,"HR");return}
   if(r.name==="INGRESSO / SEGRETERIA"){v130a1DrawRoomLabel(r,"SEGRETERIA");return}
   if(r.name==="SERVER"){v130a2DrawServerLabel(r);return}
   v130a4DrawRoomLabel(r);
   return;
 }
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

/* VERSIONE1ITSHIFT 1.0.23 — SERVER ROOM / MAGAZZINO IT */
const V123_SERVER_STORAGE={
 shelves:{x:365,y:105,w:150,h:66},
 pickup:{x:440,y:188,room:"SERVER",label:"SCAFFALI MAGAZZINO IT"},
 bench:{x:430,y:205,w:125,h:34},
 benchPoint:{x:492,y:244,room:"SERVER",label:"BANCO RIPARAZIONI"},
 drop:{x:535,y:225,room:"SERVER",label:"DEPOSITO MAGAZZINO IT"}
};

function v123DrawServerWorkshop(){
 const s=V123_SERVER_STORAGE.shelves,b=V123_SERVER_STORAGE.bench;
 g.save();

 // Storage shelves behind the work area.
 g.fillStyle="#121916";g.fillRect(s.x,s.y,s.w,s.h);
 g.strokeStyle="#708078";g.lineWidth=2;g.strokeRect(s.x,s.y,s.w,s.h);
 for(let yy=s.y+20;yy<s.y+s.h;yy+=20){
   g.strokeStyle="#59665f";g.beginPath();g.moveTo(s.x+4,yy);g.lineTo(s.x+s.w-4,yy);g.stroke();
 }
 const boxes=[
  [s.x+10,s.y+7,20,10,"#7b542d"],[s.x+38,s.y+7,24,10,"#9b6d37"],
  [s.x+72,s.y+7,17,10,"#54615c"],[s.x+100,s.y+7,28,10,"#80613c"],
  [s.x+12,s.y+27,18,11,"#31576a"],[s.x+42,s.y+27,22,11,"#525f59"],
  [s.x+76,s.y+27,25,11,"#2f4c61"],[s.x+111,s.y+27,20,11,"#8c6331"],
  [s.x+14,s.y+48,28,10,"#354c58"],[s.x+54,s.y+48,18,10,"#7c572f"],
  [s.x+85,s.y+48,20,10,"#53645c"],[s.x+115,s.y+48,22,10,"#36566b"]
 ];
 boxes.forEach(q=>{g.fillStyle=q[4];g.fillRect(q[0],q[1],q[2],q[3])});

 g.fillStyle="rgba(3,7,5,.9)";g.fillRect(s.x+20,s.y-18,110,16);
 g.fillStyle="#9cff73";g.font="bold 9px monospace";g.textAlign="center";
 g.fillText("MAGAZZINO IT",s.x+75,s.y-7);

 // Repair workbench.
 g.fillStyle="#181310";g.fillRect(b.x+3,b.y+4,b.w,b.h+12);
 g.fillStyle="#754924";g.fillRect(b.x,b.y,b.w,b.h);
 g.fillStyle="#996337";g.fillRect(b.x,b.y,b.w,4);
 g.fillStyle="#252d29";g.fillRect(b.x+8,b.y+7,b.w-16,15);
 // Tools / parts
 for(let i=0;i<6;i++){g.fillStyle=i%2?"#c5c7bd":"#b44d3c";g.fillRect(b.x+18+i*15,b.y+9,3,11)}
 g.fillStyle="#527f8e";g.fillRect(b.x+b.w-28,b.y+7,18,12);
 g.fillStyle="rgba(3,7,5,.9)";g.fillRect(b.x+7,b.y+b.h+14,b.w-14,16);
 g.fillStyle="#ffd65a";g.font="bold 8px monospace";g.fillText("BANCO RIPARAZIONI",b.x+b.w/2,b.y+b.h+25);

 g.textAlign="left";
 g.restore();
}

function v123ServerWorkshopInteract(){
 if(!state||state.phase!=="shift")return false;
 if(v119SafeDistanceTo(V123_SERVER_STORAGE.pickup)<58 && !carryMission){
   if(typeof v122Say==="function")v122Say("MAGAZZINO IT","Qui sono stoccati cavi, adattatori, periferiche e ricambi.","Le missioni future potranno richiederti di prelevare il materiale da questi scaffali.");
   else toast("MAGAZZINO IT // RICAMBI E MATERIALE");
   return true;
 }
 if(v119SafeDistanceTo(V123_SERVER_STORAGE.benchPoint)<62 && !carryMission){
   if(typeof v122Say==="function")v122Say("BANCO RIPARAZIONI","Banco hardware pronto.","In una prossima versione qui riparerai PC e componenti.");
   else toast("BANCO RIPARAZIONI // WORK IN PROGRESS");
   return true;
 }
 return false;
}

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
 SERVER_PICKUP:{x:440,y:188,room:"SERVER",label:"SCAFFALI MAGAZZINO IT"},
 SERVER_DROP:{x:535,y:225,room:"SERVER",label:"DEPOSITO MAGAZZINO IT"},
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
 // B5.6: F/G are handled ONLY by v12c451PhysicalKeys.
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


/* 1.0.20 — Physical mission UX, layered over 1.0.19 GOLD */
function v120CarryState(){
 if(typeof carryMission==="undefined"||!carryMission)return null;
 const pickup=carryMission.pickup||carryMission.from||null;
 const dest=carryMission.to||carryMission.destination||null;
 const carrying=carryMission.stage==="deliver"||!!(carryMission.carrying||carryMission.picked||carryMission.hasItem);
 return {
   pickup,dest,carrying,
   item:String(carryMission.item||carryMission.object||carryMission.label||"MATERIALE").toUpperCase(),
   recipient:carryMission.recipient?.name||""
 };
}
function v120PointLabel(p,f){return String((p&&(p.label||p.name||p.room))||f||"PUNTO").toUpperCase()}

function v126PhysicalRouteText(){
 const c=v120CarryState();if(!c)return "";
 const from=v120PointLabel(c.pickup,"ORIGINE");
 const to=v120PointLabel(c.dest,"DESTINAZIONE");
 return `${from}  →  ${to}`;
}

function v120CarryHint(){
 const c=v120CarryState();if(!c)return "";
 const route=v126PhysicalRouteText();
 if(!c.carrying)return `F: PRENDI ${c.item} // ${route}`;
 return `G: CONSEGNA / INSTALLA ${c.item} // ${route}`;
}
function v120DrawMissionPoint(p,label,key){
 if(!v118ValidPoint(p))return;
 const pulse=1+Math.sin(performance.now()/150)*.08;
 const near=v119SafeDistanceTo(p)<72;
 g.save();
 g.translate(p.x,p.y);

 // Exact reticle centred on the real interactive object.
 g.strokeStyle=near?"#b7ff4a":"#6ee7ff";
 g.lineWidth=3;
 const r=15*pulse;
 g.strokeRect(-r,-r,r*2,r*2);
 g.beginPath();
 g.moveTo(0,-30);g.lineTo(0,-19);
 g.moveTo(-5,-24);g.lineTo(0,-19);g.lineTo(5,-24);
 g.stroke();

 const text=`${key} // ${label}`;
 g.font="bold 10px monospace";
 const tw=Math.min(260,Math.max(132,g.measureText(text).width+20));
 g.fillStyle="rgba(4,8,6,.94)";
 g.fillRect(-tw/2,-57,tw,20);
 g.strokeStyle=near?"#b7ff4a":"#6ee7ff";
 g.lineWidth=1;
 g.strokeRect(-tw/2,-57,tw,20);
 g.fillStyle=near?"#b7ff4a":"#e6fbff";
 g.textAlign="center";
 g.fillText(text,0,-43);
 g.textAlign="left";
 g.restore();
}
function v120DrawPhysicalMission(){
 const c=v120CarryState();if(!c)return;
 const route=v126PhysicalRouteText();
 if(c.carrying){
   const d=c.dest,isStore=d&&String(d.room||"").toUpperCase()==="SERVER"&&String(d.label||"").toUpperCase().includes("MAGAZZINO");
   v120DrawMissionPoint(d,isStore?`DEPOSITA ${c.item}`:`CONSEGNA / INSTALLA ${c.item}`,"G");
 }else{
   v120DrawMissionPoint(c.pickup,`PRENDI ${c.item}`,"F");
 }
 // route remains in the task HUD via v120CarryHint; no extra screen clutter here.
}


function v121DrawSpecialNpcBadge(n){
 if(!n)return;
 const id=String(n.id||"").toLowerCase();
 if(!["pao","don","hr","zia","manager"].includes(id))return;
 const label=id==="pao"?"ALLEATO":
   id==="don"?"SUPER ALLEATO":
   id==="hr"?"HR":
   id==="zia"?"SEGRETERIA":
   "IT MANAGER";
 g.save();
 g.fillStyle="rgba(0,0,0,.78)";
 g.fillRect(n.x-34,n.y-52,68,12);
 g.fillStyle="#fff";
 g.font="bold 7px monospace";
 g.textAlign="center";
 g.fillText(label,n.x,n.y-43);
 g.restore();
}


/* ============================================================
   1.0.30A — PIXEL FOUNDATION / VERTICAL SLICE
   Visual-only layer. Geometry, collision, AI and gameplay remain
   the 1.0.29.4 GOLD systems.
   ============================================================ */
let V130A_PIXEL_FOUNDATION=true;
const V130A_MOTION=new Map();

const V130A_PAL={
 ink:"#172018",
 deep:"#253529",
 dark:"#3d533b",
 mid:"#70865a",
 floorA:"#829765",
 floorB:"#778b5d",
 light:"#b8c887",
 cream:"#d5d5a3",
 wood:"#8d6645",
 woodDark:"#5c4635",
 metal:"#59675d",
 screen:"#a8c9a0",
 glow:"#c9e4a9",
 glass:"#7ba2a0",
 white:"#e0e3c2"
};

function v130aSnap(v,n=2){return Math.round(v/n)*n}
function v130aRect(x,y,w,h,c){
 g.fillStyle=c;g.fillRect(v130aSnap(x),v130aSnap(y),v130aSnap(w),v130aSnap(h));
}
function v130aOutline(x,y,w,h,c=V130A_PAL.ink,t=2){
 g.fillStyle=c;
 g.fillRect(x,y,w,t);g.fillRect(x,y+h-t,w,t);
 g.fillRect(x,y,t,h);g.fillRect(x+w-t,y,t,h);
}

function v130aTileField(x,y,w,h,a,b,size=16){
 const sx=Math.floor(x/size)*size,sy=Math.floor(y/size)*size;
 g.save();g.beginPath();g.rect(x,y,w,h);g.clip();
 for(let yy=sy;yy<y+h+size;yy+=size){
   for(let xx=sx;xx<x+w+size;xx+=size){
     const odd=((Math.floor(xx/size)+Math.floor(yy/size))&1)!==0;
     v130aRect(xx,yy,size,size,odd?b:a);
     // one deliberately hard pixel accent per tile: no antialiasing.
     g.fillStyle=odd?"rgba(23,32,24,.08)":"rgba(213,213,163,.06)";
     g.fillRect(xx+2,yy+2,2,2);
   }
 }
 g.restore();
}

function v130aDrawCorridorSlice(){
 // Only the corridor beside REPARTO IT: test of the future tile renderer.
 const x=235,y=690,w=130,h=225;
 v130aTileField(x,y,w,h,"#526653","#5b7059",16);
 // Pokemon-like border strips.
 v130aRect(x,y,w,6,V130A_PAL.ink);
 v130aRect(x,y+6,w,4,V130A_PAL.light);
 v130aRect(x,y+h-8,w,8,V130A_PAL.ink);
 // directional floor details
 for(let yy=y+28;yy<y+h-20;yy+=48){
   v130aRect(x+57,yy,16,4,"rgba(213,213,163,.22)");
 }
}

function v130aDrawMonitor(cx,cy,on=true){
 v130aRect(cx-17,cy-17,34,22,V130A_PAL.ink);
 v130aRect(cx-13,cy-13,26,14,on?V130A_PAL.screen:"#314038");
 v130aRect(cx-2,cy+5,4,8,V130A_PAL.ink);
 v130aRect(cx-8,cy+11,16,3,V130A_PAL.ink);
 if(on){
   v130aRect(cx-9,cy-9,13,2,V130A_PAL.glow);
   v130aRect(cx-9,cy-5,8,2,V130A_PAL.mid);
 }
}

function v130aDrawKeyboard(cx,cy){
 v130aRect(cx-17,cy,34,8,V130A_PAL.ink);
 v130aRect(cx-14,cy+2,28,4,V130A_PAL.cream);
 for(let x=-10;x<=10;x+=5)v130aRect(cx+x,cy+3,2,2,V130A_PAL.dark);
}

function v130aDrawChair(cx,cy){
 v130aRect(cx-13,cy-4,26,18,V130A_PAL.ink);
 v130aRect(cx-9,cy,18,10,V130A_PAL.metal);
 v130aRect(cx-8,cy+14,4,6,V130A_PAL.ink);
 v130aRect(cx+4,cy+14,4,6,V130A_PAL.ink);
}

function v130aDrawDesk(x,y,w,tag){
 // Coordinates match the existing GOLD desk obstacles.
 v130aRect(x,y-8,w,28,V130A_PAL.ink);
 v130aRect(x+4,y-5,w-8,22,V130A_PAL.wood);
 v130aRect(x+4,y-5,w-8,4,"#aa7d50");
 // two legs / cupboards
 v130aRect(x+8,y+17,12,14,V130A_PAL.woodDark);
 v130aRect(x+w-20,y+17,12,14,V130A_PAL.woodDark);
 v130aDrawMonitor(x+w*.53,y-23,true);
 v130aDrawKeyboard(x+w*.53,y+2);
 v130aDrawChair(x+w*.53,y+38);
 // tiny desk plaque; readable but not dominant.
 const tx=String(tag||"IT").slice(0,10);
 g.fillStyle=V130A_PAL.cream;g.font="bold 7px monospace";g.textAlign="center";
 g.fillText(tx,x+w*.53,y+15);g.textAlign="left";
}

function v130aDrawITRoom(){
 if(!V130A_PIXEL_FOUNDATION)return;
 const r=rooms.find(q=>q.name==="IT");if(!r)return;

 // Cover the old room art completely, leaving all underlying gameplay geometry intact.
 v130aTileField(r.x,r.y,r.w,r.h,V130A_PAL.floorA,V130A_PAL.floorB,16);

 // Top wall with Pokemon/GBC-style depth.
 v130aRect(r.x,r.y,r.w,14,V130A_PAL.ink);
 v130aRect(r.x+4,r.y+4,r.w-8,6,V130A_PAL.light);
 v130aRect(r.x,r.y+14,10,r.h-14,V130A_PAL.ink);
 v130aRect(r.x+4,r.y+18,6,r.h-26,V130A_PAL.dark);
 v130aRect(r.x,r.y+r.h-12,r.w,12,V130A_PAL.ink);
 v130aRect(r.x+8,r.y+r.h-12,r.w-16,4,V130A_PAL.dark);

 // Right wall, with a clear door into the corridor.
 const doorY=804,doorH=58;
 v130aRect(r.x+r.w-10,r.y,10,doorY-r.y,V130A_PAL.ink);
 v130aRect(r.x+r.w-10,doorY+doorH,10,r.y+r.h-(doorY+doorH),V130A_PAL.ink);
 v130aRect(r.x+r.w-5,doorY,5,doorH,V130A_PAL.woodDark);
 v130aRect(r.x+r.w-12,doorY-4,12,4,V130A_PAL.light);
 v130aRect(r.x+r.w-12,doorY+doorH,12,4,V130A_PAL.light);

 // Two existing GOLD workstations, restyled rather than moved.
 v130aDrawDesk(84,795,132,"IT-01");
 v130aDrawDesk(84,865,132,"IT-02");

 // Small IT cabinet / equipment shelf, kept outside the desk collision lanes.
 v130aRect(42,758,30,65,V130A_PAL.ink);
 v130aRect(46,762,22,57,V130A_PAL.metal);
 for(let yy=768;yy<813;yy+=11){
   v130aRect(50,yy,14,6,V130A_PAL.deep);
   v130aRect(52,yy+2,2,2,(yy%22===0)?V130A_PAL.glow:V130A_PAL.mid);
 }
 // Wall decoration and cable status lights.
 v130aRect(126,750,72,14,V130A_PAL.ink);
 v130aRect(130,754,64,6,V130A_PAL.deep);
 for(let xx=134;xx<190;xx+=12)v130aRect(xx,756,4,2,V130A_PAL.glow);

 // Tile edge just inside the room.
 v130aOutline(r.x+10,r.y+14,r.w-20,r.h-26,"rgba(23,32,24,.32)",2);
}

function v130aDrawITLabel(r){
 const x=r.x+16,y=r.y+17,w=112,h=22;
 v130aRect(x,y,w,h,V130A_PAL.ink);
 v130aRect(x+3,y+3,w-6,h-6,V130A_PAL.light);
 g.fillStyle=V130A_PAL.ink;g.font="bold 11px monospace";g.textAlign="left";
 g.fillText("REPARTO IT",x+10,y+15);
}

function v130aMotion(key,obj){
 const prev=V130A_MOTION.get(key)||{x:obj.x,y:obj.y,dir:"down",moving:false};
 const dx=obj.x-prev.x,dy=obj.y-prev.y;
 let dir=prev.dir,moving=Math.hypot(dx,dy)>.25;
 if(moving){
   if(Math.abs(dx)>Math.abs(dy))dir=dx>0?"right":"left";
   else dir=dy>0?"down":"up";
 }
 V130A_MOTION.set(key,{x:obj.x,y:obj.y,dir,moving});
 return {dir,moving,step:moving?Math.floor(performance.now()/170)%2:0};
}

function v130aDrawHeroSprite(obj,kind){
 if(!obj)return;
 const key=kind==="player"?"__player__":String(obj.id||kind);
 const motion=v130aMotion(key,obj);
 const dir=motion.dir,walk=motion.step;
 const S=2;
 const x=v130aSnap(obj.x),y=v130aSnap(obj.y);
 const femalePlayer=kind==="player"&&typeof V130B2_PROFILE!=="undefined"&&V130B2_PROFILE.gender==="female";
 const pal=kind==="player"
   ?{hair:femalePlayer?"#33221f":"#2b211c",skin:"#c89e79",shirt:femalePlayer?"#69526b":"#355544",pants:"#2b3730",shoe:"#172018",glass:"#172018",beard:"#3b2921"}
   :{hair:"#d8d7bd",skin:"#cba47f",shirt:"#5b6870",pants:"#354047",shoe:"#172018",glass:"#172018",beard:"#7f806e"};

 function p(ix,iy,iw,ih,c){v130aRect(x+(ix-6)*S,y+(iy-15)*S,iw*S,ih*S,c)}
 // shadow
 v130aRect(x-11,y+10,22,5,"rgba(0,0,0,.32)");

 if(dir==="up"){
   p(2,0,8,3,pal.hair);p(1,2,10,7,pal.hair);
   if(kind==="player"){
     p(1,7,2,femalePlayer?6:4,pal.hair);p(9,7,2,femalePlayer?6:4,pal.hair);
   }
   p(2,8,8,4,pal.shirt);
 }else if(dir==="left"||dir==="right"){
   const faceRight=dir==="right";
   const backHairX=faceRight?1:8;
   const faceX=faceRight?7:2;
   p(2,0,8,3,pal.hair);
   p(1,2,9,7,pal.skin);
   // Hair belongs on the BACK of the head, opposite to movement direction.
   p(backHairX,2,3,8,pal.hair);
   if(kind==="player")p(backHairX,7,3,femalePlayer?6:4,pal.hair);
   // Glasses / beard / nose are on the FACE side.
   p(faceX,4,2,1,pal.glass);
   if(kind==="player"&&!femalePlayer)p(faceX,7,2,2,pal.beard);
   p(faceRight?9:1,6,1,1,pal.skin);
   p(2,9,8,4,pal.shirt);
 }else{
   // front
   p(2,0,8,3,pal.hair);
   p(1,2,10,7,pal.skin);
   p(1,2,2,7,pal.hair);p(9,2,2,7,pal.hair);
   if(kind==="player"){
     p(1,6,2,femalePlayer?7:5,pal.hair);p(9,6,2,femalePlayer?7:5,pal.hair);
   }
   // two pixel glasses + bridge
   p(2,4,3,1,pal.glass);p(7,4,3,1,pal.glass);p(5,4,2,1,pal.glass);
   if(kind==="player"&&!femalePlayer){p(3,7,6,2,pal.beard);p(5,9,2,1,pal.beard)}
   p(2,9,8,4,pal.shirt);
   if(kind==="player"&&femalePlayer)p(3,11,6,1,"#d2c58b");
 }

 // arms, body, legs
 p(1,10,2,3,pal.skin);p(9,10,2,3,pal.skin);
 p(3,12,6,2,pal.shirt);
 const legA=walk?0:1,legB=walk?1:0;
 p(3,14,2,2+legA,pal.pants);p(7,14,2,2+legB,pal.pants);
 p(3,16+legA,2,1,pal.shoe);p(7,16+legB,2,1,pal.shoe);

 // hard outline accents evoke a sprite sheet rather than vector art.
 v130aRect(x-8,y-30,16,2,V130A_PAL.ink);
}


/* ============================================================
   1.0.30A.1 — ROOMS + VISITOR PROOF
   Extends the visual vertical slice to HR and Reception.
   Gameplay geometry/collision remains 1.0.29.4 GOLD.
   ============================================================ */

const V130A1_PAL={
 warmFloorA:"#9b986c",
 warmFloorB:"#8b895f",
 receptionA:"#8b9870",
 receptionB:"#7f8d66",
 wall:"#263329",
 wallTop:"#b9c78b",
 carpet:"#6f7656",
 blond:"#d8c36f",
 brunette:"#2c201c",
 bettyStripeA:"#d3d7aa",
 bettyStripeB:"#4e6650",
 ziaShirt:"#75617a",
 visitorShirt:"#607c72",
 box:"#9b7043",
 boxLight:"#c3995e",
 roadVan:"#d0d3b1",
 roadVanDark:"#59675d",
 window:"#7fa4a0"
};

function v130a1DrawRoomLabel(r,text){
 const tx=String(text||r.name);
 const w=Math.min(r.w-28,Math.max(62,tx.length*8+22));
 const x=r.x+16,y=r.y+17;
 v130aRect(x,y,w,22,V130A_PAL.ink);
 v130aRect(x+3,y+3,w-6,16,V130A_PAL.light);
 g.fillStyle=V130A_PAL.ink;
 g.font="bold 10px monospace";
 g.textAlign="left";
 g.fillText(tx,x+9,y+15);
}

function v130a1DrawPlant(cx,cy){
 v130aRect(cx-7,cy,14,12,V130A_PAL.woodDark);
 v130aRect(cx-10,cy-9,8,10,V130A_PAL.dark);
 v130aRect(cx+2,cy-12,8,13,V130A_PAL.mid);
 v130aRect(cx-3,cy-16,6,14,V130A_PAL.light);
}

function v130a1DrawGuestChair(cx,cy){
 v130aRect(cx-11,cy-6,22,17,V130A_PAL.ink);
 v130aRect(cx-8,cy-3,16,9,V130A_PAL.metal);
 v130aRect(cx-8,cy+8,4,7,V130A_PAL.ink);
 v130aRect(cx+4,cy+8,4,7,V130A_PAL.ink);
}

function v130a1DrawHRRoom(){
 if(!V130A_PIXEL_FOUNDATION)return;
 const r=rooms.find(q=>q.name==="HR");if(!r)return;

 // Warm, quiet individual office.
 v130aTileField(r.x,r.y,r.w,r.h,V130A1_PAL.warmFloorA,V130A1_PAL.warmFloorB,16);

 // Walls / depth.
 v130aRect(r.x,r.y,r.w,14,V130A_PAL.ink);
 v130aRect(r.x+4,r.y+4,r.w-8,6,V130A1_PAL.wallTop);
 v130aRect(r.x,r.y+14,10,r.h-14,V130A_PAL.ink);
 v130aRect(r.x+r.w-10,r.y+14,10,r.h-14,V130A_PAL.ink);
 v130aRect(r.x,r.y+r.h-12,r.w,12,V130A_PAL.ink);

 // Existing GOLD desk footprint: visually restyled, not moved.
 const dx=82,dy=188,dw=135;
 v130aRect(dx,dy-8,dw,28,V130A_PAL.ink);
 v130aRect(dx+4,dy-5,dw-8,22,"#9a704d");
 v130aRect(dx+4,dy-5,dw-8,4,"#c09161");
 v130aDrawMonitor(dx+87,dy-23,true);
 v130aDrawKeyboard(dx+87,dy+2);

 // Guest chair opposite Betty: visual proof only; final map will give it a real seat node.
 v130a1DrawGuestChair(154,235);

 // HR identity details.
 v130aRect(48,104,58,54,V130A_PAL.ink);
 v130aRect(52,108,50,46,"#586550");
 for(let yy=114;yy<148;yy+=11)v130aRect(57,yy,40,4,V130A_PAL.cream);

 v130a1DrawPlant(240,226);
 v130aRect(190,88,60,30,V130A_PAL.ink);
 v130aRect(194,92,52,22,"#879b73");
 v130aRect(202,99,36,3,V130A_PAL.cream);
 v130aRect(210,106,20,3,V130A_PAL.cream);

 v130aOutline(r.x+10,r.y+14,r.w-20,r.h-26,"rgba(23,32,24,.30)",2);
}

function v130a1DrawReceptionRoom(){
 if(!V130A_PIXEL_FOUNDATION)return;
 const r=rooms.find(q=>q.name==="INGRESSO / SEGRETERIA");if(!r)return;

 v130aTileField(r.x,r.y,r.w,r.h,V130A1_PAL.receptionA,V130A1_PAL.receptionB,16);

 v130aRect(r.x,r.y,r.w,12,V130A_PAL.ink);
 v130aRect(r.x+4,r.y+4,r.w-8,5,V130A1_PAL.wallTop);
 v130aRect(r.x,r.y,10,r.h,V130A_PAL.ink);
 v130aRect(r.x+r.w-10,r.y,10,r.h,V130A_PAL.ink);

 // B1.3: visual door EXACTLY aligned to the real door/collision lane.
 const doorX=635,doorW=120,wallY=r.y+r.h-12;
 v130aRect(r.x,wallY,doorX-r.x,12,V130A_PAL.ink);
 v130aRect(doorX+doorW,wallY,Math.max(0,r.x+r.w-(doorX+doorW)),12,V130A_PAL.ink);
 v130aRect(doorX-5,wallY-30,5,34,V130A_PAL.ink);
 v130aRect(doorX+doorW,wallY-30,5,34,V130A_PAL.ink);
 v130aRect(doorX,wallY-30,doorW,5,V130A_PAL.ink);
 v130aRect(doorX,wallY,doorW,5,V130A1_PAL.window);
 v130aRect(doorX+doorW/2-2,wallY-29,4,34,V130A_PAL.ink);
 v130aRect(doorX+5,wallY-25,doorW/2-10,23,"rgba(127,164,160,.55)");
 v130aRect(doorX+doorW/2+5,wallY-25,doorW/2-10,23,"rgba(127,164,160,.55)");

 // PACCHI: moved to the upper-left wall, completely outside the entrance lane.
 const px=430,py=748,pw=66,ph=67;
 v130aRect(px,py,pw,ph,"rgba(23,32,24,.34)");
 v130aOutline(px,py,pw,ph,V130A_PAL.cream,2);
 v130aRect(px+6,py+5,pw-12,ph-15,"rgba(61,70,55,.60)");
 for(let yy=py+18;yy<py+ph-16;yy+=14)v130aRect(px+7,yy,pw-14,3,V130A_PAL.woodDark);
 const boxes=[[px+10,py+9,18,11],[px+35,py+9,20,11],[px+12,py+25,16,10],[px+35,py+25,20,10]];
 for(const [bx,by,bw,bh] of boxes){
   v130aRect(bx,by,bw,bh,V130A1_PAL.box);
   v130aRect(bx+4,by+2,6,2,V130A1_PAL.boxLight);
 }
 g.fillStyle=V130A_PAL.cream;g.font="bold 7px monospace";g.textAlign="center";
 g.fillText("PACCHI",px+pw/2,py+ph-5);g.textAlign="left";

 // Waiting seats sit below the shelf, still left of the traffic lane.
 v130a1DrawGuestChair(455,835);
 v130a1DrawGuestChair(490,835);
 v130a1DrawPlant(420,842);

 // Reception desk moved left. Its collision box is now aligned to this drawing.
 const dx=515,dy=775,dw=110;
 v130aRect(dx,dy-8,dw,29,V130A_PAL.ink);
 v130aRect(dx+4,dy-5,dw-8,22,V130A_PAL.wood);
 v130aRect(dx+4,dy-5,dw-8,4,"#b18458");
 v130aDrawMonitor(dx+72,dy-23,true);
 v130aRect(dx+12,dy-2,22,8,V130A_PAL.cream);
 v130aRect(dx+40,dy-1,11,6,V130A_PAL.metal);

 // Clear traffic lane: OUTSIDE -> SEGRETERIA -> top corridor.
 v130aRect(635,742,112,7,"rgba(217,221,169,.18)");
 v130aRect(690,748,5,103,"rgba(217,221,169,.18)");
 for(let yy=760;yy<846;yy+=24){
   v130aRect(686,yy,13,3,"rgba(232,226,171,.32)");
 }
 v130aOutline(r.x+10,r.y+12,r.w-20,r.h-24,"rgba(23,32,24,.28)",2);
}

function v130a1DrawPrincipalSprite(obj,kind){
 if(!obj)return;
 const motion=v130aMotion("principal:"+String(obj.id||kind),obj);
 const dir=motion.dir,walk=motion.step,S=2;
 const x=v130aSnap(obj.x),y=v130aSnap(obj.y);

 const pal=kind==="betty"
   ?{hair:V130A1_PAL.brunette,skin:"#c99f7d",shirtA:V130A1_PAL.bettyStripeA,shirtB:V130A1_PAL.bettyStripeB,pants:"#334038",shoe:"#172018"}
   :{hair:V130A1_PAL.blond,skin:"#cca27f",shirtA:V130A1_PAL.ziaShirt,shirtB:"#96809a",pants:"#3c4140",shoe:"#172018"};

 function p(ix,iy,iw,ih,c){v130aRect(x+(ix-6)*S,y+(iy-15)*S,iw*S,ih*S,c)}

 v130aRect(x-11,y+10,22,5,"rgba(0,0,0,.30)");

 if(dir==="up"){
   p(2,0,8,3,pal.hair);p(1,2,10,7,pal.hair);
 }else if(dir==="left"||dir==="right"){
   const faceRight=dir==="right";
   const backHairX=faceRight?1:8;
   p(2,0,8,3,pal.hair);
   p(1,2,9,7,pal.skin);
   p(backHairX,2,3,8,pal.hair);
   if(kind==="betty")p(backHairX,7,3,3,pal.hair);
   p(faceRight?9:1,6,1,1,pal.skin);
 }else{
   p(2,0,8,3,pal.hair);
   p(1,2,10,7,pal.skin);
   p(1,2,2,7,pal.hair);p(9,2,2,7,pal.hair);
   p(3,5,2,1,"#25201d");p(7,5,2,1,"#25201d");
   if(kind==="betty"){p(1,7,2,3,pal.hair);p(9,7,2,3,pal.hair)}
 }

 // Horizontal stripes are Betty's fixed visual signature.
 if(kind==="betty"){
   p(2,9,8,2,pal.shirtA);
   p(2,11,8,2,pal.shirtB);
   p(2,13,8,2,pal.shirtA);
 }else{
   p(2,9,8,6,pal.shirtA);
   p(3,11,6,2,pal.shirtB);
 }

 p(1,10,2,3,pal.skin);p(9,10,2,3,pal.skin);
 const legA=walk?0:1,legB=walk?1:0;
 p(3,15,2,2+legA,pal.pants);p(7,15,2,2+legB,pal.pants);
 p(3,17+legA,2,1,pal.shoe);p(7,17+legB,2,1,pal.shoe);
}



/* 1.0.30B5.7 — GENERIC GAME BOY NPC SPRITE */
function v130b57DrawGbcNpcSprite(obj,kind="ambient",carrying=false){
 if(!obj)return;
 const motion=v130aMotion("b57:"+String(obj.id||obj.name||kind),obj);
 const dir=motion.dir,walk=motion.step,S=2,x=v130aSnap(obj.x),y=v130aSnap(obj.y);
 const name=String(obj.name||kind||"").toUpperCase();
 let pal={skin:obj.skin||"#c89e7d",hair:obj.hair||"#2c2823",shirt:obj.shirt||"#5d6d65",shirt2:"#465850",pants:"#303a37",shoe:"#172018"};
 if(name.includes("CAPO"))pal={skin:"#c89d78",hair:"#67665d",shirt:"#4b514f",shirt2:"#747b72",pants:"#2d3532",shoe:"#171b18"};
 if(kind==="courier")pal={skin:"#9b7156",hair:"#33261f",shirt:"#61736a",shirt2:"#829087",pants:"#34413b",shoe:"#171b18"};
 const p=(ix,iy,iw,ih,c)=>v130aRect(x+(ix-6)*S,y+(iy-15)*S,iw*S,ih*S,c);
 v130aRect(x-11,y+10,22,5,"rgba(0,0,0,.30)");
 if(dir==="up"){p(2,0,8,3,pal.hair);p(1,2,10,6,pal.hair)}
 else if(dir==="left"||dir==="right"){
   const fr=dir==="right";p(2,0,8,3,pal.hair);p(1,2,10,7,pal.skin);
   p(fr?1:8,2,3,7,pal.hair);p(fr?9:1,6,1,1,pal.skin);
 }else{
   p(2,0,8,3,pal.hair);p(1,2,10,7,pal.skin);p(1,2,2,5,pal.hair);p(9,2,2,5,pal.hair);
   p(3,5,2,1,"#211b18");p(7,5,2,1,"#211b18");
 }
 p(2,9,8,3,pal.shirt);p(2,12,8,3,pal.shirt2);p(1,10,2,3,pal.skin);p(9,10,2,3,pal.skin);
 const a=walk?0:1,b=walk?1:0;
 p(3,15,2,2+a,pal.pants);p(7,15,2,2+b,pal.pants);p(3,17+a,2,1,pal.shoe);p(7,17+b,2,1,pal.shoe);
 if(carrying){
   v130aRect(x+9,y-2,15,13,V130A_PAL.ink);v130aRect(x+11,y,11,9,V130A1_PAL.box);v130aRect(x+16,y,2,9,V130A1_PAL.boxLight);
 }
}

function v130b52DrawSpecialNpcSprite(obj,kind){
 if(!obj)return;
 const motion=v130aMotion("special52:"+String(obj.id||kind),obj);
 const dir=motion.dir,walk=motion.step,S=2;
 const x=v130aSnap(obj.x),y=v130aSnap(obj.y);

 const pal=kind==="pao"
   ?{skin:"#c39b79",hair:"#443126",shirt:"#536f8b",shirt2:"#405a74",pants:"#303b3a",shoe:"#172018"}
   :{skin:"#8b5a3c",hair:"#17120f",shirt:"#566a51",shirt2:"#71856b",pants:"#303936",shoe:"#171b18"};

 function p(ix,iy,iw,ih,c){v130aRect(x+(ix-6)*S,y+(iy-15)*S,iw*S,ih*S,c)}
 v130aRect(x-11,y+10,22,5,"rgba(0,0,0,.30)");

 if(dir==="up"){
   p(2,0,8,3,pal.hair);p(1,2,10,7,pal.hair);
 }else if(dir==="left"||dir==="right"){
   const faceRight=dir==="right",backHairX=faceRight?1:8;
   p(2,0,8,3,pal.hair);p(1,2,9,7,pal.skin);p(backHairX,2,3,7,pal.hair);
   p(faceRight?9:1,6,1,1,pal.skin);
 }else{
   p(2,0,8,3,pal.hair);p(1,2,10,7,pal.skin);
   p(1,2,2,6,pal.hair);p(9,2,2,6,pal.hair);
   p(3,5,2,1,"#211b18");p(7,5,2,1,"#211b18");
 }

 // PAO: visibly taller and slimmer. DON: normal body with two-tone shirt.
 if(kind==="pao"){
   p(3,9,6,7,pal.shirt);
   p(4,11,4,2,pal.shirt2);
   p(2,10,1,4,pal.skin);p(9,10,1,4,pal.skin);
   const a=walk?0:1,b=walk?1:0;
   p(4,16,1,3+a,pal.pants);p(7,16,1,3+b,pal.pants);
   p(3,19+a,2,1,pal.shoe);p(7,19+b,2,1,pal.shoe);
 }else{
   p(2,9,8,3,pal.shirt);
   p(2,12,8,3,pal.shirt2);
   p(1,10,2,3,pal.skin);p(9,10,2,3,pal.skin);
   const a=walk?0:1,b=walk?1:0;
   p(3,15,2,2+a,pal.pants);p(7,15,2,2+b,pal.pants);
   p(3,17+a,2,1,pal.shoe);p(7,17+b,2,1,pal.shoe);
 }
}

/* ---------- Visitor / courier visual event ---------- */
const V130A1_DELIVERY={
 active:false,
 startedAt:0,
 manual:false
};

function v130a1StartDelivery(manual=false){
 V130A1_DELIVERY.active=true;
 V130A1_DELIVERY.startedAt=performance.now();
 V130A1_DELIVERY.manual=manual;
 if(manual&&typeof toast==="function")toast("DEMO VISITATORE // CAMION + CORRIERE");
}

function v130a1Ease(t){
 t=Math.max(0,Math.min(1,t));
 return t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
}
function v130a1Lerp(a,b,t){return a+(b-a)*t}

function v130a1DrawTruck(x,y){
 // B5.7 neutral Game Boy delivery van, no branding.
 v130aRect(x,y-30,108,31,V130A_PAL.ink);v130aRect(x+4,y-26,100,23,V130A1_PAL.roadVan);
 v130aRect(x+68,y-23,29,14,V130A_PAL.ink);v130aRect(x+71,y-20,23,9,V130A1_PAL.window);
 v130aRect(x+9,y-21,48,14,V130A1_PAL.roadVanDark);v130aRect(x+13,y-18,40,8,V130A1_PAL.roadVan);
 v130aRect(x+28,y-17,8,6,V130A1_PAL.boxLight);v130aRect(x+6,y-5,96,5,V130A_PAL.ink);
 v130aRect(x+15,y-3,21,9,V130A_PAL.ink);v130aRect(x+72,y-3,21,9,V130A_PAL.ink);
 v130aRect(x+20,y,11,5,V130A_PAL.metal);v130aRect(x+77,y,11,5,V130A_PAL.metal);
}

function v130a1DrawCourier(x,y,carrying){
 const proxy={id:"courier",name:"CORRIERE",x,y,skin:"#9b7156",hair:"#33261f",shirt:"#61736a"};
 v130b57DrawGbcNpcSprite(proxy,"courier",!!carrying);
}

function v130a1DrawVisitorDelivery(){
 if(!V130A1_DELIVERY.active)return;
 const sec=(performance.now()-V130A1_DELIVERY.startedAt)/1000;

 // Sequence:
 // 0-3 van arrives, 3-4 stop, 4-8 courier enters,
 // 8-10 handoff, 10-14 courier returns, 14-17 van leaves.
 let truckX=680, courier=null, carrying=false;

 if(sec<3){
   truckX=v130a1Lerp(1580,680,v130a1Ease(sec/3));
 }else if(sec<14){
   truckX=680;
 }else if(sec<17){
   truckX=v130a1Lerp(680,-150,v130a1Ease((sec-14)/3));
 }else{
   V130A1_DELIVERY.active=false;
   return;
 }

 if(sec>=4&&sec<8){
   const t=v130a1Ease((sec-4)/4);
   courier={
     x:v130a1Lerp(730,650,t),
     y:v130a1Lerp(990,815,t)
   };
   carrying=true;
 }else if(sec>=8&&sec<10){
   courier={x:650,y:815};
   carrying=false;
   // handoff box near Zia / package pad
   v130aRect(684,805,18,14,V130A_PAL.ink);
   v130aRect(686,807,14,10,V130A1_PAL.box);
   v130aRect(692,807,2,10,V130A1_PAL.boxLight);
 }else if(sec>=10&&sec<14){
   const t=v130a1Ease((sec-10)/4);
   courier={
     x:v130a1Lerp(650,730,t),
     y:v130a1Lerp(815,990,t)
   };
 }

 v130a1DrawTruck(truckX,1028);
 if(courier)v130a1DrawCourier(courier.x,courier.y,carrying);
}


/* ============================================================
   1.0.30A.2 — SERVER / MAGAZZINO IT RESTYLE
   A = RICAMBI
   B = CARICO / SCARICO
   C = BANCO RIPARAZIONI
   Existing GOLD interaction coordinates are preserved.
   ============================================================ */

const V130A2_PAL={
 serverFloorA:"#59685f",
 serverFloorB:"#526158",
 rack:"#151d1a",
 rackEdge:"#8a9c8f",
 led:"#91e56e",
 ledWarn:"#e2ba5c",
 shelf:"#4b554e",
 shelfEdge:"#9aab94",
 boxA:"#9b7043",
 boxB:"#6e826f",
 boxC:"#5c7684",
 boxD:"#a06e4c",
 bench:"#7c5738",
 benchTop:"#b0845b",
 zoneA:"#8fb875",
 zoneB:"#e5c95d",
 zoneC:"#85b8b3",
 hazardDark:"#554b26",
 screen:"#7fa8a5"
};

function v130a2ZoneBadge(x,y,letter,text,color,w=118){
 v130aRect(x,y,w,18,V130A_PAL.ink);
 v130aRect(x+3,y+3,22,12,color);
 g.fillStyle=V130A_PAL.ink;g.font="bold 10px monospace";g.textAlign="center";
 g.fillText(letter,x+14,y+13);
 g.fillStyle=V130A_PAL.cream;g.textAlign="left";
 g.fillText(text,x+31,y+13);
}

function v130a2DrawShelf(x,y,w,h){
 v130aRect(x,y,w,h,V130A_PAL.ink);
 v130aRect(x+4,y+4,w-8,h-8,V130A2_PAL.shelf);
 for(let yy=y+20;yy<y+h-6;yy+=18){
   v130aRect(x+5,yy,w-10,3,V130A2_PAL.shelfEdge);
 }
 // Pixel boxes / components.
 const cols=[
   V130A2_PAL.boxA,V130A2_PAL.boxB,V130A2_PAL.boxC,V130A2_PAL.boxD
 ];
 let row=0;
 for(let yy=y+8;yy<y+h-12;yy+=18){
   let xx=x+10;
   for(let i=0;i<5;i++){
     const bw=14+((i+row)%3)*4;
     v130aRect(xx,yy,bw,8,cols[(i+row)%cols.length]);
     v130aRect(xx+3,yy+2,5,2,V130A_PAL.cream);
     xx+=bw+6;
     if(xx>x+w-18)break;
   }
   row++;
 }
}

function v130a2DrawRack(x,y,w,h,id){
 v130aRect(x,y,w,h,V130A_PAL.ink);
 v130aRect(x+3,y+3,w-6,h-6,V130A2_PAL.rack);
 v130aOutline(x,y,w,h,V130A2_PAL.rackEdge,2);

 for(let yy=y+8;yy<y+h-7;yy+=10){
   v130aRect(x+6,yy,w-12,6,"#222c28");
   v130aRect(x+9,yy+2,3,2,V130A2_PAL.led);
   v130aRect(x+15,yy+2,3,2,V130A2_PAL.ledWarn);
   v130aRect(x+w-15,yy+2,6,2,"#56645c");
 }
 g.fillStyle=V130A_PAL.cream;g.font="bold 6px monospace";g.textAlign="center";
 g.fillText(id,x+w/2,y-4);
 g.textAlign="left";
}

function v130a2DrawRepairBench(){
 const b=V123_SERVER_STORAGE.bench;

 // Bigger visual bench around the same GOLD interaction point.
 const x=b.x-18,y=b.y-3,w=b.w+35,h=39;
 v130aRect(x+4,y+5,w,h+9,V130A_PAL.ink);
 v130aRect(x,y,w,h,V130A2_PAL.bench);
 v130aRect(x,y,w,5,V130A2_PAL.benchTop);

 // Open PC / tools / diagnostic screen.
 v130aRect(x+12,y+10,31,20,V130A_PAL.ink);
 v130aRect(x+15,y+13,25,14,"#46544e");
 v130aRect(x+19,y+16,6,5,V130A2_PAL.screen);
 v130aRect(x+28,y+16,7,2,V130A2_PAL.led);

 for(let i=0;i<5;i++){
   v130aRect(x+57+i*12,y+12,3,12,i%2?V130A2_PAL.zoneC:V130A2_PAL.ledWarn);
 }
 v130aRect(x+w-35,y+9,23,17,V130A_PAL.ink);
 v130aRect(x+w-31,y+12,15,10,V130A2_PAL.screen);

 // Small legs.
 v130aRect(x+10,y+h,8,13,V130A_PAL.woodDark);
 v130aRect(x+w-18,y+h,8,13,V130A_PAL.woodDark);
}

function v130a2DrawLoadZone(){
 // Existing drop point is x535,y225. Keep it central to the marked zone.
 const x=565,y=197,w=132,h=50;

 // Dark pad.
 v130aRect(x,y,w,h,"rgba(36,39,31,.86)");
 v130aOutline(x,y,w,h,V130A2_PAL.zoneB,3);

 // Hazard pixels around the edge: highly readable but still GBC style.
 for(let xx=x+5;xx<x+w-7;xx+=14){
   v130aRect(xx,y+4,8,4,V130A2_PAL.zoneB);
   v130aRect(xx+7,y+4,6,4,V130A2_PAL.hazardDark);
   v130aRect(xx,y+h-8,8,4,V130A2_PAL.zoneB);
   v130aRect(xx+7,y+h-8,6,4,V130A2_PAL.hazardDark);
 }
 for(let yy=y+10;yy<y+h-10;yy+=12){
   v130aRect(x+4,yy,4,7,V130A2_PAL.zoneB);
   v130aRect(x+w-8,yy,4,7,V130A2_PAL.zoneB);
 }

 // Package / PC silhouettes show what the zone is for.
 v130aRect(x+18,y+17,19,15,V130A_PAL.ink);
 v130aRect(x+21,y+20,13,9,V130A2_PAL.boxA);
 v130aRect(x+27,y+20,2,9,V130A2_PAL.boxD);

 v130aRect(x+51,y+15,26,18,V130A_PAL.ink);
 v130aRect(x+55,y+18,18,11,V130A2_PAL.screen);
 v130aRect(x+62,y+30,5,4,V130A_PAL.ink);

 g.fillStyle=V130A2_PAL.zoneB;g.font="bold 8px monospace";g.textAlign="center";
 g.fillText("DEPOSITO IT",x+w-28,y+29);
 g.textAlign="left";
}

function v130a2DrawServerRoom(){
 if(!V130A_PIXEL_FOUNDATION)return;
 const r=rooms.find(q=>q.name==="SERVER");if(!r)return;

 // Technical tile floor.
 v130aTileField(r.x,r.y,r.w,r.h,V130A2_PAL.serverFloorA,V130A2_PAL.serverFloorB,16);

 // Heavy technical room walls.
 v130aRect(r.x,r.y,r.w,14,V130A_PAL.ink);
 v130aRect(r.x+4,r.y+4,r.w-8,6,V130A2_PAL.rackEdge);
 v130aRect(r.x,r.y+14,10,r.h-14,V130A_PAL.ink);
 v130aRect(r.x+r.w-10,r.y,10,125,V130A_PAL.ink);
 v130aRect(r.x+r.w-10,r.y+205,10,r.h-205,V130A_PAL.ink);

 // Bottom wall with two existing broad access gaps.
 const bottom=r.y+r.h-12;
 v130aRect(r.x,bottom,150,12,V130A_PAL.ink);
 v130aRect(540,bottom,170,12,V130A_PAL.ink);
 v130aRect(742,bottom,13,12,V130A_PAL.ink);

 // Door thresholds.
 v130aRect(450,bottom-4,90,4,V130A2_PAL.rackEdge);
 v130aRect(710,bottom-4,32,4,V130A2_PAL.rackEdge);
 v130aRect(r.x+r.w-10,180,10,25,V130A2_PAL.rackEdge);

 // Zone A / shelves. Existing pickup x440,y188 remains directly below these shelves.
 v130a2ZoneBadge(325,78,"A","RICAMBI",V130A2_PAL.zoneA,112);
 v130a2DrawShelf(325,104,205,72);

 // Category strip reinforces usability.
 const cats=[
   ["CAVI",329],["ADATT.",369],["ALIM.",418],["PERIF.",462]
 ];
 for(const [txt,xx] of cats){
   v130aRect(xx,181,42,12,V130A_PAL.ink);
   g.fillStyle=V130A_PAL.cream;g.font="bold 6px monospace";g.textAlign="center";
   g.fillText(txt,xx+21,189);
 }
 g.textAlign="left";

 // Racks, using the exact GOLD coordinates.
 v130a2DrawRack(590,108,34,72,"A");
 v130a2DrawRack(630,108,34,72,"B");
 v130a2DrawRack(670,108,34,72,"C");
 v130aRect(580,82,136,16,V130A_PAL.ink);
 g.fillStyle=V130A2_PAL.led;g.font="bold 8px monospace";g.textAlign="center";
 g.fillText("SERVER RACK",648,93);g.textAlign="left";

 // Zone C / repair bench.
 v130a2ZoneBadge(330,202,"C","RIPARAZIONI",V130A2_PAL.zoneC,125);
 v130a2DrawRepairBench();

 // Zone B / load-unload.
 v130a2ZoneBadge(565,178,"B","CARICO-SCARICO",V130A2_PAL.zoneB,132);
 v130a2DrawLoadZone();

 // Pixel floor guidance between the three gameplay zones.
 v130aRect(535,106,3,122,"rgba(207,218,190,.22)");
 v130aRect(547,106,3,122,"rgba(207,218,190,.10)");

 v130aOutline(r.x+10,r.y+14,r.w-20,r.h-26,"rgba(23,32,24,.35)",2);
}

function v130a2DrawServerLabel(r){
 const x=r.x+16,y=r.y+17,w=205,h=22;
 v130aRect(x,y,w,h,V130A_PAL.ink);
 v130aRect(x+3,y+3,w-6,h-6,V130A2_PAL.rackEdge);
 g.fillStyle=V130A_PAL.ink;g.font="bold 10px monospace";g.textAlign="left";
 g.fillText("SERVER / MAGAZZINO IT",x+9,y+15);
}


/* ============================================================
   1.0.30A.3 — FIXED EXTERIOR
   Building facade + entrance + sidewalk + street.
   Visual layer only, GOLD geometry remains the collision authority.
   ============================================================ */

const V130A3_EXT={
 facade:"#32362f",
 facadeTop:"#9aa486",
 facadeDark:"#1c221d",
 glass:"#789a98",
 glassDark:"#415c5b",
 pavementA:"#bbb7a2",
 pavementB:"#aaa591",
 curb:"#d8d3b8",
 road:"#272f2d",
 roadLine:"#d1c48a",
 roadEdge:"#161c1a",
 bollard:"#59645c"
};

function v130a3DrawFacade(){
 if(!V130A_PIXEL_FOUNDATION)return;

 const fy=872,fh=36;
 // Full-width facade: no black gap at left/right edges.
 v130aRect(0,fy,W,fh,V130A3_EXT.facadeDark);
 v130aRect(0,fy+4,W,28,V130A3_EXT.facade);
 v130aRect(0,fy+4,W,5,V130A3_EXT.facadeTop);

 for(let x=25;x<W;x+=92){
   v130aRect(x,fy+9,5,22,V130A3_EXT.facadeDark);
 }

 const doorX=635,doorW=120;
 v130aRect(doorX-7,fy-36,doorW+14,72,V130A_PAL.ink);
 v130aRect(doorX,fy-31,doorW,62,V130A3_EXT.glassDark);
 v130aRect(doorX+5,fy-26,doorW/2-10,52,"rgba(120,154,152,.74)");
 v130aRect(doorX+doorW/2+5,fy-26,doorW/2-10,52,"rgba(120,154,152,.74)");
 v130aRect(doorX+doorW/2-2,fy-31,4,62,V130A_PAL.ink);
 v130aRect(doorX+18,fy-1,8,3,V130A_PAL.cream);
 v130aRect(doorX+doorW-26,fy-1,8,3,V130A_PAL.cream);

 v130aRect(doorX-15,fy-50,doorW+30,14,V130A_PAL.ink);
 v130aRect(doorX-11,fy-47,doorW+22,8,V130A3_EXT.facadeTop);
 g.fillStyle=V130A_PAL.ink;g.font="bold 7px monospace";g.textAlign="center";
 g.fillText("INGRESSO STUDIO",doorX+doorW/2,fy-41);
 g.textAlign="left";
}

function v130a3DrawSidewalkAndRoad(){
 if(!V130A_PIXEL_FOUNDATION)return;

 const sy=908,sh=83;
 v130aTileField(0,sy,W,sh,V130A3_EXT.pavementA,V130A3_EXT.pavementB,24);

 for(let x=0;x<W;x+=76)
   v130aRect(x,sy,2,sh,"rgba(85,82,70,.18)");

 v130aRect(0,sy+sh-8,W,8,V130A3_EXT.curb);
 v130aRect(0,sy+sh,W,5,V130A3_EXT.roadEdge);

 v130aRect(630,sy+3,130,30,V130A_PAL.ink);
 v130aRect(635,sy+7,120,22,"#59645b");
 for(let xx=640;xx<750;xx+=12)v130aRect(xx,sy+10,5,16,"#768075");

 const ry=996,rh=82;
 v130aRect(0,ry,W,rh,V130A3_EXT.road);

 for(let x=20;x<W;x+=70){
   v130aRect(x,ry+17+(x%3)*7,18,2,"rgba(110,120,111,.13)");
 }

 for(let x=40;x<W;x+=180)
   v130aRect(x,ry+38,78,4,V130A3_EXT.roadLine);

 for(const bx of [610,785]){
   v130aRect(bx,sy+55,8,21,V130A_PAL.ink);
   v130aRect(bx+2,sy+57,4,17,V130A3_EXT.bollard);
 }
}

function v130a3DrawExterior(){
 if(!V130A_PIXEL_FOUNDATION)return;
 v130a3DrawFacade();
 v130a3DrawSidewalkAndRoad();
}


/* ============================================================
   1.0.30A.4 — FULL STUDIO RESTYLE
   Visual conversion of every remaining room.
   GOLD coordinates, collision rectangles and pathfinding unchanged.
   ============================================================ */

const V130A4_PAL={
 stoneA:"#69766a", stoneB:"#627063",
 woodA:"#76604b", woodB:"#6d5744",
 meetA:"#6f735b", meetB:"#666a52",
 techA:"#566762", techB:"#50605b",
 kitchenA:"#687269", kitchenB:"#606a61",
 bathA:"#64716d", bathB:"#5c6965",
 wall:"#18201c", wallTop:"#b0bc91",
 desk:"#8a603e", deskTop:"#b4865a",
 chair:"#3e4943", chairLight:"#657168",
 screen:"#759ea1", screenGlow:"#9fc1b8",
 accent:"#d6d7a5", green:"#94c16f",
 gold:"#d9bc58", purple:"#7d6b91",
 red:"#9a5a4f", blue:"#638293"
};

function v130a4RoomFloor(r,a,b){
 v130aTileField(r.x,r.y,r.w,r.h,a,b,16);
 v130aRect(r.x,r.y,r.w,13,V130A4_PAL.wall);
 v130aRect(r.x+4,r.y+4,r.w-8,5,V130A4_PAL.wallTop);
 v130aRect(r.x,r.y+13,9,r.h-13,V130A4_PAL.wall);
 v130aRect(r.x+r.w-9,r.y+13,9,r.h-13,V130A4_PAL.wall);
 v130aRect(r.x,r.y+r.h-10,r.w,10,V130A4_PAL.wall);
 v130aOutline(r.x+9,r.y+13,r.w-18,r.h-23,"rgba(20,27,22,.28)",2);
}

function v130a4DrawRoomLabel(r){
 let text=r.name;
 if(text==="SALA MEET CAPO")text="SALA MEET CAPO";
 const w=Math.min(r.w-28,Math.max(70,text.length*8+23));
 const x=r.x+15,y=r.y+16;
 v130aRect(x,y,w,22,V130A_PAL.ink);
 v130aRect(x+3,y+3,w-6,16,V130A4_PAL.wallTop);
 g.fillStyle=V130A_PAL.ink;g.font="bold 10px monospace";g.textAlign="left";
 g.fillText(text,x+9,y+15);
}

function v130a4Chair(x,y,dir="down"){
 v130aRect(x-10,y-7,20,16,V130A_PAL.ink);
 v130aRect(x-7,y-4,14,9,V130A4_PAL.chair);
 if(dir==="up")v130aRect(x-7,y-9,14,4,V130A4_PAL.chairLight);
 else v130aRect(x-7,y+5,14,4,V130A4_PAL.chairLight);
}

function v130a4Desk(x,y,w,monitors=2){
 v130aRect(x,y,w,27,V130A_PAL.ink);
 v130aRect(x+4,y+3,w-8,20,V130A4_PAL.desk);
 v130aRect(x+4,y+3,w-8,4,V130A4_PAL.deskTop);
 for(let i=0;i<monitors;i++){
   const mx=x+20+(i*(w-40)/Math.max(1,monitors-1));
   v130aRect(mx-11,y-18,22,15,V130A_PAL.ink);
   v130aRect(mx-8,y-15,16,9,V130A4_PAL.screen);
   v130aRect(mx-2,y-4,4,6,V130A_PAL.ink);
 }
}

function v130a4WorkstationStrip(x,y,w,count){
 v130a4Desk(x,y,w,count);
 const step=w/count;
 for(let i=0;i<count;i++){
   const cx=x+step*(i+.5);
   v130aRect(cx-9,y+9,18,4,"#252d29");
   v130a4Chair(cx,y+43,"up");
 }
}

function v130a4Screen(x,y,w=55,h=30){
 v130aRect(x,y,w,h,V130A_PAL.ink);
 v130aRect(x+4,y+4,w-8,h-8,V130A4_PAL.screen);
 v130aRect(x+w/2-3,y+h,6,9,V130A_PAL.ink);
}

function v130a4Plant(x,y){
 v130aRect(x-7,y,14,11,V130A_PAL.woodDark);
 v130aRect(x-9,y-11,8,12,"#47654b");
 v130aRect(x+1,y-15,9,16,"#5b7b55");
 v130aRect(x-3,y-18,6,14,V130A4_PAL.green);
}

/* -------------------- EDITORIA -------------------- */
function v130a4DrawEditoria(){
 const r=rooms.find(q=>q.name==="EDITORIA");if(!r)return;
 v130a4RoomFloor(r,V130A4_PAL.stoneA,V130A4_PAL.stoneB);

 // Four stations, visually separated into two pairs.
 v130a4Desk(52,365,166,2);
 v130a4Chair(95,414,"up");v130a4Chair(174,414,"up");
 v130aRect(48,452,176,10,"rgba(25,31,27,.35)");
 v130aRect(62,458,56,19,V130A_PAL.ink);
 v130aRect(65,461,50,13,"#596a61");
 v130aRect(144,458,65,19,V130A_PAL.ink);
 v130aRect(147,461,59,13,"#596a61");
}

/* -------------------- BIM -------------------- */
function v130a4DrawBIM(){
 const r=rooms.find(q=>q.name==="BIM");if(!r)return;
 v130a4RoomFloor(r,V130A4_PAL.techA,V130A4_PAL.techB);

 v130a4Desk(53,585,166,2);
 v130a4Chair(96,631,"up");v130a4Chair(176,631,"up");
 v130a4Desk(53,650,166,2);
 v130a4Chair(96,696,"up");v130a4Chair(176,696,"up");

 // BIM identity: plan board.
 v130aRect(45,553,73,22,V130A_PAL.ink);
 v130aRect(49,557,65,14,"#8ca69b");
 for(let xx=54;xx<108;xx+=13)v130aRect(xx,561,2,7,"#536b65");
}

/* -------------------- CENTRALE -------------------- */
function v130a4DrawCentrale(){
 const r=rooms.find(q=>q.name==="CENTRALE");if(!r)return;
 v130a4RoomFloor(r,V130A4_PAL.stoneA,V130A4_PAL.stoneB);

 // Current GOLD geometry has two long islands. We visually turn each into
 // six clearly readable individual workstation bays.
 const x=345,w=390;
 v130a4WorkstationStrip(x,385,w,6);
 v130a4WorkstationStrip(x,505,w,6);

 // Dividers make the 12 positions readable instead of a single giant desk.
 for(const yy of [385,505]){
   for(let i=1;i<6;i++){
     const xx=x+(w/6)*i;
     v130aRect(xx-1,yy+5,2,17,"#c0b18b");
   }
 }
 // Small shared pin-board.
 v130aRect(483,577,115,29,V130A_PAL.ink);
 v130aRect(488,582,105,19,"#7b8068");
 for(let i=0;i<5;i++)v130aRect(496+i*19,588,10,5,i%2?V130A4_PAL.gold:V130A4_PAL.blue);
}

/* -------------------- INTERIOR -------------------- */
function v130a4DrawInterior(){
 const r=rooms.find(q=>q.name==="INTERIOR");if(!r)return;
 v130a4RoomFloor(r,V130A4_PAL.woodA,V130A4_PAL.woodB);

 v130a4Desk(1065,150,140,2);
 v130a4Chair(1100,197,"up");v130a4Chair(1170,197,"up");
 v130a4Desk(1065,235,140,2);
 v130a4Chair(1100,282,"up");v130a4Chair(1170,282,"up");

 // Material samples.
 for(let i=0;i<5;i++)v130aRect(1070+i*25,105,18,16,[V130A4_PAL.red,V130A4_PAL.gold,V130A4_PAL.green,V130A4_PAL.blue,V130A4_PAL.purple][i]);
}

/* -------------------- RENDERISTI -------------------- */
function v130a4DrawRenderisti(){
 const r=rooms.find(q=>q.name==="RENDERISTI");if(!r)return;
 v130a4RoomFloor(r,"#615b50","#595348");

 v130a4Desk(1260,150,170,2);
 v130a4Chair(1303,197,"up");v130a4Chair(1387,197,"up");
 v130a4Desk(1260,235,170,2);
 v130a4Chair(1303,282,"up");v130a4Chair(1387,282,"up");

 // Render wall: two wide screens.
 v130a4Screen(1260,92,72,34);v130a4Screen(1345,92,72,34);
}

/* -------------------- SALA MEET -------------------- */
function v130a4DrawSalaMeet(){
 const r=rooms.find(q=>q.name==="SALA MEET");if(!r)return;
 v130a4RoomFloor(r,V130A4_PAL.meetA,V130A4_PAL.meetB);

 v130a4Screen(895,92,80,36);
 const tx=870,ty=170,tw=132,th=70;
 v130aRect(tx,ty,tw,th,V130A_PAL.ink);
 v130aRect(tx+5,ty+5,tw-10,th-10,V130A4_PAL.desk);
 v130aRect(tx+5,ty+5,tw-10,5,V130A4_PAL.deskTop);

 // 6 seats, three per side.
 for(const cx of [892,936,980]){
   v130a4Chair(cx,156,"down");
   v130a4Chair(cx,255,"up");
 }
 // HDMI / camera bar.
 v130aRect(906,136,59,8,V130A_PAL.ink);
 v130aRect(910,138,51,4,V130A4_PAL.screenGlow);
}

/* -------------------- SPAZIO A -------------------- */
function v130a4DrawSpazioA(){
 const r=rooms.find(q=>q.name==="SPAZIO A");if(!r)return;
 v130a4RoomFloor(r,"#6d725e","#656a56");

 const tx=875,ty=423,tw=230,th=52;
 v130aRect(tx,ty,tw,th,V130A_PAL.ink);
 v130aRect(tx+5,ty+5,tw-10,th-10,V130A4_PAL.desk);
 v130aRect(tx+5,ty+5,tw-10,5,V130A4_PAL.deskTop);

 // 8 seats, four per side.
 for(const cx of [904,960,1018,1075]){
   v130a4Chair(cx,409,"down");
   v130a4Chair(cx,489,"up");
 }
 v130a4Screen(958,378,70,30);
 v130a4Plant(1105,520);
}

/* -------------------- SALA MEET CAPO -------------------- */
function v130a4DrawSalaCapo(){
 const r=rooms.find(q=>q.name==="SALA MEET CAPO");if(!r)return;
 v130a4RoomFloor(r,"#725947","#684f3f");

 v130a4Screen(1385,425,86,38);

 const tx=1330,ty=500,tw=200,th=65;
 v130aRect(tx,ty,tw,th,V130A_PAL.ink);
 v130aRect(tx+5,ty+5,tw-10,th-10,"#8a6548");
 v130aRect(tx+5,ty+5,tw-10,5,"#b58b62");

 for(const cx of [1365,1430,1495]){
   v130a4Chair(cx,485,"down");
   v130a4Chair(cx,580,"up");
 }
 // Distinguished head chair for CAPO.
 v130aRect(1417,590,27,23,V130A_PAL.ink);
 v130aRect(1421,594,19,15,"#6f4e42");

 v130a4Plant(1315,645);v130a4Plant(1540,645);
}

/* -------------------- CUCINA -------------------- */
function v130a4DrawCucina(){
 const r=rooms.find(q=>q.name==="CUCINA");if(!r)return;
 v130a4RoomFloor(r,V130A4_PAL.kitchenA,V130A4_PAL.kitchenB);

 // Service counter with fridge/microwave/coffee.
 v130aRect(830,790,285,31,V130A_PAL.ink);
 v130aRect(835,794,275,22,"#76765d");
 v130aRect(842,798,36,15,"#8e9b8f"); // sink
 v130aRect(890,797,37,17,V130A_PAL.ink);v130aRect(894,801,29,9,V130A4_PAL.screen); // microwave
 v130aRect(946,798,24,17,V130A_PAL.ink);v130aRect(952,801,12,10,"#83735a"); // coffee
 v130aRect(993,793,45,25,"#555f59");v130aRect(999,798,33,14,"#8b9d94"); // fridge-ish
 v130aRect(1050,798,53,17,V130A_PAL.ink);v130aRect(1055,802,43,9,V130A4_PAL.accent);

 // Two dining tables: 12 real visual seats.
 for(const ty of [840,900]){
   v130aRect(845,ty,245,27,V130A_PAL.ink);
   v130aRect(850,ty+4,235,19,V130A4_PAL.desk);
   for(const cx of [875,918,961,1004,1047,1075])v130a4Chair(cx,ty+38,"up");
 }
 // Four counter stools -> 16 total visual seats.
 for(const cx of [855,915,975,1035])v130a4Chair(cx,829,"up");
}

/* -------------------- BAGNI -------------------- */
function v130a4DrawBagni(){
 const r=rooms.find(q=>q.name==="BAGNI");if(!r)return;
 v130a4RoomFloor(r,V130A4_PAL.bathA,V130A4_PAL.bathB);

 // Two stalls.
 for(const x of [865,935]){
   v130aRect(x,602,54,66,V130A_PAL.ink);
   v130aRect(x+5,607,44,56,"#6f7567");
   v130aRect(x+10,615,34,40,"#59645e");
   v130aRect(x+39,632,4,4,V130A4_PAL.gold);
 }
 // Shared sink / mirror.
 v130aRect(885,575,90,17,V130A_PAL.ink);
 v130aRect(891,579,78,9,"#8e9d94");
 v130aRect(900,566,60,8,V130A4_PAL.screen);
}

/* -------------------- RIFUGIO DIGITALE -------------------- */
function v130a4DrawRifugio(){
 const r=rooms.find(q=>q.name==="RIFUGIO DIGITALE");if(!r)return;
 v130a4RoomFloor(r,V130A4_PAL.techA,V130A4_PAL.techB);

 // Two media / PIXERA workstations.
 v130aRect(1060,604,62,40,V130A_PAL.ink);
 v130aRect(1065,609,52,30,"#4a5550");
 v130a4Screen(1071,612,21,15);v130a4Screen(1095,612,21,15);

 v130aRect(1133,604,62,40,V130A_PAL.ink);
 v130aRect(1138,609,52,30,"#4a5550");
 v130a4Screen(1144,612,21,15);v130a4Screen(1168,612,21,15);

 // AV mini rack.
 v130aRect(1095,651,48,24,V130A_PAL.ink);
 for(let yy=656;yy<671;yy+=6){
   v130aRect(1100,yy,38,4,"#26322c");
   v130aRect(1104,yy+1,3,2,V130A4_PAL.green);
 }
}

/* -------------------- STAMPANTI -------------------- */
function v130a4DrawPrinterUnit(x,y,labelText){
 v130aRect(x,y,50,58,V130A_PAL.ink);
 v130aRect(x+6,y+6,38,17,"#e1e0ca");
 v130aRect(x+10,y+11,30,7,"#5c6a64");
 v130aRect(x+8,y+29,34,19,"#c6c7b4");
 v130aRect(x+15,y+35,20,5,V130A_PAL.ink);
 g.fillStyle=V130A4_PAL.accent;g.font="bold 6px monospace";g.textAlign="center";
 g.fillText(labelText,x+25,y+55);g.textAlign="left";
}
function v130a4DrawStampanti(){
 const r=rooms.find(q=>q.name==="STAMPANTI");if(!r)return;
 v130a4RoomFloor(r,"#5c6963","#55625d");

 // Long support bench.
 v130aRect(1175,870,225,25,V130A_PAL.ink);
 v130aRect(1180,874,215,17,V130A4_PAL.desk);

 v130a4DrawPrinterUnit(1190,795,"P1");
 v130a4DrawPrinterUnit(1260,795,"P2");
 v130a4DrawPrinterUnit(1330,795,"PLOT");

 // Queue floor nodes.
 for(const cx of [1215,1285,1355]){
   v130aOutline(cx-12,860,24,18,"rgba(214,215,165,.45)",2);
 }
}

/* -------------------- STAMPA 3D -------------------- */
function v130a4Draw3DPrinter(x,y){
 v130aRect(x,y,52,70,V130A_PAL.ink);
 v130aRect(x+5,y+5,42,54,"#6b7771");
 v130aRect(x+9,y+11,34,31,"rgba(99,130,147,.62)");
 v130aRect(x+14,y+18,24,3,V130A4_PAL.screenGlow);
 v130aRect(x+17,y+30,18,7,V130A4_PAL.purple);
 v130aRect(x+8,y+59,36,6,"#414b46");
}
function v130a4DrawStampa3D(){
 const r=rooms.find(q=>q.name==="STAMPA 3D");if(!r)return;
 v130a4RoomFloor(r,"#59655f","#525e58");

 v130a4Draw3DPrinter(1452,805);
 v130a4Draw3DPrinter(1512,805);

 // Control PC.
 v130aRect(1450,887,122,24,V130A_PAL.ink);
 v130aRect(1455,891,112,16,V130A4_PAL.desk);
 v130a4Screen(1490,858,43,25);
}

/* -------------------- ALL REMAINING ROOMS -------------------- */
function v130a4DrawRemainingRooms(){
 if(!V130A_PIXEL_FOUNDATION)return;
 v130a4DrawEditoria();
 v130a4DrawBIM();
 v130a4DrawCentrale();
 v130a4DrawSalaMeet();
 v130a4DrawInterior();
 v130a4DrawRenderisti();
 v130a4DrawSpazioA();
 v130a4DrawBagni();
 v130a4DrawRifugio();
 v130a4DrawSalaCapo();
 v130a4DrawCucina();
 v130a4DrawStampanti();
 v130a4DrawStampa3D();
}

function v130aDrawFoundation(){
 if(!V130A_PIXEL_FOUNDATION)return;
 v130aDrawITRoom();
 v130a1DrawHRRoom();
 v130a1DrawReceptionRoom();
 v130a2DrawServerRoom();
 v130a4DrawRemainingRooms();
}

window.addEventListener("keydown",e=>{
 if(e.key==="F6"){
   e.preventDefault();
   V130A_PIXEL_FOUNDATION=!V130A_PIXEL_FOUNDATION;
   if(typeof toast==="function")toast(`PIXEL FOUNDATION // ${V130A_PIXEL_FOUNDATION?"ON":"OFF"}`);
 }
 if(e.key==="F7"){
   e.preventDefault();
   v130a1StartDelivery(true);
 }
});



function v130b11DrawCorridorDecor(){
 if(!V130A_PIXEL_FOUNDATION)return;

 const plaques=[
   {x:275,y:705,t:"IT ←"},
   {x:770,y:405,t:"SALE ↑"},
   {x:1198,y:705,t:"CUCINA →"},
   {x:755,y:276,t:"SERVER ←"},
   {x:1220,y:386,t:"MEET →"}
 ];
 for(const p of plaques){
   v130aRect(p.x,p.y,58,15,"#19231d");
   v130aRect(p.x+2,p.y+2,54,11,"#8e9d78");
   g.fillStyle="#19231d";g.font="bold 7px monospace";g.textAlign="center";
   g.fillText(p.t,p.x+29,p.y+10);
 }
 g.textAlign="left";
}

function draw(){
 v117DrawDiag();
 if(debug)v111DrawPhysicalPoints();
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
 v130b11DrawCorridorDecor();
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
 v130aDrawFoundation();
 if(debug){g.save();g.fillStyle="rgba(255,65,65,.20)";g.strokeStyle="#ff4141";g.lineWidth=2;obstacles.forEach(o=>{g.fillRect(o.x,o.y,o.w,o.h);g.strokeRect(o.x,o.y,o.w,o.h)});g.restore()}
 if(!V130A_PIXEL_FOUNDATION){
   drawServerRacks();
   v123DrawServerWorkshop();
 }
 rooms.forEach(label);

 // V5.2: overlay solo per apparati speciali. Le workstation sono già disegnate nei mobili.
 if(!V130A_PIXEL_FOUNDATION){
   stations.filter(s=>["AV","PIXERA"].includes(s.type)).forEach(s=>{
     g.fillStyle="#151a18";g.fillRect(s.x-18,s.y-13,36,22);
     g.fillStyle=s.type==="PIXERA"?"#725b96":"#3d778e";g.fillRect(s.x-14,s.y-9,28,14);
   });
 }
 [...npcs,...(mokasa?[mokasa]:[])].forEach(n=>{
   const specialPixel=V130A_PIXEL_FOUNDATION&&["manager","hr","zia","pao","don","mokasa"].includes(n.id);
   if(V130A_PIXEL_FOUNDATION&&n.id==="manager")v130aDrawHeroSprite(n,"manager");
   else if(V130A_PIXEL_FOUNDATION&&n.id==="hr")v130a1DrawPrincipalSprite(n,"betty");
   else if(V130A_PIXEL_FOUNDATION&&n.id==="zia")v130a1DrawPrincipalSprite(n,"zia");
   else if(V130A_PIXEL_FOUNDATION&&n.id==="pao")v130b52DrawSpecialNpcSprite(n,"pao");
   else if(V130A_PIXEL_FOUNDATION&&n.id==="don")v130b52DrawSpecialNpcSprite(n,"don");
   else if(V130A_PIXEL_FOUNDATION)v130b57DrawGbcNpcSprite(n,n.id==="mokasa"?"capo":"ambient");
   else drawPixelPerson(n.x,n.y,n.shirt,n.skin||"#d0a887",n.hair||(n.tone==="bad"?"#3a1717":"#202522"));

   if(!specialPixel){
     g.fillStyle="#050706";g.fillRect(px(n.x)-30,px(n.y)-39,60,13);
     g.fillStyle=n.tone==="bad"?"#ff6262":n.tone==="good"?"#62e568":"#ffd447";
     g.font="bold 9px monospace";g.textAlign="center";g.fillText(n.name,px(n.x),px(n.y)-30);g.textAlign="left";
   }
 });
 // V2.7.2.1 — Living Office visible layer
 // NPC ambientali
 ambientNPCs.forEach(n=>{
   if(V130A_PIXEL_FOUNDATION)v130b57DrawGbcNpcSprite(n,"ambient");
   else drawPixelPerson(n.x,n.y,n.shirt,"#c89e7d","#202522");
   if(n.state!=="work"){g.fillStyle="#d8e1dc";g.font="bold 7px monospace";g.fillText(n.name,px(n.x)-9,px(n.y)-26)}
 });

 // Scaffale fisico IT SUPPLIES (legacy renderer hidden in pixel mode)
 if(!V130A_PIXEL_FOUNDATION){
   g.fillStyle="#4b3423";g.fillRect(78,605,145,18);
   g.fillStyle="#222a26";g.fillRect(82,578,137,27);
 }
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
 v130a3DrawExterior();
 v130a1DrawVisitorDelivery();

 // B5.4.1: the exterior floor is drawn after the normal NPC layer.
 // Re-render the Manager here during the arrival cinematic so the sidewalk
 // does not paint over his sprite.
 if(typeof V129_INTRO!=="undefined"&&V129_INTRO.phase==="managerArrival"){
   const introManager=npcs.find(n=>n&&n.id==="manager");
   if(introManager){
     if(V130A_PIXEL_FOUNDATION)v130aDrawHeroSprite(introManager,"manager");
     else drawPixelPerson(
       introManager.x,introManager.y,
       introManager.shirt||"#53665c",
       introManager.skin||"#d0a887",
       introManager.hair||"#ddd7c7"
     );
   }
 }


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

 // 1.0.23 precise marker lives in WORLD coordinates.
 v120DrawPhysicalMission();

 if(V130A_PIXEL_FOUNDATION)v130aDrawHeroSprite(player,"player");
 else drawPixelPerson(player.x,player.y,"#284f3a","#d0a887","#17231d");


 if(debug){drawV7Debug();v12c44DrawCollisionDebug();}v12c3DrawManagerRouteDebug();

 if(useCam)g.restore();
 drawMiniMap();
 if(useCam){
   const grad=g.createRadialGradient(W/2,H/2,Math.min(W,H)*.28,W/2,H/2,Math.max(W,H)*.60);
   grad.addColorStop(0,"rgba(0,0,0,0)");
   grad.addColorStop(1,"rgba(0,0,0,.48)");
   g.fillStyle=grad;g.fillRect(0,0,W,H);
 }
 
 v129DrawIntroOverlay();}


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
 if(typeof V130B43_STORY!=="undefined"&&V130B43_STORY.active&&(e.key==="Enter"||e.key==="e"||e.key==="E")){e.preventDefault();v130b43StoryAdvance();return}
 if(V122_DIALOG.active&&(e.key==="Enter"||e.key==="e"||e.key==="E")){e.preventDefault();v122Advance();return}
 if(window.__entranceDialogReady && (e.key==="Enter"||e.key.toLowerCase()==="e")){
   e.preventDefault();
   window.__entranceDialogReady=false;
   beginEntranceWalk();
   return;
 }
 const key=e.key.toLowerCase();
 if(e.key==="Tab"){
   e.preventDefault();
   if(!e.repeat)togglePDA();
   return
 }
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
addEventListener("keyup",e=>{
 keys[e.key.toLowerCase()]=0;
});
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
 if(problems.length)console.error("VERSIONE1ITSHIFT 1.0.29.4 LUNCH TRAFFIC FIX SELF TEST",problems);
 else console.log("VERSIONE1ITSHIFT 1.0.29.4 LUNCH TRAFFIC FIX SELF TEST // OK");
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

 const boot=document.getElementById("boot");
 const lore=document.getElementById("lore");
 if((boot&&boot.classList.contains("active"))||(lore&&lore.classList.contains("active")))return;

 if(state?.phase!=="shift")return;

 e.preventDefault();
 e.stopImmediatePropagation();

 if(k==="f"){
   v12c45Pickup();
   return;
 }

 // Old carry missions can use the dedicated Magazzino deposit.
 if(v125TryMagazzinoDeposit())return;

 // Studio events (including PACCHI) and normal carry missions use this.
 v12c45Deliver();
},true);


(function v118SelfTest(){
 const failures=[];
 if(typeof sideMessage!=="function")failures.push("sideMessage");
 if(typeof activityDestination!=="function")failures.push("activityDestination");
 if(typeof v118ValidPoint!=="function")failures.push("v118ValidPoint");
 const d=activityDestination({x:1,y:2,homeX:3,homeY:4,homeRoom:"TEST"},"wander");
 if(!v118ValidPoint(d))failures.push("activityDestination-result");
 if(failures.length)console.error("VERSIONE1ITSHIFT 1.0.29.4 LUNCH TRAFFIC FIX SELF TEST // FAIL",failures);
 else console.log("VERSIONE1ITSHIFT 1.0.29.4 LUNCH TRAFFIC FIX SELF TEST // OK");
})();


(function v119SelfTest(){
 const failures=[];
 if(typeof v119SafeDistanceTo!=="function")failures.push("v119SafeDistanceTo");
 if(v119SafeDistanceTo(null)!==9999)failures.push("safeDistance-null");
 if(!Number.isFinite(v119SafeDistanceTo({x:1,y:2})))failures.push("safeDistance-valid");
 if(failures.length)console.error("VERSIONE1ITSHIFT 1.0.29.4 LUNCH TRAFFIC FIX SELF TEST // FAIL",failures);
 else console.log("VERSIONE1ITSHIFT 1.0.29.4 LUNCH TRAFFIC FIX SELF TEST // OK");
})();

(function v120SelfTest(){
 const failures=[];
 if(typeof v120CarryState!=="function")failures.push("carry-state");
 if(typeof v120DrawPhysicalMission!=="function")failures.push("draw");
 if(typeof v120CarryHint!=="function")failures.push("hint");
 if(failures.length)console.error("VERSIONE1ITSHIFT 1.0.29.4 LUNCH TRAFFIC FIX SELF TEST // FAIL",failures);
 else console.log("VERSIONE1ITSHIFT 1.0.29.4 LUNCH TRAFFIC FIX SELF TEST // OK");
})();

(function v121SelfTest(){
 const failures=[];
 if(typeof v121SpecialNpcInteract!=="function")failures.push("special-interact");
 if(typeof v121DrawSpecialNpcBadge!=="function")failures.push("special-badge");
 if(typeof v121CanSpecial!=="function")failures.push("special-cooldown");
 if(failures.length)console.error("VERSIONE1ITSHIFT 1.0.29.4 LUNCH TRAFFIC FIX SELF TEST // FAIL",failures);
 else console.log("VERSIONE1ITSHIFT 1.0.29.4 LUNCH TRAFFIC FIX SELF TEST // OK");
})();
(function(){const f=[];["v122Say","v122Advance","v122SpecialCalls","v106SpecialRoamUpdate"].forEach(k=>{if(typeof globalThis[k]!=="function")f.push(k)});if(!document.getElementById("v122Dialogue"))f.push("dialog-dom");f.length?console.error("VERSIONE1ITSHIFT 1.0.29.4 LUNCH TRAFFIC FIX SELF TEST // FAIL",f):console.log("VERSIONE1ITSHIFT 1.0.29.4 LUNCH TRAFFIC FIX SELF TEST // OK")})();
(function v123SelfTest(){
 const fail=[];
 if(typeof v123DrawServerWorkshop!=="function")fail.push("server-workshop");
 if(typeof v123ServerWorkshopInteract!=="function")fail.push("server-workshop-interact");
 if(typeof v123TutorialTick!=="function")fail.push("tutorial");
 if(typeof v120DrawMissionPoint!=="function")fail.push("precise-marker");
 if(!V123_SERVER_STORAGE||!v118ValidPoint(V123_SERVER_STORAGE.pickup)||!v118ValidPoint(V123_SERVER_STORAGE.benchPoint))fail.push("server-points");
 if(fail.length)console.error("VERSIONE1ITSHIFT 1.0.29.4 LUNCH TRAFFIC FIX SELF TEST // FAIL",fail);
 else console.log("VERSIONE1ITSHIFT 1.0.29.4 LUNCH TRAFFIC FIX SELF TEST // OK");
})();

document.addEventListener("keydown",function v124DialogInputGuard(e){
 if(typeof V130B43_STORY!=="undefined"&&V130B43_STORY.active){
   if(e.code==="KeyE"||e.code==="Enter"){
     e.preventDefault();e.stopImmediatePropagation();
     v130b43StoryAdvance();
     return;
   }
   if(["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","KeyF","KeyG","Tab","KeyM"].includes(e.code)){
     e.preventDefault();e.stopImmediatePropagation();
   }
   return;
 }

 if(!dialogPause)return;
 if(e.code==="KeyE"||e.code==="Enter"){
   e.preventDefault();e.stopImmediatePropagation();
   v122Advance();
   return;
 }
 if(["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","KeyF","KeyG","Tab","KeyM"].includes(e.code)){
   e.preventDefault();e.stopImmediatePropagation();
 }
},true);

(function(){const f=[];if(typeof dialogPause==="undefined")f.push("dialogPause");if(typeof v124PortraitCode!=="function")f.push("portrait");if(typeof tryStudioEntrance!=="function")f.push("entrance");if(typeof v123DrawServerWorkshop!=="function")f.push("workshop");if(typeof v120DrawPhysicalMission!=="function")f.push("marker");if(f.length)console.error("VERSIONE1ITSHIFT 1.0.29.4 LUNCH TRAFFIC FIX SELF TEST // FAIL",f);else console.log("VERSIONE1ITSHIFT 1.0.29.4 LUNCH TRAFFIC FIX SELF TEST // OK")})();

(function v125SelfTest(){
 const fail=[];
 if(typeof v125ManagerServerRoutine!=="function")fail.push("manager-server");
 if(typeof v125TryMagazzinoDeposit!=="function")fail.push("magazzino-deposit");
 if(typeof v125RemoveInventoryItem!=="function")fail.push("inventory-clean");
 if(typeof v125MeetingUrgentWatch!=="function")fail.push("meeting-watch");
 if(typeof v106SpecialRoamUpdate!=="function")fail.push("special-roam");
 if(fail.length)console.error("VERSIONE1ITSHIFT 1.0.29.4 LUNCH TRAFFIC FIX SELF TEST // FAIL",fail);
 else console.log("VERSIONE1ITSHIFT 1.0.29.4 LUNCH TRAFFIC FIX SELF TEST // OK");
})();

(function v126SelfTest(){
 const fail=[];
 if(typeof v126RaceBegin!=="function")fail.push("race-begin");
 if(typeof v126RaceUpdate!=="function")fail.push("race-update");
 if(typeof v126MarkPlayerRaceFinish!=="function")fail.push("race-player-finish");
 if(typeof v126PhysicalRouteText!=="function")fail.push("route-text");
 if(typeof v126RemoveOwnedTaskItems!=="function")fail.push("hard-cleanup");
 if(typeof v126MissionFailed!=="function")fail.push("mission-fail");
 if(fail.length)console.error("VERSIONE1ITSHIFT 1.0.29.4 LUNCH TRAFFIC FIX SELF TEST // FAIL",fail);
 else console.log("VERSIONE1ITSHIFT 1.0.29.4 LUNCH TRAFFIC FIX SELF TEST // OK");
})();

document.addEventListener("keydown",function v129CinematicInputGuard(e){
 if(typeof V129_INTRO==="undefined"||!V129_INTRO.locked)return;

 // Story portrait owns E / ENTER while it is visible.
 if(typeof V130B43_STORY!=="undefined"&&V130B43_STORY.active){
   const storyKeys=["KeyE","Enter","Space"];
   if(storyKeys.includes(e.code))return;
 }

 const blocked=["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight",
                "KeyE","Enter","Space","KeyF","KeyG","Tab","KeyM","Digit1","Digit2","Digit3","Digit4",
                "Digit5","Digit6","Digit7","Digit8","Digit9"];
 if(blocked.includes(e.code)){
   e.preventDefault();
   e.stopImmediatePropagation();
   v129ClearMovement();
 }
},true);

function v129Audit(){
 const issues=[],info=[];
 if(typeof V129_INTRO==="undefined")issues.push("INTRO STATE MISSING");
 if(typeof V129_RACE==="undefined")issues.push("RACE STATE MISSING");
 const m=npcs?.find?.(n=>n&&n.id==="manager");
 if(!m)issues.push("MANAGER MISSING");
 if(V129_RACE.active){
   if(!V129_RACE.route.length)issues.push("RACE ROUTE EMPTY");
   if(V129_RACE.route.some(p=>!p||!Number.isFinite(p.x)||!Number.isFinite(p.y)))issues.push("RACE ROUTE INVALID");
   if(!v1292RouteSafe(V129_RACE.route[0],V129_RACE.route.slice(1)))issues.push("RACE CROSSES WALL");
   info.push(`RACE idx=${V129_RACE.routeIndex}/${V129_RACE.route.length}`);
 }
 info.push(`INTRO=${V129_INTRO.phase}`);
 info.push(`SHIFT=${shiftStarted}`);
 info.push(`PLAYER=(${Math.round(player?.x||0)},${Math.round(player?.y||0)})`);
 if(m)info.push(`MANAGER=(${Math.round(m.x)},${Math.round(m.y)}) ${m.state}`);
 
 const lunchStuck=[...(Array.isArray(npcs)?npcs:[]),...(Array.isArray(ambientNPCs)?ambientNPCs:[])].filter(n=>n&&["lunch","lunchTravel","lunchSeat","returnLunch"].includes(n.state));
 if(!isLunch()&&lunchStuck.length)issues.push(`POST LUNCH STUCK // ${lunchStuck.length}`);
 const orphanInv=(Array.isArray(inventory)?inventory:[]).filter(v=>["ALIMENTATORE","EXTENDER HDMI","HDMI","PC DA SPOSTARE","WORKSTATION DA SPOSTARE"].some(t=>v1293InventoryName(v).includes(t)));
 if(!carryMission&&!studioEvent&&orphanInv.length)issues.push(`ORPHAN INVENTORY // ${orphanInv.length}`);
 if(state?.min>=BOSS&&carryMission)issues.push("GHOST CARRY AT END SHIFT");
 return {ok:issues.length===0,issues,info};
}
document.addEventListener("keydown",e=>{
 if(e.code!=="F4")return;
 const a=v129Audit();
 console.group("IT SHIFT 1.0.29 // AUDIT");
 console.log("OK",a.ok);console.log("ISSUES",a.issues);console.log("INFO",a.info);console.groupEnd();
 if(typeof toast==="function")toast(a.ok?"AUDIT 1.0.29 // OK":"AUDIT 1.0.29 // FAIL");
});
(function v129SelfTest(){
 const f=[];
 ["v129ResetIntro","v129OpenDoor","v129IntroUpdate","v129StartRace","v129RaceUpdate",
  "v129MarkPlayerFinish","v129DrawIntroOverlay","v129Audit"].forEach(n=>{
   if(typeof globalThis[n]!=="function")f.push(n)
 });
 if(f.length)console.error("VERSIONE1ITSHIFT 1.0.29.4 LUNCH TRAFFIC FIX SELF TEST // FAIL",f);
 else console.log("VERSIONE1ITSHIFT 1.0.29.4 LUNCH TRAFFIC FIX SELF TEST // OK");
})();

(function v1292WallSelfTest(){
 const f=[];
 ["v1292SolidRoomAt","v1292DoorAt","v1292SegmentAllowed","v1292RouteSafe"].forEach(n=>{
   if(typeof globalThis[n]!=="function")f.push(n)
 });
 if(f.length)console.error("VERSIONE1ITSHIFT 1.0.29.4 LUNCH TRAFFIC FIX SELF TEST // FAIL",f);
 else console.log("VERSIONE1ITSHIFT 1.0.29.4 LUNCH TRAFFIC FIX SELF TEST // OK");
})();

(function v1293SelfTest(){
 const f=[];
 ["v1293RecoverNpcAfterLunch","v1293LunchLifecycleWatch","v1293PurgePhysicalOrphans",
  "v1293PhysicalLifecycleWatch","v1293ClearGhostPhysicalMission","v1293EndShiftCleanupWatch"].forEach(n=>{
    if(typeof globalThis[n]!=="function")f.push(n)
  });
 if(f.length)console.error("VERSIONE1ITSHIFT 1.0.29.4 LUNCH TRAFFIC FIX SELF TEST // FAIL",f);
 else console.log("VERSIONE1ITSHIFT 1.0.29.4 LUNCH TRAFFIC FIX SELF TEST // OK");
})();

(function v1294SelfTest(){
 const f=[];
 ["v1294TargetFor","v1294StartReturn","v1294FinishReturn","v1294TrafficUpdate","v1294AntiStuck"].forEach(n=>{
   if(typeof globalThis[n]!=="function")f.push(n)
 });
 if(f.length)console.error("VERSIONE1ITSHIFT 1.0.29.4 LUNCH TRAFFIC FIX SELF TEST // FAIL",f);
 else console.log("VERSIONE1ITSHIFT 1.0.29.4 LUNCH TRAFFIC FIX SELF TEST // OK");
})();


/* ============================================================
   1.0.30B0 — DEPARTMENT GAMEPLAY PROOF
   F8 opens a self-contained vertical slice:
   - department-specific support cases
   - diagnostic dialogue
   - different minigame patterns
   - actual NPC relationship adjustment
   - intervention pauses the workday
   ============================================================ */

const V130B0_PROOF={
 open:false,
 scenario:null,
 npc:null,
 errors:0,
 step:0,
 sequence:[],
 startedAt:0,
 cooldownUntil:0
};

const V130B0_CASES={
 ARCH:{
   key:"ARCH",dept:"BIM / ARCHITETTI",room:"BIM",portrait:"architect",
   title:"NON MI RICORDO LA PASSWORD",
   summary:"Dialogo diagnostico → identifica quale account sta usando.",
   opening:"Non mi funziona più la password.",
   type:"dialogue"
 },
 GRAPH:{
   key:"GRAPH",dept:"EDITORIA / GRAFICI",room:"EDITORIA",portrait:"graphic",
   title:"IL MAC NON SALVA SUL SERVER",
   summary:"Mac fuori dominio → diagnosi SMB + sequenza di verifica.",
   opening:"Photoshop va, Internet va... ma non riesco più a salvare nella cartella del progetto.",
   type:"sequence"
 },
 RENDER:{
   key:"RENDER",dept:"RENDERISTI",room:"RENDERISTI",portrait:"renderer",
   title:"CHAOS VANTAGE NON RICEVE IL LIVE LINK",
   summary:"Pannello diagnostico → individua il collegamento guasto.",
   opening:"3ds Max è aperto e il render locale funziona, ma Vantage non si aggiorna.",
   type:"tech"
 },
 PIXERA:{
   key:"PIXERA",dept:"RIFUGIO DIGITALE",room:"RIFUGIO DIGITALE",portrait:"pixera",
   title:"MOSTRA // OUTPUT PIXERA MAPPATI MALE",
   summary:"Remap visivo di quattro output verso quattro schermi.",
   opening:"Dopo il riavvio due schermi mostrano il contenuto sbagliato. Dobbiamo rifare il mapping.",
   type:"mapping"
 },
 MEET:{
   key:"MEET",dept:"SALA MEETING",room:"SALA MEET",portrait:"meeting",
   title:"VIDEO OK, AUDIO DAL PORTATILE",
   summary:"Diagnostica AV chiara, niente domanda tecnica casuale.",
   opening:"La presentazione si vede sul display, ma l'audio continua a uscire dal portatile.",
   type:"meeting"
 }
};

function v130b0$(id){return document.getElementById(id)}
function v130b0Esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}

function v130b0NpcForRoom(room){
 const exact=(Array.isArray(ambientNPCs)?ambientNPCs:[]).filter(n=>n&&n.homeRoom===room);
 if(exact.length)return exact[0];
 if(room==="SALA MEET"){
   return (Array.isArray(ambientNPCs)&&ambientNPCs[0]) || (Array.isArray(npcs)&&npcs.find(n=>n.id==="pao")) || null;
 }
 if(room==="RIFUGIO DIGITALE"){
   return (Array.isArray(npcs)&&npcs.find(n=>n.id==="don")) || (Array.isArray(ambientNPCs)&&ambientNPCs[0]) || null;
 }
 return (Array.isArray(ambientNPCs)&&ambientNPCs[0]) || null;
}

function v130b0RelationLabel(v){
 if(v<=-4)return "OSTILE";
 if(v<=-2)return "FREDDO";
 if(v<=1)return "NEUTRALE";
 if(v<=3)return "SIMPATIA";
 if(v===4)return "AMICO";
 return "FIDUCIA";
}

function v130b0UpdateRelationUI(){
 const n=V130B0_PROOF.npc;
 const v=n&&typeof ensureRelation==="function"?ensureRelation(n):0;
 const label=v130b0RelationLabel(v);
 const fill=v130b0$("v130b0RelFill");
 if(v130b0$("v130b0Relation"))v130b0$("v130b0Relation").textContent=label;
 if(v130b0$("v130b0RelValue"))v130b0$("v130b0RelValue").textContent=`${v>0?"+":""}${v} / 5`;
 if(fill)fill.style.width=`${Math.max(0,Math.min(100,(v+5)*10))}%`;
}

function v130b0DrawPortrait(kind="architect"){
 const c=v130b0$("v130b0Portrait");if(!c)return;
 const x=c.getContext("2d");x.imageSmoothingEnabled=false;
 x.fillStyle="#768564";x.fillRect(0,0,64,64);

 const pal={
   architect:{skin:"#c99a75",hair:"#30251f",shirt:"#566d73"},
   graphic:{skin:"#d0a17c",hair:"#38251f",shirt:"#736077"},
   renderer:{skin:"#c28f6d",hair:"#1f2421",shirt:"#5b6574"},
   pixera:{skin:"#9c684d",hair:"#181b18",shirt:"#547264"},
   meeting:{skin:"#c99a75",hair:"#58432d",shirt:"#6e6255"}
 }[kind]||{skin:"#c99a75",hair:"#30251f",shirt:"#566d73"};

 const p=(xx,yy,w,h,col)=>{x.fillStyle=col;x.fillRect(xx,yy,w,h)};
 // 8-bit bust, deliberately simple and readable.
 p(18,8,28,8,pal.hair);p(14,14,36,22,pal.hair);
 p(18,15,28,23,pal.skin);
 p(18,15,6,13,pal.hair);p(40,15,6,13,pal.hair);
 p(23,24,5,3,"#20251f");p(36,24,5,3,"#20251f");
 p(29,31,7,2,"#805b47");
 p(12,39,40,22,"#172019");p(16,40,32,21,pal.shirt);
 p(20,44,24,4,"#b8c38f");
 if(kind==="graphic"){p(16,40,32,4,"#d1c48d");p(16,48,32,4,"#706078")}
 if(kind==="renderer"){p(38,42,6,6,"#8fb56c")}
 if(kind==="pixera"){p(18,43,28,3,"#92c2b7");p(25,49,14,7,"#283a31")}
}

function v130b0Open(){
 V130B0_PROOF.open=true;V130B0_PROOF.scenario=null;V130B0_PROOF.npc=null;
 V130B0_PROOF.errors=0;V130B0_PROOF.step=0;V130B0_PROOF.sequence=[];
 const o=v130b0$("v130b0Proof");if(o){o.classList.remove("hidden");o.setAttribute("aria-hidden","false")}
 v130b0RenderMenu();
}

function v130b0Close(){
 V130B0_PROOF.open=false;
 const o=v130b0$("v130b0Proof");if(o){o.classList.add("hidden");o.setAttribute("aria-hidden","true")}
}

function v130b0Toggle(){
 if(V130B0_PROOF.open)v130b0Close();else v130b0Open();
}

function v130b0RenderMenu(){
 const b=v130b0$("v130b0Body");if(!b)return;
 v130b0$("v130b0Title").textContent="TEST GAMEPLAY PER REPARTO";
 v130b0$("v130b0Npc").textContent="SYSTEM PROOF";
 v130b0$("v130b0Dept").textContent="5 CASI DIVERSI";
 v130b0$("v130b0Relation").textContent="—";
 v130b0$("v130b0RelValue").textContent="—";
 v130b0$("v130b0RelFill").style.width="50%";
 v130b0$("v130b0Pace").textContent="RITMO // CALMO";
 v130b0DrawPortrait("architect");
 const cards=Object.values(V130B0_CASES).map(c=>`
   <button class="v130b0-card" data-case="${c.key}">
     <b>${v130b0Esc(c.dept)}</b>
     <span>${v130b0Esc(c.title)}<br>${v130b0Esc(c.summary)}</span>
   </button>`).join("");
 b.innerHTML=`<div class="v130b0-intro">
   <h3>NON È UN QUIZ GENERICO</h3>
   <p>Ogni prova usa problemi coerenti con il reparto. Durante il caso la giornata resta ferma: prima capisci il problema, poi intervieni.</p>
   <div class="v130b0-grid">${cards}</div>
 </div>`;
 b.querySelectorAll("[data-case]").forEach(btn=>btn.onclick=()=>v130b0Start(btn.dataset.case));
 v130b0$("v130b0Hint").textContent="F8 mette in pausa la giornata e apre/chiude questa prova.";
}

function v130b0Start(key){
 const c=V130B0_CASES[key];if(!c)return;
 V130B0_PROOF.scenario=c;V130B0_PROOF.npc=v130b0NpcForRoom(c.room);
 V130B0_PROOF.errors=0;V130B0_PROOF.step=0;V130B0_PROOF.sequence=[];V130B0_PROOF.startedAt=performance.now();

 const n=V130B0_PROOF.npc;
 v130b0$("v130b0Title").textContent=c.title;
 v130b0$("v130b0Npc").textContent=n?.name||"COLLEGA";
 v130b0$("v130b0Dept").textContent=c.dept;
 v130b0$("v130b0Pace").textContent="RITMO // INTERVENTO IN PAUSA";
 v130b0DrawPortrait(c.portrait);v130b0UpdateRelationUI();
 v130b0RenderStep();
}

function v130b0Dialogue(who,text){
 return `<div class="v130b0-dialogue"><b>${v130b0Esc(who)}</b><p>${v130b0Esc(text)}</p></div>`;
}

function v130b0Options(options,correct,explain){
 return `<div class="v130b0-options">${options.map((o,i)=>`<button class="v130b0-option" data-answer="${i}" data-correct="${i===correct?1:0}">${v130b0Esc(o)}</button>`).join("")}</div>
 <div id="v130b0Feedback"></div>`;
}

function v130b0BindOptions(onCorrect, explanation){
 const b=v130b0$("v130b0Body");
 b.querySelectorAll("[data-answer]").forEach(btn=>{
   btn.onclick=()=>{
     if(btn.dataset.correct==="1"){
       btn.classList.add("good");
       const fb=v130b0$("v130b0Feedback");if(fb)fb.innerHTML=`<div class="v130b0-feedback">✓ ${v130b0Esc(explanation)}</div>`;
       b.querySelectorAll("[data-answer]").forEach(q=>q.disabled=true);
       setTimeout(onCorrect,500);
     }else{
       btn.classList.add("bad");btn.disabled=true;V130B0_PROOF.errors++;
       const fb=v130b0$("v130b0Feedback");if(fb)fb.innerHTML=`<div class="v130b0-feedback">Non ancora. Il gioco ti spiega perché e ti lascia ragionare: nessuno strike al primo errore.</div>`;
     }
   };
 });
}

function v130b0RenderStep(){
 const c=V130B0_PROOF.scenario,b=v130b0$("v130b0Body");if(!c||!b)return;
 const n=V130B0_PROOF.npc?.name||"COLLEGA";
 const s=V130B0_PROOF.step;

 if(c.key==="ARCH"){
   if(s===0){
     b.innerHTML=`<div class="v130b0-case">${v130b0Dialogue(n,c.opening)}
       <h3>PRIMA: FAI LA DOMANDA GIUSTA</h3>
       ${v130b0Options(["Quale password intendi?","Hai già riavviato Revit?","La stampante funziona?"],0,"Prima si identifica il problema, senza indovinare.")}</div>`;
     v130b0BindOptions(()=>{V130B0_PROOF.step=1;v130b0RenderStep()},"La risposta dell'utente restringe il problema.");
   }else if(s===1){
     b.innerHTML=`<div class="v130b0-case">${v130b0Dialogue(n,"Quella che metto la mattina quando accendo il computer.")}
       <h3>QUALE ACCOUNT?</h3>
       ${v130b0Options(["Windows / dominio","Autodesk","Adobe Creative Cloud"],0,"È il login Windows aziendale, non Autodesk o Adobe.")}</div>`;
     v130b0BindOptions(()=>{V130B0_PROOF.step=2;v130b0RenderStep()},"Account identificato.");
   }else{
     b.innerHTML=`<div class="v130b0-case"><h3>INTERVENTO</h3>
       <div class="v130b0-tech">
         ACCOUNT: ${v130b0Esc(n)}<br>TIPO: DOMAIN USER<br>STATO: PASSWORD / LOCK DA VERIFICARE
       </div>
       ${v130b0Options(["Verifica account/blocco e procedura cambio password","Reinstalla AutoCAD","Resetta PIXERA"],0,"Intervento coerente col problema rilevato.")}</div>`;
     v130b0BindOptions(()=>v130b0Finish(),"Problema risolto senza trasformarlo in una domanda enciclopedica.");
   }
   return;
 }

 if(c.key==="GRAPH"){
   if(s===0){
     b.innerHTML=`<div class="v130b0-case">${v130b0Dialogue(n,c.opening)}
       <h3>MAC FUORI DOMINIO // PRIMO CONTROLLO</h3>
       ${v130b0Options(["Verifico se il problema è solo la share SMB e le credenziali","Resetto il domain controller","Aggiorno i driver NVIDIA"],0,"Il Mac naviga: si indaga la share SMB, non il dominio Windows.")}</div>`;
     v130b0BindOptions(()=>{V130B0_PROOF.step=1;v130b0RenderStep()},"Diagnosi corretta.");
   }else{
     const chips=["PING / RETE","smb://SERVER/PROGETTI","CREDENZIALI"];
     b.innerHTML=`<div class="v130b0-case"><h3>METTI I CONTROLLI NELL'ORDINE GIUSTO</h3>
       <p>Non devi ricordare una risposta: costruisci la procedura.</p>
       <div class="v130b0-seq">${chips.map((x,i)=>`<button class="v130b0-chip" data-seq="${i}">${x}</button>`).join("")}</div>
       <div id="v130b0SeqOut" class="v130b0-seqout">SEQUENZA: —</div>
       <button id="v130b0VerifySeq" class="v130b0-action">VERIFICA</button>
       <div id="v130b0Feedback"></div></div>`;
     b.querySelectorAll("[data-seq]").forEach(btn=>btn.onclick=()=>{
       if(btn.classList.contains("used"))return;
       V130B0_PROOF.sequence.push(Number(btn.dataset.seq));btn.classList.add("used");
       v130b0$("v130b0SeqOut").textContent="SEQUENZA: "+V130B0_PROOF.sequence.map(i=>chips[i]).join(" → ");
     });
     v130b0$("v130b0VerifySeq").onclick=()=>{
       if(JSON.stringify(V130B0_PROOF.sequence)==="[0,1,2]")v130b0Finish();
       else{V130B0_PROOF.errors++;V130B0_PROOF.sequence=[];b.querySelectorAll("[data-seq]").forEach(q=>q.classList.remove("used"));v130b0$("v130b0SeqOut").textContent="SEQUENZA: —";v130b0$("v130b0Feedback").innerHTML='<div class="v130b0-feedback">Prima connettività, poi percorso SMB, infine credenziali. Riprova.</div>'}
     };
   }
   return;
 }

 if(c.key==="RENDER"){
   b.innerHTML=`<div class="v130b0-case">${v130b0Dialogue(n,c.opening)}
     <h3>LEGGI LO STATO, NON INDOVINARE</h3>
     <div class="v130b0-tech">
       <div class="v130b0-tech-row"><b>3DS MAX</b><span>SCENA APERTA</span><button data-tech="ok">OK</button></div>
       <div class="v130b0-tech-row"><b>CHAOS LIVE LINK</b><span>DISCONNECTED</span><button data-tech="broken">CONTROLLA</button></div>
       <div class="v130b0-tech-row"><b>GPU RTX</b><span>86% LOAD</span><button data-tech="ok">OK</button></div>
     </div>
     <div id="v130b0Feedback"></div></div>`;
   b.querySelectorAll("[data-tech]").forEach(btn=>btn.onclick=()=>{
     if(btn.dataset.tech==="broken"){
       btn.classList.add("good");
       v130b0$("v130b0Feedback").innerHTML='<div class="v130b0-feedback">Live Link disconnesso. <button id="v130b0Reconnect" class="v130b0-action">RICONNETTI LIVE LINK</button></div>';
       v130b0$("v130b0Reconnect").onclick=()=>v130b0Finish();
     }else{btn.classList.add("bad");btn.disabled=true;V130B0_PROOF.errors++;v130b0$("v130b0Feedback").innerHTML='<div class="v130b0-feedback">Quel componente risulta operativo. Cerca il punto realmente disconnesso.</div>'}
   });
   return;
 }

 if(c.key==="PIXERA"){
   b.innerHTML=`<div class="v130b0-case">${v130b0Dialogue(n,c.opening)}
     <h3>PIXERA // REMAP OUTPUT</h3>
     <div class="v130b0-tech">TARGET CORRETTO: OUTPUT 1→A · 2→B · 3→C · 4→D</div>
     <div class="v130b0-mapgrid">
       <b>OUTPUT 1</b><select data-map="1"><option>B</option><option>A</option><option>C</option><option>D</option></select>
       <b>OUTPUT 2</b><select data-map="2"><option>D</option><option>B</option><option>A</option><option>C</option></select>
       <b>OUTPUT 3</b><select data-map="3"><option>A</option><option>C</option><option>D</option><option>B</option></select>
       <b>OUTPUT 4</b><select data-map="4"><option>C</option><option>D</option><option>B</option><option>A</option></select>
     </div>
     <button id="v130b0VerifyMap" class="v130b0-action">APPLICA REMAP</button>
     <div id="v130b0Feedback"></div></div>`;
   v130b0$("v130b0VerifyMap").onclick=()=>{
     const expected={1:"A",2:"B",3:"C",4:"D"};
     const ok=[...b.querySelectorAll("[data-map]")].every(sel=>sel.value===expected[sel.dataset.map]);
     if(ok)v130b0Finish();
     else{V130B0_PROOF.errors++;v130b0$("v130b0Feedback").innerHTML='<div class="v130b0-feedback">Il mapping non coincide ancora con il layout della mostra. Correggi solo gli output sbagliati.</div>'}
   };
   return;
 }

 if(c.key==="MEET"){
   if(s===0){
     b.innerHTML=`<div class="v130b0-case">${v130b0Dialogue(n,c.opening)}
       <h3>STATO SALA</h3>
       <div class="v130b0-tech">
        DISPLAY: ONLINE<br>HDMI VIDEO: OK<br>AUDIO OUTPUT: MACBOOK SPEAKERS
       </div>
       ${v130b0Options(["Seleziona come uscita audio il dispositivo della sala / HDMI","Cambia password Windows","Reinstalla 3ds Max"],0,"Il video è già sulla sala: il problema è il routing audio.")}</div>`;
     v130b0BindOptions(()=>{V130B0_PROOF.step=1;v130b0RenderStep()},"Causa identificata.");
   }else{
     b.innerHTML=`<div class="v130b0-case"><h3>VERIFICA FINALE</h3>
       <div class="v130b0-tech">VIDEO: DISPLAY SALA ✓<br>AUDIO: DISPLAY SALA ✓<br>MICROFONO: ROOM USB ✓</div>
       <button id="v130b0MeetDone" class="v130b0-action">AVVIA TEST AUDIO</button></div>`;
     v130b0$("v130b0MeetDone").onclick=()=>v130b0Finish();
   }
 }
}

function v130b0Finish(){
 const n=V130B0_PROOF.npc,errors=V130B0_PROOF.errors;
 let delta=0;
 if(errors===0)delta=1;
 else if(errors>=3)delta=-1;
 if(n&&delta&&typeof changeRelation==="function")changeRelation(n,delta);

 const seconds=Math.max(1,Math.round((performance.now()-V130B0_PROOF.startedAt)/1000));
 v130b0UpdateRelationUI();
 v130b0$("v130b0Pace").textContent="RITMO // PAUSA OPERATIVA";
 v130b0$("v130b0Hint").textContent="Caso concluso. Il gioco non deve lanciare subito un'altra emergenza.";

 const b=v130b0$("v130b0Body");
 b.innerHTML=`<div class="v130b0-result">
   <h3>INTERVENTO COMPLETATO</h3>
   <p>${errors===0?"Diagnosi pulita al primo tentativo.":errors<3?"Hai corretto il percorso senza penalità pesanti.":"Troppi tentativi: il collega perde un po' di fiducia."}</p>
   <div class="score">
    ERRORI DIAGNOSTICI: <b>${errors}</b><br>
    RAPPORTO NPC: <b>${delta>0?"+1":delta<0?"-1":"NESSUNA VARIAZIONE"}</b><br>
    TEMPO PROVA: <b>${seconds}s</b><br>
    STRESS: <b>NESSUN AUMENTO AUTOMATICO</b><br>
    DIRECTOR: <b>PAUSA PRIMA DEL PROSSIMO PICCO</b>
   </div>
   <button id="v130b0Back" class="v130b0-action">PROVA UN ALTRO REPARTO</button>
   <button id="v130b0Exit" class="v130b0-action secondary">TORNA ALLA PARTITA</button>
 </div>`;
 v130b0$("v130b0Back").onclick=v130b0RenderMenu;
 v130b0$("v130b0Exit").onclick=v130b0Close;
}

// Capture F8/ESC before the game's existing key handlers.
// While proof is open, all ordinary game input is swallowed.
window.addEventListener("keydown",e=>{
 if(e.key==="F8"){
   e.preventDefault();e.stopImmediatePropagation();v130b0Toggle();return;
 }
 if(V130B0_PROOF.open){
   if(e.key==="Escape"){e.preventDefault();e.stopImmediatePropagation();v130b0Close();return}
   e.preventDefault();e.stopImmediatePropagation();
 }
},true);

document.addEventListener("DOMContentLoaded",()=>{
 const x=v130b0$("v130b0Close");if(x)x.onclick=v130b0Close;
});



const V130B1_HUD={lastAlert:"Tutto tranquillo.",cameraNear:false,cameraScale:1.18};
function v130b1$(id){return document.getElementById(id)}
function v130b1TaskRows(){
 const rows=[];

 const clean=s=>String(s||"").replace(/_/g," ");
 const issueForRoom=room=>{
   const r=String(room||"").toUpperCase();
   if(r==="EDITORIA")return "MAC / ADOBE";
   if(r==="RENDERISTI")return "3DS MAX / CHAOS";
   if(r==="BIM"||r==="CENTRALE")return "REVIT / AUTOCAD";
   if(r==="INTERIOR")return "AUTOCAD / ADOBE";
   if(r==="RIFUGIO DIGITALE")return "PIXERA / DISPLAY";
   if(r.includes("MEET")||r==="SPAZIO A")return "AUDIO / VIDEO";
   if(r==="STAMPANTI")return "STAMPANTE";
   if(r==="STAMPA 3D")return "STAMPA 3D";
   if(r==="SERVER")return "SERVER / RETE";
   return "ASSISTENZA";
 };
 const ownerFor=t=>{
   const src=String(t?.source||"");
   if(src&&src!=="USER")return src;
   const room=t?.p?.room||t?.room;
   const list=Array.isArray(ambientNPCs)?ambientNPCs.filter(n=>n&&n.homeRoom===room):[];
   if(!list.length)return "COLLEGA";
   if(t?.p&&Number.isFinite(t.p.x)&&Number.isFinite(t.p.y)){
     return [...list].sort((a,b)=>
       Math.hypot((a.homeX??a.x)-t.p.x,(a.homeY??a.y)-t.p.y)-
       Math.hypot((b.homeX??b.x)-t.p.x,(b.homeY??b.y)-t.p.y)
     )[0]?.name||"COLLEGA";
   }
   return list[0]?.name||"COLLEGA";
 };

 if(typeof carryMission!=="undefined"&&carryMission){
   const title=clean(carryMission.title||carryMission.name||carryMission.type||"MISSIONE FISICA");
   const item=clean(carryMission.item||carryMission.object||carryMission.label||"");
   const from=v130b4PointLabel(carryMission.pickup||carryMission.fromRoom||carryMission.origin||carryMission.from,"ORIGINE");
   const to=v130b4PointLabel(carryMission.to||carryMission.toRoom||carryMission.destination||carryMission.targetRoom,"DESTINAZIONE");
   rows.push({
     title,
     text:[item,from&&to?`${from} → ${to}`:from||to].filter(Boolean).join(" // "),
     meta:"F PRENDI · G CONSEGNA",
     cls:"urgent"
   });
 }

 if(typeof studioEvent!=="undefined"&&studioEvent&&studioEvent.active!==false){
   const title=clean(studioEvent.title||studioEvent.name||studioEvent.type||"EVENTO STUDIO");
   const txt=clean(studioEvent.text||studioEvent.desc||studioEvent.description||"Intervento in corso");
   rows.push({
     title,
     text:txt,
     meta:Number.isFinite(studioEvent.deadline)&&state?`${Math.max(0,Math.ceil(studioEvent.deadline-state.min))} MIN`:"EVENTO",
     cls:String(studioEvent.type||"").toUpperCase().includes("MEET")?"critical":"urgent"
   });
 }

 if(Array.isArray(tickets)){
   for(const t of [...tickets].sort((a,b)=>(a.due??9999)-(b.due??9999)).slice(0,2)){
     const room=String(t.p?.room||t.room||"STUDIO");
     const who=ownerFor(t);
     const issue=issueForRoom(room);
     rows.push({
       title:`${who} // ${issue}`,
       text:`${room} · assistenza richiesta`,
       meta:Number.isFinite(t.due)&&state?`${Math.max(0,Math.ceil(t.due-state.min))} MIN`:"IN CODA",
       cls:t.level==="CRITICAL"?"critical":t.level==="HIGH"?"urgent":""
     });
   }
 }

 return rows.slice(0,3);
}
function v130b1RenderTasks(){v130b4RenderMinimalHud()}
function v130b1RenderInventory(){const el=document.getElementById("v130b1Inventory");if(!el)return;const inv=Array.isArray(inventory)?inventory:[];el.innerHTML=[0,1,2].map(i=>{const item=inv[i]||"";return `<div class="slot ${item?"filled":""}" title="${v130b4Esc(item)}">${item?v130b4ItemIcon(item):"—"}</div>`}).join("")}
function v130b1SetAlert(sender,text){V130B1_HUD.lastAlert=`${sender?sender+" // ":""}${text||""}`.trim();V130B4_LOG.unshift({time:state?fmt(state.min):"--:--",sender:String(sender||"SYSTEM"),text:String(text||"")});if(V130B4_LOG.length>30)V130B4_LOG.length=30}
function v130b1DrawMiniMap(){const c=document.getElementById("v130b1MiniMap");if(!c||typeof rooms==="undefined")return;const x=c.getContext("2d"),p=5,sx=(c.width-p*2)/1600,sy=(c.height-p*2)/1000;x.imageSmoothingEnabled=false;x.fillStyle="#0b130e";x.fillRect(0,0,c.width,c.height);for(const r of rooms){x.fillStyle="#17271f";x.fillRect(p+r.x*sx,p+r.y*sy,r.w*sx,r.h*sy);x.strokeStyle="#59705e";x.strokeRect(p+r.x*sx,p+r.y*sy,r.w*sx,r.h*sy)}if(Array.isArray(tickets))for(const t of tickets){if(t?.p){x.fillStyle=t.level==="CRITICAL"?"#df745f":"#dccb62";x.fillRect(p+t.p.x*sx-1,p+t.p.y*sy-1,3,3)}}if(typeof player!=="undefined"&&player){x.fillStyle="#8fff79";x.fillRect(p+player.x*sx-2,p+player.y*sy-2,5,5)}}
function v130b1UpdateHud(){v130b1RenderTasks();v130b1RenderInventory();v130b1DrawMiniMap()}
function v130b1ToggleCamera(){
 V130B1_HUD.cameraNear=!V130B1_HUD.cameraNear;
 if(typeof camera!=="undefined"){
   camera.zoom=V130B1_HUD.cameraNear?2.06:1.82;
 }
 // Remove legacy CSS scale from B1 if it was ever set.
 if(typeof C!=="undefined"){
   C.style.transform="";
   C.style.transformOrigin="";
 }
 const lab=document.getElementById("v130b12CameraMode");
 if(lab)lab.textContent=V130B1_HUD.cameraNear?"VICINA 2.06x":"STANDARD 1.82x";
 if(typeof toast==="function")toast(`CAMERA // ${V130B1_HUD.cameraNear?"VICINA 2.06x":"STANDARD 1.82x"}`);
}
window.addEventListener("keydown",e=>{
 const k=String(e.key||"").toLowerCase();
 if(e.key==="F9"||k==="c"){
   // Do not steal typing if an input/textarea/select is focused.
   const tag=String(document.activeElement?.tagName||"").toUpperCase();
   if(["INPUT","TEXTAREA","SELECT"].includes(tag))return;
   e.preventDefault();
   e.stopImmediatePropagation();
   v130b1ToggleCamera();
 }
},true);
setInterval(()=>{try{v130b1UpdateHud()}catch(e){console.warn("B1 HUD",e)}},250);
document.addEventListener("DOMContentLoaded",v130b1UpdateHud);



function v130b11InitViewport(){
 if(typeof camera!=="undefined"){
   camera.zoom=1.82;
   V130B1_HUD.cameraNear=false;
 }
 if(typeof C!=="undefined"){
   C.style.transform="";
   C.style.transformOrigin="";
 }
}
document.addEventListener("DOMContentLoaded",v130b11InitViewport);


document.addEventListener("DOMContentLoaded",()=>{
 const b=document.getElementById("v130b12CameraBtn");
 if(b)b.addEventListener("click",e=>{
   e.preventDefault();
   v130b1ToggleCamera();
 });
 const lab=document.getElementById("v130b12CameraMode");
 if(lab)lab.textContent="STANDARD 1.82x";
});


function v130b13LayoutAudit(){
 const issues=[];
 const lane=[
   {x:695,y:985},{x:695,y:900},{x:695,y:850},{x:695,y:770},
   {x:560,y:730},{x:365,y:730},{x:285,y:790},{x:225,y:820},{x:185,y:842}
 ];
 for(let i=1;i<lane.length;i++){
   if(!v1292SegmentAllowed(lane[i-1].x,lane[i-1].y,lane[i].x,lane[i].y)){
     issues.push(`ENTRANCE/RACE LANE ${i-1}->${i}`);
   }
 }
 for(const n of (Array.isArray(ambientNPCs)?ambientNPCs:[])){
   if(!walkable(n.homeX,n.homeY))issues.push(`NPC HOME BLOCKED ${n.name}/${n.homeRoom}`);
   const r=roomAt(n.homeX,n.homeY);
   if(r&&r.name!==n.homeRoom)issues.push(`NPC WRONG ROOM ${n.name}: ${r.name} != ${n.homeRoom}`);
 }
 if(issues.length)console.warn("1.0.30B1.3 LAYOUT AUDIT",issues);
 else console.log("1.0.30B1.3 LAYOUT AUDIT // OK");
 return issues;
}





const V130B4_LOG=[];
function v130b4Esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
function v130b4PointLabel(v,f="PUNTO"){if(v==null)return f;if(typeof v==="string"||typeof v==="number")return String(v);if(typeof v==="object")return String(v.label||v.room||v.name||v.id||v.type||f);return f}
function v130b4ItemIcon(name){const n=String(name||"").toUpperCase();if(n.includes("HDMI"))return"HD";if(n.includes("ETHERNET")||n.includes("CAVO"))return"↔";if(n.includes("PC")||n.includes("WORKSTATION"))return"PC";if(n.includes("MAC"))return"MC";if(n.includes("ALIMENTATORE"))return"⚡";if(n.includes("TONER"))return"TN";if(n.includes("USB"))return"US";if(n.includes("CUFFIE"))return"AU";if(n.includes("MOUSE"))return"MS";if(n.includes("TASTIERA"))return"KB";if(n.includes("PACCO")||n.includes("RICAMBI"))return"BX";return"IT"}
function v130b4TicketIssue(t){
 if(t?.caseTitle)return String(t.caseTitle).toUpperCase();
 const r=String(t?.p?.room||t?.room||"STUDIO").toUpperCase();if(r==="EDITORIA")return"MAC / ADOBE";if(r==="RENDERISTI")return"3DS MAX / CHAOS";if(r==="BIM"||r==="CENTRALE")return"REVIT / AUTOCAD";if(r==="INTERIOR")return"AUTOCAD / ADOBE";if(r==="RIFUGIO DIGITALE")return"PIXERA / DISPLAY";if(r.includes("MEET")||r==="SPAZIO A")return"AUDIO / VIDEO";if(r==="STAMPANTI")return"STAMPANTE";if(r==="SERVER")return"SERVER / RETE";return String(t?.taskType||"ASSISTENZA").replaceAll("_"," ")}
function v130b4TaskRows(){
 const rows=[];
 if(typeof carryMission!=="undefined"&&carryMission){const item=String(carryMission.item||carryMission.object||carryMission.label||"MATERIALE").toUpperCase();const from=v130b4PointLabel(carryMission.pickup||carryMission.from||carryMission.origin,"ORIGINE").toUpperCase();const to=v130b4PointLabel(carryMission.to||carryMission.destination||carryMission.targetRoom,"DESTINAZIONE").toUpperCase();rows.push({kind:"PHYSICAL",title:item,text:`${from} → ${to}`,meta:carryMission.stage==="pickup"?"F // PRENDI":"G // CONSEGNA",critical:false})}
 if(typeof studioEvent!=="undefined"&&studioEvent&&studioEvent.active!==false)rows.push({kind:"EVENT",title:String(studioEvent.title||studioEvent.name||studioEvent.type||"EVENTO").toUpperCase(),text:String(studioEvent.text||studioEvent.desc||studioEvent.description||"Intervento in corso"),meta:"EVENTO",critical:String(studioEvent.type||"").toUpperCase().includes("MEET")});
 if(Array.isArray(tickets))for(const t of [...tickets].sort((a,b)=>(a.due??9999)-(b.due??9999)).slice(0,3)){const room=String(t.p?.room||t.room||"STUDIO");rows.push({kind:"TICKET",title:v130b4TicketIssue(t),text:t.symptom?`${room} // ${String(t.symptom).replace(/[«»]/g,"")}`:`${room} // ${t.source&&t.source!=="USER"?t.source:"COLLEGA"}`,meta:Number.isFinite(t.due)&&state?`${Math.max(0,Math.ceil(t.due-state.min))} MIN`:"IN CODA",critical:t.level==="CRITICAL"})}
 return rows;
}
function v130b4RenderMinimalHud(){const rows=v130b4TaskRows(),m=rows[0],title=document.getElementById("v130b4TaskTitle"),text=document.getElementById("v130b4TaskText"),more=document.getElementById("v130b4MoreTasks"),icon=document.getElementById("v130b4TaskIcon");if(title)title.textContent=m?.title||"NESSUNA ATTIVITÀ";if(text)text.textContent=m?.text||"Turno sotto controllo.";if(more)more.textContent=rows.length>1?`+${rows.length-1} ATTIVITÀ // TAB`:"";if(icon){icon.textContent=m?.kind==="PHYSICAL"?"F":m?.critical?"!":m?"?":"✓";icon.style.background=m?.critical?"#d67a67":m?"#cbdc91":"#91bd78"}}
function v130b4DrawTabletMap(){const c=document.getElementById("v130b4TabletMap");if(!c||typeof rooms==="undefined")return;const x=c.getContext("2d"),W=c.width,H=c.height,p=12,sx=(W-p*2)/1600,sy=(H-p*2)/1000;x.imageSmoothingEnabled=false;x.fillStyle="#091310";x.fillRect(0,0,W,H);for(const r of rooms){x.fillStyle="#1a2d27";x.fillRect(p+r.x*sx,p+r.y*sy,r.w*sx,r.h*sy);x.strokeStyle="#91bd78";x.strokeRect(p+r.x*sx,p+r.y*sy,r.w*sx,r.h*sy)}if(Array.isArray(tickets))for(const t of tickets){if(t?.p){x.fillStyle=t.level==="CRITICAL"?"#df745f":"#dccb62";x.fillRect(p+t.p.x*sx-3,p+t.p.y*sy-3,7,7)}}if(typeof player!=="undefined"&&player){x.fillStyle="#8fff79";x.fillRect(p+player.x*sx-4,p+player.y*sy-4,9,9)}}


/* 1.0.30B4.1 — TABLET INPUT MODE
   TAB toggles the tablet. While open, mouse clicks remain fully usable
   and ordinary gameplay controls are not forwarded to the world. */
window.addEventListener("keydown",e=>{
 const p=document.getElementById("pda");
 if(!p||p.classList.contains("hidden"))return;

 if(e.key==="Tab"){
   // Main game handler performs the actual toggle.
   return;
 }

 const tag=String(document.activeElement?.tagName||"").toUpperCase();
 const typing=["INPUT","TEXTAREA","SELECT"].includes(tag)||document.activeElement?.isContentEditable;
 if(typing)return;

 const gameplayCodes=[
   "KeyW","KeyA","KeyS","KeyD",
   "ArrowUp","ArrowDown","ArrowLeft","ArrowRight",
   "KeyE","KeyF","KeyG","KeyM"
 ];
 if(gameplayCodes.includes(e.code)){
   e.preventDefault();
   e.stopImmediatePropagation();
 }
},true);



/* ============================================================
   1.0.30B4.2 — DIALOGUE POLISH
   ============================================================ */
function v130b42FitDialogText(el,fullText=""){
 if(!el)return;
 const n=String(fullText||el.textContent||"").length;
 el.style.fontSize=n>150?"13px":n>110?"14px":n>78?"15px":"17px";
}

function v130b42SetSpeakerMeta(shell,name){
 if(!shell)return;
 shell.dataset.speaker=String(name||"IT").toUpperCase();
}

function v130b42HideAutoDialogue(){
 const box=document.getElementById("v130b42AutoDialogue");
 if(box){
   box.classList.add("hidden");
   box.setAttribute("aria-hidden","true");
 }
}

function v130b42ShowAutoDialogue(parts){
 const box=document.getElementById("v130b42AutoDialogue");
 if(!box||!Array.isArray(parts)||!parts.length)return;

 const who=String(parts[0]||"IT").toUpperCase();
 const body=parts.slice(1).filter(Boolean).join("\n");

 const speaker=document.getElementById("v130b42AutoSpeaker");
 const portrait=document.getElementById("v130b42AutoPortrait");
 const text=document.getElementById("v130b42AutoText");

 if(speaker)speaker.textContent=who;
 if(portrait)portrait.textContent=v124PortraitCode(who);
 if(text){
   text.textContent=body;
   v130b42FitDialogText(text,body);
 }
 v130b42SetSpeakerMeta(box,who);
 box.classList.remove("hidden");
 box.setAttribute("aria-hidden","false");
}



/* ============================================================
   1.0.30B4.3 — STORY PORTRAIT DIALOGUE
   ============================================================ */
const V130B43_STORY={
 active:false,
 name:"",
 parts:[],
 index:0,
 shown:0,
 timer:null,
 callback:null
};

function v130b43PortraitPalette(name){
 const n=String(name||"").toUpperCase();
 const playerName=typeof v130b2PlayerName==="function"?v130b2PlayerName():"";
 if(playerName&&n===playerName){
   const female=typeof V130B2_PROFILE!=="undefined"&&V130B2_PROFILE.gender==="female";
   return female
     ?{skin:"#c89e79",hair:"#33221f",shirt:"#69526b",glass:"#26342d",beard:null,stripe:"#d2c58b"}
     :{skin:"#c89e79",hair:"#2b211c",shirt:"#355544",glass:"#26342d",beard:"#3b2921"};
 }
 if(n.includes("ZIA"))return {skin:"#d2a27f",hair:"#d7c382",shirt:"#765d78",glass:null,beard:null};
 if(n.includes("MANAGER"))return {skin:"#caa17e",hair:"#d6d5bd",shirt:"#5b6870",glass:"#26342d",beard:null};
 if(n.includes("CAPO"))return {skin:"#c89d78",hair:"#67665d",shirt:"#4b514f",glass:null,beard:"#5b4c43"};
 if(n.includes("BETTY"))return {skin:"#c89d78",hair:"#342822",shirt:"#536b59",glass:null,beard:null,stripe:"#d9c887"};
 if(n==="DON")return {skin:"#96684f",hair:"#251e1a",shirt:"#4f6959",glass:null,beard:null};
 if(n==="PAO")return {skin:"#c49b78",hair:"#4a3529",shirt:"#506676",glass:null,beard:null};
 if(n.includes("CORRIERE"))return {skin:"#9b7156",hair:"#33261f",shirt:"#61736a",glass:null,beard:null};
 return {skin:"#c89e79",hair:"#2b211c",shirt:"#355544",glass:"#26342d",beard:"#3b2921"};
}

function v130b43DrawStoryPortrait(name){
 const c=document.getElementById("v130b43StoryPortrait");if(!c)return;
 const x=c.getContext("2d");x.imageSmoothingEnabled=false;
 const p=v130b43PortraitPalette(name);
 const W=c.width,H=c.height;
 x.clearRect(0,0,W,H);

 const px=(a,b,w,h,col)=>{x.fillStyle=col;x.fillRect(a,b,w,h)};
 // soft Game Boy silhouette/backdrop
 px(31,22,98,102,"#b7cf9a");
 px(24,36,112,88,"#dfe9d1");

 // hair mass
 px(43,28,74,14,p.hair);
 px(35,40,16,51,p.hair);
 px(109,40,16,51,p.hair);

 // face
 px(48,40,64,55,p.skin);
 px(41,49,9,30,p.skin);
 px(111,49,9,30,p.skin);

 // brows / eyes
 px(58,55,15,5,"#26342d");px(88,55,15,5,"#26342d");
 px(62,61,7,5,"#26342d");px(92,61,7,5,"#26342d");

 // glasses
 if(p.glass){
   x.strokeStyle=p.glass;x.lineWidth=5;
   x.strokeRect(52,51,25,19);x.strokeRect(84,51,25,19);
   px(77,58,7,4,p.glass);
 }

 // nose / mouth
 px(76,65,7,12,"#98745c");
 px(69,82,23,5,"#26342d");
 px(73,79,15,3,"#edf2df");

 // beard if any
 if(p.beard){
   px(57,76,9,14,p.beard);px(95,76,9,14,p.beard);
   px(65,89,31,8,p.beard);
 }

 // torso
 px(43,96,74,28,p.shirt);
 if(p.stripe){
   px(43,105,74,5,p.stripe);px(43,116,74,4,p.stripe);
 }
 // neck
 px(69,91,23,11,p.skin);

 // outline pixels
 x.strokeStyle="#26342d";x.lineWidth=5;
 x.strokeRect(43,96,74,28);
 // slight asymmetry / hair detail
 px(48,31,20,5,"rgba(255,255,255,.15)");
 px(102,42,6,20,"rgba(38,52,45,.35)");
}

function v130b43StoryFit(text){
 const el=document.getElementById("v130b43StoryText");if(!el)return;
 const n=String(text||"").length;
 el.style.fontSize=n>145?"15px":n>105?"17px":n>72?"18px":"20px";
}

function v130b43StoryType(){
 const s=V130B43_STORY;if(!s.active)return;
 clearInterval(s.timer);
 const text=String(s.parts[s.index]||"");
 const el=document.getElementById("v130b43StoryText");
 const cont=document.getElementById("v130b43StoryContinue");
 s.shown=0;
 if(el){el.textContent="";v130b43StoryFit(text)}
 if(cont)cont.textContent="● ● ●";

 s.timer=setInterval(()=>{
   if(!s.active){clearInterval(s.timer);return}
   s.shown=Math.min(text.length,s.shown+1);
   if(el)el.textContent=text.slice(0,s.shown);
   if(s.shown>=text.length){
     clearInterval(s.timer);
     if(cont)cont.textContent="E / ENTER  ▶";
   }
 },24);
}

function v130b43StorySay(name,text,cb=null){
 const scene=document.getElementById("v130b43StoryScene");if(!scene)return false;
 const parts=Array.isArray(text)?text.map(String):[String(text||"")];
 V130B43_STORY.active=true;
 V130B43_STORY.name=String(name||"IT");
 V130B43_STORY.parts=parts;
 V130B43_STORY.index=0;
 V130B43_STORY.callback=cb;

 storyOpen=true;
 dialogPause=true;
 keys={};

 document.getElementById("v130b43StoryWho").textContent=V130B43_STORY.name.toUpperCase();
 v130b43DrawStoryPortrait(V130B43_STORY.name);
 scene.classList.remove("hidden");
 scene.setAttribute("aria-hidden","false");
 v130b43StoryType();
 return true;
}

function v130b43StoryAdvance(){
 const s=V130B43_STORY;if(!s.active)return false;
 const text=String(s.parts[s.index]||"");
 const el=document.getElementById("v130b43StoryText");
 const cont=document.getElementById("v130b43StoryContinue");

 if(s.shown<text.length){
   clearInterval(s.timer);
   s.shown=text.length;
   if(el)el.textContent=text;
   if(cont)cont.textContent="E / ENTER  ▶";
   return true;
 }
 if(s.index<s.parts.length-1){
   s.index++;
   v130b43StoryType();
   return true;
 }

 clearInterval(s.timer);
 s.active=false;
 document.getElementById("v130b43StoryScene")?.classList.add("hidden");
 document.getElementById("v130b43StoryScene")?.setAttribute("aria-hidden","true");
 storyOpen=false;
 dialogPause=false;
 const cb=s.callback;s.callback=null;
 if(typeof cb==="function")cb();
 return true;
}



/* ============================================================
   1.0.30B5 — BIM + CENTRALE DEPARTMENT CASES
   Gameplay loop:
   COLLEGA -> LEGGI STATO -> INTERVIENI.
   No encyclopedic quiz and no strike for simply exploring a clue.
   ============================================================ */
const V130B5_CASES={
 BIM:[
  {
   key:"BIM_PASSWORD",title:"PASSWORD DIMENTICATA",tag:"ACCOUNT",
   symptom:"«Non mi ricordo la password per entrare nel computer.»",
   status:[
    ["WINDOWS / DOMINIO","LOGIN BLOCCATO",1],
    ["AUTODESK ID","SESSIONE ATTIVA",0],
    ["REVIT MODEL","NESSUN ERRORE",0]
   ],
   statusHint:"Prima identifica quale account sta davvero impedendo di lavorare.",
   action:[
    ["VERIFICA BLOCCO ACCOUNT + RESET PASSWORD",1],
    ["REINSTALLA REVIT",0],
    ["CAMBIA LICENZA AUTODESK",0]
   ],
   actionHint:"Il problema è il login Windows: intervieni sull'account, non sui programmi.",
   success:"ACCESSO WINDOWS RIPRISTINATO"
  },
  {
   key:"BIM_LANGUAGE",title:"REVIT IN INGLESE",tag:"REVIT",
   symptom:"«Me lo rimetti in italiano? Da stamattina Revit parte in inglese.»",
   status:[
    ["REVIT","VERSIONE OK",0],
    ["LANGUAGE PACK IT","NON DISPONIBILE",1],
    ["MODELLO BIM","INTEGRO",0]
   ],
   statusHint:"Il programma funziona: cerca cosa manca alla localizzazione.",
   action:[
    ["INSTALLA/ABILITA LINGUA IT E RIAPRI REVIT",1],
    ["RESETTA IL MODELLO",0],
    ["CAMBIA DRIVER GPU",0]
   ],
   actionHint:"Non serve toccare il progetto: va sistemata la lingua dell'applicazione.",
   success:"REVIT RIAPERTO IN ITALIANO"
  },
  {
   key:"BIM_CONNECTOR",title:"DESKTOP CONNECTOR FERMO",tag:"AUTODESK",
   symptom:"«Il progetto cloud non compare più. Ieri c'era.»",
   status:[
    ["AUTODESK ACCOUNT","SIGNED OUT",1],
    ["RETE LAN","ONLINE",0],
    ["REVIT","READY",0]
   ],
   statusHint:"La rete c'è e Revit parte: guarda lo stato del client Autodesk.",
   action:[
    ["RIACCEDI + AGGIORNA DESKTOP CONNECTOR",1],
    ["CAMBIA CAVO MONITOR",0],
    ["SVUOTA LA CODA STAMPA",0]
   ],
   actionHint:"Prima ripristina la sessione del client, poi verifica la sincronizzazione.",
   success:"DESKTOP CONNECTOR SINCRONIZZATO"
  },
  {
   key:"BIM_ADDIN",title:"REVIT CRASHA ALL'AVVIO",tag:"ADD-IN",
   symptom:"«Da quando hanno aggiornato il plugin ieri, Revit si chiude appena parte.»",
   status:[
    ["REVIT CORE","OK",0],
    ["ADD-IN RECENTE","LOAD ERROR",1],
    ["GPU","DRIVER OK",0]
   ],
   statusHint:"Il sintomo è comparso dopo un cambiamento preciso: isola quella variabile.",
   action:[
    ["DISABILITA ADD-IN E RIAPRI IN MODALITÀ PULITA",1],
    ["RESETTA PASSWORD",0],
    ["CAMBIA DNS",0]
   ],
   actionHint:"Prima conferma che Revit funzioni senza il componente sospetto.",
   success:"REVIT AVVIATO // ADD-IN ISOLATO"
  }
 ],
 CENTRALE:[
  {
   key:"CENT_XREF",title:"XREF MANCANTE",tag:"AUTOCAD",
   symptom:"«Il DWG si apre, ma sono sparite le basi esterne.»",
   status:[
    ["DWG PRINCIPALE","APERTO",0],
    ["XREF PROGETTO","NOT FOUND",1],
    ["LICENZA","ATTIVA",0]
   ],
   statusHint:"Il file principale è sano: controlla i riferimenti esterni.",
   action:[
    ["RIPRISTINA PERCORSO XREF / RELATIVE PATH",1],
    ["REINSTALLA AUTOCAD",0],
    ["RESETTA LA PASSWORD WINDOWS",0]
   ],
   actionHint:"Serve ripuntare il riferimento, non reinstallare il software.",
   success:"XREF RICOLLEGATA"
  },
  {
   key:"CENT_LICENSE",title:"AUTOCAD NON PARTE",tag:"LICENZA",
   symptom:"«AutoCAD continua a chiedermi l'accesso e oggi non vuole partire.»",
   status:[
    ["AUTODESK AUTH","TOKEN SCADUTO",1],
    ["DWG","OK",0],
    ["STAMPANTE","ONLINE",0]
   ],
   statusHint:"Il problema avviene prima di aprire un disegno: guarda autenticazione/licenza.",
   action:[
    ["RINNOVA SESSIONE + VERIFICA SERVIZIO LICENZA",1],
    ["CAMBIA CTB",0],
    ["RESETTA IL ROUTER",0]
   ],
   actionHint:"Ripristina la sessione Autodesk e controlla il servizio di licensing.",
   success:"AUTOCAD AUTENTICATO"
  },
  {
   key:"CENT_NETWORK",title:"PC SENZA SERVER",tag:"RETE",
   symptom:"«Non apro più il server e sull'icona rete c'è il punto esclamativo.»",
   status:[
    ["IP CLIENT","169.254.44.18",1],
    ["DNS","NON TESTATO",0],
    ["AUTOCAD","CHIUSO",0]
   ],
   statusHint:"Prima di parlare di server, guarda se il PC ha ricevuto un indirizzo valido.",
   action:[
    ["VERIFICA LINK/CAVO + RINNOVA DHCP",1],
    ["REINSTALLA REVIT",0],
    ["CAMBIA ACCOUNT ADOBE",0]
   ],
   actionHint:"Un indirizzo 169.254 indica che devi partire da link e assegnazione IP.",
   success:"RETE CLIENT RIPRISTINATA"
  },
  {
   key:"CENT_CTB",title:"STAMPA CON SPESSORI SBAGLIATI",tag:"PLOT",
   symptom:"«A video è giusto, ma quando stampo vengono tutte le penne sbagliate.»",
   status:[
    ["MODEL SPACE","OK",0],
    ["PLOT STYLE","CTB UFFICIO MANCANTE",1],
    ["RETE","ONLINE",0]
   ],
   statusHint:"Il disegno è corretto: il difetto compare solo in fase di stampa.",
   action:[
    ["CARICA CTB UFFICIO + RIASSEGNA PLOT STYLE",1],
    ["RESETTA XREF",0],
    ["CAMBIA DRIVER GPU",0]
   ],
   actionHint:"Correggi lo stile di stampa associato al layout.",
   success:"PLOT STYLE RIPRISTINATO"
  }
 ]
};

const V130B5_DECK={BIM:[],CENTRALE:[]};

function v130b5PickCase(room){
 const key=String(room||"").toUpperCase();
 const bank=V130B5_CASES[key];if(!bank)return null;
 if(!V130B5_DECK[key].length){
   V130B5_DECK[key]=bank.map((_,i)=>i);
   for(let i=V130B5_DECK[key].length-1;i>0;i--){
     const j=Math.floor(Math.random()*(i+1));
     [V130B5_DECK[key][i],V130B5_DECK[key][j]]=[V130B5_DECK[key][j],V130B5_DECK[key][i]];
   }
 }
 return bank[V130B5_DECK[key].pop()];
}

function v130b5AssignCase(ticket){
 if(!ticket?.p)return ticket;
 const room=String(ticket.p.room||"").toUpperCase();
 if(room!=="BIM"&&room!=="CENTRALE")return ticket;
 const c=v130b5PickCase(room);if(!c)return ticket;
 ticket.taskType="DEPT_CASE";
 ticket.caseKey=c.key;
 ticket.caseTitle=c.title;
 ticket.caseTag=c.tag;
 ticket.symptom=c.symptom;
 return ticket;
}

function v130b5CaseForTicket(t){
 if(!t?.caseKey)return null;
 const all=[...V130B5_CASES.BIM,...V130B5_CASES.CENTRALE];
 return all.find(c=>c.key===t.caseKey)||null;
}

function v130b5CaseFeedback(text,good=false){
 const el=document.getElementById("v130b5CaseFeedback");if(!el)return;
 el.className="v130b5-casefeedback "+(good?"good":"");
 el.textContent=text;
}

function v130b5SoftMiss(text){
 if(!activeMiniGame)return;
 activeMiniGame.caseAttempts=(activeMiniGame.caseAttempts||0)+1;
 state.stress=Math.min(100,state.stress+1);
 const el=document.getElementById("v130b51Feedback")||document.getElementById("v130b5CaseFeedback");
 if(el){el.className="v130b51-feedback";el.textContent=text}
 hud();
}


function v130b55ObjectiveForCase(key){
 const map={
   CENT_CTB:"Scegli il file CTB che corrisponde allo STANDARD mostrato, inseriscilo nello slot e prova l'anteprima.",
   CENT_XREF:"Scegli il percorso coerente con la struttura cartelle mostrata e premi RICOLLEGA XREF.",
   CENT_NETWORK:"Ripara il tratto rosso della rete, poi premi RENEW DHCP.",
   BIM_LANGUAGE:"Seleziona/installa ITALIANO e poi premi AVVIA REVIT.",
   BIM_ADDIN:"Spegni il plugin indicato dal log come nuovo/sospetto e prova AVVIA REVIT.",
   BIM_CONNECTOR:"Riporta AUTODESK ID online e poi premi SYNC PROJECTS.",
   CENT_LICENSE:"Porta a verde TOKEN e LICENSING SERVICE, poi avvia AutoCAD.",
   BIM_PASSWORD:"Seleziona l'account con stato LOCKED e premi RESET PASSWORD + SBLOCCA."
 };
 return map[key]||"Interagisci con il pannello e verifica il risultato.";
}

function v130b5RenderDeptCase(i){
 const t=tickets[i],c=v130b5CaseForTicket(t);if(!t||!c)return;
 const body=document.getElementById("modalBody");
 activeMiniGame.caseKey=c.key;
 activeMiniGame.caseState=activeMiniGame.caseState||{};
 const s=activeMiniGame.caseState;

 const shell=(inner,help="")=>{
   body.innerHTML=miniHeader(t,`${c.tag} // ${c.title}`,"Risolvi il problema sulla postazione.")+
   `<div class="v130b51-puzzle">
      <div class="v130b51-symptom">${v130b4Esc(c.symptom)}</div>
      <div class="v130b55-objective">
        <b>OBIETTIVO</b>
        <span>${v130b4Esc(v130b55ObjectiveForCase(c.key))}</span>
      </div>
      ${inner}
      ${help?`<div class="v130b51-help"><b>INDIZIO</b> // ${v130b4Esc(help)}</div>`:""}
      <div id="v130b51Feedback" class="v130b51-feedback">Interagisci con il pannello e osserva cosa cambia.</div>
    </div><div id="miniError"></div>`;
 };
 const feedback=(txt,good=false)=>{
   const el=document.getElementById("v130b51Feedback");if(!el)return;
   el.className="v130b51-feedback"+(good?" good":" bad");el.textContent=txt;
 };
 const miss=(txt)=>{
   if(!activeMiniGame)return;
   miniMistake(txt);
   const n=activeMiniGame?.errors||0;
   feedback(`✕ ${txt} // ERRORE ${n}/3`,false);
 };
 const success=(txt)=>{feedback(txt,true);setTimeout(()=>miniSuccess(i,txt,true),520)};

 if(c.key==="CENT_CTB"){
   s.slot=s.slot||null;
   shell(`<div class="v130b51-panel">
      <div class="v130b51-panelhead"><span>AUTOCAD // PLOT STYLE</span><span>STANDARD // UFFICIO_ARCH</span></div>
      <div class="v130b51-grid3">
        <div class="v130b51-file" draggable="true" data-ctb="MONO">MONOCHROME.CTB</div>
        <div class="v130b51-file" draggable="true" data-ctb="UFFICIO">UFFICIO_ARCH.CTB</div>
        <div class="v130b51-file" draggable="true" data-ctb="SCREEN">SCREENING.CTB</div>
      </div>
      <div id="v130b51CtbSlot" class="v130b51-slot ${s.slot==="UFFICIO"?"good":""}">${s.slot?`${s.slot}.CTB`:"TRASCINA QUI IL PLOT STYLE"}</div>
      <button id="v130b51Print" class="v130b51-sync">ANTEPRIMA DI STAMPA</button>
      <div id="v130b51Preview" class="v130b51-preview">LINEE // 0.10 · 0.18 · 0.35</div>
    </div>`,"Il pannello indica lo STANDARD richiesto. Abbina quel nome al file CTB.");
   const slot=body.querySelector("#v130b51CtbSlot");
   body.querySelectorAll("[data-ctb]").forEach(f=>{
     f.ondragstart=e=>{e.dataTransfer.setData("text/plain",f.dataset.ctb);f.classList.add("dragging")};
     f.ondragend=()=>f.classList.remove("dragging");
     f.onclick=()=>{s.slot=f.dataset.ctb;v130b5RenderDeptCase(i)};
   });
   slot.ondragover=e=>e.preventDefault();
   slot.ondrop=e=>{e.preventDefault();s.slot=e.dataTransfer.getData("text/plain");v130b5RenderDeptCase(i)};
   body.querySelector("#v130b51Print").onclick=()=>{
     const p=body.querySelector("#v130b51Preview");
     if(s.slot==="UFFICIO"){p.className="v130b51-preview good";p.textContent="ANTEPRIMA OK // SPESSORI UFFICIO";success(c.success)}
     else{p.className="v130b51-preview bad";p.textContent="ANTEPRIMA ERRATA // PENNE FUORI STANDARD";miss("La stampa è ancora sbagliata: cambia CTB.")}
   };return;
 }

 if(c.key==="CENT_XREF"){
   shell(`<div class="v130b51-panel">
     <div class="v130b51-panelhead"><span>XREF MANAGER</span><span>PROGETTO / 01_DWG / FILE CORRENTE</span></div>
     <div class="v130b51-xref"><div class="v130b51-node on">PROGETTO.DWG</div><div class="v130b51-arrow">→</div><div class="v130b51-node off">BASE_ARCH.DWG<br>?</div></div>
     <div class="v130b51-grid3">
       <button class="v130b51-path" data-path="../00_BASI/BASE_ARCH.DWG">../00_BASI/<br>BASE_ARCH.DWG</button>
       <button class="v130b51-path" data-path="C:/DOWNLOAD/BASE_ARCH.DWG">C:/DOWNLOAD/<br>BASE_ARCH.DWG</button>
       <button class="v130b51-path" data-path="../EXPORT/BASE_ARCH.DWG">../EXPORT/<br>BASE_ARCH.DWG</button>
     </div>
     <button id="v130b51Relink" class="v130b51-sync" disabled>RICOLLEGA XREF</button>
   </div>`,"La base è nella cartella sorella 00_BASI: dal DWG corrente devi risalire di un livello.");
   body.querySelectorAll("[data-path]").forEach(b=>b.onclick=()=>{
     s.path=b.dataset.path;body.querySelectorAll("[data-path]").forEach(x=>x.classList.toggle("selected",x===b));
     body.querySelector("#v130b51Relink").disabled=false;feedback(`PERCORSO // ${s.path}`);
   });
   body.querySelector("#v130b51Relink").onclick=()=>s.path==="../00_BASI/BASE_ARCH.DWG"?success(c.success):miss("Si collega al posto sbagliato. Cerca la cartella basi del progetto.");
   return;
 }

 if(c.key==="CENT_NETWORK"){
   s.linkFixed=!!s.linkFixed;
   shell(`<div class="v130b51-panel">
     <div class="v130b51-panelhead"><span>RETE CLIENT</span><span>IP 169.254.44.18</span></div>
     <div class="v130b51-netline">
       <div class="v130b51-node on">PC</div><div id="v130b51Cable" class="v130b51-link ${s.linkFixed?"":"off"}"></div>
       <div class="v130b51-node ${s.linkFixed?"on":"off"}">SWITCH</div><div class="v130b51-link"></div><div class="v130b51-node on">DHCP</div>
     </div>
     <button id="v130b51Dhcp" class="v130b51-sync">RENEW DHCP</button>
     <div id="v130b51Ip" class="v130b51-preview">${s.linkFixed?"LINK OK // IN ATTESA DHCP":"LINK DOWN // APIPA 169.254.44.18"}</div>
   </div>`,"Sistema il collegamento e poi chiedi un nuovo indirizzo.");
   body.querySelector("#v130b51Cable").onclick=()=>{s.linkFixed=true;v130b5RenderDeptCase(i)};
   body.querySelector("#v130b51Dhcp").onclick=()=>{
     const p=body.querySelector("#v130b51Ip");
     if(s.linkFixed){p.className="v130b51-preview good";p.textContent="IP 10.20.14.83 // SERVER OK";success(c.success)}
     else{p.className="v130b51-preview bad";p.textContent="RENEW FALLITO // NO LINK";miss("Nessun link: il DHCP non può ancora rispondere.")}
   };return;
 }

 if(c.key==="BIM_LANGUAGE"){
   shell(`<div class="v130b51-panel">
     <div class="v130b51-panelhead"><span>REVIT LAUNCHER</span><span>LANGUAGE</span></div>
     <div class="v130b51-launcher">
       <button class="v130b51-lang ${s.lang==="ENU"?"selected":""}" data-lang="ENU">ENGLISH<br>INSTALLED</button>
       <button class="v130b51-lang ${s.lang==="ITA"?"selected":""}" data-lang="ITA">ITALIANO<br>${s.itaInstalled?"INSTALLED":"DOWNLOAD"}</button>
       <button class="v130b51-lang" data-lang="DEU">DEUTSCH<br>NOT INSTALLED</button>
     </div>
     <button id="v130b51RevitRestart" class="v130b51-sync">AVVIA REVIT</button>
     <div class="v130b51-preview">LANGUAGE // ${s.lang||"ENU"}</div>
   </div>`,"Installa/seleziona ITA e riapri Revit.");
   body.querySelectorAll("[data-lang]").forEach(b=>b.onclick=()=>{
     if(b.dataset.lang==="ITA"){s.itaInstalled=true;s.lang="ITA";v130b5RenderDeptCase(i)}
     else if(b.dataset.lang==="ENU"){s.lang="ENU";v130b5RenderDeptCase(i)}
     else miss("Quel language pack non è installato.");
   });
   body.querySelector("#v130b51RevitRestart").onclick=()=>s.lang==="ITA"&&s.itaInstalled?success(c.success):miss("Revit riparte ancora in inglese.");
   return;
 }

 if(c.key==="BIM_ADDIN"){
   s.plugins=s.plugins||{DYNAMO:true,EXPORT:true,COORD:true,NEWPLUGIN:true};
   shell(`<div class="v130b51-panel">
     <div class="v130b51-panelhead"><span>REVIT ADD-IN MANAGER</span><span>SAFE START</span></div>
     <div class="v130b51-grid2">${Object.entries(s.plugins).map(([k,on])=>`<button class="v130b51-plugin ${on?"":"off"}" data-plugin="${k}">${k}<br>${on?"ON":"OFF"}</button>`).join("")}</div>
     <button id="v130b51LaunchRevit" class="v130b51-sync">AVVIA REVIT</button>
     <div id="v130b51RevitState" class="v130b51-preview">REVIT // READY TO TEST</div>
   </div>`,"Isola il plugin che ha iniziato a dare problemi.");
   body.querySelectorAll("[data-plugin]").forEach(b=>b.onclick=()=>{const k=b.dataset.plugin;s.plugins[k]=!s.plugins[k];v130b5RenderDeptCase(i)});
   body.querySelector("#v130b51LaunchRevit").onclick=()=>{
     const p=body.querySelector("#v130b51RevitState");
     if(!s.plugins.NEWPLUGIN&&s.plugins.DYNAMO&&s.plugins.EXPORT&&s.plugins.COORD){p.className="v130b51-preview good";p.textContent="REVIT AVVIATO // PLUGIN ISOLATO";success(c.success)}
     else if(s.plugins.NEWPLUGIN){p.className="v130b51-preview bad";p.textContent="CRASH // ADD-IN LOAD ERROR";miss("Il plugin difettoso è ancora attivo.")}
     else{p.textContent="REVIT AVVIATO // TROPPI ADD-IN OFF";miss("Hai spento anche plugin sani: riattivali.")}
   };return;
 }

 if(c.key==="BIM_CONNECTOR"){
   s.signed=!!s.signed;
   shell(`<div class="v130b51-panel">
     <div class="v130b51-panelhead"><span>DESKTOP CONNECTOR</span><span>${s.signed?"SIGNED IN":"SIGNED OUT"}</span></div>
     <div class="v130b51-grid2"><div class="v130b51-node ${s.signed?"on":"off"}">AUTODESK ID<br>${s.signed?"ONLINE":"OFFLINE"}</div><div class="v130b51-node ${s.synced?"on":"off"}">ACC PROJECTS<br>${s.synced?"SYNCED":"NOT MOUNTED"}</div></div>
     <button id="v130b51Sign" class="v130b51-sync">${s.signed?"ACCOUNT CONNESSO":"ACCEDI AUTODESK"}</button>
     <button id="v130b51Sync" class="v130b51-sync" ${s.signed?"":"disabled"}>SYNC PROJECTS</button>
   </div>`,"Ripristina prima la sessione, poi sincronizza.");
   body.querySelector("#v130b51Sign").onclick=()=>{s.signed=true;v130b5RenderDeptCase(i)};
   body.querySelector("#v130b51Sync").onclick=()=>{if(s.signed){s.synced=true;success(c.success)}};
   return;
 }

 if(c.key==="CENT_LICENSE"){
   s.auth=!!s.auth;s.service=!!s.service;
   shell(`<div class="v130b51-panel">
     <div class="v130b51-panelhead"><span>AUTODESK ACCESS</span><span>LICENSING</span></div>
     <div class="v130b51-service"><span>ACCOUNT TOKEN // ${s.auth?"VALID":"EXPIRED"}</span><div class="led ${s.auth?"on":""}"></div></div>
     <div class="v130b51-service"><span>ADSK LICENSING SERVICE // ${s.service?"RUNNING":"STOPPED"}</span><div class="led ${s.service?"on":""}"></div></div>
     <div class="v130b51-grid2"><button id="v130b51Auth" class="v130b51-button ${s.auth?"active":""}">RINNOVA SESSIONE</button><button id="v130b51Service" class="v130b51-button ${s.service?"active":""}">AVVIA SERVIZIO</button></div>
     <button id="v130b51CadLaunch" class="v130b51-sync">AVVIA AUTOCAD</button>
   </div>`,"Rimetti in linea autenticazione e servizio licenza.");
   body.querySelector("#v130b51Auth").onclick=()=>{s.auth=true;v130b5RenderDeptCase(i)};
   body.querySelector("#v130b51Service").onclick=()=>{s.service=true;v130b5RenderDeptCase(i)};
   body.querySelector("#v130b51CadLaunch").onclick=()=>s.auth&&s.service?success(c.success):miss("AutoCAD non parte ancora: manca un requisito di licensing.");
   return;
 }

 if(c.key==="BIM_PASSWORD"){
   s.account=s.account||null;
   shell(`<div class="v130b51-panel">
     <div class="v130b51-panelhead"><span>IT ADMIN // ACCOUNT</span><span>POSTAZIONE BIM</span></div>
     <div class="v130b51-admin">
       <button class="v130b51-account ${s.account==="WINDOWS"?"selected":""}" data-account="WINDOWS"><b>WINDOWS / DOMINIO</b><span>LOCKED</span></button>
       <button class="v130b51-account ${s.account==="AUTODESK"?"selected":""}" data-account="AUTODESK"><b>AUTODESK ID</b><span>SESSION ACTIVE</span></button>
       <button class="v130b51-account ${s.account==="MAIL"?"selected":""}" data-account="MAIL"><b>MICROSOFT 365</b><span>ONLINE</span></button>
     </div>
     <button id="v130b51ResetPwd" class="v130b51-sync" ${s.account?"":"disabled"}>RESET PASSWORD + SBLOCCA</button>
   </div>`,"Intervieni sull'account che impedisce davvero il login.");
   body.querySelectorAll("[data-account]").forEach(b=>b.onclick=()=>{s.account=b.dataset.account;v130b5RenderDeptCase(i)});
   body.querySelector("#v130b51ResetPwd").onclick=()=>s.account==="WINDOWS"?success(c.success):miss("Quell'account risulta già operativo.");
   return;
 }

 shell(`<div class="v130b51-panel"><div class="v130b51-preview">PUZZLE NON CONFIGURATO // ${v130b4Esc(c.key)}</div></div>`);
}




/* ============================================================
   1.0.30B5.6.3 — ESC BACK NAVIGATION
   ESC closes the top-most ordinary UI layer.
   Story Portraits / cinematic dialogue intentionally keep E/ENTER.
   ============================================================ */
function v130b563EscBack(){
 // Do not cancel narrative scenes or the locked intro with ESC.
 if(typeof V130B43_STORY!=="undefined"&&V130B43_STORY.active)return false;
 if(typeof V129_INTRO!=="undefined"&&V129_INTRO.locked)return false;

 // Proof/debug menu.
 if(typeof V130B0_PROOF!=="undefined"&&V130B0_PROOF.open){
   if(typeof v130b0Close==="function")v130b0Close();
   return true;
 }

 // Tablet.
 const pda=document.getElementById("pda");
 if(pda&&!pda.classList.contains("hidden")){
   if(typeof togglePDA==="function")togglePDA(false);
   else pda.classList.add("hidden");
   return true;
 }

 // Full map view.
 if(typeof fullMap!=="undefined"&&fullMap){
   fullMap=false;
   if(typeof toast==="function")toast("MAPPA CHIUSA");
   return true;
 }

 // Reward/result overlay.
 const reward=document.getElementById("rewardOverlay");
 if(reward&&!reward.classList.contains("hidden")){
   reward.classList.add("hidden");
   if(window.__rewardTimer)clearTimeout(window.__rewardTimer);
   if(typeof flushDeferredDialog==="function")setTimeout(flushDeferredDialog,80);
   return true;
 }

 // Ordinary task / puzzle modal.
 const modal=document.getElementById("modal");
 if(modal&&!modal.classList.contains("hidden")){
   modal.classList.add("hidden");

   // ESC is a cancel/back action, not a wrong answer.
   // The ticket remains open and can be reopened from the workstation.
   activeMiniGame=null;
   storyOpen=false;
   uiMessageBusy=false;
   dialogPause=false;

   document.body?.classList?.remove("modal-open","locked","paused");
   if(typeof hud==="function")hud();
   if(typeof updateTaskProgress==="function")updateTaskProgress();
   return true;
 }

 // Normal legacy dialogue shell: ESC may close only non-Story ordinary menus/cards.
 const auto=document.getElementById("v130b42AutoDialogue");
 if(auto&&!auto.classList.contains("hidden")){
   if(typeof v130b42HideAutoDialogue==="function")v130b42HideAutoDialogue();
   return true;
 }

 return false;
}

document.addEventListener("keydown",function v130b563EscInput(e){
 if(e.key!=="Escape")return;

 const ae=document.activeElement;
 const tag=String(ae?.tagName||"").toUpperCase();
 if(["INPUT","TEXTAREA","SELECT"].includes(tag)){
   ae.blur();
   e.preventDefault();
   e.stopImmediatePropagation();
   return;
 }

 if(v130b563EscBack()){
   e.preventDefault();
   e.stopImmediatePropagation();
 }
},true);

