export interface Item {
  id: number;
  displayName: string;
  asset: string;
  modifier: null;
  cost: number;
  count: number;
  combineCost: number;
  stats: any[];
  cooldown: number;
  maxCooldown: number;
  stacks: number;
  visionScore: number;
}