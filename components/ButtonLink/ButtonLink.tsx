import Link from 'next/link';
import css from './ButtonLink.module.css';

interface ButtonLinkProps {
  href: string;
  label: string;
  maxWidth?: number;
  newTab?: boolean;
}

const ButtonLink = ({
  href,
  label,
  maxWidth,
  newTab = false,
}: ButtonLinkProps) => {
  return (
    <Link
      href={href}
      className={`${css.buttonLinkBlue} bodyMdStrong`}
      style={{ maxWidth: maxWidth ? `${maxWidth}px` : 'none' }}
      target={newTab ? '_blank' : undefined}
      rel={newTab ? 'noopener noreferrer' : undefined}
    >
      {label}
    </Link>
  );
};

export default ButtonLink;
