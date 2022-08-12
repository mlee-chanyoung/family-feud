import { useEffect, useState } from "react";
import { WrongPopup } from "./WrongPopup";
import { Button } from "../../components/button";
import { Answer, Question } from "../../models";


type AnswerDisplay = {
  answer: Answer,
  position: number,
  revealed: boolean,
};

const transposeAnswerGrid = (answers: Array<Answer>): Array<AnswerDisplay> => {
  const empty = { response: "", value: 0 };
  return [
    { answer: answers[0] || empty, position: 1, revealed: false }, { answer: answers[4] || empty, position: 5, revealed: false },
    { answer: answers[1] || empty, position: 2, revealed: false }, { answer: answers[5] || empty, position: 6, revealed: false },
    { answer: answers[2] || empty, position: 3, revealed: false }, { answer: answers[6] || empty, position: 7, revealed: false },
    { answer: answers[3] || empty, position: 4, revealed: false }, { answer: answers[7] || empty, position: 8, revealed: false },
  ];
};

interface FeudProps {
  onScore: (score: number) => void,
  onFailed: () => void,
  started: boolean,
  question: Question,
}

export const Feud = ({ onFailed, onScore, question, started }: FeudProps) => {
  const [gridState, setGridState] = useState<Array<AnswerDisplay>>(transposeAnswerGrid(question.answers));
  const [accumlatedPoints, setAccumulatedPoints] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<Array<boolean>>([]);
  const [showWrongPopup, setShowWrongPopup] = useState(false);

  const handleReveal = (display: AnswerDisplay) => {
    if (!started) return;

    const updatedState = [...gridState];
    const index = updatedState.findIndex((initial) => initial.position === display.position);
    updatedState[index] = { ...display, revealed: true };
    setGridState(updatedState);
    setAccumulatedPoints(accumlatedPoints + display.answer.value);
    onScore(display.answer.value);
  };

  const handleWrong = () => {
    if (!started) return;

    setWrongAnswers([...wrongAnswers, true]);
    setShowWrongPopup(true);
  };

  useEffect(() => {
    if (wrongAnswers.length > 2) {
      onFailed();
    }
  }, [wrongAnswers]);

  return (
    <>
      { showWrongPopup ? <WrongPopup onClick={() => setShowWrongPopup(false)} /> : <></> }
      <div className="game-board-grid margin-bottom-medium">
        { gridState.map((answer, i) => <AnswerTile key={i} display={answer} onReveal={handleReveal} /> )}
      </div>
      <Button buttonSize="medium" onClick={handleWrong}>That ain’t it</Button>
      <div className="game-wrong-counter">
        {wrongAnswers.map(() => <img src="/img/x.png" />)}
      </div>
    </>
  );
};

const AnswerTile = ({ display, onReveal }: { display: AnswerDisplay, onReveal: (display: AnswerDisplay) => void }) => {
  let content: React.ReactNode;

  if (display.revealed) {
    content = (
      <>
        <div className="game-option game-option--revealed">
          {display.answer.response}
        </div>
        <span className="game-option-value">{display.answer.value}</span>
      </>
    );
  } else {
    content = display.answer.response
      ? <button className="game-option" onClick={() => onReveal(display)}><span className="game-option-position">{display.position}</span></button>
      : <div className="game-option"></div>;
  }

  return <div className="game-option-container">{content}</div>;
};
