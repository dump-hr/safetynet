import clsx from 'clsx';
import styles from './index.module.scss';

const Loading = () => {
  return (
    <div className={styles.loading__container}>
      <div className={styles.loading__content}>
        <div className={styles.loader}>
          <div className={clsx(styles.dot, styles.dot1)}></div>
          <div className={clsx(styles.dot, styles.dot2)}></div>
          <div className={clsx(styles.dot, styles.dot3)}></div>
          <div className={clsx(styles.dot, styles.dot4)}></div>
        </div>
        <div className={styles.loading__text}>Učitavanje...</div>
      </div>
    </div>
  );
};

export default Loading;
