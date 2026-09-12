'use client';

import { useState, useRef, useEffect, useId } from 'react';
import Image from 'next/image';
import css from './CustomDropdown.module.css';

export interface Option {
  value: string;
  label: string;
}

type CssSize = `${number}px` | `${number}%` | `${number}rem`;

interface CustomDropdownProps<TName extends string = string> {
  options: Option[];
  label: string;
  name: TName;
  value?: string;
  valuePrefix?: string;
  placeholder?: string;
  resetLabel?: string;
  width?: CssSize;
  maxWidth?: CssSize;
  disabled?: boolean;
  onChange: (name: TName, value: string) => void;
}

const CustomDropdown = <TName extends string = string>({
  options,
  label,
  name,
  value,
  placeholder = 'Choose an option',
  resetLabel,
  width,
  maxWidth,
  valuePrefix,
  disabled = false,
  onChange,
}: CustomDropdownProps<TName>) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const isOpen = isMenuOpen && !disabled;

  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const id = useId();
  const labelId = `${id}-label`;
  const triggerId = `${id}-trigger`;
  const listboxId = `${id}-listbox`;
  const optionId = (index: number) => `${id}-option-${index}`;

  const allOptions: Option[] = resetLabel
    ? [{ value: '', label: resetLabel }, ...options]
    : options;

  // '' and undefined both mean "nothing chosen".
  const hasValue = Boolean(value);
  const selectedIndex = allOptions.findIndex(
    (option) => option.value === (value ?? ''),
  );
  const selectedOption =
    selectedIndex === -1 ? undefined : allOptions[selectedIndex];

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || activeIndex < 0) return;

    const activeOption = listRef.current?.children[activeIndex];
    activeOption?.scrollIntoView({ block: 'nearest' });
  }, [isOpen, activeIndex]);

  const open = () => {
    if (disabled) return;

    setActiveIndex(selectedIndex === -1 ? 0 : selectedIndex);
    setIsMenuOpen(true);
  };

  const close = () => {
    setIsMenuOpen(false);
    setActiveIndex(-1);
  };

  const moveActive = (delta: number) => {
    setActiveIndex((prev) => {
      const next = prev + delta;

      if (next < 0) return allOptions.length - 1;
      if (next >= allOptions.length) return 0;

      return next;
    });
  };

  const handleSelect = (val: string) => {
    onChange(name, val);
    close();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (isOpen) moveActive(1);
        else open();
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) moveActive(-1);
        else open();
        break;

      case 'Home':
        if (isOpen) {
          e.preventDefault();
          setActiveIndex(0);
        }
        break;

      case 'End':
        if (isOpen) {
          e.preventDefault();
          setActiveIndex(allOptions.length - 1);
        }
        break;

      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!isOpen) {
          open();
        } else if (activeIndex >= 0) {
          handleSelect(allOptions[activeIndex].value);
        }
        break;

      case 'Escape':
        if (isOpen) {
          e.preventDefault();
          close();
        }
        break;

      case 'Tab':
        if (isOpen) close();
        break;
    }
  };

  return (
    <div
      className={css.dropdownWrapper}
      style={
        {
          '--dropdown-width': width,
          '--dropdown-max-width': maxWidth,
        } as React.CSSProperties
      }
    >
      <span id={labelId} className={`${css.label} bodySm`}>
        {label}
      </span>
      <div className={css.dropdown} ref={dropdownRef}>
        <button
          type='button'
          id={triggerId}
          role='combobox'
          className={css.trigger}
          disabled={disabled}
          onClick={() => (isOpen ? close() : open())}
          onKeyDown={handleKeyDown}
          aria-haspopup='listbox'
          aria-expanded={isOpen}
          aria-controls={isOpen ? listboxId : undefined}
          aria-labelledby={labelId}
          aria-activedescendant={
            isOpen && activeIndex >= 0 ? optionId(activeIndex) : undefined
          }
        >
          <span
            className={[!hasValue && css.placeholder, 'bodyMd']
              .filter(Boolean)
              .join(' ')}
          >
            {valuePrefix && hasValue ? valuePrefix : ''}
            {hasValue && selectedOption ? selectedOption.label : placeholder}
          </span>

          <Image
            src='/arrowDown.svg'
            alt=''
            width={16}
            height={16}
            aria-hidden
            className={isOpen ? css.arrowOpen : css.arrow}
          />
        </button>

        {isOpen && (
          <ul
            id={listboxId}
            ref={listRef}
            className={css.menu}
            role='listbox'
            aria-labelledby={labelId}
          >
            {allOptions.map((option, index) => {
              const isSelected = index === selectedIndex;
              const isActive = index === activeIndex;

              return (
                <li
                  key={option.value}
                  id={optionId(index)}
                  role='option'
                  aria-selected={isSelected}
                  className={[
                    css.option,
                    isSelected && css.selected,
                    isActive && css.active,
                    'bodyMd',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  // Keep focus on the trigger so aria-activedescendant stays valid.
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CustomDropdown;
