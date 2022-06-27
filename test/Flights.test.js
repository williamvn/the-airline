const assert = require('assert');
const Flights = artifacts.require("Flights");
let flights;
const flightsList = [
    ["CD123", "MAD", "VAR", web3.utils.toWei('0.05')],
    ["CD456", "HAV", "MIA", web3.utils.toWei('0.02')],
    ["CD768", "TOK", "AMS", web3.utils.toWei('0.06')]
]

beforeEach(async () => {
    flights = await Flights.new();
});

contract('Flights', (accounts) => {
    describe("Add a Flight", () => {
        it('should add a flight', async () => {
            //arrange
            const availableFlights = (await flights.getAvailableFlights()).length;

            //act
            await flights.addFlight(flightsList[0]);

            //assert
            const shoudlBeAvailable = await flights.isFlightAvailiable(flightsList[0][0]);
            const receivedAvailableFlights = (await flights.getAvailableFlights()).length;
            assert.ok(shoudlBeAvailable);
            assert.equal(receivedAvailableFlights, availableFlights + 1);
        });

        it('should fail due the flight has been already added', async () => {
            //arrange
            await flights.addFlight(flightsList[0]);
            const availableFlights = (await flights.getAvailableFlights()).length;
            
            //act
            let received;
            try {
                await flights.addFlight(flightsList[0]);
            } catch (error) {
                received = error;
            }

            //assert
            const receivedAvailableFlights = (await flights.getAvailableFlights()).length;
            assert.ok(received?.message.includes("Flight already registered"));
            assert.equal(receivedAvailableFlights, availableFlights);
        });

        it('should fail due the flight price is too low', async () => {
            //arrange
            const availableFlights = (await flights.getAvailableFlights()).length;

            //act
            let received;
            try {
                await flights.addFlight( ["CD123", "MAD", "VAR", 0.2]);
            } catch (error) {
                received = error;
            }

            //assert
            const receivedAvailableFlights = (await flights.getAvailableFlights()).length;
            assert.ok(!!received);
            assert.equal(receivedAvailableFlights, availableFlights);
        });
    });

    describe("Get Flight", () => {
        it('should be able to get a Flight by number', async () => {
            //arrange
            await flights.addFlight(flightsList[0]);

            //act
            const flight = await flights.getFlight(flightsList[0][0]);

            //assert
            assert.equal(flight.number, flightsList[0][0])
            assert.equal(flight.origin, flightsList[0][1])
            assert.equal(flight.destination, flightsList[0][2])
            assert.equal(flight.price, flightsList[0][3])
        });
    });
});