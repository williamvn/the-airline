import getAirline from "../providers/airline";

export class AirlineService {
    static singleton;
    static async getInstance() {
        if (!this.singleton) {
            this.singleton = new AirlineService();
            this.singleton.airlineContract = await getAirline();
        }
        return this.singleton;
    }
}