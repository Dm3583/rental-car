import css from './Button.module.css';

interface ButtonProps {
  label: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'filled' | 'outlined';
  maxWidth?: number;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({
  label,
  onClick,
  maxWidth,
  disabled = false,
  type = 'button',
  variant = 'filled',
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      style={maxWidth ? { maxWidth } : undefined}
      className={`${variant === 'filled' ? css.buttonFilled : css.buttonOutlined} ${css.buttonBase} bodyMdStrong`}
    >
      {label}
    </button>
  );
};

export default Button;
