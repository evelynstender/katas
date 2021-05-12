import { Character } from ".";

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

describe("Characters can Deal Damage to Characters", () => {
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
});

describe("A Character can Heal a Character", () => {
  it("should not be able to heal a dead characters", () => {
    const character1 = new Character();
    const character2 = new Character();
    const character3 = new Character();


    character1.damage(character2, 1001);
    character3.heal(character2, 100);

    expect(character2.isAlive).toBeFalsy();
  });

  it("should not raise health above 1000 when healing a character", () => {
     const character1 = new Character();
     const character2 = new Character();
     const character3 = new Character();

     character1.damage(character2, 100);
     character3.heal(character2, 101);

     expect(character2.health).toBe(1000);
  })
});
