import { Link } from 'react-router-dom';
import styles from './index.module.scss';
import { Page, routes } from '@/App';

const AboutPage = () => {
  return (
    <div className={styles.about}>
      <div className={styles.about__wrapper}>
        <h1 className={styles.about__header}>O Igri</h1>
        <div className={styles.about__container}>
          <div className={styles.about__content}>
            <div className={styles.content__logo}>SafetyNet</div>
            <div className={styles.about__text}>
              <p>
                SafetyNet je zabava za cijelu obitelj! Igrajući kviz učite o
                sigurnosti, ponašanju na Internetu, društvenim mrežama i ostalim
                aktualnim temama. Da bismo potakli i najmlađe da se uključe u
                utrku znanja, prilagodili smo materijale uzrastu od 5. do 8.
                razreda osnovne škole. Potičemo roditelje da zajedno s djecom
                igraju kviz, produbljujući znanje o sigurnosti na sveprisutnom
                Internetu.
              </p>
              <p>
                Ažuriranjem materijala kroz napredni kviz znanja i nove
                edukativne sadržaje uz prilagodbu za igranje na pametnim
                telefonima osigurana je mgućnost većeg korištenja i
                srednjoškolcima i njihovim roditeljima. Potičemo roditelje da
                zajedno s djecom igraju kviz, produbljujući znanje o sigurnosti
                na sveprisutnom Internetu.
              </p>
              <p>
                Za one koji žele znati više uključili smo i materijale za
                učenje, a za roditelje smo pripremili kutak u kojem mogu pronaći
                sadržaje već objavljene na Internetu koji više govore o
                pojedinoj temi.
              </p>
              <p>
                Projekt je nastao na inicijativu Policijske Uprave
                Splitsko-dalmatinske, suradnjom Fakulteta elektrotehnike
                strojarstva i brodogradnje u Splitu te članova DUMP Udruge
                mladih programera uz potporu grada Splita. Temeljen je
                isključivo na dobroj volji volontera koji su radili na njemu.
              </p>
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

export default AboutPage;
