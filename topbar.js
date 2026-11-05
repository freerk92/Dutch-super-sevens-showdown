// Shared top bar (and concept banner) for every page.
// To change the menu, edit the PAGES list below. Each page just contains <script src="topbar.js"></script>.
(function(){
  // Set to false to take the "concept version" warning off every page at once
  var SHOW_CONCEPT_BANNER = true;

  // label: the menu text. <span class="topbar-long"> parts are hidden on small screens.
  var PAGES = [
    { href: 'index.html',                 label: 'Home' },
    { href: 'to-guide.html',              label: 'TO Guide' },
    { href: 'recommended-rulespack.html', label: 'Rulespack' },
    { href: 'calendar.html',              label: '<span class="topbar-long">2027 </span>Calendar' }
  ];

  var current = location.pathname.split('/').pop() || 'index.html';

  var html = '';
  if (SHOW_CONCEPT_BANNER) {
    html += '<div class="concept-banner" role="note"><div class="wrap"><strong>Concept version &mdash;</strong> ' +
      'The information presented on this website is preliminary and may be subject to change. ' +
      'Please be aware that details may be updated or revised at a later date.</div></div>';
  }
  html += '<nav class="topbar" aria-label="DBBA pages"><div class="wrap topbar-inner">' +
    '<a class="topbar-brand" href="index.html"><img src="dbba-logo.png" alt="">' +
    '<span class="brand-full">Dutch Blood Bowl Association</span><span class="brand-short">DBBA</span></a>' +
    '<div class="topbar-links">' +
    PAGES.map(function(p){
      return '<a href="' + p.href + '"' + (p.href === current ? ' aria-current="page"' : '') + '>' + p.label + '</a>';
    }).join('') +
    '</div></div></nav>';

  // Insert right where the script tag is, so the bar is there before the page renders (no jump)
  document.currentScript.insertAdjacentHTML('beforebegin', html);
})();
