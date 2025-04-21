import type { Ability } from "./AbilityTypes";
import type { Perk } from "./PerkType";
import type { Health } from "./StatTypes";
import type { Resource } from "./StatTypes";
import type { Experience } from "./StatTypes";

export interface Tab {
  id: number;
  players: Player[];
}

export interface Player {
  id: string;
  playerName: string;
  playerHashtag: string;
  championAssets: ChampionAssets;
  abilities: Ability[];
  perks: Perk[];
  health: Health;
  resource: Resource;
  stacksData: null;
  hasBaron: boolean;
  hasElder: boolean;
  level: number;
  experience: Experience;
  timeToRespawn: number;
}

export interface ChampionAssets {
  id: number;
  alias: string;
  name: string;
  splashCenteredImg: string;
  splashImg: string;
  loadingImg: string;
  squareImg: string;
}