import { useState } from "react";
import { Question } from "./models";
import { GameEnd } from "./modules/end/End";
import { Game } from "./modules/game/Game";
import { QUESTIONS } from "./modules/game/questions";
import { Home } from "./modules/home/Home";
import { Settings } from "./modules/settings/Settings";
import { SettingValues } from "./modules/settings/type";

enum GameState {
  SETTINGS = "settings",
  START = "start",
  PROGRESS = "progress",
  END = "end",
};

export const App = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [winningTeam, setWinningTeam] = useState<{ score: number, team: number }>();
  const [questionSet] = useState<Question[]>(QUESTIONS);
  const [targetScore, setTargetScore] = useState<number>(300);

  const handleGameEnd = (team: number, score: number) => {
    setWinningTeam({ team, score });
    setGameState(GameState.END)
  };
  const updateSettings = (settings: SettingValues) => {
    setTargetScore(settings.targetScore);
    setGameState(GameState.START);
  };

  switch (gameState) {
    case GameState.PROGRESS:
      return (
        <Game
          onEnd={handleGameEnd}
          questions={questionSet}
          targetPoints={targetScore}
        />
      );
    case GameState.END:
      return (
        <GameEnd
          onRestart={() => setGameState(GameState.PROGRESS)}
          team={winningTeam?.team || 0}
          score={winningTeam?.score || 0}
        />
      );
    case GameState.SETTINGS:
      return (
        <Settings
          initial={{ targetScore }}
          onCancel={() => setGameState(GameState.START)}
          onSubmit={updateSettings}
        />
      );
    case GameState.START:
    default:
      return (
        <Home
          onStart={() => setGameState(GameState.PROGRESS)}
          onSettings={() => setGameState(GameState.SETTINGS)}
        />
      );
  }
};
