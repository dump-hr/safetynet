import { Page, routes } from '@/App';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';
import clsx from 'clsx';

const ParentsPage = () => {
  return (
    <div className={clsx(styles.content, styles.animations__enabled)}>
      <div className={styles.parents__materials__container}>
        <span className={styles.title}>Kutak za roditelje</span>
        <div className={styles.parents__container}>
          <div className={styles.parents__content}>
            <div className={styles.parents__content__left}>
              {/* loop svih materijala */}
              <div className={styles.left__item}>
                <a
                  className={styles.left__item__inner}
                  href="/Assets/Documents/zabavni_sadrzaj_na_internetu.pdf"
                  target="_blank"
                >
                  <div
                    className={styles.left__item__image}
                    style={{
                      backgroundImage: '/study-material.jpg',
                    }}
                  ></div>
                  <div className={styles.left__item__title}>
                    Zabavni sadržaji kao izvor opasnosti
                  </div>
                </a>
              </div>
              {/* end loop svih materijala */}
            </div>
            <div className={styles.parents__content__right}>
              <span className={styles.parents__content__right__title}>
                Korisne poveznice
              </span>
              <ul className={styles.right__item}>
                {/* loop korisnih linkova */}
                <li className={styles.right__item}>
                  <a
                    href="http://www.sigurnijiinternet.hr/djeca/kviz-sigurnost/"
                    target="_blank"
                  >
                    <span className={styles.right__item}>Kviz</span>
                  </a>
                </li>
                {/* end loop korisnih linkova */}
              </ul>
            </div>
          </div>
          <Link to={routes[Page.Home]}>
            <div className={clsx(styles.menu__item, styles.parents__button)}>
              Povratak
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ParentsPage;
