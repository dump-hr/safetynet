import clsx from 'clsx';
import styles from './index.module.scss';
import { Difficulty } from '@/types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Page, routes } from '@/App';
import { useGetBestScores } from '@/api/query/getBestScores';
import Loading from '@components/Loading';

const LeaderboardPage = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Beginner);
  const user = JSON.parse(localStorage.getItem('safetynet.user'));

  const beginnerScores = useGetBestScores(Difficulty.Beginner);
  const advancedScores = useGetBestScores(Difficulty.Advanced);

  if (beginnerScores.isLoading || advancedScores.isLoading) {
    return <Loading />;
  }

  const scores =
    difficulty === Difficulty.Beginner
      ? beginnerScores.data
      : advancedScores.data;

  return (
    <div className={styles.content}>
      <div className={styles.leaderboard__main}>
        <div className={styles.leaderboard_title}>
          <span>Ljestvica</span>
        </div>
        <div className={styles.leaderboard__container}>
          <div className={styles.btn__container}>
            <div
              className={clsx(
                styles.btn__leaderboard,
                styles['btn__leaderboardTab-1']
              )}
              onClick={() => setDifficulty(Difficulty.Beginner)}
            >
              Početna
            </div>
            <div
              className={clsx(
                styles.btn__leaderboard,
                styles['btn__leaderboardTab-2']
              )}
              onClick={() => setDifficulty(Difficulty.Advanced)}
            >
              Napredna
            </div>
          </div>
          <div className={styles.leaderboardList}>
            {scores.map((score, index) => (
              <div
                className={clsx(styles.row, {
                  [styles.highlight]: user.name === score.user.name,
                  [styles.even]: index % 2 === 0,
                  [styles.uneven]: index % 2 === 1,
                })}
                key={score.id}
              >
                <div className={clsx(styles.col, styles.index)}>
                  <span>{index + 1}.</span>
                </div>
                <div className={clsx(styles.col, styles.name)}>
                  <span>{score.user.name}</span>
                </div>
                <div className={clsx(styles.col, styles.score)}>
                  <span>{score.value}</span>
                </div>
              </div>
            ))}
            {scores.length === 0 && (
              <h2 className={styles.error}>Nema rezultata :/</h2>
            )}
          </div>
          <div className={styles.btn__return}>
            <Link
              to={routes[Page.Home]}
              className={clsx(styles.btn, styles['btn-primary'])}
            >
              Povratak
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
