import { useState } from "react";

import "./game.scss";
import { Feud } from "./Feud";
import { QuestionSelector } from "./QuestionSelector";
import { ScoreDisplay } from "./ScoreDisplay";

import { Button } from "../../components/button";
import { Question, Team } from "../../models";

interface GameProps {
  onEnd: (team: number, score: number) => void,
  questions: Question[];
  targetPoints: number;
}
export const Game = ({ onEnd, questions, targetPoints }: GameProps) => {
  const [question, setQuestion] = useState<Question>();
  const [completedQuestions, setCompletedQuestions] = useState<Question[]>([]);
  const [team1, setTeam1] = useState<Team>({ score: 0 });
  const [team2, setTeam2] = useState<Team>({ score: 0 });
  const [activeTeam, setActiveTeam] = useState<number>(0);
  const [round, setRound] = useState(1);
  const [double, setDouble] = useState(false);

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
    setDouble(false);

    if (team1.score >= targetPoints || team2.score >= targetPoints) {
      const winningTeam = team1.score > team2.score ? 1 : 2;
      onEnd(winningTeam, winningTeam === 1 ? team1.score : team2.score);
    } else {
      setRound(round + 1);
    }
  };

  const handleCancelQuestion = () => {
    setActiveTeam(0);
    setQuestion(undefined);
    setDouble(false);
  }

  return (
    <div className="game">
      <div className="game-border-outer">
        <div className="game-border-inner">
          <div className="game-content">
            <ScoreDisplay active={activeTeam === 1} onClick={() => setActiveTeam(1)} team={team1} />
            <div className={`game-board ${double && "game-board-double"}`}>
              {
                question
                ? (
                  <Feud
                    double={double}
                    onFailed={handleFail}
                    onRoundEnd={handleRoundEnd}
                    onScore={handleScore}
                    question={question}
                    started={Boolean(activeTeam)}
                  />
                ) : (
                  <QuestionSelector
                    completed={completedQuestions}
                    double={double}
                    onSelect={(question) => setQuestion(question)}
                    questions={questions}
                  />
                )
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
      {question ? (
        <div className="game-back">
          <Button onClick={handleCancelQuestion}>
            Back
          </Button>
        </div>
      ) : (
        <div className="game-double">
          <Button onClick={() => setDouble((prev) => !prev)}>
            {double ? "Reset point value" : "Double point value"}
          </Button>
        </div>
      )}
    </div>
  );
};
