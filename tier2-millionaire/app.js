const root = document.getElementById('app');
const money = ['100','500','1,000','8,000','32,000','125,000','500,000','1,000,000'];
const SESSION_MS = 5 * 60 * 1000;
let state = null;
let clock = null;

function shuffle(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;}
function blankSession(){return {started:false,endsAt:0,bestTickets:0,usedLifelines:[]};}
function loadSession(){try{return JSON.parse(sessionStorage.getItem('graniteTier2Millionaire'))||blankSession();}catch(e){return blankSession();}}
function saveSession(s){sessionStorage.setItem('graniteTier2Millionaire',JSON.stringify(s));}
let session = loadSession();

function secondsLeft(){return session.started?Math.max(0,Math.ceil((session.endsAt-Date.now())/1000)):300;}
function fmtTime(sec){return Math.floor(sec/60)+':'+String(sec%60).padStart(2,'0');}
function ticketsForCorrectCount(n){if(n>=8)return 5;if(n>=6)return 2;if(n>=4)return 1;return 0;}
function updateBest(n){session.bestTickets=Math.max(session.bestTickets,ticketsForCorrectCount(n));saveSession(session);}
function ticketMilestone(i){if(i===3)return ' · 🎟️ 1';if(i===5)return ' · 🎟️ 2';if(i===7)return ' · 🎟️ 5';return '';}
function startClock(){
  clearInterval(clock);
  clock=setInterval(()=>{
    const el=document.getElementById('timer');
    const left=secondsLeft();
    if(el){el.textContent=fmtTime(left);el.classList.toggle('urgent',left<=30);}
    if(left<=0){clearInterval(clock);timeUp();}
  },250);
}
function shuffleQuestion(q){
  const pairs=q.options.map((text,i)=>({text,correct:i===q.answer}));
  const mixed=shuffle(pairs);
  return {...q,options:mixed.map(x=>x.text),answer:mixed.findIndex(x=>x.correct)};
}
function selectDeck(){
  const easy=shuffle(TIER2_QUESTIONS.filter(q=>q.difficulty==='easy')).slice(0,3);
  const medium=shuffle(TIER2_QUESTIONS.filter(q=>q.difficulty==='medium')).slice(0,3);
  const hard=shuffle(TIER2_QUESTIONS.filter(q=>q.difficulty==='hard')).slice(0,2);
  return [...easy,...medium,...hard].map(shuffleQuestion);
}
function newTeam(){
  session=blankSession();
  sessionStorage.removeItem('graniteTier2Millionaire');
  clearInterval(clock);
  home();
}
function beginSession(){
  session={started:true,endsAt:Date.now()+SESSION_MS,bestTickets:0,usedLifelines:[]};
  saveSession(session);
  startRound();
}
function startRound(){
  if(secondsLeft()<=0)return timeUp();
  state={deck:selectDeck(),n:0,correct:0,locked:false};
  showQuestion();
}

function home(){
  clearInterval(clock);
  root.innerHTML=GameAudio.controls()+`
    <div class="card">
      <div class="millionaire-title">WHO WANTS TO BE A MILLIONAIRE?</div>
      <p class="subtitle">Granite Tier 2 Supports · Team Challenge</p>
      <div class="rules">
        <p><strong>5 minutes total.</strong> Work as a team to climb 8 questions.</p>
        <p>If you miss early, you can play again with your remaining time. Tickets are based on your <strong>best run</strong>, not added across attempts.</p>
        <p>You have three one-time helpers for the entire 5-minute session.</p>
      </div>
      <div class="ticket-map">
        <span>4 correct = <b>1 ticket</b></span>
        <span>6 correct = <b>2 tickets</b></span>
        <span>8 correct = <b>5 tickets</b></span>
      </div>
      <p><button class="gold" id="start">START THE 5-MINUTE CHALLENGE →</button></p>
      <small>No host needed. Discuss, choose, and lock in your team's answer.</small>
    </div>`;
  GameAudio.wire();
  document.getElementById('start').onclick=()=>{GameAudio.cue('start');beginSession();};
}

function showQuestion(){
  if(secondsLeft()<=0)return timeUp();
  const q=state.deck[state.n];
  GameAudio.stop();GameAudio.cue('question');
  root.innerHTML=GameAudio.controls()+`
    <div class="row">
      <b>✨ GRANITE TIER 2</b>
      <span class="timer" id="timer">${fmtTime(secondsLeft())}</span>
      <span class="session-best">Best: <b>${session.bestTickets} raffle ticket${session.bestTickets===1?'':'s'}</b></span>
    </div>
    <div class="ladder">${money.map((m,i)=>`<span class="${i===state.n?'current':''}">$${m}${ticketMilestone(i)}</span>`).join('')}</div>
    <div class="card">
      <small>QUESTION ${state.n+1}/8 · ${q.difficulty.toUpperCase()}</small>
      <h2 id="prompt"></h2>
      <div class="answers">${q.options.map((a,i)=>`<button id="a${i}"></button>`).join('')}</div>
      <div id="feedback" aria-live="polite"></div>
      <div class="lifelines">
        <button id="library" class="helper"><strong>📚 MTSS LIBRARY</strong><span>Look it up</span></button>
        <button id="group" class="helper"><strong>👥 ASK ANOTHER GROUP</strong><span>Get another team's thinking</span></button>
        <button id="jess" class="helper"><strong>🙋 ASK JESS</strong><span>One hint, not the answer</span></button>
      </div>
    </div>`;
  GameAudio.wire();startClock();
  document.getElementById('prompt').textContent=q.prompt;
  q.options.forEach((v,i)=>{
    const el=document.getElementById('a'+i);
    el.textContent='ABCD'[i]+'. '+v;
    el.onclick=()=>answer(i);
  });
  ['library','group','jess'].forEach(k=>document.getElementById(k).disabled=session.usedLifelines.includes(k));
  document.getElementById('library').onclick=()=>useHelper('library','📚 MTSS LIBRARY','Use the Granite MTSS Library to look for the intervention or system feature in this question. Return here and choose your final answer.');
  document.getElementById('group').onclick=()=>useHelper('group','👥 ASK ANOTHER GROUP','Go ask another team what they think and WHY. Then come back and lock in your own team answer.');
  document.getElementById('jess').onclick=()=>useHelper('jess','🙋 ASK JESS','Call Jess over. She can give your team ONE hint, but she cannot tell you the answer.');
}
function useHelper(key,title,message){
  GameAudio.cue('lifeline');
  if(!session.usedLifelines.includes(key))session.usedLifelines.push(key);
  saveSession(session);
  document.getElementById(key).disabled=true;
  const fb=document.getElementById('feedback');
  fb.innerHTML=`<div class="note"><h2>${title}</h2><p>${message}</p></div>`;
}

function answer(i){
  if(state.locked||secondsLeft()<=0)return;
  state.locked=true;
  const q=state.deck[state.n];
  GameAudio.stop();GameAudio.cue('lock');
  q.options.forEach((_,j)=>document.getElementById('a'+j).disabled=true);
  const fb=document.getElementById('feedback');
  const correct=i===q.answer;
  if(correct){
    state.correct++;
    updateBest(state.correct);
  }
  setTimeout(()=>{
    GameAudio.cue(correct?(state.n===7?'win':state.n===3||state.n===5?'milestone':'correct'):'wrong');
    q.options.forEach((_,j)=>{
      const b=document.getElementById('a'+j);
      if(j===q.answer)b.classList.add('good');
      else if(j===i)b.classList.add('bad');
    });
    fb.innerHTML=`<div class="note feedback-reveal">
      <h2>${correct?'🎉 CORRECT!':'🎭 NOT QUITE!'}</h2>
      <p class="explanation">${q.explanation}</p>
      <small>Correct answer: ${q.options[q.answer]}</small>
    </div>`;
    const b=document.createElement('button');
    b.className='gold';
    if(correct && state.n<7){
      b.textContent='NEXT QUESTION →';
      b.onclick=()=>{state.n++;state.locked=false;showQuestion();};
    }else if(correct && state.n===7){
      b.textContent='SEE RAFFLE TICKETS →';
      b.onclick=()=>finishSession(true);
    }else{
      b.textContent=secondsLeft()>0?'PLAY AGAIN WITH MY REMAINING TIME →':'SEE RESULTS →';
      b.onclick=()=>secondsLeft()>0?startRound():timeUp();
    }
    fb.append(b);
  },650);
}

function timeUp(){
  clearInterval(clock);
  finishSession(false,true);
}
function finishSession(won=false,timedOut=false){
  clearInterval(clock);
  if(won){session.bestTickets=5;saveSession(session);}
  const t=session.bestTickets;
  root.innerHTML=GameAudio.controls()+`
    <div class="card results-card">
      <div class="result-medal">${t===5?'🏆':'🎟️'}</div>
      <h1>${t===5?'MILLION DOLLAR WINNERS!':timedOut?'TIME!':'ROUND OVER'}</h1>
      <p class="result-lead">${t===5?'You made it all the way to $1,000,000.':t===0?'No raffle tickets yet — but you can try again if time remains.':'Your best run earned raffle tickets.'}</p>
      <div class="result-stat"><span>BEST RESULT THIS SESSION</span><strong>${t} RAFFLE TICKET${t===1?'':'S'}</strong></div>
      <div class="result-tickets">${'🎟️'.repeat(t)}</div>
      <p><strong>Show this screen to a facilitator to collect your tickets.</strong></p>
      ${secondsLeft()>0 && t<5 ? `<p><button class="gold" id="again">PLAY AGAIN · ${fmtTime(secondsLeft())} LEFT →</button></p>` : ''}
      <p><button class="new-team" id="newTeam">NEW TEAM / RESET SESSION</button></p>
      <small>Tickets are based on the best run only; attempts do not stack.</small>
    </div>`;
  GameAudio.wire();
  const again=document.getElementById('again');
  if(again)again.onclick=startRound;
  document.getElementById('newTeam').onclick=newTeam;
  if(secondsLeft()>0 && t<5)startClock();
}

if(session.started && secondsLeft()>0){
  root.innerHTML=GameAudio.controls()+`
    <div class="card">
      <div class="millionaire-title">WHO WANTS TO BE A MILLIONAIRE?</div>
      <p class="subtitle">A team session is already in progress.</p>
      <p class="timer">${fmtTime(secondsLeft())} remaining</p>
      <p>Best result: <strong>${session.bestTickets} raffle ticket${session.bestTickets===1?'':'s'}</strong></p>
      <p><button class="gold" id="continue">CONTINUE WITH A NEW ROUND →</button></p>
      <p><button id="reset">NEW TEAM / RESET</button></p>
    </div>`;
  GameAudio.wire();
  document.getElementById('continue').onclick=startRound;
  document.getElementById('reset').onclick=newTeam;
  startClock();
}else{
  if(session.started && secondsLeft()<=0)newTeam(); else home();
}