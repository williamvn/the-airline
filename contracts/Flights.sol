// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./Owner.sol";
import "../models/FlightModel.sol";

contract Flights is Owner {
    mapping(string => Flight) private flights;
    mapping(string => bool) private availableFlights;
    Flight[] private availableFlightsList;

    event FlightAdded(Flight flight);

    constructor() {
        Flight[6] memory seedFlights = [
            Flight({ number: "CD123", origin:"MAD", destination:"VAR", price: 5}),
            Flight({ number: "CD456", origin:"HAV", destination:"MIA", price: 2}),
            Flight({ number: "CD768", origin:"TOK", destination:"AMS", price: 6}),
            Flight({ number: "UX768", origin:"MAD", destination:"AGP", price: 2}),
            Flight({ number: "DX768", origin:"MAD", destination:"CUN", price: 4}),
            Flight({ number: "DX769", origin:"PAR", destination:"LON", price: 2})
        ];

        for (uint256 i = 0; i < seedFlights.length; i++) {
            addFlight(seedFlights[i]);
        }
    }

    function addFlight(Flight memory flight) public onlyOwner() {
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