/* 各頁面畫面 */
'use strict';

const VIEWS = {};
const AFTER = {};
const UI = { vis: 'tavern', tavern: null, tavernSeen: [], person: 'kong', peopleSeen: [], tl: 0, tlSeen: [0], flipped: [], hui: null, huiSeen: [], scene: null, advOpen: [] };

const sec = (title, body, cls) => `<section class="card ${cls || ''}">${title ? `<h2 class="card-title">${title}</h2>` : ''}${body}</section>`;

/* ================= 學習指引 ================= */
VIEWS.guide = () => {
  const t = T(), lang = S.settings.lang;
  const steps = GUIDE.steps.map((s, i) => {
    const d = stepDone(s.key);
    return `<li class="step ${d ? 'done' : ''}" style="--i:${i}">
      <span class="step-no">${d ? '✓' : i + 1}</span>
      <span class="step-ic" aria-hidden="true">${s.icon}</span>
      <span class="step-tx">${L(s)}</span>
      <button class="btn sm ghost" data-act="nav" data-page="${s.page}">${t.go} ➜</button></li>`;
  }).join('');
  return `
  <section class="hero card">
    <div class="hero-text">
      <span class="kicker">🍶 ${t.heroKicker}</span>
      <h1 class="hero-title">${t.heroA}<em>${t.heroB}</em>${t.heroC}</h1>
      <p class="lead">${t.heroBody}</p>
      <div class="btn-row">
        <button class="btn primary lg" data-act="nav" data-page="visual">🚪 ${t.startLearn}</button>
        <button class="btn lg" data-act="nav" data-page="quiz">📝 ${t.goQuiz}</button>
      </div>
      <p class="credit">✒️ ${t.credit}</p>
    </div>
    <div class="hero-art">${tavernSVG({ laugh: true })}</div>
  </section>

  <div class="grid2">
    ${sec('🎯 ' + t.goals, `<ul class="goal-list">${GUIDE.goals.map((g, i) => `<li style="--i:${i}"><span class="goal-ic">${g.icon}</span><span>${L(g)}</span></li>`).join('')}</ul>`)}
    ${sec('🧭 ' + t.path, `<p class="muted">${t.pathHint}</p>
      <div class="bar big" aria-hidden="true"><i style="width:${progressPct()}%"></i></div>
      <ol class="steps">${steps}</ol>`)}
  </div>

  <div class="grid2">
    ${sec('✍️ ' + t.author, `<div class="author">
        <div class="author-av" aria-hidden="true"><span>魯迅</span></div>
        <dl class="kv">${GUIDE.author[lang].map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>
      </div>`)}
    ${sec('🕰️ ' + t.timelineBg, `<ol class="years">${t.years.map(([y, d]) => `<li class="${y === '1919' ? 'hl' : ''}"><b>${y}</b><span>${d}</span></li>`).join('')}</ol>`)}
  </div>

  ${sec('🏮 ' + t.bg, `<ul class="dot-list">${L(GUIDE.background).map(x => `<li>${x}</li>`).join('')}</ul>`)}
  ${sec('📖 ' + t.summary, `<p class="summary">${L(GUIDE.summary)}</p>
    <h3 class="sub-title">🎞️ ${t.storyTitle}</h3>
    <ol class="story-strip">${GUIDE.story.map((s, i) => `<li style="--i:${i}"><figure>${storyPanelSVG(i)}<figcaption>${L(s)}</figcaption></figure></li>`).join('')}</ol>`)}
  ${sec('🔑 ' + t.tips, `<div class="tips">${GUIDE.tips.map((x, i) => `<div class="tip" style="--i:${i}"><span>${x.icon}</span><p>${L(x)}</p></div>`).join('')}</div>`)}

  <div class="center">${S.prog.guide
    ? `<span class="pill ok">✅ ${t.warmDoneOk}</span>`
    : `<button class="btn primary lg pulse" data-act="warmDone">${t.warmDone}</button>`}</div>`;
};
ACT.warmDone = () => { track(() => { S.prog.guide = true; }); Sound.play('save'); confetti(80); renderPage(); };

/* ================= 互動探索 ================= */
VIEWS.visual = () => {
  const t = T();
  const chips = Object.keys(t.vis).map(k => `<button class="chip ${UI.vis === k ? 'on' : ''} ${S.prog.explore.includes(k) ? 'done' : ''}" data-act="vistab" data-id="${k}">${t.vis[k]}</button>`).join('');
  return `<header class="page-head"><h1>🗺️ ${t.visTitle}</h1><p class="lead">${t.visIntro}</p>
    <div class="explore-meter"><b>${Math.min(S.prog.explore.length, 7)}</b> / 7 · ${t.explored}<div class="bar"><i style="width:${Math.min(100, S.prog.explore.length / 7 * 100)}%"></i></div></div></header>
    <div class="chips" role="tablist">${chips}</div>
    <div id="visBox" class="vis-box">${VIS[UI.vis]()}</div>`;
};
AFTER.visual = () => { if (UI.vis === 'game') Game.mount(); };
ACT.vistab = el => { Sound.play('click'); Game.stop(true); UI.vis = el.dataset.id; renderPage(); };
function rerenderVis() { const b = $('#visBox'); if (b) { b.innerHTML = VIS[UI.vis](); if (UI.vis === 'game') Game.mount(); } }

const VIS = {};

VIS.tavern = () => {
  const t = T(), h = TAVERN.find(x => x.id === UI.tavern);
  return `<div class="split">
    <div class="map-wrap">${tavernSVG()}
      ${TAVERN.map(x => `<button class="hotspot ${UI.tavernSeen.includes(x.id) ? 'seen' : ''} ${UI.tavern === x.id ? 'on' : ''}" style="left:${x.x}%;top:${x.y}%" data-act="hot" data-id="${x.id}" aria-label="${esc(L(x))}"><span>${x.icon}</span></button>`).join('')}
    </div>
    <div class="info-panel">${h ? `<h3>${h.icon} ${L(h)}</h3><blockquote>${L(h.q)}</blockquote><p>${L(h.a)}</p>` : `<p class="hint">👆 ${t.tavernHint}</p>`}
      <p class="muted small">${t.explored} ${UI.tavernSeen.length} / ${TAVERN.length}</p></div>
  </div>
  <figure class="ill-fig wide">${classMapSVG()}<figcaption>🧭 ${t.illSpace}</figcaption></figure>`;
};
ACT.hot = el => {
  Sound.play('pop'); UI.tavern = el.dataset.id;
  if (!UI.tavernSeen.includes(UI.tavern)) UI.tavernSeen.push(UI.tavern);
  if (UI.tavernSeen.length >= 3) markExplore('tavern');
  rerenderVis();
};

VIS.people = () => {
  const t = T(), p = PEOPLE.find(x => x.id === UI.person), c = PEOPLE[0];
  return `<div class="split">
    <div class="web-wrap">
      <svg viewBox="0 0 100 100" class="web-lines" preserveAspectRatio="none" aria-hidden="true">
        ${PEOPLE.slice(1).map(n => `<line x1="${c.x}" y1="${c.y}" x2="${n.x}" y2="${n.y}" class="${UI.person === n.id ? 'on' : ''}" stroke="${n.color}"/>`).join('')}
      </svg>
      ${PEOPLE.slice(1).map(n => `<span class="web-label" style="left:${(c.x + n.x) / 2}%;top:${(c.y + n.y) / 2}%;color:${n.color}">${L(n.rel)}</span>`).join('')}
      ${PEOPLE.map(n => `<button class="node ${n.id === 'kong' ? 'center' : ''} ${UI.person === n.id ? 'on' : ''}" style="left:${n.x}%;top:${n.y}%;--c:${n.color}" data-act="person" data-id="${n.id}"><b>${n.ch}</b><span>${L(n)}</span></button>`).join('')}
    </div>
    <div class="info-panel" style="--c:${p.color}"><h3><span class="av" style="background:${p.color}">${p.ch}</span> ${L(p)}</h3>
      ${p.id !== 'kong' ? `<p class="pill" style="background:${p.color}22;color:${p.color}">${t.relWith}：${L(p.rel)}</p>` : ''}
      <p>${L(p.d)}</p><p class="hint small">👆 ${t.peopleHint}</p></div>
  </div>`;
};
ACT.person = el => {
  Sound.play('pop'); UI.person = el.dataset.id;
  if (!UI.peopleSeen.includes(UI.person)) UI.peopleSeen.push(UI.person);
  if (UI.peopleSeen.length >= 3) markExplore('people');
  rerenderVis();
};

VIS.timeline = () => {
  const t = T(), s = TIMELINE[UI.tl];
  return `<p class="hint">↔️ ${t.tlHint}</p>
  <div class="tl-track">${TIMELINE.map((x, i) => `<button class="tl-node ${i === UI.tl ? 'on' : ''} ${i < UI.tl ? 'past' : ''}" data-act="tl" data-i="${i}"><i></i><span>${L(x.t)}</span></button>`).join('')}</div>
  <input type="range" min="0" max="${TIMELINE.length - 1}" step="1" value="${UI.tl}" class="range" id="tlRange" aria-label="${t.vis.timeline}">
  <div class="tl-card">
    <div class="tl-fig">${figureSVG(s.pose)}<div class="coins-wrap">${coinsSVG(s.money)}<small>${s.money ? s.money + (S.settings.lang === 'zh' ? ' 文' : ' coppers') : '—'}</small></div></div>
    <div class="tl-body">
      <h3>${UI.tl + 1}. ${L(s.t)}</h3>
      <dl class="kv"><dt>${t.tlLook}</dt><dd>${L(s.look)}</dd><dt>${t.tlPay}</dt><dd>${L(s.pay)}</dd></dl>
      <blockquote>${L(s.q)}</blockquote>
      <p><b>🔍 ${t.tlNote}：</b>${L(s.a)}</p>
      <div class="meter"><span>${t.tlFall}</span><div class="bar warm"><i style="width:${s.fall}%"></i></div><b>${s.fall}</b></div>
    </div>
  </div>`;
};
function setTl(i) {
  i = Math.max(0, Math.min(TIMELINE.length - 1, i)); if (i === UI.tl) return;
  UI.tl = i; Sound.play('tick'); if (!UI.tlSeen.includes(i)) UI.tlSeen.push(i);
  if (UI.tlSeen.length >= 4) markExplore('timeline');
  rerenderVis(); const r = $('#tlRange'); if (r) r.focus();
}
ACT.tl = el => setTl(+el.dataset.i);
document.addEventListener('input', e => { if (e.target.id === 'tlRange') setTl(+e.target.value); });

VIS.contrast = () => {
  const t = T();
  return `<div class="row-between"><p class="hint">🃏 ${t.contrastHint}</p><button class="btn sm" data-act="flipAll">${t.flipAll}</button></div>
  <div class="flip-grid">${CONTRAST.map((c, i) => `<button class="flip ${UI.flipped.includes(i) ? 'on' : ''}" data-act="flip" data-i="${i}" aria-pressed="${UI.flipped.includes(i)}">
    <span class="flip-in">
      <span class="face front"><small>${t.front}</small><b>${L(c.a)}</b><em>👆</em></span>
      <span class="face back"><small>${t.back}</small><b>${L(c.b)}</b><span class="note">${L(c.n)}</span></span>
    </span></button>`).join('')}</div>`;
};
ACT.flip = el => {
  const i = +el.dataset.i; Sound.play('flip');
  if (UI.flipped.includes(i)) UI.flipped = UI.flipped.filter(x => x !== i); else UI.flipped.push(i);
  el.classList.toggle('on'); el.setAttribute('aria-pressed', el.classList.contains('on'));
  if (UI.flipped.length >= 3) markExplore('contrast');
};
ACT.flipAll = () => { Sound.play('flip'); UI.flipped = UI.flipped.length === CONTRAST.length ? [] : CONTRAST.map((_, i) => i); if (UI.flipped.length) markExplore('contrast'); rerenderVis(); };

VIS.hui = () => {
  const t = T(), h = UI.hui != null ? HUI[UI.hui] : null;
  return `<p class="hint">🫘 ${t.huiHint}</p>
  <div class="hui-grid">${HUI.map((x, i) => `<button class="hui ${UI.hui === i ? 'on' : ''} ${UI.huiSeen.includes(i) ? 'seen' : ''}" data-act="hui" data-i="${i}" style="--i:${i}"><b>${x.c}</b><small>${i + 1}</small></button>`).join('')}</div>
  <div class="info-panel">${h ? `<h3><span class="big-char">${h.c}</span> ${L(h)}</h3>` : ''}<p>${t.huiNote}</p>
  <p class="muted small">茴香豆的「茴」：艹 ＋ 回</p></div>`;
};
ACT.hui = el => {
  const i = +el.dataset.i; UI.hui = i; Sound.play('pluck', [392, 440, 494, 587][i]);
  if (!UI.huiSeen.includes(i)) UI.huiSeen.push(i);
  if (UI.huiSeen.length >= 4) markExplore('hui');
  rerenderVis();
};

VIS.game = () => `<div id="gameBox" class="game-box"></div>`;

VIS.scene = () => {
  const t = T(), o = UI.scene != null ? SCENE.opts[UI.scene] : null;
  return `<div class="scene">
    <div class="scene-art">${tavernSVG({ laugh: true })}<div class="jeers" aria-hidden="true"><span>哈哈哈！</span><span>又添新傷疤了！</span><span>當真認識字麼？</span></div></div>
    <div>
      <p class="hint">💭 ${t.sceneHint}</p>
      <p class="scene-q">${L(SCENE.q)}</p>
      <div class="opt-list">${SCENE.opts.map((x, i) => `<button class="opt ${UI.scene === i ? 'on' : ''}" data-act="scene" data-i="${i}"><span class="opt-ic">${x.icon}</span>${L(x)}</button>`).join('')}</div>
      ${o ? `<div class="feedback warm-fb"><p>${L(o.fb)}</p><div class="meter"><span>${t.heartScore}</span><span class="hearts">${'❤️'.repeat(o.heart)}${'🤍'.repeat(3 - o.heart)}</span></div></div>` : ''}
    </div></div>`;
};
ACT.scene = el => {
  const i = +el.dataset.i; UI.scene = i; const o = SCENE.opts[i];
  Sound.play(o.heart >= 2 ? 'save' : 'laugh');
  addLog('explore', T().vis.scene, L(o), '');
  markExplore('scene'); if (o.heart >= 3) grantBadge('heart');
  rerenderVis();
};

/* ================= 進階延伸 ================= */
VIEWS.advanced = () => {
  const t = T();
  return `<header class="page-head has-art"><div><h1>🚀 ${t.advTitle}</h1><p class="lead">${t.advIntro}</p></div><div class="head-art">${studySVG()}</div></header>
  <div class="acc-list">${ADV.map((a, i) => {
    const open = UI.advOpen.includes(a.id);
    return `<article class="acc ${open ? 'open' : ''}" style="--c:${a.color};--i:${i}">
      <button class="acc-head" data-act="acc" data-id="${a.id}" aria-expanded="${open}">
        <span class="acc-ic">${a.icon}</span><span class="acc-t">${L(a)}</span>
        ${S.prog.adv.includes(a.id) ? '<span class="tick">✓</span>' : ''}<span class="acc-arrow">▾</span></button>
      ${open ? `<div class="acc-body">${ADV_ART[a.id] ? `<figure class="ill-fig">${ADV_ART[a.id]()}</figure>` : ''}${L(a.body).split('\n').map(p => `<p>${p}</p>`).join('')}${a.widget ? ADVW[a.widget]() : ''}</div>` : ''}
    </article>`;
  }).join('')}</div>
  <p class="center"><a class="btn" href="https://cerclearning.tp.edu.tw/modern/datapage/77" target="_blank" rel="noopener">📜 ${t.wikisource}</a></p>`;
};
ACT.acc = el => {
  const id = el.dataset.id; Sound.play('flip');
  if (UI.advOpen.includes(id)) UI.advOpen = UI.advOpen.filter(x => x !== id);
  else {
    UI.advOpen.push(id);
    if (!S.prog.adv.includes(id)) { track(() => S.prog.adv.push(id)); addLog('visit', L(ADV.find(a => a.id === id)), '', ''); }
  }
  renderPage();
};
const ADVW = {};
const ADV_ART = { narr: () => narrSVG(), crowd: () => crowdSVG(), nahan: () => shelfSVG() };
UI.exam = 0;
ADVW.exam = () => {
  const t = T();
  return `<div class="ladder">${EXAM.slice().reverse().map((e, ri) => {
    const i = EXAM.length - 1 - ri;
    return `<button class="rung ${UI.exam === i ? 'on' : ''}" data-act="rung" data-i="${i}" style="--w:${60 + ri * 0}%;--lv:${i}"><b>${L(e.n)}</b>${e.kong ? `<span class="pill warn">🧥 ${t.kongHere}</span>` : ''}${i === 2 ? '<span class="pill">丁舉人</span>' : ''}</button>`;
  }).join('')}</div><p class="info-panel">${L(EXAM[UI.exam].d)}</p><p class="muted small">👆 ${t.examHint}</p>`;
};
ACT.rung = el => { UI.exam = +el.dataset.i; Sound.play('pluck', 330 + UI.exam * 110); renderPage(); };
ADVW.compare = () => {
  const h = L(COMPARE.head);
  return `<div class="table-wrap"><table class="cmp"><thead><tr>${h.map(x => `<th>${x}</th>`).join('')}</tr></thead><tbody>${COMPARE.rows.map(r => `<tr>${L(r).map((x, i) => i ? `<td>${x}</td>` : `<th scope="row">${x}</th>`).join('')}</tr>`).join('')}</tbody></table></div>`;
};
ADVW.discuss = () => {
  const t = T(), d = store.get('discuss', {});
  return `<div class="discuss">${DISCUSS.map((q, i) => `<label class="field"><span>${i + 1}. ${L(q)}</span><textarea id="disc${i}" rows="3" placeholder="${t.rph}">${esc(d[i] || '')}</textarea></label>`).join('')}
    <button class="btn primary" data-act="discuss">💾 ${t.send}</button></div>`;
};
ACT.discuss = () => {
  const d = {}; let n = 0;
  DISCUSS.forEach((q, i) => { const v = ($('#disc' + i) || {}).value || ''; d[i] = v.trim(); if (d[i]) { n++; addLog('discuss', L(q), d[i], ''); } });
  store.set('discuss', d);
  if (n) { grantBadge('thinker'); Sound.play('save'); toast(T().sent); } else toast('✏️');
};

/* ================= 學習歷程 ================= */
UI.logFilter = 'all'; UI.mood = null;
VIEWS.portfolio = () => {
  const t = T(), p = S.prog, pr = S.profile;
  const acc = p.prCount ? Math.round(100 * p.prCorrect / p.prCount) : 0;
  const qBest = S.quizHist.length ? Math.max(...S.quizHist.map(q => q.score)) : 0;
  const stats = [['🗒', t.stVisit, S.log.length], ['✏️', t.stPractice, p.prCount], ['🎯', t.stAcc, acc + '%'], ['📝', t.stQuiz, qBest], ['🎮', t.stGame, Math.max(...S.gameBest)], ['🏅', t.stBadge, S.badges.length + '/' + BADGES.length]];
  const types = ['all', ...Object.keys(t.types)];
  const logs = S.log.filter(e => UI.logFilter === 'all' || e.type === UI.logFilter).slice(0, 120);
  const r = store.get('reflect', { mood: null, a: ['', '', ''] });
  if (UI.mood == null) UI.mood = r.mood;
  return `<header class="page-head has-art"><div><h1>🌱 ${t.pfTitle}</h1><p class="lead">${t.pfIntro}</p></div><div class="head-art">${growthSVG(GUIDE.steps.filter(s => stepDone(s.key)).length, GUIDE.steps.length)}</div></header>
  <div class="grid2">
    ${sec('👤 ' + t.profile, `<div class="form-grid">
      <label class="field"><span>${t.pName}</span><input id="pfName" value="${esc(pr.name)}" placeholder="${t.phName}" autocomplete="name"></label>
      <label class="field"><span>${t.pClass}</span><input id="pfCls" value="${esc(pr.cls)}" placeholder="${t.phClass}"></label>
      <label class="field"><span>${t.pSeat}</span><input id="pfSeat" value="${esc(pr.seat)}" placeholder="${t.phSeat}" inputmode="numeric"></label>
    </div>`)}
    ${sec('📊 ' + t.stats, `<div class="stat-grid">${stats.map(([ic, k, v], i) => `<div class="stat" style="--i:${i}"><span>${ic}</span><b>${v}</b><small>${k}</small></div>`).join('')}</div>`)}
  </div>
  <div class="grid2">
    ${sec('🧭 ' + t.path, `<div class="bar big"><i style="width:${progressPct()}%"></i></div><ol class="steps compact">${GUIDE.steps.map((s, i) => `<li class="step ${stepDone(s.key) ? 'done' : ''}"><span class="step-no">${stepDone(s.key) ? '✓' : i + 1}</span><span class="step-tx">${L(s)}</span></li>`).join('')}</ol>`)}
    ${sec('📈 ' + t.qzHist, quizChart())}
  </div>
  ${sec('🏅 ' + t.badges, `<div class="badge-grid">${BADGES.map(b => `<div class="badge ${S.badges.includes(b.id) ? 'on' : ''}" title="${esc(L(b.d))}">${badgeEmblem(b.icon, S.badges.includes(b.id))}<b>${L(b)}</b><small>${L(b.d)}</small></div>`).join('')}</div>`)}
  ${sec('💭 ' + t.reflect, `<p class="field-label">${t.mood}</p><div class="mood-row">${MOODS.map((m, i) => `<button class="mood ${UI.mood === i ? 'on' : ''}" data-act="mood" data-i="${i}" aria-pressed="${UI.mood === i}"><span>${m[0]}</span><small>${S.settings.lang === 'zh' ? m[1] : m[2]}</small></button>`).join('')}</div>
    ${t.rq.map((q, i) => `<label class="field"><span>${q}</span><textarea id="rf${i}" rows="3" placeholder="${t.rph}">${esc(r.a[i] || '')}</textarea></label>`).join('')}
    <button class="btn primary" data-act="saveReflect">💾 ${t.saveReflect}</button>`)}
  ${sec('📥 ' + t.exportTitle, `<div class="btn-row wrap">
      <button class="btn" data-act="exCSV">${t.exCSV}</button><button class="btn" data-act="exTXT">${t.exTXT}</button>
      <button class="btn" data-act="exJSON">${t.exJSON}</button><button class="btn" data-act="copyTXT">${t.copyTXT}</button><label class="btn file">${t.imJSON}<input type="file" id="imFile" accept="application/json,.json" hidden></label>
    </div><p class="muted small">${t.exHint}</p><button class="btn danger sm" data-act="clearAll">${t.clearAll}</button>`)}
  ${sec('🗂 ' + t.logTitle, `<div class="chips small">${types.map(k => `<button class="chip ${UI.logFilter === k ? 'on' : ''}" data-act="logf" data-k="${k}">${k === 'all' ? t.filterAll : t.types[k]}</button>`).join('')}</div>
    ${logs.length ? `<ol class="log">${logs.map(e => `<li class="log-${e.type}"><span class="log-type">${t.types[e.type] || e.type}</span><div><b>${esc(e.title)}</b>${e.detail ? `<p>${esc(e.detail)}</p>` : ''}<time>${fmtDate(e.ts)}</time></div>${e.score !== '' ? `<span class="log-score">${esc(e.score)}</span>` : ''}</li>`).join('')}</ol>` : `<p class="empty">📭 ${t.logEmpty}</p>`}`)}`;
};
function quizChart() {
  const h = S.quizHist.slice(-10);
  if (!h.length) return `<p class="empty">📭 ${T().logEmpty}</p>`;
  const w = 300, ht = 150, bw = w / 10;
  return `<svg viewBox="0 0 ${w} ${ht + 24}" class="chart" role="img" aria-label="${T().qzHist}">
    ${[0, 50, 100].map(v => `<line x1="0" x2="${w}" y1="${ht - v / 100 * ht + 4}" y2="${ht - v / 100 * ht + 4}" class="grid-line"/><text x="2" y="${ht - v / 100 * ht}" class="axis">${v}</text>`).join('')}
    ${h.map((q, i) => { const bh = Math.max(3, q.score / 100 * ht); return `<g><rect x="${i * bw + 22}" y="${ht - bh + 4}" width="${bw - 10}" height="${bh}" rx="4" class="bar-rect ${q.score >= 90 ? 'hi' : q.score >= 60 ? 'mid' : 'lo'}" style="--d:${i * 60}ms"/><text x="${i * bw + 22 + (bw - 10) / 2}" y="${ht - bh}" text-anchor="middle" class="bar-val">${q.score}</text><text x="${i * bw + 22 + (bw - 10) / 2}" y="${ht + 20}" text-anchor="middle" class="axis">${i + 1}</text></g>`; }).join('')}
  </svg>`;
}
AFTER.portfolio = () => {
  [['pfName', 'name'], ['pfCls', 'cls'], ['pfSeat', 'seat']].forEach(([id, k]) => {
    const el = $('#' + id); if (el) el.addEventListener('change', () => { S.profile[k] = el.value.trim(); store.set('profile', S.profile); toast(T().toastSaved); });
  });
  const f = $('#imFile'); if (f) f.addEventListener('change', importJSON);
};
ACT.logf = el => { Sound.play('click'); UI.logFilter = el.dataset.k; renderPage(); };
ACT.mood = el => { Sound.play('pop'); UI.mood = +el.dataset.i; $$('.mood').forEach((b, i) => { b.classList.toggle('on', i === UI.mood); b.setAttribute('aria-pressed', i === UI.mood); }); };
ACT.saveReflect = () => {
  const a = [0, 1, 2].map(i => (($('#rf' + i) || {}).value || '').trim());
  if (!a.some(Boolean) && UI.mood == null) { toast('✏️'); return; }
  store.set('reflect', { mood: UI.mood, a });
  const m = UI.mood != null ? MOODS[UI.mood][0] + ' ' : '';
  addLog('reflect', m + T().reflect, a.filter(Boolean).join(' ／ '), '');
  track(() => { S.prog.reflect = true; });
  Sound.play('save'); toast(T().toastSaved); renderPage();
};

/* ---------- 下載 ---------- */
function stamp() { const d = new Date(); return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`; }
function who() { const p = S.profile; return [p.cls, p.seat, p.name].filter(Boolean).join('-') || 'student'; }
function download(name, text, type) {
  try {
    const b = new Blob([text], { type }); const a = document.createElement('a');
    a.href = URL.createObjectURL(b); a.download = name; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1500); toast(T().toastExport); Sound.play('save');
  } catch (e) { toast(T().toastBad); }
}
ACT.exCSV = () => {
  const t = T(), p = S.profile, c = v => { v = v == null ? '' : String(v); return /[",\n\r]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; };
  const rows = [t.csvHead, ...S.log.slice().reverse().map(e => [fmtDate(e.ts), p.name, p.cls, p.seat, t.types[e.type] || e.type, e.title, e.detail, e.score])];
  download(`kongyiji-log-${who()}-${stamp()}.csv`, '﻿' + rows.map(r => r.map(c).join(',')).join('\r\n'), 'text/csv;charset=utf-8');
};
function portfolioText() {
  const t = T(), p = S.profile, pr = S.prog, r = store.get('reflect', { mood: null, a: ['', '', ''] }), d = store.get('discuss', {});
  const L1 = [];
  L1.push('══════ ' + t.pfTitle + ' ══════', t.appName, '');
  L1.push(`${t.pName}：${p.name || '—'}　${t.pClass}：${p.cls || '—'}　${t.pSeat}：${p.seat || '—'}`, fmtDate(Date.now()), '');
  L1.push('【' + t.path + '】 ' + progressPct() + '%');
  GUIDE.steps.forEach((s, i) => L1.push(`  ${stepDone(s.key) ? '☑' : '☐'} ${i + 1}. ${L(s)}`));
  L1.push('', '【' + t.stats + '】', `  ${t.stPractice}：${pr.prCount}　${t.stAcc}：${pr.prCount ? Math.round(100 * pr.prCorrect / pr.prCount) : 0}%`, `  ${t.qzHist}：${S.quizHist.map(q => q.score).join('、') || '—'}`, `  ${t.stGame}：${Math.max(...S.gameBest)}`);
  L1.push('', '【' + t.badges + '】 ' + (BADGES.filter(b => S.badges.includes(b.id)).map(b => b.icon + L(b)).join('、') || '—'));
  L1.push('', '【' + t.reflect + '】', `  ${t.mood}：${r.mood != null ? MOODS[r.mood][0] + ' ' + MOODS[r.mood][S.settings.lang === 'zh' ? 1 : 2] : '—'}`);
  t.rq.forEach((q, i) => L1.push('  ◆ ' + q, '    ' + (r.a[i] || '—')));
  L1.push('', '【' + L(ADV.find(a => a.id === 'think')) + '】');
  DISCUSS.forEach((q, i) => L1.push('  ◆ ' + L(q), '    ' + (d[i] || '—')));
  L1.push('', '【' + t.logTitle + '】');
  S.log.slice().reverse().forEach(e => L1.push(`  ${fmtDate(e.ts)}［${t.types[e.type] || e.type}］${e.title}${e.detail ? '：' + e.detail : ''}${e.score !== '' ? '（' + e.score + '）' : ''}`));
  return L1.join('\r\n');
}
ACT.exTXT = () => download(`kongyiji-portfolio-${who()}-${stamp()}.txt`, '\ufeff' + portfolioText(), 'text/plain;charset=utf-8');
ACT.copyTXT = async () => {
  const txt = portfolioText();
  try { await navigator.clipboard.writeText(txt); toast(T().copied); Sound.play('save'); }
  catch (e) { const ta = document.createElement('textarea'); ta.value = txt; document.body.appendChild(ta); ta.select(); let ok = false; try { ok = document.execCommand('copy'); } catch (er) {} ta.remove(); toast(ok ? T().copied : T().toastBad); }
};
ACT.exJSON = () => {
  const data = { app: 'kongyiji-unit', version: 1, exported: new Date().toISOString(), profile: S.profile, prog: S.prog, log: S.log, wrong: S.wrong, known: S.known, quizHist: S.quizHist, gameBest: S.gameBest, badges: S.badges, reflect: store.get('reflect', null), discuss: store.get('discuss', {}) };
  download(`kongyiji-backup-${who()}-${stamp()}.json`, JSON.stringify(data, null, 2), 'application/json');
};
function importJSON(ev) {
  const f = ev.target.files && ev.target.files[0]; ev.target.value = ''; if (!f) return;
  const rd = new FileReader();
  rd.onload = () => {
    try {
      const d = JSON.parse(rd.result); if (!d || d.app !== 'kongyiji-unit' || !Array.isArray(d.log)) throw 0;
      const ids = new Set(S.log.map(e => e.id));
      const add = d.log.filter(e => e && typeof e.id === 'number' && typeof e.type === 'string' && !ids.has(e.id)).map(e => ({ id: e.id, ts: String(e.ts), type: String(e.type), title: String(e.title || ''), detail: String(e.detail || ''), score: e.score == null ? '' : e.score }));
      S.log = [...S.log, ...add].sort((a, b) => b.id - a.id).slice(0, 800); store.set('log', S.log);
      if (d.prog) { const p = d.prog; S.prog = { guide: S.prog.guide || !!p.guide, explore: [...new Set([...S.prog.explore, ...(p.explore || [])])], game: S.prog.game || !!p.game, adv: [...new Set([...S.prog.adv, ...(p.adv || [])])], prCount: Math.max(S.prog.prCount, +p.prCount || 0), prCorrect: Math.max(S.prog.prCorrect, +p.prCorrect || 0), quiz: S.prog.quiz || !!p.quiz, reflect: S.prog.reflect || !!p.reflect }; }
      if (Array.isArray(d.quizHist)) { const seen = new Set(S.quizHist.map(q => q.ts)); S.quizHist = [...S.quizHist, ...d.quizHist.filter(q => q && typeof q.score === 'number' && !seen.has(q.ts))].sort((a, b) => (a.ts > b.ts ? 1 : -1)); store.set('quizHist', S.quizHist); }
      if (Array.isArray(d.gameBest)) { S.gameBest = S.gameBest.map((v, i) => Math.max(v, +d.gameBest[i] || 0)); store.set('gameBest', S.gameBest); }
      if (Array.isArray(d.badges)) { S.badges = [...new Set([...S.badges, ...d.badges.filter(b => BADGES.some(x => x.id === b))])]; store.set('badges', S.badges); }
      if (Array.isArray(d.wrong)) { S.wrong = [...new Set([...S.wrong, ...d.wrong.filter(n => BANK[n])])]; store.set('wrong', S.wrong); }
      if (d.profile && !S.profile.name) { S.profile = { name: String(d.profile.name || ''), cls: String(d.profile.cls || ''), seat: String(d.profile.seat || '') }; store.set('profile', S.profile); }
      if (d.reflect && !store.get('reflect', null)) store.set('reflect', d.reflect);
      if (d.discuss && !Object.keys(store.get('discuss', {})).length) store.set('discuss', d.discuss);
      saveProg(); Sound.play('save'); toast(fmt(T().toastImport, { n: add.length })); renderAll();
    } catch (e) { toast(T().toastBad); Sound.play('bad'); }
  };
  rd.readAsText(f);
}
ACT.clearAll = async () => {
  if (!(await askConfirm(T().confirmClear))) return;
  ['log', 'prog', 'wrong', 'known', 'quizHist', 'gameBest', 'badges', 'reflect', 'discuss'].forEach(k => { try { localStorage.removeItem(KEY + k); } catch (e) {} });
  S.log = []; S.prog = { ...DEF_PROG, explore: [], adv: [] }; S.wrong = []; S.known = []; S.quizHist = []; S.gameBest = [0, 0, 0]; S.badges = []; UI.mood = null;
  toast(T().toastCleared); renderAll();
};
