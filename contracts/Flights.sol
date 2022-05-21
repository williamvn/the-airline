// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./Owner.sol";
import "../models/FlightModel.sol";

contract Flights is Owner {
    mapping(string => Flight) public flights;
    mapping(string => bool) public availableFlights;
    Flight[] public availableFlightsList;

    event FlightAdded(Flight flight);

    function addFlight(Flight memory flight) external onlyOwner() {
        require(!isFlightAvailiable(flight.number), "Flight already registered");
        availableFlights[flight.number] = true;
        flights[flight.number] = flight;
        availableFlightsList.push(flight);
        emit FlightAdded(flight);
    }

    function isFlightAvailiable(string memory number) private view returns(bool) {
        return availableFlights[number];
    }

    function getAvailableFlights() external view returns(Flight[] memory) {
        return availableFlightsList;
    }
}