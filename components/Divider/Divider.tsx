import css from './Divider.module.css';

interface DividerProps {
  color?: string;
  marginTop?: number;
  marginBottom?: number;
  thickness?: number;
}

export default function Divider({
  color = 'var(--color-gray-light)',
  marginTop = 24,
  marginBottom = 24,
  thickness = 1,
}: DividerProps) {
  return (
    <hr
      className={css.divider}
      style={{
        backgroundColor: color,
        height: `${thickness}px`,
        marginTop: `${marginTop}px`,
        marginBottom: `${marginBottom}px`,
      }}
    />
  );
}
