(() => {
  const slide = document.querySelector(".slide.s-ama");
  if (!slide) return;
  const fixed = slide.querySelector(".ama-fixed");
  const topic = slide.querySelector(".ama-topic");
  const TOPICS = ["carreira…", "o mercado…", "IA…", "o que eu não falei…"];
  const TYPE = 55;
  const ERASE = 28;
  const HOLD = 1800;
  const GAP = 300;
  const START = 800;

  const still = () =>
    document.body.classList.contains("embed") || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let timer = null;
  let running = false;

  function later(fn, ms) {
    timer = setTimeout(fn, ms);
  }

  function type(i, n) {
    const word = TOPICS[i];
    topic.textContent = word.slice(0, n);
    if (n < word.length) later(() => type(i, n + 1), TYPE);
    else later(() => erase(i, word.length), HOLD);
  }

  function erase(i, n) {
    topic.textContent = TOPICS[i].slice(0, n);
    if (n > 0) later(() => erase(i, n - 1), ERASE);
    else later(() => type((i + 1) % TOPICS.length, 1), GAP);
  }

  function start() {
    stop();
    running = true;
    if (still()) {
      fixed.textContent = "Pergunte qualquer coisa…";
      return;
    }
    fixed.textContent = "Pergunte sobre ";
    later(() => type(0, 1), START);
  }

  function stop() {
    clearTimeout(timer);
    timer = null;
    running = false;
    topic.textContent = "";
  }

  function sync() {
    const active = slide.classList.contains("active");
    if (active && !running) start();
    else if (!active && running) stop();
  }

  new MutationObserver(sync).observe(slide, { attributes: true, attributeFilter: ["class"] });
  sync();
})();
