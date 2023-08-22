import { Page, routes } from '@/App';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';
import clsx from 'clsx';
import { useState } from 'react';

const MaterialsPage = () => {
  const storageBaseUrl = 'https://safetynet-kviz.skole.hr/Assets/';
  const documentsStorageUrl = `${storageBaseUrl}Documents/`;
  const imagesStorageUrl = `${storageBaseUrl}Images/StudyMaterials/`;

  const imageUrl = (filename: string) =>
    !!filename
      ? `${imagesStorageUrl}${filename}`
      : '/images/study-material.jpg';

  const [materials, setMaterials] = useState([
    {
      title: 'Cyberbullying',
      image: 'cyberbullying.jpg',
      document: 'cyberbullying',
    },
    {
      title: 'Elektronička pošta',
      image: 'email.jpg',
      document: 'email',
    },
    {
      title: 'Malware',
      image: 'malware.jpg',
      document: 'malware',
    },
    {
      title: 'Općenito',
      image: 'general.jpg',
      document: 'General',
    },
    {
      title: 'Sigurnost u prometu',
      image: 'study-material.jpg',
      document: 'Safety%20in%20traffic',
    },
    {
      title: 'Tolerancija',
      image: 'study-material.jpg',
      document: 'Tolerancy',
    },
    {
      title: 'Trgovina ljudima',
      image: 'study-material.jpg',
      document: 'Human%20trafficing/1',
    },
    {
      title: 'Kako sigurno online kupovati/prodavati',
      image: 'study-material.jpg',
      document: 'How%20to%20safely%20shop%20online/1',
    },
  ]);

  return (
    <div className={clsx(styles.content, styles.animations__enabled)}>
      <div className={styles.container}>
        <span className={styles.title}>Materijali za učenje</span>
        <div className={styles.box}>
          {materials.map((material, index) => (
            <div key={index} className={styles.item}>
              <a href={`${documentsStorageUrl}${material.document}`}>
                <img
                  className={styles.item__image}
                  src={imageUrl(material.image)}
                  alt={material.title}
                />
                <div className={styles.item__text}>{material.title}</div>
              </a>
            </div>
          ))}
        </div>
        <Link to={routes[Page.Home]}>
          <div
            className={clsx(
              styles.menu__item,
              styles.parents__button,
              styles.button,
              styles.subcategory__button
            )}
          >
            Povratak
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MaterialsPage;
