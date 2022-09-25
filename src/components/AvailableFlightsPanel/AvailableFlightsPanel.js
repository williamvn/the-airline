import React, { useContext, useEffect, useState } from 'react'
import { Web3Context } from '../../contexts/Web3Context';
import { useAvailableFlights } from '../../hooks/useAvailableFlights';
import { AirlineService } from '../../services/AirlineService';
import { FlightService } from '../../services/FlightService';
import FlightList from '../FlightList/FlightList';
import { Panel } from '../Panel/Panel';

export const AvailableFlightsPanel = () => {
    const [availableFlights, setAvailableFlights] = useAvailableFlights();
    const { provider: web3, account } = useContext(Web3Context);
    const [isOwner, setIsOwner] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            const airlineService = await AirlineService.getInstance();
            airlineService.amIOwner(account).then(value => setIsOwner(value));
        })();
    }, [account]);

    const seedFlights = async () => {
        setIsLoading(true);
        const flightService = await FlightService.getInstance();
        await flightService.seedFlights(web3, account);
        const newSeedFlights = await flightService.getAvailableFlights();
        setAvailableFlights(newSeedFlights);
        setIsLoading(false);
    }

    return (
        <>
            <Panel title="Available Flights" actionIconClass={availableFlights.length === 0 && isOwner ? "fa fa-flask" : ""} actionPlaceHolder="Seed Flights" action={() => seedFlights()}>
                <FlightList flights={availableFlights}></FlightList>
            </Panel>
            {
                isLoading && <div >
                    <div class={`spinner-grow text-success`} role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            }
        </>
    )
}
