import "./end.scss";
import { Button } from "../../components/button";

export const GameEnd = ({ onRestart, score, team }: { onRestart: (event: React.MouseEvent) => void, score: number, team: number }) => (
  <div className="end">
    <img className="end-logo" src="/img/logo.png" />
    <h1 className="end-header">Congratulations</h1>
    <div className="end-team">Team {team}</div>
    <h2 className="end-score margin-bottom-large">{score} pts</h2>
    <Button buttonSize="large" onClick={onRestart}>Start New Game</Button>
  </div>
);
