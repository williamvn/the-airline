import getFlightContract from "../providers/flights";

export class FlightService {
    static singleton;
    static async getInstance() {
        if (!this.singleton) {
            const flightContract = await getFlightContract();
            this.singleton = new FlightService();
            this.singleton.flightContract = flightContract;
        }
        return this.singleton;
    }

    getAvailableFlights() {
        return this.flightContract.getAvailableFlights();
    }
}