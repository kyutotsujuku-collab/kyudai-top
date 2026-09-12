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
