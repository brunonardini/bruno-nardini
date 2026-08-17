export function scrollToPageTop(behavior: ScrollBehavior = 'smooth') {
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  window.scrollTo({
    top: 0,
    behavior: reduceMotion ? 'instant' : behavior,
  });
}
