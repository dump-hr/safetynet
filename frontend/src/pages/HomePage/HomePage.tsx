import { useState } from 'react';
import { clsx } from 'clsx';
import styles from './index.module.scss';
import useTimeout from '@hooks/useTimeout/index';

enum Pages {
  Homepage,
  Menu,
  Quiz,
  Settings,
  ReadingMaterials,
  Parents,
  Leaderboard,
  About,
}

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(Pages.Homepage);
  const [hasSplashAnimationEnded, setHasSplashAnimationEnded] = useState(false);

  useTimeout(() => {
    setHasSplashAnimationEnded(true);
    setCurrentPage(Pages.Menu);
  }, 2000);

  switch (currentPage) {
    case Pages.Quiz:
    case Pages.Settings:
    case Pages.ReadingMaterials:
    case Pages.Parents:
    case Pages.Leaderboard:
    case Pages.About:
    case Pages.Menu:
      return (
        <div className={styles.content}>
          <div
            className={clsx(
              styles.content__container,
              styles.animations__enabled
            )}
          >
            <h1 className={styles.content__logo}>SafetyNet</h1>
            <div className={styles.content__info__frame}>
              <span className={styles.content__info__highlight}>
                {'Jeste li znali: '}
              </span>
              Prosječnu osobu hakerski napad oštetit će za oko 1000 kuna.
            </div>
            <div className={styles.content__menu}>
              <div className={styles.menu__container}>
                <div className={styles.menu__item}>Igraj</div>
                <div className={styles.menu__item}>Postavke</div>
                <div className={styles.menu__item}>Materijali za učenje</div>
                <div className={styles.menu__item}>Kutak za roditelje</div>
                <div className={styles.menu__item}>Ljestvica</div>
                <div className={styles.menu__item}>O igri</div>
                <div
                  className={clsx(styles.menu__item, styles.menu__red__button)}
                >
                  Red button
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case Pages.Homepage:
    default:
      return (
        <div className={clsx(styles.content, styles.animations__enabled)}>
          <div className={styles.splash}>
            <div className={styles.splash__content}>
              <h1 className={clsx(styles.content__logo, styles.splash__logo)}>
                SafetyNet
              </h1>
              <div className={styles.splash__text__container}>
                <h2 className={styles.splash__moto}>Igraj. Uči. Pobjedi</h2>
                <h3 className={styles.splash__text}>
                  Pokaži svoje znanje i zavladaj SafetyNet kvizom o sigurnosti
                  na Internetu.
                </h3>
              </div>
            </div>
          </div>
        </div>
      );
  }
};

export default HomePage;
