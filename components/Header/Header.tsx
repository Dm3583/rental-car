import Image from 'next/image';
import Link from 'next/link';
import css from './Header.module.css';

const NAVIGATION_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/catalog', label: 'Catalog' },
];

const Header = () => {
  return (
    <header className={css.header}>
      <div className={'container ' + css.headerWrapper}>
        <Link href='/' aria-label='Home' className={css.logo}>
          <Image
            src='/Logo.svg'
            alt='Rental Car'
            width={104}
            height={16}
            priority
          />
        </Link>

        <nav aria-label='Main Navigation'>
          <ul className={css.navList}>
            {NAVIGATION_LINKS.map(({ href, label }) => (
              <li key={href} className={css.navItem}>
                <Link href={href} className={`bodyMd ${css.navLink}`}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
