export enum FighterRange {
  MELEE = 2,
  RANGED = 20,
}

export type Faction = {
  name: string;
};

export class Character {
  health: number;
  level: number;
  isAlive: boolean;
  maxRange: FighterRange;
  position: number;
  factions: Faction[];

  constructor(fighterRange?: FighterRange, postion?: number) {
    this.health = 1000;
    this.level = 1;
    this.isAlive = true;
    this.factions = [];
    this.maxRange = fighterRange || FighterRange.MELEE;
    this.position = postion || 0;
  }

  damage(target: Character, damage: number) {
    if (target !== this && target.characterStatus(this) !== "Ally") {
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

  heal(healPoints: number, character?: Character) {
    if (this.isAlive) {
      if (character) {
        if (character.characterStatus(this) === "Ally") {
          character.health += healPoints;

          if (character.health > 1000) {
            character.health = 1000;
          }
        }
      } else {
        this.health += healPoints;
      }

      if (this.health > 1000) {
        this.health = 1000;
      }
    }
  }

  joinFaction(faction: Faction) {
    this.factions.push(faction);
  }

  leaveFaction(faction: Faction) {
    const foundFaction = this.factions.find((fact) => {
      return fact.name === faction.name;
    });

    if (foundFaction) {
      this.factions.splice(this.factions.indexOf(foundFaction), 1);
    }
  }

  characterStatus(character: Character) {
    const isAlly = this.factions.find((faction) => {
      const characterFaction = character.factions.find((fact) => {
        return fact.name == faction.name;
      });

      return characterFaction;
    });

    return isAlly ? "Ally" : "Enemy";
  }
}
