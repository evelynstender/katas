export enum FighterRange {
  MELEE = 2,
  RANGED = 20,
}

export type Faction = {
  name: string;
};

export class Target {
  health: number;
  isAlive: boolean;

  constructor() {
    this.health = 1000;
    this.isAlive = true;
  }
}

export class Thing extends Target {
  constructor() {
    super();
  }
}

export class Character extends Target {
  health: number;
  isAlive: boolean;
  level: number;
  maxRange: FighterRange;
  position: number;
  factions: Faction[];

  constructor(fighterRange?: FighterRange, postion?: number) {
    super();
    this.level = 1;
    this.factions = [];
    this.maxRange = fighterRange || FighterRange.MELEE;
    this.position = postion || 0;
  }

  damage(target: Target, damage: number) {
    if (target instanceof Thing) {
      target.health -= damage;
    } else {
      const characterTarget = <Character>target;
      if (
        characterTarget !== this &&
        characterTarget.characterStatus(this) !== "Ally"
      ) {
        const distance = Math.abs(this.position - characterTarget.position);

        if (distance > this.maxRange) {
          return;
        }

        const levelDifference = characterTarget.level - this.level;

        if (levelDifference >= 5) {
          characterTarget.health -= damage / 2;
        } else if (levelDifference < 0) {
          characterTarget.health -= damage * 1.5;
        } else {
          characterTarget.health -= damage;
        }
      }
    }

    if (target.health < 0) {
      target.isAlive = false;
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
