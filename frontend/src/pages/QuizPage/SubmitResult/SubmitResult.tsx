import clsx from 'clsx';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import { Page, routes } from '@/App';
import { Difficulty } from '@/types';
import { useGetUserPosition } from '@/api/query/getUserPosition';

type Props = {
  difficulty: Difficulty;
  score: number;
  resetGame: () => void;
};

const SubmitResult: React.FC<Props> = ({ difficulty, score, resetGame }) => {
  const { data: position } = useGetUserPosition(difficulty, score);

  return (
    <div className={styles.content}>
      <div className={styles.ending__container}>
        <div className={styles.ending__shape}>
          <div className={styles.ending__score}>
            <div className={styles['ending__score--score']}>{score}</div>
            <div className={styles.ending__position}>
              <span className={styles['ending__position--text']}>
                Mjesto na ljestvici ako se prijaviš:
              </span>{' '}
              <span className={styles['ending__position--position']}>
                #{position}
              </span>
            </div>
          </div>
        </div>
        <div className={styles['login__form__container']}></div>
        <div className={styles.ending__content}>
          <div className={styles.options__container}>
            <Link to={routes[Page.Home]} className={styles.ending__option}>
              &larr; Izbornik
            </Link>

            <button
              type="button"
              onClick={resetGame}
              className={clsx(styles.ending__option, styles.play__option)}
            >
              Igraj opet
            </button>

            <a
              className={styles.ending__option}
              href="https://goo.gl/forms/vq6CaBlXsEzfUw3k2"
              target="_blank"
              ng-click="addPollBonusPointsToUser()"
              ng-if="!isPollButtonDisabled"
            >
              Anketa
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitResult;
