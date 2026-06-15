/* ═════════════════════════════
   SPLIT TEXT — char-by-char hero name reveal
═════════════════════════════ */
(function(){
  document.querySelectorAll('.h-name').forEach(el=>{
    const text=el.dataset.text;
    const baseDelay=parseFloat(el.dataset.delay||'0');
    el.innerHTML='';
    [...text].forEach((c,i)=>{
      const s=document.createElement('span');
      s.className='ch';
      s.textContent=c;
      s.style.animationDelay=(baseDelay+i*0.08)+'s';
      el.appendChild(s);
    });
  });
})();

/* ═════════════════════════════
   GLOBAL FLUID GRADIENT
   - 6 blobs floating
   - mouse influence
   - mood shifts based on scroll section
═════════════════════════════ */
(function(){
  const cv=document.getElementById('fluid'),ctx=cv.getContext('2d');
  let W,H,t=0;
  let mouse={x:.5,y:.5,tx:.5,ty:.5};
  let mood={current:0,target:0};

  // 3 moods — each a different color story
  const MOODS=[
    // hero — peach/pink/gold (warm sunset)
    [
      {color:[255,229,160],r:.5},  // gold
      {color:[255,158,125],r:.45}, // peach
      {color:[255,126,179],r:.4},  // pink
      {color:[200,100,220],r:.35}, // purple
      {color:[255,170,140],r:.4},  // coral
    ],
    // sagan — deep pink/purple (evening)
    [
      {color:[255,126,179],r:.5},
      {color:[200,100,220],r:.45},
      {color:[140,80,200],r:.4},
      {color:[255,158,125],r:.35},
      {color:[180,90,180],r:.4},
    ],
    // shaadi — gold/rose (wedding)
    [
      {color:[255,229,160],r:.5},
      {color:[255,200,140],r:.45},
      {color:[255,158,125],r:.4},
      {color:[230,180,100],r:.35},
      {color:[255,126,179],r:.4},
    ],
  ];

  let blobs=[
    {x:.2,y:.3,vx:.0003,vy:.0002},
    {x:.8,y:.6,vx:-.0002,vy:-.0003},
    {x:.5,y:.5,vx:.0001,vy:.0002},
    {x:.3,y:.8,vx:.0002,vy:-.0001},
    {x:.7,y:.2,vx:-.0001,vy:.0002},
  ];

  function resize(){
    const dpr=Math.min(window.devicePixelRatio||1,2);
    W=cv.width=innerWidth*dpr;H=cv.height=innerHeight*dpr;
    cv.style.width=innerWidth+'px';cv.style.height=innerHeight+'px';
  }
  resize();window.addEventListener('resize',resize);

  document.addEventListener('mousemove',e=>{mouse.tx=e.clientX/innerWidth;mouse.ty=e.clientY/innerHeight;},{passive:true});

  function lerpColor(a,b,t){return[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t]}

  function draw(){
    t+=.005;
    mouse.x+=(mouse.tx-mouse.x)*.04;
    mouse.y+=(mouse.ty-mouse.y)*.04;
    mood.current+=(mood.target-mood.current)*.02;

    ctx.fillStyle='#000';
    ctx.fillRect(0,0,W,H);

    ctx.globalCompositeOperation='lighter';

    const m0=Math.floor(mood.current);
    const m1=Math.min(m0+1,MOODS.length-1);
    const mt=mood.current-m0;

    blobs.forEach((b,i)=>{
      b.x+=b.vx+Math.sin(t*.7+i)*.0002;
      b.y+=b.vy+Math.cos(t*.5+i*1.3)*.0002;
      if(b.x<.05||b.x>.95)b.vx*=-1;
      if(b.y<.05||b.y>.95)b.vy*=-1;
      const mdx=(mouse.x-b.x)*.0008;
      const mdy=(mouse.y-b.y)*.0008;
      b.x+=mdx;b.y+=mdy;

      const conf0=MOODS[m0][i],conf1=MOODS[m1][i];
      const color=lerpColor(conf0.color,conf1.color,mt);
      const rBase=conf0.r+(conf1.r-conf0.r)*mt;
      const r=(rBase+Math.sin(t*1.3+i*2)*.05)*W;

      const cx=b.x*W,cy=b.y*H;
      const grad=ctx.createRadialGradient(cx,cy,0,cx,cy,r);
      grad.addColorStop(0,`rgba(${color[0]|0},${color[1]|0},${color[2]|0},.35)`);
      grad.addColorStop(.3,`rgba(${color[0]|0},${color[1]|0},${color[2]|0},.18)`);
      grad.addColorStop(.6,`rgba(${color[0]|0},${color[1]|0},${color[2]|0},.06)`);
      grad.addColorStop(1,`rgba(${color[0]|0},${color[1]|0},${color[2]|0},0)`);

      ctx.fillStyle=grad;
      ctx.beginPath();
      ctx.arc(cx,cy,r,0,Math.PI*2);
      ctx.fill();
    });

    ctx.globalCompositeOperation='source-over';

    // vignette
    const vg=ctx.createRadialGradient(W/2,H/2,W*.3,W/2,H/2,W*.9);
    vg.addColorStop(0,'rgba(0,0,0,0)');
    vg.addColorStop(1,'rgba(0,0,0,.7)');
    ctx.fillStyle=vg;
    ctx.fillRect(0,0,W,H);

    requestAnimationFrame(draw);
  }
  draw();

  /* ═══ SCROLL → MOOD SHIFT ═══ */
  const sections=document.querySelectorAll('[data-blob-mood]');
  const moodObs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const newMood=parseInt(e.target.dataset.blobMood);
        mood.target=newMood;
      }
    });
  },{threshold:.5});
  sections.forEach(s=>moodObs.observe(s));

  // hero defaults to mood 0
})();

/* PROGRESS */
window.addEventListener('scroll',()=>{
  document.getElementById('PB').style.transform=`scaleX(${scrollY/(document.body.scrollHeight-innerHeight)})`;
},{passive:true});

/* ═════════════════════════════
   SHOOTING STARS
   Occasional gold meteor streaks across the hero
═════════════════════════════ */
(function(){
  const cv=document.createElement('canvas');
  cv.id='stars';
  cv.style.cssText='position:fixed;inset:0;z-index:1;pointer-events:none;mix-blend-mode:screen';
  document.body.appendChild(cv);
  const ctx=cv.getContext('2d');
  let W,H;
  function resize(){
    const dpr=Math.min(devicePixelRatio||1,2);
    W=cv.width=innerWidth*dpr;H=cv.height=innerHeight*dpr;
    cv.style.width=innerWidth+'px';cv.style.height=innerHeight+'px';
  }
  resize();window.addEventListener('resize',resize);

  let meteors=[];
  function spawn(){
    const fromLeft=Math.random()>.5;
    const angle=fromLeft?(Math.PI*.18):(Math.PI*.82);  // ~30deg from horizontal
    const speed=8+Math.random()*4;
    meteors.push({
      x:fromLeft?-100:W+100,
      y:Math.random()*H*.5,
      vx:Math.cos(angle)*speed*(fromLeft?1:-1),
      vy:Math.sin(angle)*speed,
      life:1,
      decay:.008+Math.random()*.005,
      tail:[],
      hue:Math.random()<.5?'255,229,160':Math.random()<.5?'255,158,125':'255,200,180',
    });
  }

  let lastSpawn=0;
  function tick(t){
    ctx.clearRect(0,0,W,H);
    if(t-lastSpawn>3500+Math.random()*4000){spawn();lastSpawn=t;}

    meteors=meteors.filter(m=>{
      m.x+=m.vx;m.y+=m.vy;m.life-=m.decay;
      m.tail.unshift({x:m.x,y:m.y});
      if(m.tail.length>22)m.tail.pop();

      if(m.life<=0||m.x<-200||m.x>W+200||m.y>H+200)return false;

      // tail
      for(let i=0;i<m.tail.length;i++){
        const p=m.tail[i];
        const o=(1-i/m.tail.length)*m.life*.7;
        const sz=(1-i/m.tail.length)*3+.5;
        ctx.beginPath();
        ctx.arc(p.x,p.y,sz,0,Math.PI*2);
        ctx.fillStyle=`rgba(${m.hue},${o})`;
        ctx.fill();
      }
      // head glow
      const glow=ctx.createRadialGradient(m.x,m.y,0,m.x,m.y,30);
      glow.addColorStop(0,`rgba(${m.hue},${m.life*.8})`);
      glow.addColorStop(1,`rgba(${m.hue},0)`);
      ctx.fillStyle=glow;
      ctx.beginPath();
      ctx.arc(m.x,m.y,30,0,Math.PI*2);
      ctx.fill();

      return true;
    });

    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();

/* ═════════════════════════════
   SCROLL PARALLAX on hero text
   names drift up + fade as you scroll past
═════════════════════════════ */
(function(){
  const stage=document.querySelector('.hero-stage');
  const tag=document.querySelector('.h-tag');
  const floorL=document.querySelector('.h-floor-l');
  const floorR=document.querySelector('.h-floor-r');
  if(!stage)return;
  window.addEventListener('scroll',()=>{
    const y=scrollY;
    if(y>innerHeight)return;
    const p=y/innerHeight;
    stage.style.transform=`translateY(${y*.4}px)`;
    stage.style.opacity=Math.max(0,1-p*1.4);
    if(tag){tag.style.transform=`translateX(-50%) translateY(${-y*.2}px)`;tag.style.opacity=Math.max(0,1-p*2);}
    if(floorL){floorL.style.transform=`translateY(${y*.15}px)`;floorL.style.opacity=Math.max(0,1-p*1.5);}
    if(floorR){floorR.style.transform=`translateY(${y*.15}px)`;floorR.style.opacity=Math.max(0,1-p*1.5);}
  },{passive:true});
})();

/* ═════════════════════════════
   MAGNETIC BUTTONS — attract to cursor
═════════════════════════════ */
document.querySelectorAll('.h-cta').forEach(btn=>{
  btn.addEventListener('mousemove',e=>{
    const r=btn.getBoundingClientRect();
    const x=e.clientX-r.left-r.width/2;
    const y=e.clientY-r.top-r.height/2;
    btn.style.transform=`translate(${x*.25}px,${y*.35}px) scale(1.05)`;
  });
  btn.addEventListener('mouseleave',()=>{btn.style.transform='';});
});

/* ═════════════════════════════
   PETAL BURST on click anywhere
   Click and a small handful of marigold petals
   blooms from the click point, falls with physics
═════════════════════════════ */
(function(){
  const cv=document.createElement('canvas');
  cv.id='petals';
  cv.style.cssText='position:fixed;inset:0;z-index:9996;pointer-events:none';
  document.body.appendChild(cv);
  const ctx=cv.getContext('2d');
  let W,H;
  function resize(){
    const dpr=Math.min(devicePixelRatio||1,2);
    W=cv.width=innerWidth*dpr;H=cv.height=innerHeight*dpr;
    cv.style.width=innerWidth+'px';cv.style.height=innerHeight+'px';
  }
  resize();window.addEventListener('resize',resize);

  let petals=[];
  const COLORS=['#ffb347','#ff8c42','#ffa07a','#ff7eb3','#ffd700','#e8c87a','#ffbb6c'];

  function burst(x,y,count=14){
    const dpr=Math.min(devicePixelRatio||1,2);
    x*=dpr;y*=dpr;
    for(let i=0;i<count;i++){
      const angle=Math.random()*Math.PI*2;
      const speed=2+Math.random()*5;
      petals.push({
        x,y,
        vx:Math.cos(angle)*speed,
        vy:Math.sin(angle)*speed-3,
        rot:Math.random()*Math.PI*2,
        vrot:(Math.random()-.5)*.2,
        r:6+Math.random()*8,
        color:COLORS[Math.floor(Math.random()*COLORS.length)],
        life:1,
        decay:.008+Math.random()*.005,
        gravity:.15,
      });
    }
  }

  document.addEventListener('click',e=>{
    // skip clicks on lightbox controls, links inside gallery items
    if(e.target.closest('.lbb,#LB,.gi,.h-cta'))return;
    burst(e.clientX,e.clientY);
  },{passive:true});

  function tick(){
    ctx.clearRect(0,0,W,H);
    petals=petals.filter(p=>{
      p.vy+=p.gravity;
      p.vx*=.99;
      p.x+=p.vx;p.y+=p.vy;
      p.rot+=p.vrot;
      p.life-=p.decay;
      if(p.life<=0||p.y>H+40)return false;

      ctx.save();
      ctx.translate(p.x,p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha=p.life;
      ctx.fillStyle=p.color;
      ctx.beginPath();
      ctx.ellipse(0,0,p.r*.7,p.r,0,0,Math.PI*2);
      ctx.fill();
      // inner highlight
      ctx.fillStyle='rgba(255,255,255,.3)';
      ctx.beginPath();
      ctx.ellipse(-p.r*.15,-p.r*.2,p.r*.25,p.r*.4,0,0,Math.PI*2);
      ctx.fill();
      ctx.restore();
      return true;
    });
    requestAnimationFrame(tick);
  }
  tick();

  // welcome burst at hero center after page settles
  setTimeout(()=>{
    if(scrollY<100){
      burst(innerWidth/2,innerHeight*.45,22);
    }
  },2500);

  // expose globally so blessing overlay can use it
  window.__petalBurst=burst;
  window.__petalShower=function(){
    // dense, slow shower from across the top
    const count=80;
    for(let i=0;i<count;i++){
      setTimeout(()=>{
        const x=Math.random()*innerWidth;
        burst(x,-20,3);
      },i*40);
    }
  };
})();

/* ═════════════════════════════
   BLESSING OVERLAY — the big moment
═════════════════════════════ */
(function(){
  const overlay=document.getElementById('bless-overlay');
  const openBtn=document.getElementById('blessBtn');
  const closeBtn=document.getElementById('blessClose');
  if(!overlay||!openBtn)return;

  function open(){
    overlay.classList.add('open');
    document.body.style.overflow='hidden';
    // trigger the epic petal shower
    setTimeout(()=>{if(window.__petalShower)window.__petalShower();},300);
  }
  function close(){
    overlay.classList.add('fading');
    setTimeout(()=>{
      overlay.classList.remove('open','fading');
      document.body.style.overflow='';
    },600);
  }

  openBtn.addEventListener('click',open);
  closeBtn.addEventListener('click',close);
  overlay.addEventListener('click',e=>{
    if(e.target===overlay)close();
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&overlay.classList.contains('open'))close();
  });
})();

/* ═════════════════════════════
   PERIODIC TEXT SHIMMER on hero names
   Every ~12s, a wave of light passes across the names
═════════════════════════════ */
(function(){
  const names=document.querySelectorAll('.h-name');
  if(!names.length)return;
  function shimmer(el){
    const chars=[...el.querySelectorAll('.ch')];
    if(!chars.length)return;
    chars.forEach(ch=>{
      ch.style.transition='background-position 1.8s ease-in-out';
      ch.style.background='linear-gradient(110deg,#fff 0%,#fff 30%,#ffe5a0 45%,#ff9e7d 50%,#ffe5a0 55%,#fff 70%,rgba(255,255,255,.65) 100%)';
      ch.style.backgroundSize='300% 100%';
      ch.style.backgroundPosition='200% 50%';
      ch.style.webkitBackgroundClip='text';
      ch.style.webkitTextFillColor='transparent';
      ch.style.backgroundClip='text';
    });
    requestAnimationFrame(()=>{
      chars.forEach(ch=>{ ch.style.backgroundPosition='-100% 50%'; });
    });
    setTimeout(()=>{
      chars.forEach(ch=>{
        ch.style.background='linear-gradient(180deg,#fff 0%,#fff 50%,rgba(255,255,255,.65) 100%)';
        ch.style.backgroundSize='';
        ch.style.backgroundPosition='';
        ch.style.webkitBackgroundClip='text';
        ch.style.webkitTextFillColor='transparent';
        ch.style.backgroundClip='text';
        ch.style.transition='';
      });
    },2000);
  }
  function loop(){
    const delay=8000+Math.random()*6000;
    setTimeout(()=>{
      if(scrollY<innerHeight*.7){
        names.forEach((el,i)=>setTimeout(()=>shimmer(el),i*250));
      }
      loop();
    },delay);
  }
  setTimeout(loop,5000);
})();

/* ═════════════════════════════
   DOUBLE-CLICK EASTER EGG
   Double-click the ampersand → big petal burst from it
═════════════════════════════ */
(function(){
  const amp=document.querySelector('.h-amp');
  if(!amp)return;
  amp.style.cursor='pointer';
  amp.addEventListener('dblclick',e=>{
    const r=amp.getBoundingClientRect();
    const cx=r.left+r.width/2;
    const cy=r.top+r.height/2;
    if(window.__petalBurst){
      window.__petalBurst(cx,cy,40);
    }
  });
  // single click also gives a small burst
  amp.addEventListener('click',e=>{
    const r=amp.getBoundingClientRect();
    if(window.__petalBurst){
      window.__petalBurst(r.left+r.width/2,r.top+r.height/2,16);
    }
    e.stopPropagation();
  });
})();

/* ═════════════════════════════
   GALLERY SCROLL PARALLAX
   Images shift gently as you scroll past
═════════════════════════════ */
(function(){
  const tiles=document.querySelectorAll('.gi');
  if(!tiles.length)return;
  function update(){
    const vh=innerHeight;
    tiles.forEach(t=>{
      const r=t.getBoundingClientRect();
      if(r.bottom<0||r.top>vh)return;
      // calculate how far through the viewport this tile is (0 entering, 1 leaving)
      const progress=(r.top+r.height/2)/vh;
      const offset=(progress-.5)*30; // -15px to +15px
      const inner=t.querySelector('.gph, img');
      if(inner){
        inner.style.transform=`translateY(${offset}px) scale(1.08)`;
      }
    });
    requestAnimationFrame(update);
  }
  update();
})();

/* ═════════════════════════════
   GALLERY 3D TILT (overrides default)
   Mouse-track perspective on each tile
═════════════════════════════ */
document.querySelectorAll('.gi').forEach(tile=>{
  tile.addEventListener('mousemove',e=>{
    const r=tile.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    tile.style.transform=`perspective(1200px) rotateY(${x*6}deg) rotateX(${-y*6}deg) translateZ(20px)`;
  });
  tile.addEventListener('mouseleave',()=>{
    tile.style.transform='';
  });
});

/* ═════════════════════════════
   AMBIENT HOVER on story bignums
   The huge "20" / "21" digits respond to cursor
═════════════════════════════ */
document.querySelectorAll('.story-bignum').forEach(num=>{
  const section=num.closest('.story-section');
  if(!section)return;
  section.addEventListener('mousemove',e=>{
    const r=section.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    num.style.transform=`translate(${x*30}px,${y*20}px)`;
    num.style.transition='transform .4s cubic-bezier(.23,1,.32,1)';
  });
  section.addEventListener('mouseleave',()=>{num.style.transform='';});
});

/* REVEAL */
const ro=new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{if(e.isIntersecting){setTimeout(()=>e.target.classList.add('on'),i*80);ro.unobserve(e.target);}});
},{threshold:.07});
document.querySelectorAll('.rv').forEach(el=>ro.observe(el));

/* LIGHTBOX */
const LB=document.getElementById('LB'),LBi=document.getElementById('LBi'),LBc=document.getElementById('LBc');
const LBtitle=document.getElementById('LB-info-title'),LBmeta=document.getElementById('LB-info-meta');
let ci=0;
function tiles(){return[...document.querySelectorAll('#GG .gi')];}
function tileImage(t){return t.querySelector('img');}
function tileCaption(t){
  const title=t.querySelector('.gi-caption-title');
  const meta=t.querySelector('.gi-caption-meta');
  return {title:title?title.textContent:'',meta:meta?meta.textContent:''};
}
function imgs(){return tiles().map(tileImage).filter(Boolean);}
function showLB(idx){
  const all=tiles();
  const withImgs=all.filter(t=>tileImage(t));
  if(!withImgs.length){
    // no real images - still show the placeholder info
    const t=all[idx];
    if(!t)return;
    const cap=tileCaption(t);
    LBi.style.display='none';
    LBtitle.textContent=cap.title||('Photo '+(idx+1));
    LBmeta.textContent=cap.meta||'Coming soon';
    LBc.textContent=(idx+1)+' / '+all.length;
    return;
  }
  const t=withImgs[idx];
  const img=tileImage(t);
  const cap=tileCaption(t);
  LBi.style.display='';
  LBi.src=img.src;LBi.alt=img.alt||cap.title;
  LBtitle.textContent=cap.title;
  LBmeta.textContent=cap.meta;
  LBc.textContent=(idx+1)+' / '+withImgs.length;
}
function openLB(i){
  ci=i;
  showLB(ci);
  LB.classList.add('open');document.body.style.overflow='hidden';
}
function closeLB(){LB.classList.remove('open');document.body.style.overflow='';}
function navLB(d){
  const count=tiles().filter(t=>tileImage(t)).length || tiles().length;
  ci=(ci+d+count)%count;showLB(ci);
}
document.getElementById('GG').addEventListener('click',e=>{
  const t=e.target.closest('.gi');
  if(!t)return;
  const all=tiles();
  openLB(all.indexOf(t));
});
document.getElementById('LBx').onclick=closeLB;
document.getElementById('LBp').onclick=()=>navLB(-1);
document.getElementById('LBn').onclick=()=>navLB(1);
LB.addEventListener('click',e=>{if(e.target===LB)closeLB();});
document.addEventListener('keydown',e=>{if(!LB.classList.contains('open'))return;if(e.key==='Escape')closeLB();if(e.key==='ArrowLeft')navLB(-1);if(e.key==='ArrowRight')navLB(1);});
