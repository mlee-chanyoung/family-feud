import { QUESTIONS } from "./questions";
import { Question } from "../../models";

export const QuestionSelector = ({ onSelect }: { onSelect: (question: Question) => void }) => {

  const QuestionOption = ({ question, index }: { question: Question, index: number }) => (
    <button className="game-option" onClick={() => onSelect(question)}>QUESTION {index + 1}</button>
  );

  return (
    <>
      <h1>Select a question</h1>
      <div className="game-board-grid">
        { QUESTIONS.map((question, i) => <QuestionOption key={i} question={question} index={i} />) }
      </div>
    </>
  );
};
