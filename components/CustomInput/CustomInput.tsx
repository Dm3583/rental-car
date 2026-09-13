import { useId } from 'react';
import { BsExclamationCircle } from 'react-icons/bs';
import css from './CustomInput.module.css';

interface CustomInputProps {
  name: string;
  label: string;
  value?: string;
  placeholder?: string;
  defaultValue?: string;
  type?: string;
  isError?: boolean;
  errorMessage?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CustomInput({
  name,
  label,
  value,
  onChange,
  isError = false,
  errorMessage,
  placeholder,
  type = 'text',
  defaultValue,
}: CustomInputProps) {
  const id = useId();
  const inputId = `${id}-input`;
  const messageId = `${id}-message`;

  return (
    <div className={css.inputWrapper}>
      <div className={css.field}>
        <input
          id={inputId}
          className={[css.customInput, isError && css.error]
            .filter(Boolean)
            .join(' ')}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder ?? ' '}
          defaultValue={defaultValue}
          aria-invalid={isError || undefined}
          aria-describedby={errorMessage ? messageId : undefined}
        />
        <label htmlFor={inputId} className={css.inputLabelChip}>
          {label}
        </label>
        {isError && (
          <BsExclamationCircle className={css.errorIcon} aria-hidden />
        )}
      </div>
      {isError && errorMessage && (
        <span id={messageId} className={`${css.errorMessage} bodySm`}>
          {errorMessage}
        </span>
      )}
    </div>
  );
}
