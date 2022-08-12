import { useState } from "react";
import { Game } from "./modules/game/Game";
import { Home } from "./modules/home/Home";

enum GameState {
  START = "start",
  PROGRESS = "progress",
  END = "end",
};

export const App = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START);

  switch (gameState) {
    case GameState.PROGRESS:
      return <Game onEnd={() => setGameState(GameState.END)} />;
    case GameState.END:
      return <></>;
    case GameState.START:
    default:
      return <Home onStart={() => setGameState(GameState.PROGRESS)} />;
  }
};
