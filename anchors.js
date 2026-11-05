// Adds a small "#" link next to every section title. Clicking it copies a direct link to that section.
(function(){
  var targets = document.querySelectorAll('main section[id], .audience-band[id]');
  var toast;
  function flash(btn, msg){
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'anchor-toast';
      toast.setAttribute('role', 'status');
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(flash.t);
    flash.t = setTimeout(function(){ toast.classList.remove('show'); }, 1800);
  }
  function copy(text){
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function(resolve, reject){
      var ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy') ? resolve() : reject(); } catch (e) { reject(e); }
      document.body.removeChild(ta);
    });
  }
  targets.forEach(function(el){
    var h = el.querySelector('h2');
    if (!h) return;
    var a = document.createElement('a');
    a.className = 'anchor-link';
    a.href = '#' + el.id;
    a.setAttribute('aria-label', 'Copy link to ' + h.textContent.trim());
    a.title = 'Copy link to this section';
    a.textContent = '#';
    a.addEventListener('click', function(e){
      e.preventDefault();
      var url = location.href.split('#')[0] + '#' + el.id;
      history.replaceState(null, '', '#' + el.id);
      copy(url).then(function(){ flash(a, 'Link copied'); }, function(){ flash(a, 'Link in address bar'); });
    });
    h.appendChild(a);
  });
})();
