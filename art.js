/* 插圖：以 SVG 繪製，不依賴外部圖片 */
'use strict';

function person(x, y, o) {
  o = o || {};
  const c = o.color || '#6f7f94', skin = '#f6c9a0', s = o.scale || 1;
  if (o.sit) {
    return `<g transform="translate(${x},${y}) scale(${s})">
      <ellipse cx="0" cy="34" rx="30" ry="7" fill="#c9a26b"/>
      <path d="M-22 30 Q0 18 22 30 L18 36 L-18 36Z" fill="#8a6a4a"/>
      <path d="M-14 30 L-12 4 Q0 -2 12 4 L14 30Z" fill="${c}"/>
      <path d="M-12 8 L-26 26 M12 8 L26 26" stroke="${c}" stroke-width="6" stroke-linecap="round"/>
      <circle cx="0" cy="-8" r="11" fill="${skin}"/>
      <path d="M-8 -2 Q0 6 8 -2" stroke="#aaa" stroke-width="3" fill="none"/>
      <path d="M-11 -12 Q0 -24 11 -12" fill="#555"/>
    </g>`;
  }
  const body = o.long
    ? `<path d="M-13 0 L-17 52 L17 52 L13 0 Q0 -5 -13 0Z" fill="${c}"/><path d="M-13 4 L-24 30 M13 4 L24 30" stroke="${c}" stroke-width="7" stroke-linecap="round"/>`
    : `<path d="M-13 0 L-15 26 L15 26 L13 0 Q0 -5 -13 0Z" fill="${c}"/><rect x="-12" y="26" width="9" height="26" rx="3" fill="#3b3b4f"/><rect x="3" y="26" width="9" height="26" rx="3" fill="#3b3b4f"/><path d="M-13 4 L-24 28 M13 4 L24 28" stroke="${c}" stroke-width="7" stroke-linecap="round"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})" class="${o.cls || ''}">
    ${body}
    <circle cx="0" cy="-12" r="11" fill="${skin}"/>
    <path d="M-11 -16 Q0 -28 11 -16" fill="#3a2a20"/>
    ${o.beard ? '<path d="M-7 -6 Q0 4 7 -6" stroke="#bbb" stroke-width="3" fill="none"/>' : ''}
    ${o.laugh ? '<path d="M-4 -8 Q0 -4 4 -8" stroke="#7a2b1b" stroke-width="2" fill="none"/>' : ''}
  </g>`;
}

function tavernSVG(opt) {
  opt = opt || {};
  return `<svg viewBox="0 0 400 260" class="tavern-svg" role="img" aria-label="咸亨酒店">
    <defs>
      <linearGradient id="gWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--wall1)"/><stop offset="1" stop-color="var(--wall2)"/></linearGradient>
      <linearGradient id="gWood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8743c"/><stop offset="1" stop-color="#7a4520"/></linearGradient>
    </defs>
    <rect width="400" height="260" fill="url(#gWall)"/>
    <rect y="200" width="400" height="60" fill="var(--floor)"/>
    <g opacity=".25">${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<line x1="${i * 55}" y1="200" x2="${i * 55 - 30}" y2="260" stroke="#6b3a1a"/>`).join('')}</g>
    <!-- 招牌 -->
    <rect x="150" y="10" width="100" height="30" rx="4" fill="#7a2b1b" stroke="#f2c14e" stroke-width="2"/>
    <text x="200" y="32" text-anchor="middle" font-size="18" font-weight="900" fill="#f9d77e" font-family="Noto Serif TC, serif">咸亨酒店</text>
    <!-- 燈籠 -->
    <g class="swing" style="transform-origin:60px 0"><line x1="60" y1="0" x2="60" y2="22" stroke="#555"/><ellipse cx="60" cy="36" rx="13" ry="16" fill="#e8452c"/><rect x="54" y="18" width="12" height="4" fill="#f2c14e"/><rect x="54" y="50" width="12" height="4" fill="#f2c14e"/><text x="60" y="41" font-size="12" text-anchor="middle" fill="#ffe7a0" font-weight="900">酒</text></g>
    <g class="swing d2" style="transform-origin:340px 0"><line x1="340" y1="0" x2="340" y2="22" stroke="#555"/><ellipse cx="340" cy="36" rx="13" ry="16" fill="#e8452c"/><rect x="334" y="18" width="12" height="4" fill="#f2c14e"/><rect x="334" y="50" width="12" height="4" fill="#f2c14e"/><text x="340" y="41" font-size="12" text-anchor="middle" fill="#ffe7a0" font-weight="900">咸</text></g>
    <!-- 隔壁房（長衫主顧） -->
    <rect x="280" y="50" width="110" height="105" rx="6" fill="var(--room)" stroke="#a8632f" stroke-width="3"/>
    <rect x="300" y="112" width="70" height="8" fill="#7a4520"/><rect x="306" y="120" width="5" height="22" fill="#7a4520"/><rect x="359" y="120" width="5" height="22" fill="#7a4520"/>
    ${person(318, 92, { long: true, color: '#3f51b5', scale: 0.7 })}${person(352, 92, { long: true, color: '#7c3aed', scale: 0.7 })}
    <!-- 粉板 -->
    <rect x="262" y="88" width="14" height="40" fill="#fff" stroke="#999"/><text x="269" y="100" font-size="6" text-anchor="middle" fill="#333">孔</text><text x="269" y="110" font-size="6" text-anchor="middle" fill="#333">十</text><text x="269" y="120" font-size="6" text-anchor="middle" fill="#333">九</text>
    <!-- 酒罈 -->
    ${[30, 62].map(x => `<g><ellipse cx="${x}" cy="108" rx="16" ry="22" fill="#8b5a2b"/><rect x="${x - 9}" y="82" width="18" height="8" rx="2" fill="#c0392b"/><text x="${x}" y="112" font-size="10" text-anchor="middle" fill="#ffe7a0" font-weight="900">酒</text></g>`).join('')}
    <!-- 小伙計 -->
    ${person(135, 112, { color: '#0d9488', scale: 0.8 })}
    <!-- 曲尺形櫃檯 -->
    <path d="M90 150 L250 150 L250 205 L230 205 L230 170 L90 170Z" fill="url(#gWood)" stroke="#5a3010" stroke-width="2"/>
    <rect x="86" y="144" width="168" height="8" rx="2" fill="#d08a4a"/>
    ${[120, 160, 200].map((x, i) => `<g><path d="M${x - 9} 136 L${x + 9} 136 L${x + 6} 144 L${x - 6} 144Z" fill="#f4efe4" stroke="#8a7a60"/><path class="steam s${i}" d="M${x - 3} 132 q-4 -6 0 -12 q4 -6 0 -12" stroke="#fff" stroke-width="2" fill="none" opacity=".7"/></g>`).join('')}
    <!-- 短衣幫（櫃外站） -->
    ${person(40, 186, { color: '#b45309', scale: 0.85, laugh: opt.laugh, cls: opt.laugh ? 'bob' : '' })}${person(78, 190, { color: '#be123c', scale: 0.85, laugh: opt.laugh, cls: opt.laugh ? 'bob d2' : '' })}
    <!-- 孔乙己 -->
    ${person(185, 196, { long: true, color: '#6f7f94', beard: true, scale: 0.95 })}
    <text x="185" y="252" text-anchor="middle" font-size="10" fill="var(--svgInk)" font-weight="700">孔乙己</text>
  </svg>`;
}

function figureSVG(pose) {
  if (pose === 'stand') return `<svg viewBox="-50 -50 100 120" class="fig-svg">${person(0, 0, { long: true, color: '#6f7f94', beard: true })}<ellipse cx="0" cy="56" rx="26" ry="5" fill="#0002"/></svg>`;
  if (pose === 'sit') return `<svg viewBox="-50 -50 100 120" class="fig-svg">${person(0, 10, { sit: true, color: '#5b4b3b' })}</svg>`;
  return `<svg viewBox="-50 -50 100 120" class="fig-svg"><path d="M-20 40 L20 40 L16 52 L-16 52Z" fill="#f4efe4" stroke="#8a7a60"/><text x="0" y="10" text-anchor="middle" font-size="34">❔</text><ellipse cx="0" cy="56" rx="26" ry="5" fill="#0002"/></svg>`;
}

function coinsSVG(n) {
  let s = ''; for (let i = 0; i < 9; i++) {
    const on = i < n;
    s += `<g transform="translate(${10 + i * 22},14)" opacity="${on ? 1 : 0.18}"><circle r="9" fill="${on ? '#f2b705' : '#999'}" stroke="#9a6b00" stroke-width="1.5"/><rect x="-3" y="-3" width="6" height="6" fill="var(--surface)"/></g>`;
  }
  return `<svg viewBox="0 0 200 28" class="coins" aria-label="${n}">${s}</svg>`;
}

function badgeEmblem(icon, on) {
  return `<div class="emblem ${on ? 'on' : ''}"><span>${icon}</span></div>`;
}

/* ================= 教學示意圖（隨色系變色，皆以 CSS 變數上色） ================= */
const ZH = () => (typeof S === 'undefined' || S.settings.lang === 'zh');
const tx = (zh, en) => (ZH() ? zh : en);
/* 共用：櫃檯、碗、粉板 */
function counterBar(x, y, w) {
  return `<rect x="${x}" y="${y}" width="${w}" height="10" rx="3" fill="#d08a4a"/><rect x="${x + 4}" y="${y + 10}" width="${w - 8}" height="38" fill="#9a5a2a"/><line x1="${x + 4}" y1="${y + 26}" x2="${x + w - 4}" y2="${y + 26}" stroke="#7a4520" stroke-width="2"/>`;
}
function bowl(x, y, steam) {
  return `<path d="M${x - 9} ${y} L${x + 9} ${y} L${x + 6} ${y + 8} L${x - 6} ${y + 8}Z" fill="#f4efe4" stroke="#8a7a60"/>${steam ? `<path class="steam" d="M${x} ${y - 3} q-4 -6 0 -12" stroke="#fff" stroke-width="2" fill="none" opacity=".7"/>` : ''}`;
}
function chalkBoard(x, y, w, h, lines) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="#2f3b33" stroke="#8a5a2b" stroke-width="4"/>${lines.map((l, i) => `<text x="${x + w / 2}" y="${y + 20 + i * 17}" text-anchor="middle" font-size="13" fill="#f4f1e6" font-weight="700">${l}</text>`).join('')}`;
}

/* 1. 情節四格漫畫 */
function storyPanelSVG(n) {
  const bg = `<rect width="200" height="140" fill="var(--wall1)"/><rect y="112" width="200" height="28" fill="var(--floor)"/>`;
  const num = `<circle cx="16" cy="16" r="11" fill="var(--red)"/><text x="16" y="21" text-anchor="middle" font-size="13" font-weight="900" fill="var(--onAccent)">${n + 1}</text>`;
  let body = '';
  if (n === 0) {
    body = counterBar(70, 76, 120) + [0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => `<circle cx="${84 + i * 11}" cy="72" r="4" fill="#f2b705" stroke="#9a6b00"/>`).join('') +
      person(48, 72, { long: true, color: '#6f7f94', beard: true, scale: 0.85 }) +
      `<text x="130" y="60" text-anchor="middle" font-size="11" font-weight="800" fill="var(--svgInk)">${tx('排出九文大錢', 'nine coppers')}</text>`;
  } else if (n === 1) {
    body = counterBar(20, 80, 170) + person(150, 76, { long: true, color: '#6f7f94', beard: true, scale: 0.85 }) +
      person(50, 72, { color: '#0d9488', scale: 0.7 }) +
      `<text x="100" y="78" text-anchor="middle" font-size="22" font-weight="900" fill="var(--red)" font-family="Noto Serif TC, serif">茴</text>
       <path d="M120 70 L108 76" stroke="var(--svgInk)" stroke-width="2" stroke-dasharray="3 2"/>
       <rect x="62" y="22" width="78" height="22" rx="11" fill="var(--surface)" stroke="var(--line)"/><text x="101" y="37" text-anchor="middle" font-size="11" font-weight="700" fill="var(--svgInk)">${tx('四樣寫法', '4 ways to write')}</text>`;
  } else if (n === 2) {
    body = `<circle cx="168" cy="30" r="14" fill="#fff3c4"/><circle cx="174" cy="26" r="12" fill="var(--wall1)"/>` + counterBar(110, 70, 85) +
      person(60, 82, { sit: true, color: '#5b4b3b', scale: 1 }) +
      `<path d="M28 124 q8 -4 16 0 M76 124 q8 -4 16 0" stroke="var(--svgInk)" stroke-width="2" fill="none" opacity=".5"/>
       <text x="150" y="130" text-anchor="middle" font-size="11" font-weight="800" fill="var(--svgInk)">${tx('用手走來', 'came on his hands')}</text>`;
  } else {
    body = chalkBoard(54, 26, 92, 62, [tx('孔乙己', 'Kong Yiji'), tx('欠十九錢', 'owes 19')]) +
      `<path d="M60 112 L140 112" stroke="var(--line)"/>` + bowl(100, 102, false) +
      [[20, 30], [40, 60], [176, 44], [160, 90], [30, 96]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="2.5" fill="#fff" opacity=".9" class="snow" style="animation-delay:${i * -0.6}s"/>`).join('') +
      `<text x="100" y="132" text-anchor="middle" font-size="11" font-weight="800" fill="var(--svgInk)">${tx('大約的確死了', 'probably dead')}</text>`;
  }
  return `<svg viewBox="0 0 200 140" class="ill" role="img" aria-hidden="true">${bg}${body}${num}</svg>`;
}

/* 2. 咸亨酒店空間＝階級示意圖 */
function classMapSVG() {
  return `<svg viewBox="0 0 360 230" class="ill" role="img" aria-label="${tx('空間與階級示意圖', 'Space and class diagram')}">
    <rect x="10" y="10" width="340" height="62" rx="12" fill="var(--indigoSoft)" stroke="var(--indigo)" stroke-width="2"/>
    <text x="24" y="34" font-size="14" font-weight="900" fill="var(--indigo)">${tx('裡屋・坐著喝', 'Inner room · seated')}</text>
    <text x="24" y="56" font-size="12" fill="var(--svgInk)">${tx('長衫主顧：要酒要菜，慢慢地坐喝', 'Long gowns: wine & dishes, sitting')}</text>
    ${person(250, 46, { long: true, color: '#3f51b5', scale: 0.5 })}
    <rect x="10" y="84" width="340" height="22" rx="6" fill="#b8743c"/><text x="140" y="100" text-anchor="middle" font-size="12" font-weight="900" fill="#fff">${tx('曲尺形大櫃檯（身分的分界線）', 'L-shaped counter — the class line')}</text>
    <rect x="10" y="118" width="340" height="62" rx="12" fill="var(--goldSoft)" stroke="var(--gold)" stroke-width="2"/>
    <text x="24" y="142" font-size="14" font-weight="900" fill="var(--gold)">${tx('櫃外・站著喝', 'Outside · standing')}</text>
    <text x="24" y="164" font-size="12" fill="var(--svgInk)">${tx('短衣幫：花四文銅錢，買一碗酒', 'Labourers: 4 coppers a bowl')}</text>
    ${person(250, 150, { color: '#b45309', scale: 0.5 })}
    <g transform="translate(318,92)">${person(0, 0, { long: true, color: '#6f7f94', beard: true, scale: 0.6 })}</g>
    <text x="286" y="78" text-anchor="end" font-size="11" font-weight="800" fill="var(--indigo)">${tx('長衫 ↑', 'gown ↑')}</text>
    <text x="286" y="122" text-anchor="end" font-size="11" font-weight="800" fill="var(--gold)">${tx('站著 ↓', 'standing ↓')}</text>
    <rect x="60" y="192" width="240" height="30" rx="15" fill="var(--red)"/>
    <text x="180" y="212" text-anchor="middle" font-size="13" font-weight="900" fill="var(--onAccent)">${tx('孔乙己：穿長衫（心）卻站著喝（身）', 'Kong: gown (mind) but standing (body)')}</text>
  </svg>`;
}

/* 3. 敘事視角示意：成年的「我」回憶十二歲的「我」 */
function narrSVG() {
  return `<svg viewBox="0 0 380 190" class="ill" role="img" aria-label="${tx('敘事視角示意圖', 'Narrative viewpoint diagram')}">
    <rect x="8" y="20" width="112" height="150" rx="14" fill="var(--surface2)" stroke="var(--line)" stroke-width="2"/>
    <text x="64" y="42" text-anchor="middle" font-size="13" font-weight="900" fill="var(--jade)">${tx('現在', 'Now')}</text>
    ${person(64, 96, { long: true, color: '#0f766e', scale: 0.8 })}
    <text x="64" y="160" text-anchor="middle" font-size="11" font-weight="700" fill="var(--svgInk)">${tx('成年的「我」', 'adult "I"')}</text>
    <path d="M124 94 C160 60 190 60 214 82" stroke="var(--jade)" stroke-width="3" fill="none" stroke-dasharray="6 4" marker-end="url(#arN)"/>
    <text x="168" y="56" text-anchor="middle" font-size="12" font-weight="800" fill="var(--jade)">${tx('追憶二十多年前', 'looks back 20+ yrs')}</text>
    <defs><marker id="arN" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="var(--jade)"/></marker></defs>
    <rect x="218" y="20" width="154" height="150" rx="14" fill="var(--wall1)" stroke="#a8632f" stroke-width="2" stroke-dasharray="5 3"/>
    <text x="295" y="42" text-anchor="middle" font-size="13" font-weight="900" fill="var(--red)">${tx('過去・咸亨酒店', 'Then · the tavern')}</text>
    ${counterBar(228, 110, 70)}
    ${person(256, 100, { color: '#0d9488', scale: 0.6 })}
    ${person(336, 122, { long: true, color: '#6f7f94', beard: true, scale: 0.7 })}
    <path d="M266 88 L318 98" stroke="var(--red)" stroke-width="2" marker-end="url(#arE)"/>
    <defs><marker id="arE" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="var(--red)"/></marker></defs>
    <text x="262" y="72" text-anchor="middle" font-size="11" font-weight="700" fill="var(--svgInk)">${tx('十二歲的「我」', '"I" at twelve')}</text>
    <text x="295" y="182" text-anchor="middle" font-size="11" fill="var(--muted)">${tx('在場者＋旁觀者', 'present, yet onlooking')}</text>
  </svg>`;
}

/* 4. 看客與棄醫從文：幻燈片 → 轉向文學 */
function crowdSVG() {
  const crowd = [[-46, 6], [-30, -8], [-12, -14], [12, -14], [30, -8], [46, 6], [-38, 24], [38, 24]].map(([x, y]) => `<circle cx="${x}" cy="${y - 6}" r="6" fill="#55505a"/><path d="M${x - 8} ${y + 12} Q${x} ${y - 2} ${x + 8} ${y + 12}Z" fill="#55505a"/>`).join('');
  return `<svg viewBox="0 0 380 180" class="ill" role="img" aria-label="${tx('看客與棄醫從文示意圖', 'Onlookers and turning to literature')}">
    <rect x="10" y="14" width="190" height="130" rx="8" fill="#e8e1cf" stroke="#3a3a3a" stroke-width="4"/>
    <g transform="translate(105,80)" opacity=".9">${crowd}<circle cx="0" cy="14" r="7" fill="#2b2b2b"/><path d="M-9 34 Q0 18 9 34Z" fill="#2b2b2b"/></g>
    <text x="105" y="34" text-anchor="middle" font-size="12" font-weight="800" fill="#3a3a3a">${tx('仙台・幻燈片', 'Sendai · lantern slide')}</text>
    <text x="105" y="162" text-anchor="middle" font-size="12" font-weight="700" fill="var(--svgInk)">${tx('圍觀者神情麻木', 'numb onlookers')}</text>
    <path d="M208 80 L246 80" stroke="var(--pink)" stroke-width="4" marker-end="url(#arC)"/>
    <defs><marker id="arC" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="var(--pink)"/></marker></defs>
    <g transform="translate(268,40)"><rect x="-12" y="0" width="24" height="34" rx="5" fill="#cfe8f3" stroke="#5a7a8a" stroke-width="2"/><rect x="-6" y="-8" width="12" height="9" fill="#5a7a8a"/><path d="M-4 17 h8 M0 13 v8" stroke="#c0392b" stroke-width="3"/><path d="M-18 -6 L18 40" stroke="var(--red)" stroke-width="4" stroke-linecap="round"/></g>
    <text x="268" y="98" text-anchor="middle" font-size="12" font-weight="800" fill="var(--svgInk)">${tx('醫身體', 'heal bodies')}</text>
    <g transform="translate(336,38)"><rect x="-18" y="2" width="36" height="30" rx="3" fill="var(--surface)" stroke="var(--pink)" stroke-width="2"/><line x1="0" y1="2" x2="0" y2="32" stroke="var(--pink)" stroke-width="2"/><path d="M14 -10 L24 -2 L4 26 L-2 28 L0 22Z" fill="var(--gold)" stroke="#7a4a00"/></g>
    <text x="336" y="98" text-anchor="middle" font-size="12" font-weight="800" fill="var(--pink)">${tx('醫精神', 'heal minds')}</text>
    <rect x="232" y="116" width="140" height="30" rx="15" fill="var(--pink)"/>
    <text x="302" y="136" text-anchor="middle" font-size="13" font-weight="900" fill="var(--onAccent)">${tx('棄醫從文', 'from medicine to pen')}</text>
  </svg>`;
}

/* 5. 《吶喊》書架 */
function shelfSVG() {
  const books = [['狂人日記', 'Madman', '#7a2b1b'], ['孔乙己', 'Kong Yiji', 'var(--red)'], ['藥', 'Medicine', '#2f4f4f'], ['阿Q正傳', 'Ah Q', '#4a3b6b'], ['故鄉', 'Old Home', '#3b5b2b'], ['社戲', 'Opera', '#8a5a1b']];
  let x = 18;
  const g = books.map(([z, e, c], i) => { const w = i === 1 ? 46 : 38, h = 96 + (i % 3) * 8, y = 140 - h; const s = `<g class="${i === 1 ? 'book-hl' : ''}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${c}"/><rect x="${x + 4}" y="${y + 8}" width="${w - 8}" height="3" fill="#f2c14e" opacity=".8"/><text x="${x + w / 2}" y="${y + 24}" font-size="${ZH() ? 13 : 9}" fill="#fff8e6" font-weight="800" text-anchor="middle" style="writing-mode:${ZH() ? 'vertical-rl' : 'horizontal-tb'}">${ZH() ? z : e}</text></g>`; x += w + 8; return s; }).join('');
  return `<svg viewBox="0 0 320 170" class="ill" role="img" aria-label="${tx('《吶喊》書架', 'Call to Arms shelf')}">
    <rect x="4" y="140" width="312" height="12" rx="3" fill="#8a5a2b"/><rect x="10" y="152" width="10" height="14" fill="#6b3a1a"/><rect x="300" y="152" width="10" height="14" fill="#6b3a1a"/>
    ${g}
    <g transform="translate(286,40)"><rect x="-22" y="0" width="44" height="64" rx="4" fill="var(--surface)" stroke="var(--line)" stroke-width="2"/><text x="0" y="28" text-anchor="middle" font-size="18" font-weight="900" fill="var(--red)" font-family="Noto Serif TC, serif">吶喊</text><text x="0" y="50" text-anchor="middle" font-size="9" fill="var(--muted)">1923</text></g>
  </svg>`;
}

/* 6. 頁首插圖：進階（書桌：卷軸、毛筆、硯台） */
function studySVG() {
  return `<svg viewBox="0 0 220 140" class="ill head-ill" role="img" aria-hidden="true">
    <ellipse cx="110" cy="128" rx="100" ry="8" fill="var(--line)"/>
    <rect x="20" y="96" width="180" height="26" rx="6" fill="#9a5a2a"/>
    <rect x="44" y="30" width="96" height="66" rx="3" fill="#fbf6e9" stroke="#c8b48a" stroke-width="2"/>
    <rect x="36" y="26" width="10" height="74" rx="5" fill="var(--red)"/><rect x="138" y="26" width="10" height="74" rx="5" fill="var(--red)"/>
    <text x="92" y="56" text-anchor="middle" font-size="16" font-weight="900" fill="#8a7a60" font-family="Noto Serif TC, serif">${tx('科舉', 'Exams')}</text>
    <path d="M72 51 L112 51" stroke="var(--red)" stroke-width="2.5"/>
    <text x="92" y="82" text-anchor="middle" font-size="16" font-weight="900" fill="#2b1d14" font-family="Noto Serif TC, serif">${tx('新文學', 'New Lit.')}</text>
    <ellipse cx="176" cy="96" rx="18" ry="7" fill="#2b2b2b"/><ellipse cx="176" cy="94" rx="11" ry="4" fill="#111"/>
    <g class="swing" style="transform-origin:170px 40px"><rect x="166" y="22" width="8" height="58" rx="3" fill="#c8a06b"/><path d="M166 80 L174 80 L170 96Z" fill="#222"/></g>
  </svg>`;
}

/* 7. 頁首插圖：練習（茴香豆＋四種「回」） */
function beansSVG() {
  const beans = Array.from({ length: 14 }, (_, i) => { const a = i * 2.4, r = 8 + (i % 4) * 7; return `<ellipse cx="${70 + Math.cos(a) * r * 1.4}" cy="${96 + Math.sin(a) * r * 0.5}" rx="6" ry="4.5" fill="#8a6a2a" stroke="#5a4210" transform="rotate(${i * 25} ${70 + Math.cos(a) * r * 1.4} ${96 + Math.sin(a) * r * 0.5})"/>`; }).join('');
  return `<svg viewBox="0 0 230 140" class="ill head-ill" role="img" aria-hidden="true">
    <ellipse cx="70" cy="104" rx="58" ry="18" fill="#2f6f8f"/><ellipse cx="70" cy="98" rx="54" ry="15" fill="#f4efe4"/>${beans}
    ${HUI.map((h, i) => `<g transform="translate(${150 + (i % 2) * 40},${26 + Math.floor(i / 2) * 44})"><g class="tile" style="animation-delay:${i * 0.4}s"><rect x="-17" y="-17" width="34" height="34" rx="8" fill="var(--surface)" stroke="var(--red)" stroke-width="2"/><text y="8" text-anchor="middle" font-size="20" font-weight="900" fill="var(--red)" font-family="Noto Serif TC, serif">${h.c}</text></g></g>`).join('')}
    <text x="70" y="40" text-anchor="middle" font-size="26" font-weight="900" fill="var(--svgInk)" font-family="Noto Serif TC, serif">茴</text>
    <text x="70" y="60" text-anchor="middle" font-size="11" font-weight="700" fill="var(--muted)">艹 ＋ 回</text>
  </svg>`;
}

/* 8. 測驗：粉板＋考卷 */
function quizArtSVG() {
  return `<svg viewBox="0 0 260 150" class="ill qi-svg" role="img" aria-hidden="true">
    <ellipse cx="130" cy="140" rx="110" ry="7" fill="var(--line)"/>
    ${chalkBoard(20, 14, 110, 110, [tx('粉板', 'Chalkboard'), tx('孔乙己', 'Kong Yiji'), tx('欠十九錢', 'owes 19'), '— — —'])}
    <g transform="rotate(6 190 80)"><rect x="140" y="24" width="100" height="112" rx="6" fill="var(--surface)" stroke="var(--line)" stroke-width="2"/>
      ${[0, 1, 2, 3].map(i => `<rect x="152" y="${40 + i * 22}" width="12" height="12" rx="3" fill="none" stroke="var(--jade)" stroke-width="2"/><path d="M154 ${46 + i * 22} l3 4 l6 -8" stroke="var(--jade)" stroke-width="2.5" fill="none" class="chk" style="animation-delay:${i * 0.35}s"/><rect x="172" y="${43 + i * 22}" width="${56 - i * 8}" height="6" rx="3" fill="var(--line)"/>`).join('')}
    </g>
    <g transform="translate(232,20) rotate(30)"><rect x="-4" y="0" width="8" height="70" rx="3" fill="var(--red)"/><path d="M-4 70 L4 70 L0 84Z" fill="#222"/></g>
  </svg>`;
}

/* 9. 學習歷程：隨進度長大的植物（七片葉＝七步驟） */
function growthSVG(done, total) {
  total = total || 7; const h = 18 + done / total * 78, top = 120 - h;
  const leaves = Array.from({ length: total }, (_, i) => {
    const y = 116 - (i + 1) * (78 / total), side = i % 2 ? 1 : -1, on = i < done;
    return `<path d="M110 ${y} q${side * 22} -14 ${side * 34} -2 q${side * -14} 12 ${side * -34} 2Z" fill="${on ? 'var(--jade)' : 'none'}" stroke="${on ? 'var(--jade)' : 'var(--line)'}" stroke-width="2" stroke-dasharray="${on ? 0 : '3 3'}" class="${on ? 'leaf' : ''}" style="animation-delay:${i * 0.12}s"/>`;
  }).join('');
  return `<svg viewBox="0 0 220 160" class="ill head-ill" role="img" aria-label="${done}/${total}">
    ${leaves}
    <path d="M110 120 L110 ${top}" stroke="var(--jade)" stroke-width="5" stroke-linecap="round"/>
    ${done >= total ? `<g transform="translate(110,${top - 6})"><g class="bloom">${[0, 72, 144, 216, 288].map(a => `<ellipse rx="7" ry="12" cy="-10" fill="var(--gold)" transform="rotate(${a})"/>`).join('')}<circle r="7" fill="var(--red)"/></g></g>` : `<circle cx="110" cy="${top}" r="5" fill="var(--gold)"/>`}
    <path d="M78 120 L142 120 L134 152 L86 152Z" fill="var(--red)"/><rect x="72" y="114" width="76" height="10" rx="4" fill="var(--accent2)"/>
    <text x="110" y="142" text-anchor="middle" font-size="13" font-weight="900" fill="var(--onAccent)">${done} / ${total}</text>
  </svg>`;
}
