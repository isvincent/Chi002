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
