// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Owner.sol";
import "../models/FlightModel.sol";
import "./Flights.sol";

contract Airline is Owner {
    struct User {
        uint loyalityPoints;
        Flight[] bookedFlights;
    }

    mapping(address => User) users;

    Flights flightContract;
    constructor(Flights flight) {
        flightContract = flight;
    }

    // function bookFlight(string memory flightNumber) external payable {
    //     require(Flights.isFlightAvailiable(flightNumber));
    //     require(msg.value ==  Flights.availableFlights());

    // }



}