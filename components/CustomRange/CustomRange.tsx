import { useId, useState } from 'react';
import css from './CustomRange.module.css';

interface CustomRangeProps {
  label: string;
  valueFrom?: string;
  valueTo?: string;
  width?: string;
  maxWidth?: string;
  minWidth?: string;
  onChangeFrom?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTo?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  forceShowError?: boolean;
}

const CustomRange = ({
  width,
  maxWidth,
  minWidth,
  label,
  valueFrom,
  valueTo,
  onChangeFrom,
  onChangeTo,
  error,
  forceShowError = false,
}: CustomRangeProps) => {
  const id = useId();
  const labelId = `${id}-label`;
  const fromId = `${id}-from`;
  const toId = `${id}-to`;
  const errorId = `${id}-error`;

  const [isFocusWithin, setIsFocusWithin] = useState(false);
  const showError = Boolean(error) && (forceShowError || !isFocusWithin);

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setIsFocusWithin(false);
  };

  return (
    <div
      className={css.customRange}
      style={
        {
          '--custom-range-width': width,
          '--custom-range-max-width': maxWidth,
          '--custom-range-min-width': minWidth,
        } as React.CSSProperties
      }
    >
      <span id={labelId} className={`${css.label} bodySm`}>
        {label}
      </span>
      <div
        className={css.inputWrapper}
        onFocus={() => setIsFocusWithin(true)}
        onBlur={handleBlur}
      >
        <span id={fromId} hidden>
          From
        </span>
        <input
          type='text'
          inputMode='numeric'
          pattern='[0-9]*'
          autoComplete='off'
          aria-labelledby={`${labelId} ${fromId}`}
          aria-invalid={showError || undefined}
          aria-describedby={showError ? errorId : undefined}
          className={`${css.inputNumberFrom} ${css.inputNumber} bodyMd`}
          placeholder='From'
          value={valueFrom ?? ''}
          onChange={onChangeFrom}
        />

        <span id={toId} hidden>
          To
        </span>
        <input
          type='text'
          inputMode='numeric'
          pattern='[0-9]*'
          autoComplete='off'
          aria-labelledby={`${labelId} ${toId}`}
          aria-invalid={showError || undefined}
          aria-describedby={showError ? errorId : undefined}
          className={`${css.inputNumberTo} ${css.inputNumber} bodyMd`}
          placeholder='To'
          value={valueTo ?? ''}
          onChange={onChangeTo}
        />
      </div>
      {showError && (
        <p id={errorId} className={`${css.error} bodySm`} role='alert'>
          {error}
        </p>
      )}
    </div>
  );
};

export default CustomRange;
