/* 對話判讀遊戲、練習、測驗 */
'use strict';

/* ================= 誰說的？遊戲 ================= */
const GLEVELS = [{ per: 7000, opts: ['kong', 'not'] }, { per: 6000, opts: ['kong', 'zhang', 'ke', 'wo'] }, { per: 4000, opts: ['kong', 'zhang', 'ke', 'wo'] }];
const ROUND = 12;
const Game = {
  st: null, raf: 0, to: 0,
  box() { return $('#gameBox'); },
  mount() { this.st = null; this.menu(); },
  menu() {
    const b = this.box(); if (!b) return; const t = T();
    b.innerHTML = `<div class="g-menu"><h2>🎮 ${t.gTitle}</h2><p>${t.gIntro}</p><p class="field-label">${t.chooseLevel}</p>
      <div class="lv-grid">${t.levels.map((l, i) => `<button class="lv lv${i}" data-act="gstart" data-i="${i}"><span class="lv-ic">${l[0]}</span><b>${l[1]}</b><small>${l[2]}</small><em>🏆 ${t.best} ${S.gameBest[i]}</em></button>`).join('')}</div>
      <p class="muted small">⌨️ ${t.keyHint}</p></div>`;
  },
  start(lv) {
    this.stop(); Sound.ctx();
    this.st = { lv, deck: shuffle(QUOTES).slice(0, ROUND), qi: 0, score: 0, combo: 0, maxCombo: 0, lives: 3, correct: 0, fb: null, missed: [] };
    Sound.play('go'); this.ask();
  },
  ask() {
    const s = this.st; if (!s) return;
    if (s.qi >= s.deck.length || s.lives <= 0) { this.over(); return; }
    s.fb = null; s.t0 = performance.now(); s.per = GLEVELS[s.lv].per;
    this.draw(); this.loop();
  },
  label(k) { return k === 'not' ? T().notKong : L(ROLES[k]); },
  draw() {
    const b = this.box(), s = this.st; if (!b || !s) return; const t = T(), q = s.deck[s.qi], en = S.settings.lang === 'en';
    const opts = GLEVELS[s.lv].opts;
    b.innerHTML = `<div class="g-play">
      <div class="hud">
        <div class="hud-i"><small>${fmt(t.gQ, { n: s.qi + 1, m: s.deck.length })}</small><b>${s.qi + 1}</b></div>
        <div class="hud-i gold"><small>⭐ ${t.score}</small><b id="gScore">${s.score}</b></div>
        <div class="hud-i red"><small>🔥 ${t.combo}</small><b>${s.combo}</b></div>
        <div class="hud-i"><small>${t.bowls}</small><b class="bowls">${'🍶'.repeat(s.lives)}${'<span class="spilt">🍶</span>'.repeat(3 - s.lives)}</b></div>
      </div>
      <div class="timer"><i id="gBar"></i></div>
      <div class="quote-card ${s.fb ? (s.fb.ok ? 'ok' : 'bad') : 'in'}">
        <p class="quote">${en ? q[2] : q[1]}</p>
        ${s.fb ? `<p class="fb">${s.fb.ok ? '✅ ' + t.correct + (s.fb.gain ? ` +${s.fb.gain}` : '') : (s.fb.timeout ? '⏰ ' + t.timeout : '❌ ' + t.wrong) + ` · ${t.itWas} ${L(ROLES[q[0]])}`}</p><p class="note">${en ? q[4] : q[3]}</p>` : ''}
      </div>
      <div class="role-grid n${opts.length}">${opts.map((k, i) => {
        const r = k === 'not' ? { ch: '✕', color: '#e11d48' } : ROLES[k];
        const right = s.fb && (k === q[0] || (k === 'not' && q[0] !== 'kong'));
        const picked = s.fb && s.fb.pick === k;
        return `<button class="role ${right ? 'right' : ''} ${picked && !s.fb.ok ? 'wrongp' : ''}" style="--c:${r.color}" data-act="gans" data-k="${k}" ${s.fb ? 'disabled' : ''}><span class="kbd">${i + 1}</span><span class="av">${r.ch}</span><b>${this.label(k)}</b></button>`;
      }).join('')}</div>
      <div class="btn-row center"><button class="btn sm ghost" data-act="gquit">✖ ${t.quit}</button></div></div>`;
  },
  loop() {
    cancelAnimationFrame(this.raf);
    const tick = () => {
      const s = this.st; if (!s || s.fb) return;
      const left = Math.max(0, s.per - (performance.now() - s.t0)), bar = $('#gBar');
      if (bar) { bar.style.width = (left / s.per * 100) + '%'; bar.classList.toggle('low', left < s.per * 0.3); }
      if (left <= 0) { this.answer(null, true); return; }
      this.raf = requestAnimationFrame(tick);
    };
    this.raf = requestAnimationFrame(tick);
  },
  answer(k, timeout) {
    const s = this.st; if (!s || s.fb) return;
    cancelAnimationFrame(this.raf);
    const q = s.deck[s.qi];
    const ok = !timeout && (k === q[0] || (k === 'not' && q[0] !== 'kong'));
    let gain = 0;
    if (ok) {
      const left = Math.max(0, s.per - (performance.now() - s.t0));
      s.combo++; s.maxCombo = Math.max(s.maxCombo, s.combo); s.correct++;
      gain = 50 + Math.round(50 * left / s.per) + Math.min(s.combo - 1, 5) * 10;
      s.score += gain; Sound.play('ok', s.combo);
    } else { s.combo = 0; s.lives--; s.missed.push(q); Sound.play('bad'); setTimeout(() => Sound.play('laugh'), 250); }
    s.fb = { ok, pick: k, timeout, gain };
    this.draw();
    this.to = setTimeout(() => { if (this.st === s) { s.qi++; this.ask(); } }, ok ? 1300 : 2300);
  },
  over() {
    const s = this.st, t = T(), b = this.box(); if (!s || !b) return;
    const rec = s.score > S.gameBest[s.lv];
    if (rec) { S.gameBest[s.lv] = s.score; store.set('gameBest', S.gameBest); }
    const acc = Math.round(100 * s.correct / Math.max(1, s.qi));
    const rank = t.gRank[acc >= 90 ? 0 : acc >= 70 ? 1 : acc >= 45 ? 2 : 3];
    addLog('game', t.gTitle + '・' + t.levels[s.lv][1], `${s.correct}/${s.qi} · ${t.combo} ${s.maxCombo}`, s.score);
    track(() => { S.prog.game = true; }); markExplore('game');
    Sound.play(rec ? 'win' : 'end'); if (rec && s.score > 0) confetti(110);
    b.innerHTML = `<div class="g-over"><h2>🏁 ${t.gOver}</h2>
      <div class="big-score">${s.score}<small>${t.points}</small></div>${rec && s.score ? '<p class="pill ok">🎉 New Record!</p>' : ''}
      <p class="rank">${rank}</p>
      <div class="stat-grid">${[['✅', s.correct + '/' + s.qi], ['🎯', acc + '%'], ['🔥', s.maxCombo], ['🏆', S.gameBest[s.lv]]].map(([a, v]) => `<div class="stat"><span>${a}</span><b>${v}</b></div>`).join('')}</div>
      ${s.missed.length ? `<div class="missed"><p class="field-label">📌 ${S.settings.lang === 'zh' ? '再讀一次' : 'Read again'}</p>${s.missed.map(q => `<p><span class="tag" style="background:${ROLES[q[0]].color}">${L(ROLES[q[0]])}</span> ${S.settings.lang === 'en' ? q[2] : q[1]}</p>`).join('')}</div>` : ''}
      <div class="btn-row center"><button class="btn primary" data-act="gstart" data-i="${s.lv}">🔁 ${t.playAgain}</button><button class="btn" data-act="gmenu">${t.chooseLevel}</button></div></div>`;
    this.st = null;
  },
  stop(silent) { cancelAnimationFrame(this.raf); clearTimeout(this.to); if (silent) this.st = null; },
  key(e) {
    if (S.page !== 'visual' || UI.vis !== 'game' || !this.st || this.st.fb) return;
    if (e.target && /INPUT|TEXTAREA/.test(e.target.tagName)) return;
    const o = GLEVELS[this.st.lv].opts, i = parseInt(e.key, 10) - 1;
    if (i >= 0 && i < o.length) this.answer(o[i]);
  }
};
ACT.gstart = el => Game.start(+el.dataset.i);
ACT.gans = el => Game.answer(el.dataset.k);
ACT.gquit = () => { Game.stop(true); Game.menu(); };
ACT.gmenu = () => Game.menu();

/* ================= 練習 ================= */
const P = { mode: 'random', cat: 'all', cur: null, pick: null, streak: 0, session: 0, card: 0, cardFlip: false, cards: WORDS.map((_, i) => i) };
function pool() {
  if (P.mode === 'wrong') return S.wrong.slice();
  return BANK.map((_, i) => i).filter(i => P.mode !== 'cat' || P.cat === 'all' || BANK[i].c === P.cat);
}
function nextQ() {
  const p = pool(); if (!p.length) { P.cur = null; return; }
  let n; do { n = p[Math.floor(Math.random() * p.length)]; } while (p.length > 1 && n === P.cur);
  P.cur = n; P.pick = null;
}
function optsOf(q) { return q.type === 'tf' ? T().tfO : L(q.o); }
VIEWS.practice = () => {
  const t = T(), pr = S.prog;
  if (P.mode !== 'cards' && (P.cur == null || !pool().includes(P.cur)) && P.pick == null) nextQ();
  const head = `<header class="page-head has-art"><div><h1>✏️ ${t.prTitle}</h1><p class="lead">${t.prIntro}</p></div><div class="head-art">${beansSVG()}</div></header>
    <div class="chips">${Object.keys(t.modes).map(k => `<button class="chip ${P.mode === k ? 'on' : ''}" data-act="pmode" data-k="${k}">${t.modes[k]}${k === 'wrong' && S.wrong.length ? ` <span class="count">${S.wrong.length}</span>` : ''}</button>`).join('')}</div>
    <div class="stat-row"><span>📝 ${t.answered} <b>${pr.prCount}</b></span><span>🎯 ${t.accuracy} <b>${pr.prCount ? Math.round(100 * pr.prCorrect / pr.prCount) : 0}%</b></span><span>🔥 ${t.streak} <b>${P.streak}</b></span><span>❗ ${t.wrongCount} <b>${S.wrong.length}</b></span></div>`;
  if (P.mode === 'cards') return head + cardsView();
  const catRow = P.mode === 'cat' ? `<div class="chips small">${['all', ...Object.keys(CATS)].map(c => `<button class="chip ${P.cat === c ? 'on' : ''}" data-act="pcat" data-k="${c}">${c === 'all' ? t.allCat : L(CATS[c])}</button>`).join('')}</div>` : '';
  if (P.cur == null) return head + catRow + `<div class="card center"><p class="empty big">🎉 ${t.noWrong}</p></div>`;
  return head + catRow + qCard(BANK[P.cur], P.pick, 'pans', true);
};
function qCard(q, pick, act, showFb, numLabel) {
  const t = T(), opts = optsOf(q), done = pick != null;
  return `<div class="card q-card ${done ? (pick === q.ans ? 'ok' : 'bad') : ''}">
    <div class="q-meta"><span class="tag">${L(CATS[q.type === 'tf' ? 'tf' : q.c])}</span>${numLabel || ''}</div>
    <p class="q-text">${L(q.q)}</p>
    <div class="opt-list ${q.type === 'tf' ? 'tf' : ''}">${opts.map((o, i) => {
      let cls = '';
      if (done && showFb) { if (i === q.ans) cls = 'right'; else if (i === pick) cls = 'wrongp'; }
      else if (pick === i) cls = 'on';
      return `<button class="opt ${cls}" data-act="${act}" data-i="${i}" ${done && showFb ? 'disabled' : ''}><span class="opt-k">${q.type === 'tf' ? '' : 'ABCD'[i]}</span>${o}</button>`;
    }).join('')}</div>
    ${done && showFb ? `<div class="feedback ${pick === q.ans ? 'ok' : 'bad'}"><b>${pick === q.ans ? '✅ ' + t.correct : '❌ ' + t.wrong}</b><p><b>${t.explain}：</b>${L(q.e)}</p></div>
      <div class="btn-row end"><button class="btn primary" data-act="pnext">${t.next}</button></div>` : ''}
  </div>`;
}
ACT.pmode = el => { Sound.play('click'); P.mode = el.dataset.k; P.cur = null; P.pick = null; renderPage(); };
ACT.pcat = el => { Sound.play('click'); P.cat = el.dataset.k; P.cur = null; P.pick = null; renderPage(); };
ACT.pans = el => {
  if (P.pick != null) return;
  const i = +el.dataset.i, q = BANK[P.cur], ok = i === q.ans; P.pick = i;
  track(() => { S.prog.prCount++; if (ok) S.prog.prCorrect++; });
  if (ok) { P.streak++; Sound.play('ok', P.streak); if (P.mode === 'wrong') S.wrong = S.wrong.filter(n => n !== P.cur); }
  else { P.streak = 0; Sound.play('bad'); if (!S.wrong.includes(P.cur)) S.wrong.push(P.cur); }
  store.set('wrong', S.wrong);
  addLog('practice', L(q.q), ok ? '✅' : '❌', ok ? 1 : 0);
  if (P.streak && P.streak % 5 === 0) { confetti(60); toast('🔥 ×' + P.streak); }
  renderPage();
  const fb = $('.feedback'); if (fb) fb.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
};
ACT.pnext = () => { Sound.play('click'); nextQ(); renderPage(); };

function cardsView() {
  const t = T(), i = P.cards[P.card], w = WORDS[i], known = S.known.includes(i);
  return `<p class="hint">🃏 ${t.cardHint}</p>
  <div class="wcard-wrap"><button class="wcard ${P.cardFlip ? 'on' : ''}" data-act="cflip" aria-pressed="${P.cardFlip}">
    <span class="flip-in"><span class="face front"><b class="wbig">${w[0]}</b>${known ? `<span class="pill ok">✓ ${t.known}</span>` : ''}<em>👆</em></span>
    <span class="face back"><b>${w[0]}</b><span class="py">${w[1]}</span><span class="note">${S.settings.lang === 'en' ? w[3] : w[2]}</span></span></span></button></div>
  <p class="center muted">${P.card + 1} / ${WORDS.length} · ✓ ${S.known.length}</p>
  <div class="btn-row center wrap"><button class="btn" data-act="cprev">${t.prev}</button><button class="btn ${known ? 'ghost' : 'primary'}" data-act="cknow">${t.iKnow}</button><button class="btn" data-act="cnext">${t.nextCard}</button><button class="btn ghost" data-act="cshuf">${t.shuffle}</button></div>`;
}
ACT.cflip = () => { Sound.play('flip'); P.cardFlip = !P.cardFlip; const c = $('.wcard'); c.classList.toggle('on', P.cardFlip); c.setAttribute('aria-pressed', P.cardFlip); };
ACT.cnext = () => { Sound.play('click'); P.card = (P.card + 1) % WORDS.length; P.cardFlip = false; renderPage(); };
ACT.cprev = () => { Sound.play('click'); P.card = (P.card - 1 + WORDS.length) % WORDS.length; P.cardFlip = false; renderPage(); };
ACT.cshuf = () => { Sound.play('flip'); P.cards = shuffle(P.cards); P.card = 0; P.cardFlip = false; renderPage(); };
ACT.cknow = () => {
  const i = P.cards[P.card];
  if (!S.known.includes(i)) { S.known.push(i); store.set('known', S.known); Sound.play('ok', 2); addLog('practice', '🃏 ' + WORDS[i][0], T().known, ''); }
  P.card = (P.card + 1) % WORDS.length; P.cardFlip = false; renderPage();
};

/* ================= 測驗 ================= */
const QN = 10, QTIME = 600;
const Quiz = {
  st: null, timer: 0,
  start() {
    Sound.play('go');
    const mc = shuffle(BANK.map((_, i) => i).filter(i => BANK[i].type !== 'tf')).slice(0, 8);
    const tf = shuffle(BANK.map((_, i) => i).filter(i => BANK[i].type === 'tf')).slice(0, 2);
    this.st = { items: shuffle([...mc, ...tf]), ans: Array(QN).fill(null), i: 0, left: QTIME, done: false };
    this.run(); renderPage();
  },
  run() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      const s = this.st; if (!s || s.done) { clearInterval(this.timer); return; }
      s.left--; const el = $('#qzClock'); if (el) { el.textContent = this.clock(s.left); el.classList.toggle('low', s.left <= 60); }
      if (s.left <= 10 && s.left > 0) Sound.play('tick');
      if (s.left <= 0) this.submit(true);
    }, 1000);
  },
  pause() { clearInterval(this.timer); this.timer = 0; },
  clock(n) { return `${pad(Math.floor(n / 60))}:${pad(n % 60)}`; },
  async submit(force) {
    const s = this.st, t = T(); if (!s || s.done) return;
    const blank = s.ans.filter(a => a == null).length;
    if (!force && blank && !(await askConfirm(fmt(t.qzConfirm, { n: blank })))) return;
    if (s.done) return;
    clearInterval(this.timer); s.done = true;
    s.score = s.items.reduce((a, n, i) => a + (s.ans[i] === BANK[n].ans ? 10 : 0), 0);
    S.quizHist.push({ ts: new Date().toISOString(), score: s.score }); store.set('quizHist', S.quizHist);
    s.items.forEach((n, i) => { if (s.ans[i] !== BANK[n].ans && !S.wrong.includes(n)) S.wrong.push(n); }); store.set('wrong', S.wrong);
    addLog('quiz', t.qzTitle, `${s.score / 10}/${QN} · ${this.clock(QTIME - s.left)}`, s.score);
    track(() => { S.prog.quiz = true; });
    Sound.play(s.score >= 80 ? 'win' : 'end'); if (s.score >= 90) confetti(150);
    renderPage();
  }
};
VIEWS.quiz = () => {
  const t = T(), s = Quiz.st;
  const head = `<header class="page-head"><h1>📝 ${t.qzTitle}</h1></header>`;
  if (!s) {
    const best = S.quizHist.length ? Math.max(...S.quizHist.map(q => q.score)) : null;
    return head + `<div class="card quiz-intro"><div class="qi-art" aria-hidden="true">${quizArtSVG()}</div><p class="lead">${t.qzIntro}</p>
      <div class="stat-row center"><span>🧾 ${QN} ${S.settings.lang === 'zh' ? '題' : 'items'}</span><span>⏱ 10:00</span>${best != null ? `<span>🏆 ${t.best} <b>${best}</b></span>` : ''}</div>
      ${!S.profile.name ? `<p class="hint">👤 ${S.settings.lang === 'zh' ? '建議先到「學習歷程」填寫姓名、班級與座號。' : 'Tip: fill in your name in Portfolio first.'}</p>` : ''}
      <button class="btn primary lg pulse" data-act="qzStart">🚀 ${t.qzStart}</button></div>`;
  }
  if (s.done) {
    const g = t.grades[s.score >= 90 ? 0 : s.score >= 70 ? 1 : s.score >= 50 ? 2 : 3];
    return head + `<div class="card center result">
      <div class="ring" style="--p:${s.score}"><span>${s.score}</span></div><p class="field-label">${t.qzScore}</p><p class="rank">${g}</p>
      <div class="btn-row center"><button class="btn primary" data-act="qzStart">🔁 ${t.qzRetry}</button><button class="btn" data-act="nav" data-page="practice">❗ ${t.modes.wrong}</button><button class="btn" data-act="nav" data-page="portfolio">🌱 ${t.nav.portfolio}</button></div></div>
      ${sec('🔍 ' + t.qzReview, s.items.map((n, i) => { const q = BANK[n], o = optsOf(q), a = s.ans[i], ok = a === q.ans; return `<div class="review ${ok ? 'ok' : 'bad'}"><p><b>${i + 1}. ${ok ? '✅' : '❌'}</b> ${L(q.q)}</p><p class="small">${t.qzYour}：${a == null ? t.qzNone : o[a]}　｜　${t.qzRight}：<b>${o[q.ans]}</b></p><p class="small muted">💡 ${L(q.e)}</p></div>`; }).join(''))}`;
  }
  if (!Quiz.timer || s.paused) Quiz.run();
  const n = s.items[s.i], q = BANK[n];
  return head + `<div class="quiz-bar"><div class="dots">${s.items.map((_, i) => `<button class="dot ${i === s.i ? 'on' : ''} ${s.ans[i] != null ? 'filled' : ''}" data-act="qzGo" data-i="${i}" aria-label="${i + 1}">${i + 1}</button>`).join('')}</div>
    <span class="clock">⏱ ${t.qzLeft} <b id="qzClock">${Quiz.clock(s.left)}</b></span></div>
    ${qCard(q, s.ans[s.i], 'qzAns', false, `<span class="muted">${s.i + 1} / ${QN}</span>`)}
    <div class="btn-row between"><button class="btn" data-act="qzPrev" ${s.i === 0 ? 'disabled' : ''}>${t.prev}</button>
      ${s.i < QN - 1 ? `<button class="btn primary" data-act="qzNext">${t.nextCard}</button>` : ''}
      <button class="btn ${s.ans.every(a => a != null) ? 'primary pulse' : ''}" data-act="qzSubmit">📮 ${t.qzSubmit}</button></div>`;
};
ACT.qzStart = () => Quiz.start();
ACT.qzAns = el => { const s = Quiz.st; s.ans[s.i] = +el.dataset.i; Sound.play('pop'); if (s.i < QN - 1) setTimeout(() => { s.i++; renderPage(); }, 260); renderPage(); };
ACT.qzGo = el => { Sound.play('click'); Quiz.st.i = +el.dataset.i; renderPage(); };
ACT.qzPrev = () => { Sound.play('click'); Quiz.st.i = Math.max(0, Quiz.st.i - 1); renderPage(); };
ACT.qzNext = () => { Sound.play('click'); Quiz.st.i = Math.min(QN - 1, Quiz.st.i + 1); renderPage(); };
ACT.qzSubmit = () => Quiz.submit(false);
