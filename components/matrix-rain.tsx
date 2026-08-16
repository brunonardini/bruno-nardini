'use client';

import { useEffect, useRef } from 'react';

const CHARSET =
  'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const FONT_SIZE = 14;

function readToken(name: string, fallback: string) {
  return (
    getComputedStyle(document.documentElement).getPropertyValue(name).trim() ||
    fallback
  );
}

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    const rainColor = readToken('--md-sys-color-hero-rain', '#ffffff');
    const fadeColor = readToken(
      '--md-sys-color-hero-rain-fade',
      'rgb(0 0 0 / 0.04)',
    );
    const mono = readToken('--font-mono', 'monospace');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    let drops: number[] = [];
    let frameId = 0;
    let lastFrame = 0;
    let cssWidth = 0;
    let cssHeight = 0;
    let running = false;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      cssWidth = rect.width;
      cssHeight = rect.height;
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const columns = Math.max(1, Math.floor(cssWidth / FONT_SIZE));
      drops = Array.from({ length: columns }, () =>
        Math.floor(Math.random() * (cssHeight / FONT_SIZE)),
      );
      context.fillStyle = '#000000';
      context.fillRect(0, 0, cssWidth, cssHeight);
    };

    const drawFrame = () => {
      context.fillStyle = fadeColor;
      context.fillRect(0, 0, cssWidth, cssHeight);
      context.fillStyle = rainColor;
      context.font = `${FONT_SIZE}px ${mono}`;
      context.textBaseline = 'top';

      for (let column = 0; column < drops.length; column += 1) {
        const glyph = CHARSET[Math.floor(Math.random() * CHARSET.length)];
        context.fillText(glyph, column * FONT_SIZE, drops[column] * FONT_SIZE);

        if (drops[column] * FONT_SIZE > cssHeight && Math.random() > 0.975) {
          drops[column] = 0;
        } else {
          drops[column] += 1;
        }
      }
    };

    const tick = (timestamp: number) => {
      if (timestamp - lastFrame >= 50) {
        lastFrame = timestamp;
        drawFrame();
      }
      frameId = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || reducedMotion.matches) {
        return;
      }
      running = true;
      lastFrame = 0;
      frameId = window.requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      window.cancelAnimationFrame(frameId);
    };

    const syncPlayback = () => {
      const visible =
        document.visibilityState === 'visible' &&
        canvas.getBoundingClientRect().height > 0;
      if (visible) {
        start();
      } else {
        stop();
      }
    };

    resize();
    drawFrame();
    syncPlayback();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    document.addEventListener('visibilitychange', syncPlayback);
    reducedMotion.addEventListener('change', syncPlayback);

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener('visibilitychange', syncPlayback);
      reducedMotion.removeEventListener('change', syncPlayback);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-rain" aria-hidden />;
}
