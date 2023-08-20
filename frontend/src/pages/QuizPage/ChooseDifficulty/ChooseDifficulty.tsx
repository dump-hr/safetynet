import { Difficulty } from '@/types';
import styles from './index.module.scss';
import { Page, routes } from '@/App';
import { Link } from 'react-router-dom';

type Props = {
  setDifficulty: (difficulty: Difficulty) => void;
};

const ChooseDifficulty: React.FC<Props> = ({ setDifficulty }) => {
  return (
    <div className={styles.content}>
      <div className={styles.content__container}>
        <h1 className={styles.content__logo}>SafetyNet</h1>
        <div className={styles.content__menu}>
          <div className={styles.menu__container}>
            <div
              className={styles.menu__item}
              onClick={() => setDifficulty(Difficulty.Beginner)}
            >
              Početna
            </div>
            <div
              className={styles.menu__item}
              onClick={() => setDifficulty(Difficulty.Advanced)}
            >
              Napredna
            </div>
            <Link to={routes[Page.Home]}>
              <div className={styles.menu__item}>&larr; Nazad</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseDifficulty;
