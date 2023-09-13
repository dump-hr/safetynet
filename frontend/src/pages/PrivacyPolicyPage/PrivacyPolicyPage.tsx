import { Link } from 'react-router-dom';
import styles from './index.module.scss';
import { Page, routes } from '@/App';

const PrivacyPolicyPage = () => {
  return (
    <div className={styles.about}>
      <div className={styles.about__wrapper}>
        <h1 className={styles.about__header}>Privacy Policy</h1>
        <div className={styles.about__container}>
          <div className={styles.about__content}>
            <div className={styles.content__logo}>SafetyNet</div>
            <div className={styles.about__text}>
              <p>need content</p>
            </div>
            <Link to={routes[Page.Home]} className={styles.about__return}>
              Povratak
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
