export class Character {
  health: number;
  level: number;
  isAlive: boolean;

  constructor() {
    this.health = 1000;
    this.level = 1;
    this.isAlive = true;
  }

  damage(value: number) {
    this.health -= value;

    if(this.health < 0) {
      this.health = 0
      this.isAlive = false;
    }
  }

  heal(value: number) {
    this.health += value;

    if(this.health > 1000) {
      this.health = 1000;
    }
  }
}
