const Ship = require("../src/ship");

describe("constructor", () => {
  it("returns an object", () => {
    expect(new Ship("Enterprise")).toBeInstanceOf(Object);
  });

  it("sets the name property", () => {
    const ship = new Ship("Enterprise");

    expect(ship.name).toEqual("Enterprise");
  });
});

describe("yearsInService", () => {
  it("Increases year of service by 1", () => {
    const ship = new Ship("Enterprise");

    ship.yearsInService();

    expect(ship.age).toEqual(1);
  });
});
