import { Page, routes } from '@/App';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';
import clsx from 'clsx';
import materials from './materials.json';
import links from './links.json';

const ParentsPage = () => {
  return (
    <div className={clsx(styles.content, styles.animations__enabled)}>
      <div className={styles.parents__materials__container}>
        <span className={styles.title}>Kutak za roditelje</span>
        <div className={styles.parents__container}>
          <div className={styles.parents__content}>
            <div className={styles.parents__content__left}>
              {materials.map((material, index) => (
                <div key={index} className={styles.left__item}>
                  <a
                    className={styles.left__item__inner}
                    href={material.DownloadUrl}
                    target="_blank"
                  >
                    <img
                      className={styles.left__item__image}
                      src={material.IconUrl}
                    />
                    <div className={styles.left__item__title}>
                      {material.Title}
                    </div>
                  </a>
                </div>
              ))}
            </div>
            <div className={styles.parents__content__right}>
              <span className={styles.parents__content__right__title}>
                Korisne poveznice
              </span>
              <ul className={styles.right__item}>
                {links.map((link, index) => (
                  <li key={index} className={styles.right__item}>
                    <a href={link.DownloadUrl} target="_blank">
                      <span className={styles.right__item}>{link.Title}</span>
                    </a>
                  </li>
                ))}
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
