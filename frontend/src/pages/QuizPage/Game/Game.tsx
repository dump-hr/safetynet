import { QuestionWithAnswer } from '@/types';
import styles from './index.module.scss';
import clsx from 'clsx';
import useCountdown from '@/hooks/useCountdown';
import { useEffect, useState } from 'react';
import { useGetCorrectAnswer } from '@/api';

type Props = {
  question: QuestionWithAnswer;
  questionNumber: number;
  questionCount: number;
  next: () => void;
};

const letters = 'ABCD';
const delaySeconds = 3;

const Game: React.FC<Props> = ({
  question,
  questionNumber,
  questionCount,
  next,
}) => {
  const { count: delaySecondsLeft, reset: resetDelayCountdown } =
    useCountdown(delaySeconds);

  const {
    data: correctAnswer,
    refetch: fetchCorrectAnswer,
    isFetched: isCorrectAnswerFetched,
  } = useGetCorrectAnswer(question.id);

  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);

  const handleAnswerClick = (answerId: number) => {
    if (delaySecondsLeft > 0 || selectedAnswerId !== null) {
      return;
    }
    setSelectedAnswerId(answerId);
    fetchCorrectAnswer();
  };

  useEffect(() => {
    if (!isCorrectAnswerFetched) {
      return;
    }
    setTimeout(() => {
      next();
      resetDelayCountdown();
      setSelectedAnswerId(null);
    }, 1000);
  }, [correctAnswer]);

  return (
    <>
      <div
        className={clsx(
          styles.position__timer,
          styles['points--message'],
          styles['points--slide'],
          {
            [styles.animate__timer]: delaySecondsLeft > 0,
          }
        )}
        style={{ animationDuration: `${delaySeconds + 1}s` }}
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
              <div className={styles.game__item} key={answer.id}>
                <div className={styles['game-list__index']}>
                  {letters[answerIndex]}
                </div>

                <div
                  className={clsx(
                    styles['game-list__inner'],
                    styles['game-list__inner--active'],
                    {
                      [styles.answer__disabled]: delaySecondsLeft > 0,
                      [styles.answer__correct]:
                        isCorrectAnswerFetched &&
                        answer.id === correctAnswer.id,
                      [styles.answer__incorrect]:
                        isCorrectAnswerFetched &&
                        answer.id !== correctAnswer.id &&
                        selectedAnswerId !== correctAnswer.id,
                    }
                  )}
                  onClick={() => handleAnswerClick(answer.id)}
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
