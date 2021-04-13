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
      const character = new Character();

      character.damage(100)

      expect(character.health).toBe(900)
    })

    it("should kill character if damage exceeds health", () => {
      const character = new Character()

      character.damage(1001)

      expect(character.health).toBe(0)

      expect(character.isAlive).toBeFalsy()
    })
  })

  describe("healing", () => {
    it("should not heal dead characters", () => {
      const character = new Character();

      character.damage(1001);
      character.heal(1)

      expect(character.isAlive).toBeFalsy()
    })

    it("should have maximium of 1000 health", () => {
      const character = new Character();

      character.damage(100);
      character.heal(101);

      expect(character.health).toBe(1000)
    })
  })
})
