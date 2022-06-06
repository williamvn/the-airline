// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./Owner.sol";
import "../models/FlightModel.sol";

contract Flights is Owner {
    mapping(string => Flight) private flights;
    mapping(string => bool) private availableFlights;
    Flight[] private availableFlightsList;

    event FlightAdded(Flight flight);

    function addFlight(Flight memory flight) external onlyOwner() {
        require(!isFlightAvailiable(flight.number), "Flight already registered");
        require(flight.price >= 1, "A lower price could hack the contract");
        availableFlights[flight.number] = true;
        flights[flight.number] = flight;
        availableFlightsList.push(flight);
        emit FlightAdded(flight);
    }

    function isFlightAvailiable(string memory number) public view returns(bool) {
        return availableFlights[number];
    }

    function getAvailableFlights() external view returns(Flight[] memory) {
        return availableFlightsList;
    }

    function getFlight(string memory flightNumber) external view returns(Flight memory) {
        require(isFlightAvailiable(flightNumber), "Flight not available");
        return flights[flightNumber]; 
    }
}