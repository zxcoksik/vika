const R="Твоя улыбка включает свет|Ты подмигиваешь — и мир добрее|Ты умеешь радоваться мелочам|С тобой любая погода уютная|Твой смех заразителен|Ты красиво молчишь рядом|Рядом с тобой будни — праздник|В твоих глазах целая история|Ты мягкая, как зимнее облако|Ты веришь в чудеса|Ты умеешь удивлять|Ты делаешь моё утро лучше|Ты настоящая|У тебя своё чувство стиля|Ты вдохновляешь|Ты слушаешь, а не просто слышишь|Ты тёплая даже в мороз|Твои объятия лечат|Ты смелая в мечтах|Ты умеешь прощать|Ты красиво говоришь «привет»|Ты моя любимая случайность|Ты заставляешь улыбаться без повода|Твой голос — мой любимый звук|Ты умеешь поддержать|Ты не боишься быть собой|С тобой легко|С тобой интересно|Ты упрямая, и это мило|Ты замечаешь красоту вокруг|Ты превращаешь вечер в сказку|Ты пахнешь домом|Ты умеешь мечтать вслух|Твоя доброта настоящая|Ты ловишь моменты|Ты красива в любом настроении|Ты находишь выход из всего|Ты самый тёплый человек|У тебя прекрасные идеи|Ты любишь жизнь|Ты умеешь заботиться|Ты светишься на фото и без них|Ты вкусно смеёшься|С тобой чай вкуснее|Ты делаешь тишину уютной|Твоя походка — моё кино|Ты танцуешь без музыки|Ты помнишь важные мелочи|С тобой хочется быть лучше|Ты моё «домой»|Ты рисуешь настроение в воздухе|Ты умная, и это прекрасно|Ты умеешь быть нежной|Ты сильнее, чем думаешь|Ты добавляешь красок|У тебя красивые руки|Ты умеешь ждать|Ты не сдаёшься|Ты мой повод для улыбки|Ты придаёшь смысл мелочам|С тобой не страшно|Ты любишь Новый год, как ребёнок|Ты делаешь зиму волшебной|Ты зимняя сказка|Ты красиво поправляешь волосы|Рядом с тобой я счастливее|Ты умеешь удивляться|Твой взгляд говорит больше слов|Ты мой любимый разговор|Ты вкладываешь душу во всё|Ты мой самый красивый сюрприз|Ты умеешь быть рядом|Ты бесконечно милая|Ты моя муза|У тебя доброе сердце|Ты шутишь так, что хочется записать|Ты выбираешь хорошее|Ты красиво мечтаешь о будущем|С тобой каждое «сегодня» особенное|Ты умеешь обнимать словами|Ты не такая, как все|Ты настоящее чудо|Ты украшаешь любой кадр|Ты мой любимый человек|Ты причина смотреть на звёзды|Ты добавляешь магии в обычное|Ты умеешь радовать|Ты тёплый свет в холодный вечер|Ты красивая внутри и снаружи|Ты мой лучший день|С тобой время летит|Ты умеешь любить|Ты вдохновляешь меня мечтать|Ты моя радость|Просто потому, что это ты|Ты лучшее, что случилось|Ты делаешь мир нежнее|Ты моя любимая история|Ты моё счастье|Потому что ты — Вика ♥".split("|");
const $=s=>document.querySelector(s),RM=matchMedia("(prefers-reduced-motion:reduce)").matches;

let seen=new Set();
try{seen=new Set(JSON.parse(localStorage.getItem("vika100")||"[]"))}catch(e){}
const save=()=>{try{localStorage.setItem("vika100",JSON.stringify([...seen]))}catch(e){}};
const grid=$("#grid"),N=R.length;
R.forEach((_,i)=>{const b=document.createElement("button");b.className="t"+(seen.has(i)?" on":"");b.textContent=i+1;b.setAttribute("aria-label","Причина "+(i+1));b.onclick=()=>reveal(i,true);grid.append(b)});
const tiles=[...grid.children];

function burst(el){if(RM)return;const r=el.getBoundingClientRect();for(let k=0;k<9;k++){const h=document.createElement("i"),a=Math.random()*6.28,d=40+Math.random()*70;h.className="h";h.textContent=["✦","♥","🌸"][k%3];h.style.cssText=`--px:${r.left+r.width/2}px;--py:${r.top+r.height/2}px;--dx:${Math.cos(a)*d}px;--dy:${Math.sin(a)*d-40}px`;h.onanimationend=()=>h.remove();document.body.append(h)}}
function show(i){$("#no").textContent="Причина №"+(i+1);const t=$("#txt");t.classList.remove("in");void t.offsetWidth;t.textContent=R[i];t.classList.add("in")}
function update(fx){const n=seen.size;$("#bar").style.width=n/N*100+"%";$("#count").textContent="Открыто "+n+" из "+N;const done=n===N,end=$("#end"),was=end.hidden;end.hidden=!done;if(done&&was&&fx){end.scrollIntoView({behavior:"smooth",block:"center"});setTimeout(()=>burst(end.querySelector("h2")),500)}}
function reveal(i,fx){seen.add(i);tiles[i].classList.add("on");show(i);if(fx)burst(tiles[i]);update(fx);save()}
$("#rnd").onclick=()=>{const left=tiles.map((_,i)=>i).filter(i=>!seen.has(i)),pool=left.length?left:tiles.map((_,i)=>i);reveal(pool[Math.random()*pool.length|0],true)};
$("#rst").onclick=()=>{seen.clear();tiles.forEach(t=>t.classList.remove("on"));$("#no").textContent="";$("#txt").textContent="Выбери любую карточку";$("#txt").classList.remove("in");update(false);save();$("#reasons").scrollIntoView({behavior:"smooth"})};
update(false);

const cv=$("#snow"),cx=cv.getContext("2d");let W,H;const F=[];
const rs=()=>{W=cv.width=innerWidth;H=cv.height=innerHeight};addEventListener("resize",rs);rs();
for(let i=0;i<45;i++)F.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.8+.6,v:Math.random()*.5+.25,p:Math.random()*6});
if(!RM)(function loop(t){cx.clearRect(0,0,W,H);cx.fillStyle="rgba(244,185,214,.6)";for(const f of F){f.y+=f.v;f.x+=Math.sin(t/1600+f.p)*.35;if(f.y>H+5){f.y=-5;f.x=Math.random()*W}cx.beginPath();cx.arc(f.x,f.y,f.r,0,7);cx.fill()}requestAnimationFrame(loop)})(0);



const Q=[["Кто здесь самая красивая?",["Вика","Конечно, Вика","Вика, без вариантов"]],["Кто делает любой день лучше?",["Вика","Тоже Вика","Угадай с трёх раз: Вика"]],["Кого хочется обнять прямо сейчас?",["Вику","Вику, очень крепко","Вику, и не отпускать"]]];
let qi=0;
function quiz(){const box=$("#quiz");
 if(qi>=Q.length){box.innerHTML='<p class="qn">[ Результат ]</p><p class="res"><span id="pc">0</span>%</p><p class="rt">Вика — лучшая. Тест это подтвердил.</p><div><button class="btn" id="qr">Пройти ещё раз</button></div>';
  const pc=$("#pc");let v=0;const id=setInterval(()=>{v+=4;pc.textContent=Math.min(v,100);if(v>=100){clearInterval(id);burst(pc)}},35);
  $("#qr").onclick=()=>{qi=0;quiz()};return}
 box.innerHTML='<p class="qn">[ Вопрос '+(qi+1)+' из '+Q.length+' ]</p><p class="qt">'+Q[qi][0]+'</p><div class="opts">'+Q[qi][1].map(o=>'<button class="btn ghost opt">'+o+'</button>').join("")+'</div>';
 const bs=[...box.querySelectorAll(".opt")];
 bs.forEach(b=>b.onclick=()=>{b.classList.add("ok");bs.forEach(x=>x.disabled=true);burst(b);setTimeout(()=>{qi++;quiz()},900)})}
quiz();

const S=[[200,325],[130,255],[72,190],[55,120],[85,68],[140,48],[200,100],[260,48],[315,68],[345,120],[328,190],[270,255]];
let k=0;const sk=$("#sky"),NS="http://www.w3.org/2000/svg";
function el(n,a,p){const e=document.createElementNS(NS,n);for(const x in a)e.setAttribute(x,a[x]);(p||sk).append(e);return e}
for(let i=0;i<46;i++)el("circle",{cx:Math.random()*400,cy:Math.random()*360,r:Math.random()*1.1+.4,fill:"#fdf4f8",opacity:Math.random()*.5+.15});
const fill=el("path",{d:"M"+S.map(p=>p.join(" ")).join("L")+"Z",fill:"#f4b9d6",class:"hf"}),lines=el("g",{});
[[200,180],[150,130],[250,130],[200,250],[110,160],[290,160],[160,220],[240,220],[30,60],[370,50],[20,300],[380,310],[200,20],[40,230],[365,240],[120,330]].forEach(p=>{const g=el("g",{class:"st",tabindex:0,role:"button","aria-label":"Звезда"});el("circle",{cx:p[0],cy:p[1],r:16,fill:"transparent"},g);el("circle",{cx:p[0],cy:p[1],r:5,fill:"#fdf4f8",class:"core"},g);g.onclick=()=>shake(g);g.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();shake(g)}}});
const st=S.map((p,i)=>{const g=el("g",{class:"st",tabindex:0,role:"button","aria-label":"Звезда "+(i+1)});el("circle",{cx:p[0],cy:p[1],r:16,fill:"transparent"},g);el("circle",{cx:p[0],cy:p[1],r:11,class:"ring",fill:"none",stroke:"#f4b9d6"},g);el("circle",{cx:p[0],cy:p[1],r:5,fill:"#fdf4f8",class:"core"},g);g.onclick=()=>pick(i);g.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();pick(i)}};return g});
function link(a,b){const A=S[a],B=S[b],l=el("line",{x1:A[0],y1:A[1],x2:B[0],y2:B[1]},lines);l.style.setProperty("--len",Math.hypot(A[0]-B[0],A[1]-B[1]))}
function shake(g){g.classList.remove("bad");void g.getBoundingClientRect();g.classList.add("bad")}
function mark(){st.forEach((g,i)=>{g.classList.toggle("on",i<k);g.classList.toggle("next",i===k)});$("#sinfo").textContent=k>=S.length?"Готово! Это сердце, а точнее созвездие Вики. Ярче него на небе нет.":"Соединено звёзд: "+k+" из "+S.length+". Нажми на звезду с мерцающим кольцом."}
function pick(i){if(k>=S.length)return;if(i!==k){shake(st[i]);return}
 if(k>0)link(k-1,k);k++;burst(st[i].querySelector(".core"));
 if(k===S.length){link(S.length-1,0);fill.classList.add("lit");setTimeout(()=>burst(st[0].querySelector(".core")),600)}
 mark()}
$("#sr").onclick=()=>{k=0;lines.replaceChildren();fill.classList.remove("lit");mark()};
mark();
