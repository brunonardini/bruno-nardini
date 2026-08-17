'use client';

import { scrollToPageTop } from '@/lib/scroll-to-top';
import { useEffect } from 'react';

export function ScrollToTopOnMount() {
  useEffect(() => {
    const toTop = () => scrollToPageTop('instant');

    toTop();

    let innerId = 0;
    const outerId = requestAnimationFrame(() => {
      innerId = requestAnimationFrame(toTop);
    });
    const timer = window.setTimeout(toTop, 0);

    return () => {
      cancelAnimationFrame(outerId);
      cancelAnimationFrame(innerId);
      window.clearTimeout(timer);
    };
  }, []);

  return null;
}
