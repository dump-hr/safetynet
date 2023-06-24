import { Difficulty } from '@/types';
import { useState } from 'react';
import { useGetQuestions } from '@/api';
import ChooseDifficulty from './ChooseDifficulty';
import Game from './Game';
import Loading from '@/components/Loading';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import { Page, routes } from '@/App';

const QuizPage = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);

  const {
    data: questions,
    isError,
    error,
    isLoading,
  } = useGetQuestions(difficulty);

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
    return <Loading />;
  }

  if (isError) {
    return (
      <div className={styles.content}>
        <div className={styles.content__container}>
          <div className={styles.content__logo}>SafetyNet</div>
          <div className={styles.content__menu}>
            <div className={styles.menu__container}>
              <div className={styles.error_message}>
                Greška pri učitavanju, pokušaj ponovo
              </div>
              <Link to={routes[Page.Home]}>
                <div ui-sref="home" className={styles.menu__item}>
                  &larr; Nazad
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Game
      question={questions[questionIndex]}
      questionNumber={questionIndex + 1}
      questionCount={questions.length}
    />
  );
};

export default QuizPage;
