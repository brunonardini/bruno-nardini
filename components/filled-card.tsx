import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

type FilledCardProps = {
  href: string;
  image?: string;
  children: ReactNode;
};

export function FilledCard({ href, image, children }: FilledCardProps) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col text-on-surface focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-surface"
    >
      {image ? (
        <div className="relative aspect-video overflow-hidden rounded-md bg-surface-container">
          <Image
            src={image}
            alt=""
            fill
            className="object-cover transition-opacity group-hover:opacity-90 group-active:opacity-80"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>
      ) : null}
      <div
        className={image ? 'mt-5 flex flex-1 flex-col' : 'flex flex-1 flex-col'}
      >
        {children}
      </div>
    </Link>
  );
}
