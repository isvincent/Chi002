/* 核心：狀態、儲存、設定、音效、紀錄、路由 */
'use strict';

const KEY = 'kyjU_';
const store = {
  get(k, d) { try { const v = JSON.parse(localStorage.getItem(KEY + k)); return v == null ? d : v; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(KEY + k, JSON.stringify(v)); } catch (e) { /* 私密模式等 */ } }
};

const DEF_SET = { fs: false, sound: true, device: 'auto', layout: 'auto', lang: 'zh', font: 'md', theme: 'system' };
const DEF_PROG = { guide: false, explore: [], game: false, adv: [], prCount: 0, prCorrect: 0, quiz: false, reflect: false };

const S = {
  settings: { ...DEF_SET, ...store.get('settings', {}), fs: false },
  profile: { name: '', cls: '', seat: '', ...store.get('profile', {}) },
  prog: { ...DEF_PROG, ...store.get('prog', {}) },
  log: store.get('log', []),
  wrong: store.get('wrong', []),
  known: store.get('known', []),
  quizHist: store.get('quizHist', []),
  gameBest: store.get('gameBest', [0, 0, 0]),
  badges: store.get('badges', []),
  page: 'guide'
};

const $ = (sel, root) => (root || document).querySelector(sel);
const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
const T = () => I18N[S.settings.lang] || I18N.zh;
const L = o => (o == null ? '' : (typeof o === 'string' ? o : (o[S.settings.lang] != null ? o[S.settings.lang] : o.zh)));
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const fmt = (s, o) => s.replace(/\{(\w+)\}/g, (m, k) => (o[k] != null ? o[k] : m));
const pad = n => String(n).padStart(2, '0');
const fmtDate = ts => { const d = new Date(ts); return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`; };

/* ---------- 音效（Web Audio 合成，不需外部檔案） ---------- */
const Sound = {
  ac: null,
  ctx() { try { this.ac = this.ac || new (window.AudioContext || window.webkitAudioContext)(); if (this.ac.state === 'suspended') this.ac.resume(); return this.ac; } catch (e) { return null; } },
  tone(f, d, type, vol, delay) {
    if (!S.settings.sound) return; const ac = this.ctx(); if (!ac) return;
    const t0 = ac.currentTime + (delay || 0), o = ac.createOscillator(), g = ac.createGain();
    o.type = type || 'sine'; o.frequency.setValueAtTime(f, t0);
    g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vol || 0.15, t0 + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t0 + d);
    o.connect(g).connect(ac.destination); o.start(t0); o.stop(t0 + d + 0.02);
  },
  play(kind, n) {
    const t = this.tone.bind(this);
    switch (kind) {
      case 'click': t(1100, 0.05, 'square', 0.035); break;
      case 'pop': t(660, 0.08, 'triangle', 0.12); t(990, 0.1, 'triangle', 0.1, 0.05); break;
      case 'flip': t(420, 0.06, 'sine', 0.1); t(620, 0.08, 'sine', 0.1, 0.05); break;
      case 'ok': { const b = 600 + Math.min(n || 0, 6) * 50; t(b, 0.12, 'triangle', 0.16); t(b * 1.5, 0.18, 'triangle', 0.13, 0.09); break; }
      case 'bad': t(220, 0.2, 'sawtooth', 0.07); t(160, 0.28, 'sawtooth', 0.07, 0.11); break;
      case 'laugh': for (let i = 0; i < 6; i++) t(560 - i * 28 + (i % 2) * 40, 0.08, 'square', 0.045, 0.05 + i * 0.1); break;
      case 'tick': t(520, 0.08, 'sine', 0.12); break;
      case 'go': t(784, 0.12, 'triangle', 0.15); t(1046, 0.22, 'triangle', 0.15, 0.1); break;
      case 'end': [523, 659, 784].forEach((f, i) => t(f, 0.25, 'triangle', 0.13, i * 0.13)); break;
      case 'win': [523, 659, 784, 1046, 1318].forEach((f, i) => t(f, 0.28, 'triangle', 0.14, i * 0.1)); break;
      case 'save': [660, 880].forEach((f, i) => t(f, 0.2, 'sine', 0.14, i * 0.12)); break;
      case 'pluck': t(n || 440, 0.5, 'triangle', 0.18); t((n || 440) * 2, 0.3, 'sine', 0.05); break;
    }
  }
};

/* ---------- 提示訊息與彩帶 ---------- */
let toastTimer;
function toast(msg) {
  const el = $('#toast'); el.textContent = msg; el.classList.add('on');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('on'), 2200);
}
function confetti(n) {
  const cv = $('#fx'); if (!cv || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = cv.getContext('2d'); cv.width = innerWidth; cv.height = innerHeight;
  const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#a855f7', '#ec4899'];
  const ps = Array.from({ length: n || 120 }, () => ({ x: innerWidth / 2 + (Math.random() - 0.5) * 200, y: innerHeight * 0.35, vx: (Math.random() - 0.5) * 14, vy: -Math.random() * 14 - 4, s: 6 + Math.random() * 7, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4, c: colors[Math.floor(Math.random() * colors.length)] }));
  let f = 0;
  (function step() {
    ctx.clearRect(0, 0, cv.width, cv.height);
    ps.forEach(p => { p.vy += 0.35; p.x += p.vx; p.y += p.vy; p.r += p.vr; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); ctx.restore(); });
    if (++f < 150) requestAnimationFrame(step); else ctx.clearRect(0, 0, cv.width, cv.height);
  })();
}

/* 頁內確認視窗（取代 window.confirm，內嵌環境也能使用） */
function askConfirm(msg) {
  return new Promise(res => {
    const m = $('#confirm'), yes = $('#confirmYes'), no = $('#confirmNo');
    $('#confirmMsg').textContent = msg;
    yes.textContent = S.settings.lang === 'zh' ? '確定' : 'OK'; no.textContent = S.settings.lang === 'zh' ? '取消' : 'Cancel';
    m.hidden = false; requestAnimationFrame(() => m.classList.add('on')); setTimeout(() => no.focus(), 50);
    const done = ok => { m.classList.remove('on'); setTimeout(() => { m.hidden = true; }, 200); yes.onclick = no.onclick = m.onclick = null; Sound.play('click'); res(ok); };
    yes.onclick = () => done(true); no.onclick = () => done(false); m.onclick = e => { if (e.target === m) done(false); };
  });
}

/* ---------- 學習紀錄 ---------- */
function addLog(type, title, detail, score) {
  const e = { id: Date.now() + Math.floor(Math.random() * 1000), ts: new Date().toISOString(), type, title: String(title || ''), detail: String(detail || ''), score: score == null ? '' : score };
  S.log.unshift(e); if (S.log.length > 800) S.log.length = 800; store.set('log', S.log);
  return e;
}
function saveProg() { store.set('prog', S.prog); updateProgressUI(); checkBadges(); }
function stepDone(key) {
  const p = S.prog;
  switch (key) {
    case 'guide': return p.guide;
    case 'explore': return p.explore.length >= 4;
    case 'game': return p.game;
    case 'advanced': return p.adv.length >= 3;
    case 'practice': return p.prCount >= 10;
    case 'quiz': return p.quiz;
    case 'reflect': return p.reflect;
  }
  return false;
}
function progressPct() { return Math.round(100 * GUIDE.steps.filter(s => stepDone(s.key)).length / GUIDE.steps.length); }
/* 執行一個會影響步驟的動作，並在步驟剛完成時提示 */
function track(fn) {
  const before = GUIDE.steps.map(s => stepDone(s.key));
  fn(); saveProg();
  GUIDE.steps.forEach((s, i) => {
    if (!before[i] && stepDone(s.key)) { const msg = T().stepDone + L(s); addLog('step', L(s), '', ''); setTimeout(() => { toast('✅ ' + msg); Sound.play('win'); }, 350); }
  });
}
function markExplore(id) {
  if (S.prog.explore.includes(id)) return;
  track(() => { S.prog.explore.push(id); }); addLog('explore', T().vis[id] || id, '', '');
  const chip = $(`[data-act="vistab"][data-id="${id}"]`); if (chip) chip.classList.add('done');
}
function grantBadge(id) {
  if (S.badges.includes(id)) return;
  S.badges.push(id); store.set('badges', S.badges);
  const b = BADGES.find(x => x.id === id); if (!b) return;
  addLog('badge', b.icon + ' ' + L(b), L(b.d), '');
  setTimeout(() => { toast(b.icon + ' ' + T().badgeGet + L(b)); confetti(90); Sound.play('win'); }, 900);
}
function checkBadges() {
  const p = S.prog;
  if (p.explore.length >= 4) grantBadge('explorer');
  if (Math.max(...S.gameBest) >= 500) grantBadge('ear');
  if (p.prCount >= 30) grantBadge('scholar');
  if (S.quizHist.some(q => q.score >= 90)) grantBadge('ace');
  if (progressPct() === 100) grantBadge('complete');
}

/* ---------- 設定與環境 ---------- */
function setSetting(k, v) {
  Sound.play('click');
  if (k === 'fs') { toggleFs(v); return; }
  S.settings[k] = v; store.set('settings', { ...S.settings, fs: false });
  applyEnv();
  if (k === 'lang') renderAll(); else renderSettings();
  if (k === 'sound' && v) setTimeout(() => Sound.tone(880, 0.12, 'triangle', 0.12), 30);
}
function toggleFs(on) {
  const d = document, el = d.documentElement;
  try {
    if (on) { const f = el.requestFullscreen || el.webkitRequestFullscreen; if (!f) { toast(T().fsNo); return; } const p = f.call(el); if (p && p.catch) p.catch(() => toast(T().fsNo)); }
    else if (d.fullscreenElement || d.webkitFullscreenElement) (d.exitFullscreen || d.webkitExitFullscreen).call(d);
  } catch (e) { toast(T().fsNo); }
}
const darkMQ = window.matchMedia ? matchMedia('(prefers-color-scheme: dark)') : null;
function resolved() {
  const st = S.settings, w = innerWidth, h = innerHeight;
  const device = st.device !== 'auto' ? st.device : (w < 640 ? 'phone' : w < 1024 ? 'tablet' : 'desktop');
  let orient = st.layout;
  if (orient === 'auto') orient = device === 'desktop' ? 'landscape' : (w > h && device !== 'phone' ? 'landscape' : 'portrait');
  if (device === 'phone' && st.layout === 'auto') orient = 'portrait';
  return { device, orient, dark: st.theme === 'dark' || (st.theme === 'system' && !!(darkMQ && darkMQ.matches)) };
}
function applyEnv() {
  const r = resolved(), b = document.body, root = document.documentElement, st = S.settings;
  b.dataset.device = r.device; b.dataset.orient = r.orient; b.dataset.theme = r.dark ? 'dark' : 'light';
  b.classList.toggle('forced', st.device !== 'auto' && st.device !== (innerWidth < 640 ? 'phone' : innerWidth < 1024 ? 'tablet' : 'desktop'));
  root.style.fontSize = { sm: '16px', md: '18px', lg: '21px' }[st.font] || '18px';
  root.style.colorScheme = r.dark ? 'dark' : 'light';
  root.lang = st.lang === 'zh' ? 'zh-Hant' : 'en';
  document.title = T().appName;
  const m = $('meta[name="theme-color"]'); if (m) m.setAttribute('content', r.dark ? '#1b1626' : '#e8452c');
}

function segRow(key, label, opts) {
  const cur = S.settings[key];
  return `<div class="set-row"><span class="set-label">${label}</span><div class="seg" role="radiogroup" aria-label="${esc(label)}">${opts.map(([v, txt]) => `<button role="radio" aria-checked="${cur === v}" class="${cur === v ? 'on' : ''}" data-act="set" data-k="${key}" data-v="${v}">${txt}</button>`).join('')}</div></div>`;
}
function renderSettings() {
  const t = T();
  $('#settingsBody').innerHTML =
    segRow('fs', '🖥️ ' + t.sFs, [[true, t.on], [false, t.off]]) +
    segRow('sound', '🔊 ' + t.sSound, [[true, t.on], [false, t.off]]) +
    segRow('device', '📱 ' + t.sDevice, [['auto', t.auto], ['phone', t.phone], ['tablet', t.tablet], ['desktop', t.desktop]]) +
    segRow('layout', '🔄 ' + t.sLayout, [['auto', t.auto], ['portrait', t.portrait], ['landscape', t.landscape]]) +
    segRow('lang', '🌐 ' + t.sLang, [['zh', '繁體中文'], ['en', 'English']]) +
    segRow('font', '🔠 ' + t.sFont, [['sm', t.fSm], ['md', t.fMd], ['lg', t.fLg]]) +
    segRow('theme', '🎨 ' + t.sTheme, [['system', t.system], ['light', t.light], ['dark', t.dark]]);
  $('#settingsTitle').textContent = t.sTitle;
  $('#settingsDone').textContent = t.done;
  $('#settingsReset').textContent = t.reset;
}
function openSettings(open) {
  const m = $('#settings');
  if (open) { renderSettings(); m.hidden = false; requestAnimationFrame(() => m.classList.add('on')); setTimeout(() => { const b = $('#settings .seg button.on'); b && b.focus(); }, 60); }
  else { m.classList.remove('on'); setTimeout(() => { m.hidden = true; }, 220); const g = $('#btnSettings'); g && g.focus(); }
}

/* ---------- 版面骨架 ---------- */
const PAGES = ['guide', 'visual', 'advanced', 'practice', 'quiz', 'portfolio'];
function renderChrome() {
  const t = T();
  $('#brandName').textContent = t.appName; $('#brandTag').textContent = t.tagline;
  const items = PAGES.map(p => `<button class="nav-btn ${S.page === p ? 'on' : ''}" data-act="nav" data-page="${p}" aria-current="${S.page === p ? 'page' : 'false'}"><span class="nav-ic" aria-hidden="true">${t.navIcon[p]}</span><span class="nav-tx">${t.nav[p]}</span></button>`).join('');
  $('#topNav').innerHTML = items; $('#bottomNav').innerHTML = items;
  $('#btnSettings').setAttribute('aria-label', t.settings); $('#btnSettings').title = t.settings;
  $('#footer').innerHTML = `<span>${esc(t.footer)}</span><span>${esc(t.credit)}</span>`;
  const ib = $('#btnInstall'); if (ib) ib.textContent = t.install;
  updateProgressUI();
}
function updateProgressUI() {
  const pct = progressPct(), el = $('#progRing'); if (!el) return;
  el.style.setProperty('--p', pct); el.querySelector('span').textContent = pct + '%';
  el.title = T().progress + ' ' + pct + '%'; el.setAttribute('aria-label', T().progress + ' ' + pct + '%');
}
function go(page) {
  if (!PAGES.includes(page)) page = 'guide';
  if (typeof Game !== 'undefined') Game.stop(true);
  if (typeof Quiz !== 'undefined' && S.page === 'quiz' && page !== 'quiz') Quiz.pause();
  S.page = page;
  if (location.hash !== '#' + page) history.replaceState(null, '', '#' + page);
  renderChrome(); renderPage();
  const v = $('#view'); v.classList.remove('enter'); void v.offsetWidth; v.classList.add('enter');
  clearTimeout(go.t); go.t = setTimeout(() => v.classList.remove('enter'), 700);
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
}
function renderPage() { const fn = VIEWS[S.page]; $('#view').innerHTML = fn ? fn() : ''; if (AFTER[S.page]) AFTER[S.page](); }
function renderAll() { applyEnv(); renderChrome(); renderPage(); if (!$('#settings').hidden) renderSettings(); }

/* ---------- 事件委派 ---------- */
const ACT = {
  nav: el => { Sound.play('click'); go(el.dataset.page); },
  set: el => { let v = el.dataset.v; if (v === 'true') v = true; else if (v === 'false') v = false; setSetting(el.dataset.k, v); },
  settings: () => { Sound.play('click'); openSettings(true); },
  closeSettings: () => { Sound.play('click'); openSettings(false); },
  resetSettings: () => { S.settings = { ...DEF_SET }; store.set('settings', S.settings); toggleFs(false); renderAll(); Sound.play('click'); }
};
document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]'); if (!el) return;
  const fn = ACT[el.dataset.act]; if (fn) { e.preventDefault(); fn(el, e); }
});

/* ---------- 啟動 ---------- */
let deferredPrompt = null;
function boot() {
  applyEnv();
  if (!S.badges.includes('first')) { grantBadge('first'); }
  addLog('visit', T().appName, '', '');
  const h = location.hash.replace('#', ''); S.page = PAGES.includes(h) ? h : 'guide';
  renderChrome(); renderPage(); setTimeout(() => $('#view').classList.remove('enter'), 700);
  addEventListener('resize', () => { const before = document.body.dataset.device + document.body.dataset.orient; applyEnv(); if (before !== document.body.dataset.device + document.body.dataset.orient) renderPage(); });
  addEventListener('hashchange', () => { const p = location.hash.replace('#', ''); if (p !== S.page && PAGES.includes(p)) go(p); });
  if (darkMQ) (darkMQ.addEventListener ? darkMQ.addEventListener('change', applyEnv) : darkMQ.addListener(applyEnv));
  const onFs = () => { S.settings.fs = !!(document.fullscreenElement || document.webkitFullscreenElement); if (!$('#settings').hidden) renderSettings(); };
  document.addEventListener('fullscreenchange', onFs); document.addEventListener('webkitfullscreenchange', onFs);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !$('#settings').hidden) { openSettings(false); return; }
    if (typeof Game !== 'undefined') Game.key(e);
  });
  $('#settings').addEventListener('click', e => { if (e.target.id === 'settings') openSettings(false); });
  // PWA：僅在 https 或 localhost、且非內嵌框架時註冊 Service Worker
  try {
    if ('serviceWorker' in navigator && window.top === window && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    }
  } catch (e) { /* 內嵌環境 */ }
  addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredPrompt = e; const b = $('#btnInstall'); if (b) b.hidden = false; });
  ACT.install = async () => { if (!deferredPrompt) return; deferredPrompt.prompt(); try { await deferredPrompt.userChoice; } catch (e) {} deferredPrompt = null; $('#btnInstall').hidden = true; };
}
document.addEventListener('DOMContentLoaded', boot);
