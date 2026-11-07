// 控えめなアニメーション（スクロールで浮き上がり）。動きを減らす設定の人には何もしない
(function(){
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var sel = 'section .sec-h, section .h, section .h2, section .body > *, .target > div, .courses a, .results > div, .results .hs, .scene figure, .gallery figure, .news li, .news-list li, .plans .plan, .ways .way, .contact-grid > *, .flash, .rep, .post-body > *, .cta-band > .wrap, .page-hero .wrap > *';
  var els = document.querySelectorAll(sel), i = 0;
  els.forEach(function(el){ el.classList.add('reveal'); });
  // 同じ親内で順番に遅らせる
  var groups = new Map();
  els.forEach(function(el){
    var p = el.parentElement, n = groups.get(p) || 0; groups.set(p, n+1);
    el.style.setProperty('--d', Math.min(n, 8) * 70 + 'ms');
  });
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  els.forEach(function(el){ io.observe(el); });
})();

// ---- snow (xmas) ----
(function(){
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('.hero,.page-hero,.post-hero').forEach(function(h){
    var s=document.createElement('div'); s.className='snow';
    for (var i=0;i<36;i++){ var f=document.createElement('i');
      var sz=4+Math.random()*7; f.style.width=f.style.height=sz+'px';
      f.style.left=Math.random()*100+'%'; f.style.opacity=.4+Math.random()*.6;
      f.style.animationDuration=(7+Math.random()*9)+'s'; f.style.animationDelay=(-Math.random()*16)+'s';
      f.style.setProperty('--dx',(Math.random()*80-40)+'px'); s.appendChild(f); }
    h.appendChild(s);
  });
})();

// ---- lightbox (写真をクリック/タップで拡大) ----
(function(){
  var imgs=[].slice.call(document.querySelectorAll('main img, section img, article img, .post-body img, .scene img, .gallery img, .results img, .body img')).filter(function(im){
    if(im.closest('header,footer,.brand,.lb,a')) return false;
    return !im.dataset.nozoom;
  });
  if(!imgs.length) return;
  var css='.lbx{position:fixed;inset:0;background:rgba(10,16,28,.92);display:none;align-items:center;justify-content:center;z-index:100;padding:24px;cursor:zoom-out}.lbx.open{display:flex}.lbx img{max-width:100%;max-height:100%;object-fit:contain;box-shadow:0 20px 60px rgba(0,0,0,.6)}.lbx button{position:absolute;top:16px;right:16px;background:none;border:1px solid rgba(255,255,255,.5);color:#fff;font-size:1rem;padding:8px 14px;border-radius:2px;cursor:pointer}.lbx figcaption{position:absolute;left:0;right:0;bottom:16px;text-align:center;color:#fff;font-size:.9rem;padding:0 24px}img.zoomable{cursor:zoom-in}';
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
  var lb=document.createElement('div');lb.className='lbx';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');
  lb.innerHTML='<button type="button" aria-label="閉じる">閉じる ×</button><img alt=""><figcaption></figcaption>';
  document.body.appendChild(lb);
  var im=lb.querySelector('img'),cap=lb.querySelector('figcaption');
  function open(src,alt){im.src=src;im.alt=alt||'';cap.textContent=alt||'';lb.classList.add('open');document.body.style.overflow='hidden';}
  function close(){lb.classList.remove('open');document.body.style.overflow='';im.src='';}
  imgs.forEach(function(x){x.classList.add('zoomable');x.setAttribute('tabindex','0');
    x.addEventListener('click',function(){open(x.currentSrc||x.src,x.alt);});
    x.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();open(x.currentSrc||x.src,x.alt);}});});
  lb.addEventListener('click',close);
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
})();
