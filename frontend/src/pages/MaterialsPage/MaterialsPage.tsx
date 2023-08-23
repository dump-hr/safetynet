import { Page, routes } from '@/App';
import { Link, useParams } from 'react-router-dom';
import styles from './index.module.scss';
import clsx from 'clsx';
import materials from './materials.json';

const MaterialsPage = () => {
  const { id } = useParams();
  const selectedMaterial = materials.find((material) => material.Id === id);

  const displayedMaterials = selectedMaterial
    ? selectedMaterial.StudyMaterials
    : materials;

  return (
    <div className={clsx(styles.content, styles.animations__enabled)}>
      <div className={styles.parents__materials__container}>
        <span className={styles.title}>
          {selectedMaterial ? selectedMaterial.Title : 'Materijali za učenje'}
        </span>
        <div className={styles.parents__container}>
          <div className={styles.parents__content}>
            <div className={styles.parents__content__left}>
              {displayedMaterials.map((material, index) => (
                <div key={index} className={styles.left__item}>
                  <Link
                    to={
                      material?.StudyMaterials &&
                      material.StudyMaterials.length === 1
                        ? // if there is only one study material, go directly to it
                          `${material.Id}/${material.StudyMaterials[0].Id}`
                        : material.Id
                    }
                    className={styles.left__item__inner}
                  >
                    <img
                      className={styles.left__item__image}
                      src={
                        material?.ImageUrl ||
                        'https://safetynet-assets.dump.hr/images/study-materials/study-material.jpg'
                      }
                    />
                    <div className={styles.left__item__title}>
                      {material.Title}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <Link to={routes[selectedMaterial ? Page.Materials : Page.Home]}>
            <div className={clsx(styles.menu__item, styles.parents__button)}>
              Povratak
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MaterialsPage;
