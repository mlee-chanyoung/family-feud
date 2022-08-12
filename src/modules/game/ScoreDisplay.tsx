import "./score.scss";
import { Team } from "../../models";

export const ScoreDisplay = ({ team }: { team: Team }) => (
  <div className="score">
    {team.score}
  </div>
);
