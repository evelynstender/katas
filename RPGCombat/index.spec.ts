import { Character, FighterRange, Target, Thing } from ".";

describe("Character created", () => {
  it("should start with 1000 health", () => {
    const character = new Character();

    expect(character.health).toBe(1000);
  });

  it("should start with level 1", () => {
    const character = new Character();

    expect(character.level).toBe(1);
  });

  it("should start game as alive", () => {
    const character = new Character();

    expect(character.isAlive).toBeTruthy();
  });
});

describe("Character damage", () => {
  it("should subtract damage from hit character", () => {
    const character1 = new Character();
    const character2 = new Character();

    character1.damage(character2, 100);

    expect(character2.health).toBe(900);
  });

  it("should kill character when damage received is above health", () => {
    const character1 = new Character();
    const character2 = new Character();

    character1.damage(character2, 1001);

    expect(character2.isAlive).toBeFalsy();
  });

  it("should not be able to damage itself", () => {
    const character1 = new Character();

    character1.damage(character1, 100);

    expect(character1.health).toBe(1000);
  });

  it("should reduce damage by 50% if target is 5 or more levels above attacker", () => {
    const character1 = new Character();
    const character2 = new Character();
    character2.level = 6;

    character1.damage(character2, 100);

    expect(character2.health).toBe(950);
  });

  it("should increase damage by 50% if attacker is 5 or more levels above target", () => {
    const character1 = new Character();
    character1.level = 6;
    const character2 = new Character();

    character1.damage(character2, 100);

    expect(character2.health).toBe(850);
  });

  it("should have an attack max range", () => {
    const character1 = new Character(FighterRange.MELEE);
    const character2 = new Character(FighterRange.RANGED);

    expect(character1.maxRange).toBe(2);
    expect(character2.maxRange).toBe(20);
  });

  it("should not be able to hit a character if out of range", () => {
    const character1 = new Character(FighterRange.MELEE);
    const character2 = new Character(FighterRange.RANGED, 25);

    character1.damage(character2, 100);

    expect(character2.health).toBe(1000);
  });

  it("should be able to hit a character if in range", () => {
    const character1 = new Character(FighterRange.MELEE);
    const character2 = new Character(FighterRange.RANGED, 15);

    character2.damage(character1, 100);

    expect(character1.health).toBe(900);
  });

  it("should not be able to deal damage to another ally", () => {
    const character1 = new Character();
    const character2 = new Character();

    character1.joinFaction({ name: "Faction1" });
    character2.joinFaction({ name: "Faction1" });

    character1.damage(character2, 100);

    expect(character2.health).toBe(1000);
  });

  it("should be able to damage non-character things", () => {
    const character = new Character();
    const tree = new Thing();

    character.damage(tree, 100);

    expect(tree.health).toBe(900);
  });

  it("should be destroyed when health is reduced to 0", () => {
    const character = new Character();
    const tree = new Thing();

    character.damage(tree, 1001);

    expect(tree.isAlive).toBe(false);
  });
});

describe("Character heal", () => {
  it("should not be able to heal a dead characters", () => {
    const character1 = new Character();
    const character2 = new Character();

    character1.damage(character2, 1001);
    character2.heal(100);

    expect(character2.isAlive).toBeFalsy();
  });

  it("should not raise health above 1000 when healing a character", () => {
    const character1 = new Character();
    const character2 = new Character();

    character1.damage(character2, 100);
    character2.heal(101);

    expect(character2.health).toBe(1000);
  });

  it("should only be able to heal itself", () => {
    const character1 = new Character();
    const character2 = new Character();

    character1.damage(character2, 100);

    character2.heal(50);

    expect(character2.health).toBe(950);
  });

  it("should be able to heal to another ally", () => {
    const character1 = new Character();
    const character2 = new Character();
    const character3 = new Character();

    character1.joinFaction({ name: "Faction1" });
    character2.joinFaction({ name: "Faction1" });
    character2.joinFaction({ name: "Faction2" });

    character3.damage(character2, 100);

    character1.healAlly(150, character2);

    expect(character2.health).toBe(1000);
  });
   it("should not be able to heal to enemy", () => {
     const character1 = new Character();
     const character3 = new Character();

     character1.joinFaction({ name: "Faction1" });
     character3.joinFaction({ name: "Faction2" });

     character1.damage(character3, 100);

     character1.healAlly(150, character3);

     expect(character3.health).toBe(900);
   });
});

describe("Character factions", () => {
  it("should have no factions if newly created", () => {
    const character1 = new Character();

    expect(character1.factions).toHaveLength(0);
  });

  it("should be able to join one faction", () => {
    const character1 = new Character();

    character1.joinFaction({ name: "Faction1" });

    expect(character1.factions).toHaveLength(1);
    expect(character1.factions[0].name).toBe("Faction1");
  });

  it("should be able to join more than one faction", () => {
    const character1 = new Character();

    character1.joinFaction({ name: "Faction1" });
    character1.joinFaction({ name: "Faction2" });

    expect(character1.factions).toHaveLength(2);
  });

  it("should be able to leave faction", () => {
    const character1 = new Character();

    character1.joinFaction({ name: "Faction1" });
    character1.leaveFaction({ name: "Faction1" });
    expect(character1.factions).toHaveLength(0);
  });

  it("should be considered ally if on the same faction", () => {
    const character1 = new Character();
    const character2 = new Character();

    character1.joinFaction({ name: "Faction1" });
    character2.joinFaction({ name: "Faction1" });

    expect(character1.characterStatus(character2)).toBe("Ally");
  });

  it("should be considered enemy if on different factions", () => {
    const character1 = new Character();
    const character2 = new Character();

    character1.joinFaction({ name: "Faction1" });
    character2.joinFaction({ name: "Faction2" });

    expect(character1.characterStatus(character2)).toBe("Enemy");
  });
});
