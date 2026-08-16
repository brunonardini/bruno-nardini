import Link from 'next/link';
import type { ReactNode } from 'react';

type OutlinedButtonProps = {
  href: string;
  size?: 'default' | 'large';
  children: ReactNode;
};

export function OutlinedButton({
  href,
  size = 'default',
  children,
}: OutlinedButtonProps) {
  return (
    <Link
      href={href}
      className={`md-outlined-button md-typescale-label-large focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-surface ${
        size === 'large' ? 'md-outlined-button-large' : ''
      }`}
    >
      {children}
      <svg className="md-outlined-button-icon" viewBox="0 0 24 24" aria-hidden>
        <path
          fill="currentColor"
          d="M12 4 10.59 5.41 16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
        />
      </svg>
    </Link>
  );
}
