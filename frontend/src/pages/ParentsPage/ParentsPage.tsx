import { Page, routes } from '@/App';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';
import clsx from 'clsx';
import { useState } from 'react';

const ParentsPage = () => {
  const storageBaseUrl = 'https://safetynet-kviz.skole.hr/Assets/';
  const documentsStorageUrl = `${storageBaseUrl}Documents/`;
  const imagesStorageUrl = `${storageBaseUrl}Images/ParentsSection/`;

  const [materials, setMaterials] = useState([
    {
      document: 'zabavni_sadrzaj_na_internetu.pdf',
      title: 'Zabavni sadržaji kao izvor opasnosti',
      image: 'zabavni-sadrzaji-kao-izvor-opasnosti.jpg',
    },
    {
      document: 'sigurnost_djece_na_internetu.pdf',
      title: 'Sigurnost djece na internetu',
      image: 'sigurnost-djece-na-internetu.jpg',
    },
    {
      document: 'listici_za_roditelje.pdf',
      title: 'Listić za roditelje',
      image: 'listic-za-roditelje.jpg',
    },
    {
      document: 'moderni_malver_na_facebooku.pdf',
      title: 'Moderni malware na Facebook-u',
      image: 'facebook-malware.jpg',
    },
    {
      document: 'opasnosti_facebooka.pdf',
      title: 'Opasnosti Facebook-a',
      image: 'facebook-opasnosti.jpg',
    },
    {
      document: 'prezentacija_za_roditelje.pdf',
      title: 'Prezentacija za roditelje',
      image: 'prezentacija-za-roditelje.jpg',
    },
    {
      document: 'prirucnik_za_djecu.pdf',
      title: 'Priručnik za djecu',
      image: 'prirucnik-za-djecu.jpg',
    },
    {
      document: 'sigurnije_na_internetu.pdf',
      title: 'Sigurnije na internetu',
      image: 'sigurnije-na-internetu.jpg',
    },
    {
      document: 'sigurnost_na_internetu.pdf',
      title: 'Sigurnost na internetu',
      image: 'sigurnost-na-internetu.jpg',
    },
    {
      document: 'alkohol-i-mladi.pdf',
      title: 'Alkohol i mladi',
      image: 'alkohol-i-mladi.png',
    },
    {
      document: 'droga-i-mladi.pdf',
      title: 'Droga i mladi',
      image: 'droga-i-mladi.jpg',
    },
    {
      document: 'kocka-i-mladi.pdf',
      title: 'Kocka i mladi',
      image: 'kocka-i-mladi.jpg',
    },
    {
      document: 'rizik_kockanja.pdf',
      title: 'Rizik kockanja',
      image: 'rizik_kockanja.jpg',
    },
    {
      document:
        'https://mup.gov.hr/vijesti/obiljezavamo-medjunarodni-dan-prevencije-zlostavljanja-djece-i-medjunarodni-dan-djeteta/287379',
      title:
        'Međunarodni dan prevencije zlostavljanja djece i Međunarodni dan djeteta',
      image: '',
    },
    {
      document:
        'https://mup.gov.hr/vijesti/europski-dan-zastite-djece-od-seksualnog-zlostavljanja-i-iskoristavanja/287374',
      title:
        'Europski dan zaštite djece od seksualnog zlostavljanja i iskorištavanja',
      image: '',
    },
    {
      document:
        'https://mup.gov.hr/medjunarodni-dan-tolerancije-svi-smo-mi-razliciti-a-ta-razlika-nas-obogacuje/287372',
      title: 'Međunarodni dan tolerancije',
      image: '',
    },
    {
      document: 'racunalne_prevare.pdf',
      title: 'Savjeti za zaštitu od računalnih prevara',
      image: '',
    },
  ]);
  const [links, setLinks] = useState([
    {
      url: 'http://www.sigurnijiinternet.hr/djeca/kviz-sigurnost/',
      title: 'Kviz',
    },
    {
      url: 'http://www.sigurnijiinternet.hr/djeca/kviz-sigurnost/',
      title: 'Kviz',
    },
    {
      url: 'http://www.sigurnijiinternet.hr/djeca/kviz-sigurnost/',
      title: 'Kviz',
    },
  ]);

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
                    href={`${documentsStorageUrl}${material.document}`}
                    target="_blank"
                  >
                    <img
                      className={styles.left__item__image}
                      src={
                        !!material.image
                          ? `${imagesStorageUrl}${material.image}`
                          : 'study-material.jpg'
                      }
                    />
                    <div className={styles.left__item__title}>
                      {material.title}
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
                    <a href={link.url} target="_blank">
                      <span className={styles.right__item}>{link.title}</span>
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
