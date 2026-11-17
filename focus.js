/* Shows only a design's prototype: hides every sibling along the path to the kept elements, then reports the kept area's size to the gallery. */
(function(){
  var s=document.currentScript,KEEP=s.getAttribute('data-keep')||'',HIDE=s.getAttribute('data-hide')||'';
  var SKIP=/^(SCRIPT|STYLE|LINK|META|TITLE|TEMPLATE|svg)$/i,busy=false,last='';
  function hide(e){if(e.style.getPropertyValue('display')!=='none')e.style.setProperty('display','none','important')}
  function targets(){return KEEP?Array.prototype.slice.call(document.querySelectorAll(KEEP)):[]}
  function apply(){
    busy=true;
    if(HIDE)document.querySelectorAll(HIDE).forEach(hide);
    var t=targets();
    if(t.length){
      var keep=new Set();
      t.forEach(function(e){for(var n=e;n;n=n.parentElement)keep.add(n)});
      t.forEach(function(e){for(var n=e;n&&n!==document.body;n=n.parentElement){var p=n.parentElement;if(!p)break;
        Array.prototype.forEach.call(p.children,function(c){if(!keep.has(c)&&!SKIP.test(c.tagName))hide(c)})}});
    }
    busy=false;post();
  }
  function post(){
    var w,h,t=targets();
    if(t.length){var r=0,b=0;t.forEach(function(e){var q=e.getBoundingClientRect();r=Math.max(r,q.right+scrollX);b=Math.max(b,q.bottom+scrollY)});w=Math.ceil(r+24);h=Math.ceil(b+24)}
    else{w=document.documentElement.scrollWidth;h=document.documentElement.scrollHeight}
    var k=w+'x'+h;if(k===last)return;last=k;
    parent.postMessage({type:'focus-size',w:w,h:h},'*');
  }
  var timer;function later(){if(busy)return;clearTimeout(timer);timer=setTimeout(apply,60)}
  function start(){apply();new MutationObserver(later).observe(document.body,{childList:true,subtree:true});
    if(window.ResizeObserver)new ResizeObserver(function(){post()}).observe(document.body);
    addEventListener('load',function(){apply();setTimeout(apply,600)});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
