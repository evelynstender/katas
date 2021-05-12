export class Character {
  health: number = 1000;
  level: number = 1;
  isAlive: boolean = true;

  constructor() {}

  damage(character: Character, damage: number) {
    character.health -= damage;

    if (character.health < 0) {
      character.isAlive = false;
    }
  }

  heal(character: Character, healPoints: number) {
    if(character.isAlive) {
      character.health += healPoints

      if(character.health > 1000) {
        character.health = 1000;
      }
    }
  }
}
