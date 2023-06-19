import { Difficulty } from '@/types';
import { useState } from 'react';
import ChooseDifficulty from './ChooseDifficulty';
import { useQuery } from '@tanstack/react-query';
import { useGetQuestions } from '@/api';
import styles from './index.module.scss';

const QuizPage = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);

  const { data, isError, error, isLoading } = useGetQuestions(difficulty);

  const reset = () => {
    setDifficulty(null);
    setQuestionIndex(0);
  };

  if (difficulty === null) {
    return <ChooseDifficulty setDifficulty={setDifficulty} />;
  }

  if (showTutorial) {
    return <div>tutorial</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.toString()}</div>;
  }

  return (
    <div className={styles.content}>
      <div className={styles.content__container}>
        <h1 className={styles.content__logo}>SafetyNet</h1>
        <div className={styles.content__menu}>
          <div className={styles.menu__container}>
            <pre>{JSON.stringify(data, null, 2)}</pre>{' '}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
