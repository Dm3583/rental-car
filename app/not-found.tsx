import css from './not-found.module.css';

const NotFound = () => {
  return (
    <div className='container'>
      <div className={css.textWrapper}>
        <h1 className={css.title}>404 - Page not found</h1>
        <p className={css.text}>
          Sorry, the page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
