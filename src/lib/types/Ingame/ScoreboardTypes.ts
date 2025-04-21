import type { PowerPlay } from "./PowerPlayTypes";
import type { FeatsOfStrength } from "./PowerPlayTypes";

export interface Scoreboard {
  teams: Team[];
  gameTime: number;
  bestOf: number;
}

export interface Team {
  teamName: string;
  teamTag: string;
  teamIconUrl: string;
  seriesScore: SeriesScore;
  totalScore: SeriesScore;
  infoText: string;
  gold: number;
  kills: number;
  towers: number;
  grubs: number;
  dragons: string[];
  atakhan: null;
  baronPowerPlay: PowerPlay | null;
  dragonPowerPlay: PowerPlay | null;
  featsOfStrength: FeatsOfStrength;
}

export interface SeriesScore {
  wins: number;
  losses: number;
}