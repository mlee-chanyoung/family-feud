import { Question } from "../../models";

interface QuestionSelectorProps {
  completed?: Question[];
  double?: boolean;
  onSelect: (question: Question) => void;
  questions: Question[];
}
export const QuestionSelector = ({ completed = [], double = false, onSelect, questions }: QuestionSelectorProps) => {
  return (
    <>
      <h1>Select a question</h1>
      <div className="game-board-grid">
        { questions.map((question, i) => (
          <QuestionOption
            completed={Boolean(completed.find((curr) => curr.question === question.question))}
            index={i}
            key={i}
            onSelect={onSelect}
            question={question}
          />
        )) }
      </div>
      {double && <h2>DOUBLE POINT VALUE</h2>}
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