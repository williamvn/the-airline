import { useEffect, useState } from "react";
import { FlightService } from "../services/FlightService";

export const useAvailableFlights = () => {
    const [flights, setFlights] = useState([]);
    useEffect(() => {
      (async () => {
        const flightsService = await FlightService.getInstance();
        flightsService.getAvailableFlights().then(flights => setFlights(flights));
      })();
    }, [])

    return flights;
}
