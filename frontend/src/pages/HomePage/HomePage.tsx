import { useState } from 'react';
import { clsx } from 'clsx';
import styles from './index.module.scss';
import useTimeout from '@hooks/useTimeout/index';
import { Link } from 'react-router-dom';
import { Page, routes } from '@/App';

const safetyFacts = [
  '95% hakerskih napada događa se zbog ljudske greške.',
  'Nedavno je hakiran mobitel osnivača Amazona Jeff Bezosa.',
  'Dnevno se proizvede 300 000 novih virusa.',
  'Svako 39 sekundi dogodi se pokušaj hakiranja.',
  'WannaCry softver zarazio je 230.000 računala u 150 država - na svoj prvi dan.',
  'Jedna britanska tvrtka izgubila je 45 milijuna funti zbog hakerskog napada.',
  'Tvrtku FedEx jedan hakerski napad koštao je 400 milijuna dolara.',
  'Prosječnu osobu hakerski napad oštetit će za oko 1000 kuna.',
  '94% napada događa se putem e-maila - oprezno!',
  '35% lozinki jednostavne su za hakirati.',
  'Lady Gaga i Emma Watson samo su neke od hakiranih poznatih osoba.',
];

const HomePage = () => {
  const [hasSplashAnimationEnded, setHasSplashAnimationEnded] = useState(true);

  useTimeout(() => {
    setHasSplashAnimationEnded(true);
  }, 2000);

  if (!hasSplashAnimationEnded) {
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
                Pokaži svoje znanje i zavladaj SafetyNet kvizom o sigurnosti na
                Internetu.
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.content}>
      <div
        className={clsx(styles.content__container, styles.animations__enabled)}
      >
        <h1 className={styles.content__logo}>SafetyNet</h1>
        <div className={styles.content__info__frame}>
          <span className={styles.content__info__highlight}>
            Jeste li znali:{' '}
          </span>
          {safetyFacts[Math.floor(Math.random() * safetyFacts.length)]}
        </div>
        <div className={styles.content__menu}>
          <div className={styles.menu__container}>
            <Link to={routes[Page.Quiz]}>
              <div className={styles.menu__item}>Igraj</div>
            </Link>
            <Link to={routes[Page.Materials]}>
              <div className={styles.menu__item}>Materijali za učenje</div>
            </Link>
            <Link to={routes[Page.Parents]}>
              <div className={styles.menu__item}>Kutak za roditelje</div>
            </Link>
            <Link to={routes[Page.Leaderboard]}>
              <div className={styles.menu__item}>Ljestvica</div>
            </Link>
            <Link to={routes[Page.About]}>
              <div className={styles.menu__item}>O igri</div>
            </Link>
            <Link to="https://dump.hr/internship" target="_blank">
              <div className={styles.menu__item}>DUMP Internship</div>
            </Link>
            <Link to="https://redbutton.gov.hr/" target="_blank">
              <div
                className={clsx(styles.menu__item, styles.menu__red__button)}
              >
                Red button
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
