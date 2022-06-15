import AirlineContract from "../build/contracts/Airline.json";
import contract from "truffle-contract";
import getFlights from "./flights";

const getAirlineContract = async () => {
    const airline = contract(AirlineContract);
    airline.setProvider(window.ethereum);
    const flights = await getFlights();
    return airline.deployed(flights);
};

export default getAirlineContract;



