import type { Item } from "./ItemTypes";
import type { ChampionAssets } from "./PlayerTypes";

export interface ScoreboardBottom {
  gameTime: number;
  teams: TeamBottom[];
}

export interface TeamBottom {
  id: string;
  name: string;
  tag: string;
  players: PlayerBottom[];
}

export interface PlayerBottom {
  champion: ChampionAssets;
  name: string;
  kills: number;
  deaths: number;
  assists: number;
  level: number;
  gold: number;
  totalGold: number;
  creepScore: number;
  visionScore: number;
  shutdown: number;
  respawnTimeRemaining: number;
  hasFeatsOfStrength: boolean;
  items: Item[];
}