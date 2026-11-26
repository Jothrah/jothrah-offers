/* JTHRAH_CHAT_V2_START — دردشة جذرة الجديدة. للرجوع للقديمة احذف هذا البلوك فقط */
window.__JTH_CHAT_V2_ON__=true;(function(){if(document.getElementById("jth-chat-v2-loader"))return;var s=document.createElement("script");s.id="jth-chat-v2-loader";s.src="https://jothrah-ai-bot.vercel.app/widget.js?v=2";s.defer=true;(document.head||document.documentElement).appendChild(s);})();
/* JTHRAH_CHAT_V2_END */

/* JTHRAH_DISCOUNT_POPUP_START */
(function(){
  "use strict";
  if(window.__JTHRAH_DISCOUNT_POPUP__) return;
  window.__JTHRAH_DISCOUNT_POPUP__ = true;

  var POPUP_ID = "jthp-pop";
  var DISABLE_48_KEY = "jth_discount_popup_disable_48h_v2";
  var SESSION_CLOSED_KEY = "jth_discount_popup_closed_session_v2";
  var COUPON = "JOTH10";
  var DELAY = 1800;
  var DISABLE_FOR_HOURS = 48;

  function isEligiblePage(){
    var p = (location.pathname || "/").toLowerCase();
    return p === "/" || p === "/ar" || p === "/en" || p === "/ar/" || p === "/en/";
  }
  function getLang(){
    var p = (location.pathname || "").toLowerCase();
    var h = String(document.documentElement.getAttribute("lang") || "").toLowerCase();
    return (p.indexOf("/en") === 0 || h.indexOf("en") === 0) ? "en" : "ar";
  }
  function isDisabled(){
    try{
      var ts = parseInt(localStorage.getItem(DISABLE_48_KEY) || "0", 10);
      if(!ts) return false;
      if(Date.now() - ts < DISABLE_FOR_HOURS * 3600000) return true;
      localStorage.removeItem(DISABLE_48_KEY);
    }catch(e){}
    return false;
  }
  function wasClosedThisSession(){
    try{ return sessionStorage.getItem(SESSION_CLOSED_KEY) === "1"; }catch(e){ return false; }
  }

  var T = {
    ar:{badge:"خصم خاص لعملاء جذرة", t1:"مزرعتك تستاهل…", t2:"بسعر أوفر",
        text:"استخدم كود الخصم عند إتمام الطلب، واحصل على خصم 10% يوصل إلى 15 ريال على المنتجات المؤهلة.",
        copy:"نسخ الكود", copied:"تم النسخ ✓", shop:"تسوّق الحين",
        excl:"لا يشمل الدفع عبر تمارا أو MIS Pay أو البطاقة الائتمانية، أو الدفع عند الاستلام.",
        terms:"تطبق الشروط والأحكام.", hide:"لا تظهر مرة أخرى لمدة 48 ساعة", close:"إغلاق", brand:"جذرة"},
    en:{badge:"Special discount for Jothrah customers", t1:"Your farm deserves…", t2:"a better price",
        text:"Use the code at checkout and get 10% off, up to 15 SAR, on eligible products.",
        copy:"Copy code", copied:"Copied ✓", shop:"Shop now",
        excl:"Not valid with Tamara, MIS Pay, credit card, or cash on delivery payments.",
        terms:"Terms and conditions apply.", hide:"Don't show again for 48 hours", close:"Close", brand:"Jothrah"}
  };

  var CSS = ''
  + '#jthp-pop{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:18px;visibility:hidden;pointer-events:none;font-family:inherit}'
  + '#jthp-pop.is-on{visibility:visible;pointer-events:auto}'
  + '#jthp-pop .jthp-veil{position:absolute;inset:0;background:rgba(8,28,16,.55);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);opacity:0;transition:opacity .35s ease}'
  + '#jthp-pop.is-on .jthp-veil{opacity:1}'
  + '#jthp-pop .jthp-card{position:relative;width:100%;max-width:400px;max-height:calc(100vh - 36px);overflow:auto;background:#fff;border-radius:26px;padding:30px 26px 22px;text-align:center;box-shadow:0 30px 80px rgba(6,30,16,.35);border-top:5px solid #c9a15a;opacity:0;transform:translateY(26px) scale(.94);transition:opacity .45s ease,transform .55s cubic-bezier(.18,1.25,.4,1)}'
  + '#jthp-pop.is-on .jthp-card{opacity:1;transform:none}'
  + '#jthp-pop .jthp-x{position:absolute;top:14px;inset-inline-end:14px;width:34px;height:34px;border-radius:50%;border:1px solid #e5ece6;background:#fff;color:#33463a;display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0;transition:background .2s}'
  + '#jthp-pop .jthp-x:hover{background:#f1f6f2}'
  + '#jthp-pop button:focus-visible{outline:2px solid #14532d;outline-offset:3px}'
  + '#jthp-pop .jthp-art{width:112px;height:112px;margin:0 auto 6px;border-radius:50%;background:radial-gradient(circle at 50% 38%,#f7fbf8 0,#e8f3eb 60%,#d6e9db 100%);border:2px dashed #c9a15a;box-shadow:0 14px 30px rgba(20,83,45,.16);position:relative;overflow:hidden}'
  + '#jthp-pop .jthp-art svg{width:100%;height:100%;display:block}'
  + '#jthp-pop .jthp-brand{font-size:22px;font-weight:800;color:#14532d;margin:6px 0 8px;letter-spacing:0}'
  + '#jthp-pop .jthp-badge{display:inline-block;background:#fbf4e4;color:#7a5a1e;border:1px solid #ecd9ae;font-size:12.5px;font-weight:700;padding:5px 14px;border-radius:999px;margin-bottom:12px}'
  + '#jthp-pop .jthp-title{margin:0 0 10px;font-size:27px;line-height:1.35;font-weight:800;color:#12281a}'
  + '#jthp-pop .jthp-title span{display:block;background:linear-gradient(90deg,#14532d,#2f8a4a 45%,#c9a15a);-webkit-background-clip:text;background-clip:text;color:transparent}'
  + '#jthp-pop .jthp-text{margin:0 auto 16px;max-width:320px;font-size:14px;line-height:1.85;color:#4a5a50}'
  + '#jthp-pop .jthp-code-row{display:flex;gap:10px;align-items:stretch;margin-bottom:12px}'
  + '#jthp-pop .jthp-code{flex:1;display:flex;align-items:center;justify-content:center;border:2px dashed #c9a15a;border-radius:16px;background:#fffdf7;font-size:24px;font-weight:800;letter-spacing:4px;color:#14532d;direction:ltr;min-height:56px;user-select:all;position:relative;overflow:hidden}'
  + '#jthp-pop .jthp-code:after{content:"";position:absolute;top:0;bottom:0;width:40%;left:-60%;background:linear-gradient(100deg,transparent,rgba(201,161,90,.28),transparent);animation:jthpShine 3.2s ease-in-out 1.2s infinite}'
  + '@keyframes jthpShine{0%{left:-60%}55%,100%{left:120%}}'
  + '#jthp-pop .jthp-copy{flex:0 0 auto;min-width:118px;border:0;border-radius:16px;background:linear-gradient(135deg,#1c6b3a,#0f3d22);color:#fff;font-size:15px;font-weight:800;cursor:pointer;padding:0 16px;box-shadow:0 10px 22px rgba(15,61,34,.28);transition:transform .15s,box-shadow .2s}'
  + '#jthp-pop .jthp-copy:hover{transform:translateY(-1px);box-shadow:0 14px 26px rgba(15,61,34,.34)}'
  + '#jthp-pop .jthp-copy.is-copied{background:linear-gradient(135deg,#c9a15a,#9c7432)}'
  + '#jthp-pop .jthp-shop{display:inline-flex;align-items:center;gap:6px;background:none;border:0;color:#14532d;font-weight:800;font-size:15px;cursor:pointer;padding:6px 10px;margin-bottom:8px}'
  + '#jthp-pop .jthp-shop i{font-style:normal;display:inline-block;animation:jthpNudge 1.6s ease-in-out infinite}'
  + '@keyframes jthpNudge{0%,100%{transform:translateX(0)}50%{transform:translateX(-5px)}}'
  + '#jthp-pop[dir=ltr] .jthp-shop i{animation-name:jthpNudgeL}@keyframes jthpNudgeL{0%,100%{transform:translateX(0)}50%{transform:translateX(5px)}}'
  + '#jthp-pop .jthp-excl{margin:0 -8px 4px;font-size:clamp(10px,2.75vw,11.5px);font-weight:700;color:#7a3b1d;line-height:1.7;white-space:nowrap;letter-spacing:-.1px}'
  + '#jthp-pop .jthp-terms{margin:0 0 14px;font-size:12px;color:#7b8a80}'
  + '#jthp-pop .jthp-hide{border:1px solid #e2e8e3;background:#f7faf8;color:#3d4f43;font-size:12.5px;font-weight:700;border-radius:999px;padding:9px 18px;cursor:pointer}'
  + '#jthp-pop .jthp-hide:hover{background:#eef4f0}'
  /* art animations */
  + '#jthp-pop .lf1{transform-origin:80px 98px;animation:jthpSwayA 3.4s ease-in-out infinite}'
  + '#jthp-pop .lf2{transform-origin:80px 88px;animation:jthpSwayB 3.4s ease-in-out infinite}'
  + '#jthp-pop .lf3{transform-origin:80px 70px;animation:jthpSwayA 3s ease-in-out .4s infinite}'
  + '@keyframes jthpSwayA{0%,100%{transform:rotate(-6deg)}50%{transform:rotate(7deg)}}'
  + '@keyframes jthpSwayB{0%,100%{transform:rotate(6deg)}50%{transform:rotate(-7deg)}}'
  + '#jthp-pop .sprout{transform-origin:80px 118px;animation:jthpGrow 1.1s cubic-bezier(.2,1.3,.4,1) .35s both}'
  + '@keyframes jthpGrow{0%{transform:scale(.2,0);opacity:0}100%{transform:none;opacity:1}}'
  + '#jthp-pop .drop{animation:jthpDrop 2.4s ease-in infinite;opacity:0}'
  + '#jthp-pop .d2{animation-delay:.8s}#jthp-pop .d3{animation-delay:1.6s}'
  + '@keyframes jthpDrop{0%{transform:translateY(-14px);opacity:0}15%{opacity:.95}75%{opacity:.9}100%{transform:translateY(46px);opacity:0}}'
  + '#jthp-pop .spark{transform-box:fill-box;transform-origin:center;animation:jthpTw 2.2s ease-in-out infinite}'
  + '#jthp-pop .s2{animation-delay:.7s}#jthp-pop .s3{animation-delay:1.4s}'
  + '@keyframes jthpTw{0%,100%{opacity:.15;transform:scale(.5) rotate(0)}50%{opacity:1;transform:scale(1.1) rotate(45deg)}}'
  + '#jthp-pop .tag{transform-origin:122px 46px;animation:jthpBob 2.8s ease-in-out infinite}'
  + '@keyframes jthpBob{0%,100%{transform:translateY(0) rotate(-8deg)}50%{transform:translateY(-6px) rotate(6deg)}}'
  + '@media(max-width:640px){#jthp-pop{align-items:flex-end;padding:0}#jthp-pop .jthp-card{max-width:none;border-radius:26px 26px 0 0;transform:translateY(100%);max-height:92vh;padding-bottom:calc(22px + env(safe-area-inset-bottom))}#jthp-pop.is-on .jthp-card{transform:none}}'
  + '@media(max-width:420px){#jthp-pop .jthp-card{padding:26px 18px 18px;border-radius:22px}#jthp-pop .jthp-title{font-size:23px}#jthp-pop .jthp-code{font-size:20px;letter-spacing:3px}#jthp-pop .jthp-copy{min-width:100px;font-size:14px}#jthp-pop .jthp-art{width:96px;height:96px}}'
  + '@media(prefers-reduced-motion:reduce){#jthp-pop *,#jthp-pop .jthp-card{animation:none!important;transition:none!important}#jthp-pop .drop{opacity:0}}';

  var ART = '<svg viewBox="0 0 160 160" aria-hidden="true">'
  + '<defs><linearGradient id="jthpLeaf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5fbf72"/><stop offset="1" stop-color="#1c6b3a"/></linearGradient>'
  + '<linearGradient id="jthpGold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#EBD49A"/><stop offset="1" stop-color="#9C7432"/></linearGradient></defs>'
  + '<g class="drop d1"><path d="M58 30c0 0-5 7-5 10a5 5 0 0 0 10 0c0-3-5-10-5-10z" fill="#5aa9e6"/></g>'
  + '<g class="drop d2"><path d="M100 24c0 0-4 6-4 8.5a4 4 0 0 0 8 0c0-2.5-4-8.5-4-8.5z" fill="#5aa9e6"/></g>'
  + '<g class="drop d3"><path d="M76 18c0 0-4 6-4 8.5a4 4 0 0 0 8 0c0-2.5-4-8.5-4-8.5z" fill="#7cc0ef"/></g>'
  + '<path class="spark s1" d="M34 64l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#c9a15a"/>'
  + '<path class="spark s2" d="M128 92l1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6 4-1.6z" fill="#c9a15a"/>'
  + '<path class="spark s3" d="M44 104l1.4 3.4 3.4 1.4-3.4 1.4-1.4 3.4-1.4-3.4-3.4-1.4 3.4-1.4z" fill="#8fcf9c"/>'
  + '<ellipse cx="80" cy="128" rx="44" ry="13" fill="#7a4a2c"/><ellipse cx="80" cy="124" rx="40" ry="9" fill="#9a6440"/>'
  + '<g class="sprout">'
  + '<path d="M80 124C80 108 81 92 80 64" stroke="#1f7a40" stroke-width="4.5" stroke-linecap="round" fill="none"/>'
  + '<g class="lf1"><path d="M80 100C66 100 54 92 50 80c14-2 27 4 30 20z" fill="url(#jthpLeaf)"/><path d="M80 100C70 95 60 88 54 82" stroke="#e9f7ec" stroke-width="1.4" fill="none" opacity=".7"/></g>'
  + '<g class="lf2"><path d="M80 90c13-1 25-9 29-21-14-3-27 4-29 21z" fill="url(#jthpLeaf)"/><path d="M80 90c9-4 18-11 25-18" stroke="#e9f7ec" stroke-width="1.4" fill="none" opacity=".7"/></g>'
  + '<g class="lf3"><path d="M80 68c-8-6-10-16-6-26 9 4 12 15 6 26z" fill="#4fae63"/><path d="M80 68c6-6 8-16 4-26-9 4-11 15-4 26z" fill="#2f8a4a"/></g>'
  + '</g>'
  + '<g class="tag"><circle cx="122" cy="46" r="15" fill="url(#jthpGold)"/><circle cx="122" cy="46" r="11.5" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="1.2" stroke-dasharray="2 2.4"/><text x="122" y="51" text-anchor="middle" font-size="14" font-weight="800" fill="#fff" font-family="Arial,sans-serif">%</text></g>'
  + '</svg>';

  function lockScroll(on){
    document.documentElement.style.overflow = on ? "hidden" : "";
    document.body.style.overflow = on ? "hidden" : "";
  }
  function closePopup(remember48){
    var el = document.getElementById(POPUP_ID);
    try{
      sessionStorage.setItem(SESSION_CLOSED_KEY,"1");
      if(remember48) localStorage.setItem(DISABLE_48_KEY,String(Date.now()));
    }catch(e){}
    if(el){ el.classList.remove("is-on"); el.setAttribute("aria-hidden","true"); }
    lockScroll(false);
    document.removeEventListener("keydown", onKey);
  }
  function onKey(e){ if(e.key === "Escape") closePopup(false); }

  function copyCoupon(btn, L){
    function done(){
      btn.classList.add("is-copied"); btn.textContent = L.copied;
      setTimeout(function(){ btn.classList.remove("is-copied"); btn.textContent = L.copy; }, 1800);
    }
    try{
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(COUPON).then(done, fallback);
      }else{ fallback(); }
    }catch(e){ fallback(); }
    function fallback(){
      try{
        var t = document.createElement("textarea"); t.value = COUPON; t.setAttribute("readonly","");
        t.style.position = "fixed"; t.style.opacity = "0"; document.body.appendChild(t); t.select();
        document.execCommand("copy"); t.remove(); done();
      }catch(e){}
    }
  }

  function build(){
    if(document.getElementById(POPUP_ID)) return;
    var lang = getLang(), L = T[lang];
    var st = document.createElement("style"); st.id = "jthp-css"; st.textContent = CSS; document.head.appendChild(st);
    var w = document.createElement("div");
    w.id = POPUP_ID; w.setAttribute("aria-hidden","true"); w.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    w.innerHTML = '<div class="jthp-veil" data-jthp-close></div>'
      + '<div class="jthp-card" role="dialog" aria-modal="true" aria-labelledby="jthpTitle">'
      + '<button type="button" class="jthp-x" data-jthp-close aria-label="' + L.close + '"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>'
      + '<div class="jthp-art">' + ART + '</div>'
      + '<div class="jthp-brand">' + L.brand + '</div>'
      + '<div class="jthp-badge">' + L.badge + '</div>'
      + '<h2 class="jthp-title" id="jthpTitle">' + L.t1 + '<span>' + L.t2 + '</span></h2>'
      + '<p class="jthp-text">' + L.text + '</p>'
      + '<div class="jthp-code-row"><div class="jthp-code">' + COUPON + '</div><button type="button" class="jthp-copy">' + L.copy + '</button></div>'
      + '<button type="button" class="jthp-shop" data-jthp-close>' + L.shop + ' <i>' + (lang === "ar" ? "←" : "→") + '</i></button>'
      + '<p class="jthp-excl">' + L.excl + '</p>'
      + '<p class="jthp-terms">' + L.terms + '</p>'
      + '<button type="button" class="jthp-hide">' + L.hide + '</button>'
      + '</div>';
    document.body.appendChild(w);
    w.addEventListener("click", function(e){
      var t = e.target;
      if(t.closest(".jthp-copy")){ copyCoupon(t.closest(".jthp-copy"), L); return; }
      if(t.closest(".jthp-hide")){ closePopup(true); return; }
      if(t.closest("[data-jthp-close]")){ closePopup(false); }
    });
    setTimeout(function(){
      if(isDisabled() || wasClosedThisSession()) return;
      w.classList.add("is-on"); w.setAttribute("aria-hidden","false"); lockScroll(true);
      document.addEventListener("keydown", onKey);
      try{ w.querySelector(".jthp-copy").focus({preventScroll:true}); }catch(e){}
    }, DELAY);
  }

  function init(){
    if(!isEligiblePage()) return;
    if(isDisabled()) return;
    if(wasClosedThisSession()) return;
    build();
  }
  if(document.readyState === "loading"){ document.addEventListener("DOMContentLoaded", init, {once:true}); }
  else{ init(); }
})();
/* JTHRAH_DISCOUNT_POPUP_END */

/* JTHRAH_FOOTER_DOCS_START v1 — إخفاء توثيق المركز السعودي ومنصة الأعمال ووثيقة FL-834211569، وإبقاء FL-205735845 فقط (احذف البلوك للرجوع) */
(function(){
  if (window.__JTH_FDOCS) return; window.__JTH_FDOCS = 1;
  var st = document.createElement('style');
  st.textContent = '.sbc-certificate{display:none!important}.footer-vat salla-trust-badges,salla-trust-badges.s-trust-badges-wrapper{display:none!important}';
  document.head.appendChild(st);
  function run(){
    document.querySelectorAll('footer p, .footer-profile p').forEach(function(p){
      if (/المركز السعودي|0000181967|Saudi Center/i.test(p.textContent)) p.style.display = 'none';
    });
    document.querySelectorAll('.footer-vat').forEach(function(f){
      if (/FL-834211569/.test(f.textContent) && !/FL-205735845/.test(f.textContent)) f.style.display = 'none';
    });
  }
  run();
  var mo = new MutationObserver(run); mo.observe(document.documentElement, {childList:true, subtree:true});
  setTimeout(function(){ mo.disconnect(); }, 15000);
})();
/* JTHRAH_FOOTER_DOCS_END */

/* JTHRAH_PRODUCT_LANDING_START v1 — صفحات بيع للإعلانات داخل صفحات المنتجات المختارة (احذف البلوك كاملاً للرجوع) */
(function(){
  if (window.__JTH_PLAND) return; window.__JTH_PLAND = 1;
  var m = location.pathname.match(/\/p(\d+)\/?$/); if (!m) return;
  var P = {
    '2080481267': {
      hook: 'الصراصير تختبي بالنهار، وأفالون يوصل لها في مخبأها',
      why: [
        ['جاهز على طول', 'إبرة جل جاهزة، بدون خلط ولا رش ولا ريحة رش في البيت'],
        ['يوصل للمخابئ', 'نقاط صغيرة في الشقوق والزوايا وخلف الأجهزة، وين ما تختبي الصراصير'],
        ['مادة فعالة واضحة', 'إندوكساكارب 0.5%، مبيد صحة عامة مسجل']
      ],
      steps: ['نظّف المكان من بقايا الأكل والدهون', 'حط نقاط جل صغيرة في الزوايا والشقوق وخلف وتحت الأجهزة', 'لا ترش أي مبيد فوق الجل، وتابع النقاط وجددها حسب الملصق'],
      tiers: [[1, 'إبرة وحدة', 'مطبخ وحمام'], [2, 'إبرتين', 'شقة كاملة'], [3, '3 إبر', 'بيت أو فيلا، أو إصابة قوية']],
      faq: [
        ['وين أحط الجل بالضبط؟', 'في أماكن اختباء الصراصير ومساراتها: الشقوق، الزوايا، خلف وتحت الثلاجة والفرن، وتحت المغاسل.'],
        ['هل هو آمن في البيت؟', 'يستخدم حسب تعليمات الملصق، ويحط في أماكن بعيدة عن متناول الأطفال والحيوانات الأليفة وعن أسطح الأكل.'],
        ['ليش جل بدل الرش؟', 'الجل يحط في مخابئ الصراصير مباشرة بدون ما ترش البيت كامل.']
      ]
    },
    '1359983548': {
      hook: 'بق الفراش والصراصير والنمل في عبوة وحدة',
      why: [
        ['عبوة صغيرة تعطيك رش كثير', 'بمعدل 2.2 مل لكل لتر ماء، العبوة تعطيك لين 107 لتر رش للإصابة الخفيفة'],
        ['أثر متبقي', 'يستخدم بالرش المباشر وبالرش ذي الأثر المتبقي حسب الملصق'],
        ['صناعة أمريكية', 'ثياميثوكسام 21.6% من مجموعة النيونيكوتينويد']
      ],
      steps: ['اخلط 2.2 مل لكل لتر ماء للإصابة الخفيفة، أو 4.4 مل للإصابة الشديدة', 'رش أماكن الإصابة والشقوق وأطراف السرير والأثاث حسب الملصق', 'هوّ المكان بعد الرش، وأبعد الأطفال والحيوانات لين يجف'],
      tiers: [[1, 'عبوة وحدة', 'غرفة أو شقة صغيرة'], [2, 'عبوتين', 'شقة كاملة أو إصابة شديدة'], [3, '3 عبوات', 'بيت كبير أو أكثر من موقع']],
      faq: [
        ['كم مل أحط في المرشة؟', 'للإصابة الخفيفة 2.2 مل لكل لتر ماء، وللشديدة 4.4 مل لكل لتر.'],
        ['وش الحشرات اللي يكافحها؟', 'بق الفراش، الصراصير، النمل، الخنافس، صرصور الليل، والذباب.'],
        ['أحتاج أعيد الرش؟', 'حسب شدة الإصابة وتعليمات الملصق. لو استمرت المشكلة راسلنا واتساب ونوجهك.']
      ]
    },
    '257887177': {
      hook: 'بودرة وحدة للنمل والصراصير وبق الفراش والعقارب والبراغيث',
      why: [
        ['خمس حشرات بعبوة وحدة', 'نمل، صراصير، بق الفراش، عقارب، براغيث'],
        ['بدون خلط ولا مرشة', 'مسحوق تعفير جاهز، توزعه في أماكن الحشرات مباشرة'],
        ['عبوة كبيرة', '500 جرام، بيتا سايبرمثرين 0.6%']
      ],
      steps: ['حدد أماكن تواجد الحشرات ومسارات حركتها', 'عفّر المسحوق في الشقوق والزوايا والمسارات حسب معدل الملصق', 'لا تخلي المسحوق يلامس الأكل أو أسطح تحضير الطعام'],
      tiers: [[1, 'عبوة وحدة', 'شقة أو بيت صغير'], [2, 'عبوتين', 'بيت مع حوش'], [3, '3 عبوات', 'فيلا أو استراحة']],
      faq: [
        ['وين أستخدمه؟', 'في الأماكن اللي تتواجد أو تتحرك فيها الحشرات: الشقوق، الزوايا، أطراف الجدران، ومداخل البيت.'],
        ['ينفع للعقارب؟', 'إيه، العقارب من الآفات المستهدفة على الملصق مع النمل والصراصير وبق الفراش والبراغيث.'],
        ['هل هو آمن؟', 'يستخدم حسب تعليمات الملصق مع احتياطات السلامة، ويحفظ بعيد عن الأطفال والأكل.']
      ]
    },
    '1621622166': {
      hook: 'احمِ بيتك من النمل الأبيض قبل البناء وبعده',
      why: [
        ['قبل البناء وبعده', 'لمعاملة التربة حول الأساسات، ولمعالجة المبنى بعد البناء'],
        ['لتر يعطيك 400 لتر محلول', 'معدل التخفيف 250 مل لكل 100 لتر ماء'],
        ['فيبرونيل 5%', 'يعمل بالملامسة، مبيد صحة عامة مسجل']
      ],
      steps: ['خفّف 250 مل من المبيد في 100 لتر ماء', 'قبل البناء: عامل التربة حول الأساسات والقواعد حسب الملصق', 'بعد البناء: عالج المناطق المصابة داخل المبنى أو خارجه حسب الملصق'],
      tiers: [[1, 'لتر واحد', '400 لتر محلول'], [2, 'لترين', '800 لتر محلول'], [4, '4 لترات', '1600 لتر محلول، للمشاريع']],
      faq: [
        ['كم أخفف اللتر؟', '250 مل لكل 100 لتر ماء، يعني اللتر الواحد يعطيك 400 لتر محلول.'],
        ['ينفع بعد ما خلص البناء؟', 'إيه، يستخدم قبل البناء لمعاملة التربة، وبعد البناء لمعالجة المناطق المستهدفة.'],
        ['كم أحتاج لمشروعي؟', 'يعتمد على مساحة الأساسات وطريقة التطبيق. أرسل لنا المساحة على واتساب ونحسبها معك.']
      ]
    },
    '1984935960': {
      hook: 'لتر واحد للبعوض والذباب والصراصير والنمل',
      why: [
        ['يغطي مساحة كبيرة', 'للبعوض والذباب: 50 مل لكل 5 لترات ماء تكفي 100 متر مربع، يعني اللتر يغطي لين 2000 متر مربع'],
        ['أثر متبقي', 'رش سطحي يبقى أثره على الأسطح المعالجة'],
        ['ست حشرات', 'بعوض، ذباب، عث، نمل، صراصير، براغيث. سايبرمثرين 10%']
      ],
      steps: ['البعوض والذباب: 50 مل لكل 5 لترات ماء. النمل والصراصير والبراغيث: 50 إلى 75 مل', 'رش الأسطح وأماكن تجمع الحشرات، كل 5 لترات محلول لمساحة 100 متر مربع', 'البس الكمامة والقفازات وقت الرش، وهوّ المكان بعدها'],
      tiers: [[1, 'لتر واحد', 'حتى 2000 م² للبعوض والذباب'], [2, 'لترين', 'حوش كبير أو استراحة'], [3, '3 لترات', 'مزرعة أو أكثر من موقع']],
      faq: [
        ['كم أخلط في المرشة؟', 'للبعوض والذباب والعث 50 مل لكل 5 لترات ماء. للنمل والصراصير والبراغيث 50 إلى 75 مل لكل 5 لترات.'],
        ['كم مساحة يغطي اللتر؟', 'كل 5 لترات محلول تعالج 100 متر مربع، فاللتر يغطي لين 2000 متر مربع بمعدل البعوض والذباب.'],
        ['ينفع داخل البيت؟', 'مبيد صحة عامة للرش السطحي، ويستخدم حسب تعليمات الملصق مع التهوية وإبعاد الأطفال والحيوانات.']
      ]
    }
  };
  var C = P[m[1]]; if (!C) return;
  var WA = 'https://wa.me/966501211056?text=' + encodeURIComponent('السلام عليكم، عندي سؤال عن ' + document.title.split('|')[0].trim());
  var css = ''
  + '.jpl{font-family:inherit;color:#10241f}'
  + '.jpl-hook{margin:10px 0 4px;font-size:15px;font-weight:800;color:#0f5132;line-height:1.6}'
  + '.jpl-trust{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0 10px}'
  + '.jpl-trust span{font-size:12px;font-weight:700;background:#eef6f1;color:#0f5132;border-radius:999px;padding:5px 10px}'
  + '.jpl-tiers{margin:12px 0 4px}'
  + '.jpl-tiers h3{font-size:15px;font-weight:800;margin:0 0 8px}'
  + '.jpl-tier{display:flex;align-items:center;gap:10px;width:100%;text-align:right;background:#fff;border:1.5px solid #dfe9e4;border-radius:14px;padding:12px;margin-bottom:8px;cursor:pointer;font:inherit;color:inherit;position:relative;transition:border-color .15s,background .15s}'
  + '.jpl-tier[aria-checked=true]{border-color:#0f5132;background:#f2f8f4}'
  + '.jpl-tier:focus-visible{outline:3px solid #22c55e;outline-offset:2px}'
  + '.jpl-radio{flex:none;width:20px;height:20px;border-radius:50%;border:2px solid #9fb5ab;display:grid;place-items:center}'
  + '.jpl-tier[aria-checked=true] .jpl-radio{border-color:#0f5132;background:#0f5132;box-shadow:inset 0 0 0 3px #fff}'
  + '.jpl-tier b{display:block;font-size:14.5px;font-weight:800}'
  + '.jpl-tier small{display:block;font-size:12px;color:#55665f;margin-top:2px}'
  + '.jpl-tier .jpl-sum{margin-inline-start:auto;font-size:15px;font-weight:800;white-space:nowrap}'
  + '.jpl-note{font-size:12px;color:#55665f;margin:2px 0 6px}'
  + '.jpl-sec{margin:22px 0 0;padding:16px;border:1px solid #dfe9e4;border-radius:16px;background:#fff}'
  + '.jpl-sec h3{font-size:16.5px;font-weight:800;margin:0 0 12px}'
  + '.jpl-why{display:grid;gap:10px}'
  + '.jpl-why div{display:flex;gap:10px;align-items:flex-start}'
  + '.jpl-why i{flex:none;width:26px;height:26px;border-radius:8px;background:#0f5132;color:#fff;display:grid;place-items:center;font-style:normal;font-size:14px;font-weight:800}'
  + '.jpl-why b{display:block;font-size:14px}.jpl-why p{margin:2px 0 0;font-size:13px;line-height:1.7;color:#3d4f49}'
  + '.jpl-steps{list-style:none;margin:0;padding:0;counter-reset:s;display:grid;gap:10px}'
  + '.jpl-steps li{counter-increment:s;display:flex;gap:10px;font-size:13.5px;line-height:1.7}'
  + '.jpl-steps li:before{content:counter(s);flex:none;width:26px;height:26px;border-radius:50%;background:#eef6f1;color:#0f5132;font-weight:800;display:grid;place-items:center}'
  + '.jpl-warn{margin:12px 0 0;font-size:12px;color:#7a4b00;background:#fff7e6;border-radius:10px;padding:8px 10px;line-height:1.6}'
  + '.jpl details{border-top:1px solid #edf2ef}.jpl details:first-of-type{border-top:0}'
  + '.jpl summary{list-style:none;cursor:pointer;padding:12px 0;font-weight:800;font-size:14px;display:flex;justify-content:space-between;gap:10px}'
  + '.jpl summary::-webkit-details-marker{display:none}.jpl summary:after{content:"+";color:#0f5132;font-size:18px;line-height:1}.jpl details[open] summary:after{content:"−"}'
  + '.jpl details p{margin:0 0 12px;font-size:13.5px;line-height:1.8;color:#3d4f49}'
  + '.jpl-wa{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:12px;background:#0f5132;color:#fff;border-radius:14px;padding:12px 14px;font-size:13.5px}'
  + '.jpl-wa a{flex:none;background:#fff;color:#0f5132!important;font-weight:800;border-radius:999px;padding:8px 14px;text-decoration:none!important;font-size:13px}'
  + '@media (max-width:767px){.jpl-wa{flex-direction:column;align-items:stretch;text-align:center}}';
  function price(){ var e = document.querySelector('meta[property="product:sale_price:amount"]') || document.querySelector('meta[property="product:price:amount"]'); var v = e ? parseFloat(e.getAttribute('content')) : NaN; return isNaN(v) ? null : v; }
  function fmt(n){ return (Math.round(n * 100) / 100).toLocaleString('en-US') + ' ر.س'; }
  function setQty(q){
    var qi = document.querySelector('form.product-form salla-quantity-input') || document.querySelector('salla-quantity-input');
    try { if (qi && qi.setValue) { qi.setValue(q); return; } } catch(e){}
    var inp = document.querySelector('form.product-form input[name=quantity]');
    if (inp) { inp.value = q; inp.dispatchEvent(new Event('input', {bubbles:true})); inp.dispatchEvent(new Event('change', {bubbles:true})); }
  }
  function build(){
    var form = document.querySelector('form.product-form'); var bar = form && form.querySelector('.sticky-product-bar');
    if (!form || !bar) return false;
    if (document.querySelector('.jpl-tiers')) return true;
    var st = document.createElement('style'); st.id = 'jpl-css'; st.textContent = css; document.head.appendChild(st);
    var pr = price();
    var top = document.createElement('div'); top.className = 'jpl';
    top.innerHTML = '<p class="jpl-hook">' + C.hook + '</p><div class="jpl-trust"><span>مسجل رسمياً</span><span>توصيل لجميع المدن</span><span>قسّطها مع تمارا ومسباي</span></div>'
      + '<div class="jpl-tiers" role="radiogroup" aria-label="اختر الكمية"><h3>اختر الكمية المناسبة لك</h3>'
      + C.tiers.map(function(t, i){ return '<button type="button" class="jpl-tier" role="radio" aria-checked="' + (i === 0) + '" data-q="' + t[0] + '"><span class="jpl-radio"></span><span><b>' + t[1] + '</b><small>' + t[2] + '</small></span>' + (pr ? '<span class="jpl-sum">' + fmt(pr * t[0]) + '</span>' : '') + '</button>'; }).join('')
      + '<p class="jpl-note">الكمية اقتراح حسب المساحة، وتقدر تغيرها من خانة العدد. الأسعار شاملة الضريبة.</p></div>';
    form.insertBefore(top, form.querySelector(':scope>salla-installment') || bar);
    top.querySelectorAll('.jpl-tier').forEach(function(b){
      b.addEventListener('click', function(){
        top.querySelectorAll('.jpl-tier').forEach(function(x){ x.setAttribute('aria-checked', x === b ? 'true' : 'false'); });
        setQty(parseInt(b.getAttribute('data-q'), 10));
      });
    });
    var sec = document.createElement('div'); sec.className = 'jpl';
    sec.innerHTML = '<section class="jpl-sec"><h3>ليش تختاره؟</h3><div class="jpl-why">' + C.why.map(function(w){ return '<div><i>✓</i><span><b>' + w[0] + '</b><p>' + w[1] + '</p></span></div>'; }).join('') + '</div></section>'
      + '<section class="jpl-sec"><h3>طريقة الاستخدام</h3><ol class="jpl-steps">' + C.steps.map(function(s){ return '<li>' + s + '</li>'; }).join('') + '</ol><p class="jpl-warn">اقرأ ملصق العبوة قبل الاستخدام والتزم بالجرعة واحتياطات السلامة.</p></section>'
      + '<section class="jpl-sec"><h3>أسئلة عن المنتج</h3>' + C.faq.map(function(q){ return '<details><summary>' + q[0] + '</summary><p>' + q[1] + '</p></details>'; }).join('')
      + '<div class="jpl-wa"><span>عندك سؤال ثاني؟ يرد عليك مهندس زراعي</span><a href="' + WA + '" target="_blank" rel="noopener">اسألنا على واتساب</a></div></section>';
    form.parentNode.insertBefore(sec, form.nextSibling);
    return true;
  }
  var n = 0; (function loop(){ if (!build() && n++ < 60) setTimeout(loop, 250); })();
})();
/* JTHRAH_PRODUCT_LANDING_END */

/* JTHRAH_HOME_V2_START v1 — الواجهة الجديدة للصفحة الرئيسية من offers.jothrah.com/store/home-v2.js (للرجوع احذف هذا البلوك و JTHRAH_HOME_V2_HIDE في CSS) */
(function(){if(!/^\/(ar|en)?\/?$/.test(location.pathname))return;var s=document.createElement('script');s.src='https://offers.jothrah.com/store/home-v2.js?v=1';s.async=true;s.onerror=function(){document.body.classList.add('jth-v2-off')};(document.head||document.documentElement).appendChild(s);})();
/* JTHRAH_HOME_V2_END */
