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
    event FlightBooked(address indexed user, Flight flight);
    uint etherPerPoint = 0.05 ether;
    Flights flightContract;
    
    constructor(Flights flight) {
        flightContract = flight;
    }

    function bookFlight(string memory flightNumber) external payable {
        Flight memory flight = flightContract.getFlight(flightNumber);
        require(msg.value ==  flight.price * 10**18, "Wrong price");
        users[msg.sender].bookedFlights.push(flight);
        users[msg.sender].loyalityPoints ++;
        emit FlightBooked(msg.sender, flight);
    }

    function getUser() external view returns(User memory) {
        return users[msg.sender];
    }

    function reclaimPoints() external payable {
        require(users[msg.sender].loyalityPoints > 5, "Not enought points");
        require(users[msg.sender].loyalityPoints * etherPerPoint < address(this).balance, "Not enought balance");
        uint points = users[msg.sender].loyalityPoints;
        users[msg.sender].loyalityPoints = 0;
        payable(msg.sender).transfer(points * etherPerPoint);
    }

    function getBalance() external view onlyOwner() returns(uint) {
        return address(this).balance;
    }

    function getProfit(uint value) external payable onlyOwner {
       payable(owner).transfer(value);
    }



}