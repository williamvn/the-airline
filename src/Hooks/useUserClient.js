import { useEffect, useState } from "react"
import { AirlineService } from "../services/AirlineService";

export const useUserClient = () => {
    const [user, setUser] = useState({ loyalityPoints: 0, bookedFlights: [] });

    useEffect(() => {
        (async () => {
            const airlineService = await AirlineService.getInstance();
            airlineService.getUser().then(user => setUser(user));
        })();
    }, [])
    return user;
}
