import getAirline from "../providers/airline";

export class AirlineService {
    static singleton;
    static async getInstance() {
        if (!this.singleton) {
            const airlineContract = await getAirline();
            this.singleton = new AirlineService(airlineContract);
        }
        return this.singleton;
    }

    constructor(airlineContract) {
        this.airlineContract = airlineContract;
    }

    getUser(account) {
        return this.airlineContract.getUser({ from: account });
    }

    bookFlight(flightNumber, account, price) {
        return this.airlineContract.bookFlight(flightNumber, { from: account, value: price });
    }

    getflightBookedEvent() {
        if (!this.flightBookedEvent) {
            this.flightBookedEvent = this.airlineContract.FlightBooked();
        }
        return this.flightBookedEvent;
    }

    getPointsRedeemedEvent() {
        if (!this.pointsRedeemedEvent) {
            this.pointsRedeemedEvent = this.airlineContract.PointsRedeemed();
        }
        return this.pointsRedeemedEvent;
    }

    reclaimPoints(account) {
        return this.airlineContract.reclaimPoints({ from: account });
    }

    async amIOwner(account) {
        try {
            return await this.airlineContract.amIOwner({ from: account });
        } catch (error) {
            if (error.message.includes("Access Denied, only owner can access this resource")) {
                return false;
            }
            throw error;
        }
    }
}