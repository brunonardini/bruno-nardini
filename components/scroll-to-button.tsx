'use client';

import type { ReactNode } from 'react';

type ScrollToButtonProps = {
  targetId: string;
  children: ReactNode;
};

function easeInOutCubic(progress: number) {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - (2 - 2 * progress) ** 3 / 2;
}

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (!element) {
    return;
  }

  const margin = Number.parseFloat(getComputedStyle(element).scrollMarginTop) || 0;
  const target = element.getBoundingClientRect().top + window.scrollY - margin;
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  window.history.pushState(null, '', `#${id}`);

  if (reduceMotion) {
    window.scrollTo(0, target);
    return;
  }

  const start = window.scrollY;
  const distance = target - start;
  const duration = Math.min(1100, Math.max(560, Math.abs(distance) * 0.5));
  let startTime: number | null = null;

  const step = (time: number) => {
    if (startTime === null) {
      startTime = time;
    }

    const progress = Math.min(1, (time - startTime) / duration);
    window.scrollTo(0, start + distance * easeInOutCubic(progress));

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
}

export function ScrollToButton({ targetId, children }: ScrollToButtonProps) {
  return (
    <a
      href={`#${targetId}`}
      className="md-tonal-button md-typescale-label-large w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-surface"
      onClick={(event) => {
        event.preventDefault();
        scrollToSection(targetId);
      }}
    >
      {children}
      <svg
        className="md-outlined-button-icon"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path
          fill="currentColor"
          d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"
        />
      </svg>
    </a>
  );
}
