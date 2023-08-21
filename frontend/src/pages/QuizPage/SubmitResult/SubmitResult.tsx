import clsx from 'clsx';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import { Page, routes } from '@/App';
import { Difficulty } from '@/types';
import { useGetUserPosition } from '@/api/query/getUserPosition';
import { usePostUserScore } from '@/api/mutation/postUserScore';
import { useState } from 'react';
import { run } from '@/utils/general';

type Props = {
  difficulty: Difficulty;
  score: number;
  resetGame: () => void;
  onSurveyClick: () => void;
};

const dayRange = 31;
const startDay = 1;
const monthRange = 12;
const startMonth = 1;
const yearRange = 120;
const startYear = 1900;

const SubmitResult: React.FC<Props> = ({
  difficulty,
  score,
  resetGame,
  onSurveyClick,
}) => {
  const [clickedSurvey, setClickedSurvey] = useState(false);
  const { data: position } = useGetUserPosition(difficulty, score);

  const userScore = usePostUserScore();

  const savedUser = JSON.parse(localStorage.getItem('safetynet.user'));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      'user.name': HTMLInputElement;
      'user.school': HTMLInputElement;
      'user.birthDay': HTMLSelectElement;
      'user.birthMonth': HTMLSelectElement;
      'user.birthYear': HTMLSelectElement;
    };

    userScore.mutate({
      name: formElements['user.name'].value,
      school: formElements['user.school'].value,
      birthDate: new Date(
        +formElements['user.birthYear'].value,
        +formElements['user.birthMonth'].value - 1,
        +formElements['user.birthDay'].value
      ),
      difficulty: Difficulty[difficulty],
      score,
    });

    localStorage.setItem(
      'safetynet.user',
      JSON.stringify({
        name: formElements['user.name'].value,
        school: formElements['user.school'].value,
        birthYear: formElements['user.birthYear'].value,
        birthMonth: formElements['user.birthMonth'].value,
        birthDay: formElements['user.birthDay'].value,
      })
    );
  };

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
        <div className={styles['login__form__container']}>
          <div className={styles['login-section__container']}>
            <span className={styles.title}>Još samo jedan korak...</span>

            <form className={styles.login__inputs} onSubmit={handleSubmit}>
              <span className={styles['login-input__container']}>
                <span
                  className={clsx(
                    styles.item__title,
                    styles['login-input__label']
                  )}
                >
                  Ime i prezime:
                </span>
                <input
                  type="text"
                  name="user.name"
                  defaultValue={savedUser?.name}
                  className={clsx(
                    styles['login-input__input'],
                    styles.menu__item
                  )}
                />
              </span>
              <span className={styles['login-input__container']}>
                <span
                  className={clsx(
                    styles.item__title,
                    styles['login-input__label']
                  )}
                >
                  Škola:
                </span>
                <input
                  type="text"
                  name="user.school"
                  defaultValue={savedUser?.school}
                  className={clsx(
                    styles['login-input__input'],
                    styles.menu__item
                  )}
                />
              </span>
              <span className={styles['login-input__container']}>
                <span
                  className={clsx(
                    styles.item__title,
                    styles['login-input__label']
                  )}
                >
                  Datum rođenja:
                </span>
                <span className={styles['login-birthdate-container']}>
                  <select
                    className={styles['login-birthdate__select']}
                    name="user.birthDay"
                    defaultValue={savedUser?.birthDay}
                  >
                    {Array(dayRange)
                      .fill(null)
                      .map((_, i) => (
                        <option key={i}>{startDay + i}</option>
                      ))}
                  </select>
                  <select
                    className={styles['login-birthmonth__select']}
                    name="user.birthMonth"
                    defaultValue={savedUser?.birthMonth}
                  >
                    {Array(monthRange)
                      .fill(null)
                      .map((_, i) => (
                        <option key={i}>{startMonth + i}</option>
                      ))}
                  </select>
                  <select
                    className={styles['login-birthyear__select']}
                    name="user.birthYear"
                    defaultValue={savedUser?.birthYear}
                  >
                    {Array(yearRange)
                      .fill(null)
                      .map((_, i) => (
                        <option key={i}>{startYear + yearRange - i}</option>
                      ))}
                  </select>
                </span>
              </span>
              <span className={styles.login__buttons}>
                <button
                  className={clsx(styles.login__button, styles.menu__item)}
                  type="submit"
                >
                  {run(() => {
                    if (userScore.isSuccess) {
                      // fetch does not reject promises when the response is not ok...
                      if (userScore.data?.statusCode === 400) {
                        return `Pogreška: ${userScore.data.message}`;
                      }
                      return 'Poslano!';
                    }
                    if (userScore.isLoading) {
                      return 'Šaljem...';
                    }
                    return 'Pošalji rezultat';
                  })}
                </button>
              </span>
            </form>
          </div>
        </div>
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
              onClick={() => {
                if (clickedSurvey) return;
                onSurveyClick();
                setClickedSurvey(true);
              }}
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
