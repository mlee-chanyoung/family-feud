import { useState } from "react";
import { GameEnd } from "./modules/end/End";
import { Game } from "./modules/game/Game";
import { Home } from "./modules/home/Home";

enum GameState {
  START = "start",
  PROGRESS = "progress",
  END = "end",
};

export const App = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [winningTeam, setWinningTeam] = useState<{ score: number, team: number }>();

  const handleGameEnd = (team: number, score: number) => {
    setWinningTeam({ team, score });
    setGameState(GameState.END)
  };

  switch (gameState) {
    case GameState.PROGRESS:
      return <Game onEnd={handleGameEnd} targetPoints={300} />;
    case GameState.END:
      return <GameEnd onRestart={() => setGameState(GameState.PROGRESS)} team={winningTeam?.team || 0} score={winningTeam?.score || 0} />;
    case GameState.START:
    default:
      return <Home onStart={() => setGameState(GameState.PROGRESS)} />;
  }
};
