import { QuestionWithAnswer } from '@/types';
import styles from './index.module.scss';
import clsx from 'clsx';
import useCountdown from '@hooks/useCountdown';
import { useEffect } from 'react';

type Props = {
  question: QuestionWithAnswer;
  questionNumber: number;
  questionCount: number;
};

const letters = 'ABCD';

const Game: React.FC<Props> = ({ question, questionNumber, questionCount }) => {
  const { count, start } = useCountdown(5);

  useEffect(() => {
    start();
  }, []);

  return (
    <div className={styles.game}>
      <div className={styles.game__information}>
        {questionNumber}/{questionCount}
      </div>
      <div className={styles.game__container}>
        <div className={styles.game__head}>{question.value}</div>
        <div className={styles.game__body}>
          {question.answers.map((answer, answerIndex) => (
            <div className={styles.game__item}>
              <div className={styles['game-list__index']}>
                {letters[answerIndex]}
              </div>
              <div
                className={clsx(
                  styles['game-list__inner'],
                  styles['game-list__inner--active'],
                  {
                    [styles['answer__disabled']]: false,
                  }
                )}
                ng-className="{'answer__disabled': isDelayActive || (timeLeftPercentage == 0 && !answer.IsCorrect)|| (selectedAnswer && !(selectedAnswer.IsCorrect ||  selectedAnswer == answer)),
            'answer__correct': (selectedAnswer.Id == answer.Id && selectedAnswer.Id == correctAnswer.Id) || (timeLeftPercentage <= 0 && answer.IsCorrect) || (correctAnswer.Id == answer.Id),
            'answer__incorrect': (answer.Id != correctAnswer.Id && selectedAnswer) && !(correctAnswer.Id == selectedAnswer.Id)}"
                ng-style="timeLeftPercentage <= 0 && {'transition': 'all 100ms ease-in-out'}"
              >
                {answer.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;
