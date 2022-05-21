const Airline = artifacts.require("Airline");
const Flight = artifacts.require("Flights");

module.exports = async function (deployer) {
  await deployer.deploy(Flight);
  await deployer.deploy(Airline, Flight.address);
};
