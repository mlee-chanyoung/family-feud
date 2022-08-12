import "./score.scss";
import { Team } from "../../models";

export const ScoreDisplay = ({ active, onClick, team }: { active: boolean, onClick: (event: React.MouseEvent) => void, team: Team }) => (
  <div className={`score ${active ? "score--active" : ""}`} onClick={onClick}>
    {team.score}
  </div>
);
