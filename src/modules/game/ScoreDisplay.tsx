import "./score.scss";
import { Team } from "../../models";

interface ScoreDisplayProps {
  active: boolean,
  className?: string,
  onClick: (event: React.MouseEvent) => void,
  team: Team
};
export const ScoreDisplay = ({ active, className="", onClick, team }: ScoreDisplayProps) => (
  <div className={`score ${active ? "score--active" : ""} ${className}`} onClick={onClick}>
    {team.score}
  </div>
);
