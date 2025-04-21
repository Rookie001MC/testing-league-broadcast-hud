export interface ObjectiveTimer {
  timeTotal: number;
  timeLeft: number;
  subType: string;
  mapSide: null;
}

export interface InhibitorTeam {
  team: string;
  teamid: number;
  side: number;
  inhibitors: Inhibitor[];
}

export interface Inhibitor {
  timeTotal: number;
  timeLeft: number;
  subType: string;
  mapSide: null;
}