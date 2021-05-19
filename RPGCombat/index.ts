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
  position: number;

  constructor(position: number = 0) {
    this.health = 1000;
    this.isAlive = true;
    this.position = position;
  }
}

export class Thing extends Target {
  constructor(position: number = 0) {
    super(position);
  }
}

export class Character extends Target {
  health: number;
  isAlive: boolean;
  level: number;
  maxRange: FighterRange;
  factions: Faction[];

  constructor(fighterRange?: FighterRange, position?: number) {
    super(position);
    this.level = 1;
    this.factions = [];
    this.maxRange = fighterRange || FighterRange.MELEE;
  }

  private dealDamage = (
    target: Target,
    damage: number,
    levelDifference: number = 0
  ) => {
    if (levelDifference >= 5) {
      target.health -= damage / 2;
    } else if (levelDifference < 0) {
      target.health -= damage * 1.5;
    } else {
      target.health -= damage;
    }
  };

  private canDealDamage = (target: Character, distance: number): boolean => {
    return (
      distance < this.maxRange &&
      target !== this &&
      target.characterStatus(this) !== "Ally"
    );
  };

  damage(target: Target, damage: number) {
    if (target instanceof Character) {
      const distance = Math.abs(this.position - target.position);
      if (this.canDealDamage(target, distance)) {
        const levelDifference = target.level - this.level;

        this.dealDamage(target, damage, levelDifference);
      }
    } else {
      this.dealDamage(target, damage);
    }

    if (target.health <= 0) {
      target.isAlive = false;
    }
  }
  heal(healPoints: number) {
    if (!this.isAlive) {
      return;
    }
    this.health += healPoints;
    if (this.health > 1000) {
      this.health = 1000;
    }
  }

  healAlly(healPoints: number, character: Character) {
    if (
      this.isAlive &&
      character.isAlive &&
      character.characterStatus(this) === "Ally"
    ) {
      character.health += healPoints;

      if (character.health > 1000) {
        character.health = 1000;
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
    const isAlly = this.factions.find((faction) =>
      character.factions.find(
        (characterFaction) => faction.name === characterFaction.name
      )
    );
    return isAlly ? "Ally" : "Enemy";
  }
}
