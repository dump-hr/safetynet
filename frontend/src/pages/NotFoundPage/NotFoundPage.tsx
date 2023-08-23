import { Link } from 'react-router-dom';
import styles from './index.module.scss';
import { Page, routes } from '@/App';

const NotFoundPage = () => {
  return (
    <div className={styles.content}>
      <div className={styles.content__container}>
        <h1 className={styles.content__logo}>SafetyNet</h1>
        <div className={styles.content__menu}>
          <div className={styles.menu__container}>
            <h2 className={styles.error}>Stranica nije pronađena :/</h2>
            <Link to={routes[Page.Home]}>
              <div className={styles.menu__item}>&larr; Nazad</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
