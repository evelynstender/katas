export class Character {
  health: number = 1000;
  level: number = 1;
  isAlive: boolean = true;

  constructor() {}

  damage(target: Character, damage: number) {
    if (target !== this) {
      const diffLevel = target.level - this.level;

      if (diffLevel >= 5) {
        target.health -= damage / 2;
      } else if (diffLevel < 0) {
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
