import { Character } from "./index";


describe("When character is created", () => {
  it("should have health 1000", () => {
    const character = new Character();

    expect(character.health).toBe(1000)
  })

  it("should have at level 1", () => {
    const character = new Character();

    expect(character.level).toBe(1)
  })

  it("should be alive", () => {
    const character = new Character();

    expect(character.isAlive).toBeTruthy()
  })
});

describe("When character is on battle", () => {
  describe("damaging", () => {
    it("should subtract damage from health", () => {
      const character1 = new Character();

      const character2 = new Character();

      character1.damage(character2, 100);

      expect(character2.health).toBe(900)
    })

    it("should kill character if damage exceeds health", () => {
      const character1 = new Character();

      const character2 = new Character();

      character1.damage(character2, 1001);

      expect(character2.health).toBe(0)

      expect(character2.isAlive).toBeFalsy()
    })
  })

  describe("healing", () => {
    it("should not heal dead characters", () => {
      const character1 = new Character();

      const character2 = new Character();

      character1.damage(character2, 1001);
      character1.heal(character2, 1);

      expect(character2.isAlive).toBeFalsy()
    })

    it("should have maximium of 1000 health", () => {
      const character1 = new Character();

      const character2 = new Character();

      character1.damage(character2,100);
      character1.heal(character2, 101);

      expect(character2.health).toBe(1000);
    })
  })
})
