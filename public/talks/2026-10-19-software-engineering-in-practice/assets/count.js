(() => {
  const fmt = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const label = (v) => `US$ ${fmt.format(v)}`;
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  const DURATION = 1400;

  const instant = () =>
    document.body.classList.contains("embed") || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function start(el) {
    cancelAnimationFrame(el._raf);
    clearTimeout(el._timer);
    const target = Number(el.dataset.count);
    if (instant()) {
      el.textContent = label(target);
      return;
    }
    const run = () => {
      const t0 = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - t0) / DURATION);
        el.textContent = label(target * easeOutCubic(t));
        if (t < 1) el._raf = requestAnimationFrame(tick);
      };
      el._raf = requestAnimationFrame(tick);
    };
    // data-count-delay: ms to wait (e.g. for the step's other transitions) before counting
    const delay = Number(el.dataset.countDelay) || 0;
    if (delay) el._timer = setTimeout(run, delay);
    else run();
  }

  function stop(el) {
    cancelAnimationFrame(el._raf);
    clearTimeout(el._timer);
    el.textContent = "";
  }

  const els = [...document.querySelectorAll("[data-count]")];
  els.forEach((el) => {
    el._on = el.classList.contains("on");
    if (el._on) el.textContent = label(Number(el.dataset.count));
  });

  new MutationObserver((records) => {
    records.forEach(({ target: el }) => {
      if (!el.dataset || !("count" in el.dataset)) return;
      const on = el.classList.contains("on");
      if (on === el._on) return;
      el._on = on;
      if (on) start(el);
      else stop(el);
    });
  }).observe(document.body, { subtree: true, attributes: true, attributeFilter: ["class"] });
})();
