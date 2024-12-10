import "./home.scss";
import { Button } from "../../components/button";

interface HomeProps {
  onStart: (event?: React.MouseEvent) => void;
  onSettings: (event?: React.MouseEvent) => void;
}
export const Home = ({ onStart, onSettings }: HomeProps) => {
  return (
    <div className="home">
      <div className="home-content">
        <h1>Welcome to</h1>
        <img alt="Family Feud logo" className="home-logo" src="/img/logo.png" />
        <div className="home-row">
          <Button buttonSize="large" onClick={onStart}>Get Started</Button>
        </div>
        <div>
          <Button className="home-settings" onClick={onSettings}>Settings</Button>
        </div>
      </div>
    </div>
  );
}