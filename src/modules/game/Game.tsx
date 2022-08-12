import { useState } from "react";

import "./game.scss";
import { QuestionSelector } from "./QuestionSelector";

import { Question } from "../../models";

export const Game = ({ onEnd }: { onEnd: () => void }) => {
  const [question, setQuestion] = useState<Question>();

  return (
    <div className="game">
      <div className="game-board">
        {question ? <></> : <QuestionSelector onSelect={(question) => setQuestion(question)} />}
      </div>
    </div>
  )
}
