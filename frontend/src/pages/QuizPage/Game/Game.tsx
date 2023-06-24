import { QuestionWithAnswer } from '@/types';
import styles from './index.module.scss';
import clsx from 'clsx';
import useCountdown from '@hooks/useCountdown';

type Props = {
  question: QuestionWithAnswer;
  questionNumber: number;
  questionCount: number;
};

const letters = 'ABCD';
const seconds = 5;

const Game: React.FC<Props> = ({ question, questionNumber, questionCount }) => {
  const { count: delaySecondsLeft } = useCountdown(seconds);

  return (
    <>
      <div
        className={clsx(
          styles.position__timer,
          styles['points--message'],
          styles['points--slide'],
          styles['animate__timer']
        )}
        style={{ animationDuration: `${seconds + 1}s` }}
      >
        <span>{delaySecondsLeft}</span>
      </div>
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
                      [styles['answer__disabled']]: delaySecondsLeft > 0,
                      [styles['answer__correct']]: false,
                      [styles['answer__incorrect']]: false,
                    }
                  )}
                  ng-className="{
                  'answer__disabled':
                    isDelayActive || #done
                    (timeLeftPercentage == 0 && !answer.IsCorrect) ||
                    (selectedAnswer && !(selectedAnswer.IsCorrect ||  selectedAnswer == answer)),

                  'answer__correct':
                    (selectedAnswer.Id == answer.Id && selectedAnswer.Id == correctAnswer.Id) ||
                    (timeLeftPercentage <= 0 && answer.IsCorrect) ||
                    (correctAnswer.Id == answer.Id),

                  'answer__incorrect':
                    (answer.Id != correctAnswer.Id && selectedAnswer) &&
                    !(correctAnswer.Id == selectedAnswer.Id)
                }"
                  ng-style="timeLeftPercentage <= 0 && {'transition': 'all 100ms ease-in-out'}"
                >
                  {answer.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;
