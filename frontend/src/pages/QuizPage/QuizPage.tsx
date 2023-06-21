import { Link } from 'react-router-dom';
import styles from './index.module.scss';
import { Page, routes } from '@/App';

const QuizPage = () => {
  return (
    <div className={styles.content}>
      <div className={styles.content__container}>
        <h1 className={styles.content__logo}>SafetyNet</h1>
        <div className={styles.content__menu}>
          <div className={styles.menu__container}>
            <a href="#">
              <div className={styles.menu__item}>Početna</div>
            </a>
            <a href="#">
              <div className={styles.menu__item}>Napredna</div>
            </a>
            <Link to={routes[Page.Home]}>
              <div ui-sref="home" className={styles.menu__item}>
                Nazad
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
