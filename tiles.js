/* Mozaika kafelków w tle sekcji hero, w stylu banera LUX PRO. Bez zewnętrznych bibliotek. */
(function () {
  var c = document.getElementById('tiles');
  if (!c || !c.getContext) return;
  var ctx = c.getContext('2d');

  // stały generator liczb, żeby wzór był taki sam przy każdym odświeżeniu
  function rng(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function round(x, y, s, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + s, y, x + s, y + s, r);
    ctx.arcTo(x + s, y + s, x, y + s, r);
    ctx.arcTo(x, y + s, x, y, r);
    ctx.arcTo(x, y, x + s, y, r);
    ctx.closePath();
  }

  function draw() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = c.clientWidth, h = c.clientHeight;
    if (!w || !h) return;
    c.width = w * dpr; c.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    var size = w < 600 ? 28 : 40, gap = 5;
    var step = size + gap;
    var rand = rng(20261016);
    var cols = Math.ceil(w / step) + 1, rows = Math.ceil(h / step) + 1;

    for (var j = 0; j < rows; j++) {
      for (var i = 0; i < cols; i++) {
        var r = rand();
        var a = r < 0.45 ? 0.04 + rand() * 0.05
              : r < 0.85 ? 0.08 + rand() * 0.10
              : 0.20 + rand() * 0.16;
        // złoty odcień: od ciemnego do jasnego
        var k = rand();
        var red = Math.round(154 + k * 90), green = Math.round(112 + k * 80), blue = Math.round(32 + k * 50);
        ctx.fillStyle = 'rgba(' + red + ',' + green + ',' + blue + ',' + a.toFixed(3) + ')';
        round(i * step, j * step, size, 5);
        ctx.fill();
      }
    }
  }

  draw();
  var t;
  window.addEventListener('resize', function () {
    clearTimeout(t); t = setTimeout(draw, 150);
  });
})();
