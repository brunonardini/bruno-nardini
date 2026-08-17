'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, type FormEvent } from 'react';

type SearchBarProps = {
  query?: string;
};

export function SearchBar({ query = '' }: SearchBarProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const input = inputRef.current;
    if (!input || document.activeElement === input) {
      return;
    }

    if (input.value !== query) {
      input.value = query;
    }
  }, [query]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const nextQuery = String(formData.get('q') ?? '').trim();
    const href = nextQuery
      ? `/busca?q=${encodeURIComponent(nextQuery)}`
      : '/busca';

    router.push(href, { scroll: false });
    inputRef.current?.focus();
  }

  return (
    <form
      role="search"
      aria-label="Buscar artigos"
      className="md-search"
      onSubmit={handleSubmit}
    >
      <label className="md-search-field">
        <svg className="md-search-icon" viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          />
        </svg>
        <span className="sr-only">Buscar artigos</span>
        <input
          ref={inputRef}
          type="search"
          name="q"
          defaultValue={query}
          placeholder="Buscar artigos"
          autoComplete="off"
          autoFocus
          enterKeyHint="search"
          className="md-search-input md-typescale-body-large"
        />
      </label>
      <button
        type="submit"
        className="md-filled-button md-search-submit md-typescale-label-large focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-primary-container"
      >
        Buscar
      </button>
    </form>
  );
}
