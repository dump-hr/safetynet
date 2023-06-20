import { Difficulty } from '@/types';
import { useState } from 'react';
import { useGetQuestions } from '@/api';
import ChooseDifficulty from './ChooseDifficulty';
import Game from './Game';

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
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.toString()}</div>;
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
