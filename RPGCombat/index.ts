export class Character {
  health: number;
  level: number;
  isAlive: boolean;

  constructor() {
    this.health = 1000;
    this.level = 1;
    this.isAlive = true;
  }

  damage(character: Character, value: number) {
    character.health -= value;

    if(character.health < 0) {
      character.health = 0
      character.isAlive = false;
    }
  }

  heal(character: Character, value: number) {
    character.health += value;

    if(character.health > 1000) {
      character.health = 1000;
    }
  }
}
