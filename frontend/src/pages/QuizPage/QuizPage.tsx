import { Difficulty } from '@/types';
import { useEffect, useState } from 'react';
import { useGetQuestions } from '@/api';
import ChooseDifficulty from './ChooseDifficulty';
import Game from './Game';
import Loading from '@/components/Loading';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import { Page, routes } from '@/App';
import Tutorial from './Tutorial';
import SubmitResult from './SubmitResult';
import { useMediaQuery } from '@hooks/useMediaQuery';

const QuizPage = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [showTutorial, setShowTutorial] = useState(
    !isMobile && localStorage.getItem('safetynet.showTutorial') !== 'false'
  );
  const [gameEnded, setGameEnded] = useState(false);

  const [gameId, setGameId] = useState(0);
  const [difficulty, setDifficulty] = useState<Difficulty>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [multiplier, setMultiplier] = useState(1);

  const {
    data: questions,
    isError,
    isLoading,
  } = useGetQuestions(difficulty, gameId);

  useEffect(() => {
    setGameId(difficulty !== null ? new Date().getTime() : 0);
  }, [difficulty]);

  if (difficulty === null) {
    return <ChooseDifficulty setDifficulty={setDifficulty} />;
  }

  const handleHideTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem('safetynet.showTutorial', 'false');
  };

  if (showTutorial) {
    return <Tutorial hideTutorial={handleHideTutorial} />;
  }

  const handleResetGame = () => {
    setQuestionIndex(0);
    setScore(0);
    setMultiplier(1);
    setGameEnded(false);
    setDifficulty(null);
  };

  if (gameEnded) {
    return (
      <SubmitResult
        difficulty={difficulty}
        score={score}
        resetGame={handleResetGame}
        onSurveyClick={() => setScore((prev) => prev + 150)}
      />
    );
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
                <div className={styles.menu__item}>&larr; Nazad</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleNextQuestion = (points: number) => {
    if (points > 0) {
      setScore((prev) => prev + points);
      setMultiplier((prev) => prev + 1);
    } else {
      setMultiplier(1);
    }

    if (questionIndex + 1 < questions.length) {
      setQuestionIndex((prev) => prev + 1);
    } else {
      setGameEnded(true);
    }
  };

  return (
    <Game
      question={questions[questionIndex]}
      questionNumber={questionIndex + 1}
      questionCount={questions.length}
      score={score}
      multiplier={multiplier}
      next={handleNextQuestion}
    />
  );
};

export default QuizPage;
