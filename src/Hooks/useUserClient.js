import { useContext, useEffect, useState } from "react"
import { AirlineService } from "../services/AirlineService";
import { Web3Context } from "../contexts/Web3Context";

export const useUserClient = () => {
    const [user, setUser] = useState({ loyalityPoints: 0, bookedFlights: [] });
    const {provider:web3, account} = useContext(Web3Context);

    useEffect(() => {
        (async () => {
            const airlineService = await AirlineService.getInstance();
            airlineService.getUser(account).then(user => setUser(user));
            //airlineService.onflightBookedEvent().on('data', (e) => console.log("BookedFlightEvent", e));
        })();
    }, [web3, account])
    return [user, setUser];
}
