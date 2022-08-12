import { useState } from "react";

import "./game.scss";
import { Feud } from "./Feud";
import { QuestionSelector } from "./QuestionSelector";
import { ScoreDisplay } from "./ScoreDisplay";

import { Question, Team } from "../../models";

export const Game = ({ onEnd }: { onEnd: () => void }) => {
  const [question, setQuestion] = useState<Question>();
  const [team1, setTeam1] = useState<Team>({ score: 0 });
  const [team2, setTeam2] = useState<Team>({ score: 0 });
  const [activeTeam, setActiveTeam] = useState<number>(0);

  const handleScore = (score: number) => {
    const updateActiveTeam = activeTeam === 1 ? setTeam1 : setTeam2;
    updateActiveTeam((team) => ({ score: team.score + score }));
  }

  const handleFail = () => {
    setActiveTeam((activeTeam) => activeTeam === 1 ? 2 : 1);
  };

  const handleRoundEnd = () => {
    setActiveTeam(0);
    setQuestion(undefined);
  };

  return (
    <div className="game">
      <div className="game-border-outer">
        <div className="game-border-inner">
          <div className="game-content">
            <ScoreDisplay active={activeTeam === 1} onClick={activeTeam ? () => null : () => setActiveTeam(1)} team={team1} />
            <div className="game-board">
              {
                question
                ? <Feud question={question} onFailed={handleFail} onRoundEnd={handleRoundEnd} onScore={handleScore} started={Boolean(activeTeam)} />
                : <QuestionSelector onSelect={(question) => setQuestion(question)} />
              }
            </div>
            <ScoreDisplay active={activeTeam === 2} onClick={activeTeam ? () => null : () => setActiveTeam(2)} team={team2} />
          </div>
        </div>
      </div>
    </div>
  );
};
