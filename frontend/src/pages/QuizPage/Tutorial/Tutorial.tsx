import styles from './index.module.scss';
import pointsDesktop from '../../../assets/images/tutorial-points-desktop.png';
import questionDesktop from '../../../assets/images/tutorial-question-desktop.png';
import clsx from 'clsx';

type Props = {
  hideTutorial: () => void;
};

const Tutorial: React.FC<Props> = ({ hideTutorial }) => {
  return (
    <div
      className={clsx(styles.content, styles.hover__cursor)}
      onClick={hideTutorial}
    >
      <img
        className={styles.quiz__explanation}
        src={questionDesktop}
        alt="Objašnjavanje pitanja"
      />
      <img
        className={styles.points__explanation}
        src={pointsDesktop}
        alt="Objašnjavanje odgovora"
      />
      <div className={styles.start__text}>Klikni za početak igre</div>
    </div>
  );
};

export default Tutorial;
