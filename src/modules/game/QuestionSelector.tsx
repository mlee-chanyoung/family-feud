import { QUESTIONS } from "./questions";
import { Question } from "../../models";

export const QuestionSelector = ({ completed = [], onSelect }: { completed?: Question[], onSelect: (question: Question) => void }) => {
  return (
    <>
      <h1>Select a question</h1>
      <div className="game-board-grid">
        { QUESTIONS.map((question, i) => (
          <QuestionOption
            completed={Boolean(completed.find((curr) => curr.question === question.question))}
            index={i}
            key={i}
            onSelect={onSelect}
            question={question}
          />
        )) }
      </div>
    </>
  );
};

interface QuestionOptionProps {
  completed?: boolean;
  index: number;
  onSelect: (question: Question) => void;
  question: Question;
}
const QuestionOption = ({ completed, index, onSelect, question }: QuestionOptionProps) => {
  const label = completed ? question.question : `QUESTION ${index + 1}`;

  return (
    <div className="game-option-container">
      <button
        className={`game-option ${completed ? "game-option-complete" : ""}`}
        disabled={completed}
        onClick={() => onSelect(question)}
      >
        {label}
      </button>
    </div>
  );
}