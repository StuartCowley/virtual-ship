//Ship life
const initYearsInService = 0;
const maxYearsInService = 30;
const oneTourOfDuty = 1;

//Fuel
const lowFuel = 4;
const minFuel = 0;
const initFuel = 20;
const maxFuel = 20;

//Morale
const lowMorale = 2;
const minMorale = 0;
const initMorale = 8;
const maxMorale = 10;

//Resupply missions
const fuelResupply = 10;
const moraleResupply = 6;

function Ship(name) {
  this.name = name;
  this.yearsInService = initYearsInService;
  this.fuel = initFuel;
  this.morale = initMorale;
  this.shuttles = [];
}

Ship.prototype = {
  get isInService() {
    return (
      this.yearsInService < maxYearsInService &&
      this.fuel > minFuel &&
      this.morale > minMorale
    );
  },
};

Ship.prototype.tourOfDuty = function () {
  if (!this.isInService) {
    throw new Error(`${this.name} is no longer in service.`);
  }
  this.yearsInService += oneTourOfDuty;
  this.missionsComplete += oneTourOfDuty;
  this.fuel -= oneTourOfDuty;
  this.morale += oneTourOfDuty;
};

Ship.prototype.supplyRun = function () {
  if (!this.isInService) {
    throw new Error(`${this.name} is no longer in service.`);
  }
  if (this.fuel + fuelResupply <= maxFuel) {
    this.fuel += fuelResupply;
  } else {
    this.fuel = maxFuel;
  }
  this.yearsInService += oneTourOfDuty;
  this.morale -= lowMorale;
};

Ship.prototype.shoreLeave = function () {
  if (!this.isInService) {
    throw new Error(`${this.name} is no longer in service.`);
  }
  if (this.morale + moraleResupply <= maxMorale) {
    this.morale += moraleResupply;
  } else {
    this.morale = maxMorale;
  }
  this.yearsInService += oneTourOfDuty;
};

Ship.prototype.shipStatus = function () {
  if (!this.isInService) {
    throw new Error(`${this.name} is no longer in service.`);
  }
  if (this.fuel <= lowFuel && this.morale > lowMorale) {
    return `${this.fuel} units of fuel, our fuel is running low!`;
  }
  if (this.morale <= lowMorale && this.fuel > lowFuel) {
    return `The crew scores a ${this.morale} on the happiness scale. They need a break!`;
  }
  if (this.morale <= lowMorale && this.fuel <= lowFuel) {
    return `We're in dire straits. We only have ${this.fuel} units of fuel left AND our crew is getting angry, with just a ${this.morale} on the happiness scale!`;
  } else {
    return "All systems nominal!";
  }
};

Ship.prototype.buildShuttle = function (shuttleNumber) {
  const shuttle = new Ship(shuttleNumber);
  this.shuttles.push(shuttle);
};

module.exports = Ship;
