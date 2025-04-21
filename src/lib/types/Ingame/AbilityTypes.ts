export interface Ability {
  identifier: string;
  displayName: string;
  slot: string;
  totalCooldown: number;
  cooldown: number;
  level: number;
  charges: number;
  assets: AbilityAssets;
}

export interface AbilityAssets {
  spellName: string;
  iconAsset: string;
  iconName: string;
}