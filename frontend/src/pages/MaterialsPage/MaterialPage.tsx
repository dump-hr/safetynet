import { Page, routes } from '@/App';
import { Link, useParams } from 'react-router-dom';
import styles from './index.module.scss';
import clsx from 'clsx';
import materials from './materials.json';

const MaterialPage = () => {
  const { id, materialId } = useParams();

  const selectedMaterials = materials.find((material) => material.Id === id);
  const selectedMaterial = selectedMaterials.StudyMaterials.find(
    (material) => material.Id === materialId
  );

  if (!selectedMaterial) {
    return (
      <div className={clsx(styles.content, styles.animations__enabled)}>
        <div className={styles.parents__materials__container}>
          <span className={styles.title}>Materijali za učenje</span>
          <div className={styles.parents__container}>
            <div className={styles.parents__content}>
              <div className={styles.parents__content__left}>
                <h2 className={styles.error}>Materijal nije pronađen :/</h2>
              </div>
            </div>
            <Link to={routes[Page.Materials]}>
              <div className={clsx(styles.menu__item, styles.parents__button)}>
                Povratak
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx(styles.content, styles.animations__enabled)}>
      <div className={styles.parents__materials__container}>
        <span className={styles.title}>Materijali za učenje</span>
        <div className={styles.parents__container}>
          <div className={styles.parents__content}>
            <div className={styles.parents__content__left}>
              <div className={styles.content_container}>
                {selectedMaterial.VideoUrl && (
                  <iframe
                    width="560"
                    height="315"
                    src={selectedMaterial.VideoUrl}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
                {selectedMaterial.PresentationUrl && (
                  <iframe
                    src={selectedMaterial.PresentationUrl}
                    frameBorder="0"
                    scrolling="no"
                  ></iframe>
                )}
              </div>
            </div>
          </div>
          <Link
            to={`${routes[Page.Materials]}${
              selectedMaterials.StudyMaterials.length > 1
                ? `/${selectedMaterials.Id}`
                : ''
            }`}
          >
            <div className={clsx(styles.menu__item, styles.parents__button)}>
              Povratak
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MaterialPage;
