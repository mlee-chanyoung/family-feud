import "./home.scss";
import { Button } from "../../components/button";

export const Home = ({ onStart }: { onStart: (event: React.MouseEvent) => void }) => (
  <div className="home">
    <div className="home-content">
      <h1>Welcome to</h1>
      <img alt="Family Feud logo" className="home-logo" src="/img/logo.png" />
      <div>
        <Button buttonSize="large" onClick={onStart}>Get Started</Button>
      </div>
    </div>
  </div>
);
