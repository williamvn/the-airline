import { useEffect, useState } from "react"
import { AirlineService } from "../services/AirlineService";
import { useWeb3 } from "../Hooks/useWeb3";

export const useUserClient = () => {
    const [user, setUser] = useState({ loyalityPoints: 0, bookedFlights: [] });
    const web3 = useWeb3();

    useEffect(() => {
        (async () => {
            if (web3) {
                const airlineService = await AirlineService.getInstance();
                const account = (await web3.eth.getAccounts())[0].toLowerCase();
                airlineService.getUser(account).then(user => setUser(user));
            }
        })();
    }, [web3])
    return user;
}
