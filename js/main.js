/* ═══════════════════════════════════════════════════════════
   RAJAT & ISHIKA · 20–21 November 2026
   "The Marigold Thread"

   ┌──────────────────────────────────────────────────┐
   │  EVERYTHING YOU'LL WANT TO EDIT IS IN `SITE`     │
   │  right below. Names, dates, times, phone number. │
   └──────────────────────────────────────────────────┘
   ═══════════════════════════════════════════════════════════ */

const SITE = {
  couple:  'Rajat & Ishika',
  venue:   'Uday Residency, Rudrapur, Uttarakhand',

  /* ── THE CEREMONIES ─────────────────────────────────────
     Times are Indian Standard Time (UTC+5:30).             */
  events: {
    haldi:  { name:'Haldi',  start:'2026-11-20T11:00:00+05:30', end:'2026-11-20T15:00:00+05:30',
              blurb:'Turmeric, laughter, and the start of something forever.',
              note:'until the first tilak of turmeric' },
    sagan:  { name:'Sagan',  start:'2026-11-20T19:00:00+05:30', end:'2026-11-20T23:30:00+05:30',
              blurb:'Two families come together. Sweets exchanged, blessings shared.',
              note:'until the sagan begins' },
    shaadi: { name:'Anand Karaj', start:'2026-11-21T12:00:00+05:30', end:'2026-11-21T17:00:00+05:30',
              blurb:'Four laavan around the Guru Granth Sahib, and everyone we love in one room.',
              note:'until the Anand Karaj begins' }
  }
};

/* ═══════════════ TINY HELPERS ═══════════════ */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const SVGNS = 'http://www.w3.org/2000/svg';
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

function svg(tag, attrs) {
  const el = document.createElementNS(SVGNS, tag);
  for (const k in attrs) el.setAttribute(k, attrs[k]);
  return el;
}

let toastTimer;
function toast(msg) {
  const t = $('#toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3400);
}

/* ═══════════════ FEATURE FLAGS ═══════════════ */
/* Anything tagged data-flag="x" in the HTML shows up only when the URL asks:
     ?sagan           the Sagan ceremony
     ?photos          the gallery
     ?sagan&photos    both
     ?all             everything
   Whatever is not asked for is removed from the DOM outright, so the scroll
   thread, the colour moods, the nav and the gallery code never see it.
   Runs first, before any other block below. */
(function flags() {
  const q = new URLSearchParams(location.search);
  const on = name => q.has('all') || q.has(name);
  $$('[data-flag]').forEach(el => {
    if (on(el.dataset.flag)) el.removeAttribute('data-flag');   // CSS reveals it
    else el.remove();
  });

  // Haldi and Sagan are both the 20th. Guests who only get a plain link are
  // invited to the 21st only, so the *default* page must never mention the
  // 20th anywhere — not just skip the Haldi/Sagan sections. Everything below
  // only runs for the minority of links that carry ?haldi, ?sagan or ?all.
  const day1 = on('haldi') || on('sagan');
  document.documentElement.classList.toggle('day1', day1);
  if (!day1) return;

  document.title = 'Rajat & Ishika — 20·21 November 2026';
  const desc = $('meta[name="description"]');
  if (desc) desc.setAttribute('content',
    'Rajat & Ishika are getting married. Haldi, Sagan and the Anand Karaj — 20 to 21 November 2026 at Uday Residency, Rudrapur. Ceremonies, travel and gallery.');

  const heroNum = $('#heroDateNum');       if (heroNum) heroNum.textContent = '20 — 21';
  const inviteWhen = $('#inviteWhen');     if (inviteWhen) inviteWhen.textContent = '20 & 21 November 2026';
  const karajDay = $('#karajDayWrap');     if (karajDay) karajDay.hidden = false;
  const footerDates = $('#footerDates');   if (footerDates) footerDates.textContent = '20 — 21 November 2026';

  const vm1 = $('[data-vm="1"]');
  if (vm1) { $('.vm-label', vm1).textContent = 'From'; $('.vm-val', vm1).textContent = '20 Nov'; }
  const vm2 = $('[data-vm="2"]');
  if (vm2) { $('.vm-label', vm2).textContent = 'To';   $('.vm-val', vm2).textContent = '21 Nov'; }
})();

/* ═══════════════ CURTAIN — the invitation opens ═══════════════ */
(function curtain() {
  const c = $('#curtain');
  if (!c) return;

  // draw the mandala rays procedurally, then measure each path
  // so the stroke-dash "draw in" animation has a real length
  const rays = $('.cm-rays', c);
  if (rays) {
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2;
      const x1 = 100 + Math.cos(a) * 26, y1 = 100 + Math.sin(a) * 26;
      const x2 = 100 + Math.cos(a) * 86, y2 = 100 + Math.sin(a) * 86;
      rays.appendChild(svg('line', { x1, y1, x2, y2, 'stroke-opacity': i % 2 ? .35 : .8 }));
    }
  }
  $$('.cm-p, .cm-rays > *', c).forEach((p, i) => {
    const len = p.getTotalLength ? p.getTotalLength() : 200;
    p.style.setProperty('--len', Math.ceil(len) || 200);
    p.style.animationDelay = (i * 0.018) + 's';
  });

  const open = () => {
    c.classList.add('done');
    setTimeout(() => c.classList.add('gone'), 2600);
  };
  if (REDUCED) { c.classList.add('gone'); return; }
  // open once fonts are ready (or after a beat, whichever first)
  const go = () => setTimeout(open, 250);
  if (document.fonts && document.fonts.ready) {
    Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 1200))]).then(go);
  } else go();
})();

/* ═══════════════ HERO NAME — char by char ═══════════════ */
(function splitNames() {
  $$('.h-name').forEach(el => {
    const text = el.dataset.text || '';
    const base = parseFloat(el.dataset.delay || '0') + 1.05; // wait for the curtain
    el.textContent = '';
    [...text].forEach((c, i) => {
      const s = document.createElement('span');
      s.className = 'ch';
      s.textContent = c;
      s.style.animationDelay = (base + i * 0.075) + 's';
      el.appendChild(s);
    });
  });
})();

/* ═══════════════ MANDALA behind the hero ═══════════════ */
(function mandala() {
  const g = $('#mandalaG');
  if (!g) return;
  const C = 300;

  // lotus petal, drawn as two mirrored arcs meeting at the tip
  const petal = (angle, r0, r1, w) => {
    const a = angle, cos = Math.cos(a), sin = Math.sin(a);
    const px = C + cos * r0, py = C + sin * r0;
    const tx = C + cos * r1, ty = C + sin * r1;
    const nx = -sin * w, ny = cos * w;
    const mid = (r0 + r1) / 2;
    const c1x = C + cos * mid + nx, c1y = C + sin * mid + ny;
    const c2x = C + cos * mid - nx, c2y = C + sin * mid - ny;
    return `M${px.toFixed(1)} ${py.toFixed(1)} Q${c1x.toFixed(1)} ${c1y.toFixed(1)} ${tx.toFixed(1)} ${ty.toFixed(1)} Q${c2x.toFixed(1)} ${c2y.toFixed(1)} ${px.toFixed(1)} ${py.toFixed(1)}Z`;
  };

  const rings = [
    { n: 12, r0: 40,  r1: 86,  w: 15, op: .95 },
    { n: 18, r0: 92,  r1: 140, w: 13, op: .7  },
    { n: 24, r0: 146, r1: 196, w: 12, op: .55 },
    { n: 36, r0: 202, r1: 246, w: 9,  op: .42 },
    { n: 48, r0: 252, r1: 288, w: 7,  op: .3  }
  ];

  rings.forEach((ring, ri) => {
    const grp = svg('g', { fill: 'none', stroke: 'currentColor', 'stroke-width': 0.9, 'stroke-opacity': ring.op });
    for (let i = 0; i < ring.n; i++) {
      const a = (i / ring.n) * Math.PI * 2 + (ri % 2 ? Math.PI / ring.n : 0);
      grp.appendChild(svg('path', { d: petal(a, ring.r0, ring.r1, ring.w) }));
    }
    g.appendChild(grp);
  });

  [44, 90, 144, 200, 250, 292].forEach((r, i) => {
    g.appendChild(svg('circle', {
      cx: C, cy: C, r, fill: 'none', stroke: 'currentColor',
      'stroke-width': i % 2 ? 0.5 : 0.9, 'stroke-opacity': .5
    }));
  });
})();

/* ═══════════════ TORAN — marigold garland across the top ═══════════════ */
(function toran() {
  const el = $('.toran');
  const s = $('#toranSvg');
  if (!el || !s) return;

  const MARIGOLD = ['#F2790C', '#FF9E1B', '#F5C542', '#E8630A', '#FFB43D'];
  const LEAF = '#4E7A3A';

  const flower = (x, y, r, color, petals = 8) => {
    const g = svg('g', { transform: `translate(${x.toFixed(1)} ${y.toFixed(1)})` });
    for (let i = 0; i < petals; i++) {
      g.appendChild(svg('ellipse', {
        cx: 0, cy: -r * .52, rx: r * .42, ry: r * .58,
        fill: color, 'fill-opacity': .92,
        transform: `rotate(${((i / petals) * 360).toFixed(1)})`
      }));
    }
    g.appendChild(svg('circle', { cx: 0, cy: 0, r: r * .34, fill: '#7A3B00', 'fill-opacity': .5 }));
    return g;
  };

  /* Drawn in real pixels against the element's own box, so the flowers
     stay round at every viewport width instead of being stretched. */
  function build() {
    const W = Math.max(320, el.clientWidth);
    const H = Math.max(70, el.clientHeight);
    s.setAttribute('viewBox', `0 0 ${W} ${H}`);
    s.setAttribute('preserveAspectRatio', 'none');
    s.textContent = '';

    const y0 = H * .06;
    const sag = H * .40;                   // how far the middle droops
    const ctrl = y0 + sag * 2;             // quadratic control point
    const at = t => ({
      x: 2 * (1 - t) * t * (W / 2) + t * t * W,
      y: (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * ctrl + t * t * y0
    });

    s.appendChild(svg('path', {
      d: `M0 ${y0.toFixed(1)} Q${W / 2} ${ctrl.toFixed(1)} ${W} ${y0.toFixed(1)}`,
      fill: 'none', stroke: '#C9A227', 'stroke-width': 1.4, 'stroke-opacity': .55
    }));

    const size = W < 640 ? 6.5 : 9;                       // smaller blooms on phones
    const half = Math.max(9, Math.round(W / 52));         // and fewer of them
    const N = half * 2;                                   // even, so one bloom sits dead centre
    for (let i = 0; i <= N; i++) {
      const p = at(i / N);
      const d = Math.abs(i - half);                       // rings out from the middle
      s.appendChild(flower(p.x, p.y, size + (d % 3) * (size * .18), MARIGOLD[d % MARIGOLD.length]));

      // strands mirror outwards from the centre bloom, so the garland hangs even
      if (d % 6 === 0) {
        const g = svg('g', { transform: `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})` });
        const drop = H * .30;
        g.appendChild(svg('path', {
          d: `M0 ${(size * .5).toFixed(1)} L0 ${drop.toFixed(1)}`,
          stroke: '#C9A227', 'stroke-width': 1, 'stroke-opacity': .5, fill: 'none'
        }));
        g.appendChild(svg('ellipse', {
          cx: 0, cy: drop * .68, rx: size * .5, ry: drop * .36, fill: LEAF, 'fill-opacity': .55
        }));
        g.appendChild(flower(0, drop + size * .7, size * .74, MARIGOLD[(d + 2) % MARIGOLD.length], 6));
        s.appendChild(g);
      }
    }
  }

  build();
  let t;
  addEventListener('resize', () => { clearTimeout(t); t = setTimeout(build, 200); });
})();

/* ═══════════════ WAX SEAL on the invitation ═══════════════ */
(function seal() {
  const g = $('#sealG');
  if (!g) return;
  const ring = svg('circle', { cx: 30, cy: 30, r: 27, fill: 'currentColor', 'fill-opacity': .1, stroke: 'currentColor', 'stroke-width': 1 });
  g.appendChild(ring);
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    g.appendChild(svg('ellipse', {
      cx: 30 + Math.cos(a) * 27, cy: 30 + Math.sin(a) * 27,
      rx: 4.6, ry: 3, fill: 'currentColor', 'fill-opacity': .5,
      transform: `rotate(${(a * 180 / Math.PI).toFixed(1)} ${(30 + Math.cos(a) * 27).toFixed(2)} ${(30 + Math.sin(a) * 27).toFixed(2)})`
    }));
  }
  g.appendChild(svg('circle', { cx: 30, cy: 30, r: 21, fill: 'none', stroke: 'currentColor', 'stroke-width': .6, 'stroke-opacity': .6 }));
})();

/* ═══════════════ FLUID GRADIENT BACKGROUND ═══════════════ */
(function fluid() {
  const cv = $('#fluid');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  let W, H, t = 0;
  const mouse = { x: .5, y: .5, tx: .5, ty: .5 };
  const mood = { current: 0, target: 0 };

  // one palette per ceremony — the page changes temperature as you scroll
  const MOODS = [
    [ // Haldi — turmeric, marigold, saffron
      { c: [255, 165,  0], r: .55 }, { c: [255, 110,  0], r: .48 },
      { c: [255, 210, 60], r: .42 }, { c: [230, 120, 20], r: .38 },
      { c: [255, 190, 80], r: .44 }
    ],
    [ // Sagan — crimson, rani pink, deep rose
      { c: [192,  20, 60], r: .55 }, { c: [224,  25,127], r: .48 },
      { c: [170,  20, 70], r: .42 }, { c: [255,  60, 80], r: .38 },
      { c: [200,  80,110], r: .44 }
    ],
    [ // Shaadi — gold, crimson, marigold
      { c: [201, 162, 39], r: .55 }, { c: [192,  20, 60], r: .48 },
      { c: [255, 160,  0], r: .42 }, { c: [170, 120, 15], r: .38 },
      { c: [224,  25,127], r: .44 }
    ]
  ];

  const blobs = [
    { x: .2, y: .3, vx:  .0003, vy:  .0002 },
    { x: .8, y: .6, vx: -.0002, vy: -.0003 },
    { x: .5, y: .5, vx:  .0001, vy:  .0002 },
    { x: .3, y: .8, vx:  .0002, vy: -.0001 },
    { x: .7, y: .2, vx: -.0001, vy:  .0002 }
  ];

  function resize() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = cv.width = innerWidth * dpr;
    H = cv.height = innerHeight * dpr;
    cv.style.width = innerWidth + 'px';
    cv.style.height = innerHeight + 'px';
  }
  resize();
  addEventListener('resize', resize);

  if (!REDUCED) {
    addEventListener('mousemove', e => {
      mouse.tx = e.clientX / innerWidth;
      mouse.ty = e.clientY / innerHeight;
    }, { passive: true });
  }

  const mix = (a, b, k) => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];

  function draw() {
    t += .005;
    mouse.x += (mouse.tx - mouse.x) * .04;
    mouse.y += (mouse.ty - mouse.y) * .04;
    mood.current += (mood.target - mood.current) * .02;

    ctx.fillStyle = '#FBF4E6';
    ctx.fillRect(0, 0, W, H);

    const m0 = Math.floor(mood.current);
    const m1 = Math.min(m0 + 1, MOODS.length - 1);
    const mt = mood.current - m0;

    blobs.forEach((b, i) => {
      b.x += b.vx + Math.sin(t * .7 + i) * .0002;
      b.y += b.vy + Math.cos(t * .5 + i * 1.3) * .0002;
      if (b.x < .05 || b.x > .95) b.vx *= -1;
      if (b.y < .05 || b.y > .95) b.vy *= -1;
      b.x += (mouse.x - b.x) * .0008;
      b.y += (mouse.y - b.y) * .0008;

      const col = mix(MOODS[m0][i].c, MOODS[m1][i].c, mt);
      const rBase = MOODS[m0][i].r + (MOODS[m1][i].r - MOODS[m0][i].r) * mt;
      const r = (rBase + Math.sin(t * 1.3 + i * 2) * .05) * W;
      const cx = b.x * W, cy = b.y * H;
      const rgb = `${col[0] | 0},${col[1] | 0},${col[2] | 0}`;

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      grad.addColorStop(0,  `rgba(${rgb},.22)`);
      grad.addColorStop(.3, `rgba(${rgb},.12)`);
      grad.addColorStop(.6, `rgba(${rgb},.04)`);
      grad.addColorStop(1,  `rgba(${rgb},0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    });

    // warm vignette
    const vg = ctx.createRadialGradient(W / 2, H / 2, W * .25, W / 2, H / 2, W * .9);
    vg.addColorStop(0,  'rgba(251,244,230,0)');
    vg.addColorStop(.7, 'rgba(230,200,160,.06)');
    vg.addColorStop(1,  'rgba(200,150,80,.14)');
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, W, H);

    if (!REDUCED) requestAnimationFrame(draw);
  }
  draw();

  // scroll changes the mood
  const obs = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) mood.target = +e.target.dataset.mood; });
  }, { threshold: .4 });
  $$('[data-mood]').forEach(el => obs.observe(el));
})();

/* ═══════════════ COUNTDOWN ═══════════════ */
(function countdown() {
  const root = $('#countdown');
  if (!root) return;

  // whichever flagged-in ceremony comes first chronologically drives the
  // countdown — Anand Karaj by default, or Haldi/Sagan when their flag is on
  const visible = $$('[data-event]')
    .map(el => el.dataset.event)
    .filter(k => SITE.events[k])
    .sort((a, b) => new Date(SITE.events[a].start) - new Date(SITE.events[b].start));
  const key = visible[0] || 'shaadi';
  const target = new Date(SITE.events[key].start).getTime();

  const cells = {
    days:  $('[data-cd="days"]',  root),
    hours: $('[data-cd="hours"]', root),
    mins:  $('[data-cd="mins"]',  root),
    secs:  $('[data-cd="secs"]',  root)
  };
  const note = $('#cdNote');
  if (note) note.textContent = SITE.events[key].note;
  const last = {};

  function set(key, val) {
    const el = cells[key];
    if (!el) return;
    const str = String(val).padStart(2, '0');
    if (last[key] === str) return;
    last[key] = str;
    el.textContent = str;
    if (!REDUCED) {
      el.classList.remove('tick');
      void el.offsetWidth;      // restart the animation
      el.classList.add('tick');
    }
  }

  function render() {
    let d = target - Date.now();
    if (d <= 0) {
      // the wedding is happening (or has happened)
      const over = Date.now() - new Date(SITE.events.shaadi.end).getTime();
      Object.keys(cells).forEach(k => { last[k] = null; set(k, 0); });
      if (note) note.textContent = over > 0
        ? 'Married. Thank you for being there.'
        : 'It’s happening — right now.';
      return;
    }
    const s = Math.floor(d / 1000);
    set('days',  Math.floor(s / 86400));
    set('hours', Math.floor(s % 86400 / 3600));
    set('mins',  Math.floor(s % 3600 / 60));
    set('secs',  s % 60);
  }
  render();
  setInterval(render, 1000);
})();

/* ═══════════════ THE THREAD — draws down the page ═══════════════ */
(function thread() {
  const path = $('#thread-draw');
  const rail = $('#thread');
  if (!path || !rail) return;

  const sections = $$('[data-thread]');
  const len = path.getTotalLength();
  path.style.strokeDasharray = len;
  path.style.strokeDashoffset = len;

  // one knot per named section, spaced evenly down the rail.
  // They live in a box that matches #thread, so a % here always lines up
  // with the drawn path — including on phones, where the two differ in width.
  const holder = document.createElement('div');
  holder.id = 'thread-knots';
  holder.setAttribute('aria-hidden', 'true');
  rail.insertAdjacentElement('afterend', holder);

  const knots = sections.map((sec, i) => {
    const k = document.createElement('div');
    k.className = 'thread-knot';
    k.style.top = ((i + .5) / sections.length * 100) + '%';
    k.innerHTML = `<span class="tk-dot"></span><span class="tk-lab"></span>`;
    $('.tk-lab', k).textContent = sec.dataset.thread;
    holder.appendChild(k);
    return { el: k, sec };
  });

  let active = -1;
  function update() {
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? clamp(scrollY / max, 0, 1) : 0;
    path.style.strokeDashoffset = len * (1 - p);

    // whichever named section owns the middle of the viewport wins
    const mid = innerHeight / 2;
    let best = -1, bestDist = Infinity;
    knots.forEach((k, i) => {
      const r = k.sec.getBoundingClientRect();
      if (r.top > innerHeight || r.bottom < 0) return;
      const dist = Math.abs((r.top + r.height / 2) - mid);
      if (dist < bestDist) { bestDist = dist; best = i; }
    });
    if (best !== active) {
      knots.forEach((k, i) => k.el.classList.toggle('on', i <= best));
      active = best;
    }
  }
  update();
  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
})();

/* ═══════════════ PROGRESS BAR ═══════════════ */
addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  const pb = $('#PB');
  if (pb) pb.style.transform = `scaleX(${max > 0 ? clamp(scrollY / max, 0, 1) : 0})`;
}, { passive: true });

/* ═══════════════ NAV — sticky state, active link, mobile ═══════════════ */
(function nav() {
  const bar = $('#NAV');
  const toggle = $('#navToggle');
  if (!bar) return;

  addEventListener('scroll', () => {
    bar.classList.toggle('stuck', scrollY > 40);
  }, { passive: true });

  if (toggle) {
    toggle.addEventListener('click', () => {
      const open = bar.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    $$('.nlinks a', bar).forEach(a => a.addEventListener('click', () => {
      bar.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // highlight the section you're looking at
  const links = $$('.nlinks a');
  const map = new Map();
  links.forEach(a => {
    const sec = $(a.getAttribute('href'));
    if (sec) map.set(sec, a);
  });
  const obs = new IntersectionObserver(es => {
    es.forEach(e => {
      const a = map.get(e.target);
      if (a && e.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        a.classList.add('active');
      }
    });
  }, { threshold: .3 });
  map.forEach((_, sec) => obs.observe(sec));
})();

/* ═══════════════ REVEAL ON SCROLL ═══════════════ */
(function reveal() {
  const ro = new IntersectionObserver(es => {
    es.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('on');
      ro.unobserve(e.target);
    });
  }, { threshold: .08, rootMargin: '0px 0px -8% 0px' });
  $$('.rv').forEach(el => ro.observe(el));

  // the footer knot ties itself once it comes into view
  const knot = $('.knot');
  if (knot) {
    const p = $('#knotPath');
    if (p) {
      const l = Math.ceil(p.getTotalLength());
      knot.style.setProperty('--klen', l);
    }
    new IntersectionObserver((es, o) => {
      es.forEach(e => { if (e.isIntersecting) { knot.classList.add('on'); o.disconnect(); } });
    }, { threshold: .5 }).observe(knot);
  }
})();

/* ═══════════════ HERO PARALLAX ═══════════════ */
(function heroParallax() {
  if (REDUCED) return;
  const stage = $('.hero-stage');
  const toranEl = $('.toran');
  const fl = $('.h-floor-l'), fr = $('.h-floor-r'), sc = $('.h-scroll');
  if (!stage) return;
  let raf = 0;
  addEventListener('scroll', () => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      const y = scrollY;
      if (y > innerHeight * 1.2) return;
      const p = y / innerHeight;
      stage.style.transform = `translateY(${y * .34}px)`;
      stage.style.opacity = Math.max(0, 1 - p * 1.35);
      if (toranEl) toranEl.style.transform = `translateY(${-y * .55}px)`;
      [fl, fr, sc].forEach(el => {
        if (!el) return;
        el.style.opacity = Math.max(0, 1 - p * 2.2);
      });
    });
  }, { passive: true });
})();

/* ═══════════════ MAGNETIC BUTTONS ═══════════════ */
if (!REDUCED && matchMedia('(hover:hover)').matches) {
  $$('.h-cta').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * .18}px,${y * .28}px) scale(1.04)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
}

/* ═══════════════ INVITATION CARD — the flap opens ═══════════════ */
(function invite() {
  const card = $('#inviteCard');
  const flap = $('.ic-flap', card || document);
  if (!card || !flap) return;

  let opened = false;
  function open() {
    if (opened) return;
    opened = true;
    card.classList.add('open');
  }
  flap.addEventListener('click', open);
  flap.setAttribute('role', 'button');
  flap.setAttribute('tabindex', '0');
  flap.removeAttribute('aria-hidden');
  flap.setAttribute('aria-label', 'Open the invitation');
  flap.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
  });

  // if you scroll past it without tapping, it opens on its own
  new IntersectionObserver((es, o) => {
    es.forEach(e => {
      if (e.isIntersecting) {
        setTimeout(() => { if (!opened) open(); }, 1400);
        o.disconnect();
      }
    });
  }, { threshold: .55 }).observe(card);
  if (REDUCED) open();
})();

/* ═══════════════ STORY — big numerals follow the cursor ═══════════════ */
if (!REDUCED && matchMedia('(hover:hover)').matches) {
  $$('.story-bignum').forEach(num => {
    const sec = num.closest('.story-section');
    if (!sec) return;
    sec.addEventListener('mousemove', e => {
      const r = sec.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      num.style.transition = 'transform .5s cubic-bezier(.23,1,.32,1)';
      num.style.transform = `translate(${x * 26}px,${y * 16}px)`;
    });
    sec.addEventListener('mouseleave', () => { num.style.transform = ''; });
  });
}

/* ═══════════════ GALLERY — parallax, tilt, lightbox ═══════════════ */
(function gallery() {
  const grid = $('#GG');
  if (!grid) return;
  const tiles = $$('.gi', grid);

  const count = $('#gCount');
  if (count) count.textContent = String(tiles.length).padStart(2, '0');

  /* gentle parallax inside each frame, only while it's on screen */
  if (!REDUCED) {
    let visible = new Set();
    const vis = new IntersectionObserver(es => {
      es.forEach(e => e.isIntersecting ? visible.add(e.target) : visible.delete(e.target));
    });
    tiles.forEach(t => vis.observe(t));

    let raf = 0;
    const shift = () => {
      raf = 0;
      visible.forEach(t => {
        const r = t.getBoundingClientRect();
        const p = (r.top + r.height / 2) / innerHeight;
        const inner = t.querySelector('img, .gph');
        if (inner) inner.style.transform = `translateY(${(p - .5) * 26}px) scale(1.08)`;
      });
    };
    addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(shift); }, { passive: true });
    shift();
  }

  /* 3D tilt on hover */
  if (!REDUCED && matchMedia('(hover:hover)').matches) {
    tiles.forEach(t => {
      t.addEventListener('mousemove', e => {
        const r = t.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        t.style.transform = `perspective(1200px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateZ(16px)`;
      });
      t.addEventListener('mouseleave', () => { t.style.transform = ''; });
    });
  }

  /* ── lightbox ── */
  const LB = $('#LB'), LBi = $('#LBi'), LBph = $('#LBph'), LBc = $('#LBc');
  const LBt = $('#LB-info-title'), LBm = $('#LB-info-meta');
  let idx = 0, lastFocus = null;

  function show(i) {
    idx = (i + tiles.length) % tiles.length;
    const t = tiles[idx];
    const img = t.querySelector('img');
    const title = t.querySelector('.gi-caption-title');
    const meta  = t.querySelector('.gi-caption-meta');

    if (img) {
      LBi.src = img.currentSrc || img.src;
      LBi.alt = img.alt || (title ? title.textContent : '');
      LBi.style.display = '';
      LBph.classList.remove('show');
    } else {
      // no photo dropped in yet — show the placeholder card instead
      LBi.style.display = 'none';
      LBi.removeAttribute('src');
      LBph.classList.add('show');
      LBph.textContent = 'This photograph is still being taken.';
    }
    LBt.textContent = title ? title.textContent : `Photo ${idx + 1}`;
    LBm.textContent = meta ? meta.textContent : '';
    LBc.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(tiles.length).padStart(2, '0')}`;
  }

  function open(i) {
    lastFocus = document.activeElement;
    show(i);
    LB.classList.add('open');
    document.body.style.overflow = 'hidden';
    $('#LBx').focus();
  }
  function close() {
    LB.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  tiles.forEach((t, i) => {
    t.setAttribute('role', 'button');
    t.setAttribute('tabindex', '0');
    t.addEventListener('click', () => open(i));
    t.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
    });
  });

  $('#LBx').addEventListener('click', close);
  $('#LBp').addEventListener('click', () => show(idx - 1));
  $('#LBn').addEventListener('click', () => show(idx + 1));
  LB.addEventListener('click', e => { if (e.target === LB) close(); });

  addEventListener('keydown', e => {
    if (!LB.classList.contains('open')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });

  /* swipe on touch */
  let sx = 0, sy = 0;
  LB.addEventListener('touchstart', e => {
    sx = e.touches[0].clientX; sy = e.touches[0].clientY;
  }, { passive: true });
  LB.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - sx;
    const dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) show(idx + (dx < 0 ? 1 : -1));
  }, { passive: true });
})();

/* ═══════════════ ADD TO CALENDAR (.ics) ═══════════════ */
(function calendar() {
  const stamp = d => new Date(d).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

  function vevent(key, ev) {
    return [
      'BEGIN:VEVENT',
      `UID:${key}-rajat-ishika-2026@rajatwedsishika.life`,
      `DTSTAMP:${stamp(Date.now())}`,
      `DTSTART:${stamp(ev.start)}`,
      `DTEND:${stamp(ev.end)}`,
      `SUMMARY:${ev.name} — ${SITE.couple}`,
      `DESCRIPTION:${ev.blurb}`,
      `LOCATION:${SITE.venue}`,
      'END:VEVENT'
    ].join('\r\n');
  }

  function build(which) {
    // "all" means the ceremonies actually on the page — a flagged-off one
    // should not turn up in the calendar file either
    let keys;
    if (which === 'all') {
      keys = $$('[data-event]').map(el => el.dataset.event).filter(k => SITE.events[k]);
      if (!keys.length) keys = Object.keys(SITE.events);
    } else {
      keys = [which];
    }
    const body = keys.filter(k => SITE.events[k]).map(k => vevent(k, SITE.events[k]));
    if (!body.length) return null;
    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//rajatwedsishika.life//Wedding//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      ...body,
      'END:VCALENDAR'
    ].join('\r\n');
  }

  $$('[data-ics]').forEach(btn => {
    btn.addEventListener('click', () => {
      const which = btn.dataset.ics;
      const ics = build(which);
      if (!ics) return;
      const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = which === 'all' ? 'rajat-ishika-wedding.ics' : `rajat-ishika-${which}.ics`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
      toast(which === 'all'
        ? 'All three ceremonies saved to your calendar.'
        : `${SITE.events[which].name} saved to your calendar.`);
    });
  });
})();

/* clipboard, with a fallback for older browsers */
function copy(text) {
  if (navigator.clipboard && isSecureContext) {
    return navigator.clipboard.writeText(text).then(() => true, () => false);
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return Promise.resolve(ok);
  } catch { return Promise.resolve(false); }
}

/* ═══════════════ SHARE ═══════════════ */
(function share() {
  const btn = $('#shareBtn');
  if (!btn) return;
  const data = {
    title: `${SITE.couple} — 20–21 November 2026`,
    text:  `${SITE.couple} are getting married! Join us on 20–21 November 2026 at ${SITE.venue}.`,
    url:   location.href.split('#')[0]
  };
  btn.addEventListener('click', () => {
    if (navigator.share) {
      navigator.share(data).catch(() => {});
    } else {
      copy(`${data.text}\n${data.url}`).then(ok =>
        toast(ok ? 'Invite link copied — go on, forward it.' : data.url));
    }
  });
})();
