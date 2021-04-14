export declare type FigtherType = "melee" | "ranged";

export class Character {
  health: number;
  level: number;
  isAlive: boolean;
  name: string;
  maxRange: number;
  fighterType: FigtherType;

  constructor(name: string, fighterType: FigtherType = "melee") {
    this.health = 1000;
    this.level = 1;
    this.isAlive = true;
    this.name = name;

    this.fighterType = fighterType;

    this.maxRange = fighterType === "melee" ? 2 : 20;
  }

  damage(character: Character, value: number) {
    if (character.name !== this.name) {
      if (this.level + 5 <= character.level) {
        character.health = character.health - value / 2;
      } else if (character.level + 5 <= this.level) {
        character.health = character.health - (value / 2 + value);
      } else {
        character.health -= value;
      }

      if (character.health < 0) {
        character.health = 0;
        character.isAlive = false;
      }
    }
  }

  heal(value: number) {
    this.health += value;

    if (this.health > 1000) {
      this.health = 1000;
    }
  }
}
