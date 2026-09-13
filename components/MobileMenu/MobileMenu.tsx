'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { RxCross2, RxHamburgerMenu } from 'react-icons/rx';
import { NAVIGATION_LINKS } from '../Header/navigation';
import css from './MobileMenu.module.css';

const DESKTOP_QUERY = '(min-width: 768px)';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      if (wasOpenRef.current) openButtonRef.current?.focus();
      wasOpenRef.current = false;
      return;
    }

    wasOpenRef.current = true;
    closeButtonRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    const desktop = window.matchMedia(DESKTOP_QUERY);
    const handleBreakpoint = (e: MediaQueryListEvent) => {
      if (e.matches) setIsOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    desktop.addEventListener('change', handleBreakpoint);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      desktop.removeEventListener('change', handleBreakpoint);
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <>
      <button
        ref={openButtonRef}
        type='button'
        className={css.burger}
        aria-label='Open menu'
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen(true)}
      >
        <RxHamburgerMenu className={css.icon} aria-hidden />
      </button>

      <div
        id={panelId}
        className={[css.panel, isOpen && css.panelOpen]
          .filter(Boolean)
          .join(' ')}
        role='dialog'
        aria-modal='true'
        aria-label='Main menu'
        inert={!isOpen}
      >
        <button
          ref={closeButtonRef}
          type='button'
          className={css.close}
          aria-label='Close menu'
          onClick={close}
        >
          <RxCross2 className={css.icon} aria-hidden />
        </button>

        <nav aria-label='Mobile navigation'>
          <ul className={css.list}>
            {NAVIGATION_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`title3 ${css.link}`}
                  onClick={close}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
