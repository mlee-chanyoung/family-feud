import { useState } from "react";

import "./game.scss";
import { Feud } from "./Feud";
import { QuestionSelector } from "./QuestionSelector";
import { ScoreDisplay } from "./ScoreDisplay";

import { Question, Team } from "../../models";

export const Game = ({ onEnd }: { onEnd: (team: number, score: number) => void }) => {
  const [question, setQuestion] = useState<Question>();
  const [completedQuestions, setCompletedQuestions] = useState<Question[]>([]);
  const [team1, setTeam1] = useState<Team>({ score: 0 });
  const [team2, setTeam2] = useState<Team>({ score: 0 });
  const [activeTeam, setActiveTeam] = useState<number>(0);
  const [round, setRound] = useState(1);

  const handleScore = (score: number) => {
    const updateActiveTeam = activeTeam === 1 ? setTeam1 : setTeam2;
    updateActiveTeam((team) => ({ score: team.score + score }));
  }

  const handleFail = () => {
    setActiveTeam((activeTeam) => activeTeam === 1 ? 2 : 1);
  };

  const handleRoundEnd = () => {
    setActiveTeam(0);
    setQuestion((question) => {
      question && setCompletedQuestions((completed) => [...completed, question]);
      return undefined;
    });

    if (round >= 3) {
      const winningTeam = team1.score > team2.score ? 1 : 2;
      onEnd(winningTeam, winningTeam === 1 ? team1.score : team2.score);
    } else {
      setRound(round + 1);
    }
  };

  const handleCancelQuestion = () => {
    setActiveTeam(0);
    setQuestion(undefined);
  }

  return (
    <div className="game">
      <div className="game-border-outer">
        <div className="game-border-inner">
          <div className="game-content">
            <ScoreDisplay active={activeTeam === 1} onClick={() => setActiveTeam(1)} team={team1} />
            <div className="game-board">
              {
                question
                ? <Feud double={round > 2} question={question} onFailed={handleFail} onRoundEnd={handleRoundEnd} onScore={handleScore} started={Boolean(activeTeam)} />
                : <QuestionSelector completed={completedQuestions} onSelect={(question) => setQuestion(question)} />
              }
            </div>
            <ScoreDisplay active={activeTeam === 2} onClick={() => setActiveTeam(2)} team={team2} />
          </div>
        </div>
      </div>
      <div className="game-round">
        <div>Round</div>
        <div className="game-round-count">{round}</div>
      </div>
      {question && (
        <div className="game-back">
          <button className="button" onClick={handleCancelQuestion}>
            Back
          </button>
        </div>
      )}
    </div>
  );
};
