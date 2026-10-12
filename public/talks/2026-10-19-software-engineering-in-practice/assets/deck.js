(() => {
  const params = new URLSearchParams(location.search);
  const MODE = params.has("presenter") ? "presenter" : params.has("embed") ? "embed" : "main";
  const CHANNEL = "ubm-deck";
  const TALK_MINUTES = 52;
  const ACT_START = { "00": 0, "01": 4, "02": 11, "03": 25, "04": 37, "05": 45, "06": 50 };

  const stage = document.getElementById("stage");
  const slides = [...stage.querySelectorAll(":scope > .slide")];
  const hudCount = document.querySelector(".hud-count");
  const progress = document.querySelector(".progress");

  slides.forEach((slide) => {
    const frags = [...slide.querySelectorAll(".f, .fx")];
    let last = 0;
    frags.forEach((el) => {
      const s = el.dataset.step ? Number(el.dataset.step) : last + 1;
      el._step = s;
      last = Math.max(last, s);
    });
    slide._frags = frags;
    slide._steps = [...new Set(frags.map((f) => f._step))].sort((a, b) => a - b);
  });

  let index = 0;
  let step = 0;
  let peer = null;

  const pad = (n) => String(n).padStart(2, "0");

  function fit() {
    const s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    stage.style.setProperty("--scale", s);
  }

  function render(prevIndex) {
    const cur = slides[index];
    slides.forEach((sl, n) => {
      sl.classList.toggle("active", n === index);
      sl.classList.toggle("past", n < index);
    });

    if (prevIndex !== undefined && prevIndex !== index) {
      const p = slides[prevIndex];
      clearTimeout(p._leave);
      p.classList.add("leaving");
      p._leave = setTimeout(() => p.classList.remove("leaving"), 900);
    }

    const threshold = step ? cur._steps[step - 1] : 0;
    cur._frags.forEach((f) => f.classList.toggle("on", f._step <= threshold));

    stage.dataset.act = cur.dataset.act || "";
    stage.classList.toggle("hud-off", cur.dataset.hud === "off");

    if (hudCount) hudCount.innerHTML = `<b>${pad(index + 1)}</b> / ${pad(slides.length)}`;
    if (progress) progress.style.width = `${((index + 1) / slides.length) * 100}%`;

    if (MODE === "main") history.replaceState(null, "", `#/${index + 1}${step ? "/" + step : ""}`);
    if (MODE === "presenter") renderPresenter();
  }

  function go(i, s = 0, opts = {}) {
    const prev = index;
    index = Math.max(0, Math.min(slides.length - 1, i));
    step = Math.max(0, Math.min(slides[index]._steps.length, s));
    render(prev);
    if (!opts.silent) broadcast();
  }

  function next() {
    if (step < slides[index]._steps.length) go(index, step + 1);
    else if (index < slides.length - 1) go(index + 1, 0);
  }

  function prev() {
    if (step > 0) go(index, step - 1);
    else if (index > 0) go(index - 1, slides[index - 1]._steps.length);
  }

  function parseHash() {
    const m = location.hash.match(/^#\/(\d+)(?:\/(\d+))?/);
    if (!m) return null;
    return { i: Number(m[1]) - 1, s: Number(m[2] || 0) };
  }

  /* ---------- sync between main and presenter windows ---------- */

  function broadcast() {
    if (peer && !peer.closed) peer.postMessage({ ch: CHANNEL, i: index, s: step }, "*");
  }

  window.addEventListener("message", (e) => {
    const d = e.data;
    if (!d || d.ch !== CHANNEL) return;
    if (d.hello) {
      peer = e.source;
      broadcast();
      return;
    }
    if (d.i !== index || d.s !== step) go(d.i, d.s, { silent: true });
  });

  function openPresenter() {
    const url = `${location.pathname}?presenter${location.hash}`;
    peer = window.open(url, "ubm-presenter", "width=1400,height=860");
  }

  /* ---------- overlays ---------- */

  const blackout = document.getElementById("blackout");
  const help = document.getElementById("help");

  function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen().catch(() => {});
  }

  /* ---------- input ---------- */

  let jumpBuffer = "";
  let jumpTimer;

  function onKey(e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key;

    if (/^[0-9]$/.test(k)) {
      jumpBuffer += k;
      clearTimeout(jumpTimer);
      jumpTimer = setTimeout(() => (jumpBuffer = ""), 1500);
      return;
    }
    if (k === "Enter" && jumpBuffer) {
      go(Number(jumpBuffer) - 1, 0);
      jumpBuffer = "";
      return;
    }

    switch (k) {
      case "ArrowRight":
      case "ArrowDown":
      case "PageDown":
      case " ":
      case "Enter":
      case "l":
      case "j":
        e.preventDefault();
        if (e.shiftKey && index < slides.length - 1) go(index + 1, 0);
        else next();
        break;
      case "ArrowLeft":
      case "ArrowUp":
      case "PageUp":
      case "Backspace":
      case "h":
      case "k":
        e.preventDefault();
        if (e.shiftKey && index > 0) go(index - 1, 0);
        else prev();
        break;
      case "Home":
        go(0, 0);
        break;
      case "End":
        go(slides.length - 1, 0);
        break;
      case "f":
      case "F5":
        e.preventDefault();
        toggleFullscreen();
        break;
      case "b":
      case "B":
      case ".":
        if (MODE === "main") blackout.classList.toggle("on");
        else if (peer) peer.postMessage({ ch: CHANNEL + ":black" }, "*");
        break;
      case "p":
        if (MODE === "main") openPresenter();
        break;
      case "t":
        if (MODE === "presenter") resetTimer();
        break;
      case "?":
        if (MODE === "main") help.classList.toggle("on");
        break;
      case "Escape":
        help.classList.remove("on");
        blackout.classList.remove("on");
        break;
    }
  }

  window.addEventListener("message", (e) => {
    if (e.data && e.data.ch === CHANNEL + ":black" && MODE === "main") blackout.classList.toggle("on");
  });

  /* ---------- presenter view ---------- */

  let timerStart = Date.now();
  let pEls;

  function resetTimer() {
    timerStart = Date.now();
    tick();
  }

  function fmt(ms) {
    const t = Math.max(0, Math.floor(ms / 1000));
    return `${pad(Math.floor(t / 60))}:${pad(t % 60)}`;
  }

  function tick() {
    if (!pEls) return;
    const elapsed = Date.now() - timerStart;
    const min = elapsed / 60000;
    pEls.timer.textContent = fmt(elapsed);
    pEls.timer.classList.toggle("warnish", min >= TALK_MINUTES - 5 && min < TALK_MINUTES);
    pEls.timer.classList.toggle("late", min >= TALK_MINUTES);
    pEls.clock.textContent = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    pEls.bar.style.width = `${Math.min(100, (min / TALK_MINUTES) * 100)}%`;

    const act = slides[index].dataset.act;
    if (act in ACT_START) {
      const acts = Object.keys(ACT_START);
      const nextAct = acts[acts.indexOf(act) + 1];
      const end = nextAct ? ACT_START[nextAct] : TALK_MINUTES;
      const behind = min > end;
      pEls.pace.innerHTML = `Ato ${act}: alvo <b>${pad(ACT_START[act])}:00 – ${pad(end)}:00</b>${
        behind ? ` · <span class="behind">atrasado ${fmt((min - end) * 60000)}</span>` : ""
      }`;
    }
  }

  function buildPresenter() {
    document.body.classList.add("presenter");
    const root = document.getElementById("presenter");
    root.innerHTML = `
      <div class="p-head">
        <div class="p-pace"></div>
        <div style="display:flex;align-items:center;gap:22px">
          <span class="clock"></span>
          <span class="timer">00:00</span>
          <button type="button" data-act="reset">reiniciar (t)</button>
        </div>
      </div>
      <div class="p-body">
        <div class="p-frame"><span class="lbl">agora</span><iframe data-f="cur" title="Slide atual"></iframe></div>
        <div class="p-frame"><span class="lbl">próximo</span><iframe data-f="next" title="Próximo passo"></iframe></div>
        <div class="p-progress"><i></i></div>
      </div>
      <div class="p-foot"><span class="p-where"></span><span>← → navega · b tela preta · t reinicia timer</span></div>`;
    pEls = {
      cur: root.querySelector('[data-f="cur"]'),
      next: root.querySelector('[data-f="next"]'),
      where: root.querySelector(".p-where"),
      timer: root.querySelector(".timer"),
      clock: root.querySelector(".clock"),
      pace: root.querySelector(".p-pace"),
      bar: root.querySelector(".p-progress i"),
    };
    root.querySelector('[data-act="reset"]').addEventListener("click", resetTimer);
    const base = `${location.pathname}?embed`;
    pEls.cur.src = `${base}#/1`;
    pEls.next.src = `${base}#/1`;
    setInterval(tick, 500);
  }

  function renderPresenter() {
    if (!pEls) return;
    const base = `${location.pathname}?embed`;
    pEls.cur.src = `${base}#/${index + 1}/${step}`;
    let ni = index;
    let ns = step + 1;
    if (step >= slides[index]._steps.length) {
      ni = Math.min(index + 1, slides.length - 1);
      ns = 0;
    }
    pEls.next.src = `${base}#/${ni + 1}/${ns}`;
    const total = slides[index]._steps.length;
    pEls.where.innerHTML = `slide <b>${index + 1}</b>/${slides.length} · passo <b>${step}</b>/${total} · ${
      slides[index].dataset.label || ""
    }`;
    tick();
  }

  /* ---------- boot ---------- */

  fit();
  window.addEventListener("resize", fit);

  const initial = parseHash();
  if (initial) {
    index = Math.max(0, Math.min(slides.length - 1, initial.i));
    step = Math.max(0, Math.min(slides[index]._steps.length, initial.s));
  }

  if (MODE === "presenter") {
    buildPresenter();
    peer = window.opener;
    if (peer) peer.postMessage({ ch: CHANNEL, hello: true }, "*");
  }
  if (MODE === "embed") document.body.classList.add("embed");

  render();

  if (MODE === "embed") {
    window.addEventListener("hashchange", () => {
      const h = parseHash();
      if (h) go(h.i, h.s, { silent: true });
    });
    return;
  }

  document.addEventListener("keydown", onKey);

  if (MODE === "main") {
    window.addEventListener("hashchange", () => {
      const h = parseHash();
      if (h && (h.i !== index || h.s !== step)) go(h.i, h.s);
    });

    let idle;
    window.addEventListener("mousemove", () => {
      document.body.classList.remove("idle");
      clearTimeout(idle);
      idle = setTimeout(() => document.body.classList.add("idle"), 2200);
    });
  }
})();
