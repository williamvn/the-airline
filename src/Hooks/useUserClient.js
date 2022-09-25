import { useCallback, useContext, useEffect, useState } from "react"
import { AirlineService } from "../services/AirlineService";
import { Web3Context } from "../contexts/Web3Context/Web3Context";

export const useUserClient = () => {
    const [user, setUser] = useState({ loyalityPoints: 0, bookedFlights: [] });
    const { account } = useContext(Web3Context);

    const updateUserInfo = useCallback(
        async (account) => {
            const airlineService = await AirlineService.getInstance();
            airlineService.getUser(account).then(user => setUser(user));
        },
        [account],
    );

    useEffect(() => {
        updateUserInfo(account);
    }, [account, updateUserInfo]);

    return [user, updateUserInfo];
}
