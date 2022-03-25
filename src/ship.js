const initYearsInService = 0;
const maxYearsInService = 30;

function Ship(name) {
  this.name = name;
  this.yearsInService = initYearsInService;
}

module.exports = Ship;
