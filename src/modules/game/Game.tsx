import { useState } from "react";

import "./game.scss";
import { QuestionSelector } from "./QuestionSelector";
import { ScoreDisplay } from "./ScoreDisplay";

import { Question, Team } from "../../models";

export const Game = ({ onEnd }: { onEnd: () => void }) => {
  const [question, setQuestion] = useState<Question>();
  const [team1] = useState<Team>({ score: 0 });
  const [team2] = useState<Team>({ score: 0 });
  const [activeTeam, setActiveTeam] = useState<Team>();

  return (
    <div className="game">
      <div className="game-border-outer">
        <div className="game-border-inner">
          <div className="game-content">
            <ScoreDisplay team={team1} />
            <div className="game-board">
              {question ? <></> : <QuestionSelector onSelect={(question) => setQuestion(question)} />}
            </div>
            <ScoreDisplay team={team2} />
          </div>
        </div>
      </div>
    </div>
  );
};
