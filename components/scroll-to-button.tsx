'use client';

import type { ReactNode } from 'react';

type ScrollToButtonProps = {
  targetId: string;
  className?: string;
  children: ReactNode;
};

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (!element) {
    return;
  }

  const margin =
    Number.parseFloat(getComputedStyle(element).scrollMarginTop) || 0;
  const target = element.getBoundingClientRect().top + window.scrollY - margin;
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  window.history.pushState(null, '', `#${id}`);

  if (reduceMotion) {
    window.scrollTo({ top: target, behavior: 'instant' });
    return;
  }

  const start = window.scrollY;
  const distance = target - start;
  const duration = Math.min(800, Math.max(400, Math.abs(distance) * 0.4));
  const startTime = performance.now();

  const step = (time: number) => {
    const progress = Math.min(1, (time - startTime) / duration);
    window.scrollTo({
      top: start + distance * progress,
      behavior: 'instant',
    });

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
}

export function ScrollToButton({
  targetId,
  className,
  children,
}: ScrollToButtonProps) {
  return (
    <a
      href={`#${targetId}`}
      className={`md-tonal-button md-typescale-label-large focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-surface ${className ?? 'w-full'}`}
      onClick={(event) => {
        event.preventDefault();
        scrollToSection(targetId);
      }}
    >
      {children}
      <svg className="md-outlined-button-icon" viewBox="0 0 24 24" aria-hidden>
        <path
          fill="currentColor"
          d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"
        />
      </svg>
    </a>
  );
}
