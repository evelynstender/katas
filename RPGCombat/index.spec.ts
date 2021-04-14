import { Character } from "./index";

describe("When character is created", () => {
  it("should have health 1000", () => {
    const character = new Character("c1");

    expect(character.health).toBe(1000);
  });

  it("should have at level 1", () => {
    const character = new Character("c1");

    expect(character.level).toBe(1);
  });

  it("should be alive", () => {
    const character = new Character("c1");

    expect(character.isAlive).toBeTruthy();
  });
});

describe("When character is on battle", () => {
  describe("damaging", () => {
    it("should subtract damage from health", () => {
      const character1 = new Character("c1");

      const character2 = new Character("c2");

      character1.damage(character2, 100);

      expect(character2.health).toBe(900);
    });

    it("should kill character if damage exceeds health", () => {
      const character1 = new Character("c1");

      const character2 = new Character("c2");

      character1.damage(character2, 1001);

      expect(character2.health).toBe(0);

      expect(character2.isAlive).toBeFalsy();
    });

    it("should not damage itself", () => {
      const character1 = new Character("c1");

      character1.damage(character1, 100);

      expect(character1.health).toBe(1000);
    });

    it("should reduce damage by 50% if target is 5 or more levels above the attacker", () => {
      const character1 = new Character("c1");
      const character2 = new Character("c2");
      character2.level = 6;

      character1.damage(character2, 100);

      expect(character2.health).toBe(950);
    });

    it("should increse damage by 50% if attacker is 5 or more levels above the target", () => {
      const character1 = new Character("c1");

      character1.level = 6;
      const character2 = new Character("c2");

      character1.damage(character2, 100);

      expect(character2.health).toBe(850);
    });
  });

  describe("healing", () => {
    it("should not heal dead characters", () => {
      const character1 = new Character("c1");

      const character2 = new Character("c2");

      character1.damage(character2, 1001);
      character2.heal(10);

      expect(character2.isAlive).toBeFalsy();
    });

    it("should have maximium of 1000 health", () => {
      const character1 = new Character("c1");

      const character2 = new Character("c2");

      character1.damage(character2, 100);
      character2.heal(101);

      expect(character2.health).toBe(1000);
    });

    it("a character can only heal itself", () => {
      const character1 = new Character("c1");

      const character2 = new Character("c2");

      character1.damage(character2, 100);
      character1.heal(90);

      expect(character2.health).toBe(900);
    });
  });

  describe("range", () => {
    it("should have and attack max range", () => {
      const character1 = new Character("c1");

      expect(!!character1.maxRange).toBeTruthy();
    });

    it("should have a range of 2 meters if melee fighter", () => {
      const character1 = new Character("c1");

      expect(character1.maxRange).toBe(2);
    });

    it("should have a range of 20 meters if ranged fighter", () => {
      const character1 = new Character("c1", "ranged");

      expect(character1.maxRange).toBe(20);
    });

    it("should be in range to deal damage to target", () => {
      const character1 = new Character("c1", "ranged");
      const character2 = new Character("c2");

      character1.damage(character2, 100);

      expect(character2.health).toBe(850);
    });
  });
});
