import { useId } from 'react';
import { BsExclamationCircle } from 'react-icons/bs';
import css from './CustomTextarea.module.css';

interface CustomTextareaProps {
  name: string;
  label?: string;
  value?: string;
  placeholder?: string;
  defaultValue?: string;
  height?: number;
  isError?: boolean;
  errorMessage?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function CustomTextarea({
  name,
  label,
  value,
  onChange,
  isError = false,
  errorMessage,
  placeholder,
  height,
  defaultValue,
}: CustomTextareaProps) {
  const id = useId();
  const messageId = `${id}-message`;

  return (
    <div className={css.textareaWrapper}>
      <div
        className={css.field}
        style={
          {
            '--textarea-height': height ? `${height}px` : undefined,
          } as React.CSSProperties
        }
      >
        <textarea
          className={[css.customTextarea, isError && css.error]
            .filter(Boolean)
            .join(' ')}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          defaultValue={defaultValue}
          aria-label={label}
          aria-invalid={isError || undefined}
          aria-describedby={errorMessage ? messageId : undefined}
        />
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
