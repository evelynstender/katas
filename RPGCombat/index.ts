export enum FighterRange {
  MELEE = 2,
  RANGED = 20,
}

export class Character {
  health: number;
  level: number;
  isAlive: boolean;
  maxRange: FighterRange;
  position: number;

  constructor(fighterRange?: FighterRange, postion?: number) {
    this.health = 1000;
    this.level = 1;
    this.isAlive = true;
    this.maxRange = fighterRange || FighterRange.MELEE;
    this.position = postion || 0;
  }

  damage(target: Character, damage: number) {
    if (target !== this) {
      const distance = Math.abs(this.position - target.position);

      if (distance > this.maxRange) {
        return;
      }

      const levelDifference = target.level - this.level;

      if (levelDifference >= 5) {
        target.health -= damage / 2;
      } else if (levelDifference < 0) {
        target.health -= damage * 1.5;
      } else {
        target.health -= damage;
      }

      if (target.health < 0) {
        target.isAlive = false;
      }
    }
  }

  heal(healPoints: number) {
    if (this.isAlive) {
      this.health += healPoints;

      if (this.health > 1000) {
        this.health = 1000;
      }
    }
  }
}
