const assert = require('assert');
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
    describe("Flight Booking", () => {
        it('should book a flight', async () => {
            // arrange
            await addFlights();
            const price = web3.utils.toWei(flightsList[0][3].toString());
            const number = flightsList[0][0];

            //act
            await airline.bookFlight(number, { from: accounts[1], value: price });
            const user = await airline.getUser({ from: accounts[1] });

            //assert
            assert.equal(user.loyalityPoints, 1);
            assert.equal(user.bookedFlights.length, 1);
            assert.equal(user.bookedFlights[0].number, number);
        });

        it('should fail trying to book an non existing flight', async () => {
            let expected;
            try {
                await airline.bookFlight("NONEXISTING", { from: accounts[1], value: 1 });
            } catch (error) {
                expected = error;
            }
            assert.ok(expected?.message.includes("Flight not available"));
        });

        it('should fail trying to book a flight passing an incorrect value', async () => {
            await addFlights();
            const number = flightsList[0][0];

            let expected;
            try {
                await airline.bookFlight(number, { from: accounts[1], value: 1 });
            } catch (error) {
                expected = error;
            }
            assert.ok(expected?.message.includes("Wrong price"));
        });

        it('should be able to reclaim points in ether after 5 purchases', async () => {
            // arrange
            await addFlights();
            await bookFiveFlights(accounts[2]);
            const expected = parseInt(await web3.eth.getBalance(accounts[2]));

            // act
            await airline.reclaimPoints({from: accounts[2]});

            // assert
            const received = parseInt(await web3.eth.getBalance(accounts[2]));
            assert.ok(received > expected);

            const loyalityPoints = (await airline.getUser({from: accounts[2]})).loyalityPoints;
            assert.equal(loyalityPoints, 0);

        });

        it("should not be able to reclaim points since client doesn't have enought purchases", async () => {
            // arrange
            await addFlights();
            const price = web3.utils.toWei(flightsList[0][3].toString());
            const number = flightsList[0][0];
            await airline.bookFlight(number, { from: accounts[3], value: price });
            
            // act
            let received;
            try {
                await airline.reclaimPoints({from: accounts[3]});
            } catch (error) {
                received = error;                
            }

            // assert
            assert.ok(received?.message.includes("Not enought points"));

        });
    });
});

async function bookFiveFlights(account) {
    const price = web3.utils.toWei(flightsList[0][3].toString());
    const number = flightsList[0][0];
    for (let i = 0; i < 5; i++) {
        await airline.bookFlight(number, { from: account, value: price });
    }
}

async function addFlights() {
    for (let i = 0; i < flightsList.length; i++) {
        await flights.addFlight(flightsList[i]);
    }
}