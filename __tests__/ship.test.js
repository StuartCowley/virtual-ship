const Ship = require("../src/ship");

describe("constructor", () => {
  it("returns an object", () => {
    expect(new Ship("Enterprise")).toBeInstanceOf(Object);
  });
  const ship = new Ship("Enterprise");
  it("sets the name property", () => {
    expect(ship.name).toEqual("Enterprise");
  });
  it("initial year of 0", () => {
    expect(ship.yearsInService).toEqual(0);
  });
  it("initial fuel of 10", () => {
    expect(ship.fuel).toEqual(20);
  });
  it("initial morale of 8", () => {
    expect(ship.morale).toEqual(8);
  });
});

describe("yearsInService", () => {
  const ship = new Ship("Excelsior");
  it("increments year by 1", () => {
    ship.tourOfDuty();
    expect(ship.yearsInService).toEqual(1);
  });
});

describe("fuel", () => {
  const ship = new Ship("Yorktown");
  it("decrease fuel by 1", () => {
    ship.tourOfDuty();

    expect(ship.fuel).toEqual(19);
  });
});

describe("morale", () => {
  const ship = new Ship("Valiant");
  it("increase morale by 1", () => {
    ship.tourOfDuty();
    expect(ship.morale).toEqual(9);
  });
});

describe("supplyRun", () => {
  const ship = new Ship("Defiant");
  it("if ship is no longer in service, return message", () => {
    ship.yearsInService = 39;
    expect(() => ship.shipStatus()).toThrow("Defiant is no longer in service.");
  });

  it("increases fuel to a max of 20, yearsInService by 1 and decrease morale by 1.", () => {
    ship.fuel = 18;
    ship.morale = 10;
    ship.yearsInService = 5;
    ship.supplyRun();

    expect(ship.fuel).toEqual(20);
    expect(ship.yearsInService).toEqual(6);
    expect(ship.morale).toEqual(8);
  });

  it("increases fuel by 10", () => {
    ship.fuel = 7;
    ship.supplyRun();
    expect(ship.fuel).toEqual(17);
  });
});

describe("shoreLeave", () => {
  const ship = new Ship("Reliant");
  it("if ship is no longer in service, throw error", () => {
    ship.yearsInService = 33;
    expect(() => ship.shipStatus()).toThrow("Reliant is no longer in service.");
  });
  it("increases morale to a max of 10 and decrease yearsInService by 1.", () => {
    ship.morale = 9;
    ship.yearsInService = 5;
    ship.shoreLeave();

    expect(ship.morale).toEqual(10);
    expect(ship.yearsInService).toEqual(6);
  });
  it("increases morale by 6", () => {
    ship.morale = 2;
    ship.shoreLeave();
    expect(ship.morale).toEqual(8);
  });
});

describe("shipStatus", () => {
  const ship = new Ship("Enterprise");
  it("if ship is no longer in service, throw error", () => {
    ship.yearsInService = 35;
    expect(() => ship.shipStatus()).toThrow(
      "Enterprise is no longer in service."
    );
  });
  it("if fuel is running low, return message", () => {
    ship.fuel = 2;
    ship.yearsInService = 25;
    expect(ship.shipStatus()).toBe("2 units of fuel, our fuel is running low!");
  });
  it("if morale is running low, return message", () => {
    ship.morale = 1;
    ship.fuel = 20;
    expect(ship.shipStatus()).toBe(
      "The crew scores a 1 on the happiness scale. They need a break!"
    );
  });
  it("if morale AND fuel are running low, return message", () => {
    ship.morale = 1;
    ship.fuel = 2;
    expect(ship.shipStatus()).toBe(
      "We're in dire straits. We only have 2 units of fuel left AND our crew is getting angry, with just a 1 on the happiness scale!"
    );
  });
  it("return a message if both values are above the threshold", () => {
    ship.morale = 10;
    ship.fuel = 20;
    expect(ship.shipStatus()).toBe("All systems nominal!");
  });
});

describe("buildShuttle", () => {
  it("Builds a shuttle and places into shuttles array", () => {
    const builder = new Ship("Dave");

    builder.buildShuttle("001");
    expect(builder.shuttles).toEqual([
      { name: "001", yearsInService: 0, fuel: 20, morale: 8, shuttles: [] },
    ]);
  });
});
