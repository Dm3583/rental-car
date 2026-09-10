import { useId } from 'react';
import css from './CustomRange.module.css';

interface CustomRangeProps {
  label: string;
  valueFrom?: number;
  valueTo?: number;
  width?: string;
  maxWidth?: string;
  minWidth?: string;
  onChangeFrom?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTo?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
}: CustomRangeProps) => {
  const id = useId();
  const labelId = `${id}-label`;
  const fromId = `${id}-from`;
  const toId = `${id}-to`;

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
      <div className={css.inputWrapper}>
        <span id={fromId} hidden>
          From
        </span>
        <input
          type='number'
          aria-labelledby={`${labelId} ${fromId}`}
          className={`${css.inputNumberFrom} ${css.inputNumber} bodyMd`}
          placeholder='From'
          value={valueFrom ?? ''}
          onChange={onChangeFrom}
        />

        <span id={toId} hidden>
          To
        </span>
        <input
          type='number'
          aria-labelledby={`${labelId} ${toId}`}
          className={`${css.inputNumberTo} ${css.inputNumber} bodyMd`}
          placeholder='To'
          value={valueTo ?? ''}
          onChange={onChangeTo}
        />
      </div>
    </div>
  );
};

export default CustomRange;
