import { useState } from "react";
import { Layout } from "./layout/Layout";
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
      return <Layout><></></Layout>;
    case GameState.END:
      return <Layout><></></Layout>;
    case GameState.START:
    default:
      return <Layout><Home onStart={() => setGameState(GameState.PROGRESS)} /></Layout>;
  }
};
