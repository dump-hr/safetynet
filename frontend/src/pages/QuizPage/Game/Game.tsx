import { QuestionWithAnswer } from '@/types';
import styles from './index.module.scss';
import clsx from 'clsx';
import useCountdown from '@/hooks/useCountdown';
import { useEffect, useState } from 'react';
import { useGetCorrectAnswer } from '@/api';
import { Link } from 'react-router-dom';
import { Page, routes } from '@/App';

type Props = {
  question: QuestionWithAnswer;
  questionNumber: number;
  questionCount: number;
  score: number;
  multiplier: number;
  next: (points: number) => void;
};

const letters = 'ABCD';
const questionDelaySeconds = 3;
const answerDelaySeconds = 15;

const Game: React.FC<Props> = ({
  question,
  questionNumber,
  questionCount,
  score,
  multiplier,
  next,
}) => {
  const {
    data: correctAnswer,
    refetch: fetchCorrectAnswer,
    isFetched: isCorrectAnswerFetched,
  } = useGetCorrectAnswer(question.id);

  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);

  const questionDelay = useCountdown(questionDelaySeconds);
  const answerDelay = useCountdown(
    answerDelaySeconds,
    10,
    questionDelay.count > 0 || selectedAnswerId !== null
  );

  const points = Math.round(
    question.points * (answerDelay.countPercentage / 100)
  );

  const handleAnswerClick = (answerId: number) => {
    if (
      questionDelay.count > 0 ||
      answerDelay.count === 0 ||
      selectedAnswerId !== null
    ) {
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
      next(
        selectedAnswerId === correctAnswer.id && answerDelay.count > 0
          ? points * multiplier
          : 0
      );

      questionDelay.reset();
      answerDelay.reset();
      setSelectedAnswerId(null);
    }, 2500);
  }, [correctAnswer]);

  useEffect(() => {
    if (answerDelay.count > 0 || isCorrectAnswerFetched) return;

    fetchCorrectAnswer();
  }, [answerDelay.count === 0]);

  return (
    <>
      {answerDelay.countPercentage < 30 && answerDelay.countPercentage > 1 && (
        <div className={styles.timerEndingAnimation}></div>
      )}

      <Link to={routes[Page.Home]} className={styles['leave-game']}>
        <div className={styles['leave-game__inner']}>&larr; Izađi iz igre</div>
      </Link>

      <div
        className={clsx(
          styles.position__timer,
          styles['out-of-time'],
          styles['points--slide'],
          { [styles.animate__timer]: answerDelay.count === 0 }
        )}
      >
        <span>Isteklo je vrijeme</span>
      </div>

      <div
        className={clsx(
          styles.position__timer,
          styles['points--message'],
          styles['points--slide'],
          { [styles.animate__timer]: questionDelay.count > 0 }
        )}
        style={{ animationDuration: `${questionDelaySeconds + 1}s` }}
      >
        <span>{questionDelay.countSeconds}</span>
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
                      [styles.answer__disabled]: questionDelay.count > 0,
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

      <div className={styles.ui} ng-show="isActive">
        <div className={styles.ui__bar}>
          <div className={styles['ui__bar--progress-container']}>
            <div
              className={clsx(styles['ui__bar--progress'], {
                [styles.progress__moderate]:
                  answerDelay.countPercentage < 50 &&
                  answerDelay.countPercentage > 30,
                [styles.progress__critical]: answerDelay.countPercentage < 30,
              })}
              style={{
                width: `${answerDelay.countPercentage}%`,
              }}
            ></div>
          </div>
        </div>
        <div className={styles.ui__multiplayer}>
          <div className={styles['ui-multiplayer__content']}>x{multiplier}</div>
        </div>
        <div
          className={clsx(
            styles.ui__hexagon,
            styles['ui__hexagon--bar-points']
          )}
        >
          <div
            className={clsx(
              styles['ui-hexagon__content'],
              styles['ui-hexagon__content--bar-points']
            )}
          >
            {points}
          </div>
        </div>
        <div className={styles.ui__hexagon}>
          <div
            className={clsx(
              styles['ui-hexagon__content'],
              styles['ui-hexagon__content--points']
            )}
          >
            {score}
          </div>
        </div>
        {isCorrectAnswerFetched && selectedAnswerId === correctAnswer.id && (
          <div className={styles['ui__points-new']}>
            <span>+{points * multiplier}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default Game;
