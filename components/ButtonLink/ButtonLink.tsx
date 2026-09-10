import Link from 'next/link';
import css from './ButtonLink.module.css';

interface ButtonLinkProps {
  href: string;
  label: string;
  maxWidth?: number;
}

const ButtonLink = ({ href, label, maxWidth }: ButtonLinkProps) => {
  return (
    <Link
      href={href}
      className={`${css.buttonLinkBlue} bodyMdStrong`}
      style={{ maxWidth: maxWidth ? `${maxWidth}px` : 'none' }}
    >
      {label}
    </Link>
  );
};

export default ButtonLink;
 