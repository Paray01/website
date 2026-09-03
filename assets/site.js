/* Skaliert eingebettete Seiten und Demos auf die Breite ihres Kastens.
   data-fit="cover": Breite füllen, Höhe wird abgeschnitten (Vorschaukarten).
   data-fit="contain": komplett sichtbar, zentriert (Demo-Bühne, Telefon). */
(function () {
  function fit() {
    document.querySelectorAll('[data-fit]').forEach(function (box) {
      var target = box.querySelector(':scope > iframe, :scope > .fit-target');
      if (!target) return;
      var iw = +box.dataset.w || 1280, ih = +box.dataset.h || 800;
      var w = box.clientWidth, h = box.clientHeight;
      if (!w || !h) return;
      var contain = box.dataset.fit === 'contain';
      var s = contain ? Math.min(w / iw, h / ih, 1) : w / iw;
      target.style.width = iw + 'px';
      target.style.height = (contain ? ih : Math.ceil(h / s)) + 'px';
      target.style.transform = 'scale(' + s + ')';
      target.style.left = contain ? ((w - iw * s) / 2) + 'px' : '0px';
      target.style.top = contain ? ((h - ih * s) / 2) + 'px' : '0px';
    });
  }
  window.addEventListener('resize', fit);
  window.addEventListener('load', fit);
  document.addEventListener('DOMContentLoaded', fit);
  fit();

  /* Umschalter zwischen mehreren Demos auf einer Projektseite */
  document.querySelectorAll('.tabs').forEach(function (tabs) {
    var buttons = tabs.querySelectorAll('button');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.setAttribute('aria-selected', b === btn ? 'true' : 'false'); });
        document.querySelectorAll('[data-panel]').forEach(function (p) {
          var on = p.dataset.panel === btn.dataset.tab;
          p.hidden = !on;
          if (on) {
            var f = p.querySelector('iframe[data-src]');
            if (f) { f.src = f.dataset.src; f.removeAttribute('data-src'); }
          }
        });
        fit();
      });
    });
  });
})();
