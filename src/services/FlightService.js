import FlightList from "../components/FlightList/FlightList";
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

    async seedFlights(web3, account) {
        const flightsList = [
            ["CD123", "MAD", "VAR", web3.utils.toWei('0.01')],
            ["CD456", "HAV", "MIA", web3.utils.toWei('0.02')],
            ["CD768", "TOK", "AMS", web3.utils.toWei('0.06')],
            ["UX768", "MAD", "AGP", web3.utils.toWei('0.02')],
            ["DX768", "MAD", "CUN", web3.utils.toWei('0.04')],
            ["DX769", "PAR", "LON", web3.utils.toWei('0.02')]
        ];
        await this.flightContract.addMultiplesFlights(flightsList, {from: account});
    }
}