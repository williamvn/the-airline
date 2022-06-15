import FlightsContract from "../build/contracts/Flights.json";
import contract from "truffle-contract";

const getFlightContract = async () => {
    const flights = contract(FlightsContract);
    flights.setProvider(window.ethereum);
    return flights.deployed();
};

export default getFlightContract;