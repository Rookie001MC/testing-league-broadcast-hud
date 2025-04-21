import type { Scoreboard } from "./ScoreboardTypes";
import type { Tab } from "./PlayerTypes";
import type { ScoreboardBottom } from "./ScoreboardBottomTypes";
import type { ObjectiveTimer } from "./ObjectiveTypes";
import type { InhibitorTeam } from "./ObjectiveTypes";

export interface IngameStateUpdate {
  type: "ingame-state-update";
  state: GameState;
}

export interface GameState {
  gameTime: number;
  patch: string | null;
  gameVersion: string | null;
  gameStatus: "gameClosed" | "gameRunning" | "gamePause" | "gameOver";
  scoreboard: Scoreboard;
  tabs: Tab[];
  scoreboardBottom: ScoreboardBottom;
  baronPitTimer: ObjectiveTimer | null;
  atakhanTimer: ObjectiveTimer | null;
  dragonPitTimer: ObjectiveTimer | null;
  inhibitors: InhibitorTeam[];
}