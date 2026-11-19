/* Shows only a design's prototype: hides every sibling along the path to the kept elements, then reports the area to the gallery.
   Message: {type:"focus-size", x, y, w, h}: the left, top, right and bottom edges, in page pixels, of everything visible inside
   the kept elements, following content that spills out of its parent unless a parent clips it (overflow hidden or scroll).
   Floating elements (position: fixed, such as toasts and popovers) are never hidden and are measured too.
   Edges are exact, with no padding: the gallery adds its own margin. */
(function(){
  var s=document.currentScript,KEEP=s.getAttribute('data-keep')||'',HIDE=s.getAttribute('data-hide')||'';
  var SKIP=/^(SCRIPT|STYLE|LINK|META|TITLE|TEMPLATE|svg)$/i,busy=false,last='',queued=false,MAX=25000;
  function hide(e){if(e.style.getPropertyValue('display')!=='none')e.style.setProperty('display','none','important')}
  function floating(e){try{return getComputedStyle(e).position==='fixed'}catch(_){return false}}
  function targets(){return KEEP?Array.prototype.slice.call(document.querySelectorAll(KEEP)):[]}
  function apply(){
    busy=true;
    if(HIDE)document.querySelectorAll(HIDE).forEach(hide);
    var t=targets();
    if(t.length){
      var keep=new Set();
      t.forEach(function(e){for(var n=e;n;n=n.parentElement)keep.add(n)});
      t.forEach(function(e){for(var n=e;n&&n!==document.body;n=n.parentElement){var p=n.parentElement;if(!p)break;
        Array.prototype.forEach.call(p.children,function(c){if(!keep.has(c)&&!SKIP.test(c.tagName)&&!floating(c))hide(c)})}});
    }
    busy=false;post();
  }
  /* visible bounds of el and its descendants, intersected with any clipping ancestor */
  function bounds(roots){
    var L=1/0,T=1/0,R=-1/0,B=-1/0,n=0,sx=scrollX,sy=scrollY;
    function walk(el,cl,ct,cr,cb){
      if(++n>MAX)return;
      var cs=getComputedStyle(el);if(cs.display==='none')return;
      var q=el.getBoundingClientRect(),l=q.left+sx,t=q.top+sy,r=q.right+sx,b=q.bottom+sy;
      if(q.width&&q.height&&cs.visibility!=='hidden'){
        var a=Math.max(l,cl),c=Math.max(t,ct),d=Math.min(r,cr),e=Math.min(b,cb);
        if(d>a&&e>c){if(a<L)L=a;if(c<T)T=c;if(d>R)R=d;if(e>B)B=e}
      }
      if(cs.overflowX!=='visible'||cs.overflowY!=='visible'||(cs.contain||'').indexOf('paint')>=0){cl=Math.max(cl,l);ct=Math.max(ct,t);cr=Math.min(cr,r);cb=Math.min(cb,b)}
      for(var k=el.firstElementChild;k;k=k.nextElementSibling)if(!SKIP.test(k.tagName)||k.tagName.toLowerCase()==='svg')walk(k,cl,ct,cr,cb);
    }
    roots.forEach(function(e){walk(e,-1e9,-1e9,1e9,1e9)});
    return R>L?{l:L,t:T,r:R,b:B}:null;
  }
  function post(){if(queued)return;queued=true;requestAnimationFrame(function(){queued=false;send()})}
  function send(){
    var x=0,y=0,w,h,t=targets();
    if(t.length){
      Array.prototype.forEach.call(document.body.children,function(c){if(t.indexOf(c)<0&&floating(c)&&c.style.getPropertyValue('display')!=='none')t.push(c)});
      var bx=bounds(t);
      if(bx){x=Math.max(0,Math.floor(bx.l));y=Math.max(0,Math.floor(bx.t));w=Math.ceil(bx.r);h=Math.ceil(bx.b)}
      else{w=document.documentElement.scrollWidth;h=document.documentElement.scrollHeight}
    }
    else{ // whole page: the content itself, not <html>/<body>, which are at least as tall as the frame and would grow it in a loop
      var kids=Array.prototype.filter.call(document.body.children,function(c){return !SKIP.test(c.tagName)}),bb=bounds(kids);
      if(bb){w=Math.ceil(bb.r);h=Math.ceil(bb.b)}else{w=document.documentElement.scrollWidth;h=document.documentElement.scrollHeight}}
    var k=[x,y,w,h].join();if(k===last)return;last=k;
    parent.postMessage({type:'focus-size',x:x,y:y,w:w,h:h},'*');
  }
  var timer;function later(){if(busy)return;clearTimeout(timer);timer=setTimeout(apply,60)}
  function start(){apply();new MutationObserver(later).observe(document.body,{childList:true,subtree:true});
    if(window.ResizeObserver)new ResizeObserver(post).observe(document.body);
    addEventListener('load',function(){apply();setTimeout(apply,600)});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
