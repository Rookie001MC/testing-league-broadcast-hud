export interface Health {
  current: number;
  max: number;
  shield: number;
  physicalShield: number;
  magicalShield: number;
}

export interface Resource {
  type: string;
  current: number;
  max: number;
}

export interface Experience {
  previousLevel: number;
  current: number;
  nextLevel: number;
}