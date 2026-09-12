import css from './LoadingOverlay.module.css';

interface LoadingOverlayProps {
  title: string;
  description?: string;
  fullScreen?: boolean;
}

const LoadingOverlay = ({
  title,
  description,
  fullScreen = false,
}: LoadingOverlayProps) => {
  return (
    <div
      className={[css.backdrop, fullScreen && css.fullScreen]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={css.modal} role='status'>
        <svg className={css.spinner} viewBox='0 0 72 72' aria-hidden>
          <circle
            className={css.spinnerTrack}
            cx='36'
            cy='36'
            r='33'
            fill='none'
            strokeWidth='6'
          />
          <circle
            className={css.spinnerArc}
            cx='36'
            cy='36'
            r='33'
            fill='none'
            strokeWidth='6'
          />
        </svg>
        <div className={css.textBlock}>
          <p className='title2'>{title}</p>
          {description && (
            <p className={`${css.description} bodyMd`}>{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
