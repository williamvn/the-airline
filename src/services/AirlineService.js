import getAirline from "../providers/airline";

export class AirlineService {
    static singleton;
    static async getInstance() {
        if (!this.singleton) {
            const airlineContract = await getAirline();
            this.singleton = new AirlineService();
            this.singleton.airlineContract = airlineContract;
        }
        return this.singleton;
    }

    getUser(account) {
        return this.airlineContract.getUser({from: account});
    }

    bookFlight(flightNumber, account, price) {
        return this.airlineContract.bookFlight(flightNumber, {from: account, value: price});
    }

    // onflightBookedEvent() {
    //     return this.airlineContract.events.FlightBooked({}, (err) => console.log("ERROR:", err));
    // }
}