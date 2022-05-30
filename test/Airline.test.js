const assert  = require('assert');
const Airline = artifacts.require("Airline");
const Flights = artifacts.require("Flights");
let airline;
let flights;
const flightsList = [
    ["CD123", "MAD", "VAR", 5],
    ["CD456", "HAV", "MIA", 2],
    ["CD768", "TOK", "AMS", 6]
]

beforeEach(async () => {
    flights = await Flights.new();
    airline = await Airline.new(flights.address);
});

contract('Airline', (accounts) => {
    it('should book a flight', async () => {
        // arrange
        await addFlights();
        const price = web3.utils.toWei(flightsList[0][3].toString());
        const number = flightsList[0][0];

        //act
        await airline.bookFlight(number, { from: accounts[1], value: price });
        const user = await airline.getUser({from: accounts[1]});

        //assert
        assert.equal(user.loyalityPoints, 1);
        assert.equal(user.bookedFlights.length, 1);
        assert.equal(user.bookedFlights[0].number, number);
    });
});

async function addFlights() {
    for (let i = 0; i < flightsList.length; i++) {
        await flights.addFlight(flightsList[i]);
    }
}